import type { CursorHandlers } from "./data";
import { VillaDoors } from "./VillaDoors";

/** Les trois portes ; chacune mène à la page de sa villa. */
export function VillasSection({
  onCursorEnter,
  onCursorLeave,
  sansEntete = false,
}: CursorHandlers & { sansEntete?: boolean }) {
  return (
    <section id="villas" className="vs" aria-labelledby={sansEntete ? undefined : "villas-title"}>
      <VillaDoors
        onCursorEnter={onCursorEnter}
        onCursorLeave={onCursorLeave}
        sansEntete={sansEntete}
      />
    </section>
  );
}
