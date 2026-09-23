import {
  ArrowRight,
  Download,
  Mail,
  MessageCircle,
  Phone,
  Star,
  Youtube,
  Instagram,
} from "lucide-react";
import { useInView } from "motion/react";
import { useRef } from "react";

import { contact } from "@/config/citystar";

import { useDevise } from "./currency";
import { chemin, Lien } from "./liens";
import { Seal } from "./ui/Seal";

export function SiteFooter() {
  const { langue, t } = useDevise();
  const wordRef = useRef<HTMLDivElement>(null);
  const wordInView = useInView(wordRef, { once: true, amount: 0.4 });
  const tiles = [
    {
      href: `tel:${contact.telephone}`,
      icon: Phone,
      kicker: t.pied.appeler,
      value: contact.telephoneAffiche,
      external: false,
    },
    {
      href: `https://wa.me/${contact.whatsapp}`,
      icon: MessageCircle,
      kicker: t.pied.whatsapp,
      value: t.pied.conciergerie,
      external: true,
    },
    {
      href: `mailto:${contact.email}`,
      icon: Mail,
      kicker: t.pied.ecrire,
      value: contact.email,
      external: false,
    },
  ];

  return (
    <footer className="ft">
      <div className="ft-head">
        <Seal className="ft-seal" text={t.pied.sceau} icon={Star} />
        <h2>
          {t.pied.titre[0]}
          <em>{t.pied.titre[1]}</em>
        </h2>
        <div className="ft-social">
          <a
            href={contact.reseaux.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label={t.pied.instagram}
          >
            <Instagram aria-hidden="true" />
          </a>
          <a
            href={contact.reseaux.youtube}
            target="_blank"
            rel="noreferrer"
            aria-label={t.pied.youtube}
          >
            <Youtube aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="ft-tiles">
        {tiles.map(({ href, icon: Icon, kicker, value, external }) => (
          <a
            key={kicker}
            className="ft-tile"
            href={href}
            {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
          >
            <i aria-hidden="true">
              <Icon />
            </i>
            <span>
              <small>{kicker}</small>
              <b>
                {value.includes("@") ? (
                  <>
                    {value.split("@")[0]}@<wbr />
                    {value.split("@")[1]}
                  </>
                ) : (
                  value
                )}
              </b>
            </span>
            <ArrowRight aria-hidden="true" />
          </a>
        ))}
      </div>

      <div className="ft-bar">
        <nav className="ft-links" aria-label={t.pied.nav}>
          {t.nav.map(([label, sous]) => (
            <Lien key={sous || "accueil"} vers={chemin(langue, sous)}>
              {label}
            </Lien>
          ))}
          <Lien vers={chemin(langue, t.pied.theme[1])}>{t.pied.theme[0]}</Lien>
          <a href="/brochures/citystar.pdf" target="_blank" rel="noreferrer">
            {t.pied.brochure} <Download aria-hidden="true" />
          </a>
        </nav>
        <p className="ft-legal">{t.pied.legal(new Date().getFullYear())}</p>
      </div>

      <div ref={wordRef} className={`ft-giant${wordInView ? " is-in" : ""}`} aria-hidden="true">
        {"CITYSTAR".split("").map((letter, i) => (
          <span key={i} style={{ "--i": i } as React.CSSProperties}>
            {letter}
          </span>
        ))}
      </div>
    </footer>
  );
}
