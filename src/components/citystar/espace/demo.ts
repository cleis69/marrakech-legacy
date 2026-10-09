import type { EtapeChantier } from "@/config/citystar";
import aerien from "@/assets/citystar/rendus/ext-aerien-piscine.webp";
import entree from "@/assets/citystar/rendus/entree-portail.webp";
import facade from "@/assets/citystar/rendus/ext-facade-jardin.webp";
import lames from "@/assets/citystar/rendus/ext-volume-lames.webp";
import pergola from "@/assets/citystar/rendus/ext-pergola-allee.webp";

import type { Etape, Lot, Photo, StatutEtape } from "./donnees";

/**
 * Données fictives pour regarder l'espace sans compte (développement seulement,
 * chargées à la demande : elles n'entrent pas dans le site publié).
 */
const ETAPES: EtapeChantier[] = ["reservation", "fondations", "grosOeuvre", "finitions", "livraison"];

function etapes(lot: string, faites: number): Etape[] {
  const prevues = ["2026-06-12", "2026-09-30", "2027-02-15", "2027-06-30", "2027-08-31"];
  return ETAPES.map((etape, i) => {
    const statut: StatutEtape = i < faites ? "termine" : i === faites ? "en_cours" : "a_venir";
    return {
      id: `${lot}-${etape}`,
      etape,
      ordre: i + 1,
      statut,
      date_prevue: prevues[i] ?? null,
      date_fin: statut === "termine" ? (prevues[i] ?? null) : null,
      note: etape === "fondations" && statut === "en_cours" ? "Coulage des semelles cette semaine." : null,
    };
  });
}

function lot(numero: number, type: Lot["type"], faites: number, avancement: number): Lot {
  const id = `lot-${numero}`;
  return {
    id,
    numero,
    type,
    avancement,
    note: null,
    maj_le: "2026-10-08T09:00:00Z",
    etapes: etapes(id, faites),
    paiements: [],
    documents: [],
    proprietaires: [],
  };
}

export function donneesDemo(admin: boolean) {
  const principal: Lot = {
    ...lot(7, "B", 1, 22),
    note: "Les fondations de la villa sont coulées sur les deux tiers. Prochaine visite de chantier le 24 octobre.",
    paiements: [
      { id: "p1", libelle: "Réservation (30 %)", etape: "reservation", montant: 360000, devise: "EUR", echeance: "2026-06-12", paye_le: "2026-06-12" },
      { id: "p2", libelle: "Fin des fondations", etape: "fondations", montant: 240000, devise: "EUR", echeance: "2026-10-01", paye_le: null },
      { id: "p3", libelle: "Gros œuvre", etape: "grosOeuvre", montant: 300000, devise: "EUR", echeance: "2027-02-15", paye_le: null },
      { id: "p4", libelle: "Remise des clés", etape: "livraison", montant: 300000, devise: "EUR", echeance: null, paye_le: null },
    ],
    documents: [
      { id: "d1", titre: "Contrat de réservation signé", categorie: "contrat", chemin: "lot-7/contrat.pdf", taille: 412000, cree_le: "2026-06-12T10:00:00Z" },
      { id: "d2", titre: "Plans de la villa B, niveau 0 et 1", categorie: "plan", chemin: "lot-7/plans.pdf", taille: 2300000, cree_le: "2026-06-20T10:00:00Z" },
      { id: "d3", titre: "Appel de fonds n° 2", categorie: "appel", chemin: "lot-7/appel-2.pdf", taille: 98000, cree_le: "2026-09-15T10:00:00Z" },
    ],
    proprietaires: [{ id: "o1", email: "proprietaire@exemple.com", nom: "M. et Mme Exemple" }],
  };
  const photos: Photo[] = [
    { id: "f1", lot_id: principal.id, chemin: lames, legende: "Semelles de la villa 07", prise_le: "2026-10-06" },
    { id: "f2", lot_id: null, chemin: aerien, legende: "Vue d’ensemble du domaine", prise_le: "2026-10-02" },
    { id: "f3", lot_id: principal.id, chemin: facade, legende: "Implantation de la façade jardin", prise_le: "2026-09-24" },
    { id: "f4", lot_id: null, chemin: entree, legende: "Entrée du domaine", prise_le: "2026-09-12" },
    { id: "f5", lot_id: principal.id, chemin: pergola, legende: null, prise_le: "2026-09-03" },
  ];
  const tous = admin
    ? Array.from({ length: 14 }, (_, i) =>
        i + 1 === 7 ? principal : lot(i + 1, (["A", "B", "C"] as const)[i % 3] ?? null, i < 4 ? 1 : 0, i < 4 ? 15 : 0),
      )
    : [principal];
  return {
    session: { access_token: "", refresh_token: "", expires_at: 0, email: admin ? "promoteur@exemple.com" : "proprietaire@exemple.com" },
    admin,
    lots: tous,
    photos,
    liens: new Map(photos.map((photo) => [photo.chemin, photo.chemin])),
  };
}
