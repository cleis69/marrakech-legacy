import type { TypeVilla } from "@/config/citystar";

import { useDevise } from "../currency";
import { FinalCta } from "../FinalCta";
import { Marquee } from "../Marquee";
import { useSite } from "../site";
import { VillaFiche } from "../VillaFiche";

export function VillaPage({ type }: { type: TypeVilla }) {
  const { t } = useDevise();
  const { ouvrirPlan, ouvrirContact } = useSite();
  return (
    <>
      <VillaFiche type={type} onOpenPlan={ouvrirPlan} onContact={ouvrirContact} />
      <Marquee />
      <FinalCta onContact={ouvrirContact} />
      <span className="sr-only">{t.villas.typeVilla(type)}</span>
    </>
  );
}
