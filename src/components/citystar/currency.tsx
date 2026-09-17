import { createContext, useContext, useMemo, useState } from "react";

import { type Devise, type Langue, type TypeVilla, devises, formatDate, formatPrix, prixVilla, symbolesDevise } from "@/config/citystar";

type DeviseState = { devise: Devise; setDevise: (devise: Devise) => void; langue: Langue };

const DeviseContext = createContext<DeviseState>({ devise: "EUR", setDevise: () => {}, langue: "fr" });

/** Devise choisie par le visiteur, partagée par tous les prix de la page. */
export function DeviseProvider({ langue = "fr", children }: { langue?: Langue; children: React.ReactNode }) {
  const [devise, setDevise] = useState<Devise>(devises.principaleParLangue[langue]);
  const value = useMemo(() => ({ devise, setDevise, langue }), [devise, langue]);
  return <DeviseContext.Provider value={value}>{children}</DeviseContext.Provider>;
}

export const useDevise = () => useContext(DeviseContext);

export function CurrencyPills({ className = "" }: { className?: string }) {
  const { devise, setDevise } = useDevise();
  return (
    <div className={`cur-pills ${className}`} role="group" aria-label="Devise d’affichage">
      {devises.affichees.map((code) => (
        <button key={code} type="button" aria-pressed={code === devise} onClick={() => setDevise(code)} aria-label={code === "EUR" ? "Euros" : code === "GBP" ? "Livres sterling" : code === "MAD" ? "Dirhams marocains" : "Couronnes norvégiennes"}>
          {symbolesDevise[code]}
        </button>
      ))}
    </div>
  );
}

/** Prix d'une villa avec sélecteur de devise, prix de référence et date du taux. */
export function VillaPrice({ type }: { type: TypeVilla }) {
  const { devise, langue } = useDevise();
  const { montant, approximatif } = prixVilla(type, devise);
  const reference = prixVilla(type, "EUR").montant;
  return (
    <div className="vprice">
      <span className="vprice-label">Prix</span>
      <strong className="vprice-main" aria-live="polite">{approximatif ? "≈ " : ""}{formatPrix(montant, devise, langue)}</strong>
      <CurrencyPills />
      {devise !== "EUR" && <span className="vprice-ref">Prix de référence : {formatPrix(reference, "EUR", langue)}</span>}
      {approximatif && <span className="vprice-note">Contre-valeur indicative · taux du {formatDate(devises.tauxDeSecours.date, langue)}</span>}
    </div>
  );
}
