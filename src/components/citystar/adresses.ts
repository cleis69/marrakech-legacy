/**
 * Adresses du site dans les six langues, sans dépendance au routeur : le site
 * les utilise, et les scripts hors navigateur aussi (e-mails).
 */
import { LANGUES, type Langue } from "@/config/citystar";

/** Préfixe d'adresse d'une langue : rien pour le français, /en, /es, /it, /nl, /no pour les autres. */
export const prefixe = (langue: Langue) => (langue === "fr" ? "" : `/${langue}`);

/** Chemin d'une page dans une langue : « villas » → /villas, /en/villas, /es/villas… */
export function chemin(langue: Langue, sous = "") {
  const base = prefixe(langue);
  if (!sous) return base || "/";
  return `${base}/${sous}`;
}

/** Les pages dont l'adresse se traduit, rangées sous leur nom français. */
const SLUGS: Record<string, Record<Langue, string>> = {
  "villa-de-luxe-marrakech": {
    fr: "villa-de-luxe-marrakech",
    en: "luxury-villa-marrakech",
    es: "villa-de-lujo-marrakech",
    it: "villa-di-lusso-marrakech",
    nl: "luxe-villa-marrakech",
    no: "luksusvilla-marrakech",
  },
  dossier: {
    fr: "dossier",
    en: "information-pack",
    es: "dossier",
    it: "dossier",
    nl: "informatiepakket",
    no: "salgsoppgave",
  },
  "mon-espace": {
    fr: "mon-espace",
    en: "owner-area",
    es: "area-propietarios",
    it: "area-proprietari",
    nl: "eigenaarsportaal",
    no: "eierportal",
  },
};

/** Adresse d'une page (désignée par son nom français) dans une langue. */
export function slug(cle: string, langue: Langue) {
  return SLUGS[cle]?.[langue] ?? cle;
}

/** Fin d'adresse française, quelle que soit la langue de départ. */
function versFrancais(sous: string) {
  const [tete = "", ...reste] = sous.split("/");
  const cle = Object.keys(SLUGS).find((nom) => Object.values(SLUGS[nom] ?? {}).includes(tete));
  return [cle ?? tete, ...reste].join("/");
}

/** Langue d'une adresse : /en/villas → en ; /villas → fr. */
export function langueDe(pathname: string): Langue {
  const premier = pathname.split("/")[1] ?? "";
  return LANGUES.find((langue) => langue !== "fr" && langue === premier) ?? "fr";
}

/** La même page dans une autre langue, adresse traduite comprise. */
export function memePage(pathname: string, vers: Langue) {
  const depart = langueDe(pathname);
  const sous = pathname
    .replace(/^\//, "")
    .slice(depart === "fr" ? 0 : depart.length + 1)
    .replace(/^\//, "");
  const [tete = "", ...reste] = versFrancais(sous).split("/");
  return chemin(vers, tete ? [slug(tete, vers), ...reste].join("/") : "");
}

/** Adresse de l'espace propriétaire dans une langue. */
export const cheminEspace = (langue: Langue) => chemin(langue, slug("mon-espace", langue));

