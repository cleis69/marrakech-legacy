import { Download, Expand } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import {
  type TypeVilla,
  formatNombre,
  formatPrix,
  formatSurface,
  prixVilla,
  villasChiffres,
} from "@/config/citystar";

import { CurrencyPills, useDevise } from "./currency";
import { SHOW_BUDGET_EVENT, openVilla, prefersReducedMotion, villas } from "./data";

type Props = { onOpenPlan: (src: string) => void };
type Cell = { key: TypeVilla; content: React.ReactNode };

const TYPES: TypeVilla[] = ["A", "B", "C"];
const maxSurface = Math.max(...TYPES.map((t) => villasChiffres[t].surfaceConstruiteM2));
const maxSuites = Math.max(...TYPES.map((t) => villasChiffres[t].suites));

function Delta({ value, unit, noun }: { value: number; unit?: string; noun?: string }) {
  if (!value) return null;
  const size = Math.abs(value);
  const texte = `${value > 0 ? "+" : "−"}${unit === "€" ? formatNombre(size) : size}${unit ? ` ${unit}` : ""}${noun ? ` ${noun}${size > 1 ? "s" : ""}` : ""}`;
  return <span className={`cp-delta${value > 0 ? " is-up" : ""}`}>{texte}</span>;
}

/** Comparateur « Les écarts » : une villa de référence, les autres affichent leur écart. */
export function VillaComparator({ onOpenPlan }: Props) {
  const { devise, langue, t: textes, taux } = useDevise();
  const [pin, setPin] = useState<TypeVilla>("B");
  const [onlyDiff, setOnlyDiff] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<TypeVilla[]>(TYPES);
  const [highlight, setHighlight] = useState<TypeVilla[] | null>(null);

  /* Sur mobile, les colonnes défilent : on indique lesquelles sont à l'écran. */
  useEffect(() => {
    const box = scrollRef.current;
    if (!box) return;
    const update = () => {
      const bounds = box.getBoundingClientRect();
      const label = box.querySelector<HTMLElement>("thead th[scope='row'], thead td");
      const left = (label?.getBoundingClientRect().right ?? bounds.left) + 4;
      const shown = TYPES.filter((t) => {
        const cell = box.querySelector<HTMLElement>(`[data-col="${t}"]`);
        if (!cell) return false;
        const rect = cell.getBoundingClientRect();
        return rect.right > left + 40 && rect.left < bounds.right - 60;
      });
      setVisible((current) =>
        current.length === shown.length && current.every((t, i) => t === shown[i])
          ? current
          : shown,
      );
    };
    update();
    box.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      box.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  /* Le simulateur envoie un budget : on met en avant la villa la plus grande qui y entre. */
  useEffect(() => {
    const onBudget = (event: Event) => {
      const { montant } = (event as CustomEvent<{ montant: number }>).detail;
      const dansLeBudget = TYPES.filter((t) => prixVilla(t, devise, taux).montant <= montant);
      const cible = dansLeBudget[0] ?? TYPES[TYPES.length - 1];
      if (cible) {
        setPin(cible);
        setHighlight(dansLeBudget);
      }
      document
        .getElementById("comparateur")
        ?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
    };
    window.addEventListener(SHOW_BUDGET_EVENT, onBudget);
    return () => window.removeEventListener(SHOW_BUDGET_EVENT, onBudget);
  }, [devise, taux]);

  const scrollToColumn = (type: TypeVilla) => {
    const box = scrollRef.current;
    const cell = box?.querySelector<HTMLElement>(`[data-col="${type}"]`);
    if (!box || !cell) return;
    const label = box.querySelector<HTMLElement>("thead td");
    const offset =
      cell.getBoundingClientRect().left -
      box.getBoundingClientRect().left -
      (label?.offsetWidth ?? 0);
    box.scrollBy({ left: offset, behavior: "smooth" });
  };

  const price = (type: TypeVilla) => prixVilla(type, devise, taux);

  const rows: {
    label: React.ReactNode;
    same?: boolean;
    cells: (type: TypeVilla) => React.ReactNode;
  }[] = [
    {
      label: (
        <>
          {textes.comparateur.surfaceCourt[0]}
          <br />
          {textes.comparateur.surfaceCourt[1]}
        </>
      ),
      cells: (t) => (
        <>
          <span className="cp-value">
            {formatSurface(villasChiffres[t].surfaceConstruiteM2, langue)}
          </span>
          <span className="cp-bar">
            <i
              style={{ width: `${(villasChiffres[t].surfaceConstruiteM2 / maxSurface) * 100}%` }}
            />
          </span>
          {t !== pin && (
            <Delta
              value={
                villasChiffres[t].surfaceConstruiteM2 - villasChiffres[pin].surfaceConstruiteM2
              }
              unit="m²"
            />
          )}
        </>
      ),
    },
    {
      label: textes.comparateur.terrain,
      same: true,
      cells: (t) => (
        <span className="cp-value">{formatSurface(villasChiffres[t].terrainM2, langue)}</span>
      ),
    },
    {
      label: textes.comparateur.suites,
      cells: (t) => (
        <>
          <span className="cp-value">{villasChiffres[t].suites}</span>
          <span className="cp-dots" aria-hidden="true">
            {Array.from({ length: maxSuites }, (_, i) => (
              <i key={i} className={i < villasChiffres[t].suites ? "" : "is-off"} />
            ))}
          </span>
          {t !== pin && (
            <Delta
              value={villasChiffres[t].suites - villasChiffres[pin].suites}
              noun={textes.comparateur.suite}
            />
          )}
        </>
      ),
    },
    {
      label: (
        <>
          {textes.comparateur.pmr[0]}
          <br />
          {textes.comparateur.pmr[1]}
        </>
      ),
      cells: (t) =>
        villasChiffres[t].accessiblePmr ? (
          <>
            <span className="cp-value">{textes.comparateur.pmrOui}</span>
            <small>{textes.comparateur.pmrDetail}</small>
          </>
        ) : (
          <span className="cp-value cp-none">{textes.comparateur.pmrNon}</span>
        ),
    },
    {
      label: textes.comparateur.atout,
      cells: (type) => <span className="cp-text">{textes.villas.tags[type]}</span>,
    },
    {
      label: textes.comparateur.plans,
      cells: (t) => {
        const villa = villas.find((v) => v.type === t);
        return (
          <>
            <span className="cp-plans">
              {villa?.plans.map((plan, i) => (
                <button
                  key={plan}
                  type="button"
                  onClick={() => onOpenPlan(plan)}
                  aria-label={textes.villas.agrandirPlan(i === 1, t)}
                >
                  <img src={plan} alt="" loading="lazy" />
                  <small>
                    {i ? textes.villas.etage : textes.villas.rdc} <Expand aria-hidden="true" />
                  </small>
                </button>
              ))}
            </span>
            <button
              type="button"
              className="cp-plans-mobile"
              onClick={() => openVilla({ index: TYPES.indexOf(t), target: "plans" })}
            >
              <img src={villa?.plans[0]} alt="" loading="lazy" />
              <em>{textes.comparateur.deuxPlans}</em>
            </button>
          </>
        );
      },
    },
    {
      label: textes.comparateur.brochure,
      same: true,
      cells: (type) => (
        <a
          className="cp-pdf"
          href={`/brochures/villa-${type.toLowerCase()}.pdf`}
          target="_blank"
          rel="noreferrer"
          aria-label={textes.villas.brochureAria(type)}
        >
          PDF <Download aria-hidden="true" />
        </a>
      ),
    },
    {
      label: textes.comparateur.prix,
      cells: (t) => (
        <>
          <span className="cp-value">
            {price(t).approximatif ? "≈ " : ""}
            {formatPrix(price(t).montant, devise, langue)}
          </span>
          {t !== pin && (
            <Delta
              value={price(t).montant - price(pin).montant}
              unit={devise === "EUR" || devise === "GBP" ? (devise === "EUR" ? "€" : "£") : devise}
            />
          )}
        </>
      ),
    },
  ];

  const shown = onlyDiff ? rows.filter((row) => !row.same) : rows;

  return (
    <section id="comparateur" className="cp section-pad" aria-labelledby="comparateur-title">
      <div className="cp-head">
        <div>
          <p className="cp-kicker">{textes.comparateur.kicker}</p>
          <h2 id="comparateur-title">
            {textes.comparateur.titre[0]}
            <em>{textes.comparateur.titre[1]}</em>
          </h2>
        </div>
        <p className="cp-note">
          {highlight
            ? textes.comparateur.budget(
                highlight.map((type) => `${textes.villas.villa} ${type}`).join(", ") ||
                  textes.comparateur.aucune,
              )
            : textes.comparateur.note}
        </p>
      </div>

      <div className="cp-controls">
        <div className="cp-pins" role="group" aria-label={textes.comparateur.referenceAria}>
          <span>{textes.comparateur.reference}</span>
          {TYPES.map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={t === pin}
              onClick={() => {
                setPin(t);
                scrollToColumn(t);
              }}
              aria-label={textes.comparateur.prendreReference(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <label className="cp-switch">
          <input
            type="checkbox"
            checked={onlyDiff}
            onChange={(event) => setOnlyDiff(event.target.checked)}
          />
          <i aria-hidden="true" />
          {textes.comparateur.differences}
        </label>
        <CurrencyPills className="cp-cur" />
      </div>

      <div
        ref={scrollRef}
        className="cp-scroll"
        tabIndex={0}
        role="region"
        aria-label={textes.comparateur.tableauAria}
      >
        <table className="cp-table">
          <thead>
            <tr>
              <td />
              {TYPES.map((t) => {
                const villa = villas.find((v) => v.type === t);
                return (
                  <th
                    key={t}
                    scope="col"
                    data-col={t}
                    className={`${t === pin ? "is-pin" : ""}${highlight && !highlight.includes(t) ? " is-out" : ""}`}
                  >
                    <span className="cp-photo">
                      <img src={villa?.image} alt="" loading="lazy" />
                      <b>{t}</b>
                    </span>
                    <span className="cp-name">
                      {textes.villas.villa} {t}
                      {t === pin && <em>{textes.comparateur.estReference}</em>}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {shown.map((row, index) => (
              <tr key={index}>
                <th scope="row">{row.label}</th>
                {TYPES.map((t) => (
                  <td
                    key={t}
                    data-col={t}
                    className={`${t === pin ? "is-pin" : ""}${highlight && !highlight.includes(t) ? " is-out" : ""}`}
                  >
                    {row.cells(t)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="cp-foot">
        <div className="cp-visible" aria-hidden="true">
          {TYPES.map((t) => (
            <span
              key={t}
              className={`${visible.includes(t) ? "is-in" : ""}${t === pin ? " is-ref" : ""}`}
            >
              {t}
            </span>
          ))}
        </div>
        <p>{textes.comparateur.defiler}</p>
      </div>
    </section>
  );
}
