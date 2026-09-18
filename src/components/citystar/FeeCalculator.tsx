import { ArrowRight, Printer } from "lucide-react";
import { useState } from "react";

import {
  type TypeVilla,
  bornesPrixEUR,
  convertirEUR,
  formatPrix,
  fraisAcquisition,
  prixVilla,
} from "@/config/citystar";

import { CurrencyPills, useDevise } from "./currency";
import type { Selection } from "./data";
import { PillButton } from "./ui/PillButton";

const LIGNES = ["droitsEnregistrement", "conservationFonciere", "fraisNotaire"] as const;

const TYPES: TypeVilla[] = ["A", "B", "C"];

/** Calculateur de frais : tant que les taux ne sont pas confirmés, aucun chiffre n'est inventé. */
export function FeeCalculator({ onContact }: { onContact: (selection: Selection) => void }) {
  const { devise, langue, t, taux: change } = useDevise();
  const [villa, setVilla] = useState<TypeVilla | "">("");
  const defaut = prixVilla("B", devise, change).montant;
  const [prix, setPrix] = useState(defaut);
  const [saisi, setSaisi] = useState(false);

  const min = Math.round(convertirEUR(bornesPrixEUR.min, devise, change));
  const max = Math.round(convertirEUR(bornesPrixEUR.max, devise, change));
  const pas = Math.round(convertirEUR(bornesPrixEUR.pas, devise, change));
  const montant = saisi ? prix : defaut;

  const taux = LIGNES.map((key) => ({
    key,
    label: t.frais.lignes[key],
    valeur: fraisAcquisition[key].valeur,
  }));
  const connus = taux.every((ligne) => ligne.valeur !== null);
  const frais = connus
    ? taux.reduce((somme, ligne) => somme + montant * (ligne.valeur ?? 0), 0)
    : null;

  const changePrix = (valeur: number) => {
    setSaisi(true);
    setPrix(Math.min(max, Math.max(min, valeur)));
  };
  const changeVilla = (type: TypeVilla | "") => {
    setVilla(type);
    if (type) {
      setSaisi(true);
      setPrix(prixVilla(type, devise, change).montant);
    }
  };

  const selection = (): Selection => ({
    outil: t.frais.outil,
    lignes: [
      t.frais.prixEtudie(formatPrix(montant, devise, langue)),
      villa ? `${t.villas.villa} ${villa}` : t.frais.villaNonPrecisee,
      connus && frais !== null
        ? t.frais.fraisEstimes(formatPrix(Math.round(frais), devise, langue))
        : t.frais.tauxAttente,
    ],
  });

  const date = new Intl.DateTimeFormat(langue === "fr" ? "fr-FR" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <section id="frais" className="cl section-pad" aria-labelledby="frais-title">
      <div className="cl-grid">
        <div className="cl-form">
          <p className="cl-kicker">{t.frais.kicker}</p>
          <h2 id="frais-title">
            {t.frais.titre[0]}
            <br />
            <em>{t.frais.titre[1]}</em>
          </h2>

          <div className="cl-field">
            <label htmlFor="cl-prix">{t.frais.prix}</label>
            <div className="cl-price">
              <input
                id="cl-prix"
                inputMode="numeric"
                autoComplete="off"
                value={new Intl.NumberFormat(langue === "fr" ? "fr-FR" : "en-GB")
                  .format(montant)
                  .replace(/\u202f/g, "\u00a0")}
                onChange={(event) =>
                  changePrix(Number(event.target.value.replace(/[^\d]/g, "")) || 0)
                }
              />
              <span>{devise}</span>
            </div>
            <input
              className="cl-range"
              type="range"
              min={min}
              max={max}
              step={pas}
              value={montant}
              onChange={(event) => changePrix(Number(event.target.value))}
              aria-label={t.frais.prixCurseur}
            />
          </div>

          <div className="cl-field">
            <label htmlFor="cl-villa">{t.frais.villa}</label>
            <select
              id="cl-villa"
              value={villa}
              onChange={(event) => changeVilla(event.target.value as TypeVilla | "")}
            >
              <option value="">{t.frais.nonPrecisee}</option>
              {TYPES.map((type) => (
                <option key={type} value={type}>
                  {t.villas.villa} {type}
                </option>
              ))}
            </select>
          </div>

          <CurrencyPills />
        </div>

        <div className="cl-side">
          <article className={`cl-doc${connus ? "" : " is-neutral"}`}>
            <header>
              <div>
                <b>CITYSTAR</b>
                <small>{t.frais.residence}</small>
              </div>
              <p>
                {date}
                <br />
                {villa ? `${t.villas.villa} ${villa}` : t.frais.villaNonPrecisee}
              </p>
            </header>
            <h3>{t.frais.titreFiche}</h3>
            <table>
              <tbody>
                <tr>
                  <td>{t.frais.prix}</td>
                  <td>{formatPrix(montant, devise, langue)}</td>
                </tr>
                {taux.map((ligne) => (
                  <tr key={ligne.key}>
                    <td>
                      {ligne.label}
                      {ligne.valeur !== null && (
                        <small>
                          {" "}
                          (
                          {(ligne.valeur * 100).toLocaleString(
                            langue === "fr" ? "fr-FR" : "en-GB",
                            { maximumFractionDigits: 2 },
                          )}{" "}
                          %)
                        </small>
                      )}
                    </td>
                    <td>
                      {ligne.valeur === null ? (
                        <span className="cl-wait">{t.frais.attente}</span>
                      ) : (
                        formatPrix(Math.round(montant * ligne.valeur), devise, langue)
                      )}
                    </td>
                  </tr>
                ))}
                <tr className="cl-total">
                  <td>{t.frais.total}</td>
                  <td>
                    {frais === null ? "—" : formatPrix(Math.round(montant + frais), devise, langue)}
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="cl-mention">
              <b>{t.frais.mention[0]}</b>
              {t.frais.mention[1]}
            </p>
            <span className="cl-stamp" aria-hidden="true">
              {t.frais.cachet[0]}
              <br />
              {t.frais.cachet[1]}
            </span>
          </article>

          {connus ? (
            <div className="cl-actions">
              <PillButton
                label={t.frais.email}
                icon={ArrowRight}
                onClick={() => onContact(selection())}
              />
              <PillButton
                label={t.frais.imprimer}
                icon={Printer}
                variant="secondary"
                onClick={() => window.print()}
              />
            </div>
          ) : (
            <div className="cl-actions">
              <p className="cl-neutral">{t.frais.neutre}</p>
              <PillButton
                label={t.frais.personnalisee}
                icon={ArrowRight}
                onClick={() => onContact(selection())}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
