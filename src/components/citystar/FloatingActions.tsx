import { MessageCircle } from "lucide-react";

export function FloatingActions({ onContact }: { onContact: () => void }) {
  return (
    <>
      <a className="whatsapp" href="https://wa.me/212661825359" target="_blank" rel="noreferrer" aria-label="Contacter CITYSTAR sur WhatsApp"><MessageCircle /></a>
      <button className="mobile-sticky-cta" onClick={onContact}>Prendre rendez-vous</button>
    </>
  );
}
