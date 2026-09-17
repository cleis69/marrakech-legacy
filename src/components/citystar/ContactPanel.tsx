import { motion } from "motion/react";
import { ArrowRight, X } from "lucide-react";
import { useState } from "react";

import { useDevise } from "./currency";
import type { Selection } from "./data";
import { useModal } from "./useModal";

/** `selection` : réponses d'un outil, affichées et jointes à la demande seulement si le visiteur l'envoie. */
export function ContactPanel({ onClose, selection }: { onClose: () => void; selection?: Selection | null }) {
  const { t } = useDevise();
  const ref = useModal<HTMLElement>(onClose);
  const [joined, setJoined] = useState(selection ?? null);
  return <motion.aside ref={ref} role="dialog" aria-modal="true" aria-labelledby="contact-panel-title" tabIndex={-1} className="contact-panel" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: .65, ease: [0.76, 0, 0.24, 1] }}><button className="modal-close" onClick={onClose}><X aria-hidden="true" /> {t.contact.fermer}</button><div><p className="eyebrow">{t.contact.kicker}</p><h2 id="contact-panel-title">{t.contact.titre[0]}<br /><em>{t.contact.titre[1]}</em></h2><p>{t.contact.texte}</p>
    {joined && <div className="contact-selection"><p>{t.contact.jointe(joined.outil)}</p><ul>{joined.lignes.map((ligne) => <li key={ligne}>{ligne}</li>)}</ul><button type="button" onClick={() => setJoined(null)}>{t.contact.retirer}</button></div>}
    <form action="mailto:Promoimmomarrakech@gmail.com" method="post" encType="text/plain">{joined && <input type="hidden" name="Sélection" value={`${joined.outil} : ${joined.lignes.join(" · ")}`} />}<label>{t.contact.nom}<input name="Nom" required /></label><label>{t.contact.telephone}<input type="tel" name="Téléphone" required /></label><label>{t.contact.email}<input type="email" name="Email" required /></label><label>{t.contact.interet}<select name="Intérêt">{t.contact.interets.map((interet) => <option key={interet}>{interet}</option>)}</select></label><button type="submit">{t.contact.envoyer} <ArrowRight /></button></form>
    <div className="direct-contact"><a href="tel:+212661825359">+212 661-825359</a><a href="mailto:Promoimmomarrakech@gmail.com">Promoimmomarrakech@gmail.com</a></div></div></motion.aside>;
}
