import { AnimatePresence, motion } from "motion/react";
import {
  ChevronDown,
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
import { useEffect, useRef, useState } from "react";

import { type Langue, LANGUES, brochures, contact, formatDecimal } from "@/config/citystar";

import { useRouterState } from "@tanstack/react-router";

import { useDevise } from "./currency";
import { chemin, cheminEspace, fichierPublic, Lien, memePage } from "./liens";
import { useModal } from "./useModal";

type Props = {
  scrolled: boolean;
  menuOpen: boolean;
  onOpenMenu: () => void;
  onCloseMenu: () => void;
  onContact: () => void;
};

const whatsappHref = `https://wa.me/${contact.whatsapp}`;

const NOMS_LANGUES: Record<Langue, string> = {
  fr: "Français",
  en: "English",
  es: "Español",
  it: "Italiano",
  nl: "Nederlands",
  no: "Norsk",
};

/**
 * Choix de la langue. Dans l'en-tête, un bouton ouvre la liste des six langues
 * (Échap ou un clic ailleurs la referme) ; dans le menu mobile, les six codes
 * sont posés à plat. Chaque lien garde la page courante, adresse traduite comprise.
 */
function LangSwitch({ aPlat = false }: { aPlat?: boolean }) {
  const { langue, t } = useDevise();
  const page = useRouterState({ select: (etat) => etat.location.pathname });
  const [ouvert, setOuvert] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ouvert) return;
    const dehors = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOuvert(false);
    };
    const echap = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOuvert(false);
    };
    document.addEventListener("pointerdown", dehors);
    document.addEventListener("keydown", echap);
    return () => {
      document.removeEventListener("pointerdown", dehors);
      document.removeEventListener("keydown", echap);
    };
  }, [ouvert]);

  if (aPlat)
    return (
      <div className="lang-switch" role="group" aria-label={t.header.langue}>
        {LANGUES.map((code) => (
          <Lien
            key={code}
            vers={memePage(page, code)}
            hrefLang={code}
            ariaLabel={NOMS_LANGUES[code]}
          >
            {code.toUpperCase()}
          </Lien>
        ))}
      </div>
    );

  return (
    <div className="lang-menu" ref={ref}>
      <button
        type="button"
        className="lang-bouton"
        aria-expanded={ouvert}
        aria-label={`${t.header.langue} : ${NOMS_LANGUES[langue]}`}
        onClick={() => setOuvert((valeur) => !valeur)}
      >
        {langue.toUpperCase()}
        <ChevronDown aria-hidden="true" />
      </button>
      {ouvert && (
        <ul className="lang-liste">
          {LANGUES.map((code) => (
            <li key={code}>
              <Lien vers={memePage(page, code)} hrefLang={code}>
                {NOMS_LANGUES[code]}
              </Lien>
            </li>
          ))}
        </ul>
      )}
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
          <LangSwitch aPlat />
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
        <Lien className="float-wordmark" vers={chemin(langue, "")} ariaLabel={t.header.accueil}>
          CITYSTAR
        </Lien>
        <div className="float-start">
          <nav className="float-nav" aria-label="Navigation">
            {/* L'accueil passe par le nom. */}
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
