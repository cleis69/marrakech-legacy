import villaAImage from "@/assets/citystar/villa-a.jpeg";
import villaBImage from "@/assets/citystar/villa-b.jpeg";
import villaCImage from "@/assets/citystar/villa-c.jpeg";
import planARdc from "@/assets/citystar/plan-a-rdc.png";
import planAFloor from "@/assets/citystar/plan-a-floor.png";
import planBRdc from "@/assets/citystar/plan-b-rdc.png";
import planBFloor from "@/assets/citystar/plan-b-floor.png";
import planCRdc from "@/assets/citystar/plan-c-rdc.png";
import planCFloor from "@/assets/citystar/plan-c-floor.png";

export const villas = [
  { type: "A", image: villaAImage, area: "585 m²", land: "2 000 m²", bedrooms: "5 suites", description: "Pensée pour les résidents à mobilité réduite, avec ascenseur, salles de bains accessibles et espaces généreux pour une circulation fluide.", plans: [planARdc, planAFloor] },
  { type: "B", image: villaBImage, area: "536 m²", land: "2 000 m²", bedrooms: "5 suites", description: "Une architecture exigeante, des matériaux de haute qualité et une conception intelligente, prolongée par de vastes terrasses.", plans: [planBRdc, planBFloor] },
  { type: "C", image: villaCImage, area: "525 m²", land: "2 000 m²", bedrooms: "4 suites", description: "Des volumes contemporains, une piscine privée et des espaces conçus selon les standards architecturaux les plus exigeants.", plans: [planCRdc, planCFloor] },
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

export function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
}

export type CursorHandlers = {
  onCursorEnter: (label: string) => (event: React.MouseEvent) => void;
  onCursorLeave: () => void;
};
