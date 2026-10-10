/**
 * Séquences e-mail CITYSTAR : génère les modèles HTML (un fichier par e-mail)
 * et la page d'ensemble, à partir des chiffres du site (src/config/citystar.ts).
 *
 *   bun marketing/emails/generer.ts
 *
 * Variables : SITE (adresse publique du site, sans « / » final) ; IMAGES (adresse
 * des images, par défaut SITE/emails) ; SORTIE (dossier de sortie, par défaut
 * marketing/emails/modeles). Les balises {{prenom}}, {{conseiller}}… sont à
 * relier aux champs de l'outil d'envoi (voir README.md).
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import {
  brochures,
  calendrier,
  contact,
  engagements,
  formatDecimal,
  formatEvolution,
  formatMois,
  formatPart,
  formatSurface,
  marche,
  programme,
  reservation,
  villasChiffres,
} from "../../src/config/citystar";

const SITE = process.env["SITE"] ?? "https://cleis69.github.io/marrakech-legacy";
const IMAGES = process.env["IMAGES"] ?? `${SITE}/emails`;
const SORTIE = process.env["SORTIE"] ?? join(import.meta.dir, "modeles");

/* Couleurs du site, converties de oklch en hexadécimal (les messageries ignorent oklch). */
const C = {
  papier: "#F6EFE3",
  creme: "#FDF8F0",
  encre: "#080503",
  encre2: "#15110C",
  bronze: "#8C6A48",
  bronzeTexte: "#836140",
  bronzeClair: "#A5815F",
  sable: "#D9C8AE",
  gris: "#60564D",
  grisClair: "#ACA397",
  filet: "#DFD6C9",
};
const SERIF = "'Italiana', Georgia, 'Times New Roman', serif";
const SANS = "'DM Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif";

/* ------------------------------------------------------------------ */
/* Chiffres du programme                                               */
/* ------------------------------------------------------------------ */

const livraison = formatMois(calendrier.livraison, "fr");
const surfaceMax = formatSurface(
  Math.max(...Object.values(villasChiffres).map((v) => v.surfaceConstruiteM2)),
);
const terrain = formatSurface(programme.terrainMaxM2);
const acompte = reservation.paliers.find((p) => p.etape === "reservation");
const partReservation = acompte?.part != null ? formatPart(acompte.part) : "";
const fondsPropres = formatPart(engagements.fondsPropres);
const { latitude, longitude } = programme.coordonnees;
const itineraire = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

/* ------------------------------------------------------------------ */
/* Liens                                                               */
/* ------------------------------------------------------------------ */

type Lien = { texte: string; href: string };

/** Adresse du site suivie dans les statistiques : chaque lien dit de quel e-mail il vient. */
function suivi(chemin: string, campagne: string, contenu: string) {
  const [base, ancre] = chemin.split("#");
  const sep = (base ?? "").includes("?") ? "&" : "?";
  const params = `utm_source=email&utm_medium=sequence&utm_campaign=${campagne}&utm_content=${contenu}`;
  return `${SITE}${base}${sep}${params}${ancre ? `#${ancre}` : ""}`;
}
const whatsapp = (message: string) =>
  `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
const pdf = (fichier: string) => `${SITE}/${fichier}`;
const image = (nom: string) => `${IMAGES}/${nom}.jpg`;

/* ------------------------------------------------------------------ */
/* Blocs                                                               */
/* ------------------------------------------------------------------ */

const p = (texte: string) =>
  `<p style="margin:0 0 16px;font:400 16px/1.65 ${SANS};color:${C.gris};">${texte}</p>`;

const kicker = (texte: string) =>
  `<p style="margin:0 0 14px;font:500 11px/1.4 ${SANS};letter-spacing:3px;text-transform:uppercase;color:${C.bronzeTexte};">${texte}</p>`;

const titre = (ligne1: string, ligne2?: string) =>
  `<h1 class="h1" style="margin:0 0 22px;font:400 38px/1.08 ${SERIF};color:${C.encre};">${ligne1}${
    ligne2 ? `<br><span style="color:${C.bronze};">${ligne2}</span>` : ""
  }</h1>`;

const sousTitre = (texte: string) =>
  `<h2 style="margin:28px 0 12px;font:400 26px/1.15 ${SERIF};color:${C.encre};">${texte}</h2>`;

const bouton = ({ texte, href }: Lien) => `
<table role="presentation" cellpadding="0" cellspacing="0" style="margin:26px 0 8px;"><tr>
  <td bgcolor="${C.encre}" style="border-radius:999px;">
    <a href="${href}" style="display:inline-block;padding:16px 30px;font:500 15px/1 ${SANS};color:${C.creme};text-decoration:none;border-radius:999px;">${texte}&nbsp;&nbsp;→</a>
  </td>
</tr></table>`;

const lienSecondaire = ({ texte, href }: Lien) =>
  `<p style="margin:10px 0 0;font:400 14px/1.5 ${SANS};"><a href="${href}" style="color:${C.bronzeTexte};text-decoration:underline;">${texte}</a></p>`;

const imagePleine = (nom: string, alt: string, legende?: string) => `
<tr><td style="padding:0;">
  <img src="${image(nom)}" width="600" alt="${alt}" style="display:block;width:100%;max-width:600px;height:auto;border:0;">
</td></tr>${
  legende
    ? `<tr><td class="px" style="padding:10px 44px 0;font:400 12px/1.4 ${SANS};color:${C.grisClair};">${legende}</td></tr>`
    : ""
}`;

const imageEncadree = (nom: string, alt: string, legende?: string) => `
<img src="${image(nom)}" width="512" alt="${alt}" style="display:block;width:100%;height:auto;margin:8px 0 ${legende ? "8" : "22"}px;border:0;border-radius:18px;">${
  legende
    ? `<p style="margin:0 0 22px;font:400 12px/1.4 ${SANS};color:${C.grisClair};">${legende}</p>`
    : ""
}`;

const coches = (elements: string[]) => `
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:4px 0 18px;">${elements
  .map(
    (e) => `<tr>
  <td width="26" valign="top" style="padding:6px 0;font:500 15px/1.5 ${SANS};color:${C.bronze};">✓</td>
  <td style="padding:6px 0;font:400 15px/1.5 ${SANS};color:${C.encre2};">${e}</td>
</tr>`,
  )
  .join("")}
</table>`;

/** Rangée de chiffres : le chiffre en grand, ce qu'il mesure en dessous. */
const chiffres = (faits: { valeur: string; label: string }[]) => `
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:8px 0 22px;border-top:1px solid ${C.filet};border-bottom:1px solid ${C.filet};"><tr>${faits
  .map(
    (f) => `<td class="demi" width="${Math.floor(100 / faits.length)}%" valign="top" style="padding:18px 6px 16px 0;">
    <p style="margin:0;font:400 28px/1 ${SERIF};color:${C.encre};">${f.valeur}</p>
    <p style="margin:6px 0 0;font:400 12px/1.35 ${SANS};color:${C.gris};">${f.label}</p>
  </td>`,
  )
  .join("")}
</tr></table>`;

/** Liste de téléchargements, chacun sur sa ligne avec son poids. */
const telechargements = (liens: { texte: string; href: string; poids: string }[]) => `
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:6px 0 20px;">${liens
  .map(
    (l) => `<tr><td style="padding:14px 0;border-top:1px solid ${C.filet};">
    <a href="${l.href}" style="font:500 15px/1.4 ${SANS};color:${C.encre};text-decoration:none;">↓&nbsp;&nbsp;${l.texte}</a>
    <span style="font:400 13px/1.4 ${SANS};color:${C.grisClair};">&nbsp;·&nbsp;PDF ${l.poids}</span>
  </td></tr>`,
  )
  .join("")}
</table>`;

/** Trois villas côte à côte (l'une sous l'autre sur téléphone). */
function troisVillas() {
  const villas = (["A", "B", "C"] as const).map((type) => {
    const v = villasChiffres[type];
    return `<td class="col" width="33%" valign="top" style="padding:0 6px 18px;">
      <img src="${image(`villa-${type.toLowerCase()}`)}" width="164" alt="Rendu de la villa ${type}" style="display:block;width:100%;height:auto;border:0;border-radius:14px;">
      <p style="margin:12px 0 4px;font:400 24px/1 ${SERIF};color:${C.encre};">Villa ${type}</p>
      <p style="margin:0;font:400 13px/1.5 ${SANS};color:${C.gris};">${formatSurface(v.surfaceConstruiteM2)} · ${v.suites} suites${
        v.accessiblePmr ? "<br>accessible de plain-pied" : ""
      }</p>
      <p style="margin:6px 0 0;font:400 13px/1.5 ${SANS};"><a href="${pdf(brochures[type].fichier)}" style="color:${C.bronzeTexte};">Plan PDF</a></p>
    </td>`;
  });
  return `<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:6px -6px 8px;"><tr>${villas.join("")}</tr></table>`;
}

/** Barres du marché : la part dessinée par une cellule colorée, lisible partout. */
function barresMarche() {
  const max = Math.max(...marche.transactions.map((t) => t.evolution));
  return `<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:8px 0 10px;">${marche.transactions
    .map((t) => {
      const largeur = Math.round((t.evolution / max) * 100);
      const ici = t.ville === "Marrakech";
      return `<tr><td style="padding:9px 0;">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%"><tr>
        <td style="font:${ici ? 500 : 400} 14px/1.3 ${SANS};color:${C.encre};">${t.ville}</td>
        <td align="right" style="font:400 ${ici ? 22 : 17}px/1 ${SERIF};color:${ici ? C.bronze : C.encre};">${formatEvolution(t.evolution)}</td>
      </tr></table>
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-top:7px;"><tr>
        <td width="${largeur}%" height="6" bgcolor="${ici ? C.bronze : C.sable}" style="font-size:0;line-height:0;border-radius:6px;">&nbsp;</td>
        <td width="${100 - largeur}%" height="6" style="font-size:0;line-height:0;">&nbsp;</td>
      </tr></table>
    </td></tr>`;
    })
    .join("")}
  </table>`;
}

/** Étapes numérotées, sur fond crème foncé. */
const etapes = (liste: { titre: string; texte: string }[]) => `
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" bgcolor="${C.papier}" style="margin:8px 0 22px;border-radius:18px;">
<tr><td style="padding:10px 22px;">${liste
  .map(
    (e, i) => `
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="${i ? `border-top:1px solid ${C.filet};` : ""}"><tr>
    <td width="44" valign="top" style="padding:16px 0;font:400 26px/1 ${SERIF};color:${C.bronze};">${String(i + 1).padStart(2, "0")}</td>
    <td valign="top" style="padding:16px 0;">
      <p style="margin:0 0 4px;font:500 15px/1.4 ${SANS};color:${C.encre};">${e.titre}</p>
      <p style="margin:0;font:400 14px/1.55 ${SANS};color:${C.gris};">${e.texte}</p>
    </td>
  </tr></table>`,
  )
  .join("")}
</td></tr></table>`;

/** Encadré sombre : une phrase à retenir. */
const encadre = (titreEncadre: string, texte: string) => `
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" bgcolor="${C.encre}" style="margin:10px 0 22px;border-radius:18px;"><tr><td style="padding:24px 26px;">
  <p style="margin:0 0 8px;font:400 24px/1.15 ${SERIF};color:${C.sable};">${titreEncadre}</p>
  <p style="margin:0;font:400 14px/1.6 ${SANS};color:${C.grisClair};">${texte}</p>
</td></tr></table>`;

const signature = `
<p style="margin:26px 0 0;font:400 16px/1.6 ${SANS};color:${C.encre2};">À très vite,</p>
<p style="margin:2px 0 0;font:400 24px/1.2 ${SERIF};color:${C.encre};">{{conseiller}}</p>
<p style="margin:2px 0 0;font:400 13px/1.5 ${SANS};color:${C.grisClair};">Conseiller CITYSTAR · <a href="https://wa.me/${contact.whatsapp}" style="color:${C.bronzeTexte};">WhatsApp</a> · <a href="tel:${contact.telephone}" style="color:${C.bronzeTexte};">${contact.telephoneAffiche}</a></p>`;

/* ------------------------------------------------------------------ */
/* Gabarit                                                             */
/* ------------------------------------------------------------------ */

type Email = {
  id: string;
  sequence: string;
  quand: string;
  declencheur: string;
  objet: string;
  preheader: string;
  hero?: { image: string; alt: string; legende?: string };
  corps: string;
  /** Message d'un conseiller, sans grande image ni mise en page : il doit se lire comme une lettre. */
  personnel?: boolean;
  raison: string;
};

function page(e: Email) {
  const espacement = "&#847;&zwnj;&nbsp;".repeat(60);
  const entete = `
<tr><td align="center" style="padding:6px 0 22px;">
  <a href="${suivi("/", e.sequence, e.id)}" style="text-decoration:none;">
    <span style="font:400 24px/1 ${SERIF};letter-spacing:9px;color:${C.encre};">CITYSTAR</span>
  </a>
  <p style="margin:8px 0 0;font:500 10px/1 ${SANS};letter-spacing:3px;text-transform:uppercase;color:${C.bronzeTexte};">Résidence privée · Marrakech</p>
</td></tr>`;

  const carte = `
<tr><td bgcolor="${C.creme}" style="border-radius:24px;overflow:hidden;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
    ${e.hero && !e.personnel ? imagePleine(e.hero.image, e.hero.alt, e.hero.legende) : ""}
    <tr><td class="px" style="padding:${e.personnel ? "40px" : "36px"} 44px 40px;">${e.corps}</td></tr>
  </table>
</td></tr>`;

  const pied = `
<tr><td style="padding:14px 0 0;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" bgcolor="${C.encre}" style="border-radius:24px;">
    <tr><td class="px" style="padding:30px 44px;">
      <p style="margin:0 0 6px;font:400 26px/1.1 ${SERIF};color:${C.creme};">Quatorze villas.<span style="color:${C.sable};"> Pas une de plus.</span></p>
      <p style="margin:0 0 18px;font:400 13px/1.6 ${SANS};color:${C.grisClair};">Oulad Hassoune, Marrakech · Livraison ${livraison}</p>
      <p style="margin:0;font:500 13px/2 ${SANS};">
        <a href="https://wa.me/${contact.whatsapp}" style="color:${C.sable};text-decoration:none;">WhatsApp</a>
        <span style="color:${C.gris};">&nbsp;·&nbsp;</span>
        <a href="tel:${contact.telephone}" style="color:${C.sable};text-decoration:none;">${contact.telephoneAffiche}</a>
        <span style="color:${C.gris};">&nbsp;·&nbsp;</span>
        <a href="${suivi("/", e.sequence, `${e.id}-pied`)}" style="color:${C.sable};text-decoration:none;">Le site</a>
        <span style="color:${C.gris};">&nbsp;·&nbsp;</span>
        <a href="${contact.reseaux.instagram}" style="color:${C.sable};text-decoration:none;">Instagram</a>
      </p>
    </td></tr>
  </table>
</td></tr>
<tr><td class="px" style="padding:20px 30px 10px;font:400 11px/1.6 ${SANS};color:${C.grisClair};text-align:center;">
  ${e.raison}<br>Rendus 3D non contractuels. <a href="{{desinscription}}" style="color:${C.grisClair};">Se désinscrire</a>
</td></tr>`;

  return `<!doctype html>
<html lang="fr" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${e.objet}</title>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=Italiana&display=swap" rel="stylesheet">
<style>
  body { margin: 0; padding: 0; background: ${C.papier}; -webkit-text-size-adjust: 100%; }
  table { border-collapse: collapse; }
  img { border: 0; display: block; }
  a { color: ${C.bronzeTexte}; }
  @media (max-width: 620px) {
    .px { padding-left: 24px !important; padding-right: 24px !important; }
    .h1 { font-size: 31px !important; }
    .col { display: block !important; width: 100% !important; padding-right: 0 !important; }
    .demi { display: inline-block !important; width: 50% !important; box-sizing: border-box; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:${C.papier};">
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${e.preheader}${espacement}</div>
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" bgcolor="${C.papier}">
<tr><td align="center" style="padding:28px 12px 30px;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="width:100%;max-width:600px;">
    ${entete}
    ${carte}
    ${pied}
  </table>
</td></tr>
</table>
</body>
</html>`;
}

/* ------------------------------------------------------------------ */
/* Les séquences                                                       */
/* ------------------------------------------------------------------ */

const RAISON_DOSSIER = "Vous recevez cet e-mail parce que vous avez demandé le dossier CITYSTAR.";
const RAISON_VISITE = "Vous recevez cet e-mail au sujet de votre rendez-vous CITYSTAR.";
const RAISON_PROPRIO = "Vous recevez cet e-mail en tant qu’acquéreur d’une villa CITYSTAR.";

const faitsDomaine = [
  { valeur: String(programme.nombreVillas), label: "villas privées" },
  { valeur: surfaceMax, label: "construits, au plus" },
  { valeur: terrain, label: "de terrain par villa" },
  { valeur: `${programme.trajetMaxMinutes} min`, label: "de Jemaa el-Fna" },
];

const S1 = "dossier";
const S2 = "visite";
const S3 = "proprietaire";
const S4 = "nouvelles";

const emails: Email[] = [
  /* --- Séquence 1 : après la demande de dossier --------------------- */
  {
    id: "d1-dossier",
    sequence: S1,
    quand: "Tout de suite",
    declencheur: "Demande de dossier (formulaire du site ou page /dossier)",
    objet: "Votre dossier CITYSTAR",
    preheader: "La brochure, les plans des trois villas, et la suite.",
    hero: { image: "hero", alt: "Une villa CITYSTAR au crépuscule, piscine éclairée", legende: "Rendu 3D, non contractuel." },
    raison: RAISON_DOSSIER,
    corps: [
      kicker("Votre dossier"),
      titre("Bienvenue à CITYSTAR,", "{{prenom}}."),
      p("Merci pour votre demande. Voici de quoi commencer dès maintenant : la brochure du domaine et les plans des trois villas."),
      telechargements([
        { texte: "Brochure du domaine", href: pdf(brochures.citystar.fichier), poids: `${formatDecimal(brochures.citystar.mo)} Mo` },
        { texte: "Plans de la villa A", href: pdf(brochures.A.fichier), poids: `${formatDecimal(brochures.A.mo)} Mo` },
        { texte: "Plans de la villa B", href: pdf(brochures.B.fichier), poids: `${formatDecimal(brochures.B.mo)} Mo` },
        { texte: "Plans de la villa C", href: pdf(brochures.C.fichier), poids: `${formatDecimal(brochures.C.mo)} Mo` },
      ]),
      p("Je vous transmets personnellement les prix villa par villa, les disponibilités et l’échéancier. Pour aller plus vite, dites-moi simplement ce que vous cherchez : l’architecture qui vous attire, votre calendrier, si vous achetez pour y vivre ou pour louer."),
      chiffres(faitsDomaine),
      bouton({ texte: "Me répondre sur WhatsApp", href: whatsapp("Bonjour, je viens de recevoir le dossier CITYSTAR. Je souhaite recevoir les prix et les disponibilités.") }),
      lienSecondaire({ texte: "Ou découvrir le domaine en ligne", href: suivi("/dossier", S1, "d1") }),
      signature,
    ].join(""),
  },
  {
    id: "d2-architectures",
    sequence: S1,
    quand: "J+1",
    declencheur: "Séquence dossier",
    objet: "A, B ou C ?",
    preheader: "Trois architectures, la même exigence. Laquelle vous ressemble ?",
    raison: RAISON_DOSSIER,
    corps: [
      kicker("Les villas"),
      titre("Trois architectures,", "une même exigence."),
      p(`Chaque villa est posée sur ${terrain} de terrain, avec sa piscine privée. Ce qui change : les volumes, le nombre de suites, la façon d’habiter la lumière.`),
      troisVillas(),
      p("Le comparateur du site les met côte à côte, et un questionnaire de quatre questions vous oriente vers celle qui vous correspond."),
      bouton({ texte: "Comparer les trois villas", href: suivi("/villas", S1, "d2") }),
      signature,
    ].join(""),
  },
  {
    id: "d3-visite-360",
    sequence: S1,
    quand: "J+3",
    declencheur: "Séquence dossier",
    objet: "Entrez avant qu’elle existe",
    preheader: "La visite 360°, pièce par pièce, depuis votre canapé.",
    hero: { image: "salon", alt: "Le salon d’une villa CITYSTAR", legende: "Rendu 3D, non contractuel." },
    raison: RAISON_DOSSIER,
    corps: [
      kicker("Visite 360°"),
      titre("Ne l’imaginez pas.", "Entrez."),
      p("Le salon, les suites, les terrasses, la piscine : la visite 360° vous fait passer d’une pièce à l’autre comme si vous y étiez. Sur ordinateur ou sur téléphone, en plein écran."),
      coches(["Toutes les pièces, à 360°", "Les vues depuis les terrasses", "Le jardin et la piscine privée"]),
      bouton({ texte: "Lancer la visite 360°", href: suivi("/#visite", S1, "d3") }),
      lienSecondaire({ texte: "Préférer une visite guidée en visio", href: whatsapp("Bonjour, je souhaite une visite guidée de CITYSTAR en visio.") }),
      signature,
    ].join(""),
  },
  {
    id: "d4-paiement",
    sequence: S1,
    quand: "J+5",
    declencheur: "Séquence dossier",
    objet: "Ce que vous payez, et quand",
    preheader: `${partReservation} chez le notaire, puis le solde au rythme du chantier.`,
    raison: RAISON_DOSSIER,
    corps: [
      kicker("Acheter sereinement"),
      titre("Ce que vous payez,", "et quand."),
      p("Acheter sur plan à l’étranger demande de la confiance. Voici comment se déroule une acquisition à CITYSTAR."),
      etapes([
        { titre: `${partReservation} à la réservation`, texte: "La réservation se signe directement chez le notaire, pas dans un bureau de vente." },
        { titre: "Le solde suit le chantier", texte: "Chaque appel de fonds correspond à une étape terminée : fondations, gros œuvre, finitions." },
        { titre: `La remise des clés, ${livraison}`, texte: "Le dernier versement à la livraison de votre villa." },
      ]),
      encadre(`${fondsPropres} fonds propres`, "Le promoteur finance le chantier sur ses propres fonds. Il accepte aussi les acquéreurs qui financent leur villa par crédit immobilier, et il a déjà livré des programmes à l’étranger."),
      p("Votre conseiller vous remet l’échéancier exact de la villa que vous choisissez."),
      bouton({ texte: "Recevoir l’échéancier de ma villa", href: whatsapp("Bonjour, je souhaite recevoir l’échéancier détaillé d’une villa CITYSTAR.") }),
      signature,
    ].join(""),
  },
  {
    id: "d5-marche",
    sequence: S1,
    quand: "J+8",
    declencheur: "Séquence dossier",
    objet: "Marrakech accélère",
    preheader: `${formatEvolution(marche.transactions[0]?.evolution ?? 0)} de transactions en ${marche.annee}, devant Rabat et Casablanca.`,
    hero: { image: "aerien", alt: "Vue aérienne d’une villa et de sa piscine", legende: "Rendu 3D, non contractuel." },
    raison: RAISON_DOSSIER,
    corps: [
      kicker("Investir"),
      titre("Marrakech", "accélère."),
      p(`En ${marche.annee}, les transactions immobilières ont progressé plus vite à Marrakech que dans les autres grandes villes du pays, pour des prix restés stables (${formatEvolution(marche.prixMarrakech)}).`),
      barresMarche(),
      `<p style="margin:0 0 22px;font:400 12px/1.5 ${SANS};color:${C.grisClair};">Évolution des transactions en ${marche.annee}, indice IPAI (Bank Al-Maghrib et ANCFCC). <a href="${marche.sourceUrl}" style="color:${C.grisClair};">Source</a></p>`,
      p(`La demande accélère ; à CITYSTAR, l’offre s’arrête à ${programme.nombreVillas} villas. Le simulateur du site calcule le rendement brut d’une location saisonnière à partir de vos propres hypothèses.`),
      bouton({ texte: "Simuler mon rendement", href: suivi("/investir#rentabilite", S1, "d5") }),
      signature,
    ].join(""),
  },
  {
    id: "d6-espace",
    sequence: S1,
    quand: "J+12",
    declencheur: "Séquence dossier",
    objet: "Votre chantier, depuis chez vous",
    preheader: "Avancement, photos, paiements, documents : tout dans votre espace propriétaire.",
    hero: { image: "chantier", alt: "Façade d’une villa CITYSTAR à lames verticales", legende: "Rendu 3D, non contractuel." },
    raison: RAISON_DOSSIER,
    corps: [
      kicker("Après la réservation"),
      titre("Votre chantier,", "suivi d’où vous vivez."),
      p("Acheter loin de chez soi pose toujours la même question : comment savoir où en est la construction ? À CITYSTAR, chaque acquéreur reçoit un accès personnel à son espace propriétaire."),
      coches([
        "<b>L’avancement</b> de votre villa, en pourcentage, avec le mot du promoteur",
        "<b>Les photos du chantier</b>, à chaque étape",
        "<b>Vos paiements</b> : ce qui est réglé, ce qui reste, la prochaine échéance",
        "<b>Vos documents</b> : contrat, plans, appels de fonds",
      ]),
      p("Pas de mot de passe : un lien de connexion arrive par e-mail, et vous êtes chez vous."),
      bouton({ texte: "Voir l’espace propriétaire", href: suivi("/dossier#espace-proprietaire", S1, "d6") }),
      signature,
    ].join(""),
  },
  {
    id: "d7-parcelles",
    sequence: S1,
    quand: "J+16",
    declencheur: "Séquence dossier",
    objet: `Quatorze parcelles`,
    preheader: "Les premiers acquéreurs choisissent l’emplacement.",
    raison: RAISON_DOSSIER,
    corps: [
      kicker("Le plan de masse"),
      titre("Quatorze parcelles.", "Les premiers choisissent."),
      imageEncadree("plan-de-masse", "Plan de masse du domaine CITYSTAR", "Plan de masse du domaine, non contractuel."),
      p("L’emplacement dans le domaine, l’orientation de la piscine, l’architecture A, B ou C : chaque réservation réduit le choix des suivants."),
      p("Si l’une des villas vous intéresse, demandez la liste des parcelles encore disponibles : vous saurez exactement ce qu’il reste à choisir."),
      bouton({ texte: "Demander les disponibilités", href: whatsapp("Bonjour, quelles villas CITYSTAR sont encore disponibles ?") }),
      signature,
    ].join(""),
  },
  {
    id: "d8-question",
    sequence: S1,
    quand: "J+21",
    declencheur: "Séquence dossier, sans réponse du contact",
    objet: "Une question, {{prenom}}",
    preheader: "Une réponse en un chiffre suffit.",
    personnel: true,
    raison: RAISON_DOSSIER,
    corps: [
      p("Bonjour {{prenom}},"),
      p("Vous avez reçu le dossier CITYSTAR il y a trois semaines, et je ne voudrais pas vous écrire pour rien. Où en est votre projet ?"),
      p("Répondez simplement à cet e-mail par un chiffre :"),
      `<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:4px 0 20px;">
        ${[
          ["1", "Je veux visiter, sur place ou en visio."],
          ["2", "J’ai des questions sur le financement ou l’achat depuis l’étranger."],
          ["3", "Ce n’est pas le moment : recontactez-moi plus tard."],
        ]
          .map(
            ([n, t]) => `<tr><td width="38" valign="top" style="padding:8px 0;font:400 26px/1 ${SERIF};color:${C.bronze};">${n}</td><td style="padding:10px 0;font:400 16px/1.5 ${SANS};color:${C.encre2};">${t}</td></tr>`,
          )
          .join("")}
      </table>`,
      p("Je vous réponds rapidement, et je respecterai votre choix."),
      signature,
    ].join(""),
  },

  /* --- Séquence 2 : rendez-vous et visite --------------------------- */
  {
    id: "v1-confirmation",
    sequence: S2,
    quand: "Tout de suite",
    declencheur: "Rendez-vous pris (visite sur place ou visio)",
    objet: "Votre visite de CITYSTAR, {{date_visite}}",
    preheader: "L’adresse, l’itinéraire et ce que nous verrons ensemble.",
    hero: { image: "entree", alt: "L’entrée du domaine CITYSTAR au crépuscule", legende: "Rendu 3D, non contractuel." },
    raison: RAISON_VISITE,
    corps: [
      kicker("Votre rendez-vous"),
      titre("À bientôt", "à CITYSTAR."),
      encadre("{{date_visite}} · {{heure_visite}}", "Oulad Hassoune, Marrakech. Votre conseiller vous attend à l’entrée du domaine."),
      p("Pendant la visite, nous verrons ensemble :"),
      coches(["Le domaine et l’emplacement des parcelles encore libres", "Les plans de la villa qui vous intéresse", "Le prix, l’échéancier et les étapes de l’achat"]),
      bouton({ texte: "Ouvrir l’itinéraire", href: itineraire }),
      lienSecondaire({ texte: "Un empêchement ? Prévenez-moi sur WhatsApp", href: whatsapp("Bonjour, je dois déplacer ma visite de CITYSTAR.") }),
      signature,
    ].join(""),
  },
  {
    id: "v2-rappel",
    sequence: S2,
    quand: "La veille, 18 h",
    declencheur: "Rendez-vous pris",
    objet: "À demain, {{prenom}}",
    preheader: `Rendez-vous {{heure_visite}}, à ${programme.trajetMaxMinutes} minutes de Jemaa el-Fna.`,
    personnel: true,
    raison: RAISON_VISITE,
    corps: [
      p("Bonjour {{prenom}},"),
      p("Je vous confirme notre rendez-vous de demain, {{heure_visite}}, au domaine CITYSTAR."),
      coches([
        `<a href="${itineraire}" style="color:${C.bronzeTexte};">L’itinéraire jusqu’au domaine</a>, à ${programme.trajetMaxMinutes} minutes de Jemaa el-Fna et de l’aéroport`,
        "Des chaussures confortables pour parcourir le domaine",
        "Vos questions : aucune n’est de trop",
      ]),
      p("Si vous êtes encore loin de Marrakech, la visite peut se faire en visio : dites-le-moi, je vous envoie le lien."),
      signature,
    ].join(""),
  },
  {
    id: "v3-apres",
    sequence: S2,
    quand: "Le lendemain de la visite",
    declencheur: "Visite effectuée",
    objet: "Merci pour votre visite",
    preheader: "Le récapitulatif, et les trois étapes jusqu’aux clés.",
    raison: RAISON_VISITE,
    corps: [
      kicker("Après votre visite"),
      titre("Merci pour", "votre visite."),
      p("C’était un plaisir de vous faire découvrir le domaine. Comme promis, voici la suite si l’une des villas vous a convaincu :"),
      etapes([
        { titre: "Vous choisissez votre villa", texte: "L’architecture, la parcelle, l’orientation. Je vous confirme sa disponibilité." },
        { titre: `Vous réservez chez le notaire`, texte: `${partReservation} du prix à la signature. Le crédit immobilier est accepté.` },
        { titre: "Vous suivez votre chantier", texte: `Depuis votre espace propriétaire, jusqu’à la remise des clés en ${livraison}.` },
      ]),
      bouton({ texte: "Réserver ma villa", href: whatsapp("Bonjour, je souhaite réserver une villa CITYSTAR.") }),
      lienSecondaire({ texte: "Revoir la visite 360°", href: suivi("/#visite", S2, "v3") }),
      signature,
    ].join(""),
  },

  /* --- Séquence 3 : nouvel acquéreur -------------------------------- */
  {
    id: "p1-bienvenue",
    sequence: S3,
    quand: "Le jour de la réservation",
    declencheur: "Réservation signée chez le notaire",
    objet: "Bienvenue chez vous, {{prenom}}",
    preheader: "Votre espace propriétaire est ouvert.",
    hero: { image: "terrasse", alt: "La terrasse d’une villa CITYSTAR", legende: "Rendu 3D, non contractuel." },
    raison: RAISON_PROPRIO,
    corps: [
      kicker("Villa {{villa}}"),
      titre("Bienvenue", "chez vous."),
      p("Félicitations, {{prenom}} : la villa {{villa}} est à vous. Votre espace propriétaire est ouvert dès aujourd’hui."),
      etapes([
        { titre: "Ouvrez votre espace", texte: "Cliquez sur le bouton ci-dessous et saisissez cette adresse e-mail : {{email}}." },
        { titre: "Recevez votre lien", texte: "Un lien de connexion arrive dans votre boîte. Pas de mot de passe à retenir." },
        { titre: "Suivez votre villa", texte: "Avancement, photos du chantier, paiements et documents." },
      ]),
      bouton({ texte: "Ouvrir mon espace", href: suivi("/mon-espace", S3, "p1") }),
      signature,
    ].join(""),
  },
  {
    id: "p2-suivi",
    sequence: S3,
    quand: "J+7",
    declencheur: "Séquence nouvel acquéreur",
    objet: "Comment suivre votre chantier",
    preheader: "Ce que vous trouverez dans votre espace, et quand.",
    raison: RAISON_PROPRIO,
    corps: [
      kicker("Votre espace propriétaire"),
      titre("Comment suivre", "votre chantier."),
      p("Votre villa entre dans sa phase de construction. Voici ce que vous trouverez dans votre espace, et à quel moment."),
      coches([
        "<b>À chaque étape terminée</b> : l’avancement mis à jour et les photos de votre villa",
        "<b>Avant chaque appel de fonds</b> : le montant, l’échéance, puis le reçu une fois réglé",
        "<b>À tout moment</b> : votre contrat, vos plans et vos documents, à télécharger",
      ]),
      encadre(`Livraison ${livraison}`, "Vous recevez un e-mail à chaque nouvelle étape du chantier. Votre conseiller reste joignable sur WhatsApp pour toute question."),
      bouton({ texte: "Ouvrir mon espace", href: suivi("/mon-espace", S3, "p2") }),
      signature,
    ].join(""),
  },
  {
    id: "p3-etape",
    sequence: S3,
    quand: "À chaque étape du chantier",
    declencheur: "Le promoteur publie une étape dans l’espace promoteur",
    objet: "Votre villa : {{etape}} terminée",
    preheader: "{{avancement}} % des travaux. Les nouvelles photos sont en ligne.",
    hero: { image: "chantier", alt: "Photo du chantier", legende: "Remplacez cette image par une photo du chantier." },
    raison: RAISON_PROPRIO,
    corps: [
      kicker("Nouvelles du chantier"),
      titre("{{etape}},", "c’est fait."),
      chiffres([
        { valeur: "{{avancement}} %", label: "des travaux" },
        { valeur: "{{prochaine_etape}}", label: "prochaine étape" },
        { valeur: livraison, label: "livraison" },
      ]),
      p("{{mot_du_promoteur}}"),
      p("Les nouvelles photos de votre villa sont dans votre espace, avec le prochain appel de fonds si cette étape en déclenche un."),
      bouton({ texte: "Voir les photos", href: suivi("/mon-espace", S3, "p3") }),
      signature,
    ].join(""),
  },

  /* --- Séquence 4 : relance des contacts qui n'ont pas encore choisi --- */
  {
    id: "n1-le-chantier-avance",
    sequence: S4,
    quand: "À chaque grande étape (fondations, gros œuvre, finitions)",
    declencheur: "Contacts « dossier » sans réservation, après la séquence 1",
    objet: "Le chantier avance",
    preheader: "Des nouvelles du domaine, et les villas qui restent.",
    hero: { image: "chantier", alt: "Photo du chantier", legende: "Remplacez cette image par une photo du chantier." },
    raison: RAISON_DOSSIER,
    corps: [
      kicker("Nouvelles du domaine"),
      titre("Le chantier", "avance."),
      p("Depuis votre demande de dossier, CITYSTAR a franchi une étape : {{etape}}. Les villas prennent forme, et la livraison reste prévue pour " + livraison + "."),
      chiffres([
        { valeur: "{{villas_restantes}}", label: `villas encore libres sur ${programme.nombreVillas}` },
        { valeur: livraison, label: "livraison" },
        { valeur: partReservation, label: "à la réservation" },
      ]),
      p("Si votre projet est toujours d’actualité, c’est le bon moment pour choisir votre parcelle avant les suivants."),
      bouton({ texte: "Recevoir les disponibilités", href: whatsapp("Bonjour, je souhaite connaître les villas CITYSTAR encore disponibles.") }),
      lienSecondaire({ texte: "Revoir le domaine en ligne", href: suivi("/dossier", S4, "n1") }),
      signature,
    ].join(""),
  },
];

/* ------------------------------------------------------------------ */
/* Écriture                                                            */
/* ------------------------------------------------------------------ */

const NOMS: Record<string, string> = {
  [S1]: "1. Après la demande de dossier",
  [S2]: "2. Rendez-vous et visite",
  [S3]: "3. Nouvel acquéreur",
  [S4]: "4. Relance « le chantier avance »",
};

mkdirSync(SORTIE, { recursive: true });
for (const e of emails) writeFileSync(join(SORTIE, `${e.id}.html`), page(e));

const sommaire = Object.entries(NOMS)
  .map(([sequence, nom]) => {
    const lignes = emails
      .filter((e) => e.sequence === sequence)
      .map(
        (e) => `<tr>
          <td>${e.quand}</td>
          <td><b>${e.objet}</b><br><small>${e.preheader}</small></td>
          <td><small>${e.declencheur}</small></td>
          <td><a href="${e.id}.html">${e.id}.html</a></td>
        </tr>`,
      )
      .join("");
    return `<h2>${nom}</h2><table><thead><tr><th>Quand</th><th>Objet · aperçu</th><th>Déclencheur</th><th>Modèle</th></tr></thead><tbody>${lignes}</tbody></table>`;
  })
  .join("");

writeFileSync(
  join(SORTIE, "index.html"),
  `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Séquences e-mail CITYSTAR</title>
<style>
  body { margin: 0; padding: 40px 16px; background: ${C.papier}; color: ${C.encre}; font: 15px/1.5 ${SANS}; }
  main { max-width: 1000px; margin: 0 auto; }
  h1 { font: 400 44px/1.05 ${SERIF}; margin: 0 0 8px; }
  h2 { font: 400 28px/1.1 ${SERIF}; margin: 40px 0 12px; }
  table { width: 100%; border-collapse: collapse; background: ${C.creme}; border-radius: 16px; overflow: hidden; }
  th, td { padding: 12px 14px; border-bottom: 1px solid ${C.filet}; text-align: left; vertical-align: top; }
  th { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: ${C.bronzeTexte}; }
  small { color: ${C.gris}; }
  a { color: ${C.bronzeTexte}; }
</style></head><body><main>
<h1>Séquences e-mail CITYSTAR</h1>
<p>${emails.length} modèles, ${Object.keys(NOMS).length} séquences. Chiffres repris de la configuration du site.</p>
${sommaire}
</main></body></html>`,
);

console.log(`${emails.length} modèles écrits dans ${SORTIE}`);
