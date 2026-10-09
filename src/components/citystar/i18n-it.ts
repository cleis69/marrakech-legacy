import type { Textes } from "./i18n";

/** Italiano. */
export const it: Textes = {
  nav: [
    ["Home", ""],
    ["Le ville", "villas"],
    ["Galleria", "galerie"],
    ["Investire", "investir"],
    ["Domande", "faq"],
    ["Contatti", "contact"],
  ],
  header: {
    acces: "Richiamatemi",
    rappelCourt: "Richiamata",
    conciergerie: "Concierge",
    accueil: "Torna all’inizio",
    sommaire: "Indice",
    brochure: "Brochure CITYSTAR",
    poids: (mo) => `PDF · ${mo} MB`,
    demander: "Richiedere una richiamata",
    fermer: "Chiudi il menu",
    menu: "Menu",
    villas: "Ville",
    galerie: "Galleria",
    questions: "Domande",
    espace: "La mia area",
    langue: "Lingua del sito",
    whatsapp: "Scrivere al concierge CITYSTAR su WhatsApp",
  },
  hero: {
    lieu: "Residenza privata · Oulad Hassoune, Marrakech",
    accroche: ["Ville di lusso a Marrakech,", "quattordici, non una di più."],
    texte: (surface, terrain, minutes) =>
      `Fino a ${surface} costruiti su ${terrain} di terreno, piscina privata, a ${minutes} minuti da Jemaa el-Fna.`,
    garanties: (fondsPropres) => [
      "Prenotazione dal notaio",
      `${fondsPropres} fondi propri`,
      "Mutuo accettato",
    ],
    rendu: "Render 3D, non contrattuale",
    livraison: (mois) => `Consegna ${mois}`,
    livraisonLabel: "Consegna",
    reservation: (part) => `${part} alla prenotazione`,
    visite: "Visita 360°",
    decouvrir: "Scoprire le ville",
    acces: "Richiedere una richiamata",
    pause: "Mettere in pausa il video",
    lecture: "Riprendere il video",
    pauseCourt: "Pausa",
    lectureCourt: "Riproduci",
  },
  reperes: {
    aria: "I numeri chiave della tenuta",
    trajet: (n) => ({ valeur: `${n} min`, libelle: "Jemaa el-Fna e aeroporto" }),
    villas: (n) => ({ valeur: String(n), libelle: "ville private, non una di più" }),
    terrain: (surface) => ({ valeur: surface, libelle: "di terreno, il lotto più grande" }),
  },
  projet: {
    titre: ["Lo spazio raro", "di una vita ", "privata."],
    texte: [
      "Una tenuta privata e interamente protetta, vicino alla Palmeraie.",
      "Tre architetture per il modo di vivere di ogni residente.",
    ],
    vues: { entree: "L’ingresso", pergola: "La pergola", salon: "Il soggiorno" },
    faits: {
      villas: "ville private in una tenuta protetta",
      terrain: "di terreno per villa",
      surface: "costruiti, nella villa più grande",
      trajet: "da Jemaa el-Fna e dall’aeroporto",
    },
  },
  livraison: {
    aria: "Calendario di consegna e piano dei pagamenti",
    titre: (mois) => `Consegna a ${mois}.`,
    intro:
      "Il cantiere procede per fasi, e ognuna richiede il pagamento di una parte del prezzo. Le date intermedie e la ripartizione del saldo sono in corso di convalida con il promotore.",
    compte: (n) => (n === 0 ? "Consegna questo mese" : n === 1 ? "Tra 1 mese" : `Tra ${n} mesi`),
    frise: "Le fasi del cantiere",
    etapes: {
      reservation: "Prenotazione",
      fondations: "Fondazioni",
      grosOeuvre: "Struttura",
      finitions: "Finiture",
      livraison: "Consegna delle chiavi",
    },
    signature: "Firma dal notaio",
    dateAConfirmer: "Data da confermare",
    paiement: "Il piano dei pagamenti",
    part: "Quota del prezzo",
    aConfirmer: "Da confermare",
    notePaiement: (reste) =>
      `La prenotazione si firma direttamente dal notaio. La ripartizione del ${reste} restante è in corso di convalida con il promotore: il suo consulente le invierà il piano dettagliato della sua villa.`,
    echeancier: "Ricevere il piano dei pagamenti",
    selection: {
      outil: "Calendario e pagamenti",
      ligne: "Richiesta del piano dei pagamenti dettagliato",
    },
    espace: {
      texte: "È già proprietario? Segua l’avanzamento dei lavori della sua villa.",
      lien: "Accedere alla mia area",
    },
  },
  architecture: {
    label: "Architettura",
    titre: ["Marrakech,", "in un altro modo."],
    hint: "Trascini il cursore, poi apra ogni punto.",
    note: "Illustrazione non contrattuale",
    curseur: "Confrontare il disegno e il render",
    rendu: "Render",
    dessin: "Disegno",
    altDessin: "Disegno al tratto della facciata di una villa CITYSTAR",
    altRendu: "Render della stessa facciata, con terrazze e piscina",
    points: [
      { titre: "Frangisole", texte: "Lamelle orizzontali che filtrano la luce sopra la terrazza." },
      { titre: "Terrazza al piano", texte: "Le stanze del piano si aprono su ampie terrazze." },
      { titre: "Volumi vetrati", texte: "Grandi volumi aperti sull’esterno." },
      { titre: "Materiali", texte: "Materiali di alta qualità, secondo standard europei." },
      { titre: "Piscina privata", texte: "Ogni villa ha la propria piscina." },
    ],
  },
  villas: {
    label: "Le ville",
    titre: ["Tre espressioni.", "Una stessa ", "esigenza."],
    intro: (n, terrain) => `Tre architetture per ${n} ville, ognuna su un lotto di ${terrain}.`,
    comparer: "Confrontare le ville",
    villa: "Villa",
    decouvrir: "Scoprire la villa",
    curseur: "Esplora",
    decouvrirAria: (type, surface, suites, tag) =>
      `Scoprire la villa tipo ${type}: ${surface}, ${suites}, ${tag.toLowerCase()}`,
    retour: "Le tre ville",
    onglets: "Tipi di villa",
    typeVilla: (type) => `Villa tipo ${type}`,
    surface: "Superficie costruita",
    terrain: "Terreno",
    configuration: "Distribuzione",
    suites: (n) => `${n} suite`,
    plansAria: (type) => `Planimetrie della villa tipo ${type}`,
    rdc: "Piano terra",
    etage: "Primo piano",
    agrandirPlan: (etage, type) =>
      `Ingrandire la planimetria del ${etage ? "primo piano" : "piano terra"} della villa tipo ${type}`,
    demander: "Richiamatemi per questa villa",
    brochure: "Brochure",
    brochureAria: (type) => `Brochure della villa tipo ${type} (PDF)`,
    illustration: (type) => `Villa tipo ${type} · Illustrazione non contrattuale`,
    prixM2: (montant) => `Cioè circa ${montant} per m² costruito`,
    disponibilite: "Disponibilità su richiesta",
    accroches: {
      A: ["Pensata per", "tutti."],
      B: ["La vita sulle", "terrazze."],
      C: ["Volumi", "intorno all’acqua."],
    },
    tags: { A: "Accessibile", B: "Terrazze", C: "Contemporanea" },
    descriptions: {
      A: "Pensata per i residenti a mobilità ridotta: ascensore, bagni accessibili e percorsi ampi.",
      B: "Un’architettura esigente e materiali di alta qualità, prolungati da ampie terrazze.",
      C: "Volumi contemporanei e una piscina privata, secondo gli standard architettonici più esigenti.",
    },
  },
  prix: {
    label: "Prezzo",
    devise: "Valuta di visualizzazione",
    reference: (prix) => `Prezzo di riferimento: ${prix}`,
    contreValeur: (date) => `Controvalore indicativo · cambio del ${date}`,
    indicatif: "Prezzo indicativo, soggetto a conferma",
    indicatifCourt: "prezzo indicativo",
    surDemande: "Prezzo su richiesta",
    devises: {
      EUR: "Euro",
      GBP: "Sterline",
      MAD: "Dirham marocchini",
      NOK: "Corone norvegesi",
    },
  },
  vivre: {
    label: "L’arte di vivere",
    titre: "Una giornata a CITYSTAR",
    moments: [
      {
        quand: "Mattino",
        titre: "La piscina, prima di tutti.",
        texte:
          "Ogni villa ha la sua piscina privata e i suoi spazi esterni, al riparo dagli sguardi.",
        alt: "Piscina privata di una villa CITYSTAR al mattino",
      },
      {
        quand: "Pomeriggio",
        titre: "La luce entra ovunque.",
        texte: "Volumi aperti e materiali di alta qualità, pensati per vivere dentro come fuori.",
        alt: "Spazio luminoso di una villa CITYSTAR",
      },
      {
        quand: "Sera",
        titre: "Ricevere, con discrezione.",
        texte: "Soggiorni generosi, in una villa indipendente all’interno di una tenuta privata.",
        alt: "Soggiorno di una villa CITYSTAR la sera",
      },
      {
        quand: "Notte",
        titre: "Una tenuta sorvegliata giorno e notte.",
        texte: "Una residenza privata e interamente protetta, vicino alla Palmeraie.",
        alt: "Villa CITYSTAR illuminata al calar della notte",
      },
    ],
    momentsAria: "I momenti della giornata",
  },
  visite: {
    label: "Visita 360°",
    titre: ["Entrate nelle", "ville."],
    texte:
      "Una visita a 360° delle ville, stanza per stanza. Segua le frecce da una stanza all’altra, al suo ritmo.",
    etapes: [
      "Attivare la visita",
      "Seguire le frecce da una stanza all’altra",
      "Passare a schermo intero",
    ],
    activer: "Attivare la visita",
    apercu: "Visita 360° · stanza per stanza",
    pleinEcran: "Schermo intero",
    titreIframe: "Visita virtuale a 360° della tenuta CITYSTAR",
    titreModale: "Visita virtuale 360°",
    fermer: "Chiudere la visita",
  },
  localisation: {
    label: "Posizione",
    titre: ["In disparte.", "Mai lontano."],
    lieux: {
      med: { titre: "Piazza Jemaa el-Fna", note: (n) => `A meno di ${n} minuti` },
      air: { titre: "Aeroporto di Marrakech", note: (n) => `A meno di ${n} minuti` },
      palm: { titre: "La Palmeraie", note: "Vicinissima", mot: "Vicina" },
    },
    adresse: ["Regione Marrakech-Safi", "Prefettura di Marrakech", "Oulad Hassoune"],
    planMasse: "Planimetria generale",
    schema: "Mappa schematica, non in scala",
    carteAria:
      "Mappa schematica, non in scala: CITYSTAR a Oulad Hassoune, vicino alla Palmeraie, con la medina e l’aeroporto di Marrakech",
    reperes: {
      med: "Medina · Jemaa el-Fna",
      medCourt: "Medina",
      air: "Aeroporto Marrakech-Menara",
      airCourt: "Aeroporto",
      palm: "La Palmeraie",
      palmCourt: "Palmeraie",
    },
    zoomPlus: "Ingrandire",
    zoomMoins: "Ridurre",
    recentrer: "Ricentrare la mappa",
    aideLongue: "Trascinare per spostare · Ctrl + rotellina per lo zoom",
    aideCourte: "Trascinare · toccare una distanza",
    residencePrivee: "Residenza privata",
    ou: "Oulad Hassoune · Marrakech",
    itineraire: "Indicazioni",
    fermerFiche: "Chiudere la scheda",
    proximite: "Vicino",
    minutes: (n) => `${n} min`,
    moinsDe: (n) => `< ${n} min`,
  },
  pages: {
    accueil: {
      titre: "CITYSTAR Marrakech — Ville di lusso private",
      description: (n) =>
        `CITYSTAR, una residenza privata di ${n} ville contemporanee a Oulad Hassoune, Marrakech, vicino alla Palmeraie.`,
    },
    villas: {
      titre: "Le ville — CITYSTAR Marrakech",
      description:
        "Tre tipi di villa, superfici, suite, planimetrie e prezzi: trovi quella che fa per lei.",
      kicker: "Le ville",
      titreH1: ["Scegliere", "la propria villa."],
      intro:
        "Tre architetture, quattordici ville. Si lasci guidare da poche domande, poi le confronti.",
    },
    villa: {
      titre: (type) => `Villa tipo ${type} — CITYSTAR Marrakech`,
      description: (type, surface, suites) =>
        `Villa tipo ${type}: ${surface} costruiti, ${suites}, planimetrie e brochure.`,
    },
    galerie: {
      titre: "Galleria e visita — CITYSTAR Marrakech",
      description: "Render della tenuta, il dettaglio dell’architettura e la visita a 360°.",
      kicker: "Galleria",
      titreH1: ["La tenuta,", "per immagini."],
      intro: "Render d’architetto della tenuta e dei suoi interni. Illustrazioni non contrattuali.",
      legende: "Render CITYSTAR",
    },
    espace: {
      titre: "La mia area proprietario — CITYSTAR",
      description:
        "L’area dei proprietari CITYSTAR: l’avanzamento dei lavori della sua villa, fase dopo fase.",
      kicker: "La mia area",
      titreH1: ["Seguire la mia villa,", "fase dopo fase."],
      intro:
        "Il suo accesso personale per seguire la costruzione della villa: fasi, foto del cantiere, pagamenti e documenti.",
      selection: {
        outil: "Area proprietario",
        ligne: "Richiesta di accesso all’area proprietario",
      },
    },
    investir: {
      titre: "Investire a Marrakech — CITYSTAR",
      description:
        "Cosa sapere prima di investire in una villa a Marrakech, e un simulatore di rendimento lordo.",
      kicker: "Investire",
      chapeau:
        "Cosa sapere prima di investire in una villa a Marrakech, e un simulatore per provare le sue ipotesi.",
      titreH1: ["Investire", "a Marrakech."],
      intro: [
        "Quattordici ville, tre architetture, una tenuta privata a pochi minuti dalla Palmeraie: la rarità dell’offerta è il primo argomento dell’investimento.",
        "Le ipotesi di rendimento dipendono dalla modalità di gestione scelta e dalle condizioni reali del mercato. Il simulatore parte da valori illustrativi, da regolare e poi confermare con il promotore.",
      ],
      points: [
        {
          titre: "Affitto breve",
          texte:
            "Marrakech attira visitatori internazionali tutto l’anno. L’affitto breve vi è soggetto a obblighi dichiarativi locali.",
        },
        {
          titre: "Affitto lungo",
          texte:
            "Un contratto classico offre un reddito più regolare, con meno gestione e poca rotazione.",
        },
        {
          titre: "Rivendita nel tempo",
          texte:
            "Il valore dipende dal mercato e dallo stato dell’immobile; nessuna plusvalenza può essere garantita.",
        },
      ],
    },
    faq: {
      suites: {
        titre: "Per saperne di più",
        plans: "Vedere le ville e le planimetrie",
        simulateur: "Stimare un rendimento",
        rappel: "Farsi richiamare da un consulente",
      },
      titre: "Domande frequenti — CITYSTAR Marrakech",
      description:
        "Posizione, superfici, accessibilità, prezzi, planimetrie, visite: le risposte alle domande più comuni.",
      kicker: "Domande",
      titreH1: ["Le domande", "che ci fanno."],
      intro: "Manca una risposta? Il concierge le risponde direttamente.",
    },
    luxe: {
      titre: "Villa di lusso a Marrakech — CITYSTAR",
      description:
        "Quattordici ville di lusso a Oulad Hassoune, Marrakech: superfici, architetture, posizione e visite.",
      kicker: "Villa di lusso a Marrakech",
      titreH1: ["Acquistare una villa", "a Marrakech."],
      intro:
        "CITYSTAR riunisce quattordici ville contemporanee in una tenuta privata e interamente protetta a Oulad Hassoune, vicino alla Palmeraie.",
      sections: [
        {
          titre: "Una tenuta chiusa, non una lottizzazione",
          texte:
            "Solo quattordici ville, ognuna sul proprio lotto e con la propria piscina. La tenuta è chiusa e sorvegliata: la rarità distingue il progetto da ciò che lo circonda.",
        },
        {
          titre: "Tre architetture, tre modi di vivere",
          texte:
            "Il tipo A è pensato per la mobilità ridotta: ascensore e bagni accessibili. Il tipo B apre le stanze su ampie terrazze. Il tipo C gioca con volumi contemporanei intorno alla piscina.",
        },
        {
          titre: "In disparte, mai lontano",
          texte:
            "Piazza Jemaa el-Fna e l’aeroporto di Marrakech-Menara sono a meno di trentacinque minuti, la Palmeraie vicinissima. La visita a 360° permette di scoprire la tenuta prima di partire.",
        },
        {
          titre: "Visitare, poi acquistare",
          texte:
            "Le planimetrie di ogni tipo e le brochure sono scaricabili. La visita sul posto e le condizioni d’acquisto passano dal concierge: un consulente la richiama e organizza la visita.",
        },
      ],
    },
    contact: {
      titre: "Contatti — CITYSTAR Marrakech",
      description:
        "Richieda un accesso privato, la brochure o una visita della tenuta CITYSTAR a Marrakech.",
      kicker: "Contatti",
      titreH1: ["Parliamo del", "suo progetto."],
      intro:
        "Un consulente le risponde direttamente: telefono, WhatsApp o richiamata, come preferisce.",
      formulaire: "Richiedere una richiamata",
    },
  },
  faq: (v) => [
    {
      id: "securite",
      q: "Acquistare su progetto a CITYSTAR è sicuro?",
      r: `La prenotazione si firma direttamente dal notaio, e ogni pagamento passa dallo studio notarile. Il cantiere è finanziato al ${v.fondsPropres} con fondi propri: non dipende né da un credito del promotore né dalle vendite su progetto.`,
    },
    {
      id: "acquisition",
      q: "Come si svolge l’acquisto?",
      r: `Prenota la sua villa dal notaio, con il ${v.acompte} del prezzo. La ripartizione del saldo fino alla consegna delle chiavi è in corso di convalida con il promotore; il suo consulente le invierà il piano dettagliato.`,
    },
    {
      id: "financement",
      q: "Si può acquistare con un mutuo?",
      r: "Sì. Il promotore accetta acquisti finanziati con un mutuo bancario. Il suo consulente la accompagna nelle pratiche con la sua banca.",
    },
    {
      id: "livraison",
      q: "Quando sarà consegnata la tenuta?",
      r: `La consegna è prevista per ${v.livraison}. Le date delle fasi intermedie del cantiere sono in corso di convalida con il promotore.`,
    },
    {
      id: "villas",
      q: "Quante ville conta CITYSTAR?",
      r: `${v.villas} ville, in tre tipi. Ognuna ha il proprio lotto, fino a ${v.terrain}, e la propria piscina privata.`,
    },
    {
      id: "lieu",
      q: "Dove si trova la tenuta?",
      r: `A Oulad Hassoune, prefettura di Marrakech, vicino alla Palmeraie. Piazza Jemaa el-Fna e l’aeroporto sono a meno di ${v.minutes} minuti.`,
    },
    {
      id: "surfaces",
      q: "Quali sono le superfici?",
      r: `Tipo A: ${v.a}. Tipo B: ${v.b}. Tipo C: ${v.c}. Sono superfici costruite; i terreni sono indicati nella scheda di ogni villa.`,
    },
    {
      id: "pmr",
      q: "C’è una villa adatta alla mobilità ridotta?",
      r: "Sì, la villa tipo A: ascensore, bagni accessibili e percorsi ampi.",
    },
    {
      id: "prix",
      q: "Qual è il prezzo delle ville?",
      r: "I prezzi sono comunicati su richiesta, insieme al piano dei pagamenti dettagliato della villa che le interessa. Chieda di essere richiamato da un consulente.",
    },
    {
      id: "visite",
      q: "Si può visitare?",
      r: "La visita a 360° è disponibile online. La visita sul posto si richiede al concierge, dopo l’esame della sua richiesta.",
    },
    {
      id: "plans",
      q: "Le planimetrie sono disponibili?",
      r: "Sì: piano terra e primo piano di ogni tipo, ingrandibili sul sito, oltre a una brochure PDF per villa.",
    },
  ],
  rendus: {
    alts: {
      "entree-crepuscule":
        "Vialetto d’ingresso di una villa, volumi bianchi e pergola a lamelle scure, giardino di palme",
      "entree-palmiers": "Portone in legno incorniciato da lamelle scure, tra due palme",
      "entree-portail": "Portone in legno sotto una pergola a lamelle, visto di fronte",
      "ext-aerien-piscine": "Vista dall’alto di una villa su due piani con piscina e prato",
      "ext-facade-crepuscule":
        "Facciata bassa di villa, intonaco bianco e fasce scure, dietro un giardino secco",
      "ext-facade-entree":
        "Facciata di villa e viale d’accesso, un’auto parcheggiata davanti all’ingresso",
      "ext-facade-jardin":
        "Villa su due piani vista dal giardino, terrazza coperta e auto parcheggiata",
      "ext-pergola-allee":
        "Villa dai volumi bassi, pergola a lamelle sopra la terrazza, prato e palme",
      "ext-pergola-jour": "Terrazza sotto una pergola a lamelle verticali, ai bordi del prato",
      "ext-pergola-portrait": "Pergola a lamelle scure sopra una terrazza arredata",
      "ext-piscine-crepuscule":
        "Angolo di una villa su due piani, grandi finestre con tende e piscina",
      "ext-piscine-jour": "Piscina ai piedi di una villa su due piani, balconi e lettini",
      "ext-piscine-soir": "Villa illuminata al crepuscolo, piscina e terrazza al primo piano",
      "ext-terrasse-jour":
        "Salotto esterno sotto una sporgenza, tra volumi bianchi e rivestimento in legno",
      "ext-terrasses-cactus": "Villa su due piani e le sue terrazze, prato, cactus e lettini",
      "ext-volume-lames": "Volume scuro solcato da lamelle luminose, cortile con una palma",
      "int-chambre-bois":
        "Camera rivestita in legno scuro, letto grande e pavimento in marmo chiaro",
      "int-chambre-jour": "Camera luminosa, letto basso e vetrata aperta sul giardino",
      "int-chambre-soir": "Camera nei toni del grigio, letto, poltrone e cabina armadio",
      "int-salon": "Soggiorno con divano curvo sotto lampade circolari, bonsai sul tavolino",
    },
    visionneuse: "Galleria a tutto schermo",
    agrandir: (alt) => `Ingrandire: ${alt}`,
    precedente: "Immagine precedente",
    suivante: "Immagine successiva",
    fermer: "Chiudere la galleria",
    position: (i, n) => `${i} / ${n}`,
  },
  ruban: {
    aria: "I render della tenuta, a scorrimento",
    note: "Render d’architetto · illustrazioni non contrattuali",
    titre: ["La tenuta,", "per immagini."],
    galerie: "Vedere tutta la galleria",
    pause: "Pausa",
    lecture: "Riproduci",
  },
  marque: {
    defilant: "CITYSTAR · QUATTORDICI VILLE PRIVATE · OULAD HASSOUNE · MARRAKECH · ",
    legende: "Oulad Hassoune · Marrakech",
    aria: "CITYSTAR, residenza privata a Oulad Hassoune, Marrakech",
  },
  processus: {
    titre: ["Dalla prima visita", "alla consegna delle chiavi."],
    intro:
      "Un unico interlocutore la accompagna in ogni fase, dal primo colloquio fino al suo arrivo.",
    etapes: (acompte, livraison) => [
      {
        titre: "Il primo colloquio",
        texte:
          "In video o al telefono, un consulente le presenta la tenuta, le ville, le planimetrie e la visita a 360°.",
      },
      {
        titre: "La scelta della villa",
        texte:
          "Visita sul posto o a distanza. Riceve il prezzo e il piano dei pagamenti della villa scelta.",
      },
      {
        titre: "La prenotazione dal notaio",
        texte: `Prenota direttamente dal notaio, con il ${acompte} del prezzo.`,
      },
      {
        titre: "Il finanziamento",
        texte:
          "In contanti o con un mutuo: il suo consulente la accompagna nelle pratiche con la sua banca.",
      },
      {
        titre: "Il monitoraggio del cantiere",
        texte:
          "Dalla sua area proprietario: avanzamento, foto del cantiere, pagamenti e documenti. Ogni pagamento passa dal notaio.",
      },
      {
        titre: "La consegna delle chiavi",
        texte: `Consegna prevista per ${livraison}. La sua villa le viene consegnata chiavi in mano.`,
      },
    ],
    cta: "Iniziare con un primo colloquio",
  },
  questions: {
    titre: ["Acquistare su progetto,", "in tutta serenità."],
    intro: "Le domande che ci fanno prima di ogni prenotazione.",
    toutes: "Tutte le domande",
  },
  engagements: {
    titre: ["Tre impegni.", "Una fiducia piena."],
    intro: "Garanzie concrete, in ogni fase del suo acquisto.",
    items: (fondsPropres) => [
      {
        titre: "Un promotore che ha già consegnato",
        texte: "Un’esperienza nella promozione immobiliare già collaudata all’estero.",
      },
      {
        titre: `${fondsPropres} fondi propri`,
        texte:
          "Il cantiere è finanziato con fondi propri: non dipende né da un credito del promotore né dalle vendite su progetto.",
      },
      {
        titre: "Il notaio fin dalla prenotazione",
        texte:
          "La prenotazione si firma direttamente dal notaio, e ogni pagamento passa dallo studio notarile.",
      },
    ],
    cta: "Ricevere il dossier",
    selection: { outil: "Dossier CITYSTAR", ligne: "Richiesta del dossier completo" },
  },
  marche: {
    titre: "Marrakech accelera.",
    transactions: (annee) => `Compravendite a Marrakech nel ${annee}`,
    prix: (annee) => `Prezzi a Marrakech nel ${annee}`,
    comparaison: (annee) => `Andamento delle compravendite nel ${annee}, per città`,
    conclusion: (n) => `La domanda accelera. A CITYSTAR, l’offerta si ferma a ${n} ville.`,
    source: "Fonte e metodologia",
    sourceTexte: (annee) =>
      `Bank Al-Maghrib e ANCFCC, indice dei prezzi degli immobili (IPAI): andamento nel ${annee} del numero di compravendite e dell’indice dei prezzi, per città.`,
    sourceLien: "Leggere il resoconto della pubblicazione",
  },
  cercle: {
    titre: "Un primo colloquio, senza impegno.",
    intro: "Scelga il colloquio che preferisce.",
    options: {
      visio: {
        titre: "Appuntamento in video",
        texte: "Una presentazione della tenuta e delle ville, a distanza.",
      },
      rappel: {
        titre: "Farsi richiamare",
        texte: "Un consulente la richiama per rispondere alle sue domande.",
      },
      rendement: {
        titre: "Simulare il mio rendimento",
        texte: "Una prima proiezione, da affinare insieme.",
      },
    },
    selection: "Primo colloquio",
  },
  pied: {
    sceau: "RESIDENZA PRIVATA · CITYSTAR · MARRAKECH · ",
    titre: ["Un contatto ", "diretto."],
    appeler: "Chiamare",
    whatsapp: "WhatsApp",
    conciergerie: "Concierge",
    ecrire: "Scrivere",
    brochure: "Brochure",
    theme: ["Villa di lusso a Marrakech", "villa-di-lusso-marrakech"],
    nav: "Piè di pagina",
    legal: (annee) => `© ${annee} CITYSTAR · Residenza privata · Oulad Hassoune, Marrakech`,
    instagram: "CITYSTAR su Instagram",
    realise: "Realizzato da",
    propulse: "Con la tecnologia di",
    youtube: "CITYSTAR su YouTube",
  },
  selecteur: {
    kicker: "Trovare la mia villa",
    question: (n, total) => `Domanda ${n} / ${total}`,
    progression: "Avanzamento",
    recommandation: "Raccomandazione",
    notre: "La nostra raccomandazione",
    retour: "Indietro",
    clavier: "Tastiera: numeri per rispondere, freccia sinistra per tornare",
    recap: "Le sue risposte",
    apercu: "Anteprima delle tre ville",
    voirVilla: "Vedere la villa",
    dossier: "Richiamatemi per questa villa",
    prive:
      "Le sue risposte restano su questo dispositivo: sono allegate alla richiesta solo se la invia.",
    recommencer: "Ricominciare",
    comparer: "Confrontare con le altre due",
    rendement: "Stimare il rendimento",
    outil: "Selettore di villa",
    ligneRecommandation: (type) => `Raccomandazione: villa ${type}`,
    conversion: "Importi convertiti, a titolo indicativo",
    questions: {
      usage: {
        titre: "Pensa a CITYSTAR per…",
        vivre: "Viverci",
        vivreNote: "Residenza principale o secondaria",
        investir: "Investire",
        investirNote: "Investimento o affitto",
      },
      suites: {
        titre: "Quante suite desidera?",
        suites: (n) => `${n} suite`,
        peuImporte: "Indifferente",
      },
      budget: {
        titre: "Quale budget prevede?",
        jusqua: (montant) => `Fino a ${montant}`,
        curseur: "Il suo budget",
        valider: "Confermare questo budget",
        parler: "Parliamone",
        parlerNote: "Di persona",
      },
      pmr: {
        titre: "Le serve un accesso senza gradini, accessibile?",
        oui: "Sì",
        ouiNote: "Ascensore, bagni accessibili",
        non: "No",
      },
    },
    raisons: {
      pmr: "Non accessibile",
      suites: (n) => `${n} suite`,
      budget: "Fuori budget",
      autre: "Meno adatta",
    },
    justifications: {
      pmr: (taille) =>
        `L’unica villa pensata per la mobilità ridotta: ascensore e bagni accessibili, ${taille}.`,
      pmrSuites: (plus) => ` Ha ${plus ? "più" : "meno"} suite di quelle richieste.`,
      contemporaine: (taille, exacte) =>
        `${taille}, volumi contemporanei e piscina privata${exacte ? ": la dimensione che cerca." : "."}`,
      budgetSeule: " È la villa che rientra nel suo budget.",
      polyvalente: (taille) => `La più versatile: ${taille}, prolungata da ampie terrazze.`,
      espace: (taille) => `${taille}, prolungata da ampie terrazze: lo spazio che cerca.`,
      horsBudget: " Il suo prezzo supera il budget indicato: parliamone.",
    },
  },
  comparateur: {
    kicker: "Confrontare",
    titre: ["Ciò che le ", "distingue."],
    note: "Differenze calcolate rispetto alla villa di riferimento",
    budget: (villas) => `Nel budget indicato: ${villas}`,
    aucune: "nessuna villa",
    votreBudget: "Il suo budget",
    horsBudget: "Fuori budget",
    reference: "Riferimento",
    referenceAria: "Villa di riferimento",
    prendreReference: (type) => `Prendere la villa ${type} come riferimento`,
    differences: "Solo le differenze",
    tableauAria: "Tabella comparativa delle tre ville",
    surface: "Superficie costruita",
    surfaceCourt: ["Superficie", "costruita"],
    terrain: "Terreno",
    suites: "Suite",
    pmr: ["Accesso", "senza gradini"],
    pmrOui: "Sì",
    pmrDetail: "Ascensore, bagni accessibili",
    pmrNon: "Non previsto",
    atout: "Carattere",
    plans: "Planimetrie",
    deuxPlans: "2 planimetrie",
    brochure: "Brochure",
    prix: "Prezzo",
    prixIndicatif: "Prezzo indicativo",
    defiler: "Scorrere per confrontare",
    rappel: (type) => `Richiamatemi per la villa ${type}`,
    outil: "Comparatore di ville",
    ligneReference: (type) => `Villa di riferimento: ${type}`,
    ligneBudget: (montant) => `Budget: ${montant}`,
    estReference: " · riferimento",
    suite: "suite",
  },
  rentabilite: {
    kicker: "Simulatore",
    titre: ["E se la villa ", "lavorasse?"],
    modes: { court: "Affitto breve", long: "Affitto lungo", revente: "Rivendita" },
    modeAria: "Modalità di simulazione",
    prix: "Prezzo dell’immobile",
    intro: [
      "Indichi il budget e l’uso previsto, regoli le ipotesi e mostri la stima, nella valuta che sceglie.",
      "I cursori partono da valori illustrativi: li regoli sul suo progetto. Le cifre definitive sono confermate dal promotore.",
    ],
    budget: "Budget studiato",
    typeLabel: "Tipo di villa",
    optionnel: "facoltativo",
    typeLibre: "Non lo so ancora",
    typeVilla: (type) => `Villa tipo ${type}`,
    projet: "Il suo progetto",
    estimer: "Vedere la mia stima",
    resultatTitre: "La sua stima",
    budgetSaisi: "Budget studiato",
    usage: "Uso previsto",
    recap: (budget, usage) => `Budget studiato: ${budget} · ${usage}`,
    fourchette: (min, max) => `Da ${min} a ${max}`,
    prixEtudie: (montant) => `Prezzo studiato: ${montant}`,
    champs: {
      prixMoyenNuitEUR: "Prezzo medio a notte",
      tauxOccupation: "Tasso di occupazione",
      semainesUsagePersonnel: "Settimane di uso personale",
      loyerMensuelEUR: "Affitto mensile stimato",
      horizonAnnees: "Orizzonte",
      appreciationAnnuelle: "Rivalutazione annua",
      charges: "Costi di gestione",
      coutsAnnuelsEUR: "Costi di detenzione",
      imposition: "Fiscalità",
    },
    semaine: (n) => `${n} settiman${n > 1 ? "e" : "a"}`,
    an: (n) => `${n} ann${n > 1 ? "i" : "o"}`,
    desRevenus: "dei ricavi",
    parAn: "/ anno",
    attente: "In attesa",
    avancees: "Ipotesi avanzate",
    rendementBrut: "Rendimento lordo",
    plusValueBrute: "Plusvalenza lorda",
    nuits: "Notti affittate all’anno",
    revenuBrut: "Ricavi lordi annui",
    loyerDouze: "Affitto × 12 mesi",
    valeurProjetee: (annees) => `Valore proiettato a ${annees} anni`,
    appreciation: "Ipotesi di rivalutazione",
    neutreTitre: "Ipotesi in convalida",
    neutreTexte:
      "Nessun rendimento è pubblicato finché le ipotesi non sono confermate dal promotore. Riceva un’analisi basata sul suo progetto.",
    mention:
      "Ipotesi illustrative, non contrattuali: sposti i cursori per provare le sue. Stima prima di costi, fiscalità e spese reali di gestione.",
    courtTerme: "L’affitto breve a Marrakech è soggetto a obblighi dichiarativi locali.",
    analyse: "Farsi richiamare per parlarne",
    compatibles: "Vedere le ville nel budget",
    outil: "Simulatore di rendimento",
    ligneMode: (mode) => `Modalità: ${mode}`,
    ligneType: (type) => `Tipo studiato: ${type}`,
    ligneResultat: (titre, valeur) => `${titre}: ${valeur}`,
    ligneNeutre: "Ipotesi in convalida",
  },
  contact: {
    kicker: "Concierge CITYSTAR",
    titre: ["Farsi ", "richiamare."],
    texte:
      "Lasci i suoi recapiti e un consulente CITYSTAR la richiamerà per rispondere alle sue domande su planimetrie, prezzi o una visita della tenuta. All’invio si apre la sua app di posta con la richiesta pronta.",
    jointe: (outil) => `Allegato alla sua richiesta · ${outil}`,
    retirer: "Non allegare",
    nom: "Nome e cognome",
    telephone: "Telefono",
    email: "E-mail",
    interet: "Il suo interesse",
    interets: [
      "Scoprire il progetto",
      "Villa tipo A",
      "Villa tipo B",
      "Villa tipo C",
      "Organizzare una visita",
    ],
    envoyer: "Inviare la mia richiesta",
    fermer: "Chiudere",
  },
  modales: {
    plan: "Planimetria ingrandita",
    planAlt: "Planimetria architettonica CITYSTAR, ingrandita",
    fermerPlan: "Chiudere la planimetria",
  },
};
