import { FinalCta } from "../FinalCta";
import { HeroSection } from "../HeroSection";
import { KeyFacts } from "../KeyFacts";
import { LifestyleSection } from "../LifestyleSection";
import { LocationSection } from "../LocationSection";
import { Marquee } from "../Marquee";
import { ProjectSection } from "../ProjectSection";
import { useSite } from "../site";
import { VillasSection } from "../VillasSection";

export function HomePage() {
  const { onCursorEnter, onCursorLeave, ouvrirPlan, ouvrirContact } = useSite();
  return (
    <>
      <HeroSection onContact={ouvrirContact} />
      <KeyFacts />
      <ProjectSection />
      <VillasSection onCursorEnter={onCursorEnter} onCursorLeave={onCursorLeave} />
      <LifestyleSection />
      <Marquee />
      <LocationSection onOpenPlan={ouvrirPlan} />
      <FinalCta onContact={ouvrirContact} />
    </>
  );
}
