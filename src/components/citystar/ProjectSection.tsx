import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";

import { formatNombre, programme } from "@/config/citystar";
import exteriorImage from "@/assets/citystar/site/ext-facade.jpg";
import poolImage from "@/assets/citystar/site/ext-pool.jpg";
import livingImage from "@/assets/citystar/site/int-living.jpg";

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
    if (reduce) { count.set(programme.nombreVillas); return; }
    const controls = animate(count, programme.nombreVillas, { duration: 1.6, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [inView, reduce, count]);

  return <span ref={ref} className="pj-count-num" aria-hidden="true"><motion.span>{rounded}</motion.span></span>;
}

export function ProjectSection() {
  return (
    <section id="project" className="pj" aria-labelledby="project-title">
      <div className="pj-grid">
        <figure className="pj-big">
          <img src={exteriorImage} alt="Façade d’une villa CITYSTAR, lames bronze et volumes blancs" loading="lazy" />
          <figcaption className="pj-count">
            <VillaCounter />
            <span className="pj-count-copy"><small>{programme.nombreVillas} villas privées</small><em>Pas une de plus.</em></span>
          </figcaption>
        </figure>

        <div className="pj-right">
          <div className="pj-pair">
            <img src={poolImage} alt="Piscine privée d’une villa CITYSTAR" loading="lazy" />
            <img src={livingImage} alt="Salon d’une villa CITYSTAR" loading="lazy" />
          </div>
          <div className="pj-text">
            <div className="section-label"><span>01</span><p>Le projet</p></div>
            <Reveal><h2 id="project-title">L’espace rare<br />d’une vie <em>privée.</em></h2></Reveal>
            <p>Un domaine privé et entièrement sécurisé, proche de la Palmeraie. Trois architectures pour les usages et les préférences de chaque résident.</p>
            <dl className="pj-rows">
              <div><dt>Terrains jusqu’à</dt><dd>{formatNombre(programme.terrainMaxM2)}<sup>m²</sup></dd></div>
              <div><dt>Types de villas</dt><dd>{programme.nombreTypes}</dd></div>
              <div><dt>Jemaa el-Fna &amp; aéroport</dt><dd>{programme.trajetMaxMinutes}<sup>min</sup></dd></div>
            </dl>
            <PillButton label="Découvrir les villas" icon={ArrowRight} variant="secondary" onClick={() => scrollTo("villas")} />
          </div>
        </div>
      </div>
    </section>
  );
}
