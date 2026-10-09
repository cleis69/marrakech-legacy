import { LANGUES, type Langue } from "@/config/citystar";

import { chemin, slug } from "./liens";

const OG_LOCALE: Record<Langue, string> = {
  fr: "fr_FR",
  en: "en_GB",
  es: "es_ES",
  it: "it_IT",
  nl: "nl_NL",
  no: "nb_NO",
};

/** Adresse d'une page, désignée par sa fin d'adresse française (« » pour l'accueil). */
export function adresse(langue: Langue, cle: string) {
  const [tete = "", ...reste] = cle.split("/");
  return chemin(langue, tete ? [slug(tete, langue), ...reste].join("/") : "");
}

/**
 * Balises communes à toutes les pages : titre, description, Open Graph, adresse
 * canonique et une variante par langue (le français fait office de version par défaut).
 */
export function entete(
  langue: Langue,
  cle: string,
  {
    titre,
    description,
    prive = false,
    seule = false,
  }: { titre: string; description: string; prive?: boolean; seule?: boolean },
) {
  const ici = adresse(langue, cle);
  return {
    meta: [
      { title: titre },
      { name: "description", content: description },
      ...(prive ? [{ name: "robots", content: "noindex" }] : []),
      { property: "og:title", content: titre },
      { property: "og:type", content: "website" },
      { property: "og:url", content: ici },
      { property: "og:locale", content: OG_LOCALE[langue] },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: ici },
      /* Une page qui n'existe qu'en français (l'espace promoteur) n'annonce pas de traductions. */
      ...(seule
        ? []
        : [
            ...LANGUES.map((l) => ({ rel: "alternate", hrefLang: l, href: adresse(l, cle) })),
            { rel: "alternate", hrefLang: "x-default", href: adresse("fr", cle) },
          ]),
    ],
  };
}
