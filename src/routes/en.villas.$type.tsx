import { createFileRoute, notFound } from "@tanstack/react-router";

import { VillaPage } from "@/components/citystar/pages/VillaPage";
import { SiteChrome } from "@/components/citystar/site";
import { textes } from "@/components/citystar/i18n";
import { type TypeVilla, formatSurface, villasChiffres } from "@/config/citystar";

const LANGUE = "en" as const;
const TYPES: TypeVilla[] = ["A", "B", "C"];

/** Le type de villa vient de l'URL : /villas/a, /villas/b, /villas/c. */
function lireType(brut: string): TypeVilla {
  const type = brut.toUpperCase() as TypeVilla;
  if (!TYPES.includes(type)) throw notFound();
  return type;
}

export const Route = createFileRoute("/en/villas/$type")({
  head: ({ params }) => {
    const type = (params as { type: string }).type.toUpperCase() as TypeVilla;
    const t = textes[LANGUE];
    const chiffres = villasChiffres[type] ?? villasChiffres.A;
    const chemin = "/en/villas/" + (params as { type: string }).type.toLowerCase();
    const autre = "/villas/" + (params as { type: string }).type.toLowerCase();
    return {
      meta: [
        { title: t.pages.villa.titre(type) },
        {
          name: "description",
          content: t.pages.villa.description(
            type,
            formatSurface(chiffres.surfaceConstruiteM2, LANGUE),
            t.villas.suites(chiffres.suites),
          ),
        },
        { property: "og:title", content: t.pages.villa.titre(type) },
        { property: "og:type", content: "website" },
        { property: "og:url", content: chemin },
        { property: "og:locale", content: "en_GB" },
      ],
      links: [
        { rel: "canonical", href: chemin },
        { rel: "alternate", hrefLang: "fr", href: autre },
        { rel: "alternate", hrefLang: "en", href: chemin },
      ],
    };
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
