import { CalendrierSection } from "../CalendrierSection";
import { useDevise } from "../currency";
import { FinalCta } from "../FinalCta";
import { MarcheSection } from "../MarcheSection";
import { Marquee } from "../Marquee";
import { PageHeader } from "../PageHeader";
import { useSite } from "../site";
import { YieldSimulator } from "../YieldSimulator";

export function InvestirPage() {
  const { t } = useDevise();
  const { ouvrirContactAvec } = useSite();
  return (
    <>
      <PageHeader
        kicker={t.pages.investir.kicker}
        titre={t.pages.investir.titreH1}
        intro={t.pages.investir.chapeau}
      />
      <section className="prose section-pad" aria-label={t.pages.investir.kicker}>
        <p className="prose-lede">{t.pages.investir.intro[0]}</p>
        <p>{t.pages.investir.intro[1]}</p>
        <ul className="prose-points">
          {t.pages.investir.points.map((point) => (
            <li key={point.titre}>
              <h2>{point.titre}</h2>
              <p>{point.texte}</p>
            </li>
          ))}
        </ul>
      </section>
      <MarcheSection />
      <CalendrierSection />
      <YieldSimulator onContact={ouvrirContactAvec} />
      <Marquee />
      <FinalCta />
    </>
  );
}
