/**
 * Textes de la page d'atterrissage « Recevoir le dossier » (publicités, liens partagés).
 * Les chiffres viennent de la config ; ici, seulement les mots.
 */
export const textesDossier = {
  titre: "Villas de luxe à Marrakech : recevoir le dossier — CITYSTAR",
  description:
    "Quatorze villas avec piscine privée à Marrakech, livrées en août 2027. Prix villa par villa, plans, disponibilités et échéancier : recevez le dossier complet, sans engagement.",
  hero: {
    lieu: "Résidence privée · Oulad Hassoune, Marrakech",
    titre: (livraison: string) => ["Votre villa à Marrakech,", `livrée en ${livraison}.`] as const,
    texte: (surface: string, terrain: string, minutes: number) =>
      `Jusqu’à ${surface} construits sur ${terrain} de terrain, piscine privée, à ${minutes} minutes de Jemaa el-Fna.`,
    conditions: (part: string) =>
      `${part} à la réservation, signée chez le notaire. Le solde suit le chantier.`,
    demander: "Recevoir le dossier",
    visite: "Visite 360°",
    rendu: "Rendu 3D, non contractuel",
    pause: "Mettre la vidéo en pause",
    lecture: "Reprendre la vidéo",
  },
  carte: {
    titre: "Le dossier CITYSTAR",
    intro: "En une demande, sans engagement :",
    elements: [
      "Prix villa par villa",
      "Disponibilités à jour",
      "Plans des villas A, B et C",
      "Échéancier de paiement",
      "Brochure du domaine",
      "Simulation de rendement locatif",
    ],
    bouton: "Recevoir le dossier",
    discretion: "Vos coordonnées servent uniquement à vous recontacter au sujet de CITYSTAR.",
    brochure: (poids: string) => `Ou téléchargez la brochure maintenant (PDF, ${poids})`,
  },
  garanties: (fondsPropres: string) => [
    { titre: "Chez le notaire", texte: "La réservation se signe devant notaire, pas sur un coin de table." },
    { titre: `${fondsPropres} fonds propres`, texte: "Le promoteur finance le chantier sur ses propres fonds." },
    { titre: "Crédit accepté", texte: "Le promoteur accepte les acquéreurs qui financent par crédit immobilier." },
    { titre: "Déjà livré", texte: "Un promoteur qui a déjà livré des programmes à l’étranger." },
  ],
  contenu: {
    kicker: "Prix · plans · disponibilités",
    titre: ["Tout pour décider,", "en une seule demande."] as const,
    intro:
      "Le dossier réunit ce qu’un acquéreur demande d’ordinaire en dix messages. Les plans et la brochure se téléchargent tout de suite ; les prix et les disponibilités vous sont envoyés par un conseiller.",
    elements: [
      { titre: "Prix villa par villa", texte: "Le prix de chacune des quatorze villas, selon son architecture et sa parcelle." },
      { titre: "Disponibilités", texte: "Les villas encore libres, à la date de votre demande." },
      { titre: "Plans des trois villas", texte: "Rez-de-chaussée et étage des villas A, B et C." },
      { titre: "Échéancier", texte: "La réservation chez le notaire, puis le solde au rythme du chantier." },
      { titre: "Brochure du domaine", texte: "Architecture, matériaux, prestations et plan de masse." },
      { titre: "Analyse locative", texte: "Une simulation de rendement brut, à partir de vos hypothèses." },
    ],
    plans: "Plans",
    plan: (type: string) => `Villa ${type}`,
    brochure: "Brochure",
    ensuite: "Et ensuite ?",
    etapes: [
      { titre: "Vous demandez le dossier.", texte: "Une minute, sans engagement ni réservation automatique." },
      { titre: "Un conseiller vous l’envoie.", texte: "Prix, disponibilités, échéancier ; il répond à vos questions par téléphone, WhatsApp ou visio." },
      { titre: "Vous visitez, puis décidez.", texte: "Sur place ou à distance. La réservation se signe chez le notaire." },
    ],
  },
  espace: {
    kicker: "Après la réservation",
    titre: ["Votre chantier,", "suivi d’où vous vivez."] as const,
    intro:
      "Chaque acquéreur reçoit un accès personnel à son espace propriétaire. Vous suivez la construction de votre villa depuis Paris, Londres ou Oslo, sans attendre un appel.",
    points: [
      { titre: "L’avancement", texte: "Le pourcentage des travaux et le mot du promoteur, mis à jour au fil du chantier." },
      { titre: "Les photos du chantier", texte: "Votre villa et le domaine, photographiés à chaque étape." },
      { titre: "Vos paiements", texte: "Ce qui est réglé, ce qui reste, la prochaine échéance." },
      { titre: "Vos documents", texte: "Contrat, plans, appels de fonds : tout au même endroit." },
    ],
    legende: "Aperçu de l’espace propriétaire, données d’illustration.",
    villa: "Villa 07 · Type B",
    avancement: "Avancement des travaux",
    etape: "Fondations",
    etapes: ["Réservation", "Fondations", "Gros œuvre", "Finitions", "Remise des clés"],
    paiement: "Prochaine échéance",
    paiementLibelle: "Fin des fondations",
    photos: "Photos du chantier",
  },
  parcelles: {
    kicker: "Le plan de masse",
    titre: ["Quatorze parcelles.", "Les premiers choisissent."] as const,
    texte:
      "L’emplacement dans le domaine, l’orientation de la piscine, l’architecture A, B ou C : chaque réservation réduit le choix des suivants. Le dossier indique les villas qui restent.",
    faits: (terrain: string) => [
      { valeur: terrain, label: "par parcelle" },
      { valeur: "3", label: "architectures" },
      { valeur: "1", label: "domaine privé" },
    ],
    agrandir: "Agrandir le plan de masse",
    legende: "Plan de masse du domaine, non contractuel.",
    demander: "Demander les disponibilités",
  },
  final: {
    titre: ["Recevez le dossier", "CITYSTAR."] as const,
    texte:
      "Prix villa par villa, disponibilités, plans, échéancier et simulation locative. Un conseiller vous l’envoie, sans engagement.",
    demander: "Recevoir le dossier",
    whatsapp: "Écrire sur WhatsApp",
    appeler: "Appeler",
  },
  selection: {
    outil: "Dossier CITYSTAR",
    lignes: ["Prix villa par villa", "Disponibilités", "Plans", "Échéancier", "Simulation locative"],
  },
};
