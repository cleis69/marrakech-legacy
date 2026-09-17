import { Expand, MapPin } from "lucide-react";

import locationImage from "@/assets/citystar/location.jpeg";
import masterplanImage from "@/assets/citystar/masterplan.jpeg";

export function LocationSection({ onOpenPlan }: { onOpenPlan: (src: string) => void }) {
  return (
    <section id="localisation" className="location-section section-pad">
      <div className="section-label"><span>05</span><p>Localisation</p></div>
      <div className="location-grid">
        <div className="location-image"><img src={locationImage} alt="Environnement de CITYSTAR à Marrakech" loading="lazy" /><span>Marrakech<br />Maroc</span></div>
        <div className="location-copy"><MapPin /><p className="eyebrow">Oulad Hassoune</p><h2>À l’écart.<br /><em>Jamais loin.</em></h2><p>À proximité de la Palmeraie, à moins de 35 minutes de la place Jemaa el-Fna et de l’aéroport de Marrakech.</p><address>Wilaya Marrakech-Safi<br />Préfecture de Marrakech<br />Oulad Hassoune</address></div>
      </div>
      <button className="masterplan" onClick={() => onOpenPlan(masterplanImage)}><img src={masterplanImage} alt="Plan de situation de la résidence CITYSTAR" loading="lazy" /><span><Expand /> Agrandir le plan de situation</span></button>
    </section>
  );
}
