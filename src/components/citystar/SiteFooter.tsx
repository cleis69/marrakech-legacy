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

import revLogo from "@/assets/credits/rev.svg";
import ultravisionLogo from "@/assets/credits/ultravision.svg";

import { brochures, contact, formatDecimal } from "@/config/citystar";

import { useRouterState } from "@tanstack/react-router";

import { useDevise } from "./currency";
import { chemin, fichierPublic, Lien } from "./liens";
import { Seal } from "./ui/Seal";

export function SiteFooter() {
  const { langue, t } = useDevise();
  /* Sur /contact, les trois tuiles sont déjà le contenu de la page. */
  const surContact = useRouterState({
    select: (etat) => /\/contact\/?$/.test(etat.location.pathname),
  });
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

      {!surContact && (
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
      )}

      <div className="ft-bar">
        <nav className="ft-links" aria-label={t.pied.nav}>
          {t.nav.map(([label, sous]) => (
            <Lien key={sous || "accueil"} vers={chemin(langue, sous)}>
              {label}
            </Lien>
          ))}
          <Lien vers={chemin(langue, t.pied.theme[1])}>{t.pied.theme[0]}</Lien>
          <a href={fichierPublic(brochures.citystar.fichier)} target="_blank" rel="noreferrer">
            {t.pied.brochure}
            <small>{t.header.poids(formatDecimal(brochures.citystar.mo, langue))}</small>
            <Download aria-hidden="true" />
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
      <p className="ft-credits">
        <span>{t.pied.realise}</span>
        <a href="https://ultravisionagency.com" target="_blank" rel="noopener">
          <img src={ultravisionLogo} alt="Ultravision" width="66" height="26" />
        </a>
        <span>{t.pied.propulse}</span>
        <a href="https://realestatevision360.com" target="_blank" rel="noopener">
          <img src={revLogo} alt="REV — Real Estate Vision" width="64" height="26" />
        </a>
      </p>
    </footer>
  );
}
