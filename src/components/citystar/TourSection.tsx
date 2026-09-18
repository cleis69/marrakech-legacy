import { AnimatePresence, motion } from "motion/react";
import { Maximize2, Rotate3d } from "lucide-react";
import { useRef, useState } from "react";

import visitImage from "@/assets/citystar/visit.webp";

import { useDevise } from "./currency";
import { TOUR_URL } from "./data";
import { Reveal } from "./motion";
import { PillButton } from "./ui/PillButton";

/**
 * Visite intégrée : la visite Momento360 (vue aérienne à 360°) reste en pause
 * derrière une affiche et ne se charge qu'à l'activation, pour ne pas alourdir
 * la page ni capter le défilement.
 */
export function TourSection({ onOpenTour }: { onOpenTour: () => void }) {
  const { t } = useDevise();
  const [active, setActive] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);

  return (
    <section id="visite" className="tv section-pad" aria-labelledby="visite-title">
      <div className="tv-grid">
        <div className="tv-head">
          <div className="section-label">
            <span>05</span>
            <p>{t.visite.label}</p>
          </div>
          <Reveal>
            <h2 id="visite-title">
              {t.visite.titre[0]}
              <br />
              <em>{t.visite.titre[1]}</em>
            </h2>
          </Reveal>
          <p>{t.visite.texte}</p>
        </div>

        <div className="tv-viewer">
          {active && (
            <iframe
              ref={frameRef}
              src={TOUR_URL}
              title={t.visite.titreIframe}
              allow="fullscreen; gyroscope; accelerometer; xr-spatial-tracking"
              allowFullScreen
              onLoad={() => frameRef.current?.focus()}
            />
          )}
          <AnimatePresence>
            {!active && (
              <motion.button
                type="button"
                className="tv-poster"
                onClick={() => setActive(true)}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <img src={visitImage} alt="" loading="lazy" />
                <span className="tv-poster-cta">
                  <Rotate3d aria-hidden="true" /> {t.visite.activer}
                </span>
                <small>{t.visite.apercu}</small>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <div className="tv-aside">
          <ol className="tv-steps">
            {t.visite.etapes.map((etape, i) => (
              <li key={etape}>
                <small>{String(i + 1).padStart(2, "0")}</small>
                {etape}
              </li>
            ))}
          </ol>
          <PillButton
            label={t.visite.pleinEcran}
            icon={Maximize2}
            variant="secondary"
            onClick={onOpenTour}
          />
        </div>
      </div>
    </section>
  );
}
