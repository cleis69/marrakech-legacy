import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import marque from "@/assets/citystar/rendus/ext-aerien-piscine.webp";

import { useDevise } from "./currency";

/**
 * Bandeau signature : le nom en très grand, traversé par un rendu du domaine.
 * La photo dérive lentement au défilement ; en mouvement réduit, elle reste fixe.
 */
export function WordmarkBand() {
  const { t } = useDevise();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const position = useTransform(scrollYProgress, [0, 1], ["50% 35%", "50% 65%"]);

  return (
    <section ref={ref} className="wm" aria-label={t.marque.aria}>
      <motion.p
        className="wm-word"
        aria-hidden="true"
        style={
          reduce
            ? { backgroundImage: `url(${marque})` }
            : { backgroundImage: `url(${marque})`, backgroundPosition: position }
        }
      >
        CITYSTAR
      </motion.p>
      <p className="wm-caption">{t.marque.legende}</p>
    </section>
  );
}
