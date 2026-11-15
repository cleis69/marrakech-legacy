import {
  type Devise,
  type Langue,
  type TypeVilla,
  formatSurface,
  villasChiffres,
} from "@/config/citystar";

import type { Textes } from "./i18n";

// Une vue par type, attribuée d'après la plaquette professionnelle du promoteur (référence validée par le client le 01/11/2026),
// choisie pour aller avec l'accroche du type : B « en terrasses », C « autour de l'eau ».
import villaAImage from "@/assets/citystar/rendus/ext-terrasses-cactus.webp";
import villaBImage from "@/assets/citystar/rendus/ext-terrasse-jour.webp";
import villaCImage from "@/assets/citystar/rendus/ext-aerien-piscine.webp";
import planARdc from "@/assets/citystar/plans/plan-a-rdc.webp";
import planARdcPetit from "@/assets/citystar/plans/plan-a-rdc-sm.webp";
import planAFloor from "@/assets/citystar/plans/plan-a-floor.webp";
import planAFloorPetit from "@/assets/citystar/plans/plan-a-floor-sm.webp";
import planBRdc from "@/assets/citystar/plans/plan-b-rdc.webp";
import planBRdcPetit from "@/assets/citystar/plans/plan-b-rdc-sm.webp";
import planBFloor from "@/assets/citystar/plans/plan-b-floor.webp";
import planBFloorPetit from "@/assets/citystar/plans/plan-b-floor-sm.webp";
import planCRdc from "@/assets/citystar/plans/plan-c-rdc.webp";
import planCRdcPetit from "@/assets/citystar/plans/plan-c-rdc-sm.webp";
import planCFloor from "@/assets/citystar/plans/plan-c-floor.webp";
import planCFloorPetit from "@/assets/citystar/plans/plan-c-floor-sm.webp";

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

/** Visite 360° REV, version à intégrer fournie par le client (une seule langue : il n'existe pas d'intégration anglaise). */
export const TOUR_URL = "https://realestatevision360.com/embed/visite/city-star";

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Défilement vers une ancre de la page courante. */
export function scrollTo(id: string) {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
}

export type CursorHandlers = {
  onCursorEnter: (label: string) => (event: React.MouseEvent) => void;
  onCursorLeave: () => void;
};

/** Réponses d'un outil transmises au formulaire de contact existant ; `villa` : type à présélectionner. */
export type Selection = { outil: string; lignes: string[]; villa?: TypeVilla };

/** Budget tel que le visiteur l'a choisi : le montant garde la devise dans laquelle il l'a vu. */
export type Budget = { montant: number; devise: Devise };

/** Le simulateur envoie son budget au comparateur par l'URL : /villas?budget=1200000 (en euros). */
export const PARAM_BUDGET = "budget";

/**
 * Plans en WebP (15/11/2026) : la grande version (2 000 px) s'ouvre dans la visionneuse, la
 * miniature (720 px) s'affiche dans les fiches et le comparateur. Avant : six PNG de 150 à 350 Ko.
 */
const MINIATURES_PLANS = new Map<string, string>([
  [planARdc, planARdcPetit],
  [planAFloor, planAFloorPetit],
  [planBRdc, planBRdcPetit],
  [planBFloor, planBFloorPetit],
  [planCRdc, planCRdcPetit],
  [planCFloor, planCFloorPetit],
]);
export const miniaturePlan = (plan: string | undefined) =>
  plan ? (MINIATURES_PLANS.get(plan) ?? plan) : undefined;

/* ------------------------------------------------------------------ */
/* Galerie : tous les rendus fournis par le promoteur                   */
/* ------------------------------------------------------------------ */

/* Les copies « nom 2.webp » (anciennes versions lourdes des mêmes photos, laissées dans le dossier)
   sont écartées : elles doublaient dix photos de la galerie, à 110–570 Ko pièce, sans version mobile. */
const modules = import.meta.glob(["@/assets/citystar/rendus/*.webp", "!**/* [0-9].webp"], {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

/* Versions réduites (800 px) des mêmes rendus : le mobile ne télécharge pas les 1600 px. */
const modulesPetits = import.meta.glob("@/assets/citystar/rendus-sm/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const nomFichier = (chemin: string) => chemin.split("/").pop() ?? "";
const petits = new Map(Object.entries(modulesPetits).map(([c, url]) => [nomFichier(c), url]));
const jeux = new Map<string, string>(
  Object.entries(modules).flatMap(([chemin, grand]) => {
    const petit = petits.get(nomFichier(chemin));
    return petit ? [[grand, `${petit} 800w, ${grand} 1600w`] as [string, string]] : [];
  }),
);

/** Jeu d'images (srcset) d'un rendu importé : 800 px pour le mobile, 1600 px pour le grand écran. */
export const srcSetPour = (src: string) => jeux.get(src);

/* Hors galerie : le dessin au trait (il sert à l'architecture). */
const ECARTES = ["-trait"];

/** Rendus triés par nom de fichier. Le nom sert de clé aux textes alternatifs (i18n, rendus.alts). */
export const rendus = Object.entries(modules)
  .filter(([chemin]) => !ECARTES.some((motif) => chemin.includes(motif)))
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([chemin, src]) => ({
    src,
    srcSet: jeux.get(src),
    nom: nomFichier(chemin).replace(".webp", ""),
  }));

/** Texte alternatif d'un rendu dans la langue du visiteur. */
export const altRendu = (t: Textes, nom: string) => t.rendus.alts[nom] ?? nom.replace(/-/g, " ");
