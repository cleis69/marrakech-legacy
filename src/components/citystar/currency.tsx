import { createContext, useContext, useMemo, useState } from "react";

import { type Devise, type Langue, type TypeVilla, devises, formatDate, formatPrix, prixVilla, symbolesDevise } from "@/config/citystar";

import { type Textes, textes } from "./i18n";

type DeviseState = { devise: Devise; setDevise: (devise: Devise) => void; langue: Langue; t: Textes };

const DeviseContext = createContext<DeviseState>({ devise: "EUR", setDevise: () => {}, langue: "fr", t: textes.fr });

/** Devise choisie par le visiteur, partagée par tous les prix de la page. */
export function DeviseProvider({ langue = "fr", children }: { langue?: Langue; children: React.ReactNode }) {
  const [devise, setDevise] = useState<Devise>(devises.principaleParLangue[langue]);
  const value = useMemo(() => ({ devise, setDevise, langue, t: textes[langue] }), [devise, langue]);
  return <DeviseContext.Provider value={value}>{children}</DeviseContext.Provider>;
}

export const useDevise = () => useContext(DeviseContext);

/** Textes du site dans la langue courante. */
export const useT = () => useContext(DeviseContext).t;

export function CurrencyPills({ className = "" }: { className?: string }) {
  const { devise, setDevise, t } = useDevise();
  return (
    <div className={`cur-pills ${className}`} role="group" aria-label={t.prix.devise}>
      {devises.affichees.map((code) => (
        <button key={code} type="button" aria-pressed={code === devise} onClick={() => setDevise(code)} aria-label={t.prix.devises[code]}>
          {symbolesDevise[code]}
        </button>
      ))}
    </div>
  );
}

/** Prix d'une villa avec sélecteur de devise, prix de référence et date du taux. */
export function VillaPrice({ type }: { type: TypeVilla }) {
  const { devise, langue, t } = useDevise();
  const { montant, approximatif } = prixVilla(type, devise);
  const reference = prixVilla(type, "EUR").montant;
  return (
    <div className="vprice">
      <span className="vprice-label">{t.prix.label}</span>
      <strong className="vprice-main" aria-live="polite">{approximatif ? "≈ " : ""}{formatPrix(montant, devise, langue)}</strong>
      <CurrencyPills />
      {devise !== "EUR" && <span className="vprice-ref">{t.prix.reference(formatPrix(reference, "EUR", langue))}</span>}
      {approximatif && <span className="vprice-note">{t.prix.contreValeur(formatDate(devises.tauxDeSecours.date, langue))}</span>}
    </div>
  );
}
