import { createFileRoute } from "@tanstack/react-router";
import CitystarExperience from "@/components/CitystarExperience";
import { contact, programme } from "@/config/citystar";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CITYSTAR Marrakech — Villas de luxe privées" },
      {
        name: "description",
        content: `Découvrez CITYSTAR, une résidence privée de ${programme.nombreVillas} villas contemporaines à Marrakech, proche de la Palmeraie.`,
      },
      { property: "og:title", content: "CITYSTAR Marrakech — Villas de luxe privées" },
      {
        property: "og:description",
        content: `Une collection exclusive de ${programme.nombreVillas} villas contemporaines au cœur de Marrakech.`,
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:locale", content: "fr_FR" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "alternate", hrefLang: "fr", href: "/" },
      { rel: "alternate", hrefLang: "en", href: "/en" },
      { rel: "alternate", hrefLang: "x-default", href: "/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          name: "CITYSTAR Marrakech",
          telephone: contact.telephone,
          email: contact.email,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Oulad Hassoune",
            addressRegion: "Marrakech-Safi",
            addressCountry: "MA",
          },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <CitystarExperience langue="fr" />;
}
