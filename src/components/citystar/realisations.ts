/**
 * Réalisations du promoteur et de ses associés, avant CITYSTAR. Les textes viennent
 * des messages envoyés par l'équipe le 03/11/2026 (WhatsApp). Ils sont en français
 * seulement : les cinq autres langues seront ajoutées une fois les rôles, les années
 * et les droits des photos confirmés. `aConfirmer` ne s'affiche qu'en développement.
 */
import type { Langue } from "@/config/citystar";

const modules = import.meta.glob("@/assets/citystar/realisations/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

/** Les photos d'un projet, dans l'ordre de leur numéro (« gjovik-01.webp »…). */
const photosDe = (projet: string) =>
  Object.entries(modules)
    .filter(([chemin]) => chemin.includes(`/${projet}-`))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, src]) => src);

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

export const realisations: Realisation[] = [
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
      "Droits des photos.",
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
      "Photos en meilleure définition : 700 px reçues.",
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
    id: "gran-canaria",
    pays: "espagne",
    titre: "Hôtels à Gran Canaria",
    lieu: "Gran Canaria, îles Canaries · Espagne",
    statut: "Partenariat hôtelier",
    resume:
      "Développements immobiliers et hôteliers aux Canaries, aux côtés d'un investisseur du groupe hôtelier Servatur.",
    chiffres: [],
    photos: photosDe("gran-canaria"),
    aConfirmer: [
      "Le texte reçu s'appuie sur un article de presse de 2023 : nommer les hôtels et le rôle de Bashar Zabin.",
      "Droits des photos (photos des hôtels Servatur).",
    ],
  },
  {
    id: "asco-village",
    pays: "irak",
    titre: "ASCO Village",
    lieu: "Pirmam Road, Erbil · Irak",
    statut: "Résidentiel",
    resume:
      "Cent soixante-quinze villas en trois types, avec leurs infrastructures. Un projet d'Aree Group.",
    chiffres: [
      { valeur: "175", libelle: "villas" },
      { valeur: "3", libelle: "types de villas" },
    ],
    photos: photosDe("asco-village"),
    aConfirmer: [
      "Rôle du promoteur dans ce projet d'Aree Group.",
      "Les photos reçues montrent des tours, pas les villas, en 330 à 600 px : à remplacer.",
    ],
  },
];

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
};

export const textesRealisations: Partial<Record<Langue, TexteRealisations>> = {
  fr: {
    titre: "Réalisations du promoteur — CITYSTAR Marrakech",
    description:
      "Royaume-Uni, Norvège, Espagne, Irak : les projets menés par le promoteur de CITYSTAR et ses associés avant Marrakech.",
    kicker: "Réalisations",
    titreH1: ["Avant Marrakech,", "déjà bâti ailleurs."],
    intro:
      "Des maisons à Sheffield, des immeubles réhabilités en Norvège, des hôtels aux Canaries : ce que le promoteur de CITYSTAR et ses associés ont déjà mené.",
    apercu:
      "Aperçu de travail : les rôles, les années et les droits des photos sont à confirmer par le promoteur avant la mise en ligne.",
    chiffres: [
      { valeur: "47", libelle: "maisons livrées à Sheffield en 2025" },
      { valeur: "4", libelle: "immeubles réhabilités à Gjøvik" },
      { valeur: "4", libelle: "pays" },
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
  },
};
