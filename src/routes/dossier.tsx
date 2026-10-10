import { createFileRoute } from "@tanstack/react-router";

import { textesDossier } from "@/components/citystar/dossier/textes";
import { DossierPage } from "@/components/citystar/pages/DossierPage";
import { entete } from "@/components/citystar/seo";
import { SiteChrome } from "@/components/citystar/site";

const LANGUE = "fr" as const;

export const Route = createFileRoute("/dossier")({
  head: () =>
    entete(LANGUE, "dossier", {
      titre: textesDossier.titre,
      description: textesDossier.description,
      seule: true,
    }),
  component: Page,
});

function Page() {
  return (
    <SiteChrome langue={LANGUE}>
      <DossierPage />
    </SiteChrome>
  );
}
