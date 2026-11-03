/**
 * Politique de confidentialité, dans les six langues. Les formulaires de pub (Meta, Google,
 * LinkedIn, Snapchat) renvoient vers cette page : elle décrit ce que le site et ces formulaires
 * collectent réellement. Toute nouvelle collecte (outil de mesure, champ, prestataire) doit y
 * être ajoutée.
 */
import { contact, type Langue } from "@/config/citystar";

/** Un paragraphe, ou une liste à puces. */
type Bloc = string | readonly string[];

export type TexteConfidentialite = {
  titre: string;
  description: string;
  kicker: string;
  titreH1: readonly string[];
  intro: string;
  /** Libellé du lien en pied de page. */
  lien: string;
  miseAJour: string;
  sections: readonly { titre: string; blocs: readonly Bloc[] }[];
};

const { email, telephoneAffiche } = contact;
const adresse = `${contact.adresse.rue}, ${contact.adresse.codePostal} ${contact.adresse.ville}`;

export const confidentialite: Record<Langue, TexteConfidentialite> = {
  fr: {
    titre: "Politique de confidentialité — CITYSTAR Marrakech",
    description:
      "Les données que CITYSTAR collecte quand vous demandez à être rappelé, ce qu'elle en fait, combien de temps elle les garde et comment exercer vos droits.",
    kicker: "Confidentialité",
    titreH1: ["Vos données,", "et ce que nous en faisons"],
    intro:
      "Ce que nous recueillons quand vous nous écrivez ou remplissez un formulaire, pourquoi, et comment le consulter, le corriger ou le faire supprimer.",
    lien: "Confidentialité",
    miseAJour: "Mise à jour le 3 novembre 2026.",
    sections: [
      {
        titre: "Qui traite vos données",
        blocs: [
          `CITYSTAR, ${adresse}, Maroc. Pour toute question sur vos données : ${email} ou ${telephoneAffiche}.`,
        ],
      },
      {
        titre: "Ce que nous recueillons",
        blocs: [
          "Quand vous demandez à être rappelé sur ce site, ou que vous répondez à l'un de nos formulaires publicitaires (Facebook, Instagram, Google, LinkedIn, Snapchat) :",
          [
            "votre nom, votre adresse e-mail et votre numéro de téléphone ;",
            "vos réponses facultatives : villa qui vous intéresse, type de projet, horizon d'achat, budget, mode de financement, message ;",
            "la langue de la page et celle de votre appareil, pour vous écrire dans votre langue ;",
            "la provenance de votre visite (annonce ou lien suivi), la page d'envoi et votre adresse IP.",
          ],
          "Si vous devenez propriétaire, l'espace propriétaire utilise votre adresse e-mail pour vous envoyer un lien de connexion, et affiche les informations de votre dossier d'achat.",
          "Le site ne dépose aucun cookie publicitaire et n'utilise aucun outil de mesure d'audience. Il garde seulement, dans votre navigateur, la provenance de la visite et la langue choisie le temps de la visite, ainsi que les taux de change affichés.",
        ],
      },
      {
        titre: "Pourquoi",
        blocs: [
          [
            "vous rappeler et répondre à votre demande ;",
            "vous envoyer, dans votre langue, une courte série d'e-mails sur le domaine et l'avancement du projet ;",
            "suivre votre projet d'achat et préparer, si vous le souhaitez, la réservation d'un lot ;",
            "savoir quelles annonces nous amènent des demandes.",
          ],
          "Ces traitements reposent sur votre consentement, donné en envoyant le formulaire, et sur les démarches que vous nous demandez avant un éventuel achat. Chaque e-mail contient un lien de désinscription.",
        ],
      },
      {
        titre: "Qui y a accès",
        blocs: [
          "L'équipe commerciale de CITYSTAR, et les prestataires qui nous fournissent nos outils, uniquement pour ce service :",
          [
            "HubSpot, pour la gestion des demandes et des contacts ;",
            "Brevo, pour l'envoi des e-mails ;",
            "Cloudflare, pour l'hébergement du site et la transmission des demandes ;",
            "Google Workspace, pour notre messagerie ;",
            "Supabase, pour l'espace propriétaire.",
          ],
          "Si vous répondez à un formulaire publicitaire, la plateforme concernée (Meta, Google, LinkedIn ou Snapchat) traite aussi vos réponses selon sa propre politique. Nous ne vendons ni ne louons vos données.",
          "Certains de ces prestataires conservent les données hors du Maroc, dans l'Union européenne ou aux États-Unis.",
        ],
      },
      {
        titre: "Combien de temps",
        blocs: [
          "Les données d'une demande sont conservées trois ans après notre dernier échange, puis supprimées. Celles d'un acquéreur le sont pendant la durée de la vente et des obligations légales qui la suivent.",
        ],
      },
      {
        titre: "Vos droits",
        blocs: [
          `Vous pouvez à tout moment consulter vos données, les faire corriger ou supprimer, et vous opposer à leur utilisation, en écrivant à ${email}. Nous répondons dans un délai d'un mois.`,
          "Ces droits vous sont garantis par la loi marocaine n° 09-08 et, si vous résidez dans l'Union européenne, par le RGPD. Vous pouvez aussi adresser une réclamation à la CNDP (cndp.ma) ou à l'autorité de protection des données de votre pays.",
        ],
      },
    ],
  },
  en: {
    titre: "Privacy policy — CITYSTAR Marrakech",
    description:
      "The data CITYSTAR collects when you ask to be called back, what it does with it, how long it keeps it and how to exercise your rights.",
    kicker: "Privacy",
    titreH1: ["Your data,", "and what we do with it"],
    intro:
      "What we collect when you write to us or fill in a form, why, and how to see it, correct it or have it deleted.",
    lien: "Privacy",
    miseAJour: "Updated on 3 November 2026.",
    sections: [
      {
        titre: "Who processes your data",
        blocs: [
          `CITYSTAR, ${adresse}, Morocco. For any question about your data: ${email} or ${telephoneAffiche}.`,
        ],
      },
      {
        titre: "What we collect",
        blocs: [
          "When you ask to be called back on this website, or answer one of our ad forms (Facebook, Instagram, Google, LinkedIn, Snapchat):",
          [
            "your name, email address and phone number;",
            "your optional answers: villa of interest, type of project, purchase timeframe, budget, financing, message;",
            "the language of the page and of your device, so we can write to you in your language;",
            "where your visit came from (ad or link followed), the page you sent the form from and your IP address.",
          ],
          "If you become an owner, the owner area uses your email address to send you a sign-in link, and shows the details of your purchase file.",
          "The website sets no advertising cookies and uses no audience measurement tool. It only keeps, in your browser, where your visit came from and the language you chose for the length of the visit, and the exchange rates it displays.",
        ],
      },
      {
        titre: "Why",
        blocs: [
          [
            "to call you back and answer your request;",
            "to send you, in your language, a short series of emails about the estate and the progress of the project;",
            "to follow your purchase project and, if you wish, prepare the reservation of a plot;",
            "to know which ads bring us requests.",
          ],
          "This processing is based on your consent, given by sending the form, and on the steps you ask us to take before a possible purchase. Every email contains an unsubscribe link.",
        ],
      },
      {
        titre: "Who has access",
        blocs: [
          "The CITYSTAR sales team, and the providers of our tools, solely for this service:",
          [
            "HubSpot, to manage requests and contacts;",
            "Brevo, to send emails;",
            "Cloudflare, to host the website and forward requests;",
            "Google Workspace, for our email;",
            "Supabase, for the owner area.",
          ],
          "If you answer an ad form, the platform concerned (Meta, Google, LinkedIn or Snapchat) also processes your answers under its own policy. We do not sell or rent your data.",
          "Some of these providers store data outside Morocco, in the European Union or the United States.",
        ],
      },
      {
        titre: "How long",
        blocs: [
          "Data from a request is kept for three years after our last exchange, then deleted. A buyer's data is kept for the duration of the sale and of the legal obligations that follow it.",
        ],
      },
      {
        titre: "Your rights",
        blocs: [
          `You can at any time see your data, have it corrected or deleted, and object to its use, by writing to ${email}. We reply within one month.`,
          "These rights are guaranteed by Moroccan Law No. 09-08 and, if you live in the European Union, by the GDPR. You may also lodge a complaint with the CNDP (cndp.ma) or with the data protection authority of your country.",
        ],
      },
    ],
  },
  es: {
    titre: "Política de privacidad — CITYSTAR Marrakech",
    description:
      "Los datos que CITYSTAR recoge cuando pide que le llamemos, qué hace con ellos, cuánto tiempo los conserva y cómo ejercer sus derechos.",
    kicker: "Privacidad",
    titreH1: ["Sus datos,", "y lo que hacemos con ellos"],
    intro:
      "Lo que recogemos cuando nos escribe o rellena un formulario, por qué, y cómo consultarlo, corregirlo o pedir que se borre.",
    lien: "Privacidad",
    miseAJour: "Actualizada el 3 de noviembre de 2026.",
    sections: [
      {
        titre: "Quién trata sus datos",
        blocs: [
          `CITYSTAR, ${adresse}, Marruecos. Para cualquier pregunta sobre sus datos: ${email} o ${telephoneAffiche}.`,
        ],
      },
      {
        titre: "Qué recogemos",
        blocs: [
          "Cuando pide que le llamemos en este sitio, o responde a uno de nuestros formularios publicitarios (Facebook, Instagram, Google, LinkedIn, Snapchat):",
          [
            "su nombre, su dirección de correo electrónico y su número de teléfono;",
            "sus respuestas opcionales: villa que le interesa, tipo de proyecto, plazo de compra, presupuesto, financiación, mensaje;",
            "el idioma de la página y el de su dispositivo, para escribirle en su idioma;",
            "la procedencia de su visita (anuncio o enlace seguido), la página de envío y su dirección IP.",
          ],
          "Si se convierte en propietario, el área de propietarios utiliza su correo electrónico para enviarle un enlace de acceso y muestra la información de su expediente de compra.",
          "El sitio no instala cookies publicitarias ni utiliza ninguna herramienta de medición de audiencia. Solo guarda en su navegador la procedencia de la visita y el idioma elegido mientras dura la visita, así como los tipos de cambio mostrados.",
        ],
      },
      {
        titre: "Para qué",
        blocs: [
          [
            "llamarle y responder a su solicitud;",
            "enviarle, en su idioma, una breve serie de correos sobre el complejo y el avance del proyecto;",
            "seguir su proyecto de compra y preparar, si lo desea, la reserva de un lote;",
            "saber qué anuncios nos traen solicitudes.",
          ],
          "Estos tratamientos se basan en su consentimiento, dado al enviar el formulario, y en las gestiones que nos pide antes de una posible compra. Cada correo incluye un enlace para darse de baja.",
        ],
      },
      {
        titre: "Quién tiene acceso",
        blocs: [
          "El equipo comercial de CITYSTAR y los proveedores de nuestras herramientas, únicamente para este servicio:",
          [
            "HubSpot, para gestionar solicitudes y contactos;",
            "Brevo, para enviar los correos;",
            "Cloudflare, para alojar el sitio y transmitir las solicitudes;",
            "Google Workspace, para nuestro correo;",
            "Supabase, para el área de propietarios.",
          ],
          "Si responde a un formulario publicitario, la plataforma correspondiente (Meta, Google, LinkedIn o Snapchat) también trata sus respuestas según su propia política. No vendemos ni alquilamos sus datos.",
          "Algunos de estos proveedores conservan los datos fuera de Marruecos, en la Unión Europea o en Estados Unidos.",
        ],
      },
      {
        titre: "Cuánto tiempo",
        blocs: [
          "Los datos de una solicitud se conservan tres años después de nuestro último intercambio y después se borran. Los de un comprador, durante la venta y las obligaciones legales posteriores.",
        ],
      },
      {
        titre: "Sus derechos",
        blocs: [
          `Puede en todo momento consultar sus datos, pedir que se corrijan o se borren y oponerse a su uso, escribiendo a ${email}. Respondemos en el plazo de un mes.`,
          "Estos derechos le garantizan la ley marroquí n.º 09-08 y, si reside en la Unión Europea, el RGPD. También puede presentar una reclamación ante la CNDP (cndp.ma) o ante la autoridad de protección de datos de su país.",
        ],
      },
    ],
  },
  it: {
    titre: "Informativa sulla privacy — CITYSTAR Marrakech",
    description:
      "I dati che CITYSTAR raccoglie quando chiede di essere richiamato, che cosa ne fa, per quanto tempo li conserva e come esercitare i suoi diritti.",
    kicker: "Privacy",
    titreH1: ["I suoi dati,", "e che cosa ne facciamo"],
    intro:
      "Che cosa raccogliamo quando ci scrive o compila un modulo, perché, e come consultarlo, correggerlo o farlo cancellare.",
    lien: "Privacy",
    miseAJour: "Aggiornata il 3 novembre 2026.",
    sections: [
      {
        titre: "Chi tratta i suoi dati",
        blocs: [
          `CITYSTAR, ${adresse}, Marocco. Per qualsiasi domanda sui suoi dati: ${email} o ${telephoneAffiche}.`,
        ],
      },
      {
        titre: "Che cosa raccogliamo",
        blocs: [
          "Quando chiede di essere richiamato su questo sito, o risponde a uno dei nostri moduli pubblicitari (Facebook, Instagram, Google, LinkedIn, Snapchat):",
          [
            "il suo nome, il suo indirizzo e-mail e il suo numero di telefono;",
            "le sue risposte facoltative: villa di interesse, tipo di progetto, tempi di acquisto, budget, finanziamento, messaggio;",
            "la lingua della pagina e quella del suo dispositivo, per scriverle nella sua lingua;",
            "la provenienza della visita (annuncio o link seguito), la pagina di invio e il suo indirizzo IP.",
          ],
          "Se diventa proprietario, l'area proprietari usa il suo indirizzo e-mail per inviarle un link di accesso e mostra le informazioni della sua pratica di acquisto.",
          "Il sito non installa cookie pubblicitari e non usa alcuno strumento di misurazione del pubblico. Conserva soltanto, nel suo browser, la provenienza della visita e la lingua scelta per la durata della visita, oltre ai tassi di cambio visualizzati.",
        ],
      },
      {
        titre: "Perché",
        blocs: [
          [
            "richiamarla e rispondere alla sua richiesta;",
            "inviarle, nella sua lingua, una breve serie di e-mail sulla tenuta e sull'avanzamento del progetto;",
            "seguire il suo progetto di acquisto e preparare, se lo desidera, la prenotazione di un lotto;",
            "sapere quali annunci ci portano richieste.",
          ],
          "Questi trattamenti si basano sul suo consenso, espresso inviando il modulo, e sulle attività che ci chiede prima di un eventuale acquisto. Ogni e-mail contiene un link per annullare l'iscrizione.",
        ],
      },
      {
        titre: "Chi vi ha accesso",
        blocs: [
          "Il team commerciale di CITYSTAR e i fornitori dei nostri strumenti, esclusivamente per questo servizio:",
          [
            "HubSpot, per la gestione delle richieste e dei contatti;",
            "Brevo, per l'invio delle e-mail;",
            "Cloudflare, per l'hosting del sito e la trasmissione delle richieste;",
            "Google Workspace, per la nostra posta;",
            "Supabase, per l'area proprietari.",
          ],
          "Se risponde a un modulo pubblicitario, la piattaforma interessata (Meta, Google, LinkedIn o Snapchat) tratta anche le sue risposte secondo la propria informativa. Non vendiamo né affittiamo i suoi dati.",
          "Alcuni di questi fornitori conservano i dati fuori dal Marocco, nell'Unione europea o negli Stati Uniti.",
        ],
      },
      {
        titre: "Per quanto tempo",
        blocs: [
          "I dati di una richiesta sono conservati tre anni dopo il nostro ultimo scambio, poi cancellati. Quelli di un acquirente, per la durata della vendita e degli obblighi di legge che ne derivano.",
        ],
      },
      {
        titre: "I suoi diritti",
        blocs: [
          `Può in qualsiasi momento consultare i suoi dati, farli correggere o cancellare e opporsi al loro utilizzo, scrivendo a ${email}. Rispondiamo entro un mese.`,
          "Questi diritti le sono garantiti dalla legge marocchina n. 09-08 e, se risiede nell'Unione europea, dal GDPR. Può anche presentare reclamo alla CNDP (cndp.ma) o all'autorità per la protezione dei dati del suo paese.",
        ],
      },
    ],
  },
  nl: {
    titre: "Privacybeleid — CITYSTAR Marrakech",
    description:
      "Welke gegevens CITYSTAR verzamelt als u vraagt om teruggebeld te worden, wat ermee gebeurt, hoe lang ze bewaard worden en hoe u uw rechten uitoefent.",
    kicker: "Privacy",
    titreH1: ["Uw gegevens,", "en wat wij ermee doen"],
    intro:
      "Wat we verzamelen als u ons schrijft of een formulier invult, waarom, en hoe u het kunt inzien, laten corrigeren of laten verwijderen.",
    lien: "Privacy",
    miseAJour: "Bijgewerkt op 3 november 2026.",
    sections: [
      {
        titre: "Wie uw gegevens verwerkt",
        blocs: [
          `CITYSTAR, ${adresse}, Marokko. Voor vragen over uw gegevens: ${email} of ${telephoneAffiche}.`,
        ],
      },
      {
        titre: "Wat we verzamelen",
        blocs: [
          "Als u op deze website vraagt om teruggebeld te worden, of een van onze advertentieformulieren invult (Facebook, Instagram, Google, LinkedIn, Snapchat):",
          [
            "uw naam, e-mailadres en telefoonnummer;",
            "uw optionele antwoorden: villa van uw keuze, soort project, aankooptermijn, budget, financiering, bericht;",
            "de taal van de pagina en die van uw apparaat, om u in uw eigen taal te schrijven;",
            "de herkomst van uw bezoek (advertentie of gevolgde link), de pagina waarop u het formulier verstuurde en uw IP-adres.",
          ],
          "Wordt u eigenaar, dan gebruikt het eigenaarsportaal uw e-mailadres om u een inloglink te sturen, en toont het de gegevens van uw aankoopdossier.",
          "De website plaatst geen advertentiecookies en gebruikt geen tool voor bezoekersstatistieken. Hij bewaart in uw browser alleen de herkomst van het bezoek en de gekozen taal zolang het bezoek duurt, en de getoonde wisselkoersen.",
        ],
      },
      {
        titre: "Waarom",
        blocs: [
          [
            "om u terug te bellen en uw vraag te beantwoorden;",
            "om u in uw taal een korte reeks e-mails te sturen over het domein en de voortgang van het project;",
            "om uw aankoopplannen te volgen en, als u dat wenst, de reservering van een kavel voor te bereiden;",
            "om te weten welke advertenties ons aanvragen opleveren.",
          ],
          "Deze verwerking berust op uw toestemming, gegeven door het formulier te versturen, en op de stappen die u ons vraagt te zetten vóór een eventuele aankoop. Elke e-mail bevat een afmeldlink.",
        ],
      },
      {
        titre: "Wie er toegang toe heeft",
        blocs: [
          "Het verkoopteam van CITYSTAR en de leveranciers van onze tools, uitsluitend voor deze dienst:",
          [
            "HubSpot, voor het beheer van aanvragen en contacten;",
            "Brevo, voor het versturen van e-mails;",
            "Cloudflare, voor de hosting van de website en het doorsturen van aanvragen;",
            "Google Workspace, voor onze e-mail;",
            "Supabase, voor het eigenaarsportaal.",
          ],
          "Als u een advertentieformulier invult, verwerkt het betreffende platform (Meta, Google, LinkedIn of Snapchat) uw antwoorden ook volgens zijn eigen beleid. Wij verkopen of verhuren uw gegevens niet.",
          "Sommige van deze leveranciers bewaren gegevens buiten Marokko, in de Europese Unie of in de Verenigde Staten.",
        ],
      },
      {
        titre: "Hoe lang",
        blocs: [
          "Gegevens van een aanvraag worden drie jaar na ons laatste contact bewaard en daarna verwijderd. Die van een koper gedurende de verkoop en de wettelijke verplichtingen die daarop volgen.",
        ],
      },
      {
        titre: "Uw rechten",
        blocs: [
          `U kunt uw gegevens op elk moment inzien, laten corrigeren of verwijderen, en bezwaar maken tegen het gebruik ervan, door te schrijven naar ${email}. We antwoorden binnen een maand.`,
          "Deze rechten worden gewaarborgd door de Marokkaanse wet nr. 09-08 en, als u in de Europese Unie woont, door de AVG. U kunt ook een klacht indienen bij de CNDP (cndp.ma) of bij de gegevensbeschermingsautoriteit van uw land.",
        ],
      },
    ],
  },
  no: {
    titre: "Personvernerklæring — CITYSTAR Marrakech",
    description:
      "Hvilke opplysninger CITYSTAR samler inn når du ber om å bli ringt opp, hva de brukes til, hvor lenge de lagres og hvordan du bruker rettighetene dine.",
    kicker: "Personvern",
    titreH1: ["Dine opplysninger,", "og hva vi gjør med dem"],
    intro:
      "Hva vi samler inn når du skriver til oss eller fyller ut et skjema, hvorfor, og hvordan du kan se, rette eller slette det.",
    lien: "Personvern",
    miseAJour: "Oppdatert 3. november 2026.",
    sections: [
      {
        titre: "Hvem som behandler opplysningene dine",
        blocs: [
          `CITYSTAR, ${adresse}, Marokko. Spørsmål om opplysningene dine: ${email} eller ${telephoneAffiche}.`,
        ],
      },
      {
        titre: "Hva vi samler inn",
        blocs: [
          "Når du ber om å bli ringt opp på dette nettstedet, eller svarer på et av annonseskjemaene våre (Facebook, Instagram, Google, LinkedIn, Snapchat):",
          [
            "navnet ditt, e-postadressen og telefonnummeret ditt;",
            "de frivillige svarene dine: villa du er interessert i, type prosjekt, tidsramme for kjøp, budsjett, finansiering, melding;",
            "språket på siden og på enheten din, slik at vi kan skrive til deg på ditt språk;",
            "hvor besøket kom fra (annonse eller lenke du fulgte), siden du sendte skjemaet fra og IP-adressen din.",
          ],
          "Blir du eier, bruker eierportalen e-postadressen din til å sende deg en innloggingslenke, og viser opplysningene i kjøpsdokumentene dine.",
          "Nettstedet setter ingen reklamecookies og bruker ingen verktøy for besøksstatistikk. Det lagrer bare i nettleseren din hvor besøket kom fra og språket du valgte så lenge besøket varer, samt valutakursene som vises.",
        ],
      },
      {
        titre: "Hvorfor",
        blocs: [
          [
            "for å ringe deg opp og svare på henvendelsen din;",
            "for å sende deg, på ditt språk, en kort serie e-poster om eiendommen og fremdriften i prosjektet;",
            "for å følge kjøpsplanene dine og, hvis du ønsker det, forberede reservasjon av en tomt;",
            "for å vite hvilke annonser som gir oss henvendelser.",
          ],
          "Behandlingen bygger på samtykket ditt, gitt ved at du sender skjemaet, og på tiltakene du ber oss om før et eventuelt kjøp. Hver e-post inneholder en lenke for å melde seg av.",
        ],
      },
      {
        titre: "Hvem som har tilgang",
        blocs: [
          "Salgsteamet til CITYSTAR og leverandørene av verktøyene våre, kun for denne tjenesten:",
          [
            "HubSpot, for håndtering av henvendelser og kontakter;",
            "Brevo, for utsending av e-post;",
            "Cloudflare, for drift av nettstedet og videresending av henvendelser;",
            "Google Workspace, for e-posten vår;",
            "Supabase, for eierportalen.",
          ],
          "Hvis du svarer på et annonseskjema, behandler også den aktuelle plattformen (Meta, Google, LinkedIn eller Snapchat) svarene dine etter sine egne retningslinjer. Vi selger eller leier ikke ut opplysningene dine.",
          "Noen av disse leverandørene lagrer opplysninger utenfor Marokko, i EU eller i USA.",
        ],
      },
      {
        titre: "Hvor lenge",
        blocs: [
          "Opplysninger fra en henvendelse lagres i tre år etter siste kontakt og slettes deretter. En kjøpers opplysninger lagres så lenge salget og de påfølgende lovpålagte forpliktelsene varer.",
        ],
      },
      {
        titre: "Dine rettigheter",
        blocs: [
          `Du kan når som helst se opplysningene dine, få dem rettet eller slettet, og protestere mot bruken av dem, ved å skrive til ${email}. Vi svarer innen én måned.`,
          "Disse rettighetene er sikret av marokkansk lov nr. 09-08 og, hvis du bor i EU/EØS, av personvernforordningen (GDPR). Du kan også klage til CNDP (cndp.ma) eller til datatilsynet i landet ditt.",
        ],
      },
    ],
  },
};
