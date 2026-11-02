/**
 * Relais des demandes CITYSTAR : chaque lead entre tout de suite dans la séquence e-mail Brevo,
 * sans attendre la synchronisation HubSpot → Brevo (une fois toutes les 6 heures au mieux).
 *
 * - POST /api/demande : le formulaire « Être rappelé » du site. La demande est transmise telle
 *   quelle au formulaire HubSpot, puis le contact est ajouté à la liste d'entrée Brevo, dont le
 *   scénario d'aiguillage choisit la séquence de sa langue.
 * - Chaque minute : les leads des formulaires de pub que HubSpot vient de récupérer (Meta, Google,
 *   LinkedIn) reçoivent dans HubSpot le statut Nouveau, leur canal et leur langue, puis sont ajoutés
 *   à la même liste Brevo.
 *
 * Brevo ne relance pas la séquence d'un contact déjà dans la liste : renvoyer un lead est sans effet.
 * Sans les secrets BREVO_CLE et HUBSPOT_JETON, le relais transmet seulement les demandes à HubSpot.
 */

interface Env {
  HUBSPOT_PORTAIL: string;
  HUBSPOT_FORMULAIRE: string;
  BREVO_LISTE_ENTREE: string;
  HUBSPOT_JETON?: string;
  BREVO_CLE?: string;
}

type Champ = { name: string; value: string };

type Lead = { email: string; prenom?: string; nom?: string; langue?: string; interetEn?: string };

/** Fenêtre de recherche des leads de pub : large devant la minute du déclencheur, pour ne rien manquer. */
const FENETRE_MS = 15 * 60 * 1000;

const CANAUX_PUB = ["meta_ads", "google_ads", "linkedin_ads", "snapchat_ads"];

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
    ctx.waitUntil(leadsPublicitaires(env));
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
  const depuis = String(Date.now() - FENETRE_MS);
  const communs = [
    { propertyName: "createdate", operator: "GTE", value: depuis },
    { propertyName: "email", operator: "HAS_PROPERTY" },
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
      "hs_analytics_source",
      "hs_analytics_source_data_1",
      "are_you_interested_in",
      "vous_tes_intresss_par_",
    ],
    limit: 50,
  });
  if (!recherche) return;
  const { results } = (await recherche.json()) as { results: ContactHubSpot[] };

  for (const { id, properties: p } of results) {
    const langue =
      p["citystar_langue"] ||
      (p["are_you_interested_in"] ? "en" : p["vous_tes_intresss_par_"] ? "fr" : "");
    const lead: Lead = { email: p["email"] ?? "" };
    if (p["firstname"]) lead.prenom = p["firstname"];
    if (p["lastname"]) lead.nom = p["lastname"];
    if (langue) lead.langue = langue;
    if (p["are_you_interested_in"]) lead.interetEn = p["are_you_interested_in"];
    // Le statut sert de marque « déjà traité » : il n'est posé qu'une fois le lead accepté par Brevo.
    if (!(await versBrevo(env, lead))) continue;
    const complements: Record<string, string> = { citystar_statut: "nouveau" };
    if (!p["citystar_canal"]) complements["citystar_canal"] = canalPub(p);
    if (!p["citystar_langue"] && langue) complements["citystar_langue"] = langue;
    await hubspot(env, "PATCH", `/crm/v3/objects/contacts/${id}`, { properties: complements });
  }
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
