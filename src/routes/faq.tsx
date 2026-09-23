import { createFileRoute } from "@tanstack/react-router";

import { FaqPage } from "@/components/citystar/pages/FaqPage";
import { SiteChrome } from "@/components/citystar/site";
import { textes } from "@/components/citystar/i18n";
import { programme } from "@/config/citystar";

const t = textes.fr.pages.faq;
const chemin = "/faq";
const autre = "/en/faq";

export const Route = createFileRoute("/faq")({
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
      <FaqPage />
    </SiteChrome>
  );
}
