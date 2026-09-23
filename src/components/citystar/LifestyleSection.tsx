import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";

import afternoonImage from "@/assets/citystar/rendus/int-chambre-jour.webp";
import nightImage from "@/assets/citystar/rendus/ext-facade-crepuscule.webp";
import morningImage from "@/assets/citystar/rendus/ext-piscine-jour.webp";
import eveningImage from "@/assets/citystar/rendus/int-salon.webp";

import { useDevise } from "./currency";

const IMAGES = [morningImage, afternoonImage, eveningImage, nightImage];

/** Une journée à CITYSTAR : quatre moments sur une ligne de temps, la photo et la lumière changent. */
export function LifestyleSection() {
  const { t } = useDevise();
  const MOMENTS = t.vivre.moments;
  const [current, setCurrent] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const moment = MOMENTS[current] ?? MOMENTS[0]!;

  const onKey = (event: React.KeyboardEvent) => {
    const moves: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1 };
    let next: number | null = null;
    if (event.key in moves)
      next = (current + (moves[event.key] ?? 0) + MOMENTS.length) % MOMENTS.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = MOMENTS.length - 1;
    if (next === null) return;
    event.preventDefault();
    setCurrent(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="lifestyle" className="day" data-moment={current} aria-labelledby="lifestyle-title">
      <div className="day-bg">
        {MOMENTS.map((item, i) => (
          <img
            key={item.quand}
            src={IMAGES[i]}
            alt={i === current ? item.alt : ""}
            aria-hidden={i !== current}
            className={i === current ? "is-on" : ""}
            loading="lazy"
          />
        ))}
      </div>
      <div className="day-tint" aria-hidden="true" />

      <div className="day-body">
        <div className="day-head">
          <div className="section-label light">
            <span>04</span>
            <p>{t.vivre.label}</p>
          </div>
          <h2 id="lifestyle-title">{t.vivre.titre}</h2>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current}
            id="day-panel"
            role="tabpanel"
            aria-labelledby={`day-tab-${current}`}
            className="day-moment"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="day-when">{moment.quand}</span>
            <h3>{moment.titre}</h3>
            <p>{moment.texte}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div
        className="day-timeline"
        role="tablist"
        aria-label={t.vivre.momentsAria}
        onKeyDown={onKey}
      >
        {MOMENTS.map((item, i) => (
          <button
            key={item.quand}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`day-tab-${i}`}
            aria-selected={i === current}
            aria-controls="day-panel"
            tabIndex={i === current ? 0 : -1}
            className={i === current ? "is-on" : ""}
            onClick={() => setCurrent(i)}
          >
            {item.quand}
          </button>
        ))}
      </div>
    </section>
  );
}
