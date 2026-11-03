/**
 * Réalisations du promoteur et de ses associés, avant CITYSTAR. Les textes viennent
 * des messages envoyés par l'équipe le 03/11/2026 (WhatsApp). Ils sont en français
 * seulement : les cinq autres langues seront ajoutées une fois les rôles, les années
 * et les droits des photos confirmés. `aConfirmer` ne s'affiche qu'en développement.
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

export type Realisation = {
  id: string;
  pays: Pays;
  titre: string;
  lieu: string;
  statut: string;
  resume: string;
  chiffres: { valeur: string; libelle: string }[];
  details?: { titre: string; texte: string }[];
  photos: string[];
  aConfirmer: string[];
};

/* Le premier projet est mis en avant : grande carte en tête de liste. */
export const realisations: Realisation[] = [
  {
    id: "gran-canaria",
    pays: "espagne",
    titre: "Hôtels à Gran Canaria",
    lieu: "Puerto Rico et Playa del Inglés, Gran Canaria · Espagne",
    statut: "Partenariat hôtelier",
    resume:
      "Développements immobiliers et hôteliers aux îles Canaries, aux côtés d'un investisseur du groupe hôtelier Servatur : resorts face à l'océan, piscines et appartements.",
    chiffres: [],
    photos: photosDe("gran-canaria"),
    aConfirmer: [
      "Les photos sont celles des hôtels Servatur Puerto Azul et Waikiki (site servatur.com) : confirmer que ce sont les hôtels concernés, et les droits d'utilisation.",
      "Le texte reçu s'appuie sur un article de presse de 2023 : préciser le rôle de Bashar Zabin.",
    ],
  },
  {
    id: "corker-bottoms",
    pays: "royaume-uni",
    titre: "Corker Bottoms",
    lieu: "Manor, Sheffield · Royaume-Uni",
    statut: "Livré en 2025",
    resume: "Quarante-sept maisons neuves, de deux à quatre chambres, près de Harborough Road.",
    chiffres: [
      { valeur: "47", libelle: "maisons neuves" },
      { valeur: "2 à 4", libelle: "chambres" },
    ],
    photos: photosDe("corker-bottoms"),
    aConfirmer: [
      "Rôle du promoteur : le texte reçu dit « Developed by Sheffield Housing Company, not publicly linked to Bakhtyar Agha ».",
      "Pas de version plus grande sur le site de Sheffield Housing Company : demander les photos d'origine.",
    ],
  },
  {
    id: "north-gate-house",
    pays: "royaume-uni",
    titre: "North Gate House",
    lieu: "Centre de Sheffield · Royaume-Uni",
    statut: "Récemment ouvert",
    resume:
      "Appartements meublés dans un immeuble en brique du centre, à 1,2 km de la gare de Sheffield.",
    chiffres: [{ valeur: "1,2 km", libelle: "de la gare" }],
    photos: photosDe("north-gate-house"),
    aConfirmer: [
      "Rôle exact (propriétaire, promoteur, exploitant) et année d'ouverture.",
      "Photos d'origine du site de réservation de l'hôtel, en 1 448 px : vérifier les droits.",
    ],
  },
  {
    id: "gjovik",
    pays: "norvege",
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
    photos: photosDe("gjovik"),
    aConfirmer: [
      "Projets de Bashar Zabin : préciser son rôle auprès de CITYSTAR, et les années.",
      "La photo du n° 2 vient d'une annonce ; celle du n° 10 montre l'immeuble, pas forcément les parties rénovées.",
    ],
  },
  {
    id: "asco-village",
    pays: "irak",
    titre: "ASCO Village",
    lieu: "Pirmam Road, Erbil · Irak",
    statut: "Résidentiel",
    resume:
      "Cent soixante-quinze villas en trois types, avec leurs jardins et leurs infrastructures. Un projet d'Aree Group.",
    chiffres: [
      { valeur: "175", libelle: "villas" },
      { valeur: "3", libelle: "types de villas" },
    ],
    photos: photosDe("asco-village"),
    aConfirmer: [
      "Rôle du promoteur dans ce projet d'Aree Group.",
      "Les images sont les rendus 3D du site ascovillage.com : dire « rendus » sur la page, ou obtenir des photos du chantier.",
    ],
  },
];

/** Bannière de la page : la première photo du projet mis en avant. */
export const banniere = realisations[0]?.photos[0] ?? "";

export const PAYS: Record<Pays, string> = {
  "royaume-uni": "Royaume-Uni",
  norvege: "Norvège",
  espagne: "Espagne",
  irak: "Irak",
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
  photos: (n: number) => string;
  photo: (titre: string, i: number, n: number) => string;
  aConfirmer: string;
  suite: { titre: readonly string[]; texte: string; villas: string; dossier: string };
  lienAccueil: string;
  bandeau: { kicker: string; titre: readonly string[]; lien: string };
};

export const textesRealisations: Partial<Record<Langue, TexteRealisations>> = {
  fr: {
    titre: "Réalisations du promoteur — CITYSTAR Marrakech",
    description:
      "Espagne, Royaume-Uni, Norvège, Irak : les projets menés par le promoteur de CITYSTAR et ses associés avant Marrakech.",
    kicker: "Réalisations",
    titreH1: ["Avant Marrakech,", "déjà bâti ailleurs."],
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
      kicker: "Réalisations du promoteur",
      titre: ["Avant Marrakech,", "déjà bâti ailleurs."],
      lien: "Toutes les réalisations",
    },
  },
};
