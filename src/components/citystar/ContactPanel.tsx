import { motion } from "motion/react";
import { ArrowRight, X } from "lucide-react";
import { useState } from "react";

import type { Selection } from "./data";
import { useModal } from "./useModal";

/** `selection` : réponses d'un outil, affichées et jointes à la demande seulement si le visiteur l'envoie. */
export function ContactPanel({ onClose, selection }: { onClose: () => void; selection?: Selection | null }) {
  const ref = useModal<HTMLElement>(onClose);
  const [joined, setJoined] = useState(selection ?? null);
  return <motion.aside ref={ref} role="dialog" aria-modal="true" aria-labelledby="contact-panel-title" tabIndex={-1} className="contact-panel" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: .65, ease: [0.76, 0, 0.24, 1] }}><button className="modal-close" onClick={onClose}><X aria-hidden="true" /> Fermer</button><div><p className="eyebrow">Rencontrons-nous</p><h2 id="contact-panel-title">Planifier<br /><em>une visite.</em></h2><p>Notre équipe vous accompagne dans la découverte de CITYSTAR et de ses trois types de villas.</p>
    {joined && <div className="contact-selection"><p>Jointe à votre demande · {joined.outil}</p><ul>{joined.lignes.map((ligne) => <li key={ligne}>{ligne}</li>)}</ul><button type="button" onClick={() => setJoined(null)}>Ne pas joindre</button></div>}
    <form action="mailto:Promoimmomarrakech@gmail.com" method="post" encType="text/plain">{joined && <input type="hidden" name="Sélection" value={`${joined.outil} : ${joined.lignes.join(" · ")}`} />}<label>Nom complet<input name="Nom" required /></label><label>Téléphone<input type="tel" name="Téléphone" required /></label><label>E-mail<input type="email" name="Email" required /></label><label>Votre intérêt<select name="Intérêt"><option>Découvrir le projet</option><option>Villa Type A</option><option>Villa Type B</option><option>Villa Type C</option><option>Planifier une visite</option></select></label><button type="submit">Envoyer ma demande <ArrowRight /></button></form>
    <div className="direct-contact"><a href="tel:+212661825359">+212 661-825359</a><a href="mailto:Promoimmomarrakech@gmail.com">Promoimmomarrakech@gmail.com</a></div></div></motion.aside>;
}
