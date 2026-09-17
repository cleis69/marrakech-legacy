import { Play } from "lucide-react";

import visitImage from "@/assets/citystar/visit.jpeg";

import type { CursorHandlers } from "./data";

type Props = CursorHandlers & { onOpenTour: () => void };

export function TourSection({ onCursorEnter, onCursorLeave, onOpenTour }: Props) {
  return (
    <section id="visite" className="tour-section" onMouseEnter={onCursorEnter("OPEN")} onMouseLeave={onCursorLeave} onClick={onOpenTour}>
      <img src={visitImage} alt="Aperçu de la visite virtuelle d’une villa CITYSTAR" loading="lazy" />
      <div className="tour-shade" /><div className="tour-content"><span>Visite virtuelle</span><h2>Entrez dans<br /><em>CITYSTAR.</em></h2><button aria-label="Lancer la visite 360 degrés"><Play fill="currentColor" /> Lancer la visite 360°</button></div>
    </section>
  );
}
