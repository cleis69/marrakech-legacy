import { Link } from "@tanstack/react-router";

import type { Langue } from "@/config/citystar";

/** Chemin d'une page dans la langue courante : « villas » → /villas ou /en/villas. */
export function chemin(langue: Langue, sous = "") {
  const base = langue === "en" ? "/en" : "";
  if (!sous) return base || "/";
  return `${base}/${sous}`;
}

/** Les pages dont l'adresse change de langue, pour que la bascule FR/EN ne tombe pas à côté. */
const slugs: Record<string, string> = {
  "villa-de-luxe-marrakech": "luxury-villa-marrakech",
  "luxury-villa-marrakech": "villa-de-luxe-marrakech",
};

/** Traduit la fin d'une adresse : « villa-de-luxe-marrakech » ↔ « luxury-villa-marrakech ». */
export function traduireSous(sous: string) {
  return slugs[sous] ?? sous;
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
  /* L'accueil n'est « page courante » que sur lui-même, pas sur toutes les pages qu'il contient. */
  const accueil = vers === "/" || vers === "/en";
  return (
    <LienRoute
      to={vers}
      activeOptions={{ exact: accueil, includeHash: false }}
      {...(ariaLabel ? { "aria-label": ariaLabel } : {})}
      {...reste}
    />
  );
}
