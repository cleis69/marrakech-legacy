import { createContext, useContext } from "react";

import type { Langue } from "@/config/citystar";

import type { CursorHandlers, Selection } from "./data";

export type SiteState = CursorHandlers & {
  langue: Langue;
  ouvrirContact: () => void;
  ouvrirContactAvec: (selection: Selection) => void;
  ouvrirPlan: (src: string) => void;
  ouvrirVisite: () => void;
};

export const SiteContext = createContext<SiteState | null>(null);

/** Accès aux fenêtres (contact, plan, visite) et au curseur depuis n'importe quelle page. */
export function useSite() {
  const site = useContext(SiteContext);
  if (!site) throw new Error("useSite doit être utilisé dans SiteChrome");
  return site;
}
