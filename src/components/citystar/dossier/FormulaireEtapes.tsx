import { ArrowLeft, ArrowRight, Check, ChevronRight } from "lucide-react";
import { type FormEvent, useEffect, useState } from "react";

import {
  engagements,
  formatPart,
  formatPrix,
  prixPublics,
  prixVilla,
  typeDepart,
} from "@/config/citystar";
import photo from "@/assets/citystar/rendus-sm/ext-piscine-jour.webp";

import { useDevise } from "../currency";
import type { Selection } from "../data";
import { allerAuRemerciement, envoyerDemande } from "../demande";
import { QUESTIONS } from "../FormulaireDemande";
import { listeIndicatifs, numeroComplet, numeroInternational, paysProbable } from "../indicatifs";
import { signaler, signalerDebutGoogleAds } from "../mesure";
import { useSite } from "../site";
import { textesDossier } from "./textes";

type Etat = "repos" | "envoi" | "erreur";
type Reponses = {
  decouvrir?: number;
  budget?: string;
  horizon?: string;
  projet?: string;
  financement?: number;
};

/** « Je me renseigne » n'a pas de valeur HubSpot : il part dans le message. */
const PLUS_TARD = "plus_tard";
const NB_ETAPES = 6;
const valeurs = (cle: "budget" | "horizon" | "projet") =>
  QUESTIONS.find(([nom]) => nom === cle)?.[2] ?? [];
const propriete = (cle: "budget" | "horizon" | "projet") =>
  QUESTIONS.find(([nom]) => nom === cle)?.[1] ?? "";

/**
 * Formulaire de la page d'atterrissage, en six étapes (15/11/2026, sur le modèle demandé par
 * l'utilisateur) : une question par écran, de gros boutons, puis les coordonnées à la fin.
 * Les réponses budget, horizon et projet vont dans leurs propriétés HubSpot ; la façon de
 * découvrir les villas et le financement partent dans le message, en français pour le consultant.
 */
export function FormulaireEtapes({
  id,
  classe,
  selection: selectionDonnee,
}: {
  id: string;
  classe: string;
  /** Réponses d'un outil (panneau « Être rappelé ») ; sinon, celles de la page. */
  selection?: Selection | null;
}) {
  const { langue, devise, taux, t: site } = useDevise();
  const { selection: selectionPage } = useSite();
  const selection = selectionDonnee !== undefined ? selectionDonnee : selectionPage;
  const t = textesDossier[langue].parcours;
  const fr = textesDossier.fr.parcours;
  const [etape, setEtape] = useState(0);
  const [reponses, setReponses] = useState<Reponses>({});
  const [etat, setEtat] = useState<Etat>("repos");
  const [commence, setCommence] = useState(false);
  const [indicatifs, setIndicatifs] = useState<ReturnType<typeof listeIndicatifs> | null>(null);
  const [pays, setPays] = useState("");
  const [numero, setNumero] = useState("");
  useEffect(() => {
    setIndicatifs(listeIndicatifs(langue));
    setPays((actuel) => actuel || paysProbable(langue));
  }, [langue]);

  const depart = prixVilla(typeDepart, devise, taux);
  const prixDepart = `${depart.approximatif ? "≈ " : ""}${formatPrix(depart.montant, devise, langue)}`;

  function debut() {
    if (commence) return;
    setCommence(true);
    signaler("formulaire_commence", { formulaire: id });
    signalerDebutGoogleAds();
  }

  function choisir(maj: Reponses) {
    debut();
    setReponses((avant) => ({ ...avant, ...maj }));
    const suivante = Math.min(etape + 1, NB_ETAPES - 1);
    setEtape(suivante);
    signaler("formulaire_etape", { formulaire: id, etape: String(suivante + 1) });
  }

  async function envoyer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const champs = new FormData(event.currentTarget);
    const texte = (nom: string) => String(champs.get(nom) ?? "").trim();
    const email = texte("email");
    const message = [
      reponses.decouvrir != null && `Souhait : ${fr.decouvrir.choix[reponses.decouvrir]}`,
      reponses.financement != null && `Financement : ${fr.financement.choix[reponses.financement]}`,
      reponses.horizon === PLUS_TARD && `Horizon : ${fr.horizon.plusTard}`,
      email ? "Brochure à envoyer par WhatsApp et par e-mail." : "Brochure à envoyer par WhatsApp.",
      selection && `${selection.outil} : ${selection.lignes.join(" · ")}`,
    ]
      .filter(Boolean)
      .join("\n\n");
    setEtat("envoi");
    const ok = await envoyerDemande({
      nom: texte("nom"),
      email,
      telephone: numeroComplet(pays, numero),
      message,
      villa: selection?.villa ?? "",
      reponses: {
        [propriete("budget")]: reponses.budget ?? "",
        [propriete("horizon")]: reponses.horizon === PLUS_TARD ? "" : (reponses.horizon ?? ""),
        [propriete("projet")]: reponses.projet ?? "",
      },
      langue,
      consentement: site.contact.consentement,
    });
    if (ok) allerAuRemerciement(langue);
    else {
      setEtat("erreur");
      signaler("formulaire_erreur", { formulaire: id });
    }
  }

  const choixQuestion = (cle: "budget" | "horizon" | "projet") =>
    valeurs(cle).map((valeur, i) => ({
      valeur,
      libelle: site.contact.questions[cle].choix[i] ?? valeur,
    }));

  const Option = ({
    libelle,
    onClick,
    actif,
  }: {
    libelle: string;
    onClick: () => void;
    actif: boolean;
  }) => (
    <button type="button" className={`fe-option${actif ? " is-actif" : ""}`} onClick={onClick}>
      <span>{libelle}</span>
      <ChevronRight aria-hidden="true" />
    </button>
  );

  let contenu: React.ReactNode;
  if (etape === 0)
    contenu = (
      <>
        <h3>{t.decouvrir.titre}</h3>
        {t.decouvrir.choix.map((libelle, i) => (
          <Option
            key={libelle}
            libelle={libelle}
            actif={reponses.decouvrir === i}
            onClick={() => choisir({ decouvrir: i })}
          />
        ))}
      </>
    );
  else if (etape === 1)
    contenu = (
      <>
        <h3>{t.budget.titre}</h3>
        {prixPublics && <p className="fe-aide">{t.budget.aide(prixDepart)}</p>}
        {choixQuestion("budget").map(({ valeur, libelle }) => (
          <Option
            key={valeur}
            libelle={libelle}
            actif={reponses.budget === valeur}
            onClick={() => choisir({ budget: valeur })}
          />
        ))}
      </>
    );
  else if (etape === 2)
    contenu = (
      <>
        <h3>{t.horizon.titre}</h3>
        {[...choixQuestion("horizon"), { valeur: PLUS_TARD, libelle: t.horizon.plusTard }].map(
          ({ valeur, libelle }) => (
            <Option
              key={valeur}
              libelle={libelle}
              actif={reponses.horizon === valeur}
              onClick={() => choisir({ horizon: valeur })}
            />
          ),
        )}
      </>
    );
  else if (etape === 3)
    contenu = (
      <>
        <h3>{t.projet.titre}</h3>
        {choixQuestion("projet").map(({ valeur, libelle }) => (
          <Option
            key={valeur}
            libelle={libelle}
            actif={reponses.projet === valeur}
            onClick={() => choisir({ projet: valeur })}
          />
        ))}
      </>
    );
  else if (etape === 4)
    contenu = (
      <>
        <h3>{t.financement.titre}</h3>
        {t.financement.choix.map((libelle, i) => (
          <Option
            key={libelle}
            libelle={libelle}
            actif={reponses.financement === i}
            onClick={() => choisir({ financement: i })}
          />
        ))}
      </>
    );
  else
    contenu = (
      <form
        className="fe-contact"
        onSubmit={envoyer}
        onFocus={debut}
        onInvalidCapture={(event) =>
          signaler("formulaire_incomplet", {
            formulaire: id,
            champ: (event.target as HTMLInputElement).name,
          })
        }
      >
        <h3>{t.contact.titre}</h3>
        <label>
          {t.contact.nom}
          <input name="nom" autoComplete="name" />
        </label>
        <div className="fe-telephone">
          <label htmlFor={`${id}-telephone`}>
            {t.contact.whatsapp} <span aria-hidden="true">*</span>
          </label>
          <div>
            <select
              name="indicatif"
              aria-label={site.contact.indicatif}
              value={pays}
              onChange={(event) => setPays(event.target.value)}
              required={!numeroInternational(numero)}
            >
              <option value="">{site.contact.indicatif}</option>
              {indicatifs?.prioritaires.map(({ pays: code, libelle }) => (
                <option key={code} value={code}>
                  {libelle}
                </option>
              ))}
              {indicatifs && (
                <>
                  <optgroup label={site.contact.europe}>
                    {indicatifs.europe.map(({ pays: code, libelle }) => (
                      <option key={code} value={code}>
                        {libelle}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label={site.contact.autresPays}>
                    {indicatifs.monde.map(({ pays: code, libelle }) => (
                      <option key={code} value={code}>
                        {libelle}
                      </option>
                    ))}
                  </optgroup>
                </>
              )}
            </select>
            <input
              id={`${id}-telephone`}
              type="tel"
              name="telephone"
              inputMode="tel"
              autoComplete="tel-national"
              value={numero}
              onChange={(event) => setNumero(event.target.value)}
              required
            />
          </div>
        </div>
        <label>
          {t.contact.email}
          <input type="email" name="email" autoComplete="email" />
        </label>
        <p className="fe-aide">{t.contact.aide}</p>
        {etat === "erreur" && (
          <p className="fe-erreur" role="alert">
            {site.contact.erreur}
          </p>
        )}
        <button type="submit" className="fe-envoyer" disabled={etat === "envoi"}>
          {etat === "envoi" ? site.contact.envoi : t.cta} <ArrowRight aria-hidden="true" />
        </button>
        <p className="fe-consentement">{site.contact.consentement}</p>
      </form>
    );

  return (
    <div id={id} className={`fe ${classe}`}>
      <div className="fe-entete">
        <img
          src={photo}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          width="828"
          height="466"
        />
        <div>
          <p className="fe-kicker">{t.kicker}</p>
          <h2>{t.titre}</h2>
        </div>
      </div>
      <div className="fe-corps">
        <div className="fe-progression" aria-hidden="true">
          {Array.from({ length: NB_ETAPES }, (_, i) => (
            <span key={i} className={i <= etape ? "is-fait" : undefined} />
          ))}
          <em>
            {etape + 1} / {NB_ETAPES}
          </em>
        </div>
        <div className="fe-etape" key={etape}>
          {contenu}
        </div>
        {etape > 0 && (
          <button type="button" className="fe-retour" onClick={() => setEtape(etape - 1)}>
            <ArrowLeft aria-hidden="true" /> {t.retour}
          </button>
        )}
        <ul className="fe-rassurance">
          {t.rassurance(formatPart(engagements.fondsPropres, langue)).map((ligne) => (
            <li key={ligne}>
              <Check aria-hidden="true" />
              {ligne}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
