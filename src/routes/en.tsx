import { createFileRoute } from "@tanstack/react-router";
import CitystarExperience from "@/components/CitystarExperience";
import { contact, programme } from "@/config/citystar";

export const Route = createFileRoute("/en")({
  head: () => ({
    meta: [
      { title: "CITYSTAR Marrakech — Private luxury villas" },
      { name: "description", content: `CITYSTAR is a private residence of ${programme.nombreVillas} contemporary villas in Marrakech, close to the Palmeraie.` },
      { property: "og:title", content: "CITYSTAR Marrakech — Private luxury villas" },
      { property: "og:description", content: `An exclusive collection of ${programme.nombreVillas} contemporary villas near Marrakech.` },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/en" },
      { property: "og:locale", content: "en_GB" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "/en" },
      { rel: "alternate", hrefLang: "fr", href: "/" },
      { rel: "alternate", hrefLang: "en", href: "/en" },
      { rel: "alternate", hrefLang: "x-default", href: "/" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "RealEstateAgent", name: "CITYSTAR Marrakech", telephone: contact.telephone, email: contact.email, address: { "@type": "PostalAddress", addressLocality: "Oulad Hassoune", addressRegion: "Marrakech-Safi", addressCountry: "MA" } }) }],
  }),
  component: English,
});

function English() {
  return <CitystarExperience langue="en" />;
}
