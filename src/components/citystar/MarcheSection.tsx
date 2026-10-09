import {
  type Langue,
  formatEvolution,
  marche,
  nombreEnLettres,
  programme,
} from "@/config/citystar";

import { useDevise } from "./currency";
import { Reveal } from "./motion";

const plusForte = Math.max(...marche.transactions.map((ville) => ville.evolution));

/* En grand, le « % » est composé à part : celui de l'Italiana flotte loin des chiffres. */
function Grand({ part, langue }: { part: number; langue: Langue }) {
  return (
    <>
      {formatEvolution(part, langue).replace(/\s?%$/, "")}
      <small>%</small>
    </>
  );
}

/** Le marché en deux chiffres, puis Marrakech face aux autres grandes villes, source à l'appui. */
export function MarcheSection() {
  const { langue, t } = useDevise();
  const marrakech = marche.transactions.find((ville) => ville.ville === "Marrakech");
  const villas =
    langue === "fr" ? nombreEnLettres(programme.nombreVillas) : String(programme.nombreVillas);

  return (
    <section className="mc" aria-labelledby="marche-title">
      <div className="mc-head">
        <Reveal>
          <h2 id="marche-title">{t.marche.titre}</h2>
        </Reveal>
        <p>{t.marche.conclusion(villas)}</p>
      </div>

      <div className="mc-corps">
        <dl className="mc-chiffres">
          {marrakech && (
            <div>
              <dt>{t.marche.transactions(marche.annee)}</dt>
              <dd>
                <Grand part={marrakech.evolution} langue={langue} />
              </dd>
            </div>
          )}
          <div>
            <dt>{t.marche.prix(marche.annee)}</dt>
            <dd>
              <Grand part={marche.prixMarrakech} langue={langue} />
            </dd>
          </div>
        </dl>

        <figure className="mc-villes">
          <figcaption>{t.marche.comparaison(marche.annee)}</figcaption>
          <ul>
            {marche.transactions.map((ville) => (
              <li
                key={ville.ville}
                className={ville === marrakech ? "is-ici" : undefined}
                style={{ "--part": ville.evolution / plusForte } as React.CSSProperties}
              >
                <span>{ville.ville}</span>
                <span className="mc-barre" aria-hidden="true" />
                <b>{formatEvolution(ville.evolution, langue)}</b>
              </li>
            ))}
          </ul>
        </figure>
      </div>

      <details className="mc-source">
        <summary>{t.marche.source}</summary>
        <p>
          {t.marche.sourceTexte(marche.annee)}{" "}
          <a href={marche.sourceUrl} target="_blank" rel="noreferrer">
            {t.marche.sourceLien}
          </a>
        </p>
      </details>
    </section>
  );
}
