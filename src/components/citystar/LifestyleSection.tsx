import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";

import afternoonImage from "@/assets/citystar/hero.jpeg";
import nightImage from "@/assets/citystar/location.jpeg";
import morningImage from "@/assets/citystar/site/ext-pool.jpg";
import eveningImage from "@/assets/citystar/site/int-cinema.jpg";

const MOMENTS = [
  { when: "Le matin", title: "La piscine, avant tout le monde.", text: "Chaque villa a sa piscine privée et ses espaces extérieurs, à l’abri des regards.", image: morningImage, alt: "Piscine privée d’une villa CITYSTAR au matin" },
  { when: "L’après-midi", title: "La lumière entre partout.", text: "Des volumes ouverts et des matériaux de haute qualité, pensés pour la vie à l’intérieur comme à l’extérieur.", image: afternoonImage, alt: "Séjour lumineux d’une villa CITYSTAR" },
  { when: "Le soir", title: "Recevoir, en toute discrétion.", text: "Des salons généreux, dans une villa isolée au cœur d’un domaine privé.", image: eveningImage, alt: "Salon d’une villa CITYSTAR en soirée" },
  { when: "La nuit", title: "Un domaine gardé jour et nuit.", text: "Une résidence privée et entièrement sécurisée, à proximité de la Palmeraie.", image: nightImage, alt: "Villa CITYSTAR éclairée à la tombée de la nuit" },
] as const;

/** Une journée à CITYSTAR : quatre moments sur une ligne de temps, la photo et la lumière changent. */
export function LifestyleSection() {
  const [current, setCurrent] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const moment = MOMENTS[current] ?? MOMENTS[0];

  const onKey = (event: React.KeyboardEvent) => {
    const moves: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1 };
    let next: number | null = null;
    if (event.key in moves) next = (current + (moves[event.key] ?? 0) + MOMENTS.length) % MOMENTS.length;
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
        {MOMENTS.map((item, i) => <img key={item.when} src={item.image} alt={i === current ? item.alt : ""} aria-hidden={i !== current} className={i === current ? "is-on" : ""} loading="lazy" />)}
      </div>
      <div className="day-tint" aria-hidden="true" />

      <div className="day-body">
        <div className="day-head">
          <div className="section-label light"><span>04</span><p>L’art de vivre</p></div>
          <h2 id="lifestyle-title">Une journée à CITYSTAR</h2>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={current} id="day-panel" role="tabpanel" aria-labelledby={`day-tab-${current}`} className="day-moment" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
            <span className="day-when">{moment.when}</span>
            <h3>{moment.title}</h3>
            <p>{moment.text}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="day-timeline" role="tablist" aria-label="Moments de la journée" onKeyDown={onKey}>
        {MOMENTS.map((item, i) => (
          <button
            key={item.when}
            ref={(el) => { tabRefs.current[i] = el; }}
            type="button"
            role="tab"
            id={`day-tab-${i}`}
            aria-selected={i === current}
            aria-controls="day-panel"
            tabIndex={i === current ? 0 : -1}
            className={i === current ? "is-on" : ""}
            onClick={() => setCurrent(i)}
          >
            {item.when}
          </button>
        ))}
      </div>
    </section>
  );
}
