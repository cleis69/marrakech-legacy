import { confidentialite } from "../confidentialite";
import { useDevise } from "../currency";
import { PageHeader } from "../PageHeader";
import banniere from "@/assets/citystar/rendus/entree-portail.webp";

/** Politique de confidentialité : vers elle pointent le pied de page et les formulaires de pub. */
export function ConfidentialitePage() {
  const { langue } = useDevise();
  const t = confidentialite[langue];

  return (
    <>
      <PageHeader image={banniere} kicker={t.kicker} titre={t.titreH1} intro={t.intro} />
      <section className="prose section-pad conf" aria-label={t.kicker}>
        <dl className="faq-list">
          {t.sections.map((section) => (
            <div key={section.titre}>
              <dt>{section.titre}</dt>
              {section.blocs.map((bloc, i) =>
                typeof bloc === "string" ? (
                  <dd key={i}>{bloc}</dd>
                ) : (
                  <dd key={i}>
                    <ul>
                      {bloc.map((ligne) => (
                        <li key={ligne}>{ligne}</li>
                      ))}
                    </ul>
                  </dd>
                ),
              )}
            </div>
          ))}
        </dl>
        <p className="conf-maj">{t.miseAJour}</p>
      </section>
    </>
  );
}
