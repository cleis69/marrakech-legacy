import { ArrowLeft, Download, Expand, Lock } from "lucide-react";
import { useEffect, useRef } from "react";

import { faitsVilla, prefersReducedMotion, villas } from "./data";
import { VillaPrice, useDevise } from "./currency";
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
  const { langue, t } = useDevise();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const villa = villas[index] ?? villas[0];
  const faits = faitsVilla(villa.type, t, langue);

  useEffect(() => {
    if (target === "plans") {
      document
        .getElementById("plans")
        ?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "center" });
      document.getElementById("plans")?.focus({ preventScroll: true });
    } else {
      headingRef.current?.focus({ preventScroll: true });
    }
    // Uniquement à l'ouverture de la fiche.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onTabKey = (event: React.KeyboardEvent) => {
    const moves: Record<string, number> = {
      ArrowRight: 1,
      ArrowDown: 1,
      ArrowLeft: -1,
      ArrowUp: -1,
    };
    let next: number | null = null;
    if (event.key in moves)
      next = (index + (moves[event.key] ?? 0) + villas.length) % villas.length;
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
        {villas.map((item, i) => (
          <img
            key={item.type}
            src={item.image}
            alt={i === index ? t.villas.typeVilla(item.type) : ""}
            aria-hidden={i !== index}
            className={i === index ? "is-on" : ""}
            loading="lazy"
          />
        ))}
        <span className="vf-shade" aria-hidden="true" />
        <div className="vf-pic-over">
          <div className="section-label light">
            <span>03</span>
            <p>{t.villas.label}</p>
          </div>
          <p className="vf-pic-title" aria-hidden="true">
            {t.villas.titre[0]}
            <br />
            {t.villas.titre[1]}
            <em>{t.villas.titre[2]}</em>
          </p>
          <span className="vf-cap">{t.villas.illustration(villa.type)}</span>
        </div>
      </div>

      <div className="vf-info">
        <button type="button" className="vf-back" onClick={onBack}>
          <ArrowLeft aria-hidden="true" /> {t.villas.retour}
        </button>

        <div className="vf-tabs">
          <div role="tablist" aria-label={t.villas.onglets} onKeyDown={onTabKey}>
            {villas.map((item, i) => (
              <button
                key={item.type}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
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
          <span className="vf-tabs-label">
            {t.villas.typeVilla(villa.type)} · {faits.tag}
          </span>
        </div>

        <div
          id="villa-panel"
          role="tabpanel"
          aria-labelledby={`villa-tab-${villa.type}`}
          key={villa.type}
          className="vf-panel"
        >
          <h2 id="villas-title" ref={headingRef} tabIndex={-1}>
            {t.villas.typeVilla(villa.type).replace(villa.type, "")}
            <em>{villa.type}</em>
          </h2>
          <p className="vf-desc">{faits.description}</p>
          <dl className="vf-specs">
            <div>
              <dt>{t.villas.surface}</dt>
              <dd>{faits.surface}</dd>
            </div>
            <div>
              <dt>{t.villas.terrain}</dt>
              <dd>{faits.terrain}</dd>
            </div>
            <div>
              <dt>{t.villas.configuration}</dt>
              <dd>{faits.suites}</dd>
            </div>
          </dl>
          <VillaPrice type={villa.type} />
          <div
            id="plans"
            className="vf-plans"
            tabIndex={-1}
            aria-label={t.villas.plansAria(villa.type)}
            role="group"
          >
            {villa.plans.map((plan, i) => (
              <button
                key={plan}
                type="button"
                onClick={() => onOpenPlan(plan)}
                aria-label={t.villas.agrandirPlan(i === 1, villa.type)}
              >
                <img src={plan} alt="" loading="lazy" />
                <span>
                  {i ? t.villas.etage : t.villas.rdc} <Expand aria-hidden="true" />
                </span>
              </button>
            ))}
          </div>
          <div className="vf-actions">
            <PillButton label={t.villas.demander} icon={Lock} onClick={onContact} />
            <PillButton
              label={t.villas.brochure}
              icon={Download}
              variant="secondary"
              href={`/brochures/villa-${villa.type.toLowerCase()}.pdf`}
              ariaLabel={t.villas.brochureAria(villa.type)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
