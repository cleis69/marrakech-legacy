import { ArrowRight, Lock } from "lucide-react";

import { contact, nombreEnLettres, programme } from "@/config/citystar";

import { useDevise } from "./currency";
import { Reveal } from "./motion";
import { PillButton } from "./ui/PillButton";
import { Seal } from "./ui/Seal";

export function FinalCta({ onContact }: { onContact: () => void }) {
  const { langue, t } = useDevise();
  return (
    <section id="contact" className="circle" aria-labelledby="circle-title">
      <div className="circle-text">
        <p className="circle-kicker">{t.cercle.kicker}</p>
        <Reveal><h2 id="circle-title">{t.cercle.titre[0]}<br /><em>{t.cercle.titre[1]}</em></h2></Reveal>
        <p>{t.cercle.texte(String(programme.nombreVillas))}</p>
        <div className="circle-actions">
          <PillButton label={t.cercle.demander} icon={Lock} onClick={onContact} />
          <PillButton label={t.cercle.conciergerie} icon={ArrowRight} variant="secondary" href={`https://wa.me/${contact.whatsapp}`} ariaLabel={t.cercle.conciergerieAria} />
        </div>
      </div>
      <Seal className="circle-seal" text={t.cercle.sceau(langue === "fr" ? nombreEnLettres(programme.nombreVillas).toUpperCase() : String(programme.nombreVillas))} icon={Lock} label={t.cercle.entrer} onClick={onContact} ariaLabel={t.cercle.demander} />
    </section>
  );
}
