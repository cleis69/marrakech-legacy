import { AnimatePresence, MotionConfig, motion, useMotionValue, useScroll } from "motion/react";
import { useEffect, useMemo, useState } from "react";

import type { Langue } from "@/config/citystar";

import { useApparitions } from "./apparitions";
import { ContactPanel } from "./ContactPanel";
import { CLASSE_DEMANDE, ID_DEMANDE, SiteContext, type SiteState, useSite } from "./contexte";
import { DeviseProvider } from "./currency";
import { type Selection, prefersReducedMotion } from "./data";
import { BulleWhatsApp } from "./dossier/sections";
import { langueABasculer } from "./langueAppareil";
import { memePage } from "./adresses";
import { PlanModal } from "./PlanModal";
import { retenirProvenance } from "./provenance";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { TourModal } from "./TourModal";

export { ID_DEMANDE, useSite };

/** Ramène le visiteur au formulaire de la page, le curseur dans le premier champ. */
function allerAuFormulaire() {
  /* La page en compte plusieurs : on va au plus proche de ce que le visiteur regarde. */
  const milieu = window.innerHeight / 2;
  const ecart = (element: Element) => {
    const { top, bottom } = element.getBoundingClientRect();
    return Math.abs((top + bottom) / 2 - milieu);
  };
  const formulaire = [...document.querySelectorAll<HTMLElement>(`.${CLASSE_DEMANDE}`)].sort(
    (a, b) => ecart(a) - ecart(b),
  )[0];
  if (!formulaire) return;
  formulaire.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "center",
  });
  window.setTimeout(
    () => formulaire.querySelector<HTMLInputElement>("input")?.focus({ preventScroll: true }),
    prefersReducedMotion() ? 0 : 600,
  );
}

/**
 * En-tête, pied de page et fenêtres communs à toutes les pages.
 * `tunnel` : page d'atterrissage des publicités. Le formulaire est dans la page, et tout ce qui
 * en ferait sortir (menu, liens vers les autres pages, WhatsApp, pied de page complet) est retiré.
 */
export function SiteChrome({
  langue = "fr",
  tunnel = false,
  children,
}: {
  langue?: Langue;
  tunnel?: boolean;
  children: React.ReactNode;
}) {
  useApparitions();
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

  useEffect(retenirProvenance, []);

  /* Le visiteur arrive dans la langue de son téléphone, si le site la propose ; l'adresse
     (gclid, utm, ancre) est gardée telle quelle. */
  useEffect(() => {
    const cible = langueABasculer(langue);
    if (!cible) return;
    const { pathname, search, hash } = window.location;
    window.location.replace(`${memePage(pathname, cible)}${search}${hash}`);
    // Une seule fois, à l'arrivée.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const valeur = useMemo<SiteState>(
    () => ({
      langue,
      tunnel,
      selection,
      onCursorEnter: (label: string) => (event: React.MouseEvent) => {
        cursorX.set(event.clientX);
        cursorY.set(event.clientY);
        setCursorLabel(label);
      },
      onCursorLeave: () => setCursorLabel(""),
      ouvrirContact: () => {
        setSelection(null);
        /* Une page qui porte le formulaire en étapes y ramène ; sinon, le panneau s'ouvre. */
        if (tunnel || document.querySelector(`.${CLASSE_DEMANDE}`)) allerAuFormulaire();
        else setContactOpen(true);
      },
      /* Les outils ouvrent le formulaire avec leurs réponses ; rien n'est envoyé sans validation du visiteur. */
      ouvrirContactAvec: (reponses: Selection) => {
        setSelection(reponses);
        if (tunnel || document.querySelector(`.${CLASSE_DEMANDE}`)) allerAuFormulaire();
        else setContactOpen(true);
      },
      ouvrirPlan: (src: string) => setPlanOpen(src),
      ouvrirVisite: () => setTourOpen(true),
    }),
    [langue, tunnel, selection, cursorX, cursorY],
  );

  return (
    <MotionConfig reducedMotion="user">
      <DeviseProvider langue={langue}>
        <SiteContext.Provider value={valeur}>
          <main
            className={tunnel ? "is-tunnel" : undefined}
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
              onContactAvec={valeur.ouvrirContactAvec}
              tunnel={tunnel}
            />

            {children}

            <SiteFooter />
            <BulleWhatsApp />

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
