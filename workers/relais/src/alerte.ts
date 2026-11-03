/**
 * E-mail « lead chaud » envoyé au commercial : de quoi appeler tout de suite, lisible sur téléphone.
 * Boutons Appeler et WhatsApp, le projet en un coup d'œil, la fiche HubSpot. L'heure exacte de l'échéance
 * est dans la tâche HubSpot, affichée dans le fuseau du compte : les fuseaux des environnements ne
 * s'accordent pas sur celui de Casablanca (UTC+0 ou UTC+1), l'e-mail dit donc seulement « sous 1 h ».
 */

type Proprietes = Record<string, string | null | undefined>;

/** Libellés des menus HubSpot CITYSTAR, pour l'e-mail et la tâche d'appel. */
export const LIBELLES: Record<string, Record<string, string>> = {
  citystar_budget: {
    moins_800k: "moins de 800 k€",
    "800k_1m": "800 k€ à 1 M€",
    "1_1_5m": "1 à 1,5 M€",
    plus_1_5m: "plus de 1,5 M€",
    non_precise: "préfère en parler",
    moins_1m: "moins de 1 M€",
  },
  citystar_horizon: {
    "3_mois": "dans les 3 mois",
    "3_6_mois": "dans 3 à 6 mois",
    "6_12_mois": "dans 6 à 12 mois",
    plus_tard: "plus tard / se renseigne",
  },
  citystar_financement: {
    fonds_propres: "fonds propres",
    mixte: "mixte (apport + crédit)",
    credit: "crédit",
    inconnu: "pas encore connu",
  },
  citystar_villa: { A: "Villa A", B: "Villa B", C: "Villa C", indecis: "pas encore décidé" },
  citystar_projet: {
    residence_principale: "résidence principale",
    residence_secondaire: "résidence secondaire",
    investissement_locatif: "investissement locatif",
    patrimonial: "placement patrimonial",
  },
  citystar_langue: {
    fr: "français",
    en: "anglais",
    es: "espagnol",
    it: "italien",
    nl: "néerlandais",
    no: "norvégien",
  },
  citystar_canal: {
    site: "site web",
    meta_ads: "Meta Ads",
    google_ads: "Google Ads",
    linkedin_ads: "LinkedIn Ads",
    snapchat_ads: "Snapchat Ads",
    instagram: "Instagram",
    google_business: "fiche Google",
    whatsapp: "WhatsApp",
    telephone: "téléphone",
    recommandation: "recommandation",
    evenement: "salon / événement",
    autre: "autre",
  },
};

/** A1 à A6, B1 à B4, C1 à C4 → numéro du lot sur le plan de masse. */
const LOTS: Record<string, number> = {
  A1: 2, A2: 3, A3: 6, A4: 7, A5: 13, A6: 14, B1: 9, B2: 10, B3: 11, B4: 12, C1: 1, C2: 4, C3: 5, C4: 8,
};

export function libelle(p: Proprietes, cle: string) {
  const valeur = p[cle];
  if (!valeur) return "";
  if (cle === "citystar_lot") {
    return valeur.split(";").map((lot) => (LOTS[lot] ? `${lot} (lot ${LOTS[lot]})` : lot)).join(", ");
  }
  return LIBELLES[cle]?.[valeur] ?? valeur;
}

const echapper = (t: string) =>
  t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function alerteLeadChaud(p: Proprietes, fiche: string) {
  const nom = [p["firstname"], p["lastname"]].filter(Boolean).join(" ") || p["email"] || "Lead sans nom";
  const telephone = p["phone"]?.trim() ?? "";
  const chiffres = telephone.replace(/\D/g, "");
  const budget = [libelle(p, "citystar_budget"), p["citystar_budget_declare"] && `déclaré : ${p["citystar_budget_declare"]}`]
    .filter(Boolean)
    .join(" · ");
  const lignes: [string, string][] = (
    [
      ["Budget", budget],
      ["Achat", libelle(p, "citystar_horizon")],
      ["Financement", libelle(p, "citystar_financement")],
      ["Villa", libelle(p, "citystar_villa")],
      ["Lot(s)", libelle(p, "citystar_lot")],
      ["Projet", libelle(p, "citystar_projet")],
      ["Langue", libelle(p, "citystar_langue")],
      ["Provenance", libelle(p, "citystar_canal")],
      ["E-mail", p["email"] ?? ""],
    ] as [string, string][]
  ).filter(([, valeur]) => valeur);
  const message = p["message"]?.trim();

  const sujet = `🔥 Lead chaud : ${nom}, à appeler sous 1 h`;
  const resume = [libelle(p, "citystar_budget"), libelle(p, "citystar_horizon"), libelle(p, "citystar_financement")]
    .filter(Boolean)
    .join(" · ");

  const bouton = (lien: string, texte: string, fond: string, couleur: string) =>
    `<a href="${echapper(lien)}" style="display:inline-block;margin:0 8px 10px 0;padding:13px 20px;border-radius:8px;background:${fond};color:${couleur};font:600 15px/1 Arial,Helvetica,sans-serif;text-decoration:none">${texte}</a>`;
  const boutons = [
    chiffres && bouton(`tel:+${chiffres}`, `📞 Appeler ${echapper(telephone)}`, "#15110C", "#FDF8F0"),
    chiffres && bouton(`https://wa.me/${chiffres}`, "WhatsApp", "#1F8F55", "#FFFFFF"),
    bouton(fiche, "Fiche HubSpot", "#F6EFE3", "#15110C"),
  ]
    .filter(Boolean)
    .join("");
  const tableau = lignes
    .map(
      ([cle, valeur], i) =>
        `<tr><td style="padding:10px 0;${i ? "border-top:1px solid #EDE3D3;" : ""}color:#8C6A48;font:600 12px/1.4 Arial,Helvetica,sans-serif;text-transform:uppercase;letter-spacing:.06em;width:104px;vertical-align:top">${cle}</td><td style="padding:10px 0;${i ? "border-top:1px solid #EDE3D3;" : ""}color:#15110C;font:15px/1.4 Arial,Helvetica,sans-serif;word-break:break-word;overflow-wrap:anywhere">${echapper(valeur)}</td></tr>`,
    )
    .join("");

  const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${echapper(sujet)}</title></head>
<body style="margin:0;padding:0;background:#F6EFE3">
<div style="display:none;max-height:0;overflow:hidden">${echapper(resume)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F6EFE3"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#FFFFFF;border-radius:14px;overflow:hidden">
<tr><td style="background:#15110C;padding:22px 26px">
<div style="color:#C3A586;font:600 11px/1 Arial,Helvetica,sans-serif;letter-spacing:.24em;text-transform:uppercase">CITYSTAR · Lead chaud</div>
<div style="color:#FDF8F0;font:400 28px/1.2 Georgia,'Times New Roman',serif;margin-top:12px">${echapper(nom)}</div>
<div style="color:#FDF8F0;font:15px/1.4 Arial,Helvetica,sans-serif;margin-top:8px;opacity:.85">À appeler <b>sous 1 h</b></div>
</td></tr>
<tr><td style="padding:22px 26px 12px">${boutons}</td></tr>
<tr><td style="padding:0 26px 8px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${tableau}</table></td></tr>
${message ? `<tr><td style="padding:8px 26px 4px"><div style="color:#8C6A48;font:600 12px/1.4 Arial,Helvetica,sans-serif;text-transform:uppercase;letter-spacing:.06em">Son message</div><div style="margin-top:6px;padding:12px 14px;background:#F6EFE3;border-radius:8px;color:#15110C;font:15px/1.5 Arial,Helvetica,sans-serif;white-space:pre-line">${echapper(message)}</div></td></tr>` : ""}
<tr><td style="padding:18px 26px 22px;color:#60564D;font:12px/1.5 Arial,Helvetica,sans-serif">Budget d'au moins 800 k€, achat dans les 6 mois, fonds propres ou mixte : score calculé par le relais du site. La tâche d'appel est aussi dans HubSpot.</td></tr>
</table></td></tr></table></body></html>`;

  const texte = [
    `LEAD CHAUD : ${nom}`,
    "À appeler sous 1 h",
    "",
    ...(telephone ? [`Téléphone : ${telephone} · WhatsApp : https://wa.me/${chiffres}`] : []),
    ...lignes.map(([cle, valeur]) => `${cle} : ${valeur}`),
    ...(message ? ["", "Son message :", message] : []),
    "",
    `Fiche HubSpot : ${fiche}`,
  ].join("\n");

  return { sujet, html, texte };
}
