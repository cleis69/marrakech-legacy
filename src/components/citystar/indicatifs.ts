import { LOCALE, type Langue } from "@/config/citystar";

/**
 * Indicatifs téléphoniques du formulaire de rappel, par code pays ISO. Les noms des pays
 * viennent du navigateur (Intl.DisplayNames), dans la langue du site.
 */
const INDICATIFS: Record<string, string> = {
  // Les marchés de CITYSTAR, dans l'ordre voulu par le client.
  MA: "212", FR: "33", BE: "32", CH: "41", GB: "44", IT: "39", ES: "34", NL: "31",
  // Reste de l'Europe.
  AD: "376", AL: "355", AT: "43", AX: "358", BA: "387", BG: "359", BY: "375", CY: "357",
  CZ: "420", DE: "49", DK: "45", EE: "372", FI: "358", FO: "298", GG: "44", GI: "350",
  GR: "30", HR: "385", HU: "36", IE: "353", IM: "44", IS: "354", JE: "44", LI: "423",
  LT: "370", LU: "352", LV: "371", MC: "377", MD: "373", ME: "382", MK: "389", MT: "356",
  NO: "47", PL: "48", PT: "351", RO: "40", RS: "381", SE: "46", SI: "386", SK: "421",
  SM: "378", UA: "380", XK: "383",
  // Afrique.
  AO: "244", BF: "226", BI: "257", BJ: "229", BW: "267", CD: "243", CF: "236", CG: "242",
  CI: "225", CM: "237", CV: "238", DJ: "253", DZ: "213", EG: "20", ER: "291", ET: "251",
  GA: "241", GH: "233", GM: "220", GN: "224", GQ: "240", GW: "245", KE: "254", KM: "269",
  LR: "231", LS: "266", LY: "218", MG: "261", ML: "223", MR: "222", MU: "230", MW: "265",
  MZ: "258", NA: "264", NE: "227", NG: "234", RE: "262", RW: "250", SC: "248", SD: "249",
  SL: "232", SN: "221", SO: "252", SS: "211", ST: "239", SZ: "268", TD: "235", TG: "228",
  TN: "216", TZ: "255", UG: "256", YT: "262", ZA: "27", ZM: "260", ZW: "263",
  // Moyen-Orient et Asie.
  AE: "971", AF: "93", AM: "374", AZ: "994", BD: "880", BH: "973", BN: "673", BT: "975",
  CN: "86", GE: "995", HK: "852", ID: "62", IL: "972", IN: "91", IQ: "964", IR: "98",
  JO: "962", JP: "81", KG: "996", KH: "855", KR: "82", KW: "965", KZ: "7", LA: "856",
  LB: "961", LK: "94", MM: "95", MN: "976", MO: "853", MV: "960", MY: "60", NP: "977",
  OM: "968", PH: "63", PK: "92", PS: "970", QA: "974", RU: "7", SA: "966", SG: "65",
  SY: "963", TH: "66", TJ: "992", TL: "670", TM: "993", TR: "90", TW: "886", UZ: "998",
  VN: "84", YE: "967",
  // Amériques.
  AG: "1", AR: "54", AW: "297", BB: "1", BM: "1", BO: "591", BR: "55", BS: "1", BZ: "501",
  CA: "1", CL: "56", CO: "57", CR: "506", CU: "53", CW: "599", DM: "1", DO: "1", EC: "593",
  GD: "1", GF: "594", GP: "590", GT: "502", GY: "592", HN: "504", HT: "509", JM: "1",
  KN: "1", KY: "1", LC: "1", MQ: "596", MX: "52", NI: "505", PA: "507", PE: "51", PM: "508",
  PR: "1", PY: "595", SR: "597", SV: "503", TT: "1", US: "1", UY: "598", VC: "1", VE: "58",
  // Océanie.
  AU: "61", FJ: "679", FM: "691", KI: "686", MH: "692", NC: "687", NR: "674", NZ: "64",
  PF: "689", PG: "675", PW: "680", SB: "677", TO: "676", TV: "688", VU: "678", WF: "681",
  WS: "685",
};

const PRIORITAIRES = ["MA", "FR", "BE", "CH", "GB", "IT", "ES", "NL"];
const EUROPE = [
  "AD", "AL", "AT", "AX", "BA", "BG", "BY", "CY", "CZ", "DE", "DK", "EE", "FI", "FO", "GG",
  "GI", "GR", "HR", "HU", "IE", "IM", "IS", "JE", "LI", "LT", "LU", "LV", "MC", "MD", "ME",
  "MK", "MT", "NO", "PL", "PT", "RO", "RS", "SE", "SI", "SK", "SM", "UA", "XK",
];

export type Indicatif = { pays: string; libelle: string };

/** Les trois groupes de la liste : marchés prioritaires, reste de l'Europe, reste du monde. */
export function listeIndicatifs(langue: Langue) {
  const noms = new Intl.DisplayNames([LOCALE[langue]], { type: "region" });
  const option = (pays: string): Indicatif => ({
    pays,
    libelle: `+${INDICATIFS[pays]} · ${noms.of(pays) ?? pays}`,
  });
  const triees = (pays: string[]) =>
    pays
      .map((p) => ({ p, nom: noms.of(p) ?? p }))
      .sort((a, b) => a.nom.localeCompare(b.nom, LOCALE[langue]))
      .map(({ p }) => option(p));
  const europe = new Set(EUROPE);
  return {
    prioritaires: PRIORITAIRES.map(option),
    europe: triees(EUROPE),
    monde: triees(Object.keys(INDICATIFS).filter((p) => !PRIORITAIRES.includes(p) && !europe.has(p))),
  };
}

/**
 * Numéro complet envoyé à HubSpot : « +212 630373961 ». Le 0 national tombe, sauf en Italie
 * où il fait partie du numéro ; un numéro déjà saisi avec + ou 00 est gardé tel quel.
 */
export function numeroComplet(pays: string, saisi: string) {
  const brut = saisi.trim();
  if (brut.startsWith("+")) return brut;
  if (brut.startsWith("00")) return `+${brut.slice(2)}`;
  const indicatif = INDICATIFS[pays] ?? "";
  return `+${indicatif} ${pays === "IT" ? brut : brut.replace(/^0+/, "")}`;
}
