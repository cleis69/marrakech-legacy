/**
 * CITYSTAR — données chiffrées du projet.
 *
 * Toutes les valeurs numériques utilisées par le site vivent ici : aucun
 * composant ne doit contenir de chiffre en dur.
 *
 * Convention : une valeur non confirmée vaut `null` ou porte `confirme: false`,
 * avec le commentaire « ESPACE RÉSERVÉ ». Les outils affichent alors un état
 * neutre au lieu d'un chiffre inventé.
 */

export type Devise = "EUR" | "GBP" | "MAD" | "NOK";
export type Langue = "fr" | "en";
export type TypeVilla = "A" | "B" | "C";

/** Valeur éventuellement en attente de confirmation. */
export type Hypothese<T> = { valeur: T | null; confirme: boolean };

/* ------------------------------------------------------------------ */
/* Programme                                                           */
/* ------------------------------------------------------------------ */

export const programme = {
  nombreVillas: 14,
  nombreTypes: 3,
  // Plus grand terrain du programme, en m² (identique pour les trois types).
  terrainMaxM2: 2000,
  // Temps de trajet vers la place Jemaa el-Fna et l'aéroport de Marrakech.
  trajetMaxMinutes: 35,
  // ESPACE RÉSERVÉ — à remplacer par la donnée contractuelle du promoteur
  // Ces coordonnées semblent désigner le centre de Marrakech, pas le domaine
  // d'Oulad Hassoune : à corriger avant mise en ligne.
  coordonnees: { latitude: 31.6295, longitude: -7.9811, confirme: false },
} as const;

export const villasChiffres: Record<TypeVilla, { surfaceConstruiteM2: number; terrainM2: number; suites: number; accessiblePmr: boolean }> = {
  A: { surfaceConstruiteM2: 585, terrainM2: 2000, suites: 5, accessiblePmr: true },
  B: { surfaceConstruiteM2: 536, terrainM2: 2000, suites: 5, accessiblePmr: false },
  C: { surfaceConstruiteM2: 525, terrainM2: 2000, suites: 4, accessiblePmr: false },
};

/* ------------------------------------------------------------------ */
/* Prix                                                                */
/* ------------------------------------------------------------------ */

/**
 * Prix psychologiques, fixés à la main pour les deux devises principales
 * (euros pour le site FR, livres pour le site EN). Ils ne suivent pas le taux
 * de change. Base communiquée par le client le 17/09/2026 : 1,5 M, 1,2 M et
 * 1 M €.
 */
// ESPACE RÉSERVÉ — à remplacer par la donnée contractuelle du promoteur
export const prixVillas: Record<TypeVilla, { EUR: number; GBP: number; confirme: boolean }> = {
  A: { EUR: 1_480_000, GBP: 1_269_000, confirme: false },
  B: { EUR: 1_180_000, GBP: 999_000, confirme: false },
  C: { EUR: 980_000, GBP: 839_000, confirme: false },
};

export const devises = {
  principaleParLangue: { fr: "EUR", en: "GBP" } as Record<Langue, Devise>,
  affichees: ["EUR", "GBP", "MAD", "NOK"] as Devise[],
  // Contre-valeurs calculées : arrondi à la dizaine de milliers inférieure.
  arrondiContreValeur: 10_000,
  /**
   * Taux indicatifs pour 1 €, utilisés si la mise à jour quotidienne échoue.
   * GBP et NOK : Banque centrale européenne, 16/09/2026. MAD : marché, 17/09/2026.
   */
  tauxDeSecours: { GBP: 0.8574, NOK: 10.7885, MAD: 10.9111, date: "2026-09-16" },
} as const;

/* ------------------------------------------------------------------ */
/* Sélecteur de villa                                                  */
/* ------------------------------------------------------------------ */

export const selecteur = {
  // Plafonds proposés à la question « budget », en euros (repères d'interface, pas des prix).
  plafondsBudgetEUR: [1_000_000, 1_200_000, 1_500_000],
};

/* ------------------------------------------------------------------ */
/* Réservation et échéancier                                           */
/* ------------------------------------------------------------------ */

export const reservation = {
  // ESPACE RÉSERVÉ — à remplacer par la donnée contractuelle du promoteur
  acompte: { montantEUR: null as number | null, pourcentage: null as number | null, confirme: false },
  /**
   * Paliers d'échéancier (pourcentage du prix par étape).
   * Ne pas reprendre les paliers 35/70/95/5 : c'est du droit français, pas
   * marocain. Le simulateur d'échéancier reste désactivé tant que
   * l'échéancier contractuel du promoteur n'est pas fourni.
   */
  // ESPACE RÉSERVÉ — à remplacer par la donnée contractuelle du promoteur
  paliers: [] as { etape: string; pourcentage: number }[],
  paliersConfirmes: false,
};

/* ------------------------------------------------------------------ */
/* Frais d'acquisition                                                 */
/* ------------------------------------------------------------------ */

export const calculateurFrais = {
  // Bornes du curseur de prix, en euros (repères d'interface).
  prixMinEUR: 500_000,
  prixMaxEUR: 3_000_000,
  pasEUR: 10_000,
};

export const fraisAcquisition = {
  // Taux appliqués au prix du bien, en fraction (0,04 = 4 %).
  // ESPACE RÉSERVÉ — à remplacer par la donnée contractuelle du promoteur
  droitsEnregistrement: { valeur: null, confirme: false } as Hypothese<number>,
  // ESPACE RÉSERVÉ — à remplacer par la donnée contractuelle du promoteur
  conservationFonciere: { valeur: null, confirme: false } as Hypothese<number>,
  // ESPACE RÉSERVÉ — à remplacer par la donnée contractuelle du promoteur
  fraisNotaire: { valeur: null, confirme: false } as Hypothese<number>,
};

/* ------------------------------------------------------------------ */
/* Rendement et détention                                              */
/* ------------------------------------------------------------------ */

export const hypothesesRendement = {
  // ESPACE RÉSERVÉ — à remplacer par la donnée contractuelle du promoteur
  prixMoyenNuitEUR: { valeur: null, confirme: false } as Hypothese<number>,
  // ESPACE RÉSERVÉ — à remplacer par la donnée contractuelle du promoteur
  tauxOccupation: { valeur: null, confirme: false } as Hypothese<number>,
  // ESPACE RÉSERVÉ — à remplacer par la donnée contractuelle du promoteur
  semainesUsagePersonnel: { valeur: null, confirme: false } as Hypothese<number>,
  // ESPACE RÉSERVÉ — à remplacer par la donnée contractuelle du promoteur
  loyerMensuelEUR: { valeur: null, confirme: false } as Hypothese<number>,
  // ESPACE RÉSERVÉ — à remplacer par la donnée contractuelle du promoteur
  horizonAnnees: { valeur: null, confirme: false } as Hypothese<number>,
  // ESPACE RÉSERVÉ — à remplacer par la donnée contractuelle du promoteur
  appreciationAnnuelle: { valeur: null, confirme: false } as Hypothese<number>,
};

export const coutsDetention = {
  // Part des revenus locatifs, en fraction.
  // ESPACE RÉSERVÉ — à remplacer par la donnée contractuelle du promoteur
  charges: { valeur: null, confirme: false } as Hypothese<number>,
  // Montant annuel en euros (taxes locales, entretien, gardiennage…).
  // ESPACE RÉSERVÉ — à remplacer par la donnée contractuelle du promoteur
  coutsAnnuelsEUR: { valeur: null, confirme: false } as Hypothese<number>,
  // Taux d'imposition des revenus, en fraction.
  // ESPACE RÉSERVÉ — à remplacer par la donnée contractuelle du promoteur
  imposition: { valeur: null, confirme: false } as Hypothese<number>,
};

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

export const contact = {
  telephone: "+212661825359",
  telephoneAffiche: "+212 661-825359",
  whatsapp: "212661825359",
  email: "Promoimmomarrakech@gmail.com",
  reseaux: {
    instagram: "https://www.instagram.com/city_star_marrakech",
    youtube: "https://www.youtube.com/@citystarmarrakech",
  },
} as const;

/* ------------------------------------------------------------------ */
/* Formatage                                                           */
/* ------------------------------------------------------------------ */

const LOCALE: Record<Langue, string> = { fr: "fr-FR", en: "en-GB" };

/** 2000 → « 2 000 » (fr) ou « 2,000 » (en), sans espace fine insécable. */
export function formatNombre(valeur: number, langue: Langue = "fr") {
  return new Intl.NumberFormat(LOCALE[langue], { maximumFractionDigits: 0 }).format(valeur).replace(/ /g, " ");
}

export function formatSurface(m2: number, langue: Langue = "fr") {
  return `${formatNombre(m2, langue)} m²`;
}

/* ------------------------------------------------------------------ */
/* Prix affichés                                                       */
/* ------------------------------------------------------------------ */

export type Taux = { GBP: number; NOK: number; MAD: number; date: string };

export const symbolesDevise: Record<Devise, string> = { EUR: "€", GBP: "£", MAD: "MAD", NOK: "NOK" };

/**
 * Prix d'une villa dans la devise demandée. Euros et livres : prix fixés à la
 * main. Dirhams et couronnes : contre-valeur du prix en euros, arrondie à la
 * dizaine de milliers inférieure, donc approximative.
 */
export function prixVilla(type: TypeVilla, devise: Devise, taux: Taux = devises.tauxDeSecours) {
  const prix = prixVillas[type];
  if (devise === "EUR" || devise === "GBP") return { montant: prix[devise], approximatif: false };
  const pas = devises.arrondiContreValeur;
  return { montant: Math.floor((prix.EUR * taux[devise]) / pas) * pas, approximatif: true };
}

/** 1480000 → « 1 480 000 € » (fr) ou « €1,480,000 » (en). */
export function formatPrix(montant: number, devise: Devise, langue: Langue = "fr") {
  const nombre = formatNombre(montant, langue);
  if (langue === "en" && (devise === "EUR" || devise === "GBP")) return `${symbolesDevise[devise]}${nombre}`;
  return `${nombre} ${symbolesDevise[devise]}`;
}

/** Montant en euros converti dans la devise demandée, pour un repère (pas un prix de villa). */
export function convertirEUR(montantEUR: number, devise: Devise, taux: Taux = devises.tauxDeSecours) {
  return devise === "EUR" ? montantEUR : montantEUR * taux[devise];
}

/** 1200000 → « 1,2 M € » ; 857400 → « 857 k £ ». */
export function formatMontantCourt(montant: number, devise: Devise, langue: Langue = "fr") {
  const nombre = new Intl.NumberFormat(LOCALE[langue], { notation: "compact", maximumSignificantDigits: 3 }).format(montant).replace(/\u202f/g, " ");
  if (langue === "en" && (devise === "EUR" || devise === "GBP")) return `${symbolesDevise[devise]}${nombre}`;
  return `${nombre} ${symbolesDevise[devise]}`;
}

/** « 2026-09-16 » → « 16/09/2026 » (fr) ou « 16 Sep 2026 » (en). */
export function formatDate(iso: string, langue: Langue = "fr") {
  const date = new Date(`${iso}T12:00:00Z`);
  const options: Intl.DateTimeFormatOptions = langue === "fr" ? { day: "2-digit", month: "2-digit", year: "numeric" } : { day: "numeric", month: "short", year: "numeric" };
  return new Intl.DateTimeFormat(LOCALE[langue], { ...options, timeZone: "UTC" }).format(date);
}

const UNITES = ["zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix", "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept", "dix-huit", "dix-neuf", "vingt"];

/** 14 → « quatorze » (jusqu'à vingt, en chiffres au-delà). */
export function nombreEnLettres(valeur: number) {
  return UNITES[valeur] ?? String(valeur);
}
