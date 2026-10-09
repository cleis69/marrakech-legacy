import { createFileRoute } from "@tanstack/react-router";

import { VillasPage } from "@/components/citystar/pages/VillasPage";
import { entete } from "@/components/citystar/seo";
import { SiteChrome } from "@/components/citystar/site";
import { textes } from "@/components/citystar/i18n";

const LANGUE = "it" as const;
const t = textes[LANGUE].pages.villas;

export const Route = createFileRoute("/it/villas/")({
  head: () => entete(LANGUE, "villas", { titre: t.titre, description: t.description }),
  component: Page,
});

function Page() {
  return (
    <SiteChrome langue={LANGUE}>
      <VillasPage />
    </SiteChrome>
  );
}
