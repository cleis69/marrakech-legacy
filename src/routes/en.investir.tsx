import { createFileRoute } from "@tanstack/react-router";

import { InvestirPage } from "@/components/citystar/pages/InvestirPage";
import { SiteChrome } from "@/components/citystar/site";
import { textes } from "@/components/citystar/i18n";
import { programme } from "@/config/citystar";

const t = textes.en.pages.investir;
const chemin = "/en/investir";
const autre = "/investir";

export const Route = createFileRoute("/en/investir")({
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
      <InvestirPage />
    </SiteChrome>
  );
}
