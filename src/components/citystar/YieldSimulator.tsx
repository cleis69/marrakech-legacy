import { ArrowRight, Building2, Info } from "lucide-react";
import { useRef, useState } from "react";

import {
  type Devise,
  type TypeVilla,
  bornesPrixEUR,
  bornesSimulateur,
  convertirEUR,
  coutsDetention,
  formatNombre,
  formatPrix,
  hypothesesRendement,
  prixVilla,
  villasChiffres,
} from "@/config/citystar";

import { CurrencyPills, useDevise } from "./currency";
import type { Selection } from "./data";
import { PARAM_BUDGET } from "./data";
import { chemin, Lien } from "./liens";
import { PillButton } from "./ui/PillButton";

type Mode = "court" | "long" | "revente";
type Cle = keyof typeof bornesSimulateur;

const MODES: Mode[] = ["court", "long", "revente"];
const TYPES = Object.keys(villasChiffres) as TypeVilla[];
/* Villa de référence tant que le visiteur n’a pas choisi. */
const TYPE_PAR_DEFAUT: TypeVilla = "B";

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
  const [type, setType] = useState<TypeVilla | "">("");
  /* Sans saisie, le budget suit le prix de la villa choisie ; une saisie garde sa devise. */
  const [saisi, setSaisi] = useState<{ montant: number; devise: Devise } | null>(null);
  const [estimation, setEstimation] = useState(false);
  const [valeurs, setValeurs] = useState<Record<Cle, number>>(() => {
    const base = {} as Record<Cle, number>;
    (Object.keys(bornesSimulateur) as Cle[]).forEach((cle) => {
      base[cle] = SOURCE[cle] ?? milieu(cle);
    });
    return base;
  });
  const sortie = useRef<HTMLDivElement>(null);

  const pret = REQUIS[mode].every((cle) => SOURCE[cle] !== null);

  /* Montants saisis en euros dans la config : on affiche et on calcule dans la devise choisie. */
  const enDevise = (montantEUR: number) => Math.round(convertirEUR(montantEUR, devise, taux));
  const money = (valeur: number) => formatPrix(Math.round(valeur), devise, langue);
  const pourcent = (valeur: number, decimales = 1) =>
    `${valeur.toLocaleString(langue === "fr" ? "fr-FR" : "en-GB", { minimumFractionDigits: decimales, maximumFractionDigits: decimales })} %`;

  const enEUR = (montant: number, source: Devise) =>
    source === "EUR" ? montant : montant / taux[source];
  const prixReference = saisi
    ? saisi.devise === devise
      ? saisi.montant
      : enDevise(enEUR(saisi.montant, saisi.devise))
    : prixVilla(type || TYPE_PAR_DEFAUT, devise, taux).montant;
  const budgetEUR = enEUR(prixReference, devise);

  const champs: Record<Cle, { label: string; format: (valeur: number) => string }> = {
    prixMoyenNuitEUR: {
      label: t.rentabilite.champs.prixMoyenNuitEUR,
      format: (v) => money(enDevise(v)),
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
    },
    imposition: { label: t.rentabilite.champs.imposition, format: (v) => pourcent(v * 100, 0) },
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
      ...(type ? [t.rentabilite.ligneType(t.rentabilite.typeVilla(type))] : []),
      resultat
        ? t.rentabilite.ligneResultat(resultat.titre, resultat.valeur)
        : t.rentabilite.ligneNeutre,
    ],
  });

  const slider = (cle: Cle, actif: boolean) => {
    const bornes = bornesSimulateur[cle];
    return (
      <div key={cle} className="sm-slider">
        <label htmlFor={`sm-${cle}`}>
          <span>{champs[cle].label}</span>
          <output htmlFor={`sm-${cle}`}>
            {actif ? champs[cle].format(valeurs[cle]) : t.rentabilite.attente}
          </output>
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

  /* La saisie garde la devise dans laquelle elle a été faite ; le choix d'un type la remplace. */
  const surBudget = (montant: number) => {
    setType("");
    setSaisi({ montant, devise });
  };

  const surType = (choisi: TypeVilla | "") => {
    setType(choisi);
    setSaisi(null);
  };

  const estimer = (event: React.FormEvent) => {
    event.preventDefault();
    setEstimation(true);
    /* Le résultat s'ouvre plus bas : on y emmène le clavier et les lecteurs d'écran. */
    requestAnimationFrame(() => sortie.current?.focus());
  };

  return (
    <section id="rentabilite" className="sm section-pad" aria-labelledby="rentabilite-title">
      <div className="sm-grid">
        <div className="sm-left">
          <p className="sm-kicker">{t.rentabilite.kicker}</p>
          <h2 id="rentabilite-title">
            {t.rentabilite.titre[0]}
            <em>{t.rentabilite.titre[1]}</em>
          </h2>
          <p className="sm-lede">{t.rentabilite.intro[0]}</p>
          <p className="sm-sub">{t.rentabilite.intro[1]}</p>
        </div>

        <form className="sm-card" onSubmit={estimer}>
          <div className="sm-field">
            <div className="sm-field-head">
              <label htmlFor="sm-budget">{t.rentabilite.budget}</label>
              <CurrencyPills />
            </div>
            {/* Champ texte plutôt que nombre : le montant reste lisible, séparateurs compris. */}
            <input
              id="sm-budget"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              value={formatNombre(prixReference, langue)}
              onChange={(event) => surBudget(Number(event.target.value.replace(/\D/g, "")))}
            />
            <input
              className="sm-range"
              type="range"
              aria-label={t.rentabilite.budget}
              min={enDevise(bornesPrixEUR.min)}
              max={enDevise(bornesPrixEUR.max)}
              step={enDevise(bornesPrixEUR.pas)}
              value={Math.min(
                Math.max(prixReference, enDevise(bornesPrixEUR.min)),
                enDevise(bornesPrixEUR.max),
              )}
              onChange={(event) => surBudget(Number(event.target.value))}
            />
          </div>

          <div className="sm-field">
            <label htmlFor="sm-type">
              {t.rentabilite.typeLabel} <small>({t.rentabilite.optionnel})</small>
            </label>
            <select
              id="sm-type"
              value={type}
              onChange={(event) => surType(event.target.value as TypeVilla | "")}
            >
              <option value="">{t.rentabilite.typeLibre}</option>
              {TYPES.map((item) => (
                <option key={item} value={item}>
                  {t.rentabilite.typeVilla(item)}
                </option>
              ))}
            </select>
          </div>

          <div className="sm-field">
            <label htmlFor="sm-mode">{t.rentabilite.projet}</label>
            <select
              id="sm-mode"
              value={mode}
              onChange={(event) => setMode(event.target.value as Mode)}
            >
              {MODES.map((item) => (
                <option key={item} value={item}>
                  {t.rentabilite.modes[item]}
                </option>
              ))}
            </select>
          </div>

          <div className="sm-sliders">
            {REQUIS[mode].map((cle) => slider(cle, SOURCE[cle] !== null))}
          </div>

          <button type="submit" className="sm-submit">
            {t.rentabilite.estimer}
          </button>
          <p className="sm-fine">{t.rentabilite.mention}</p>
        </form>
      </div>

      {estimation && (
        <div className="sm-out" ref={sortie} tabIndex={-1} aria-live="polite">
          <h3>{t.rentabilite.resultatTitre}</h3>
          <dl className="sm-figures">
            <div>
              <dt>{t.rentabilite.budgetSaisi}</dt>
              <dd>{formatPrix(prixReference, devise, langue)}</dd>
            </div>
            <div>
              <dt>{t.rentabilite.usage}</dt>
              <dd>{t.rentabilite.modes[mode]}</dd>
            </div>
            {resultat && (
              <div className="is-key">
                <dt>{resultat.titre}</dt>
                <dd>{resultat.valeur}</dd>
              </div>
            )}
          </dl>

          {resultat ? (
            <dl className="sm-detail">
              {resultat.detail.map(([label, valeur]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{valeur}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <div className="sm-neutral">
              <b>{t.rentabilite.neutreTitre}</b>
              <p>{t.rentabilite.neutreTexte}</p>
            </div>
          )}

          {mode === "court" && (
            <p className="sm-warn">
              <Info aria-hidden="true" />
              <span>
                {t.rentabilite.courtTerme}
                <small>{t.rentabilite.courtTermeNote}</small>
              </span>
            </p>
          )}

          <details className="sm-advanced">
            <summary>{t.rentabilite.avancees}</summary>
            <div>
              {(["charges", "coutsAnnuelsEUR", "imposition"] as Cle[]).map((cle) =>
                slider(cle, SOURCE[cle] !== null),
              )}
            </div>
          </details>

          <div className="sm-actions">
            <PillButton
              label={t.rentabilite.analyse}
              icon={ArrowRight}
              onClick={() => onContact(selection())}
            />
            <Lien
              className="pill pill-secondary"
              vers={`${chemin(langue, "villas")}?${PARAM_BUDGET}=${Math.round(budgetEUR)}`}
            >
              <span className="pill-label">{t.rentabilite.compatibles}</span>
              <i className="pill-dot" aria-hidden="true">
                <Building2 />
              </i>
            </Lien>
          </div>
        </div>
      )}
    </section>
  );
}
