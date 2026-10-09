import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight, PhoneCall, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { calendrier, engagements, formatMois, formatPart } from "@/config/citystar";
import heroVideo from "@/assets/citystar/hero-rendus.mp4";
import heroPoster from "@/assets/citystar/hero-rendus-poster.webp";

import { useDevise } from "./currency";
import { scrollTo } from "./data";
import { PillButton } from "./ui/PillButton";

/**
 * Hero « plein cadre » : la vidéo des rendus occupe tout l'écran, étalonnée
 * pour adoucir le ciel et le gazon. L'accroche se pose en bas, sur un voile
 * d'encre ; au défilement, la vidéo glisse un peu moins vite que la page.
 */
export function HeroSection({ onContact }: { onContact: () => void }) {
  const { langue, t } = useDevise();
  const preuves = t.hero.preuves(
    formatMois(calendrier.livraison, langue),
    formatPart(engagements.fondsPropres, langue),
  );
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [playing, setPlaying] = useState(false);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);

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
    <section ref={heroRef} id="accueil" className="hero" aria-labelledby="hero-title">
      <div className="hero-media">
        <motion.video
          ref={videoRef}
          className="hero-video"
          style={reduce ? {} : { y: videoY }}
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
      </div>
      <div className="hero-shade" aria-hidden="true" />

      <div className="hero-bottom">
        <div className="hero-title">
          <h1 id="hero-title">
            <span className="sr-only">CITYSTAR — </span>
            {t.hero.accroche.map((ligne, i) => (
              <span key={ligne} className="hero-line" style={{ "--i": i } as React.CSSProperties}>
                {ligne}
              </span>
            ))}
          </h1>
          <p className="hero-lieu">{t.hero.lieu}</p>
        </div>

        <div className="hero-side">
          <p>{t.hero.texte}</p>
          <div className="hero-actions">
            <PillButton label={t.hero.acces} icon={PhoneCall} onClick={onContact} />
            <PillButton
              label={t.hero.decouvrir}
              icon={ArrowRight}
              variant="secondary"
              onClick={() => scrollTo("villas")}
            />
          </div>
          <ul className="hero-preuves">
            {preuves.map((preuve) => (
              <li key={preuve}>{preuve}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="hero-foot">
        <button
          className="hero-pause"
          onClick={toggleVideo}
          aria-label={playing ? t.hero.pause : t.hero.lecture}
        >
          {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
          <span>{playing ? t.hero.pauseCourt : t.hero.lectureCourt}</span>
        </button>
        <p>{t.hero.rendu}</p>
      </div>
    </section>
  );
}
