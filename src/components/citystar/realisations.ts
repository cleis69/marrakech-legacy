/**
 * Réalisations du promoteur et de ses associés, avant CITYSTAR. Les textes viennent
 * des messages envoyés par l'équipe le 03/11/2026 (WhatsApp), traduits dans les six
 * langues du site. `aConfirmer` ne s'affiche qu'en développement.
 *
 * Photos : les originaux des sites officiels quand ils existent (Servatur, North Gate
 * House, ASCO Village), sinon celles reçues sur WhatsApp. La première de chaque
 * projet est la plus belle : elle sert de couverture et ouvre le bandeau de l'accueil.
 */
import type { Langue } from "@/config/citystar";

const modules = import.meta.glob("@/assets/citystar/realisations/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

/* Les deux premières photos de chaque projet, allégées pour le bandeau de l'accueil. */
const modulesPetits = import.meta.glob("@/assets/citystar/realisations-sm/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

/** Les photos d'un projet, dans l'ordre de leur numéro (« gjovik-01.webp »…). */
const photosDe = (projet: string, source = modules) =>
  Object.entries(source)
    .filter(([chemin]) => chemin.includes(`/${projet}-`))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, src]) => src);

/** Les photos légères d'un projet, pour le bandeau de l'accueil. */
export const photosBandeau = (projet: string) => photosDe(projet, modulesPetits);

export type Pays = "royaume-uni" | "norvege" | "espagne" | "irak";
type IdProjet = "gran-canaria" | "corker-bottoms" | "north-gate-house" | "gjovik" | "asco-village";

/** Ce qui se traduit d'un projet. */
type TexteProjet = {
  titre: string;
  lieu: string;
  statut: string;
  resume: string;
  chiffres: { valeur: string; libelle: string }[];
  details?: { titre: string; texte: string }[];
};

export type Realisation = TexteProjet & {
  id: IdProjet;
  pays: Pays;
  photos: string[];
  aConfirmer: string[];
};

/* Le premier projet est mis en avant : grande carte en tête de liste. */
const PROJETS: { id: IdProjet; pays: Pays; aConfirmer: string[] }[] = [
  {
    id: "gran-canaria",
    pays: "espagne",
    aConfirmer: [
      "Les photos sont celles des hôtels Servatur Puerto Azul et Waikiki (site servatur.com) : confirmer que ce sont les hôtels concernés, et les droits d'utilisation.",
      "Le texte reçu s'appuie sur un article de presse de 2023 : préciser le rôle de Bashar Zabin.",
    ],
  },
  {
    id: "corker-bottoms",
    pays: "royaume-uni",
    aConfirmer: [
      "Rôle du promoteur : le texte reçu dit « Developed by Sheffield Housing Company, not publicly linked to Bakhtyar Agha ».",
      "Pas de version plus grande sur le site de Sheffield Housing Company : demander les photos d'origine.",
    ],
  },
  {
    id: "north-gate-house",
    pays: "royaume-uni",
    aConfirmer: [
      "Rôle exact (propriétaire, promoteur, exploitant) et année d'ouverture.",
      "Photos d'origine du site de réservation de l'hôtel, en 1 448 px : vérifier les droits.",
    ],
  },
  {
    id: "gjovik",
    pays: "norvege",
    aConfirmer: [
      "Projets de Bashar Zabin : préciser son rôle auprès de CITYSTAR, et les années.",
      "La photo du n° 2 vient d'une annonce ; celle du n° 10 montre l'immeuble, pas forcément les parties rénovées.",
    ],
  },
  {
    id: "asco-village",
    pays: "irak",
    aConfirmer: [
      "Rôle du promoteur dans ce projet d'Aree Group.",
      "Les images sont les rendus 3D du site ascovillage.com : dire « rendus » sur la page, ou obtenir des photos du chantier.",
    ],
  },
];

const TEXTES_PROJETS: Record<Langue, Record<IdProjet, TexteProjet>> = {
  fr: {
    "gran-canaria": {
      titre: "Hôtels à Gran Canaria",
      lieu: "Puerto Rico et Playa del Inglés, Gran Canaria · Espagne",
      statut: "Partenariat hôtelier",
      resume:
        "Développements immobiliers et hôteliers aux îles Canaries, aux côtés d'un investisseur du groupe hôtelier Servatur : resorts face à l'océan, piscines et appartements.",
      chiffres: [],
    },
    "corker-bottoms": {
      titre: "Corker Bottoms",
      lieu: "Manor, Sheffield · Royaume-Uni",
      statut: "Livré en 2025",
      resume: "Quarante-sept maisons neuves, de deux à quatre chambres, près de Harborough Road.",
      chiffres: [
        { valeur: "47", libelle: "maisons neuves" },
        { valeur: "2 à 4", libelle: "chambres" },
      ],
    },
    "north-gate-house": {
      titre: "North Gate House",
      lieu: "Centre de Sheffield · Royaume-Uni",
      statut: "Récemment ouvert",
      resume:
        "Appartements meublés dans un immeuble en brique du centre, à 1,2 km de la gare de Sheffield.",
      chiffres: [{ valeur: "1,2 km", libelle: "de la gare" }],
    },
    gjovik: {
      titre: "Quatre immeubles à Gjøvik",
      lieu: "Gjøvik · Norvège",
      statut: "Réhabilitation",
      resume:
        "Restaurations et transformations d'immeubles du centre-ville, du bâtiment historique aux étages de commerce devenus logements.",
      chiffres: [
        { valeur: "4", libelle: "immeubles" },
        { valeur: "20", libelle: "appartements à Sandsgården" },
      ],
      details: [
        {
          titre: "Sandsgården",
          texte:
            "Restauration d'un bâtiment historique : 20 appartements et des commerces. Prix du patrimoine.",
        },
        {
          titre: "Bjørnsons gate 10",
          texte: "Réhabilitation et transformation d'un immeuble d'habitation.",
        },
        {
          titre: "Bjørnsons gate 6",
          texte:
            "Étages de commerce transformés en quatre logements : isolation, fenêtres, sécurité.",
        },
        {
          titre: "Bjørnsons gate 2",
          texte: "Commerces transformés en onze appartements, avec six balcons prévus.",
        },
      ],
    },
    "asco-village": {
      titre: "ASCO Village",
      lieu: "Pirmam Road, Erbil · Irak",
      statut: "Résidentiel",
      resume:
        "Cent soixante-quinze villas en trois types, avec leurs jardins et leurs infrastructures. Un projet d'Aree Group.",
      chiffres: [
        { valeur: "175", libelle: "villas" },
        { valeur: "3", libelle: "types de villas" },
      ],
    },
  },
  en: {
    "gran-canaria": {
      titre: "Hotels in Gran Canaria",
      lieu: "Puerto Rico and Playa del Inglés, Gran Canaria · Spain",
      statut: "Hotel partnership",
      resume:
        "Property and hotel developments in the Canary Islands, alongside an investor from the Servatur hotel group: ocean-facing resorts, pools and apartments.",
      chiffres: [],
    },
    "corker-bottoms": {
      titre: "Corker Bottoms",
      lieu: "Manor, Sheffield · United Kingdom",
      statut: "Completed in 2025",
      resume: "Forty-seven new homes, with two to four bedrooms, near Harborough Road.",
      chiffres: [
        { valeur: "47", libelle: "new homes" },
        { valeur: "2 to 4", libelle: "bedrooms" },
      ],
    },
    "north-gate-house": {
      titre: "North Gate House",
      lieu: "Sheffield city centre · United Kingdom",
      statut: "Recently opened",
      resume:
        "Furnished apartments in a brick building in the city centre, 1.2 km from Sheffield station.",
      chiffres: [{ valeur: "1.2 km", libelle: "from the station" }],
    },
    gjovik: {
      titre: "Four buildings in Gjøvik",
      lieu: "Gjøvik · Norway",
      statut: "Renovation",
      resume:
        "Restoration and conversion of town-centre buildings, from a historic building to retail floors turned into homes.",
      chiffres: [
        { valeur: "4", libelle: "buildings" },
        { valeur: "20", libelle: "apartments at Sandsgården" },
      ],
      details: [
        {
          titre: "Sandsgården",
          texte: "Restoration of a historic building: 20 apartments and shops. Heritage award.",
        },
        {
          titre: "Bjørnsons gate 10",
          texte: "Renovation and conversion of a residential building.",
        },
        {
          titre: "Bjørnsons gate 6",
          texte: "Retail floors converted into four homes: insulation, windows, safety.",
        },
        {
          titre: "Bjørnsons gate 2",
          texte: "Shops converted into eleven apartments, with six balconies planned.",
        },
      ],
    },
    "asco-village": {
      titre: "ASCO Village",
      lieu: "Pirmam Road, Erbil · Iraq",
      statut: "Residential",
      resume:
        "One hundred and seventy-five villas in three types, with their gardens and infrastructure. An Aree Group project.",
      chiffres: [
        { valeur: "175", libelle: "villas" },
        { valeur: "3", libelle: "villa types" },
      ],
    },
  },
  es: {
    "gran-canaria": {
      titre: "Hoteles en Gran Canaria",
      lieu: "Puerto Rico y Playa del Inglés, Gran Canaria · España",
      statut: "Colaboración hotelera",
      resume:
        "Desarrollos inmobiliarios y hoteleros en las islas Canarias, junto a un inversor del grupo hotelero Servatur: resorts frente al océano, piscinas y apartamentos.",
      chiffres: [],
    },
    "corker-bottoms": {
      titre: "Corker Bottoms",
      lieu: "Manor, Sheffield · Reino Unido",
      statut: "Entregado en 2025",
      resume:
        "Cuarenta y siete casas nuevas, de dos a cuatro dormitorios, cerca de Harborough Road.",
      chiffres: [
        { valeur: "47", libelle: "casas nuevas" },
        { valeur: "2 a 4", libelle: "dormitorios" },
      ],
    },
    "north-gate-house": {
      titre: "North Gate House",
      lieu: "Centro de Sheffield · Reino Unido",
      statut: "Abierto recientemente",
      resume:
        "Apartamentos amueblados en un edificio de ladrillo del centro, a 1,2 km de la estación de Sheffield.",
      chiffres: [{ valeur: "1,2 km", libelle: "de la estación" }],
    },
    gjovik: {
      titre: "Cuatro edificios en Gjøvik",
      lieu: "Gjøvik · Noruega",
      statut: "Rehabilitación",
      resume:
        "Restauración y transformación de edificios del centro, desde un edificio histórico hasta plantas comerciales convertidas en viviendas.",
      chiffres: [
        { valeur: "4", libelle: "edificios" },
        { valeur: "20", libelle: "apartamentos en Sandsgården" },
      ],
      details: [
        {
          titre: "Sandsgården",
          texte:
            "Restauración de un edificio histórico: 20 apartamentos y locales comerciales. Premio de patrimonio.",
        },
        {
          titre: "Bjørnsons gate 10",
          texte: "Rehabilitación y transformación de un edificio de viviendas.",
        },
        {
          titre: "Bjørnsons gate 6",
          texte:
            "Plantas comerciales transformadas en cuatro viviendas: aislamiento, ventanas, seguridad.",
        },
        {
          titre: "Bjørnsons gate 2",
          texte:
            "Locales comerciales transformados en once apartamentos, con seis balcones previstos.",
        },
      ],
    },
    "asco-village": {
      titre: "ASCO Village",
      lieu: "Pirmam Road, Erbil · Irak",
      statut: "Residencial",
      resume:
        "Ciento setenta y cinco villas de tres tipos, con sus jardines y sus infraestructuras. Un proyecto de Aree Group.",
      chiffres: [
        { valeur: "175", libelle: "villas" },
        { valeur: "3", libelle: "tipos de villa" },
      ],
    },
  },
  it: {
    "gran-canaria": {
      titre: "Hotel a Gran Canaria",
      lieu: "Puerto Rico e Playa del Inglés, Gran Canaria · Spagna",
      statut: "Partnership alberghiera",
      resume:
        "Sviluppi immobiliari e alberghieri alle isole Canarie, al fianco di un investitore del gruppo alberghiero Servatur: resort sull’oceano, piscine e appartamenti.",
      chiffres: [],
    },
    "corker-bottoms": {
      titre: "Corker Bottoms",
      lieu: "Manor, Sheffield · Regno Unito",
      statut: "Consegnato nel 2025",
      resume: "Quarantasette case nuove, da due a quattro camere, vicino a Harborough Road.",
      chiffres: [
        { valeur: "47", libelle: "case nuove" },
        { valeur: "da 2 a 4", libelle: "camere" },
      ],
    },
    "north-gate-house": {
      titre: "North Gate House",
      lieu: "Centro di Sheffield · Regno Unito",
      statut: "Aperto di recente",
      resume:
        "Appartamenti arredati in un edificio in mattoni del centro, a 1,2 km dalla stazione di Sheffield.",
      chiffres: [{ valeur: "1,2 km", libelle: "dalla stazione" }],
    },
    gjovik: {
      titre: "Quattro edifici a Gjøvik",
      lieu: "Gjøvik · Norvegia",
      statut: "Riqualificazione",
      resume:
        "Restauri e trasformazioni di edifici del centro, dall’edificio storico ai piani commerciali diventati abitazioni.",
      chiffres: [
        { valeur: "4", libelle: "edifici" },
        { valeur: "20", libelle: "appartamenti a Sandsgården" },
      ],
      details: [
        {
          titre: "Sandsgården",
          texte:
            "Restauro di un edificio storico: 20 appartamenti e negozi. Premio per il patrimonio.",
        },
        {
          titre: "Bjørnsons gate 10",
          texte: "Riqualificazione e trasformazione di un edificio residenziale.",
        },
        {
          titre: "Bjørnsons gate 6",
          texte:
            "Piani commerciali trasformati in quattro abitazioni: isolamento, finestre, sicurezza.",
        },
        {
          titre: "Bjørnsons gate 2",
          texte: "Negozi trasformati in undici appartamenti, con sei balconi previsti.",
        },
      ],
    },
    "asco-village": {
      titre: "ASCO Village",
      lieu: "Pirmam Road, Erbil · Iraq",
      statut: "Residenziale",
      resume:
        "Centosettantacinque ville di tre tipi, con i loro giardini e le loro infrastrutture. Un progetto di Aree Group.",
      chiffres: [
        { valeur: "175", libelle: "ville" },
        { valeur: "3", libelle: "tipi di villa" },
      ],
    },
  },
  nl: {
    "gran-canaria": {
      titre: "Hotels op Gran Canaria",
      lieu: "Puerto Rico en Playa del Inglés, Gran Canaria · Spanje",
      statut: "Hotelpartnerschap",
      resume:
        "Vastgoed- en hotelontwikkelingen op de Canarische Eilanden, samen met een investeerder van de hotelgroep Servatur: resorts aan de oceaan, zwembaden en appartementen.",
      chiffres: [],
    },
    "corker-bottoms": {
      titre: "Corker Bottoms",
      lieu: "Manor, Sheffield · Verenigd Koninkrijk",
      statut: "Opgeleverd in 2025",
      resume:
        "Zevenenveertig nieuwe woningen, met twee tot vier slaapkamers, vlak bij Harborough Road.",
      chiffres: [
        { valeur: "47", libelle: "nieuwe woningen" },
        { valeur: "2 tot 4", libelle: "slaapkamers" },
      ],
    },
    "north-gate-house": {
      titre: "North Gate House",
      lieu: "Centrum van Sheffield · Verenigd Koninkrijk",
      statut: "Onlangs geopend",
      resume:
        "Gemeubileerde appartementen in een bakstenen gebouw in het centrum, op 1,2 km van het station van Sheffield.",
      chiffres: [{ valeur: "1,2 km", libelle: "van het station" }],
    },
    gjovik: {
      titre: "Vier gebouwen in Gjøvik",
      lieu: "Gjøvik · Noorwegen",
      statut: "Renovatie",
      resume:
        "Restauratie en verbouwing van gebouwen in het centrum, van een historisch pand tot winkelverdiepingen die woningen zijn geworden.",
      chiffres: [
        { valeur: "4", libelle: "gebouwen" },
        { valeur: "20", libelle: "appartementen in Sandsgården" },
      ],
      details: [
        {
          titre: "Sandsgården",
          texte: "Restauratie van een historisch pand: 20 appartementen en winkels. Erfgoedprijs.",
        },
        {
          titre: "Bjørnsons gate 10",
          texte: "Renovatie en verbouwing van een woongebouw.",
        },
        {
          titre: "Bjørnsons gate 6",
          texte: "Winkelverdiepingen omgebouwd tot vier woningen: isolatie, ramen, veiligheid.",
        },
        {
          titre: "Bjørnsons gate 2",
          texte: "Winkels omgebouwd tot elf appartementen, met zes geplande balkons.",
        },
      ],
    },
    "asco-village": {
      titre: "ASCO Village",
      lieu: "Pirmam Road, Erbil · Irak",
      statut: "Residentieel",
      resume:
        "Honderdvijfenzeventig villa’s in drie types, met hun tuinen en infrastructuur. Een project van Aree Group.",
      chiffres: [
        { valeur: "175", libelle: "villa’s" },
        { valeur: "3", libelle: "villatypes" },
      ],
    },
  },
  no: {
    "gran-canaria": {
      titre: "Hoteller på Gran Canaria",
      lieu: "Puerto Rico og Playa del Inglés, Gran Canaria · Spania",
      statut: "Hotellpartnerskap",
      resume:
        "Eiendoms- og hotellutvikling på Kanariøyene, sammen med en investor fra hotellkjeden Servatur: resorter ved havet, bassenger og leiligheter.",
      chiffres: [],
    },
    "corker-bottoms": {
      titre: "Corker Bottoms",
      lieu: "Manor, Sheffield · Storbritannia",
      statut: "Ferdigstilt i 2025",
      resume: "Førtisju nye boliger med to til fire soverom, nær Harborough Road.",
      chiffres: [
        { valeur: "47", libelle: "nye boliger" },
        { valeur: "2 til 4", libelle: "soverom" },
      ],
    },
    "north-gate-house": {
      titre: "North Gate House",
      lieu: "Sentrum av Sheffield · Storbritannia",
      statut: "Nylig åpnet",
      resume: "Møblerte leiligheter i en murbygning i sentrum, 1,2 km fra Sheffield stasjon.",
      chiffres: [{ valeur: "1,2 km", libelle: "fra stasjonen" }],
    },
    gjovik: {
      titre: "Fire bygårder i Gjøvik",
      lieu: "Gjøvik · Norge",
      statut: "Rehabilitering",
      resume:
        "Restaurering og ombygging av bygårder i sentrum, fra et historisk bygg til forretningsetasjer som er blitt boliger.",
      chiffres: [
        { valeur: "4", libelle: "bygårder" },
        { valeur: "20", libelle: "leiligheter i Sandsgården" },
      ],
      details: [
        {
          titre: "Sandsgården",
          texte:
            "Restaurering av et historisk bygg: 20 leiligheter og forretningslokaler. Kulturminnepris.",
        },
        {
          titre: "Bjørnsons gate 10",
          texte: "Rehabilitering og ombygging av en boligbygård.",
        },
        {
          titre: "Bjørnsons gate 6",
          texte: "Forretningsetasjer gjort om til fire boliger: isolasjon, vinduer, sikkerhet.",
        },
        {
          titre: "Bjørnsons gate 2",
          texte:
            "Forretningslokaler gjort om til elleve leiligheter, med seks planlagte balkonger.",
        },
      ],
    },
    "asco-village": {
      titre: "ASCO Village",
      lieu: "Pirmam Road, Erbil · Irak",
      statut: "Bolig",
      resume:
        "Hundre og syttifem villaer i tre typer, med hager og infrastruktur. Et prosjekt fra Aree Group.",
      chiffres: [
        { valeur: "175", libelle: "villaer" },
        { valeur: "3", libelle: "villatyper" },
      ],
    },
  },
};

/** Les projets dans une langue, dans l'ordre d'affichage. */
export const listeRealisations = (langue: Langue): Realisation[] =>
  PROJETS.map((p) => ({ ...p, ...TEXTES_PROJETS[langue][p.id], photos: photosDe(p.id) }));

/** Bannière de la page : la première photo du projet mis en avant. */
export const banniere = photosDe(PROJETS[0]?.id ?? "")[0] ?? "";

export const PAYS: Record<Langue, Record<Pays, string>> = {
  fr: { "royaume-uni": "Royaume-Uni", norvege: "Norvège", espagne: "Espagne", irak: "Irak" },
  en: { "royaume-uni": "United Kingdom", norvege: "Norway", espagne: "Spain", irak: "Iraq" },
  es: { "royaume-uni": "Reino Unido", norvege: "Noruega", espagne: "España", irak: "Irak" },
  it: { "royaume-uni": "Regno Unito", norvege: "Norvegia", espagne: "Spagna", irak: "Iraq" },
  nl: {
    "royaume-uni": "Verenigd Koninkrijk",
    norvege: "Noorwegen",
    espagne: "Spanje",
    irak: "Irak",
  },
  no: { "royaume-uni": "Storbritannia", norvege: "Norge", espagne: "Spania", irak: "Irak" },
};

export type TexteRealisations = {
  titre: string;
  description: string;
  kicker: string;
  titreH1: readonly string[];
  intro: string;
  apercu: string;
  chiffres: { valeur: string; libelle: string }[];
  tous: string;
  pays: string;
  photos: (n: number) => string;
  photo: (titre: string, i: number, n: number) => string;
  aConfirmer: string;
  suite: { titre: readonly string[]; texte: string; villas: string; dossier: string };
  lienAccueil: string;
  bandeau: { kicker: string; titre: readonly string[]; lien: string };
};

export const textesRealisations: Record<Langue, TexteRealisations> = {
  fr: {
    titre: "Réalisations du promoteur — CITYSTAR Marrakech",
    description:
      "Espagne, Royaume-Uni, Norvège, Irak : les projets menés par le promoteur de CITYSTAR et ses associés avant Marrakech.",
    kicker: "Réalisations",
    titreH1: ["Un promoteur", "qui a déjà fait ses preuves."],
    intro:
      "Des hôtels aux îles Canaries, des maisons à Sheffield, des immeubles réhabilités en Norvège : ce que le promoteur de CITYSTAR et ses associés ont déjà mené.",
    apercu:
      "Aperçu de travail : les rôles, les années et les droits des photos sont à confirmer par le promoteur avant la mise en ligne.",
    chiffres: [
      { valeur: "4", libelle: "pays" },
      { valeur: "47", libelle: "maisons livrées à Sheffield en 2025" },
      { valeur: "4", libelle: "immeubles réhabilités à Gjøvik" },
    ],
    tous: "Tous les projets",
    pays: "Pays",
    photos: (n) => `Voir les ${n} photos`,
    photo: (titre, i, n) => `${titre}, photo ${i} sur ${n}`,
    aConfirmer: "À confirmer",
    suite: {
      titre: ["Aujourd’hui,", "la Route de Fès."],
      texte:
        "Quatorze villas, chacune sur 2 000 m² de terrain avec piscine privée. Villa témoin à visiter d’ici fin janvier 2027, première villa livrée en août 2027.",
      villas: "Découvrir les villas",
      dossier: "Recevoir le dossier",
    },
    lienAccueil: "Voir ses réalisations",
    bandeau: {
      kicker: "Réalisations",
      titre: ["Un promoteur", "qui a déjà fait ses preuves."],
      lien: "Toutes les réalisations",
    },
  },
  en: {
    titre: "The developer’s track record — CITYSTAR Marrakech",
    description:
      "Spain, United Kingdom, Norway, Iraq: the projects carried out by the CITYSTAR developer and its partners before Marrakech.",
    kicker: "Track record",
    titreH1: ["A developer", "with a proven track record."],
    intro:
      "Hotels in the Canary Islands, homes in Sheffield, renovated buildings in Norway: what the CITYSTAR developer and its partners have already carried out.",
    apercu:
      "Working preview: roles, years and photo rights are to be confirmed by the developer before going live.",
    chiffres: [
      { valeur: "4", libelle: "countries" },
      { valeur: "47", libelle: "homes completed in Sheffield in 2025" },
      { valeur: "4", libelle: "buildings renovated in Gjøvik" },
    ],
    tous: "All projects",
    pays: "Countries",
    photos: (n) => `View the ${n} photos`,
    photo: (titre, i, n) => `${titre}, photo ${i} of ${n}`,
    aConfirmer: "To be confirmed",
    suite: {
      titre: ["Today,", "the Route de Fès."],
      texte:
        "Fourteen villas, each on a 2,000 m² plot with a private pool. Show villa open for viewings by the end of January 2027, first villa delivered in August 2027.",
      villas: "Discover the villas",
      dossier: "Receive the dossier",
    },
    lienAccueil: "See past projects",
    bandeau: {
      kicker: "Track record",
      titre: ["A developer", "with a proven track record."],
      lien: "All projects",
    },
  },
  es: {
    titre: "Realizaciones del promotor — CITYSTAR Marrakech",
    description:
      "España, Reino Unido, Noruega, Irak: los proyectos realizados por el promotor de CITYSTAR y sus socios antes de Marrakech.",
    kicker: "Realizaciones",
    titreH1: ["Un promotor", "con experiencia demostrada."],
    intro:
      "Hoteles en las islas Canarias, casas en Sheffield, edificios rehabilitados en Noruega: lo que el promotor de CITYSTAR y sus socios ya han realizado.",
    apercu:
      "Vista previa de trabajo: el promotor debe confirmar los roles, los años y los derechos de las fotos antes de la publicación.",
    chiffres: [
      { valeur: "4", libelle: "países" },
      { valeur: "47", libelle: "casas entregadas en Sheffield en 2025" },
      { valeur: "4", libelle: "edificios rehabilitados en Gjøvik" },
    ],
    tous: "Todos los proyectos",
    pays: "Países",
    photos: (n) => `Ver las ${n} fotos`,
    photo: (titre, i, n) => `${titre}, foto ${i} de ${n}`,
    aConfirmer: "Por confirmar",
    suite: {
      titre: ["Hoy,", "la Route de Fès."],
      texte:
        "Catorce villas, cada una en una parcela de 2.000 m² con piscina privada. Villa piloto visitable antes de finales de enero de 2027, primera villa entregada en agosto de 2027.",
      villas: "Descubrir las villas",
      dossier: "Recibir el dosier",
    },
    lienAccueil: "Ver sus realizaciones",
    bandeau: {
      kicker: "Realizaciones",
      titre: ["Un promotor", "con experiencia demostrada."],
      lien: "Todas las realizaciones",
    },
  },
  it: {
    titre: "Realizzazioni del promotore — CITYSTAR Marrakech",
    description:
      "Spagna, Regno Unito, Norvegia, Iraq: i progetti realizzati dal promotore di CITYSTAR e dai suoi soci prima di Marrakech.",
    kicker: "Realizzazioni",
    titreH1: ["Un promotore", "che ha già dimostrato il suo valore."],
    intro:
      "Hotel alle isole Canarie, case a Sheffield, edifici riqualificati in Norvegia: ciò che il promotore di CITYSTAR e i suoi soci hanno già realizzato.",
    apercu:
      "Anteprima di lavoro: ruoli, anni e diritti delle foto devono essere confermati dal promotore prima della pubblicazione.",
    chiffres: [
      { valeur: "4", libelle: "paesi" },
      { valeur: "47", libelle: "case consegnate a Sheffield nel 2025" },
      { valeur: "4", libelle: "edifici riqualificati a Gjøvik" },
    ],
    tous: "Tutti i progetti",
    pays: "Paesi",
    photos: (n) => `Vedi le ${n} foto`,
    photo: (titre, i, n) => `${titre}, foto ${i} di ${n}`,
    aConfirmer: "Da confermare",
    suite: {
      titre: ["Oggi,", "la Route de Fès."],
      texte:
        "Quattordici ville, ciascuna su un terreno di 2.000 m² con piscina privata. Villa campione visitabile entro fine gennaio 2027, prima villa consegnata ad agosto 2027.",
      villas: "Scoprire le ville",
      dossier: "Ricevere il dossier",
    },
    lienAccueil: "Vedi le sue realizzazioni",
    bandeau: {
      kicker: "Realizzazioni",
      titre: ["Un promotore", "che ha già dimostrato il suo valore."],
      lien: "Tutte le realizzazioni",
    },
  },
  nl: {
    titre: "Realisaties van de ontwikkelaar — CITYSTAR Marrakech",
    description:
      "Spanje, Verenigd Koninkrijk, Noorwegen, Irak: de projecten die de ontwikkelaar van CITYSTAR en zijn partners vóór Marrakech hebben gerealiseerd.",
    kicker: "Realisaties",
    titreH1: ["Een ontwikkelaar", "die zich al heeft bewezen."],
    intro:
      "Hotels op de Canarische Eilanden, woningen in Sheffield, gerenoveerde gebouwen in Noorwegen: wat de ontwikkelaar van CITYSTAR en zijn partners al hebben gerealiseerd.",
    apercu:
      "Werkversie: rollen, jaren en fotorechten moeten vóór publicatie door de ontwikkelaar worden bevestigd.",
    chiffres: [
      { valeur: "4", libelle: "landen" },
      { valeur: "47", libelle: "woningen opgeleverd in Sheffield in 2025" },
      { valeur: "4", libelle: "gebouwen gerenoveerd in Gjøvik" },
    ],
    tous: "Alle projecten",
    pays: "Landen",
    photos: (n) => `Bekijk de ${n} foto’s`,
    photo: (titre, i, n) => `${titre}, foto ${i} van ${n}`,
    aConfirmer: "Te bevestigen",
    suite: {
      titre: ["Vandaag,", "de Route de Fès."],
      texte:
        "Veertien villa’s, elk op een perceel van 2.000 m² met privézwembad. Modelvilla uiterlijk eind januari 2027 te bezichtigen, eerste villa opgeleverd in augustus 2027.",
      villas: "Ontdek de villa’s",
      dossier: "Het dossier ontvangen",
    },
    lienAccueil: "Bekijk de realisaties",
    bandeau: {
      kicker: "Realisaties",
      titre: ["Een ontwikkelaar", "die zich al heeft bewezen."],
      lien: "Alle realisaties",
    },
  },
  no: {
    titre: "Utbyggerens referanseprosjekter — CITYSTAR Marrakech",
    description:
      "Spania, Storbritannia, Norge, Irak: prosjektene som utbyggeren bak CITYSTAR og partnerne har gjennomført før Marrakech.",
    kicker: "Referanseprosjekter",
    titreH1: ["En utbygger", "med dokumenterte resultater."],
    intro:
      "Hoteller på Kanariøyene, boliger i Sheffield, rehabiliterte bygårder i Norge: dette har utbyggeren bak CITYSTAR og partnerne allerede gjennomført.",
    apercu:
      "Arbeidsversjon: roller, årstall og bilderettigheter skal bekreftes av utbyggeren før publisering.",
    chiffres: [
      { valeur: "4", libelle: "land" },
      { valeur: "47", libelle: "boliger ferdigstilt i Sheffield i 2025" },
      { valeur: "4", libelle: "bygårder rehabilitert i Gjøvik" },
    ],
    tous: "Alle prosjekter",
    pays: "Land",
    photos: (n) => `Se alle ${n} bildene`,
    photo: (titre, i, n) => `${titre}, bilde ${i} av ${n}`,
    aConfirmer: "Skal bekreftes",
    suite: {
      titre: ["I dag,", "Route de Fès."],
      texte:
        "Fjorten villaer, hver på en tomt på 2 000 m² med privat basseng. Visningsvillaen kan besøkes innen utgangen av januar 2027, første villa overleveres i august 2027.",
      villas: "Oppdag villaene",
      dossier: "Motta dokumentasjonen",
    },
    lienAccueil: "Se referanseprosjektene",
    bandeau: {
      kicker: "Referanseprosjekter",
      titre: ["En utbygger", "med dokumenterte resultater."],
      lien: "Alle prosjekter",
    },
  },
};
