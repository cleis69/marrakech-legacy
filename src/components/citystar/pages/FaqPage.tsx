import { formatSurface, programme, villasChiffres } from "@/config/citystar";

import { useDevise } from "../currency";
import { FinalCta } from "../FinalCta";
import { Marquee } from "../Marquee";
import { PageHeader } from "../PageHeader";
import { useSite } from "../site";

export function FaqPage() {
  const { langue, t } = useDevise();
  const { ouvrirContact } = useSite();
  const questions = t.faq({
    villas: programme.nombreVillas,
    terrain: formatSurface(programme.terrainMaxM2, langue),
    minutes: programme.trajetMaxMinutes,
    a: formatSurface(villasChiffres.A.surfaceConstruiteM2, langue),
    b: formatSurface(villasChiffres.B.surfaceConstruiteM2, langue),
    c: formatSurface(villasChiffres.C.surfaceConstruiteM2, langue),
  });

  return (
    <>
      <PageHeader
        kicker={t.pages.faq.kicker}
        titre={t.pages.faq.titreH1}
        intro={t.pages.faq.intro}
      />
      <section className="faq section-pad" aria-label={t.pages.faq.kicker}>
        <dl className="faq-list">
          {questions.map((item) => (
            <div key={item.q}>
              <dt>{item.q}</dt>
              <dd>{item.r}</dd>
            </div>
          ))}
        </dl>
      </section>
      <Marquee />
      <FinalCta onContact={ouvrirContact} />
    </>
  );
}
