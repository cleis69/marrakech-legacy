/**
 * Page de remerciement des formulaires de pub (Meta…), dans les six langues. Meta refuse les liens
 * WhatsApp sur le bouton de fin d'un formulaire : le bouton mène ici, et cette page propose
 * WhatsApp (message pré-rempli), l'appel et les villas. Elle n'est pas indexée.
 */
import { contact, type Langue } from "@/config/citystar";

export type TexteMerci = {
  titre: string;
  description: string;
  kicker: string;
  titreH1: readonly string[];
  intro: string;
  sousTitre: string;
  rappel: string;
  whatsapp: { titre: string; texte: string; message: string };
  appeler: { titre: string };
  villas: { titre: string; texte: string };
};

const tel = contact.telephoneAffiche;

export const merci: Record<Langue, TexteMerci> = {
  fr: {
    titre: "Merci — CITYSTAR Marrakech",
    description: "Votre demande est bien envoyée.",
    kicker: "Demande envoyée",
    titreH1: ["Merci,", "votre demande est bien envoyée"],
    intro:
      "Un consultant expert en immobilier vous contactera rapidement. Pour recevoir tout de suite la liste des villas encore disponibles, écrivez-nous sur WhatsApp : le message est déjà prêt.",
    sousTitre: "Recevoir la liste maintenant",
    rappel: "Villa témoin à visiter d’ici fin janvier 2027. Première villa livrée en août 2027.",
    whatsapp: {
      titre: "Recevoir la liste sur WhatsApp",
      texte: `Message prêt à envoyer au ${tel}`,
      message: "Bonjour, je souhaite recevoir la liste des villas CITYSTAR encore disponibles.",
    },
    appeler: { titre: "Appeler un consultant" },
    villas: { titre: "Découvrir les villas", texte: "Plans, surfaces et visite 360°" },
  },
  en: {
    titre: "Thank you — CITYSTAR Marrakech",
    description: "Your request has been sent.",
    kicker: "Request sent",
    titreH1: ["Thank you,", "your request has been sent"],
    intro:
      "An expert real estate consultant will contact you shortly. To get the list of villas still available right away, message us on WhatsApp: the message is ready to send.",
    sousTitre: "Get the list now",
    rappel:
      "Show villa open for viewings by the end of January 2027. First villa delivered in August 2027.",
    whatsapp: {
      titre: "Get the list on WhatsApp",
      texte: `Message ready to send to ${tel}`,
      message: "Hello, I would like to receive the list of CITYSTAR villas still available.",
    },
    appeler: { titre: "Call a consultant" },
    villas: { titre: "Discover the villas", texte: "Floor plans, surfaces and 360° tour" },
  },
  es: {
    titre: "Gracias — CITYSTAR Marrakech",
    description: "Su solicitud se ha enviado.",
    kicker: "Solicitud enviada",
    titreH1: ["Gracias,", "su solicitud se ha enviado"],
    intro:
      "Un consultor inmobiliario experto se pondrá en contacto con usted en breve. Para recibir ahora mismo la lista de villas aún disponibles, escríbanos por WhatsApp: el mensaje ya está listo.",
    sousTitre: "Reciba la lista ahora",
    rappel:
      "Villa piloto visitable antes de finales de enero de 2027. Primera villa entregada en agosto de 2027.",
    whatsapp: {
      titre: "Recibir la lista por WhatsApp",
      texte: `Mensaje listo para enviar al ${tel}`,
      message: "Hola, me gustaría recibir la lista de villas CITYSTAR aún disponibles.",
    },
    appeler: { titre: "Llamar a un consultor" },
    villas: { titre: "Descubrir las villas", texte: "Planos, superficies y visita 360°" },
  },
  it: {
    titre: "Grazie — CITYSTAR Marrakech",
    description: "La sua richiesta è stata inviata.",
    kicker: "Richiesta inviata",
    titreH1: ["Grazie,", "la sua richiesta è stata inviata"],
    intro:
      "Un consulente immobiliare esperto la contatterà a breve. Per ricevere subito l’elenco delle ville ancora disponibili, ci scriva su WhatsApp: il messaggio è già pronto.",
    sousTitre: "Riceva l’elenco ora",
    rappel:
      "Villa campione visitabile entro fine gennaio 2027. Prima villa consegnata ad agosto 2027.",
    whatsapp: {
      titre: "Ricevere l’elenco su WhatsApp",
      texte: `Messaggio pronto da inviare al ${tel}`,
      message: "Buongiorno, vorrei ricevere l'elenco delle ville CITYSTAR ancora disponibili.",
    },
    appeler: { titre: "Chiamare un consulente" },
    villas: { titre: "Scoprire le ville", texte: "Planimetrie, superfici e visita a 360°" },
  },
  nl: {
    titre: "Bedankt — CITYSTAR Marrakech",
    description: "Uw aanvraag is verzonden.",
    kicker: "Aanvraag verzonden",
    titreH1: ["Bedankt,", "uw aanvraag is verzonden"],
    intro:
      "Een deskundige vastgoedconsultant neemt binnenkort contact met u op. Wilt u de lijst met nog beschikbare villa’s meteen ontvangen? Stuur ons een bericht via WhatsApp: het bericht staat al klaar.",
    sousTitre: "Ontvang de lijst nu",
    rappel:
      "Modelvilla uiterlijk eind januari 2027 te bezichtigen. Eerste villa opgeleverd in augustus 2027.",
    whatsapp: {
      titre: "Lijst ontvangen via WhatsApp",
      texte: `Bericht klaar om te versturen naar ${tel}`,
      message: "Hallo, ik ontvang graag de lijst met nog beschikbare CITYSTAR-villa's.",
    },
    appeler: { titre: "Een consultant bellen" },
    villas: { titre: "De villa’s ontdekken", texte: "Plattegronden, oppervlakten en 360°-tour" },
  },
  no: {
    titre: "Takk — CITYSTAR Marrakech",
    description: "Forespørselen din er sendt.",
    kicker: "Forespørsel sendt",
    titreH1: ["Takk,", "forespørselen din er sendt"],
    intro:
      "En fagkyndig eiendomskonsulent tar snart kontakt med deg. Vil du ha listen over villaer som fortsatt er ledige med en gang? Skriv til oss på WhatsApp: meldingen er allerede klar.",
    sousTitre: "Få listen nå",
    rappel: "Visningsvilla klar innen utgangen av januar 2027. Første villa ferdig i august 2027.",
    whatsapp: {
      titre: "Få listen på WhatsApp",
      texte: `Melding klar til å sende til ${tel}`,
      message: "Hei, jeg vil gjerne få listen over CITYSTAR-villaer som fortsatt er ledige.",
    },
    appeler: { titre: "Ring en konsulent" },
    villas: { titre: "Se villaene", texte: "Planløsninger, arealer og 360°-visning" },
  },
};
