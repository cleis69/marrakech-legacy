import { ArchitectureSection } from "../ArchitectureSection";
import { useDevise } from "../currency";
import { FinalCta } from "../FinalCta";
import { Galerie } from "../Galerie";
import { Marquee } from "../Marquee";
import { PageHeader } from "../PageHeader";
import { useSite } from "../site";
import { TourSection } from "../TourSection";

export function GaleriePage() {
  const { t } = useDevise();
  const { ouvrirVisite, ouvrirContact } = useSite();
  return (
    <>
      <PageHeader
        kicker={t.pages.galerie.kicker}
        titre={t.pages.galerie.titreH1}
        intro={t.pages.galerie.intro}
      />
      <Galerie />
      <ArchitectureSection />
      <TourSection onOpenTour={ouvrirVisite} />
      <Marquee />
      <FinalCta onContact={ouvrirContact} />
    </>
  );
}
