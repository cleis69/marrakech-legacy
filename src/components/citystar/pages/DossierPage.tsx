import { CalendrierSection } from "../CalendrierSection";
import { ChiffresCles } from "../ChiffresCles";
import {
  ApercuEspace,
  ContenuDossier,
  DossierFinal,
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
 * Page d'atterrissage « Recevoir le dossier » : une seule action, demander le dossier,
 * reprise à chaque étape. Elle répond dans l'ordre aux questions d'un acquéreur
 * venu d'une publicité : quoi, quelles garanties, que reçoit-il, à quoi ressemble
 * la villa, comment suivre le chantier, quand, où, combien de choix il reste.
 */
export function DossierPage() {
  const { onCursorEnter, onCursorLeave, ouvrirPlan, ouvrirVisite } = useSite();
  return (
    <>
      <DossierHero />
      <ChiffresCles />
      <Garanties />
      <ContenuDossier />
      <VillasSection onCursorEnter={onCursorEnter} onCursorLeave={onCursorLeave} />
      <TourSection onOpenTour={ouvrirVisite} />
      <ApercuEspace />
      <CalendrierSection avecEspace={false} />
      <Parcelles />
      <MarcheSection />
      <LocationSection onOpenPlan={ouvrirPlan} />
      <QuestionsSection />
      <DossierFinal />
    </>
  );
}
