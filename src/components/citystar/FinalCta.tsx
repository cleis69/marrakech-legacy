import { ArrowRight, Lock } from "lucide-react";

import { contact, nombreEnLettres, programme } from "@/config/citystar";

import { Reveal } from "./motion";
import { PillButton } from "./ui/PillButton";
import { Seal } from "./ui/Seal";

export function FinalCta({ onContact }: { onContact: () => void }) {
  return (
    <section id="contact" className="circle" aria-labelledby="circle-title">
      <div className="circle-text">
        <p className="circle-kicker">Sur demande uniquement</p>
        <Reveal><h2 id="circle-title">Entrer dans<br /><em>le cercle.</em></h2></Reveal>
        <p>{programme.nombreVillas} villas, réservées à quelques personnalités. Chaque demande d’accès est étudiée une à une.</p>
        <div className="circle-actions">
          <PillButton label="Demander un accès privé" icon={Lock} onClick={onContact} />
          <PillButton label="Conciergerie" icon={ArrowRight} variant="secondary" href={`https://wa.me/${contact.whatsapp}`} ariaLabel="Écrire à la conciergerie sur WhatsApp" />
        </div>
      </div>
      <Seal className="circle-seal" text={`ACCÈS PRIVÉ · CITYSTAR · ${nombreEnLettres(programme.nombreVillas).toUpperCase()} VILLAS · `} icon={Lock} label="Entrer" onClick={onContact} ariaLabel="Demander un accès privé" />
    </section>
  );
}
