import { FinalCta } from "../FinalCta";
import { Marquee } from "../Marquee";
import { PageHeader } from "../PageHeader";
import { useSite } from "../site";
import { useDevise } from "../currency";
import { VillaComparator } from "../VillaComparator";
import { VillaSelector } from "../VillaSelector";
import { VillasSection } from "../VillasSection";

export function VillasPage() {
  const { t } = useDevise();
  const { onCursorEnter, onCursorLeave, ouvrirPlan, ouvrirContact, ouvrirContactAvec } = useSite();
  return (
    <>
      <PageHeader
        kicker={t.pages.villas.kicker}
        titre={t.villas.titre}
        intro={t.pages.villas.intro}
      />
      <VillasSection onCursorEnter={onCursorEnter} onCursorLeave={onCursorLeave} sansEntete />
      <VillaSelector onContact={ouvrirContactAvec} />
      <VillaComparator onOpenPlan={ouvrirPlan} />
      <Marquee />
      <FinalCta onContact={ouvrirContact} />
    </>
  );
}
