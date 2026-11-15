/**
 * Langue de l'appareil du visiteur et langue de sa séquence e-mail. La séquence suit la langue de
 * la page remplie. Seule exception : un visiteur resté sur la version française par défaut, dont
 * l'appareil est en espagnol, italien, néerlandais ou norvégien, la reçoit dans sa langue.
 * L'anglais ne compte pas : beaucoup de francophones ont un téléphone en anglais.
 */

import type { Langue } from "@/config/citystar";

const CLE = "citystar-langue-choisie";
/** Choix fait dans le sélecteur, gardé d'une visite à l'autre : la langue du téléphone ne l'emporte plus. */
const CLE_MANUELLE = "citystar-langue-manuelle";
/** La bascule vers la langue du téléphone n'a lieu qu'une fois par visite. */
const CLE_AUTO = "citystar-langue-auto";
const LANGUES_APPAREIL: readonly Langue[] = ["es", "it", "nl", "no"];

/** Le visiteur a choisi une langue dans le sélecteur : la page affichée n'est plus un défaut. */
export function retenirChoixLangue() {
  try {
    sessionStorage.setItem(CLE, "1");
    localStorage.setItem(CLE_MANUELLE, "1");
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

/** Code de langue de l'appareil → langue du site (le norvégien s'écrit nb ou nn). */
function versLangueSite(code: string): Langue | null {
  const base = code.toLowerCase().split("-")[0] ?? "";
  const norvegien = base === "nb" || base === "nn" ? "no" : base;
  const langues: readonly Langue[] = ["fr", "en", "es", "it", "nl", "no"];
  return langues.find((candidate) => candidate === norvegien) ?? null;
}

const ROBOT = /bot|crawl|spider|slurp|google|lighthouse|headless|preview|facebookexternalhit/i;

/**
 * Langue vers laquelle basculer la page à l'arrivée (15/11/2026, demande de l'utilisateur : chaque
 * visiteur dans la langue de son téléphone). La première langue de l'appareil que le site propose ;
 * l'arabe n'existe pas encore sur le site, il est donc passé (un téléphone « arabe, français » va
 * en français). Jamais pour les robots (référencement, vérification des annonces), jamais après un
 * choix dans le sélecteur, une seule fois par visite. Rend null si la page est déjà la bonne.
 */
export function langueABasculer(langue: Langue): Langue | null {
  try {
    if (ROBOT.test(navigator.userAgent)) return null;
    if (localStorage.getItem(CLE_MANUELLE) === "1" || langueChoisie()) return null;
    if (sessionStorage.getItem(CLE_AUTO) === "1") return null;
    sessionStorage.setItem(CLE_AUTO, "1");
  } catch {
    return null;
  }
  const cible = languesAppareil().map(versLangueSite).find((l): l is Langue => l !== null);
  return cible && cible !== langue ? cible : null;
}
