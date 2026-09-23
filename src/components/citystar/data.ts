import { type Langue, type TypeVilla, formatSurface, villasChiffres } from "@/config/citystar";

import type { Textes } from "./i18n";

import villaAImage from "@/assets/citystar/rendus/ext-pergola-allee.webp";
import villaBImage from "@/assets/citystar/rendus/ext-terrasses-cactus.webp";
import villaCImage from "@/assets/citystar/rendus/ext-piscine-jour.webp";
import planARdc from "@/assets/citystar/plan-a-rdc.png";
import planAFloor from "@/assets/citystar/plan-a-floor.png";
import planBRdc from "@/assets/citystar/plan-b-rdc.png";
import planBFloor from "@/assets/citystar/plan-b-floor.png";
import planCRdc from "@/assets/citystar/plan-c-rdc.png";
import planCFloor from "@/assets/citystar/plan-c-floor.png";

export const villas = [
  { type: "A", image: villaAImage, plans: [planARdc, planAFloor] },
  { type: "B", image: villaBImage, plans: [planBRdc, planBFloor] },
  { type: "C", image: villaCImage, plans: [planCRdc, planCFloor] },
] as const;

export type Villa = (typeof villas)[number];

/** Chiffres et mots d'une villa : les nombres viennent de la config, les mots de la langue. */
export function faitsVilla(type: TypeVilla, t: Textes, langue: Langue) {
  const chiffres = villasChiffres[type];
  return {
    surface: formatSurface(chiffres.surfaceConstruiteM2, langue),
    terrain: formatSurface(chiffres.terrainM2, langue),
    suites: t.villas.suites(chiffres.suites),
    tag: t.villas.tags[type],
    description: t.villas.descriptions[type],
  };
}

export const TOUR_URL =
  "https://momento360.com/e/u/d4658634f15c4a3fa6fdb5ef818d3e5a?utm_campaign=embed&utm_source=other&heading=0&pitch=0&field-of-view=75&size=medium&display-plan=true";

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Ouvre la fiche d'une villa depuis n'importe où (menu « Plans », outils). */
export const OPEN_VILLA_EVENT = "citystar:open-villa";
export type OpenVillaDetail = { index?: number; target: "top" | "plans" };

export function openVilla(detail: OpenVillaDetail) {
  window.dispatchEvent(new CustomEvent<OpenVillaDetail>(OPEN_VILLA_EVENT, { detail }));
}

export function scrollTo(id: string) {
  // Les plans vivent dans la fiche villa : « Plans » demande à la section de l'ouvrir.
  if (id === "plans" && !document.getElementById("plans")) {
    openVilla({ target: "plans" });
    return;
  }
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
}

export type CursorHandlers = {
  onCursorEnter: (label: string) => (event: React.MouseEvent) => void;
  onCursorLeave: () => void;
};

/** Réponses d'un outil transmises au formulaire de contact existant. */
export type Selection = { outil: string; lignes: string[] };

/** Le simulateur demande au comparateur de mettre en avant les villas dans un budget. */
export const SHOW_BUDGET_EVENT = "citystar:budget";
export type BudgetDetail = { montant: number; devise: string; langue: string };
