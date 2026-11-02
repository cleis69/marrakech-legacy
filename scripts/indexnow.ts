/**
 * Signale à Bing (et aux autres moteurs IndexNow) toutes les adresses du sitemap,
 * après une mise en ligne : `bun scripts/indexnow.ts`.
 *
 * La clé est le fichier `public/<clé>.txt` : IndexNow vérifie qu'il est en ligne sur le site.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { SITE } from "../src/config/citystar";

const PUBLIC = join(import.meta.dir, "..", "public");
const cle = readdirSync(PUBLIC)
  .find((nom) => /^[0-9a-f]{32}\.txt$/.test(nom))
  ?.slice(0, -".txt".length);
if (!cle) throw new Error("Pas de fichier de clé IndexNow dans public/.");

const sitemap = readFileSync(join(import.meta.dir, "..", ".output", "public", "sitemap.xml"), "utf8");
const adresses = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const reponse = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(SITE).host,
    key: cle,
    keyLocation: `${SITE}/${cle}.txt`,
    urlList: adresses,
  }),
});
console.log(`IndexNow : ${adresses.length} adresses envoyées, réponse ${reponse.status}.`);
if (!reponse.ok) process.exit(1);
