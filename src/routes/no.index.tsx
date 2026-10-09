import { createFileRoute } from "@tanstack/react-router";

import { HomePage } from "@/components/citystar/pages/HomePage";
import { entete } from "@/components/citystar/seo";
import { SiteChrome } from "@/components/citystar/site";
import { textes } from "@/components/citystar/i18n";
import { programme } from "@/config/citystar";

const LANGUE = "no" as const;
const t = textes[LANGUE].pages.accueil;

export const Route = createFileRoute("/no/")({
  head: () =>
    entete(LANGUE, "", { titre: t.titre, description: t.description(programme.nombreVillas) }),
  component: Page,
});

function Page() {
  return (
    <SiteChrome langue={LANGUE}>
      <HomePage />
    </SiteChrome>
  );
}
