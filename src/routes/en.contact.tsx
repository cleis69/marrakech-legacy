import { createFileRoute } from "@tanstack/react-router";

import { ContactPage } from "@/components/citystar/pages/ContactPage";
import { entete } from "@/components/citystar/seo";
import { SiteChrome } from "@/components/citystar/site";
import { textes } from "@/components/citystar/i18n";

const LANGUE = "en" as const;
const t = textes[LANGUE].pages.contact;

export const Route = createFileRoute("/en/contact")({
  head: () => entete(LANGUE, "contact", { titre: t.titre, description: t.description }),
  component: Page,
});

function Page() {
  return (
    <SiteChrome langue={LANGUE}>
      <ContactPage />
    </SiteChrome>
  );
}
