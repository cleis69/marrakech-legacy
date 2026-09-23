import { Link } from "@tanstack/react-router";

import type { Langue } from "@/config/citystar";

/** Chemin d'une page dans la langue courante : « villas » → /villas ou /en/villas. */
export function chemin(langue: Langue, sous = "") {
  const base = langue === "en" ? "/en" : "";
  if (!sous) return base || "/";
  return `${base}/${sous}`;
}

type Props = {
  vers: string;
  className?: string;
  ariaLabel?: string;
  hrefLang?: string;
  onMouseEnter?: (event: React.MouseEvent) => void;
  onMouseLeave?: () => void;
  children?: React.ReactNode;
};

/**
 * Lien interne. Le chemin est construit selon la langue : il n'est pas connu du
 * typage des routes, d'où la conversion, faite une seule fois ici.
 */
const LienRoute = Link as unknown as React.ComponentType<Record<string, unknown>>;

export function Lien({ vers, ariaLabel, ...reste }: Props) {
  return <LienRoute to={vers} {...(ariaLabel ? { "aria-label": ariaLabel } : {})} {...reste} />;
}
