import { createFileRoute } from "@tanstack/react-router";

import { FaqPage } from "@/components/citystar/pages/FaqPage";
import { entete } from "@/components/citystar/seo";
import { SiteChrome } from "@/components/citystar/site";
import { textes } from "@/components/citystar/i18n";

const LANGUE = "es" as const;
const t = textes[LANGUE].pages.faq;

export const Route = createFileRoute("/es/faq")({
  head: () => entete(LANGUE, "faq", { titre: t.titre, description: t.description }),
  component: Page,
});

function Page() {
  return (
    <SiteChrome langue={LANGUE}>
      <FaqPage />
    </SiteChrome>
  );
}
