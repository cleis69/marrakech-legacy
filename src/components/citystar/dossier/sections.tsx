import {
  ArrowRight,
  Banknote,
  Check,
  FileText,
  MessageCircle,
  Phone,
  Globe2,
  Landmark,
  ShieldCheck,
  ZoomIn,
} from "lucide-react";
import { useEffect, useState } from "react";

import {
  AFFICHER_PLAN_MASSE,
  calendrier,
  contact,
  engagements,
  formatMois,
  formatPart,
  formatPrix,
  formatSurface,
  gaucheADroite,
  prixPublics,
  prixVilla,
  programme,
  reservation,
  typeDepart,
} from "@/config/citystar";
import masterplan from "@/assets/citystar/masterplan.webp";
import photoA from "@/assets/citystar/rendus/ext-volume-lames.webp";
import photoB from "@/assets/citystar/rendus/ext-aerien-piscine.webp";
import photoC from "@/assets/citystar/rendus/ext-facade-jardin.webp";
import ouvertureMobileSm from "@/assets/citystar/rendus-sm/ext-pergola-portrait.webp";
import ouvertureMobileLg from "@/assets/citystar/rendus/ext-pergola-portrait.webp";
/* Version 1200 px (16/11/2026) : les téléphones à écran haute densité prenaient la 1600 px (236 Ko)
   pour l'image qui compte le plus dans le premier affichage ; celle-ci pèse 140 Ko. Hors du dossier
   des rendus, pour ne pas entrer dans la galerie. */
import ouvertureMobileMd from "@/assets/citystar/ouverture/ext-pergola-portrait-1200.webp";
import ouvertureSm from "@/assets/citystar/rendus-sm/ext-facade-crepuscule.webp";
import ouvertureLg from "@/assets/citystar/rendus/ext-facade-crepuscule.webp";
import salonSm from "@/assets/citystar/rendus-sm/int-salon.webp";
import salonLg from "@/assets/citystar/rendus/int-salon.webp";
import piscineSm from "@/assets/citystar/rendus-sm/ext-piscine-jour.webp";
import piscineLg from "@/assets/citystar/rendus/ext-piscine-jour.webp";
import facadeSm from "@/assets/citystar/rendus-sm/ext-facade-entree.webp";
import facadeLg from "@/assets/citystar/rendus/ext-facade-entree.webp";
import chambreSm from "@/assets/citystar/rendus-sm/int-chambre-jour.webp";
import chambreLg from "@/assets/citystar/rendus/int-chambre-jour.webp";
import terrasseSm from "@/assets/citystar/rendus-sm/ext-terrasse-jour.webp";
import terrasseLg from "@/assets/citystar/rendus/ext-terrasse-jour.webp";
import suiteSm from "@/assets/citystar/rendus-sm/int-chambre-bois.webp";
import suiteLg from "@/assets/citystar/rendus/int-chambre-bois.webp";
import cuisineSm from "@/assets/citystar/rendus-sm/int-cuisine.webp";
import cuisineLg from "@/assets/citystar/rendus/int-cuisine.webp";
import repasSm from "@/assets/citystar/rendus-sm/int-salle-a-manger.webp";
import repasLg from "@/assets/citystar/rendus/int-salle-a-manger.webp";
import bainSm from "@/assets/citystar/rendus-sm/int-bain-baignoire.webp";
import bainLg from "@/assets/citystar/rendus/int-bain-baignoire.webp";

import { useDevise } from "../currency";
import { FormulaireDemande } from "../FormulaireDemande";
import { CLASSE_DEMANDE, CLASSE_SANS_BARRE, ID_DEMANDE } from "../contexte";
import { useSite } from "../site";
import { signaler, signalerWhatsAppGoogleAds } from "../mesure";
import { PillButton } from "../ui/PillButton";
import { FormulaireEtapes } from "./FormulaireEtapes";
import { textesDossier } from "./textes";

/**
 * Lien WhatsApp de la page d'atterrissage (15/11/2026, accord de l'utilisateur) : message prérempli.
 * Chaque clic est signalé à la balise (`whatsapp_clic`), pour le compter à côté des demandes.
 */
export function LienWhatsApp({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { langue } = useDevise();
  const texte = textesDossier[langue].parcours.messageWhatsapp;
  return (
    <a
      className={className}
      href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(texte)}`}
      target="_blank"
      rel="noopener"
      onClick={() => {
        signaler("whatsapp_clic", { page: "dossier" });
        signalerWhatsAppGoogleAds();
      }}
    >
      {children}
    </a>
  );
}

/** Bulle WhatsApp en bas de l'écran, sur mobile, au-dessus de la barre « Recevoir la brochure ». */
export function BulleWhatsApp() {
  const { langue } = useDevise();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    /* Comme la barre du bas : cachée tant que l'ouverture, le formulaire ou le dernier appel est à l'écran. */
    const aLEcran = new Set<Element>();
    const guetteur = new IntersectionObserver((entrees) => {
      for (const entree of entrees) {
        if (entree.isIntersecting) aLEcran.add(entree.target);
        else aLEcran.delete(entree.target);
      }
      setVisible(aLEcran.size === 0);
    });
    document
      .querySelectorAll(`.${CLASSE_DEMANDE}, .${CLASSE_SANS_BARRE}`)
      .forEach((zone) => guetteur.observe(zone));
    return () => guetteur.disconnect();
  }, []);
  return (
    <LienWhatsApp className={`dw-bulle${visible ? " is-visible" : ""}`}>
      <MessageCircle aria-hidden="true" />
      <span className="sr-only">{textesDossier[langue].parcours.bulleWhatsapp}</span>
    </LienWhatsApp>
  );
}

/* Une seule villa à l'écran (15/11/2026, demande de l'utilisateur) : ni types A, B, C ni comparaison,
   les pièces en images. Trois grandes cartes, puis le reste en bande que l'on fait défiler. */
const PIECES = [
  { sm: salonSm, lg: salonLg },
  { sm: piscineSm, lg: piscineLg },
  { sm: facadeSm, lg: facadeLg },
  { sm: chambreSm, lg: chambreLg },
  { sm: terrasseSm, lg: terrasseLg },
  { sm: suiteSm, lg: suiteLg },
  /* Ajoutées le 16/11/2026, à la demande de l'utilisateur : la cuisine, la salle à manger, la salle de bains. */
  { sm: cuisineSm, lg: cuisineLg },
  { sm: repasSm, lg: repasLg },
  { sm: bainSm, lg: bainLg },
];
/** Ordre de la bande : la cuisine et la salle à manger, puis la nuit, la salle de bains, la terrasse. */
const BANDE = [6, 7, 3, 5, 8, 4];

export function LaVilla() {
  const { langue } = useDevise();
  const t = textesDossier[langue].parcours.villa;
  const carte = (i: number, grande: boolean) => {
    const piece = PIECES[i];
    if (!piece) return null;
    return (
      <figure key={i} className={grande ? "vp-grande" : "vp-petite"}>
        <img
          src={piece.sm}
          srcSet={`${piece.sm} 800w, ${piece.lg} 1600w`}
          sizes={grande ? "(max-width: 900px) 100vw, 60vw" : "(max-width: 900px) 80vw, 30vw"}
          alt={t.pieces[i]}
          loading="lazy"
          decoding="async"
          width="800"
          height="450"
        />
        <figcaption>
          <span>{t.kicker}</span>
          <strong>{t.pieces[i]}</strong>
          {i === 1 && <em>{t.piscine}</em>}
        </figcaption>
      </figure>
    );
  };
  return (
    <section id="la-villa" className="vp" aria-labelledby="vp-titre">
      <div className="vp-tete">
        <p className="vp-kicker">{t.kicker}</p>
        <Titre id="vp-titre" lignes={t.titre} />
      </div>
      <div className="vp-grandes">{[0, 1, 2].map((i) => carte(i, true))}</div>
      <div className="vp-bande">{BANDE.map((i) => carte(i, false))}</div>
    </section>
  );
}

/** Le formulaire en étapes, juste sous l'ouverture : c'est l'ancre de la page. */
export function DossierFormulaire() {
  return (
    <section className="df2" aria-label="Formulaire">
      <FormulaireEtapes id={ID_DEMANDE} classe={CLASSE_DEMANDE} />
    </section>
  );
}

/** Dernier appel, en bas de page : ramène au formulaire, ou WhatsApp, ou le téléphone. */
export function DossierAppel() {
  const { langue } = useDevise();
  const demander = useDemanderDossier();
  const t = textesDossier[langue].parcours;
  return (
    <section className={`dap ${CLASSE_SANS_BARRE}`} aria-labelledby="dap-titre">
      <div className="dap-carte">
        <p className="dap-kicker">{t.final.kicker}</p>
        <h2 id="dap-titre">{t.final.titre}</h2>
        <p>{t.final.texte}</p>
        <button type="button" className="dap-bouton" onClick={demander}>
          {t.cta} <ArrowRight aria-hidden="true" />
        </button>
        <LienWhatsApp className="dap-whatsapp">
          <MessageCircle aria-hidden="true" /> {t.whatsapp}
        </LienWhatsApp>
        <div className="dap-bureau">
          <p>{t.final.question}</p>
          <a href={`tel:${contact.telephone}`}>
            <Phone aria-hidden="true" /> {gaucheADroite(contact.telephoneAffiche, langue)}
          </a>
        </div>
      </div>
    </section>
  );
}
const acompte = reservation.paliers.find((palier) => palier.etape === "reservation");

/** Toutes les demandes de la page ramènent au formulaire du haut de page. */
export function useDemanderDossier() {
  const { ouvrirContact } = useSite();
  return ouvrirContact;
}

function Titre({ lignes, id }: { lignes: readonly string[]; id: string }) {
  const [premiere, ...suite] = lignes;
  return (
    <h2 id={id}>
      {premiere}
      <br />
      <span className="ton">{suite.join(" ")}</span>
    </h2>
  );
}

/* ------------------------------------------------------------------ */
/* Le formulaire, affiché dans la page : en ouverture, puis rappelé     */
/* ------------------------------------------------------------------ */

/**
 * La carte du formulaire « Recevoir la brochure ». Sans réponse d'un outil de la page, la demande
 * porte sur la brochure ; une villa choisie sur une porte ou le sélecteur y est jointe et affichée.
 * `rang` distingue les formulaires d'une même page ; le premier porte l'ancre de la page.
 */
function CarteDemande({ rang, entete = false }: { rang: number; entete?: boolean }) {
  const { langue, t: site } = useDevise();
  const { selection } = useSite();
  const t = textesDossier[langue];
  return (
    <aside
      id={rang === 1 ? ID_DEMANDE : undefined}
      className={`dh-carte ${CLASSE_DEMANDE}`}
      aria-label={site.villas.brochure}
    >
      {entete && (
        <>
          <p className="dh-carte-kicker">{t.carte.intro}</p>
          <h2>{site.villas.brochure}</h2>
          <p className="dh-carte-contenu">{t.carte.elements.slice(0, 4).join(" · ")}</p>
        </>
      )}
      <FormulaireDemande
        selection={selection ?? site.header.brochureDemande}
        discret={!selection}
        court
        choixEnvoi
        prefixe={`${ID_DEMANDE}-${rang}`}
        envoyer={site.villas.brochure}
      />
    </aside>
  );
}

/**
 * Rappel du formulaire au fil de la page : ce que contient l'envoi à gauche, le formulaire à droite.
 * `final` : dernier appel, avec le titre de fin de page.
 */
export function DossierDemande({ rang, final = false }: { rang: number; final?: boolean }) {
  const { langue, t: site } = useDevise();
  const t = textesDossier[langue];
  const id = `dd-titre-${rang}`;
  return (
    <section className="dd" aria-labelledby={id}>
      {/* Pas d'apparition au défilement : le formulaire ne doit jamais dépendre d'une animation. */}
      <div className="dd-cadre">
        <div className="dd-texte">
          {final ? (
            <>
              <Titre id={id} lignes={t.final.titre} />
              <p>{t.final.texte}</p>
            </>
          ) : (
            <>
              <p className="dc-kicker">{t.carte.intro}</p>
              <h2 id={id}>{site.villas.brochure}</h2>
              <ul className="dd-liste">
                {t.carte.elements.map((element) => (
                  <li key={element}>
                    <Check aria-hidden="true" />
                    {element}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <CarteDemande rang={rang} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Ouverture : la vidéo des rendus, la promesse datée, le formulaire   */
/* ------------------------------------------------------------------ */

export function DossierHero({ titre }: { titre?: readonly [string, string] } = {}) {
  const { langue, devise, taux } = useDevise();
  const t = textesDossier[langue];
  /* Le prix d'entrée, promis par l'annonce (« dès 950 k€ »), visible dès l'arrivée, y compris sur mobile. */
  const depart = prixVilla(typeDepart, devise, taux);
  const prixDepart = `${depart.approximatif ? "≈ " : ""}${formatPrix(depart.montant, devise, langue)}`;
  const aPartirDe = prixPublics ? t.hero.prix(prixDepart) : null;
  const demander = useDemanderDossier();
  const [ligne1, ligne2] = titre ?? t.hero.titre(formatMois(calendrier.livraison, langue));
  const part = acompte?.confirme && acompte.part != null ? formatPart(acompte.part, langue) : null;

  return (
    <section className={`dh ${CLASSE_SANS_BARRE}`} aria-labelledby="dh-titre">
      <div className="dh-cadre">
        {/* Pas de vidéo sur la page d'atterrissage (15/11/2026) : une image fixe, verticale sur mobile
            (la pergola), en largeur sur grand écran (la façade au crépuscule). */}
        <picture>
          <source
            media="(max-width: 900px)"
            srcSet={`${ouvertureMobileSm} 800w, ${ouvertureMobileMd} 1200w, ${ouvertureMobileLg} 1600w`}
            sizes="100vw"
          />
          <img
            className="dh-affiche"
            src={ouvertureLg}
            srcSet={`${ouvertureSm} 800w, ${ouvertureLg} 1600w`}
            sizes="100vw"
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            decoding="async"
            width="1600"
            height="900"
          />
        </picture>
        <div className="dh-voile" aria-hidden="true" />

        <div className="dh-contenu">
          {/* Ouverture sur le modèle demandé le 15/11/2026 : le titre, une ligne, trois chiffres, un
              bouton vers le formulaire en étapes et WhatsApp. Pas d'animation d'apparition. */}
          <div className="dh-texte">
            <p className="dh-chip">{t.hero.lieu}</p>
            <h1 id="dh-titre">
              <span className="sr-only">CITYSTAR — </span>
              <span className="dh-ligne">{ligne1}</span>
              <span className="dh-ligne ton">{ligne2}</span>
            </h1>
            <p className="dh-intro">
              {t.parcours.intro(
                formatSurface(programme.terrainMaxM2, langue),
                programme.trajetMaxMinutes,
              )}
            </p>
            <dl className="dh-chiffres">
              {aPartirDe && (
                <div>
                  <dt>{t.parcours.chiffres.prix}</dt>
                  <dd>{prixDepart}</dd>
                </div>
              )}
              <div>
                <dt>{t.parcours.terrain}</dt>
                <dd>{formatSurface(programme.terrainMaxM2, langue)}</dd>
              </div>
              <div>
                <dt>{t.parcours.chiffres.livraison}</dt>
                <dd>{formatMois(calendrier.livraison, langue)}</dd>
              </div>
            </dl>
            <div className="dh-appel">
              <button type="button" className="dh-bouton" onClick={demander}>
                {t.parcours.cta} <ArrowRight aria-hidden="true" />
              </button>
              <LienWhatsApp className="dh-whatsapp">
                <MessageCircle aria-hidden="true" /> {t.parcours.whatsapp}
              </LienWhatsApp>
            </div>
            {part && (
              <p className="dh-conditions">
                <Check aria-hidden="true" />
                {t.hero.conditions(part)}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Quatre garanties                                                    */
/* ------------------------------------------------------------------ */

const ICONES_GARANTIES = [Landmark, ShieldCheck, Banknote, Globe2];

export function Garanties() {
  const { langue } = useDevise();
  const t = textesDossier[langue];
  const garanties = t.garanties(formatPart(engagements.fondsPropres, langue));
  return (
    <section className="dg" aria-label={t.garantiesLabel}>
      <ul>
        {garanties.map((g, i) => {
          const Icone = ICONES_GARANTIES[i] ?? Check;
          return (
            <li key={g.titre} data-vu="" style={{ "--i": i } as React.CSSProperties}>
              <Icone aria-hidden="true" />
              <h3>{g.titre}</h3>
              <p>{g.texte}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Ce que contient le dossier, et ce qui se passe ensuite              */
/* ------------------------------------------------------------------ */

export function ContenuDossier() {
  const { langue } = useDevise();
  const demander = useDemanderDossier();
  const t = textesDossier[langue];
  const c = t.contenu;
  return (
    <section className="dc section-pad" aria-labelledby="dc-titre">
      <div className="dc-tete" data-vu="">
        <p className="dc-kicker">{c.kicker}</p>
        <Titre id="dc-titre" lignes={c.titre} />
        <p className="dc-intro">{c.intro}</p>
      </div>

      <div className="dc-grille">
        <ol className="dc-liste">
          {c.elements.map((e, i) => (
            <li key={e.titre} data-vu="" style={{ "--i": i % 2 } as React.CSSProperties}>
              <span className="dc-num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{e.titre}</h3>
              <p>{e.texte}</p>
            </li>
          ))}
          <li className="dc-telecharger" data-vu="">
            <span className="dc-num">PDF</span>
            <div className="dc-liens">
              <button type="button" onClick={demander}>
                <FileText aria-hidden="true" />
                {c.demander}
              </button>
            </div>
          </li>
        </ol>

        <aside className="dc-ensuite" data-vu="" aria-labelledby="dc-ensuite-titre">
          <h3 id="dc-ensuite-titre">{c.ensuite}</h3>
          <ol>
            {c.etapes.map((e, i) => (
              <li key={e.titre}>
                <span>{i + 1}</span>
                <div>
                  <p className="dc-etape-titre">{e.titre}</p>
                  <p>{e.texte}</p>
                </div>
              </li>
            ))}
          </ol>
          <button type="button" className="pill pill-primary" onClick={demander}>
            <span className="pill-label">{t.hero.demander}</span>
          </button>
        </aside>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* L'espace propriétaire, montré tel qu'un acquéreur le verra           */
/* ------------------------------------------------------------------ */

export function ApercuEspace() {
  const { langue, t: site } = useDevise();
  const e = textesDossier[langue].espace;
  const etapes = Object.values(site.livraison.etapes);
  return (
    <section id="espace-proprietaire" className="da section-pad" aria-labelledby="da-titre">
      <div className="da-texte" data-vu="">
        <p className="dc-kicker">{e.kicker}</p>
        <Titre id="da-titre" lignes={e.titre} />
        <p className="dc-intro">{e.intro}</p>
        <ul className="da-points">
          {e.points.map((p) => (
            <li key={p.titre}>
              <Check aria-hidden="true" />
              <div>
                <h3>{p.titre}</h3>
                <p>{p.texte}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <figure className="da-ecran" data-vu="">
        <div className="da-maquette" aria-hidden="true">
          <div className="da-tete">
            <span className="da-chip">{e.villa}</span>
            <p className="da-avancement">{e.avancement}</p>
            <p className="da-pourcent">
              22<span>%</span>
            </p>
            <p className="da-etape">{site.livraison.etapes.fondations}</p>
            <div className="da-jauge">
              <span />
            </div>
          </div>
          <div className="da-bas">
            <ol className="da-frise">
              {etapes.map((nom, i) => (
                <li key={nom} data-statut={i === 0 ? "termine" : i === 1 ? "en_cours" : "a_venir"}>
                  <i />
                  {nom}
                </li>
              ))}
            </ol>
            <div className="da-paiement">
              <p>{e.paiement}</p>
              <strong>{e.paiementLibelle}</strong>
            </div>
            <div className="da-photos">
              <p>{e.photos}</p>
              <div>
                <img src={photoA} alt="" loading="lazy" />
                <img src={photoB} alt="" loading="lazy" />
                <img src={photoC} alt="" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
        <figcaption>{e.legende}</figcaption>
      </figure>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Le plan de masse : quatorze parcelles, et le choix qui se réduit     */
/* ------------------------------------------------------------------ */

export function Parcelles() {
  const { langue } = useDevise();
  const { ouvrirPlan } = useSite();
  const demander = useDemanderDossier();
  const p = textesDossier[langue].parcelles;
  return (
    <section
      className={`dp section-pad${AFFICHER_PLAN_MASSE ? "" : " dp--seul"}`}
      aria-labelledby="dp-titre"
    >
      <div className="dp-texte" data-vu="">
        <p className="dc-kicker">{p.kicker}</p>
        <Titre id="dp-titre" lignes={p.titre} />
        <p className="dc-intro">{p.texte}</p>
        <dl className="dp-faits">
          {p.faits(formatSurface(programme.terrainMaxM2, langue)).map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.valeur}</dd>
            </div>
          ))}
        </dl>
        <PillButton label={p.demander} icon={FileText} onClick={demander} />
      </div>
      {AFFICHER_PLAN_MASSE && (
        <figure className="dp-plan" data-vu="">
          <button type="button" onClick={() => ouvrirPlan(masterplan)} aria-label={p.agrandir}>
            <img src={masterplan} alt={p.legende} loading="lazy" />
            <span className="dp-zoom">
              <ZoomIn aria-hidden="true" />
            </span>
            <span className="dp-pastille">
              {programme.nombreVillas} × {formatSurface(programme.terrainMaxM2, langue)}
            </span>
          </button>
          <figcaption>{p.legende}</figcaption>
        </figure>
      )}
    </section>
  );
}
