import { motion } from "motion/react";
import { X } from "lucide-react";

import { contact } from "@/config/citystar";

import { useDevise } from "./currency";
import type { Selection } from "./data";
import { FormulaireDemande } from "./FormulaireDemande";
import { useModal } from "./useModal";

/** `selection` : réponses d'un outil, affichées et jointes à la demande seulement si le visiteur l'envoie. */
export function ContactPanel({
  onClose,
  selection,
}: {
  onClose: () => void;
  selection?: Selection | null;
}) {
  const { t } = useDevise();
  const ref = useModal<HTMLElement>(onClose);
  return (
    <motion.aside
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-panel-title"
      tabIndex={-1}
      className="contact-panel"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
    >
      <button className="modal-close" onClick={onClose}>
        <X aria-hidden="true" /> {t.contact.fermer}
      </button>
      <div>
        <h2 id="contact-panel-title">
          {t.contact.titre[0]}
          <br />
          <em>{t.contact.titre[1]}</em>
        </h2>
        <p>{t.contact.texte}</p>
        <FormulaireDemande selection={selection} />
        <div className="direct-contact">
          <a href={`tel:${contact.telephone}`}>{contact.telephoneAffiche}</a>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </div>
      </div>
    </motion.aside>
  );
}
