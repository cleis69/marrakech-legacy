import { createFileRoute } from "@tanstack/react-router";
import CitystarExperience from "@/components/CitystarExperience";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CITYSTAR Marrakech — Villas de luxe privées" },
      { name: "description", content: "Découvrez CITYSTAR, une résidence privée de 14 villas contemporaines à Marrakech, proche de la Palmeraie." },
      { property: "og:title", content: "CITYSTAR Marrakech — Villas de luxe privées" },
      { property: "og:description", content: "Une collection exclusive de 14 villas contemporaines au cœur de Marrakech." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "RealEstateAgent", name: "CITYSTAR Marrakech", telephone: "+212661825359", email: "Promoimmomarrakech@gmail.com", address: { "@type": "PostalAddress", addressLocality: "Oulad Hassoune", addressRegion: "Marrakech-Safi", addressCountry: "MA" } }) }],
  }),
  component: Index,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
function Index() {
  return <CitystarExperience />;
}
