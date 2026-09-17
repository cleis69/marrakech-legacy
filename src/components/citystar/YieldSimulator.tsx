import { ArrowRight, Building2, Info } from "lucide-react";
import { useRef, useState } from "react";

import { type Devise, type Langue, bornesPrixEUR, bornesSimulateur, convertirEUR, coutsDetention, formatNombre, formatPrix, hypothesesRendement, prixVilla } from "@/config/citystar";

import { CurrencyPills, useDevise } from "./currency";
import { type Selection, SHOW_BUDGET_EVENT } from "./data";
import { PillButton } from "./ui/PillButton";

type Mode = "court" | "long" | "revente";
type Cle = keyof typeof bornesSimulateur;

const MODES: { id: Mode; label: string }[] = [
  { id: "court", label: "Courte durée" },
  { id: "long", label: "Longue durée" },
  { id: "revente", label: "Revente" },
];

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
  const { devise, langue } = useDevise();
  const [mode, setMode] = useState<Mode>("court");
  const [prix, setPrix] = useState<number | null>(null);
  const [valeurs, setValeurs] = useState<Record<Cle, number>>(() => {
    const base = {} as Record<Cle, number>;
    (Object.keys(bornesSimulateur) as Cle[]).forEach((cle) => { base[cle] = SOURCE[cle] ?? milieu(cle); });
    return base;
  });
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const prixReference = prix ?? prixVilla("B", devise).montant;
  const pret = REQUIS[mode].every((cle) => SOURCE[cle] !== null);

  /* Montants saisis en euros dans la config : on affiche et on calcule dans la devise choisie. */
  const enDevise = (montantEUR: number) => Math.round(convertirEUR(montantEUR, devise));
  const money = (valeur: number) => formatPrix(Math.round(valeur), devise, langue);
  const pourcent = (valeur: number, decimales = 1) => `${valeur.toLocaleString(langue === "fr" ? "fr-FR" : "en-GB", { minimumFractionDigits: decimales, maximumFractionDigits: decimales })} %`;

  const champs: Record<Cle, { label: string; format: (valeur: number) => string; devise?: boolean }> = {
    prixMoyenNuitEUR: { label: "Prix moyen par nuit", format: (v) => money(enDevise(v)), devise: true },
    tauxOccupation: { label: "Taux d’occupation", format: (v) => pourcent(v * 100, 0) },
    semainesUsagePersonnel: { label: "Semaines d’usage personnel", format: (v) => `${v} semaine${v > 1 ? "s" : ""}` },
    loyerMensuelEUR: { label: "Loyer mensuel estimé", format: (v) => money(enDevise(v)), devise: true },
    horizonAnnees: { label: "Horizon", format: (v) => `${v} an${v > 1 ? "s" : ""}` },
    appreciationAnnuelle: { label: "Appréciation annuelle", format: (v) => pourcent(v * 100) },
    charges: { label: "Charges", format: (v) => `${pourcent(v * 100, 0)} des revenus` },
    coutsAnnuelsEUR: { label: "Coûts de détention", format: (v) => `${money(enDevise(v))} / an`, devise: true },
    imposition: { label: "Imposition", format: (v) => pourcent(v * 100, 0) },
  };

  const curseurs: Record<Mode, Cle[]> = { court: ["prixMoyenNuitEUR", "tauxOccupation", "semainesUsagePersonnel"], long: ["loyerMensuelEUR"], revente: ["horizonAnnees", "appreciationAnnuelle"] };

  const resultat = (() => {
    if (!pret) return null;
    if (mode === "court") {
      const nuits = Math.max(0, 365 - valeurs.semainesUsagePersonnel * 7) * valeurs.tauxOccupation;
      const revenu = nuits * enDevise(valeurs.prixMoyenNuitEUR);
      return { titre: "Rendement brut", valeur: pourcent((revenu / prixReference) * 100), detail: [["Nuits louées par an", formatNombre(Math.round(nuits), langue)], ["Revenu annuel brut", money(revenu)]] as [string, string][] };
    }
    if (mode === "long") {
      const revenu = enDevise(valeurs.loyerMensuelEUR) * 12;
      return { titre: "Rendement brut", valeur: pourcent((revenu / prixReference) * 100), detail: [["Loyer × 12 mois", `${money(enDevise(valeurs.loyerMensuelEUR))} × 12`], ["Revenu annuel brut", money(revenu)]] as [string, string][] };
    }
    const projetee = prixReference * Math.pow(1 + valeurs.appreciationAnnuelle, valeurs.horizonAnnees);
    return { titre: "Plus-value brute", valeur: money(projetee - prixReference), detail: [[`Valeur projetée à ${valeurs.horizonAnnees} ans`, money(projetee)], ["Hypothèse d’appréciation", `${pourcent(valeurs.appreciationAnnuelle * 100)} / an`]] as [string, string][] };
  })();

  const selection = (): Selection => ({
    outil: "Simulateur de rentabilité",
    lignes: [
      `Mode : ${MODES.find((m) => m.id === mode)?.label}`,
      `Prix étudié : ${formatPrix(prixReference, devise, langue)}`,
      resultat ? `${resultat.titre} : ${resultat.valeur}` : "Hypothèses en cours de validation",
    ],
  });

  const onTabKey = (event: React.KeyboardEvent) => {
    const index = MODES.findIndex((m) => m.id === mode);
    const pas = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!pas) return;
    event.preventDefault();
    const suivant = MODES[(index + pas + MODES.length) % MODES.length];
    if (!suivant) return;
    setMode(suivant.id);
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
          <output htmlFor={`sm-${cle}`}>{actif ? valeurAffichee : "En attente"}</output>
        </label>
        <input
          id={`sm-${cle}`}
          type="range"
          min={bornes.min}
          max={bornes.max}
          step={bornes.pas}
          value={valeurs[cle]}
          disabled={!actif}
          onChange={(event) => setValeurs((current) => ({ ...current, [cle]: Number(event.target.value) }))}
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
          <p className="sm-kicker">Simulateur</p>
          <h2 id="rentabilite-title">Et si la villa <em>travaillait ?</em></h2>

          <div className="sm-tabs" role="tablist" aria-label="Mode de simulation" onKeyDown={onTabKey}>
            {MODES.map((item, i) => (
              <button key={item.id} ref={(el) => { tabRefs.current[i] = el; }} type="button" role="tab" id={`sm-tab-${item.id}`} aria-selected={mode === item.id} aria-controls="sm-panel" tabIndex={mode === item.id ? 0 : -1} onClick={() => setMode(item.id)}>{item.label}</button>
            ))}
          </div>

          <div className="sm-sliders">
            <div className="sm-slider">
              <label htmlFor="sm-prix"><span>Prix du bien</span><output htmlFor="sm-prix">{formatPrix(prixReference, devise, langue)}</output></label>
              <input id="sm-prix" type="range" min={prixMin} max={prixMax} step={enDevise(bornesPrixEUR.pas)} value={prixReference} onChange={(event) => setPrix(Number(event.target.value))} />
            </div>
            {curseurs[mode].map((cle) => slider(cle, SOURCE[cle] !== null))}
          </div>

          <details className="sm-advanced">
            <summary>Hypothèses avancées</summary>
            <div>{(["charges", "coutsAnnuelsEUR", "imposition"] as Cle[]).map((cle) => slider(cle, SOURCE[cle] !== null))}</div>
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
                {resultat.detail.map(([label, valeur]) => <div key={label}><dt>{label}</dt><dd>{valeur}</dd></div>)}
              </dl>
            </>
          ) : (
            <div className="sm-neutral">
              <b>Hypothèses en cours de validation</b>
              <p>Aucun rendement n’est publié tant que les hypothèses ne sont pas confirmées par le promoteur. Recevez une analyse établie à partir de votre projet.</p>
            </div>
          )}

          <p className="sm-fine">Estimation indicative avant charges, fiscalité et coûts réels d’exploitation.</p>

          {mode === "court" && (
            <p className="sm-warn"><Info aria-hidden="true" /><span>La location courte durée à Marrakech est soumise à des obligations déclaratives locales.<small>Mention à faire valider par le promoteur</small></span></p>
          )}

          <div className="sm-actions">
            <PillButton label="Recevoir une analyse personnalisée" icon={ArrowRight} onClick={() => onContact(selection())} />
            <PillButton label="Voir les villas compatibles" icon={Building2} variant="secondary" onClick={() => window.dispatchEvent(new CustomEvent<{ montant: number; devise: Devise; langue: Langue }>(SHOW_BUDGET_EVENT, { detail: { montant: prixReference, devise, langue } }))} />
          </div>

          <CurrencyPills />
        </div>
      </div>
    </section>
  );
}
