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

/** Réponses d'un outil transmises au formulaire de contact existant. */
export type Selection = { outil: string; lignes: string[] };

/** Budget tel que le visiteur l'a choisi : le montant garde la devise dans laquelle il l'a vu. */
export type Budget = { montant: number; devise: Devise };

/** Le simulateur envoie son budget au comparateur par l'URL : /villas?budget=1200000 (en euros). */
export const PARAM_BUDGET = "budget";

/* ------------------------------------------------------------------ */
/* Galerie : tous les rendus fournis par le promoteur                   */
/* ------------------------------------------------------------------ */

const modules = import.meta.glob("@/assets/citystar/rendus/*.webp", {
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
