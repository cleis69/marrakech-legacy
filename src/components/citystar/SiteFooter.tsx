import { ArrowRight, Download } from "lucide-react";

import { contact } from "@/config/citystar";

import { navItems, scrollTo } from "./data";

export function SiteFooter({ onOpenTour }: { onOpenTour: () => void }) {
  return (
    <footer>
      <div className="footer-brand">CITYSTAR<small>Marrakech</small></div>
      <div><p>Navigation</p>{navItems.slice(0, 4).map(([label, id]) => <button key={id} onClick={() => scrollTo(id)}>{label}</button>)}</div>
      <div><p>Contact</p><a href={`tel:${contact.telephone}`}>{contact.telephoneAffiche}</a><a href={`mailto:${contact.email}`}>{contact.email}</a><span>Oulad Hassoune, Marrakech</span></div>
      <div><p>Documents</p><a href="/brochures/citystar.pdf" target="_blank" rel="noreferrer">Brochure CITYSTAR <Download /></a><button onClick={onOpenTour}>Visite 360° <ArrowRight /></button></div>
      <div className="footer-bottom"><span>© 2026 CITYSTAR. Tous droits réservés.</span><span>Résidence privée · Marrakech</span></div>
    </footer>
  );
}
