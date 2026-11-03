import { ArrowRight, MessageCircle, PhoneCall } from "lucide-react";

import { contact } from "@/config/citystar";

import { useDevise } from "../currency";
import { chemin } from "../liens";
import { merci } from "../merci";
import { PageHeader } from "../PageHeader";
import banniere from "@/assets/citystar/rendus/ext-piscine-soir.webp";

/** Après un formulaire de pub : WhatsApp avec le message prêt, l'appel, ou les villas. */
export function MerciPage() {
  const { langue } = useDevise();
  const t = merci[langue];
  const whatsapp = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(t.whatsapp.message)}`;

  const choix = [
    { href: whatsapp, titre: t.whatsapp.titre, texte: t.whatsapp.texte, icone: MessageCircle },
    {
      href: `tel:${contact.telephone}`,
      titre: t.appeler.titre,
      texte: contact.telephoneAffiche,
      icone: PhoneCall,
    },
    {
      href: chemin(langue, "villas"),
      titre: t.villas.titre,
      texte: t.villas.texte,
      icone: ArrowRight,
    },
  ];

  return (
    <>
      <PageHeader image={banniere} kicker={t.kicker} titre={t.titreH1} intro={t.intro} />
      <section className="circle merci" aria-labelledby="merci-titre">
        <div className="circle-text">
          <h2 id="merci-titre">{t.sousTitre}</h2>
          <p>{t.rappel}</p>
        </div>
        <ul className="circle-choix">
          {choix.map(({ href, titre, texte, icone: Icone }) => (
            <li key={titre}>
              <a
                href={href}
                {...(href.startsWith("https") ? { target: "_blank", rel: "noopener" } : {})}
              >
                <span>
                  <b>{titre}</b>
                  <small>{texte}</small>
                </span>
                <Icone aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
