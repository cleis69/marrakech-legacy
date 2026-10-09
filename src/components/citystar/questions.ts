import {
  calendrier,
  engagements,
  formatMois,
  formatPart,
  formatSurface,
  programme,
  reservation,
  villasChiffres,
} from "@/config/citystar";

import { useDevise } from "./currency";

const acompte = reservation.paliers.find((palier) => palier.etape === "reservation");

/** Les questions fréquentes, avec les chiffres de la config dans la langue du visiteur. */
export function useQuestions() {
  const { langue, t } = useDevise();
  return t.faq({
    villas: programme.nombreVillas,
    terrain: formatSurface(programme.terrainMaxM2, langue),
    minutes: programme.trajetMaxMinutes,
    a: formatSurface(villasChiffres.A.surfaceConstruiteM2, langue),
    b: formatSurface(villasChiffres.B.surfaceConstruiteM2, langue),
    c: formatSurface(villasChiffres.C.surfaceConstruiteM2, langue),
    acompte: acompte?.part != null ? formatPart(acompte.part, langue) : "",
    livraison: formatMois(calendrier.livraison, langue),
    fondsPropres: formatPart(engagements.fondsPropres, langue),
  });
}
