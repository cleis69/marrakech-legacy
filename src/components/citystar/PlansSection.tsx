import { Download, Expand } from "lucide-react";

import { villas } from "./data";
import { Reveal } from "./motion";

export function PlansSection({ onOpenPlan }: { onOpenPlan: (src: string) => void }) {
  return (
    <section id="plans" className="plans-section section-pad" aria-labelledby="plans-title">
      <div className="section-label"><span>03</span><p>Les plans</p></div>
      <div className="plans-heading"><Reveal><h2 id="plans-title">Chaque villa,<br />en <em>plan.</em></h2></Reveal><p>Rez-de-chaussée et étage des trois types de villas. Sélectionnez un plan pour l’agrandir.</p></div>
      <div className="plans-grid">
        {villas.map((villa) => (
          <article key={villa.type} className="plans-villa" aria-label={`Plans de la villa type ${villa.type}`}>
            <div className="plans-villa-head"><span>Type</span><strong>{villa.type}</strong><p>{villa.area} · {villa.bedrooms}</p></div>
            <div className="plan-thumbs">
              {villa.plans.map((plan, i) => (
                <button key={plan} onClick={() => onOpenPlan(plan)} aria-label={`Agrandir le plan ${i ? "de l’étage" : "du rez-de-chaussée"} de la villa ${villa.type}`}>
                  <img src={plan} alt="" loading="lazy" />
                  <span>{i ? "Étage" : "Rez-de-chaussée"} <Expand aria-hidden="true" /></span>
                </button>
              ))}
            </div>
            <a className="brochure-link" href={`/brochures/villa-${villa.type.toLowerCase()}.pdf`} target="_blank" rel="noreferrer">Brochure villa {villa.type} <Download aria-hidden="true" /></a>
          </article>
        ))}
      </div>
    </section>
  );
}
