import { useDevise } from "./currency";
import { rendus } from "./data";

/** Mur de rendus : toutes les images du domaine, en mosaïque. */
export function Galerie() {
  const { t } = useDevise();
  return (
    <section className="gl section-pad" aria-label={t.pages.galerie.kicker}>
      <ul className="gl-grid">
        {rendus.map((rendu, i) => (
          <li key={rendu.src} className={i % 5 === 0 ? "is-large" : ""}>
            <img src={rendu.src} alt={rendu.alt} loading="lazy" />
          </li>
        ))}
      </ul>
      <p className="gl-note">{t.architecture.note}</p>
    </section>
  );
}
