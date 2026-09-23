import { AnimatePresence, MotionConfig, motion, useMotionValue, useScroll } from "motion/react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import type { Langue } from "@/config/citystar";

import { ContactPanel } from "./ContactPanel";
import { DeviseProvider } from "./currency";
import type { CursorHandlers, Selection } from "./data";
import { FloatingActions } from "./FloatingActions";
import { PlanModal } from "./PlanModal";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { TourModal } from "./TourModal";

type SiteState = CursorHandlers & {
  langue: Langue;
  ouvrirContact: () => void;
  ouvrirContactAvec: (selection: Selection) => void;
  ouvrirPlan: (src: string) => void;
  ouvrirVisite: () => void;
};

const SiteContext = createContext<SiteState | null>(null);

/** Accès aux fenêtres (contact, plan, visite) et au curseur depuis n'importe quelle page. */
export function useSite() {
  const site = useContext(SiteContext);
  if (!site) throw new Error("useSite doit être utilisé dans SiteChrome");
  return site;
}

/** En-tête, pied de page et fenêtres communs à toutes les pages. */
export function SiteChrome({
  langue = "fr",
  children,
}: {
  langue?: Langue;
  children: React.ReactNode;
}) {
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const valeur = useMemo<SiteState>(
    () => ({
      langue,
      onCursorEnter: (label: string) => (event: React.MouseEvent) => {
        cursorX.set(event.clientX);
        cursorY.set(event.clientY);
        setCursorLabel(label);
      },
      onCursorLeave: () => setCursorLabel(""),
      ouvrirContact: () => {
        setSelection(null);
        setContactOpen(true);
      },
      /* Les outils ouvrent le formulaire avec leurs réponses ; rien n'est envoyé sans validation du visiteur. */
      ouvrirContactAvec: (reponses: Selection) => {
        setSelection(reponses);
        setContactOpen(true);
      },
      ouvrirPlan: (src: string) => setPlanOpen(src),
      ouvrirVisite: () => setTourOpen(true),
    }),
    [langue, cursorX, cursorY],
  );

  return (
    <MotionConfig reducedMotion="user">
      <DeviseProvider langue={langue}>
        <SiteContext.Provider value={valeur}>
          <main
            onMouseMove={(e) => {
              cursorX.set(e.clientX);
              cursorY.set(e.clientY);
            }}
          >
            <motion.div className="page-progress" style={{ scaleX: scrollYProgress }} />
            <motion.div
              className={`custom-cursor ${cursorLabel ? "is-visible" : ""}`}
              style={{ x: cursorX, y: cursorY }}
              aria-hidden="true"
            >
              {cursorLabel}
            </motion.div>

            <SiteHeader
              scrolled={scrolled}
              menuOpen={menuOpen}
              onOpenMenu={() => setMenuOpen(true)}
              onCloseMenu={() => setMenuOpen(false)}
              onContact={valeur.ouvrirContact}
            />

            {children}

            <SiteFooter />
            <FloatingActions />

            <AnimatePresence>
              {planOpen && <PlanModal src={planOpen} onClose={() => setPlanOpen(null)} />}
            </AnimatePresence>
            <AnimatePresence>
              {tourOpen && <TourModal onClose={() => setTourOpen(false)} />}
            </AnimatePresence>
            <AnimatePresence>
              {contactOpen && (
                <ContactPanel selection={selection} onClose={() => setContactOpen(false)} />
              )}
            </AnimatePresence>
          </main>
        </SiteContext.Provider>
      </DeviseProvider>
    </MotionConfig>
  );
}
