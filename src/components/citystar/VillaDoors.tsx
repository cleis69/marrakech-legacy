import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { formatSurface, programme } from "@/config/citystar";

import { type CursorHandlers, villas } from "./data";
import { Reveal } from "./motion";

type Props = CursorHandlers & { active: number; focusIndex: number | null; onOpen: (index: number) => void };

/** Trois portes : survoler en élargit une, cliquer ouvre sa fiche. Sur mobile, un rail de cartes. */
export function VillaDoors({ active, focusIndex, onCursorEnter, onCursorLeave, onOpen }: Props) {
  const doorRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const railRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (focusIndex !== null) doorRefs.current[focusIndex]?.focus({ preventScroll: true });
  }, [focusIndex]);

  const onRailScroll = () => {
    const rail = railRef.current;
    const first = doorRefs.current[0];
    if (!rail || !first) return;
    setVisible(Math.round(rail.scrollLeft / (first.offsetWidth + 10)));
  };

  return (
    <div className="vd section-pad">
      <div className="vd-top">
        <div>
          <div className="section-label"><span>03</span><p>Les villas</p></div>
          <Reveal><h2 id="villas-title">Trois expressions.<br />Une même <em>exigence.</em></h2></Reveal>
        </div>
        <p>Trois architectures pour {programme.nombreVillas} villas, chacune sur un terrain de {formatSurface(programme.terrainMaxM2)}.</p>
      </div>

      <div className="vd-tri" ref={railRef} onScroll={onRailScroll}>
        {villas.map((villa, i) => (
          <button
            key={villa.type}
            ref={(el) => { doorRefs.current[i] = el; }}
            type="button"
            className={`vd-door${i === active ? " is-on" : ""}`}
            aria-label={`Découvrir la villa type ${villa.type} : ${villa.area}, ${villa.bedrooms}, ${villa.tag.toLowerCase()}`}
            onClick={() => onOpen(i)}
            onMouseEnter={onCursorEnter("EXPLORE")}
            onMouseLeave={onCursorLeave}
          >
            <img src={villa.image} alt="" loading="lazy" />
            <span className="vd-shade" aria-hidden="true" />
            <span className="vd-name" aria-hidden="true"><small>Villa</small><strong>{villa.type}</strong></span>
            <span className="vd-bottom" aria-hidden="true">
              <span className="vd-more">
                <span className="vd-desc">{villa.description}</span>
                <span className="pill pill-primary"><span className="pill-label">Découvrir la villa</span><i className="pill-dot"><ArrowRight /></i></span>
              </span>
              <span className="vd-specs"><span>{villa.area}</span><span>{villa.bedrooms}</span><span>{villa.tag}</span></span>
            </span>
          </button>
        ))}
      </div>
      <div className="vd-dots" aria-hidden="true">{villas.map((villa, i) => <i key={villa.type} className={i === visible ? "is-on" : ""} />)}</div>
    </div>
  );
}
