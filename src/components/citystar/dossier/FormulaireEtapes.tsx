import { ArrowLeft, ArrowRight, Check, ChevronRight } from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";

import {
  contact,
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
import { type Demande, envoyerDemande } from "../demande";
import { QUESTIONS } from "../FormulaireDemande";
import {
  listeIndicatifs,
  numeroComplet,
  numeroInternational,
  numeroPlausible,
  paysProbable,
} from "../indicatifs";
import { merci } from "../merci";
import {
  signaler,
  signalerDebutGoogleAds,
  signalerDemandeGoogleAds,
  signalerDemandeMeta,
  signalerWhatsAppGoogleAds,
} from "../mesure";
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
type Coordonnees = { nom: string; email: string; telephone: string };

/** « Je me renseigne » n'a pas de valeur HubSpot : il part dans le message. */
const PLUS_TARD = "plus_tard";

/* Les étapes : 0 budget, 1 coordonnées (la demande part ici), 2 à 5 questions facultatives, 6 fin. */
const BUDGET = 0;
const COORDONNEES = 1;
const PREMIERE_QUESTION = 2;
const DERNIERE_QUESTION = 5;
const FIN = 6;
const NB_ETAPES = 6;

const valeurs = (cle: "budget" | "horizon" | "projet") =>
  QUESTIONS.find(([nom]) => nom === cle)?.[2] ?? [];
const propriete = (cle: "budget" | "horizon" | "projet") =>
  QUESTIONS.find(([nom]) => nom === cle)?.[1] ?? "";

/** Réponses des questions facultatives, pour savoir s'il y a quelque chose à compléter. */
const complements = (r: Reponses) =>
  JSON.stringify([r.decouvrir, r.horizon, r.projet, r.financement]);

/**
 * Formulaire de la page d'atterrissage et du site, en six étapes (15/11/2026, simplifié le
 * 16/11/2026 à la demande de l'utilisateur) : le budget d'abord, puis les coordonnées. La demande
 * part à ce moment-là, avec le budget : le visiteur ne voit pas de page de remerciement, il continue
 * par quatre questions facultatives qui complètent sa fiche (envoyées à la fin, ou si la page est
 * quittée). Le budget, l'horizon et le projet vont dans leurs propriétés HubSpot ; la façon de
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
  const fin = merci[langue];
  const [etape, setEtape] = useState(BUDGET);
  const [reponses, setReponses] = useState<Reponses>({});
  const [etat, setEtat] = useState<Etat>("repos");
  const [commence, setCommence] = useState(false);
  const [indicatifs, setIndicatifs] = useState<ReturnType<typeof listeIndicatifs> | null>(null);
  const [pays, setPays] = useState("");
  const [numero, setNumero] = useState("");
  /* Numéro trop court ou trop long refusé à l'envoi : le message reste jusqu'à la correction. */
  const [numeroSignale, setNumeroSignale] = useState(false);
  const numeroFaux = numero.trim() !== "" && !numeroPlausible(pays, numero);
  /* Ce qui est déjà parti : les coordonnées, et les réponses facultatives déjà envoyées. */
  const coordonnees = useRef<Coordonnees | null>(null);
  const reponsesRef = useRef<Reponses>({});
  const dejaEnvoye = useRef<string>("");
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

  /** La demande, avec les réponses connues à cet instant (le budget seul au premier envoi). */
  function construire(c: Coordonnees, r: Reponses, persistant = false): Demande {
    const message = [
      r.decouvrir != null && `Souhait : ${fr.decouvrir.choix[r.decouvrir]}`,
      r.financement != null && `Financement : ${fr.financement.choix[r.financement]}`,
      r.horizon === PLUS_TARD && `Horizon : ${fr.horizon.plusTard}`,
      c.email
        ? "Brochure à envoyer par WhatsApp et par e-mail."
        : "Brochure à envoyer par WhatsApp.",
      selection && `${selection.outil} : ${selection.lignes.join(" · ")}`,
    ]
      .filter(Boolean)
      .join("\n\n");
    return {
      nom: c.nom,
      email: c.email,
      telephone: c.telephone,
      message,
      villa: selection?.villa ?? "",
      reponses: {
        [propriete("budget")]: r.budget ?? "",
        [propriete("horizon")]: r.horizon === PLUS_TARD ? "" : (r.horizon ?? ""),
        [propriete("projet")]: r.projet ?? "",
      },
      langue,
      consentement: site.contact.consentement,
      ...(persistant && { persistant: true }),
    };
  }

  /**
   * Complète la fiche avec les réponses facultatives (même téléphone ou e-mail : HubSpot met le
   * contact à jour). Rien n'est renvoyé s'il n'y a rien de nouveau.
   */
  function completer(r: Reponses, persistant = false) {
    const c = coordonnees.current;
    if (!c) return;
    const marque = complements(r);
    if (marque === dejaEnvoye.current) return;
    dejaEnvoye.current = marque;
    void envoyerDemande(construire(c, r, persistant));
  }

  /* Si la page est quittée en cours de route (onglet masqué, fermé, autre adresse), les réponses
     déjà données partent quand même. */
  useEffect(() => {
    const masquee = () => {
      if (document.visibilityState === "hidden") completer(reponsesRef.current, true);
    };
    const quittee = () => completer(reponsesRef.current, true);
    document.addEventListener("visibilitychange", masquee);
    window.addEventListener("pagehide", quittee);
    return () => {
      document.removeEventListener("visibilitychange", masquee);
      window.removeEventListener("pagehide", quittee);
    };
    // Les valeurs lues sont dans des références : l'écouteur n'a pas à être recréé.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function aller(suivante: number) {
    setEtape(suivante);
    signaler("formulaire_etape", { formulaire: id, etape: String(suivante + 1) });
  }

  /** Une réponse : elle est gardée, puis on passe à la question suivante (ou à la fin). */
  function choisir(maj: Reponses) {
    debut();
    const reponse = { ...reponses, ...maj };
    setReponses(reponse);
    reponsesRef.current = reponse;
    if (etape < DERNIERE_QUESTION) aller(etape + 1);
    else terminer(reponse);
  }

  function terminer(reponse: Reponses = reponses) {
    completer(reponse);
    aller(FIN);
  }

  function passer() {
    if (etape < DERNIERE_QUESTION) aller(etape + 1);
    else terminer();
  }

  /** Les coordonnées : la demande part ici, avec le budget. Pas de page de remerciement. */
  async function envoyer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (numeroFaux) {
      setNumeroSignale(true);
      signaler("formulaire_incomplet", { formulaire: id, champ: "telephone_longueur" });
      event.currentTarget.querySelector<HTMLInputElement>('input[name="telephone"]')?.focus();
      return;
    }
    const champs = new FormData(event.currentTarget);
    const texte = (nom: string) => String(champs.get(nom) ?? "").trim();
    const c: Coordonnees = {
      nom: texte("nom"),
      email: texte("email"),
      telephone: numeroComplet(pays, numero),
    };
    setEtat("envoi");
    const ok = await envoyerDemande(construire(c, reponses));
    if (!ok) {
      setEtat("erreur");
      signaler("formulaire_erreur", { formulaire: id });
      return;
    }
    coordonnees.current = c;
    dejaEnvoye.current = complements(reponses);
    setEtat("repos");
    signaler("formulaire_envoye", { formulaire: id });
    /* La demande est comptée par Google Ads au moment où elle part, pas à l'arrivée sur une page. */
    signalerDemandeGoogleAds();
    signalerDemandeMeta();
    aller(PREMIERE_QUESTION);
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

  /** Le rappel que la demande est partie, sur les questions facultatives, et la sortie. */
  const Complement = ({ children }: { children: React.ReactNode }) => (
    <>
      <p className="fe-envoye">
        <Check aria-hidden="true" />
        <span>
          {t.complement.envoye} {t.complement.intro}
        </span>
      </p>
      {children}
      <div className="fe-complement">
        <button type="button" className="fe-lien" onClick={passer}>
          {t.complement.passer}
        </button>
        <button type="button" className="fe-lien" onClick={() => terminer()}>
          {t.complement.terminer}
        </button>
      </div>
    </>
  );

  let contenu: React.ReactNode;
  if (etape === BUDGET)
    contenu = (
      <>
        <h3>{t.budget.titre}</h3>
        {prixPublics && <p className="fe-aide">{t.budget.aide(prixDepart)}</p>}
        {choixQuestion("budget").map(({ valeur, libelle }) => (
          <Option
            key={valeur}
            libelle={libelle}
            actif={reponses.budget === valeur}
            onClick={() => {
              debut();
              const reponse = { ...reponses, budget: valeur };
              setReponses(reponse);
              reponsesRef.current = reponse;
              aller(COORDONNEES);
            }}
          />
        ))}
      </>
    );
  else if (etape === COORDONNEES)
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
              aria-invalid={numeroSignale && numeroFaux ? true : undefined}
              aria-describedby={numeroSignale && numeroFaux ? `${id}-numero-faux` : undefined}
            />
          </div>
          {numeroSignale && numeroFaux && (
            <p id={`${id}-numero-faux`} className="fe-erreur" role="alert">
              {site.contact.numeroIncomplet}
            </p>
          )}
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
  else if (etape === PREMIERE_QUESTION)
    contenu = (
      <Complement>
        <h3>{t.decouvrir.titre}</h3>
        {t.decouvrir.choix.map((libelle, i) => (
          <Option
            key={libelle}
            libelle={libelle}
            actif={reponses.decouvrir === i}
            onClick={() => choisir({ decouvrir: i })}
          />
        ))}
      </Complement>
    );
  else if (etape === PREMIERE_QUESTION + 1)
    contenu = (
      <Complement>
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
      </Complement>
    );
  else if (etape === PREMIERE_QUESTION + 2)
    contenu = (
      <Complement>
        <h3>{t.projet.titre}</h3>
        {choixQuestion("projet").map(({ valeur, libelle }) => (
          <Option
            key={valeur}
            libelle={libelle}
            actif={reponses.projet === valeur}
            onClick={() => choisir({ projet: valeur })}
          />
        ))}
      </Complement>
    );
  else if (etape === DERNIERE_QUESTION)
    contenu = (
      <Complement>
        <h3>{t.financement.titre}</h3>
        {t.financement.choix.map((libelle, i) => (
          <Option
            key={libelle}
            libelle={libelle}
            actif={reponses.financement === i}
            onClick={() => choisir({ financement: i })}
          />
        ))}
      </Complement>
    );
  else {
    /* La fin, sans changer de page : la demande est déjà comptée. WhatsApp et le téléphone en sortie. */
    const messageWhatsapp = encodeURIComponent(fin.whatsapp.message);
    contenu = (
      <>
        <h3>{fin.titreH1.join(" ")}</h3>
        <p className="fe-aide">{fin.intro}</p>
        <a
          className="fe-option"
          href={`https://wa.me/${contact.whatsapp}?text=${messageWhatsapp}`}
          target="_blank"
          rel="noopener"
          onClick={() => {
            signaler("whatsapp_clic", { page: "formulaire_fin" });
            signalerWhatsAppGoogleAds();
          }}
        >
          <span>{fin.whatsapp.titre}</span>
          <ChevronRight aria-hidden="true" />
        </a>
        <a className="fe-option" href={`tel:${contact.telephone}`}>
          <span>
            {fin.appeler.titre} · <bdi dir="ltr">{contact.telephoneAffiche}</bdi>
          </span>
          <ChevronRight aria-hidden="true" />
        </a>
      </>
    );
  }

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
        {etape < FIN && (
          <div className="fe-progression" aria-hidden="true">
            {Array.from({ length: NB_ETAPES }, (_, i) => (
              <span key={i} className={i <= etape ? "is-fait" : undefined} />
            ))}
            {/* « 1 / 6 » se lit de gauche à droite, même en arabe. */}
            <em dir="ltr">
              {etape + 1} / {NB_ETAPES}
            </em>
          </div>
        )}
        <div className="fe-etape" key={etape}>
          {contenu}
        </div>
        {/* Retour seulement vers le budget : une fois la demande partie, on ne revient plus en arrière. */}
        {etape === COORDONNEES && (
          <button type="button" className="fe-retour" onClick={() => setEtape(BUDGET)}>
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
