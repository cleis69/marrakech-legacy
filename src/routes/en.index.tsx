import { createFileRoute } from "@tanstack/react-router";

import { HomePage } from "@/components/citystar/pages/HomePage";
import { SiteChrome } from "@/components/citystar/site";
import { textes } from "@/components/citystar/i18n";
import { programme } from "@/config/citystar";

const t = textes.en.pages.accueil;
const chemin = "/en";
const autre = "/";

export const Route = createFileRoute("/en/")({
  head: () => ({
    meta: [
      { title: t.titre },
      { name: "description", content: t.description(programme.nombreVillas) },
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
      <HomePage />
    </SiteChrome>
  );
}
