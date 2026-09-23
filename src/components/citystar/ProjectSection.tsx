import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";

import { formatNombre, programme } from "@/config/citystar";
import exteriorImage from "@/assets/citystar/rendus/ext-facade-jardin.webp";
import poolImage from "@/assets/citystar/rendus/ext-aerien-piscine.webp";
import livingImage from "@/assets/citystar/rendus/int-salon.webp";

import { useDevise } from "./currency";
import { scrollTo } from "./data";
import { Reveal } from "./motion";
import { PillButton } from "./ui/PillButton";

/** Compteur 0 → 14 déclenché à l'apparition, figé sur la valeur finale en mouvement réduit. */
function VillaCounter() {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const count = useMotionValue(reduce ? programme.nombreVillas : 0);
  const rounded = useTransform(count, (v) => String(Math.round(v)).padStart(2, "0"));

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      count.set(programme.nombreVillas);
      return;
    }
    const controls = animate(count, programme.nombreVillas, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [inView, reduce, count]);

  return (
    <span ref={ref} className="pj-count-num" aria-hidden="true">
      <motion.span>{rounded}</motion.span>
    </span>
  );
}

export function ProjectSection() {
  const { langue, t } = useDevise();
  return (
    <section id="project" className="pj" aria-labelledby="project-title">
      <div className="pj-grid">
        <figure className="pj-big">
          <img src={exteriorImage} alt={t.projet.altFacade} loading="lazy" />
          <figcaption className="pj-count">
            <VillaCounter />
            <span className="pj-count-copy">
              <small>{t.projet.villas(programme.nombreVillas)}</small>
              <em>{t.projet.pasUne}</em>
            </span>
          </figcaption>
        </figure>

        <div className="pj-right">
          <div className="pj-pair">
            <img src={poolImage} alt={t.projet.altPiscine} loading="lazy" />
            <img src={livingImage} alt={t.projet.altSalon} loading="lazy" />
          </div>
          <div className="pj-text">
            <div className="section-label">
              <span>01</span>
              <p>{t.projet.label}</p>
            </div>
            <Reveal>
              <h2 id="project-title">
                {t.projet.titre[0]}
                <br />
                {t.projet.titre[1]}
                <em>{t.projet.titre[2]}</em>
              </h2>
            </Reveal>
            <p>{t.projet.texte}</p>
            <dl className="pj-rows">
              <div>
                <dt>{t.projet.terrains}</dt>
                <dd>
                  {formatNombre(programme.terrainMaxM2, langue)}
                  <sup>m²</sup>
                </dd>
              </div>
              <div>
                <dt>{t.projet.types}</dt>
                <dd>{programme.nombreTypes}</dd>
              </div>
              <div>
                <dt>{t.projet.trajet}</dt>
                <dd>
                  {programme.trajetMaxMinutes}
                  <sup>min</sup>
                </dd>
              </div>
            </dl>
            <PillButton
              label={t.projet.cta}
              icon={ArrowRight}
              variant="secondary"
              onClick={() => scrollTo("villas")}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
