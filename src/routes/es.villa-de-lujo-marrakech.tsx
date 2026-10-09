import { createFileRoute } from "@tanstack/react-router";

import { LuxePage } from "@/components/citystar/pages/LuxePage";
import { entete } from "@/components/citystar/seo";
import { SiteChrome } from "@/components/citystar/site";
import { textes } from "@/components/citystar/i18n";

const LANGUE = "es" as const;
const t = textes[LANGUE].pages.luxe;

export const Route = createFileRoute("/es/villa-de-lujo-marrakech")({
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
