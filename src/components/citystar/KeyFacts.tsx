import { formatSurface, programme } from "@/config/citystar";

import { useDevise } from "./currency";

/** Bandeau de repères, juste sous le hero : trois chiffres qui situent le domaine. */
export function KeyFacts() {
  const { langue, t } = useDevise();
  const reperes = [
    t.reperes.trajet(programme.trajetMaxMinutes),
    t.reperes.villas(programme.nombreVillas),
    t.reperes.terrain(formatSurface(programme.terrainMaxM2, langue)),
  ];

  return (
    <section className="kf" aria-label={t.reperes.aria}>
      <dl>
        {reperes.map((repere) => (
          <div key={repere.libelle}>
            <dt>{repere.valeur}</dt>
            <dd>{repere.libelle}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
