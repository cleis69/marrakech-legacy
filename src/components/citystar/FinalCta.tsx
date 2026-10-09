import { ArrowRight } from "lucide-react";

import { useDevise } from "./currency";
import { fichierPublic } from "./liens";
import { Reveal } from "./motion";
import { useSite } from "./site";

const SIMULATEUR = "rentabilite";

/** Fin de page : trois façons d'engager la conversation, chacune pré-remplie dans le formulaire. */
export function FinalCta() {
  const { langue, t } = useDevise();
  const { ouvrirContactAvec } = useSite();
  const { options } = t.cercle;
  const demander = (choix: string) =>
    ouvrirContactAvec({ outil: t.cercle.selection, lignes: [choix] });

  /* Le simulateur est sur l'accueil et sur Investir ; ailleurs, on y va. */
  const simuler = () => {
    const cible = document.getElementById(SIMULATEUR);
    if (cible) cible.scrollIntoView({ behavior: "smooth" });
    else
      window.location.assign(
        fichierPublic(`${langue === "fr" ? "" : `${langue}/`}investir#${SIMULATEUR}`),
      );
  };

  const choix = [
    { ...options.visio, action: () => demander(options.visio.titre) },
    { ...options.rappel, action: () => demander(options.rappel.titre) },
    { ...options.rendement, action: simuler },
  ];

  return (
    <section id="contact" className="circle" aria-labelledby="circle-title">
      <div className="circle-text">
        <Reveal>
          <h2 id="circle-title">{t.cercle.titre}</h2>
        </Reveal>
        <p>{t.cercle.intro}</p>
      </div>
      <ul className="circle-choix">
        {choix.map((option, i) => (
          <li key={option.titre} data-vu="" style={{ "--i": i } as React.CSSProperties}>
            <button type="button" onClick={option.action}>
              <span>
                <b>{option.titre}</b>
                <small>{option.texte}</small>
              </span>
              <ArrowRight aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
