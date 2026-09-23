import { useDevise } from "./currency";

/**
 * Bandeau où le nom défile sans fin. Le texte est répété pour couvrir la largeur ;
 * une seule copie est lue par les lecteurs d'écran, et l'animation s'arrête en
 * mouvement réduit (voir wordmark.css).
 */
export function Marquee() {
  const { t } = useDevise();
  const phrase = t.marque.defilant;

  return (
    <section className="mq" aria-label={t.marque.aria}>
      <div className="mq-track" aria-hidden="true">
        {Array.from({ length: 4 }, (_, i) => (
          <span key={i} className="mq-copy">
            {phrase}
          </span>
        ))}
      </div>
      <span className="sr-only">{phrase}</span>
    </section>
  );
}
