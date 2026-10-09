import { programme, villasChiffres } from "@/config/citystar";

import { Compteur } from "./Compteur";
import { useDevise } from "./currency";

const surfaceMax = Math.max(...Object.values(villasChiffres).map((v) => v.surfaceConstruiteM2));

/**
 * Les quatre chiffres du domaine, juste sous le hero : le chiffre d'abord, en
 * grand, puis ce qu'il mesure. L'unité est composée à part, le « ² » de
 * l'Italiana étant presque aussi haut que les chiffres.
 */
export function ChiffresCles() {
  const { langue, t } = useDevise();
  const faits = [
    { libelle: t.projet.faits.villas, valeur: programme.nombreVillas, unite: "" },
    { libelle: t.projet.faits.terrain, valeur: programme.terrainMaxM2, unite: "m²" },
    { libelle: t.projet.faits.surface, valeur: surfaceMax, unite: "m²" },
    { libelle: t.projet.faits.trajet, valeur: programme.trajetMaxMinutes, unite: "min" },
  ];

  return (
    <section className="cc" aria-label={t.reperes.aria}>
      <dl>
        {faits.map((fait, i) => (
          <div key={fait.libelle} data-vu="" style={{ "--i": i } as React.CSSProperties}>
            <dt>{fait.libelle}</dt>
            <dd>
              <Compteur valeur={fait.valeur} langue={langue} />
              {fait.unite && <small>{fait.unite}</small>}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
