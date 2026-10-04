import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import {
  type EtapeChantier,
  type Mois,
  calendrier,
  formatMois,
  moisRestants,
  reservation,
} from "@/config/citystar";

import { useDevise } from "./currency";
import { cheminEspace, Lien } from "./liens";
import { useSite } from "./site";
import { PillButton } from "./ui/PillButton";

const parts = new Map(reservation.paliers.map((palier) => [palier.etape, palier.part]));

/**
 * Frise de livraison, puis le plan de paiement aligné sous chaque étape.
 * Seule la livraison est datée ; le reste s'affiche « à confirmer » tant que
 * le promoteur n'a pas fourni son planning et son échéancier.
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
    return calendrier.etapesConfirmees && date
      ? formatMois(date, langue)
      : t.livraison.dateAConfirmer;
  };

  const partEtape = (id: EtapeChantier) => {
    const part = parts.get(id);
    if (!reservation.paliersConfirmes || part == null) return null;
    return `${(part * 100).toLocaleString(langue === "fr" ? "fr-FR" : "en-GB", { maximumFractionDigits: 1 })} %`;
  };

  return (
    <section id="livraison" className="lv" aria-labelledby="livraison-title">
      <div className="lv-head">
        <h2 id="livraison-title">{t.livraison.titre(livraison)}</h2>
        <div className="lv-intro">
          <p>{t.livraison.intro}</p>
          {restants !== null && <p className="lv-compte">{t.livraison.compte(restants)}</p>}
        </div>
      </div>

      <h3 className="sr-only">{t.livraison.frise}</h3>
      <ol className="lv-frise">
        {calendrier.etapes.map((etape, i) => (
          <li key={etape.id} className={etape.id === "livraison" ? "is-livraison" : undefined}>
            <span className="lv-point" aria-hidden="true" />
            <span className="lv-num" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="lv-etape">{t.livraison.etapes[etape.id]}</p>
            <p className="lv-date">{dateEtape(etape.id, etape.date)}</p>
          </li>
        ))}
      </ol>

      <div className="lv-paiement">
        <h3>{t.livraison.paiement}</h3>
        <ol className="lv-paliers">
          {calendrier.etapes.map((etape) => {
            const part = partEtape(etape.id);
            return (
              <li key={etape.id}>
                <span className="lv-palier-etape">{t.livraison.etapes[etape.id]}</span>
                <span className={`lv-palier-part ${part ? "" : "is-vide"}`.trim()}>
                  <span className="sr-only">{t.livraison.part}&nbsp;: </span>
                  {part ?? t.livraison.aConfirmer}
                </span>
              </li>
            );
          })}
        </ol>
        <div className="lv-pied">
          <p>{t.livraison.notePaiement}</p>
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
        <div className="lv-espace">
          <p>{t.livraison.espace.texte}</p>
          <Lien className="pill pill-secondary" vers={cheminEspace(langue)}>
            <span className="pill-label">{t.livraison.espace.lien}</span>
          </Lien>
        </div>
      )}
    </section>
  );
}
