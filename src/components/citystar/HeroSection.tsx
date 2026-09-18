import { type MotionStyle, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { programme } from "@/config/citystar";
import heroVideo from "@/assets/citystar/hero-video.mp4";
import heroPoster from "@/assets/citystar/hero-poster.webp";

import { useDevise } from "./currency";
import { scrollTo } from "./data";
import { PillButton } from "./ui/PillButton";

const TITLE = "CITYSTAR";

/**
 * Hero « passe-partout » : la vidéo est encadrée par une marge couleur papier.
 * À l'arrivée, la fenêtre s'ouvre depuis le centre ; au défilement, la marge
 * s'efface et la vidéo passe en plein écran.
 */
export function HeroSection() {
  const { t } = useDevise();
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [playing, setPlaying] = useState(false);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end end"] });
  const open = useTransform(scrollYProgress, [0, 0.7], [0, 1]);
  const videoScale = useTransform(scrollYProgress, [0, 0.7], [1.06, 1]);

  /* Mouvement réduit : la vidéo reste sur son image fixe. */
  useEffect(() => {
    if (reduce) videoRef.current?.pause();
    else setPlaying(!!videoRef.current && !videoRef.current.paused);
  }, [reduce]);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play().catch(() => setPlaying(false));
    else video.pause();
  };

  return (
    <section
      ref={heroRef}
      id="accueil"
      className="pp-hero"
      aria-label={`CITYSTAR — ${t.hero.kicker}`}
    >
      <div className="pp-sticky">
        <span className="pp-caption pp-caption-left" aria-hidden="true">
          {t.hero.lieu}
        </span>
        <span className="pp-caption pp-caption-right" aria-hidden="true">
          {t.hero.residence(programme.nombreVillas)}
        </span>

        <motion.div
          className="pp-frame"
          style={reduce ? {} : ({ "--open": open } as unknown as MotionStyle)}
        >
          <div className="pp-reveal">
            <motion.video
              ref={videoRef}
              className="pp-video"
              style={reduce ? {} : { scale: videoScale }}
              autoPlay
              muted
              loop
              playsInline
              poster={heroPoster}
              aria-hidden="true"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
            >
              <source src={heroVideo} type="video/mp4" />
            </motion.video>
            <div className="pp-shade" aria-hidden="true" />

            <div className="pp-title">
              <p className="pp-kicker">{t.hero.kicker}</p>
              <h1 aria-label={TITLE}>
                {TITLE.split("").map((letter, i) => (
                  <span key={i} aria-hidden="true" style={{ "--i": i } as React.CSSProperties}>
                    {letter}
                  </span>
                ))}
              </h1>
            </div>

            <div className="pp-side">
              <p>{t.hero.texte}</p>
              <PillButton
                label={t.hero.decouvrir}
                icon={ArrowRight}
                variant="secondary"
                onClick={() => scrollTo("villas")}
              />
            </div>

            <button
              className="pp-pause"
              onClick={toggleVideo}
              aria-label={playing ? t.hero.pause : t.hero.lecture}
            >
              {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
              <span>{playing ? "Pause" : "Lecture"}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
