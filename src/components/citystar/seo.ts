import { LANGUES, SITE, contact, programme, type Langue } from "@/config/citystar";

import { chemin, slug } from "./liens";

const OG_LOCALE: Record<Langue, string> = {
  fr: "fr_FR",
  en: "en_GB",
  es: "es_ES",
  it: "it_IT",
  nl: "nl_NL",
  no: "nb_NO",
};

/** Image de partage (réseaux, messageries) : la villa et sa piscine, au format 1200 × 630. */
const IMAGE_PARTAGE = `${SITE}/partage-citystar.jpg`;

/** Adresse d'une page, désignée par sa fin d'adresse française (« » pour l'accueil). */
export function adresse(langue: Langue, cle: string) {
  const [tete = "", ...reste] = cle.split("/");
  return chemin(langue, tete ? [slug(tete, langue), ...reste].join("/") : "");
}

/** La même adresse, complète : les moteurs de recherche demandent le domaine dans les balises. */
const complete = (langue: Langue, cle: string) => `${SITE}${adresse(langue, cle)}`;

/**
 * Données structurées de l'accueil : l'entreprise, le site et le domaine lui-même.
 * Les moteurs de recherche et les assistants IA s'en servent pour décrire CITYSTAR.
 */
function donneesAccueil(langue: Langue, description: string) {
  const { coordonnees } = programme;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE}/#organisation`,
        name: "CITYSTAR",
        url: `${SITE}/`,
        logo: `${SITE}/icon-512.png`,
        email: contact.email,
        telephone: contact.telephone,
        sameAs: Object.values(contact.reseaux),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE}/#site`,
        url: `${SITE}/`,
        name: "CITYSTAR Marrakech",
        inLanguage: [...LANGUES],
        publisher: { "@id": `${SITE}/#organisation` },
      },
      {
        "@type": "GatedResidenceCommunity",
        "@id": `${SITE}/#domaine`,
        name: "CITYSTAR",
        url: complete(langue, ""),
        description,
        image: IMAGE_PARTAGE,
        address: {
          "@type": "PostalAddress",
          streetAddress: contact.adresse.rue,
          addressLocality: contact.adresse.ville,
          postalCode: contact.adresse.codePostal,
          addressCountry: contact.adresse.pays,
        },
        ...(coordonnees.confirme
          ? {
              geo: {
                "@type": "GeoCoordinates",
                latitude: coordonnees.latitude,
                longitude: coordonnees.longitude,
              },
            }
          : {}),
        containedInPlace: { "@type": "City", name: "Marrakech" },
      },
    ],
  };
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
  const ici = complete(langue, cle);
  return {
    meta: [
      { title: titre },
      { name: "description", content: description },
      ...(prive ? [{ name: "robots", content: "noindex" }] : []),
      { property: "og:title", content: titre },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: ici },
      { property: "og:site_name", content: "CITYSTAR" },
      { property: "og:locale", content: OG_LOCALE[langue] },
      { property: "og:image", content: IMAGE_PARTAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: IMAGE_PARTAGE },
    ],
    links: [
      { rel: "canonical", href: ici },
      /* Une page qui n'existe qu'en français (l'espace promoteur) n'annonce pas de traductions. */
      ...(seule
        ? []
        : [
            ...LANGUES.map((l) => ({ rel: "alternate", hrefLang: l, href: complete(l, cle) })),
            { rel: "alternate", hrefLang: "x-default", href: complete("fr", cle) },
          ]),
    ],
    scripts:
      cle === ""
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify(donneesAccueil(langue, description)),
            },
          ]
        : [],
  };
}
