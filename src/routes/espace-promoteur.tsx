import { createFileRoute } from "@tanstack/react-router";

import { PromoteurPage } from "@/components/citystar/pages/PromoteurPage";
import { entete } from "@/components/citystar/seo";
import { SiteChrome } from "@/components/citystar/site";

const LANGUE = "fr" as const;

export const Route = createFileRoute("/espace-promoteur")({
  head: () =>
    entete(LANGUE, "espace-promoteur", {
      titre: "Espace promoteur — CITYSTAR",
      description: "Suivi du chantier CITYSTAR, réservé au promoteur.",
      prive: true,
      seule: true,
    }),
  component: Page,
});

function Page() {
  return (
    <SiteChrome langue={LANGUE}>
      <PromoteurPage />
    </SiteChrome>
  );
}
