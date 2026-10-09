import type { Textes } from "./i18n";

/** Nederlands. */
export const nl: Textes = {
  nav: [
    ["Home", ""],
    ["De villa’s", "villas"],
    ["Galerij", "galerie"],
    ["Investeren", "investir"],
    ["Vragen", "faq"],
    ["Contact", "contact"],
  ],
  header: {
    acces: "Terugbellen",
    rappelCourt: "Terugbellen",
    conciergerie: "Conciërge",
    accueil: "Terug naar boven",
    sommaire: "Inhoud",
    brochure: "CITYSTAR-brochure",
    poids: (mo) => `PDF · ${mo} MB`,
    demander: "Terugbelverzoek",
    fermer: "Menu sluiten",
    menu: "Menu",
    villas: "Villa’s",
    galerie: "Galerij",
    questions: "Vragen",
    espace: "Mijn omgeving",
    langue: "Taal van de site",
    whatsapp: "De CITYSTAR-conciërge een WhatsApp-bericht sturen",
  },
  hero: {
    lieu: "Privéresidentie · Oulad Hassoune, Marrakech",
    accroche: ["Luxevilla’s in Marrakech,", "veertien, geen enkele meer."],
    texte: (surface, terrain, minutes) =>
      `Tot ${surface} bebouwd op ${terrain} grond, met eigen zwembad, op ${minutes} minuten van Jemaa el-Fna.`,
    garanties: (fondsPropres) => [
      "Reservering bij de notaris",
      `${fondsPropres} eigen vermogen`,
      "Hypotheek mogelijk",
    ],
    rendu: "3D-render, niet contractueel",
    livraison: (mois) => `Oplevering ${mois}`,
    livraisonLabel: "Oplevering",
    reservation: (part) => `${part} bij reservering`,
    visite: "360°-rondleiding",
    decouvrir: "Ontdek de villa’s",
    acces: "Terugbelverzoek",
    pause: "Video pauzeren",
    lecture: "Video hervatten",
    pauseCourt: "Pauze",
    lectureCourt: "Afspelen",
  },
  reperes: {
    aria: "Kerncijfers van het domein",
    trajet: (n) => ({ valeur: `${n} min`, libelle: "Jemaa el-Fna en luchthaven" }),
    villas: (n) => ({ valeur: String(n), libelle: "privévilla’s, geen enkele meer" }),
    terrain: (surface) => ({ valeur: surface, libelle: "grond, het grootste perceel" }),
  },
  projet: {
    titre: ["De zeldzame ruimte", "van een ", "privéleven."],
    texte: [
      "Een privédomein, volledig beveiligd, vlak bij de Palmeraie.",
      "Drie architecturen voor de manier van leven van elke bewoner.",
    ],
    vues: { entree: "De entree", pergola: "De pergola", salon: "De woonkamer" },
    faits: {
      villas: "privévilla’s op een beveiligd domein",
      terrain: "grond per villa",
      surface: "bebouwd, bij de grootste villa",
      trajet: "van Jemaa el-Fna en de luchthaven",
    },
  },
  livraison: {
    aria: "Opleveringskalender en betalingsplan",
    titre: (mois) => `Oplevering in ${mois}.`,
    intro:
      "De bouw verloopt in fasen, en bij elke fase wordt een deel van de prijs betaald. De tussentijdse data en de verdeling van het restant worden met de ontwikkelaar afgestemd.",
    compte: (n) =>
      n === 0 ? "Oplevering deze maand" : n === 1 ? "Over 1 maand" : `Over ${n} maanden`,
    frise: "De bouwfasen",
    etapes: {
      reservation: "Reservering",
      fondations: "Fundering",
      grosOeuvre: "Ruwbouw",
      finitions: "Afwerking",
      livraison: "Sleuteloverdracht",
    },
    signature: "Ondertekening bij de notaris",
    dateAConfirmer: "Datum nog te bevestigen",
    paiement: "Het betalingsplan",
    part: "Deel van de prijs",
    aConfirmer: "Nog te bevestigen",
    notePaiement: (reste) =>
      `De reservering wordt rechtstreeks bij de notaris ondertekend. De verdeling van de resterende ${reste} wordt met de ontwikkelaar afgestemd: uw adviseur stuurt u het gedetailleerde betalingsschema van uw villa.`,
    echeancier: "Het betalingsschema ontvangen",
    selection: {
      outil: "Kalender en betalingen",
      ligne: "Aanvraag van het gedetailleerde betalingsschema",
    },
    espace: {
      texte: "Al eigenaar? Volg de voortgang van de bouw van uw villa.",
      lien: "Naar mijn omgeving",
    },
  },
  architecture: {
    label: "Architectuur",
    titre: ["Marrakech,", "anders."],
    hint: "Versleep de schuif en open elk punt.",
    note: "Illustratie, niet contractueel",
    curseur: "Tekening en render vergelijken",
    rendu: "Render",
    dessin: "Tekening",
    altDessin: "Lijntekening van de gevel van een CITYSTAR-villa",
    altRendu: "Render van dezelfde gevel, met terrassen en zwembad",
    points: [
      {
        titre: "Zonwering",
        texte: "Horizontale lamellen die het licht boven het terras filteren.",
      },
      { titre: "Terras op de verdieping", texte: "De kamers boven openen op ruime terrassen." },
      { titre: "Glazen volumes", texte: "Grote volumes die opengaan naar buiten." },
      { titre: "Materialen", texte: "Hoogwaardige materialen, volgens Europese normen." },
      { titre: "Eigen zwembad", texte: "Elke villa heeft een eigen zwembad." },
    ],
  },
  villas: {
    label: "De villa’s",
    titre: ["Drie uitdrukkingen.", "Eén ", "lat."],
    intro: (n, terrain) =>
      `Drie architecturen voor ${n} villa’s, elk op een perceel van ${terrain}.`,
    comparer: "Villa’s vergelijken",
    villa: "Villa",
    decouvrir: "Ontdek de villa",
    curseur: "Ontdek",
    decouvrirAria: (type, surface, suites, tag) =>
      `Ontdek villatype ${type}: ${surface}, ${suites}, ${tag.toLowerCase()}`,
    retour: "De drie villa’s",
    onglets: "Villatypes",
    typeVilla: (type) => `Villatype ${type}`,
    surface: "Bebouwde oppervlakte",
    terrain: "Perceel",
    configuration: "Indeling",
    suites: (n) => `${n} suites`,
    plansAria: (type) => `Plattegronden van villatype ${type}`,
    rdc: "Begane grond",
    etage: "Verdieping",
    agrandirPlan: (etage, type) =>
      `Plattegrond van de ${etage ? "verdieping" : "begane grond"} van villatype ${type} vergroten`,
    demander: "Terugbellen over deze villa",
    brochure: "Brochure",
    brochureAria: (type) => `Brochure van villatype ${type} (pdf)`,
    illustration: (type) => `Villatype ${type} · Illustratie, niet contractueel`,
    prixM2: (montant) => `Dat is ongeveer ${montant} per bebouwde m²`,
    disponibilite: "Beschikbaarheid op aanvraag",
    accroches: {
      A: ["Ontworpen voor", "iedereen."],
      B: ["Leven op", "de terrassen."],
      C: ["Volumes", "rond het water."],
    },
    tags: { A: "Toegankelijk", B: "Terrassen", C: "Eigentijds" },
    descriptions: {
      A: "Ontworpen voor bewoners met beperkte mobiliteit: lift, toegankelijke badkamers en ruime doorgangen.",
      B: "Veeleisende architectuur en hoogwaardige materialen, verlengd door ruime terrassen.",
      C: "Eigentijdse volumes en een eigen zwembad, volgens de strengste architectonische normen.",
    },
  },
  prix: {
    label: "Prijs",
    devise: "Weergavevaluta",
    reference: (prix) => `Referentieprijs: ${prix}`,
    contreValeur: (date) => `Indicatieve tegenwaarde · koers van ${date}`,
    indicatif: "Indicatieve prijs, onder voorbehoud van bevestiging",
    indicatifCourt: "indicatieve prijs",
    surDemande: "Prijs op aanvraag",
    devises: {
      EUR: "Euro",
      GBP: "Britse pond",
      MAD: "Marokkaanse dirham",
      NOK: "Noorse kroon",
    },
  },
  vivre: {
    label: "De kunst van het leven",
    titre: "Een dag op CITYSTAR",
    moments: [
      {
        quand: "Ochtend",
        titre: "Het zwembad, als eerste.",
        texte: "Elke villa heeft een eigen zwembad en buitenruimtes, uit het zicht.",
        alt: "Eigen zwembad van een CITYSTAR-villa in de ochtend",
      },
      {
        quand: "Middag",
        titre: "Het licht komt overal binnen.",
        texte: "Open volumes en hoogwaardige materialen, om binnen en buiten te leven.",
        alt: "Lichte leefruimte van een CITYSTAR-villa",
      },
      {
        quand: "Avond",
        titre: "Ontvangen, in alle rust.",
        texte: "Royale woonkamers, in een vrijstaande villa binnen een privédomein.",
        alt: "Woonkamer van een CITYSTAR-villa ’s avonds",
      },
      {
        quand: "Nacht",
        titre: "Een domein dat dag en nacht bewaakt wordt.",
        texte: "Een privéresidentie, volledig beveiligd, vlak bij de Palmeraie.",
        alt: "Verlichte CITYSTAR-villa bij het vallen van de avond",
      },
    ],
    momentsAria: "De momenten van de dag",
  },
  visite: {
    label: "360°-rondleiding",
    titre: ["Stap binnen in", "de villa’s."],
    texte:
      "Een 360°-rondleiding door de villa’s, kamer voor kamer. Volg de pijlen van de ene kamer naar de andere, in uw eigen tempo.",
    etapes: ["Rondleiding starten", "De pijlen volgen van kamer naar kamer", "Volledig scherm"],
    activer: "Rondleiding starten",
    apercu: "360°-rondleiding · kamer voor kamer",
    pleinEcran: "Volledig scherm",
    titreIframe: "Virtuele 360°-rondleiding door het CITYSTAR-domein",
    titreModale: "Virtuele 360°-rondleiding",
    fermer: "Rondleiding sluiten",
  },
  localisation: {
    label: "Ligging",
    titre: ["Afgezonderd.", "Nooit ver."],
    lieux: {
      med: { titre: "Djemaa el-Fna-plein", note: (n) => `Minder dan ${n} minuten` },
      air: { titre: "Luchthaven Marrakech", note: (n) => `Minder dan ${n} minuten` },
      palm: { titre: "De Palmeraie", note: "Vlakbij", mot: "Dichtbij" },
    },
    adresse: ["Regio Marrakech-Safi", "Prefectuur Marrakech", "Oulad Hassoune"],
    planMasse: "Situatieplan",
    schema: "Schematische kaart, niet op schaal",
    carteAria:
      "Schematische kaart, niet op schaal: CITYSTAR in Oulad Hassoune, vlak bij de Palmeraie, met de medina en de luchthaven van Marrakech",
    reperes: {
      med: "Medina · Jemaa el-Fna",
      medCourt: "Medina",
      air: "Luchthaven Marrakech-Menara",
      airCourt: "Luchthaven",
      palm: "De Palmeraie",
      palmCourt: "Palmeraie",
    },
    zoomPlus: "Inzoomen",
    zoomMoins: "Uitzoomen",
    recentrer: "Kaart centreren",
    aideLongue: "Slepen om te verplaatsen · Ctrl + scrollwiel om te zoomen",
    aideCourte: "Slepen · tik op een afstand",
    residencePrivee: "Privéresidentie",
    ou: "Oulad Hassoune · Marrakech",
    itineraire: "Route",
    fermerFiche: "Kaartje sluiten",
    proximite: "Dichtbij",
    minutes: (n) => `${n} min`,
    moinsDe: (n) => `< ${n} min`,
  },
  pages: {
    accueil: {
      titre: "CITYSTAR Marrakech — Exclusieve luxevilla’s",
      description: (n) =>
        `CITYSTAR, een privéresidentie met ${n} eigentijdse villa’s in Oulad Hassoune, Marrakech, vlak bij de Palmeraie.`,
    },
    villas: {
      titre: "De villa’s — CITYSTAR Marrakech",
      description:
        "Drie villatypes, oppervlaktes, suites, plattegronden en prijzen: vind de villa die bij u past.",
      kicker: "De villa’s",
      titreH1: ["Uw villa", "kiezen."],
      intro:
        "Drie architecturen, veertien villa’s. Laat u leiden door een paar vragen en vergelijk ze daarna.",
    },
    villa: {
      titre: (type) => `Villatype ${type} — CITYSTAR Marrakech`,
      description: (type, surface, suites) =>
        `Villatype ${type}: ${surface} bebouwd, ${suites}, plattegronden en brochure.`,
    },
    galerie: {
      titre: "Galerij en rondleiding — CITYSTAR Marrakech",
      description: "Renders van het domein, de details van de architectuur en de 360°-rondleiding.",
      kicker: "Galerij",
      titreH1: ["Het domein,", "in beeld."],
      intro:
        "Renders van de architect van het domein en de interieurs. Illustraties, niet contractueel.",
      legende: "CITYSTAR-render",
    },
    espace: {
      titre: "Mijn eigenaarsomgeving — CITYSTAR",
      description:
        "De eigenaarsomgeving van CITYSTAR: de voortgang van de bouw van uw villa, fase voor fase.",
      kicker: "Mijn omgeving",
      titreH1: ["Mijn villa volgen,", "fase voor fase."],
      intro:
        "Uw persoonlijke toegang om de bouw van uw villa te volgen: fasen, bouwfoto’s, betalingen en documenten.",
      selection: {
        outil: "Eigenaarsomgeving",
        ligne: "Aanvraag van toegang tot de eigenaarsomgeving",
      },
    },
    investir: {
      titre: "Investeren in Marrakech — CITYSTAR",
      description:
        "Wat u moet weten voordat u in een villa in Marrakech investeert, plus een simulator voor het bruto rendement.",
      kicker: "Investeren",
      chapeau:
        "Wat u moet weten voordat u in een villa in Marrakech investeert, en een simulator om uw eigen aannames te testen.",
      titreH1: ["Investeren", "in Marrakech."],
      intro: [
        "Veertien villa’s, drie architecturen, een privédomein op een paar minuten van de Palmeraie: de schaarste van het aanbod is het eerste argument van de belegging.",
        "De rendementsaannames hangen af van de gekozen exploitatie en van de werkelijke marktomstandigheden. De simulator vertrekt van illustratieve waarden, die u aanpast en daarna met de ontwikkelaar bevestigt.",
      ],
      points: [
        {
          titre: "Kortetermijnverhuur",
          texte:
            "Marrakech trekt het hele jaar internationale bezoekers. Kortetermijnverhuur is er onderworpen aan lokale meldingsplichten.",
        },
        {
          titre: "Langetermijnverhuur",
          texte:
            "Een klassiek huurcontract levert regelmatiger inkomsten op, met minder beheer en weinig wisselingen.",
        },
        {
          titre: "Doorverkoop op termijn",
          texte:
            "De waarde hangt af van de markt en van de staat van het pand; geen enkele meerwaarde kan worden gegarandeerd.",
        },
      ],
    },
    faq: {
      suites: {
        titre: "Verder gaan",
        plans: "De villa’s en hun plattegronden bekijken",
        simulateur: "Een rendement schatten",
        rappel: "Teruggebeld worden door een adviseur",
      },
      titre: "Veelgestelde vragen — CITYSTAR Marrakech",
      description:
        "Ligging, oppervlaktes, toegankelijkheid, prijzen, plattegronden, bezichtigingen: antwoorden op de meest gestelde vragen.",
      kicker: "Vragen",
      titreH1: ["De vragen", "die ons gesteld worden."],
      intro: "Mist u een antwoord? De conciërge antwoordt u rechtstreeks.",
    },
    luxe: {
      titre: "Luxevilla in Marrakech — CITYSTAR",
      description:
        "Veertien luxevilla’s in Oulad Hassoune, Marrakech: oppervlaktes, architecturen, ligging en bezichtigingen.",
      kicker: "Luxevilla in Marrakech",
      titreH1: ["Een villa kopen", "in Marrakech."],
      intro:
        "CITYSTAR bundelt veertien eigentijdse villa’s op een privédomein, volledig beveiligd, in Oulad Hassoune, vlak bij de Palmeraie.",
      sections: [
        {
          titre: "Een besloten domein, geen verkaveling",
          texte:
            "Slechts veertien villa’s, elk op een eigen perceel en met een eigen zwembad. Het domein is afgesloten en bewaakt: schaarste onderscheidt het project van zijn omgeving.",
        },
        {
          titre: "Drie architecturen, drie manieren van leven",
          texte:
            "Type A is ontworpen voor beperkte mobiliteit: lift en toegankelijke badkamers. Type B opent zijn kamers op ruime terrassen. Type C speelt met eigentijdse volumes rond het zwembad.",
        },
        {
          titre: "Afgezonderd, nooit ver",
          texte:
            "Het Djemaa el-Fna-plein en de luchthaven Marrakech-Menara liggen op minder dan vijfendertig minuten, de Palmeraie vlakbij. De 360°-rondleiding laat u het domein ontdekken voordat u op reis gaat.",
        },
        {
          titre: "Eerst bezichtigen, dan kopen",
          texte:
            "De plattegronden van elk type en de brochures zijn te downloaden. Bezichtigingen ter plaatse en de koopvoorwaarden lopen via de conciërge: een adviseur belt u terug en regelt de bezichtiging.",
        },
      ],
    },
    contact: {
      titre: "Contact — CITYSTAR Marrakech",
      description:
        "Vraag een privétoegang, de brochure of een bezichtiging van het CITYSTAR-domein in Marrakech aan.",
      kicker: "Contact",
      titreH1: ["Laten we het hebben over", "uw project."],
      intro:
        "Een adviseur antwoordt u rechtstreeks: telefoon, WhatsApp of terugbellen, naar keuze.",
      formulaire: "Terugbelverzoek",
    },
  },
  faq: (v) => [
    {
      id: "securite",
      q: "Is kopen op plan bij CITYSTAR veilig?",
      r: `De reservering wordt rechtstreeks bij de notaris ondertekend en elke betaling loopt via het notariskantoor. De bouw wordt voor ${v.fondsPropres} met eigen vermogen gefinancierd: hij hangt niet af van een lening van de ontwikkelaar of van verkopen op plan.`,
    },
    {
      id: "acquisition",
      q: "Hoe verloopt de aankoop?",
      r: `U reserveert uw villa bij de notaris, met ${v.acompte} van de prijs. De verdeling van het restant tot de sleuteloverdracht wordt met de ontwikkelaar afgestemd; uw adviseur stuurt u het gedetailleerde schema.`,
    },
    {
      id: "financement",
      q: "Kan ik kopen met een hypotheek?",
      r: "Ja. De ontwikkelaar aanvaardt aankopen die met een hypothecaire lening van een bank worden gefinancierd. Uw adviseur begeleidt u bij de stappen met uw bank.",
    },
    {
      id: "livraison",
      q: "Wanneer wordt het domein opgeleverd?",
      r: `De oplevering is gepland voor ${v.livraison}. De data van de tussentijdse bouwfasen worden met de ontwikkelaar afgestemd.`,
    },
    {
      id: "villas",
      q: "Hoeveel villa’s telt CITYSTAR?",
      r: `${v.villas} villa’s, in drie types. Elke villa heeft een eigen perceel, tot ${v.terrain}, en een eigen zwembad.`,
    },
    {
      id: "lieu",
      q: "Waar ligt het domein?",
      r: `In Oulad Hassoune, prefectuur Marrakech, vlak bij de Palmeraie. Het Djemaa el-Fna-plein en de luchthaven liggen op minder dan ${v.minutes} minuten.`,
    },
    {
      id: "surfaces",
      q: "Wat zijn de oppervlaktes?",
      r: `Type A: ${v.a}. Type B: ${v.b}. Type C: ${v.c}. Het gaat om bebouwde oppervlaktes; de percelen staan op de pagina van elke villa.`,
    },
    {
      id: "pmr",
      q: "Is er een villa geschikt voor beperkte mobiliteit?",
      r: "Ja, villatype A: lift, toegankelijke badkamers en ruime doorgangen.",
    },
    {
      id: "prix",
      q: "Wat kosten de villa’s?",
      r: "De prijzen worden op aanvraag gegeven, samen met het gedetailleerde betalingsschema van de villa die u interesseert. Vraag een adviseur om u terug te bellen.",
    },
    {
      id: "visite",
      q: "Kunnen we een bezichtiging doen?",
      r: "De 360°-rondleiding is online beschikbaar. Een bezichtiging ter plaatse vraagt u aan bij de conciërge, na beoordeling van uw aanvraag.",
    },
    {
      id: "plans",
      q: "Zijn de plattegronden beschikbaar?",
      r: "Ja: begane grond en verdieping van elk type, te vergroten op de site, plus een pdf-brochure per villa.",
    },
  ],
  rendus: {
    alts: {
      "entree-crepuscule":
        "Toegangspad van een villa, witte volumes en een pergola met donkere lamellen, palmentuin",
      "entree-palmiers": "Houten voordeur omlijst door donkere lamellen, tussen twee palmen",
      "entree-portail": "Houten voordeur onder een lamellenpergola, recht van voren",
      "ext-aerien-piscine":
        "Zicht van bovenaf op een villa met twee verdiepingen, zwembad en gazon",
      "ext-facade-crepuscule":
        "Lage villagevel, witte pleister en donkere banden, achter een droge tuin",
      "ext-facade-entree": "Villagevel en oprit, een auto geparkeerd voor de ingang",
      "ext-facade-jardin":
        "Villa met twee verdiepingen vanuit de tuin, overdekt terras en geparkeerde auto",
      "ext-pergola-allee":
        "Villa met lage volumes, lamellenpergola boven het terras, gazon en palmen",
      "ext-pergola-jour":
        "Terras onder een pergola met verticale lamellen, aan de rand van het gazon",
      "ext-pergola-portrait": "Pergola met donkere lamellen boven een gemeubileerd terras",
      "ext-piscine-crepuscule":
        "Hoek van een villa met twee verdiepingen, hoge ramen met gordijnen en zwembad",
      "ext-piscine-jour":
        "Zwembad aan de voet van een villa met twee verdiepingen, balkons en ligbedden",
      "ext-piscine-soir": "Verlichte villa in de schemering, zwembad en terras op de verdieping",
      "ext-terrasse-jour":
        "Buitenlounge onder een overkapping, tussen witte volumes en houten bekleding",
      "ext-terrasses-cactus":
        "Villa met twee verdiepingen en terrassen, gazon, cactussen en ligbedden",
      "ext-volume-lames": "Donker volume met oplichtende lamellen, binnenplaats met een palm",
      "int-chambre-bois":
        "Slaapkamer met donkere houten lambrisering, groot bed en lichte marmeren vloer",
      "int-chambre-jour": "Lichte slaapkamer, laag bed en een glazen wand naar de tuin",
      "int-chambre-soir": "Slaapkamer in grijstinten, bed, fauteuils en kleedkamer",
      "int-salon": "Woonkamer met een gebogen bank onder ronde hanglampen, bonsai op de salontafel",
    },
    visionneuse: "Galerij op groot formaat",
    agrandir: (alt) => `Vergroten: ${alt}`,
    precedente: "Vorige afbeelding",
    suivante: "Volgende afbeelding",
    fermer: "Galerij sluiten",
    position: (i, n) => `${i} / ${n}`,
  },
  ruban: {
    aria: "De renders van het domein, scrollend",
    note: "Renders van de architect · illustraties, niet contractueel",
    titre: ["Het domein,", "in beeld."],
    galerie: "De hele galerij bekijken",
    pause: "Pauze",
    lecture: "Afspelen",
  },
  marque: {
    defilant: "CITYSTAR · VEERTIEN PRIVÉVILLA’S · OULAD HASSOUNE · MARRAKECH · ",
    legende: "Oulad Hassoune · Marrakech",
    aria: "CITYSTAR, een privéresidentie in Oulad Hassoune, Marrakech",
  },
  processus: {
    titre: ["Van het eerste bezoek", "tot de sleuteloverdracht."],
    intro: "Eén aanspreekpunt begeleidt u bij elke stap, van het eerste gesprek tot uw aankomst.",
    etapes: (acompte, livraison) => [
      {
        titre: "Het eerste gesprek",
        texte:
          "Via video of telefoon stelt een adviseur u het domein, de villa’s, de plattegronden en de 360°-rondleiding voor.",
      },
      {
        titre: "De keuze van uw villa",
        texte:
          "Bezichtiging ter plaatse of op afstand. U ontvangt de prijs en het betalingsschema van de gekozen villa.",
      },
      {
        titre: "De reservering bij de notaris",
        texte: `U reserveert rechtstreeks bij de notaris, met ${acompte} van de prijs.`,
      },
      {
        titre: "De financiering",
        texte: "Contant of met een hypotheek: uw adviseur begeleidt u bij de stappen met uw bank.",
      },
      {
        titre: "De bouw volgen",
        texte:
          "Vanuit uw eigenaarsomgeving: voortgang, bouwfoto’s, betalingen en documenten. Elke betaling loopt via de notaris.",
      },
      {
        titre: "De sleuteloverdracht",
        texte: `Oplevering gepland voor ${livraison}. Uw villa wordt sleutelklaar aan u overgedragen.`,
      },
    ],
    cta: "Beginnen met een eerste gesprek",
  },
  questions: {
    titre: ["Kopen op plan,", "met een gerust gevoel."],
    intro: "De vragen die ons vóór elke reservering gesteld worden.",
    toutes: "Alle vragen",
  },
  engagements: {
    titre: ["Drie toezeggingen.", "Volledig vertrouwen."],
    intro: "Concrete garanties, in elke fase van uw aankoop.",
    items: (fondsPropres) => [
      {
        titre: "Een ontwikkelaar die al heeft opgeleverd",
        texte: "Ervaring in vastgoedontwikkeling die zich in het buitenland al heeft bewezen.",
      },
      {
        titre: `${fondsPropres} eigen vermogen`,
        texte:
          "De bouw wordt met eigen vermogen gefinancierd: hij hangt niet af van een lening van de ontwikkelaar of van verkopen op plan.",
      },
      {
        titre: "De notaris vanaf de reservering",
        texte:
          "De reservering wordt rechtstreeks bij de notaris ondertekend en elke betaling loopt via het notariskantoor.",
      },
    ],
    cta: "Het dossier ontvangen",
    selection: { outil: "CITYSTAR-dossier", ligne: "Aanvraag van het volledige dossier" },
  },
  marche: {
    titre: "Marrakech versnelt.",
    transactions: (annee) => `Transacties in Marrakech in ${annee}`,
    prix: (annee) => `Prijzen in Marrakech in ${annee}`,
    comparaison: (annee) => `Evolutie van de transacties in ${annee}, per stad`,
    conclusion: (n) => `De vraag versnelt. Bij CITYSTAR stopt het aanbod bij ${n} villa’s.`,
    source: "Bron en methode",
    sourceTexte: (annee) =>
      `Bank Al-Maghrib en ANCFCC, vastgoedprijsindex (IPAI): evolutie in ${annee} van het aantal transacties en van de prijsindex, per stad.`,
    sourceLien: "Het verslag van de publicatie lezen",
  },
  cercle: {
    titre: "Een eerste gesprek, vrijblijvend.",
    intro: "Kies het gesprek dat bij u past.",
    options: {
      visio: {
        titre: "Videogesprek",
        texte: "Een presentatie van het domein en de villa’s, op afstand.",
      },
      rappel: {
        titre: "Teruggebeld worden",
        texte: "Een adviseur belt u terug om uw vragen te beantwoorden.",
      },
      rendement: {
        titre: "Mijn rendement simuleren",
        texte: "Een eerste projectie, om samen te verfijnen.",
      },
    },
    selection: "Eerste gesprek",
  },
  pied: {
    sceau: "PRIVÉRESIDENTIE · CITYSTAR · MARRAKECH · ",
    titre: ["Een rechtstreeks ", "contact."],
    appeler: "Bellen",
    whatsapp: "WhatsApp",
    conciergerie: "Conciërge",
    ecrire: "Schrijven",
    brochure: "Brochure",
    theme: ["Luxevilla in Marrakech", "luxe-villa-marrakech"],
    nav: "Voettekst",
    legal: (annee) => `© ${annee} CITYSTAR · Privéresidentie · Oulad Hassoune, Marrakech`,
    instagram: "CITYSTAR op Instagram",
    realise: "Gemaakt door",
    propulse: "Mogelijk gemaakt door",
    youtube: "CITYSTAR op YouTube",
  },
  selecteur: {
    kicker: "Mijn villa vinden",
    question: (n, total) => `Vraag ${n} / ${total}`,
    progression: "Voortgang",
    recommandation: "Aanbeveling",
    notre: "Onze aanbeveling",
    retour: "Terug",
    clavier: "Toetsenbord: cijfers om te antwoorden, pijl naar links om terug te gaan",
    recap: "Uw antwoorden",
    apercu: "Voorvertoning van de drie villa’s",
    voirVilla: "De villa bekijken",
    dossier: "Terugbellen over deze villa",
    prive:
      "Uw antwoorden blijven op dit apparaat: ze worden alleen aan uw aanvraag toegevoegd als u die verstuurt.",
    recommencer: "Opnieuw beginnen",
    comparer: "Vergelijken met de andere twee",
    rendement: "Het rendement schatten",
    outil: "Villakiezer",
    ligneRecommandation: (type) => `Aanbeveling: villa ${type}`,
    conversion: "Omgerekende bedragen, indicatief",
    questions: {
      usage: {
        titre: "U denkt aan CITYSTAR om…",
        vivre: "Er te wonen",
        vivreNote: "Hoofd- of tweede verblijf",
        investir: "Te investeren",
        investirNote: "Belegging of verhuur",
      },
      suites: {
        titre: "Hoeveel suites wilt u?",
        suites: (n) => `${n} suites`,
        peuImporte: "Maakt niet uit",
      },
      budget: {
        titre: "Welk budget heeft u in gedachten?",
        jusqua: (montant) => `Tot ${montant}`,
        curseur: "Uw budget",
        valider: "Dit budget bevestigen",
        parler: "Laten we praten",
        parlerNote: "Persoonlijk",
      },
      pmr: {
        titre: "Heeft u een drempelloze, toegankelijke woning nodig?",
        oui: "Ja",
        ouiNote: "Lift, toegankelijke badkamers",
        non: "Nee",
      },
    },
    raisons: {
      pmr: "Niet toegankelijk",
      suites: (n) => `${n} suites`,
      budget: "Boven budget",
      autre: "Minder geschikt",
    },
    justifications: {
      pmr: (taille) =>
        `De enige villa ontworpen voor beperkte mobiliteit: lift en toegankelijke badkamers, ${taille}.`,
      pmrSuites: (plus) => ` Ze heeft ${plus ? "meer" : "minder"} suites dan u vroeg.`,
      contemporaine: (taille, exacte) =>
        `${taille}, eigentijdse volumes en een eigen zwembad${exacte ? ": de maat die u zoekt." : "."}`,
      budgetSeule: " Het is de villa die in uw budget past.",
      polyvalente: (taille) => `De veelzijdigste: ${taille}, verlengd door ruime terrassen.`,
      espace: (taille) => `${taille}, verlengd door ruime terrassen: de ruimte die u zoekt.`,
      horsBudget: " Haar prijs ligt boven het opgegeven budget: laten we erover praten.",
    },
  },
  comparateur: {
    kicker: "Vergelijken",
    titre: ["Wat ze ", "onderscheidt."],
    note: "Verschillen berekend ten opzichte van de referentievilla",
    budget: (villas) => `Binnen het opgegeven budget: ${villas}`,
    aucune: "geen villa",
    votreBudget: "Uw budget",
    horsBudget: "Boven budget",
    reference: "Referentie",
    referenceAria: "Referentievilla",
    prendreReference: (type) => `Villa ${type} als referentie nemen`,
    differences: "Alleen de verschillen",
    tableauAria: "Vergelijkingstabel van de drie villa’s",
    surface: "Bebouwde oppervlakte",
    surfaceCourt: ["Bebouwde", "oppervlakte"],
    terrain: "Perceel",
    suites: "Suites",
    pmr: ["Drempelloze", "toegang"],
    pmrOui: "Ja",
    pmrDetail: "Lift, toegankelijke badkamers",
    pmrNon: "Niet voorzien",
    atout: "Karakter",
    plans: "Plattegronden",
    deuxPlans: "2 plattegronden",
    brochure: "Brochure",
    prix: "Prijs",
    prixIndicatif: "Indicatieve prijs",
    defiler: "Scrollen om te vergelijken",
    rappel: (type) => `Terugbellen over villa ${type}`,
    outil: "Villavergelijker",
    ligneReference: (type) => `Referentievilla: ${type}`,
    ligneBudget: (montant) => `Budget: ${montant}`,
    estReference: " · referentie",
    suite: "suite",
  },
  rentabilite: {
    kicker: "Simulator",
    titre: ["En als de villa ", "voor u werkte?"],
    modes: { court: "Kortetermijnverhuur", long: "Langetermijnverhuur", revente: "Doorverkoop" },
    modeAria: "Simulatiemodus",
    prix: "Prijs van het pand",
    intro: [
      "Geef het budget en het beoogde gebruik op, pas de aannames aan en toon de schatting, in de valuta van uw keuze.",
      "De schuifjes vertrekken van illustratieve waarden: pas ze aan uw project aan. De definitieve cijfers worden door de ontwikkelaar bevestigd.",
    ],
    budget: "Bestudeerd budget",
    typeLabel: "Villatype",
    optionnel: "optioneel",
    typeLibre: "Weet ik nog niet",
    typeVilla: (type) => `Villatype ${type}`,
    projet: "Uw project",
    estimer: "Mijn schatting bekijken",
    resultatTitre: "Uw schatting",
    budgetSaisi: "Bestudeerd budget",
    usage: "Beoogd gebruik",
    recap: (budget, usage) => `Bestudeerd budget: ${budget} · ${usage}`,
    fourchette: (min, max) => `Van ${min} tot ${max}`,
    prixEtudie: (montant) => `Bestudeerde prijs: ${montant}`,
    champs: {
      prixMoyenNuitEUR: "Gemiddelde prijs per nacht",
      tauxOccupation: "Bezettingsgraad",
      semainesUsagePersonnel: "Weken eigen gebruik",
      loyerMensuelEUR: "Geschatte maandhuur",
      horizonAnnees: "Horizon",
      appreciationAnnuelle: "Jaarlijkse waardestijging",
      charges: "Exploitatiekosten",
      coutsAnnuelsEUR: "Bezitskosten",
      imposition: "Belasting",
    },
    semaine: (n) => `${n} ${n > 1 ? "weken" : "week"}`,
    an: (n) => `${n} jaar`,
    desRevenus: "van de inkomsten",
    parAn: "/ jaar",
    attente: "In afwachting",
    avancees: "Geavanceerde aannames",
    rendementBrut: "Bruto rendement",
    plusValueBrute: "Bruto meerwaarde",
    nuits: "Verhuurde nachten per jaar",
    revenuBrut: "Bruto jaarinkomsten",
    loyerDouze: "Huur × 12 maanden",
    valeurProjetee: (annees) => `Verwachte waarde na ${annees} jaar`,
    appreciation: "Aanname waardestijging",
    neutreTitre: "Aannames worden gevalideerd",
    neutreTexte:
      "Er wordt geen rendement gepubliceerd zolang de aannames niet door de ontwikkelaar zijn bevestigd. Ontvang een analyse op basis van uw eigen project.",
    mention:
      "Illustratieve, niet-contractuele aannames: verschuif de schuifjes om uw eigen aannames te testen. Schatting vóór kosten, belasting en werkelijke exploitatiekosten.",
    courtTerme: "Kortetermijnverhuur in Marrakech is onderworpen aan lokale meldingsplichten.",
    analyse: "Teruggebeld worden om het te bespreken",
    compatibles: "De villa’s binnen budget bekijken",
    outil: "Rendementssimulator",
    ligneMode: (mode) => `Modus: ${mode}`,
    ligneType: (type) => `Bestudeerd type: ${type}`,
    ligneResultat: (titre, valeur) => `${titre}: ${valeur}`,
    ligneNeutre: "Aannames worden gevalideerd",
  },
  contact: {
    kicker: "CITYSTAR-conciërge",
    titre: ["Teruggebeld ", "worden."],
    texte:
      "Laat uw gegevens achter en een CITYSTAR-adviseur belt u terug om uw vragen te beantwoorden, over plattegronden, prijzen of een bezoek aan het domein. Bij het verzenden opent uw e-mailprogramma met de aanvraag klaar.",
    jointe: (outil) => `Toegevoegd aan uw aanvraag · ${outil}`,
    retirer: "Niet toevoegen",
    nom: "Voor- en achternaam",
    telephone: "Telefoon",
    email: "E-mail",
    interet: "Uw interesse",
    interets: [
      "Het project ontdekken",
      "Villatype A",
      "Villatype B",
      "Villatype C",
      "Een bezichtiging plannen",
    ],
    envoyer: "Mijn aanvraag versturen",
    fermer: "Sluiten",
  },
  modales: {
    plan: "Vergrote plattegrond",
    planAlt: "Architectonische plattegrond van CITYSTAR, vergroot",
    fermerPlan: "Plattegrond sluiten",
  },
};
