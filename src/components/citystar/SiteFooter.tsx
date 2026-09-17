import { ArrowRight, Download } from "lucide-react";

import { navItems, scrollTo } from "./data";

export function SiteFooter({ onOpenTour }: { onOpenTour: () => void }) {
  return (
    <footer>
      <div className="footer-brand">CITYSTAR<small>Marrakech</small></div>
      <div><p>Navigation</p>{navItems.slice(0, 4).map(([label, id]) => <button key={id} onClick={() => scrollTo(id)}>{label}</button>)}</div>
      <div><p>Contact</p><a href="tel:+212661825359">+212 661-825359</a><a href="mailto:Promoimmomarrakech@gmail.com">Promoimmomarrakech@gmail.com</a><span>Oulad Hassoune, Marrakech</span></div>
      <div><p>Documents</p><a href="/brochures/citystar.pdf" target="_blank">Brochure CITYSTAR <Download /></a><button onClick={onOpenTour}>Visite 360° <ArrowRight /></button></div>
      <div className="footer-bottom"><span>© 2026 CITYSTAR. Tous droits réservés.</span><span>Résidence privée · Marrakech</span></div>
    </footer>
  );
}
