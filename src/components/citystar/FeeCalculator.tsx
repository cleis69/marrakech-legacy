import { ArrowRight, Printer } from "lucide-react";
import { useState } from "react";

import { type TypeVilla, bornesPrixEUR, convertirEUR, formatPrix, fraisAcquisition, prixVilla } from "@/config/citystar";

import { CurrencyPills, useDevise } from "./currency";
import type { Selection } from "./data";
import { PillButton } from "./ui/PillButton";

const LIGNES = [
  { key: "droitsEnregistrement", label: "Droits d’enregistrement" },
  { key: "conservationFonciere", label: "Conservation foncière" },
  { key: "fraisNotaire", label: "Frais de notaire" },
] as const;

const TYPES: TypeVilla[] = ["A", "B", "C"];

/** Calculateur de frais : tant que les taux ne sont pas confirmés, aucun chiffre n'est inventé. */
export function FeeCalculator({ onContact }: { onContact: (selection: Selection) => void }) {
  const { devise, langue } = useDevise();
  const [villa, setVilla] = useState<TypeVilla | "">("");
  const defaut = prixVilla("B", devise).montant;
  const [prix, setPrix] = useState(defaut);
  const [saisi, setSaisi] = useState(false);

  const min = Math.round(convertirEUR(bornesPrixEUR.min, devise));
  const max = Math.round(convertirEUR(bornesPrixEUR.max, devise));
  const pas = Math.round(convertirEUR(bornesPrixEUR.pas, devise));
  const montant = saisi ? prix : defaut;

  const taux = LIGNES.map(({ key, label }) => ({ key, label, valeur: fraisAcquisition[key].valeur }));
  const connus = taux.every((ligne) => ligne.valeur !== null);
  const frais = connus ? taux.reduce((somme, ligne) => somme + montant * (ligne.valeur ?? 0), 0) : null;

  const changePrix = (valeur: number) => { setSaisi(true); setPrix(Math.min(max, Math.max(min, valeur))); };
  const changeVilla = (type: TypeVilla | "") => {
    setVilla(type);
    if (type) { setSaisi(true); setPrix(prixVilla(type, devise).montant); }
  };

  const selection = (): Selection => ({
    outil: "Calculateur de frais",
    lignes: [
      `Prix étudié : ${formatPrix(montant, devise, langue)}`,
      villa ? `Villa ${villa}` : "Villa non précisée",
      connus && frais !== null ? `Frais estimés : ${formatPrix(Math.round(frais), devise, langue)}` : "Taux d’acquisition en attente",
    ],
  });

  const date = new Intl.DateTimeFormat(langue === "fr" ? "fr-FR" : "en-GB", { day: "numeric", month: "long", year: "numeric" }).format(new Date());

  return (
    <section id="frais" className="cl section-pad" aria-labelledby="frais-title">
      <div className="cl-grid">
        <div className="cl-form">
          <p className="cl-kicker">Frais d’acquisition</p>
          <h2 id="frais-title">Votre fiche<br /><em>d’estimation.</em></h2>

          <div className="cl-field">
            <label htmlFor="cl-prix">Prix du bien</label>
            <div className="cl-price">
              <input id="cl-prix" inputMode="numeric" autoComplete="off" value={new Intl.NumberFormat(langue === "fr" ? "fr-FR" : "en-GB").format(montant).replace(/ /g, " ")} onChange={(event) => changePrix(Number(event.target.value.replace(/[^\d]/g, "")) || 0)} />
              <span>{devise}</span>
            </div>
            <input className="cl-range" type="range" min={min} max={max} step={pas} value={montant} onChange={(event) => changePrix(Number(event.target.value))} aria-label="Prix du bien, curseur" />
          </div>

          <div className="cl-field">
            <label htmlFor="cl-villa">Villa concernée</label>
            <select id="cl-villa" value={villa} onChange={(event) => changeVilla(event.target.value as TypeVilla | "")}>
              <option value="">Non précisée</option>
              {TYPES.map((t) => <option key={t} value={t}>Villa {t}</option>)}
            </select>
          </div>

          <CurrencyPills />
        </div>

        <div className="cl-side">
          <article className={`cl-doc${connus ? "" : " is-neutral"}`}>
            <header>
              <div><b>CITYSTAR</b><small>Résidence privée · Marrakech</small></div>
              <p>{date}<br />{villa ? `Villa ${villa}` : "Villa non précisée"}</p>
            </header>
            <h3>Estimation des frais d’acquisition</h3>
            <table>
              <tbody>
                <tr><td>Prix du bien</td><td>{formatPrix(montant, devise, langue)}</td></tr>
                {taux.map((ligne) => (
                  <tr key={ligne.key}>
                    <td>{ligne.label}{ligne.valeur !== null && <small> ({(ligne.valeur * 100).toLocaleString(langue === "fr" ? "fr-FR" : "en-GB", { maximumFractionDigits: 2 })} %)</small>}</td>
                    <td>{ligne.valeur === null ? <span className="cl-wait">Taux en attente</span> : formatPrix(Math.round(montant * ligne.valeur), devise, langue)}</td>
                  </tr>
                ))}
                <tr className="cl-total"><td>Total tout compris</td><td>{frais === null ? "—" : formatPrix(Math.round(montant + frais), devise, langue)}</td></tr>
              </tbody>
            </table>
            <p className="cl-mention"><b>Estimation indicative</b>, à confirmer par le notaire.</p>
            <span className="cl-stamp" aria-hidden="true">Estimation<br />indicative</span>
          </article>

          {connus ? (
            <div className="cl-actions">
              <PillButton label="Recevoir par e-mail" icon={ArrowRight} onClick={() => onContact(selection())} />
              <PillButton label="Imprimer" icon={Printer} variant="secondary" onClick={() => window.print()} />
            </div>
          ) : (
            <div className="cl-actions">
              <p className="cl-neutral">Les taux en vigueur n’ont pas encore été confirmés par le promoteur : aucun montant n’est affiché tant qu’ils ne le sont pas.</p>
              <PillButton label="Demander une estimation personnalisée" icon={ArrowRight} onClick={() => onContact(selection())} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
