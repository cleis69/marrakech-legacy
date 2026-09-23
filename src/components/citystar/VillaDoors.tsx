import { ArrowRight } from "lucide-react";
import { useRef, useState } from "react";

import { formatSurface, programme } from "@/config/citystar";

import { useDevise } from "./currency";
import { type CursorHandlers, faitsVilla, villas } from "./data";
import { chemin, Lien } from "./liens";
import { Reveal } from "./motion";

type Props = CursorHandlers & { sansEntete?: boolean };

/** Trois portes : survoler en élargit une, cliquer ouvre la page de la villa. */
export function VillaDoors({ onCursorEnter, onCursorLeave, sansEntete = false }: Props) {
  const { langue, t } = useDevise();
  const railRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(0);

  const onRailScroll = () => {
    const rail = railRef.current;
    const first = rail?.firstElementChild as HTMLElement | null;
    if (!rail || !first) return;
    setVisible(Math.round(rail.scrollLeft / (first.offsetWidth + 10)));
  };

  return (
    <div className="vd section-pad">
      {!sansEntete && (
        <div className="vd-top">
          <div>
            <div className="section-label">
              <span>03</span>
              <p>{t.villas.label}</p>
            </div>
            <Reveal>
              <h2 id="villas-title">
                {t.villas.titre[0]}
                <br />
                {t.villas.titre[1]}
                <em>{t.villas.titre[2]}</em>
              </h2>
            </Reveal>
          </div>
          <div>
            <p>
              {t.villas.intro(
                programme.nombreVillas,
                formatSurface(programme.terrainMaxM2, langue),
              )}
            </p>
            <Lien className="pill pill-secondary" vers={chemin(langue, "villas")}>
              <span className="pill-label">{t.villas.comparer}</span>
              <i className="pill-dot" aria-hidden="true">
                <ArrowRight />
              </i>
            </Lien>
          </div>
        </div>
      )}

      <div className="vd-tri" ref={railRef} onScroll={onRailScroll}>
        {villas.map((villa, i) => {
          const faits = faitsVilla(villa.type, t, langue);
          return (
            <Lien
              key={villa.type}
              className={`vd-door${i === 0 ? " is-on" : ""}`}
              vers={chemin(langue, `villas/${villa.type.toLowerCase()}`)}
              ariaLabel={t.villas.decouvrirAria(villa.type, faits.surface, faits.suites, faits.tag)}
              onMouseEnter={onCursorEnter("EXPLORE")}
              onMouseLeave={onCursorLeave}
            >
              <img src={villa.image} alt="" loading="lazy" />
              <span className="vd-shade" aria-hidden="true" />
              <span className="vd-name" aria-hidden="true">
                <small>{t.villas.villa}</small>
                <strong>{villa.type}</strong>
              </span>
              <span className="vd-bottom" aria-hidden="true">
                <span className="vd-more">
                  <span className="vd-desc">{faits.description}</span>
                  <span className="pill pill-primary">
                    <span className="pill-label">{t.villas.decouvrir}</span>
                    <i className="pill-dot">
                      <ArrowRight />
                    </i>
                  </span>
                </span>
                <span className="vd-specs">
                  <span>{faits.surface}</span>
                  <span>{faits.suites}</span>
                  <span>{faits.tag}</span>
                </span>
              </span>
            </Lien>
          );
        })}
      </div>
      <div className="vd-dots" aria-hidden="true">
        {villas.map((villa, i) => (
          <i key={villa.type} className={i === visible ? "is-on" : ""} />
        ))}
      </div>
    </div>
  );
}
