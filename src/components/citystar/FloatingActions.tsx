import { MessageCircle } from "lucide-react";

import { contact } from "@/config/citystar";

import { useDevise } from "./currency";

/** Bulle WhatsApp sur ordinateur ; sur mobile, la conciergerie passe dans l'en-tête. */
export function FloatingActions() {
  const { t } = useDevise();
  return (
    <a
      className="whatsapp"
      href={`https://wa.me/${contact.whatsapp}`}
      target="_blank"
      rel="noreferrer"
      aria-label={t.header.whatsapp}
    >
      <MessageCircle />
    </a>
  );
}
