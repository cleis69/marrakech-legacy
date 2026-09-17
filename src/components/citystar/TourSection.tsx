import { AnimatePresence, motion } from "motion/react";
import { Maximize2, Rotate3d } from "lucide-react";
import { useRef, useState } from "react";

import visitImage from "@/assets/citystar/visit.jpeg";

import { TOUR_URL } from "./data";
import { Reveal } from "./motion";
import { PillButton } from "./ui/PillButton";

/**
 * Visite intégrée : la visite Momento360 (vue aérienne à 360°) reste en pause
 * derrière une affiche et ne se charge qu'à l'activation, pour ne pas alourdir
 * la page ni capter le défilement.
 */
export function TourSection({ onOpenTour }: { onOpenTour: () => void }) {
  const [active, setActive] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);

  return (
    <section id="visite" className="tv section-pad" aria-labelledby="visite-title">
      <div className="tv-grid">
        <div className="tv-head">
          <div className="section-label"><span>05</span><p>Visite 360°</p></div>
          <Reveal><h2 id="visite-title">Le domaine,<br /><em>vu du ciel.</em></h2></Reveal>
          <p>Une vue aérienne à 360° du domaine et de ses environs. Regardez autour de vous, à votre rythme.</p>
        </div>

        <div className="tv-viewer">
          {active && <iframe ref={frameRef} src={TOUR_URL} title="Visite virtuelle à 360° du domaine CITYSTAR" allow="fullscreen; gyroscope; accelerometer; xr-spatial-tracking" allowFullScreen onLoad={() => frameRef.current?.focus()} />}
          <AnimatePresence>
            {!active && (
              <motion.button type="button" className="tv-poster" onClick={() => setActive(true)} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                <img src={visitImage} alt="" loading="lazy" />
                <span className="tv-poster-cta"><Rotate3d aria-hidden="true" /> Activer la visite</span>
                <small>Vue aérienne · 360°</small>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <div className="tv-aside">
          <ol className="tv-steps">
            <li><small>01</small>Activer la visite</li>
            <li><small>02</small>Glisser pour regarder autour</li>
            <li><small>03</small>Passer en plein écran</li>
          </ol>
          <PillButton label="Plein écran" icon={Maximize2} variant="secondary" onClick={onOpenTour} />
        </div>
      </div>
    </section>
  );
}
