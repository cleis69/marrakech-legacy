import { Download, Expand } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { type TypeVilla, formatNombre, formatPrix, formatSurface, prixVilla, villasChiffres } from "@/config/citystar";

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
  const { devise, langue } = useDevise();
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
      setVisible((current) => (current.length === shown.length && current.every((t, i) => t === shown[i]) ? current : shown));
    };
    update();
    box.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { box.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);

  /* Le simulateur envoie un budget : on met en avant la villa la plus grande qui y entre. */
  useEffect(() => {
    const onBudget = (event: Event) => {
      const { montant } = (event as CustomEvent<{ montant: number }>).detail;
      const dansLeBudget = TYPES.filter((t) => prixVilla(t, devise).montant <= montant);
      const cible = dansLeBudget[0] ?? TYPES[TYPES.length - 1];
      if (cible) { setPin(cible); setHighlight(dansLeBudget); }
      document.getElementById("comparateur")?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
    };
    window.addEventListener(SHOW_BUDGET_EVENT, onBudget);
    return () => window.removeEventListener(SHOW_BUDGET_EVENT, onBudget);
  }, [devise]);

  const scrollToColumn = (type: TypeVilla) => {
    const box = scrollRef.current;
    const cell = box?.querySelector<HTMLElement>(`[data-col="${type}"]`);
    if (!box || !cell) return;
    const label = box.querySelector<HTMLElement>("thead td");
    const offset = cell.getBoundingClientRect().left - box.getBoundingClientRect().left - (label?.offsetWidth ?? 0);
    box.scrollBy({ left: offset, behavior: "smooth" });
  };

  const price = (type: TypeVilla) => prixVilla(type, devise);

  const rows: { label: React.ReactNode; same?: boolean; cells: (type: TypeVilla) => React.ReactNode }[] = [
    {
      label: <>Surface<br />construite</>,
      cells: (t) => (
        <>
          <span className="cp-value">{formatSurface(villasChiffres[t].surfaceConstruiteM2, langue)}</span>
          <span className="cp-bar"><i style={{ width: `${(villasChiffres[t].surfaceConstruiteM2 / maxSurface) * 100}%` }} /></span>
          {t !== pin && <Delta value={villasChiffres[t].surfaceConstruiteM2 - villasChiffres[pin].surfaceConstruiteM2} unit="m²" />}
        </>
      ),
    },
    { label: "Terrain", same: true, cells: (t) => <span className="cp-value">{formatSurface(villasChiffres[t].terrainM2, langue)}</span> },
    {
      label: "Suites",
      cells: (t) => (
        <>
          <span className="cp-value">{villasChiffres[t].suites}</span>
          <span className="cp-dots" aria-hidden="true">{Array.from({ length: maxSuites }, (_, i) => <i key={i} className={i < villasChiffres[t].suites ? "" : "is-off"} />)}</span>
          {t !== pin && <Delta value={villasChiffres[t].suites - villasChiffres[pin].suites} noun="suite" />}
        </>
      ),
    },
    {
      label: <>Accès<br />PMR</>,
      cells: (t) => villasChiffres[t].accessiblePmr
        ? <><span className="cp-value">Oui</span><small>Ascenseur, salles de bains accessibles</small></>
        : <span className="cp-value cp-none">Non prévu</span>,
    },
    { label: "Atout", cells: (t) => <span className="cp-text">{villas.find((v) => v.type === t)?.tag}</span> },
    {
      label: "Plans",
      cells: (t) => {
        const villa = villas.find((v) => v.type === t);
        return (
          <>
            <span className="cp-plans">
              {villa?.plans.map((plan, i) => (
                <button key={plan} type="button" onClick={() => onOpenPlan(plan)} aria-label={`Agrandir le plan ${i ? "de l’étage" : "du rez-de-chaussée"} de la villa ${t}`}>
                  <img src={plan} alt="" loading="lazy" />
                  <small>{i ? "Étage" : "RDC"} <Expand aria-hidden="true" /></small>
                </button>
              ))}
            </span>
            <button type="button" className="cp-plans-mobile" onClick={() => openVilla({ index: TYPES.indexOf(t), target: "plans" })}>
              <img src={villa?.plans[0]} alt="" loading="lazy" />
              <em>2 plans</em>
            </button>
          </>
        );
      },
    },
    { label: "Brochure", same: true, cells: (t) => <a className="cp-pdf" href={`/brochures/villa-${t.toLowerCase()}.pdf`} target="_blank" rel="noreferrer" aria-label={`Brochure de la villa type ${t} (PDF)`}>PDF <Download aria-hidden="true" /></a> },
    {
      label: "Prix",
      cells: (t) => (
        <>
          <span className="cp-value">{price(t).approximatif ? "≈ " : ""}{formatPrix(price(t).montant, devise, langue)}</span>
          {t !== pin && <Delta value={price(t).montant - price(pin).montant} unit={devise === "EUR" || devise === "GBP" ? (devise === "EUR" ? "€" : "£") : devise} />}
        </>
      ),
    },
  ];

  const shown = onlyDiff ? rows.filter((row) => !row.same) : rows;

  return (
    <section id="comparateur" className="cp section-pad" aria-labelledby="comparateur-title">
      <div className="cp-head">
        <div>
          <p className="cp-kicker">Comparer</p>
          <h2 id="comparateur-title">Ce qui les <em>distingue.</em></h2>
        </div>
        <p className="cp-note">{highlight ? `Dans le budget saisi : ${highlight.map((t) => `villa ${t}`).join(", ") || "aucune villa"}` : "Écarts calculés par rapport à la villa de référence"}</p>
      </div>

      <div className="cp-controls">
        <div className="cp-pins" role="group" aria-label="Villa de référence">
          <span>Référence</span>
          {TYPES.map((t) => (
            <button key={t} type="button" aria-pressed={t === pin} onClick={() => { setPin(t); scrollToColumn(t); }} aria-label={`Prendre la villa ${t} comme référence`}>{t}</button>
          ))}
        </div>
        <label className="cp-switch">
          <input type="checkbox" checked={onlyDiff} onChange={(event) => setOnlyDiff(event.target.checked)} />
          <i aria-hidden="true" />
          Seulement les différences
        </label>
        <CurrencyPills className="cp-cur" />
      </div>

      <div ref={scrollRef} className="cp-scroll" tabIndex={0} role="region" aria-label="Tableau comparatif des trois villas">
        <table className="cp-table">
          <thead>
            <tr>
              <td />
              {TYPES.map((t) => {
                const villa = villas.find((v) => v.type === t);
                return (
                  <th key={t} scope="col" data-col={t} className={`${t === pin ? "is-pin" : ""}${highlight && !highlight.includes(t) ? " is-out" : ""}`}>
                    <span className="cp-photo"><img src={villa?.image} alt="" loading="lazy" /><b>{t}</b></span>
                    <span className="cp-name">Villa {t}{t === pin && <em> · référence</em>}</span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {shown.map((row, index) => (
              <tr key={index}>
                <th scope="row">{row.label}</th>
                {TYPES.map((t) => <td key={t} data-col={t} className={`${t === pin ? "is-pin" : ""}${highlight && !highlight.includes(t) ? " is-out" : ""}`}>{row.cells(t)}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="cp-foot">
        <div className="cp-visible" aria-hidden="true">
          {TYPES.map((t) => <span key={t} className={`${visible.includes(t) ? "is-in" : ""}${t === pin ? " is-ref" : ""}`}>{t}</span>)}
        </div>
        <p>Faites défiler pour comparer</p>
      </div>
    </section>
  );
}
