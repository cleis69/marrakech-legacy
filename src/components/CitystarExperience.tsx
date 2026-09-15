import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowRight, ChevronLeft, ChevronRight, Download, Expand, MapPin, Menu, MessageCircle, Play, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import heroVideo from "@/assets/citystar/hero-video.mp4";
import architectureImage from "@/assets/citystar/architecture.jpeg";
import villaAImage from "@/assets/citystar/villa-a.jpeg";
import villaBImage from "@/assets/citystar/villa-b.jpeg";
import villaCImage from "@/assets/citystar/villa-c.jpeg";
import lifestyleOne from "@/assets/citystar/lifestyle-1.jpeg";
import lifestyleTwo from "@/assets/citystar/lifestyle-2.jpeg";
import visitImage from "@/assets/citystar/visit.jpeg";
import locationImage from "@/assets/citystar/location.jpeg";
import masterplanImage from "@/assets/citystar/masterplan.jpeg";
import planARdc from "@/assets/citystar/plan-a-rdc.png";
import planAFloor from "@/assets/citystar/plan-a-floor.png";
import planBRdc from "@/assets/citystar/plan-b-rdc.png";
import planBFloor from "@/assets/citystar/plan-b-floor.png";
import planCRdc from "@/assets/citystar/plan-c-rdc.png";
import planCFloor from "@/assets/citystar/plan-c-floor.png";

const villas = [
  { type: "A", image: villaAImage, area: "585 m²", land: "2 000 m²", bedrooms: "5 suites", description: "Pensée pour les résidents à mobilité réduite, avec ascenseur, salles de bains accessibles et espaces généreux pour une circulation fluide.", plans: [planARdc, planAFloor] },
  { type: "B", image: villaBImage, area: "536 m²", land: "2 000 m²", bedrooms: "5 suites", description: "Une architecture exigeante, des matériaux de haute qualité et une conception intelligente, prolongée par de vastes terrasses.", plans: [planBRdc, planBFloor] },
  { type: "C", image: villaCImage, area: "525 m²", land: "2 000 m²", bedrooms: "4 suites", description: "Des volumes contemporains, une piscine privée et des espaces conçus selon les standards architecturaux les plus exigeants.", plans: [planCRdc, planCFloor] },
] as const;

const navItems = [
  ["Le projet", "project"], ["Architecture", "architecture"], ["Les villas", "villas"],
  ["Plans", "plans"], ["Visite 360°", "visite"], ["Localisation", "localisation"],
] as const;

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function CitystarExperience() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeVilla, setActiveVilla] = useState(0);
  const [villaOpen, setVillaOpen] = useState(false);
  const [planOpen, setPlanOpen] = useState<string | null>(null);
  const [tourOpen, setTourOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [cursor, setCursor] = useState({ x: -100, y: -100, label: "" });
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.09]);
  const heroOpacity = useTransform(heroProgress, [0, 0.85], [1, 0.35]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const setCursorLabel = (label: string) => (event: React.MouseEvent) => setCursor({ x: event.clientX, y: event.clientY, label });

  return (
    <main onMouseMove={(e) => cursor.label && setCursor({ ...cursor, x: e.clientX, y: e.clientY })}>
      <motion.div className="page-progress" style={{ scaleX: scrollYProgress }} />
      <div className={`custom-cursor ${cursor.label ? "is-visible" : ""}`} style={{ transform: `translate3d(${cursor.x}px,${cursor.y}px,0)` }}>{cursor.label}</div>

      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <button className="wordmark" onClick={() => scrollTo("accueil")} aria-label="Retour à l’accueil">CITYSTAR</button>
        <nav className="desktop-nav" aria-label="Navigation principale">
          {navItems.map(([label, id]) => <button key={id} onClick={() => scrollTo(id)}>{label}</button>)}
        </nav>
        <button className="appointment-link" onClick={() => setContactOpen(true)}>Prendre rendez-vous <ArrowRight size={14} /></button>
        <button className="menu-trigger" onClick={() => setMenuOpen(true)} aria-label="Ouvrir le menu"><Menu /></button>
      </header>

      <AnimatePresence>{menuOpen && <motion.div className="mobile-menu" initial={{ y: "-100%" }} animate={{ y: 0 }} exit={{ y: "-100%" }} transition={{ duration: .7, ease: [0.76, 0, 0.24, 1] }}>
        <div className="mobile-menu-head"><span>CITYSTAR</span><button onClick={() => setMenuOpen(false)} aria-label="Fermer le menu"><X /></button></div>
        <nav>{navItems.map(([label, id], index) => <motion.button key={id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15 + index * .06 }} onClick={() => { setMenuOpen(false); setTimeout(() => scrollTo(id), 250); }}><small>0{index + 1}</small>{label}</motion.button>)}</nav>
        <button className="mobile-appointment" onClick={() => { setMenuOpen(false); setContactOpen(true); }}>Prendre rendez-vous</button>
      </motion.div>}</AnimatePresence>

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

      <section id="project" className="intro-section section-pad">
        <div className="section-label"><span>01</span><p>Le projet</p></div>
        <div className="intro-grid">
          <Reveal><p className="eyebrow">Une résidence à part</p><h2>L’espace rare<br />d’une vie <em>privée.</em></h2></Reveal>
          <Reveal delay={.15}><div className="intro-copy"><p>CITYSTAR réunit 14 villas de luxe dans un domaine privé et entièrement sécurisé, proche de la Palmeraie. Trois architectures distinctes répondent aux usages et aux préférences de chaque résident.</p><button className="text-link" onClick={() => scrollTo("villas")}>Découvrir les villas <ArrowRight /></button></div></Reveal>
        </div>
        <div className="facts">
          <Fact value="14" label="Villas privées" />
          <Fact value="2 000" suffix="m²" label="Terrains jusqu’à" />
          <Fact value="3" label="Types de villas" />
          <Fact value="35" suffix="min" label="Jemaa el-Fna & aéroport" />
        </div>
      </section>

      <section id="architecture" className="architecture-section">
        <div className="architecture-sticky">
          <ParallaxImage src={architectureImage} alt="Architecture contemporaine d’une villa CITYSTAR à Marrakech" />
          <div className="architecture-overlay">
            <div className="section-label light"><span>02</span><p>Architecture</p></div>
            <Reveal><h2>Vivre Marrakech,<br /><em>autrement.</em></h2></Reveal>
            <p>Des espaces intelligents, des volumes ouverts et des matériaux de haute qualité répondant aux standards européens.</p>
          </div>
        </div>
      </section>

      <section id="villas" className="villas-section section-pad">
        <div className="section-label"><span>03</span><p>Les villas</p></div>
        <div className="villas-heading"><Reveal><h2>Trois expressions.<br />Une même <em>exigence.</em></h2></Reveal><p>Choisissez une résidence dessinée autour de votre façon de vivre.</p></div>
        <div className="villa-gallery">
          {villas.map((villa, index) => <article key={villa.type} className="villa-card" onMouseEnter={setCursorLabel("EXPLORE")} onMouseLeave={() => setCursor({ ...cursor, label: "" })} onClick={() => { setActiveVilla(index); setVillaOpen(true); }}>
            <img src={villa.image} alt={`Villa CITYSTAR Type ${villa.type} à Marrakech`} loading="lazy" />
            <div className="villa-card-shade" />
            <div className="villa-card-top"><span>Type</span><strong>{villa.type}</strong></div>
            <div className="villa-card-bottom"><p>{villa.area} construits</p><p>{villa.land} de terrain</p><ArrowRight /></div>
          </article>)}
        </div>
      </section>

      <section id="lifestyle" className="lifestyle-section section-pad">
        <div className="section-label"><span>04</span><p>L’art de vivre</p></div>
        <div className="lifestyle-intro"><Reveal><h2>Le confort,<br />dans ses moindres <em>détails.</em></h2></Reveal></div>
        <div className="editorial-scene scene-one"><img src={lifestyleOne} alt="Piscine privée et jardin d’une villa CITYSTAR" loading="lazy" /><div><span>01 — Sérénité</span><h3>Un domaine privé,<br />gardé jour et nuit.</h3><p>Chaque villa isolée préserve son intimité, avec des espaces extérieurs et une piscine privée.</p></div></div>
        <div className="editorial-scene scene-two"><div><span>02 — Conscience</span><h3>Conçu pour une vie<br />plus responsable.</h3><p>Les toitures sont équipées de panneaux solaires. Climatisation, parking, aire de jeux et équipements accessibles prolongent le confort quotidien.</p></div><img src={lifestyleTwo} alt="Intérieur lumineux d’une villa de luxe CITYSTAR" loading="lazy" /></div>
      </section>

      <section id="visite" className="tour-section" onMouseEnter={setCursorLabel("OPEN")} onMouseLeave={() => setCursor({ ...cursor, label: "" })} onClick={() => setTourOpen(true)}>
        <img src={visitImage} alt="Aperçu de la visite virtuelle d’une villa CITYSTAR" loading="lazy" />
        <div className="tour-shade" /><div className="tour-content"><span>Visite virtuelle</span><h2>Entrez dans<br /><em>CITYSTAR.</em></h2><button aria-label="Lancer la visite 360 degrés"><Play fill="currentColor" /> Lancer la visite 360°</button></div>
      </section>

      <section id="localisation" className="location-section section-pad">
        <div className="section-label"><span>05</span><p>Localisation</p></div>
        <div className="location-grid">
          <div className="location-image"><img src={locationImage} alt="Environnement de CITYSTAR à Marrakech" loading="lazy" /><span>Marrakech<br />Maroc</span></div>
          <div className="location-copy"><MapPin /><p className="eyebrow">Oulad Hassoune</p><h2>À l’écart.<br /><em>Jamais loin.</em></h2><p>À proximité de la Palmeraie, à moins de 35 minutes de la place Jemaa el-Fna et de l’aéroport de Marrakech.</p><address>Wilaya Marrakech-Safi<br />Préfecture de Marrakech<br />Oulad Hassoune</address></div>
        </div>
        <button className="masterplan" onClick={() => setPlanOpen(masterplanImage)}><img src={masterplanImage} alt="Plan de situation de la résidence CITYSTAR" loading="lazy" /><span><Expand /> Agrandir le plan de situation</span></button>
      </section>

      <section id="contact" className="final-cta">
        <span>Votre résidence à Marrakech vous attend.</span><h2>Découvrir CITYSTAR<br /><em>en personne.</em></h2><button onClick={() => setContactOpen(true)}>Prendre rendez-vous <ArrowRight /></button>
      </section>

      <footer>
        <div className="footer-brand">CITYSTAR<small>Marrakech</small></div>
        <div><p>Navigation</p>{navItems.slice(0, 4).map(([label, id]) => <button key={id} onClick={() => scrollTo(id)}>{label}</button>)}</div>
        <div><p>Contact</p><a href="tel:+212661825359">+212 661-825359</a><a href="mailto:Promoimmomarrakech@gmail.com">Promoimmomarrakech@gmail.com</a><span>Oulad Hassoune, Marrakech</span></div>
        <div><p>Documents</p><a href="/brochures/citystar.pdf" target="_blank">Brochure CITYSTAR <Download /></a><button onClick={() => setTourOpen(true)}>Visite 360° <ArrowRight /></button></div>
        <div className="footer-bottom"><span>© 2026 CITYSTAR. Tous droits réservés.</span><span>Résidence privée · Marrakech</span></div>
      </footer>

      <a className="whatsapp" href="https://wa.me/212661825359" target="_blank" rel="noreferrer" aria-label="Contacter CITYSTAR sur WhatsApp"><MessageCircle /></a>
      <button className="mobile-sticky-cta" onClick={() => setContactOpen(true)}>Prendre rendez-vous</button>

      <AnimatePresence>{villaOpen && <VillaModal villa={villas[activeVilla]} onClose={() => setVillaOpen(false)} onPlan={setPlanOpen} onPrev={() => setActiveVilla((activeVilla + 2) % 3)} onNext={() => setActiveVilla((activeVilla + 1) % 3)} />}</AnimatePresence>
      <AnimatePresence>{planOpen && <motion.div className="plan-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><button onClick={() => setPlanOpen(null)} aria-label="Fermer le plan"><X /></button><img src={planOpen} alt="Plan architectural CITYSTAR en grand format" /></motion.div>}</AnimatePresence>
      <AnimatePresence>{tourOpen && <motion.div className="tour-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><button onClick={() => setTourOpen(false)} aria-label="Fermer la visite"><X /></button><iframe src="https://momento360.com/e/u/d4658634f15c4a3fa6fdb5ef818d3e5a?utm_campaign=embed&utm_source=other&heading=0&pitch=0&field-of-view=75&size=medium&display-plan=true" title="Visite virtuelle 360° CITYSTAR" allowFullScreen /></motion.div>}</AnimatePresence>
      <AnimatePresence>{contactOpen && <ContactPanel onClose={() => setContactOpen(false)} />}</AnimatePresence>
    </main>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return <motion.div initial={{ opacity: 0, y: 55 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-12%" }} transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

function Fact({ value, suffix, label }: { value: string; suffix?: string; label: string }) {
  return <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .8 }}><strong>{value}<sup>{suffix}</sup></strong><span>{label}</span></motion.div>;
}

function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null); const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] }); const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return <div className="parallax-wrap" ref={ref}><motion.img style={{ y }} src={src} alt={alt} loading="lazy" /></div>;
}

function VillaModal({ villa, onClose, onPlan, onPrev, onNext }: { villa: typeof villas[number]; onClose: () => void; onPlan: (src: string) => void; onPrev: () => void; onNext: () => void }) {
  return <motion.div className="villa-modal" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: .75, ease: [0.76, 0, 0.24, 1] }}>
    <button className="modal-close" onClick={onClose}><X /> Fermer</button><div className="villa-modal-image"><img src={villa.image} alt={`Villa Type ${villa.type}`} /></div>
    <div className="villa-modal-copy"><p className="eyebrow">Villa Type {villa.type}</p><h2>Type <em>{villa.type}</em></h2><p>{villa.description}</p><div className="modal-facts"><span><strong>{villa.area}</strong>Surface construite</span><span><strong>{villa.land}</strong>Surface totale</span><span><strong>{villa.bedrooms}</strong>Configuration</span></div>
      <div id="plans" className="plan-thumbs">{villa.plans.map((plan, i) => <button key={plan} onClick={() => onPlan(plan)}><img src={plan} alt={`Plan ${i ? "étage" : "rez-de-chaussée"} villa ${villa.type}`} /><span>{i ? "Étage" : "Rez-de-chaussée"} <Expand /></span></button>)}</div>
      <a className="brochure-link" href={`/brochures/villa-${villa.type.toLowerCase()}.pdf`} target="_blank">Télécharger la brochure <Download /></a>
      <div className="modal-nav"><button onClick={onPrev}><ChevronLeft /> Type précédent</button><button onClick={onNext}>Type suivant <ChevronRight /></button></div>
    </div>
  </motion.div>;
}

function ContactPanel({ onClose }: { onClose: () => void }) {
  return <motion.aside className="contact-panel" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: .65, ease: [0.76, 0, 0.24, 1] }}><button className="modal-close" onClick={onClose}><X /> Fermer</button><div><p className="eyebrow">Rencontrons-nous</p><h2>Planifier<br /><em>une visite.</em></h2><p>Notre équipe vous accompagne dans la découverte de CITYSTAR et de ses trois types de villas.</p>
    <form action="mailto:Promoimmomarrakech@gmail.com" method="post" encType="text/plain"><label>Nom complet<input name="Nom" required /></label><label>Téléphone<input type="tel" name="Téléphone" required /></label><label>E-mail<input type="email" name="Email" required /></label><label>Votre intérêt<select name="Intérêt"><option>Découvrir le projet</option><option>Villa Type A</option><option>Villa Type B</option><option>Villa Type C</option><option>Planifier une visite</option></select></label><button type="submit">Envoyer ma demande <ArrowRight /></button></form>
    <div className="direct-contact"><a href="tel:+212661825359">+212 661-825359</a><a href="mailto:Promoimmomarrakech@gmail.com">Promoimmomarrakech@gmail.com</a></div></div></motion.aside>;
}