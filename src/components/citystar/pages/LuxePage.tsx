import { useDevise } from "../currency";
import { FinalCta } from "../FinalCta";
import { KeyFacts } from "../KeyFacts";
import { Marquee } from "../Marquee";
import { PageHeader } from "../PageHeader";
import { useSite } from "../site";
import { VillasSection } from "../VillasSection";

/** Page thématique : elle raconte le domaine à qui cherche « une villa de luxe à Marrakech ». */
export function LuxePage() {
  const { t } = useDevise();
  const { onCursorEnter, onCursorLeave, ouvrirContact } = useSite();
  return (
    <>
      <PageHeader
        kicker={t.pages.luxe.kicker}
        titre={t.pages.luxe.titreH1}
        intro={t.pages.luxe.intro}
      />
      <KeyFacts />
      <section className="prose section-pad" aria-label={t.pages.luxe.kicker}>
        <ul className="prose-points is-duo">
          {t.pages.luxe.sections.map((section) => (
            <li key={section.titre}>
              <h2>{section.titre}</h2>
              <p>{section.texte}</p>
            </li>
          ))}
        </ul>
      </section>
      <VillasSection onCursorEnter={onCursorEnter} onCursorLeave={onCursorLeave} sansEntete />
      <Marquee />
      <FinalCta onContact={ouvrirContact} />
    </>
  );
}
