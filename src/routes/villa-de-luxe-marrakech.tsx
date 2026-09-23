import { createFileRoute } from "@tanstack/react-router";

import { LuxePage } from "@/components/citystar/pages/LuxePage";
import { SiteChrome } from "@/components/citystar/site";
import { textes } from "@/components/citystar/i18n";

const t = textes.fr.pages.luxe;
const chemin = "/villa-de-luxe-marrakech";
const autre = "/en/luxury-villa-marrakech";

export const Route = createFileRoute("/villa-de-luxe-marrakech")({
  head: () => ({
    meta: [
      { title: t.titre },
      { name: "description", content: t.description },
      { property: "og:title", content: t.titre },
      { property: "og:type", content: "website" },
      { property: "og:url", content: chemin },
      { property: "og:locale", content: "fr_FR" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: chemin },
      { rel: "alternate", hrefLang: "fr", href: chemin },
      { rel: "alternate", hrefLang: "en", href: autre },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SiteChrome langue="fr">
      <LuxePage />
    </SiteChrome>
  );
}
