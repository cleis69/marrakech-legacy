import type { Copie } from "./fr";

const it: Copie = {
  lieu: "Residenza privata · Marrakech",
  rendu: "Render 3D, non contrattuale.",
  pied: {
    accroche: ["Quattordici ville.", " Non una di più."],
    lieu: (livraison) => `Oulad Hassoune, Marrakech · Consegna ${livraison}`,
    site: "Il sito",
  },
  legal: { rendus: "Render 3D non contrattuali.", desinscrire: "Annulla l’iscrizione" },
  raisons: {
    dossier: "Riceve questa e-mail perché ha richiesto il dossier CITYSTAR.",
    visite: "Riceve questa e-mail in merito al suo appuntamento CITYSTAR.",
    proprio: "Riceve questa e-mail in quanto acquirente di una villa CITYSTAR.",
  },
  signature: { salut: "A presto,", role: "Consulente CITYSTAR", equipe: "Il team CITYSTAR" },
  poids: (mo) => `${mo} MB`,
  planPdf: "Planimetria PDF",
  suites: (n) => `${n} suite`,
  plainPied: "accessibile senza gradini",
  source: "Fonte",
  contact: {
    visite: { kicker: "Il suo consulente", titre: "Visitiamo insieme il complesso.", texte: "Sul posto a Marrakech o in videochiamata, all’orario che preferisce. Il suo consulente risponde a tutte le sue domande.", principal: "Organizza una visita", secondaire: "Parla con un consulente" },
    avant: { kicker: "Il suo consulente", titre: "Una domanda prima della visita?", texte: "Il suo consulente le risponde direttamente, su WhatsApp o al telefono.", principal: "Scrivi al mio consulente", secondaire: "Chiama" },
    apres: { kicker: "Il suo consulente", titre: "Ancora qualche dubbio?", texte: "Torni a vedere il complesso, sul posto o in videochiamata, oppure ponga le sue domande al consulente.", principal: "Organizza un’altra visita", secondaire: "Parla con un consulente" },
    proprio: { kicker: "Il suo consulente", titre: "Il suo consulente resta al suo fianco.", texte: "Una domanda sul cantiere, un pagamento o un documento? Scriva o chiami il suo consulente.", principal: "Scrivi al mio consulente", secondaire: "Chiama" },
    telephone: (tel) => `oppure chiami il ${tel}`,
    messages: {
      visite: "Buongiorno, vorrei organizzare una visita di CITYSTAR, sul posto o in videochiamata.",
      conseiller: "Buongiorno, vorrei parlare con un consulente CITYSTAR.",
      proprio: "Buongiorno, ho acquistato una villa CITYSTAR e ho una domanda.",
    },
  },
  faits: {
    villas: "ville private",
    construits: "costruiti, al massimo",
    terrain: "di terreno per villa",
    trajet: "da Jemaa el-Fna",
  },
  d1: {
    objet: "Il suo dossier CITYSTAR",
    preheader: "La brochure, le planimetrie delle tre ville e i prossimi passi.",
    alt: "Una villa CITYSTAR al tramonto, con la piscina illuminata",
    kicker: "Il suo dossier",
    titre: ["Benvenuti", "a CITYSTAR[[, prenom]]."],
    intro:
      "Grazie per la sua richiesta. Ecco da cosa può cominciare subito: la brochure del complesso e le planimetrie delle tre ville.",
    brochure: "Brochure del complesso",
    planVilla: (type) => `Planimetrie della villa ${type}`,
    texte:
      "Le invierò personalmente i prezzi villa per villa, le disponibilità e il piano dei pagamenti. Per fare prima, mi dica semplicemente cosa cerca: l’architettura che la attira, i suoi tempi, se acquista per viverci o per affittare.",
    bouton: "Scopri il complesso online",
  },
  d2: {
    objet: "A, B o C?",
    preheader: "Tre architetture, la stessa cura. Quale le somiglia?",
    kicker: "Le ville",
    titre: ["Tre architetture,", "la stessa cura."],
    intro: (terrain) =>
      `Ogni villa sorge su ${terrain} di terreno, con la sua piscina privata. Ciò che cambia: i volumi, il numero di suite, il modo di vivere la luce.`,
    altVilla: (type) => `Render della villa ${type}`,
    texte:
      "Il comparatore del sito le mette una accanto all’altra, e un questionario di quattro domande la orienta verso quella più adatta a lei.",
    bouton: "Confronta le tre ville",
  },
  d3: {
    objet: "Entri prima che esista",
    preheader: "Il tour 360°, stanza per stanza, dal suo divano.",
    alt: "Il soggiorno di una villa CITYSTAR",
    kicker: "Tour 360°",
    titre: ["Non la immagini.", "Entri."],
    intro:
      "Il soggiorno, le suite, le terrazze, la piscina: il tour 360° la porta da una stanza all’altra come se fosse lì. Su computer o su telefono, a schermo intero.",
    points: ["Tutte le stanze, a 360°", "Le viste dalle terrazze", "Il giardino e la piscina privata"],
    bouton: "Avvia il tour 360°",
    secondaire: "Preferisco una visita guidata in videochiamata",
    whatsapp: "Buongiorno, vorrei una visita guidata di CITYSTAR in videochiamata.",
  },
  d4: {
    objet: "Cosa paga, e quando",
    preheader: (part) => `${part} dal notaio, poi il saldo al ritmo del cantiere.`,
    kicker: "Acquistare con serenità",
    titre: ["Cosa paga,", "e quando."],
    intro: "Acquistare sulla carta all’estero richiede fiducia. Ecco come si svolge un acquisto a CITYSTAR.",
    etapes: (part, livraison) => [
      { titre: `${part} alla prenotazione`, texte: "La prenotazione si firma direttamente dal notaio, non in un ufficio vendite." },
      { titre: "Il saldo segue il cantiere", texte: "Ogni richiesta di pagamento corrisponde a una fase conclusa: fondazioni, struttura, finiture." },
      { titre: `La consegna delle chiavi, ${livraison}`, texte: "L’ultimo versamento alla consegna della sua villa." },
    ],
    encadre: (fondsPropres) => ({
      titre: `${fondsPropres} fondi propri`,
      texte:
        "Il promotore finanzia il cantiere con fondi propri. Accetta anche acquirenti che finanziano la villa con un mutuo, e ha già consegnato progetti all’estero.",
    }),
    texte: "Il suo consulente le consegnerà il piano dei pagamenti esatto della villa che sceglierà.",
    bouton: "Ricevi il piano della mia villa",
    whatsapp: "Buongiorno, vorrei ricevere il piano dei pagamenti dettagliato di una villa CITYSTAR.",
  },
  d5: {
    objet: "Marrakech accelera",
    preheader: (evolution, annee) =>
      `${evolution} di compravendite nel ${annee}, davanti a Rabat e Casablanca.`,
    alt: "Vista aerea di una villa e della sua piscina",
    kicker: "Investire",
    titre: ["Marrakech", "accelera."],
    intro: (annee, prix) =>
      `Nel ${annee} le compravendite immobiliari sono cresciute più a Marrakech che nelle altre grandi città del Paese, con prezzi stabili (${prix}).`,
    legende: (annee) => `Andamento delle compravendite nel ${annee}, indice IPAI (Bank Al-Maghrib e ANCFCC).`,
    texte: (villas) =>
      `La domanda accelera; a CITYSTAR l’offerta si ferma a ${villas} ville. Il simulatore del sito calcola il rendimento lordo degli affitti brevi a partire dalle sue ipotesi.`,
    bouton: "Simula il mio rendimento",
  },
  d6: {
    objet: "Il suo cantiere, da casa",
    preheader: "Avanzamento, foto, pagamenti, documenti: tutto nella sua area proprietario.",
    alt: "Facciata di una villa CITYSTAR a lamelle verticali",
    kicker: "Dopo la prenotazione",
    titre: ["Il suo cantiere,", "seguito da dove vive."],
    intro:
      "Acquistare lontano da casa pone sempre la stessa domanda: come sapere a che punto è la costruzione? A CITYSTAR ogni acquirente riceve un accesso personale alla propria area proprietario.",
    points: [
      "<b>L’avanzamento</b> della sua villa, in percentuale, con una parola del promotore",
      "<b>Le foto del cantiere</b>, a ogni fase",
      "<b>I suoi pagamenti</b>: ciò che è pagato, ciò che resta, la prossima scadenza",
      "<b>I suoi documenti</b>: contratto, planimetrie, richieste di pagamento",
    ],
    texte: "Nessuna password: riceve un link di accesso via e-mail, ed è dentro.",
    bouton: "Vedi l’area proprietario",
  },
  d7: {
    objet: "Quattordici lotti",
    preheader: "I primi acquirenti scelgono la posizione.",
    kicker: "La planimetria generale",
    titre: ["Quattordici lotti.", "Chi arriva prima sceglie."],
    alt: "Planimetria generale del complesso CITYSTAR",
    legende: "Planimetria generale del complesso, non contrattuale.",
    texte:
      "La posizione nel complesso, l’orientamento della piscina, l’architettura A, B o C: ogni prenotazione riduce la scelta di chi viene dopo.",
    texte2:
      "Se una delle ville le interessa, chieda l’elenco dei lotti ancora disponibili: saprà esattamente cosa resta da scegliere.",
    bouton: "Chiedi le disponibilità",
    whatsapp: "Buongiorno, quali ville CITYSTAR sono ancora disponibili?",
  },
  d8: {
    objet: "Una domanda veloce",
    preheader: "Basta rispondere con un numero.",
    bonjour: "Buongiorno[[ prenom]],",
    texte:
      "Ha ricevuto il dossier CITYSTAR tre settimane fa e non vorrei scriverle invano. A che punto è il suo progetto?",
    consigne: "Risponda semplicemente a questa e-mail con un numero:",
    choix: [
      "Voglio visitare, sul posto o in videochiamata.",
      "Ho domande sul finanziamento o sull’acquisto dall’estero.",
      "Non è il momento: ricontattatemi più avanti.",
    ],
    fin: "Le risponderò rapidamente e rispetterò la sua scelta.",
  },
  v1: {
    objet: "La sua visita a CITYSTAR",
    preheader: "L’indirizzo, il percorso e ciò che vedremo insieme.",
    alt: "L’ingresso del complesso CITYSTAR al tramonto",
    kicker: "Il suo appuntamento",
    titre: ["A presto", "a CITYSTAR."],
    lieu: "Oulad Hassoune, Marrakech. Il suo consulente la attende all’ingresso del complesso.",
    intro: "Durante la visita vedremo insieme:",
    points: [
      "Il complesso e la posizione dei lotti ancora liberi",
      "Le planimetrie della villa che le interessa",
      "Il prezzo, il piano dei pagamenti e le fasi dell’acquisto",
    ],
    bouton: "Apri il percorso",
    secondaire: "Un imprevisto? Mi avvisi su WhatsApp",
    whatsapp: "Buongiorno, devo spostare la mia visita a CITYSTAR.",
  },
  v2: {
    objet: "A domani",
    preheader: (minutes) => `Appuntamento al complesso, a ${minutes} minuti da Jemaa el-Fna.`,
    bonjour: "Buongiorno[[ prenom]],",
    texte: "Le confermo il nostro appuntamento di domani, [[heure]], al complesso CITYSTAR.",
    itineraire: "Il percorso fino al complesso",
    distance: (minutes) => `, a ${minutes} minuti da Jemaa el-Fna e dall’aeroporto`,
    points: ["Scarpe comode per percorrere il complesso", "Le sue domande: nessuna è di troppo"],
    visio:
      "Se si trova ancora lontano da Marrakech, la visita può svolgersi in videochiamata: me lo dica e le invio il link.",
  },
  v3: {
    objet: "Grazie per la visita",
    preheader: "Il riepilogo e le tre fasi fino alle chiavi.",
    kicker: "Dopo la visita",
    titre: ["Grazie", "per la visita."],
    intro:
      "È stato un piacere mostrarle il complesso. Come promesso, ecco i prossimi passi se una delle ville l’ha convinta:",
    etapes: (part, livraison) => [
      { titre: "Sceglie la sua villa", texte: "L’architettura, il lotto, l’orientamento. Le confermo la disponibilità." },
      { titre: "Prenota dal notaio", texte: `Il ${part} del prezzo alla firma. Il mutuo è accettato.` },
      { titre: "Segue il cantiere", texte: `Dalla sua area proprietario, fino alla consegna delle chiavi in ${livraison}.` },
    ],
    bouton: "Prenota la mia villa",
    whatsapp: "Buongiorno, vorrei prenotare una villa CITYSTAR.",
    secondaire: "Rivedi il tour 360°",
  },
  p1: {
    objet: "Benvenuti a casa",
    preheader: "La sua area proprietario è aperta.",
    alt: "La terrazza di una villa CITYSTAR",
    kicker: "Villa [[villa]]",
    titre: ["Benvenuti", "a casa."],
    intro: "Congratulazioni[[, prenom]]: la villa [[villa]] è sua. La sua area proprietario è aperta da oggi.",
    etapes: [
      { titre: "Apra la sua area", texte: "Clicchi sul pulsante qui sotto e inserisca questo indirizzo e-mail: [[email]]." },
      { titre: "Riceva il link", texte: "Un link di accesso arriva nella sua casella. Nessuna password da ricordare." },
      { titre: "Segua la sua villa", texte: "Avanzamento, foto del cantiere, pagamenti e documenti." },
    ],
    bouton: "Apri la mia area",
  },
  p2: {
    objet: "Come seguire il cantiere",
    preheader: "Cosa troverà nella sua area, e quando.",
    kicker: "La sua area proprietario",
    titre: ["Come seguire", "il suo cantiere."],
    intro: "La sua villa entra nella fase di costruzione. Ecco cosa troverà nella sua area, e in quale momento.",
    points: [
      "<b>A ogni fase conclusa</b>: l’avanzamento aggiornato e le foto della sua villa",
      "<b>Prima di ogni richiesta di pagamento</b>: l’importo, la scadenza, poi la ricevuta una volta pagato",
      "<b>In qualsiasi momento</b>: contratto, planimetrie e documenti, da scaricare",
    ],
    encadre: (livraison) => ({
      titre: `Consegna ${livraison}`,
      texte:
        "Riceverà un’e-mail a ogni nuova fase del cantiere. Il suo consulente resta raggiungibile su WhatsApp per qualsiasi domanda.",
    }),
    bouton: "Apri la mia area",
  },
  p3: {
    objet: "Notizie dalla sua villa",
    preheader: "Una nuova fase è conclusa. Le foto sono online.",
    alt: "Foto del cantiere",
    legende: "Sostituisca questa immagine con una foto del cantiere.",
    kicker: "Notizie dal cantiere",
    titre: ["[[edit:fase]]:", "completata."],
    avancement: "[[edit:avanzamento]] %",
    prochaine: "[[edit:prossima fase]]",
    faits: { avancement: "dei lavori", prochaine: "prossima fase", livraison: "consegna" },
    mot: "[[edit:una parola del promotore]]",
    texte:
      "Le nuove foto della sua villa sono nella sua area, insieme alla prossima richiesta di pagamento se questa fase ne prevede una.",
    bouton: "Vedi le foto",
  },
  n1: {
    objet: "Il cantiere avanza",
    preheader: "Notizie dal complesso, e le ville rimaste.",
    alt: "Foto del cantiere",
    legende: "Sostituisca questa immagine con una foto del cantiere.",
    kicker: "Notizie dal complesso",
    titre: ["Il cantiere", "avanza."],
    intro: (livraison) =>
      `Dalla sua richiesta del dossier, CITYSTAR ha superato una nuova fase: [[edit:fase]]. Le ville prendono forma e la consegna resta prevista per ${livraison}.`,
    restantes: "[[edit:ville libere]]",
    faits: {
      restantes: (villas) => `ville ancora libere su ${villas}`,
      livraison: "consegna",
      reservation: "alla prenotazione",
    },
    texte: "Se il suo progetto è sempre attuale, è il momento giusto per scegliere il lotto prima degli altri.",
    bouton: "Ricevi le disponibilità",
    whatsapp: "Buongiorno, vorrei sapere quali ville CITYSTAR sono ancora disponibili.",
    secondaire: "Rivedi il complesso online",
  },
};

export default it;
