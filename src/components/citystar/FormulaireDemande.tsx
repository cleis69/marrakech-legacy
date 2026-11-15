import { ArrowRight } from "lucide-react";
import { type FormEvent, useEffect, useState } from "react";

import { useDevise } from "./currency";
import type { Selection } from "./data";
import { allerAuRemerciement, envoyerDemande } from "./demande";
import { listeIndicatifs, numeroComplet, numeroInternational, paysProbable } from "./indicatifs";
import { signaler, signalerDebutGoogleAds } from "./mesure";

type Etat = "repos" | "envoi" | "envoye" | "erreur";
type Moyen = "whatsapp" | "email";

/** Note jointe au message HubSpot, en français pour le consultant, quelle que soit la langue du site. */
const NOTE_MOYEN: Record<Moyen, string> = {
  whatsapp: "Brochure à envoyer par WhatsApp.",
  email: "Brochure à envoyer par e-mail.",
};

/**
 * Questions facultatives : chaque valeur est celle de la propriété HubSpot, dans l'ordre des choix traduits.
 * Le type de villa n'est plus demandé (12/11/2026).
 */
export const QUESTIONS = [
  [
    "projet",
    "citystar_projet",
    ["residence_principale", "residence_secondaire", "investissement_locatif", "patrimonial"],
  ],
  ["horizon", "citystar_horizon", ["3_mois", "3_6_mois", "6_12_mois"]],
  ["budget", "citystar_budget", ["moins_800k", "800k_1m", "1_1_5m", "plus_1_5m"]],
] as const;

/**
 * Le formulaire de demande, partagé par le panneau de contact et par la page d'atterrissage,
 * où il est affiché d'emblée. `selection` : réponses d'un outil, jointes à la demande seulement
 * si le visiteur l'envoie. `discret` : la sélection part avec la demande sans être affichée
 * (la page d'atterrissage ne demande que le dossier). `court` : sans le champ de message.
 * `choixEnvoi` : le visiteur choisit de recevoir la brochure par WhatsApp (d'office) ou par
 * e-mail ; le champ e-mail n'apparaît, obligatoire, que pour l'e-mail.
 */
export function FormulaireDemande({
  selection,
  discret = false,
  court = false,
  choixEnvoi = false,
  prefixe = "contact",
  envoyer: libelleEnvoyer,
}: {
  selection?: Selection | null | undefined;
  discret?: boolean;
  court?: boolean;
  choixEnvoi?: boolean;
  /** Préfixe des identifiants, pour deux formulaires sur une même page. */
  prefixe?: string;
  /** Libellé du bouton d'envoi, s'il diffère de « Envoyer ma demande ». */
  envoyer?: string;
}) {
  const { t, langue } = useDevise();
  const [joined, setJoined] = useState(selection ?? null);
  const [etat, setEtat] = useState<Etat>("repos");
  /* Les noms de pays viennent du navigateur : la liste est remplie une fois la page affichée,
     sinon le rendu du serveur et celui du navigateur diffèrent (noms et ordre de tri). */
  const [indicatifs, setIndicatifs] = useState<ReturnType<typeof listeIndicatifs> | null>(null);
  /* Le pays de l'indicatif est proposé d'office (fuseau de l'appareil, sinon langue de la page) :
     il était vide et obligatoire, et bloquait l'envoi tant qu'on ne l'avait pas cherché. */
  const [pays, setPays] = useState("");
  const [numero, setNumero] = useState("");
  const [moyen, setMoyen] = useState<Moyen>("whatsapp");
  const [commence, setCommence] = useState(false);
  useEffect(() => {
    setIndicatifs(listeIndicatifs(langue));
    setPays((actuel) => actuel || paysProbable(langue));
  }, [langue]);

  /* Un outil de la page (sélecteur de villa…) peut joindre ses réponses après l'affichage. */
  useEffect(() => setJoined(selection ?? null), [selection]);

  /**
   * La demande crée le contact dans HubSpot avec ses réponses, la langue de sa séquence e-mail,
   * celle de son appareil et sa provenance. Elle passe par le relais du site (`hubspot.relais`), qui inscrit aussitôt le contact
   * dans la séquence e-mail Brevo ; si le relais ne répond pas (aperçu, panne), elle part directement
   * à HubSpot. HubSpot ne vérifie pas les valeurs reçues. Seul le téléphone est obligatoire.
   */
  async function envoyer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const champs = new FormData(event.currentTarget);
    const texte = (nom: string) => String(champs.get(nom) ?? "").trim();
    const message = [
      choixEnvoi && NOTE_MOYEN[moyen],
      texte("message"),
      joined && `${joined.outil} : ${joined.lignes.join(" · ")}`,
    ]
      .filter(Boolean)
      .join("\n\n");
    setEtat("envoi");
    const ok = await envoyerDemande({
      nom: texte("nom"),
      email: texte("email"),
      telephone: numeroComplet(texte("indicatif"), texte("telephone")),
      message,
      villa: texte("citystar_villa"),
      reponses: Object.fromEntries(
        QUESTIONS.map(([, propriete]) => [propriete, texte(propriete)]),
      ),
      langue,
      consentement: t.contact.consentement,
    });
    setEtat(ok ? "envoye" : "erreur");
    if (ok) allerAuRemerciement(langue);
    else signaler("formulaire_erreur", { formulaire: prefixe });
  }

  /** Premier champ touché : le visiteur a commencé la demande. */
  function debut() {
    if (commence) return;
    setCommence(true);
    signaler("formulaire_commence", { formulaire: prefixe });
    signalerDebutGoogleAds();
  }

  /** Envoi refusé par le navigateur : le champ obligatoire qui manque. */
  function incomplet(event: FormEvent<HTMLFormElement>) {
    const champ = event.target as HTMLInputElement | HTMLSelectElement;
    signaler("formulaire_incomplet", { formulaire: prefixe, champ: champ.name });
  }

  return (
    <>
      {joined && !discret && (
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
        <form onSubmit={envoyer} onFocus={debut} onInvalidCapture={incomplet}>
          {/* Seul le téléphone est obligatoire : le consultant rappelle. L'indicatif, avec son drapeau,
              est demandé car les acheteurs appellent du Maroc, de France et de toute l'Europe ;
              il est proposé d'office, et inutile si le numéro commence par + ou 00. */}
          <div className="contact-large contact-telephone">
            <label htmlFor={`${prefixe}-telephone`}>
              {t.contact.telephone} <span aria-hidden="true">*</span>
            </label>
            <div>
              <select
                name="indicatif"
                aria-label={t.contact.indicatif}
                value={pays}
                onChange={(event) => setPays(event.target.value)}
                required={!numeroInternational(numero)}
              >
                <option value="">{t.contact.indicatif}</option>
                {indicatifs?.prioritaires.map(({ pays, libelle }) => (
                  <option key={pays} value={pays}>
                    {libelle}
                  </option>
                ))}
                {indicatifs && (
                  <>
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
                  </>
                )}
              </select>
              <input
                id={`${prefixe}-telephone`}
                type="tel"
                name="telephone"
                autoComplete="tel-national"
                inputMode="tel"
                value={numero}
                onChange={(event) => setNumero(event.target.value)}
                required
              />
            </div>
          </div>
          <label className="contact-large">
            {t.contact.nom}
            <input name="nom" autoComplete="name" />
          </label>
          {/* Au Maroc, la brochure se reçoit d'abord sur WhatsApp : c'est le choix proposé d'office. */}
          {choixEnvoi && (
            <fieldset className="contact-large contact-moyen">
              <legend>{t.contact.recevoirPar}</legend>
              <div>
                {(["whatsapp", "email"] as const).map((valeur) => (
                  <label key={valeur}>
                    <input
                      type="radio"
                      name="moyen"
                      value={valeur}
                      checked={moyen === valeur}
                      onChange={() => setMoyen(valeur)}
                    />
                    <span>{valeur === "whatsapp" ? "WhatsApp" : t.contact.email}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}
          {(!choixEnvoi || moyen === "email") && (
            <label className="contact-large">
              {t.contact.email}
              <input type="email" name="email" autoComplete="email" required={choixEnvoi} />
            </label>
          )}
          {/* La villa n'est plus demandée ; celle choisie sur une fiche ou une porte part avec la demande. */}
          {joined?.villa && <input type="hidden" name="citystar_villa" value={joined.villa} />}
          {/* Les trois questions sont facultatives : repliées, pour que le formulaire paraisse court.
              Fermées, leurs listes partent quand même avec la demande. */}
          <details className="contact-large contact-preciser">
            <summary>{t.contact.projet}</summary>
            <div className="contact-questions">
              {QUESTIONS.map(([cle, propriete, valeurs]) => (
                <label key={cle}>
                  {t.contact.questions[cle].titre}
                  <select name={propriete} defaultValue="">
                    <option value="">{t.contact.choisir}</option>
                    {valeurs.map((valeur, i) => (
                      <option key={valeur} value={valeur}>
                        {t.contact.questions[cle].choix[i]}
                      </option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
          </details>
          {!court && (
            <label className="contact-large">
              {t.contact.message}
              <textarea name="message" rows={3} placeholder={t.contact.messageAide} />
            </label>
          )}
          {/* Mention d'information : la demande vaut accord pour le rappel et l'envoi du dossier. */}
          <p className="contact-consentement">{t.contact.consentement}</p>
          {etat === "erreur" && (
            <p className="contact-erreur" role="alert">
              {t.contact.erreur}
            </p>
          )}
          <button type="submit" disabled={etat === "envoi"}>
            {etat === "envoi" ? t.contact.envoi : (libelleEnvoyer ?? t.contact.envoyer)}{" "}
            <ArrowRight />
          </button>
        </form>
      )}
    </>
  );
}
