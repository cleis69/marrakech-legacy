import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { PhoneCall, Pause, Play, Rotate3d } from "lucide-react";
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
import heroVideo from "@/assets/citystar/hero-film.mp4";
import heroPoster from "@/assets/citystar/hero-film-poster.webp";

import { useDevise } from "./currency";
import { scrollTo } from "./data";
import { PillButton } from "./ui/PillButton";

/**
 * Hero encadré : le film du domaine dans un grand cadre arrondi. À gauche, le
 * titre avec le chiffre du programme en grand, la phrase, deux actions ; à
 * droite, trois cartes en verre (plan de paiement, notaire, livraison).
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
  const part = acompte?.confirme && acompte.part != null ? formatPart(acompte.part, langue) : null;
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

  const cartes = t.hero.cartes;

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
              <span className="hero-line" style={{ "--i": 0 } as React.CSSProperties}>
                {t.hero.accroche[0]}
              </span>{" "}
              <span
                className="hero-line hero-line-chiffre"
                style={{ "--i": 1 } as React.CSSProperties}
              >
                <strong className="hero-chiffre">{programme.nombreVillas}</strong>{" "}
                <span>{t.hero.accroche[1]}</span>
              </span>
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
          </div>

          {/* Trois cartes en verre : ce qui rassure, lisible d'un coup d'œil. */}
          <ul className="hero-cartes" aria-label={t.hero.cartesLabel}>
            {part && (
              <li className="hero-verre" style={{ "--i": 0 } as React.CSSProperties}>
                <span className="hero-verre-titre">{cartes.paiement.titre}</span>
                <strong>{part}</strong>
                <span className="hero-verre-texte">{cartes.paiement.texte}</span>
              </li>
            )}
            <li className="hero-verre" style={{ "--i": 1 } as React.CSSProperties}>
              <span className="hero-verre-titre">{cartes.notaire.titre}</span>
              <strong>{cartes.notaire.fort}</strong>
              <span className="hero-verre-texte">{cartes.notaire.texte}</span>
            </li>
            <li className="hero-verre" style={{ "--i": 2 } as React.CSSProperties}>
              <span className="hero-verre-titre">{cartes.livraison.titre}</span>
              <strong>{formatMois(calendrier.livraison, langue)}</strong>
              <span className="hero-verre-texte">
                {cartes.livraison.texte(formatPart(engagements.fondsPropres, langue))}
              </span>
            </li>
          </ul>
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
