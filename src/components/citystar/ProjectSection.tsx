import { ArrowRight } from "lucide-react";

import { formatNombre, programme } from "@/config/citystar";

import { scrollTo } from "./data";
import { Fact, Reveal } from "./motion";

export function ProjectSection() {
  return (
    <section id="project" className="intro-section section-pad">
      <div className="section-label"><span>01</span><p>Le projet</p></div>
      <div className="intro-grid">
        <Reveal><p className="eyebrow">Une résidence à part</p><h2>L’espace rare<br />d’une vie <em>privée.</em></h2></Reveal>
        <Reveal delay={.15}><div className="intro-copy"><p>CITYSTAR réunit {programme.nombreVillas} villas de luxe dans un domaine privé et entièrement sécurisé, proche de la Palmeraie. Trois architectures distinctes répondent aux usages et aux préférences de chaque résident.</p><button className="text-link" onClick={() => scrollTo("villas")}>Découvrir les villas <ArrowRight /></button></div></Reveal>
      </div>
      <div className="facts">
        <Fact value={String(programme.nombreVillas)} label="Villas privées" />
        <Fact value={formatNombre(programme.terrainMaxM2)} suffix="m²" label="Terrains jusqu’à" />
        <Fact value={String(programme.nombreTypes)} label="Types de villas" />
        <Fact value={String(programme.trajetMaxMinutes)} suffix="min" label="Jemaa el-Fna & aéroport" />
      </div>
    </section>
  );
}
