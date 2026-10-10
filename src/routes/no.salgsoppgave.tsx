import { createFileRoute } from "@tanstack/react-router";

import { textesDossier } from "@/components/citystar/dossier/textes";
import { DossierPage } from "@/components/citystar/pages/DossierPage";
import { entete } from "@/components/citystar/seo";
import { SiteChrome } from "@/components/citystar/site";

const LANGUE = "no" as const;
const t = textesDossier[LANGUE];

export const Route = createFileRoute("/no/salgsoppgave")({
  head: () => entete(LANGUE, "dossier", { titre: t.titre, description: t.description }),
  component: Page,
});

function Page() {
  return (
    <SiteChrome langue={LANGUE}>
      <DossierPage />
    </SiteChrome>
  );
}
