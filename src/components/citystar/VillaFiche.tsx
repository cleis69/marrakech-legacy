import { ArrowLeft, Download, Expand, Lock } from "lucide-react";

import type { TypeVilla } from "@/config/citystar";

import { faitsVilla, villas } from "./data";
import { chemin, Lien } from "./liens";
import { VillaPrice, useDevise } from "./currency";
import { PillButton } from "./ui/PillButton";

type Props = {
  type: TypeVilla;
  onOpenPlan: (src: string) => void;
  onContact: () => void;
};

/** Page d'une villa : navigation ronde A · B · C, caractéristiques, prix, plans et brochure. */
export function VillaFiche({ type, onOpenPlan, onContact }: Props) {
  const { langue, t } = useDevise();
  const index = villas.findIndex((item) => item.type === type);
  const villa = villas[index] ?? villas[0];
  const faits = faitsVilla(villa.type, t, langue);

  return (
    <div className="vf section-pad">
      <div className="vf-pic">
        {villas.map((item, i) => (
          <img
            key={item.type}
            src={item.image}
            alt={i === index ? t.villas.typeVilla(item.type) : ""}
            aria-hidden={i !== index}
            className={i === index ? "is-on" : ""}
            loading="lazy"
          />
        ))}
        <span className="vf-shade" aria-hidden="true" />
        <div className="vf-pic-over">
          <div className="section-label light">
            <span>03</span>
            <p>{t.villas.label}</p>
          </div>
          <p className="vf-pic-title" aria-hidden="true">
            {t.villas.titre[0]}
            <br />
            {t.villas.titre[1]}
            <em>{t.villas.titre[2]}</em>
          </p>
          <span className="vf-cap">{t.villas.illustration(villa.type)}</span>
        </div>
      </div>

      <div className="vf-info">
        <Lien className="vf-back" vers={chemin(langue, "villas")}>
          <ArrowLeft aria-hidden="true" /> {t.villas.retour}
        </Lien>

        <div className="vf-tabs">
          <nav aria-label={t.villas.onglets}>
            {villas.map((item) => (
              <Lien
                key={item.type}
                vers={chemin(langue, `villas/${item.type.toLowerCase()}`)}
                className={item.type === villa.type ? "is-on" : ""}
                ariaLabel={t.villas.typeVilla(item.type)}
              >
                {item.type}
              </Lien>
            ))}
          </nav>
          <span className="vf-tabs-label">
            {t.villas.typeVilla(villa.type)} · {faits.tag}
          </span>
        </div>

        <div key={villa.type} className="vf-panel">
          <h1 id="villas-title">
            {t.villas.typeVilla(villa.type).replace(villa.type, "")}
            <em>{villa.type}</em>
          </h1>
          <p className="vf-desc">{faits.description}</p>
          <dl className="vf-specs">
            <div>
              <dt>{t.villas.surface}</dt>
              <dd>{faits.surface}</dd>
            </div>
            <div>
              <dt>{t.villas.terrain}</dt>
              <dd>{faits.terrain}</dd>
            </div>
            <div>
              <dt>{t.villas.configuration}</dt>
              <dd>{faits.suites}</dd>
            </div>
          </dl>
          <VillaPrice type={villa.type} />
          <div
            id="plans"
            className="vf-plans"
            aria-label={t.villas.plansAria(villa.type)}
            role="group"
          >
            {villa.plans.map((plan, i) => (
              <button
                key={plan}
                type="button"
                onClick={() => onOpenPlan(plan)}
                aria-label={t.villas.agrandirPlan(i === 1, villa.type)}
              >
                <img src={plan} alt="" loading="lazy" />
                <span>
                  {i ? t.villas.etage : t.villas.rdc} <Expand aria-hidden="true" />
                </span>
              </button>
            ))}
          </div>
          <div className="vf-actions">
            <PillButton label={t.villas.demander} icon={Lock} onClick={onContact} />
            <PillButton
              label={t.villas.brochure}
              icon={Download}
              variant="secondary"
              href={`/brochures/villa-${villa.type.toLowerCase()}.pdf`}
              ariaLabel={t.villas.brochureAria(villa.type)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
