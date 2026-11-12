import { CalendrierSection } from "../CalendrierSection";
import { ChiffresCles } from "../ChiffresCles";
import {
  ApercuEspace,
  ContenuDossier,
  DossierDemande,
  DossierHero,
  Garanties,
  Parcelles,
} from "../dossier/sections";
import { LocationSection } from "../LocationSection";
import { MarcheSection } from "../MarcheSection";
import { QuestionsSection } from "../QuestionsSection";
import { useSite } from "../site";
import { TourSection } from "../TourSection";
import { VillasSection } from "../VillasSection";

/**
 * Page d'atterrissage des publicités : une seule action, recevoir la brochure. Le formulaire
 * est affiché dès l'ouverture, puis rappelé trois fois ; rien ne mène hors de la page.
 * Après l'ouverture viennent les villas, puis les garanties, le contenu de l'envoi, la visite,
 * le suivi du chantier, le calendrier, les parcelles, le marché, la situation et les questions.
 */
export function DossierPage() {
  const { onCursorEnter, onCursorLeave, ouvrirPlan, ouvrirVisite } = useSite();
  return (
    <>
      <DossierHero />
      <VillasSection onCursorEnter={onCursorEnter} onCursorLeave={onCursorLeave} />
      <ChiffresCles />
      <Garanties />
      <ContenuDossier />
      <DossierDemande rang={2} />
      <TourSection onOpenTour={ouvrirVisite} />
      <ApercuEspace />
      <CalendrierSection avecEspace={false} />
      <Parcelles />
      <DossierDemande rang={3} />
      <MarcheSection />
      <LocationSection onOpenPlan={ouvrirPlan} />
      <QuestionsSection />
      <DossierDemande rang={4} final />
    </>
  );
}
