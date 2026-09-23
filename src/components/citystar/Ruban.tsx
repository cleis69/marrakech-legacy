import { useDevise } from "./currency";
import { rendus } from "./data";

/**
 * Les rendus sont classés par nom de fichier, ce qui met les vues d'une même
 * famille côte à côte. Un pas premier avec leur nombre les entrelace : la bande
 * ne montre jamais deux fois la même scène à la suite, et l'ordre reste stable.
 */
const PAS = 7;
const suite = rendus.flatMap((_, index) => {
  const rendu = rendus[(index * PAS) % rendus.length];
  return rendu ? [rendu] : [];
});

/**
 * Bandeau d'images qui défilent en continu. La bande est écrite deux fois :
 * la seconde copie, purement décorative, ferme la boucle sans saut visible.
 * L'animation s'arrête au survol et, en mouvement réduit, la bande se parcourt à la main (ruban.css).
 */
export function Ruban() {
  const { t } = useDevise();
  const bande = (copie: boolean) => (
    <ul className="rb-bande" {...(copie ? { "aria-hidden": true } : {})}>
      {suite.map((rendu) => (
        <li key={rendu.src}>
          <img src={rendu.src} alt={copie ? "" : rendu.alt} loading="lazy" decoding="async" />
        </li>
      ))}
    </ul>
  );

  return (
    <section className="rb" aria-label={t.ruban.aria}>
      <div className="rb-rail">
        {bande(false)}
        {bande(true)}
      </div>
      <p className="rb-note">{t.ruban.note}</p>
    </section>
  );
}
