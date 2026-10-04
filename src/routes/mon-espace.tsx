import { createFileRoute } from "@tanstack/react-router";

import { EspacePage } from "@/components/citystar/pages/EspacePage";
import { SiteChrome } from "@/components/citystar/site";
import { textes } from "@/components/citystar/i18n";

const t = textes.fr.pages.espace;
const chemin = "/mon-espace";
const autre = "/en/owner-area";

export const Route = createFileRoute("/mon-espace")({
  head: () => ({
    meta: [
      { title: t.titre },
      { name: "description", content: t.description },
      // Espace réservé aux propriétaires : rien à y chercher depuis un moteur.
      { name: "robots", content: "noindex" },
      { property: "og:title", content: t.titre },
      { property: "og:type", content: "website" },
      { property: "og:url", content: chemin },
      { property: "og:locale", content: "fr_FR" },
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
      <EspacePage />
    </SiteChrome>
  );
}
