import { CalendrierSection } from "../CalendrierSection";
import { useDevise } from "../currency";
import { MarcheSection } from "../MarcheSection";
import { PageHeader } from "../PageHeader";
import { useSite } from "../site";
import { Financement } from "../Financement";
import { YieldSimulator } from "../YieldSimulator";
import investirBanniere from "@/assets/citystar/rendus/ext-piscine-soir.webp";
import { DossierAppel, DossierFormulaire } from "../dossier/sections";

export function InvestirPage() {
  const { t } = useDevise();
  const { ouvrirContactAvec } = useSite();
  return (
    <>
      <PageHeader
        image={investirBanniere}
        kicker={t.pages.investir.kicker}
        titre={t.pages.investir.titreH1}
        intro={t.pages.investir.chapeau}
      />
      <section className="prose section-pad" aria-label={t.pages.investir.kicker}>
        <p className="prose-lede">{t.pages.investir.intro[0]}</p>
        <p>{t.pages.investir.intro[1]}</p>
        <ul className="prose-points">
          {t.pages.investir.points.map((point, i) => (
            <li key={point.titre} data-vu="" style={{ "--i": i } as React.CSSProperties}>
              <h2>{point.titre}</h2>
              <p>{point.texte}</p>
            </li>
          ))}
        </ul>
      </section>
      {/* Même parcours que la page d'atterrissage (15/11/2026) : le formulaire en étapes après le texte,
          puis les simulateurs, le marché, le calendrier et le dernier appel. */}
      <DossierFormulaire />
      <YieldSimulator onContact={ouvrirContactAvec} />
      <Financement onContact={ouvrirContactAvec} />
      <MarcheSection />
      <CalendrierSection />
      <DossierAppel />
    </>
  );
}
