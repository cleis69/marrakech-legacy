import { ArrowRight } from "lucide-react";

import { CalendrierSection } from "../CalendrierSection";
import { useDevise } from "../currency";
import { PageHeader } from "../PageHeader";
import { useSite } from "../site";
import { PillButton } from "../ui/PillButton";
import espaceBanniere from "@/assets/citystar/rendus/ext-volume-lames.webp";

/**
 * Espace propriétaire : en attendant l'ouverture des accès personnels, la page
 * dit où en est l'espace, permet de demander son accès et montre le calendrier.
 */
export function EspacePage() {
  const { t } = useDevise();
  const { ouvrirContactAvec } = useSite();
  const p = t.pages.espace;
  return (
    <>
      <PageHeader image={espaceBanniere} kicker={p.kicker} titre={p.titreH1} intro={p.intro} />
      <section className="section-pad" aria-labelledby="espace-statut">
        <div className="es-statut">
          <h2 id="espace-statut">{p.statut}</h2>
          <p>{p.statutTexte}</p>
          <PillButton
            label={p.demander}
            icon={ArrowRight}
            onClick={() =>
              ouvrirContactAvec({ outil: p.selection.outil, lignes: [p.selection.ligne] })
            }
          />
        </div>
      </section>
      <CalendrierSection avecEspace={false} />
    </>
  );
}
