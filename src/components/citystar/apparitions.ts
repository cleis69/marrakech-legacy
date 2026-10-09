import { useEffect } from "react";

/**
 * Apparitions au défilement : chaque élément marqué `data-vu` reçoit `data-visible`
 * la première fois qu'il entre à l'écran, une seule fois. Ce qui est déjà visible
 * au chargement est marqué tout de suite, pour ne rien faire clignoter. Sans
 * JavaScript ou en mouvement réduit, la classe `vu-actif` n'est jamais posée :
 * tout reste affiché.
 */
export function useApparitions() {
  useEffect(() => {
    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const observer = new IntersectionObserver(
      (entrees) => {
        for (const entree of entrees) {
          if (!entree.isIntersecting) continue;
          entree.target.setAttribute("data-visible", "");
          observer.unobserve(entree.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    const hauteur = window.innerHeight;
    document.querySelectorAll<HTMLElement>("[data-vu]").forEach((element) => {
      if (element.getBoundingClientRect().top < hauteur) element.setAttribute("data-visible", "");
      else observer.observe(element);
    });
    document.documentElement.classList.add("vu-actif");
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("vu-actif");
    };
  }, []);
}
