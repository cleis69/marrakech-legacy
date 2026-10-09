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
/** Langues du site : le français à la racine, les autres sous /en, /es, /it, /nl, /no. */
export const LANGUES = ["fr", "en", "es", "it", "nl", "no"] as const;
export type Langue = (typeof LANGUES)[number];
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
  // Coordonnées du domaine reprises de la page REV du programme (09/10/2026), validées par le client.
  coordonnees: { latitude: 31.6436578, longitude: -7.8716987, confirme: true },
} as const;

export const villasChiffres: Record<
  TypeVilla,
  { surfaceConstruiteM2: number; terrainM2: number; suites: number; accessiblePmr: boolean }
> = {
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
/**
 * Affichage des prix : coupé à la demande du client (09/10/2026). Tant qu'il vaut
 * false, aucun montant de villa n'apparaît ; les outils affichent « Prix sur demande »
 * et le sélecteur comme le comparateur n'ont plus de curseur de budget.
 */
export const prixPublics = false;

export const prixVillas: Record<TypeVilla, { EUR: number; GBP: number; confirme: boolean }> = {
  A: { EUR: 1_480_000, GBP: 1_269_000, confirme: false },
  B: { EUR: 1_180_000, GBP: 999_000, confirme: false },
  C: { EUR: 980_000, GBP: 839_000, confirme: false },
};

export const devises = {
  principaleParLangue: {
    fr: "EUR",
    en: "GBP",
    es: "EUR",
    it: "EUR",
    nl: "EUR",
    no: "NOK",
  } as Record<Langue, Devise>,
  affichees: ["EUR", "GBP", "MAD", "NOK"] as Devise[],
  // Contre-valeurs calculées : arrondi à la dizaine de milliers inférieure.
  arrondiContreValeur: 10_000,
  /**
   * Taux indicatifs pour 1 €, utilisés si la mise à jour quotidienne échoue.
   * GBP et NOK : Banque centrale européenne, 16/09/2026. MAD : marché, 17/09/2026.
   * La mise à jour du jour est faite côté navigateur (voir components/citystar/taux.ts) :
   * BCE pour la livre et la couronne, marché pour le dirham, avec cache journalier.
   */
  tauxDeSecours: { GBP: 0.8574, NOK: 10.7885, MAD: 10.9111, date: "2026-09-16" },
} as const;

/* ------------------------------------------------------------------ */
/* Engagements et marché                                               */
/* ------------------------------------------------------------------ */

/** Confirmés par le client le 09/10/2026. */
export const engagements = {
  // Le domaine est financé intégralement sur fonds propres.
  fondsPropres: 1,
  // L'acheteur peut financer sa villa par un crédit immobilier bancaire.
  creditImmobilierAccepte: true,
};

/**
 * Bank Al-Maghrib et ANCFCC, indice des prix des actifs immobiliers (IPAI) de
 * l'année 2025, publié le 04/03/2026. Chiffres vérifiés le 09/10/2026 sur le
 * compte rendu de Boursenews (le PDF de l'ANCFCC cité au départ renvoie une 404).
 */
export const marche = {
  annee: 2025,
  prixMarrakech: 0.01,
  transactions: [
    { ville: "Marrakech", evolution: 0.241 },
    { ville: "Rabat", evolution: 0.15 },
    { ville: "Casablanca", evolution: 0.078 },
    { ville: "Tanger", evolution: 0.033 },
  ],
  sourceUrl: "https://boursenews.ma/article/actualite/Immobilier-IPAI-2025",
};

/* ------------------------------------------------------------------ */
/* Calendrier du chantier                                              */
/* ------------------------------------------------------------------ */

/** Étapes du chantier, dans l'ordre : chacune déclenche un appel de fonds (voir reservation.paliers). */
export type EtapeChantier = "reservation" | "fondations" | "grosOeuvre" | "finitions" | "livraison";

/** Mois d'une étape : mois de 1 à 12. */
export type Mois = { annee: number; mois: number };

export const calendrier = {
  // Livraison du domaine annoncée par le client le 04/10/2026.
  livraison: { annee: 2027, mois: 8, confirme: true },
  /**
   * Les étapes suivent le déroulé habituel d'une vente sur plan. La livraison
   * prend la date ci-dessus ; les autres attendent le planning du promoteur.
   */
  // ESPACE RÉSERVÉ — dates à remplacer par le planning du promoteur
  etapes: [
    { id: "reservation", date: null },
    { id: "fondations", date: null },
    { id: "grosOeuvre", date: null },
    { id: "finitions", date: null },
    { id: "livraison", date: null },
  ] as { id: EtapeChantier; date: Mois | null }[],
  etapesConfirmees: false,
};

/* ------------------------------------------------------------------ */
/* Espace propriétaire                                                 */
/* ------------------------------------------------------------------ */

/**
 * Projet Supabase « citystar » (organisation REV, offre gratuite), créé le 09/10/2026.
 * La clé publique est faite pour le navigateur : ce sont les règles RLS
 * (supabase/migrations) qui décident de ce que chacun peut lire ou modifier.
 */
export const espaceClient = {
  url: "https://vrdtckxffzufknmkqpst.supabase.co",
  clePublique: "sb_publishable_dLe1JJj-n2TTczlQ1Vc78w_juYP3fFr",
  // Durée de validité des liens vers les photos et les documents, en secondes.
  dureeLiens: 3600,
  // Les photos sont réduites avant l'envoi : 1 Go de stockage dans l'offre gratuite.
  photoLargeurMax: 2000,
};

/* ------------------------------------------------------------------ */
/* Réservation et échéancier                                           */
/* ------------------------------------------------------------------ */

export const reservation = {
  // ESPACE RÉSERVÉ — à remplacer par la donnée contractuelle du promoteur
  acompte: {
    montantEUR: null as number | null,
    pourcentage: null as number | null,
    confirme: false,
  },
  /**
   * Part du prix appelée à chaque étape du chantier, en fraction (0,1 = 10 %).
   * Ne pas reprendre les paliers 35/70/95/5 : c'est du droit français, pas
   * marocain. Une part non confirmée s'affiche « à confirmer ».
   */
  // ESPACE RÉSERVÉ — à remplacer par la donnée contractuelle du promoteur
  paliers: [
    // Donné par le client le 04/10/2026 : 30 % à la réservation, signée directement chez le notaire.
    { etape: "reservation", part: 0.3, confirme: true },
    // ESPACE RÉSERVÉ — répartition du solde à fournir par le promoteur
    { etape: "fondations", part: null, confirme: false },
    { etape: "grosOeuvre", part: null, confirme: false },
    { etape: "finitions", part: null, confirme: false },
    { etape: "livraison", part: null, confirme: false },
  ] as { etape: EtapeChantier; part: number | null; confirme: boolean }[],
};

/* ------------------------------------------------------------------ */
/* Frais d'acquisition                                                 */
/* ------------------------------------------------------------------ */

/** Bornes des curseurs : repères d'interface, pas des données du promoteur. */
/* Fourchette des curseurs de budget (simulateur, sélecteur, comparateur) : les trois villas y tiennent. */
export const bornesPrixEUR = { min: 800_000, max: 2_000_000, pas: 10_000 };

export const bornesSimulateur = {
  prixMoyenNuitEUR: { min: 200, max: 2_000, pas: 50 },
  tauxOccupation: { min: 0.1, max: 0.9, pas: 0.01 },
  semainesUsagePersonnel: { min: 0, max: 26, pas: 1 },
  loyerMensuelEUR: { min: 500, max: 15_000, pas: 100 },
  horizonAnnees: { min: 1, max: 25, pas: 1 },
  appreciationAnnuelle: { min: 0, max: 0.08, pas: 0.005 },
  charges: { min: 0, max: 0.4, pas: 0.01 },
  coutsAnnuelsEUR: { min: 0, max: 20_000, pas: 500 },
  imposition: { min: 0, max: 0.45, pas: 0.01 },
};

/**
 * Frais d'acquisition : données conservées pour le promoteur, plus affichées sur le site
 * depuis le retrait du calculateur de frais (23/09/2026).
 */
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

/**
 * Points de départ des curseurs du simulateur. Ce sont des valeurs
 * d'illustration, choisies pour que l'outil produise un ordre de grandeur :
 * aucune n'est confirmée (confirme: false), et le site le dit au visiteur.
 */
export const hypothesesRendement = {
  // VALEUR D'ILLUSTRATION — à remplacer par la donnée contractuelle du promoteur
  prixMoyenNuitEUR: { valeur: 600, confirme: false } as Hypothese<number>,
  // VALEUR D'ILLUSTRATION — à remplacer par la donnée contractuelle du promoteur
  tauxOccupation: { valeur: 0.35, confirme: false } as Hypothese<number>,
  // VALEUR D'ILLUSTRATION — à remplacer par la donnée contractuelle du promoteur
  semainesUsagePersonnel: { valeur: 6, confirme: false } as Hypothese<number>,
  // VALEUR D'ILLUSTRATION — à remplacer par la donnée contractuelle du promoteur
  loyerMensuelEUR: { valeur: 4_000, confirme: false } as Hypothese<number>,
  // VALEUR D'ILLUSTRATION — à remplacer par la donnée contractuelle du promoteur
  horizonAnnees: { valeur: 10, confirme: false } as Hypothese<number>,
  // VALEUR D'ILLUSTRATION — à remplacer par la donnée contractuelle du promoteur
  appreciationAnnuelle: { valeur: 0.03, confirme: false } as Hypothese<number>,
};

export const coutsDetention = {
  // Part des revenus locatifs, en fraction.
  // VALEUR D'ILLUSTRATION — à remplacer par la donnée contractuelle du promoteur
  charges: { valeur: 0.25, confirme: false } as Hypothese<number>,
  // Montant annuel en euros (taxes locales, entretien, gardiennage…).
  // VALEUR D'ILLUSTRATION — à remplacer par la donnée contractuelle du promoteur
  coutsAnnuelsEUR: { valeur: 12_000, confirme: false } as Hypothese<number>,
  // Taux d'imposition des revenus, en fraction.
  // VALEUR D'ILLUSTRATION — à remplacer par la donnée contractuelle du promoteur
  imposition: { valeur: 0.2, confirme: false } as Hypothese<number>,
};

/* ------------------------------------------------------------------ */
/* Documents                                                           */
/* ------------------------------------------------------------------ */

/** Brochures servies depuis public/ ; le poids (en Mo) prévient avant un téléchargement lourd. */
export const brochures = {
  citystar: { fichier: "brochures/citystar.pdf", mo: 8.4 },
  A: { fichier: "brochures/villa-a.pdf", mo: 0.3 },
  B: { fichier: "brochures/villa-b.pdf", mo: 0.3 },
  C: { fichier: "brochures/villa-c.pdf", mo: 0.3 },
} as const;

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

export const LOCALE: Record<Langue, string> = {
  fr: "fr-FR",
  en: "en-GB",
  es: "es-ES",
  it: "it-IT",
  nl: "nl-NL",
  no: "nb-NO",
};

/** 2000 → « 2 000 » (fr) ou « 2,000 » (en), sans espace fine insécable. */
/** 8.4 → « 8,4 » (fr) ou « 8.4 » (en) : une décimale au plus. */
export function formatDecimal(valeur: number, langue: Langue = "fr") {
  return new Intl.NumberFormat(LOCALE[langue], { maximumFractionDigits: 1 }).format(valeur);
}

export function formatNombre(valeur: number, langue: Langue = "fr") {
  return new Intl.NumberFormat(LOCALE[langue], { maximumFractionDigits: 0 })
    .format(valeur)
    .replace(/\u202f/g, "\u00a0");
}

export function formatSurface(m2: number, langue: Langue = "fr") {
  return `${formatNombre(m2, langue)} m²`;
}

/* ------------------------------------------------------------------ */
/* Prix affichés                                                       */
/* ------------------------------------------------------------------ */

export type Taux = { GBP: number; NOK: number; MAD: number; date: string };

export const symbolesDevise: Record<Devise, string> = {
  EUR: "€",
  GBP: "£",
  MAD: "MAD",
  NOK: "NOK",
};

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

/**
 * Bornes des curseurs de budget dans la devise affichée, arrondies à un pas lisible
 * (10 000 € ou £, 100 000 MAD ou NOK) : pas de « 1 714 360 £ » en bout de course.
 */
export function bornesBudget(devise: Devise, taux: Taux = devises.tauxDeSecours) {
  const conv = (montantEUR: number) => convertirEUR(montantEUR, devise, taux);
  const pas = 10 ** Math.round(Math.log10(conv(bornesPrixEUR.pas)));
  return {
    min: Math.ceil(conv(bornesPrixEUR.min) / pas) * pas,
    max: Math.floor(conv(bornesPrixEUR.max) / pas) * pas,
    pas,
  };
}

/** 1480000 → « 1 480 000 € » (fr) ou « €1,480,000 » (en). */
export function formatPrix(montant: number, devise: Devise, langue: Langue = "fr") {
  const nombre = formatNombre(montant, langue);
  if (langue === "en" && (devise === "EUR" || devise === "GBP"))
    return `${symbolesDevise[devise]}${nombre}`;
  return `${nombre} ${symbolesDevise[devise]}`;
}

/** Montant en euros converti dans la devise demandée, pour un repère (pas un prix de villa). */
export function convertirEUR(
  montantEUR: number,
  devise: Devise,
  taux: Taux = devises.tauxDeSecours,
) {
  return devise === "EUR" ? montantEUR : montantEUR * taux[devise];
}

/** 1200000 → « 1,2 M € » ; 857400 → « 857 k £ ». */
export function formatMontantCourt(montant: number, devise: Devise, langue: Langue = "fr") {
  const nombre = new Intl.NumberFormat(LOCALE[langue], {
    notation: "compact",
    maximumSignificantDigits: 3,
  })
    .format(montant)
    .replace(/\u202f/g, "\u00a0");
  if (langue === "en" && (devise === "EUR" || devise === "GBP"))
    return `${symbolesDevise[devise]}${nombre}`;
  return `${nombre} ${symbolesDevise[devise]}`;
}

/** « 2026-09-16 » → « 16/09/2026 » (fr) ou « 16 Sep 2026 » (en). */
export function formatDate(iso: string, langue: Langue = "fr") {
  const date = new Date(`${iso}T12:00:00Z`);
  const options: Intl.DateTimeFormatOptions =
    langue === "en"
      ? { day: "numeric", month: "short", year: "numeric" }
      : { day: "2-digit", month: "2-digit", year: "numeric" };
  return new Intl.DateTimeFormat(LOCALE[langue], { ...options, timeZone: "UTC" }).format(date);
}

/** Mois et année : « août 2027 » (fr) ou « August 2027 » (en), identiques au pré-rendu et dans le navigateur. */
export function formatMois({ annee, mois }: Mois, langue: Langue = "fr") {
  const date = new Date(Date.UTC(annee, mois - 1, 15));
  return new Intl.DateTimeFormat(LOCALE[langue], {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

/** Évolution signée, à la typographie de chaque langue : 0,241 → « +24,1 % » (fr), « +24.1% » (en). */
export function formatEvolution(part: number, langue: Langue = "fr") {
  return new Intl.NumberFormat(LOCALE[langue], {
    style: "percent",
    maximumFractionDigits: 1,
    signDisplay: "exceptZero",
  }).format(part);
}

/** Part entière, à la typographie de chaque langue : 1 → « 100 % » (fr), « 100% » (en). */
export function formatPart(part: number, langue: Langue = "fr") {
  return new Intl.NumberFormat(LOCALE[langue], {
    style: "percent",
    maximumFractionDigits: 0,
  }).format(part);
}

/** Mois entiers d'aujourd'hui jusqu'à une échéance (0 si elle est passée). */
export function moisRestants({ annee, mois }: Mois, aujourdhui: Date) {
  const ecart = (annee - aujourdhui.getFullYear()) * 12 + (mois - 1 - aujourdhui.getMonth());
  return Math.max(0, ecart);
}

const UNITES = [
  "zéro",
  "un",
  "deux",
  "trois",
  "quatre",
  "cinq",
  "six",
  "sept",
  "huit",
  "neuf",
  "dix",
  "onze",
  "douze",
  "treize",
  "quatorze",
  "quinze",
  "seize",
  "dix-sept",
  "dix-huit",
  "dix-neuf",
  "vingt",
];

/** 14 → « quatorze » (jusqu'à vingt, en chiffres au-delà). */
export function nombreEnLettres(valeur: number) {
  return UNITES[valeur] ?? String(valeur);
}
