/**
 * Bandeau d'ouverture commun aux pages intérieures : surtitre, titre, une phrase.
 * Il est déjà à l'écran au chargement : son entrée est une animation CSS (pages.css),
 * pas un déclencheur JavaScript qui le laisserait invisible avant l'hydratation.
 */
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
      <h1>
        {titre.map((part, i) =>
          i === titre.length - 1 && titre.length > 1 ? (
            <em key={part}>{part}</em>
          ) : (
            <span key={part}>
              {part}
              {i === 0 && titre.length > 1 ? (
                <>
                  {" "}
                  <br />
                </>
              ) : null}
            </span>
          ),
        )}
      </h1>
      {intro && <p className="ph-intro">{intro}</p>}
    </header>
  );
}
