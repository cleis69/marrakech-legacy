import { ArrowRight, Building2, Info } from "lucide-react";
import { useRef, useState } from "react";

import {
  type Devise,
  type Langue,
  bornesPrixEUR,
  bornesSimulateur,
  convertirEUR,
  coutsDetention,
  formatNombre,
  formatPrix,
  hypothesesRendement,
  prixVilla,
} from "@/config/citystar";

import { CurrencyPills, useDevise } from "./currency";
import { type Selection, SHOW_BUDGET_EVENT } from "./data";
import { PillButton } from "./ui/PillButton";

type Mode = "court" | "long" | "revente";
type Cle = keyof typeof bornesSimulateur;

const MODES: Mode[] = ["court", "long", "revente"];

/** Hypothèses nécessaires à chaque mode : si l'une n'est pas confirmée, aucun rendement n'est publié. */
const REQUIS: Record<Mode, Cle[]> = {
  court: ["prixMoyenNuitEUR", "tauxOccupation", "semainesUsagePersonnel"],
  long: ["loyerMensuelEUR"],
  revente: ["horizonAnnees", "appreciationAnnuelle"],
};

const SOURCE: Record<Cle, number | null> = {
  prixMoyenNuitEUR: hypothesesRendement.prixMoyenNuitEUR.valeur,
  tauxOccupation: hypothesesRendement.tauxOccupation.valeur,
  semainesUsagePersonnel: hypothesesRendement.semainesUsagePersonnel.valeur,
  loyerMensuelEUR: hypothesesRendement.loyerMensuelEUR.valeur,
  horizonAnnees: hypothesesRendement.horizonAnnees.valeur,
  appreciationAnnuelle: hypothesesRendement.appreciationAnnuelle.valeur,
  charges: coutsDetention.charges.valeur,
  coutsAnnuelsEUR: coutsDetention.coutsAnnuelsEUR.valeur,
  imposition: coutsDetention.imposition.valeur,
};

const milieu = (cle: Cle) => {
  const { min, max, pas } = bornesSimulateur[cle];
  return Math.round((min + max) / 2 / pas) * pas;
};

export function YieldSimulator({ onContact }: { onContact: (selection: Selection) => void }) {
  const { devise, langue, t, taux } = useDevise();
  const [mode, setMode] = useState<Mode>("court");
  const [prix, setPrix] = useState<number | null>(null);
  const [valeurs, setValeurs] = useState<Record<Cle, number>>(() => {
    const base = {} as Record<Cle, number>;
    (Object.keys(bornesSimulateur) as Cle[]).forEach((cle) => {
      base[cle] = SOURCE[cle] ?? milieu(cle);
    });
    return base;
  });
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const prixReference = prix ?? prixVilla("B", devise, taux).montant;
  const pret = REQUIS[mode].every((cle) => SOURCE[cle] !== null);

  /* Montants saisis en euros dans la config : on affiche et on calcule dans la devise choisie. */
  const enDevise = (montantEUR: number) => Math.round(convertirEUR(montantEUR, devise, taux));
  const money = (valeur: number) => formatPrix(Math.round(valeur), devise, langue);
  const pourcent = (valeur: number, decimales = 1) =>
    `${valeur.toLocaleString(langue === "fr" ? "fr-FR" : "en-GB", { minimumFractionDigits: decimales, maximumFractionDigits: decimales })} %`;

  const champs: Record<
    Cle,
    { label: string; format: (valeur: number) => string; devise?: boolean }
  > = {
    prixMoyenNuitEUR: {
      label: t.rentabilite.champs.prixMoyenNuitEUR,
      format: (v) => money(enDevise(v)),
      devise: true,
    },
    tauxOccupation: {
      label: t.rentabilite.champs.tauxOccupation,
      format: (v) => pourcent(v * 100, 0),
    },
    semainesUsagePersonnel: {
      label: t.rentabilite.champs.semainesUsagePersonnel,
      format: (v) => t.rentabilite.semaine(v),
    },
    loyerMensuelEUR: {
      label: t.rentabilite.champs.loyerMensuelEUR,
      format: (v) => money(enDevise(v)),
      devise: true,
    },
    horizonAnnees: {
      label: t.rentabilite.champs.horizonAnnees,
      format: (v) => t.rentabilite.an(v),
    },
    appreciationAnnuelle: {
      label: t.rentabilite.champs.appreciationAnnuelle,
      format: (v) => pourcent(v * 100),
    },
    charges: {
      label: t.rentabilite.champs.charges,
      format: (v) => `${pourcent(v * 100, 0)} ${t.rentabilite.desRevenus}`,
    },
    coutsAnnuelsEUR: {
      label: t.rentabilite.champs.coutsAnnuelsEUR,
      format: (v) => `${money(enDevise(v))} ${t.rentabilite.parAn}`,
      devise: true,
    },
    imposition: { label: t.rentabilite.champs.imposition, format: (v) => pourcent(v * 100, 0) },
  };

  const curseurs: Record<Mode, Cle[]> = {
    court: ["prixMoyenNuitEUR", "tauxOccupation", "semainesUsagePersonnel"],
    long: ["loyerMensuelEUR"],
    revente: ["horizonAnnees", "appreciationAnnuelle"],
  };

  const resultat = (() => {
    if (!pret) return null;
    if (mode === "court") {
      const nuits = Math.max(0, 365 - valeurs.semainesUsagePersonnel * 7) * valeurs.tauxOccupation;
      const revenu = nuits * enDevise(valeurs.prixMoyenNuitEUR);
      return {
        titre: t.rentabilite.rendementBrut,
        valeur: pourcent((revenu / prixReference) * 100),
        detail: [
          [t.rentabilite.nuits, formatNombre(Math.round(nuits), langue)],
          [t.rentabilite.revenuBrut, money(revenu)],
        ] as [string, string][],
      };
    }
    if (mode === "long") {
      const revenu = enDevise(valeurs.loyerMensuelEUR) * 12;
      return {
        titre: t.rentabilite.rendementBrut,
        valeur: pourcent((revenu / prixReference) * 100),
        detail: [
          [t.rentabilite.loyerDouze, `${money(enDevise(valeurs.loyerMensuelEUR))} × 12`],
          [t.rentabilite.revenuBrut, money(revenu)],
        ] as [string, string][],
      };
    }
    const projetee =
      prixReference * Math.pow(1 + valeurs.appreciationAnnuelle, valeurs.horizonAnnees);
    return {
      titre: t.rentabilite.plusValueBrute,
      valeur: money(projetee - prixReference),
      detail: [
        [t.rentabilite.valeurProjetee(valeurs.horizonAnnees), money(projetee)],
        [
          t.rentabilite.appreciation,
          `${pourcent(valeurs.appreciationAnnuelle * 100)} ${t.rentabilite.parAn}`,
        ],
      ] as [string, string][],
    };
  })();

  const selection = (): Selection => ({
    outil: t.rentabilite.outil,
    lignes: [
      t.rentabilite.ligneMode(t.rentabilite.modes[mode]),
      t.rentabilite.prixEtudie(formatPrix(prixReference, devise, langue)),
      resultat
        ? t.rentabilite.ligneResultat(resultat.titre, resultat.valeur)
        : t.rentabilite.ligneNeutre,
    ],
  });

  const onTabKey = (event: React.KeyboardEvent) => {
    const index = MODES.indexOf(mode);
    const pas = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!pas) return;
    event.preventDefault();
    const suivant = MODES[(index + pas + MODES.length) % MODES.length];
    if (!suivant) return;
    setMode(suivant);
    tabRefs.current[(index + pas + MODES.length) % MODES.length]?.focus();
  };

  const slider = (cle: Cle, actif: boolean) => {
    // Les hypothèses restent en euros en interne ; seul l'affichage suit la devise choisie.
    const bornes = bornesSimulateur[cle];
    const valeurAffichee = champs[cle].format(valeurs[cle]);
    return (
      <div key={cle} className="sm-slider">
        <label htmlFor={`sm-${cle}`}>
          <span>{champs[cle].label}</span>
          <output htmlFor={`sm-${cle}`}>{actif ? valeurAffichee : t.rentabilite.attente}</output>
        </label>
        <input
          id={`sm-${cle}`}
          type="range"
          min={bornes.min}
          max={bornes.max}
          step={bornes.pas}
          value={valeurs[cle]}
          disabled={!actif}
          onChange={(event) =>
            setValeurs((current) => ({ ...current, [cle]: Number(event.target.value) }))
          }
        />
      </div>
    );
  };

  const prixMin = enDevise(bornesPrixEUR.min);
  const prixMax = enDevise(bornesPrixEUR.max);

  return (
    <section id="rentabilite" className="sm section-pad" aria-labelledby="rentabilite-title">
      <div className="sm-grid">
        <div className="sm-left">
          <p className="sm-kicker">{t.rentabilite.kicker}</p>
          <h2 id="rentabilite-title">
            {t.rentabilite.titre[0]}
            <em>{t.rentabilite.titre[1]}</em>
          </h2>

          <div
            className="sm-tabs"
            role="tablist"
            aria-label={t.rentabilite.modeAria}
            onKeyDown={onTabKey}
          >
            {MODES.map((item, i) => (
              <button
                key={item}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`sm-tab-${item}`}
                aria-selected={mode === item}
                aria-controls="sm-panel"
                tabIndex={mode === item ? 0 : -1}
                onClick={() => setMode(item)}
              >
                {t.rentabilite.modes[item]}
              </button>
            ))}
          </div>

          <div className="sm-sliders">
            <div className="sm-slider">
              <label htmlFor="sm-prix">
                <span>{t.rentabilite.prix}</span>
                <output htmlFor="sm-prix">{formatPrix(prixReference, devise, langue)}</output>
              </label>
              <input
                id="sm-prix"
                type="range"
                min={prixMin}
                max={prixMax}
                step={enDevise(bornesPrixEUR.pas)}
                value={prixReference}
                onChange={(event) => setPrix(Number(event.target.value))}
              />
            </div>
            {curseurs[mode].map((cle) => slider(cle, SOURCE[cle] !== null))}
          </div>

          <details className="sm-advanced">
            <summary>{t.rentabilite.avancees}</summary>
            <div>
              {(["charges", "coutsAnnuelsEUR", "imposition"] as Cle[]).map((cle) =>
                slider(cle, SOURCE[cle] !== null),
              )}
            </div>
          </details>
        </div>

        <div id="sm-panel" role="tabpanel" aria-labelledby={`sm-tab-${mode}`} className="sm-right">
          {resultat ? (
            <>
              <div className="sm-gross">
                <span className="sm-label">{resultat.titre}</span>
                <strong>{resultat.valeur}</strong>
              </div>
              <dl className="sm-detail">
                {resultat.detail.map(([label, valeur]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{valeur}</dd>
                  </div>
                ))}
              </dl>
            </>
          ) : (
            <div className="sm-neutral">
              <b>{t.rentabilite.neutreTitre}</b>
              <p>{t.rentabilite.neutreTexte}</p>
            </div>
          )}

          <p className="sm-fine">{t.rentabilite.mention}</p>

          {mode === "court" && (
            <p className="sm-warn">
              <Info aria-hidden="true" />
              <span>
                {t.rentabilite.courtTerme}
                <small>{t.rentabilite.courtTermeNote}</small>
              </span>
            </p>
          )}

          <div className="sm-actions">
            <PillButton
              label={t.rentabilite.analyse}
              icon={ArrowRight}
              onClick={() => onContact(selection())}
            />
            <PillButton
              label={t.rentabilite.compatibles}
              icon={Building2}
              variant="secondary"
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent<{ montant: number; devise: Devise; langue: Langue }>(
                    SHOW_BUDGET_EVENT,
                    { detail: { montant: prixReference, devise, langue } },
                  ),
                )
              }
            />
          </div>

          <CurrencyPills />
        </div>
      </div>
    </section>
  );
}
