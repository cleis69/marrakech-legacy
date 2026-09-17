import { animate, motion, useInView, useMotionTemplate, useMotionValue, useMotionValueEvent, useReducedMotion } from "motion/react";
import { ChevronsLeftRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import renderImage from "@/assets/citystar/site/ext-terraces.jpg";
import drawingImage from "@/assets/citystar/site/ext-terraces-trait.jpg";

import { useDevise } from "./currency";
import { Reveal } from "./motion";

/* Positions en % de l'image : liées à ce rendu précis, à reprendre si l'image change. */
const SPOTS = [{ x: 31, y: 13 }, { x: 30, y: 40 }, { x: 67, y: 42 }, { x: 58.5, y: 62 }, { x: 62, y: 92 }];

const START = 92;
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
const revealedAt = (v: number) => SPOTS.map((spot) => spot.x <= v);

export function ArchitectureSection() {
  const { t } = useDevise();
  const boxRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const glideRef = useRef<ReturnType<typeof animate> | null>(null);
  const inView = useInView(boxRef, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();

  /* Position de la poignée en valeur de mouvement : aucun re-rendu pendant le glissement. */
  const x = useMotionValue(START);
  const clip = useMotionTemplate`inset(0 calc(100% - ${x}%) 0 0)`;
  const left = useMotionTemplate`${x}%`;
  const [revealed, setRevealed] = useState(() => revealedAt(START));
  const [open, setOpen] = useState<number | null>(null);

  useMotionValueEvent(x, "change", (v) => {
    handleRef.current?.setAttribute("aria-valuenow", String(Math.round(v)));
    const next = revealedAt(v);
    setRevealed((prev) => (prev.every((b, i) => b === next[i]) ? prev : next));
    setOpen((current) => (current !== null && (SPOTS[current]?.x ?? 0) > v ? null : current));
  });

  const glide = (to: number, done?: () => void) => {
    glideRef.current?.stop();
    if (reduce) { x.set(to); done?.(); return; }
    const duration = Math.max(0.35, Math.abs(to - x.get()) * 0.014);
    glideRef.current = animate(x, to, { duration, ease: [0.65, 0, 0.35, 1], onComplete: () => done?.() });
  };

  const reveal = (index: number) => {
    const need = (SPOTS[index]?.x ?? 0) + 12;
    if (x.get() >= need) setOpen(index);
    else glide(Math.min(97, need), () => setOpen(index));
  };

  useEffect(() => {
    if (inView) glide(40, () => setOpen(1));
    return () => glideRef.current?.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const setFromPointer = (clientX: number) => {
    const rect = boxRef.current?.getBoundingClientRect();
    if (rect) x.set(clamp(((clientX - rect.left) / rect.width) * 100, 2, 98));
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest(".arch-spot")) return;
    glideRef.current?.stop();
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    setOpen(null);
    setFromPointer(event.clientX);
  };

  const onHandleKey = (event: React.KeyboardEvent) => {
    const steps: Record<string, number> = { ArrowLeft: -5, ArrowDown: -5, ArrowRight: 5, ArrowUp: 5 };
    let to: number | null = null;
    if (event.key in steps) to = x.get() + (steps[event.key] ?? 0) * (event.shiftKey ? 2 : 1);
    if (event.key === "Home") to = 2;
    if (event.key === "End") to = 98;
    if (to === null) return;
    event.preventDefault();
    glideRef.current?.stop();
    x.set(clamp(to, 2, 98));
  };

  const spot = open === null ? null : SPOTS[open];

  return (
    <section id="architecture" className="arch" aria-labelledby="architecture-title">
      <div className="arch-grid">
        <div className="arch-head">
          <div className="section-label"><span>02</span><p>{t.architecture.label}</p></div>
          <Reveal><h2 id="architecture-title">{t.architecture.titre[0]}<br /><em>{t.architecture.titre[1]}</em></h2></Reveal>
        </div>

        <div
          ref={boxRef}
          className="arch-ba"
          onPointerDown={onPointerDown}
          onPointerMove={(event) => { if (dragging.current) setFromPointer(event.clientX); }}
          onPointerUp={() => { dragging.current = false; }}
          onPointerCancel={() => { dragging.current = false; }}
          onKeyDown={(event) => { if (event.key === "Escape") setOpen(null); }}
        >
          <img src={drawingImage} alt={t.architecture.altDessin} draggable={false} />
          <motion.div className="arch-render" style={{ clipPath: clip }}>
            <img src={renderImage} alt={t.architecture.altRendu} draggable={false} />
          </motion.div>
          <span className="arch-tag is-left" aria-hidden="true">{t.architecture.rendu}</span>
          <span className="arch-tag is-right" aria-hidden="true">{t.architecture.dessin}</span>

          {SPOTS.map((item, index) => (
            <button
              key={index}
              type="button"
              className={`arch-spot${revealed[index] ? "" : " is-off"}${open === index ? " is-on" : ""}`}
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
              aria-label={t.architecture.points[index]?.titre}
              aria-expanded={open === index}
              aria-controls="arch-tip"
              onClick={() => reveal(index)}
              onMouseEnter={() => { if (revealed[index]) setOpen(index); }}
            >
              {index + 1}
            </button>
          ))}

          <motion.div
            ref={handleRef}
            className="arch-handle"
            style={{ left }}
            role="slider"
            tabIndex={0}
            aria-label={t.architecture.curseur}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={START}
            onKeyDown={onHandleKey}
          >
            <i><ChevronsLeftRight aria-hidden="true" /></i>
          </motion.div>

          <div id="arch-tip" className={`arch-tip${spot ? " is-shown" : ""}${spot && spot.y < 45 ? " is-below" : ""}`} role="note" aria-live="polite" style={spot ? { left: `${clamp(spot.x, 20, 80)}%`, top: `${spot.y}%` } : {}}>
            {spot && open !== null && <><b>{t.architecture.points[open]?.titre}</b><span>{t.architecture.points[open]?.texte}</span></>}
          </div>
        </div>

        <div className="arch-aside">
          <ol className="arch-list">
            {SPOTS.map((item, index) => (
              <li key={index}>
                <button type="button" className={open === index ? "is-on" : ""} aria-expanded={open === index} aria-controls="arch-tip" onClick={() => reveal(index)} onMouseEnter={() => reveal(index)}>
                  <small>{String(index + 1).padStart(2, "0")}</small>{t.architecture.points[index]?.titre}
                </button>
              </li>
            ))}
          </ol>
          <p className="arch-hint">{t.architecture.hint}</p>
          <p className="arch-note">{t.architecture.note}</p>
        </div>
      </div>
    </section>
  );
}
