/**
 * Ouverture des pages intérieures, dans la langue de l'accueil : une photo dans
 * un grand cadre arrondi, une pastille, un titre en deux tons et une phrase.
 * Elle est à l'écran dès le chargement : son entrée est une animation CSS
 * (pages.css), pas un déclencheur JavaScript qui la laisserait invisible.
 */
export function PageHeader({
  kicker,
  titre,
  intro,
  image,
}: {
  kicker: string;
  titre: readonly string[];
  intro?: string;
  image: string;
}) {
  const [premier, ...suite] = titre;
  return (
    <header className="ph">
      <div className="ph-cadre">
        <img className="ph-photo" src={image} alt="" />
        <div className="ph-voile" aria-hidden="true" />
        <div className="ph-texte">
          <p className="ph-chip">{kicker}</p>
          <h1>
            {premier}
            {suite.length > 0 && (
              <>
                {" "}
                <br />
                <span className="ton">{suite.join("")}</span>
              </>
            )}
          </h1>
          {intro && <p className="ph-intro">{intro}</p>}
        </div>
      </div>
    </header>
  );
}
