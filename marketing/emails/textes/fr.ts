/**
 * Textes des e-mails en français. Balises (remplacées pour HubSpot à la génération) :
 * [[, prenom]] → « , Marie » si le prénom est connu, rien sinon (le préfixe suit « [[ ») ;
 * [[villa]], [[email]], [[date]], [[heure]] → propriétés du contact ;
 * [[edit:…]] → à compléter avant chaque envoi (surligné dans le modèle).
 */
const fr = {
  lieu: "Résidence privée · Marrakech",
  rendu: "Rendu 3D, non contractuel.",
  pied: {
    accroche: ["Quatorze villas.", " Pas une de plus."] as [string, string],
    lieu: (livraison: string) => `Oulad Hassoune, Marrakech · Livraison ${livraison}`,
    site: "Le site",
  },
  legal: { rendus: "Rendus 3D non contractuels.", desinscrire: "Se désinscrire" },
  raisons: {
    dossier: "Vous recevez cet e-mail parce que vous avez demandé le dossier CITYSTAR.",
    visite: "Vous recevez cet e-mail au sujet de votre rendez-vous CITYSTAR.",
    proprio: "Vous recevez cet e-mail en tant qu’acquéreur d’une villa CITYSTAR.",
  },
  signature: { salut: "À très vite,", role: "Conseiller CITYSTAR", equipe: "L’équipe CITYSTAR" },
  poids: (mo: string) => `${mo} Mo`,
  planPdf: "Plan PDF",
  suites: (n: number) => `${n} suites`,
  plainPied: "accessible de plain-pied",
  source: "Source",
  faits: {
    villas: "villas privées",
    construits: "construits, au plus",
    terrain: "de terrain par villa",
    trajet: "de Jemaa el-Fna",
  },
  d1: {
    objet: "Votre dossier CITYSTAR",
    preheader: "La brochure, les plans des trois villas, et la suite.",
    alt: "Une villa CITYSTAR au crépuscule, piscine éclairée",
    kicker: "Votre dossier",
    titre: ["Bienvenue", "à CITYSTAR[[, prenom]]."] as [string, string],
    intro:
      "Merci pour votre demande. Voici de quoi commencer dès maintenant : la brochure du domaine et les plans des trois villas.",
    brochure: "Brochure du domaine",
    planVilla: (type: string) => `Plans de la villa ${type}`,
    texte:
      "Je vous transmets personnellement les prix villa par villa, les disponibilités et l’échéancier. Pour aller plus vite, dites-moi simplement ce que vous cherchez : l’architecture qui vous attire, votre calendrier, si vous achetez pour y vivre ou pour louer.",
    bouton: "Me répondre sur WhatsApp",
    whatsapp: "Bonjour, je viens de recevoir le dossier CITYSTAR. Je souhaite recevoir les prix et les disponibilités.",
    secondaire: "Ou découvrir le domaine en ligne",
  },
  d2: {
    objet: "A, B ou C ?",
    preheader: "Trois architectures, la même exigence. Laquelle vous ressemble ?",
    kicker: "Les villas",
    titre: ["Trois architectures,", "une même exigence."] as [string, string],
    intro: (terrain: string) =>
      `Chaque villa est posée sur ${terrain} de terrain, avec sa piscine privée. Ce qui change : les volumes, le nombre de suites, la façon d’habiter la lumière.`,
    altVilla: (type: string) => `Rendu de la villa ${type}`,
    texte:
      "Le comparateur du site les met côte à côte, et un questionnaire de quatre questions vous oriente vers celle qui vous correspond.",
    bouton: "Comparer les trois villas",
  },
  d3: {
    objet: "Entrez avant qu’elle existe",
    preheader: "La visite 360°, pièce par pièce, depuis votre canapé.",
    alt: "Le salon d’une villa CITYSTAR",
    kicker: "Visite 360°",
    titre: ["Ne l’imaginez pas.", "Entrez."] as [string, string],
    intro:
      "Le salon, les suites, les terrasses, la piscine : la visite 360° vous fait passer d’une pièce à l’autre comme si vous y étiez. Sur ordinateur ou sur téléphone, en plein écran.",
    points: ["Toutes les pièces, à 360°", "Les vues depuis les terrasses", "Le jardin et la piscine privée"],
    bouton: "Lancer la visite 360°",
    secondaire: "Préférer une visite guidée en visio",
    whatsapp: "Bonjour, je souhaite une visite guidée de CITYSTAR en visio.",
  },
  d4: {
    objet: "Ce que vous payez, et quand",
    preheader: (part: string) => `${part} chez le notaire, puis le solde au rythme du chantier.`,
    kicker: "Acheter sereinement",
    titre: ["Ce que vous payez,", "et quand."] as [string, string],
    intro:
      "Acheter sur plan à l’étranger demande de la confiance. Voici comment se déroule une acquisition à CITYSTAR.",
    etapes: (part: string, livraison: string) => [
      { titre: `${part} à la réservation`, texte: "La réservation se signe directement chez le notaire, pas dans un bureau de vente." },
      { titre: "Le solde suit le chantier", texte: "Chaque appel de fonds correspond à une étape terminée : fondations, gros œuvre, finitions." },
      { titre: `La remise des clés, ${livraison}`, texte: "Le dernier versement à la livraison de votre villa." },
    ],
    encadre: (fondsPropres: string) => ({
      titre: `${fondsPropres} fonds propres`,
      texte:
        "Le promoteur finance le chantier sur ses propres fonds. Il accepte aussi les acquéreurs qui financent leur villa par crédit immobilier, et il a déjà livré des programmes à l’étranger.",
    }),
    texte: "Votre conseiller vous remet l’échéancier exact de la villa que vous choisissez.",
    bouton: "Recevoir l’échéancier de ma villa",
    whatsapp: "Bonjour, je souhaite recevoir l’échéancier détaillé d’une villa CITYSTAR.",
  },
  d5: {
    objet: "Marrakech accélère",
    preheader: (evolution: string, annee: number) =>
      `${evolution} de transactions en ${annee}, devant Rabat et Casablanca.`,
    alt: "Vue aérienne d’une villa et de sa piscine",
    kicker: "Investir",
    titre: ["Marrakech", "accélère."] as [string, string],
    intro: (annee: number, prix: string) =>
      `En ${annee}, les transactions immobilières ont progressé plus vite à Marrakech que dans les autres grandes villes du pays, pour des prix restés stables (${prix}).`,
    legende: (annee: number) =>
      `Évolution des transactions en ${annee}, indice IPAI (Bank Al-Maghrib et ANCFCC).`,
    texte: (villas: number) =>
      `La demande accélère ; à CITYSTAR, l’offre s’arrête à ${villas} villas. Le simulateur du site calcule le rendement brut d’une location saisonnière à partir de vos propres hypothèses.`,
    bouton: "Simuler mon rendement",
  },
  d6: {
    objet: "Votre chantier, depuis chez vous",
    preheader: "Avancement, photos, paiements, documents : tout dans votre espace propriétaire.",
    alt: "Façade d’une villa CITYSTAR à lames verticales",
    kicker: "Après la réservation",
    titre: ["Votre chantier,", "suivi d’où vous vivez."] as [string, string],
    intro:
      "Acheter loin de chez soi pose toujours la même question : comment savoir où en est la construction ? À CITYSTAR, chaque acquéreur reçoit un accès personnel à son espace propriétaire.",
    points: [
      "<b>L’avancement</b> de votre villa, en pourcentage, avec le mot du promoteur",
      "<b>Les photos du chantier</b>, à chaque étape",
      "<b>Vos paiements</b> : ce qui est réglé, ce qui reste, la prochaine échéance",
      "<b>Vos documents</b> : contrat, plans, appels de fonds",
    ],
    texte: "Pas de mot de passe : un lien de connexion arrive par e-mail, et vous êtes chez vous.",
    bouton: "Voir l’espace propriétaire",
  },
  d7: {
    objet: "Quatorze parcelles",
    preheader: "Les premiers acquéreurs choisissent l’emplacement.",
    kicker: "Le plan de masse",
    titre: ["Quatorze parcelles.", "Les premiers choisissent."] as [string, string],
    alt: "Plan de masse du domaine CITYSTAR",
    legende: "Plan de masse du domaine, non contractuel.",
    texte:
      "L’emplacement dans le domaine, l’orientation de la piscine, l’architecture A, B ou C : chaque réservation réduit le choix des suivants.",
    texte2:
      "Si l’une des villas vous intéresse, demandez la liste des parcelles encore disponibles : vous saurez exactement ce qu’il reste à choisir.",
    bouton: "Demander les disponibilités",
    whatsapp: "Bonjour, quelles villas CITYSTAR sont encore disponibles ?",
  },
  d8: {
    objet: "Une question rapide",
    preheader: "Une réponse en un chiffre suffit.",
    bonjour: "Bonjour[[ prenom]],",
    texte:
      "Vous avez reçu le dossier CITYSTAR il y a trois semaines, et je ne voudrais pas vous écrire pour rien. Où en est votre projet ?",
    consigne: "Répondez simplement à cet e-mail par un chiffre :",
    choix: [
      "Je veux visiter, sur place ou en visio.",
      "J’ai des questions sur le financement ou l’achat depuis l’étranger.",
      "Ce n’est pas le moment : recontactez-moi plus tard.",
    ],
    fin: "Je vous réponds rapidement, et je respecterai votre choix.",
  },
  v1: {
    objet: "Votre visite de CITYSTAR",
    preheader: "L’adresse, l’itinéraire et ce que nous verrons ensemble.",
    alt: "L’entrée du domaine CITYSTAR au crépuscule",
    kicker: "Votre rendez-vous",
    titre: ["À bientôt", "à CITYSTAR."] as [string, string],
    lieu: "Oulad Hassoune, Marrakech. Votre conseiller vous attend à l’entrée du domaine.",
    intro: "Pendant la visite, nous verrons ensemble :",
    points: [
      "Le domaine et l’emplacement des parcelles encore libres",
      "Les plans de la villa qui vous intéresse",
      "Le prix, l’échéancier et les étapes de l’achat",
    ],
    bouton: "Ouvrir l’itinéraire",
    secondaire: "Un empêchement ? Prévenez-moi sur WhatsApp",
    whatsapp: "Bonjour, je dois déplacer ma visite de CITYSTAR.",
  },
  v2: {
    objet: "À demain",
    preheader: (minutes: number) => `Rendez-vous au domaine, à ${minutes} minutes de Jemaa el-Fna.`,
    bonjour: "Bonjour[[ prenom]],",
    texte: "Je vous confirme notre rendez-vous de demain, [[heure]], au domaine CITYSTAR.",
    itineraire: "L’itinéraire jusqu’au domaine",
    distance: (minutes: number) => `, à ${minutes} minutes de Jemaa el-Fna et de l’aéroport`,
    points: ["Des chaussures confortables pour parcourir le domaine", "Vos questions : aucune n’est de trop"],
    visio:
      "Si vous êtes encore loin de Marrakech, la visite peut se faire en visio : dites-le-moi, je vous envoie le lien.",
  },
  v3: {
    objet: "Merci pour votre visite",
    preheader: "Le récapitulatif, et les trois étapes jusqu’aux clés.",
    kicker: "Après votre visite",
    titre: ["Merci pour", "votre visite."] as [string, string],
    intro:
      "C’était un plaisir de vous faire découvrir le domaine. Comme promis, voici la suite si l’une des villas vous a convaincu :",
    etapes: (part: string, livraison: string) => [
      { titre: "Vous choisissez votre villa", texte: "L’architecture, la parcelle, l’orientation. Je vous confirme sa disponibilité." },
      { titre: "Vous réservez chez le notaire", texte: `${part} du prix à la signature. Le crédit immobilier est accepté.` },
      { titre: "Vous suivez votre chantier", texte: `Depuis votre espace propriétaire, jusqu’à la remise des clés en ${livraison}.` },
    ],
    bouton: "Réserver ma villa",
    whatsapp: "Bonjour, je souhaite réserver une villa CITYSTAR.",
    secondaire: "Revoir la visite 360°",
  },
  p1: {
    objet: "Bienvenue chez vous",
    preheader: "Votre espace propriétaire est ouvert.",
    alt: "La terrasse d’une villa CITYSTAR",
    kicker: "Villa [[villa]]",
    titre: ["Bienvenue", "chez vous."] as [string, string],
    intro: "Félicitations[[, prenom]] : la villa [[villa]] est à vous. Votre espace propriétaire est ouvert dès aujourd’hui.",
    etapes: [
      { titre: "Ouvrez votre espace", texte: "Cliquez sur le bouton ci-dessous et saisissez cette adresse e-mail : [[email]]." },
      { titre: "Recevez votre lien", texte: "Un lien de connexion arrive dans votre boîte. Pas de mot de passe à retenir." },
      { titre: "Suivez votre villa", texte: "Avancement, photos du chantier, paiements et documents." },
    ],
    bouton: "Ouvrir mon espace",
  },
  p2: {
    objet: "Comment suivre votre chantier",
    preheader: "Ce que vous trouverez dans votre espace, et quand.",
    kicker: "Votre espace propriétaire",
    titre: ["Comment suivre", "votre chantier."] as [string, string],
    intro:
      "Votre villa entre dans sa phase de construction. Voici ce que vous trouverez dans votre espace, et à quel moment.",
    points: [
      "<b>À chaque étape terminée</b> : l’avancement mis à jour et les photos de votre villa",
      "<b>Avant chaque appel de fonds</b> : le montant, l’échéance, puis le reçu une fois réglé",
      "<b>À tout moment</b> : votre contrat, vos plans et vos documents, à télécharger",
    ],
    encadre: (livraison: string) => ({
      titre: `Livraison ${livraison}`,
      texte:
        "Vous recevez un e-mail à chaque nouvelle étape du chantier. Votre conseiller reste joignable sur WhatsApp pour toute question.",
    }),
    bouton: "Ouvrir mon espace",
  },
  p3: {
    objet: "Nouvelles de votre villa",
    preheader: "Une nouvelle étape est terminée. Les photos sont en ligne.",
    alt: "Photo du chantier",
    legende: "Remplacez cette image par une photo du chantier.",
    kicker: "Nouvelles du chantier",
    titre: ["[[edit:étape]],", "c’est fait."] as [string, string],
    avancement: "[[edit:avancement]] %",
    prochaine: "[[edit:prochaine étape]]",
    faits: { avancement: "des travaux", prochaine: "prochaine étape", livraison: "livraison" },
    mot: "[[edit:le mot du promoteur]]",
    texte:
      "Les nouvelles photos de votre villa sont dans votre espace, avec le prochain appel de fonds si cette étape en déclenche un.",
    bouton: "Voir les photos",
  },
  n1: {
    objet: "Le chantier avance",
    preheader: "Des nouvelles du domaine, et les villas qui restent.",
    alt: "Photo du chantier",
    legende: "Remplacez cette image par une photo du chantier.",
    kicker: "Nouvelles du domaine",
    titre: ["Le chantier", "avance."] as [string, string],
    intro: (livraison: string) =>
      `Depuis votre demande de dossier, CITYSTAR a franchi une étape : [[edit:étape]]. Les villas prennent forme, et la livraison reste prévue pour ${livraison}.`,
    restantes: "[[edit:villas restantes]]",
    faits: {
      restantes: (villas: number) => `villas encore libres sur ${villas}`,
      livraison: "livraison",
      reservation: "à la réservation",
    },
    texte:
      "Si votre projet est toujours d’actualité, c’est le bon moment pour choisir votre parcelle avant les suivants.",
    bouton: "Recevoir les disponibilités",
    whatsapp: "Bonjour, je souhaite connaître les villas CITYSTAR encore disponibles.",
    secondaire: "Revoir le domaine en ligne",
  },
};

export type Copie = typeof fr;
export default fr;
