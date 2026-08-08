import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/site/motion";
import { T } from "@/site/theme";
import EnterpriseHero from "@/site/phase6/EnterpriseHero";
import ChallengeSolution from "@/site/phase6/ChallengeSolution";
import PremiumSolutions from "@/site/phase6/PremiumSolutions";
import FahimShowcase from "@/site/phase6/FahimShowcase";
import BankingEcosystem from "@/site/phase6/BankingEcosystem";
import CredibilityMetrics from "@/site/phase6/CredibilityMetrics";
import ExecutiveTestimonials from "@/site/phase6/ExecutiveTestimonials";
import LatestInsights from "@/site/phase6/LatestInsights";
import FinalEnterpriseCTA from "@/site/phase6/FinalEnterpriseCTA";
import { DeploymentArchitectureVisual } from "@/site/phase6/VisualMedia";

function CompanyBridge() {
  return (
    <section className="relative border-t px-6 py-24 md:px-12" style={{ borderColor: T.border }} aria-labelledby="company-bridge-heading">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-12 lg:items-center">
        <Reveal className="lg:col-span-5"><div className="font-jbmono text-[11px] uppercase tracking-[0.26em]" style={{ color: T.signal }}>Tayseer Innovations</div><h2 id="company-bridge-heading" className="mt-5 text-4xl font-bold uppercase leading-[0.96] tracking-[-0.025em] sm:text-5xl">Built for Banking</h2><p className="mt-5 max-w-lg text-base leading-relaxed" style={{ color: T.muted }}>Since 2016, Tayseer has combined financial technology products, engineering and delivery expertise across the region.</p><Link href="/about" className="mt-7 inline-flex min-h-11 items-center gap-2 font-jbmono text-[11px] uppercase tracking-widest" style={{ color: T.signal }}>Discover Tayseer <ArrowRight aria-hidden="true" size={14} /></Link></Reveal>
        <Reveal delay={0.06} className="lg:col-span-7"><DeploymentArchitectureVisual /></Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return <div style={{ background: T.bg, color: T.text }} className="overflow-x-clip font-archivo"><EnterpriseHero /><ChallengeSolution /><PremiumSolutions /><FahimShowcase /><BankingEcosystem /><CompanyBridge /><CredibilityMetrics /><ExecutiveTestimonials /><LatestInsights /><FinalEnterpriseCTA /></div>;
}
