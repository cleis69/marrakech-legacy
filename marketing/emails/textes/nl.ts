import type { Copie } from "./fr";

const nl: Copie = {
  lieu: "Privédomein · Marrakech",
  rendu: "3D-impressie, niet contractueel.",
  pied: {
    accroche: ["Veertien villa’s.", " Geen enkele meer."],
    lieu: (livraison) => `Oulad Hassoune, Marrakech · Oplevering ${livraison}`,
    site: "De website",
  },
  legal: { rendus: "3D-impressies zijn niet contractueel.", desinscrire: "Afmelden" },
  raisons: {
    dossier: "U ontvangt deze e-mail omdat u het CITYSTAR-informatiepakket hebt aangevraagd.",
    visite: "U ontvangt deze e-mail over uw afspraak bij CITYSTAR.",
    proprio: "U ontvangt deze e-mail als koper van een CITYSTAR-villa.",
  },
  signature: { salut: "Tot snel,", role: "Adviseur CITYSTAR", equipe: "Het CITYSTAR-team" },
  poids: (mo) => `${mo} MB`,
  planPdf: "Plattegrond (pdf)",
  suites: (n) => `${n} suites`,
  plainPied: "drempelvrij toegankelijk",
  source: "Bron",
  contact: {
    visite: { kicker: "Uw adviseur", titre: "Bezoek het domein samen met ons.", texte: "Ter plaatse in Marrakech of via video, op een moment dat u schikt. Uw adviseur beantwoordt al uw vragen.", principal: "Plan een bezoek", secondaire: "Spreek een adviseur" },
    avant: { kicker: "Uw adviseur", titre: "Een vraag vóór uw bezoek?", texte: "Uw adviseur antwoordt direct, via WhatsApp of telefoon.", principal: "Stuur mijn adviseur een bericht", secondaire: "Bellen" },
    apres: { kicker: "Uw adviseur", titre: "Twijfelt u nog?", texte: "Kom het domein nog eens bekijken, ter plaatse of via video, of stel uw vragen aan uw adviseur.", principal: "Plan een nieuw bezoek", secondaire: "Spreek een adviseur" },
    proprio: { kicker: "Uw adviseur", titre: "Uw adviseur blijft aan uw zijde.", texte: "Een vraag over de bouw, een betaling of een document? Stuur uw adviseur een bericht of bel.", principal: "Stuur mijn adviseur een bericht", secondaire: "Bellen" },
    telephone: (tel) => `of bel ${tel}`,
    messages: {
      visite: "Hallo, ik wil graag een bezoek aan CITYSTAR plannen, ter plaatse of via video.",
      conseiller: "Hallo, ik wil graag een adviseur van CITYSTAR spreken.",
      proprio: "Hallo, ik ben koper van een CITYSTAR-villa en ik heb een vraag.",
    },
  },
  faits: {
    villas: "privévilla’s",
    construits: "woonoppervlak, maximaal",
    terrain: "grond per villa",
    trajet: "van Jemaa el-Fna",
  },
  d1: {
    objet: "Uw CITYSTAR-informatiepakket",
    preheader: "De brochure, de plattegronden van de drie villa’s en de volgende stappen.",
    alt: "Een CITYSTAR-villa bij schemering, met verlicht zwembad",
    kicker: "Uw informatiepakket",
    titre: ["Welkom", "bij CITYSTAR[[, prenom]]."],
    intro:
      "Dank voor uw aanvraag. Hiermee kunt u meteen beginnen: de brochure van het domein en de plattegronden van de drie villa’s.",
    brochure: "Brochure van het domein",
    planVilla: (type) => `Plattegronden van villa ${type}`,
    texte:
      "Ik stuur u persoonlijk de prijs per villa, de beschikbaarheid en het betalingsschema. Het gaat sneller als u mij laat weten wat u zoekt: de architectuur die u aanspreekt, uw planning en of u koopt om er te wonen of om te verhuren.",
    bouton: "Ontdek het domein online",
  },
  d2: {
    objet: "A, B of C?",
    preheader: "Drie architecturen, dezelfde standaard. Welke past bij u?",
    kicker: "De villa’s",
    titre: ["Drie architecturen,", "dezelfde standaard."],
    intro: (terrain) =>
      `Elke villa staat op ${terrain} grond, met een eigen privézwembad. Wat verschilt: de volumes, het aantal suites, de manier waarop u met het licht leeft.`,
    altVilla: (type) => `Impressie van villa ${type}`,
    texte:
      "De vergelijker op de website zet ze naast elkaar, en een vragenlijst van vier vragen wijst u de villa die het best bij u past.",
    bouton: "Vergelijk de drie villa’s",
  },
  d3: {
    objet: "Stap binnen voordat ze bestaat",
    preheader: "De 360°-rondleiding, kamer voor kamer, vanaf uw bank.",
    alt: "De woonkamer van een CITYSTAR-villa",
    kicker: "360°-rondleiding",
    titre: ["Stel het u niet voor.", "Stap binnen."],
    intro:
      "De woonkamer, de suites, de terrassen, het zwembad: de 360°-rondleiding brengt u van kamer naar kamer alsof u er bent. Op de computer of de telefoon, op volledig scherm.",
    points: ["Alle kamers, in 360°", "Het uitzicht vanaf de terrassen", "De tuin en het privézwembad"],
    bouton: "Start de 360°-rondleiding",
    secondaire: "Liever een rondleiding via videogesprek",
    whatsapp: "Hallo, ik wil graag een rondleiding door CITYSTAR via videogesprek.",
  },
  d4: {
    objet: "Wat u betaalt, en wanneer",
    preheader: (part) => `${part} bij de notaris, daarna het saldo in het tempo van de bouw.`,
    kicker: "Met een gerust hart kopen",
    titre: ["Wat u betaalt,", "en wanneer."],
    intro: "Op plan kopen in het buitenland vraagt vertrouwen. Zo verloopt een aankoop bij CITYSTAR.",
    etapes: (part, livraison) => [
      { titre: `${part} bij reservering`, texte: "De reservering wordt rechtstreeks bij de notaris getekend, niet op een verkoopkantoor." },
      { titre: "Het saldo volgt de bouw", texte: "Elk betalingsverzoek hoort bij een afgeronde fase: fundering, ruwbouw, afwerking." },
      { titre: `Sleuteloverdracht, ${livraison}`, texte: "De laatste betaling bij de oplevering van uw villa." },
    ],
    encadre: (fondsPropres) => ({
      titre: `${fondsPropres} eigen middelen`,
      texte:
        "De ontwikkelaar financiert de bouw met eigen middelen. Hij accepteert ook kopers die hun villa met een hypotheek financieren, en heeft al projecten in het buitenland opgeleverd.",
    }),
    texte: "Uw adviseur geeft u het exacte betalingsschema van de villa die u kiest.",
    bouton: "Ontvang het schema van mijn villa",
    whatsapp: "Hallo, ik ontvang graag het gedetailleerde betalingsschema van een CITYSTAR-villa.",
  },
  d5: {
    objet: "Marrakech versnelt",
    preheader: (evolution, annee) =>
      `${evolution} vastgoedtransacties in ${annee}, vóór Rabat en Casablanca.`,
    alt: "Luchtfoto van een villa en haar zwembad",
    kicker: "Investeren",
    titre: ["Marrakech", "versnelt."],
    intro: (annee, prix) =>
      `In ${annee} groeide het aantal vastgoedtransacties in Marrakech sneller dan in de andere grote steden van het land, bij stabiele prijzen (${prix}).`,
    legende: (annee) => `Ontwikkeling van het aantal transacties in ${annee}, IPAI-index (Bank Al-Maghrib en ANCFCC).`,
    texte: (villas) =>
      `De vraag versnelt; bij CITYSTAR stopt het aanbod bij ${villas} villa’s. De simulator op de website berekent het bruto rendement van vakantieverhuur op basis van uw eigen aannames.`,
    bouton: "Bereken mijn rendement",
  },
  d6: {
    objet: "Uw bouw, vanuit huis",
    preheader: "Voortgang, foto’s, betalingen, documenten: alles in uw eigenaarsomgeving.",
    alt: "Gevel van een CITYSTAR-villa met verticale lamellen",
    kicker: "Na de reservering",
    titre: ["Uw bouw,", "gevolgd waar u ook woont."],
    intro:
      "Wie ver van huis koopt, stelt altijd dezelfde vraag: hoe weet ik hoe ver de bouw is? Bij CITYSTAR krijgt elke koper persoonlijke toegang tot zijn eigenaarsomgeving.",
    points: [
      "<b>De voortgang</b> van uw villa, in procenten, met een woord van de ontwikkelaar",
      "<b>Bouwfoto’s</b>, bij elke fase",
      "<b>Uw betalingen</b>: wat betaald is, wat openstaat, de volgende termijn",
      "<b>Uw documenten</b>: contract, plattegronden, betalingsverzoeken",
    ],
    texte: "Geen wachtwoord: u ontvangt een inloglink per e-mail, en u bent binnen.",
    bouton: "Bekijk de eigenaarsomgeving",
  },
  d7: {
    objet: "Veertien kavels",
    preheader: "De eerste kopers kiezen de ligging.",
    kicker: "De situatietekening",
    titre: ["Veertien kavels.", "Wie eerst komt, kiest eerst."],
    alt: "Situatietekening van het CITYSTAR-domein",
    legende: "Situatietekening van het domein, niet contractueel.",
    texte:
      "De plek in het domein, de oriëntatie van het zwembad, architectuur A, B of C: elke reservering beperkt de keuze voor wie volgt.",
    texte2:
      "Spreekt een van de villa’s u aan? Vraag de lijst met kavels die nog vrij zijn: dan weet u precies wat er nog te kiezen valt.",
    bouton: "Beschikbaarheid opvragen",
    whatsapp: "Hallo, welke CITYSTAR-villa’s zijn nog beschikbaar?",
  },
  d8: {
    objet: "Een korte vraag",
    preheader: "Een antwoord met één cijfer is genoeg.",
    bonjour: "Hallo[[ prenom]],",
    texte:
      "U hebt het CITYSTAR-informatiepakket drie weken geleden ontvangen, en ik wil u niet voor niets schrijven. Hoe staat het met uw plannen?",
    consigne: "Beantwoord deze e-mail gewoon met een cijfer:",
    choix: [
      "Ik wil een bezoek brengen, ter plaatse of via video.",
      "Ik heb vragen over de financiering of over kopen vanuit het buitenland.",
      "Het is nu niet het moment: neem later weer contact met mij op.",
    ],
    fin: "Ik antwoord snel, en ik respecteer uw keuze.",
  },
  v1: {
    objet: "Uw bezoek aan CITYSTAR",
    preheader: "Het adres, de route en wat we samen gaan bekijken.",
    alt: "De ingang van het CITYSTAR-domein bij schemering",
    kicker: "Uw afspraak",
    titre: ["Tot binnenkort", "bij CITYSTAR."],
    lieu: "Oulad Hassoune, Marrakech. Uw adviseur wacht u op bij de ingang van het domein.",
    intro: "Tijdens het bezoek bekijken we samen:",
    points: [
      "Het domein en de ligging van de kavels die nog vrij zijn",
      "De plattegronden van de villa die u interesseert",
      "De prijs, het betalingsschema en de stappen van de aankoop",
    ],
    bouton: "Open de route",
    secondaire: "Verhinderd? Laat het mij weten via WhatsApp",
    whatsapp: "Hallo, ik moet mijn bezoek aan CITYSTAR verzetten.",
  },
  v2: {
    objet: "Tot morgen",
    preheader: (minutes) => `Afspraak op het domein, op ${minutes} minuten van Jemaa el-Fna.`,
    bonjour: "Hallo[[ prenom]],",
    texte: "Hierbij bevestig ik onze afspraak van morgen, [[heure]], op het CITYSTAR-domein.",
    itineraire: "De route naar het domein",
    distance: (minutes) => `, op ${minutes} minuten van Jemaa el-Fna en de luchthaven`,
    points: ["Comfortabele schoenen om over het domein te lopen", "Uw vragen: geen enkele is te veel"],
    visio:
      "Bent u nog ver van Marrakech? Het bezoek kan ook via video: laat het mij weten, dan stuur ik u de link.",
  },
  v3: {
    objet: "Dank voor uw bezoek",
    preheader: "Een samenvatting, en de drie stappen tot de sleutels.",
    kicker: "Na uw bezoek",
    titre: ["Dank voor", "uw bezoek."],
    intro:
      "Het was een genoegen u het domein te laten zien. Zoals beloofd, dit zijn de volgende stappen als een van de villa’s u heeft overtuigd:",
    etapes: (part, livraison) => [
      { titre: "U kiest uw villa", texte: "De architectuur, de kavel, de oriëntatie. Ik bevestig u de beschikbaarheid." },
      { titre: "U reserveert bij de notaris", texte: `${part} van de prijs bij ondertekening. Een hypotheek is mogelijk.` },
      { titre: "U volgt uw bouw", texte: `Vanuit uw eigenaarsomgeving, tot de sleuteloverdracht in ${livraison}.` },
    ],
    bouton: "Reserveer mijn villa",
    whatsapp: "Hallo, ik wil graag een CITYSTAR-villa reserveren.",
    secondaire: "Bekijk de 360°-rondleiding opnieuw",
  },
  p1: {
    objet: "Welkom thuis",
    preheader: "Uw eigenaarsomgeving is geopend.",
    alt: "Het terras van een CITYSTAR-villa",
    kicker: "Villa [[villa]]",
    titre: ["Welkom", "thuis."],
    intro: "Gefeliciteerd[[, prenom]]: villa [[villa]] is van u. Uw eigenaarsomgeving is vanaf vandaag open.",
    etapes: [
      { titre: "Open uw omgeving", texte: "Klik op de knop hieronder en vul dit e-mailadres in: [[email]]." },
      { titre: "Ontvang uw link", texte: "Er komt een inloglink in uw mailbox. Geen wachtwoord om te onthouden." },
      { titre: "Volg uw villa", texte: "Voortgang, bouwfoto’s, betalingen en documenten." },
    ],
    bouton: "Open mijn omgeving",
  },
  p2: {
    objet: "Zo volgt u uw bouw",
    preheader: "Wat u in uw omgeving vindt, en wanneer.",
    kicker: "Uw eigenaarsomgeving",
    titre: ["Zo volgt u", "uw bouw."],
    intro: "Uw villa gaat de bouwfase in. Dit vindt u in uw omgeving, en op welk moment.",
    points: [
      "<b>Na elke afgeronde fase</b>: de bijgewerkte voortgang en de foto’s van uw villa",
      "<b>Vóór elk betalingsverzoek</b>: het bedrag, de vervaldatum en daarna de kwitantie",
      "<b>Altijd</b>: uw contract, plattegronden en documenten, om te downloaden",
    ],
    encadre: (livraison) => ({
      titre: `Oplevering ${livraison}`,
      texte:
        "U ontvangt een e-mail bij elke nieuwe bouwfase. Uw adviseur blijft bereikbaar via WhatsApp voor al uw vragen.",
    }),
    bouton: "Open mijn omgeving",
  },
  p3: {
    objet: "Nieuws over uw villa",
    preheader: "Er is een nieuwe fase afgerond. De foto’s staan online.",
    alt: "Bouwfoto",
    legende: "Vervang deze afbeelding door een foto van de bouwplaats.",
    kicker: "Bouwnieuws",
    titre: ["[[edit:fase]]:", "afgerond."],
    avancement: "[[edit:voortgang]] %",
    prochaine: "[[edit:volgende fase]]",
    faits: { avancement: "van de werken", prochaine: "volgende fase", livraison: "oplevering" },
    mot: "[[edit:een woord van de ontwikkelaar]]",
    texte:
      "De nieuwe foto’s van uw villa staan in uw omgeving, samen met het volgende betalingsverzoek als deze fase er een oplevert.",
    bouton: "Bekijk de foto’s",
  },
  n1: {
    objet: "De bouw vordert",
    preheader: "Nieuws van het domein, en de villa’s die nog vrij zijn.",
    alt: "Bouwfoto",
    legende: "Vervang deze afbeelding door een foto van de bouwplaats.",
    kicker: "Nieuws van het domein",
    titre: ["De bouw", "vordert."],
    intro: (livraison) =>
      `Sinds uw aanvraag van het informatiepakket heeft CITYSTAR een nieuwe fase bereikt: [[edit:fase]]. De villa’s krijgen vorm en de oplevering blijft gepland voor ${livraison}.`,
    restantes: "[[edit:vrije villa’s]]",
    faits: {
      restantes: (villas) => `villa’s nog vrij van de ${villas}`,
      livraison: "oplevering",
      reservation: "bij reservering",
    },
    texte: "Is uw plan nog actueel? Dan is dit het moment om uw kavel te kiezen, vóór de volgende kopers.",
    bouton: "Ontvang de beschikbaarheid",
    whatsapp: "Hallo, ik wil graag weten welke CITYSTAR-villa’s nog beschikbaar zijn.",
    secondaire: "Bekijk het domein opnieuw online",
  },
};

export default nl;
