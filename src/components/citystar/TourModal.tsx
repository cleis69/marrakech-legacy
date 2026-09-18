import { motion } from "motion/react";
import { X } from "lucide-react";

import { useDevise } from "./currency";
import { TOUR_URL } from "./data";
import { useModal } from "./useModal";

export function TourModal({ onClose }: { onClose: () => void }) {
  const { t } = useDevise();
  const ref = useModal<HTMLDivElement>(onClose);
  return (
    <motion.div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={t.visite.titreModale}
      tabIndex={-1}
      className="tour-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button onClick={onClose} aria-label={t.visite.fermer}>
        <X />
      </button>
      <iframe src={TOUR_URL} title={t.visite.titreIframe} allowFullScreen />
    </motion.div>
  );
}
