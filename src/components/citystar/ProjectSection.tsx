import { ArrowRight } from "lucide-react";

import { scrollTo } from "./data";
import { Fact, Reveal } from "./motion";

export function ProjectSection() {
  return (
    <section id="project" className="intro-section section-pad">
      <div className="section-label"><span>01</span><p>Le projet</p></div>
      <div className="intro-grid">
        <Reveal><p className="eyebrow">Une résidence à part</p><h2>L’espace rare<br />d’une vie <em>privée.</em></h2></Reveal>
        <Reveal delay={.15}><div className="intro-copy"><p>CITYSTAR réunit 14 villas de luxe dans un domaine privé et entièrement sécurisé, proche de la Palmeraie. Trois architectures distinctes répondent aux usages et aux préférences de chaque résident.</p><button className="text-link" onClick={() => scrollTo("villas")}>Découvrir les villas <ArrowRight /></button></div></Reveal>
      </div>
      <div className="facts">
        <Fact value="14" label="Villas privées" />
        <Fact value="2 000" suffix="m²" label="Terrains jusqu’à" />
        <Fact value="3" label="Types de villas" />
        <Fact value="35" suffix="min" label="Jemaa el-Fna & aéroport" />
      </div>
    </section>
  );
}
