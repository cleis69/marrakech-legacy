import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { type CursorHandlers, OPEN_PLANS_EVENT, prefersReducedMotion } from "./data";
import { VillaDoors } from "./VillaDoors";
import { VillaFiche } from "./VillaFiche";

type Props = CursorHandlers & { onOpenPlan: (src: string) => void; onContact: () => void };
type View = { mode: "doors"; focus: number | null } | { mode: "fiche"; index: number; target: "top" | "plans" };

const fade = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } };

export function VillasSection({ onCursorEnter, onCursorLeave, onOpenPlan, onContact }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const [view, setView] = useState<View>({ mode: "doors", focus: null });
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const openPlans = () => setView((current) => ({ mode: "fiche", index: current.mode === "fiche" ? current.index : index, target: "plans" }));
    window.addEventListener(OPEN_PLANS_EVENT, openPlans);
    return () => window.removeEventListener(OPEN_PLANS_EVENT, openPlans);
  }, [index]);

  const scrollToSection = () => {
    const top = sectionRef.current?.getBoundingClientRect().top ?? 0;
    if (top < -40 || top > window.innerHeight * 0.4) sectionRef.current?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
  };

  return (
    <section ref={sectionRef} id="villas" className="vs" aria-labelledby="villas-title">
      <AnimatePresence mode="wait" initial={false}>
        {view.mode === "doors" ? (
          <motion.div key="doors" {...fade}>
            <VillaDoors
              active={index}
              focusIndex={view.focus}
              onCursorEnter={onCursorEnter}
              onCursorLeave={onCursorLeave}
              onOpen={(i) => { onCursorLeave(); setIndex(i); setView({ mode: "fiche", index: i, target: "top" }); scrollToSection(); }}
            />
          </motion.div>
        ) : (
          <motion.div key="fiche" {...fade}>
            <VillaFiche
              index={view.index}
              target={view.target}
              onSelect={(i) => { setIndex(i); setView({ mode: "fiche", index: i, target: "top" }); }}
              onBack={() => { setView({ mode: "doors", focus: view.index }); scrollToSection(); }}
              onOpenPlan={onOpenPlan}
              onContact={onContact}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
