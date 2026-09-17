import { MessageCircle } from "lucide-react";

import { contact } from "@/config/citystar";

export function FloatingActions({ onContact }: { onContact: () => void }) {
  return (
    <>
      <a className="whatsapp" href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer" aria-label="Contacter CITYSTAR sur WhatsApp"><MessageCircle /></a>
      <button className="mobile-sticky-cta" onClick={onContact}>Prendre rendez-vous</button>
    </>
  );
}
