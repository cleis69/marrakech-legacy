/**
 * Séquences e-mail CITYSTAR, prêtes pour HubSpot : génère un modèle HTML par
 * e-mail et par langue, et la page d'ensemble, à partir des chiffres du site
 * (src/config/citystar.ts) et des textes de marketing/emails/textes/.
 *
 *   bun marketing/emails/generer.ts
 *
 * Variables : SITE (adresse publique du site, sans « / » final) ; IMAGES (adresse
 * des images, par défaut SITE/emails) ; SORTIE (dossier de sortie, par défaut
 * marketing/emails/modeles).
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import { chemin, slug } from "../../src/components/citystar/adresses";
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
  type Langue,
  LANGUES,
  marche,
  programme,
  reservation,
  villasChiffres,
} from "../../src/config/citystar";
import en from "./textes/en";
import es from "./textes/es";
import fr, { type Copie } from "./textes/fr";
import it from "./textes/it";
import nl from "./textes/nl";
import no from "./textes/no";

const COPIES: Record<Langue, Copie> = { fr, en, es, it, nl, no };

const SITE = process.env["SITE"] ?? "https://cleis69.github.io/marrakech-legacy";
const IMAGES = process.env["IMAGES"] ?? `${SITE}/emails`;
const SORTIE = process.env["SORTIE"] ?? join(import.meta.dir, "modeles");
/** Lien de prise de rendez-vous (page de réunion HubSpot, par exemple) ; à défaut, WhatsApp avec un message prérempli. */
const RDV = process.env["RDV"];

/* Couleurs du site, converties de oklch en hexadécimal (les messageries ignorent oklch). */
const C = {
  papier: "#F6EFE3",
  creme: "#FDF8F0",
  encre: "#080503",
  encre2: "#15110C",
  bronze: "#8C6A48",
  bronzeTexte: "#836140",
  sable: "#D9C8AE",
  gris: "#60564D",
  grisClair: "#ACA397",
  filet: "#DFD6C9",
  surligne: "#FFF0B8",
};
const SERIF = "'Italiana', Georgia, 'Times New Roman', serif";
const SANS = "'DM Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif";

/* ------------------------------------------------------------------ */
/* Balises HubSpot                                                     */
/* ------------------------------------------------------------------ */

/**
 * Les balises des textes deviennent du HubL : le prénom n'apparaît (avec sa
 * ponctuation) que s'il est connu ; les champs à compléter sont surlignés.
 */
function hubspot(texte: string) {
  return texte
    .replace(
      /\[\[([^\]]*?)prenom\]\]/g,
      (_, avant: string) => `{% if contact.firstname %}${avant}{{ contact.firstname }}{% endif %}`,
    )
    .replace(/\[\[villa\]\]/g, "{{ contact.villa_citystar }}")
    .replace(/\[\[email\]\]/g, "{{ contact.email }}")
    .replace(/\[\[date\]\]/g, "{{ contact.date_visite }}")
    .replace(/\[\[heure\]\]/g, "{{ contact.heure_visite }}")
    .replace(
      /\[\[edit:([^\]]+)\]\]/g,
      (_, champ: string) => `<span style="background:${C.surligne};">[${champ}]</span>`,
    );
}

/** Version lisible des balises, pour la page d'ensemble et le titre du document. */
const lisible = (texte: string) =>
  texte
    .replace(/\[\[([^\]]*?)prenom\]\]/g, "$1{prénom}")
    .replace(/\[\[edit:([^\]]+)\]\]/g, "[$1]")
    .replace(/\[\[(\w+)\]\]/g, "{$1}");

/* ------------------------------------------------------------------ */
/* Liens                                                               */
/* ------------------------------------------------------------------ */

type Lien = { texte: string; href: string };

/** Adresse du site suivie dans les statistiques : chaque lien dit de quel e-mail il vient. */
function suivi(chemin: string, campagne: string, contenu: string) {
  const [base = "", ancre] = chemin.split("#");
  const sep = base.includes("?") ? "&" : "?";
  const params = `utm_source=hubspot&utm_medium=email&utm_campaign=${campagne}&utm_content=${contenu}`;
  return `${SITE}${base}${sep}${params}${ancre ? `#${ancre}` : ""}`;
}
const page = (langue: Langue, cle = "") => chemin(langue, cle ? slug(cle, langue) : "");
const whatsapp = (message: string) =>
  `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
const pdf = (fichier: string) => `${SITE}/${fichier}`;
const image = (nom: string) => `${IMAGES}/${nom}.jpg`;
const { latitude, longitude } = programme.coordonnees;
const itineraire = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

/* ------------------------------------------------------------------ */
/* Blocs                                                               */
/* ------------------------------------------------------------------ */

const p = (texte: string) =>
  `<p style="margin:0 0 16px;font:400 16px/1.65 ${SANS};color:${C.gris};">${texte}</p>`;

const kicker = (texte: string) =>
  `<p style="margin:0 0 14px;font:500 11px/1.4 ${SANS};letter-spacing:3px;text-transform:uppercase;color:${C.bronzeTexte};">${texte}</p>`;

const titre = ([ligne1, ligne2]: [string, string]) =>
  `<h1 class="h1" style="margin:0 0 22px;font:400 38px/1.08 ${SERIF};color:${C.encre};">${ligne1}<br><span style="color:${C.bronze};">${ligne2}</span></h1>`;

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

const imageEncadree = (nom: string, alt: string, legende: string) => `
<img src="${image(nom)}" width="512" alt="${alt}" style="display:block;width:100%;height:auto;margin:8px 0 8px;border:0;border-radius:18px;">
<p style="margin:0 0 22px;font:400 12px/1.4 ${SANS};color:${C.grisClair};">${legende}</p>`;

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

/** Rangée de chiffres : le chiffre en grand, ce qu'il mesure en dessous (deux par ligne sur téléphone). */
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

function troisVillas(c: Copie, langue: Langue) {
  const villas = (["A", "B", "C"] as const).map((type) => {
    const v = villasChiffres[type];
    return `<td class="col" width="33%" valign="top" style="padding:0 6px 18px;">
      <img src="${image(`villa-${type.toLowerCase()}`)}" width="164" alt="${c.d2.altVilla(type)}" style="display:block;width:100%;height:auto;border:0;border-radius:14px;">
      <p style="margin:12px 0 4px;font:400 24px/1 ${SERIF};color:${C.encre};">Villa ${type}</p>
      <p style="margin:0;font:400 13px/1.5 ${SANS};color:${C.gris};">${formatSurface(v.surfaceConstruiteM2, langue)} · ${c.suites(v.suites)}${
        v.accessiblePmr ? `<br>${c.plainPied}` : ""
      }</p>
      <p style="margin:6px 0 0;font:400 13px/1.5 ${SANS};"><a href="${pdf(brochures[type].fichier)}" style="color:${C.bronzeTexte};">${c.planPdf}</a></p>
    </td>`;
  });
  return `<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:6px -6px 8px;"><tr>${villas.join("")}</tr></table>`;
}

function barresMarche(langue: Langue) {
  const max = Math.max(...marche.transactions.map((t) => t.evolution));
  return `<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:8px 0 10px;">${marche.transactions
    .map((t) => {
      const largeur = Math.round((t.evolution / max) * 100);
      const ici = t.ville === "Marrakech";
      return `<tr><td style="padding:9px 0;">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%"><tr>
        <td style="font:${ici ? 500 : 400} 14px/1.3 ${SANS};color:${C.encre};">${t.ville}</td>
        <td align="right" style="font:400 ${ici ? 22 : 17}px/1 ${SERIF};color:${ici ? C.bronze : C.encre};">${formatEvolution(t.evolution, langue)}</td>
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

const encadre = ({ titre: t, texte }: { titre: string; texte: string }) => `
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" bgcolor="${C.encre}" style="margin:10px 0 22px;border-radius:18px;"><tr><td style="padding:24px 26px;">
  <p style="margin:0 0 8px;font:400 24px/1.15 ${SERIF};color:${C.sable};">${t}</p>
  <p style="margin:0;font:400 14px/1.6 ${SANS};color:${C.grisClair};">${texte}</p>
</td></tr></table>`;

const choixNumerotes = (choix: string[]) => `
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:4px 0 20px;">${choix
  .map(
    (t, i) => `<tr><td width="38" valign="top" style="padding:8px 0;font:400 26px/1 ${SERIF};color:${C.bronze};">${i + 1}</td><td style="padding:10px 0;font:400 16px/1.5 ${SANS};color:${C.encre2};">${t}</td></tr>`,
  )
  .join("")}
</table>`;

type Variante = "visite" | "avant" | "apres" | "proprio";

/**
 * Bloc conseiller, présent dans chaque e-mail : deux actions pour parler à
 * quelqu'un. Prospects : organiser une visite ou parler à un conseiller ;
 * visite prévue ou acquéreurs : écrire à son conseiller ou l'appeler.
 */
function blocConseiller(c: Copie, variante: Variante) {
  const b = c.contact[variante];
  const visite = RDV ?? whatsapp(c.contact.messages.visite);
  const principal =
    variante === "visite" || variante === "apres"
      ? visite
      : whatsapp(variante === "proprio" ? c.contact.messages.proprio : c.contact.messages.conseiller);
  const secondaire =
    variante === "visite" || variante === "apres"
      ? whatsapp(c.contact.messages.conseiller)
      : `tel:${contact.telephone}`;
  const pied =
    variante === "visite" || variante === "apres"
      ? `<p style="margin:16px 0 0;font:400 13px/1.5 ${SANS};color:${C.grisClair};">${c.contact.telephone(`<a href="tel:${contact.telephone}" style="color:${C.sable};text-decoration:none;">${contact.telephoneAffiche}</a>`)}</p>`
      : "";
  return `
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" bgcolor="${C.encre}" style="margin:30px 0 4px;border-radius:20px;"><tr><td style="padding:28px 28px 26px;">
  <p style="margin:0 0 10px;font:500 10px/1.4 ${SANS};letter-spacing:3px;text-transform:uppercase;color:${C.sable};">${b.kicker}</p>
  <p style="margin:0 0 8px;font:400 28px/1.1 ${SERIF};color:${C.creme};">${b.titre}</p>
  <p style="margin:0 0 20px;font:400 14px/1.6 ${SANS};color:${C.grisClair};">${b.texte}</p>
  <table role="presentation" cellpadding="0" cellspacing="0"><tr>
    <td class="col" style="padding:0 10px 10px 0;">
      <table role="presentation" cellpadding="0" cellspacing="0"><tr><td bgcolor="${C.sable}" style="border-radius:999px;">
        <a href="${principal}" style="display:inline-block;padding:14px 24px;font:500 14px/1 ${SANS};color:${C.encre};text-decoration:none;border-radius:999px;">${b.principal}&nbsp;&nbsp;→</a>
      </td></tr></table>
    </td>
    <td class="col" style="padding:0 0 10px;">
      <table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="border-radius:999px;">
        <a href="${secondaire}" style="display:inline-block;padding:13px 22px;font:500 14px/1 ${SANS};color:${C.creme};text-decoration:none;border:1px solid ${C.gris};border-radius:999px;">${b.secondaire}</a>
      </td></tr></table>
    </td>
  </tr></table>${pied}
</td></tr></table>`;
}

/** Signature : le propriétaire du contact dans HubSpot, ou l'équipe s'il n'y en a pas. */
const signature = (c: Copie) => `
<p style="margin:26px 0 0;font:400 16px/1.6 ${SANS};color:${C.encre2};">${c.signature.salut}</p>
<p style="margin:2px 0 0;font:400 24px/1.2 ${SERIF};color:${C.encre};">{% if owner.firstname %}{{ owner.firstname }} {{ owner.lastname }}{% else %}${c.signature.equipe}{% endif %}</p>
<p style="margin:2px 0 0;font:400 13px/1.5 ${SANS};color:${C.grisClair};">${c.signature.role} · <a href="https://wa.me/${contact.whatsapp}" style="color:${C.bronzeTexte};">WhatsApp</a> · <a href="tel:${contact.telephone}" style="color:${C.bronzeTexte};">${contact.telephoneAffiche}</a></p>`;

/* ------------------------------------------------------------------ */
/* Gabarit                                                             */
/* ------------------------------------------------------------------ */

type Sequence = "dossier" | "visite" | "proprietaire" | "nouvelles";

type Email = {
  id: string;
  sequence: Sequence;
  objet: string;
  preheader: string;
  hero?: { image: string; alt: string; legende?: string };
  corps: string;
  raison: string;
};

function document(e: Email, langue: Langue, c: Copie) {
  const espacement = "&#847;&zwnj;&nbsp;".repeat(60);
  const accueil = suivi(page(langue), e.sequence, `${e.id}-${langue}`);
  const contenu = `<!--
  templateType: email
  isAvailableForNewContent: true
  label: CITYSTAR ${langue.toUpperCase()} · ${e.id}
-->
<!doctype html>
<html lang="${langue === "no" ? "nb" : langue}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${lisible(e.objet)}</title>
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
    <tr><td align="center" style="padding:6px 0 22px;">
      <a href="${accueil}" style="text-decoration:none;"><span style="font:400 24px/1 ${SERIF};letter-spacing:9px;color:${C.encre};">CITYSTAR</span></a>
      <p style="margin:8px 0 0;font:500 10px/1 ${SANS};letter-spacing:3px;text-transform:uppercase;color:${C.bronzeTexte};">${c.lieu}</p>
    </td></tr>
    <tr><td bgcolor="${C.creme}" style="border-radius:24px;overflow:hidden;">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
        ${e.hero ? imagePleine(e.hero.image, e.hero.alt, e.hero.legende) : ""}
        <tr><td class="px" style="padding:${e.hero ? 36 : 40}px 44px 40px;">${e.corps}</td></tr>
      </table>
    </td></tr>
    <tr><td style="padding:14px 0 0;">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" bgcolor="${C.encre}" style="border-radius:24px;">
        <tr><td class="px" style="padding:30px 44px;">
          <p style="margin:0 0 6px;font:400 26px/1.1 ${SERIF};color:${C.creme};">${c.pied.accroche[0]}<span style="color:${C.sable};">${c.pied.accroche[1]}</span></p>
          <p style="margin:0 0 18px;font:400 13px/1.6 ${SANS};color:${C.grisClair};">${c.pied.lieu(formatMois(calendrier.livraison, langue))}</p>
          <p style="margin:0;font:500 13px/2 ${SANS};">
            <a href="https://wa.me/${contact.whatsapp}" style="color:${C.sable};text-decoration:none;">WhatsApp</a>
            <span style="color:${C.gris};">&nbsp;·&nbsp;</span>
            <a href="tel:${contact.telephone}" style="color:${C.sable};text-decoration:none;">${contact.telephoneAffiche}</a>
            <span style="color:${C.gris};">&nbsp;·&nbsp;</span>
            <a href="${suivi(page(langue), e.sequence, `${e.id}-${langue}-pied`)}" style="color:${C.sable};text-decoration:none;">${c.pied.site}</a>
            <span style="color:${C.gris};">&nbsp;·&nbsp;</span>
            <a href="${contact.reseaux.instagram}" style="color:${C.sable};text-decoration:none;">Instagram</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
    <tr><td class="px" style="padding:20px 30px 10px;font:400 11px/1.6 ${SANS};color:${C.grisClair};text-align:center;">
      ${e.raison} ${c.legal.rendus}<br>
      {{ site_settings.company_name }} · {{ site_settings.company_street_address_1 }} · {{ site_settings.company_city }} · {{ site_settings.company_country }}<br>
      <a href="{{ unsubscribe_link }}" style="color:${C.grisClair};">${c.legal.desinscrire}</a>
    </td></tr>
  </table>
</td></tr>
</table>
</body>
</html>`;
  return hubspot(contenu);
}

/* ------------------------------------------------------------------ */
/* Les quinze e-mails                                                  */
/* ------------------------------------------------------------------ */

function emails(langue: Langue): Email[] {
  const c = COPIES[langue];
  const livraison = formatMois(calendrier.livraison, langue);
  const terrain = formatSurface(programme.terrainMaxM2, langue);
  const surfaceMax = formatSurface(
    Math.max(...Object.values(villasChiffres).map((v) => v.surfaceConstruiteM2)),
    langue,
  );
  const acompte = reservation.paliers.find((palier) => palier.etape === "reservation");
  const part = acompte?.part != null ? formatPart(acompte.part, langue) : "";
  const fondsPropres = formatPart(engagements.fondsPropres, langue);
  const minutes = programme.trajetMaxMinutes;
  const signer = signature(c);
  const lien = (cle: string, campagne: Sequence, id: string, ancre = "") =>
    suivi(`${page(langue, cle)}${ancre}`, campagne, `${id}-${langue}`);
  const faitsDomaine = [
    { valeur: String(programme.nombreVillas), label: c.faits.villas },
    { valeur: surfaceMax, label: c.faits.construits },
    { valeur: terrain, label: c.faits.terrain },
    { valeur: `${minutes} min`, label: c.faits.trajet },
  ];
  const poids = (mo: number) => c.poids(formatDecimal(mo, langue));

  return [
    {
      id: "d1-dossier",
      sequence: "dossier",
      objet: c.d1.objet,
      preheader: c.d1.preheader,
      hero: { image: "hero", alt: c.d1.alt, legende: c.rendu },
      raison: c.raisons.dossier,
      corps: [
        kicker(c.d1.kicker),
        titre(c.d1.titre),
        p(c.d1.intro),
        telechargements([
          { texte: c.d1.brochure, href: pdf(brochures.citystar.fichier), poids: poids(brochures.citystar.mo) },
          ...(["A", "B", "C"] as const).map((type) => ({
            texte: c.d1.planVilla(type),
            href: pdf(brochures[type].fichier),
            poids: poids(brochures[type].mo),
          })),
        ]),
        p(c.d1.texte),
        chiffres(faitsDomaine),
        bouton({ texte: c.d1.bouton, href: lien("dossier", "dossier", "d1") }),
        blocConseiller(c, "visite"),
        signer,
      ].join(""),
    },
    {
      id: "d2-architectures",
      sequence: "dossier",
      objet: c.d2.objet,
      preheader: c.d2.preheader,
      raison: c.raisons.dossier,
      corps: [
        kicker(c.d2.kicker),
        titre(c.d2.titre),
        p(c.d2.intro(terrain)),
        troisVillas(c, langue),
        p(c.d2.texte),
        bouton({ texte: c.d2.bouton, href: lien("villas", "dossier", "d2") }),
        blocConseiller(c, "visite"),
        signer,
      ].join(""),
    },
    {
      id: "d3-visite-360",
      sequence: "dossier",
      objet: c.d3.objet,
      preheader: c.d3.preheader,
      hero: { image: "salon", alt: c.d3.alt, legende: c.rendu },
      raison: c.raisons.dossier,
      corps: [
        kicker(c.d3.kicker),
        titre(c.d3.titre),
        p(c.d3.intro),
        coches(c.d3.points),
        bouton({ texte: c.d3.bouton, href: lien("", "dossier", "d3", "#visite") }),
        lienSecondaire({ texte: c.d3.secondaire, href: whatsapp(c.d3.whatsapp) }),
        blocConseiller(c, "visite"),
        signer,
      ].join(""),
    },
    {
      id: "d4-paiement",
      sequence: "dossier",
      objet: c.d4.objet,
      preheader: c.d4.preheader(part),
      raison: c.raisons.dossier,
      corps: [
        kicker(c.d4.kicker),
        titre(c.d4.titre),
        p(c.d4.intro),
        etapes(c.d4.etapes(part, livraison)),
        encadre(c.d4.encadre(fondsPropres)),
        p(c.d4.texte),
        bouton({ texte: c.d4.bouton, href: whatsapp(c.d4.whatsapp) }),
        blocConseiller(c, "visite"),
        signer,
      ].join(""),
    },
    {
      id: "d5-marche",
      sequence: "dossier",
      objet: c.d5.objet,
      preheader: c.d5.preheader(
        formatEvolution(marche.transactions[0]?.evolution ?? 0, langue),
        marche.annee,
      ),
      hero: { image: "aerien", alt: c.d5.alt, legende: c.rendu },
      raison: c.raisons.dossier,
      corps: [
        kicker(c.d5.kicker),
        titre(c.d5.titre),
        p(c.d5.intro(marche.annee, formatEvolution(marche.prixMarrakech, langue))),
        barresMarche(langue),
        `<p style="margin:0 0 22px;font:400 12px/1.5 ${SANS};color:${C.grisClair};">${c.d5.legende(marche.annee)} <a href="${marche.sourceUrl}" style="color:${C.grisClair};">${c.source}</a></p>`,
        p(c.d5.texte(programme.nombreVillas)),
        bouton({ texte: c.d5.bouton, href: lien("investir", "dossier", "d5", "#rentabilite") }),
        blocConseiller(c, "visite"),
        signer,
      ].join(""),
    },
    {
      id: "d6-espace",
      sequence: "dossier",
      objet: c.d6.objet,
      preheader: c.d6.preheader,
      hero: { image: "chantier", alt: c.d6.alt, legende: c.rendu },
      raison: c.raisons.dossier,
      corps: [
        kicker(c.d6.kicker),
        titre(c.d6.titre),
        p(c.d6.intro),
        coches(c.d6.points),
        p(c.d6.texte),
        bouton({ texte: c.d6.bouton, href: lien("dossier", "dossier", "d6", "#espace-proprietaire") }),
        blocConseiller(c, "visite"),
        signer,
      ].join(""),
    },
    {
      id: "d7-parcelles",
      sequence: "dossier",
      objet: c.d7.objet,
      preheader: c.d7.preheader,
      raison: c.raisons.dossier,
      corps: [
        kicker(c.d7.kicker),
        titre(c.d7.titre),
        imageEncadree("plan-de-masse", c.d7.alt, c.d7.legende),
        p(c.d7.texte),
        p(c.d7.texte2),
        bouton({ texte: c.d7.bouton, href: whatsapp(c.d7.whatsapp) }),
        blocConseiller(c, "visite"),
        signer,
      ].join(""),
    },
    {
      id: "d8-question",
      sequence: "dossier",
      objet: c.d8.objet,
      preheader: c.d8.preheader,
      raison: c.raisons.dossier,
      corps: [
        p(c.d8.bonjour),
        p(c.d8.texte),
        p(c.d8.consigne),
        choixNumerotes(c.d8.choix),
        p(c.d8.fin),
        blocConseiller(c, "visite"),
        signer,
      ].join(""),
    },
    {
      id: "v1-confirmation",
      sequence: "visite",
      objet: c.v1.objet,
      preheader: c.v1.preheader,
      hero: { image: "entree", alt: c.v1.alt, legende: c.rendu },
      raison: c.raisons.visite,
      corps: [
        kicker(c.v1.kicker),
        titre(c.v1.titre),
        encadre({ titre: "[[date]] · [[heure]]", texte: c.v1.lieu }),
        p(c.v1.intro),
        coches(c.v1.points),
        bouton({ texte: c.v1.bouton, href: itineraire }),
        lienSecondaire({ texte: c.v1.secondaire, href: whatsapp(c.v1.whatsapp) }),
        blocConseiller(c, "avant"),
        signer,
      ].join(""),
    },
    {
      id: "v2-rappel",
      sequence: "visite",
      objet: c.v2.objet,
      preheader: c.v2.preheader(minutes),
      raison: c.raisons.visite,
      corps: [
        p(c.v2.bonjour),
        p(c.v2.texte),
        coches([
          `<a href="${itineraire}" style="color:${C.bronzeTexte};">${c.v2.itineraire}</a>${c.v2.distance(minutes)}`,
          ...c.v2.points,
        ]),
        p(c.v2.visio),
        blocConseiller(c, "avant"),
        signer,
      ].join(""),
    },
    {
      id: "v3-apres",
      sequence: "visite",
      objet: c.v3.objet,
      preheader: c.v3.preheader,
      raison: c.raisons.visite,
      corps: [
        kicker(c.v3.kicker),
        titre(c.v3.titre),
        p(c.v3.intro),
        etapes(c.v3.etapes(part, livraison)),
        bouton({ texte: c.v3.bouton, href: whatsapp(c.v3.whatsapp) }),
        lienSecondaire({ texte: c.v3.secondaire, href: lien("", "visite", "v3", "#visite") }),
        blocConseiller(c, "apres"),
        signer,
      ].join(""),
    },
    {
      id: "p1-bienvenue",
      sequence: "proprietaire",
      objet: c.p1.objet,
      preheader: c.p1.preheader,
      hero: { image: "terrasse", alt: c.p1.alt, legende: c.rendu },
      raison: c.raisons.proprio,
      corps: [
        kicker(c.p1.kicker),
        titre(c.p1.titre),
        p(c.p1.intro),
        etapes(c.p1.etapes),
        bouton({ texte: c.p1.bouton, href: lien("mon-espace", "proprietaire", "p1") }),
        blocConseiller(c, "proprio"),
        signer,
      ].join(""),
    },
    {
      id: "p2-suivi",
      sequence: "proprietaire",
      objet: c.p2.objet,
      preheader: c.p2.preheader,
      raison: c.raisons.proprio,
      corps: [
        kicker(c.p2.kicker),
        titre(c.p2.titre),
        p(c.p2.intro),
        coches(c.p2.points),
        encadre(c.p2.encadre(livraison)),
        bouton({ texte: c.p2.bouton, href: lien("mon-espace", "proprietaire", "p2") }),
        blocConseiller(c, "proprio"),
        signer,
      ].join(""),
    },
    {
      id: "p3-etape",
      sequence: "proprietaire",
      objet: c.p3.objet,
      preheader: c.p3.preheader,
      hero: { image: "chantier", alt: c.p3.alt, legende: c.p3.legende },
      raison: c.raisons.proprio,
      corps: [
        kicker(c.p3.kicker),
        titre(c.p3.titre),
        chiffres([
          { valeur: c.p3.avancement, label: c.p3.faits.avancement },
          { valeur: c.p3.prochaine, label: c.p3.faits.prochaine },
          { valeur: livraison, label: c.p3.faits.livraison },
        ]),
        p(c.p3.mot),
        p(c.p3.texte),
        bouton({ texte: c.p3.bouton, href: lien("mon-espace", "proprietaire", "p3") }),
        blocConseiller(c, "proprio"),
        signer,
      ].join(""),
    },
    {
      id: "n1-le-chantier-avance",
      sequence: "nouvelles",
      objet: c.n1.objet,
      preheader: c.n1.preheader,
      hero: { image: "chantier", alt: c.n1.alt, legende: c.n1.legende },
      raison: c.raisons.dossier,
      corps: [
        kicker(c.n1.kicker),
        titre(c.n1.titre),
        p(c.n1.intro(livraison)),
        chiffres([
          { valeur: c.n1.restantes, label: c.n1.faits.restantes(programme.nombreVillas) },
          { valeur: livraison, label: c.n1.faits.livraison },
          { valeur: part, label: c.n1.faits.reservation },
        ]),
        p(c.n1.texte),
        bouton({ texte: c.n1.bouton, href: whatsapp(c.n1.whatsapp) }),
        lienSecondaire({ texte: c.n1.secondaire, href: lien("dossier", "nouvelles", "n1") }),
        blocConseiller(c, "visite"),
        signer,
      ].join(""),
    },
  ];
}

/* ------------------------------------------------------------------ */
/* Écriture                                                            */
/* ------------------------------------------------------------------ */

const CALENDRIER: Record<string, { quand: string; declencheur: string }> = {
  "d1-dossier": { quand: "J0, tout de suite", declencheur: "Formulaire « dossier » soumis" },
  "d2-architectures": { quand: "J+1", declencheur: "Workflow dossier" },
  "d3-visite-360": { quand: "J+3", declencheur: "Workflow dossier" },
  "d4-paiement": { quand: "J+5", declencheur: "Workflow dossier" },
  "d5-marche": { quand: "J+8", declencheur: "Workflow dossier" },
  "d6-espace": { quand: "J+12", declencheur: "Workflow dossier" },
  "d7-parcelles": { quand: "J+16", declencheur: "Workflow dossier" },
  "d8-question": { quand: "J+21", declencheur: "Workflow dossier, si aucune réponse" },
  "v1-confirmation": { quand: "Tout de suite", declencheur: "Propriété « date_visite » renseignée" },
  "v2-rappel": { quand: "La veille, 18 h", declencheur: "Date de visite − 1 jour" },
  "v3-apres": { quand: "Le lendemain", declencheur: "Date de visite + 1 jour" },
  "p1-bienvenue": { quand: "Jour de la réservation", declencheur: "Transaction passée à « réservée »" },
  "p2-suivi": { quand: "J+7", declencheur: "Workflow nouvel acquéreur" },
  "p3-etape": {
    quand: "À chaque étape",
    declencheur: "Envoi manuel aux acquéreurs, après publication dans l’espace promoteur",
  },
  "n1-le-chantier-avance": {
    quand: "À chaque grande étape",
    declencheur: "Envoi manuel aux contacts sans réservation",
  },
};

const NOMS: Record<Sequence, string> = {
  dossier: "1. Après la demande de dossier",
  visite: "2. Rendez-vous et visite",
  proprietaire: "3. Nouvel acquéreur",
  nouvelles: "4. Relance « le chantier avance »",
};

let total = 0;
const sommaires: string[] = [];
for (const langue of LANGUES) {
  const dossier = join(SORTIE, langue);
  mkdirSync(dossier, { recursive: true });
  const liste = emails(langue);
  for (const e of liste) {
    writeFileSync(join(dossier, `${e.id}.html`), document(e, langue, COPIES[langue]));
    total++;
  }
  const sections = (Object.keys(NOMS) as Sequence[])
    .map((sequence) => {
      const lignes = liste
        .filter((e) => e.sequence === sequence)
        .map((e) => {
          const cal = CALENDRIER[e.id];
          return `<tr><td>${cal?.quand ?? ""}</td><td><b>${lisible(e.objet)}</b><br><small>${lisible(e.preheader)}</small></td><td><small>${cal?.declencheur ?? ""}</small></td><td><a href="${langue}/${e.id}.html">${e.id}</a></td></tr>`;
        })
        .join("");
      return `<h3>${NOMS[sequence]}</h3><table><thead><tr><th>Quand</th><th>Objet · texte d’aperçu</th><th>Déclencheur</th><th>Modèle</th></tr></thead><tbody>${lignes}</tbody></table>`;
    })
    .join("");
  sommaires.push(`<h2 id="${langue}">${langue.toUpperCase()}</h2>${sections}`);
}

writeFileSync(
  join(SORTIE, "index.html"),
  `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Séquences e-mail CITYSTAR</title>
<style>
  body { margin: 0; padding: 40px 16px; background: ${C.papier}; color: ${C.encre}; font: 15px/1.5 ${SANS}; }
  main { max-width: 1000px; margin: 0 auto; }
  h1 { font: 400 44px/1.05 ${SERIF}; margin: 0 0 8px; }
  h2 { font: 400 34px/1.1 ${SERIF}; margin: 48px 0 0; }
  h3 { font: 400 24px/1.1 ${SERIF}; margin: 26px 0 10px; }
  nav a { margin-right: 12px; }
  table { width: 100%; border-collapse: collapse; background: ${C.creme}; border-radius: 16px; overflow: hidden; }
  th, td { padding: 12px 14px; border-bottom: 1px solid ${C.filet}; text-align: left; vertical-align: top; }
  th { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: ${C.bronzeTexte}; }
  small { color: ${C.gris}; }
  a { color: ${C.bronzeTexte}; }
</style></head><body><main>
<h1>Séquences e-mail CITYSTAR</h1>
<p>${total} modèles HubSpot : 15 e-mails × ${LANGUES.length} langues. L’objet et le texte d’aperçu sont à reporter dans HubSpot.</p>
<nav>${LANGUES.map((l) => `<a href="#${l}">${l.toUpperCase()}</a>`).join("")}</nav>
${sommaires.join("")}
</main></body></html>`,
);

console.log(`${total} modèles écrits dans ${SORTIE}`);
