import type { Copie } from "./fr";

const en: Copie = {
  lieu: "Private residence · Marrakech",
  rendu: "3D rendering, non-contractual.",
  pied: {
    accroche: ["Fourteen villas.", " Not one more."],
    lieu: (livraison) => `Oulad Hassoune, Marrakech · Delivery ${livraison}`,
    site: "Website",
  },
  legal: { rendus: "3D renderings are non-contractual.", desinscrire: "Unsubscribe" },
  raisons: {
    dossier: "You are receiving this email because you requested the CITYSTAR information pack.",
    visite: "You are receiving this email about your CITYSTAR appointment.",
    proprio: "You are receiving this email as the buyer of a CITYSTAR villa.",
  },
  signature: { salut: "Speak soon,", role: "CITYSTAR adviser", equipe: "The CITYSTAR team" },
  poids: (mo) => `${mo} MB`,
  planPdf: "Floor plan (PDF)",
  suites: (n) => `${n} suites`,
  plainPied: "step-free access",
  source: "Source",
  faits: {
    villas: "private villas",
    construits: "of living space, at most",
    terrain: "of land per villa",
    trajet: "from Jemaa el-Fna",
  },
  d1: {
    objet: "Your CITYSTAR information pack",
    preheader: "The brochure, the floor plans of the three villas, and what comes next.",
    alt: "A CITYSTAR villa at dusk, with its pool lit",
    kicker: "Your information pack",
    titre: ["Welcome", "to CITYSTAR[[, prenom]]."],
    intro:
      "Thank you for your request. Here is what you can start with right now: the estate brochure and the floor plans of the three villas.",
    brochure: "Estate brochure",
    planVilla: (type) => `Floor plans of villa ${type}`,
    texte:
      "I will send you the prices villa by villa, the availability and the payment schedule myself. To speed things up, just tell me what you are looking for: the architecture that appeals to you, your timing, and whether you are buying to live there or to rent it out.",
    bouton: "Reply to me on WhatsApp",
    whatsapp: "Hello, I have just received the CITYSTAR information pack. I would like to receive the prices and availability.",
    secondaire: "Or explore the estate online",
  },
  d2: {
    objet: "A, B or C?",
    preheader: "Three architectures, the same standards. Which one is you?",
    kicker: "The villas",
    titre: ["Three architectures,", "the same standards."],
    intro: (terrain) =>
      `Each villa stands on ${terrain} of land, with its own private pool. What changes: the volumes, the number of suites, the way you live with the light.`,
    altVilla: (type) => `Rendering of villa ${type}`,
    texte:
      "The comparison tool on our website puts them side by side, and a four-question quiz points you to the one that suits you best.",
    bouton: "Compare the three villas",
  },
  d3: {
    objet: "Step inside before it exists",
    preheader: "The 360° tour, room by room, from your sofa.",
    alt: "The living room of a CITYSTAR villa",
    kicker: "360° tour",
    titre: ["Don’t imagine it.", "Step inside."],
    intro:
      "The living room, the suites, the terraces, the pool: the 360° tour takes you from one room to the next as if you were there. On a computer or a phone, in full screen.",
    points: ["Every room, in 360°", "The views from the terraces", "The garden and the private pool"],
    bouton: "Start the 360° tour",
    secondaire: "Prefer a guided video tour",
    whatsapp: "Hello, I would like a guided video tour of CITYSTAR.",
  },
  d4: {
    objet: "What you pay, and when",
    preheader: (part) => `${part} before a notary, then the balance in step with construction.`,
    kicker: "Buying with peace of mind",
    titre: ["What you pay,", "and when."],
    intro:
      "Buying off-plan abroad takes trust. Here is how a purchase at CITYSTAR works.",
    etapes: (part, livraison) => [
      { titre: `${part} on reservation`, texte: "The reservation is signed directly before a notary, not in a sales office." },
      { titre: "The balance follows construction", texte: "Each payment call matches a completed stage: foundations, structural work, finishing." },
      { titre: `Handover of the keys, ${livraison}`, texte: "The final payment when your villa is delivered." },
    ],
    encadre: (fondsPropres) => ({
      titre: `${fondsPropres} equity-funded`,
      texte:
        "The developer funds construction from its own capital. It also welcomes buyers who finance their villa with a mortgage, and it has already delivered projects abroad.",
    }),
    texte: "Your adviser will give you the exact payment schedule for the villa you choose.",
    bouton: "Get the payment schedule for my villa",
    whatsapp: "Hello, I would like to receive the detailed payment schedule for a CITYSTAR villa.",
  },
  d5: {
    objet: "Marrakech is speeding up",
    preheader: (evolution, annee) =>
      `${evolution} in property transactions in ${annee}, ahead of Rabat and Casablanca.`,
    alt: "Aerial view of a villa and its pool",
    kicker: "Investing",
    titre: ["Marrakech", "is speeding up."],
    intro: (annee, prix) =>
      `In ${annee}, property transactions grew faster in Marrakech than in any other major Moroccan city, while prices held steady (${prix}).`,
    legende: (annee) => `Change in transactions in ${annee}, IPAI index (Bank Al-Maghrib and ANCFCC).`,
    texte: (villas) =>
      `Demand is speeding up; at CITYSTAR, supply stops at ${villas} villas. The simulator on our website calculates the gross yield of holiday rentals from your own assumptions.`,
    bouton: "Simulate my yield",
  },
  d6: {
    objet: "Your build, from home",
    preheader: "Progress, photos, payments, documents: all in your owner area.",
    alt: "Façade of a CITYSTAR villa with vertical slats",
    kicker: "After reservation",
    titre: ["Your build,", "followed from wherever you live."],
    intro:
      "Buying far from home always raises the same question: how do you know where construction stands? At CITYSTAR, every buyer gets personal access to their owner area.",
    points: [
      "<b>The progress</b> of your villa, as a percentage, with a word from the developer",
      "<b>Site photos</b>, at every stage",
      "<b>Your payments</b>: what is paid, what remains, the next instalment",
      "<b>Your documents</b>: contract, plans, payment calls",
    ],
    texte: "No password: a sign-in link arrives by email, and you are in.",
    bouton: "See the owner area",
  },
  d7: {
    objet: "Fourteen plots",
    preheader: "The first buyers choose their location.",
    kicker: "The site plan",
    titre: ["Fourteen plots.", "First come, first choice."],
    alt: "Site plan of the CITYSTAR estate",
    legende: "Site plan of the estate, non-contractual.",
    texte:
      "The position within the estate, the orientation of the pool, architecture A, B or C: each reservation narrows the choice for the next buyer.",
    texte2:
      "If one of the villas appeals to you, ask for the list of plots still available: you will know exactly what is left to choose from.",
    bouton: "Ask for availability",
    whatsapp: "Hello, which CITYSTAR villas are still available?",
  },
  d8: {
    objet: "A quick question",
    preheader: "A one-digit answer is enough.",
    bonjour: "Hello[[ prenom]],",
    texte:
      "You received the CITYSTAR information pack three weeks ago, and I don’t want to write to you for nothing. Where does your project stand?",
    consigne: "Simply reply to this email with a number:",
    choix: [
      "I would like to visit, on site or by video call.",
      "I have questions about financing or buying from abroad.",
      "Now is not the right time: please get back to me later.",
    ],
    fin: "I will reply quickly, and I will respect your choice.",
  },
  v1: {
    objet: "Your visit to CITYSTAR",
    preheader: "The address, the route and what we will see together.",
    alt: "The entrance to the CITYSTAR estate at dusk",
    kicker: "Your appointment",
    titre: ["See you soon", "at CITYSTAR."],
    lieu: "Oulad Hassoune, Marrakech. Your adviser will meet you at the entrance to the estate.",
    intro: "During the visit, we will look together at:",
    points: [
      "The estate and the location of the plots still available",
      "The floor plans of the villa you are interested in",
      "The price, the payment schedule and the steps of the purchase",
    ],
    bouton: "Open the route",
    secondaire: "Can’t make it? Let me know on WhatsApp",
    whatsapp: "Hello, I need to reschedule my visit to CITYSTAR.",
  },
  v2: {
    objet: "See you tomorrow",
    preheader: (minutes) => `Meeting at the estate, ${minutes} minutes from Jemaa el-Fna.`,
    bonjour: "Hello[[ prenom]],",
    texte: "I am confirming our appointment tomorrow, [[heure]], at the CITYSTAR estate.",
    itineraire: "The route to the estate",
    distance: (minutes) => `, ${minutes} minutes from Jemaa el-Fna and the airport`,
    points: ["Comfortable shoes to walk around the estate", "Your questions: none is too many"],
    visio:
      "If you are still far from Marrakech, the visit can take place by video call: just tell me and I will send you the link.",
  },
  v3: {
    objet: "Thank you for your visit",
    preheader: "A recap, and the three steps to the keys.",
    kicker: "After your visit",
    titre: ["Thank you", "for your visit."],
    intro:
      "It was a pleasure to show you the estate. As promised, here is what comes next if one of the villas has won you over:",
    etapes: (part, livraison) => [
      { titre: "You choose your villa", texte: "The architecture, the plot, the orientation. I confirm its availability." },
      { titre: "You reserve before a notary", texte: `${part} of the price on signing. Mortgages are accepted.` },
      { titre: "You follow your build", texte: `From your owner area, until the keys are handed over in ${livraison}.` },
    ],
    bouton: "Reserve my villa",
    whatsapp: "Hello, I would like to reserve a CITYSTAR villa.",
    secondaire: "See the 360° tour again",
  },
  p1: {
    objet: "Welcome home",
    preheader: "Your owner area is open.",
    alt: "The terrace of a CITYSTAR villa",
    kicker: "Villa [[villa]]",
    titre: ["Welcome", "home."],
    intro: "Congratulations[[, prenom]]: villa [[villa]] is yours. Your owner area is open from today.",
    etapes: [
      { titre: "Open your area", texte: "Click the button below and enter this email address: [[email]]." },
      { titre: "Receive your link", texte: "A sign-in link arrives in your inbox. No password to remember." },
      { titre: "Follow your villa", texte: "Progress, site photos, payments and documents." },
    ],
    bouton: "Open my area",
  },
  p2: {
    objet: "How to follow your build",
    preheader: "What you will find in your area, and when.",
    kicker: "Your owner area",
    titre: ["How to follow", "your build."],
    intro: "Your villa is entering its construction phase. Here is what you will find in your area, and when.",
    points: [
      "<b>At each completed stage</b>: updated progress and photos of your villa",
      "<b>Before each payment call</b>: the amount, the due date, then the receipt once paid",
      "<b>At any time</b>: your contract, plans and documents, ready to download",
    ],
    encadre: (livraison) => ({
      titre: `Delivery ${livraison}`,
      texte:
        "You will receive an email at each new construction stage. Your adviser remains available on WhatsApp for any question.",
    }),
    bouton: "Open my area",
  },
  p3: {
    objet: "News from your villa",
    preheader: "A new stage is complete. The photos are online.",
    alt: "Construction site photo",
    legende: "Replace this image with a photo of the construction site.",
    kicker: "Construction news",
    titre: ["[[edit:stage]]:", "done."],
    avancement: "[[edit:progress]] %",
    prochaine: "[[edit:next stage]]",
    faits: { avancement: "of the work", prochaine: "next stage", livraison: "delivery" },
    mot: "[[edit:a word from the developer]]",
    texte:
      "The new photos of your villa are in your area, along with the next payment call if this stage triggers one.",
    bouton: "See the photos",
  },
  n1: {
    objet: "Construction is moving ahead",
    preheader: "News from the estate, and the villas still available.",
    alt: "Construction site photo",
    legende: "Replace this image with a photo of the construction site.",
    kicker: "News from the estate",
    titre: ["Construction", "is moving ahead."],
    intro: (livraison) =>
      `Since you requested the information pack, CITYSTAR has reached a new stage: [[edit:stage]]. The villas are taking shape, and delivery is still planned for ${livraison}.`,
    restantes: "[[edit:villas left]]",
    faits: {
      restantes: (villas) => `villas still available out of ${villas}`,
      livraison: "delivery",
      reservation: "on reservation",
    },
    texte: "If your project is still on, now is the right time to choose your plot before the next buyers.",
    bouton: "Get the availability",
    whatsapp: "Hello, I would like to know which CITYSTAR villas are still available.",
    secondaire: "See the estate online again",
  },
};

export default en;
