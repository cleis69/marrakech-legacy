import { ArrowRight } from "lucide-react";

import { type CursorHandlers, villas } from "./data";
import { Reveal } from "./motion";

type Props = CursorHandlers & { onOpenVilla: (index: number) => void };

export function VillasSection({ onCursorEnter, onCursorLeave, onOpenVilla }: Props) {
  return (
    <section id="villas" className="villas-section section-pad">
      <div className="section-label"><span>03</span><p>Les villas</p></div>
      <div className="villas-heading"><Reveal><h2>Trois expressions.<br />Une même <em>exigence.</em></h2></Reveal><p>Choisissez une résidence dessinée autour de votre façon de vivre.</p></div>
      <div className="villa-gallery">
        {villas.map((villa, index) => <article key={villa.type} className="villa-card" onMouseEnter={onCursorEnter("EXPLORE")} onMouseLeave={onCursorLeave} onClick={() => onOpenVilla(index)}>
          <img src={villa.image} alt={`Villa CITYSTAR Type ${villa.type} à Marrakech`} loading="lazy" />
          <div className="villa-card-shade" />
          <div className="villa-card-top"><span>Type</span><strong>{villa.type}</strong></div>
          <div className="villa-card-bottom"><p>{villa.area} construits</p><p>{villa.land} de terrain</p><ArrowRight /></div>
        </article>)}
      </div>
    </section>
  );
}
