import architectureImage from "@/assets/citystar/architecture.jpeg";

import { ParallaxImage, Reveal } from "./motion";

export function ArchitectureSection() {
  return (
    <section id="architecture" className="architecture-section">
      <div className="architecture-sticky">
        <ParallaxImage src={architectureImage} alt="Architecture contemporaine d’une villa CITYSTAR à Marrakech" />
        <div className="architecture-overlay">
          <div className="section-label light"><span>02</span><p>Architecture</p></div>
          <Reveal><h2>Vivre Marrakech,<br /><em>autrement.</em></h2></Reveal>
          <p>Des espaces intelligents, des volumes ouverts et des matériaux de haute qualité répondant aux standards européens.</p>
        </div>
      </div>
    </section>
  );
}
