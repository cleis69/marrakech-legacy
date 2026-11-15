import type { TypeVilla } from "@/config/citystar";

import { useDevise } from "../currency";
import { useSite } from "../site";
import { VillaFiche } from "../VillaFiche";
import { DossierAppel } from "../dossier/sections";

export function VillaPage({ type }: { type: TypeVilla }) {
  const { t } = useDevise();
  const { ouvrirPlan, ouvrirContact } = useSite();
  return (
    <>
      <VillaFiche type={type} onOpenPlan={ouvrirPlan} onContact={ouvrirContact} />
      <DossierAppel />
      <span className="sr-only">{t.villas.typeVilla(type)}</span>
    </>
  );
}
