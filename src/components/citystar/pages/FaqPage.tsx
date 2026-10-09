import { ArrowRight, PhoneCall, Plus } from "lucide-react";

import { useDevise } from "../currency";
import { chemin, Lien } from "../liens";
import { FinalCta } from "../FinalCta";
import { Marquee } from "../Marquee";
import { PageHeader } from "../PageHeader";
import { useQuestions } from "../questions";
import { useSite } from "../site";
import faqBanniere from "@/assets/citystar/rendus/entree-crepuscule.webp";

export function FaqPage() {
  const { langue, t } = useDevise();
  const { ouvrirContact } = useSite();
  const questions = useQuestions();

  return (
    <>
      <PageHeader
        image={faqBanniere}
        kicker={t.pages.faq.kicker}
        titre={t.pages.faq.titreH1}
        intro={t.pages.faq.intro}
      />
      {/* Les questions en accordéon, comme sur l'accueil ; les suites restent à portée, à gauche. */}
      <section className="qs faq-page" aria-label={t.pages.faq.kicker}>
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
        <div className="qs-liste">
          {questions.map((item, i) => (
            <details key={item.id} data-vu="" style={{ "--i": i } as React.CSSProperties}>
              <summary>
                <span>{item.q}</span>
                <Plus aria-hidden="true" />
              </summary>
              <p>{item.r}</p>
            </details>
          ))}
        </div>
      </section>
      <Marquee />
      <FinalCta />
    </>
  );
}
