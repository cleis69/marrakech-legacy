import { ArrowRight } from "lucide-react";

import { useDevise } from "./currency";
import { chemin, Lien } from "./liens";
import { Reveal } from "./motion";
import { PAYS, photosBandeau, realisations, textesRealisations } from "./realisations";

/* Deux photos par projet, la plus belle d'abord : assez pour couvrir un grand écran.
   Elles sont chargées d'avance (versions légères) : une carte ne doit jamais entrer noire. */
const PHOTOS_PAR_PROJET = 2;

/**
 * Bandeau de l'accueil : les réalisations du promoteur défilent sans fin, chaque
 * photo mène à leur page. La rangée est doublée pour boucler ; la copie est cachée
 * aux lecteurs d'écran et au clavier. Il s'arrête au survol, et en mouvement réduit
 * il devient une rangée à faire défiler à la main (realisations.css).
 */
export function RealisationsBandeau() {
  const { langue } = useDevise();
  const t = textesRealisations[langue];
  /* La page des réalisations n'existe encore qu'en français. */
  if (!t) return null;

  const vers = chemin(langue, "realisations");
  const photos = realisations.flatMap((r) =>
    photosBandeau(r.id)
      .slice(0, PHOTOS_PAR_PROJET)
      .map((src, j) => ({ src, r, j })),
  );
  const [debut, suite] = t.bandeau.titre;

  return (
    <section className="rb" aria-labelledby="rb-titre">
      <div className="rb-head">
        <div>
          <p className="rb-kicker">{t.bandeau.kicker}</p>
          <Reveal>
            <h2 id="rb-titre">
              {debut} <br />
              <span className="ton">{suite}</span>
            </h2>
          </Reveal>
        </div>
        <Lien vers={vers} className="rb-lien">
          {t.bandeau.lien}
          <ArrowRight aria-hidden="true" />
        </Lien>
      </div>
      <div className="rb-defilement">
        <ul className="rb-piste">
          {[0, 1].map((copie) =>
            photos.map(({ src, r, j }) => (
              <li key={`${copie}-${src}`} inert={copie === 1}>
                <Lien vers={vers}>
                  <img
                    src={src}
                    alt={copie === 1 ? "" : t.photo(r.titre, j + 1, r.photos.length)}
                    decoding="async"
                    fetchPriority="low"
                  />
                  <span className="rb-legende">
                    <small>{PAYS[r.pays]}</small>
                    <b>{r.titre}</b>
                  </span>
                </Lien>
              </li>
            )),
          )}
        </ul>
      </div>
    </section>
  );
}
