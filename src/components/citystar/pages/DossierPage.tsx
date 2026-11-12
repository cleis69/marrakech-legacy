import { CalendrierSection } from "../CalendrierSection";
import { ChiffresCles } from "../ChiffresCles";
import { DossierDemande, DossierHero, Garanties } from "../dossier/sections";
import { QuestionsSection } from "../QuestionsSection";
import { useSite } from "../site";
import { TourSection } from "../TourSection";
import { VillasSection } from "../VillasSection";

/**
 * Page d'atterrissage des publicités : une seule action, recevoir la brochure. Le formulaire
 * est affiché dès l'ouverture, puis rappelé deux fois ; rien ne mène hors de la page.
 * La page est courte (12/11/2026) : les villas, les chiffres, les garanties, la visite, le
 * calendrier et son plan de paiement, les questions. Le contenu de l'envoi, l'espace
 * propriétaire, les parcelles, le marché et la carte n'y sont plus ; leurs sections restent
 * dans `dossier/sections` et sur les autres pages du site.
 */
export function DossierPage() {
  const { onCursorEnter, onCursorLeave, ouvrirVisite } = useSite();
  return (
    <>
      <DossierHero />
      <VillasSection onCursorEnter={onCursorEnter} onCursorLeave={onCursorLeave} />
      <ChiffresCles />
      <Garanties />
      <TourSection onOpenTour={ouvrirVisite} />
      <DossierDemande rang={2} />
      <CalendrierSection avecEspace={false} />
      <QuestionsSection />
      <DossierDemande rang={3} final />
    </>
  );
}
