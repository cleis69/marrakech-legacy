import { createContext, useContext } from "react";

import type { Langue } from "@/config/citystar";

import type { CursorHandlers, Selection } from "./data";

export type SiteState = CursorHandlers & {
  langue: Langue;
  /** Page d'atterrissage : une seule action, le formulaire affiché dans la page ; ni menu ni lien sortant. */
  tunnel: boolean;
  /** Réponses d'un outil à joindre au formulaire de la page d'atterrissage. */
  selection: Selection | null;
  ouvrirContact: () => void;
  ouvrirContactAvec: (selection: Selection) => void;
  ouvrirPlan: (src: string) => void;
  ouvrirVisite: () => void;
};

/** Identifiant du formulaire affiché dans la page d'atterrissage. */
export const ID_DEMANDE = "demande";
/** Classe de chaque formulaire de la page d'atterrissage : il y en a plusieurs au fil de la page. */
export const CLASSE_DEMANDE = "js-demande";

export const SiteContext = createContext<SiteState | null>(null);

/** Accès aux fenêtres (contact, plan, visite) et au curseur depuis n'importe quelle page. */
export function useSite() {
  const site = useContext(SiteContext);
  if (!site) throw new Error("useSite doit être utilisé dans SiteChrome");
  return site;
}
