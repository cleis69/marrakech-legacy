import { ArrowRight, MessageCircle } from "lucide-react";

import { CLASSE_SANS_BARRE, useSite } from "./contexte";
import { useDevise } from "./currency";
import { srcSetPour } from "./data";
import { LienWhatsApp } from "./dossier/sections";
import { textesDossier } from "./dossier/textes";

/**
 * Ouverture des pages intérieures, sur le modèle de la page d'atterrissage (15/11/2026) : une photo
 * dans un grand cadre arrondi, une pastille, un titre en deux tons, une phrase, puis le bouton
 * « Recevoir la brochure » et WhatsApp. `appel={false}` : sans les boutons (remerciement, pages
 * légales, espace propriétaire). Elle est à l'écran dès le chargement, sans animation d'apparition.
 */
export function PageHeader({
  kicker,
  titre,
  intro,
  image,
  appel = true,
}: {
  kicker: string;
  titre: readonly string[];
  intro?: string;
  image: string;
  appel?: boolean;
}) {
  const { langue } = useDevise();
  const { ouvrirContact } = useSite();
  const p = textesDossier[langue].parcours;
  const [premier, ...suite] = titre;
  return (
    <header className={`ph${appel ? ` ph--appel ${CLASSE_SANS_BARRE}` : ""}`}>
      <div className="ph-cadre">
        <img
          className="ph-photo"
          src={image}
          srcSet={srcSetPour(image)}
          sizes="100vw"
          alt=""
          fetchPriority="high"
          decoding="async"
        />
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
          {appel && (
            <div className="ph-appel">
              <button type="button" className="ph-bouton" onClick={ouvrirContact}>
                {p.cta} <ArrowRight aria-hidden="true" />
              </button>
              <LienWhatsApp className="ph-whatsapp">
                <MessageCircle aria-hidden="true" /> {p.whatsapp}
              </LienWhatsApp>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
