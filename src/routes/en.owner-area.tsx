import { createFileRoute } from "@tanstack/react-router";

import { EspacePage } from "@/components/citystar/pages/EspacePage";
import { SiteChrome } from "@/components/citystar/site";
import { textes } from "@/components/citystar/i18n";

const t = textes.en.pages.espace;
const chemin = "/en/owner-area";
const autre = "/mon-espace";

export const Route = createFileRoute("/en/owner-area")({
  head: () => ({
    meta: [
      { title: t.titre },
      { name: "description", content: t.description },
      // Espace réservé aux propriétaires : rien à y chercher depuis un moteur.
      { name: "robots", content: "noindex" },
      { property: "og:title", content: t.titre },
      { property: "og:type", content: "website" },
      { property: "og:url", content: chemin },
      { property: "og:locale", content: "en_GB" },
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
      <EspacePage />
    </SiteChrome>
  );
}
