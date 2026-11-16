/**
 * Provenance du visiteur, lue à son arrivée et gardée le temps de la visite : la demande de dossier
 * la transmet à HubSpot, pour savoir quelle annonce ou quel lien amène les demandes.
 */

const CLE = "citystar-provenance";
const UTM = ["utm_source", "utm_medium", "utm_campaign", "utm_content"] as const;
/** Identifiants que Google Ads ajoute à l'adresse d'arrivée. */
const CLIC_GOOGLE = ["gclid", "gbraid", "wbraid"];
/** Lien marqué payant par son `utm_medium` (cpc, paid_social, display…). */
const PAYANT = /cpc|ppc|paid|ads?\b|display|retargeting/;

export type Provenance = {
  utm: Partial<Record<(typeof UTM)[number], string>>;
  /** Arrivée par un clic sur une annonce Google (identifiant ajouté par Google Ads). */
  clicGoogle?: boolean;
  /** Site d'où vient le visiteur, s'il vient d'ailleurs. */
  referent?: string;
};

/** À l'arrivée : une nouvelle annonce remplace la précédente ; sans annonce, on garde le premier site d'origine. */
export function retenirProvenance() {
  try {
    const url = new URLSearchParams(window.location.search);
    const utm = Object.fromEntries(
      UTM.flatMap((cle) => {
        const valeur = url.get(cle)?.trim().slice(0, 200);
        return valeur ? [[cle, valeur]] : [];
      }),
    );
    const clicGoogle = CLIC_GOOGLE.some((cle) => url.has(cle));
    const hote = document.referrer ? new URL(document.referrer).hostname : "";
    const referent = hote && hote !== window.location.hostname ? hote : undefined;
    if (Object.keys(utm).length || clicGoogle) {
      sessionStorage.setItem(CLE, JSON.stringify({ utm, clicGoogle, referent }));
    } else if (referent && !sessionStorage.getItem(CLE)) {
      sessionStorage.setItem(CLE, JSON.stringify({ utm: {}, referent }));
    }
  } catch {
    // Stockage bloqué (navigation privée stricte) : la demande partira sans provenance.
  }
}

/**
 * Le visiteur arrive par un clic sur une annonce : identifiant ajouté par Google Ads, ou lien
 * marqué payant. La langue de l'annonce a été choisie avec la campagne : la page reste dans
 * cette langue (voir `langueABasculer`).
 */
export function arriveeParAnnonce(recherche = window.location.search) {
  const url = new URLSearchParams(recherche);
  return (
    CLIC_GOOGLE.some((cle) => url.has(cle)) ||
    PAYANT.test((url.get("utm_medium") ?? "").toLowerCase())
  );
}

export function provenance(): Provenance {
  try {
    return JSON.parse(sessionStorage.getItem(CLE) ?? "") as Provenance;
  } catch {
    return { utm: {} };
  }
}

/** Canal d'acquisition, dans les valeurs de la propriété HubSpot « citystar_canal ». */
export function canal({ utm, clicGoogle, referent = "" }: Provenance) {
  const source = (utm.utm_source ?? "").toLowerCase();
  const campagne = (utm.utm_campaign ?? "").toLowerCase();
  const payant = PAYANT.test((utm.utm_medium ?? "").toLowerCase());
  if (clicGoogle || (source.includes("google") && payant)) return "google_ads";
  if (/facebook|\bfb\b|instagram|\big\b|meta/.test(source) && payant) return "meta_ads";
  if (source.includes("linkedin") && payant) return "linkedin_ads";
  if (/snapchat|\bsnap\b/.test(source) && payant) return "snapchat_ads";
  if (/gbp|gmb|google_?business/.test(`${source} ${campagne}`)) return "google_business";
  if (/instagram|\big\b/.test(source) || referent.includes("instagram")) return "instagram";
  if (source.includes("whatsapp") || /whatsapp|wa\.me/.test(referent)) return "whatsapp";
  if (source.includes("facebook") || referent.includes("facebook")) return "autre";
  return "site";
}
