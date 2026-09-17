import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Menu, X } from "lucide-react";

import { navItems, scrollTo } from "./data";
import { useModal } from "./useModal";

type Props = {
  scrolled: boolean;
  menuOpen: boolean;
  onOpenMenu: () => void;
  onCloseMenu: () => void;
  onContact: () => void;
};

function MobileMenu({ onClose, onContact }: { onClose: () => void; onContact: () => void }) {
  const ref = useModal<HTMLDivElement>(onClose);
  return <motion.div ref={ref} role="dialog" aria-modal="true" aria-label="Menu" tabIndex={-1} className="mobile-menu" initial={{ y: "-100%" }} animate={{ y: 0 }} exit={{ y: "-100%" }} transition={{ duration: .7, ease: [0.76, 0, 0.24, 1] }}>
    <div className="mobile-menu-head"><span>CITYSTAR</span><button onClick={onClose} aria-label="Fermer le menu"><X /></button></div>
    <nav aria-label="Navigation mobile">{navItems.map(([label, id], index) => <motion.button key={id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15 + index * .06 }} onClick={() => { onClose(); setTimeout(() => scrollTo(id), 250); }}><small>0{index + 1}</small>{label}</motion.button>)}</nav>
    <button className="mobile-appointment" onClick={() => { onClose(); onContact(); }}>Prendre rendez-vous</button>
  </motion.div>;
}

export function SiteHeader({ scrolled, menuOpen, onOpenMenu, onCloseMenu, onContact }: Props) {
  return (
    <>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <button className="wordmark" onClick={() => scrollTo("accueil")} aria-label="Retour à l’accueil">CITYSTAR</button>
        <nav className="desktop-nav" aria-label="Navigation principale">
          {navItems.map(([label, id]) => <button key={id} onClick={() => scrollTo(id)}>{label}</button>)}
        </nav>
        <button className="appointment-link" onClick={onContact}>Prendre rendez-vous <ArrowRight size={14} /></button>
        <button className="menu-trigger" onClick={onOpenMenu} aria-label="Ouvrir le menu" aria-expanded={menuOpen}><Menu /></button>
      </header>

      <AnimatePresence>{menuOpen && <MobileMenu onClose={onCloseMenu} onContact={onContact} />}</AnimatePresence>
    </>
  );
}
