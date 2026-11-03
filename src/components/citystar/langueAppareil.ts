/**
 * Langue de l'appareil du visiteur et langue de sa séquence e-mail. La séquence suit la langue de
 * la page remplie. Seule exception : un visiteur resté sur la version française par défaut, dont
 * l'appareil est en espagnol, italien, néerlandais ou norvégien, la reçoit dans sa langue.
 * L'anglais ne compte pas : beaucoup de francophones ont un téléphone en anglais.
 */

import type { Langue } from "@/config/citystar";

const CLE = "citystar-langue-choisie";
const LANGUES_APPAREIL: readonly Langue[] = ["es", "it", "nl", "no"];

/** Le visiteur a choisi une langue dans le sélecteur : la page affichée n'est plus un défaut. */
export function retenirChoixLangue() {
  try {
    sessionStorage.setItem(CLE, "1");
  } catch {
    // Stockage bloqué : la langue de l'appareil pourra l'emporter sur le français.
  }
}

function langueChoisie() {
  try {
    return sessionStorage.getItem(CLE) === "1";
  } catch {
    return false;
  }
}

/** Langues réglées sur l'appareil, de la préférée à la suivante (« nb-NO, en-US »). */
export function languesAppareil(): string[] {
  const liste = navigator.languages?.length ? navigator.languages : [navigator.language];
  return liste.filter(Boolean).slice(0, 3);
}

export function langueSequence(
  langue: Langue,
  appareil: readonly string[],
  choisie = langueChoisie(),
): Langue {
  if (langue !== "fr" || choisie) return langue;
  const code = (appareil[0] ?? "").toLowerCase().split("-")[0];
  // Le norvégien de l'appareil s'écrit nb (bokmål) ou nn (nynorsk).
  const norvegien = code === "nb" || code === "nn" ? "no" : code;
  return LANGUES_APPAREIL.find((candidate) => candidate === norvegien) ?? langue;
}
