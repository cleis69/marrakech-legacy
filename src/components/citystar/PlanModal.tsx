import { motion } from "motion/react";
import { X } from "lucide-react";

import { useModal } from "./useModal";

export function PlanModal({ src, onClose }: { src: string; onClose: () => void }) {
  const ref = useModal<HTMLDivElement>(onClose);
  return <motion.div ref={ref} role="dialog" aria-modal="true" aria-label="Plan en grand format" tabIndex={-1} className="plan-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><button onClick={onClose} aria-label="Fermer le plan"><X /></button><img src={src} alt="Plan architectural CITYSTAR en grand format" /></motion.div>;
}
