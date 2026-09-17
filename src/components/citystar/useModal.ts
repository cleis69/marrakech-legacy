import { useEffect, useRef } from "react";

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])';

/* Pile des fenêtres ouvertes : seule la dernière réagit au clavier. */
const stack: HTMLElement[] = [];
let scrollLocks = 0;

/**
 * Comportement commun des fenêtres modales : focus initial, piège de focus,
 * fermeture par Échap, verrouillage du défilement et restitution du focus
 * à l’élément déclencheur.
 */
export function useModal<T extends HTMLElement>(onClose: () => void) {
  const ref = useRef<T>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    stack.push(node);
    if (scrollLocks++ === 0) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    }
    (node.querySelector<HTMLElement>(FOCUSABLE) ?? node).focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (stack[stack.length - 1] !== node) return;
      if (event.key === "Escape") {
        event.preventDefault();
        closeRef.current();
        return;
      }
      if (event.key !== "Tab") return;
      const items = Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.getClientRects().length > 0);
      if (items.length === 0) {
        event.preventDefault();
        node.focus();
        return;
      }
      const first = items[0] as HTMLElement;
      const last = items[items.length - 1] as HTMLElement;
      const active = document.activeElement;
      if (event.shiftKey && (active === first || !node.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !node.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      const index = stack.lastIndexOf(node);
      if (index >= 0) stack.splice(index, 1);
      if (--scrollLocks === 0) {
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
      }
      if (trigger && document.contains(trigger)) trigger.focus({ preventScroll: true });
    };
  }, []);

  return ref;
}
