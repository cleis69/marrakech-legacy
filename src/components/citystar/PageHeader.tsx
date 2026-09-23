import { Reveal } from "./motion";

/** Bandeau d'ouverture commun aux pages intérieures : surtitre, titre, une phrase. */
export function PageHeader({
  kicker,
  titre,
  intro,
}: {
  kicker: string;
  titre: readonly string[];
  intro?: string;
}) {
  return (
    <header className="ph section-pad">
      <p className="ph-kicker">{kicker}</p>
      <Reveal>
        <h1>
          {titre.map((part, i) =>
            i === titre.length - 1 && titre.length > 1 ? (
              <em key={part}>{part}</em>
            ) : (
              <span key={part}>
                {part}
                {i === 0 && titre.length > 1 ? <br /> : null}
              </span>
            ),
          )}
        </h1>
      </Reveal>
      {intro && <p className="ph-intro">{intro}</p>}
    </header>
  );
}
