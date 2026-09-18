import { type Taux, devises } from "@/config/citystar";

/**
 * Taux de change du jour, pour les contre-valeurs indicatives (dirham, couronne).
 * Les prix en euros et en livres restent fixés à la main dans la config : seuls
 * MAD et NOK sont convertis. En cas d'échec, on garde les taux de secours.
 *
 * Sources : Banque centrale européenne via Frankfurter (GBP, NOK), marché via
 * open.er-api.com (MAD, que la BCE ne publie pas).
 */
const CLE_CACHE = "citystar-taux";
const BCE = "https://api.frankfurter.dev/v1/latest?base=EUR&symbols=GBP,NOK";
const MARCHE = "https://open.er-api.com/v6/latest/EUR";
const DELAI_MS = 6000;

type Cache = Taux & { jour: string };

const aujourdhui = () => new Date().toISOString().slice(0, 10);

const valide = (valeur: unknown): valeur is number =>
  typeof valeur === "number" && Number.isFinite(valeur) && valeur > 0;

async function json(url: string) {
  const controleur = new AbortController();
  const minuteur = setTimeout(() => controleur.abort(), DELAI_MS);
  try {
    const reponse = await fetch(url, { signal: controleur.signal });
    if (!reponse.ok) return null;
    return (await reponse.json()) as Record<string, unknown>;
  } catch {
    return null;
  } finally {
    clearTimeout(minuteur);
  }
}

/** Taux mis en cache pour la journée, s'il y en a. */
export function tauxEnCache(): Taux | null {
  try {
    const brut = localStorage.getItem(CLE_CACHE);
    if (!brut) return null;
    const cache = JSON.parse(brut) as Cache;
    if (cache.jour !== aujourdhui()) return null;
    if (!valide(cache.GBP) || !valide(cache.NOK) || !valide(cache.MAD)) return null;
    return { GBP: cache.GBP, NOK: cache.NOK, MAD: cache.MAD, date: cache.date };
  } catch {
    return null;
  }
}

/** Interroge les deux sources ; renvoie null si aucune ne répond. */
export async function recupererTaux(): Promise<Taux | null> {
  const [bce, marche] = await Promise.all([json(BCE), json(MARCHE)]);
  const tauxBce = (bce?.["rates"] ?? {}) as Record<string, unknown>;
  const tauxMarche = (marche?.["rates"] ?? {}) as Record<string, unknown>;
  const secours = devises.tauxDeSecours;

  const GBP = valide(tauxBce["GBP"])
    ? tauxBce["GBP"]
    : valide(tauxMarche["GBP"])
      ? tauxMarche["GBP"]
      : null;
  const NOK = valide(tauxBce["NOK"])
    ? tauxBce["NOK"]
    : valide(tauxMarche["NOK"])
      ? tauxMarche["NOK"]
      : null;
  const MAD = valide(tauxMarche["MAD"]) ? tauxMarche["MAD"] : null;
  if (GBP === null && NOK === null && MAD === null) return null;

  const dateBce = typeof bce?.["date"] === "string" ? (bce["date"] as string) : null;
  const taux: Taux = {
    GBP: GBP ?? secours.GBP,
    NOK: NOK ?? secours.NOK,
    MAD: MAD ?? secours.MAD,
    date: dateBce ?? aujourdhui(),
  };

  try {
    localStorage.setItem(
      CLE_CACHE,
      JSON.stringify({ ...taux, jour: aujourdhui() } satisfies Cache),
    );
  } catch {
    /* Stockage indisponible : on garde simplement les taux en mémoire. */
  }
  return taux;
}
