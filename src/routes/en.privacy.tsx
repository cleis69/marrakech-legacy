import { createFileRoute } from "@tanstack/react-router";

import { confidentialite } from "@/components/citystar/confidentialite";
import { ConfidentialitePage } from "@/components/citystar/pages/ConfidentialitePage";
import { entete } from "@/components/citystar/seo";
import { SiteChrome } from "@/components/citystar/site";

const LANGUE = "en" as const;
const t = confidentialite[LANGUE];

export const Route = createFileRoute("/en/privacy")({
  head: () => entete(LANGUE, "confidentialite", { titre: t.titre, description: t.description }),
  component: Page,
});

function Page() {
  return (
    <SiteChrome langue={LANGUE}>
      <ConfidentialitePage />
    </SiteChrome>
  );
}
