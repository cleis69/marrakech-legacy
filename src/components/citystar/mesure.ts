/**
 * Balise Google du compte Google Ads CITYSTAR (737-955-6760), posée sur toutes les pages.
 * Elle sert à compter les demandes venues des annonces : après l'envoi d'un formulaire, le
 * visiteur arrive sur la page de remerciement, que Google Ads compte comme une conversion.
 *
 * Le site n'a pas de bandeau de consentement : dans l'Espace économique européen, au
 * Royaume-Uni et en Suisse, le consentement est refusé d'office et Google ne dépose aucun
 * cookie publicitaire. La page de confidentialité le dit dans les six langues.
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

/** Premier champ touché : envoyé à Google Ads par la balise Google déjà chargée. */
export function signalerDebutGoogleAds() {
  const fenetre = window as typeof window & { gtag?: (...args: unknown[]) => void };
  fenetre.gtag?.("event", "conversion", { send_to: DEBUT_FORMULAIRE });
}

/**
 * Microsoft Clarity (15/11/2026), compte contact@citystarproperties.com : enregistrements de
 * visites et cartes de clics, pour voir où les visiteurs de la page d'atterrissage s'arrêtent.
 * Les saisies des formulaires sont masquées par Clarity. La page de confidentialité le dit
 * dans les six langues.
 */
export const PROJET_CLARITY = "ze4a8lyxf2";

export const AMORCE_CLARITY = PROJET_CLARITY
  ? [
      '(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};',
      't=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;',
      'y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);',
      `})(window,document,"clarity","script",${JSON.stringify(PROJET_CLARITY)});`,
    ].join("")
  : "";
