import { ArrowRight } from "lucide-react";

import { engagements, formatPart } from "@/config/citystar";

import { useDevise } from "./currency";
import { Reveal } from "./motion";
import { useSite } from "./site";
import { PillButton } from "./ui/PillButton";

/** Les trois engagements du promoteur : ce qui sécurise l'achat, avant même de choisir une villa. */
export function EngagementsSection() {
  const { langue, t } = useDevise();
  const { ouvrirContactAvec } = useSite();
  const items = t.engagements.items(formatPart(engagements.fondsPropres, langue));

  return (
    <section className="eg" aria-labelledby="engagements-title">
      <div className="eg-head">
        <Reveal>
          <h2 id="engagements-title">{t.engagements.titre}</h2>
        </Reveal>
        <p>{t.engagements.intro}</p>
      </div>
      <ol className="eg-liste">
        {items.map((item, i) => (
          <li key={item.titre}>
            <span className="eg-num" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3>{item.titre}</h3>
            <p>{item.texte}</p>
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
