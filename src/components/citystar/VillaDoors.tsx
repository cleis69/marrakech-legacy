import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { formatSurface, programme } from "@/config/citystar";

import { useDevise } from "./currency";
import { type CursorHandlers, faitsVilla, scrollTo, villas } from "./data";
import { Reveal } from "./motion";
import { PillButton } from "./ui/PillButton";

type Props = CursorHandlers & { active: number; focusIndex: number | null; onOpen: (index: number) => void };

/** Trois portes : survoler en élargit une, cliquer ouvre sa fiche. Sur mobile, un rail de cartes. */
export function VillaDoors({ active, focusIndex, onCursorEnter, onCursorLeave, onOpen }: Props) {
  const { langue, t } = useDevise();
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
          <div className="section-label"><span>03</span><p>{t.villas.label}</p></div>
          <Reveal><h2 id="villas-title">{t.villas.titre[0]}<br />{t.villas.titre[1]}<em>{t.villas.titre[2]}</em></h2></Reveal>
        </div>
        <div>
          <p>{t.villas.intro(programme.nombreVillas, formatSurface(programme.terrainMaxM2, langue))}</p>
          <PillButton label={t.villas.comparer} icon={ArrowRight} variant="secondary" onClick={() => scrollTo("comparateur")} />
        </div>
      </div>

      <div className="vd-tri" ref={railRef} onScroll={onRailScroll}>
        {villas.map((villa, i) => {
          const faits = faitsVilla(villa.type, t, langue);
          return (
            <button
              key={villa.type}
              ref={(el) => { doorRefs.current[i] = el; }}
              type="button"
              className={`vd-door${i === active ? " is-on" : ""}`}
              aria-label={t.villas.decouvrirAria(villa.type, faits.surface, faits.suites, faits.tag)}
              onClick={() => onOpen(i)}
              onMouseEnter={onCursorEnter("EXPLORE")}
              onMouseLeave={onCursorLeave}
            >
              <img src={villa.image} alt="" loading="lazy" />
              <span className="vd-shade" aria-hidden="true" />
              <span className="vd-name" aria-hidden="true"><small>{t.villas.villa}</small><strong>{villa.type}</strong></span>
              <span className="vd-bottom" aria-hidden="true">
                <span className="vd-more">
                  <span className="vd-desc">{faits.description}</span>
                  <span className="pill pill-primary"><span className="pill-label">{t.villas.decouvrir}</span><i className="pill-dot"><ArrowRight /></i></span>
                </span>
                <span className="vd-specs"><span>{faits.surface}</span><span>{faits.suites}</span><span>{faits.tag}</span></span>
              </span>
            </button>
          );
        })}
      </div>
      <div className="vd-dots" aria-hidden="true">{villas.map((villa, i) => <i key={villa.type} className={i === visible ? "is-on" : ""} />)}</div>
    </div>
  );
}
