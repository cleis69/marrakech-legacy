import { AnimatePresence, motion } from "motion/react";
import {
  CircleHelp,
  DoorOpen,
  Download,
  KeyRound,
  LayoutPanelLeft,
  PhoneCall,
  Menu,
  MessageCircle,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

import { brochures, contact, formatDecimal } from "@/config/citystar";

import { useRouterState } from "@tanstack/react-router";

import { useDevise } from "./currency";
import { chemin, cheminEspace, fichierPublic, Lien, traduireSous } from "./liens";
import { useModal } from "./useModal";

type Props = {
  scrolled: boolean;
  menuOpen: boolean;
  onOpenMenu: () => void;
  onCloseMenu: () => void;
  onContact: () => void;
};

const whatsappHref = `https://wa.me/${contact.whatsapp}`;

function LangSwitch({ className = "" }: { className?: string }) {
  const { t } = useDevise();
  /* La bascule garde la page courante : /villas ↔ /en/villas. */
  const chemin = useRouterState({ select: (etat) => etat.location.pathname });
  const sous =
    chemin === "/en" ? "" : chemin.startsWith("/en/") ? chemin.slice(4) : chemin.replace(/^\//, "");
  /* Les adresses traduites (villa-de-luxe-marrakech ↔ luxury-villa-marrakech) suivent la bascule. */
  const anglais = chemin.startsWith("/en") ? sous : traduireSous(sous);
  const francais = chemin.startsWith("/en") ? traduireSous(sous) : sous;
  return (
    <div className={`lang-switch ${className}`.trim()} role="group" aria-label={t.header.langue}>
      <Lien vers={francais ? `/${francais}` : "/"} hrefLang="fr">
        FR
      </Lien>
      <span aria-hidden="true">|</span>
      <Lien vers={anglais ? `/en/${anglais}` : "/en"} hrefLang="en">
        EN
      </Lien>
    </div>
  );
}

function MenuSheet({ onClose, onContact }: { onClose: () => void; onContact: () => void }) {
  const { langue, t } = useDevise();
  const ref = useModal<HTMLDivElement>(onClose);
  return (
    <>
      <motion.div
        className="sheet-scrim"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="menu-sheet-title"
        tabIndex={-1}
        className="menu-sheet"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="menu-sheet-handle" aria-hidden="true" />
        <div className="menu-sheet-head">
          <p id="menu-sheet-title">{t.header.sommaire}</p>
          <LangSwitch />
          <button onClick={onClose} aria-label={t.header.fermer}>
            <X />
          </button>
        </div>
        <nav aria-label={t.header.sommaire}>
          <ol>
            {t.nav.map(([label, sous], index) => (
              <li key={sous || "accueil"}>
                <Lien vers={chemin(langue, sous)} onMouseLeave={onClose}>
                  <small>{String(index + 1).padStart(2, "0")}</small>
                  {label}
                </Lien>
              </li>
            ))}
          </ol>
        </nav>
        <div className="menu-sheet-links">
          <a href={whatsappHref} target="_blank" rel="noreferrer">
            <MessageCircle aria-hidden="true" />
            {t.header.conciergerie}
          </a>
          <a href={fichierPublic(brochures.citystar.fichier)} target="_blank" rel="noreferrer">
            <Download aria-hidden="true" />
            {t.header.brochure}
            <small>{t.header.poids(formatDecimal(brochures.citystar.mo, langue))}</small>
          </a>
          <Lien vers={cheminEspace(langue)}>
            <KeyRound aria-hidden="true" />
            {t.header.espace}
          </Lien>
        </div>
        <button
          className="menu-sheet-cta"
          onClick={() => {
            onClose();
            onContact();
          }}
        >
          <PhoneCall aria-hidden="true" />
          {t.header.demander}
        </button>
      </motion.div>
    </>
  );
}

export function SiteHeader({ scrolled, menuOpen, onOpenMenu, onCloseMenu, onContact }: Props) {
  const { langue, t } = useDevise();
  /* Transparent seulement en haut de l'accueil, posé sur la vidéo ; partout ailleurs, un aplat d'encre. */
  const page = useRouterState({ select: (etat) => etat.location.pathname });
  const solide = scrolled || !/^\/(en\/?)?$/.test(page);
  const tab = (sous: string, label: string, Icon: typeof DoorOpen) => (
    <Lien className="tabbar-item" vers={chemin(langue, sous)}>
      <Icon aria-hidden="true" />
      <span>{label}</span>
    </Lien>
  );

  return (
    <>
      <header className={`float-header ${solide ? "is-solid" : ""}`}>
        <div className="float-start">
          <nav className="float-nav" aria-label="Navigation">
            {/* L'accueil passe par le nom, au centre. */}
            {t.nav.slice(1).map(([label, sous]) => (
              <Lien key={sous} vers={chemin(langue, sous)}>
                {label}
              </Lien>
            ))}
          </nav>
          <button
            className="float-menu"
            onClick={onOpenMenu}
            aria-expanded={menuOpen}
            aria-haspopup="dialog"
          >
            {t.header.menu}
          </button>
        </div>
        <Lien className="float-wordmark" vers={chemin(langue, "")} ariaLabel={t.header.accueil}>
          CITYSTAR
        </Lien>
        <div className="float-actions">
          <LangSwitch />
          <Lien className="float-espace" vers={cheminEspace(langue)}>
            {t.header.espace}
          </Lien>
          <button className="float-cta" onClick={onContact}>
            {t.header.acces}
          </button>
          <a
            className="float-concierge"
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            aria-label={t.header.conciergerie}
          >
            <span className="float-concierge-label">{t.header.conciergerie}</span>
            <MessageCircle aria-hidden="true" />
          </a>
        </div>
      </header>

      <nav className="tabbar" aria-label="Navigation">
        {tab("villas", t.header.villas, DoorOpen)}
        {tab("galerie", t.header.galerie, LayoutPanelLeft)}
        <button className="tabbar-fab" onClick={onContact}>
          <i aria-hidden="true">
            <PhoneCall />
          </i>
          <span>{t.header.rappelCourt}</span>
        </button>
        {tab("faq", t.header.questions, CircleHelp)}
        <button
          className="tabbar-item"
          onClick={onOpenMenu}
          aria-expanded={menuOpen}
          aria-haspopup="dialog"
        >
          <Menu aria-hidden="true" />
          <span>{t.header.menu}</span>
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && <MenuSheet onClose={onCloseMenu} onContact={onContact} />}
      </AnimatePresence>
    </>
  );
}
