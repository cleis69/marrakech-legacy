import { type Langue, hubspot } from "@/config/citystar";

import { chemin, slug } from "./adresses";
import { langueSequence, languesAppareil } from "./langueAppareil";
import { canal, provenance } from "./provenance";

/** Ce qu'un formulaire du site transmet : seul le téléphone (complet, avec indicatif) est obligatoire. */
export type Demande = {
  nom: string;
  email: string;
  telephone: string;
  message: string;
  villa?: string;
  /** Propriétés HubSpot du formulaire (citystar_projet, citystar_horizon, citystar_budget). */
  reponses: Record<string, string>;
  langue: Langue;
  /** Texte d'information affiché sous le bouton, gardé avec le contact. */
  consentement: string;
};

/**
 * Envoie une demande du site. Elle crée le contact dans HubSpot avec ses réponses, la langue de sa
 * séquence e-mail, celle de son appareil et sa provenance. Elle passe par le relais du site
 * (`hubspot.relais`), qui inscrit aussitôt le contact dans la séquence e-mail Brevo ; si le relais
 * ne répond pas (aperçu, panne) et qu'un e-mail est donné, elle part directement à HubSpot.
 * Sans e-mail, seul le relais sait enregistrer la demande. Rend vrai si la demande est partie.
 */
export async function envoyerDemande(d: Demande) {
  const [prenom, ...reste] = d.nom.trim().split(/\s+/);
  const origine = provenance();
  const appareil = languesAppareil();
  const sequence = langueSequence(d.langue, appareil);
  const corps = JSON.stringify({
    fields: [
      { name: "firstname", value: prenom ?? "" },
      { name: "lastname", value: reste.join(" ") },
      { name: "email", value: d.email.trim() },
      { name: "phone", value: d.telephone },
      /* Page arabe : HubSpot n'a pas de choix « arabe », le commercial le lit en tête du message. */
      { name: "message", value: d.langue === "ar" ? `Page en arabe. ${d.message}`.trim() : d.message },
      { name: "hs_language", value: sequence },
      { name: "citystar_langue", value: sequence },
      { name: "citystar_langue_appareil", value: appareil.join(", ") },
      { name: "citystar_canal", value: canal(origine) },
      { name: "citystar_villa", value: d.villa ?? "" },
      ...Object.entries(d.reponses).map(([name, value]) => ({ name, value })),
      ...Object.entries(origine.utm).map(([name, value]) => ({ name, value })),
    ].filter((champ) => champ.value),
    context: { pageUri: window.location.href, pageName: document.title },
    legalConsentOptions: { consent: { consentToProcess: true, text: d.consentement } },
  });
  const envoi = (adresse: string) =>
    fetch(adresse, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: corps,
    });
  try {
    const relayee = await envoi(hubspot.relais).catch(() => null);
    const reponse = relayee?.ok || !d.email.trim() ? relayee : await envoi(hubspot.envoi);
    return Boolean(reponse?.ok);
  } catch {
    return false;
  }
}

/**
 * La demande est partie : le visiteur arrive sur la page de remerciement, par un vrai chargement
 * de page. C'est cette arrivée que Google Ads compte comme une demande.
 */
export function allerAuRemerciement(langue: Langue) {
  window.location.assign(chemin(langue, slug("merci", langue)));
}
