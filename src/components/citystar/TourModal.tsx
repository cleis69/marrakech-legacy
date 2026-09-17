import { motion } from "motion/react";
import { X } from "lucide-react";

import { TOUR_URL } from "./data";
import { useModal } from "./useModal";

export function TourModal({ onClose }: { onClose: () => void }) {
  const ref = useModal<HTMLDivElement>(onClose);
  return <motion.div ref={ref} role="dialog" aria-modal="true" aria-label="Visite virtuelle 360°" tabIndex={-1} className="tour-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><button onClick={onClose} aria-label="Fermer la visite"><X /></button><iframe src={TOUR_URL} title="Visite virtuelle 360° CITYSTAR" allowFullScreen /></motion.div>;
}
