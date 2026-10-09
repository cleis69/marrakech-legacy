import { createFileRoute } from "@tanstack/react-router";

import { GaleriePage } from "@/components/citystar/pages/GaleriePage";
import { entete } from "@/components/citystar/seo";
import { SiteChrome } from "@/components/citystar/site";
import { textes } from "@/components/citystar/i18n";

const LANGUE = "fr" as const;
const t = textes[LANGUE].pages.galerie;

export const Route = createFileRoute("/galerie")({
  head: () => entete(LANGUE, "galerie", { titre: t.titre, description: t.description }),
  component: Page,
});

function Page() {
  return (
    <SiteChrome langue={LANGUE}>
      <GaleriePage />
    </SiteChrome>
  );
}
