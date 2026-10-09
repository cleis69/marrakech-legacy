import { ImagePlus, LogOut, Trash2, Upload } from "lucide-react";
import { type FormEvent, type ReactNode, useEffect, useMemo, useState } from "react";

import { type Devise, type EtapeChantier, formatDate, formatPrix } from "@/config/citystar";

import { useDevise } from "../currency";
import { Lien } from "../liens";
import {
  aujourdhui,
  type Categorie,
  type Etape,
  type EtatEspace,
  type Lot,
  type Photo,
  type StatutEtape,
  totaux,
} from "./donnees";
import { fichiers, reduirePhoto, tables } from "./supabase";

type Pret = Extract<EtatEspace, { phase: "pret" }>;
type Action = (travail: () => Promise<unknown>, succes: string) => Promise<boolean>;

const ETAPES: EtapeChantier[] = ["reservation", "fondations", "grosOeuvre", "finitions", "livraison"];
const STATUTS: Record<StatutEtape, string> = { a_venir: "À venir", en_cours: "En cours", termine: "Terminée" };
const CATEGORIES: Record<Categorie, string> = {
  contrat: "Contrat",
  plan: "Plan",
  appel: "Appel de fonds",
  recu: "Reçu",
  autre: "Autre document",
};
const DEVISES: Devise[] = ["EUR", "MAD", "GBP", "NOK"];
const DOMAINE = "domaine";

const villa = (numero: number) => `Villa ${String(numero).padStart(2, "0")}`;
const date = (iso: string) => formatDate(iso.slice(0, 10), "fr");

/**
 * Espace promoteur : les quatorze villas à gauche, la fiche de la villa choisie
 * à droite (avancement, acquéreurs, étapes, paiements, photos, documents).
 * Chaque enregistrement recharge les données : ce qui s'affiche est ce qui est en base.
 */
export function Admin({
  pret,
  recharger,
  sortir,
  lienEspace,
}: {
  pret: Pret;
  recharger: () => Promise<void>;
  sortir: () => void;
  lienEspace: string;
}) {
  const [choix, setChoix] = useState<string>(pret.lots[0]?.id ?? DOMAINE);
  const [message, setMessage] = useState<{ ok: boolean; texte: string } | null>(null);
  const [occupe, setOccupe] = useState(false);
  const lot = pret.lots.find((l) => l.id === choix);

  useEffect(() => {
    if (!message?.ok) return;
    const minuteur = window.setTimeout(() => setMessage(null), 3500);
    return () => window.clearTimeout(minuteur);
  }, [message]);

  const action: Action = async (travail, succes) => {
    setOccupe(true);
    setMessage(null);
    try {
      await travail();
      await recharger();
      setMessage({ ok: true, texte: succes });
      return true;
    } catch (erreur) {
      setMessage({
        ok: false,
        texte: `Échec : ${erreur instanceof Error ? erreur.message : String(erreur)}`,
      });
      return false;
    } finally {
      setOccupe(false);
    }
  };

  return (
    <section className="ad section-pad" aria-busy={occupe}>
      <div className="ec-barre">
        <p>Connecté avec {pret.session.email} · accès promoteur</p>
        <div className="ec-barre-actions">
          <Lien className="pill pill-secondary" vers={lienEspace}>
            <span className="pill-label">Voir comme un propriétaire</span>
          </Lien>
          <button type="button" className="ec-sortir" onClick={sortir}>
            <LogOut aria-hidden="true" />
            Se déconnecter
          </button>
        </div>
      </div>

      <div className="ad-cadre">
        <nav className="ad-liste" aria-label="Villas du domaine">
          <button
            type="button"
            aria-pressed={choix === DOMAINE}
            onClick={() => setChoix(DOMAINE)}
            className="ad-item ad-item-domaine"
          >
            <strong>Tout le domaine</strong>
            <span>Photos communes à tous les propriétaires</span>
          </button>
          {pret.lots.map((l) => (
            <button
              key={l.id}
              type="button"
              aria-pressed={choix === l.id}
              onClick={() => setChoix(l.id)}
              className="ad-item"
            >
              <strong>
                {villa(l.numero)}
                {l.type && <em> · {l.type}</em>}
              </strong>
              <span>
                {l.proprietaires?.length
                  ? l.proprietaires.map((p) => p.nom || p.email).join(", ")
                  : "Aucun acquéreur"}
              </span>
              <i className="ad-mini-jauge" style={{ "--part": l.avancement / 100 } as React.CSSProperties}>
                <b />
              </i>
              <small>{l.avancement} %</small>
            </button>
          ))}
        </nav>

        <div className="ad-fiche">
          {message && (
            <p className={`ad-message ${message.ok ? "is-ok" : "is-erreur"}`} role={message.ok ? "status" : "alert"}>
              {message.texte}
            </p>
          )}
          {lot ? (
            <FicheVilla key={lot.id} lot={lot} pret={pret} action={action} occupe={occupe} />
          ) : (
            <>
              <h2 className="ad-titre">Tout le domaine</h2>
              <BlocPhotos
                lotId={null}
                photos={pret.photos.filter((p) => p.lot_id === null)}
                liens={pret.liens}
                action={action}
                occupe={occupe}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function FicheVilla({ lot, pret, action, occupe }: { lot: Lot; pret: Pret; action: Action; occupe: boolean }) {
  return (
    <>
      <h2 className="ad-titre">
        {villa(lot.numero)}
        <span>Mis à jour le {date(lot.maj_le)}</span>
      </h2>
      <BlocVilla lot={lot} action={action} occupe={occupe} />
      <BlocProprietaires lot={lot} action={action} occupe={occupe} />
      <BlocEtapes lot={lot} action={action} occupe={occupe} />
      <BlocPaiements lot={lot} action={action} occupe={occupe} />
      <BlocPhotos
        lotId={lot.id}
        photos={pret.photos.filter((p) => p.lot_id === lot.id)}
        liens={pret.liens}
        action={action}
        occupe={occupe}
      />
      <BlocDocuments lot={lot} action={action} occupe={occupe} />
    </>
  );
}

function Bloc({ titre, aide, children }: { titre: string; aide?: string; children: ReactNode }) {
  return (
    <section className="ad-bloc">
      <header>
        <h3>{titre}</h3>
        {aide && <p>{aide}</p>}
      </header>
      {children}
    </section>
  );
}

/** Suppression en deux temps, sans fenêtre du navigateur : « Supprimer » puis « Confirmer ». */
function Supprimer({ surConfirmation, occupe, libelle = "Supprimer" }: { surConfirmation: () => void; occupe: boolean; libelle?: string }) {
  const [arme, setArme] = useState(false);
  useEffect(() => {
    if (!arme) return;
    const minuteur = window.setTimeout(() => setArme(false), 4000);
    return () => window.clearTimeout(minuteur);
  }, [arme]);
  return (
    <button
      type="button"
      className={`ad-suppr ${arme ? "is-arme" : ""}`}
      disabled={occupe}
      onClick={() => (arme ? surConfirmation() : setArme(true))}
      aria-label={arme ? `Confirmer : ${libelle.toLowerCase()}` : libelle}
    >
      <Trash2 aria-hidden="true" />
      <span>{arme ? "Confirmer" : libelle}</span>
    </button>
  );
}

function Enregistrer({ occupe, children = "Enregistrer" }: { occupe: boolean; children?: ReactNode }) {
  return (
    <button type="submit" className="pill pill-primary ad-envoyer" disabled={occupe}>
      <span className="pill-label">{children}</span>
    </button>
  );
}

/* ------------------------------------------------------------------ */

function BlocVilla({ lot, action, occupe }: { lot: Lot; action: Action; occupe: boolean }) {
  const [type, setType] = useState(lot.type ?? "");
  const [avancement, setAvancement] = useState(lot.avancement);
  const [note, setNote] = useState(lot.note ?? "");

  const envoyer = (evenement: FormEvent) => {
    evenement.preventDefault();
    void action(
      () =>
        tables.modifier("lots", `id=eq.${lot.id}`, {
          type: type || null,
          avancement,
          note: note.trim() || null,
        }),
      "Villa enregistrée.",
    );
  };

  return (
    <Bloc titre="Avancement" aide="Le pourcentage et le mot affichés en tête de l’espace du propriétaire.">
      <form className="ad-form" onSubmit={envoyer}>
        <label className="ad-champ">
          <span>Type</span>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">—</option>
            <option value="A">Villa A</option>
            <option value="B">Villa B</option>
            <option value="C">Villa C</option>
          </select>
        </label>
        <label className="ad-champ ad-trois">
          <span>Avancement des travaux : {avancement} %</span>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={avancement}
            onChange={(e) => setAvancement(Number(e.target.value))}
          />
        </label>
        <label className="ad-champ ad-plein">
          <span>Le mot du promoteur (facultatif)</span>
          <textarea rows={3} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Ex. : les fondations sont coulées, prochaine visite le 24 octobre." />
        </label>
        <Enregistrer occupe={occupe} />
      </form>
    </Bloc>
  );
}

function BlocProprietaires({ lot, action, occupe }: { lot: Lot; action: Action; occupe: boolean }) {
  const [email, setEmail] = useState("");
  const [nom, setNom] = useState("");
  const proprietaires = lot.proprietaires ?? [];

  const ajouter = async (evenement: FormEvent) => {
    evenement.preventDefault();
    const ok = await action(
      () => tables.ajouter("proprietaires", { lot_id: lot.id, email: email.trim().toLowerCase(), nom: nom.trim() || null }),
      "Acquéreur ajouté : il peut se connecter avec cette adresse.",
    );
    if (ok) {
      setEmail("");
      setNom("");
    }
  };

  return (
    <Bloc titre="Acquéreurs" aide="Chaque adresse ajoutée ici ouvre l’espace de cette villa à son titulaire, par lien de connexion.">
      {proprietaires.length > 0 && (
        <ul className="ad-lignes">
          {proprietaires.map((p) => (
            <li key={p.id}>
              <div>
                <strong>{p.nom || p.email}</strong>
                {p.nom && <span>{p.email}</span>}
              </div>
              <Supprimer
                occupe={occupe}
                libelle="Retirer"
                surConfirmation={() => void action(() => tables.supprimer("proprietaires", `id=eq.${p.id}`), "Accès retiré.")}
              />
            </li>
          ))}
        </ul>
      )}
      <form className="ad-form" onSubmit={ajouter}>
        <label className="ad-champ ad-large">
          <span>Adresse e-mail</span>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="ad-champ ad-large">
          <span>Nom (facultatif)</span>
          <input value={nom} onChange={(e) => setNom(e.target.value)} />
        </label>
        <Enregistrer occupe={occupe}>Ajouter</Enregistrer>
      </form>
    </Bloc>
  );
}

function BlocEtapes({ lot, action, occupe }: { lot: Lot; action: Action; occupe: boolean }) {
  const { t } = useDevise();
  const [etapes, setEtapes] = useState<Etape[]>(lot.etapes);
  const modifier = (id: string, changement: Partial<Etape>) =>
    setEtapes((liste) => liste.map((e) => (e.id === id ? { ...e, ...changement } : e)));

  const envoyer = (evenement: FormEvent) => {
    evenement.preventDefault();
    const changees = etapes.filter((e) => {
      const avant = lot.etapes.find((a) => a.id === e.id);
      return JSON.stringify(avant) !== JSON.stringify(e);
    });
    void action(
      () =>
        Promise.all(
          changees.map((e) =>
            tables.modifier("etapes", `id=eq.${e.id}`, {
              statut: e.statut,
              date_prevue: e.date_prevue || null,
              date_fin: e.date_fin || null,
              note: e.note?.trim() || null,
            }),
          ),
        ),
      changees.length ? "Étapes enregistrées." : "Aucun changement.",
    );
  };

  return (
    <Bloc titre="Étapes du chantier" aide="La frise de l’espace du propriétaire. La date de fin s’affiche une fois l’étape terminée.">
      <form className="ad-etapes" onSubmit={envoyer}>
        {etapes.map((e) => (
          <fieldset key={e.id} data-statut={e.statut}>
            <legend>{t.livraison.etapes[e.etape]}</legend>
            <label className="ad-champ">
              <span>Statut</span>
              <select value={e.statut} onChange={(ev) => modifier(e.id, { statut: ev.target.value as StatutEtape })}>
                {Object.entries(STATUTS).map(([valeur, nom]) => (
                  <option key={valeur} value={valeur}>
                    {nom}
                  </option>
                ))}
              </select>
            </label>
            <label className="ad-champ">
              <span>Prévue le</span>
              <input type="date" value={e.date_prevue ?? ""} onChange={(ev) => modifier(e.id, { date_prevue: ev.target.value || null })} />
            </label>
            <label className="ad-champ">
              <span>Terminée le</span>
              <input type="date" value={e.date_fin ?? ""} onChange={(ev) => modifier(e.id, { date_fin: ev.target.value || null })} />
            </label>
            <label className="ad-champ ad-plein">
              <span>Note (facultatif)</span>
              <input value={e.note ?? ""} onChange={(ev) => modifier(e.id, { note: ev.target.value })} />
            </label>
          </fieldset>
        ))}
        <Enregistrer occupe={occupe}>Enregistrer les étapes</Enregistrer>
      </form>
    </Bloc>
  );
}

function BlocPaiements({ lot, action, occupe }: { lot: Lot; action: Action; occupe: boolean }) {
  const { t } = useDevise();
  const vide = { libelle: "", etape: "", montant: "", devise: "EUR" as Devise, echeance: "", paye_le: "" };
  const [nouveau, setNouveau] = useState(vide);
  const sommes = useMemo(() => totaux(lot.paiements), [lot.paiements]);
  const champ = (cle: keyof typeof vide) => (e: { target: { value: string } }) =>
    setNouveau((n) => ({ ...n, [cle]: e.target.value }));

  const ajouter = async (evenement: FormEvent) => {
    evenement.preventDefault();
    const ok = await action(
      () =>
        tables.ajouter("paiements", {
          lot_id: lot.id,
          libelle: nouveau.libelle.trim(),
          etape: nouveau.etape || null,
          montant: Number(nouveau.montant.replace(/\s/g, "").replace(",", ".")),
          devise: nouveau.devise,
          echeance: nouveau.echeance || null,
          paye_le: nouveau.paye_le || null,
        }),
      "Échéance ajoutée.",
    );
    if (ok) setNouveau(vide);
  };

  return (
    <Bloc titre="Paiements" aide="L’échéancier du propriétaire. « Marquer réglé » date le paiement d’aujourd’hui.">
      {sommes.map((s) => (
        <p key={s.devise} className="ad-totaux">
          Réglé <strong>{formatPrix(s.regle, s.devise, "fr")}</strong> · Reste{" "}
          <strong>{formatPrix(s.reste, s.devise, "fr")}</strong> · Total{" "}
          <strong>{formatPrix(s.total, s.devise, "fr")}</strong>
        </p>
      ))}
      {lot.paiements.length > 0 && (
        <ul className="ad-lignes">
          {lot.paiements.map((p) => (
            <li key={p.id}>
              <div>
                <strong>
                  {p.libelle} — {formatPrix(Number(p.montant), p.devise, "fr")}
                </strong>
                <span>
                  {p.paye_le ? `Réglé le ${date(p.paye_le)}` : p.echeance ? `Échéance le ${date(p.echeance)}` : "Sans date"}
                  {p.etape && ` · ${t.livraison.etapes[p.etape]}`}
                </span>
              </div>
              <div className="ad-ligne-actions">
                <button
                  type="button"
                  className="ad-bouton"
                  disabled={occupe}
                  onClick={() =>
                    void action(
                      () => tables.modifier("paiements", `id=eq.${p.id}`, { paye_le: p.paye_le ? null : aujourdhui() }),
                      p.paye_le ? "Paiement remis à régler." : "Paiement marqué réglé.",
                    )
                  }
                >
                  {p.paye_le ? "Annuler le règlement" : "Marquer réglé"}
                </button>
                <Supprimer occupe={occupe} surConfirmation={() => void action(() => tables.supprimer("paiements", `id=eq.${p.id}`), "Échéance supprimée.")} />
              </div>
            </li>
          ))}
        </ul>
      )}
      <form className="ad-form" onSubmit={ajouter}>
        <label className="ad-champ ad-large">
          <span>Libellé</span>
          <input required value={nouveau.libelle} onChange={champ("libelle")} placeholder="Ex. : Réservation (30 %)" />
        </label>
        <label className="ad-champ">
          <span>Étape</span>
          <select value={nouveau.etape} onChange={champ("etape")}>
            <option value="">—</option>
            {ETAPES.map((e) => (
              <option key={e} value={e}>
                {t.livraison.etapes[e]}
              </option>
            ))}
          </select>
        </label>
        <label className="ad-champ">
          <span>Montant</span>
          <input required inputMode="decimal" pattern="[0-9 .,]+" value={nouveau.montant} onChange={champ("montant")} />
        </label>
        <label className="ad-champ">
          <span>Devise</span>
          <select value={nouveau.devise} onChange={champ("devise")}>
            {DEVISES.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </label>
        <label className="ad-champ">
          <span>Échéance</span>
          <input type="date" value={nouveau.echeance} onChange={champ("echeance")} />
        </label>
        <label className="ad-champ">
          <span>Réglé le</span>
          <input type="date" value={nouveau.paye_le} onChange={champ("paye_le")} />
        </label>
        <Enregistrer occupe={occupe}>Ajouter l’échéance</Enregistrer>
      </form>
    </Bloc>
  );
}

function BlocPhotos({
  lotId,
  photos,
  liens,
  action,
  occupe,
}: {
  lotId: string | null;
  photos: Photo[];
  liens: Map<string, string>;
  action: Action;
  occupe: boolean;
}) {
  const [selection, setSelection] = useState<File[]>([]);
  const [legende, setLegende] = useState("");
  const [prise, setPrise] = useState(aujourdhui());
  const [champ, setChamp] = useState(0);

  const envoyer = async (evenement: FormEvent) => {
    evenement.preventDefault();
    const ok = await action(async () => {
      for (const fichier of selection) {
        const image = await reduirePhoto(fichier);
        const chemin = `${lotId ?? DOMAINE}/${crypto.randomUUID()}.webp`;
        await fichiers.deposer("chantier", chemin, image);
        await tables.ajouter("photos", { lot_id: lotId, chemin, legende: legende.trim() || null, prise_le: prise });
      }
    }, selection.length > 1 ? `${selection.length} photos publiées.` : "Photo publiée.");
    if (ok) {
      setSelection([]);
      setLegende("");
      setChamp((n) => n + 1);
    }
  };

  return (
    <Bloc
      titre={lotId ? "Photos de la villa" : "Photos du domaine"}
      aide={lotId ? "Visibles par les acquéreurs de cette villa." : "Visibles par tous les propriétaires."}
    >
      {photos.length > 0 && (
        <ul className="ad-photos">
          {photos.map((photo) => (
            <li key={photo.id}>
              <img src={liens.get(photo.chemin)} alt={photo.legende ?? ""} loading="lazy" />
              <p>
                {photo.legende || "Sans légende"} · {date(photo.prise_le)}
              </p>
              <Supprimer
                occupe={occupe}
                surConfirmation={() =>
                  void action(async () => {
                    await tables.supprimer("photos", `id=eq.${photo.id}`);
                    await fichiers.supprimer("chantier", [photo.chemin]);
                  }, "Photo supprimée.")
                }
              />
            </li>
          ))}
        </ul>
      )}
      <form className="ad-form" onSubmit={envoyer}>
        <label className="ad-champ ad-fichier ad-plein">
          <ImagePlus aria-hidden="true" />
          <span>{selection.length ? `${selection.length} photo(s) choisie(s)` : "Choisir des photos (JPEG, PNG, WebP)"}</span>
          <input
            key={champ}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            required
            onChange={(e) => setSelection([...(e.target.files ?? [])])}
          />
        </label>
        <label className="ad-champ ad-large">
          <span>Légende (facultatif)</span>
          <input value={legende} onChange={(e) => setLegende(e.target.value)} />
        </label>
        <label className="ad-champ">
          <span>Prise le</span>
          <input type="date" required value={prise} onChange={(e) => setPrise(e.target.value)} />
        </label>
        <Enregistrer occupe={occupe}>Publier</Enregistrer>
      </form>
    </Bloc>
  );
}

function BlocDocuments({ lot, action, occupe }: { lot: Lot; action: Action; occupe: boolean }) {
  const [fichier, setFichier] = useState<File | null>(null);
  const [titre, setTitre] = useState("");
  const [categorie, setCategorie] = useState<Categorie>("contrat");
  const [champ, setChamp] = useState(0);

  const envoyer = async (evenement: FormEvent) => {
    evenement.preventDefault();
    if (!fichier) return;
    const extension = (fichier.name.split(".").pop() ?? "pdf").toLowerCase();
    const ok = await action(async () => {
      const chemin = `${lot.id}/${crypto.randomUUID()}.${extension}`;
      await fichiers.deposer("documents", chemin, fichier);
      await tables.ajouter("documents", { lot_id: lot.id, titre: titre.trim(), categorie, chemin, taille: fichier.size });
    }, "Document publié.");
    if (ok) {
      setFichier(null);
      setTitre("");
      setChamp((n) => n + 1);
    }
  };

  return (
    <Bloc titre="Documents" aide="Contrats, plans, appels de fonds, reçus : PDF ou image, 20 Mo au plus.">
      {lot.documents.length > 0 && (
        <ul className="ad-lignes">
          {lot.documents.map((doc) => (
            <li key={doc.id}>
              <div>
                <strong>{doc.titre}</strong>
                <span>
                  {CATEGORIES[doc.categorie]} · {date(doc.cree_le)}
                </span>
              </div>
              <Supprimer
                occupe={occupe}
                surConfirmation={() =>
                  void action(async () => {
                    await tables.supprimer("documents", `id=eq.${doc.id}`);
                    await fichiers.supprimer("documents", [doc.chemin]);
                  }, "Document supprimé.")
                }
              />
            </li>
          ))}
        </ul>
      )}
      <form className="ad-form" onSubmit={envoyer}>
        <label className="ad-champ ad-fichier ad-plein">
          <Upload aria-hidden="true" />
          <span>{fichier ? fichier.name : "Choisir un fichier (PDF, JPEG, PNG)"}</span>
          <input
            key={champ}
            type="file"
            accept="application/pdf,image/jpeg,image/png"
            required
            onChange={(e) => {
              const choisi = e.target.files?.[0] ?? null;
              setFichier(choisi);
              if (choisi && !titre) setTitre(choisi.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " "));
            }}
          />
        </label>
        <label className="ad-champ ad-large">
          <span>Titre</span>
          <input required value={titre} onChange={(e) => setTitre(e.target.value)} />
        </label>
        <label className="ad-champ">
          <span>Catégorie</span>
          <select value={categorie} onChange={(e) => setCategorie(e.target.value as Categorie)}>
            {Object.entries(CATEGORIES).map(([valeur, nom]) => (
              <option key={valeur} value={valeur}>
                {nom}
              </option>
            ))}
          </select>
        </label>
        <Enregistrer occupe={occupe}>Publier</Enregistrer>
      </form>
    </Bloc>
  );
}
