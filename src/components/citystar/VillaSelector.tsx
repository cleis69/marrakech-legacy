import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Lock } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { type TypeVilla, convertirEUR, formatMontantCourt, formatPrix, prixVilla, prixVillas, selecteur, villasChiffres } from "@/config/citystar";

import { useDevise } from "./currency";
import { type Selection, openVilla, villas } from "./data";
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
function mismatch(t: TypeVilla, a: Answers) {
  if (a.pmr === "yes" && !villasChiffres[t].accessiblePmr) return "Non adaptée PMR";
  if (!fitsSuites(t, a)) return `${villasChiffres[t].suites} suites`;
  if (!fitsBudget(t, a)) return "Au-delà du budget";
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

function justify(t: TypeVilla, a: Answers) {
  const villa = villas.find((v) => v.type === t) ?? villas[0];
  const size = `${villa.bedrooms} sur ${villa.area}`;
  const wanted = a.suites && a.suites !== "any" ? Number(a.suites) : null;
  let sentence: string;
  if (villasChiffres[t].accessiblePmr && a.pmr === "yes") {
    sentence = `Seule villa conçue pour la mobilité réduite : ascenseur et salles de bains accessibles, ${size}.`;
    if (wanted !== null && wanted !== villasChiffres[t].suites) sentence += ` Elle compte ${villasChiffres[t].suites > wanted ? "plus" : "moins"} de suites que souhaité.`;
  } else if (t === "C") {
    sentence = `${size[0]?.toUpperCase()}${size.slice(1)}, des volumes contemporains et une piscine privée${wanted === villasChiffres.C.suites ? " : la taille que vous recherchez." : "."}`;
    if (a.suites === "any" && !fitsBudget("B", a)) sentence += " C’est la villa qui s’inscrit dans votre budget.";
  } else if (t === "B") {
    sentence = a.suites === "any" || !a.suites ? `La plus polyvalente : ${size}, prolongées par de vastes terrasses.` : `${size[0]?.toUpperCase()}${size.slice(1)}, prolongées par de vastes terrasses : l’espace que vous recherchez.`;
  } else {
    sentence = villa.description;
  }
  if (!fitsBudget(t, a)) sentence += " Son prix dépasse le budget indiqué : parlons-en.";
  return sentence;
}

export function VillaSelector({ onContact }: { onContact: (selection: Selection) => void }) {
  const { devise, langue } = useDevise();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [dir, setDir] = useState(1);
  const focusPending = useRef(false);

  const suites = [...new Set(TYPES.map((t) => villasChiffres[t].suites))].sort((x, y) => x - y);
  const questions: Question[] = [
    { key: "usage", title: "Vous pensez à CITYSTAR pour…", options: [{ value: "vivre", label: "Y vivre", hint: "Résidence principale ou secondaire" }, { value: "investir", label: "Investir", hint: "Placement ou location" }] },
    { key: "suites", title: "Combien de chambres souhaitez-vous ?", options: [...suites.map((n) => ({ value: String(n), label: `${n} suites` })), { value: "any", label: "Peu importe" }] },
    {
      key: "budget",
      title: "Quel budget envisagez-vous ?",
      options: [...selecteur.plafondsBudgetEUR.map((max) => ({ value: String(max), label: `Jusqu’à ${devise === "EUR" ? "" : "≈ "}${formatMontantCourt(convertirEUR(max, devise), devise, langue)}` })), { value: "talk", label: "En parler", hint: "De vive voix" }],
      ...(devise === "EUR" ? {} : { note: "Montants convertis à titre indicatif" }),
    },
    { key: "horizon", title: "Quand souhaitez-vous acquérir ?", options: [{ value: "soon", label: "Sous 6 mois" }, { value: "year", label: "D’ici un an" }, { value: "later", label: "Plus tard", hint: "Je m’informe" }] },
    { key: "pmr", title: "Faut-il un accès adapté à la mobilité réduite ?", options: [{ value: "yes", label: "Oui", hint: "Ascenseur, salles de bains accessibles" }, { value: "no", label: "Non" }] },
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
    outil: "Sélecteur de villa",
    lignes: [...questions.map((q) => labelOf(q.key)).filter(Boolean), `Recommandation : villa ${winner}`],
  });

  const question = questions[step];

  return (
    <section id="selecteur" className="sl section-pad" aria-labelledby="selecteur-title" onKeyDown={onKeyDown}>
      <div className="sl-grid">
        <div className="sl-pane">
          <div className="sl-head">
            <div className="sl-head-row">
              <h2 id="selecteur-title" className="sl-kicker">Trouver ma villa</h2>
              <button type="button" className="sl-back" onClick={back} disabled={step === 0}><ArrowLeft aria-hidden="true" /> Retour</button>
            </div>
            <div className="sl-progress">
              <span>{done ? "Recommandation" : `Question ${step + 1} / ${STEPS}`}</span>
              <span className="sl-line" role="progressbar" aria-label="Progression" aria-valuemin={0} aria-valuemax={STEPS} aria-valuenow={Math.min(step, STEPS)}><i style={{ width: `${(Math.min(step, STEPS) / STEPS) * 100}%` }} /></span>
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
                  <p className="sl-keys" aria-hidden="true">Clavier : chiffres pour répondre, flèche gauche pour revenir</p>
                </Stage>
              ) : winner ? (
                <Stage focusPending={focusPending} focusHeading>
                  <span className="sl-kicker">Notre recommandation</span>
                  <h3 className="sl-result" tabIndex={-1}>Villa <em>{winner}</em></h3>
                  <p className="sl-why">{justify(winner, answers)}</p>
                  <ul className="sl-recap" aria-label="Vos réponses">{questions.map((q) => labelOf(q.key) && <li key={q.key}>{labelOf(q.key)}</li>)}</ul>
                  <div className="sl-actions">
                    <PillButton label="Voir la villa" icon={ArrowRight} variant="secondary" onClick={() => openVilla({ index: TYPES.indexOf(winner), target: "top" })} />
                    <PillButton label="Recevoir le dossier" icon={Lock} onClick={() => onContact(selection())} />
                  </div>
                  <p className="sl-private">Vos réponses restent sur cet appareil : elles ne sont jointes à votre demande que si vous l’envoyez.</p>
                  <button type="button" className="sl-again" onClick={restart}>Recommencer</button>
                </Stage>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>

        <ul className="sl-trio" aria-label="Aperçu des trois villas">
          {villas.map((villa) => {
            const t = villa.type;
            const reason = winner ? (t === winner ? "" : mismatch(t, answers) || "Moins adaptée") : mismatch(t, answers);
            const price = prixVilla(t, devise);
            return (
              <li key={t} className={`sl-card${reason ? " is-dim" : ""}${t === winner ? " is-win" : ""}`}>
                <div className="sl-card-ph">
                  <img src={villa.image} alt="" loading="lazy" />
                  <span className="sl-card-letter">{t}</span>
                </div>
                <div className="sl-card-info">
                  <b>Villa {t}</b>
                  <span>{villa.bedrooms} · {villa.area}</span>
                  <span>{price.approximatif ? "≈ " : ""}{formatPrix(price.montant, devise, langue)}</span>
                </div>
                <span className="sl-card-why" aria-live="polite">{reason && <><span className="sr-only">Villa {t} : </span>{reason}</>}</span>
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
