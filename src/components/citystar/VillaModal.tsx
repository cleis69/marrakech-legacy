import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Download, Expand, X } from "lucide-react";

import type { Villa } from "./data";

type Props = { villa: Villa; onClose: () => void; onPlan: (src: string) => void; onPrev: () => void; onNext: () => void };

export function VillaModal({ villa, onClose, onPlan, onPrev, onNext }: Props) {
  return <motion.div className="villa-modal" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: .75, ease: [0.76, 0, 0.24, 1] }}>
    <button className="modal-close" onClick={onClose}><X /> Fermer</button><div className="villa-modal-image"><img src={villa.image} alt={`Villa Type ${villa.type}`} /></div>
    <div className="villa-modal-copy"><p className="eyebrow">Villa Type {villa.type}</p><h2>Type <em>{villa.type}</em></h2><p>{villa.description}</p><div className="modal-facts"><span><strong>{villa.area}</strong>Surface construite</span><span><strong>{villa.land}</strong>Surface totale</span><span><strong>{villa.bedrooms}</strong>Configuration</span></div>
      <div id="plans" className="plan-thumbs">{villa.plans.map((plan, i) => <button key={plan} onClick={() => onPlan(plan)}><img src={plan} alt={`Plan ${i ? "étage" : "rez-de-chaussée"} villa ${villa.type}`} /><span>{i ? "Étage" : "Rez-de-chaussée"} <Expand /></span></button>)}</div>
      <a className="brochure-link" href={`/brochures/villa-${villa.type.toLowerCase()}.pdf`} target="_blank">Télécharger la brochure <Download /></a>
      <div className="modal-nav"><button onClick={onPrev}><ChevronLeft /> Type précédent</button><button onClick={onNext}>Type suivant <ChevronRight /></button></div>
    </div>
  </motion.div>;
}
