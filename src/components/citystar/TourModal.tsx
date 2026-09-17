import { motion } from "motion/react";
import { X } from "lucide-react";

import { TOUR_URL } from "./data";

export function TourModal({ onClose }: { onClose: () => void }) {
  return <motion.div className="tour-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><button onClick={onClose} aria-label="Fermer la visite"><X /></button><iframe src={TOUR_URL} title="Visite virtuelle 360° CITYSTAR" allowFullScreen /></motion.div>;
}
