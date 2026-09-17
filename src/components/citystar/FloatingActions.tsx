import { MessageCircle } from "lucide-react";

import { contact } from "@/config/citystar";

/** Bulle WhatsApp sur ordinateur ; sur mobile, la conciergerie passe dans l'en-tête. */
export function FloatingActions() {
  return <a className="whatsapp" href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer" aria-label="Contacter la conciergerie CITYSTAR sur WhatsApp"><MessageCircle /></a>;
}
