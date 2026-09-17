import { motion } from "motion/react";
import { X } from "lucide-react";

import { useDevise } from "./currency";
import { useModal } from "./useModal";

export function PlanModal({ src, onClose }: { src: string; onClose: () => void }) {
  const { t } = useDevise();
  const ref = useModal<HTMLDivElement>(onClose);
  return <motion.div ref={ref} role="dialog" aria-modal="true" aria-label={t.modales.plan} tabIndex={-1} className="plan-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><button onClick={onClose} aria-label={t.modales.fermerPlan}><X /></button><img src={src} alt={t.modales.planAlt} /></motion.div>;
}
