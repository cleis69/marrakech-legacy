import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Lock } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { type Langue, type TypeVilla, convertirEUR, formatMontantCourt, formatPrix, prixVilla, prixVillas, selecteur, villasChiffres } from "@/config/citystar";

import { useDevise } from "./currency";
import { type Selection, faitsVilla, openVilla, villas } from "./data";
import type { Textes } from "./i18n";
import { PillButton } from "./ui/PillButton";

type Key = "usage" | "suites" | "budget" | "horizon" | "pmr";
type Answers = Partial<Record<Key, string>>;
type Option = { value: string; label: string; hint?: string };
type Question = { key: Key; title: string; options: Option[]; note?: string };

const TYPES: TypeVilla[] = ["A", "B", "C"];
const STEPS = 5;
const ease = [0.22, 1, 0.36, 1] as const;

const budgetMax = (a: Answers) => (a.budget && a.budget !== "talk" ? Number(a.budget) : null);
const fitsBudget = (t: TypeVilla, a: Answers) => { const max = budgetMax(a); return max === null || prixVillas[t].EUR <= max; };
const fitsSuites = (t: TypeVilla, a: Answers) => !a.suites || a.suites === "any" || villasChiffres[t].suites === Number(a.suites);

/** Raison pour laquelle une villa ne correspond pas (vide si elle convient). */
function mismatch(t: TypeVilla, a: Answers, textes: Textes) {
  if (a.pmr === "yes" && !villasChiffres[t].accessiblePmr) return textes.selecteur.raisons.pmr;
  if (!fitsSuites(t, a)) return textes.selecteur.raisons.suites(villasChiffres[t].suites);
  if (!fitsBudget(t, a)) return textes.selecteur.raisons.budget;
  return "";
}

/**
 * Règle du brief d'abord : mobilité réduite → la villa accessible. Sinon, les villas qui respectent
 * suites et budget (à défaut les suites seules) ; on préfère une villa non spécialisée PMR, puis la plus
 * grande, puis la moins chère.
 */
function recommend(a: Answers): TypeVilla {
  const accessible = TYPES.find((t) => villasChiffres[t].accessiblePmr);
  if (a.pmr === "yes" && accessible) return accessible;
  const ideal = TYPES.filter((t) => fitsSuites(t, a) && fitsBudget(t, a));
  const bySuites = TYPES.filter((t) => fitsSuites(t, a));
  const pool = ideal.length ? ideal : bySuites.length ? bySuites : TYPES;
  const sorted = [...pool].sort((x, y) =>
    Number(villasChiffres[x].accessiblePmr) - Number(villasChiffres[y].accessiblePmr)
    || villasChiffres[y].suites - villasChiffres[x].suites
    || prixVillas[x].EUR - prixVillas[y].EUR);
  return sorted[0] ?? "B";
}

function justify(type: TypeVilla, a: Answers, textes: Textes, langue: Langue) {
  const faits = faitsVilla(type, textes, langue);
  const taille = `${faits.suites} · ${faits.surface}`;
  const souhaite = a.suites && a.suites !== "any" ? Number(a.suites) : null;
  const j = textes.selecteur.justifications;
  let phrase: string;
  if (villasChiffres[type].accessiblePmr && a.pmr === "yes") {
    phrase = j.pmr(taille);
    if (souhaite !== null && souhaite !== villasChiffres[type].suites) phrase += j.pmrSuites(villasChiffres[type].suites > souhaite);
  } else if (type === "C") {
    phrase = j.contemporaine(taille, souhaite === villasChiffres.C.suites);
    if (a.suites === "any" && !fitsBudget("B", a)) phrase += j.budgetSeule;
  } else if (type === "B") {
    phrase = a.suites === "any" || !a.suites ? j.polyvalente(taille) : j.espace(taille);
  } else {
    phrase = faits.description;
  }
  if (!fitsBudget(type, a)) phrase += j.horsBudget;
  return phrase;
}

export function VillaSelector({ onContact }: { onContact: (selection: Selection) => void }) {
  const { devise, langue, t } = useDevise();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [dir, setDir] = useState(1);
  const focusPending = useRef(false);

  const suites = [...new Set(TYPES.map((t) => villasChiffres[t].suites))].sort((x, y) => x - y);
  const questions: Question[] = [
    { key: "usage", title: t.selecteur.questions.usage.titre, options: [{ value: "vivre", label: t.selecteur.questions.usage.vivre, hint: t.selecteur.questions.usage.vivreNote }, { value: "investir", label: t.selecteur.questions.usage.investir, hint: t.selecteur.questions.usage.investirNote }] },
    { key: "suites", title: t.selecteur.questions.suites.titre, options: [...suites.map((n) => ({ value: String(n), label: t.selecteur.questions.suites.suites(n) })), { value: "any", label: t.selecteur.questions.suites.peuImporte }] },
    {
      key: "budget",
      title: t.selecteur.questions.budget.titre,
      options: [...selecteur.plafondsBudgetEUR.map((max) => ({ value: String(max), label: t.selecteur.questions.budget.jusqua(`${devise === "EUR" ? "" : "≈ "}${formatMontantCourt(convertirEUR(max, devise), devise, langue)}`) })), { value: "talk", label: t.selecteur.questions.budget.parler, hint: t.selecteur.questions.budget.parlerNote }],
      ...(devise === "EUR" ? {} : { note: t.selecteur.conversion }),
    },
    { key: "horizon", title: t.selecteur.questions.horizon.titre, options: [{ value: "soon", label: t.selecteur.questions.horizon.soon }, { value: "year", label: t.selecteur.questions.horizon.year }, { value: "later", label: t.selecteur.questions.horizon.later, hint: t.selecteur.questions.horizon.laterNote }] },
    { key: "pmr", title: t.selecteur.questions.pmr.titre, options: [{ value: "yes", label: t.selecteur.questions.pmr.oui, hint: t.selecteur.questions.pmr.ouiNote }, { value: "no", label: t.selecteur.questions.pmr.non }] },
  ];

  const done = step >= STEPS;
  const winner = done ? recommend(answers) : null;
  const labelOf = (key: Key) => questions.find((q) => q.key === key)?.options.find((o) => o.value === answers[key])?.label ?? "";

  const answer = (value: string) => {
    const question = questions[step];
    if (!question) return;
    focusPending.current = true;
    setAnswers((current) => ({ ...current, [question.key]: value }));
    setDir(1);
    setStep((s) => s + 1);
  };

  const back = () => {
    if (step === 0) return;
    const previous = questions[step - 1];
    focusPending.current = true;
    setAnswers((current) => { const next = { ...current }; if (previous) delete next[previous.key]; return next; });
    setDir(-1);
    setStep((s) => s - 1);
  };

  const restart = () => { focusPending.current = true; setAnswers({}); setDir(-1); setStep(0); };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const question = questions[step];
    if (!done && question && /^[1-9]$/.test(event.key)) {
      const option = question.options[Number(event.key) - 1];
      if (option) { event.preventDefault(); answer(option.value); }
    } else if ((event.key === "ArrowLeft" || event.key === "Backspace") && step > 0) {
      event.preventDefault();
      back();
    }
  };

  const selection = (): Selection => ({
    outil: t.selecteur.outil,
    lignes: [...questions.map((q) => labelOf(q.key)).filter(Boolean), t.selecteur.ligneRecommandation(winner ?? "B")],
  });

  const question = questions[step];

  return (
    <section id="selecteur" className="sl section-pad" aria-labelledby="selecteur-title" onKeyDown={onKeyDown}>
      <div className="sl-grid">
        <div className="sl-pane">
          <div className="sl-head">
            <div className="sl-head-row">
              <h2 id="selecteur-title" className="sl-kicker">{t.selecteur.kicker}</h2>
              <button type="button" className="sl-back" onClick={back} disabled={step === 0}><ArrowLeft aria-hidden="true" /> {t.selecteur.retour}</button>
            </div>
            <div className="sl-progress">
              <span>{done ? t.selecteur.recommandation : t.selecteur.question(step + 1, STEPS)}</span>
              <span className="sl-line" role="progressbar" aria-label={t.selecteur.progression} aria-valuemin={0} aria-valuemax={STEPS} aria-valuenow={Math.min(step, STEPS)}><i style={{ width: `${(Math.min(step, STEPS) / STEPS) * 100}%` }} /></span>
            </div>
          </div>

          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <motion.div
              key={step}
              custom={dir}
              className="sl-body"
              variants={{ enter: (d: number) => ({ opacity: 0, x: 36 * d }), center: { opacity: 1, x: 0 }, exit: (d: number) => ({ opacity: 0, x: -20 * d }) }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease }}
            >
              {!done && question ? (
                <Stage focusPending={focusPending}>
                  <h3 className="sl-question">{question.title}</h3>
                  <div className="sl-options">
                    {question.options.map((option, i) => (
                      <button key={option.value} type="button" className="sl-option" onClick={() => answer(option.value)}>
                        <em aria-hidden="true">{i + 1}</em>
                        <b>{option.label}</b>
                        {option.hint && <span>{option.hint}</span>}
                      </button>
                    ))}
                  </div>
                  {question.note && <p className="sl-note">{question.note}</p>}
                  <p className="sl-keys" aria-hidden="true">{t.selecteur.clavier}</p>
                </Stage>
              ) : winner ? (
                <Stage focusPending={focusPending} focusHeading>
                  <span className="sl-kicker">{t.selecteur.notre}</span>
                  <h3 className="sl-result" tabIndex={-1}>{t.villas.villa} <em>{winner}</em></h3>
                  <p className="sl-why">{justify(winner, answers, t, langue)}</p>
                  <ul className="sl-recap" aria-label={t.selecteur.recap}>{questions.map((q) => labelOf(q.key) && <li key={q.key}>{labelOf(q.key)}</li>)}</ul>
                  <div className="sl-actions">
                    <PillButton label={t.selecteur.voirVilla} icon={ArrowRight} variant="secondary" onClick={() => openVilla({ index: TYPES.indexOf(winner), target: "top" })} />
                    <PillButton label={t.selecteur.dossier} icon={Lock} onClick={() => onContact(selection())} />
                  </div>
                  <p className="sl-private">{t.selecteur.prive}</p>
                  <button type="button" className="sl-again" onClick={restart}>{t.selecteur.recommencer}</button>
                </Stage>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>

        <ul className="sl-trio" aria-label={t.selecteur.apercu}>
          {villas.map((villa) => {
            const type = villa.type;
            const faits = faitsVilla(type, t, langue);
            const reason = winner ? (type === winner ? "" : mismatch(type, answers, t) || t.selecteur.raisons.autre) : mismatch(type, answers, t);
            const price = prixVilla(type, devise);
            return (
              <li key={type} className={`sl-card${reason ? " is-dim" : ""}${type === winner ? " is-win" : ""}`}>
                <div className="sl-card-ph">
                  <img src={villa.image} alt="" loading="lazy" />
                  <span className="sl-card-letter">{type}</span>
                </div>
                <div className="sl-card-info">
                  <b>{t.villas.villa} {type}</b>
                  <span>{faits.suites} · {faits.surface}</span>
                  <span>{price.approximatif ? "≈ " : ""}{formatPrix(price.montant, devise, langue)}</span>
                </div>
                <span className="sl-card-why" aria-live="polite">{reason && <><span className="sr-only">{t.villas.villa} {type} : </span>{reason}</>}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/** Contenu d'un écran : reprend le focus clavier quand le visiteur vient de répondre ou de revenir. */
function Stage({ children, focusPending, focusHeading = false }: { children: React.ReactNode; focusPending: React.MutableRefObject<boolean>; focusHeading?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!focusPending.current) return;
    focusPending.current = false;
    const target = ref.current?.querySelector<HTMLElement>(focusHeading ? ".sl-result" : ".sl-option");
    target?.focus({ preventScroll: true });
  }, [focusPending, focusHeading]);
  return <div ref={ref} className="sl-stage">{children}</div>;
}
