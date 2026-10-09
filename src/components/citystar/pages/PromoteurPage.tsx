import { Admin } from "../espace/Admin";
import { Connexion } from "../espace/Connexion";
import { useEspace } from "../espace/donnees";
import { textesEspace } from "../espace/textes";
import { PageHeader } from "../PageHeader";
import banniere from "@/assets/citystar/rendus/ext-aerien-piscine.webp";

/**
 * Espace promoteur (en français) : même connexion que les propriétaires ; seules
 * les adresses de la table admins y ont accès, et la base le vérifie à chaque requête.
 */
export function PromoteurPage() {
  const { etat, recharger, sortir } = useEspace();
  const te = textesEspace.fr;

  return (
    <>
      <PageHeader
        image={banniere}
        kicker="Espace promoteur"
        titre={["Le chantier,", "villa par villa."]}
        intro="Avancement, acquéreurs, étapes, paiements, photos et documents : ce que vous publiez ici apparaît dans l’espace de chaque propriétaire."
      />
      {etat.phase === "chargement" && (
        <section className="ec section-pad" aria-busy="true">
          <p className="ec-attente">{te.chargement}</p>
        </section>
      )}
      {etat.phase === "deconnecte" && (
        <section className="ec section-pad">
          <Connexion
            t={{
              ...te.connexion,
              titre: "Connexion promoteur",
              texte: "Saisissez votre adresse e-mail de promoteur. Vous recevrez un lien de connexion, sans mot de passe.",
            }}
            erreurLien={etat.erreurLien}
          />
        </section>
      )}
      {etat.phase === "erreur" && (
        <section className="ec section-pad">
          <div className="ec-vide">
            <h2>{te.erreur}</h2>
            <button type="button" className="pill pill-primary" onClick={() => void recharger()}>
              <span className="pill-label">{te.reessayer}</span>
            </button>
          </div>
        </section>
      )}
      {etat.phase === "pret" && !etat.admin && (
        <section className="ec section-pad">
          <div className="ec-vide">
            <h2>Cet espace est réservé au promoteur.</h2>
            <p>
              Vous êtes connecté avec {etat.session.email}, qui n’a pas l’accès promoteur.
            </p>
            <button type="button" className="pill pill-secondary" onClick={sortir}>
              <span className="pill-label">Se déconnecter</span>
            </button>
          </div>
        </section>
      )}
      {etat.phase === "pret" && etat.admin && (
        <Admin pret={etat} recharger={recharger} sortir={sortir} lienEspace="/mon-espace" />
      )}
    </>
  );
}
