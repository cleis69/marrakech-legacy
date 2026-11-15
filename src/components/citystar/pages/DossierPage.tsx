import { CalendrierSection } from "../CalendrierSection";
import {
  BulleWhatsApp,
  DossierAppel,
  DossierFormulaire,
  DossierHero,
  Garanties,
  LaVilla,
} from "../dossier/sections";
import { QuestionsSection } from "../QuestionsSection";
import { useSite } from "../site";
import { TourSection } from "../TourSection";

/**
 * Page d'atterrissage des publicités : une seule action, recevoir la brochure.
 * Depuis le 15/11/2026, sur le modèle mobile demandé par l'utilisateur : une ouverture plein écran
 * (titre, trois chiffres, un bouton, WhatsApp), puis le formulaire en six étapes, puis une seule
 * villa pièce par pièce (sans types A, B, C), les garanties, le calendrier, les questions, la visite
 * 360° et un dernier appel. Pas de vidéo.
 * WhatsApp est proposé (accord de l'utilisateur le 15/11/2026) ; le reste du site n'est pas relié.
 */
export function DossierPage() {
  const { ouvrirVisite } = useSite();
  return (
    <>
      <DossierHero />
      <DossierFormulaire />
      <LaVilla />
      <Garanties />
      <CalendrierSection avecEspace={false} />
      <QuestionsSection />
      {/* La visite 360° en bas de page (15/11/2026, demande de l'utilisateur), avant le dernier appel. */}
      <TourSection onOpenTour={ouvrirVisite} />
      <DossierAppel />
      <BulleWhatsApp />
    </>
  );
}
