import { Expand } from "lucide-react";
import { useState } from "react";

import { programme } from "@/config/citystar";
import masterplanImage from "@/assets/citystar/masterplan.jpeg";

import { useDevise } from "./currency";
import { LocationMap, type Place } from "./LocationMap";
import { Reveal } from "./motion";
import { PillButton } from "./ui/PillButton";

/** Les distances pilotent la carte : chaque destination trace son trajet depuis CITYSTAR. */
export function LocationSection({ onOpenPlan }: { onOpenPlan: (src: string) => void }) {
  const { t } = useDevise();
  const [selected, setSelected] = useState<Place | null>(null);
  const lieux = t.localisation.lieux;
  const places: { id: Place; minutes: number | null; word?: string; title: string; note: string }[] = [
    { id: "med", minutes: programme.trajetMaxMinutes, title: lieux.med.titre, note: lieux.med.note(programme.trajetMaxMinutes) },
    { id: "air", minutes: programme.trajetMaxMinutes, title: lieux.air.titre, note: lieux.air.note(programme.trajetMaxMinutes) },
    { id: "palm", minutes: null, word: lieux.palm.mot, title: lieux.palm.titre, note: lieux.palm.note },
  ];

  return (
    <section id="localisation" className="loc section-pad" aria-labelledby="localisation-title">
      <div className="loc-grid">
        <div className="loc-head">
          <div className="section-label"><span>06</span><p>{t.localisation.label}</p></div>
          <Reveal><h2 id="localisation-title">{t.localisation.titre[0]}<br /><em>{t.localisation.titre[1]}</em></h2></Reveal>
        </div>

        <LocationMap selected={selected} onSelect={setSelected} />

        <div className="loc-aside">
          <ul className="loc-dist">
            {places.map((place) => (
              <li key={place.id}>
                <button type="button" aria-pressed={selected === place.id} onClick={() => setSelected(selected === place.id ? null : place.id)}>
                  <span className={`loc-n${place.minutes === null ? " is-word" : ""}`}>{place.minutes ?? place.word}{place.minutes !== null && <small>min</small>}</span>
                  <span className="loc-l"><b>{place.title}</b><span>{place.note}</span></span>
                </button>
              </li>
            ))}
          </ul>
          <address>{t.localisation.adresse.map((ligne, i) => <span key={ligne}>{i > 0 && <br />}{ligne}</span>)}</address>
          <div className="loc-foot">
            <PillButton label={t.localisation.planMasse} icon={Expand} variant="secondary" onClick={() => onOpenPlan(masterplanImage)} />
            <span>{t.localisation.schema}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
