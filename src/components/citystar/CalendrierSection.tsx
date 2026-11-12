import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import {
  type EtapeChantier,
  type Mois,
  calendrier,
  formatMois,
  formatPart,
  moisRestants,
  reservation,
} from "@/config/citystar";

import { useDevise } from "./currency";
import { cheminEspace, Lien } from "./liens";
import { useSite } from "./site";
import { PillButton } from "./ui/PillButton";

const paliers = new Map(reservation.paliers.map((palier) => [palier.etape, palier]));
/* Ce qui reste à répartir une fois les parts confirmées déduites (0,7 après les 30 % de réservation). */
const solde =
  1 - reservation.paliers.reduce((total, p) => total + (p.confirme && p.part ? p.part : 0), 0);

/**
 * Frise de livraison, puis le plan de paiement aligné sous chaque étape.
 * Seules la réservation et la livraison sont datées. Le plan de paiement donne la part de la
 * réservation, puis le solde étalé sur les étapes suivantes jusqu'à la remise des clés.
 */
export function CalendrierSection({ avecEspace = true }: { avecEspace?: boolean }) {
  const { langue, t } = useDevise();
  const { ouvrirContactAvec } = useSite();
  const livraison = formatMois(calendrier.livraison, langue);

  /* Le compte à rebours dépend du jour de la visite : il n'est calculé qu'une fois dans le navigateur. */
  const [restants, setRestants] = useState<number | null>(null);
  useEffect(() => setRestants(moisRestants(calendrier.livraison, new Date())), []);

  const dateEtape = (id: EtapeChantier, date: Mois | null) => {
    if (id === "reservation") return t.livraison.signature;
    if (id === "livraison") return livraison;
    /* Une étape sans date arrêtée n'affiche rien : pas de mention d'attente. */
    return calendrier.etapesConfirmees && date ? formatMois(date, langue) : null;
  };

  const pourcent = (part: number) => formatPart(part, langue);

  const partEtape = (id: EtapeChantier) => {
    const palier = paliers.get(id);
    return palier?.confirme && palier.part != null ? pourcent(palier.part) : null;
  };

  const chiffrees = calendrier.etapes.filter((etape) => partEtape(etape.id));
  const etalees = calendrier.etapes.filter((etape) => !partEtape(etape.id));

  return (
    <section id="livraison" className="lv" aria-labelledby="livraison-title">
      <div className="lv-head">
        <h2 id="livraison-title">{t.livraison.titre(livraison)}</h2>
        <div className="lv-intro" data-vu="">
          <p>{t.livraison.intro}</p>
          {restants !== null && <p className="lv-compte">{t.livraison.compte(restants)}</p>}
        </div>
      </div>

      <h3 className="sr-only">{t.livraison.frise}</h3>
      <ol className="lv-frise" data-vu="trace">
        {calendrier.etapes.map((etape, i) => (
          <li
            key={etape.id}
            className={etape.id === "livraison" ? "is-livraison" : undefined}
            style={{ "--i": i } as React.CSSProperties}
          >
            <span className="lv-point" aria-hidden="true" />
            <span className="lv-num" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="lv-etape">{t.livraison.etapes[etape.id]}</p>
            {dateEtape(etape.id, etape.date) && (
              <p className="lv-date">{dateEtape(etape.id, etape.date)}</p>
            )}
          </li>
        ))}
      </ol>

      <div className="lv-paiement" data-vu="">
        <h3>{t.livraison.paiement}</h3>
        <ol className="lv-paliers">
          {chiffrees.map((etape) => (
            <li key={etape.id}>
              <span className="lv-palier-etape">{t.livraison.etapes[etape.id]}</span>
              <span className="lv-palier-part">
                <span className="sr-only">{t.livraison.part}&nbsp;: </span>
                {partEtape(etape.id)}
              </span>
            </li>
          ))}
          {/* Le solde : une seule part, étalée sur les étapes qui restent, toutes nommées. */}
          {etalees.length > 0 && (
            <li
              className="lv-palier-reste"
              style={{ "--etapes": etalees.length } as React.CSSProperties}
            >
              <span className="lv-palier-etapes">
                {etalees.map((etape) => (
                  <span key={etape.id} className="lv-palier-etape">
                    {t.livraison.etapes[etape.id]}
                  </span>
                ))}
              </span>
              <span className="lv-palier-part">
                <span className="sr-only">{t.livraison.part}&nbsp;: </span>
                {pourcent(solde)} <small>{t.livraison.etale}</small>
              </span>
            </li>
          )}
        </ol>
        <div className="lv-pied">
          <p>{t.livraison.notePaiement(pourcent(solde))}</p>
          <PillButton
            label={t.livraison.echeancier}
            icon={ArrowRight}
            onClick={() =>
              ouvrirContactAvec({
                outil: t.livraison.selection.outil,
                lignes: [t.livraison.selection.ligne],
              })
            }
          />
        </div>
      </div>

      {avecEspace && (
        <div className="lv-espace" data-vu="">
          <p>{t.livraison.espace.texte}</p>
          <Lien className="pill pill-secondary" vers={cheminEspace(langue)}>
            <span className="pill-label">{t.livraison.espace.lien}</span>
          </Lien>
        </div>
      )}
    </section>
  );
}
