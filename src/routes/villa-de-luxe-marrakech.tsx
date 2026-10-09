import { createFileRoute } from "@tanstack/react-router";

import { LuxePage } from "@/components/citystar/pages/LuxePage";
import { entete } from "@/components/citystar/seo";
import { SiteChrome } from "@/components/citystar/site";
import { textes } from "@/components/citystar/i18n";

const LANGUE = "fr" as const;
const t = textes[LANGUE].pages.luxe;

export const Route = createFileRoute("/villa-de-luxe-marrakech")({
  head: () =>
    entete(LANGUE, "villa-de-luxe-marrakech", { titre: t.titre, description: t.description }),
  component: Page,
});

function Page() {
  return (
    <SiteChrome langue={LANGUE}>
      <LuxePage />
    </SiteChrome>
  );
}
