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

import { Link } from "@tanstack/react-router";

import { useDevise } from "./currency";
import { scrollTo } from "./data";
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

/** Section visible au centre de l'écran, pour marquer l'onglet actif de la barre mobile. */
function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!elements.length || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

const MOBILE_TABS = ["villas", "plans", "visite"] as const;

function LangSwitch({ className = "" }: { className?: string }) {
  const { t } = useDevise();
  return (
    <div className={`lang-switch ${className}`.trim()} role="group" aria-label={t.header.langue}>
      <Link to="/" hrefLang="fr">
        FR
      </Link>
      <span aria-hidden="true">|</span>
      <Link to="/en" hrefLang="en">
        EN
      </Link>
    </div>
  );
}

function MenuSheet({
  onClose,
  onContact,
  active,
}: {
  onClose: () => void;
  onContact: () => void;
  active: string | null;
}) {
  const { t } = useDevise();
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
            {t.nav.map(([label, id], index) => (
              <li key={id}>
                <button
                  className={active === id ? "is-active" : ""}
                  aria-current={active === id ? "true" : undefined}
                  onClick={() => {
                    onClose();
                    setTimeout(() => scrollTo(id), 300);
                  }}
                >
                  <small>{String(index + 1).padStart(2, "0")}</small>
                  {label}
                </button>
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
  const { t } = useDevise();
  const active = useActiveSection(MOBILE_TABS);
  const tab = (id: (typeof MOBILE_TABS)[number], label: string, Icon: typeof Building2) => (
    <button
      className={`tabbar-item ${active === id ? "is-active" : ""}`}
      aria-current={active === id ? "true" : undefined}
      onClick={() => scrollTo(id)}
    >
      <Icon aria-hidden="true" />
      <span>{label}</span>
    </button>
  );

  return (
    <>
      <header className={`float-header ${scrolled ? "is-scrolled" : ""}`}>
        <button
          className="float-wordmark"
          onClick={() => scrollTo("accueil")}
          aria-label={t.header.accueil}
        >
          CITYSTAR
        </button>
        <nav className="float-nav" aria-label="Navigation">
          {t.nav.map(([label, id]) => (
            <button key={id} onClick={() => scrollTo(id)}>
              {label}
            </button>
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
        {tab("plans", t.header.plans, LayoutPanelLeft)}
        <button className="tabbar-fab" onClick={onContact}>
          <i aria-hidden="true">
            <Lock />
          </i>
          <span>{t.header.acces}</span>
        </button>
        {tab("visite", t.header.tour, Rotate3d)}
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
        {menuOpen && <MenuSheet onClose={onCloseMenu} onContact={onContact} active={active} />}
      </AnimatePresence>
    </>
  );
}
