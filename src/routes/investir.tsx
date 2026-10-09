import { createFileRoute } from "@tanstack/react-router";

import { InvestirPage } from "@/components/citystar/pages/InvestirPage";
import { entete } from "@/components/citystar/seo";
import { SiteChrome } from "@/components/citystar/site";
import { textes } from "@/components/citystar/i18n";

const LANGUE = "fr" as const;
const t = textes[LANGUE].pages.investir;

export const Route = createFileRoute("/investir")({
  head: () => entete(LANGUE, "investir", { titre: t.titre, description: t.description }),
  component: Page,
});

function Page() {
  return (
    <SiteChrome langue={LANGUE}>
      <InvestirPage />
    </SiteChrome>
  );
}
