import { ChevronLeft, ChevronRight, Download, FileText, LogOut, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { type Devise, formatDate, formatPrix, type Langue, LOCALE } from "@/config/citystar";

import { Compteur } from "../Compteur";
import { useDevise } from "../currency";
import { Lien } from "../liens";
import { aujourdhui, type EtatEspace, type Lot, type Photo, totaux } from "./donnees";
import { fichiers } from "./supabase";
import { textesEspace } from "./textes";

type Pret = Extract<EtatEspace, { phase: "pret" }>;

const dateCourte = (iso: string, langue: Langue) => formatDate(iso.slice(0, 10), langue);

function taille(octets: number, langue: Langue) {
  const mo = octets >= 1_000_000;
  return new Intl.NumberFormat(LOCALE[langue], {
    style: "unit",
    unit: mo ? "megabyte" : "kilobyte",
    unitDisplay: "short",
    maximumFractionDigits: mo ? 1 : 0,
  }).format(mo ? octets / 1_000_000 : octets / 1000);
}

/** Tableau de bord du propriétaire : sa villa, son chantier, ses paiements, ses documents. */
export function Tableau({
  pret,
  sortir,
  lienPromoteur,
}: {
  pret: Pret;
  sortir: () => void;
  lienPromoteur: string;
}) {
  const { langue } = useDevise();
  const te = textesEspace[langue];
  const [choix, setChoix] = useState(pret.lots[0]?.id);
  const lot = pret.lots.find((l) => l.id === choix) ?? pret.lots[0];

  return (
    <section className="ec section-pad" aria-label={te.avancement}>
      <div className="ec-barre">
        <p>{te.connecte(pret.session.email)}</p>
        <div className="ec-barre-actions">
          {pret.admin && (
            <Lien className="pill pill-secondary" vers={lienPromoteur}>
              <span className="pill-label">{te.promoteur}</span>
            </Lien>
          )}
          <button type="button" className="ec-sortir" onClick={sortir}>
            <LogOut aria-hidden="true" />
            {te.deconnexion}
          </button>
        </div>
      </div>

      {!lot ? (
        <div className="ec-vide ec-entree">
          <h2>{te.aucun.titre}</h2>
          <p>{te.aucun.texte}</p>
        </div>
      ) : (
        <>
          {pret.lots.length > 1 && (
            <div className="ec-choix" role="group" aria-label={te.choisir}>
              {pret.lots.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  aria-pressed={l.id === lot.id}
                  onClick={() => setChoix(l.id)}
                >
                  {te.villa(l.numero)}
                </button>
              ))}
            </div>
          )}
          <Villa key={lot.id} lot={lot} pret={pret} langue={langue} />
        </>
      )}
    </section>
  );
}

function Villa({ lot, pret, langue }: { lot: Lot; pret: Pret; langue: Langue }) {
  const { t } = useDevise();
  const te = textesEspace[langue];
  const photos = pret.photos.filter((p) => p.lot_id === lot.id || p.lot_id === null);
  const enCours = lot.etapes.find((e) => e.statut === "en_cours");

  return (
    <div className="ec-villa">
      <article className="ec-avancement ec-entree" style={{ "--i": 0 } as React.CSSProperties}>
        <div className="ec-av-tete">
          <p className="ec-chip">
            {te.villa(lot.numero)}
            {lot.type && <span> · {te.type(lot.type)}</span>}
          </p>
          <h2>{te.avancement}</h2>
          <p className="ec-maj">{te.majLe(dateCourte(lot.maj_le, langue))}</p>
        </div>
        <div className="ec-av-chiffre">
          <p className="ec-pourcent">
            <Compteur valeur={lot.avancement} langue={langue} />
            <span>%</span>
          </p>
          {enCours && <p className="ec-en-cours">{t.livraison.etapes[enCours.etape]}</p>}
        </div>
        <div
          className="ec-jauge"
          style={{ "--part": lot.avancement / 100 } as React.CSSProperties}
          aria-hidden="true"
        >
          <span />
        </div>
        {lot.note && (
          <blockquote className="ec-mot">
            <p className="ec-mot-titre">{te.mot}</p>
            <p>{lot.note}</p>
          </blockquote>
        )}
      </article>

      <div className="ec-grille">
        <article className="ec-carte ec-entree" style={{ "--i": 1 } as React.CSSProperties}>
          <h3>{te.etapes.titre}</h3>
          <ol className="ec-etapes">
            {lot.etapes.map((etape) => (
              <li key={etape.id} data-statut={etape.statut}>
                <span className="ec-point" aria-hidden="true" />
                <div>
                  <p className="ec-etape-nom">
                    {t.livraison.etapes[etape.etape]}
                    <span className="ec-statut">{te.etapes.statuts[etape.statut]}</span>
                  </p>
                  {etape.statut === "termine" && etape.date_fin ? (
                    <p className="ec-etape-date">
                      {te.etapes.finie(dateCourte(etape.date_fin, langue))}
                    </p>
                  ) : etape.date_prevue ? (
                    <p className="ec-etape-date">
                      {te.etapes.prevue(dateCourte(etape.date_prevue, langue))}
                    </p>
                  ) : null}
                  {etape.note && <p className="ec-etape-note">{etape.note}</p>}
                </div>
              </li>
            ))}
          </ol>
        </article>

        <Paiements lot={lot} langue={langue} />
      </div>

      <Photos photos={photos} liens={pret.liens} langue={langue} />
      <Documents lot={lot} langue={langue} demo={pret.session.access_token === ""} />
    </div>
  );
}

function Paiements({ lot, langue }: { lot: Lot; langue: Langue }) {
  const te = textesEspace[langue].paiements;
  const jour = aujourdhui();
  const sommes = totaux(lot.paiements);
  const prix = (montant: number, devise: Devise) => formatPrix(Math.round(montant), devise, langue);

  return (
    <article className="ec-carte ec-entree" style={{ "--i": 2 } as React.CSSProperties}>
      <h3>{te.titre}</h3>
      {lot.paiements.length === 0 ? (
        <p className="ec-carte-vide">{te.vide}</p>
      ) : (
        <>
          {sommes.map((s) => (
            <div key={s.devise} className="ec-totaux">
              <dl>
                <div>
                  <dt>{te.regle}</dt>
                  <dd>{prix(s.regle, s.devise)}</dd>
                </div>
                <div>
                  <dt>{te.reste}</dt>
                  <dd>{prix(s.reste, s.devise)}</dd>
                </div>
                <div>
                  <dt>{te.total}</dt>
                  <dd>{prix(s.total, s.devise)}</dd>
                </div>
              </dl>
              <div
                className="ec-jauge ec-jauge-claire"
                style={{ "--part": s.total ? s.regle / s.total : 0 } as React.CSSProperties}
                aria-hidden="true"
              >
                <span />
              </div>
            </div>
          ))}
          <ul className="ec-paiements">
            {lot.paiements.map((p) => {
              const statut = p.paye_le
                ? "regle"
                : p.echeance && p.echeance <= jour
                  ? "aRegler"
                  : "aVenir";
              return (
                <li key={p.id} data-statut={statut}>
                  <div>
                    <p className="ec-paiement-nom">{p.libelle}</p>
                    <p className="ec-paiement-date">
                      {p.paye_le
                        ? te.paye(dateCourte(p.paye_le, langue))
                        : p.echeance
                          ? te.echeance(dateCourte(p.echeance, langue))
                          : te.sansDate}
                    </p>
                  </div>
                  <div className="ec-paiement-droite">
                    <p className="ec-montant">{prix(Number(p.montant), p.devise)}</p>
                    <span className="ec-statut">
                      {statut === "regle" ? te.regle : statut === "aRegler" ? te.aRegler : te.aVenir}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </article>
  );
}

function Photos({
  photos,
  liens,
  langue,
}: {
  photos: Photo[];
  liens: Map<string, string>;
  langue: Langue;
}) {
  const te = textesEspace[langue].photos;
  const [ouverte, setOuverte] = useState<number | null>(null);
  const visibles = photos.filter((p) => liens.has(p.chemin));

  return (
    <article className="ec-carte ec-entree" style={{ "--i": 3 } as React.CSSProperties}>
      <h3>{te.titre}</h3>
      {visibles.length === 0 ? (
        <p className="ec-carte-vide">{te.vide}</p>
      ) : (
        <ul className="ec-photos">
          {visibles.map((photo, i) => (
            <li key={photo.id}>
              <button type="button" onClick={() => setOuverte(i)} aria-label={te.agrandir}>
                <img src={liens.get(photo.chemin)} alt={photo.legende ?? ""} loading="lazy" />
              </button>
              <p className="ec-photo-legende">
                {photo.lot_id === null && <span className="ec-chip-mini">{te.domaine}</span>}
                {photo.legende}
                <time dateTime={photo.prise_le}>{dateCourte(photo.prise_le, langue)}</time>
              </p>
            </li>
          ))}
        </ul>
      )}
      {ouverte !== null && (
        <Visionneuse
          photos={visibles}
          liens={liens}
          depart={ouverte}
          langue={langue}
          fermer={() => setOuverte(null)}
        />
      )}
    </article>
  );
}

/** Photo en grand dans une fenêtre native : Échap ferme, les flèches font défiler. */
function Visionneuse({
  photos,
  liens,
  depart,
  langue,
  fermer,
}: {
  photos: Photo[];
  liens: Map<string, string>;
  depart: number;
  langue: Langue;
  fermer: () => void;
}) {
  const te = textesEspace[langue].photos;
  const ref = useRef<HTMLDialogElement>(null);
  const [i, setI] = useState(depart);
  const photo = photos[i];
  const aller = (pas: number) => setI((n) => (n + pas + photos.length) % photos.length);

  useEffect(() => {
    ref.current?.showModal();
  }, []);

  if (!photo) return null;
  return (
    <dialog
      ref={ref}
      className="ec-visionneuse"
      onClose={fermer}
      onClick={(evenement) => evenement.target === ref.current && ref.current.close()}
      onKeyDown={(evenement) => {
        if (evenement.key === "ArrowRight") aller(1);
        if (evenement.key === "ArrowLeft") aller(-1);
      }}
    >
      <figure>
        <img src={liens.get(photo.chemin)} alt={photo.legende ?? ""} />
        <figcaption>
          {photo.legende}
          <time dateTime={photo.prise_le}>{dateCourte(photo.prise_le, langue)}</time>
        </figcaption>
      </figure>
      {photos.length > 1 && (
        <>
          <button type="button" className="ec-vis-prec" onClick={() => aller(-1)} aria-label={te.precedente}>
            <ChevronLeft aria-hidden="true" />
          </button>
          <button type="button" className="ec-vis-suiv" onClick={() => aller(1)} aria-label={te.suivante}>
            <ChevronRight aria-hidden="true" />
          </button>
        </>
      )}
      <button type="button" className="ec-vis-fermer" onClick={() => ref.current?.close()} aria-label={te.fermer}>
        <X aria-hidden="true" />
      </button>
    </dialog>
  );
}

function Documents({ lot, langue, demo }: { lot: Lot; langue: Langue; demo: boolean }) {
  const te = textesEspace[langue].documents;
  const [liens, setLiens] = useState<Map<string, string>>(new Map());
  const chemins = useMemo(() => lot.documents.map((d) => d.chemin), [lot.documents]);

  useEffect(() => {
    if (demo) return;
    let actif = true;
    fichiers
      .signer("documents", chemins)
      .then((signes) => actif && setLiens(signes))
      .catch(() => {});
    return () => {
      actif = false;
    };
  }, [chemins, demo]);

  return (
    <article className="ec-carte ec-entree" style={{ "--i": 4 } as React.CSSProperties}>
      <h3>{te.titre}</h3>
      {lot.documents.length === 0 ? (
        <p className="ec-carte-vide">{te.vide}</p>
      ) : (
        <ul className="ec-docs">
          {lot.documents.map((doc) => {
            const lien = liens.get(doc.chemin);
            const extension = doc.chemin.split(".").pop() ?? "pdf";
            return (
              <li key={doc.id}>
                <FileText className="ec-doc-icone" aria-hidden="true" />
                <div>
                  <p className="ec-doc-titre">{doc.titre}</p>
                  <p className="ec-doc-meta">
                    {te.categories[doc.categorie]} · {dateCourte(doc.cree_le, langue)}
                    {doc.taille ? ` · ${taille(doc.taille, langue)}` : ""}
                  </p>
                </div>
                <a
                  className="ec-doc-lien"
                  href={lien ? `${lien}&download=${encodeURIComponent(`${doc.titre}.${extension}`)}` : undefined}
                  aria-disabled={!lien}
                >
                  <Download aria-hidden="true" />
                  <span>{te.ouvrir}</span>
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </article>
  );
}
