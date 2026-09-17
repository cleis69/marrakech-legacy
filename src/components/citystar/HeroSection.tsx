import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";
import { useRef } from "react";

import heroVideo from "@/assets/citystar/hero-video.mp4";
import villaBImage from "@/assets/citystar/villa-b.jpeg";

import { scrollTo } from "./data";

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.09]);
  const heroOpacity = useTransform(heroProgress, [0, 0.85], [1, 0.35]);

  return (
    <section ref={heroRef} id="accueil" className="hero-section">
      <motion.video style={{ scale: heroScale, opacity: heroOpacity }} className="hero-media" autoPlay muted loop playsInline poster={villaBImage}><source src={heroVideo} type="video/mp4" /></motion.video>
      <div className="hero-shade" />
      <div className="hero-content">
        <p className="hero-kicker">Résidence privée · Marrakech</p>
        <h1><span>CITYSTAR</span><em>Marrakech</em></h1>
        <p className="hero-copy">Quatorze villas contemporaines pensées comme un art de vivre.</p>
      </div>
      <button className="explore-link" onClick={() => scrollTo("project")}><span>Explorer Citystar</span><ArrowDown size={17} /></button>
      <span className="hero-index">31.6295° N<br />7.9811° W</span>
    </section>
  );
}
