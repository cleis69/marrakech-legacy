import { ArrowRight, Images } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useState } from "react";

import { useDevise } from "../currency";
import { FinalCta } from "../FinalCta";
import { Visionneuse } from "../Galerie";
import { chemin } from "../liens";
import { Reveal } from "../motion";
import { PageHeader } from "../PageHeader";
import {
  banniere,
  PAYS,
  realisations,
  textesRealisations,
  type Pays,
  type Realisation,
} from "../realisations";
import { useSite } from "../site";
import { PillButton } from "../ui/PillButton";

/* Les points à confirmer par le promoteur ne sortent pas de l'aperçu local. */
const APERCU = import.meta.env.DEV;
const VIGNETTES = 3;

/** Les projets déjà menés par le promoteur et ses associés, filtrables par pays ; chaque photo s'ouvre en grand. */
export function RealisationsPage() {
  const { langue, t: ts } = useDevise();
  const { ouvrirContactAvec } = useSite();
  const t = textesRealisations[langue] ?? textesRealisations.fr!;
  const [filtre, setFiltre] = useState<Pays | null>(null);
  const [vue, setVue] = useState<{ id: string; index: number } | null>(null);

  const pays = [...new Set(realisations.map((r) => r.pays))];
  const liste = realisations.filter((r) => !filtre || r.pays === filtre);
  const ouvert = realisations.find((r) => r.id === vue?.id);
  const [debut, suite] = t.suite.titre;

  return (
    <>
      <PageHeader image={banniere} kicker={t.kicker} titre={t.titreH1} intro={t.intro} />
      {APERCU && <p className="rl-apercu">{t.apercu}</p>}

      <dl className="rl-chiffres">
        {t.chiffres.map((c) => (
          <div key={c.libelle}>
            <dt>{c.libelle}</dt>
            <dd>{c.valeur}</dd>
          </div>
        ))}
      </dl>

      <section className="rl" aria-label={t.kicker}>
        <div className="rl-filtres" role="group" aria-label="Pays">
          <button type="button" aria-pressed={filtre === null} onClick={() => setFiltre(null)}>
            {t.tous}
            <small>{realisations.length}</small>
          </button>
          {pays.map((p) => (
            <button key={p} type="button" aria-pressed={filtre === p} onClick={() => setFiltre(p)}>
              {PAYS[p]}
              <small>{realisations.filter((r) => r.pays === p).length}</small>
            </button>
          ))}
        </div>

        <ul className="rl-liste">
          {liste.map((r) => (
            <li key={r.id}>
              <Carte projet={r} ouvrir={(index) => setVue({ id: r.id, index })} />
            </li>
          ))}
        </ul>
      </section>

      <section className="rl-suite" aria-labelledby="rl-suite-titre">
        <div>
          <Reveal>
            <h2 id="rl-suite-titre">
              {debut} <br />
              <span className="ton">{suite}</span>
            </h2>
          </Reveal>
          <p>{t.suite.texte}</p>
        </div>
        <div className="rl-suite-actions">
          <PillButton label={t.suite.villas} icon={ArrowRight} href={chemin(langue, "villas")} />
          <PillButton
            label={t.suite.dossier}
            icon={ArrowRight}
            variant="secondary"
            onClick={() =>
              ouvrirContactAvec({
                outil: ts.engagements.selection.outil,
                lignes: [ts.engagements.selection.ligne],
              })
            }
          />
        </div>
      </section>

      <FinalCta />

      <AnimatePresence>
        {ouvert && vue && (
          <Visionneuse
            images={ouvert.photos.map((src, i) => ({
              src,
              alt: t.photo(ouvert.titre, i + 1, ouvert.photos.length),
            }))}
            index={vue.index}
            onIndex={(index) => setVue({ id: ouvert.id, index })}
            onClose={() => setVue(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/** Un projet : la grande photo et trois vignettes, puis le lieu, les chiffres et le détail. */
function Carte({ projet, ouvrir }: { projet: Realisation; ouvrir: (index: number) => void }) {
  const { langue } = useDevise();
  const t = textesRealisations[langue] ?? textesRealisations.fr!;
  const [principale, ...autres] = projet.photos;
  const vignettes = autres.slice(0, VIGNETTES);
  const reste = projet.photos.length - 1 - vignettes.length;

  return (
    <article className="rl-carte">
      <div className="rl-media">
        <span className="rl-statut">{projet.statut}</span>
        {principale && (
          <button
            type="button"
            className="rl-principale"
            onClick={() => ouvrir(0)}
            aria-label={t.photo(projet.titre, 1, projet.photos.length)}
          >
            <img src={principale} alt="" loading="lazy" decoding="async" />
          </button>
        )}
        {vignettes.map((src, i) => (
          <button
            key={src}
            type="button"
            className="rl-vignette"
            onClick={() => ouvrir(i + 1)}
            aria-label={t.photo(projet.titre, i + 2, projet.photos.length)}
          >
            <img src={src} alt="" loading="lazy" decoding="async" />
            {i === vignettes.length - 1 && reste > 0 && (
              <span className="rl-plus" aria-hidden="true">
                +{reste}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="rl-corps">
        <p className="rl-lieu">{projet.lieu}</p>
        <h2>{projet.titre}</h2>
        <p>{projet.resume}</p>
        {projet.chiffres.length > 0 && (
          <dl className="rl-faits">
            {projet.chiffres.map((c) => (
              <div key={c.libelle}>
                <dt>{c.libelle}</dt>
                <dd>{c.valeur}</dd>
              </div>
            ))}
          </dl>
        )}
        {projet.details && (
          <ul className="rl-details">
            {projet.details.map((d) => (
              <li key={d.titre}>
                <b>{d.titre}</b>
                {d.texte}
              </li>
            ))}
          </ul>
        )}
        {projet.photos.length > 1 && (
          <button type="button" className="rl-voir" onClick={() => ouvrir(0)}>
            <Images aria-hidden="true" />
            {t.photos(projet.photos.length)}
          </button>
        )}
        {APERCU && projet.aConfirmer.length > 0 && (
          <div className="rl-note">
            <b>{t.aConfirmer}</b>
            <ul>
              {projet.aConfirmer.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}
