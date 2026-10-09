import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Check, PhoneCall, Pause, Play, Rotate3d } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import {
  calendrier,
  engagements,
  formatMois,
  formatPart,
  formatSurface,
  programme,
  reservation,
  villasChiffres,
} from "@/config/citystar";
import heroVideo from "@/assets/citystar/hero-rendus.mp4";
import heroPoster from "@/assets/citystar/hero-rendus-poster.webp";

import { useDevise } from "./currency";
import { scrollTo } from "./data";
import { PillButton } from "./ui/PillButton";

/**
 * Hero encadré : la vidéo des rendus, étalonnée, dans un grand cadre arrondi.
 * À gauche, ce qui se vend (où, quoi, combien de mètres, à quelle distance),
 * deux actions et trois garanties ; à droite, la carte de livraison.
 * Au défilement, la vidéo glisse un peu moins vite que la page.
 */
const surfaceMax = Math.max(...Object.values(villasChiffres).map((v) => v.surfaceConstruiteM2));
const acompte = reservation.paliers.find((palier) => palier.etape === "reservation");
export function HeroSection({ onContact }: { onContact: () => void }) {
  const { langue, t } = useDevise();
  const texte = t.hero.texte(
    formatSurface(surfaceMax, langue),
    formatSurface(programme.terrainMaxM2, langue),
    programme.trajetMaxMinutes,
  );
  const garanties = t.hero.garanties(formatPart(engagements.fondsPropres, langue));
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
      <div className="hero-cadre">
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
          <div className="hero-main">
            <p className="hero-chip">{t.hero.lieu}</p>
            <h1 id="hero-title">
              <span className="sr-only">CITYSTAR — </span>
              {t.hero.accroche.map((ligne, i) => (
                <span key={ligne} className="hero-line" style={{ "--i": i } as React.CSSProperties}>
                  {ligne}
                </span>
              ))}
            </h1>
            <p className="hero-texte">{texte}</p>
            <div className="hero-actions">
              <PillButton label={t.hero.acces} icon={PhoneCall} onClick={onContact} />
              <PillButton
                label={t.hero.visite}
                icon={Rotate3d}
                variant="secondary"
                onClick={() => scrollTo("visite")}
              />
            </div>
            <ul className="hero-garanties">
              {garanties.map((garantie) => (
                <li key={garantie}>
                  <Check aria-hidden="true" />
                  {garantie}
                </li>
              ))}
            </ul>
          </div>

          <aside className="hero-carte" aria-label={t.hero.livraisonLabel}>
            <span>{t.hero.livraisonLabel}</span>
            <strong>{formatMois(calendrier.livraison, langue)}</strong>
            {acompte?.confirme && acompte.part != null && (
              <span>{t.hero.reservation(formatPart(acompte.part, langue))}</span>
            )}
          </aside>
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
      </div>
    </section>
  );
}
