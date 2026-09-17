import lifestyleOne from "@/assets/citystar/lifestyle-1.jpeg";
import lifestyleTwo from "@/assets/citystar/lifestyle-2.jpeg";

import { Reveal } from "./motion";

export function LifestyleSection() {
  return (
    <section id="lifestyle" className="lifestyle-section section-pad">
      <div className="section-label"><span>04</span><p>L’art de vivre</p></div>
      <div className="lifestyle-intro"><Reveal><h2>Le confort,<br />dans ses moindres <em>détails.</em></h2></Reveal></div>
      <div className="editorial-scene scene-one"><img src={lifestyleOne} alt="Piscine privée et jardin d’une villa CITYSTAR" loading="lazy" /><div><span>01 — Sérénité</span><h3>Un domaine privé,<br />gardé jour et nuit.</h3><p>Chaque villa isolée préserve son intimité, avec des espaces extérieurs et une piscine privée.</p></div></div>
      <div className="editorial-scene scene-two"><div><span>02 — Conscience</span><h3>Conçu pour une vie<br />plus responsable.</h3><p>Les toitures sont équipées de panneaux solaires. Climatisation, parking, aire de jeux et équipements accessibles prolongent le confort quotidien.</p></div><img src={lifestyleTwo} alt="Intérieur lumineux d’une villa de luxe CITYSTAR" loading="lazy" /></div>
    </section>
  );
}
