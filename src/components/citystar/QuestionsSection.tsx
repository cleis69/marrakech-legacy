import { Plus } from "lucide-react";

import { useSite } from "./contexte";
import { useDevise } from "./currency";
import { chemin, Lien } from "./liens";
import { Reveal } from "./motion";
import { useQuestions } from "./questions";

/* Les cinq questions qui précèdent une réservation ; les autres restent sur la page Questions. */
const CLES = ["securite", "acquisition", "financement", "livraison", "prix", "lieu"];
/* Page d'atterrissage : une seule villa, donc pas la question des prix par type ; l'emplacement à la place. */
const CLES_TUNNEL = ["securite", "acquisition", "financement", "livraison", "lieu"];

export function QuestionsSection() {
  const { langue, t } = useDevise();
  const { tunnel } = useSite();
  const cles = tunnel ? CLES_TUNNEL : CLES;
  const questions = useQuestions().filter((question) => cles.includes(question.id));

  return (
    <section id="questions" className="qs" aria-labelledby="questions-title">
      <div className="qs-head">
        <Reveal>
          <h2 id="questions-title">
            {t.questions.titre[0]} <br />
            <span className="ton">{t.questions.titre[1]}</span>
          </h2>
        </Reveal>
        <p data-vu="">{t.questions.intro}</p>
        {!tunnel && (
          <Lien className="pill pill-secondary" vers={chemin(langue, "faq")}>
            <span className="pill-label">{t.questions.toutes}</span>
          </Lien>
        )}
      </div>
      <div className="qs-liste">
        {questions.map((question, i) => (
          <details key={question.id} data-vu="" style={{ "--i": i } as React.CSSProperties}>
            <summary>
              <span>{question.q}</span>
              <Plus aria-hidden="true" />
            </summary>
            <p>{question.r}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
