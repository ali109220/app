import { T } from "@/site/theme";
import CinematicHero from "@/site/phase7/CinematicHero";
import TransformationStory from "@/site/phase7/TransformationStory";
import ProductShowcase from "@/site/phase7/ProductShowcase";
import FahimExperience from "@/site/phase7/FahimExperience";
import InteractiveEcosystem from "@/site/phase7/InteractiveEcosystem";
import ArchitectureStage from "@/site/phase7/ArchitectureStage";
import GlobalPresence from "@/site/phase7/GlobalPresence";
import ClientSuccessStories from "@/site/phase7/ClientSuccessStories";
import LatestInsights from "@/site/phase6/LatestInsights";
import FinalEnterpriseCTA from "@/site/phase6/FinalEnterpriseCTA";
import HomeSectionNav from "@/site/phase10/HomeSectionNav";

const sectionClass = "scroll-mt-28";

export default function Home() {
  return (
    <div style={{ background: T.bg, color: T.text }} className="overflow-x-clip font-archivo">
      <CinematicHero />
      <HomeSectionNav />
      <div id="transformation" className={sectionClass}><TransformationStory /></div>
      <div id="solutions" className={`defer-render ${sectionClass}`}><ProductShowcase /></div>
      <div id="fahim-ai" className={`defer-render ${sectionClass}`}><FahimExperience /></div>
      <div id="platform" className={`defer-render ${sectionClass}`}><InteractiveEcosystem /></div>
      <div className="defer-render"><ArchitectureStage /></div>
      <div className="defer-render"><GlobalPresence /></div>
      <div id="client-proof" className={`defer-render ${sectionClass}`}><ClientSuccessStories /></div>
      <div id="insights" className={`defer-render ${sectionClass}`}><LatestInsights /></div>
      <div id="contact" className={`defer-render ${sectionClass}`}><FinalEnterpriseCTA /></div>
    </div>
  );
}
