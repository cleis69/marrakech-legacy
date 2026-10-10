import type { Langue } from "@/config/citystar";

/**
 * Textes de la page d'atterrissage « Recevoir le dossier » (publicités, liens partagés),
 * dans les six langues du site. Les chiffres viennent de la config ; ici, seulement les mots.
 */
const fr = {
  titre: "Villas de luxe à Marrakech : recevoir le dossier — CITYSTAR",
  description:
    "Quatorze villas avec piscine privée à Marrakech, livrées en août 2027. Prix villa par villa, plans, disponibilités et échéancier : recevez le dossier complet, sans engagement.",
  poids: (mo: string) => `${mo} Mo`,
  hero: {
    lieu: "Résidence privée · Oulad Hassoune, Marrakech",
    titre: (livraison: string) => ["Votre villa à Marrakech,", `livrée en ${livraison}.`] as [string, string],
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
  garantiesLabel: "Garanties",
  garanties: (fondsPropres: string) => [
    { titre: "Chez le notaire", texte: "La réservation se signe devant notaire, pas sur un coin de table." },
    { titre: `${fondsPropres} fonds propres`, texte: "Le promoteur finance le chantier sur ses propres fonds." },
    { titre: "Crédit accepté", texte: "Le promoteur accepte les acquéreurs qui financent par crédit immobilier." },
    { titre: "Déjà livré", texte: "Un promoteur qui a déjà livré des programmes à l’étranger." },
  ],
  contenu: {
    kicker: "Prix · plans · disponibilités",
    titre: ["Tout pour décider,", "en une seule demande."] as [string, string],
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
    titre: ["Votre chantier,", "suivi d’où vous vivez."] as [string, string],
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
    paiement: "Prochaine échéance",
    paiementLibelle: "Fin des fondations",
    photos: "Photos du chantier",
  },
  parcelles: {
    kicker: "Le plan de masse",
    titre: ["Quatorze parcelles.", "Les premiers choisissent."] as [string, string],
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
    titre: ["Recevez le dossier", "CITYSTAR."] as [string, string],
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

export type TextesDossier = typeof fr;

const en: TextesDossier = {
  titre: "Luxury villas in Marrakech: request the information pack — CITYSTAR",
  description:
    "Fourteen villas with private pools in Marrakech, delivered in August 2027. Prices villa by villa, floor plans, availability and payment schedule: receive the full information pack, with no commitment.",
  poids: (mo) => `${mo} MB`,
  hero: {
    lieu: "Private residence · Oulad Hassoune, Marrakech",
    titre: (livraison) => ["Your villa in Marrakech,", `delivered in ${livraison}.`],
    texte: (surface, terrain, minutes) =>
      `Up to ${surface} of living space on ${terrain} of land, private pool, ${minutes} minutes from Jemaa el-Fna.`,
    conditions: (part) =>
      `${part} on reservation, signed before a notary. The balance follows construction.`,
    demander: "Get the information pack",
    visite: "360° tour",
    rendu: "3D rendering, non-contractual",
    pause: "Pause the video",
    lecture: "Play the video",
  },
  carte: {
    titre: "The CITYSTAR pack",
    intro: "One request, no commitment:",
    elements: [
      "Prices villa by villa",
      "Current availability",
      "Floor plans of villas A, B and C",
      "Payment schedule",
      "Estate brochure",
      "Rental yield simulation",
    ],
    bouton: "Get the information pack",
    discretion: "Your details are used only to contact you about CITYSTAR.",
    brochure: (poids) => `Or download the brochure now (PDF, ${poids})`,
  },
  garantiesLabel: "Guarantees",
  garanties: (fondsPropres) => [
    { titre: "Before a notary", texte: "The reservation is signed before a notary, not on the back of an envelope." },
    { titre: `${fondsPropres} equity-funded`, texte: "The developer funds construction from its own capital." },
    { titre: "Mortgages accepted", texte: "The developer welcomes buyers who finance with a mortgage." },
    { titre: "Proven delivery", texte: "A developer that has already delivered projects abroad." },
  ],
  contenu: {
    kicker: "Prices · plans · availability",
    titre: ["Everything you need to decide,", "in a single request."],
    intro:
      "The pack gathers what a buyer usually asks for in ten messages. Floor plans and the brochure download right away; prices and availability are sent to you by an adviser.",
    elements: [
      { titre: "Prices villa by villa", texte: "The price of each of the fourteen villas, by architecture and plot." },
      { titre: "Availability", texte: "The villas still available on the date of your request." },
      { titre: "Plans of the three villas", texte: "Ground and first floor of villas A, B and C." },
      { titre: "Payment schedule", texte: "The reservation before a notary, then the balance in step with construction." },
      { titre: "Estate brochure", texte: "Architecture, materials, specifications and site plan." },
      { titre: "Rental analysis", texte: "A gross yield simulation based on your own assumptions." },
    ],
    plan: (type) => `Villa ${type}`,
    brochure: "Brochure",
    ensuite: "What happens next?",
    etapes: [
      { titre: "You request the pack.", texte: "One minute, no commitment, no automatic reservation." },
      { titre: "An adviser sends it to you.", texte: "Prices, availability, payment schedule; they answer your questions by phone, WhatsApp or video call." },
      { titre: "You visit, then decide.", texte: "On site or remotely. The reservation is signed before a notary." },
    ],
  },
  espace: {
    kicker: "After reservation",
    titre: ["Your build,", "followed from wherever you live."],
    intro:
      "Every buyer gets personal access to their owner area. Follow the construction of your villa from London, Paris or Oslo, without waiting for a call.",
    points: [
      { titre: "Progress", texte: "The share of work completed and a word from the developer, updated as construction advances." },
      { titre: "Site photos", texte: "Your villa and the estate, photographed at every stage." },
      { titre: "Your payments", texte: "What is paid, what remains, the next instalment." },
      { titre: "Your documents", texte: "Contract, plans, payment calls: all in one place." },
    ],
    legende: "Preview of the owner area, illustrative data.",
    villa: "Villa 07 · Type B",
    avancement: "Construction progress",
    paiement: "Next instalment",
    paiementLibelle: "End of foundations",
    photos: "Site photos",
  },
  parcelles: {
    kicker: "The site plan",
    titre: ["Fourteen plots.", "First come, first choice."],
    texte:
      "The position within the estate, the orientation of the pool, architecture A, B or C: each reservation narrows the choice for the next buyer. The pack lists the villas still available.",
    faits: (terrain) => [
      { valeur: terrain, label: "per plot" },
      { valeur: "3", label: "architectures" },
      { valeur: "1", label: "private estate" },
    ],
    agrandir: "Enlarge the site plan",
    legende: "Site plan of the estate, non-contractual.",
    demander: "Ask for availability",
  },
  final: {
    titre: ["Get the CITYSTAR", "information pack."],
    texte:
      "Prices villa by villa, availability, floor plans, payment schedule and rental simulation. An adviser sends it to you, with no commitment.",
    demander: "Get the information pack",
    whatsapp: "Message us on WhatsApp",
    appeler: "Call",
  },
  selection: {
    outil: "CITYSTAR information pack",
    lignes: ["Prices villa by villa", "Availability", "Floor plans", "Payment schedule", "Rental simulation"],
  },
};

const es: TextesDossier = {
  titre: "Villas de lujo en Marrakech: reciba el dossier — CITYSTAR",
  description:
    "Catorce villas con piscina privada en Marrakech, entregadas en agosto de 2027. Precio de cada villa, planos, disponibilidad y calendario de pagos: reciba el dossier completo, sin compromiso.",
  poids: (mo) => `${mo} MB`,
  hero: {
    lieu: "Residencia privada · Oulad Hassoune, Marrakech",
    titre: (livraison) => ["Su villa en Marrakech,", `entregada en ${livraison}.`],
    texte: (surface, terrain, minutes) =>
      `Hasta ${surface} construidos sobre ${terrain} de terreno, piscina privada, a ${minutes} minutos de Jemaa el-Fna.`,
    conditions: (part) => `${part} al reservar, firmado ante notario. El resto acompaña la obra.`,
    demander: "Recibir el dossier",
    visite: "Visita 360°",
    rendu: "Render 3D, no contractual",
    pause: "Pausar el vídeo",
    lecture: "Reanudar el vídeo",
  },
  carte: {
    titre: "El dossier CITYSTAR",
    intro: "En una sola solicitud, sin compromiso:",
    elements: [
      "Precio de cada villa",
      "Disponibilidad actualizada",
      "Planos de las villas A, B y C",
      "Calendario de pagos",
      "Folleto del conjunto",
      "Simulación de rentabilidad",
    ],
    bouton: "Recibir el dossier",
    discretion: "Sus datos solo se utilizan para contactarle sobre CITYSTAR.",
    brochure: (poids) => `O descargue ahora el folleto (PDF, ${poids})`,
  },
  garantiesLabel: "Garantías",
  garanties: (fondsPropres) => [
    { titre: "Ante notario", texte: "La reserva se firma ante notario, no en una servilleta." },
    { titre: `${fondsPropres} fondos propios`, texte: "El promotor financia la obra con sus propios fondos." },
    { titre: "Hipoteca aceptada", texte: "El promotor acepta compradores que financian con hipoteca." },
    { titre: "Experiencia probada", texte: "Un promotor que ya ha entregado proyectos en el extranjero." },
  ],
  contenu: {
    kicker: "Precios · planos · disponibilidad",
    titre: ["Todo para decidir,", "en una sola solicitud."],
    intro:
      "El dossier reúne lo que un comprador suele pedir en diez mensajes. Los planos y el folleto se descargan al instante; los precios y la disponibilidad se los envía un asesor.",
    elements: [
      { titre: "Precio de cada villa", texte: "El precio de cada una de las catorce villas, según su arquitectura y su parcela." },
      { titre: "Disponibilidad", texte: "Las villas todavía libres en la fecha de su solicitud." },
      { titre: "Planos de las tres villas", texte: "Planta baja y primera planta de las villas A, B y C." },
      { titre: "Calendario de pagos", texte: "La reserva ante notario y, después, el resto al ritmo de la obra." },
      { titre: "Folleto del conjunto", texte: "Arquitectura, materiales, acabados y plano general." },
      { titre: "Análisis de alquiler", texte: "Una simulación de rentabilidad bruta con sus propias hipótesis." },
    ],
    plan: (type) => `Villa ${type}`,
    brochure: "Folleto",
    ensuite: "¿Y después?",
    etapes: [
      { titre: "Solicita el dossier.", texte: "Un minuto, sin compromiso ni reserva automática." },
      { titre: "Un asesor se lo envía.", texte: "Precios, disponibilidad, calendario; responde a sus preguntas por teléfono, WhatsApp o videollamada." },
      { titre: "Visita y decide.", texte: "In situ o a distancia. La reserva se firma ante notario." },
    ],
  },
  espace: {
    kicker: "Tras la reserva",
    titre: ["Su obra,", "seguida desde donde viva."],
    intro:
      "Cada comprador recibe un acceso personal a su espacio de propietario. Siga la construcción de su villa desde Madrid, Londres u Oslo, sin esperar una llamada.",
    points: [
      { titre: "El avance", texte: "El porcentaje de obra y unas palabras del promotor, actualizados a medida que avanza." },
      { titre: "Las fotos de la obra", texte: "Su villa y el conjunto, fotografiados en cada etapa." },
      { titre: "Sus pagos", texte: "Lo pagado, lo pendiente y el próximo vencimiento." },
      { titre: "Sus documentos", texte: "Contrato, planos, solicitudes de pago: todo en un mismo lugar." },
    ],
    legende: "Vista previa del espacio de propietario, datos ilustrativos.",
    villa: "Villa 07 · Tipo B",
    avancement: "Avance de las obras",
    paiement: "Próximo vencimiento",
    paiementLibelle: "Fin de los cimientos",
    photos: "Fotos de la obra",
  },
  parcelles: {
    kicker: "El plano general",
    titre: ["Catorce parcelas.", "Los primeros eligen."],
    texte:
      "La ubicación dentro del conjunto, la orientación de la piscina, la arquitectura A, B o C: cada reserva reduce la elección de los siguientes. El dossier indica las villas que quedan.",
    faits: (terrain) => [
      { valeur: terrain, label: "por parcela" },
      { valeur: "3", label: "arquitecturas" },
      { valeur: "1", label: "conjunto privado" },
    ],
    agrandir: "Ampliar el plano general",
    legende: "Plano general del conjunto, no contractual.",
    demander: "Consultar disponibilidad",
  },
  final: {
    titre: ["Reciba el dossier", "CITYSTAR."],
    texte:
      "Precio de cada villa, disponibilidad, planos, calendario de pagos y simulación de alquiler. Un asesor se lo envía, sin compromiso.",
    demander: "Recibir el dossier",
    whatsapp: "Escribir por WhatsApp",
    appeler: "Llamar",
  },
  selection: {
    outil: "Dossier CITYSTAR",
    lignes: ["Precio de cada villa", "Disponibilidad", "Planos", "Calendario de pagos", "Simulación de alquiler"],
  },
};

const it: TextesDossier = {
  titre: "Ville di lusso a Marrakech: richieda il dossier — CITYSTAR",
  description:
    "Quattordici ville con piscina privata a Marrakech, consegnate ad agosto 2027. Prezzo villa per villa, planimetrie, disponibilità e piano dei pagamenti: riceva il dossier completo, senza impegno.",
  poids: (mo) => `${mo} MB`,
  hero: {
    lieu: "Residenza privata · Oulad Hassoune, Marrakech",
    titre: (livraison) => ["La sua villa a Marrakech,", `consegnata in ${livraison}.`],
    texte: (surface, terrain, minutes) =>
      `Fino a ${surface} costruiti su ${terrain} di terreno, piscina privata, a ${minutes} minuti da Jemaa el-Fna.`,
    conditions: (part) => `${part} alla prenotazione, firmata dal notaio. Il saldo segue il cantiere.`,
    demander: "Ricevi il dossier",
    visite: "Tour 360°",
    rendu: "Render 3D, non contrattuale",
    pause: "Metti in pausa il video",
    lecture: "Riprendi il video",
  },
  carte: {
    titre: "Il dossier CITYSTAR",
    intro: "Con una sola richiesta, senza impegno:",
    elements: [
      "Prezzo villa per villa",
      "Disponibilità aggiornate",
      "Planimetrie delle ville A, B e C",
      "Piano dei pagamenti",
      "Brochure del complesso",
      "Simulazione di rendimento",
    ],
    bouton: "Ricevi il dossier",
    discretion: "I suoi dati servono solo per ricontattarla riguardo a CITYSTAR.",
    brochure: (poids) => `Oppure scarichi subito la brochure (PDF, ${poids})`,
  },
  garantiesLabel: "Garanzie",
  garanties: (fondsPropres) => [
    { titre: "Dal notaio", texte: "La prenotazione si firma davanti al notaio, non su un tovagliolo." },
    { titre: `${fondsPropres} fondi propri`, texte: "Il promotore finanzia il cantiere con fondi propri." },
    { titre: "Mutuo accettato", texte: "Il promotore accetta acquirenti che finanziano con un mutuo." },
    { titre: "Già consegnato", texte: "Un promotore che ha già consegnato progetti all’estero." },
  ],
  contenu: {
    kicker: "Prezzi · planimetrie · disponibilità",
    titre: ["Tutto per decidere,", "con una sola richiesta."],
    intro:
      "Il dossier riunisce ciò che un acquirente chiede di solito in dieci messaggi. Planimetrie e brochure si scaricano subito; prezzi e disponibilità le vengono inviati da un consulente.",
    elements: [
      { titre: "Prezzo villa per villa", texte: "Il prezzo di ciascuna delle quattordici ville, secondo architettura e lotto." },
      { titre: "Disponibilità", texte: "Le ville ancora libere alla data della sua richiesta." },
      { titre: "Planimetrie delle tre ville", texte: "Piano terra e primo piano delle ville A, B e C." },
      { titre: "Piano dei pagamenti", texte: "La prenotazione dal notaio, poi il saldo al ritmo del cantiere." },
      { titre: "Brochure del complesso", texte: "Architettura, materiali, finiture e planimetria generale." },
      { titre: "Analisi locativa", texte: "Una simulazione di rendimento lordo basata sulle sue ipotesi." },
    ],
    plan: (type) => `Villa ${type}`,
    brochure: "Brochure",
    ensuite: "E poi?",
    etapes: [
      { titre: "Richiede il dossier.", texte: "Un minuto, senza impegno né prenotazione automatica." },
      { titre: "Un consulente glielo invia.", texte: "Prezzi, disponibilità, piano dei pagamenti; risponde alle sue domande per telefono, WhatsApp o videochiamata." },
      { titre: "Visita, poi decide.", texte: "Sul posto o a distanza. La prenotazione si firma dal notaio." },
    ],
  },
  espace: {
    kicker: "Dopo la prenotazione",
    titre: ["Il suo cantiere,", "seguito da dove vive."],
    intro:
      "Ogni acquirente riceve un accesso personale alla propria area proprietario. Segue la costruzione della villa da Milano, Londra o Oslo, senza aspettare una telefonata.",
    points: [
      { titre: "L’avanzamento", texte: "La percentuale dei lavori e una parola del promotore, aggiornate man mano." },
      { titre: "Le foto del cantiere", texte: "La sua villa e il complesso, fotografati a ogni fase." },
      { titre: "I suoi pagamenti", texte: "Ciò che è pagato, ciò che resta, la prossima scadenza." },
      { titre: "I suoi documenti", texte: "Contratto, planimetrie, richieste di pagamento: tutto in un unico posto." },
    ],
    legende: "Anteprima dell’area proprietario, dati illustrativi.",
    villa: "Villa 07 · Tipo B",
    avancement: "Avanzamento dei lavori",
    paiement: "Prossima scadenza",
    paiementLibelle: "Fine delle fondazioni",
    photos: "Foto del cantiere",
  },
  parcelles: {
    kicker: "La planimetria generale",
    titre: ["Quattordici lotti.", "Chi arriva prima sceglie."],
    texte:
      "La posizione nel complesso, l’orientamento della piscina, l’architettura A, B o C: ogni prenotazione riduce la scelta di chi viene dopo. Il dossier indica le ville rimaste.",
    faits: (terrain) => [
      { valeur: terrain, label: "per lotto" },
      { valeur: "3", label: "architetture" },
      { valeur: "1", label: "complesso privato" },
    ],
    agrandir: "Ingrandisci la planimetria",
    legende: "Planimetria generale del complesso, non contrattuale.",
    demander: "Chiedi le disponibilità",
  },
  final: {
    titre: ["Riceva il dossier", "CITYSTAR."],
    texte:
      "Prezzo villa per villa, disponibilità, planimetrie, piano dei pagamenti e simulazione locativa. Un consulente glielo invia, senza impegno.",
    demander: "Ricevi il dossier",
    whatsapp: "Ci scriva su WhatsApp",
    appeler: "Chiama",
  },
  selection: {
    outil: "Dossier CITYSTAR",
    lignes: ["Prezzo villa per villa", "Disponibilità", "Planimetrie", "Piano dei pagamenti", "Simulazione locativa"],
  },
};

const nl: TextesDossier = {
  titre: "Luxe villa’s in Marrakech: vraag het informatiepakket aan — CITYSTAR",
  description:
    "Veertien villa’s met privézwembad in Marrakech, oplevering augustus 2027. Prijs per villa, plattegronden, beschikbaarheid en betalingsschema: ontvang het volledige informatiepakket, vrijblijvend.",
  poids: (mo) => `${mo} MB`,
  hero: {
    lieu: "Privédomein · Oulad Hassoune, Marrakech",
    titre: (livraison) => ["Uw villa in Marrakech,", `opgeleverd in ${livraison}.`],
    texte: (surface, terrain, minutes) =>
      `Tot ${surface} woonoppervlak op ${terrain} grond, privézwembad, op ${minutes} minuten van Jemaa el-Fna.`,
    conditions: (part) => `${part} bij reservering, getekend bij de notaris. Het saldo volgt de bouw.`,
    demander: "Ontvang het informatiepakket",
    visite: "360°-rondleiding",
    rendu: "3D-impressie, niet contractueel",
    pause: "Video pauzeren",
    lecture: "Video hervatten",
  },
  carte: {
    titre: "Het CITYSTAR-pakket",
    intro: "Eén aanvraag, vrijblijvend:",
    elements: [
      "Prijs per villa",
      "Actuele beschikbaarheid",
      "Plattegronden van villa A, B en C",
      "Betalingsschema",
      "Brochure van het domein",
      "Simulatie van het huurrendement",
    ],
    bouton: "Ontvang het informatiepakket",
    discretion: "Uw gegevens worden alleen gebruikt om contact met u op te nemen over CITYSTAR.",
    brochure: (poids) => `Of download de brochure nu (pdf, ${poids})`,
  },
  garantiesLabel: "Garanties",
  garanties: (fondsPropres) => [
    { titre: "Bij de notaris", texte: "De reservering wordt bij de notaris getekend, niet op een bierviltje." },
    { titre: `${fondsPropres} eigen middelen`, texte: "De ontwikkelaar financiert de bouw met eigen middelen." },
    { titre: "Hypotheek welkom", texte: "De ontwikkelaar accepteert kopers die met een hypotheek financieren." },
    { titre: "Al opgeleverd", texte: "Een ontwikkelaar die al projecten in het buitenland heeft opgeleverd." },
  ],
  contenu: {
    kicker: "Prijzen · plattegronden · beschikbaarheid",
    titre: ["Alles om te beslissen,", "in één aanvraag."],
    intro:
      "Het pakket bundelt wat een koper normaal in tien berichten vraagt. Plattegronden en brochure downloadt u meteen; prijzen en beschikbaarheid stuurt een adviseur u toe.",
    elements: [
      { titre: "Prijs per villa", texte: "De prijs van elk van de veertien villa’s, naar architectuur en kavel." },
      { titre: "Beschikbaarheid", texte: "De villa’s die nog vrij zijn op de datum van uw aanvraag." },
      { titre: "Plattegronden van de drie villa’s", texte: "Begane grond en verdieping van villa A, B en C." },
      { titre: "Betalingsschema", texte: "De reservering bij de notaris, daarna het saldo in het tempo van de bouw." },
      { titre: "Brochure van het domein", texte: "Architectuur, materialen, afwerking en situatietekening." },
      { titre: "Verhuuranalyse", texte: "Een simulatie van het bruto rendement op basis van uw eigen aannames." },
    ],
    plan: (type) => `Villa ${type}`,
    brochure: "Brochure",
    ensuite: "En dan?",
    etapes: [
      { titre: "U vraagt het pakket aan.", texte: "Eén minuut, vrijblijvend en zonder automatische reservering." },
      { titre: "Een adviseur stuurt het u toe.", texte: "Prijzen, beschikbaarheid, betalingsschema; hij beantwoordt uw vragen per telefoon, WhatsApp of videogesprek." },
      { titre: "U bezoekt en beslist.", texte: "Ter plaatse of op afstand. De reservering wordt bij de notaris getekend." },
    ],
  },
  espace: {
    kicker: "Na de reservering",
    titre: ["Uw bouw,", "gevolgd waar u ook woont."],
    intro:
      "Elke koper krijgt persoonlijke toegang tot zijn eigenaarsomgeving. U volgt de bouw van uw villa vanuit Amsterdam, Londen of Oslo, zonder op een telefoontje te wachten.",
    points: [
      { titre: "De voortgang", texte: "Het percentage van de werken en een woord van de ontwikkelaar, bijgewerkt naarmate de bouw vordert." },
      { titre: "Bouwfoto’s", texte: "Uw villa en het domein, gefotografeerd bij elke fase." },
      { titre: "Uw betalingen", texte: "Wat betaald is, wat nog openstaat, de volgende termijn." },
      { titre: "Uw documenten", texte: "Contract, plattegronden, betalingsverzoeken: alles op één plek." },
    ],
    legende: "Voorbeeld van de eigenaarsomgeving, illustratieve gegevens.",
    villa: "Villa 07 · Type B",
    avancement: "Voortgang van de bouw",
    paiement: "Volgende termijn",
    paiementLibelle: "Einde fundering",
    photos: "Bouwfoto’s",
  },
  parcelles: {
    kicker: "De situatietekening",
    titre: ["Veertien kavels.", "Wie eerst komt, kiest eerst."],
    texte:
      "De plek in het domein, de oriëntatie van het zwembad, architectuur A, B of C: elke reservering beperkt de keuze voor wie volgt. Het pakket vermeldt welke villa’s nog vrij zijn.",
    faits: (terrain) => [
      { valeur: terrain, label: "per kavel" },
      { valeur: "3", label: "architecturen" },
      { valeur: "1", label: "privédomein" },
    ],
    agrandir: "Situatietekening vergroten",
    legende: "Situatietekening van het domein, niet contractueel.",
    demander: "Beschikbaarheid opvragen",
  },
  final: {
    titre: ["Ontvang het", "CITYSTAR-pakket."],
    texte:
      "Prijs per villa, beschikbaarheid, plattegronden, betalingsschema en huursimulatie. Een adviseur stuurt het u vrijblijvend toe.",
    demander: "Ontvang het informatiepakket",
    whatsapp: "Stuur een WhatsApp",
    appeler: "Bellen",
  },
  selection: {
    outil: "CITYSTAR-informatiepakket",
    lignes: ["Prijs per villa", "Beschikbaarheid", "Plattegronden", "Betalingsschema", "Huursimulatie"],
  },
};

const no: TextesDossier = {
  titre: "Luksusvillaer i Marrakech: be om salgsoppgaven — CITYSTAR",
  description:
    "Fjorten villaer med privat basseng i Marrakech, ferdigstilt i august 2027. Pris per villa, plantegninger, ledighet og betalingsplan: få hele salgsoppgaven, helt uforpliktende.",
  poids: (mo) => `${mo} MB`,
  hero: {
    lieu: "Privat boligområde · Oulad Hassoune, Marrakech",
    titre: (livraison) => ["Din villa i Marrakech,", `ferdig i ${livraison}.`],
    texte: (surface, terrain, minutes) =>
      `Opptil ${surface} boareal på ${terrain} tomt, privat basseng, ${minutes} minutter fra Jemaa el-Fna.`,
    conditions: (part) =>
      `${part} ved reservasjon, signert hos notarius. Resten betales i takt med byggingen.`,
    demander: "Få salgsoppgaven",
    visite: "360°-visning",
    rendu: "3D-illustrasjon, ikke bindende",
    pause: "Sett videoen på pause",
    lecture: "Spill av videoen",
  },
  carte: {
    titre: "Salgsoppgaven for CITYSTAR",
    intro: "Én forespørsel, uforpliktende:",
    elements: [
      "Pris per villa",
      "Oppdatert ledighet",
      "Plantegninger for villa A, B og C",
      "Betalingsplan",
      "Brosjyre for området",
      "Simulering av leieavkastning",
    ],
    bouton: "Få salgsoppgaven",
    discretion: "Opplysningene dine brukes bare til å kontakte deg om CITYSTAR.",
    brochure: (poids) => `Eller last ned brosjyren nå (PDF, ${poids})`,
  },
  garantiesLabel: "Garantier",
  garanties: (fondsPropres) => [
    { titre: "Hos notarius", texte: "Reservasjonen signeres hos notarius, ikke på en serviett." },
    { titre: `${fondsPropres} egenkapital`, texte: "Utbyggeren finansierer byggingen med egne midler." },
    { titre: "Boliglån godtas", texte: "Utbyggeren tar imot kjøpere som finansierer med boliglån." },
    { titre: "Har levert før", texte: "En utbygger som allerede har levert prosjekter i utlandet." },
  ],
  contenu: {
    kicker: "Priser · tegninger · ledighet",
    titre: ["Alt du trenger for å bestemme deg,", "i én forespørsel."],
    intro:
      "Salgsoppgaven samler det en kjøper vanligvis spør om i ti meldinger. Tegninger og brosjyre lastes ned med en gang; priser og ledighet får du tilsendt av en rådgiver.",
    elements: [
      { titre: "Pris per villa", texte: "Prisen på hver av de fjorten villaene, etter arkitektur og tomt." },
      { titre: "Ledighet", texte: "Villaene som fortsatt er ledige på datoen for forespørselen din." },
      { titre: "Tegninger av de tre villaene", texte: "1. og 2. etasje i villa A, B og C." },
      { titre: "Betalingsplan", texte: "Reservasjonen hos notarius, deretter resten i takt med byggingen." },
      { titre: "Brosjyre for området", texte: "Arkitektur, materialer, standard og situasjonsplan." },
      { titre: "Utleieanalyse", texte: "En simulering av brutto avkastning ut fra dine egne forutsetninger." },
    ],
    plan: (type) => `Villa ${type}`,
    brochure: "Brosjyre",
    ensuite: "Hva skjer så?",
    etapes: [
      { titre: "Du ber om salgsoppgaven.", texte: "Ett minutt, uforpliktende og uten automatisk reservasjon." },
      { titre: "En rådgiver sender den til deg.", texte: "Priser, ledighet, betalingsplan; rådgiveren svarer på spørsmålene dine på telefon, WhatsApp eller video." },
      { titre: "Du besøker, og bestemmer deg.", texte: "På stedet eller på avstand. Reservasjonen signeres hos notarius." },
    ],
  },
  espace: {
    kicker: "Etter reservasjonen",
    titre: ["Byggingen din,", "fulgt fra der du bor."],
    intro:
      "Hver kjøper får personlig tilgang til sin egen eierside. Du følger byggingen av villaen fra Oslo, Bergen eller London, uten å vente på en telefon.",
    points: [
      { titre: "Fremdriften", texte: "Hvor langt arbeidet har kommet, og et ord fra utbyggeren, oppdatert underveis." },
      { titre: "Bilder fra byggeplassen", texte: "Villaen din og området, fotografert ved hver etappe." },
      { titre: "Betalingene dine", texte: "Hva som er betalt, hva som gjenstår, neste forfall." },
      { titre: "Dokumentene dine", texte: "Kontrakt, tegninger, betalingsvarsler: alt på ett sted." },
    ],
    legende: "Forhåndsvisning av eiersiden, illustrerende data.",
    villa: "Villa 07 · Type B",
    avancement: "Fremdrift i byggingen",
    paiement: "Neste forfall",
    paiementLibelle: "Ferdig fundament",
    photos: "Bilder fra byggeplassen",
  },
  parcelles: {
    kicker: "Situasjonsplanen",
    titre: ["Fjorten tomter.", "De første velger."],
    texte:
      "Plasseringen i området, bassengets retning, arkitektur A, B eller C: hver reservasjon begrenser valget for de neste. Salgsoppgaven viser hvilke villaer som er igjen.",
    faits: (terrain) => [
      { valeur: terrain, label: "per tomt" },
      { valeur: "3", label: "arkitekturer" },
      { valeur: "1", label: "privat område" },
    ],
    agrandir: "Forstørr situasjonsplanen",
    legende: "Situasjonsplan for området, ikke bindende.",
    demander: "Spør om ledighet",
  },
  final: {
    titre: ["Få salgsoppgaven", "for CITYSTAR."],
    texte:
      "Pris per villa, ledighet, tegninger, betalingsplan og leiesimulering. En rådgiver sender den til deg, helt uforpliktende.",
    demander: "Få salgsoppgaven",
    whatsapp: "Skriv på WhatsApp",
    appeler: "Ring",
  },
  selection: {
    outil: "Salgsoppgave CITYSTAR",
    lignes: ["Pris per villa", "Ledighet", "Tegninger", "Betalingsplan", "Leiesimulering"],
  },
};

export const textesDossier: Record<Langue, TextesDossier> = { fr, en, es, it, nl, no };
