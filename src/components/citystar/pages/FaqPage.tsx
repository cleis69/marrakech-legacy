import { formatSurface, programme, villasChiffres } from "@/config/citystar";

import { ArrowRight, PhoneCall } from "lucide-react";

import { useDevise } from "../currency";
import { chemin, Lien } from "../liens";
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
        <nav className="faq-next" aria-label={t.pages.faq.suites.titre}>
          <p>{t.pages.faq.suites.titre}</p>
          <Lien vers={chemin(langue, "villas")}>
            {t.pages.faq.suites.plans} <ArrowRight aria-hidden="true" />
          </Lien>
          <Lien vers={`${chemin(langue, "investir")}#rentabilite`}>
            {t.pages.faq.suites.simulateur} <ArrowRight aria-hidden="true" />
          </Lien>
          <button type="button" onClick={ouvrirContact}>
            {t.pages.faq.suites.rappel} <PhoneCall aria-hidden="true" />
          </button>
        </nav>
      </section>
      <Marquee />
      <FinalCta />
    </>
  );
}
