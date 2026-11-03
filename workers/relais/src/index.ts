/**
 * Relais des demandes CITYSTAR : chaque lead entre tout de suite dans la séquence e-mail Brevo,
 * sans attendre la synchronisation HubSpot → Brevo (une fois toutes les 6 heures au mieux).
 *
 * - POST /api/demande : le formulaire « Être rappelé » du site. La demande est transmise telle
 *   quelle au formulaire HubSpot, puis le contact est ajouté à la liste d'entrée Brevo, dont le
 *   scénario d'aiguillage choisit la séquence de sa langue.
 * - Chaque minute : les leads des formulaires de pub que HubSpot vient de récupérer (Meta, Google,
 *   LinkedIn) reçoivent dans HubSpot le statut Nouveau, leur canal et leur langue (à défaut d'une
 *   langue connue, celle du nom du formulaire), puis sont ajoutés à la même liste Brevo.
 *
 * - Chaque minute aussi : le score des leads modifiés récemment est recalculé (voir `score`), avec
 *   la tranche de budget tirée du budget déclaré dans sa devise. Quand le score change, le commercial
 *   reçoit une tâche HubSpot, et un e-mail pour un lead chaud.
 *
 * Brevo ne relance pas la séquence d'un contact déjà dans la liste : renvoyer un lead est sans effet.
 * Sans les secrets BREVO_CLE et HUBSPOT_JETON, le relais transmet seulement les demandes à HubSpot.
 */

import { alerteLeadChaud, libelle } from "./alerte";

interface Env {
  HUBSPOT_PORTAIL: string;
  HUBSPOT_FORMULAIRE: string;
  BREVO_LISTE_ENTREE: string;
  ALERTE_EMAIL: string;
  HUBSPOT_JETON?: string;
  BREVO_CLE?: string;
}

type Champ = { name: string; value: string };

type Lead = { email: string; prenom?: string; nom?: string; langue?: string; interetEn?: string };

/** Fenêtre de recherche des leads de pub : large devant la minute du déclencheur, pour ne rien manquer. */
const FENETRE_MS = 15 * 60 * 1000;

/**
 * HubSpot date un lead de pub du moment où le prospect a rempli le formulaire, pas de son arrivée,
 * qui peut suivre de deux heures. La fenêtre porte donc sur la dernière modification (l'arrivée) ;
 * la date de création écarte seulement les contacts anciens.
 */
const ANCIENNETE_MAX_MS = 7 * 24 * 60 * 60 * 1000;

const CANAUX_PUB = ["meta_ads", "google_ads", "linkedin_ads", "snapchat_ads"];

const LANGUES = ["fr", "en", "es", "it", "nl", "no"];

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    if (new URL(request.url).pathname !== "/api/demande") {
      return new Response("Introuvable", { status: 404 });
    }
    if (request.method !== "POST") {
      return new Response(null, { status: 405, headers: { Allow: "POST" } });
    }
    let corps: { fields?: Champ[]; context?: Record<string, unknown> };
    try {
      corps = await request.json();
    } catch {
      return new Response("JSON attendu", { status: 400 });
    }
    const champs = Array.isArray(corps.fields) ? corps.fields : [];
    const valeur = (nom: string) => champs.find((champ) => champ.name === nom)?.value?.trim();
    const email = valeur("email");
    if (!email) return new Response("E-mail manquant", { status: 400 });

    const ip = request.headers.get("CF-Connecting-IP");
    const hubspot = await fetch(
      `https://api-eu1.hsforms.com/submissions/v3/integration/submit/${env.HUBSPOT_PORTAIL}/${env.HUBSPOT_FORMULAIRE}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...corps,
          context: { ...corps.context, ...(ip && { ipAddress: ip }) },
        }),
      },
    );
    if (hubspot.ok) {
      const lead: Lead = { email };
      const [prenom, nom, langue] = ["firstname", "lastname", "citystar_langue"].map(valeur);
      if (prenom) lead.prenom = prenom;
      if (nom) lead.nom = nom;
      if (langue) lead.langue = langue;
      ctx.waitUntil(versBrevo(env, lead));
    }
    return new Response(await hubspot.text(), {
      status: hubspot.status,
      headers: { "Content-Type": "application/json" },
    });
  },

  async scheduled(_controller: ScheduledController, env: Env, ctx: ExecutionContext) {
    ctx.waitUntil(leadsPublicitaires(env).then(() => scores(env)));
  },
};

/** Ajoute le contact à la liste d'entrée Brevo ; renvoie false si Brevo refuse. */
async function versBrevo(env: Env, lead: Lead): Promise<boolean> {
  if (!env.BREVO_CLE) {
    console.warn("BREVO_CLE absente : le lead attendra la synchronisation HubSpot → Brevo.");
    return false;
  }
  const attributs = Object.fromEntries(
    Object.entries({
      PRENOM: lead.prenom,
      NOM: lead.nom,
      LANGUE: lead.langue,
      INTERET_EN: lead.interetEn,
    }).filter(([, valeur]) => valeur),
  );
  const reponse = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "api-key": env.BREVO_CLE,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email: lead.email,
      attributes: attributs,
      listIds: [Number(env.BREVO_LISTE_ENTREE)],
      updateEnabled: true,
    }),
  });
  if (!reponse.ok)
    console.error(`Brevo ${reponse.status} pour ${lead.email} : ${await reponse.text()}`);
  return reponse.ok;
}

type ContactHubSpot = { id: string; properties: Record<string, string | null> };

/**
 * Leads de pub créés récemment et pas encore traités (sans statut de suivi). Ce sont les mêmes
 * critères que le segment HubSpot « CITYSTAR · Leads publicités (Brevo) ».
 */
async function leadsPublicitaires(env: Env) {
  if (!env.HUBSPOT_JETON) return;
  // HubSpot accepte 18 filtres par recherche : l'e-mail est vérifié dans la boucle.
  const communs = [
    { propertyName: "lastmodifieddate", operator: "GTE", value: String(Date.now() - FENETRE_MS) },
    { propertyName: "createdate", operator: "GTE", value: String(Date.now() - ANCIENNETE_MAX_MS) },
    { propertyName: "citystar_statut", operator: "NOT_HAS_PROPERTY" },
  ];
  const criteres = [
    { propertyName: "hs_analytics_source", operator: "IN", values: ["PAID_SOCIAL", "PAID_SEARCH"] },
    { propertyName: "citystar_canal", operator: "IN", values: CANAUX_PUB },
    { propertyName: "are_you_interested_in", operator: "HAS_PROPERTY" },
    { propertyName: "vous_tes_intresss_par_", operator: "HAS_PROPERTY" },
  ];
  const recherche = await hubspot(env, "POST", "/crm/v3/objects/contacts/search", {
    filterGroups: criteres.map((critere) => ({ filters: [...communs, critere] })),
    properties: [
      "email",
      "firstname",
      "lastname",
      "citystar_canal",
      "citystar_langue",
      "langue",
      "canal",
      "hs_analytics_source",
      "hs_analytics_source_data_1",
      "hs_object_source_detail_1",
      "first_conversion_event_name",
      "are_you_interested_in",
      "vous_tes_intresss_par_",
      ...CHAMPS_REPONSES,
    ],
    limit: 50,
  });
  if (!recherche) return;
  const { results } = (await recherche.json()) as { results: ContactHubSpot[] };

  for (const { id, properties: p } of results) {
    if (!p["email"]) continue;
    const parametre = p["langue"]?.trim().toLowerCase() ?? "";
    const langue =
      p["citystar_langue"] ||
      (LANGUES.includes(parametre) ? parametre : "") ||
      langueFormulaire(p) ||
      (p["are_you_interested_in"] ? "en" : p["vous_tes_intresss_par_"] ? "fr" : "");
    const lead: Lead = { email: p["email"] ?? "" };
    if (p["firstname"]) lead.prenom = p["firstname"];
    if (p["lastname"]) lead.nom = p["lastname"];
    if (langue) lead.langue = langue;
    if (p["are_you_interested_in"]) lead.interetEn = p["are_you_interested_in"];
    // Le statut sert de marque « déjà traité » : il n'est posé qu'une fois le lead accepté par Brevo.
    if (!(await versBrevo(env, lead))) continue;
    const complements: Record<string, string> = { citystar_statut: "nouveau", ...reponsesPub(p) };
    const canal = p["canal"]?.trim() ?? "";
    if (!p["citystar_canal"]) complements["citystar_canal"] = CANAUX_PUB.includes(canal) ? canal : canalPub(p);
    if (!p["citystar_langue"] && langue) complements["citystar_langue"] = langue;
    await hubspot(env, "PATCH", `/crm/v3/objects/contacts/${id}`, { properties: complements });
  }
}

/**
 * Score du lead (`citystar_score`), d'après les règles du commercial :
 * - chaud : budget d'au moins 800 k€, achat dans les 6 mois, fonds propres ou mixte → appel sous 1 h ;
 * - tiède : bon budget mais délai long ou financement pas encore connu → appel sous 24 h et séquence ;
 * - froid : budget insuffisant ou « je me renseigne » → séquence seulement ;
 * - à qualifier : ni budget ni horizon (formulaire de pub, contact direct) → appel sous 24 h.
 * Le site ne demande pas le financement : le commercial le remplit dans HubSpot après l'appel.
 */
export type Score = "chaud" | "tiede" | "froid" | "a_qualifier";

type Proprietes = Record<string, string | null | undefined>;

const BUDGET_SUFFISANT = ["800k_1m", "1_1_5m", "plus_1_5m"];
const DELAI_COURT = ["3_mois", "3_6_mois"];
const FINANCEMENT_OK = ["fonds_propres", "mixte"];

export function score(p: Proprietes): Score {
  const budget = p["citystar_budget"] ?? "";
  const horizon = p["citystar_horizon"] ?? "";
  if (budget === "moins_800k" || horizon === "plus_tard") return "froid";
  const budgetOk = BUDGET_SUFFISANT.includes(budget);
  const financement = p["citystar_financement"] ?? "";
  if (budgetOk && DELAI_COURT.includes(horizon) && FINANCEMENT_OK.includes(financement)) {
    return "chaud";
  }
  if (budgetOk || DELAI_COURT.includes(horizon) || horizon === "6_12_mois") return "tiede";
  return "a_qualifier";
}

type Devise = "EUR" | "MAD" | "USD" | "GBP" | "NOK";

const DEVISES: [Devise, RegExp][] = [
  ["MAD", /(?<![a-z])(?:mad|dhs?)(?![a-z])|dirham/i],
  ["GBP", /£|(?<![a-z])gbp(?![a-z])|livre|pound/i],
  ["NOK", /(?<![a-z])(?:nok|kr)(?![a-z])|couronne|krone/i],
  ["USD", /\$|(?<![a-z])usd(?![a-z])|dollar/i],
  ["EUR", /€|(?<![a-z])eur(?![a-z])|euro/i],
];

/**
 * Montant et devise d'un budget écrit à la main (`citystar_budget_declare`) : « 12 M MAD »,
 * « 900 000 USD », « 750 k€ », « 1,2 million € ». Sans devise reconnue, c'est l'euro.
 */
export function lireBudget(texte: string): { montant: number; devise: Devise } | null {
  const m = texte.match(/(\d[\d\s.,  ]*)(?:\s*(millions?|mille|mill\.?|mln|mio|k|m)(?![a-z]))?/i);
  if (!m?.[1]) return null;
  const unite = (m[2] ?? "").toLowerCase();
  const multiple = unite === "k" || unite === "mille" ? 1e3 : unite ? 1e6 : 1;
  const montant = nombre(m[1]) * multiple;
  if (!Number.isFinite(montant) || montant <= 0) return null;
  const devise = DEVISES.find(([, motif]) => motif.test(texte))?.[0] ?? "EUR";
  return { montant, devise };
}

/** « 12 000 000 », « 12.000.000 », « 1,2 », « 1.200,50 » : le dernier séparateur suivi de 3 chiffres sépare les milliers. */
function nombre(brut: string) {
  const s = brut.replace(/[\s  ]/g, "").replace(/[.,]+$/, "");
  const separateurs = s.match(/[.,]/g) ?? [];
  if (!separateurs.length) return Number(s);
  const decimal = s.includes(".") && s.includes(",") ? s[Math.max(s.lastIndexOf("."), s.lastIndexOf(","))] : null;
  if (decimal) return Number(s.replaceAll(decimal === "." ? "," : ".", "").replace(decimal, "."));
  const sep = separateurs[0] as string;
  const fin = s.slice(s.lastIndexOf(sep) + 1);
  if (separateurs.length > 1 || fin.length === 3) return Number(s.replaceAll(sep, ""));
  return Number(s.replace(sep, "."));
}

/** Tranche de budget du formulaire (`citystar_budget`) pour un montant en euros. */
export function tranche(euros: number) {
  if (euros < 800_000) return "moins_800k";
  if (euros < 1_000_000) return "800k_1m";
  if (euros <= 1_500_000) return "1_1_5m";
  return "plus_1_5m";
}

/** Unités de chaque devise pour 1 € : open.er-api.com, gratuit et sans clé, mis à jour chaque jour. */
async function tauxEuro(): Promise<Record<string, number> | null> {
  const reponse = await fetch("https://open.er-api.com/v6/latest/EUR").catch(() => null);
  if (!reponse?.ok) {
    console.error(`Taux de change indisponibles : ${reponse?.status ?? "réseau"}`);
    return null;
  }
  const { rates } = (await reponse.json()) as { rates?: Record<string, number> };
  return rates ?? null;
}

/** Statuts où le lead n'est plus à appeler : aucune tâche ni alerte. */
const STATUTS_CLOS = ["reserve", "vendu", "non_qualifie", "hors_cible"];

/** Délai de rappel en heures, par score. Un lead froid ne reçoit que la séquence e-mail. */
const RAPPEL_HEURES: Partial<Record<Score, number>> = { chaud: 1, tiede: 24, a_qualifier: 24 };

/**
 * Leads modifiés récemment (demande du site, lead de pub, ou fiche mise à jour par le commercial) :
 * la tranche de budget suit le budget déclaré, converti en euros, puis le score est recalculé.
 * Le score n'est écrit que s'il change : c'est ce changement qui prévient le commercial, une fois.
 */
async function scores(env: Env) {
  if (!env.HUBSPOT_JETON) return;
  const recherche = await hubspot(env, "POST", "/crm/v3/objects/contacts/search", {
    filterGroups: [
      {
        filters: [
          { propertyName: "lastmodifieddate", operator: "GTE", value: String(Date.now() - FENETRE_MS) },
          { propertyName: "citystar_statut", operator: "HAS_PROPERTY" },
        ],
      },
    ],
    properties: [
      "email",
      "firstname",
      "lastname",
      "phone",
      "citystar_statut",
      "citystar_score",
      "citystar_budget",
      "citystar_budget_declare",
      "citystar_horizon",
      "citystar_financement",
      "citystar_villa",
      "citystar_lot",
      "citystar_projet",
      "citystar_langue",
      "citystar_canal",
      "message",
      ...CHAMPS_REPONSES,
    ],
    limit: 100,
  });
  if (!recherche) return;
  const { results } = (await recherche.json()) as { results: ContactHubSpot[] };

  let taux: Record<string, number> | null | undefined;
  for (const { id, properties: p } of results) {
    // Un lead traité avant la recopie des réponses Meta les reçoit à sa prochaine modification.
    const maj: Record<string, string> = reponsesPub(p);
    Object.assign(p, maj);
    const declare = p["citystar_budget_declare"] ? lireBudget(p["citystar_budget_declare"]) : null;
    if (declare) {
      if (declare.devise !== "EUR") taux ??= await tauxEuro();
      const parEuro = declare.devise === "EUR" ? 1 : taux?.[declare.devise];
      const budget = parEuro ? tranche(declare.montant / parEuro) : null;
      if (budget && budget !== p["citystar_budget"]) maj["citystar_budget"] = p["citystar_budget"] = budget;
    }
    const nouveau = score(p);
    if (nouveau !== p["citystar_score"]) maj["citystar_score"] = nouveau;
    if (!Object.keys(maj).length) continue;
    if (!(await hubspot(env, "PATCH", `/crm/v3/objects/contacts/${id}`, { properties: maj }))) continue;
    if (maj["citystar_score"] && !STATUTS_CLOS.includes(p["citystar_statut"] ?? "")) {
      await prevenir(env, id, p, nouveau);
    }
  }
}

/** Tâche d'appel dans HubSpot, à 1 h ou 24 h selon le score, et e-mail immédiat pour un lead chaud. */
async function prevenir(env: Env, id: string, p: Proprietes, s: Score) {
  const heures = RAPPEL_HEURES[s];
  if (!heures) return;
  const nom = [p["firstname"], p["lastname"]].filter(Boolean).join(" ") || p["email"] || id;
  const fiche = `https://app-eu1.hubspot.com/contacts/${env.HUBSPOT_PORTAIL}/record/0-1/${id}`;
  const echeance = new Date(Date.now() + heures * 3_600_000);
  const alerte = s === "chaud" ? alerteLeadChaud(p, fiche) : null;
  const sujet =
    alerte?.sujet ??
    `${s === "tiede" ? "🟠 Lead tiède" : "Lead à qualifier"} : rappeler ${nom} sous 24 h`;
  const corps =
    alerte?.texte ??
    [
      `Téléphone : ${p["phone"] ?? "–"}`,
      `Budget : ${libelle(p, "citystar_budget") || "–"}${p["citystar_budget_declare"] ? ` (déclaré : ${p["citystar_budget_declare"]})` : ""}`,
      `Achat : ${libelle(p, "citystar_horizon") || "–"}`,
      `Financement : ${libelle(p, "citystar_financement") || "–"}`,
      `Fiche HubSpot : ${fiche}`,
    ].join("\n");
  await hubspot(env, "POST", "/crm/v3/objects/tasks", {
    properties: {
      hs_timestamp: echeance.toISOString(),
      hs_task_subject: sujet,
      hs_task_body: corps,
      hs_task_status: "NOT_STARTED",
      hs_task_priority: s === "chaud" ? "HIGH" : "MEDIUM",
      hs_task_type: "CALL",
    },
    // 204 : association standard tâche → contact
    associations: [{ to: { id }, types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 204 }] }],
  });
  if (!alerte || !env.BREVO_CLE || !env.ALERTE_EMAIL) return;
  const reponse = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": env.BREVO_CLE, "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      sender: { name: "CITYSTAR · Leads", email: env.ALERTE_EMAIL },
      to: [{ email: env.ALERTE_EMAIL }],
      subject: alerte.sujet,
      htmlContent: alerte.html,
      textContent: alerte.texte,
    }),
  });
  if (!reponse.ok) console.error(`Alerte Brevo ${reponse.status} : ${await reponse.text()}`);
}

/**
 * Réponses des formulaires Meta, que HubSpot range dans les champs créés à leur nom
 * (`meta_budget`…), avec les codes du formulaire du site : recopiées dans les champs du score
 * quand ceux-ci sont vides. Un code inconnu est ignoré, sinon HubSpot refuserait toute la mise à jour.
 */
const REPONSES_PUB = {
  meta_budget: { champ: "citystar_budget", codes: ["moins_800k", "800k_1m", "1_1_5m", "plus_1_5m"] },
  meta_horizon: { champ: "citystar_horizon", codes: ["3_mois", "3_6_mois", "6_12_mois"] },
  meta_financement: { champ: "citystar_financement", codes: ["fonds_propres", "mixte", "credit", "inconnu"] },
};

const CHAMPS_REPONSES = Object.entries(REPONSES_PUB).flatMap(([source, { champ }]) => [source, champ]);

export function reponsesPub(p: Proprietes) {
  const maj: Record<string, string> = {};
  for (const [source, { champ, codes }] of Object.entries(REPONSES_PUB)) {
    const code = p[source]?.trim() ?? "";
    if (codes.includes(code) && !p[champ]) maj[champ] = code;
  }
  return maj;
}

/**
 * Langue écrite à la fin du nom du formulaire de pub, que HubSpot garde sur le contact
 * (« CityStar-pro-EN », « CITYSTAR · Rappel · NO ») : un formulaire par langue.
 */
export function langueFormulaire(p: Record<string, string | null>) {
  for (const nom of [p["hs_object_source_detail_1"], p["first_conversion_event_name"]]) {
    const code = /[\s·_|–-]([a-z]{2})$/.exec(nom?.trim().toLowerCase() ?? "")?.[1];
    if (code && LANGUES.includes(code)) return code;
  }
  return "";
}

/** Canal déduit de la source d'origine que HubSpot donne aux leads synchronisés. */
function canalPub(p: Record<string, string | null>) {
  const detail = (p["hs_analytics_source_data_1"] ?? "").toLowerCase();
  if (p["hs_analytics_source"] === "PAID_SEARCH" || detail.includes("google")) return "google_ads";
  if (detail.includes("linkedin")) return "linkedin_ads";
  if (detail.includes("snap")) return "snapchat_ads";
  if (
    detail.includes("facebook") ||
    detail.includes("instagram") ||
    p["vous_tes_intresss_par_"] ||
    p["are_you_interested_in"]
  ) {
    return "meta_ads";
  }
  return "autre";
}

async function hubspot(env: Env, methode: string, chemin: string, corps: unknown) {
  const reponse = await fetch(`https://api.hubapi.com${chemin}`, {
    method: methode,
    headers: { Authorization: `Bearer ${env.HUBSPOT_JETON}`, "Content-Type": "application/json" },
    body: JSON.stringify(corps),
  });
  if (reponse.ok) return reponse;
  console.error(`HubSpot ${methode} ${chemin} ${reponse.status} : ${await reponse.text()}`);
  return null;
}
