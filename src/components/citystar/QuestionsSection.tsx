import { Plus } from "lucide-react";

import { useDevise } from "./currency";
import { chemin, Lien } from "./liens";
import { Reveal } from "./motion";
import { useQuestions } from "./questions";

/* Les cinq questions qui précèdent une réservation ; les autres restent sur la page Questions. */
const CLES = ["securite", "acquisition", "financement", "livraison", "prix"];

export function QuestionsSection() {
  const { langue, t } = useDevise();
  const questions = useQuestions().filter((question) => CLES.includes(question.id));

  return (
    <section className="qs" aria-labelledby="questions-title">
      <div className="qs-head">
        <Reveal>
          <h2 id="questions-title">
            {t.questions.titre[0]} <br />
            <span className="ton">{t.questions.titre[1]}</span>
          </h2>
        </Reveal>
        <p>{t.questions.intro}</p>
        <Lien className="pill pill-secondary" vers={chemin(langue, "faq")}>
          <span className="pill-label">{t.questions.toutes}</span>
        </Lien>
      </div>
      <div className="qs-liste">
        {questions.map((question) => (
          <details key={question.id}>
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
