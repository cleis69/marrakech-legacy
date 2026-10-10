import type { Copie } from "./fr";

const es: Copie = {
  lieu: "Residencia privada · Marrakech",
  rendu: "Render 3D, no contractual.",
  pied: {
    accroche: ["Catorce villas.", " Ni una más."],
    lieu: (livraison) => `Oulad Hassoune, Marrakech · Entrega en ${livraison}`,
    site: "La web",
  },
  legal: { rendus: "Renders 3D no contractuales.", desinscrire: "Darse de baja" },
  raisons: {
    dossier: "Recibe este correo porque solicitó el dossier de CITYSTAR.",
    visite: "Recibe este correo en relación con su cita en CITYSTAR.",
    proprio: "Recibe este correo como comprador de una villa CITYSTAR.",
  },
  signature: { salut: "Hasta pronto,", role: "Asesor CITYSTAR", equipe: "El equipo CITYSTAR" },
  poids: (mo) => `${mo} MB`,
  planPdf: "Plano en PDF",
  suites: (n) => `${n} suites`,
  plainPied: "accesible sin escalones",
  source: "Fuente",
  contact: {
    visite: { kicker: "Su asesor", titre: "Visitemos juntos el conjunto.", texte: "In situ en Marrakech o por videollamada, a la hora que le convenga. Su asesor responde a todas sus preguntas.", principal: "Organizar una visita", secondaire: "Hablar con un asesor" },
    avant: { kicker: "Su asesor", titre: "¿Una pregunta antes de la visita?", texte: "Su asesor le responde directamente, por WhatsApp o por teléfono.", principal: "Escribir a mi asesor", secondaire: "Llamar" },
    apres: { kicker: "Su asesor", titre: "¿Aún tiene dudas?", texte: "Vuelva a ver el conjunto, in situ o por videollamada, o plantee sus preguntas a su asesor.", principal: "Organizar otra visita", secondaire: "Hablar con un asesor" },
    proprio: { kicker: "Su asesor", titre: "Su asesor sigue a su lado.", texte: "¿Una pregunta sobre la obra, un pago o un documento? Escríbale o llámele.", principal: "Escribir a mi asesor", secondaire: "Llamar" },
    telephone: (tel) => `o llame al ${tel}`,
    messages: {
      visite: "Hola, me gustaría organizar una visita de CITYSTAR, in situ o por videollamada.",
      conseiller: "Hola, me gustaría hablar con un asesor de CITYSTAR.",
      proprio: "Hola, soy comprador de una villa CITYSTAR y tengo una pregunta.",
    },
  },
  faits: {
    villas: "villas privadas",
    construits: "construidos, como máximo",
    terrain: "de terreno por villa",
    trajet: "de Jemaa el-Fna",
  },
  d1: {
    objet: "Su dossier CITYSTAR",
    preheader: "El folleto, los planos de las tres villas y los próximos pasos.",
    alt: "Una villa CITYSTAR al atardecer, con la piscina iluminada",
    kicker: "Su dossier",
    titre: ["Le damos la bienvenida", "a CITYSTAR[[, prenom]]."],
    intro:
      "Gracias por su solicitud. Esto es lo que puede consultar desde ahora mismo: el folleto del conjunto y los planos de las tres villas.",
    brochure: "Folleto del conjunto",
    planVilla: (type) => `Planos de la villa ${type}`,
    texte:
      "Le enviaré personalmente el precio de cada villa, la disponibilidad y el calendario de pagos. Para ir más rápido, cuénteme qué busca: la arquitectura que le atrae, sus plazos y si compra para vivir o para alquilar.",
    bouton: "Descubrir el conjunto en línea",
  },
  d2: {
    objet: "¿A, B o C?",
    preheader: "Tres arquitecturas, la misma exigencia. ¿Cuál es la suya?",
    kicker: "Las villas",
    titre: ["Tres arquitecturas,", "la misma exigencia."],
    intro: (terrain) =>
      `Cada villa se asienta sobre ${terrain} de terreno, con su piscina privada. Lo que cambia: los volúmenes, el número de suites, la manera de vivir la luz.`,
    altVilla: (type) => `Render de la villa ${type}`,
    texte:
      "El comparador de la web las pone una al lado de otra, y un cuestionario de cuatro preguntas le orienta hacia la que más le conviene.",
    bouton: "Comparar las tres villas",
  },
  d3: {
    objet: "Entre antes de que exista",
    preheader: "La visita 360°, estancia por estancia, desde su sofá.",
    alt: "El salón de una villa CITYSTAR",
    kicker: "Visita 360°",
    titre: ["No la imagine.", "Entre."],
    intro:
      "El salón, las suites, las terrazas, la piscina: la visita 360° le lleva de una estancia a otra como si estuviera allí. En el ordenador o en el móvil, a pantalla completa.",
    points: ["Todas las estancias, en 360°", "Las vistas desde las terrazas", "El jardín y la piscina privada"],
    bouton: "Iniciar la visita 360°",
    secondaire: "Prefiero una visita guiada por videollamada",
    whatsapp: "Hola, me gustaría una visita guiada de CITYSTAR por videollamada.",
  },
  d4: {
    objet: "Qué paga y cuándo",
    preheader: (part) => `${part} ante notario y, después, el resto al ritmo de la obra.`,
    kicker: "Comprar con tranquilidad",
    titre: ["Qué paga", "y cuándo."],
    intro: "Comprar sobre plano en el extranjero requiere confianza. Así es una compra en CITYSTAR.",
    etapes: (part, livraison) => [
      { titre: `${part} al reservar`, texte: "La reserva se firma directamente ante notario, no en una oficina de ventas." },
      { titre: "El resto acompaña la obra", texte: "Cada solicitud de pago corresponde a una etapa terminada: cimientos, estructura, acabados." },
      { titre: `Entrega de llaves, ${livraison}`, texte: "El último pago, a la entrega de su villa." },
    ],
    encadre: (fondsPropres) => ({
      titre: `${fondsPropres} fondos propios`,
      texte:
        "El promotor financia la obra con sus propios fondos. También acepta compradores que financian su villa con hipoteca, y ya ha entregado proyectos en el extranjero.",
    }),
    texte: "Su asesor le entregará el calendario exacto de la villa que elija.",
    bouton: "Recibir el calendario de mi villa",
    whatsapp: "Hola, me gustaría recibir el calendario de pagos detallado de una villa CITYSTAR.",
  },
  d5: {
    objet: "Marrakech acelera",
    preheader: (evolution, annee) =>
      `${evolution} de transacciones en ${annee}, por delante de Rabat y Casablanca.`,
    alt: "Vista aérea de una villa y su piscina",
    kicker: "Invertir",
    titre: ["Marrakech", "acelera."],
    intro: (annee, prix) =>
      `En ${annee}, las transacciones inmobiliarias crecieron más en Marrakech que en las demás grandes ciudades del país, con precios estables (${prix}).`,
    legende: (annee) => `Evolución de las transacciones en ${annee}, índice IPAI (Bank Al-Maghrib y ANCFCC).`,
    texte: (villas) =>
      `La demanda acelera; en CITYSTAR, la oferta se detiene en ${villas} villas. El simulador de la web calcula la rentabilidad bruta del alquiler vacacional con sus propias hipótesis.`,
    bouton: "Simular mi rentabilidad",
  },
  d6: {
    objet: "Su obra, desde casa",
    preheader: "Avance, fotos, pagos, documentos: todo en su espacio de propietario.",
    alt: "Fachada de una villa CITYSTAR con lamas verticales",
    kicker: "Tras la reserva",
    titre: ["Su obra,", "seguida desde donde viva."],
    intro:
      "Comprar lejos de casa siempre plantea la misma pregunta: ¿cómo saber en qué punto está la obra? En CITYSTAR, cada comprador recibe un acceso personal a su espacio de propietario.",
    points: [
      "<b>El avance</b> de su villa, en porcentaje, con unas palabras del promotor",
      "<b>Las fotos de la obra</b>, en cada etapa",
      "<b>Sus pagos</b>: lo pagado, lo pendiente y el próximo vencimiento",
      "<b>Sus documentos</b>: contrato, planos, solicitudes de pago",
    ],
    texte: "Sin contraseña: le llega un enlace de acceso por correo, y ya está dentro.",
    bouton: "Ver el espacio de propietario",
  },
  d7: {
    objet: "Catorce parcelas",
    preheader: "Los primeros compradores eligen la ubicación.",
    kicker: "El plano general",
    titre: ["Catorce parcelas.", "Los primeros eligen."],
    alt: "Plano general del conjunto CITYSTAR",
    legende: "Plano general del conjunto, no contractual.",
    texte:
      "La ubicación dentro del conjunto, la orientación de la piscina, la arquitectura A, B o C: cada reserva reduce la elección de los siguientes.",
    texte2:
      "Si alguna de las villas le interesa, pida la lista de parcelas todavía disponibles: sabrá exactamente lo que queda por elegir.",
    bouton: "Consultar disponibilidad",
    whatsapp: "Hola, ¿qué villas de CITYSTAR siguen disponibles?",
  },
  d8: {
    objet: "Una pregunta rápida",
    preheader: "Basta con responder con un número.",
    bonjour: "Hola[[ prenom]]:",
    texte:
      "Recibió el dossier de CITYSTAR hace tres semanas y no quisiera escribirle en vano. ¿En qué punto está su proyecto?",
    consigne: "Responda simplemente a este correo con un número:",
    choix: [
      "Quiero visitarlo, in situ o por videollamada.",
      "Tengo preguntas sobre la financiación o la compra desde el extranjero.",
      "No es el momento: vuelva a contactarme más adelante.",
    ],
    fin: "Le responderé rápidamente y respetaré su elección.",
  },
  v1: {
    objet: "Su visita a CITYSTAR",
    preheader: "La dirección, el itinerario y lo que veremos juntos.",
    alt: "La entrada del conjunto CITYSTAR al atardecer",
    kicker: "Su cita",
    titre: ["Hasta pronto", "en CITYSTAR."],
    lieu: "Oulad Hassoune, Marrakech. Su asesor le espera en la entrada del conjunto.",
    intro: "Durante la visita veremos juntos:",
    points: [
      "El conjunto y la ubicación de las parcelas todavía libres",
      "Los planos de la villa que le interesa",
      "El precio, el calendario de pagos y las etapas de la compra",
    ],
    bouton: "Abrir el itinerario",
    secondaire: "¿Un imprevisto? Avíseme por WhatsApp",
    whatsapp: "Hola, necesito cambiar la fecha de mi visita a CITYSTAR.",
  },
  v2: {
    objet: "Hasta mañana",
    preheader: (minutes) => `Cita en el conjunto, a ${minutes} minutos de Jemaa el-Fna.`,
    bonjour: "Hola[[ prenom]]:",
    texte: "Le confirmo nuestra cita de mañana, [[heure]], en el conjunto CITYSTAR.",
    itineraire: "El itinerario hasta el conjunto",
    distance: (minutes) => `, a ${minutes} minutos de Jemaa el-Fna y del aeropuerto`,
    points: ["Calzado cómodo para recorrer el conjunto", "Sus preguntas: ninguna sobra"],
    visio:
      "Si todavía está lejos de Marrakech, la visita puede hacerse por videollamada: dígamelo y le envío el enlace.",
  },
  v3: {
    objet: "Gracias por su visita",
    preheader: "El resumen y las tres etapas hasta las llaves.",
    kicker: "Tras su visita",
    titre: ["Gracias", "por su visita."],
    intro:
      "Fue un placer enseñarle el conjunto. Como le prometí, estos son los siguientes pasos si alguna de las villas le ha convencido:",
    etapes: (part, livraison) => [
      { titre: "Elige su villa", texte: "La arquitectura, la parcela, la orientación. Le confirmo su disponibilidad." },
      { titre: "Reserva ante notario", texte: `El ${part} del precio a la firma. Se acepta la hipoteca.` },
      { titre: "Sigue su obra", texte: `Desde su espacio de propietario, hasta la entrega de llaves en ${livraison}.` },
    ],
    bouton: "Reservar mi villa",
    whatsapp: "Hola, me gustaría reservar una villa CITYSTAR.",
    secondaire: "Volver a ver la visita 360°",
  },
  p1: {
    objet: "Ya está en casa",
    preheader: "Su espacio de propietario ya está abierto.",
    alt: "La terraza de una villa CITYSTAR",
    kicker: "Villa [[villa]]",
    titre: ["Ya está", "en casa."],
    intro: "Enhorabuena[[, prenom]]: la villa [[villa]] es suya. Su espacio de propietario está abierto desde hoy.",
    etapes: [
      { titre: "Abra su espacio", texte: "Haga clic en el botón de abajo e introduzca esta dirección de correo: [[email]]." },
      { titre: "Reciba su enlace", texte: "Le llega un enlace de acceso al correo. Sin contraseñas que recordar." },
      { titre: "Siga su villa", texte: "Avance, fotos de la obra, pagos y documentos." },
    ],
    bouton: "Abrir mi espacio",
  },
  p2: {
    objet: "Cómo seguir su obra",
    preheader: "Lo que encontrará en su espacio, y cuándo.",
    kicker: "Su espacio de propietario",
    titre: ["Cómo seguir", "su obra."],
    intro: "Su villa entra en fase de construcción. Esto es lo que encontrará en su espacio, y en qué momento.",
    points: [
      "<b>En cada etapa terminada</b>: el avance actualizado y las fotos de su villa",
      "<b>Antes de cada solicitud de pago</b>: el importe, el vencimiento y, una vez pagado, el recibo",
      "<b>En todo momento</b>: su contrato, sus planos y sus documentos, para descargar",
    ],
    encadre: (livraison) => ({
      titre: `Entrega en ${livraison}`,
      texte:
        "Recibirá un correo en cada nueva etapa de la obra. Su asesor sigue disponible por WhatsApp para cualquier pregunta.",
    }),
    bouton: "Abrir mi espacio",
  },
  p3: {
    objet: "Noticias de su villa",
    preheader: "Se ha terminado una nueva etapa. Las fotos ya están en línea.",
    alt: "Foto de la obra",
    legende: "Sustituya esta imagen por una foto de la obra.",
    kicker: "Noticias de la obra",
    titre: ["[[edit:etapa]]:", "terminada."],
    avancement: "[[edit:avance]] %",
    prochaine: "[[edit:próxima etapa]]",
    faits: { avancement: "de la obra", prochaine: "próxima etapa", livraison: "entrega" },
    mot: "[[edit:unas palabras del promotor]]",
    texte:
      "Las nuevas fotos de su villa están en su espacio, junto con la próxima solicitud de pago si esta etapa da lugar a una.",
    bouton: "Ver las fotos",
  },
  n1: {
    objet: "La obra avanza",
    preheader: "Noticias del conjunto y las villas que quedan.",
    alt: "Foto de la obra",
    legende: "Sustituya esta imagen por una foto de la obra.",
    kicker: "Noticias del conjunto",
    titre: ["La obra", "avanza."],
    intro: (livraison) =>
      `Desde que solicitó el dossier, CITYSTAR ha superado una nueva etapa: [[edit:etapa]]. Las villas toman forma y la entrega sigue prevista para ${livraison}.`,
    restantes: "[[edit:villas libres]]",
    faits: {
      restantes: (villas) => `villas todavía libres de ${villas}`,
      livraison: "entrega",
      reservation: "al reservar",
    },
    texte: "Si su proyecto sigue en pie, es buen momento para elegir su parcela antes que los siguientes.",
    bouton: "Recibir la disponibilidad",
    whatsapp: "Hola, me gustaría saber qué villas de CITYSTAR siguen disponibles.",
    secondaire: "Volver a ver el conjunto en línea",
  },
};

export default es;
