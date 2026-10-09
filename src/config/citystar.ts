export const citystar = {
  villasTotal: 14,
  villasDisponibles: null as number | null,
  terrainReference: 2000,
  typesCount: 3,
  accessMinutes: 35,
  villas: {
    A: { surface: 585, terrain: 2000, suites: 5 },
    B: { surface: 536, terrain: 2000, suites: 5 },
    C: { surface: 525, terrain: 2000, suites: 4 },
  },
  marche: {
    annee: 2025,
    evolutionTransactionsMarrakech: 24.1,
    evolutionPrixMarrakech: 1,
    transactions: [
      { ville: "Marrakech", valeur: 24.1 },
      { ville: "Rabat", valeur: 15 },
      { ville: "Casablanca", valeur: 7.8 },
      { ville: "Tanger", valeur: 3.3 },
    ],
    sourceUrl: "https://ancfcc.gov.ma/media/ipai/Publication-IPAI_T4_2025.pdf",
  },
  motPromoteur: {
    nom: null as string | null,
    role: null as string | null,
    citation: null as string | null,
    photo: null as string | null,
  },
} as const;

export type VillaType = keyof typeof citystar.villas;