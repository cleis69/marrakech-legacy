import { createFileRoute } from "@tanstack/react-router";

import { LuxePage } from "@/components/citystar/pages/LuxePage";
import { SiteChrome } from "@/components/citystar/site";
import { textes } from "@/components/citystar/i18n";

const t = textes.en.pages.luxe;
const chemin = "/en/luxury-villa-marrakech";
const autre = "/villa-de-luxe-marrakech";

export const Route = createFileRoute("/en/luxury-villa-marrakech")({
  head: () => ({
    meta: [
      { title: t.titre },
      { name: "description", content: t.description },
      { property: "og:title", content: t.titre },
      { property: "og:type", content: "website" },
      { property: "og:url", content: chemin },
      { property: "og:locale", content: "en_GB" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: chemin },
      { rel: "alternate", hrefLang: "fr", href: autre },
      { rel: "alternate", hrefLang: "en", href: chemin },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SiteChrome langue="en">
      <LuxePage />
    </SiteChrome>
  );
}
