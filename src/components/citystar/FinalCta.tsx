import { ArrowRight } from "lucide-react";

export function FinalCta({ onContact }: { onContact: () => void }) {
  return (
    <section id="contact" className="final-cta">
      <span>Votre résidence à Marrakech vous attend.</span><h2>Découvrir CITYSTAR<br /><em>en personne.</em></h2><button onClick={onContact}>Prendre rendez-vous <ArrowRight /></button>
    </section>
  );
}
