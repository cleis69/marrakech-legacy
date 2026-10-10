import type { Copie } from "./fr";

const no: Copie = {
  lieu: "Privat boligområde · Marrakech",
  rendu: "3D-illustrasjon, ikke bindende.",
  pied: {
    accroche: ["Fjorten villaer.", " Ikke én til."],
    lieu: (livraison) => `Oulad Hassoune, Marrakech · Ferdig ${livraison}`,
    site: "Nettsiden",
  },
  legal: { rendus: "3D-illustrasjonene er ikke bindende.", desinscrire: "Meld deg av" },
  raisons: {
    dossier: "Du mottar denne e-posten fordi du ba om salgsoppgaven for CITYSTAR.",
    visite: "Du mottar denne e-posten i forbindelse med avtalen din hos CITYSTAR.",
    proprio: "Du mottar denne e-posten som kjøper av en CITYSTAR-villa.",
  },
  signature: { salut: "Snakkes snart,", role: "Rådgiver hos CITYSTAR", equipe: "CITYSTAR-teamet" },
  poids: (mo) => `${mo} MB`,
  planPdf: "Plantegning (PDF)",
  suites: (n) => `${n} suiter`,
  plainPied: "trinnfri adkomst",
  source: "Kilde",
  contact: {
    visite: { kicker: "Rådgiveren din", titre: "Bli med på visning av området.", texte: "På stedet i Marrakech eller på video, når det passer deg. Rådgiveren din svarer på alle spørsmålene dine.", principal: "Avtal en visning", secondaire: "Snakk med en rådgiver" },
    avant: { kicker: "Rådgiveren din", titre: "Et spørsmål før visningen?", texte: "Rådgiveren din svarer direkte, på WhatsApp eller telefon.", principal: "Skriv til rådgiveren min", secondaire: "Ring" },
    apres: { kicker: "Rådgiveren din", titre: "Fortsatt i tvil?", texte: "Kom og se området igjen, på stedet eller på video, eller still spørsmålene dine til rådgiveren.", principal: "Avtal en ny visning", secondaire: "Snakk med en rådgiver" },
    proprio: { kicker: "Rådgiveren din", titre: "Rådgiveren din er fortsatt her for deg.", texte: "Et spørsmål om byggingen, en betaling eller et dokument? Skriv eller ring til rådgiveren din.", principal: "Skriv til rådgiveren min", secondaire: "Ring" },
    telephone: (tel) => `eller ring ${tel}`,
    messages: {
      visite: "Hei, jeg vil gjerne avtale en visning av CITYSTAR, på stedet eller på video.",
      conseiller: "Hei, jeg vil gjerne snakke med en rådgiver hos CITYSTAR.",
      proprio: "Hei, jeg har kjøpt en CITYSTAR-villa og har et spørsmål.",
    },
  },
  faits: {
    villas: "private villaer",
    construits: "boareal, maksimalt",
    terrain: "tomt per villa",
    trajet: "fra Jemaa el-Fna",
  },
  d1: {
    objet: "Salgsoppgaven din for CITYSTAR",
    preheader: "Brosjyren, tegningene av de tre villaene, og veien videre.",
    alt: "En CITYSTAR-villa i skumringen, med opplyst basseng",
    kicker: "Salgsoppgaven din",
    titre: ["Velkommen", "til CITYSTAR[[, prenom]]."],
    intro:
      "Takk for forespørselen. Dette kan du begynne med allerede nå: brosjyren for området og tegningene av de tre villaene.",
    brochure: "Brosjyre for området",
    planVilla: (type) => `Tegninger av villa ${type}`,
    texte:
      "Jeg sender deg personlig prisen per villa, ledigheten og betalingsplanen. Det går raskere om du forteller meg hva du ser etter: arkitekturen som frister, tidsplanen din, og om du kjøper for å bo eller for å leie ut.",
    bouton: "Utforsk området på nett",
  },
  d2: {
    objet: "A, B eller C?",
    preheader: "Tre arkitekturer, samme krav til kvalitet. Hvilken passer deg?",
    kicker: "Villaene",
    titre: ["Tre arkitekturer,", "samme krav til kvalitet."],
    intro: (terrain) =>
      `Hver villa ligger på ${terrain} tomt, med eget privat basseng. Det som skiller dem: volumene, antall suiter, måten du lever med lyset på.`,
    altVilla: (type) => `Illustrasjon av villa ${type}`,
    texte:
      "Sammenligningsverktøyet på nettsiden setter dem side om side, og fire korte spørsmål viser deg hvilken som passer deg best.",
    bouton: "Sammenlign de tre villaene",
  },
  d3: {
    objet: "Gå inn før den finnes",
    preheader: "360°-visningen, rom for rom, fra sofaen din.",
    alt: "Stuen i en CITYSTAR-villa",
    kicker: "360°-visning",
    titre: ["Ikke forestill deg den.", "Gå inn."],
    intro:
      "Stuen, suitene, terrassene, bassenget: 360°-visningen tar deg fra rom til rom som om du var der. På datamaskin eller mobil, i fullskjerm.",
    points: ["Alle rom, i 360°", "Utsikten fra terrassene", "Hagen og det private bassenget"],
    bouton: "Start 360°-visningen",
    secondaire: "Jeg vil heller ha en guidet visning på video",
    whatsapp: "Hei, jeg vil gjerne ha en guidet visning av CITYSTAR på video.",
  },
  d4: {
    objet: "Hva du betaler, og når",
    preheader: (part) => `${part} hos notarius, deretter resten i takt med byggingen.`,
    kicker: "Trygt kjøp",
    titre: ["Hva du betaler,", "og når."],
    intro: "Å kjøpe en bolig under oppføring i utlandet krever tillit. Slik foregår et kjøp hos CITYSTAR.",
    etapes: (part, livraison) => [
      { titre: `${part} ved reservasjon`, texte: "Reservasjonen signeres direkte hos notarius, ikke på et salgskontor." },
      { titre: "Resten følger byggingen", texte: "Hvert betalingsvarsel hører til en ferdig etappe: fundament, råbygg, innredning." },
      { titre: `Nøkkeloverlevering, ${livraison}`, texte: "Siste innbetaling når villaen din overleveres." },
    ],
    encadre: (fondsPropres) => ({
      titre: `${fondsPropres} egenkapital`,
      texte:
        "Utbyggeren finansierer byggingen med egne midler. Utbyggeren tar også imot kjøpere som finansierer villaen med boliglån, og har allerede levert prosjekter i utlandet.",
    }),
    texte: "Rådgiveren din gir deg den nøyaktige betalingsplanen for villaen du velger.",
    bouton: "Få betalingsplanen for min villa",
    whatsapp: "Hei, jeg vil gjerne ha den detaljerte betalingsplanen for en CITYSTAR-villa.",
  },
  d5: {
    objet: "Marrakech skyter fart",
    preheader: (evolution, annee) =>
      `${evolution} flere eiendomssalg i ${annee}, foran Rabat og Casablanca.`,
    alt: "Villa og basseng sett fra luften",
    kicker: "Investere",
    titre: ["Marrakech", "skyter fart."],
    intro: (annee, prix) =>
      `I ${annee} økte antallet eiendomssalg mer i Marrakech enn i de andre store byene i landet, mens prisene holdt seg stabile (${prix}).`,
    legende: (annee) => `Endring i antall eiendomssalg i ${annee}, IPAI-indeksen (Bank Al-Maghrib og ANCFCC).`,
    texte: (villas) =>
      `Etterspørselen øker; hos CITYSTAR stopper tilbudet på ${villas} villaer. Simulatoren på nettsiden beregner bruttoavkastningen ved korttidsutleie ut fra dine egne forutsetninger.`,
    bouton: "Beregn avkastningen min",
  },
  d6: {
    objet: "Byggingen din, hjemmefra",
    preheader: "Fremdrift, bilder, betalinger, dokumenter: alt på eiersiden din.",
    alt: "Fasade på en CITYSTAR-villa med vertikale lameller",
    kicker: "Etter reservasjonen",
    titre: ["Byggingen din,", "fulgt fra der du bor."],
    intro:
      "Å kjøpe langt hjemmefra reiser alltid det samme spørsmålet: hvordan vet jeg hvor langt byggingen har kommet? Hos CITYSTAR får hver kjøper personlig tilgang til sin egen eierside.",
    points: [
      "<b>Fremdriften</b> for villaen din, i prosent, med et ord fra utbyggeren",
      "<b>Bilder fra byggeplassen</b>, ved hver etappe",
      "<b>Betalingene dine</b>: hva som er betalt, hva som gjenstår, neste forfall",
      "<b>Dokumentene dine</b>: kontrakt, tegninger, betalingsvarsler",
    ],
    texte: "Ingen passord: du får en innloggingslenke på e-post, og så er du inne.",
    bouton: "Se eiersiden",
  },
  d7: {
    objet: "Fjorten tomter",
    preheader: "De første kjøperne velger beliggenheten.",
    kicker: "Situasjonsplanen",
    titre: ["Fjorten tomter.", "De første velger."],
    alt: "Situasjonsplan for CITYSTAR-området",
    legende: "Situasjonsplan for området, ikke bindende.",
    texte:
      "Plasseringen i området, bassengets retning, arkitektur A, B eller C: hver reservasjon begrenser valget for de neste.",
    texte2:
      "Hvis en av villaene frister, be om listen over tomter som fortsatt er ledige: da vet du nøyaktig hva som er igjen å velge mellom.",
    bouton: "Spør om ledighet",
    whatsapp: "Hei, hvilke CITYSTAR-villaer er fortsatt ledige?",
  },
  d8: {
    objet: "Et kort spørsmål",
    preheader: "Det holder å svare med ett tall.",
    bonjour: "Hei[[ prenom]],",
    texte:
      "Du fikk salgsoppgaven for CITYSTAR for tre uker siden, og jeg vil ikke skrive til deg uten grunn. Hvor står prosjektet ditt?",
    consigne: "Svar ganske enkelt på denne e-posten med et tall:",
    choix: [
      "Jeg vil komme på visning, på stedet eller på video.",
      "Jeg har spørsmål om finansiering eller om å kjøpe fra utlandet.",
      "Det passer ikke nå: kontakt meg igjen senere.",
    ],
    fin: "Jeg svarer raskt, og jeg respekterer valget ditt.",
  },
  v1: {
    objet: "Visningen din hos CITYSTAR",
    preheader: "Adressen, veibeskrivelsen og hva vi skal se på sammen.",
    alt: "Inngangen til CITYSTAR-området i skumringen",
    kicker: "Avtalen din",
    titre: ["Vi ses snart", "hos CITYSTAR."],
    lieu: "Oulad Hassoune, Marrakech. Rådgiveren din møter deg ved inngangen til området.",
    intro: "Under visningen ser vi sammen på:",
    points: [
      "Området og plasseringen av tomtene som fortsatt er ledige",
      "Tegningene av villaen du er interessert i",
      "Prisen, betalingsplanen og stegene i kjøpet",
    ],
    bouton: "Åpne veibeskrivelsen",
    secondaire: "Noe kom i veien? Gi meg beskjed på WhatsApp",
    whatsapp: "Hei, jeg må flytte visningen min hos CITYSTAR.",
  },
  v2: {
    objet: "Vi ses i morgen",
    preheader: (minutes) => `Møte på området, ${minutes} minutter fra Jemaa el-Fna.`,
    bonjour: "Hei[[ prenom]],",
    texte: "Jeg bekrefter avtalen vår i morgen, [[heure]], på CITYSTAR-området.",
    itineraire: "Veibeskrivelse til området",
    distance: (minutes) => `, ${minutes} minutter fra Jemaa el-Fna og flyplassen`,
    points: ["Gode sko for å gå rundt på området", "Spørsmålene dine: ingen er for mange"],
    visio:
      "Er du fortsatt langt unna Marrakech, kan visningen tas på video: si fra, så sender jeg deg lenken.",
  },
  v3: {
    objet: "Takk for besøket",
    preheader: "En oppsummering, og de tre stegene frem til nøklene.",
    kicker: "Etter besøket",
    titre: ["Takk", "for besøket."],
    intro:
      "Det var en glede å vise deg området. Som lovet, her er veien videre hvis en av villaene har overbevist deg:",
    etapes: (part, livraison) => [
      { titre: "Du velger villaen din", texte: "Arkitekturen, tomten, retningen. Jeg bekrefter at den er ledig." },
      { titre: "Du reserverer hos notarius", texte: `${part} av prisen ved signering. Boliglån godtas.` },
      { titre: "Du følger byggingen", texte: `Fra eiersiden din, frem til nøkkeloverleveringen i ${livraison}.` },
    ],
    bouton: "Reserver villaen min",
    whatsapp: "Hei, jeg vil gjerne reservere en CITYSTAR-villa.",
    secondaire: "Se 360°-visningen igjen",
  },
  p1: {
    objet: "Velkommen hjem",
    preheader: "Eiersiden din er åpen.",
    alt: "Terrassen på en CITYSTAR-villa",
    kicker: "Villa [[villa]]",
    titre: ["Velkommen", "hjem."],
    intro: "Gratulerer[[, prenom]]: villa [[villa]] er din. Eiersiden din er åpen fra i dag.",
    etapes: [
      { titre: "Åpne eiersiden", texte: "Klikk på knappen nedenfor og skriv inn denne e-postadressen: [[email]]." },
      { titre: "Få lenken din", texte: "En innloggingslenke kommer i innboksen din. Ingen passord å huske." },
      { titre: "Følg villaen din", texte: "Fremdrift, bilder fra byggeplassen, betalinger og dokumenter." },
    ],
    bouton: "Åpne eiersiden min",
  },
  p2: {
    objet: "Slik følger du byggingen",
    preheader: "Hva du finner på eiersiden, og når.",
    kicker: "Eiersiden din",
    titre: ["Slik følger du", "byggingen."],
    intro: "Villaen din går nå inn i byggefasen. Dette finner du på eiersiden, og når.",
    points: [
      "<b>Etter hver ferdig etappe</b>: oppdatert fremdrift og bilder av villaen din",
      "<b>Før hvert betalingsvarsel</b>: beløpet, forfallsdatoen, og kvitteringen når det er betalt",
      "<b>Når som helst</b>: kontrakt, tegninger og dokumenter til nedlasting",
    ],
    encadre: (livraison) => ({
      titre: `Ferdig ${livraison}`,
      texte:
        "Du får en e-post ved hver nye etappe i byggingen. Rådgiveren din er fortsatt tilgjengelig på WhatsApp for alle spørsmål.",
    }),
    bouton: "Åpne eiersiden min",
  },
  p3: {
    objet: "Nytt fra villaen din",
    preheader: "En ny etappe er ferdig. Bildene ligger ute.",
    alt: "Bilde fra byggeplassen",
    legende: "Bytt ut dette bildet med et bilde fra byggeplassen.",
    kicker: "Nytt fra byggeplassen",
    titre: ["[[edit:etappe]]:", "ferdig."],
    avancement: "[[edit:fremdrift]] %",
    prochaine: "[[edit:neste etappe]]",
    faits: { avancement: "av arbeidet", prochaine: "neste etappe", livraison: "ferdigstillelse" },
    mot: "[[edit:et ord fra utbyggeren]]",
    texte:
      "De nye bildene av villaen din ligger på eiersiden, sammen med neste betalingsvarsel hvis denne etappen utløser et.",
    bouton: "Se bildene",
  },
  n1: {
    objet: "Byggingen går fremover",
    preheader: "Nytt fra området, og villaene som er igjen.",
    alt: "Bilde fra byggeplassen",
    legende: "Bytt ut dette bildet med et bilde fra byggeplassen.",
    kicker: "Nytt fra området",
    titre: ["Byggingen", "går fremover."],
    intro: (livraison) =>
      `Siden du ba om salgsoppgaven, har CITYSTAR nådd en ny etappe: [[edit:etappe]]. Villaene tar form, og ferdigstillelsen er fortsatt planlagt til ${livraison}.`,
    restantes: "[[edit:ledige villaer]]",
    faits: {
      restantes: (villas) => `villaer fortsatt ledige av ${villas}`,
      livraison: "ferdigstillelse",
      reservation: "ved reservasjon",
    },
    texte: "Hvis prosjektet ditt fortsatt er aktuelt, er dette rett tidspunkt for å velge tomt før de neste.",
    bouton: "Få oversikt over ledighet",
    whatsapp: "Hei, jeg vil gjerne vite hvilke CITYSTAR-villaer som fortsatt er ledige.",
    secondaire: "Se området på nett igjen",
  },
};

export default no;
