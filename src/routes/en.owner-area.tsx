import { createFileRoute } from "@tanstack/react-router";

import { EspacePage } from "@/components/citystar/pages/EspacePage";
import { entete } from "@/components/citystar/seo";
import { SiteChrome } from "@/components/citystar/site";
import { textes } from "@/components/citystar/i18n";

const LANGUE = "en" as const;
const t = textes[LANGUE].pages.espace;

export const Route = createFileRoute("/en/owner-area")({
  head: () =>
    entete(LANGUE, "mon-espace", { titre: t.titre, description: t.description, prive: true }),
  component: Page,
});

function Page() {
  return (
    <SiteChrome langue={LANGUE}>
      <EspacePage />
    </SiteChrome>
  );
}
