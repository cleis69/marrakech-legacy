import type { Textes } from "./i18n";

/** Español. */
export const es: Textes = {
  nav: [
    ["Inicio", ""],
    ["Las villas", "villas"],
    ["Galería", "galerie"],
    ["Invertir", "investir"],
    ["Preguntas", "faq"],
    ["Contacto", "contact"],
  ],
  header: {
    acces: "Que me llamen",
    rappelCourt: "Llamada",
    conciergerie: "Conserjería",
    accueil: "Volver al inicio",
    sommaire: "Índice",
    brochure: "Folleto CITYSTAR",
    poids: (mo) => `PDF · ${mo} MB`,
    demander: "Solicitar una llamada",
    fermer: "Cerrar el menú",
    menu: "Menú",
    villas: "Villas",
    galerie: "Galería",
    questions: "Preguntas",
    espace: "Mi espacio",
    langue: "Idioma del sitio",
    whatsapp: "Escribir a la conserjería de CITYSTAR por WhatsApp",
  },
  hero: {
    lieu: "Residencia privada · Oulad Hassoune, Marrakech",
    accroche: ["Villas de lujo en Marrakech,", "catorce, ni una más."],
    texte: (surface, terrain, minutes) =>
      `Hasta ${surface} construidos sobre ${terrain} de terreno, piscina privada, a ${minutes} minutos de Jemaa el-Fna.`,
    garanties: (fondsPropres) => [
      "Reserva ante notario",
      `${fondsPropres} fondos propios`,
      "Se acepta hipoteca",
    ],
    rendu: "Render 3D, no contractual",
    livraison: (mois) => `Entrega ${mois}`,
    livraisonLabel: "Entrega",
    reservation: (part) => `${part} a la reserva`,
    visite: "Visita 360°",
    decouvrir: "Descubrir las villas",
    acces: "Solicitar una llamada",
    pause: "Pausar el vídeo",
    lecture: "Reanudar el vídeo",
    pauseCourt: "Pausa",
    lectureCourt: "Reproducir",
  },
  reperes: {
    aria: "Las cifras clave del dominio",
    trajet: (n) => ({ valeur: `${n} min`, libelle: "Jemaa el-Fna y aeropuerto" }),
    villas: (n) => ({ valeur: String(n), libelle: "villas privadas, ni una más" }),
    terrain: (surface) => ({ valeur: surface, libelle: "de terreno, la parcela mayor" }),
  },
  projet: {
    titre: ["El espacio excepcional", "de una vida ", "privada."],
    texte: [
      "Un dominio privado y totalmente protegido, cerca de la Palmeraie.",
      "Tres arquitecturas para la manera de vivir de cada residente.",
    ],
    vues: { entree: "La entrada", pergola: "La pérgola", salon: "El salón" },
    faits: {
      villas: "villas privadas en un dominio protegido",
      terrain: "de terreno por villa",
      surface: "construidos, en la villa más grande",
      trajet: "de Jemaa el-Fna y del aeropuerto",
    },
  },
  livraison: {
    aria: "Calendario de entrega y plan de pagos",
    titre: (mois) => `Entrega en ${mois}.`,
    intro:
      "La obra avanza por etapas, y cada una supone el pago de una parte del precio. Las fechas intermedias y el reparto del resto se están validando con el promotor.",
    compte: (n) =>
      n === 0 ? "Entrega este mes" : n === 1 ? "Dentro de 1 mes" : `Dentro de ${n} meses`,
    frise: "Las etapas de la obra",
    etapes: {
      reservation: "Reserva",
      fondations: "Cimientos",
      grosOeuvre: "Estructura",
      finitions: "Acabados",
      livraison: "Entrega de llaves",
    },
    signature: "Firma ante notario",
    dateAConfirmer: "Fecha por confirmar",
    paiement: "El plan de pagos",
    part: "Parte del precio",
    aConfirmer: "Por confirmar",
    notePaiement: (reste) =>
      `La reserva se firma directamente ante notario. El reparto del ${reste} restante se está validando con el promotor: su asesor le enviará el calendario detallado de su villa.`,
    echeancier: "Recibir el calendario",
    selection: {
      outil: "Calendario y pagos",
      ligne: "Solicitud del calendario de pagos detallado",
    },
    espace: {
      texte: "¿Ya es propietario? Siga el avance de las obras de su villa.",
      lien: "Acceder a mi espacio",
    },
  },
  architecture: {
    label: "Arquitectura",
    titre: ["Marrakech,", "de otra manera."],
    hint: "Deslice el control y abra cada punto.",
    note: "Ilustración no contractual",
    curseur: "Comparar el dibujo y el render",
    rendu: "Render",
    dessin: "Dibujo",
    altDessin: "Dibujo lineal de la fachada de una villa CITYSTAR",
    altRendu: "Render de la misma fachada, con terrazas y piscina",
    points: [
      { titre: "Celosía", texte: "Lamas horizontales que filtran la luz sobre la terraza." },
      {
        titre: "Terraza en planta alta",
        texte: "Las estancias de arriba se abren a amplias terrazas.",
      },
      { titre: "Volúmenes acristalados", texte: "Grandes volúmenes abiertos al exterior." },
      { titre: "Materiales", texte: "Materiales de alta calidad, con estándares europeos." },
      { titre: "Piscina privada", texte: "Cada villa tiene su propia piscina." },
    ],
  },
  villas: {
    label: "Las villas",
    titre: ["Tres expresiones.", "Una misma ", "exigencia."],
    intro: (n, terrain) =>
      `Tres arquitecturas para ${n} villas, cada una sobre una parcela de ${terrain}.`,
    comparer: "Comparar las villas",
    villa: "Villa",
    decouvrir: "Descubrir la villa",
    curseur: "Explorar",
    decouvrirAria: (type, surface, suites, tag) =>
      `Descubrir la villa tipo ${type}: ${surface}, ${suites}, ${tag.toLowerCase()}`,
    retour: "Las tres villas",
    onglets: "Tipos de villa",
    typeVilla: (type) => `Villa tipo ${type}`,
    surface: "Superficie construida",
    terrain: "Terreno",
    configuration: "Distribución",
    suites: (n) => `${n} suites`,
    plansAria: (type) => `Planos de la villa tipo ${type}`,
    rdc: "Planta baja",
    etage: "Planta alta",
    agrandirPlan: (etage, type) =>
      `Ampliar el plano de la ${etage ? "planta alta" : "planta baja"} de la villa tipo ${type}`,
    demander: "Que me llamen por esta villa",
    brochure: "Folleto",
    brochureAria: (type) => `Folleto de la villa tipo ${type} (PDF)`,
    illustration: (type) => `Villa tipo ${type} · Ilustración no contractual`,
    prixM2: (montant) => `Es decir, unos ${montant} por m² construido`,
    disponibilite: "Disponibilidad bajo consulta",
    accroches: {
      A: ["Pensada para", "todos."],
      B: ["La vida en", "las terrazas."],
      C: ["Volúmenes", "junto al agua."],
    },
    tags: { A: "Accesible", B: "Terrazas", C: "Contemporánea" },
    descriptions: {
      A: "Pensada para residentes con movilidad reducida: ascensor, baños accesibles y circulaciones amplias.",
      B: "Una arquitectura exigente y materiales de alta calidad, prolongados por amplias terrazas.",
      C: "Volúmenes contemporáneos y una piscina privada, con los estándares arquitectónicos más exigentes.",
    },
  },
  prix: {
    label: "Precio",
    devise: "Moneda de visualización",
    reference: (prix) => `Precio de referencia: ${prix}`,
    contreValeur: (date) => `Contravalor indicativo · tipo de cambio del ${date}`,
    indicatif: "Precio indicativo, sujeto a confirmación",
    indicatifCourt: "precio indicativo",
    surDemande: "Precio bajo consulta",
    devises: {
      EUR: "Euros",
      GBP: "Libras esterlinas",
      MAD: "Dírhams marroquíes",
      NOK: "Coronas noruegas",
    },
  },
  vivre: {
    label: "El arte de vivir",
    titre: "Un día en CITYSTAR",
    moments: [
      {
        quand: "Mañana",
        titre: "La piscina, antes que nadie.",
        texte:
          "Cada villa tiene su piscina privada y sus espacios exteriores, al abrigo de las miradas.",
        alt: "Piscina privada de una villa CITYSTAR por la mañana",
      },
      {
        quand: "Tarde",
        titre: "La luz entra por todas partes.",
        texte:
          "Volúmenes abiertos y materiales de alta calidad, pensados para vivir dentro como fuera.",
        alt: "Espacio luminoso de una villa CITYSTAR",
      },
      {
        quand: "Noche",
        titre: "Recibir, con discreción.",
        texte: "Salones generosos, en una villa independiente dentro de un dominio privado.",
        alt: "Salón de una villa CITYSTAR al anochecer",
      },
      {
        quand: "Madrugada",
        titre: "Un dominio vigilado día y noche.",
        texte: "Una residencia privada y totalmente protegida, cerca de la Palmeraie.",
        alt: "Villa CITYSTAR iluminada al caer la noche",
      },
    ],
    momentsAria: "Los momentos del día",
  },
  visite: {
    label: "Visita 360°",
    titre: ["Entre en", "las villas."],
    texte:
      "Una visita en 360° de las villas, estancia por estancia. Siga las flechas de una estancia a otra, a su ritmo.",
    etapes: [
      "Activar la visita",
      "Seguir las flechas de una estancia a otra",
      "Pasar a pantalla completa",
    ],
    activer: "Activar la visita",
    apercu: "Visita 360° · estancia por estancia",
    pleinEcran: "Pantalla completa",
    titreIframe: "Visita virtual en 360° del dominio CITYSTAR",
    titreModale: "Visita virtual 360°",
    fermer: "Cerrar la visita",
  },
  localisation: {
    label: "Ubicación",
    titre: ["Apartado.", "Nunca lejos."],
    lieux: {
      med: { titre: "Plaza Jemaa el-Fna", note: (n) => `A menos de ${n} minutos` },
      air: { titre: "Aeropuerto de Marrakech", note: (n) => `A menos de ${n} minutos` },
      palm: { titre: "La Palmeraie", note: "Muy cerca", mot: "Cerca" },
    },
    adresse: ["Región Marrakech-Safi", "Prefectura de Marrakech", "Oulad Hassoune"],
    planMasse: "Plano de conjunto",
    schema: "Mapa esquemático, sin escala",
    carteAria:
      "Mapa esquemático, sin escala: CITYSTAR en Oulad Hassoune, cerca de la Palmeraie, con la medina y el aeropuerto de Marrakech",
    reperes: {
      med: "Medina · Jemaa el-Fna",
      medCourt: "Medina",
      air: "Aeropuerto Marrakech-Menara",
      airCourt: "Aeropuerto",
      palm: "La Palmeraie",
      palmCourt: "Palmeraie",
    },
    zoomPlus: "Acercar",
    zoomMoins: "Alejar",
    recentrer: "Centrar el mapa",
    aideLongue: "Arrastrar para mover · Ctrl + rueda para hacer zoom",
    aideCourte: "Arrastrar · tocar una distancia",
    residencePrivee: "Residencia privada",
    ou: "Oulad Hassoune · Marrakech",
    itineraire: "Cómo llegar",
    fermerFiche: "Cerrar la ficha",
    proximite: "Cerca",
    minutes: (n) => `${n} min`,
    moinsDe: (n) => `< ${n} min`,
  },
  pages: {
    accueil: {
      titre: "CITYSTAR Marrakech — Villas de lujo privadas",
      description: (n) =>
        `CITYSTAR, una residencia privada de ${n} villas contemporáneas en Oulad Hassoune, Marrakech, cerca de la Palmeraie.`,
    },
    villas: {
      titre: "Las villas — CITYSTAR Marrakech",
      description:
        "Tres tipos de villa, superficies, suites, planos y precios: encuentre la que le corresponde.",
      kicker: "Las villas",
      titreH1: ["Elegir", "su villa."],
      intro:
        "Tres arquitecturas, catorce villas. Déjese guiar con unas pocas preguntas y compárelas.",
    },
    villa: {
      titre: (type) => `Villa tipo ${type} — CITYSTAR Marrakech`,
      description: (type, surface, suites) =>
        `Villa tipo ${type}: ${surface} construidos, ${suites}, planos y folleto.`,
    },
    galerie: {
      titre: "Galería y visita — CITYSTAR Marrakech",
      description: "Renders del dominio, el detalle de la arquitectura y la visita en 360°.",
      kicker: "Galería",
      titreH1: ["El dominio,", "en imágenes."],
      intro:
        "Renders de arquitecto del dominio y de sus interiores. Ilustraciones no contractuales.",
      legende: "Render CITYSTAR",
    },
    espace: {
      titre: "Mi espacio de propietario — CITYSTAR",
      description:
        "El espacio de los propietarios de CITYSTAR: el avance de las obras de su villa, etapa por etapa.",
      kicker: "Mi espacio",
      titreH1: ["Seguir mi villa,", "etapa por etapa."],
      intro:
        "Cada propietario dispondrá de un acceso personal para seguir el avance de las obras de su villa.",
      statut: "Espacio en preparación",
      statutTexte:
        "El espacio de propietario abre próximamente. Su asesor le enviará su acceso personal.",
      demander: "Solicitar mi acceso",
      selection: {
        outil: "Espacio de propietario",
        ligne: "Solicitud de acceso al espacio de propietario",
      },
    },
    investir: {
      titre: "Invertir en Marrakech — CITYSTAR",
      description:
        "Lo que conviene saber antes de invertir en una villa en Marrakech, y un simulador de rentabilidad bruta.",
      kicker: "Invertir",
      chapeau:
        "Lo que conviene saber antes de invertir en una villa en Marrakech, y un simulador para probar sus propias hipótesis.",
      titreH1: ["Invertir", "en Marrakech."],
      intro: [
        "Catorce villas, tres arquitecturas, un dominio privado a pocos minutos de la Palmeraie: la escasez de la oferta es el primer argumento de la inversión.",
        "Las hipótesis de rentabilidad dependen del modo de explotación elegido y de las condiciones reales del mercado. El simulador parte de valores de ilustración, que hay que ajustar y luego confirmar con el promotor.",
      ],
      points: [
        {
          titre: "Alquiler de corta duración",
          texte:
            "Marrakech atrae visitantes internacionales todo el año. El alquiler de corta duración está sujeto allí a obligaciones declarativas locales.",
        },
        {
          titre: "Alquiler de larga duración",
          texte:
            "Un contrato clásico ofrece ingresos más regulares, con menos gestión y poca rotación.",
        },
        {
          titre: "Reventa a plazo",
          texte:
            "El valor depende del mercado y del estado del inmueble; ninguna plusvalía puede garantizarse.",
        },
      ],
    },
    faq: {
      suites: {
        titre: "Ir más lejos",
        plans: "Ver las villas y sus planos",
        simulateur: "Estimar una rentabilidad",
        rappel: "Que me llame un asesor",
      },
      titre: "Preguntas frecuentes — CITYSTAR Marrakech",
      description:
        "Ubicación, superficies, accesibilidad, precios, planos, visitas: las respuestas a las preguntas más habituales.",
      kicker: "Preguntas",
      titreH1: ["Las preguntas", "que nos hacen."],
      intro: "¿Falta una respuesta? La conserjería le responde directamente.",
    },
    luxe: {
      titre: "Villa de lujo en Marrakech — CITYSTAR",
      description:
        "Catorce villas de lujo en Oulad Hassoune, Marrakech: superficies, arquitecturas, ubicación y visitas.",
      kicker: "Villa de lujo en Marrakech",
      titreH1: ["Comprar una villa", "en Marrakech."],
      intro:
        "CITYSTAR reúne catorce villas contemporáneas en un dominio privado y totalmente protegido en Oulad Hassoune, cerca de la Palmeraie.",
      sections: [
        {
          titre: "Un dominio cerrado, no una urbanización",
          texte:
            "Solo catorce villas, cada una en su parcela y con su piscina. El dominio está cerrado y vigilado: la escasez distingue al proyecto de su entorno.",
        },
        {
          titre: "Tres arquitecturas, tres maneras de vivir",
          texte:
            "El tipo A está pensado para la movilidad reducida: ascensor y baños accesibles. El tipo B abre sus estancias a amplias terrazas. El tipo C juega con volúmenes contemporáneos en torno a la piscina.",
        },
        {
          titre: "Apartado, nunca lejos",
          texte:
            "La plaza Jemaa el-Fna y el aeropuerto de Marrakech-Menara están a menos de treinta y cinco minutos, la Palmeraie muy cerca. La visita en 360° permite descubrir el dominio antes de viajar.",
        },
        {
          titre: "Visitar y después comprar",
          texte:
            "Los planos de cada tipo y los folletos se pueden descargar. La visita in situ y las condiciones de compra pasan por la conserjería: un asesor le llama y organiza la visita.",
        },
      ],
    },
    contact: {
      titre: "Contacto — CITYSTAR Marrakech",
      description:
        "Solicite un acceso privado, el folleto o una visita al dominio CITYSTAR en Marrakech.",
      kicker: "Contacto",
      titreH1: ["Hablemos de", "su proyecto."],
      intro: "Un asesor le responde directamente: teléfono, WhatsApp o llamada, como prefiera.",
      formulaire: "Solicitar una llamada",
    },
  },
  faq: (v) => [
    {
      id: "securite",
      q: "¿Es seguro comprar sobre plano en CITYSTAR?",
      r: `La reserva se firma directamente ante notario, y cada pago pasa por la notaría. La obra se financia al ${v.fondsPropres} con fondos propios: no depende ni de un crédito del promotor ni de las ventas sobre plano.`,
    },
    {
      id: "acquisition",
      q: "¿Cómo se desarrolla la compra?",
      r: `Reserva su villa ante notario, con el ${v.acompte} del precio. El reparto del resto hasta la entrega de llaves se está validando con el promotor; su asesor le enviará el calendario detallado.`,
    },
    {
      id: "financement",
      q: "¿Se puede comprar con una hipoteca?",
      r: "Sí. El promotor acepta compras financiadas con un préstamo hipotecario bancario. Su asesor le acompaña en los trámites con su banco.",
    },
    {
      id: "livraison",
      q: "¿Cuándo se entregará el dominio?",
      r: `La entrega está prevista para ${v.livraison}. Las fechas de las etapas intermedias de la obra se están validando con el promotor.`,
    },
    {
      id: "villas",
      q: "¿Cuántas villas tiene CITYSTAR?",
      r: `${v.villas} villas, de tres tipos. Cada una tiene su parcela, de hasta ${v.terrain}, y su piscina privada.`,
    },
    {
      id: "lieu",
      q: "¿Dónde está el dominio?",
      r: `En Oulad Hassoune, prefectura de Marrakech, cerca de la Palmeraie. La plaza Jemaa el-Fna y el aeropuerto están a menos de ${v.minutes} minutos.`,
    },
    {
      id: "surfaces",
      q: "¿Qué superficies tienen?",
      r: `Tipo A: ${v.a}. Tipo B: ${v.b}. Tipo C: ${v.c}. Son superficies construidas; los terrenos se indican en la ficha de cada villa.`,
    },
    {
      id: "pmr",
      q: "¿Hay una villa adaptada a la movilidad reducida?",
      r: "Sí, la villa tipo A: ascensor, baños accesibles y circulaciones amplias.",
    },
    {
      id: "prix",
      q: "¿Cuál es el precio de las villas?",
      r: "Los precios se comunican bajo consulta, junto con el calendario de pagos detallado de la villa que le interesa. Solicite la llamada de un asesor.",
    },
    {
      id: "visite",
      q: "¿Se puede visitar?",
      r: "La visita en 360° está disponible en línea. La visita in situ se solicita a la conserjería, tras el estudio de su solicitud.",
    },
    {
      id: "plans",
      q: "¿Están disponibles los planos?",
      r: "Sí: planta baja y planta alta de cada tipo, ampliables en el sitio, además de un folleto PDF por villa.",
    },
  ],
  rendus: {
    alts: {
      "entree-crepuscule":
        "Camino de entrada de una villa, volúmenes blancos y pérgola de lamas oscuras, jardín de palmeras",
      "entree-palmiers": "Puerta de madera enmarcada por lamas oscuras, entre dos palmeras",
      "entree-portail": "Puerta de madera bajo una pérgola de lamas, vista de frente",
      "ext-aerien-piscine": "Vista elevada de una villa de dos plantas con su piscina y su césped",
      "ext-facade-crepuscule":
        "Fachada baja de villa, revoco blanco y franjas oscuras, tras un jardín seco",
      "ext-facade-entree": "Fachada de villa y su acceso, un coche aparcado ante la entrada",
      "ext-facade-jardin":
        "Villa de dos plantas vista desde el jardín, terraza cubierta y coche aparcado",
      "ext-pergola-allee":
        "Villa de volúmenes bajos, pérgola de lamas sobre la terraza, césped y palmeras",
      "ext-pergola-jour": "Terraza bajo una pérgola de lamas verticales, al borde del césped",
      "ext-pergola-portrait": "Pérgola de lamas oscuras sobre una terraza amueblada",
      "ext-piscine-crepuscule":
        "Esquina de una villa de dos plantas, grandes ventanales con cortinas y piscina",
      "ext-piscine-jour": "Piscina al pie de una villa de dos plantas, balcones y tumbonas",
      "ext-piscine-soir": "Villa iluminada al anochecer, piscina y terraza en planta alta",
      "ext-terrasse-jour":
        "Salón exterior bajo un voladizo, entre volúmenes blancos y revestimiento de madera",
      "ext-terrasses-cactus": "Villa de dos plantas y sus terrazas, césped, cactus y tumbonas",
      "ext-volume-lames": "Volumen oscuro surcado de lamas luminosas, patio con palmera",
      "int-chambre-bois":
        "Dormitorio revestido de madera oscura, cama grande y suelo de mármol claro",
      "int-chambre-jour": "Dormitorio luminoso, cama baja y ventanal abierto al jardín",
      "int-chambre-soir": "Dormitorio en tonos grises, cama, sillones y vestidor",
      "int-salon": "Salón con sofá curvo bajo lámparas circulares, bonsái sobre la mesa baja",
    },
    visionneuse: "Galería en grande",
    agrandir: (alt) => `Ampliar: ${alt}`,
    precedente: "Imagen anterior",
    suivante: "Imagen siguiente",
    fermer: "Cerrar la galería",
    position: (i, n) => `${i} / ${n}`,
  },
  ruban: {
    aria: "Los renders del dominio, en desplazamiento",
    note: "Renders de arquitecto · ilustraciones no contractuales",
    titre: ["El dominio,", "en imágenes."],
    galerie: "Ver toda la galería",
    pause: "Pausa",
    lecture: "Reproducir",
  },
  marque: {
    defilant: "CITYSTAR · CATORCE VILLAS PRIVADAS · OULAD HASSOUNE · MARRAKECH · ",
    legende: "Oulad Hassoune · Marrakech",
    aria: "CITYSTAR, residencia privada en Oulad Hassoune, Marrakech",
  },
  processus: {
    titre: ["De la primera visita", "a la entrega de llaves."],
    intro:
      "Un único interlocutor le acompaña en cada etapa, desde la primera conversación hasta su llegada.",
    etapes: (acompte, livraison) => [
      {
        titre: "La primera conversación",
        texte:
          "Por videollamada o por teléfono, un asesor le presenta el dominio, las villas, los planos y la visita 360°.",
      },
      {
        titre: "La elección de su villa",
        texte:
          "Visita in situ o a distancia. Recibe el precio y el calendario de pagos de la villa elegida.",
      },
      {
        titre: "La reserva ante notario",
        texte: `Reserva directamente ante notario, con el ${acompte} del precio.`,
      },
      {
        titre: "La financiación",
        texte: "Al contado o con hipoteca: su asesor le acompaña en los trámites con su banco.",
      },
      {
        titre: "El seguimiento de la obra",
        texte:
          "Desde su espacio de propietario: avance, fotos de la obra, pagos y documentos. Cada pago pasa por el notario.",
      },
      {
        titre: "La entrega de llaves",
        texte: `Entrega prevista para ${livraison}. Su villa se le entrega llave en mano.`,
      },
    ],
    cta: "Empezar con una primera conversación",
  },
  questions: {
    titre: ["Comprar sobre plano,", "con total tranquilidad."],
    intro: "Las preguntas que nos hacen antes de cada reserva.",
    toutes: "Todas las preguntas",
  },
  engagements: {
    titre: ["Tres compromisos.", "Una confianza plena."],
    intro: "Garantías concretas, en cada etapa de su compra.",
    items: (fondsPropres) => [
      {
        titre: "Un promotor que ya ha entregado",
        texte: "Una experiencia en promoción inmobiliaria ya probada en el extranjero.",
      },
      {
        titre: `${fondsPropres} fondos propios`,
        texte:
          "La obra se financia con fondos propios: no depende ni de un crédito del promotor ni de las ventas sobre plano.",
      },
      {
        titre: "El notario desde la reserva",
        texte: "La reserva se firma directamente ante notario, y cada pago pasa por la notaría.",
      },
    ],
    cta: "Recibir el dosier",
    selection: { outil: "Dosier CITYSTAR", ligne: "Solicitud del dosier completo" },
  },
  marche: {
    titre: "Marrakech acelera.",
    transactions: (annee) => `Transacciones en Marrakech en ${annee}`,
    prix: (annee) => `Precios en Marrakech en ${annee}`,
    comparaison: (annee) => `Evolución de las transacciones en ${annee}, por ciudad`,
    conclusion: (n) => `La demanda acelera. En CITYSTAR, la oferta se detiene en ${n} villas.`,
    source: "Fuente y metodología",
    sourceTexte: (annee) =>
      `Bank Al-Maghrib y ANCFCC, índice de precios de los activos inmobiliarios (IPAI): evolución en ${annee} del número de transacciones y del índice de precios, por ciudad.`,
    sourceLien: "Leer la reseña de la publicación",
  },
  cercle: {
    titre: "Una primera conversación, sin compromiso.",
    intro: "Elija la conversación que le convenga.",
    options: {
      visio: {
        titre: "Cita por videollamada",
        texte: "Una presentación del dominio y de las villas, a distancia.",
      },
      rappel: {
        titre: "Que me llamen",
        texte: "Un asesor le llama para responder a sus preguntas.",
      },
      rendement: {
        titre: "Simular mi rentabilidad",
        texte: "Una primera proyección, para afinar juntos.",
      },
    },
    selection: "Primera conversación",
  },
  pied: {
    sceau: "RESIDENCIA PRIVADA · CITYSTAR · MARRAKECH · ",
    titre: ["Un contacto ", "directo."],
    appeler: "Llamar",
    whatsapp: "WhatsApp",
    conciergerie: "Conserjería",
    ecrire: "Escribir",
    brochure: "Folleto",
    theme: ["Villa de lujo en Marrakech", "villa-de-lujo-marrakech"],
    nav: "Pie de página",
    legal: (annee) => `© ${annee} CITYSTAR · Residencia privada · Oulad Hassoune, Marrakech`,
    instagram: "CITYSTAR en Instagram",
    realise: "Realizado por",
    propulse: "Con la tecnología de",
    youtube: "CITYSTAR en YouTube",
  },
  selecteur: {
    kicker: "Encontrar mi villa",
    question: (n, total) => `Pregunta ${n} / ${total}`,
    progression: "Progreso",
    recommandation: "Recomendación",
    notre: "Nuestra recomendación",
    retour: "Atrás",
    clavier: "Teclado: números para responder, flecha izquierda para volver",
    recap: "Sus respuestas",
    apercu: "Vista previa de las tres villas",
    voirVilla: "Ver la villa",
    dossier: "Que me llamen por esta villa",
    prive:
      "Sus respuestas se quedan en este dispositivo: solo se adjuntan a su solicitud si la envía.",
    recommencer: "Empezar de nuevo",
    comparer: "Comparar con las otras dos",
    rendement: "Estimar la rentabilidad",
    outil: "Selector de villa",
    ligneRecommandation: (type) => `Recomendación: villa ${type}`,
    conversion: "Importes convertidos, a título indicativo",
    questions: {
      usage: {
        titre: "Piensa en CITYSTAR para…",
        vivre: "Vivir en ella",
        vivreNote: "Residencia principal o secundaria",
        investir: "Invertir",
        investirNote: "Inversión o alquiler",
      },
      suites: {
        titre: "¿Cuántas suites desea?",
        suites: (n) => `${n} suites`,
        peuImporte: "Me da igual",
      },
      budget: {
        titre: "¿Qué presupuesto contempla?",
        jusqua: (montant) => `Hasta ${montant}`,
        curseur: "Su presupuesto",
        valider: "Validar este presupuesto",
        parler: "Hablémoslo",
        parlerNote: "En persona",
      },
      pmr: {
        titre: "¿Necesita un acceso sin escalones, accesible?",
        oui: "Sí",
        ouiNote: "Ascensor, baños accesibles",
        non: "No",
      },
    },
    raisons: {
      pmr: "No accesible",
      suites: (n) => `${n} suites`,
      budget: "Fuera de presupuesto",
      autre: "Menos adecuada",
    },
    justifications: {
      pmr: (taille) =>
        `La única villa pensada para la movilidad reducida: ascensor y baños accesibles, ${taille}.`,
      pmrSuites: (plus) => ` Tiene ${plus ? "más" : "menos"} suites de las que pidió.`,
      contemporaine: (taille, exacte) =>
        `${taille}, volúmenes contemporáneos y piscina privada${exacte ? ": el tamaño que busca." : "."}`,
      budgetSeule: " Es la villa que entra en su presupuesto.",
      polyvalente: (taille) => `La más versátil: ${taille}, prolongada por amplias terrazas.`,
      espace: (taille) => `${taille}, prolongada por amplias terrazas: el espacio que busca.`,
      horsBudget: " Su precio supera el presupuesto indicado: hablemos de ello.",
    },
  },
  comparateur: {
    kicker: "Comparar",
    titre: ["Lo que las ", "distingue."],
    note: "Diferencias calculadas respecto a la villa de referencia",
    budget: (villas) => `Dentro del presupuesto indicado: ${villas}`,
    aucune: "ninguna villa",
    votreBudget: "Su presupuesto",
    horsBudget: "Fuera de presupuesto",
    reference: "Referencia",
    referenceAria: "Villa de referencia",
    prendreReference: (type) => `Tomar la villa ${type} como referencia`,
    differences: "Solo las diferencias",
    tableauAria: "Tabla comparativa de las tres villas",
    surface: "Superficie construida",
    surfaceCourt: ["Superficie", "construida"],
    terrain: "Terreno",
    suites: "Suites",
    pmr: ["Acceso", "sin escalones"],
    pmrOui: "Sí",
    pmrDetail: "Ascensor, baños accesibles",
    pmrNon: "No previsto",
    atout: "Carácter",
    plans: "Planos",
    deuxPlans: "2 planos",
    brochure: "Folleto",
    prix: "Precio",
    prixIndicatif: "Precio indicativo",
    defiler: "Desplazar para comparar",
    rappel: (type) => `Que me llamen por la villa ${type}`,
    outil: "Comparador de villas",
    ligneReference: (type) => `Villa de referencia: ${type}`,
    ligneBudget: (montant) => `Presupuesto: ${montant}`,
    estReference: " · referencia",
    suite: "suite",
  },
  rentabilite: {
    kicker: "Simulador",
    titre: ["¿Y si la villa ", "trabajara?"],
    modes: { court: "Alquiler corto", long: "Alquiler largo", revente: "Reventa" },
    modeAria: "Modo de simulación",
    prix: "Precio del inmueble",
    intro: [
      "Indique el presupuesto y el uso previsto, ajuste las hipótesis y muestre la estimación, en la moneda que elija.",
      "Los controles parten de valores de ilustración: ajústelos a su proyecto. Las cifras definitivas las confirma el promotor.",
    ],
    budget: "Presupuesto estudiado",
    typeLabel: "Tipo de villa",
    optionnel: "opcional",
    typeLibre: "Aún no lo sé",
    typeVilla: (type) => `Villa tipo ${type}`,
    projet: "Su proyecto",
    estimer: "Ver mi estimación",
    resultatTitre: "Su estimación",
    budgetSaisi: "Presupuesto estudiado",
    usage: "Uso previsto",
    recap: (budget, usage) => `Presupuesto estudiado: ${budget} · ${usage}`,
    fourchette: (min, max) => `De ${min} a ${max}`,
    prixEtudie: (montant) => `Precio estudiado: ${montant}`,
    champs: {
      prixMoyenNuitEUR: "Precio medio por noche",
      tauxOccupation: "Tasa de ocupación",
      semainesUsagePersonnel: "Semanas de uso personal",
      loyerMensuelEUR: "Alquiler mensual estimado",
      horizonAnnees: "Horizonte",
      appreciationAnnuelle: "Revalorización anual",
      charges: "Gastos de explotación",
      coutsAnnuelsEUR: "Costes de tenencia",
      imposition: "Fiscalidad",
    },
    semaine: (n) => `${n} semana${n > 1 ? "s" : ""}`,
    an: (n) => `${n} año${n > 1 ? "s" : ""}`,
    desRevenus: "de los ingresos",
    parAn: "/ año",
    attente: "Pendiente",
    avancees: "Hipótesis avanzadas",
    rendementBrut: "Rentabilidad bruta",
    plusValueBrute: "Plusvalía bruta",
    nuits: "Noches alquiladas al año",
    revenuBrut: "Ingresos brutos anuales",
    loyerDouze: "Alquiler × 12 meses",
    valeurProjetee: (annees) => `Valor proyectado a ${annees} años`,
    appreciation: "Hipótesis de revalorización",
    neutreTitre: "Hipótesis en validación",
    neutreTexte:
      "No se publica ninguna rentabilidad hasta que el promotor confirme las hipótesis. Reciba un análisis basado en su propio proyecto.",
    mention:
      "Hipótesis de ilustración, no contractuales: mueva los controles para probar las suyas. Estimación antes de gastos, fiscalidad y costes reales de explotación.",
    courtTerme:
      "El alquiler de corta duración en Marrakech está sujeto a obligaciones declarativas locales.",
    analyse: "Que me llamen para hablarlo",
    compatibles: "Ver las villas dentro del presupuesto",
    outil: "Simulador de rentabilidad",
    ligneMode: (mode) => `Modo: ${mode}`,
    ligneType: (type) => `Tipo estudiado: ${type}`,
    ligneResultat: (titre, valeur) => `${titre}: ${valeur}`,
    ligneNeutre: "Hipótesis en validación",
  },
  contact: {
    kicker: "Conserjería CITYSTAR",
    titre: ["Que le ", "llamemos."],
    texte:
      "Déjenos sus datos y un asesor de CITYSTAR le llamará para responder a sus preguntas sobre planos, precios o una visita al dominio. Al enviar, se abre su aplicación de correo con la solicitud lista.",
    jointe: (outil) => `Adjunto a su solicitud · ${outil}`,
    retirer: "No adjuntar",
    nom: "Nombre y apellidos",
    telephone: "Teléfono",
    email: "Correo electrónico",
    interet: "Su interés",
    interets: [
      "Descubrir el proyecto",
      "Villa tipo A",
      "Villa tipo B",
      "Villa tipo C",
      "Organizar una visita",
    ],
    envoyer: "Enviar mi solicitud",
    fermer: "Cerrar",
  },
  modales: {
    plan: "Plano ampliado",
    planAlt: "Plano arquitectónico de CITYSTAR, ampliado",
    fermerPlan: "Cerrar el plano",
  },
};
