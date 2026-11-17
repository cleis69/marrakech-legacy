import { CalendrierSection } from "../CalendrierSection";
import {
  Bandeau,
  DossierAppel,
  DossierFormulaire,
  DossierHero,
  FicheVilla,
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
      {/* Bandeau défilant tout en haut (16/11/2026) : villas restantes, liste des disponibilités. */}
      <Bandeau />
      <DossierHero />
      {/* Le formulaire juste après l'ouverture (17/11/2026, demande de l'utilisateur) : d'après Clarity,
          seuls 4 visiteurs sur 10 descendaient jusqu'au formulaire quand il venait après « la villa en
          bref » et les photos (à 41 % de la page sur mobile). Remplace l'ordre du 15/11 (photos d'abord). */}
      <DossierFormulaire />
      {/* Ce que l'on achète (16/11/2026) : six points et un aperçu flouté du plan, avant les photos. */}
      <FicheVilla />
      <LaVilla />
      <Garanties />
      <CalendrierSection avecEspace={false} />
      <QuestionsSection />
      {/* La visite 360° en bas de page (15/11/2026, demande de l'utilisateur), avant le dernier appel. */}
      <TourSection onOpenTour={ouvrirVisite} />
      <DossierAppel />
    </>
  );
}
