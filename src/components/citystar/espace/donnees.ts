import { useCallback, useEffect, useState } from "react";

import type { Devise, EtapeChantier } from "@/config/citystar";

import {
  deconnexion,
  ErreurApi,
  fichiers,
  type Session,
  sessionDepuisAdresse,
  sessionValide,
  tables,
} from "./supabase";

export type StatutEtape = "a_venir" | "en_cours" | "termine";
export type Categorie = "contrat" | "plan" | "appel" | "recu" | "autre";

export type Etape = {
  id: string;
  etape: EtapeChantier;
  ordre: number;
  statut: StatutEtape;
  date_prevue: string | null;
  date_fin: string | null;
  note: string | null;
};

export type Paiement = {
  id: string;
  libelle: string;
  etape: EtapeChantier | null;
  montant: number;
  devise: Devise;
  echeance: string | null;
  paye_le: string | null;
};

export type DocumentLot = {
  id: string;
  titre: string;
  categorie: Categorie;
  chemin: string;
  taille: number | null;
  cree_le: string;
};

export type Photo = {
  id: string;
  lot_id: string | null;
  chemin: string;
  legende: string | null;
  prise_le: string;
};

export type Proprietaire = { id: string; email: string; nom: string | null };

export type Lot = {
  id: string;
  numero: number;
  type: "A" | "B" | "C" | null;
  avancement: number;
  note: string | null;
  maj_le: string;
  etapes: Etape[];
  paiements: Paiement[];
  documents: DocumentLot[];
  proprietaires?: Proprietaire[];
};

const CHAMPS_LOT =
  "id,numero,type,avancement,note,maj_le," +
  "etapes(id,etape,ordre,statut,date_prevue,date_fin,note)," +
  "paiements(id,libelle,etape,montant,devise,echeance,paye_le)," +
  "documents(id,titre,categorie,chemin,taille,cree_le)";

const ORDRE =
  "order=numero&etapes.order=ordre&paiements.order=echeance.asc.nullslast&documents.order=cree_le.desc";

export type EtatEspace =
  | { phase: "chargement" }
  | { phase: "deconnecte"; erreurLien: string | null }
  | { phase: "erreur"; session: Session }
  | {
      phase: "pret";
      session: Session;
      admin: boolean;
      lots: Lot[];
      photos: Photo[];
      /** Liens signés des photos, par chemin. */
      liens: Map<string, string>;
    };

/**
 * État de l'espace : session, droits, villas visibles et photos.
 * Les règles RLS filtrent côté serveur ; le promoteur reçoit les quatorze villas.
 */
export function useEspace() {
  const [etat, setEtat] = useState<EtatEspace>({ phase: "chargement" });

  const charger = useCallback(async (erreurLien: string | null = null) => {
    /* Démonstration hors ligne, en développement seulement : ?demo ou ?demo=admin. */
    if (import.meta.env.DEV) {
      const demo = new URLSearchParams(window.location.search).get("demo");
      if (demo !== null) {
        const { donneesDemo } = await import("./demo");
        setEtat({ phase: "pret", ...donneesDemo(demo === "admin") });
        return;
      }
    }
    const session = await sessionValide();
    if (!session) {
      setEtat({ phase: "deconnecte", erreurLien });
      return;
    }
    try {
      const admin = await tables.fonction<boolean>("est_admin");
      const champs = admin ? `${CHAMPS_LOT},proprietaires(id,email,nom)` : CHAMPS_LOT;
      const [lots, photos] = await Promise.all([
        tables.lire<Lot>("lots", `select=${champs}&${ORDRE}`),
        tables.lire<Photo>(
          "photos",
          "select=id,lot_id,chemin,legende,prise_le&order=prise_le.desc,cree_le.desc",
        ),
      ]);
      const liens = await fichiers.signer(
        "chantier",
        photos.map((photo) => photo.chemin),
      );
      setEtat({ phase: "pret", session, admin, lots, photos, liens });
    } catch (erreur) {
      if (erreur instanceof ErreurApi && erreur.statut === 401) {
        await deconnexion();
        setEtat({ phase: "deconnecte", erreurLien: null });
      } else setEtat({ phase: "erreur", session });
    }
  }, []);

  useEffect(() => {
    const retour = sessionDepuisAdresse();
    void charger(retour && "erreur" in retour ? retour.erreur : null);
  }, [charger]);

  const sortir = useCallback(async () => {
    await deconnexion();
    setEtat({ phase: "deconnecte", erreurLien: null });
  }, []);

  return { etat, recharger: () => charger(), sortir };
}

/** Totaux réglés et restants, par devise (un échéancier tient d'ordinaire en une seule). */
export function totaux(paiements: Paiement[]) {
  const parDevise = new Map<Devise, { regle: number; reste: number }>();
  for (const p of paiements) {
    const t = parDevise.get(p.devise) ?? { regle: 0, reste: 0 };
    if (p.paye_le) t.regle += Number(p.montant);
    else t.reste += Number(p.montant);
    parDevise.set(p.devise, t);
  }
  return [...parDevise].map(([devise, t]) => ({ devise, ...t, total: t.regle + t.reste }));
}

/** Date du jour au format ISO, pour comparer aux échéances. */
export const aujourdhui = () => new Date().toISOString().slice(0, 10);
