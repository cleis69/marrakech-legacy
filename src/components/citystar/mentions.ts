/**
 * Mentions légales, dans les six langues. Meta et Google les demandent pour diffuser des
 * annonces. Identité de la société : extrait du registre du commerce et bulletin
 * d'identification fiscale (Drive CITYSTAR > Administratif).
 */
import { contact, type Langue } from "@/config/citystar";

import type { TexteConfidentialite } from "./confidentialite";

const { email, telephoneAffiche } = contact;

const societe = "Central Property Investment SARL AU";
const siege =
  "Av. Abdelkrim El Khattabi, Résidence Jawad 109, 3e étage, appt 43, Guéliz, 40000 Marrakech, Maroc";
const rc = "150941";
const ice = "003513455000096";
const identifiantFiscal = "65993464";
const taxeProfessionnelle = "45113692";
const gerant = "Bashar Mohammed Zabin";
const hebergeur = "Cloudflare, Inc., 101 Townsend Street, San Francisco, CA 94107, États-Unis (cloudflare.com)";

export const mentions: Record<Langue, TexteConfidentialite> = {
  fr: {
    titre: "Mentions légales — CITYSTAR Marrakech",
    description:
      "Éditeur du site CITYSTAR, société, registre du commerce, ICE, hébergeur, propriété intellectuelle et droit applicable.",
    kicker: "Mentions légales",
    titreH1: ["Mentions", "légales"],
    intro: "Qui édite ce site, qui l'héberge, et ce qui encadre son contenu.",
    lien: "Mentions légales",
    miseAJour: "Mise à jour le 3 novembre 2026.",
    sections: [
      {
        titre: "Éditeur du site",
        blocs: [
          `Ce site est édité par ${societe}, société à responsabilité limitée à associé unique au capital de 100 000 dirhams, qui porte le programme CITYSTAR.`,
          [
            `Siège social : ${siege}`,
            `Registre du commerce : Marrakech ${rc}`,
            `ICE : ${ice}`,
            `Identifiant fiscal : ${identifiantFiscal}`,
            `Taxe professionnelle : ${taxeProfessionnelle}`,
            `Téléphone : ${telephoneAffiche}`,
            `E-mail : ${email}`,
          ],
        ],
      },
      {
        titre: "Directeur de la publication",
        blocs: [`${gerant}, gérant.`],
      },
      {
        titre: "Hébergement",
        blocs: [hebergeur],
      },
      {
        titre: "Conception et réalisation",
        blocs: ["Ultravision (ultravisionagency.com)."],
      },
      {
        titre: "Informations sur le programme",
        blocs: [
          "Les vues 3D, photos et plans présentés sont des images d'illustration, non contractuelles. Les surfaces, prestations, prix et dates sont donnés à titre indicatif et peuvent évoluer. Seuls les actes signés chez le notaire engagent la société.",
          "Les simulateurs donnent des estimations indicatives. Ils ne constituent ni une offre de crédit, ni un conseil financier ou fiscal.",
        ],
      },
      {
        titre: "Propriété intellectuelle",
        blocs: [
          "Les textes, images, vidéos, plans et logos de ce site appartiennent à la société ou à leurs auteurs. Toute reproduction, même partielle, sans autorisation écrite est interdite.",
        ],
      },
      {
        titre: "Données personnelles",
        blocs: [
          "Les données recueillies sur ce site sont traitées conformément à la loi n° 09-08. Le détail figure dans notre politique de confidentialité, accessible en pied de page.",
        ],
      },
      {
        titre: "Droit applicable",
        blocs: [
          "Ce site est soumis au droit marocain. Tout litige relève des tribunaux compétents de Marrakech.",
        ],
      },
    ],
  },
  en: {
    titre: "Legal notice — CITYSTAR Marrakech",
    description:
      "Publisher of the CITYSTAR website, company details, trade register, ICE, host, intellectual property and governing law.",
    kicker: "Legal notice",
    titreH1: ["Legal", "notice"],
    intro: "Who publishes this website, who hosts it, and the rules that apply to its content.",
    lien: "Legal notice",
    miseAJour: "Updated on 3 November 2026.",
    sections: [
      {
        titre: "Publisher",
        blocs: [
          `This website is published by ${societe}, a Moroccan single-member limited liability company with a share capital of 100,000 dirhams, the company behind the CITYSTAR development.`,
          [
            `Registered office: ${siege}`,
            `Trade register: Marrakech ${rc}`,
            `ICE: ${ice}`,
            `Tax identification number: ${identifiantFiscal}`,
            `Business tax number: ${taxeProfessionnelle}`,
            `Phone: ${telephoneAffiche}`,
            `Email: ${email}`,
          ],
        ],
      },
      {
        titre: "Publication director",
        blocs: [`${gerant}, managing director.`],
      },
      {
        titre: "Hosting",
        blocs: ["Cloudflare, Inc., 101 Townsend Street, San Francisco, CA 94107, United States (cloudflare.com)"],
      },
      {
        titre: "Design and development",
        blocs: ["Ultravision (ultravisionagency.com)."],
      },
      {
        titre: "About the development",
        blocs: [
          "The 3D views, photos and plans shown are illustrations and are not contractually binding. Floor areas, specifications, prices and dates are given as a guide and may change. Only the deeds signed before the notary bind the company.",
          "The simulators give indicative estimates. They are neither a loan offer nor financial or tax advice.",
        ],
      },
      {
        titre: "Intellectual property",
        blocs: [
          "The texts, images, videos, plans and logos on this website belong to the company or to their authors. Any reproduction, even partial, without written permission is prohibited.",
        ],
      },
      {
        titre: "Personal data",
        blocs: [
          "Data collected on this website is processed in accordance with Moroccan law no. 09-08. Details are in our privacy policy, linked in the footer.",
        ],
      },
      {
        titre: "Governing law",
        blocs: [
          "This website is governed by Moroccan law. Any dispute falls under the jurisdiction of the competent courts of Marrakech.",
        ],
      },
    ],
  },
  es: {
    titre: "Aviso legal — CITYSTAR Marrakech",
    description:
      "Editor del sitio CITYSTAR, sociedad, registro mercantil, ICE, alojamiento, propiedad intelectual y ley aplicable.",
    kicker: "Aviso legal",
    titreH1: ["Aviso", "legal"],
    intro: "Quién edita este sitio, quién lo aloja y qué rige su contenido.",
    lien: "Aviso legal",
    miseAJour: "Actualizado el 3 de noviembre de 2026.",
    sections: [
      {
        titre: "Editor del sitio",
        blocs: [
          `Este sitio lo edita ${societe}, sociedad marroquí de responsabilidad limitada unipersonal con un capital de 100 000 dírhams, promotora del proyecto CITYSTAR.`,
          [
            `Domicilio social: ${siege}`,
            `Registro mercantil: Marrakech ${rc}`,
            `ICE: ${ice}`,
            `Identificación fiscal: ${identifiantFiscal}`,
            `Impuesto profesional: ${taxeProfessionnelle}`,
            `Teléfono: ${telephoneAffiche}`,
            `Correo electrónico: ${email}`,
          ],
        ],
      },
      {
        titre: "Director de la publicación",
        blocs: [`${gerant}, gerente.`],
      },
      {
        titre: "Alojamiento",
        blocs: ["Cloudflare, Inc., 101 Townsend Street, San Francisco, CA 94107, Estados Unidos (cloudflare.com)"],
      },
      {
        titre: "Diseño y desarrollo",
        blocs: ["Ultravision (ultravisionagency.com)."],
      },
      {
        titre: "Sobre el proyecto",
        blocs: [
          "Las vistas 3D, fotos y planos son imágenes ilustrativas, sin valor contractual. Las superficies, calidades, precios y fechas son orientativos y pueden cambiar. Solo las escrituras firmadas ante notario comprometen a la sociedad.",
          "Los simuladores ofrecen estimaciones orientativas. No constituyen una oferta de crédito ni un asesoramiento financiero o fiscal.",
        ],
      },
      {
        titre: "Propiedad intelectual",
        blocs: [
          "Los textos, imágenes, vídeos, planos y logotipos de este sitio pertenecen a la sociedad o a sus autores. Queda prohibida su reproducción, incluso parcial, sin autorización escrita.",
        ],
      },
      {
        titre: "Datos personales",
        blocs: [
          "Los datos recogidos en este sitio se tratan conforme a la ley marroquí n.º 09-08. Los detalles figuran en nuestra política de privacidad, enlazada en el pie de página.",
        ],
      },
      {
        titre: "Ley aplicable",
        blocs: [
          "Este sitio se rige por la ley marroquí. Cualquier litigio corresponde a los tribunales competentes de Marrakech.",
        ],
      },
    ],
  },
  it: {
    titre: "Note legali — CITYSTAR Marrakech",
    description:
      "Editore del sito CITYSTAR, società, registro delle imprese, ICE, hosting, proprietà intellettuale e legge applicabile.",
    kicker: "Note legali",
    titreH1: ["Note", "legali"],
    intro: "Chi pubblica questo sito, chi lo ospita e le regole che si applicano ai suoi contenuti.",
    lien: "Note legali",
    miseAJour: "Aggiornato il 3 novembre 2026.",
    sections: [
      {
        titre: "Editore del sito",
        blocs: [
          `Questo sito è pubblicato da ${societe}, società marocchina a responsabilità limitata con socio unico e capitale sociale di 100.000 dirham, promotrice del progetto CITYSTAR.`,
          [
            `Sede legale: ${siege}`,
            `Registro delle imprese: Marrakech ${rc}`,
            `ICE: ${ice}`,
            `Codice fiscale: ${identifiantFiscal}`,
            `Imposta professionale: ${taxeProfessionnelle}`,
            `Telefono: ${telephoneAffiche}`,
            `E-mail: ${email}`,
          ],
        ],
      },
      {
        titre: "Direttore della pubblicazione",
        blocs: [`${gerant}, amministratore.`],
      },
      {
        titre: "Hosting",
        blocs: ["Cloudflare, Inc., 101 Townsend Street, San Francisco, CA 94107, Stati Uniti (cloudflare.com)"],
      },
      {
        titre: "Progettazione e sviluppo",
        blocs: ["Ultravision (ultravisionagency.com)."],
      },
      {
        titre: "Sul progetto",
        blocs: [
          "Le viste 3D, le foto e le planimetrie sono immagini illustrative, senza valore contrattuale. Superfici, finiture, prezzi e date sono indicativi e possono cambiare. Solo gli atti firmati davanti al notaio impegnano la società.",
          "I simulatori forniscono stime indicative. Non costituiscono un'offerta di credito né una consulenza finanziaria o fiscale.",
        ],
      },
      {
        titre: "Proprietà intellettuale",
        blocs: [
          "Testi, immagini, video, planimetrie e loghi di questo sito appartengono alla società o ai rispettivi autori. Ne è vietata la riproduzione, anche parziale, senza autorizzazione scritta.",
        ],
      },
      {
        titre: "Dati personali",
        blocs: [
          "I dati raccolti su questo sito sono trattati secondo la legge marocchina n. 09-08. I dettagli sono nella nostra informativa sulla privacy, collegata a piè di pagina.",
        ],
      },
      {
        titre: "Legge applicabile",
        blocs: [
          "Questo sito è regolato dalla legge marocchina. Qualsiasi controversia è di competenza dei tribunali di Marrakech.",
        ],
      },
    ],
  },
  nl: {
    titre: "Juridische informatie — CITYSTAR Marrakech",
    description:
      "Uitgever van de CITYSTAR-website, bedrijfsgegevens, handelsregister, ICE, hosting, intellectueel eigendom en toepasselijk recht.",
    kicker: "Juridische informatie",
    titreH1: ["Juridische", "informatie"],
    intro: "Wie deze website uitgeeft, wie haar host en welke regels voor de inhoud gelden.",
    lien: "Juridische informatie",
    miseAJour: "Bijgewerkt op 3 november 2026.",
    sections: [
      {
        titre: "Uitgever",
        blocs: [
          `Deze website wordt uitgegeven door ${societe}, een Marokkaanse eenpersoons-bv met een maatschappelijk kapitaal van 100.000 dirham, ontwikkelaar van het CITYSTAR-project.`,
          [
            `Statutaire zetel: ${siege}`,
            `Handelsregister: Marrakech ${rc}`,
            `ICE: ${ice}`,
            `Fiscaal nummer: ${identifiantFiscal}`,
            `Beroepsbelasting: ${taxeProfessionnelle}`,
            `Telefoon: ${telephoneAffiche}`,
            `E-mail: ${email}`,
          ],
        ],
      },
      {
        titre: "Verantwoordelijke uitgever",
        blocs: [`${gerant}, bestuurder.`],
      },
      {
        titre: "Hosting",
        blocs: ["Cloudflare, Inc., 101 Townsend Street, San Francisco, CA 94107, Verenigde Staten (cloudflare.com)"],
      },
      {
        titre: "Ontwerp en ontwikkeling",
        blocs: ["Ultravision (ultravisionagency.com)."],
      },
      {
        titre: "Over het project",
        blocs: [
          "De 3D-beelden, foto's en plattegronden zijn illustraties en niet contractueel bindend. Oppervlaktes, afwerking, prijzen en data zijn indicatief en kunnen wijzigen. Alleen de bij de notaris ondertekende aktes binden de onderneming.",
          "De simulatoren geven indicatieve schattingen. Ze vormen geen kredietaanbod en geen financieel of fiscaal advies.",
        ],
      },
      {
        titre: "Intellectueel eigendom",
        blocs: [
          "De teksten, beelden, video's, plattegronden en logo's op deze website zijn eigendom van de onderneming of van hun makers. Elke reproductie, ook gedeeltelijk, zonder schriftelijke toestemming is verboden.",
        ],
      },
      {
        titre: "Persoonsgegevens",
        blocs: [
          "Gegevens die op deze website worden verzameld, worden verwerkt volgens de Marokkaanse wet nr. 09-08. Meer informatie staat in ons privacybeleid, gelinkt in de voettekst.",
        ],
      },
      {
        titre: "Toepasselijk recht",
        blocs: [
          "Op deze website is het Marokkaanse recht van toepassing. Geschillen vallen onder de bevoegde rechtbanken van Marrakech.",
        ],
      },
    ],
  },
  no: {
    titre: "Juridisk informasjon — CITYSTAR Marrakech",
    description:
      "Utgiver av CITYSTAR-nettstedet, selskapsopplysninger, handelsregister, ICE, vertskap, immaterielle rettigheter og gjeldende lov.",
    kicker: "Juridisk informasjon",
    titreH1: ["Juridisk", "informasjon"],
    intro: "Hvem som utgir dette nettstedet, hvem som drifter det, og hvilke regler som gjelder for innholdet.",
    lien: "Juridisk informasjon",
    miseAJour: "Oppdatert 3. november 2026.",
    sections: [
      {
        titre: "Utgiver",
        blocs: [
          `Dette nettstedet utgis av ${societe}, et marokkansk enkeltmannsaksjeselskap med en aksjekapital på 100 000 dirham, utbygger av CITYSTAR-prosjektet.`,
          [
            `Forretningsadresse: ${siege}`,
            `Handelsregister: Marrakech ${rc}`,
            `ICE: ${ice}`,
            `Skattenummer: ${identifiantFiscal}`,
            `Næringsskatt: ${taxeProfessionnelle}`,
            `Telefon: ${telephoneAffiche}`,
            `E-post: ${email}`,
          ],
        ],
      },
      {
        titre: "Ansvarlig redaktør",
        blocs: [`${gerant}, daglig leder.`],
      },
      {
        titre: "Vertskap",
        blocs: ["Cloudflare, Inc., 101 Townsend Street, San Francisco, CA 94107, USA (cloudflare.com)"],
      },
      {
        titre: "Design og utvikling",
        blocs: ["Ultravision (ultravisionagency.com)."],
      },
      {
        titre: "Om prosjektet",
        blocs: [
          "3D-bildene, fotoene og plantegningene er illustrasjoner og ikke bindende. Arealer, standard, priser og datoer er veiledende og kan endres. Bare skjøter signert hos notarius forplikter selskapet.",
          "Kalkulatorene gir veiledende anslag. De er verken et lånetilbud eller finansiell eller skattemessig rådgivning.",
        ],
      },
      {
        titre: "Immaterielle rettigheter",
        blocs: [
          "Tekster, bilder, videoer, plantegninger og logoer på dette nettstedet tilhører selskapet eller opphavspersonene. All gjengivelse, også delvis, uten skriftlig tillatelse er forbudt.",
        ],
      },
      {
        titre: "Personopplysninger",
        blocs: [
          "Opplysninger som samles inn på dette nettstedet, behandles i samsvar med marokkansk lov nr. 09-08. Detaljene står i personvernerklæringen vår, lenket i bunnteksten.",
        ],
      },
      {
        titre: "Gjeldende lov",
        blocs: [
          "Dette nettstedet er underlagt marokkansk lov. Eventuelle tvister hører inn under de kompetente domstolene i Marrakech.",
        ],
      },
    ],
  },
};
