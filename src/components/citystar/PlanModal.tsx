import { motion } from "motion/react";
import { X } from "lucide-react";

export function PlanModal({ src, onClose }: { src: string; onClose: () => void }) {
  return <motion.div className="plan-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><button onClick={onClose} aria-label="Fermer le plan"><X /></button><img src={src} alt="Plan architectural CITYSTAR en grand format" /></motion.div>;
}
