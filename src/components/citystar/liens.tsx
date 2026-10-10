import { Link } from "@tanstack/react-router";

export * from "./adresses";

/** Fichier de public/ (PDF…) : la base de l'hébergement est ajoutée, sinon le lien casse sur GitHub Pages. */
export const fichierPublic = (chemin: string) => `${import.meta.env.BASE_URL}${chemin}`;

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
