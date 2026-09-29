import { useState } from "react";

import type { TypeVilla } from "@/config/citystar";

import { FinalCta } from "../FinalCta";
import { Marquee } from "../Marquee";
import { PageHeader } from "../PageHeader";
import { useSite } from "../site";
import { useDevise } from "../currency";
import type { Budget } from "../data";
import { VillaComparator } from "../VillaComparator";
import { VillaSelector } from "../VillaSelector";

/**
 * Page de décision : le quiz recommande, le comparateur confirme. Les portes A/B/C
 * restent sur l'accueil ; ici, les fiches s'ouvrent depuis les colonnes du comparateur.
 */
export function VillasPage() {
  const { t } = useDevise();
  const { ouvrirPlan, ouvrirContact, ouvrirContactAvec } = useSite();
  const [reference, setReference] = useState<{
    type: TypeVilla;
    budget: Budget | null;
    n: number;
  } | null>(null);
  return (
    <>
      <PageHeader
        kicker={t.pages.villas.kicker}
        titre={t.pages.villas.titreH1}
        intro={t.pages.villas.intro}
      />
      <VillaSelector
        onContact={ouvrirContactAvec}
        onComparer={(type, budget) =>
          setReference((courant) => ({ type, budget, n: (courant?.n ?? 0) + 1 }))
        }
      />
      <VillaComparator
        onOpenPlan={ouvrirPlan}
        onContact={ouvrirContactAvec}
        reference={reference}
      />
      <Marquee />
      <FinalCta onContact={ouvrirContact} />
    </>
  );
}
