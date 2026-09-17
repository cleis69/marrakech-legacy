import { ArrowRight, Download, Mail, MessageCircle, Phone, Star, Youtube, Instagram } from "lucide-react";
import { useInView } from "motion/react";
import { useRef } from "react";

import { contact } from "@/config/citystar";

import { navItems, scrollTo } from "./data";
import { Seal } from "./ui/Seal";

export function SiteFooter() {
  const wordRef = useRef<HTMLDivElement>(null);
  const wordInView = useInView(wordRef, { once: true, amount: 0.4 });
  const tiles = [
    { href: `tel:${contact.telephone}`, icon: Phone, kicker: "Appeler", value: contact.telephoneAffiche, external: false },
    { href: `https://wa.me/${contact.whatsapp}`, icon: MessageCircle, kicker: "WhatsApp", value: "Conciergerie", external: true },
    { href: `mailto:${contact.email}`, icon: Mail, kicker: "Écrire", value: contact.email, external: false },
  ];

  return (
    <footer className="ft">
      <div className="ft-head">
        <Seal className="ft-seal" text="RÉSIDENCE PRIVÉE · CITYSTAR · MARRAKECH · " icon={Star} />
        <h2>Un contact <em>direct.</em></h2>
        <div className="ft-social">
          <a href={contact.reseaux.instagram} target="_blank" rel="noreferrer" aria-label="CITYSTAR sur Instagram"><Instagram aria-hidden="true" /></a>
          <a href={contact.reseaux.youtube} target="_blank" rel="noreferrer" aria-label="CITYSTAR sur YouTube"><Youtube aria-hidden="true" /></a>
        </div>
      </div>

      <div className="ft-tiles">
        {tiles.map(({ href, icon: Icon, kicker, value, external }) => (
          <a key={kicker} className="ft-tile" href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
            <i aria-hidden="true"><Icon /></i>
            <span><small>{kicker}</small><b>{value.includes("@") ? <>{value.split("@")[0]}@<wbr />{value.split("@")[1]}</> : value}</b></span>
            <ArrowRight aria-hidden="true" />
          </a>
        ))}
      </div>

      <div className="ft-bar">
        <nav className="ft-links" aria-label="Pied de page">
          {navItems.map(([label, id]) => <button key={id} type="button" onClick={() => scrollTo(id)}>{label}</button>)}
          <a href="/brochures/citystar.pdf" target="_blank" rel="noreferrer">Brochure <Download aria-hidden="true" /></a>
        </nav>
        <p className="ft-legal">© {new Date().getFullYear()} CITYSTAR · Résidence privée · Oulad Hassoune, Marrakech</p>
      </div>

      <div ref={wordRef} className={`ft-giant${wordInView ? " is-in" : ""}`} aria-hidden="true">
        {"CITYSTAR".split("").map((letter, i) => <span key={i} style={{ "--i": i } as React.CSSProperties}>{letter}</span>)}
      </div>
    </footer>
  );
}
