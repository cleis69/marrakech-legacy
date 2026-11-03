import { createFileRoute } from "@tanstack/react-router";

import { mentions } from "@/components/citystar/mentions";
import { ConfidentialitePage } from "@/components/citystar/pages/ConfidentialitePage";
import { entete } from "@/components/citystar/seo";
import { SiteChrome } from "@/components/citystar/site";

const LANGUE = "en" as const;
const t = mentions[LANGUE];

export const Route = createFileRoute("/en/legal-notice")({
  head: () => entete(LANGUE, "mentions-legales", { titre: t.titre, description: t.description }),
  component: Page,
});

function Page() {
  return (
    <SiteChrome langue={LANGUE}>
      <ConfidentialitePage textes={mentions} />
    </SiteChrome>
  );
}
