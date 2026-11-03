import { createFileRoute } from "@tanstack/react-router";

import { RealisationsPage } from "@/components/citystar/pages/RealisationsPage";
import { textesRealisations } from "@/components/citystar/realisations";
import { entete } from "@/components/citystar/seo";
import { SiteChrome } from "@/components/citystar/site";

const LANGUE = "fr" as const;
const t = textesRealisations[LANGUE]!;

/* Hors des moteurs de recherche et en français seulement, tant que le promoteur n'a pas validé les textes. */
export const Route = createFileRoute("/realisations")({
  head: () =>
    entete(LANGUE, "realisations", {
      titre: t.titre,
      description: t.description,
      prive: true,
      seule: true,
    }),
  component: Page,
});

function Page() {
  return (
    <SiteChrome langue={LANGUE}>
      <RealisationsPage />
    </SiteChrome>
  );
}
