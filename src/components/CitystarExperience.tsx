import { AnimatePresence, MotionConfig, motion, useMotionValue, useScroll } from "motion/react";
import { useEffect, useState } from "react";

import { ArchitectureSection } from "./citystar/ArchitectureSection";
import { ContactPanel } from "./citystar/ContactPanel";
import type { Langue } from "@/config/citystar";

import type { Selection } from "./citystar/data";
import { DeviseProvider } from "./citystar/currency";
import { FeeCalculator } from "./citystar/FeeCalculator";
import { FinalCta } from "./citystar/FinalCta";
import { FloatingActions } from "./citystar/FloatingActions";
import { HeroSection } from "./citystar/HeroSection";
import { LifestyleSection } from "./citystar/LifestyleSection";
import { LocationSection } from "./citystar/LocationSection";
import { PlanModal } from "./citystar/PlanModal";
import { ProjectSection } from "./citystar/ProjectSection";
import { SiteFooter } from "./citystar/SiteFooter";
import { SiteHeader } from "./citystar/SiteHeader";
import { TourModal } from "./citystar/TourModal";
import { TourSection } from "./citystar/TourSection";
import { VillaComparator } from "./citystar/VillaComparator";
import { VillaSelector } from "./citystar/VillaSelector";
import { YieldSimulator } from "./citystar/YieldSimulator";
import { VillasSection } from "./citystar/VillasSection";

export default function CitystarExperience({ langue = "fr" }: { langue?: Langue }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [planOpen, setPlanOpen] = useState<string | null>(null);
  const [tourOpen, setTourOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [selection, setSelection] = useState<Selection | null>(null);
  /* Position du curseur en valeurs de mouvement : aucun re-rendu à chaque mousemove. */
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [cursorLabel, setCursorLabel] = useState("");
  const { scrollYProgress } = useScroll();

  /* La langue de la page suit la route, pour les lecteurs d'écran et les moteurs. */
  useEffect(() => { document.documentElement.lang = langue; }, [langue]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onCursorEnter = (label: string) => (event: React.MouseEvent) => {
    cursorX.set(event.clientX);
    cursorY.set(event.clientY);
    setCursorLabel(label);
  };
  const onCursorLeave = () => setCursorLabel("");
  const openContact = () => { setSelection(null); setContactOpen(true); };
  /* Les outils ouvrent le formulaire avec leurs réponses ; rien n'est envoyé sans validation du visiteur. */
  const openContactWith = (answers: Selection) => { setSelection(answers); setContactOpen(true); };
  const openTour = () => setTourOpen(true);

  return (
    <MotionConfig reducedMotion="user">
    <DeviseProvider langue={langue}>
    <main onMouseMove={(e) => { cursorX.set(e.clientX); cursorY.set(e.clientY); }}>
      <motion.div className="page-progress" style={{ scaleX: scrollYProgress }} />
      <motion.div className={`custom-cursor ${cursorLabel ? "is-visible" : ""}`} style={{ x: cursorX, y: cursorY }} aria-hidden="true">{cursorLabel}</motion.div>

      <SiteHeader scrolled={scrolled} menuOpen={menuOpen} onOpenMenu={() => setMenuOpen(true)} onCloseMenu={() => setMenuOpen(false)} onContact={openContact} />
      <HeroSection />
      <ProjectSection />
      <ArchitectureSection />
      <VillasSection onCursorEnter={onCursorEnter} onCursorLeave={onCursorLeave} onOpenPlan={setPlanOpen} onContact={openContact} />
      <VillaSelector onContact={openContactWith} />
      <VillaComparator onOpenPlan={setPlanOpen} />
      <LifestyleSection />
      <TourSection onOpenTour={openTour} />
      <LocationSection onOpenPlan={setPlanOpen} />
      <FeeCalculator onContact={openContactWith} />
      <YieldSimulator onContact={openContactWith} />
      <FinalCta onContact={openContact} />
      <SiteFooter />
      <FloatingActions />

      <AnimatePresence>{planOpen && <PlanModal src={planOpen} onClose={() => setPlanOpen(null)} />}</AnimatePresence>
      <AnimatePresence>{tourOpen && <TourModal onClose={() => setTourOpen(false)} />}</AnimatePresence>
      <AnimatePresence>{contactOpen && <ContactPanel selection={selection} onClose={() => setContactOpen(false)} />}</AnimatePresence>
    </main>
    </DeviseProvider>
    </MotionConfig>
  );
}
