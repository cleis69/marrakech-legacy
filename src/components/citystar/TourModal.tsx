import { motion } from "motion/react";
import { X } from "lucide-react";

import { useDevise } from "./currency";
import { tourUrl } from "./data";
import { useModal } from "./useModal";

export function TourModal({ onClose }: { onClose: () => void }) {
  const { langue, t } = useDevise();
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
      <iframe
        src={tourUrl(langue)}
        title={t.visite.titreIframe}
        allow="fullscreen; gyroscope; accelerometer; xr-spatial-tracking"
        allowFullScreen
      />
    </motion.div>
  );
}
