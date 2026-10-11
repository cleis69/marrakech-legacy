import { ArrowRight, CalendarRange, Landmark } from "lucide-react";
import { useEffect, useState } from "react";

import {
  type Devise,
  type TypeVilla,
  bornesBudget,
  bornesFinancement,
  calendrier,
  convertirEUR,
  coutsDetention,
  financement,
  formatMois,
  formatNombre,
  formatPart,
  formatPrix,
  hypothesesRendement,
  LOCALE,
  moisRestants,
  prixVilla,
  reservation,
} from "@/config/citystar";

import { CurrencyPills, useDevise } from "./currency";
import type { Selection } from "./data";
import { PillButton } from "./ui/PillButton";

type CleCredit = keyof typeof bornesFinancement;

/* Même villa de référence que le simulateur de rentabilité, tant que rien n'est saisi. */
const TYPE_PAR_DEFAUT: TypeVilla = "B";
const acompte = reservation.paliers.find((palier) => palier.etape === "reservation");
const PART_RESERVATION = acompte?.confirme && acompte.part != null ? acompte.part : 0.3;

/**
 * Deux outils autour d'un même prix étudié : l'échéancier des versements
 * (réservation chez le notaire, solde au fil du chantier) et la mensualité
 * d'un crédit immobilier. Les hypothèses de crédit sont des valeurs
 * d'illustration, réglables ; le site le dit au visiteur.
 */
export function Financement({ onContact }: { onContact: (selection: Selection) => void }) {
  const { devise, langue, t, taux } = useDevise();
  const f = t.financement;
  const [saisi, setSaisi] = useState<{ montant: number; devise: Devise } | null>(null);
  const [credit, setCredit] = useState<Record<CleCredit, number>>({
    apport: PART_RESERVATION,
    tauxAnnuel: financement.tauxAnnuel.valeur ?? 0.05,
    dureeAnnees: financement.dureeAnnees.valeur ?? 15,
    revenuNetMensuelEUR: Math.round(
      (hypothesesRendement.loyerMensuelEUR.valeur ?? 0) * (1 - (coutsDetention.charges.valeur ?? 0)),
    ),
  });
  /* Le compte à rebours dépend du jour de la visite : calculé dans le navigateur seulement. */
  const [restants, setRestants] = useState<number | null>(null);
  useEffect(() => setRestants(moisRestants(calendrier.livraison, new Date())), []);

  const enDevise = (montantEUR: number) => Math.round(convertirEUR(montantEUR, devise, taux));
  const enEUR = (montant: number, source: Devise) =>
    source === "EUR" ? montant : montant / taux[source];
  const money = (valeur: number) => formatPrix(Math.round(valeur), devise, langue);
  const pourcent = (valeur: number, decimales = 0) =>
    `${valeur.toLocaleString(LOCALE[langue], { minimumFractionDigits: decimales, maximumFractionDigits: decimales })} %`;

  const prixReference = saisi
    ? saisi.devise === devise
      ? saisi.montant
      : enDevise(enEUR(saisi.montant, saisi.devise))
    : prixVilla(TYPE_PAR_DEFAUT, devise, taux).montant;
  const bornes = bornesBudget(devise, taux);
  const prix = Math.min(Math.max(prixReference, bornes.min), bornes.max);
  const livraison = formatMois(calendrier.livraison, langue);

  /* ---- Échéancier : les parts confirmées, puis le solde en une ligne ---- */
  const confirmes = reservation.paliers.filter((p) => p.confirme && p.part != null);
  const solde = 1 - confirmes.reduce((total, p) => total + (p.part ?? 0), 0);
  /* La réservation est le chiffre en grand ; la liste ne la répète pas. */
  const versements = [
    ...confirmes
      .filter((p) => p.etape !== "reservation")
      .map((p) => ({
      cle: p.etape,
        label:
          p.etape === "livraison" ? f.echeancier.livraison(livraison) : t.livraison.etapes[p.etape],
        part: p.part ?? 0,
        note: null as string | null,
      })),
    ...(solde > 0.0001
      ? [{ cle: "solde", label: f.echeancier.solde, part: solde, note: f.echeancier.soldeNote(livraison) }]
      : []),
  ];
  const montantReservation = prix * PART_RESERVATION;

  /* ---- Crédit : mensualité d'un prêt amortissable ---- */
  const emprunte = prix * (1 - credit.apport);
  const n = credit.dureeAnnees * 12;
  const r = credit.tauxAnnuel / 12;
  const mensualite = r > 0 ? (emprunte * r) / (1 - Math.pow(1 + r, -n)) : emprunte / n;
  const interets = mensualite * n - emprunte;
  const revenu = enDevise(credit.revenuNetMensuelEUR);
  const effort = mensualite - revenu;

  const champsCredit: Record<CleCredit, { label: string; format: (v: number) => string }> = {
    apport: { label: f.credit.apport, format: (v) => `${pourcent(v * 100)} · ${money(prix * v)}` },
    tauxAnnuel: { label: f.credit.taux, format: (v) => pourcent(v * 100, 2) },
    dureeAnnees: { label: f.credit.duree, format: (v) => t.rentabilite.an(v) },
    revenuNetMensuelEUR: {
      label: f.credit.revenu,
      format: (v) => `${money(enDevise(v))} ${f.parMois}`,
    },
  };

  const slider = (cle: CleCredit) => {
    const b = bornesFinancement[cle];
    return (
      <div key={cle} className="sm-slider">
        <label htmlFor={`fi-${cle}`}>
          <span>{champsCredit[cle].label}</span>
          <output htmlFor={`fi-${cle}`}>{champsCredit[cle].format(credit[cle])}</output>
        </label>
        <input
          id={`fi-${cle}`}
          type="range"
          min={b.min}
          max={b.max}
          step={b.pas}
          value={credit[cle]}
          onChange={(event) =>
            setCredit((courant) => ({ ...courant, [cle]: Number(event.target.value) }))
          }
        />
      </div>
    );
  };

  const prixLigne = f.lignePrix(formatPrix(prix, devise, langue));
  const demanderEcheancier = () =>
    onContact({
      outil: f.echeancier.outil,
      lignes: [
        prixLigne,
        f.echeancier.ligneReservation(formatPart(PART_RESERVATION, langue), money(montantReservation)),
      ],
    });
  const demanderCredit = () =>
    onContact({
      outil: f.credit.outil,
      lignes: [
        prixLigne,
        f.credit.ligne(pourcent(credit.apport * 100), t.rentabilite.an(credit.dureeAnnees), pourcent(credit.tauxAnnuel * 100, 2)),
        f.credit.ligneMensualite(`${money(mensualite)} ${f.parMois}`),
      ],
    });

  return (
    <section id="financement" className="fi section-pad" aria-labelledby="financement-title">
      <div className="fi-tete">
        <div data-vu="">
          <p className="sm-kicker">{f.kicker}</p>
          <h2 id="financement-title">
            {f.titre[0]} <em>{f.titre[1]}</em>
          </h2>
          <p className="fi-intro">{f.intro}</p>
        </div>
        <div className="fi-prix sm-field" data-vu="" style={{ "--i": 1 } as React.CSSProperties}>
          <div className="sm-field-head">
            <label htmlFor="fi-prix">{f.prix}</label>
            <CurrencyPills />
          </div>
          <input
            id="fi-prix"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            value={formatNombre(prixReference, langue)}
            onChange={(event) =>
              setSaisi({ montant: Number(event.target.value.replace(/\D/g, "")), devise })
            }
            onBlur={() => {
              if (prixReference !== prix) setSaisi({ montant: prix, devise });
            }}
            aria-describedby="fi-prix-aide"
          />
          <small id="fi-prix-aide" className="sm-aide">
            {f.fourchette(formatPrix(bornes.min, devise, langue), formatPrix(bornes.max, devise, langue))}
          </small>
          <input
            className="sm-range"
            type="range"
            aria-label={f.prix}
            min={bornes.min}
            max={bornes.max}
            step={bornes.pas}
            value={prix}
            onChange={(event) => setSaisi({ montant: Number(event.target.value), devise })}
          />
        </div>
      </div>

      <div className="fi-grille">
        <article className="fi-carte" data-vu="" style={{ "--i": 0 } as React.CSSProperties}>
          <header>
            <h3>
              <CalendarRange aria-hidden="true" />
              {f.echeancier.titre}
            </h3>
            <p>{f.echeancier.texte}</p>
          </header>
          <p className="fi-key">
            <span>{f.echeancier.reservation}</span>
            <strong>{money(montantReservation)}</strong>
            <small>
              {formatPart(PART_RESERVATION, langue)} · {f.echeancier.reservationNote}
            </small>
          </p>
          <dl className="fi-lignes">
            {versements.map((v) => (
              <div key={v.cle}>
                <dt>{v.label}</dt>
                <dd>
                  <b>{money(prix * v.part)}</b>
                  {formatPart(v.part, langue)}
                </dd>
                {v.note && <p>{v.note}</p>}
              </div>
            ))}
            <div>
              <dt>{f.echeancier.total}</dt>
              <dd>
                <b>{money(prix)}</b>
                {restants !== null && f.echeancier.dans(restants)}
              </dd>
            </div>
          </dl>
          <PillButton label={f.echeancier.cta} icon={ArrowRight} onClick={demanderEcheancier} />
        </article>

        <article className="fi-carte" data-vu="" style={{ "--i": 1 } as React.CSSProperties}>
          <header>
            <h3>
              <Landmark aria-hidden="true" />
              {f.credit.titre}
            </h3>
            <p>{f.credit.texte}</p>
          </header>
          <div className="sm-sliders">
            {(["apport", "tauxAnnuel", "dureeAnnees", "revenuNetMensuelEUR"] as CleCredit[]).map(slider)}
          </div>
          <p className="fi-key" aria-live="polite">
            <span>{f.credit.mensualite}</span>
            <strong>{money(mensualite)}</strong>
            <small>{f.parMois}</small>
          </p>
          <dl className="fi-lignes">
            <div>
              <dt>{f.credit.emprunte}</dt>
              <dd>
                <b>{money(emprunte)}</b>
                {pourcent((1 - credit.apport) * 100)}
              </dd>
            </div>
            <div>
              <dt>{f.credit.interets}</dt>
              <dd>
                <b>{money(interets)}</b>
                {t.rentabilite.an(credit.dureeAnnees)}
              </dd>
            </div>
            <div>
              <dt>{effort > 0 ? f.credit.effort : f.credit.couvert}</dt>
              <dd>
                <b>{money(Math.abs(effort))}</b>
                {f.parMois}
              </dd>
              {effort <= 0 && <p>{f.credit.excedent(money(-effort))}</p>}
            </div>
          </dl>
          <p className="fi-note">{f.credit.mention}</p>
          <PillButton label={f.credit.cta} icon={ArrowRight} onClick={demanderCredit} />
        </article>
      </div>
    </section>
  );
}
