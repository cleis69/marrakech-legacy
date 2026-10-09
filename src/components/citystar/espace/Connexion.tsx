import { type FormEvent, useState } from "react";

import type { TextesEspace } from "./textes";
import { ErreurApi, envoyerLien } from "./supabase";

/**
 * Connexion sans mot de passe : l'adresse reçoit un lien qui ramène sur la page
 * en cours, connecté. Commune à l'espace propriétaire et à l'espace promoteur.
 */
export function Connexion({
  t,
  erreurLien,
  demander,
}: {
  t: TextesEspace["connexion"];
  erreurLien: string | null;
  demander?: () => void;
}) {
  const [email, setEmail] = useState("");
  const [etape, setEtape] = useState<"saisie" | "envoi" | "envoye">("saisie");
  const [erreur, setErreur] = useState<string | null>(erreurLien ? t.erreurLien : null);

  const envoyer = async (evenement: FormEvent) => {
    evenement.preventDefault();
    setEtape("envoi");
    setErreur(null);
    try {
      await envoyerLien(email, window.location.origin + window.location.pathname);
      setEtape("envoye");
    } catch (probleme) {
      setErreur(
        probleme instanceof ErreurApi && probleme.statut === 429 ? t.erreurLimite : t.erreurEnvoi,
      );
      setEtape("saisie");
    }
  };

  return (
    <div className="ec-connexion ec-entree">
      <h2>{t.titre}</h2>
      {etape === "envoye" ? (
        <>
          <p className="ec-envoye" role="status">
            {t.envoye(email.trim().toLowerCase())}
          </p>
          <button type="button" className="ec-lien" onClick={() => setEtape("saisie")}>
            {t.autre}
          </button>
        </>
      ) : (
        <form onSubmit={envoyer}>
          <p>{t.texte}</p>
          <label className="ec-champ">
            <span>{t.email}</span>
            <input
              type="email"
              required
              autoComplete="email"
              inputMode="email"
              value={email}
              onChange={(evenement) => setEmail(evenement.target.value)}
            />
          </label>
          {erreur && (
            <p className="ec-erreur" role="alert">
              {erreur}
            </p>
          )}
          <button type="submit" className="pill pill-primary" disabled={etape === "envoi"}>
            <span className="pill-label">{etape === "envoi" ? t.envoi : t.envoyer}</span>
          </button>
        </form>
      )}
      {demander && (
        <p className="ec-acces">
          {t.pasAcces}{" "}
          <button type="button" className="ec-lien" onClick={demander}>
            {t.demander}
          </button>
        </p>
      )}
    </div>
  );
}
