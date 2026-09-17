import { Expand } from "lucide-react";
import { useState } from "react";

import { programme } from "@/config/citystar";
import masterplanImage from "@/assets/citystar/masterplan.jpeg";

import { LocationMap, type Place } from "./LocationMap";
import { Reveal } from "./motion";
import { PillButton } from "./ui/PillButton";

const PLACES: { id: Place; minutes: number | null; word?: string; title: string; note: string }[] = [
  { id: "med", minutes: programme.trajetMaxMinutes, title: "Place Jemaa el-Fna", note: `Moins de ${programme.trajetMaxMinutes} minutes` },
  { id: "air", minutes: programme.trajetMaxMinutes, title: "Aéroport de Marrakech", note: `Moins de ${programme.trajetMaxMinutes} minutes` },
  { id: "palm", minutes: null, word: "Proche", title: "La Palmeraie", note: "À proximité immédiate" },
];

/** Les distances pilotent la carte : chaque destination trace son trajet depuis CITYSTAR. */
export function LocationSection({ onOpenPlan }: { onOpenPlan: (src: string) => void }) {
  const [selected, setSelected] = useState<Place | null>(null);

  return (
    <section id="localisation" className="loc section-pad" aria-labelledby="localisation-title">
      <div className="loc-grid">
        <div className="loc-head">
          <div className="section-label"><span>06</span><p>Localisation</p></div>
          <Reveal><h2 id="localisation-title">À l’écart.<br /><em>Jamais loin.</em></h2></Reveal>
        </div>

        <LocationMap selected={selected} onSelect={setSelected} />

        <div className="loc-aside">
          <ul className="loc-dist">
            {PLACES.map((place) => (
              <li key={place.id}>
                <button type="button" aria-pressed={selected === place.id} onClick={() => setSelected(selected === place.id ? null : place.id)}>
                  <span className={`loc-n${place.minutes === null ? " is-word" : ""}`}>{place.minutes ?? place.word}{place.minutes !== null && <small>min</small>}</span>
                  <span className="loc-l"><b>{place.title}</b><span>{place.note}</span></span>
                </button>
              </li>
            ))}
          </ul>
          <address>Wilaya Marrakech-Safi<br />Préfecture de Marrakech<br />Oulad Hassoune</address>
          <div className="loc-foot">
            <PillButton label="Plan de masse" icon={Expand} variant="secondary" onClick={() => onOpenPlan(masterplanImage)} />
            <span>Carte schématique, non à l’échelle</span>
          </div>
        </div>
      </div>
    </section>
  );
}
