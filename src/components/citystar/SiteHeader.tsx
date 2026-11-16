import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, FileText, KeyRound, MessageCircle, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { type Langue, LANGUES, contact } from "@/config/citystar";

import { useRouterState } from "@tanstack/react-router";

import { useDevise } from "./currency";
import { textesDossier } from "./dossier/textes";
import type { Selection } from "./data";
import { retenirChoixLangue } from "./langueAppareil";
import { chemin, cheminEspace, Lien, memePage } from "./liens";
import { CLASSE_DEMANDE, CLASSE_SANS_BARRE } from "./contexte";
import { useModal } from "./useModal";

type Props = {
  scrolled: boolean;
  menuOpen: boolean;
  onOpenMenu: () => void;
  onCloseMenu: () => void;
  onContact: () => void;
  onContactAvec: (selection: Selection) => void;
  /** Page d'atterrissage : le nom, la langue et l'appel au formulaire, rien d'autre. */
  tunnel?: boolean;
};

const whatsappHref = `https://wa.me/${contact.whatsapp}`;

const NOMS_LANGUES: Record<Langue, string> = {
  fr: "Français",
  en: "English",
  es: "Español",
  it: "Italiano",
  nl: "Nederlands",
  no: "Norsk",
  ar: "العربية",
};

/**
 * Choix de la langue. Dans l'en-tête, un bouton ouvre la liste des sept langues
 * (Échap ou un clic ailleurs la referme) ; dans le menu mobile, les sept codes
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
            onClick={retenirChoixLangue}
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
              <Lien vers={memePage(page, code)} hrefLang={code} onClick={retenirChoixLangue}>
                {NOMS_LANGUES[code]}
              </Lien>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function MenuSheet({
  onClose,
  onContact,
  onContactAvec,
}: {
  onClose: () => void;
  onContact: () => void;
  onContactAvec: (selection: Selection) => void;
}) {
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
            {t.pied.whatsapp}
          </a>
          <button
            type="button"
            onClick={() => {
              onClose();
              onContactAvec(t.header.brochureDemande);
            }}
          >
            <FileText aria-hidden="true" />
            {t.header.brochure}
            <small>{t.header.surDemande}</small>
          </button>
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
          <FileText aria-hidden="true" />
          {t.villas.brochure}
        </button>
      </motion.div>
    </>
  );
}

/**
 * Page d'atterrissage, sur mobile : une seule action en bas de l'écran, qui ramène au formulaire.
 * Elle ne paraît que lorsque le formulaire est sorti de l'écran.
 */
function BarreTunnel({ onContact, libelle }: { onContact: () => void; libelle: string }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    /* La page compte plusieurs formulaires : la barre s'efface dès que l'un d'eux est à l'écran. */
    const aLEcran = new Set<Element>();
    const guetteur = new IntersectionObserver((entrees) => {
      for (const entree of entrees) {
        if (entree.isIntersecting) aLEcran.add(entree.target);
        else aLEcran.delete(entree.target);
      }
      setVisible(aLEcran.size === 0);
    });
    document
      .querySelectorAll(`.${CLASSE_DEMANDE}, .${CLASSE_SANS_BARRE}`)
      .forEach((formulaire) => guetteur.observe(formulaire));
    return () => guetteur.disconnect();
  }, []);
  return (
    <div className={`tabbar tabbar--tunnel${visible ? " is-visible" : ""}`} aria-hidden={!visible}>
      <button type="button" onClick={onContact} tabIndex={visible ? 0 : -1}>
        <FileText aria-hidden="true" />
        {libelle}
      </button>
    </div>
  );
}

export function SiteHeader({
  scrolled,
  menuOpen,
  onOpenMenu,
  onCloseMenu,
  onContact,
  onContactAvec,
  tunnel = false,
}: Props) {
  const { langue, t } = useDevise();
  /* Transparent seulement en haut de l'accueil, posé sur la vidéo ; partout ailleurs, un aplat d'encre. */
  const page = useRouterState({ select: (etat) => etat.location.pathname });
  const solide = scrolled || !/^\/((en|ar)\/?)?$/.test(page);

  /* Page d'atterrissage (16/11/2026) : le bouton dit ce que l'on reçoit, les plans et les prix. */
  const demande = textesDossier[langue].parcours.cta;
  if (tunnel)
    return (
      <>
        <header className={`float-header is-tunnel ${solide ? "is-solid" : ""}`}>
          <span className="float-wordmark">CITYSTAR</span>
          <div className="float-actions">
            <LangSwitch />
            <button className="float-cta" onClick={onContact}>
              {demande}
            </button>
          </div>
        </header>
        <BarreTunnel onContact={onContact} libelle={demande} />
      </>
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
            {t.villas.brochure}
          </button>
          <a
            className="float-concierge"
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            aria-label={t.header.whatsapp}
          >
            <span className="float-concierge-label">{t.pied.whatsapp}</span>
            <MessageCircle aria-hidden="true" />
          </a>
        </div>
      </header>

      {/* Sur mobile, une seule action en bas de l'écran (15/11/2026) : les cinq onglets perdaient le visiteur. */}
      <BarreTunnel onContact={onContact} libelle={t.villas.brochure} />

      <AnimatePresence>
        {menuOpen && (
          <MenuSheet onClose={onCloseMenu} onContact={onContact} onContactAvec={onContactAvec} />
        )}
      </AnimatePresence>
    </>
  );
}
