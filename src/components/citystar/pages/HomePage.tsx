import { CalendrierSection } from "../CalendrierSection";
import {
  DossierAppel,
  DossierFormulaire,
  DossierHero,
  Garanties,
  LaVilla,
} from "../dossier/sections";
import { programme } from "@/config/citystar";
import { useDevise } from "../currency";
import { QuestionsSection } from "../QuestionsSection";
import { useSite } from "../site";
import { TourSection } from "../TourSection";
import { VillasSection } from "../VillasSection";

/**
 * Accueil sur le modèle de la page d'atterrissage (15/11/2026, demande de l'utilisateur) : dix
 * sections au lieu de dix-huit. L'ouverture (titre, trois chiffres, brochure, WhatsApp), les trois
 * villas, la villa pièce par pièce, le formulaire en étapes, les garanties, le calendrier, les
 * questions (dont l'emplacement), la visite 360° et le dernier appel. Les simulateurs et le marché
 * sont sur la page Investir.
 */
export function HomePage() {
  const { t } = useDevise();
  const { onCursorEnter, onCursorLeave, ouvrirVisite } = useSite();
  const [debut, fin] = t.hero.accroche;
  return (
    <>
      <DossierHero titre={[debut, `${programme.nombreVillas} ${fin}`]} />
      <VillasSection onCursorEnter={onCursorEnter} onCursorLeave={onCursorLeave} />
      <LaVilla />
      <DossierFormulaire />
      <Garanties />
      <CalendrierSection />
      <QuestionsSection />
      <TourSection onOpenTour={ouvrirVisite} />
      <DossierAppel />
    </>
  );
}
