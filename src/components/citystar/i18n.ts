import type { Langue, TypeVilla } from "@/config/citystar";

/**
 * Tous les textes du site, en français et en anglais.
 * Les chiffres restent dans src/config/citystar.ts : ici, uniquement des mots.
 */
const fr = {
  nav: [
    ["Accueil", ""],
    ["Les villas", "villas"],
    ["Galerie", "galerie"],
    ["Investir", "investir"],
    ["Questions", "faq"],
    ["Contact", "contact"],
  ] as [string, string][],
  header: {
    acces: "Être rappelé",
    rappelCourt: "Rappel",
    conciergerie: "Conciergerie",
    accueil: "Retour à l’accueil",
    sommaire: "Sommaire",
    brochure: "Brochure CITYSTAR",
    poids: (mo: string) => `PDF · ${mo} Mo`,
    demander: "Être rappelé par un conseiller",
    fermer: "Fermer le menu",
    menu: "Menu",
    villas: "Villas",
    galerie: "Galerie",
    questions: "Questions",
    espace: "Mon espace",
    langue: "Langue du site",
    whatsapp: "Contacter la conciergerie CITYSTAR sur WhatsApp",
  },
  hero: {
    lieu: "Résidence privée · Oulad Hassoune, Marrakech",
    accroche: ["Villas de luxe à Marrakech,", "quatorze, pas une de plus."] as [string, string],
    texte: (surface: string, terrain: string, minutes: number) =>
      `Jusqu’à ${surface} construits sur ${terrain} de terrain, piscine privée, à ${minutes} minutes de Jemaa el-Fna.`,
    garanties: (fondsPropres: string) => [
      "Réservation chez le notaire",
      `${fondsPropres} fonds propres`,
      "Crédit immobilier accepté",
    ],
    rendu: "Rendu 3D, non contractuel",
    livraison: (mois: string) => `Livraison ${mois}`,
    livraisonLabel: "Livraison",
    reservation: (part: string) => `${part} à la réservation`,
    visite: "Visite 360°",
    decouvrir: "Découvrir les villas",
    acces: "Être rappelé par un conseiller",
    pause: "Mettre la vidéo en pause",
    lecture: "Reprendre la vidéo",
    pauseCourt: "Pause",
    lectureCourt: "Lecture",
  },
  reperes: {
    aria: "Les repères du domaine",
    trajet: (n: number) => ({ valeur: `${n} min`, libelle: "Jemaa el-Fna & aéroport" }),
    villas: (n: number) => ({ valeur: String(n), libelle: "villas privées, pas une de plus" }),
    terrain: (surface: string) => ({ valeur: surface, libelle: "de terrain, au plus grand" }),
  },
  projet: {
    titre: ["L’espace rare", "d’une vie ", "privée."] as [string, string, string],
    texte: [
      "Un domaine privé et entièrement sécurisé, proche de la Palmeraie.",
      "Trois architectures pour les usages et les préférences de chaque résident.",
    ] as [string, string],
    vues: { entree: "L’entrée", pergola: "La pergola", salon: "Le salon" },
    faits: {
      villas: "villas privées, dans un domaine sécurisé",
      terrain: "de terrain par villa",
      surface: "construits, pour la plus grande",
      trajet: "de Jemaa el-Fna et de l’aéroport",
    },
  },
  livraison: {
    aria: "Calendrier de livraison et plan de paiement",
    titre: (mois: string) => `Livraison en ${mois}.`,
    intro:
      "Le chantier avance par étapes, et chacune appelle une part du prix. Les dates intermédiaires et la répartition du solde sont en cours de validation avec le promoteur.",
    compte: (n: number) =>
      n === 0 ? "Livraison ce mois-ci" : n === 1 ? "Dans 1 mois" : `Dans ${n} mois`,
    frise: "Les étapes du chantier",
    etapes: {
      reservation: "Réservation",
      fondations: "Fondations",
      grosOeuvre: "Gros œuvre",
      finitions: "Finitions",
      livraison: "Remise des clés",
    },
    signature: "Signature chez le notaire",
    dateAConfirmer: "Date à confirmer",
    paiement: "Le plan de paiement",
    part: "Part du prix",
    aConfirmer: "À confirmer",
    notePaiement: (reste: string) =>
      `La réservation se signe directement chez le notaire. La répartition des ${reste} restants est en cours de validation avec le promoteur\u00a0: votre conseiller vous remet l’échéancier détaillé de votre villa.`,
    echeancier: "Recevoir l’échéancier",
    selection: { outil: "Calendrier et paiement", ligne: "Demande de l’échéancier détaillé" },
    espace: {
      texte: "Déjà propriétaire\u00a0? Suivez l’avancement des travaux de votre villa.",
      lien: "Accéder à mon espace",
    },
  },
  architecture: {
    label: "Architecture",
    titre: ["Vivre Marrakech,", "autrement."] as [string, string],
    hint: "Glissez la poignée, puis ouvrez chaque point.",
    note: "Illustration non contractuelle",
    curseur: "Comparer le dessin et le rendu",
    rendu: "Rendu",
    dessin: "Dessin",
    altDessin: "Dessin au trait de la façade d’une villa CITYSTAR",
    altRendu: "Rendu de la même façade, avec terrasses et piscine",
    points: [
      {
        titre: "Brise-soleil",
        texte: "Des lames horizontales qui filtrent la lumière au-dessus de la terrasse.",
      },
      {
        titre: "Terrasse à l’étage",
        texte: "Les pièces de l’étage s’ouvrent sur de vastes terrasses.",
      },
      { titre: "Volumes vitrés", texte: "De grands volumes ouverts sur l’extérieur." },
      { titre: "Matériaux", texte: "Des matériaux de haute qualité, aux standards européens." },
      { titre: "Piscine privée", texte: "Chaque villa dispose de sa propre piscine." },
    ],
  },
  villas: {
    label: "Les villas",
    titre: ["Trois expressions.", "Une même ", "exigence."] as [string, string, string],
    intro: (n: number, terrain: string) =>
      `Trois architectures pour ${n} villas, chacune sur un terrain de ${terrain}.`,
    comparer: "Comparer les villas",
    villa: "Villa",
    decouvrir: "Découvrir la villa",
    curseur: "Explorer",
    decouvrirAria: (type: TypeVilla, surface: string, suites: string, tag: string) =>
      `Découvrir la villa type ${type}\u00a0: ${surface}, ${suites}, ${tag.toLowerCase()}`,
    retour: "Les trois villas",
    onglets: "Types de villa",
    typeVilla: (type: TypeVilla) => `Villa type ${type}`,
    surface: "Surface construite",
    terrain: "Terrain",
    configuration: "Configuration",
    suites: (n: number) => `${n} suites`,
    plansAria: (type: TypeVilla) => `Plans de la villa type ${type}`,
    rdc: "Rez-de-chaussée",
    etage: "Étage",
    agrandirPlan: (etage: boolean, type: TypeVilla) =>
      `Agrandir le plan ${etage ? "de l’étage" : "du rez-de-chaussée"} de la villa type ${type}`,
    demander: "Être rappelé pour cette villa",
    brochure: "Brochure",
    brochureAria: (type: TypeVilla) => `Brochure de la villa type ${type} (PDF)`,
    illustration: (type: TypeVilla) => `Villa type ${type} · Illustration non contractuelle`,
    prixM2: (montant: string) => `Soit environ ${montant} le m² construit`,
    disponibilite: "Disponibilité sur demande",
    accroches: {
      A: ["Pensée pour", "chacun."],
      B: ["La vie", "en terrasses."],
      C: ["Des volumes", "autour de l’eau."],
    } as Record<TypeVilla, [string, string]>,
    tags: { A: "Accessible", B: "Terrasses", C: "Contemporaine" } as Record<TypeVilla, string>,
    descriptions: {
      A: "Pensée pour les résidents à mobilité réduite\u00a0: ascenseur, salles de bains accessibles et circulations généreuses.",
      B: "Une architecture exigeante et des matériaux de haute qualité, prolongés par de vastes terrasses.",
      C: "Des volumes contemporains et une piscine privée, selon les standards architecturaux les plus exigeants.",
    } as Record<TypeVilla, string>,
  },
  prix: {
    label: "Prix",
    devise: "Devise d’affichage",
    reference: (prix: string) => `Prix de référence\u00a0: ${prix}`,
    contreValeur: (date: string) => `Contre-valeur indicative · taux du ${date}`,
    indicatif: "Prix indicatif, sous réserve de confirmation",
    indicatifCourt: "prix indicatif",
    surDemande: "Prix sur demande",
    devises: {
      EUR: "Euros",
      GBP: "Livres sterling",
      MAD: "Dirhams marocains",
      NOK: "Couronnes norvégiennes",
    },
  },
  vivre: {
    label: "L’art de vivre",
    titre: "Une journée à CITYSTAR",
    moments: [
      {
        quand: "Le matin",
        titre: "La piscine, avant tout le monde.",
        texte: "Chaque villa a sa piscine privée et ses espaces extérieurs, à l’abri des regards.",
        alt: "Piscine privée d’une villa CITYSTAR au matin",
      },
      {
        quand: "L’après-midi",
        titre: "La lumière entre partout.",
        texte:
          "Des volumes ouverts et des matériaux de haute qualité, pensés pour la vie à l’intérieur comme à l’extérieur.",
        alt: "Séjour lumineux d’une villa CITYSTAR",
      },
      {
        quand: "Le soir",
        titre: "Recevoir, en toute discrétion.",
        texte: "Des salons généreux, dans une villa isolée au cœur d’un domaine privé.",
        alt: "Salon d’une villa CITYSTAR en soirée",
      },
      {
        quand: "La nuit",
        titre: "Un domaine gardé jour et nuit.",
        texte: "Une résidence privée et entièrement sécurisée, à proximité de la Palmeraie.",
        alt: "Villa CITYSTAR éclairée à la tombée de la nuit",
      },
    ],
    momentsAria: "Moments de la journée",
  },
  visite: {
    label: "Visite 360°",
    titre: ["Entrez dans", "les villas."] as [string, string],
    texte:
      "Une visite à 360° des villas, pièce par pièce. Suivez les flèches d’une pièce à l’autre, à votre rythme.",
    etapes: [
      "Activer la visite",
      "Suivre les flèches d’une pièce à l’autre",
      "Passer en plein écran",
    ],
    activer: "Activer la visite",
    apercu: "Visite 360° · pièce par pièce",
    pleinEcran: "Plein écran",
    titreIframe: "Visite virtuelle à 360° du domaine CITYSTAR",
    titreModale: "Visite virtuelle 360°",
    fermer: "Fermer la visite",
  },
  localisation: {
    label: "Localisation",
    titre: ["À l’écart.", "Jamais loin."] as [string, string],
    lieux: {
      med: { titre: "Place Jemaa el-Fna", note: (n: number) => `Moins de ${n} minutes` },
      air: { titre: "Aéroport de Marrakech", note: (n: number) => `Moins de ${n} minutes` },
      palm: { titre: "La Palmeraie", note: "Toute proche", mot: "Proche" },
    },
    adresse: ["Wilaya Marrakech-Safi", "Préfecture de Marrakech", "Oulad Hassoune"],
    planMasse: "Plan de masse",
    schema: "Carte schématique, non à l’échelle",
    carteAria:
      "Carte schématique, non à l’échelle\u00a0: CITYSTAR à Oulad Hassoune, près de la Palmeraie, avec la médina et l’aéroport de Marrakech",
    reperes: {
      med: "Médina · Jemaa el-Fna",
      medCourt: "Médina",
      air: "Aéroport Marrakech-Menara",
      airCourt: "Aéroport",
      palm: "La Palmeraie",
      palmCourt: "Palmeraie",
    },
    zoomPlus: "Zoomer",
    zoomMoins: "Dézoomer",
    recentrer: "Recentrer la carte",
    aideLongue: "Glissez pour déplacer · Ctrl + molette pour zoomer",
    aideCourte: "Glissez · touchez une distance",
    residencePrivee: "Résidence privée",
    ou: "Oulad Hassoune · Marrakech",
    itineraire: "Itinéraire",
    fermerFiche: "Fermer la fiche",
    proximite: "À proximité",
    minutes: (n: number) => `${n} min`,
    moinsDe: (n: number) => `< ${n} min`,
  },
  pages: {
    accueil: {
      titre: "CITYSTAR Marrakech — Villas de luxe privées",
      description: (n: number) =>
        `CITYSTAR, résidence privée de ${n} villas contemporaines à Oulad Hassoune, Marrakech, proche de la Palmeraie.`,
    },
    villas: {
      titre: "Les villas — CITYSTAR Marrakech",
      description:
        "Trois types de villas, surfaces, suites, plans et prix\u00a0: trouvez celle qui vous ressemble.",
      kicker: "Les villas",
      titreH1: ["Choisir", "sa villa."] as [string, string],
      intro:
        "Trois architectures, quatorze villas. Laissez-vous guider en quelques questions, puis comparez-les.",
    },
    villa: {
      titre: (type: string) => `Villa type ${type} — CITYSTAR Marrakech`,
      description: (type: string, surface: string, suites: string) =>
        `Villa type ${type}\u00a0: ${surface} construits, ${suites}, plans et brochure.`,
    },
    galerie: {
      titre: "Galerie et visite — CITYSTAR Marrakech",
      description:
        "Les rendus du domaine, le détail de l'architecture et la visite aérienne à 360°.",
      kicker: "Galerie",
      titreH1: ["Le domaine,", "en images."] as [string, string],
      intro: "Rendus d'architecte du domaine et des intérieurs. Illustrations non contractuelles.",
      legende: "Rendu CITYSTAR",
    },
    espace: {
      titre: "Mon espace propriétaire — CITYSTAR",
      description:
        "L’espace des propriétaires CITYSTAR\u00a0: l’avancement des travaux de votre villa, étape par étape.",
      kicker: "Mon espace",
      titreH1: ["Suivre ma villa,", "étape par étape."] as [string, string],
      intro:
        "Chaque propriétaire disposera d’un accès personnel pour suivre l’avancement des travaux de sa villa.",
      statut: "Espace en préparation",
      statutTexte:
        "L’espace propriétaire ouvre prochainement. Votre conseiller vous communiquera votre accès personnel.",
      demander: "Demander mon accès",
      selection: { outil: "Espace propriétaire", ligne: "Demande d’accès à l’espace propriétaire" },
    },
    investir: {
      titre: "Investir à Marrakech — CITYSTAR",
      description:
        "Ce qu'il faut savoir avant d'investir dans une villa à Marrakech, et un simulateur de rendement brut.",
      kicker: "Investir",
      chapeau:
        "Ce qu'il faut savoir avant d'investir dans une villa à Marrakech, et un simulateur pour tester vos propres hypothèses.",
      titreH1: ["Investir", "à Marrakech."] as [string, string],
      intro: [
        "Quatorze villas, trois architectures, un domaine privé à quelques minutes de la Palmeraie\u00a0: la rareté de l'offre est le premier argument d'un placement.",
        "Les hypothèses de rendement dépendent du mode d'exploitation choisi et des conditions réelles du marché. Le simulateur ci-dessous part de valeurs d'illustration, à ajuster puis à confirmer avec le promoteur.",
      ] as [string, string],
      points: [
        {
          titre: "Location courte durée",
          texte:
            "Marrakech attire une clientèle internationale toute l'année. La location courte durée y est soumise à des obligations déclaratives locales.",
        },
        {
          titre: "Location longue durée",
          texte:
            "Un bail classique offre un revenu plus régulier, avec moins de gestion et une rotation faible.",
        },
        {
          titre: "Revente à horizon",
          texte:
            "La valeur dépend du marché et de l'état du bien\u00a0; aucune plus-value ne peut être garantie.",
        },
      ],
    },
    faq: {
      suites: {
        titre: "Aller plus loin",
        plans: "Voir les villas et leurs plans",
        simulateur: "Estimer un rendement",
        rappel: "Être rappelé par un conseiller",
      },
      titre: "Questions fréquentes — CITYSTAR Marrakech",
      description:
        "Emplacement, surfaces, accessibilité, prix, plans, visites\u00a0: les réponses aux questions les plus posées.",
      kicker: "Questions",
      titreH1: ["Les questions", "qu'on nous pose."] as [string, string],
      intro: "Une réponse manque\u00a0? La conciergerie répond directement.",
    },
    luxe: {
      titre: "Villa de luxe à Marrakech — CITYSTAR",
      description:
        "Quatorze villas de luxe à Oulad Hassoune, Marrakech\u00a0: surfaces, architectures, emplacement et conditions de visite.",
      kicker: "Villa de luxe à Marrakech",
      titreH1: ["Acheter une villa", "à Marrakech."] as [string, string],
      intro:
        "CITYSTAR réunit quatorze villas contemporaines dans un domaine privé et entièrement sécurisé d'Oulad Hassoune, près de la Palmeraie.",
      sections: [
        {
          titre: "Un domaine fermé, pas un lotissement",
          texte:
            "Quatorze villas seulement, chacune sur son terrain et avec sa piscine privée. Le domaine est clos et gardé\u00a0: la rareté de l'offre est ce qui distingue le projet des programmes voisins.",
        },
        {
          titre: "Trois architectures, trois usages",
          texte:
            "Le type A est conçu pour la mobilité réduite\u00a0: ascenseur et salles de bains accessibles. Le type B ouvre ses pièces sur de vastes terrasses. Le type C joue des volumes contemporains autour de la piscine.",
        },
        {
          titre: "À l'écart, jamais loin",
          texte:
            "La place Jemaa el-Fna et l'aéroport Marrakech-Menara sont à moins de trente-cinq minutes, la Palmeraie toute proche. Une visite aérienne à 360° permet de situer le domaine avant de se déplacer.",
        },
        {
          titre: "Visiter, puis acquérir",
          texte:
            "Les plans de chaque type et les brochures sont téléchargeables. La visite sur place et les conditions d'acquisition passent par la conciergerie\u00a0: un conseiller vous rappelle et organise la visite.",
        },
      ],
    },
    contact: {
      titre: "Contact — CITYSTAR Marrakech",
      description:
        "Demander un accès privé, la brochure ou une visite du domaine CITYSTAR à Marrakech.",
      kicker: "Contact",
      titreH1: ["Parlons de", "votre projet."] as [string, string],
      intro:
        "Un conseiller vous répond directement\u00a0: téléphone, WhatsApp ou rappel, au choix.",
      formulaire: "Être rappelé par un conseiller",
    },
  },
  faq: (v: {
    villas: number;
    terrain: string;
    minutes: number;
    a: string;
    b: string;
    c: string;
    acompte: string;
    livraison: string;
    fondsPropres: string;
  }) => [
    {
      id: "securite",
      q: "Acheter sur plan à CITYSTAR est-il sécurisé\u00a0?",
      r: `La réservation se signe directement chez le notaire, et chaque versement passe par son étude. Le chantier est financé à ${v.fondsPropres} sur fonds propres\u00a0: il ne dépend ni d’un crédit du promoteur ni des ventes sur plan.`,
    },
    {
      id: "acquisition",
      q: "Comment se déroule l'acquisition\u00a0?",
      r: `Vous réservez votre villa chez le notaire, avec ${v.acompte} du prix. La répartition du solde jusqu’à la remise des clés est en cours de validation avec le promoteur\u00a0; votre conseiller vous remet l’échéancier détaillé.`,
    },
    {
      id: "financement",
      q: "Peut-on acheter avec un crédit immobilier\u00a0?",
      r: "Oui. Le promoteur accepte les acquisitions financées par un crédit immobilier bancaire. Votre conseiller vous accompagne dans les étapes avec votre banque.",
    },
    {
      id: "livraison",
      q: "Quand le domaine sera-t-il livré\u00a0?",
      r: `La livraison est prévue en ${v.livraison}. Les dates des étapes intermédiaires du chantier sont en cours de validation avec le promoteur.`,
    },
    {
      id: "villas",
      q: "Combien de villas compte CITYSTAR\u00a0?",
      r: `${v.villas} villas, réparties en trois types. Chacune dispose de son terrain, jusqu'à ${v.terrain}, et de sa piscine privée.`,
    },
    {
      id: "lieu",
      q: "Où se situe le domaine\u00a0?",
      r: `À Oulad Hassoune, préfecture de Marrakech, près de la Palmeraie. La place Jemaa el-Fna et l'aéroport sont à moins de ${v.minutes} minutes.`,
    },
    {
      id: "surfaces",
      q: "Quelles sont les surfaces\u00a0?",
      r: `Type A\u00a0: ${v.a}. Type B\u00a0: ${v.b}. Type C\u00a0: ${v.c}. Les surfaces s'entendent construites\u00a0; les terrains sont indiqués sur chaque fiche.`,
    },
    {
      id: "pmr",
      q: "Une villa est-elle adaptée à la mobilité réduite\u00a0?",
      r: "Oui, la villa type A\u00a0: ascenseur, salles de bains accessibles et circulations généreuses.",
    },
    {
      id: "prix",
      q: "Quel est le prix des villas\u00a0?",
      r: "Les prix sont communiqués sur demande, avec l’échéancier détaillé de la villa qui vous intéresse. Demandez à être rappelé par un conseiller.",
    },
    {
      id: "visite",
      q: "Peut-on visiter\u00a0?",
      r: "La visite aérienne à 360° est accessible en ligne. Une visite sur place se demande par la conciergerie, après étude de la demande d'accès.",
    },
    {
      id: "plans",
      q: "Les plans sont-ils disponibles\u00a0?",
      r: "Oui\u00a0: rez-de-chaussée et étage pour chaque type, agrandissables sur le site, ainsi qu'une brochure PDF par villa.",
    },
  ],
  rendus: {
    // Textes alternatifs écrits d'après les images (le nom de fichier ne décrit rien).
    alts: {
      "entree-crepuscule":
        "Allée d’entrée d’une villa, volumes blancs et pergola en lames sombres, jardin de palmiers",
      "entree-palmiers": "Porte d’entrée en bois encadrée de lames sombres, entre deux palmiers",
      "entree-portail": "Porte d’entrée en bois sous une pergola à lames, vue de face",
      "ext-aerien-piscine": "Vue en hauteur d’une villa à étage, de sa piscine et de sa pelouse",
      "ext-facade-crepuscule":
        "Façade basse d’une villa, enduit blanc et bandeaux sombres, derrière un jardin sec",
      "ext-facade-entree": "Façade d’une villa et son allée, voiture garée devant l’entrée",
      "ext-facade-jardin": "Villa à étage vue depuis le jardin, terrasse couverte et voiture garée",
      "ext-pergola-allee":
        "Villa aux volumes bas, pergola à lames sur la terrasse, pelouse et palmiers",
      "ext-pergola-jour": "Terrasse sous une pergola à lames verticales, au bord de la pelouse",
      "ext-pergola-portrait": "Pergola à lames sombres au-dessus d’une terrasse meublée",
      "ext-piscine-crepuscule": "Angle d’une villa à étage, grandes baies voilées et piscine",
      "ext-piscine-jour": "Piscine au pied d’une villa à étage, balcons et bains de soleil",
      "ext-piscine-soir": "Villa éclairée en soirée, piscine et terrasse de l’étage",
      "ext-terrasse-jour":
        "Salon d’extérieur sous une avancée, entre volumes blancs et bardage bois",
      "ext-terrasses-cactus": "Villa à étage et ses terrasses, pelouse, cactus et bains de soleil",
      "ext-volume-lames": "Volume sombre strié de lames lumineuses, cour plantée d’un palmier",
      "int-chambre-bois": "Chambre aux boiseries sombres, grand lit et sol en marbre clair",
      "int-chambre-jour": "Chambre lumineuse, lit bas et baie vitrée ouverte sur le jardin",
      "int-chambre-soir": "Chambre aux tons gris, lit, fauteuils et dressing",
      "int-salon":
        "Salon au canapé courbe sous des suspensions circulaires, bonsaï sur la table basse",
    } as Record<string, string>,
    visionneuse: "Galerie en grand format",
    agrandir: (alt: string) => `Agrandir\u00a0: ${alt}`,
    precedente: "Image précédente",
    suivante: "Image suivante",
    fermer: "Fermer la galerie",
    position: (i: number, n: number) => `${i} / ${n}`,
  },
  ruban: {
    aria: "Les rendus du domaine, en défilement",
    note: "Rendus d’architecte · illustrations non contractuelles",
    titre: ["Le domaine,", "en images."] as [string, string],
    galerie: "Voir toute la galerie",
    pause: "Pause",
    lecture: "Lecture",
  },
  marque: {
    defilant: "CITYSTAR · QUATORZE VILLAS PRIVÉES · OULAD HASSOUNE · MARRAKECH · ",
    legende: "Oulad Hassoune · Marrakech",
    aria: "CITYSTAR, résidence privée à Oulad Hassoune, Marrakech",
  },
  questions: {
    titre: ["Acheter sur plan,", "en toute sérénité."] as [string, string],
    intro: "Les questions que l’on nous pose avant chaque réservation.",
    toutes: "Toutes les questions",
  },
  engagements: {
    titre: ["Trois engagements.", "Une confiance entière."] as [string, string],
    intro: "Des garanties concrètes, à chaque étape de votre acquisition.",
    items: (fondsPropres: string) => [
      {
        titre: "Un promoteur qui a déjà livré",
        texte: "Une expérience de la promotion immobilière déjà éprouvée à l’étranger.",
      },
      {
        titre: `${fondsPropres} fonds propres`,
        texte:
          "Le chantier est financé sur fonds propres\u00a0: il ne dépend ni d’un crédit du promoteur ni des ventes sur plan.",
      },
      {
        titre: "Le notaire dès la réservation",
        texte:
          "La réservation se signe directement chez le notaire, et chaque versement passe par son étude.",
      },
    ],
    cta: "Recevoir le dossier",
    selection: { outil: "Dossier CITYSTAR", ligne: "Demande du dossier complet" },
  },
  marche: {
    titre: "Marrakech accélère.",
    transactions: (annee: number) => `Transactions à Marrakech en ${annee}`,
    prix: (annee: number) => `Prix à Marrakech en ${annee}`,
    comparaison: (annee: number) => `Évolution des transactions en ${annee}, par ville`,
    conclusion: (n: string) => `La demande accélère. À CITYSTAR, l’offre s’arrête à ${n} villas.`,
    source: "Source et méthodologie",
    sourceTexte: (annee: number) =>
      `Bank Al-Maghrib et ANCFCC, indice des prix des actifs immobiliers (IPAI)\u00a0: évolution sur l’année ${annee} du nombre de transactions et de l’indice des prix, par ville.`,
    sourceLien: "Lire le compte rendu de la publication",
  },
  cercle: {
    titre: "Un premier échange, sans engagement.",
    intro: "Choisissez la conversation qui vous convient.",
    options: {
      visio: {
        titre: "Rendez-vous en visio",
        texte: "Une présentation du domaine et des villas, à distance.",
      },
      rappel: {
        titre: "Être rappelé",
        texte: "Un conseiller vous rappelle pour répondre à vos questions.",
      },
      rendement: {
        titre: "Simuler mon rendement",
        texte: "Une première projection, à affiner ensemble.",
      },
    },
    selection: "Premier échange",
  },
  pied: {
    sceau: "RÉSIDENCE PRIVÉE · CITYSTAR · MARRAKECH · ",
    titre: ["Un contact ", "direct."] as [string, string],
    appeler: "Appeler",
    whatsapp: "WhatsApp",
    conciergerie: "Conciergerie",
    ecrire: "Écrire",
    brochure: "Brochure",
    theme: ["Villa de luxe à Marrakech", "villa-de-luxe-marrakech"] as [string, string],
    nav: "Pied de page",
    legal: (annee: number) => `© ${annee} CITYSTAR · Résidence privée · Oulad Hassoune, Marrakech`,
    instagram: "CITYSTAR sur Instagram",
    realise: "Réalisé par",
    propulse: "Propulsé par",
    youtube: "CITYSTAR sur YouTube",
  },
  selecteur: {
    kicker: "Trouver ma villa",
    question: (n: number, total: number) => `Question ${n} / ${total}`,
    progression: "Progression",
    recommandation: "Recommandation",
    notre: "Notre recommandation",
    retour: "Retour",
    clavier: "Clavier\u00a0: chiffres pour répondre, flèche gauche pour revenir",
    recap: "Vos réponses",
    apercu: "Aperçu des trois villas",
    voirVilla: "Voir la villa",
    dossier: "Être rappelé pour cette villa",
    prive:
      "Vos réponses restent sur cet appareil\u00a0: elles ne sont jointes à votre demande que si vous l’envoyez.",
    recommencer: "Recommencer",
    comparer: "Comparer avec les deux autres",
    rendement: "Estimer le rendement",
    outil: "Sélecteur de villa",
    ligneRecommandation: (type: TypeVilla) => `Recommandation\u00a0: villa ${type}`,
    conversion: "Montants convertis à titre indicatif",
    questions: {
      usage: {
        titre: "Vous pensez à CITYSTAR pour…",
        vivre: "Y vivre",
        vivreNote: "Résidence principale ou secondaire",
        investir: "Investir",
        investirNote: "Placement ou location",
      },
      suites: {
        titre: "Combien de suites souhaitez-vous\u00a0?",
        suites: (n: number) => `${n} suites`,
        peuImporte: "Peu importe",
      },
      budget: {
        titre: "Quel budget envisagez-vous\u00a0?",
        jusqua: (montant: string) => `Jusqu’à ${montant}`,
        curseur: "Votre budget",
        valider: "Valider ce budget",
        parler: "En parler",
        parlerNote: "De vive voix",
      },
      pmr: {
        titre: "Faut-il un accès adapté à la mobilité réduite\u00a0?",
        oui: "Oui",
        ouiNote: "Ascenseur, salles de bains accessibles",
        non: "Non",
      },
    },
    raisons: {
      pmr: "Non adaptée PMR",
      suites: (n: number) => `${n} suites`,
      budget: "Au-delà du budget",
      autre: "Moins adaptée",
    },
    justifications: {
      pmr: (taille: string) =>
        `Seule villa conçue pour la mobilité réduite\u00a0: ascenseur et salles de bains accessibles, ${taille}.`,
      pmrSuites: (plus: boolean) =>
        ` Elle compte ${plus ? "plus" : "moins"} de suites que souhaité.`,
      contemporaine: (taille: string, exacte: boolean) =>
        `${taille}, des volumes contemporains et une piscine privée${exacte ? " : la taille que vous recherchez." : "."}`,
      budgetSeule: " C’est la villa qui s’inscrit dans votre budget.",
      polyvalente: (taille: string) =>
        `La plus polyvalente\u00a0: ${taille}, prolongées par de vastes terrasses.`,
      espace: (taille: string) =>
        `${taille}, prolongées par de vastes terrasses\u00a0: l’espace que vous recherchez.`,
      horsBudget: " Son prix dépasse le budget indiqué\u00a0: parlons-en.",
    },
  },
  comparateur: {
    kicker: "Comparer",
    titre: ["Ce qui les ", "distingue."] as [string, string],
    note: "Écarts calculés par rapport à la villa de référence",
    budget: (villas: string) => `Dans le budget saisi\u00a0: ${villas}`,
    aucune: "aucune villa",
    votreBudget: "Votre budget",
    horsBudget: "Au-delà du budget",
    reference: "Référence",
    referenceAria: "Villa de référence",
    prendreReference: (type: TypeVilla) => `Prendre la villa ${type} comme référence`,
    differences: "Seulement les différences",
    tableauAria: "Tableau comparatif des trois villas",
    surface: "Surface construite",
    surfaceCourt: ["Surface", "construite"] as [string, string],
    terrain: "Terrain",
    suites: "Suites",
    pmr: ["Accès", "PMR"] as [string, string],
    pmrOui: "Oui",
    pmrDetail: "Ascenseur, salles de bains accessibles",
    pmrNon: "Non prévu",
    atout: "Atout",
    plans: "Plans",
    deuxPlans: "2 plans",
    brochure: "Brochure",
    prix: "Prix",
    prixIndicatif: "Prix indicatif",
    defiler: "Faites défiler pour comparer",
    rappel: (type: TypeVilla) => `Être rappelé pour la villa ${type}`,
    outil: "Comparateur des villas",
    ligneReference: (type: TypeVilla) => `Villa de référence\u00a0: ${type}`,
    ligneBudget: (montant: string) => `Budget\u00a0: ${montant}`,
    estReference: " · référence",
    suite: "suite",
  },
  rentabilite: {
    kicker: "Simulateur",
    titre: ["Et si la villa ", "travaillait\u00a0?"] as [string, string],
    modes: { court: "Courte durée", long: "Longue durée", revente: "Revente" },
    modeAria: "Mode de simulation",
    prix: "Prix du bien",
    intro: [
      "Indiquez le budget et l’usage envisagé, ajustez les hypothèses, puis affichez l’estimation, dans la devise de votre choix.",
      "Les curseurs partent de valeurs d’illustration\u00a0: ajustez-les à votre projet. Les chiffres définitifs sont confirmés par le promoteur.",
    ] as [string, string],
    budget: "Budget étudié",
    typeLabel: "Type de villa",
    optionnel: "optionnel",
    typeLibre: "Je ne sais pas encore",
    typeVilla: (type: string) => `Villa type ${type}`,
    projet: "Votre projet",
    estimer: "Voir mon estimation",
    resultatTitre: "Votre estimation",
    budgetSaisi: "Budget étudié",
    usage: "Usage envisagé",
    recap: (budget: string, usage: string) => `Budget étudié\u00a0: ${budget} · ${usage}`,
    fourchette: (min: string, max: string) => `De ${min} à ${max}`,
    prixEtudie: (montant: string) => `Prix étudié\u00a0: ${montant}`,
    champs: {
      prixMoyenNuitEUR: "Prix moyen par nuit",
      tauxOccupation: "Taux d’occupation",
      semainesUsagePersonnel: "Semaines d’usage personnel",
      loyerMensuelEUR: "Loyer mensuel estimé",
      horizonAnnees: "Horizon",
      appreciationAnnuelle: "Appréciation annuelle",
      charges: "Charges",
      coutsAnnuelsEUR: "Coûts de détention",
      imposition: "Imposition",
    },
    semaine: (n: number) => `${n} semaine${n > 1 ? "s" : ""}`,
    an: (n: number) => `${n} an${n > 1 ? "s" : ""}`,
    desRevenus: "des revenus",
    parAn: "/ an",
    attente: "En attente",
    avancees: "Hypothèses avancées",
    rendementBrut: "Rendement brut",
    plusValueBrute: "Plus-value brute",
    nuits: "Nuits louées par an",
    revenuBrut: "Revenu annuel brut",
    loyerDouze: "Loyer × 12 mois",
    valeurProjetee: (annees: number) => `Valeur projetée à ${annees} ans`,
    appreciation: "Hypothèse d’appréciation",
    neutreTitre: "Hypothèses en cours de validation",
    neutreTexte:
      "Aucun rendement n’est publié tant que les hypothèses ne sont pas confirmées par le promoteur. Recevez une analyse établie à partir de votre projet.",
    mention:
      "Hypothèses d’illustration, non contractuelles\u00a0: déplacez les curseurs pour tester les vôtres. Estimation avant charges, fiscalité et coûts réels d’exploitation.",
    courtTerme:
      "La location courte durée à Marrakech est soumise à des obligations déclaratives locales.",
    analyse: "Être rappelé pour en parler",
    compatibles: "Voir les villas compatibles",
    outil: "Simulateur de rentabilité",
    ligneMode: (mode: string) => `Mode\u00a0: ${mode}`,
    ligneType: (type: string) => `Type étudié\u00a0: ${type}`,
    ligneResultat: (titre: string, valeur: string) => `${titre}\u00a0: ${valeur}`,
    ligneNeutre: "Hypothèses en cours de validation",
  },
  contact: {
    kicker: "Conciergerie CITYSTAR",
    // Titre court : le panneau est étroit ; l'espace finale sépare les deux lignes pour les lecteurs d'écran.
    titre: ["Être ", "rappelé."] as [string, string],
    texte:
      "Laissez vos coordonnées\u00a0: un conseiller CITYSTAR vous rappelle pour répondre à vos questions, sur les plans, les prix ou une visite du domaine. À l’envoi, votre messagerie s’ouvre avec la demande prête à partir.",
    jointe: (outil: string) => `Jointe à votre demande · ${outil}`,
    retirer: "Ne pas joindre",
    nom: "Nom complet",
    telephone: "Téléphone",
    email: "E-mail",
    interet: "Votre intérêt",
    interets: [
      "Découvrir le projet",
      "Villa Type A",
      "Villa Type B",
      "Villa Type C",
      "Planifier une visite",
    ],
    envoyer: "Envoyer ma demande",
    fermer: "Fermer",
  },
  modales: {
    plan: "Plan en grand format",
    planAlt: "Plan architectural CITYSTAR en grand format",
    fermerPlan: "Fermer le plan",
  },
};

export type Textes = typeof fr;

const en: Textes = {
  nav: [
    ["Home", ""],
    ["The villas", "villas"],
    ["Gallery", "galerie"],
    ["Investing", "investir"],
    ["Questions", "faq"],
    ["Contact", "contact"],
  ],
  header: {
    acces: "Call back",
    rappelCourt: "Call back",
    conciergerie: "Concierge",
    accueil: "Back to top",
    sommaire: "Contents",
    brochure: "CITYSTAR brochure",
    poids: (mo) => `PDF · ${mo} MB`,
    demander: "Request a call back",
    fermer: "Close menu",
    menu: "Menu",
    villas: "Villas",
    galerie: "Gallery",
    questions: "Questions",
    espace: "Owner area",
    langue: "Site language",
    whatsapp: "Message the CITYSTAR concierge on WhatsApp",
  },
  hero: {
    lieu: "Private residence · Oulad Hassoune, Marrakech",
    accroche: ["Luxury villas in Marrakech,", "fourteen, not one more."],
    texte: (surface, terrain, minutes) =>
      `Up to ${surface} built on ${terrain} of land, with a private pool, ${minutes} minutes from Jemaa el-Fna.`,
    garanties: (fondsPropres) => [
      "Reservation at the notary",
      `${fondsPropres} equity-funded`,
      "Mortgages accepted",
    ],
    rendu: "3D render, not contractual",
    livraison: (mois) => `Delivery ${mois}`,
    livraisonLabel: "Delivery",
    reservation: (part) => `${part} on reservation`,
    visite: "360° tour",
    decouvrir: "Discover the villas",
    acces: "Request a call back",
    pause: "Pause the video",
    lecture: "Play the video",
    pauseCourt: "Pause",
    lectureCourt: "Play",
  },
  reperes: {
    aria: "Key facts about the estate",
    trajet: (n) => ({ valeur: `${n} min`, libelle: "Jemaa el-Fna & airport" }),
    villas: (n) => ({ valeur: String(n), libelle: "private villas, not one more" }),
    terrain: (surface) => ({ valeur: surface, libelle: "largest plot" }),
  },
  projet: {
    titre: ["The rare space", "of a private ", "life."],
    texte: [
      "A private, fully secured estate close to the Palmeraie.",
      "Three architectures for the way each resident lives.",
    ],
    vues: { entree: "The entrance", pergola: "The pergola", salon: "The living room" },
    faits: {
      villas: "private villas in a secured estate",
      terrain: "of land per villa",
      surface: "built, for the largest",
      trajet: "from Jemaa el-Fna and the airport",
    },
  },
  livraison: {
    aria: "Delivery calendar and payment plan",
    titre: (mois) => `Delivery in ${mois}.`,
    intro:
      "Construction moves forward in stages, and each one calls a share of the price. Intermediate dates and the split of the balance are being confirmed with the developer.",
    compte: (n) => (n === 0 ? "Delivery this month" : n === 1 ? "In 1 month" : `In ${n} months`),
    frise: "Construction stages",
    etapes: {
      reservation: "Reservation",
      fondations: "Foundations",
      grosOeuvre: "Structural work",
      finitions: "Finishing",
      livraison: "Handover",
    },
    signature: "Signed at the notary",
    dateAConfirmer: "Date to be confirmed",
    paiement: "The payment plan",
    part: "Share of the price",
    aConfirmer: "To be confirmed",
    notePaiement: (reste) =>
      `The reservation is signed directly at the notary. The split of the remaining ${reste} is being confirmed with the developer: your adviser will send you the detailed schedule for your villa.`,
    echeancier: "Receive the schedule",
    selection: {
      outil: "Calendar and payment",
      ligne: "Request for the detailed payment schedule",
    },
    espace: {
      texte: "Already an owner? Follow the construction progress of your villa.",
      lien: "Go to my owner area",
    },
  },
  architecture: {
    label: "Architecture",
    titre: ["Marrakech,", "another way."],
    hint: "Drag the handle, then open each point.",
    note: "Illustration, not contractual",
    curseur: "Compare the drawing and the render",
    rendu: "Render",
    dessin: "Drawing",
    altDessin: "Line drawing of a CITYSTAR villa façade",
    altRendu: "Render of the same façade, with terraces and pool",
    points: [
      { titre: "Brise-soleil", texte: "Horizontal fins filtering the light above the terrace." },
      { titre: "Upper terrace", texte: "The upper floor rooms open onto wide terraces." },
      { titre: "Glazed volumes", texte: "Large volumes opening onto the outdoors." },
      { titre: "Materials", texte: "High quality materials, to European standards." },
      { titre: "Private pool", texte: "Every villa has its own pool." },
    ],
  },
  villas: {
    label: "The villas",
    titre: ["Three expressions.", "One ", "standard."],
    intro: (n, terrain) => `Three architectures for ${n} villas, each on a ${terrain} plot.`,
    comparer: "Compare the villas",
    villa: "Villa",
    decouvrir: "Discover the villa",
    curseur: "Explore",
    decouvrirAria: (type, surface, suites, tag) =>
      `Discover villa type ${type}: ${surface}, ${suites}, ${tag.toLowerCase()}`,
    retour: "The three villas",
    onglets: "Villa types",
    typeVilla: (type) => `Villa type ${type}`,
    surface: "Built area",
    terrain: "Plot",
    configuration: "Layout",
    suites: (n) => `${n} suites`,
    plansAria: (type) => `Floor plans of villa type ${type}`,
    rdc: "Ground floor",
    etage: "Upper floor",
    agrandirPlan: (etage, type) =>
      `Enlarge the ${etage ? "upper floor" : "ground floor"} plan of villa type ${type}`,
    demander: "Call back about this villa",
    brochure: "Brochure",
    brochureAria: (type) => `Brochure for villa type ${type} (PDF)`,
    illustration: (type) => `Villa type ${type} · Illustration, not contractual`,
    prixM2: (montant) => `That is about ${montant} per built m²`,
    disponibilite: "Availability on request",
    accroches: {
      A: ["Designed for", "everyone."],
      B: ["Life on", "the terraces."],
      C: ["Volumes", "around the water."],
    },
    tags: { A: "Accessible", B: "Terraces", C: "Contemporary" },
    descriptions: {
      A: "Designed for residents with reduced mobility: lift, accessible bathrooms and generous circulation.",
      B: "Demanding architecture and high quality materials, extended by wide terraces.",
      C: "Contemporary volumes and a private pool, to the most demanding architectural standards.",
    },
  },
  prix: {
    label: "Price",
    devise: "Display currency",
    reference: (prix) => `Reference price: ${prix}`,
    contreValeur: (date) => `Indicative conversion · rate of ${date}`,
    indicatif: "Indicative price, subject to confirmation",
    indicatifCourt: "indicative price",
    surDemande: "Price on request",
    devises: {
      EUR: "Euros",
      GBP: "Pounds sterling",
      MAD: "Moroccan dirhams",
      NOK: "Norwegian kroner",
    },
  },
  vivre: {
    label: "The art of living",
    titre: "A day at CITYSTAR",
    moments: [
      {
        quand: "Morning",
        titre: "The pool, before anyone else.",
        texte: "Every villa has its private pool and outdoor spaces, away from view.",
        alt: "Private pool of a CITYSTAR villa in the morning",
      },
      {
        quand: "Afternoon",
        titre: "Light comes in everywhere.",
        texte:
          "Open volumes and high quality materials, designed for living indoors as well as out.",
        alt: "Bright living space of a CITYSTAR villa",
      },
      {
        quand: "Evening",
        titre: "Entertaining, discreetly.",
        texte: "Generous living rooms, in a villa of its own within a private estate.",
        alt: "Living room of a CITYSTAR villa in the evening",
      },
      {
        quand: "Night",
        titre: "An estate guarded day and night.",
        texte: "A private, fully secured residence close to the Palmeraie.",
        alt: "CITYSTAR villa lit at nightfall",
      },
    ],
    momentsAria: "Moments of the day",
  },
  visite: {
    label: "360° tour",
    titre: ["Step inside", "the villas."],
    texte:
      "A 360° tour of the villas, room by room. Follow the arrows from one room to the next, at your own pace.",
    etapes: ["Start the tour", "Follow the arrows from room to room", "Go full screen"],
    activer: "Start the tour",
    apercu: "360° tour · room by room",
    pleinEcran: "Full screen",
    titreIframe: "360° virtual tour of the CITYSTAR estate",
    titreModale: "360° virtual tour",
    fermer: "Close the tour",
  },
  localisation: {
    label: "Location",
    titre: ["Set apart.", "Never far."],
    lieux: {
      med: { titre: "Jemaa el-Fna square", note: (n) => `Under ${n} minutes` },
      air: { titre: "Marrakech airport", note: (n) => `Under ${n} minutes` },
      palm: { titre: "The Palmeraie", note: "Close by", mot: "Close" },
    },
    adresse: ["Marrakech-Safi region", "Marrakech prefecture", "Oulad Hassoune"],
    planMasse: "Site plan",
    schema: "Schematic map, not to scale",
    carteAria:
      "Schematic map, not to scale: CITYSTAR at Oulad Hassoune, near the Palmeraie, with the medina and Marrakech airport",
    reperes: {
      med: "Medina · Jemaa el-Fna",
      medCourt: "Medina",
      air: "Marrakech-Menara airport",
      airCourt: "Airport",
      palm: "The Palmeraie",
      palmCourt: "Palmeraie",
    },
    zoomPlus: "Zoom in",
    zoomMoins: "Zoom out",
    recentrer: "Recentre the map",
    aideLongue: "Drag to move · Ctrl + wheel to zoom",
    aideCourte: "Drag · tap a distance",
    residencePrivee: "Private residence",
    ou: "Oulad Hassoune · Marrakech",
    itineraire: "Directions",
    fermerFiche: "Close the card",
    proximite: "Nearby",
    minutes: (n) => `${n} min`,
    moinsDe: (n) => `< ${n} min`,
  },
  pages: {
    accueil: {
      titre: "CITYSTAR Marrakech — Private luxury villas",
      description: (n) =>
        `CITYSTAR, a private residence of ${n} contemporary villas in Oulad Hassoune, Marrakech, close to the Palmeraie.`,
    },
    villas: {
      titre: "The villas — CITYSTAR Marrakech",
      description:
        "Three villa types, built areas, suites, floor plans and prices: find the one that suits you.",
      kicker: "The villas",
      titreH1: ["Choosing", "your villa."],
      intro:
        "Three architectures, fourteen villas. Let a few questions guide you, then compare them.",
    },
    villa: {
      titre: (type) => `Villa type ${type} — CITYSTAR Marrakech`,
      description: (type, surface, suites) =>
        `Villa type ${type}: ${surface} built, ${suites}, floor plans and brochure.`,
    },
    galerie: {
      titre: "Gallery and tour — CITYSTAR Marrakech",
      description:
        "Renders of the estate, the detail of the architecture and the 360° aerial tour.",
      kicker: "Gallery",
      titreH1: ["The estate,", "in pictures."],
      intro: "Architect's renders of the estate and its interiors. Illustrations, not contractual.",
      legende: "CITYSTAR render",
    },
    espace: {
      titre: "Owner area — CITYSTAR",
      description:
        "The CITYSTAR owner area: the construction progress of your villa, stage by stage.",
      kicker: "Owner area",
      titreH1: ["Follow my villa,", "stage by stage."],
      intro:
        "Each owner will have personal access to follow the construction progress of their villa.",
      statut: "Area in preparation",
      statutTexte: "The owner area opens soon. Your adviser will send you your personal access.",
      demander: "Request my access",
      selection: { outil: "Owner area", ligne: "Request for access to the owner area" },
    },
    investir: {
      titre: "Investing in Marrakech — CITYSTAR",
      description:
        "What to know before investing in a villa in Marrakech, plus a gross yield simulator.",
      kicker: "Investing",
      chapeau:
        "What to know before investing in a villa in Marrakech, and a simulator to test your own assumptions.",
      titreH1: ["Investing", "in Marrakech."],
      intro: [
        "Fourteen villas, three architectures, a private estate minutes from the Palmeraie: scarcity is the first argument of the investment.",
        "Yield assumptions depend on how the villa is run and on real market conditions. The simulator below starts from illustrative values, to adjust and then confirm with the developer.",
      ],
      points: [
        {
          titre: "Short-term letting",
          texte:
            "Marrakech draws international visitors all year round. Short-term letting there is subject to local registration requirements.",
        },
        {
          titre: "Long-term letting",
          texte: "A standard lease brings steadier income, with less management and low turnover.",
        },
        {
          titre: "Resale at a horizon",
          texte:
            "Value depends on the market and on the condition of the property; no capital gain can be guaranteed.",
        },
      ],
    },
    faq: {
      suites: {
        titre: "Go further",
        plans: "See the villas and their plans",
        simulateur: "Estimate a yield",
        rappel: "Request a call back",
      },
      titre: "Frequently asked questions — CITYSTAR Marrakech",
      description:
        "Location, areas, accessibility, prices, plans, viewings: answers to the most common questions.",
      kicker: "Questions",
      titreH1: ["The questions", "we are asked."],
      intro: "An answer missing? The concierge replies directly.",
    },
    luxe: {
      titre: "Luxury villa in Marrakech — CITYSTAR",
      description:
        "Fourteen luxury villas in Oulad Hassoune, Marrakech: areas, architectures, location and how to visit.",
      kicker: "Luxury villa in Marrakech",
      titreH1: ["Buying a villa", "in Marrakech."],
      intro:
        "CITYSTAR gathers fourteen contemporary villas in a private, fully secured estate in Oulad Hassoune, close to the Palmeraie.",
      sections: [
        {
          titre: "A gated estate, not a subdivision",
          texte:
            "Fourteen villas only, each on its own plot and with its own pool. The estate is closed and guarded: scarcity is what sets the project apart from its neighbours.",
        },
        {
          titre: "Three architectures, three ways to live",
          texte:
            "Type A is designed for reduced mobility: lift and accessible bathrooms. Type B opens its rooms onto wide terraces. Type C plays contemporary volumes around the pool.",
        },
        {
          titre: "Set apart, never far",
          texte:
            "Jemaa el-Fna square and Marrakech-Menara airport are both under thirty-five minutes away, the Palmeraie close by. A 360° aerial tour places the estate before you travel.",
        },
        {
          titre: "Visit, then buy",
          texte:
            "Floor plans for each type and the brochures are downloadable. On-site viewings and purchase terms go through the concierge: an adviser calls you back and arranges the viewing.",
        },
      ],
    },
    contact: {
      titre: "Contact — CITYSTAR Marrakech",
      description:
        "Request private access, the brochure or a viewing of the CITYSTAR estate in Marrakech.",
      kicker: "Contact",
      titreH1: ["Let's talk about", "your project."],
      intro: "An adviser answers you directly: phone, WhatsApp or a call back, your choice.",
      formulaire: "Request a call back",
    },
  },
  faq: (v) => [
    {
      id: "securite",
      q: "Is buying off-plan at CITYSTAR secure?",
      r: `The reservation is signed directly at the notary, and every payment goes through the notary’s office. Construction is ${v.fondsPropres} equity-funded: it relies neither on developer loans nor on off-plan sales.`,
    },
    {
      id: "acquisition",
      q: "How does buying work?",
      r: `You reserve your villa at the notary, with ${v.acompte} of the price. The split of the balance up to handover is being confirmed with the developer; your adviser will send you the detailed schedule.`,
    },
    {
      id: "financement",
      q: "Can I buy with a mortgage?",
      r: "Yes. The developer accepts purchases financed by a bank mortgage. Your adviser will guide you through the steps with your bank.",
    },
    {
      id: "livraison",
      q: "When will the estate be delivered?",
      r: `Delivery is planned for ${v.livraison}. The dates of the intermediate construction stages are being confirmed with the developer.`,
    },
    {
      id: "villas",
      q: "How many villas does CITYSTAR have?",
      r: `${v.villas} villas in three types. Each has its own plot, up to ${v.terrain}, and its own pool.`,
    },
    {
      id: "lieu",
      q: "Where is the estate?",
      r: `In Oulad Hassoune, Marrakech prefecture, close to the Palmeraie. Jemaa el-Fna square and the airport are both under ${v.minutes} minutes away.`,
    },
    {
      id: "surfaces",
      q: "What are the areas?",
      r: `Type A: ${v.a}. Type B: ${v.b}. Type C: ${v.c}. Areas are built areas; plots are given on each villa page.`,
    },
    {
      id: "pmr",
      q: "Is one villa suited to reduced mobility?",
      r: "Yes, villa type A: lift, accessible bathrooms and generous circulation.",
    },
    {
      id: "prix",
      q: "What do the villas cost?",
      r: "Prices are given on request, together with the detailed payment schedule for the villa you are interested in. Ask an adviser to call you back.",
    },
    {
      id: "visite",
      q: "Can we visit?",
      r: "The 360° aerial tour is open online. An on-site viewing is arranged by the concierge once your access request has been reviewed.",
    },
    {
      id: "plans",
      q: "Are the floor plans available?",
      r: "Yes: ground floor and upper floor for each type, enlargeable on the site, plus a PDF brochure per villa.",
    },
  ],
  rendus: {
    alts: {
      "entree-crepuscule":
        "Entrance path of a villa, white volumes and a dark slatted pergola, palm garden",
      "entree-palmiers": "Wooden front door framed by dark slats, between two palm trees",
      "entree-portail": "Wooden front door under a slatted pergola, seen head-on",
      "ext-aerien-piscine": "High view of a two-storey villa with its pool and lawn",
      "ext-facade-crepuscule": "Low villa facade, white render and dark bands, behind a dry garden",
      "ext-facade-entree": "Villa facade and driveway, a car parked by the entrance",
      "ext-facade-jardin": "Two-storey villa seen from the garden, covered terrace and parked car",
      "ext-pergola-allee":
        "Villa with low volumes, slatted pergola over the terrace, lawn and palms",
      "ext-pergola-jour": "Terrace under a pergola of vertical slats, at the edge of the lawn",
      "ext-pergola-portrait": "Dark slatted pergola over a furnished terrace",
      "ext-piscine-crepuscule": "Corner of a two-storey villa, tall curtained windows and pool",
      "ext-piscine-jour": "Pool at the foot of a two-storey villa, balconies and sun loungers",
      "ext-piscine-soir": "Villa lit at dusk, pool and upper-floor terrace",
      "ext-terrasse-jour":
        "Outdoor lounge under an overhang, between white volumes and wood cladding",
      "ext-terrasses-cactus": "Two-storey villa and its terraces, lawn, cacti and sun loungers",
      "ext-volume-lames": "Dark volume lined with glowing slats, courtyard with a palm tree",
      "int-chambre-bois": "Bedroom with dark wood panelling, large bed and pale marble floor",
      "int-chambre-jour": "Bright bedroom, low bed and a glass wall onto the garden",
      "int-chambre-soir": "Grey-toned bedroom, bed, armchairs and dressing room",
      "int-salon":
        "Living room with a curved sofa under circular pendant lights, bonsai on the coffee table",
    },
    visionneuse: "Full-size gallery",
    agrandir: (alt) => `Enlarge: ${alt}`,
    precedente: "Previous image",
    suivante: "Next image",
    fermer: "Close the gallery",
    position: (i, n) => `${i} / ${n}`,
  },
  ruban: {
    aria: "The estate’s renders, scrolling",
    note: "Architect’s renders · illustrations not contractually binding",
    titre: ["The estate,", "in pictures."],
    galerie: "See the full gallery",
    pause: "Pause",
    lecture: "Play",
  },
  marque: {
    defilant: "CITYSTAR · FOURTEEN PRIVATE VILLAS · OULAD HASSOUNE · MARRAKECH · ",
    legende: "Oulad Hassoune · Marrakech",
    aria: "CITYSTAR, a private residence in Oulad Hassoune, Marrakech",
  },
  questions: {
    titre: ["Buying off-plan,", "with peace of mind."],
    intro: "The questions we are asked before every reservation.",
    toutes: "All questions",
  },
  engagements: {
    titre: ["Three commitments.", "Complete confidence."],
    intro: "Concrete guarantees at every stage of your purchase.",
    items: (fondsPropres) => [
      {
        titre: "A developer with a proven record",
        texte: "Property development experience already proven abroad.",
      },
      {
        titre: `${fondsPropres} equity-funded`,
        texte:
          "Construction is funded from equity: it relies neither on developer loans nor on off-plan sales.",
      },
      {
        titre: "The notary from reservation",
        texte:
          "The reservation is signed directly at the notary, and every payment goes through the notary’s office.",
      },
    ],
    cta: "Receive the dossier",
    selection: { outil: "CITYSTAR dossier", ligne: "Request for the full dossier" },
  },
  marche: {
    titre: "Marrakech is accelerating.",
    transactions: (annee) => `Transactions in Marrakech in ${annee}`,
    prix: (annee) => `Prices in Marrakech in ${annee}`,
    comparaison: (annee) => `Change in transactions in ${annee}, by city`,
    conclusion: (n) => `Demand is accelerating. At CITYSTAR, supply stops at ${n} villas.`,
    source: "Source and methodology",
    sourceTexte: (annee) =>
      `Bank Al-Maghrib and ANCFCC, real estate asset price index (IPAI): change over ${annee} in the number of transactions and in the price index, by city.`,
    sourceLien: "Read the report on the publication",
  },
  cercle: {
    titre: "A first conversation, no commitment.",
    intro: "Choose the conversation that suits you.",
    options: {
      visio: {
        titre: "Video appointment",
        texte: "A presentation of the estate and the villas, remotely.",
      },
      rappel: {
        titre: "Request a call back",
        texte: "An adviser calls you back to answer your questions.",
      },
      rendement: { titre: "Simulate my return", texte: "A first projection, to refine together." },
    },
    selection: "First conversation",
  },
  pied: {
    sceau: "PRIVATE RESIDENCE · CITYSTAR · MARRAKECH · ",
    titre: ["A direct ", "line."],
    appeler: "Call",
    whatsapp: "WhatsApp",
    conciergerie: "Concierge",
    ecrire: "Write",
    brochure: "Brochure",
    theme: ["Luxury villa in Marrakech", "luxury-villa-marrakech"],
    nav: "Footer",
    legal: (annee) => `© ${annee} CITYSTAR · Private residence · Oulad Hassoune, Marrakech`,
    instagram: "CITYSTAR on Instagram",
    realise: "Made by",
    propulse: "Powered by",
    youtube: "CITYSTAR on YouTube",
  },
  selecteur: {
    kicker: "Find my villa",
    question: (n, total) => `Question ${n} / ${total}`,
    progression: "Progress",
    recommandation: "Recommendation",
    notre: "Our recommendation",
    retour: "Back",
    clavier: "Keyboard: number keys to answer, left arrow to go back",
    recap: "Your answers",
    apercu: "Preview of the three villas",
    voirVilla: "See the villa",
    dossier: "Call back about this villa",
    prive:
      "Your answers stay on this device: they are only attached to your request if you send it.",
    recommencer: "Start again",
    comparer: "Compare with the other two",
    rendement: "Estimate the yield",
    outil: "Villa selector",
    ligneRecommandation: (type) => `Recommendation: villa ${type}`,
    conversion: "Amounts converted, indicative only",
    questions: {
      usage: {
        titre: "You are considering CITYSTAR to…",
        vivre: "Live in it",
        vivreNote: "Main or second home",
        investir: "Invest",
        investirNote: "Investment or rental",
      },
      suites: {
        titre: "How many suites would you like?",
        suites: (n) => `${n} suites`,
        peuImporte: "No preference",
      },
      budget: {
        titre: "What budget do you have in mind?",
        jusqua: (montant) => `Up to ${montant}`,
        curseur: "Your budget",
        valider: "Confirm this budget",
        parler: "Let’s talk",
        parlerNote: "In person",
      },
      pmr: {
        titre: "Do you need step-free, accessible access?",
        oui: "Yes",
        ouiNote: "Lift, accessible bathrooms",
        non: "No",
      },
    },
    raisons: {
      pmr: "Not accessible",
      suites: (n) => `${n} suites`,
      budget: "Above budget",
      autre: "Less suited",
    },
    justifications: {
      pmr: (taille) =>
        `The only villa designed for reduced mobility: lift and accessible bathrooms, ${taille}.`,
      pmrSuites: (plus) => ` It has ${plus ? "more" : "fewer"} suites than you asked for.`,
      contemporaine: (taille, exacte) =>
        `${taille}, contemporary volumes and a private pool${exacte ? " — the size you are looking for." : "."}`,
      budgetSeule: " It is the villa that fits your budget.",
      polyvalente: (taille) => `The most versatile: ${taille}, extended by wide terraces.`,
      espace: (taille) => `${taille}, extended by wide terraces — the space you are looking for.`,
      horsBudget: " Its price is above the budget you set: let’s talk about it.",
    },
  },
  comparateur: {
    kicker: "Compare",
    titre: ["What sets them ", "apart."],
    note: "Differences measured against the reference villa",
    budget: (villas) => `Within the budget entered: ${villas}`,
    aucune: "no villa",
    votreBudget: "Your budget",
    horsBudget: "Over budget",
    reference: "Reference",
    referenceAria: "Reference villa",
    prendreReference: (type) => `Use villa ${type} as the reference`,
    differences: "Differences only",
    tableauAria: "Comparison table of the three villas",
    surface: "Built area",
    surfaceCourt: ["Built", "area"],
    terrain: "Plot",
    suites: "Suites",
    pmr: ["Step-free", "access"],
    pmrOui: "Yes",
    pmrDetail: "Lift, accessible bathrooms",
    pmrNon: "Not provided",
    atout: "Character",
    plans: "Plans",
    deuxPlans: "2 plans",
    brochure: "Brochure",
    prix: "Price",
    prixIndicatif: "Indicative price",
    defiler: "Scroll to compare",
    rappel: (type) => `Call back about villa ${type}`,
    outil: "Villa comparator",
    ligneReference: (type) => `Reference villa: ${type}`,
    ligneBudget: (montant) => `Budget: ${montant}`,
    estReference: " · reference",
    suite: "suite",
  },
  rentabilite: {
    kicker: "Simulator",
    titre: ["What if the villa ", "worked?"],
    modes: { court: "Short-term let", long: "Long-term let", revente: "Resale" },
    modeAria: "Simulation mode",
    prix: "Property price",
    intro: [
      "Enter your budget and intended use, adjust the assumptions, then show the estimate, in the currency you choose.",
      "The sliders start from illustrative values: adjust them to your own plan. Final figures are confirmed by the developer.",
    ],
    budget: "Budget considered",
    typeLabel: "Villa type",
    optionnel: "optional",
    typeLibre: "I don’t know yet",
    typeVilla: (type) => `Type ${type} villa`,
    projet: "Your plan",
    estimer: "See my estimate",
    resultatTitre: "Your estimate",
    budgetSaisi: "Budget considered",
    usage: "Intended use",
    recap: (budget, usage) => `Budget considered: ${budget} · ${usage}`,
    fourchette: (min, max) => `From ${min} to ${max}`,
    prixEtudie: (montant) => `Price considered: ${montant}`,
    champs: {
      prixMoyenNuitEUR: "Average nightly rate",
      tauxOccupation: "Occupancy rate",
      semainesUsagePersonnel: "Weeks of personal use",
      loyerMensuelEUR: "Estimated monthly rent",
      horizonAnnees: "Horizon",
      appreciationAnnuelle: "Annual appreciation",
      charges: "Running costs",
      coutsAnnuelsEUR: "Holding costs",
      imposition: "Taxation",
    },
    semaine: (n) => `${n} week${n > 1 ? "s" : ""}`,
    an: (n) => `${n} year${n > 1 ? "s" : ""}`,
    desRevenus: "of income",
    parAn: "/ year",
    attente: "Pending",
    avancees: "Advanced assumptions",
    rendementBrut: "Gross yield",
    plusValueBrute: "Gross capital gain",
    nuits: "Nights let per year",
    revenuBrut: "Gross annual income",
    loyerDouze: "Rent × 12 months",
    valeurProjetee: (annees) => `Projected value at ${annees} years`,
    appreciation: "Appreciation assumption",
    neutreTitre: "Assumptions being validated",
    neutreTexte:
      "No yield is published until the assumptions are confirmed by the developer. Receive an analysis based on your own project.",
    mention:
      "Illustrative, non-contractual assumptions: move the sliders to try your own. Estimate before running costs, taxation and actual operating expenses.",
    courtTerme: "Short-term letting in Marrakech is subject to local registration requirements.",
    analyse: "Call back to discuss it",
    compatibles: "See the villas within budget",
    outil: "Yield simulator",
    ligneMode: (mode) => `Mode: ${mode}`,
    ligneType: (type) => `Type considered: ${type}`,
    ligneResultat: (titre, valeur) => `${titre}: ${valeur}`,
    ligneNeutre: "Assumptions being validated",
  },
  contact: {
    kicker: "CITYSTAR concierge",
    titre: ["Request ", "a call back."],
    texte:
      "Leave your details and a CITYSTAR adviser will call you back to answer your questions, on floor plans, prices or a visit to the estate. When you send, your email app opens with the request ready to go.",
    jointe: (outil) => `Attached to your request · ${outil}`,
    retirer: "Do not attach",
    nom: "Full name",
    telephone: "Phone",
    email: "Email",
    interet: "Your interest",
    interets: [
      "Discover the project",
      "Villa Type A",
      "Villa Type B",
      "Villa Type C",
      "Plan a viewing",
    ],
    envoyer: "Send my request",
    fermer: "Close",
  },
  modales: {
    plan: "Floor plan, enlarged",
    planAlt: "CITYSTAR architectural plan, enlarged",
    fermerPlan: "Close the plan",
  },
};

export const textes: Record<Langue, Textes> = { fr, en };
