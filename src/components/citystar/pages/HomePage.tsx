import { CalendrierSection } from "../CalendrierSection";
import { EngagementsSection } from "../EngagementsSection";
import { FinalCta } from "../FinalCta";
import { HeroSection } from "../HeroSection";
import { LifestyleSection } from "../LifestyleSection";
import { LocationSection } from "../LocationSection";
import { MarcheSection } from "../MarcheSection";
import { Marquee } from "../Marquee";
import { ProjectSection } from "../ProjectSection";
import { TourSection } from "../TourSection";
import { QuestionsSection } from "../QuestionsSection";
import { Ruban } from "../Ruban";
import { useSite } from "../site";
import { VillasSection } from "../VillasSection";
import { YieldSimulator } from "../YieldSimulator";

export function HomePage() {
  const {
    onCursorEnter,
    onCursorLeave,
    ouvrirPlan,
    ouvrirContact,
    ouvrirContactAvec,
    ouvrirVisite,
  } = useSite();
  return (
    <>
      <HeroSection onContact={ouvrirContact} />
      <ProjectSection />
      <EngagementsSection />
      <VillasSection onCursorEnter={onCursorEnter} onCursorLeave={onCursorLeave} />
      <Ruban />
      <LifestyleSection />
      <TourSection onOpenTour={ouvrirVisite} />
      <Marquee />
      <LocationSection onOpenPlan={ouvrirPlan} />
      <MarcheSection />
      <CalendrierSection />
      <YieldSimulator onContact={ouvrirContactAvec} />
      <QuestionsSection />
      <FinalCta />
    </>
  );
}
