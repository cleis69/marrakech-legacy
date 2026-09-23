import { AnimatePresence, motion } from "motion/react";
import {
  Building2,
  Download,
  LayoutPanelLeft,
  Lock,
  Menu,
  MessageCircle,
  Rotate3d,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

import { contact } from "@/config/citystar";

import { useRouterState } from "@tanstack/react-router";

import { useDevise } from "./currency";
import { chemin, Lien, traduireSous } from "./liens";
import { PillButton } from "./ui/PillButton";
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
          <a href="/brochures/citystar.pdf" target="_blank" rel="noreferrer">
            <Download aria-hidden="true" />
            {t.header.brochure}
          </a>
        </div>
        <button
          className="menu-sheet-cta"
          onClick={() => {
            onClose();
            onContact();
          }}
        >
          <Lock aria-hidden="true" />
          {t.header.demander}
        </button>
      </motion.div>
    </>
  );
}

export function SiteHeader({ scrolled, menuOpen, onOpenMenu, onCloseMenu, onContact }: Props) {
  const { langue, t } = useDevise();
  const tab = (sous: string, label: string, Icon: typeof Building2) => (
    <Lien className="tabbar-item" vers={chemin(langue, sous)}>
      <Icon aria-hidden="true" />
      <span>{label}</span>
    </Lien>
  );

  return (
    <>
      <header className={`float-header ${scrolled ? "is-scrolled" : ""}`}>
        <Lien className="float-wordmark" vers={chemin(langue, "")} ariaLabel={t.header.accueil}>
          CITYSTAR
        </Lien>
        <nav className="float-nav" aria-label="Navigation">
          {t.nav.map(([label, sous]) => (
            <Lien key={sous || "accueil"} vers={chemin(langue, sous)}>
              {label}
            </Lien>
          ))}
        </nav>
        <div className="float-actions">
          <LangSwitch className="float-lang" />
          <PillButton
            label={t.header.acces}
            icon={Lock}
            onClick={onContact}
            className="float-cta"
          />
          <a className="float-concierge" href={whatsappHref} target="_blank" rel="noreferrer">
            {t.header.conciergerie} <MessageCircle aria-hidden="true" />
          </a>
        </div>
      </header>

      <nav className="tabbar" aria-label="Navigation">
        {tab("villas", t.header.villas, Building2)}
        {tab("galerie", t.header.galerie, LayoutPanelLeft)}
        <button className="tabbar-fab" onClick={onContact}>
          <i aria-hidden="true">
            <Lock />
          </i>
          <span>{t.header.acces}</span>
        </button>
        {tab("faq", t.header.questions, Rotate3d)}
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
