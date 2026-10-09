import { espaceClient } from "@/config/citystar";

/**
 * Accès à Supabase par simples requêtes fetch (aucune bibliothèque) : connexion
 * par lien magique, lecture et écriture des tables, fichiers privés signés.
 */

const { url, clePublique } = espaceClient;

export type Session = {
  access_token: string;
  refresh_token: string;
  /** Secondes depuis 1970. */
  expires_at: number;
  email: string;
};

export class ErreurApi extends Error {
  constructor(
    message: string,
    readonly statut: number,
  ) {
    super(message);
  }
}

const CLE_SESSION = "citystar-espace-session";

function lireSession(): Session | null {
  try {
    const brut = localStorage.getItem(CLE_SESSION);
    return brut ? (JSON.parse(brut) as Session) : null;
  } catch {
    return null;
  }
}

function ecrireSession(session: Session | null) {
  try {
    if (session) localStorage.setItem(CLE_SESSION, JSON.stringify(session));
    else localStorage.removeItem(CLE_SESSION);
  } catch {
    /* Navigation privée : la session ne survit simplement pas au rechargement. */
  }
}

/** L'adresse e-mail est lue dans le jeton lui-même. */
function emailDuJeton(jeton: string) {
  try {
    const charge = jeton.split(".")[1] ?? "";
    const json = atob(charge.replace(/-/g, "+").replace(/_/g, "/"));
    return String((JSON.parse(json) as { email?: string }).email ?? "");
  } catch {
    return "";
  }
}

async function appel<T>(chemin: string, init: RequestInit = {}, jeton?: string): Promise<T> {
  const entetes = new Headers(init.headers);
  entetes.set("apikey", clePublique);
  if (jeton) entetes.set("Authorization", `Bearer ${jeton}`);
  if (init.body && !(init.body instanceof Blob) && !entetes.has("Content-Type"))
    entetes.set("Content-Type", "application/json");
  const reponse = await fetch(`${url}${chemin}`, { ...init, headers: entetes });
  const texte = await reponse.text();
  const corps = texte ? (JSON.parse(texte) as unknown) : null;
  if (!reponse.ok) {
    const detail = corps as { message?: string; msg?: string; error_description?: string } | null;
    throw new ErreurApi(
      detail?.message ?? detail?.msg ?? detail?.error_description ?? reponse.statusText,
      reponse.status,
    );
  }
  return corps as T;
}

/* ------------------------------------------------------------------ */
/* Connexion                                                           */
/* ------------------------------------------------------------------ */

/** Envoie le lien de connexion ; il ramène sur `retour` (adresse autorisée dans Supabase). */
export async function envoyerLien(email: string, retour: string) {
  await appel(`/auth/v1/otp?redirect_to=${encodeURIComponent(retour)}`, {
    method: "POST",
    body: JSON.stringify({ email: email.trim().toLowerCase(), create_user: true }),
  });
}

/**
 * Au retour du lien magique, la session arrive dans le fragment de l'adresse
 * (#access_token=…). Elle est enregistrée puis effacée de la barre d'adresse.
 */
export function sessionDepuisAdresse(): { session: Session } | { erreur: string } | null {
  const fragment = new URLSearchParams(window.location.hash.slice(1));
  const nettoyer = () =>
    history.replaceState(null, "", window.location.pathname + window.location.search);
  if (fragment.get("error")) {
    nettoyer();
    return { erreur: fragment.get("error_code") ?? fragment.get("error") ?? "" };
  }
  const access = fragment.get("access_token");
  const refresh = fragment.get("refresh_token");
  if (!access || !refresh) return null;
  const session: Session = {
    access_token: access,
    refresh_token: refresh,
    expires_at: Number(fragment.get("expires_at")) || Date.now() / 1000 + 3600,
    email: emailDuJeton(access),
  };
  ecrireSession(session);
  nettoyer();
  return { session };
}

type ReponseJeton = { access_token: string; refresh_token: string; expires_at?: number; expires_in: number };

/** Session en cours, rafraîchie si elle expire dans la minute ; null si personne n'est connecté. */
export async function sessionValide(): Promise<Session | null> {
  const session = lireSession();
  if (!session) return null;
  if (session.expires_at - Date.now() / 1000 > 60) return session;
  try {
    const jeton = await appel<ReponseJeton>("/auth/v1/token?grant_type=refresh_token", {
      method: "POST",
      body: JSON.stringify({ refresh_token: session.refresh_token }),
    });
    const neuve: Session = {
      access_token: jeton.access_token,
      refresh_token: jeton.refresh_token,
      expires_at: jeton.expires_at ?? Date.now() / 1000 + jeton.expires_in,
      email: emailDuJeton(jeton.access_token),
    };
    ecrireSession(neuve);
    return neuve;
  } catch {
    ecrireSession(null);
    return null;
  }
}

export async function deconnexion() {
  const session = lireSession();
  ecrireSession(null);
  if (session) await appel("/auth/v1/logout", { method: "POST" }, session.access_token).catch(() => {});
}

/** Jeton à jour pour chaque requête ; une session expirée renvoie à la connexion. */
async function jeton() {
  const session = await sessionValide();
  if (!session) throw new ErreurApi("session", 401);
  return session.access_token;
}

/* ------------------------------------------------------------------ */
/* Tables                                                              */
/* ------------------------------------------------------------------ */

export const tables = {
  async lire<T>(table: string, requete: string) {
    return appel<T[]>(`/rest/v1/${table}?${requete}`, {}, await jeton());
  },
  async ajouter<T>(table: string, lignes: object | object[]) {
    return appel<T[]>(
      `/rest/v1/${table}`,
      { method: "POST", body: JSON.stringify(lignes), headers: { Prefer: "return=representation" } },
      await jeton(),
    );
  },
  async modifier(table: string, filtre: string, changements: object) {
    await appel(
      `/rest/v1/${table}?${filtre}`,
      { method: "PATCH", body: JSON.stringify(changements), headers: { Prefer: "return=minimal" } },
      await jeton(),
    );
  },
  async supprimer(table: string, filtre: string) {
    await appel(`/rest/v1/${table}?${filtre}`, { method: "DELETE" }, await jeton());
  },
  async fonction<T>(nom: string, parametres: object = {}) {
    return appel<T>(
      `/rest/v1/rpc/${nom}`,
      { method: "POST", body: JSON.stringify(parametres) },
      await jeton(),
    );
  },
};

/* ------------------------------------------------------------------ */
/* Fichiers                                                            */
/* ------------------------------------------------------------------ */

export type Espace = "chantier" | "documents";

export const fichiers = {
  /** Liens temporaires vers des fichiers privés, rangés par chemin. */
  async signer(espace: Espace, chemins: string[], telechargement?: string) {
    const liens = new Map<string, string>();
    if (chemins.length === 0) return liens;
    const signes = await appel<{ path: string | null; signedURL: string | null }[]>(
      `/storage/v1/object/sign/${espace}`,
      {
        method: "POST",
        body: JSON.stringify({ expiresIn: espaceClient.dureeLiens, paths: chemins }),
      },
      await jeton(),
    );
    for (const { path, signedURL } of signes) {
      if (!path || !signedURL) continue;
      const lien = `${url}/storage/v1${signedURL}`;
      liens.set(
        path,
        telechargement ? `${lien}&download=${encodeURIComponent(telechargement)}` : lien,
      );
    }
    return liens;
  },
  async deposer(espace: Espace, chemin: string, contenu: Blob) {
    await appel(
      `/storage/v1/object/${espace}/${chemin}`,
      {
        method: "POST",
        body: contenu,
        headers: { "Content-Type": contenu.type || "application/octet-stream" },
      },
      await jeton(),
    );
  },
  async supprimer(espace: Espace, chemins: string[]) {
    await appel(
      `/storage/v1/object/${espace}`,
      { method: "DELETE", body: JSON.stringify({ prefixes: chemins }) },
      await jeton(),
    );
  },
};

/**
 * Photo réduite dans le navigateur avant l'envoi (WebP, 2 000 px au plus) :
 * le chantier tient longtemps dans le stockage gratuit.
 */
export async function reduirePhoto(fichier: File): Promise<Blob> {
  const image = await createImageBitmap(fichier);
  const echelle = Math.min(1, espaceClient.photoLargeurMax / Math.max(image.width, image.height));
  const toile = document.createElement("canvas");
  toile.width = Math.round(image.width * echelle);
  toile.height = Math.round(image.height * echelle);
  toile.getContext("2d")?.drawImage(image, 0, 0, toile.width, toile.height);
  image.close();
  const blob = await new Promise<Blob | null>((resoudre) =>
    toile.toBlob(resoudre, "image/webp", 0.82),
  );
  return blob ?? fichier;
}
