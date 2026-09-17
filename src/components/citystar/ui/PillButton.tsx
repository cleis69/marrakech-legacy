import type { LucideIcon } from "lucide-react";

type Props = {
  label: string;
  icon: LucideIcon;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  href?: string;
  className?: string;
  ariaLabel?: string;
};

/** Bouton du langage « sceau » : libellé + pastille ronde (pleine ou filaire). */
export function PillButton({ label, icon: Icon, variant = "primary", onClick, href, className = "", ariaLabel }: Props) {
  const content = (
    <>
      <span className="pill-label">{label}</span>
      <i className="pill-dot" aria-hidden="true"><Icon /></i>
    </>
  );
  const cls = `pill pill-${variant} ${className}`.trim();
  if (href) {
    return <a className={cls} href={href} target={href.startsWith("http") || href.endsWith(".pdf") ? "_blank" : undefined} rel="noreferrer" aria-label={ariaLabel}>{content}</a>;
  }
  return <button type="button" className={cls} onClick={onClick} aria-label={ariaLabel}>{content}</button>;
}
