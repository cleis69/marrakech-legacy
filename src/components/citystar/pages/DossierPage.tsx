import { CalendrierSection } from "../CalendrierSection";
import { ChiffresCles } from "../ChiffresCles";
import {
  BulleWhatsApp,
  DossierAppel,
  DossierFormulaire,
  DossierHero,
  Garanties,
} from "../dossier/sections";
import { QuestionsSection } from "../QuestionsSection";
import { useSite } from "../site";
import { TourSection } from "../TourSection";
import { VillasSection } from "../VillasSection";

/**
 * Page d'atterrissage des publicités : une seule action, recevoir la brochure.
 * Depuis le 15/11/2026, sur le modèle mobile demandé par l'utilisateur : une ouverture plein écran
 * (titre, trois chiffres, un bouton, WhatsApp), puis le formulaire en six étapes, puis les villas,
 * les chiffres, les garanties, la visite, le calendrier, les questions et un dernier appel.
 * WhatsApp est proposé (accord de l'utilisateur le 15/11/2026) ; le reste du site n'est pas relié.
 */
export function DossierPage() {
  const { onCursorEnter, onCursorLeave, ouvrirVisite } = useSite();
  return (
    <>
      <DossierHero />
      <DossierFormulaire />
      <VillasSection onCursorEnter={onCursorEnter} onCursorLeave={onCursorLeave} />
      <ChiffresCles />
      <Garanties />
      <TourSection onOpenTour={ouvrirVisite} />
      <CalendrierSection avecEspace={false} />
      <QuestionsSection />
      <DossierAppel />
      <BulleWhatsApp />
    </>
  );
}
