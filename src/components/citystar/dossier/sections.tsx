import {
  Banknote,
  Check,
  Download,
  FileText,
  Globe2,
  Landmark,
  MessageCircle,
  Pause,
  Phone,
  Play,
  Rotate3d,
  ShieldCheck,
  ZoomIn,
} from "lucide-react";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import {
  brochures,
  calendrier,
  contact,
  engagements,
  formatDecimal,
  formatMois,
  formatPart,
  formatSurface,
  programme,
  reservation,
  villasChiffres,
} from "@/config/citystar";
import heroVideo from "@/assets/citystar/hero-rendus.mp4";
import heroPoster from "@/assets/citystar/hero-rendus-poster.webp";
import masterplan from "@/assets/citystar/masterplan.webp";
import photoA from "@/assets/citystar/rendus/ext-volume-lames.webp";
import photoB from "@/assets/citystar/rendus/ext-aerien-piscine.webp";
import photoC from "@/assets/citystar/rendus/ext-facade-jardin.webp";

import { useDevise } from "../currency";
import { scrollTo } from "../data";
import { fichierPublic } from "../liens";
import { useSite } from "../site";
import { PillButton } from "../ui/PillButton";
import { textesDossier } from "./textes";

const surfaceMax = Math.max(...Object.values(villasChiffres).map((v) => v.surfaceConstruiteM2));
const acompte = reservation.paliers.find((palier) => palier.etape === "reservation");
const whatsapp = `https://wa.me/${contact.whatsapp}`;

/** Toutes les demandes de la page ouvrent le formulaire existant, avec le dossier joint. */
export function useDemanderDossier() {
  const { langue, ouvrirContactAvec } = useSite();
  return () => ouvrirContactAvec(textesDossier[langue].selection);
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
/* Ouverture : la vidéo des rendus, la promesse datée, la carte du dossier */
/* ------------------------------------------------------------------ */

export function DossierHero() {
  const { langue } = useDevise();
  const t = textesDossier[langue];
  const demander = useDemanderDossier();
  const reduce = useReducedMotion();
  const video = useRef<HTMLVideoElement>(null);
  const [lecture, setLecture] = useState(false);
  const [ligne1, ligne2] = t.hero.titre(formatMois(calendrier.livraison, langue));
  const part = acompte?.confirme && acompte.part != null ? formatPart(acompte.part, langue) : null;

  useEffect(() => {
    if (reduce) video.current?.pause();
  }, [reduce]);

  const basculer = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) void v.play().catch(() => setLecture(false));
    else v.pause();
  };

  return (
    <section className="dh" aria-labelledby="dh-titre">
      <div className="dh-cadre">
        <video
          ref={video}
          className="dh-video"
          autoPlay
          muted
          loop
          playsInline
          poster={heroPoster}
          aria-hidden="true"
          onPlay={() => setLecture(true)}
          onPause={() => setLecture(false)}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="dh-voile" aria-hidden="true" />

        <div className="dh-contenu">
          <div className="dh-texte">
            <p className="dh-chip">{t.hero.lieu}</p>
            <h1 id="dh-titre">
              <span className="sr-only">CITYSTAR — </span>
              <span className="dh-ligne">{ligne1}</span>
              <span className="dh-ligne ton">{ligne2}</span>
            </h1>
            <p className="dh-intro">
              {t.hero.texte(
                formatSurface(surfaceMax, langue),
                formatSurface(programme.terrainMaxM2, langue),
                programme.trajetMaxMinutes,
              )}
            </p>
            <div className="dh-actions">
              <PillButton label={t.hero.demander} icon={FileText} onClick={demander} />
              <PillButton
                label={t.hero.visite}
                icon={Rotate3d}
                variant="secondary"
                onClick={() => scrollTo("visite")}
              />
            </div>
            {part && (
              <p className="dh-conditions">
                <Check aria-hidden="true" />
                {t.hero.conditions(part)}
              </p>
            )}
          </div>

          <aside className="dh-carte" aria-labelledby="dh-carte-titre">
            <p className="dh-carte-kicker">{t.carte.intro}</p>
            <h2 id="dh-carte-titre">{t.carte.titre}</h2>
            <ul>
              {t.carte.elements.map((element) => (
                <li key={element}>
                  <Check aria-hidden="true" />
                  {element}
                </li>
              ))}
            </ul>
            <button type="button" className="pill pill-primary dh-carte-bouton" onClick={demander}>
              <span className="pill-label">{t.carte.bouton}</span>
            </button>
            <p className="dh-discretion">{t.carte.discretion}</p>
            <a
              className="dh-brochure"
              href={fichierPublic(brochures.citystar.fichier)}
              target="_blank"
              rel="noreferrer"
            >
              <Download aria-hidden="true" />
              {t.carte.brochure(t.poids(formatDecimal(brochures.citystar.mo, langue)))}
            </a>
          </aside>
        </div>

        <div className="dh-pied">
          <button
            type="button"
            className="dh-pause"
            onClick={basculer}
            aria-label={lecture ? t.hero.pause : t.hero.lecture}
          >
            {lecture ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
          </button>
          <p>{t.hero.rendu}</p>
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
              {(["A", "B", "C"] as const).map((type) => (
                <a key={type} href={fichierPublic(brochures[type].fichier)} target="_blank" rel="noreferrer">
                  <Download aria-hidden="true" />
                  {c.plan(type)}
                </a>
              ))}
              <a href={fichierPublic(brochures.citystar.fichier)} target="_blank" rel="noreferrer">
                <Download aria-hidden="true" />
                {c.brochure} · {t.poids(formatDecimal(brochures.citystar.mo, langue))}
              </a>
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
    <section className="dp section-pad" aria-labelledby="dp-titre">
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
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Dernier appel                                                       */
/* ------------------------------------------------------------------ */

export function DossierFinal() {
  const { langue } = useDevise();
  const demander = useDemanderDossier();
  const f = textesDossier[langue].final;
  return (
    <section className="df" aria-labelledby="df-titre">
      <div className="df-cadre" data-vu="">
        <Titre id="df-titre" lignes={f.titre} />
        <p>{f.texte}</p>
        <div className="df-actions">
          <PillButton label={f.demander} icon={FileText} onClick={demander} />
          <a className="pill pill-secondary df-lien" href={whatsapp} target="_blank" rel="noreferrer">
            <MessageCircle aria-hidden="true" />
            <span className="pill-label">{f.whatsapp}</span>
          </a>
          <a className="pill pill-secondary df-lien" href={`tel:${contact.telephone}`}>
            <Phone aria-hidden="true" />
            <span className="pill-label">
              {f.appeler} · {contact.telephoneAffiche}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
