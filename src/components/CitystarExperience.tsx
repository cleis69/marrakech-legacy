import { AnimatePresence, motion, useScroll } from "motion/react";
import { useEffect, useState } from "react";

import { ArchitectureSection } from "./citystar/ArchitectureSection";
import { ContactPanel } from "./citystar/ContactPanel";
import { villas } from "./citystar/data";
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
import { VillaModal } from "./citystar/VillaModal";
import { VillasSection } from "./citystar/VillasSection";

export default function CitystarExperience() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeVilla, setActiveVilla] = useState(0);
  const [villaOpen, setVillaOpen] = useState(false);
  const [planOpen, setPlanOpen] = useState<string | null>(null);
  const [tourOpen, setTourOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [cursor, setCursor] = useState({ x: -100, y: -100, label: "" });
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onCursorEnter = (label: string) => (event: React.MouseEvent) => setCursor({ x: event.clientX, y: event.clientY, label });
  const onCursorLeave = () => setCursor({ ...cursor, label: "" });
  const openContact = () => setContactOpen(true);
  const openTour = () => setTourOpen(true);

  return (
    <main onMouseMove={(e) => cursor.label && setCursor({ ...cursor, x: e.clientX, y: e.clientY })}>
      <motion.div className="page-progress" style={{ scaleX: scrollYProgress }} />
      <div className={`custom-cursor ${cursor.label ? "is-visible" : ""}`} style={{ transform: `translate3d(${cursor.x}px,${cursor.y}px,0)` }}>{cursor.label}</div>

      <SiteHeader scrolled={scrolled} menuOpen={menuOpen} onOpenMenu={() => setMenuOpen(true)} onCloseMenu={() => setMenuOpen(false)} onContact={openContact} />
      <HeroSection />
      <ProjectSection />
      <ArchitectureSection />
      <VillasSection onCursorEnter={onCursorEnter} onCursorLeave={onCursorLeave} onOpenVilla={(index) => { setActiveVilla(index); setVillaOpen(true); }} />
      <LifestyleSection />
      <TourSection onCursorEnter={onCursorEnter} onCursorLeave={onCursorLeave} onOpenTour={openTour} />
      <LocationSection onOpenPlan={setPlanOpen} />
      <FinalCta onContact={openContact} />
      <SiteFooter onOpenTour={openTour} />
      <FloatingActions onContact={openContact} />

      <AnimatePresence>{villaOpen && <VillaModal villa={villas[activeVilla] ?? villas[0]} onClose={() => setVillaOpen(false)} onPlan={setPlanOpen} onPrev={() => setActiveVilla((activeVilla + 2) % 3)} onNext={() => setActiveVilla((activeVilla + 1) % 3)} />}</AnimatePresence>
      <AnimatePresence>{planOpen && <PlanModal src={planOpen} onClose={() => setPlanOpen(null)} />}</AnimatePresence>
      <AnimatePresence>{tourOpen && <TourModal onClose={() => setTourOpen(false)} />}</AnimatePresence>
      <AnimatePresence>{contactOpen && <ContactPanel onClose={() => setContactOpen(false)} />}</AnimatePresence>
    </main>
  );
}
