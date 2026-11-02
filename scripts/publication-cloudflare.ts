/**
 * Prépare `.output/public` pour Cloudflare Pages, après `PAGES=/ bun run build` :
 *
 * 1. Chaque page `x/index.html` devient `x.html`. Pages la sert alors à l'adresse `/x`,
 *    celle des liens du site et des balises canoniques, au lieu de rediriger `/x` vers `/x/`.
 * 2. Le sitemap est écrit à partir des pages construites : leur adresse canonique et leurs
 *    traductions. Les pages en `noindex` (espaces propriétaire et promoteur) n'y figurent pas.
 *
 * Lancement : `bun scripts/publication-cloudflare.ts`, puis le déploiement avec wrangler.
 */
import { readdirSync, readFileSync, renameSync, rmdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const RACINE = join(import.meta.dir, "..", ".output", "public");

function fichiersHtml(dossier: string): string[] {
  return readdirSync(dossier).flatMap((nom) => {
    const chemin = join(dossier, nom);
    if (statSync(chemin).isDirectory()) return fichiersHtml(chemin);
    return nom.endsWith(".html") ? [chemin] : [];
  });
}

/* 1. Adresses sans barre finale. Les dossiers les plus profonds d'abord, pour vider avant de supprimer. */
const index = fichiersHtml(RACINE)
  .filter((f) => f.endsWith("/index.html") && f !== join(RACINE, "index.html"))
  .sort((a, b) => b.length - a.length);
for (const fichier of index) {
  const dossier = fichier.slice(0, -"/index.html".length);
  renameSync(fichier, `${dossier}.html`);
  if (readdirSync(dossier).length === 0) rmdirSync(dossier);
}

/* 2. Sitemap. */
const attribut = (balise: string, nom: string) =>
  new RegExp(`${nom}="([^"]*)"`, "i").exec(balise)?.[1];

type Entree = { adresse: string; traductions: { langue: string; adresse: string }[] };
const entrees: Entree[] = [];
for (const fichier of fichiersHtml(RACINE)) {
  const html = readFileSync(fichier, "utf8");
  if (/<meta[^>]*name="robots"[^>]*noindex/i.test(html)) continue;
  const balises = html.match(/<link[^>]*>/gi) ?? [];
  const canonique = balises.find((b) => /rel="canonical"/i.test(b));
  const adresse = canonique && attribut(canonique, "href");
  if (!adresse) continue;
  const traductions = balises
    .filter((b) => /rel="alternate"/i.test(b) && /hreflang=/i.test(b))
    .map((b) => ({ langue: attribut(b, "hreflang") ?? "", adresse: attribut(b, "href") ?? "" }));
  entrees.push({ adresse, traductions });
}
entrees.sort((a, b) => a.adresse.localeCompare(b.adresse));

const jour = new Date().toISOString().slice(0, 10);
const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...entrees.map(({ adresse, traductions }) =>
    [
      "  <url>",
      `    <loc>${adresse}</loc>`,
      `    <lastmod>${jour}</lastmod>`,
      ...traductions.map(
        (t) => `    <xhtml:link rel="alternate" hreflang="${t.langue}" href="${t.adresse}"/>`,
      ),
      "  </url>",
    ].join("\n"),
  ),
  "</urlset>",
  "",
].join("\n");
writeFileSync(join(RACINE, "sitemap.xml"), xml);

console.log(`${index.length} pages renommées, ${entrees.length} adresses dans sitemap.xml.`);
const horsSite = entrees.filter((e) => !e.adresse.startsWith("https://"));
if (horsSite.length) {
  console.error("Adresses canoniques relatives :", horsSite.map((e) => e.adresse).slice(0, 5));
  process.exit(1);
}
