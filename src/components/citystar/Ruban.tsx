import { useReducedMotion } from "motion/react";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useDevise } from "./currency";
import { altRendu, rendus } from "./data";
import { chemin, Lien } from "./liens";
import { Reveal } from "./motion";

/**
 * Les rendus sont classés par nom de fichier, ce qui met les vues d'une même
 * famille côte à côte. Un pas premier avec leur nombre les entrelace : le
 * carrousel ne montre jamais deux fois la même scène à la suite.
 */
const PAS = 7;
const suite = rendus.flatMap((_, index) => {
  const rendu = rendus[(index * PAS) % rendus.length];
  return rendu ? [rendu] : [];
});

const ECART = 22; // px entre deux cartes
const VITESSE = 0.035; // px par milliseconde
const INCLINAISON = 8; // degrés, aux bords

/**
 * Carrousel en demi-arc : les cartes défilent en continu sur une courbe, droites
 * et en avant au centre, plus basses, plus petites et inclinées vers les bords.
 * Il s'arrête au survol, se glisse au doigt ou à la souris, et a son bouton de
 * pause. Sans JavaScript ou en mouvement réduit, c'est une simple rangée à faire
 * défiler à la main.
 */
export function Ruban() {
  const { langue, t } = useDevise();
  const reduce = useReducedMotion();
  const sceneRef = useRef<HTMLDivElement>(null);
  const cartesRef = useRef<(HTMLLIElement | null)[]>([]);
  const [enPause, setEnPause] = useState(false);
  const [arc, setArc] = useState(false);
  const pauseRef = useRef(false);
  pauseRef.current = enPause;

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || reduce) {
      setArc(false);
      return;
    }
    setArc(true);
    let decalage = 0;
    let dernier = 0;
    let raf = 0;
    let visible = false;
    let survol = false;
    let glisse: { x: number; depart: number } | null = null;

    const placer = () => {
      const premiere = cartesRef.current[0];
      if (!premiere) return;
      const largeur = scene.clientWidth;
      const w = premiere.offsetWidth;
      const pas = w + ECART;
      const piste = pas * suite.length;
      const fleche = Math.min(64, largeur * 0.05);
      cartesRef.current.forEach((carte, i) => {
        if (!carte) return;
        const x = ((((i * pas - decalage) % piste) + piste) % piste) - pas;
        const d = Math.max(-1, Math.min(1, (x + w / 2 - largeur / 2) / (largeur / 2)));
        const y = d * d * fleche;
        carte.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${d * INCLINAISON}deg) scale(${1 - 0.14 * Math.abs(d)})`;
      });
    };

    const boucle = (instant: number) => {
      const dt = dernier ? Math.min(instant - dernier, 64) : 0;
      dernier = instant;
      if (!pauseRef.current && !survol && !glisse) decalage += dt * VITESSE;
      placer();
      raf = visible ? requestAnimationFrame(boucle) : 0;
    };

    const observateur = new IntersectionObserver(([entree]) => {
      visible = !!entree?.isIntersecting;
      if (visible && !raf) {
        dernier = 0;
        raf = requestAnimationFrame(boucle);
      }
    });
    observateur.observe(scene);

    const entrer = () => (survol = true);
    const sortir = () => (survol = false);
    const presser = (e: PointerEvent) => {
      glisse = { x: e.clientX, depart: decalage };
      scene.setPointerCapture(e.pointerId);
    };
    const bouger = (e: PointerEvent) => {
      if (glisse) decalage = glisse.depart - (e.clientX - glisse.x);
    };
    const lacher = () => (glisse = null);

    scene.addEventListener("pointerenter", entrer);
    scene.addEventListener("pointerleave", sortir);
    scene.addEventListener("pointerdown", presser);
    scene.addEventListener("pointermove", bouger);
    scene.addEventListener("pointerup", lacher);
    scene.addEventListener("pointercancel", lacher);
    window.addEventListener("resize", placer);
    placer();

    return () => {
      cancelAnimationFrame(raf);
      observateur.disconnect();
      scene.removeEventListener("pointerenter", entrer);
      scene.removeEventListener("pointerleave", sortir);
      scene.removeEventListener("pointerdown", presser);
      scene.removeEventListener("pointermove", bouger);
      scene.removeEventListener("pointerup", lacher);
      scene.removeEventListener("pointercancel", lacher);
      window.removeEventListener("resize", placer);
    };
  }, [reduce]);

  return (
    <section className="arc" aria-labelledby="arc-title">
      <div className="arc-head">
        <Reveal>
          <h2 id="arc-title">
            {t.ruban.titre[0]} <br />
            <span className="ton">{t.ruban.titre[1]}</span>
          </h2>
        </Reveal>
        <div className="arc-actions">
          {arc && (
            <button
              type="button"
              className="pill pill-secondary arc-pause"
              aria-pressed={enPause}
              onClick={() => setEnPause((p) => !p)}
            >
              {enPause ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
              <span>{enPause ? t.ruban.lecture : t.ruban.pause}</span>
            </button>
          )}
          <Lien className="pill pill-secondary" vers={chemin(langue, "galerie")}>
            <span className="pill-label">{t.ruban.galerie}</span>
          </Lien>
        </div>
      </div>

      <div ref={sceneRef} className={`arc-scene${arc ? " is-arc" : ""}`}>
        <ul aria-label={t.ruban.aria}>
          {suite.map((rendu, i) => (
            <li
              key={rendu.src}
              ref={(element) => {
                cartesRef.current[i] = element;
              }}
            >
              <img
                src={rendu.src}
                alt={altRendu(t, rendu.nom)}
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            </li>
          ))}
        </ul>
      </div>
      <p className="arc-note">{t.ruban.note}</p>
    </section>
  );
}
