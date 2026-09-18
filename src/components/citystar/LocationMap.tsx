import { useReducedMotion } from "motion/react";
import { ArrowRight, LocateFixed, Minus, Plus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { programme } from "@/config/citystar";
import photo from "@/assets/citystar/location.webp";

import { useDevise } from "./currency";

export type Place = "med" | "air" | "palm";

type View = { x: number; y: number; z: number };
type Drag = { px: number; py: number; x: number; y: number; moved: boolean; target: Element };

/* Carte dessinée, non à l'échelle : repère 1000 × 700, CITYSTAR en haut à droite. */
const HOME: View = { x: 560, y: 250, z: 1 };
const STAR = { x: 690, y: 150 };
const LIMITS = { x: [120, 900], y: [40, 680], z: [1, 4] } as const;
const ROUTES: Record<Place, string> = {
  med: "M690,150 C650,250 540,330 468,405",
  air: "M690,150 C560,210 330,330 300,560",
  palm: "M690,150 C675,215 640,265 612,305",
};
const LANDMARKS = [
  { id: "med", x: 430, y: 440, dot: true },
  { id: "air", x: 290, y: 586, dot: true },
  { id: "palm", x: 585, y: 335, dot: false },
] as const;

// Itinéraire vers la commune seulement : l'emplacement exact reste à confirmer (voir config).
const ITINERARY_URL =
  "https://www.google.com/maps/dir/?api=1&destination=Oulad+Hassoune,+Marrakech";

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

/** Géométrie décorative générée une fois, avec un aléa déterministe (rendu serveur identique). */
const GEOMETRY = (() => {
  let seed = 11;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  const contours: string[] = [];
  for (let c = -3; c < 13; c++) {
    const y0 = 60 + c * 75;
    let d = `M-300,${y0}`;
    for (let x = -300; x <= 1300; x += 80)
      d += ` L${x},${(y0 + Math.sin(x / 140 + c) * 22 + (rnd() - 0.5) * 14).toFixed(1)}`;
    contours.push(d);
  }
  const palms = Array.from({ length: 110 }, () => {
    const a = rnd() * Math.PI * 2,
      r = Math.sqrt(rnd());
    return {
      cx: (600 + Math.cos(a) * r * 175).toFixed(1),
      cy: (320 + Math.sin(a) * r * 78).toFixed(1),
      r: (1.6 + rnd() * 2.2).toFixed(1),
    };
  });
  const details: string[] = [];
  for (let j = 0; j < 16; j++) {
    const sx = 375 + rnd() * 100,
      sy = 385 + rnd() * 105;
    details.push(
      `M${sx.toFixed(0)},${sy.toFixed(0)} l${((rnd() - 0.5) * 40).toFixed(0)},${((rnd() - 0.5) * 40).toFixed(0)} l${((rnd() - 0.5) * 30).toFixed(0)},${((rnd() - 0.5) * 30).toFixed(0)}`,
    );
  }
  for (let t = 0; t < 5; t++) {
    const ty = 270 + t * 22;
    details.push(`M${450 + t * 10},${ty} C520,${ty - 30} 640,${ty + 30} ${760 - t * 12},${ty - 8}`);
  }
  return { contours, palms, details };
})();

type Props = { selected: Place | null; onSelect: (place: Place | null) => void };

/**
 * Carte interactive dessinée (aucun service externe) : glisser pour déplacer,
 * boutons ou Ctrl + molette pour zoomer ; une destination choisie fait voyager
 * la carte et trace le trajet depuis CITYSTAR avec un compteur de minutes.
 */
export function LocationMap({ selected, onSelect }: Props) {
  const { t } = useDevise();
  const boxRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const liveRef = useRef<SVGPathElement>(null);
  const headRef = useRef<SVGGElement>(null);
  const headLabelRef = useRef<SVGTextElement>(null);
  const popRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const [popOpen, setPopOpen] = useState(true);
  const st = useRef({
    cur: { ...HOME },
    tgt: { ...HOME },
    raf: 0,
    route: 0,
    hint: 0,
    drag: null as Drag | null,
    mounted: false,
  });

  const scale = (width: number) => clamp(720 / width, 0.8, 2.4);

  const apply = () => {
    const box = boxRef.current,
      svg = svgRef.current;
    if (!box || !svg) return;
    const w = box.clientWidth || 1,
      h = box.clientHeight || 1,
      k = scale(w);
    const { cur } = st.current;
    const vw = 1000 / cur.z,
      vh = (vw * h) / w,
      vx = cur.x - vw / 2,
      vy = cur.y - vh / 2;
    svg.setAttribute(
      "viewBox",
      `${vx.toFixed(2)} ${vy.toFixed(2)} ${vw.toFixed(2)} ${vh.toFixed(2)}`,
    );
    svg.style.setProperty("--z", cur.z.toFixed(3));
    svg.querySelectorAll<SVGGElement>("[data-x]").forEach((mark) => {
      mark.setAttribute(
        "transform",
        `translate(${mark.dataset["x"]} ${mark.dataset["y"]}) scale(${(k / cur.z).toFixed(3)})`,
      );
    });
    const pop = popRef.current;
    if (pop) {
      // La fiche passe sous l'étoile quand elle manquerait de place au-dessus.
      const starY = ((STAR.y - vy) / vh) * h,
        radius = (30 * k * w) / 1000;
      const below = starY - radius - pop.offsetHeight - 26 < 8;
      pop.classList.toggle("is-below", below);
      pop.style.left = `${((STAR.x - vx) / vw) * w}px`;
      pop.style.top = `${below ? starY + radius : starY - radius}px`;
    }
  };

  const tick = () => {
    const s = st.current;
    let done = true;
    (["x", "y", "z"] as const).forEach((p) => {
      const d = s.tgt[p] - s.cur[p];
      if (Math.abs(d) > (p === "z" ? 0.002 : 0.3)) {
        s.cur[p] += d * (reduce ? 1 : 0.14);
        done = false;
      } else s.cur[p] = s.tgt[p];
    });
    apply();
    s.raf = done ? 0 : requestAnimationFrame(tick);
  };

  const go = () => {
    const { tgt } = st.current;
    tgt.z = clamp(tgt.z, LIMITS.z[0], LIMITS.z[1]);
    tgt.x = clamp(tgt.x, LIMITS.x[0], LIMITS.x[1]);
    tgt.y = clamp(tgt.y, LIMITS.y[0], LIMITS.y[1]);
    if (!st.current.raf) st.current.raf = requestAnimationFrame(tick);
  };

  const clearRoute = () => {
    cancelAnimationFrame(st.current.route);
    liveRef.current?.setAttribute("d", "");
    if (headRef.current) headRef.current.style.display = "none";
  };

  const home = () => {
    clearRoute();
    st.current.tgt = { ...HOME };
    go();
    setPopOpen(true);
  };

  const route = (place: Place) => {
    const svg = svgRef.current,
      box = boxRef.current,
      live = liveRef.current,
      head = headRef.current;
    const geo = svg?.querySelector<SVGPathElement>(`[data-route="${place}"]`);
    if (!svg || !box || !live || !head || !geo) return;
    clearRoute();
    setPopOpen(false);
    const len = geo.getTotalLength(),
      bb = geo.getBBox();
    const w = box.clientWidth || 1,
      h = box.clientHeight || 1,
      k = scale(w);
    st.current.tgt = {
      x: bb.x + bb.width / 2,
      y: bb.y + bb.height / 2,
      z: Math.min((1000 * 0.5) / bb.width, (1000 * (h / w) * 0.5) / bb.height),
    };
    go();
    const minutes = programme.trajetMaxMinutes;
    const t0 = performance.now() + (reduce ? 0 : 450),
      duration = reduce ? 1 : 2200;
    head.style.display = "";
    const step = () => {
      const q = clamp((performance.now() - t0) / duration, 0, 1);
      const e = q < 0.5 ? 4 * q * q * q : 1 - Math.pow(-2 * q + 2, 3) / 2;
      let d = "";
      for (let i = 0; i <= 48; i++) {
        const p = geo.getPointAtLength((len * e * i) / 48);
        d += `${i ? " L" : "M"}${p.x.toFixed(1)},${p.y.toFixed(1)}`;
      }
      live.setAttribute("d", d);
      const hp = geo.getPointAtLength(len * e);
      head.dataset["x"] = hp.x.toFixed(1);
      head.dataset["y"] = hp.y.toFixed(1);
      head.setAttribute(
        "transform",
        `translate(${head.dataset["x"]} ${head.dataset["y"]}) scale(${(k / st.current.cur.z).toFixed(3)})`,
      );
      if (headLabelRef.current) {
        headLabelRef.current.textContent =
          place === "palm"
            ? q === 1
              ? t.localisation.proximite
              : ""
            : q === 1
              ? t.localisation.moinsDe(minutes)
              : t.localisation.minutes(Math.round(e * minutes));
      }
      if (q < 1) st.current.route = requestAnimationFrame(step);
    };
    step();
  };

  useEffect(() => {
    if (selected) route(selected);
    else if (st.current.mounted) home();
    st.current.mounted = true;
    // Les fonctions ne lisent que des refs : seul le choix de destination compte.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    apply();
    const observer =
      typeof ResizeObserver === "undefined" ? null : new ResizeObserver(() => apply());
    observer?.observe(box);
    const onWheel = (event: WheelEvent) => {
      if (!(event.ctrlKey || event.metaKey)) {
        hintRef.current?.classList.add("is-flash");
        window.clearTimeout(st.current.hint);
        st.current.hint = window.setTimeout(
          () => hintRef.current?.classList.remove("is-flash"),
          900,
        );
        return;
      }
      event.preventDefault();
      const { cur, tgt } = st.current;
      const rect = box.getBoundingClientRect(),
        w = rect.width || 1,
        h = rect.height || 1;
      const mx = (event.clientX - rect.left) / w,
        my = (event.clientY - rect.top) / h;
      const vw = 1000 / cur.z,
        vh = (vw * h) / w,
        wx = cur.x - vw / 2 + mx * vw,
        wy = cur.y - vh / 2 + my * vh;
      const nz = clamp(cur.z * (event.deltaY < 0 ? 1.12 : 1 / 1.12), LIMITS.z[0], LIMITS.z[1]);
      const nvw = 1000 / nz,
        nvh = (nvw * h) / w;
      cur.z = tgt.z = nz;
      cur.x = tgt.x = clamp(wx - (mx - 0.5) * nvw, LIMITS.x[0], LIMITS.x[1]);
      cur.y = tgt.y = clamp(wy - (my - 0.5) * nvh, LIMITS.y[0], LIMITS.y[1]);
      apply();
    };
    box.addEventListener("wheel", onWheel, { passive: false });
    const s = st.current;
    return () => {
      observer?.disconnect();
      box.removeEventListener("wheel", onWheel);
      cancelAnimationFrame(s.raf);
      cancelAnimationFrame(s.route);
      window.clearTimeout(s.hint);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const target = event.target as Element;
    if (target.closest(".mp-ctrl, .mp-pop")) return;
    const { cur } = st.current;
    st.current.drag = {
      px: event.clientX,
      py: event.clientY,
      x: cur.x,
      y: cur.y,
      moved: false,
      target,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.classList.add("is-dragging");
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = st.current.drag,
      box = boxRef.current;
    if (!drag || !box) return;
    const dx = event.clientX - drag.px,
      dy = event.clientY - drag.py;
    if (Math.abs(dx) + Math.abs(dy) > 4) drag.moved = true;
    if (!drag.moved) return;
    const { cur, tgt } = st.current;
    const ratio = 1000 / cur.z / (box.clientWidth || 1);
    cur.x = tgt.x = clamp(drag.x - dx * ratio, LIMITS.x[0], LIMITS.x[1]);
    cur.y = tgt.y = clamp(drag.y - dy * ratio, LIMITS.y[0], LIMITS.y[1]);
    apply();
  };

  const onPointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = st.current.drag;
    if (!drag) return;
    event.currentTarget.classList.remove("is-dragging");
    st.current.drag = null;
    if (drag.moved) return;
    if (drag.target.closest(".mp-star")) setPopOpen((open) => !open);
    const landmark = drag.target.closest<SVGGElement>("[data-place]");
    if (landmark) onSelect(landmark.dataset["place"] as Place);
  };

  const zoom = (factor: number) => {
    st.current.tgt.z = st.current.cur.z * factor;
    go();
  };

  return (
    <div
      ref={boxRef}
      className={`mp${popOpen ? " has-pop" : ""}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
      onPointerCancel={onPointerEnd}
    >
      <svg
        ref={svgRef}
        className="mp-svg"
        viewBox="0 0 1000 700"
        role="img"
        aria-label={t.localisation.carteAria}
      >
        {GEOMETRY.contours.map((d) => (
          <path key={d} className="mp-ct" d={d} />
        ))}
        <circle className="mp-ring" cx="430" cy="440" r="165" />
        <path
          className="mp-road"
          d="M430,440 L100,900 M430,440 L1300,560 M430,440 L700,-300 M430,440 L-300,280 M690,150 L900,-200"
        />
        {GEOMETRY.palms.map((p, i) => (
          <circle key={i} className="mp-palm" cx={p.cx} cy={p.cy} r={p.r} />
        ))}
        <g className="mp-detail">
          {GEOMETRY.details.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        <polygon
          className="mp-medina"
          points="385,380 455,372 492,410 488,478 440,505 380,492 360,440"
        />
        <rect
          className="mp-runway"
          x="235"
          y="582"
          width="110"
          height="8"
          transform="rotate(-24 290 586)"
        />
        {(Object.keys(ROUTES) as Place[]).map((place) => (
          <path key={place} className="mp-geo" data-route={place} d={ROUTES[place]} />
        ))}
        <path ref={liveRef} className="mp-live" d="" />
        {LANDMARKS.map((mark) => (
          <g
            key={mark.id}
            className={`mp-lm${selected === mark.id ? " is-hot" : ""}`}
            data-place={mark.id}
            data-x={mark.x}
            data-y={mark.y}
          >
            {mark.dot && <circle className="mp-dot" r="6" />}
            <text className="mp-long" y={mark.dot ? 36 : 0} textAnchor="middle">
              {t.localisation.reperes[mark.id]}
            </text>
            <text className="mp-short" y={mark.dot ? 36 : 0} textAnchor="middle">
              {t.localisation.reperes[`${mark.id}Court` as const]}
            </text>
          </g>
        ))}
        <g className="mp-star" data-x={STAR.x} data-y={STAR.y}>
          <circle className="mp-halo" r="30" />
          <path
            className="mp-star-shape"
            d="M0,-28C2,-8 8,-2 28,0 8,2 2,8 0,28 -2,8 -8,2 -28,0 -8,-2 -2,-8 0,-28Z"
          />
          <text className="mp-big" y="-46" textAnchor="middle">
            CITYSTAR
          </text>
          <text y="58" textAnchor="middle">
            Oulad Hassoune
          </text>
        </g>
        <g
          ref={headRef}
          className="mp-head"
          data-x={STAR.x}
          data-y={STAR.y}
          style={{ display: "none" }}
        >
          <circle r="8" />
          <text ref={headLabelRef} className="mp-hl" y="-20" textAnchor="middle" />
        </g>
      </svg>

      <div className="mp-ctrl">
        <button type="button" onClick={() => zoom(1.6)} aria-label={t.localisation.zoomPlus}>
          <Plus aria-hidden="true" />
        </button>
        <button type="button" onClick={() => zoom(1 / 1.6)} aria-label={t.localisation.zoomMoins}>
          <Minus aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => {
            onSelect(null);
            home();
          }}
          aria-label={t.localisation.recentrer}
        >
          <LocateFixed aria-hidden="true" />
        </button>
      </div>
      <span ref={hintRef} className="mp-hint" aria-hidden="true">
        <span className="mp-long-hint">{t.localisation.aideLongue}</span>
        <span className="mp-short-hint">{t.localisation.aideCourte}</span>
      </span>

      <div ref={popRef} className={`mp-pop${popOpen ? " is-shown" : ""}`} aria-hidden={!popOpen}>
        <button
          type="button"
          className="mp-pop-x"
          onClick={() => setPopOpen(false)}
          aria-label={t.localisation.fermerFiche}
          tabIndex={popOpen ? 0 : -1}
        >
          <X aria-hidden="true" />
        </button>
        <div className="mp-pop-ph">
          <img src={photo} alt="" loading="lazy" />
        </div>
        <div className="mp-pop-bd">
          <small>{t.localisation.residencePrivee}</small>
          <b>CITYSTAR</b>
          <small className="mp-pop-where">{t.localisation.ou}</small>
          <a href={ITINERARY_URL} target="_blank" rel="noreferrer" tabIndex={popOpen ? 0 : -1}>
            {t.localisation.itineraire} <ArrowRight aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
