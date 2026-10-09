import { useDevise } from "../currency";
import { FinalCta } from "../FinalCta";
import { ChiffresCles } from "../ChiffresCles";
import { Marquee } from "../Marquee";
import { PageHeader } from "../PageHeader";
import { useSite } from "../site";
import { VillasSection } from "../VillasSection";
import luxeBanniere from "@/assets/citystar/rendus/ext-pergola-jour.webp";

/** Page thématique : elle raconte le domaine à qui cherche « une villa de luxe à Marrakech ». */
export function LuxePage() {
  const { t } = useDevise();
  const { onCursorEnter, onCursorLeave } = useSite();
  return (
    <>
      <PageHeader
        image={luxeBanniere}
        kicker={t.pages.luxe.kicker}
        titre={t.pages.luxe.titreH1}
        intro={t.pages.luxe.intro}
      />
      <ChiffresCles />
      <section className="prose section-pad" aria-label={t.pages.luxe.kicker}>
        <ul className="prose-points is-duo">
          {t.pages.luxe.sections.map((section, i) => (
            <li key={section.titre} data-vu="" style={{ "--i": i } as React.CSSProperties}>
              <h2>{section.titre}</h2>
              <p>{section.texte}</p>
            </li>
          ))}
        </ul>
      </section>
      <VillasSection onCursorEnter={onCursorEnter} onCursorLeave={onCursorLeave} sansEntete />
      <Marquee />
      <FinalCta />
    </>
  );
}
