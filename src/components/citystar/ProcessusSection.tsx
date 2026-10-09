import { ArrowRight } from "lucide-react";

import { calendrier, formatMois, formatPart, reservation } from "@/config/citystar";

import { useDevise } from "./currency";
import { Reveal } from "./motion";
import { useSite } from "./site";
import { PillButton } from "./ui/PillButton";

const acompte = reservation.paliers.find((palier) => palier.etape === "reservation");

/** Le processus d'achat en six étapes, du premier échange à la remise des clés. */
export function ProcessusSection() {
  const { langue, t } = useDevise();
  const { ouvrirContactAvec } = useSite();
  const etapes = t.processus.etapes(
    acompte?.part != null ? formatPart(acompte.part, langue) : "",
    formatMois(calendrier.livraison, langue),
  );

  return (
    <section id="processus" className="pa" aria-labelledby="processus-title">
      <div className="pa-head">
        <Reveal>
          <h2 id="processus-title">
            {t.processus.titre[0]} <br />
            <span className="ton">{t.processus.titre[1]}</span>
          </h2>
        </Reveal>
        <p data-vu="">{t.processus.intro}</p>
      </div>
      <ol className="pa-etapes">
        {etapes.map((etape, i) => (
          <li key={etape.titre} data-vu="" style={{ "--i": i % 3 } as React.CSSProperties}>
            <span className="pa-num" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3>{etape.titre}</h3>
            <p>{etape.texte}</p>
          </li>
        ))}
      </ol>
      <PillButton
        label={t.processus.cta}
        icon={ArrowRight}
        onClick={() =>
          ouvrirContactAvec({ outil: t.cercle.selection, lignes: [t.cercle.options.visio.titre] })
        }
      />
    </section>
  );
}
