import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

import type { Langue } from "@/config/citystar";

const LOCALE: Record<Langue, string> = { fr: "fr-FR", en: "en-GB" };

/**
 * Chiffre qui défile de zéro à sa valeur quand il arrive à l'écran, une seule fois.
 * Le rendu serveur affiche déjà la valeur finale ; en mouvement réduit, rien ne bouge.
 */
export function Compteur({
  valeur,
  langue,
  decimales = 0,
}: {
  valeur: number;
  langue: Langue;
  decimales?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const vu = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const reduce = useReducedMotion();
  const format = (n: number) =>
    n.toLocaleString(LOCALE[langue], {
      minimumFractionDigits: decimales,
      maximumFractionDigits: decimales,
    });

  useEffect(() => {
    const element = ref.current;
    if (!vu || reduce || !element) return;
    const controles = animate(0, valeur, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (n) => {
        element.textContent = format(n);
      },
    });
    return () => controles.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vu, reduce, valeur]);

  return <span ref={ref}>{format(valeur)}</span>;
}
