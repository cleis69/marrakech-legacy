import type { ReactNode } from "react";

export function Seal({ number, children }: { number: string; children: ReactNode }) {
  return <div className="seal" aria-hidden="true"><span>{number}</span><div>{children}</div></div>;
}