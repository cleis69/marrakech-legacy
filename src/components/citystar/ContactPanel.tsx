import { motion } from "motion/react";
import { ArrowRight, X } from "lucide-react";
import { type FormEvent, useMemo, useState } from "react";

import { contact, hubspot } from "@/config/citystar";

import { useDevise } from "./currency";
import type { Selection } from "./data";
import { listeIndicatifs, numeroComplet } from "./indicatifs";
import { langueSequence, languesAppareil } from "./langueAppareil";
import { canal, provenance } from "./provenance";
import { useModal } from "./useModal";

type Etat = "repos" | "envoi" | "envoye" | "erreur";

/** Questions facultatives : chaque valeur est celle de la propriété HubSpot, dans l'ordre des choix traduits. */
const QUESTIONS = [
  ["villa", "citystar_villa", ["indecis", "A", "B", "C"]],
  [
    "projet",
    "citystar_projet",
    ["residence_principale", "residence_secondaire", "investissement_locatif", "patrimonial"],
  ],
  ["horizon", "citystar_horizon", ["3_mois", "3_6_mois", "6_12_mois", "plus_tard"]],
  ["budget", "citystar_budget", ["moins_800k", "800k_1m", "1_1_5m", "plus_1_5m", "non_precise"]],
] as const;

/** `selection` : réponses d'un outil, affichées et jointes à la demande seulement si le visiteur l'envoie. */
export function ContactPanel({
  onClose,
  selection,
}: {
  onClose: () => void;
  selection?: Selection | null;
}) {
  const { t, langue } = useDevise();
  const ref = useModal<HTMLElement>(onClose);
  const [joined, setJoined] = useState(selection ?? null);
  const [etat, setEtat] = useState<Etat>("repos");
  const indicatifs = useMemo(() => listeIndicatifs(langue), [langue]);

  /**
   * La demande crée le contact dans HubSpot avec ses réponses, la langue de sa séquence e-mail,
   * celle de son appareil et sa provenance. Elle passe par le relais du site (`hubspot.relais`), qui inscrit aussitôt le contact
   * dans la séquence e-mail Brevo ; si le relais ne répond pas (aperçu, panne), elle part directement
   * à HubSpot. HubSpot ne vérifie pas les valeurs reçues.
   */
  async function envoyer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const champs = new FormData(event.currentTarget);
    const texte = (nom: string) => String(champs.get(nom) ?? "").trim();
    const [prenom, ...reste] = texte("nom").split(/\s+/);
    const message = [texte("message"), joined && `${joined.outil} : ${joined.lignes.join(" · ")}`]
      .filter(Boolean)
      .join("\n\n");
    const origine = provenance();
    const appareil = languesAppareil();
    const sequence = langueSequence(langue, appareil);
    setEtat("envoi");
    const corps = JSON.stringify({
      fields: [
        { name: "firstname", value: prenom },
        { name: "lastname", value: reste.join(" ") },
        { name: "email", value: texte("email") },
        { name: "phone", value: numeroComplet(texte("indicatif"), texte("telephone")) },
        { name: "message", value: message },
        { name: "hs_language", value: sequence },
        { name: "citystar_langue", value: sequence },
        { name: "citystar_langue_appareil", value: appareil.join(", ") },
        { name: "citystar_canal", value: canal(origine) },
        ...QUESTIONS.map(([, propriete]) => ({ name: propriete, value: texte(propriete) })),
        ...Object.entries(origine.utm).map(([name, value]) => ({ name, value })),
      ].filter((champ) => champ.value),
      context: { pageUri: window.location.href, pageName: document.title },
      legalConsentOptions: {
        consent: { consentToProcess: true, text: t.contact.consentement },
      },
    });
    const envoi = (adresse: string) =>
      fetch(adresse, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: corps,
      });
    try {
      const relayee = await envoi(hubspot.relais).catch(() => null);
      const reponse = relayee?.ok ? relayee : await envoi(hubspot.envoi);
      setEtat(reponse.ok ? "envoye" : "erreur");
    } catch {
      setEtat("erreur");
    }
  }
  return (
    <motion.aside
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-panel-title"
      tabIndex={-1}
      className="contact-panel"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
    >
      <button className="modal-close" onClick={onClose}>
        <X aria-hidden="true" /> {t.contact.fermer}
      </button>
      <div>
        <h2 id="contact-panel-title">
          {t.contact.titre[0]}
          <br />
          <em>{t.contact.titre[1]}</em>
        </h2>
        <p>{t.contact.texte}</p>
        {joined && (
          <div className="contact-selection">
            <p>{t.contact.jointe(joined.outil)}</p>
            <ul>
              {joined.lignes.map((ligne) => (
                <li key={ligne}>{ligne}</li>
              ))}
            </ul>
            <button type="button" onClick={() => setJoined(null)}>
              {t.contact.retirer}
            </button>
          </div>
        )}
        {etat === "envoye" ? (
          <p className="contact-merci" role="status">
            {t.contact.merci}
          </p>
        ) : (
          <form onSubmit={envoyer}>
            <label className="contact-large">
              {t.contact.nom}
              <input name="nom" autoComplete="name" required />
            </label>
            {/* L'indicatif est obligatoire : les acheteurs appellent du Maroc, de France et de toute l'Europe. */}
            <div className="contact-large contact-telephone">
              <label htmlFor="contact-telephone">{t.contact.telephone}</label>
              <div>
                <select name="indicatif" aria-label={t.contact.indicatif} defaultValue="" required>
                  <option value="">{t.contact.indicatif}</option>
                  {indicatifs.prioritaires.map(({ pays, libelle }) => (
                    <option key={pays} value={pays}>
                      {libelle}
                    </option>
                  ))}
                  <optgroup label={t.contact.europe}>
                    {indicatifs.europe.map(({ pays, libelle }) => (
                      <option key={pays} value={pays}>
                        {libelle}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label={t.contact.autresPays}>
                    {indicatifs.monde.map(({ pays, libelle }) => (
                      <option key={pays} value={pays}>
                        {libelle}
                      </option>
                    ))}
                  </optgroup>
                </select>
                <input
                  id="contact-telephone"
                  type="tel"
                  name="telephone"
                  autoComplete="tel-national"
                  required
                />
              </div>
            </div>
            <label className="contact-large">
              {t.contact.email}
              <input type="email" name="email" autoComplete="email" required />
            </label>
            <p className="contact-intertitre">{t.contact.projet}</p>
            {QUESTIONS.map(([cle, propriete, valeurs]) => (
              <label key={cle}>
                {t.contact.questions[cle].titre}
                <select
                  name={propriete}
                  defaultValue={cle === "villa" ? (selection?.villa ?? "") : ""}
                >
                  <option value="">{t.contact.choisir}</option>
                  {valeurs.map((valeur, i) => (
                    <option key={valeur} value={valeur}>
                      {t.contact.questions[cle].choix[i]}
                    </option>
                  ))}
                </select>
              </label>
            ))}
            <label className="contact-large">
              {t.contact.message}
              <textarea name="message" rows={3} placeholder={t.contact.messageAide} />
            </label>
            {/* Mention d'information : la demande vaut accord pour le rappel et l'envoi du dossier. */}
            <p className="contact-consentement">{t.contact.consentement}</p>
            {etat === "erreur" && (
              <p className="contact-erreur" role="alert">
                {t.contact.erreur}
              </p>
            )}
            <button type="submit" disabled={etat === "envoi"}>
              {etat === "envoi" ? t.contact.envoi : t.contact.envoyer} <ArrowRight />
            </button>
          </form>
        )}
        <div className="direct-contact">
          <a href={`tel:${contact.telephone}`}>{contact.telephoneAffiche}</a>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </div>
      </div>
    </motion.aside>
  );
}
