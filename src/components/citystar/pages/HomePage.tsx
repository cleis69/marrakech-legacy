import { CalendrierSection } from "../CalendrierSection";
import { FinalCta } from "../FinalCta";
import { HeroSection } from "../HeroSection";
import { LifestyleSection } from "../LifestyleSection";
import { LocationSection } from "../LocationSection";
import { Marquee } from "../Marquee";
import { ProjectSection } from "../ProjectSection";
import { Ruban } from "../Ruban";
import { useSite } from "../site";
import { VillasSection } from "../VillasSection";
import { YieldSimulator } from "../YieldSimulator";

export function HomePage() {
  const { onCursorEnter, onCursorLeave, ouvrirPlan, ouvrirContact, ouvrirContactAvec } = useSite();
  return (
    <>
      <HeroSection onContact={ouvrirContact} />
      <ProjectSection />
      <VillasSection onCursorEnter={onCursorEnter} onCursorLeave={onCursorLeave} />
      <Ruban />
      <LifestyleSection />
      <Marquee />
      <LocationSection onOpenPlan={ouvrirPlan} />
      <CalendrierSection />
      <YieldSimulator onContact={ouvrirContactAvec} />
      <FinalCta onContact={ouvrirContact} />
    </>
  );
}
