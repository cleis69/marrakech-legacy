import type { LucideIcon } from "lucide-react";
import { useId } from "react";

type Props = { text: string; icon: LucideIcon; label?: string; onClick?: () => void; ariaLabel?: string; className?: string };

/** Sceau : un texte tourne lentement autour d'une pastille. Bouton si `onClick`, sinon purement décoratif. */
export function Seal({ text, icon: Icon, label, onClick, ariaLabel, className = "" }: Props) {
  const pathId = `seal-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const content = (
    <>
      <svg className="seal-ring" viewBox="0 0 200 200" aria-hidden="true">
        <defs><path id={pathId} d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" /></defs>
        <text><textPath href={`#${pathId}`} textLength="498" lengthAdjust="spacing">{text}</textPath></text>
      </svg>
      <i className="seal-core" aria-hidden="true"><Icon />{label}</i>
    </>
  );
  if (onClick) return <button type="button" className={`seal ${className}`.trim()} onClick={onClick} aria-label={ariaLabel}>{content}</button>;
  return <span className={`seal is-static ${className}`.trim()} aria-hidden="true">{content}</span>;
}
