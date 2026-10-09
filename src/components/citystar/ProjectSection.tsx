import { formatNombre, programme, villasChiffres } from "@/config/citystar";
import entreeImage from "@/assets/citystar/rendus/entree-crepuscule.webp";
import pergolaImage from "@/assets/citystar/rendus/ext-pergola-portrait.webp";
import salonImage from "@/assets/citystar/rendus/int-salon.webp";

import { useDevise } from "./currency";
import { altRendu } from "./data";
import { Reveal } from "./motion";

const surfaceMax = Math.max(...Object.values(villasChiffres).map((v) => v.surfaceConstruiteM2));

/** Le domaine en trois vues, puis les quatre chiffres qui le situent. */
export function ProjectSection() {
  const { langue, t } = useDevise();
  const [debut, milieu, fin] = t.projet.titre;
  const vues = [
    { src: entreeImage, nom: "entree-crepuscule", legende: t.projet.vues.entree },
    { src: pergolaImage, nom: "ext-pergola-portrait", legende: t.projet.vues.pergola },
    { src: salonImage, nom: "int-salon", legende: t.projet.vues.salon },
  ];
  /* L'unité est composée à part : le « ² » de l'Italiana est presque aussi haut que les chiffres. */
  const faits = [
    { libelle: t.projet.faits.villas, valeur: String(programme.nombreVillas), unite: "" },
    {
      libelle: t.projet.faits.terrain,
      valeur: formatNombre(programme.terrainMaxM2, langue),
      unite: "m²",
    },
    { libelle: t.projet.faits.surface, valeur: formatNombre(surfaceMax, langue), unite: "m²" },
    { libelle: t.projet.faits.trajet, valeur: String(programme.trajetMaxMinutes), unite: "min" },
  ];

  return (
    <section id="project" className="pj" aria-labelledby="project-title">
      <div className="pj-head">
        <Reveal>
          <h2 id="project-title">
            {debut} <br />
            <span className="ton">
              {milieu}
              {fin}
            </span>
          </h2>
        </Reveal>
        <p>
          {t.projet.texte[0]} {t.projet.texte[1]}
        </p>
      </div>

      <ul className="pj-vues">
        {vues.map((vue, i) => (
          <li key={vue.nom}>
            <figure>
              <img src={vue.src} alt={altRendu(t, vue.nom)} loading="lazy" />
              <figcaption>
                <span>{vue.legende}</span>
                <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <dl className="pj-faits">
        {faits.map((fait) => (
          <div key={fait.libelle}>
            <dt>{fait.libelle}</dt>
            <dd>
              {fait.valeur}
              {fait.unite && <small>{fait.unite}</small>}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
