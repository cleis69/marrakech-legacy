import { CalendrierSection } from "../CalendrierSection";
import { useDevise } from "../currency";
import { Connexion } from "../espace/Connexion";
import { useEspace } from "../espace/donnees";
import { Tableau } from "../espace/Tableau";
import { textesEspace } from "../espace/textes";
import { PageHeader } from "../PageHeader";
import { useSite } from "../site";
import espaceBanniere from "@/assets/citystar/rendus/ext-volume-lames.webp";

/**
 * Espace propriétaire : connexion par lien e-mail, puis l'avancement de la villa,
 * les photos du chantier, les paiements et les documents. Déconnecté, la page
 * montre aussi le calendrier du programme.
 */
export function EspacePage() {
  const { langue, t } = useDevise();
  const { ouvrirContactAvec } = useSite();
  const { etat, recharger, sortir } = useEspace();
  const p = t.pages.espace;
  const te = textesEspace[langue];
  const demander = () =>
    ouvrirContactAvec({ outil: p.selection.outil, lignes: [p.selection.ligne] });

  return (
    <>
      <PageHeader image={espaceBanniere} kicker={p.kicker} titre={p.titreH1} intro={p.intro} />
      {etat.phase === "chargement" && (
        <section className="ec section-pad" aria-busy="true">
          <p className="ec-attente">{te.chargement}</p>
        </section>
      )}
      {etat.phase === "deconnecte" && (
        <>
          <section className="ec section-pad">
            <Connexion t={te.connexion} erreurLien={etat.erreurLien} demander={demander} />
          </section>
          <CalendrierSection avecEspace={false} />
        </>
      )}
      {etat.phase === "erreur" && (
        <section className="ec section-pad">
          <div className="ec-vide">
            <h2>{te.erreur}</h2>
            <button type="button" className="pill pill-primary" onClick={recharger}>
              <span className="pill-label">{te.reessayer}</span>
            </button>
          </div>
        </section>
      )}
      {etat.phase === "pret" && (
        <Tableau pret={etat} sortir={sortir} lienPromoteur="/espace-promoteur" />
      )}
    </>
  );
}
