import { ArrowRight } from "lucide-react";

import { engagements, formatPart } from "@/config/citystar";
import promoteurImage from "@/assets/citystar/rendus/ext-facade-entree.webp";
import fondsImage from "@/assets/citystar/rendus/ext-volume-lames.webp";
import notaireImage from "@/assets/citystar/rendus/int-chambre-jour.webp";

import { useDevise } from "./currency";
import { altRendu } from "./data";
import { Reveal } from "./motion";
import { useSite } from "./site";
import { PillButton } from "./ui/PillButton";

const images = [
  { src: promoteurImage, nom: "ext-facade-entree" },
  { src: fondsImage, nom: "ext-volume-lames" },
  { src: notaireImage, nom: "int-chambre-jour" },
];

/** Les trois engagements du promoteur, en cartes photo : ce qui sécurise l'achat. */
export function EngagementsSection() {
  const { langue, t } = useDevise();
  const { ouvrirContactAvec } = useSite();
  const items = t.engagements.items(formatPart(engagements.fondsPropres, langue));
  const [debut, suite] = t.engagements.titre;

  return (
    <section className="eg" aria-labelledby="engagements-title">
      <div className="eg-head">
        <Reveal>
          <h2 id="engagements-title">
            {debut} <br />
            <span className="ton">{suite}</span>
          </h2>
        </Reveal>
        <p data-vu="">{t.engagements.intro}</p>
      </div>
      <ol className="eg-liste">
        {items.map((item, i) => (
          <li key={item.titre} data-vu="" style={{ "--i": i } as React.CSSProperties}>
            <img src={images[i]?.src} alt={altRendu(t, images[i]?.nom ?? "")} loading="lazy" />
            <div className="eg-texte">
              <span className="eg-num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{item.titre}</h3>
              <p>{item.texte}</p>
            </div>
          </li>
        ))}
      </ol>
      <PillButton
        label={t.engagements.cta}
        icon={ArrowRight}
        onClick={() =>
          ouvrirContactAvec({
            outil: t.engagements.selection.outil,
            lignes: [t.engagements.selection.ligne],
          })
        }
      />
    </section>
  );
}
