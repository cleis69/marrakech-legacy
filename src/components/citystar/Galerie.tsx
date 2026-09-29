import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState } from "react";

import { useDevise } from "./currency";
import { altRendu, rendus } from "./data";
import { useModal } from "./useModal";

/** Mur de rendus : toutes les images du domaine, en mosaïque ; chacune s'ouvre en grand. */
export function Galerie() {
  const { t } = useDevise();
  const [ouverte, setOuverte] = useState<number | null>(null);
  return (
    <section className="gl section-pad" aria-label={t.pages.galerie.kicker}>
      <ul className="gl-grid">
        {rendus.map((rendu, i) => (
          <li key={rendu.src} className={i % 5 === 0 ? "is-large" : ""}>
            <button
              type="button"
              onClick={() => setOuverte(i)}
              aria-label={t.rendus.agrandir(altRendu(t, rendu.nom))}
            >
              <img src={rendu.src} alt="" loading="lazy" />
            </button>
          </li>
        ))}
      </ul>
      <p className="gl-note">{t.architecture.note}</p>
      <AnimatePresence>
        {ouverte !== null && (
          <Visionneuse index={ouverte} onIndex={setOuverte} onClose={() => setOuverte(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

/** Une image en grand, avec la précédente et la suivante au clavier (flèches) ou aux boutons. */
function Visionneuse({
  index,
  onIndex,
  onClose,
}: {
  index: number;
  onIndex: (index: number) => void;
  onClose: () => void;
}) {
  const { t } = useDevise();
  const ref = useModal<HTMLDivElement>(onClose);
  const total = rendus.length;
  const aller = (pas: number) => onIndex((index + pas + total) % total);
  const rendu = rendus[index];
  if (!rendu) return null;
  const alt = altRendu(t, rendu.nom);
  return (
    <motion.div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={t.rendus.visionneuse}
      tabIndex={-1}
      className="plan-modal gl-view"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") aller(1);
        if (event.key === "ArrowLeft") aller(-1);
      }}
    >
      <button type="button" onClick={onClose} aria-label={t.rendus.fermer}>
        <X />
      </button>
      <figure>
        <img src={rendu.src} alt={alt} />
        <figcaption>
          <span aria-live="polite">{t.rendus.position(index + 1, total)}</span>
          {alt}
        </figcaption>
      </figure>
      <button
        type="button"
        className="gl-prev"
        onClick={() => aller(-1)}
        aria-label={t.rendus.precedente}
      >
        <ChevronLeft />
      </button>
      <button
        type="button"
        className="gl-next"
        onClick={() => aller(1)}
        aria-label={t.rendus.suivante}
      >
        <ChevronRight />
      </button>
    </motion.div>
  );
}
