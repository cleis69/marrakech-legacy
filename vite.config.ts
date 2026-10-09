// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

/** Base et pré-rendu pour une publication statique (GitHub Pages) : `PAGES=/chemin/ bun run build`. */
const basePages = process.env["PAGES"];

/* Chaque page est listée explicitement, dans les six langues : l’exploration automatique suivrait aussi les PDF. */
const pages = [
  { path: "/" },
  { path: "/villas" },
  { path: "/galerie" },
  { path: "/investir" },
  { path: "/faq" },
  { path: "/contact" },
  { path: "/villa-de-luxe-marrakech" },
  { path: "/mon-espace" },
  { path: "/espace-promoteur" },
  { path: "/villas/a" },
  { path: "/villas/b" },
  { path: "/villas/c" },
  { path: "/en" },
  { path: "/en/villas" },
  { path: "/en/galerie" },
  { path: "/en/investir" },
  { path: "/en/faq" },
  { path: "/en/contact" },
  { path: "/en/luxury-villa-marrakech" },
  { path: "/en/owner-area" },
  { path: "/en/villas/a" },
  { path: "/en/villas/b" },
  { path: "/en/villas/c" },
  { path: "/es" },
  { path: "/es/villas" },
  { path: "/es/galerie" },
  { path: "/es/investir" },
  { path: "/es/faq" },
  { path: "/es/contact" },
  { path: "/es/villa-de-lujo-marrakech" },
  { path: "/es/area-propietarios" },
  { path: "/es/villas/a" },
  { path: "/es/villas/b" },
  { path: "/es/villas/c" },
  { path: "/it" },
  { path: "/it/villas" },
  { path: "/it/galerie" },
  { path: "/it/investir" },
  { path: "/it/faq" },
  { path: "/it/contact" },
  { path: "/it/villa-di-lusso-marrakech" },
  { path: "/it/area-proprietari" },
  { path: "/it/villas/a" },
  { path: "/it/villas/b" },
  { path: "/it/villas/c" },
  { path: "/nl" },
  { path: "/nl/villas" },
  { path: "/nl/galerie" },
  { path: "/nl/investir" },
  { path: "/nl/faq" },
  { path: "/nl/contact" },
  { path: "/nl/luxe-villa-marrakech" },
  { path: "/nl/eigenaarsportaal" },
  { path: "/nl/villas/a" },
  { path: "/nl/villas/b" },
  { path: "/nl/villas/c" },
  { path: "/no" },
  { path: "/no/villas" },
  { path: "/no/galerie" },
  { path: "/no/investir" },
  { path: "/no/faq" },
  { path: "/no/contact" },
  { path: "/no/luksusvilla-marrakech" },
  { path: "/no/eierportal" },
  { path: "/no/villas/a" },
  { path: "/no/villas/b" },
  { path: "/no/villas/c" },
];

export default defineConfig({
  ...(basePages ? { vite: { base: basePages } } : {}),
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    ...(basePages ? { prerender: { enabled: true, crawlLinks: false }, pages } : {}),
  },
});
