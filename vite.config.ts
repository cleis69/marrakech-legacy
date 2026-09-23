// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

/** Base et pré-rendu pour une publication statique (GitHub Pages) : `PAGES=/chemin/ bun run build`. */
const basePages = process.env["PAGES"];

/* Chaque page est listée explicitement : l’exploration automatique suivrait aussi les PDF. */
const sousPages = [
  "villas",
  "villas/a",
  "villas/b",
  "villas/c",
  "galerie",
  "investir",
  "faq",
  "contact",
];
const pages = [
  { path: "/" },
  ...sousPages.map((sous) => ({ path: `/${sous}` })),
  { path: "/villa-de-luxe-marrakech" },
  { path: "/en" },
  ...sousPages.map((sous) => ({ path: `/en/${sous}` })),
  { path: "/en/luxury-villa-marrakech" },
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
