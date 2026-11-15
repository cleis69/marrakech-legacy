/**
 * Balise Google du compte Google Ads CITYSTAR (737-955-6760), posée sur toutes les pages.
 * Elle sert à compter les demandes venues des annonces : après l'envoi d'un formulaire, le
 * visiteur arrive sur la page de remerciement, que Google Ads compte comme une conversion.
 *
 * Le site n'a pas de bandeau de consentement : dans l'Espace économique européen, au
 * Royaume-Uni et en Suisse, le consentement est refusé d'office et Google ne dépose aucun
 * cookie publicitaire. La page de confidentialité le dit dans les sept langues.
 */
export const BALISE_GOOGLE = "GTM-P64LSTXF";

export const ADRESSE_BALISE = `https://www.googletagmanager.com/gtm.js?id=${BALISE_GOOGLE}`;

/** Espace économique européen, Royaume-Uni et Suisse. */
const SANS_COOKIE = [
  "AT",
  "BE",
  "BG",
  "HR",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "HU",
  "IE",
  "IT",
  "LV",
  "LT",
  "LU",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SK",
  "SI",
  "ES",
  "SE",
  "IS",
  "LI",
  "NO",
  "GB",
  "CH",
];

const REFUS = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
  region: SANS_COOKIE,
};

/** À placer avant le chargement de la balise : le refus doit être connu de Google dès le départ. */
export const AMORCE_BALISE = [
  "window.dataLayer=window.dataLayer||[];",
  "function gtag(){dataLayer.push(arguments);}",
  `gtag('consent','default',${JSON.stringify(REFUS)});`,
  "gtag('js',new Date());",
].join("");

/**
 * Étapes du formulaire envoyées à la balise (15/11/2026), pour savoir où les visiteurs s'arrêtent :
 * `formulaire_commence` (premier champ touché), `formulaire_incomplet` (envoi refusé par un champ
 * obligatoire), `formulaire_erreur` (le relais n'a pas répondu). L'envoi réussi reste compté par
 * l'arrivée sur la page de remerciement.
 */
export function signaler(evenement: string, details: Record<string, string> = {}) {
  const fenetre = window as typeof window & { dataLayer?: unknown[] };
  fenetre.dataLayer = fenetre.dataLayer ?? [];
  fenetre.dataLayer.push({ event: evenement, ...details });
}

/**
 * Action de conversion secondaire « Début de formulaire (secondaire, observation) » du compte
 * Google Ads, créée le 15/11/2026 : elle n'entre pas dans les enchères ni dans la colonne
 * « Conversions », seulement dans « Toutes les conversions ».
 */
const DEBUT_FORMULAIRE = "AW-18550611884/W9nECPDP_rgdEKy_z41F";

/**
 * Action principale « Envois de formulaires de lead ». Le conteneur de balises ne la compte que
 * sur /merci (français) ; les cinq autres pages de remerciement l'envoient elles-mêmes (15/11/2026),
 * depuis que le visiteur peut arriver dans la langue de son téléphone.
 */
const DEMANDE = "AW-18550611884/gWaECMvk77cdEKy_z41F";

export function signalerDemandeGoogleAds() {
  const fenetre = window as typeof window & { gtag?: (...args: unknown[]) => void };
  fenetre.gtag?.("event", "conversion", { send_to: DEMANDE });
}

/** Action secondaire « Clic WhatsApp (secondaire, observation) », créée le 15/11/2026. */
const CLIC_WHATSAPP = "AW-18550611884/8ST-CLyShrkdEKy_z41F";

/** Clic sur un lien WhatsApp de la page d'atterrissage : envoyé à Google Ads. */
export function signalerWhatsAppGoogleAds() {
  const fenetre = window as typeof window & { gtag?: (...args: unknown[]) => void };
  fenetre.gtag?.("event", "conversion", { send_to: CLIC_WHATSAPP });
}

/** Premier champ touché : envoyé à Google Ads par la balise Google déjà chargée. */
export function signalerDebutGoogleAds() {
  const fenetre = window as typeof window & { gtag?: (...args: unknown[]) => void };
  fenetre.gtag?.("event", "conversion", { send_to: DEBUT_FORMULAIRE });
}

/**
 * Microsoft Clarity (15/11/2026), compte contact@citystarproperties.com : enregistrements de
 * visites et cartes de clics, pour voir où les visiteurs de la page d'atterrissage s'arrêtent.
 * Les saisies des formulaires sont masquées par Clarity. La page de confidentialité le dit
 * dans les sept langues.
 */
export const PROJET_CLARITY = "ze4a8lyxf2";

/**
 * La balise Google est chargée après la reprise de la page par React (15/11/2026). Placée dans le
 * <head>, elle insérait ses propres scripts (Google Ads, pixel Meta) avant l'hydratation, ce qui
 * provoquait par moments l'erreur React n° 418 depuis le 13/11/2026. L'amorce (dataLayer, refus des
 * cookies par défaut) reste dans le <head> : les appels faits avant le chargement sont gardés en file.
 */
export function chargerBalise() {
  if (document.querySelector(`script[src="${ADRESSE_BALISE}"]`)) return;
  const fenetre = window as typeof window & { dataLayer?: unknown[] };
  fenetre.dataLayer = fenetre.dataLayer ?? [];
  fenetre.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
  const script = document.createElement("script");
  script.async = true;
  script.src = ADRESSE_BALISE;
  document.head.appendChild(script);
}

/**
 * Clarity est chargé après l'affichage (15/11/2026), comme la balise Google : rien ne s'insère dans
 * la page avant que React ne l'ait reprise.
 */
export function chargerClarity() {
  if (!PROJET_CLARITY) return;
  const fenetre = window as typeof window & { clarity?: unknown };
  if (fenetre.clarity) return;
  const lancer = () => {
    const file: unknown[] = [];
    const clarity = (...args: unknown[]) => void file.push(args);
    (clarity as unknown as { q: unknown[] }).q = file;
    fenetre.clarity = clarity;
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.clarity.ms/tag/${PROJET_CLARITY}`;
    document.head.appendChild(script);
  };
  if (document.readyState === "complete") window.setTimeout(lancer, 0);
  else window.addEventListener("load", lancer, { once: true });
}
