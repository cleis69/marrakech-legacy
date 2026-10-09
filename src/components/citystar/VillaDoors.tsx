import {
  formatPrix,
  formatSurface,
  prixPublics,
  prixVilla,
  prixVillas,
  programme,
} from "@/config/citystar";

import { useDevise } from "./currency";
import { type CursorHandlers, faitsVilla, villas } from "./data";
import { chemin, Lien } from "./liens";
import { Reveal } from "./motion";

type Props = CursorHandlers & { sansEntete?: boolean };

/** Les trois villas en cartes : photo, pastille, nom, prix et repères ; chaque carte ouvre sa page. */
export function VillaDoors({ onCursorEnter, onCursorLeave, sansEntete = false }: Props) {
  const { devise, langue, t, taux } = useDevise();

  return (
    <div className="vd section-pad">
      {!sansEntete && (
        <div className="vd-top">
          <Reveal>
            <h2 id="villas-title">
              {t.villas.titre[0]} <br />
              <span className="ton">
                {t.villas.titre[1]}
                {t.villas.titre[2]}
              </span>
            </h2>
          </Reveal>
          <div data-vu="">
            <p>
              {t.villas.intro(
                programme.nombreVillas,
                formatSurface(programme.terrainMaxM2, langue),
              )}
            </p>
            <Lien className="pill pill-secondary" vers={chemin(langue, "villas")}>
              <span className="pill-label">{t.villas.comparer}</span>
            </Lien>
          </div>
        </div>
      )}

      <ul className="vd-cartes">
        {villas.map((villa, i) => {
          const faits = faitsVilla(villa.type, t, langue);
          const { montant, approximatif } = prixVilla(villa.type, devise, taux);
          return (
            <li key={villa.type} data-vu="" style={{ "--i": i } as React.CSSProperties}>
              <Lien
                className="vd-carte"
                vers={chemin(langue, `villas/${villa.type.toLowerCase()}`)}
                ariaLabel={t.villas.decouvrirAria(
                  villa.type,
                  faits.surface,
                  faits.suites,
                  faits.tag,
                )}
                onMouseEnter={onCursorEnter(t.villas.curseur)}
                onMouseLeave={onCursorLeave}
              >
                <span className="vd-photo">
                  <img src={villa.image} alt="" loading="lazy" />
                  <span className="vd-tag">{faits.tag}</span>
                </span>
                <span className="vd-ligne">
                  <strong>
                    {t.villas.villa} {villa.type}
                  </strong>
                  <span className="vd-prix">
                    {prixPublics
                      ? `${approximatif ? "≈ " : ""}${formatPrix(montant, devise, langue)}`
                      : t.prix.surDemande}
                  </span>
                </span>
                <span className="vd-specs">
                  {faits.surface} · {faits.suites} · {t.villas.terrain.toLowerCase()}{" "}
                  {faits.terrain}
                  {prixPublics && !prixVillas[villa.type].confirme && ` · ${t.prix.indicatifCourt}`}
                </span>
              </Lien>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
