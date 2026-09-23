import { Mail, MessageCircle, Phone } from "lucide-react";

import { contact } from "@/config/citystar";

import { useDevise } from "../currency";
import { LocationSection } from "../LocationSection";
import { Marquee } from "../Marquee";
import { PageHeader } from "../PageHeader";
import { useSite } from "../site";
import { PillButton } from "../ui/PillButton";

export function ContactPage() {
  const { t } = useDevise();
  const { ouvrirContact, ouvrirPlan } = useSite();

  return (
    <>
      <PageHeader
        kicker={t.pages.contact.kicker}
        titre={t.pages.contact.titreH1}
        intro={t.pages.contact.intro}
      />
      <section className="ct section-pad" aria-label={t.pages.contact.kicker}>
        <div className="ct-tiles">
          <a className="ct-tile" href={`tel:${contact.telephone}`}>
            <i aria-hidden="true">
              <Phone />
            </i>
            <span>
              <small>{t.pied.appeler}</small>
              <b>{contact.telephoneAffiche}</b>
            </span>
          </a>
          <a
            className="ct-tile"
            href={`https://wa.me/${contact.whatsapp}`}
            target="_blank"
            rel="noreferrer"
          >
            <i aria-hidden="true">
              <MessageCircle />
            </i>
            <span>
              <small>{t.pied.whatsapp}</small>
              <b>{t.pied.conciergerie}</b>
            </span>
          </a>
          <a className="ct-tile" href={`mailto:${contact.email}`}>
            <i aria-hidden="true">
              <Mail />
            </i>
            <span>
              <small>{t.pied.ecrire}</small>
              <b>{contact.email}</b>
            </span>
          </a>
        </div>
        <div className="ct-actions">
          <PillButton label={t.pages.contact.formulaire} icon={Mail} onClick={ouvrirContact} />
        </div>
      </section>
      <LocationSection onOpenPlan={ouvrirPlan} />
      <Marquee />
    </>
  );
}
