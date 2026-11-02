import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Minus, Plus, ScanLine, X } from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import type { TypeVilla } from "@/config/citystar";
import vueAerienne from "@/assets/citystar/vue-aerienne.webp";

import { useDevise } from "./currency";
import { faitsVilla, srcSetPour, villas } from "./data";
import { chemin, Lien } from "./liens";
import { Reveal } from "./motion";

/** Dimensions de l'image, en pixels : les repères sont donnés en pourcentage de ces dimensions. */
const LARGEUR = 2000;
const HAUTEUR = 1116;
const ZOOM_MAX = 3.2;

/**
 * Une villa par repère, avec son type. L'image reprend la disposition du plan de
 * masse (villa seule au nord-ouest, rangée de cinq au nord, îlot de deux villas
 * au centre, quatre villas au sud, deux à l'ouest) : le type de chaque villa est
 * celui du lot qui occupe la même place sur le plan (A × 6, B × 4, C × 4).
 * Les toits de l'image sont retravaillés : seule la place sert à reconnaître le lot.
 */
const REPERES: readonly { x: number; y: number; type: TypeVilla }[] = [
  { x: 28, y: 14, type: "C" }, // lot 1
  { x: 38.8, y: 32.7, type: "B" }, // lot 12
  { x: 49.3, y: 33.2, type: "B" }, // lot 11
  { x: 60.8, y: 34.4, type: "B" }, // lot 10
  { x: 69.8, y: 41.6, type: "B" }, // lot 9
  { x: 79.8, y: 51, type: "C" }, // lot 8
  { x: 67.5, y: 69.5, type: "A" }, // lot 7
  { x: 50, y: 74.3, type: "A" }, // lot 6
  { x: 34.5, y: 77, type: "C" }, // lot 5
  { x: 15.5, y: 84.5, type: "C" }, // lot 4
  { x: 20.8, y: 59.5, type: "A" }, // lot 3
  { x: 23.5, y: 42, type: "A" }, // lot 2
  { x: 36.8, y: 50.6, type: "A" }, // lot 14
  { x: 53.2, y: 52.4, type: "A" }, // lot 13
];

const borne = (valeur: number, min: number, max: number) =>
  Math.min(Math.max(valeur, min), max);

/**
 * La vue aérienne du domaine : un repère par villa, une fiche au toucher, un zoom
 * au bouton, à la molette (avec Ctrl ou ⌘) ou au pincement, et un cadrage qui se
 * déplace à la main.
 */
export function VueAerienne() {
  const { langue, t } = useDevise();
  const a = t.aerien;

  const cadreRef = useRef<HTMLDivElement>(null);
  const [cadre, setCadre] = useState({ l: 0, h: 0 });
  const [vue, setVue] = useState({ z: 1, x: 0, y: 0 });
  const [choix, setChoix] = useState<number | null>(null);
  const [glisse, setGlisse] = useState(false);
  const geste = useRef<{ x: number; y: number; ox: number; oy: number; bouge: boolean } | null>(
    null,
  );

  /* L'image recouvre le cadre, quel que soit son format : « cover », calculé pour que les repères suivent. */
  const echelle = cadre.l ? Math.max(cadre.l / LARGEUR, cadre.h / HAUTEUR) : 1;
  const largeur = LARGEUR * echelle;
  const hauteur = HAUTEUR * echelle;

  const cadrer = useCallback(
    (z: number, x: number, y: number) => ({
      z,
      x: borne(x, Math.min(0, cadre.l - largeur * z), 0),
      y: borne(y, Math.min(0, cadre.h - hauteur * z), 0),
    }),
    [cadre.l, cadre.h, largeur, hauteur],
  );

  /* Mesure du cadre ; le cadrage reste centré quand sa taille change. */
  useLayoutEffect(() => {
    const el = cadreRef.current;
    if (!el) return;
    const mesurer = () => setCadre({ l: el.clientWidth, h: el.clientHeight });
    mesurer();
    const observateur = new ResizeObserver(mesurer);
    observateur.observe(el);
    return () => observateur.disconnect();
  }, []);

  useEffect(() => {
    if (!cadre.l) return;
    setVue((v) =>
      v.z === 1
        ? cadrer(1, (cadre.l - largeur) / 2, (cadre.h - hauteur) / 2)
        : cadrer(v.z, v.x, v.y),
    );
  }, [cadre.l, cadre.h, largeur, hauteur, cadrer]);

  /** Zoom autour d'un point du cadre (le centre par défaut). */
  const zoomer = useCallback(
    (facteur: number, px = cadre.l / 2, py = cadre.h / 2) => {
      setVue((v) => {
        const z = borne(v.z * facteur, 1, ZOOM_MAX);
        const ix = (px - v.x) / v.z;
        const iy = (py - v.y) / v.z;
        return z === 1
          ? cadrer(1, (cadre.l - largeur) / 2, (cadre.h - hauteur) / 2)
          : cadrer(z, px - ix * z, py - iy * z);
      });
    },
    [cadre.l, cadre.h, largeur, hauteur, cadrer],
  );

  /* Pincement du pavé tactile (Ctrl + molette) : seul cas où la molette zoome, pour ne pas capter le défilement. */
  useEffect(() => {
    const el = cadreRef.current;
    if (!el) return;
    const molette = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      const r = el.getBoundingClientRect();
      zoomer(Math.exp(-e.deltaY * 0.01), e.clientX - r.left, e.clientY - r.top);
    };
    el.addEventListener("wheel", molette, { passive: false });
    return () => el.removeEventListener("wheel", molette);
  }, [zoomer]);

  useEffect(() => {
    if (choix === null) return;
    const touche = (e: KeyboardEvent) => e.key === "Escape" && setChoix(null);
    window.addEventListener("keydown", touche);
    return () => window.removeEventListener("keydown", touche);
  }, [choix]);

  const surDebut = (e: React.PointerEvent) => {
    if (e.button !== 0 || (e.target as HTMLElement).closest("button, a")) return;
    geste.current = { x: e.clientX, y: e.clientY, ox: vue.x, oy: vue.y, bouge: false };
  };
  const surMouvement = (e: React.PointerEvent) => {
    const g = geste.current;
    if (!g) return;
    const dx = e.clientX - g.x;
    const dy = e.clientY - g.y;
    if (!g.bouge) {
      if (Math.hypot(dx, dy) < 5) return;
      g.bouge = true;
      setGlisse(true);
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    setVue((v) => cadrer(v.z, g.ox + dx, g.oy + dy));
  };
  const surFin = () => {
    geste.current = null;
    setGlisse(false);
  };

  /* Une villa choisie hors champ, ou sous la fiche, est ramenée dans le cadre. */
  const montrer = (r: { x: number; y: number }) => {
    const px = (r.x / 100) * largeur * vue.z + vue.x;
    const py = (r.y / 100) * hauteur * vue.z + vue.y;
    const etroit = cadre.l < 700;
    const sousFiche = etroit ? py > cadre.h - 290 : px < 400 && py > cadre.h - 290;
    const horsChamp = px < 50 || px > cadre.l - 50 || py < 50 || py > cadre.h - 50;
    if (!sousFiche && !horsChamp) return;
    const cx = etroit ? cadre.l / 2 : cadre.l * 0.58;
    const cy = etroit ? cadre.h * 0.34 : cadre.h * 0.42;
    setVue(
      cadrer(vue.z, cx - (r.x / 100) * largeur * vue.z, cy - (r.y / 100) * hauteur * vue.z),
    );
  };

  const fiche = choix === null ? null : choix;
  const repere = fiche === null ? null : REPERES[fiche];

  return (
    <section id="domaine" className="va section-pad" aria-labelledby="domaine-title">
      <div className="va-tete">
        <div>
          <div className="section-label">
            <p>{a.label}</p>
          </div>
          <Reveal>
            <h2 id="domaine-title">
              {a.titre[0]} <br />
              <span className="ton">{a.titre[1]}</span>
            </h2>
          </Reveal>
        </div>
        <p className="va-texte">{a.texte}</p>
      </div>

      <motion.div
        className="va-cadre-ext"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-8%" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          ref={cadreRef}
          className={`va-cadre${glisse ? " is-glisse" : ""}${vue.z > 1 ? " is-zoom" : ""}`}
          role="group"
          aria-label={a.aria}
          onPointerDown={surDebut}
          onPointerMove={surMouvement}
          onPointerUp={surFin}
          onPointerCancel={surFin}
          onClick={(e) => {
            /* Un clic dans le vide referme la fiche. */
            if (e.target === e.currentTarget || (e.target as HTMLElement).tagName === "IMG") {
              setChoix(null);
            }
          }}
        >
          <div
            className="va-scene"
            style={
              {
                width: largeur,
                height: hauteur,
                transform: `translate3d(${vue.x}px, ${vue.y}px, 0) scale(${vue.z})`,
                "--z": vue.z,
              } as React.CSSProperties
            }
          >
            <img
              src={vueAerienne}
              alt={a.alt}
              width={LARGEUR}
              height={HAUTEUR}
              loading="lazy"
              decoding="async"
              draggable={false}
            />
            {repere && (
              <i
                key={fiche}
                className="va-projecteur"
                aria-hidden="true"
                style={{ "--px": `${repere.x}%`, "--py": `${repere.y}%` } as React.CSSProperties}
              />
            )}
            {REPERES.map((r, i) => (
              <button
                key={i}
                type="button"
                className={`va-repere${fiche === i ? " is-actif" : ""}${
                  fiche !== null && fiche !== i ? " is-attenue" : ""
                }`}
                style={{ left: `${r.x}%`, top: `${r.y}%`, "--i": i } as React.CSSProperties}
                aria-label={t.villas.typeVilla(r.type)}
                aria-pressed={fiche === i}
                onClick={() => {
                  setChoix(fiche === i ? null : i);
                  if (fiche !== i) montrer(r);
                }}
              >
                <b>{r.type}</b>
              </button>
            ))}
          </div>

          <div className="va-zoom" role="group" aria-label="Zoom">
            <button
              type="button"
              onClick={() => zoomer(1.6)}
              disabled={vue.z >= ZOOM_MAX - 0.01}
              aria-label={a.zoomPlus}
            >
              <Plus aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => zoomer(1 / 1.6)}
              disabled={vue.z <= 1.01}
              aria-label={a.zoomMoins}
            >
              <Minus aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => zoomer(1 / ZOOM_MAX)}
              disabled={vue.z <= 1.01}
              aria-label={a.zoomReset}
            >
              <ScanLine aria-hidden="true" />
            </button>
          </div>

          <AnimatePresence>
            {fiche !== null && (
              <motion.aside
                key="fiche"
                className={`va-fiche${repere && repere.x < 50 ? " is-droite" : ""}${
                  repere && repere.y > 52 ? " is-haut" : ""
                }`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                aria-live="polite"
              >
                <button
                  type="button"
                  className="va-fiche-fermer"
                  onClick={() => setChoix(null)}
                  aria-label={a.fermer}
                >
                  <X aria-hidden="true" />
                </button>
                {repere && <FicheType type={repere.type} />}
              </motion.aside>
            )}
          </AnimatePresence>
        </div>

        <div className="va-pied">
          <p>{a.illustration}</p>
        </div>
      </motion.div>
    </section>
  );
}

/** Fiche d'un type de villa : photo, surface, terrain, configuration, et sa page. */
function FicheType({ type }: { type: TypeVilla }) {
  const { langue, t } = useDevise();
  const faits = faitsVilla(type, t, langue);
  const villa = villas.find((v) => v.type === type);
  return (
    <>
      <div className="va-fiche-tete">
        {villa && (
          <img
            src={villa.image}
            srcSet={srcSetPour(villa.image)}
            sizes="96px"
            alt=""
            width={96}
            height={96}
            loading="lazy"
            decoding="async"
          />
        )}
        <div>
          <small>{faits.tag}</small>
          <h3>{t.villas.typeVilla(type)}</h3>
        </div>
      </div>
      <dl>
        <div>
          <dt>{t.villas.surface}</dt>
          <dd>{faits.surface}</dd>
        </div>
        <div>
          <dt>{t.villas.terrain}</dt>
          <dd>{faits.terrain}</dd>
        </div>
        <div>
          <dt>{t.villas.configuration}</dt>
          <dd>{faits.suites}</dd>
        </div>
      </dl>
      <Lien className="pill pill-primary" vers={chemin(langue, `villas/${type.toLowerCase()}`)}>
        <span className="pill-label">{t.villas.decouvrir}</span>
        <i className="pill-dot" aria-hidden="true">
          <ArrowRight />
        </i>
      </Lien>
    </>
  );
}
