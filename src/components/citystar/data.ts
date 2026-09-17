import { formatSurface, villasChiffres } from "@/config/citystar";
import villaAImage from "@/assets/citystar/site/ext-type-a.jpg";
import villaBImage from "@/assets/citystar/site/ext-palms.jpg";
import villaCImage from "@/assets/citystar/site/ext-aerial.jpg";
import planARdc from "@/assets/citystar/plan-a-rdc.png";
import planAFloor from "@/assets/citystar/plan-a-floor.png";
import planBRdc from "@/assets/citystar/plan-b-rdc.png";
import planBFloor from "@/assets/citystar/plan-b-floor.png";
import planCRdc from "@/assets/citystar/plan-c-rdc.png";
import planCFloor from "@/assets/citystar/plan-c-floor.png";

export const villas = [
  { type: "A", tag: "Accessible", image: villaAImage, area: formatSurface(villasChiffres.A.surfaceConstruiteM2), land: formatSurface(villasChiffres.A.terrainM2), bedrooms: `${villasChiffres.A.suites} suites`, description: "Pensée pour les résidents à mobilité réduite : ascenseur, salles de bains accessibles et circulations généreuses.", plans: [planARdc, planAFloor] },
  { type: "B", tag: "Terrasses", image: villaBImage, area: formatSurface(villasChiffres.B.surfaceConstruiteM2), land: formatSurface(villasChiffres.B.terrainM2), bedrooms: `${villasChiffres.B.suites} suites`, description: "Une architecture exigeante et des matériaux de haute qualité, prolongés par de vastes terrasses.", plans: [planBRdc, planBFloor] },
  { type: "C", tag: "Contemporaine", image: villaCImage, area: formatSurface(villasChiffres.C.surfaceConstruiteM2), land: formatSurface(villasChiffres.C.terrainM2), bedrooms: `${villasChiffres.C.suites} suites`, description: "Des volumes contemporains et une piscine privée, selon les standards architecturaux les plus exigeants.", plans: [planCRdc, planCFloor] },
] as const;

export type Villa = (typeof villas)[number];

export const navItems = [
  ["Le projet", "project"], ["Architecture", "architecture"], ["Les villas", "villas"],
  ["Plans", "plans"], ["Visite 360°", "visite"], ["Localisation", "localisation"],
] as const;

export const TOUR_URL = "https://momento360.com/e/u/d4658634f15c4a3fa6fdb5ef818d3e5a?utm_campaign=embed&utm_source=other&heading=0&pitch=0&field-of-view=75&size=medium&display-plan=true";

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
  document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
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
