import { useCallback, useEffect, useState } from "react";

import film from "@/assets/citystar/hero-film.mp4";
import filmPetit from "@/assets/citystar/hero-film-sm.mp4";
import affiche from "@/assets/citystar/hero-film-poster.webp";
import afficheMobile from "@/assets/citystar/hero-film-poster-sm.webp";

/**
 * Le film d'accueil ne gêne jamais le premier affichage : l'image fixe (légère)
 * s'affiche d'abord, le film ne se charge qu'une fois la page prête, en version
 * réduite sur mobile, et pas du tout en économie de données, sur connexion lente
 * ou si le visiteur préfère les mouvements réduits (le bouton lecture le charge alors).
 */

type Connexion = { saveData?: boolean; effectiveType?: string };

const lente = () => {
  const c = (navigator as Navigator & { connection?: Connexion }).connection;
  return Boolean(c?.saveData) || /^(slow-2g|2g|3g)$/.test(c?.effectiveType ?? "");
};

const choisir = () =>
  window.matchMedia("(max-width: 800px)").matches ? filmPetit : film;

export function useFilm(mouvementReduit: boolean | null) {
  const [src, setSrc] = useState<string | undefined>(undefined);
  const charger = useCallback(() => setSrc((actuel) => actuel ?? choisir()), []);

  useEffect(() => {
    /* Sur mobile, plus de chargement automatique (15/11/2026) : 1,3 Mo qui retardaient l'affichage
       jusqu'à 16 s en 4G. L'image fixe reste ; le bouton lecture charge le film à la demande. */
    if (mouvementReduit || lente() || window.matchMedia("(max-width: 800px)").matches) return;
    let annule = false;
    const lancer = () => {
      if (annule) return;
      if ("requestIdleCallback" in window) window.requestIdleCallback(charger, { timeout: 4000 });
      else setTimeout(charger, 1500);
    };
    if (document.readyState === "complete") lancer();
    else window.addEventListener("load", lancer, { once: true });
    return () => {
      annule = true;
      window.removeEventListener("load", lancer);
    };
  }, [mouvementReduit, charger]);

  return { src, charger };
}

/** Image fixe du film : première image à l'écran, prioritaire, en deux tailles. */
export function Affiche({ className }: { className?: string }) {
  return (
    <img
      className={className}
      src={affiche}
      srcSet={`${afficheMobile} 828w, ${affiche} 1280w`}
      sizes="100vw"
      width={1280}
      height={720}
      alt=""
      aria-hidden="true"
      fetchPriority="high"
      decoding="async"
    />
  );
}
