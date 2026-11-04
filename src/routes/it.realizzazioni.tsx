import { createFileRoute } from "@tanstack/react-router";

import { RealisationsPage } from "@/components/citystar/pages/RealisationsPage";
import { textesRealisations } from "@/components/citystar/realisations";
import { entete } from "@/components/citystar/seo";
import { SiteChrome } from "@/components/citystar/site";

const LANGUE = "it" as const;
const t = textesRealisations[LANGUE];

export const Route = createFileRoute("/it/realizzazioni")({
  head: () => entete(LANGUE, "realisations", { titre: t.titre, description: t.description }),
  component: Page,
});

function Page() {
  return (
    <SiteChrome langue={LANGUE}>
      <RealisationsPage />
    </SiteChrome>
  );
}
