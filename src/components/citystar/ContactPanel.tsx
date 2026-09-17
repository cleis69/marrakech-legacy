import { motion } from "motion/react";
import { ArrowRight, X } from "lucide-react";

export function ContactPanel({ onClose }: { onClose: () => void }) {
  return <motion.aside className="contact-panel" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: .65, ease: [0.76, 0, 0.24, 1] }}><button className="modal-close" onClick={onClose}><X /> Fermer</button><div><p className="eyebrow">Rencontrons-nous</p><h2>Planifier<br /><em>une visite.</em></h2><p>Notre équipe vous accompagne dans la découverte de CITYSTAR et de ses trois types de villas.</p>
    <form action="mailto:Promoimmomarrakech@gmail.com" method="post" encType="text/plain"><label>Nom complet<input name="Nom" required /></label><label>Téléphone<input type="tel" name="Téléphone" required /></label><label>E-mail<input type="email" name="Email" required /></label><label>Votre intérêt<select name="Intérêt"><option>Découvrir le projet</option><option>Villa Type A</option><option>Villa Type B</option><option>Villa Type C</option><option>Planifier une visite</option></select></label><button type="submit">Envoyer ma demande <ArrowRight /></button></form>
    <div className="direct-contact"><a href="tel:+212661825359">+212 661-825359</a><a href="mailto:Promoimmomarrakech@gmail.com">Promoimmomarrakech@gmail.com</a></div></div></motion.aside>;
}
