import { createFileRoute, notFound } from "@tanstack/react-router";

import { VillaPage } from "@/components/citystar/pages/VillaPage";
import { entete } from "@/components/citystar/seo";
import { SiteChrome } from "@/components/citystar/site";
import { textes } from "@/components/citystar/i18n";
import { type TypeVilla, formatSurface, villasChiffres } from "@/config/citystar";

const LANGUE = "it" as const;
const TYPES: TypeVilla[] = ["A", "B", "C"];

/** Le type de villa vient de l'URL : …/villas/a, …/villas/b, …/villas/c. */
function lireType(brut: string): TypeVilla {
  const type = brut.toUpperCase() as TypeVilla;
  if (!TYPES.includes(type)) throw notFound();
  return type;
}

export const Route = createFileRoute("/it/villas/$type")({
  head: ({ params }) => {
    const brut = (params as { type: string }).type.toLowerCase();
    const type = brut.toUpperCase() as TypeVilla;
    const t = textes[LANGUE];
    const chiffres = villasChiffres[type] ?? villasChiffres.A;
    return entete(LANGUE, `villas/${brut}`, {
      titre: t.pages.villa.titre(type),
      description: t.pages.villa.description(
        type,
        formatSurface(chiffres.surfaceConstruiteM2, LANGUE),
        t.villas.suites(chiffres.suites),
      ),
    });
  },
  component: Page,
});

function Page() {
  const { type } = Route.useParams();
  return (
    <SiteChrome langue={LANGUE}>
      <VillaPage type={lireType(type)} />
    </SiteChrome>
  );
}
