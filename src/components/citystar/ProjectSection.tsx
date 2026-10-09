import entreeImage from "@/assets/citystar/rendus/entree-crepuscule.webp";
import pergolaImage from "@/assets/citystar/rendus/ext-pergola-portrait.webp";
import salonImage from "@/assets/citystar/rendus/int-salon.webp";

import { useDevise } from "./currency";
import { altRendu } from "./data";
import { Reveal } from "./motion";

/** Le domaine en trois vues ; ses quatre chiffres sont juste sous le hero (ChiffresCles). */
export function ProjectSection() {
  const { t } = useDevise();
  const [debut, milieu, fin] = t.projet.titre;
  const vues = [
    { src: entreeImage, nom: "entree-crepuscule", legende: t.projet.vues.entree },
    { src: pergolaImage, nom: "ext-pergola-portrait", legende: t.projet.vues.pergola },
    { src: salonImage, nom: "int-salon", legende: t.projet.vues.salon },
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
        <p data-vu="">
          {t.projet.texte[0]} {t.projet.texte[1]}
        </p>
      </div>

      <ul className="pj-vues">
        {vues.map((vue, i) => (
          <li key={vue.nom} data-vu="" style={{ "--i": i } as React.CSSProperties}>
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
    </section>
  );
}
