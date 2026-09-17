import { ArrowLeft, Download, Expand, Lock } from "lucide-react";
import { useEffect, useRef } from "react";

import { prefersReducedMotion, villas } from "./data";
import { VillaPrice } from "./currency";
import { PillButton } from "./ui/PillButton";

type Props = {
  index: number;
  target: "top" | "plans";
  onSelect: (index: number) => void;
  onBack: () => void;
  onOpenPlan: (src: string) => void;
  onContact: () => void;
};

/** Fiche d'une villa : onglets ronds A · B · C, caractéristiques, prix, plans et brochure. */
export function VillaFiche({ index, target, onSelect, onBack, onOpenPlan, onContact }: Props) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const villa = villas[index] ?? villas[0];

  useEffect(() => {
    if (target === "plans") {
      document.getElementById("plans")?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "center" });
      document.getElementById("plans")?.focus({ preventScroll: true });
    } else {
      headingRef.current?.focus({ preventScroll: true });
    }
    // Uniquement à l'ouverture de la fiche.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onTabKey = (event: React.KeyboardEvent) => {
    const moves: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    let next: number | null = null;
    if (event.key in moves) next = (index + (moves[event.key] ?? 0) + villas.length) % villas.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = villas.length - 1;
    if (next === null) return;
    event.preventDefault();
    onSelect(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="vf section-pad">
      <div className="vf-pic">
        {villas.map((item, i) => <img key={item.type} src={item.image} alt={i === index ? `Villa CITYSTAR type ${item.type}` : ""} aria-hidden={i !== index} className={i === index ? "is-on" : ""} loading="lazy" />)}
        <span className="vf-shade" aria-hidden="true" />
        <div className="vf-pic-over">
          <div className="section-label light"><span>03</span><p>Les villas</p></div>
          <p className="vf-pic-title" aria-hidden="true">Trois expressions.<br />Une même <em>exigence.</em></p>
          <span className="vf-cap">Villa type {villa.type} · Illustration non contractuelle</span>
        </div>
      </div>

      <div className="vf-info">
        <button type="button" className="vf-back" onClick={onBack}><ArrowLeft aria-hidden="true" /> Les trois villas</button>

        <div className="vf-tabs">
          <div role="tablist" aria-label="Types de villa" onKeyDown={onTabKey}>
            {villas.map((item, i) => (
              <button
                key={item.type}
                ref={(el) => { tabRefs.current[i] = el; }}
                type="button"
                role="tab"
                id={`villa-tab-${item.type}`}
                aria-selected={i === index}
                aria-controls="villa-panel"
                tabIndex={i === index ? 0 : -1}
                className={i === index ? "is-on" : ""}
                onClick={() => onSelect(i)}
              >
                {item.type}
              </button>
            ))}
          </div>
          <span className="vf-tabs-label">Villa type {villa.type} · {villa.tag}</span>
        </div>

        <div id="villa-panel" role="tabpanel" aria-labelledby={`villa-tab-${villa.type}`} key={villa.type} className="vf-panel">
          <h2 id="villas-title" ref={headingRef} tabIndex={-1}>Villa type <em>{villa.type}</em></h2>
          <p className="vf-desc">{villa.description}</p>
          <dl className="vf-specs">
            <div><dt>Surface construite</dt><dd>{villa.area}</dd></div>
            <div><dt>Terrain</dt><dd>{villa.land}</dd></div>
            <div><dt>Configuration</dt><dd>{villa.bedrooms}</dd></div>
          </dl>
          <VillaPrice type={villa.type} />
          <div id="plans" className="vf-plans" tabIndex={-1} aria-label={`Plans de la villa type ${villa.type}`} role="group">
            {villa.plans.map((plan, i) => (
              <button key={plan} type="button" onClick={() => onOpenPlan(plan)} aria-label={`Agrandir le plan ${i ? "de l’étage" : "du rez-de-chaussée"} de la villa type ${villa.type}`}>
                <img src={plan} alt="" loading="lazy" />
                <span>{i ? "Étage" : "Rez-de-chaussée"} <Expand aria-hidden="true" /></span>
              </button>
            ))}
          </div>
          <div className="vf-actions">
            <PillButton label="Demander un accès" icon={Lock} onClick={onContact} />
            <PillButton label="Brochure" icon={Download} variant="secondary" href={`/brochures/villa-${villa.type.toLowerCase()}.pdf`} ariaLabel={`Brochure de la villa type ${villa.type} (PDF)`} />
          </div>
        </div>
      </div>
    </div>
  );
}
