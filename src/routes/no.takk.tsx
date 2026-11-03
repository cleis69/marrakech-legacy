import { createFileRoute } from "@tanstack/react-router";

import { merci } from "@/components/citystar/merci";
import { MerciPage } from "@/components/citystar/pages/MerciPage";
import { entete } from "@/components/citystar/seo";
import { SiteChrome } from "@/components/citystar/site";

const LANGUE = "no" as const;
const t = merci[LANGUE];

/* Page d'arrivée des formulaires de pub : hors des moteurs de recherche. */
export const Route = createFileRoute("/no/takk")({
  head: () => entete(LANGUE, "merci", { titre: t.titre, description: t.description, prive: true }),
  component: Page,
});

function Page() {
  return (
    <SiteChrome langue={LANGUE}>
      <MerciPage />
    </SiteChrome>
  );
}
