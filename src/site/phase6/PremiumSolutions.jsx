import Link from "next/link";
import { ArrowUpRight, BrainCircuit, Landmark, Layers3, ServerCog, Smartphone, Wrench } from "lucide-react";
import { Reveal } from "@/site/motion";
import { T } from "@/site/theme";
import { ProductDashboardVisual } from "./VisualMedia";

const SOLUTIONS = [
  { name: "Core Banking", label: "Modernize the core", copy: "A future-ready foundation for growth and integration.", outcome: "Modernization · Scalability", to: "/solutions/core-banking", icon: Landmark },
  { name: "Fahim AI", label: "Operationalize intelligence", copy: "Bring AI into decisions, automation and banking workflows.", outcome: "Insights · Automation", to: "/solutions/fahim-ai", icon: BrainCircuit },
  { name: "MBuke", label: "Accelerate digital banking", copy: "Launch flexible white-label mobile banking experiences faster.", outcome: "Mobile · Experience", to: "/solutions/mbuke", icon: Smartphone },
  { name: "Software Systems", label: "Simplify operations", copy: "Shape connected systems around real operational needs.", outcome: "Workflow · Control", to: "/solutions/software-management-systems", icon: Layers3 },
  { name: "Managed Services", label: "Extend capability", copy: "Keep critical platforms reliable with specialized expertise.", outcome: "Expertise · Continuity", to: "/solutions/managed-services", icon: Wrench },
  { name: "Banking Systems", label: "Strengthen the estate", copy: "Connect infrastructure and systems with long-term value.", outcome: "Infrastructure · Integration", to: "/solutions/banking-systems", icon: ServerCog },
];

export default function PremiumSolutions() {
  return (
    <section className="relative border-t px-6 py-24 md:px-12" style={{ borderColor: T.border, background: T.panel }} aria-labelledby="portfolio-heading">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-6"><div className="font-jbmono text-[11px] uppercase tracking-[0.26em]" style={{ color: T.signal }}>Solutions</div><h2 id="portfolio-heading" className="mt-5 text-4xl font-bold uppercase leading-[0.96] tracking-[-0.025em] sm:text-5xl">Enterprise Solutions</h2><p className="mt-5 max-w-xl text-base leading-relaxed" style={{ color: T.muted }}>Banking platforms, AI and managed technology built to work together.</p><Link href="/solutions" className="mt-6 inline-flex min-h-11 items-center gap-2 font-jbmono text-[11px] uppercase tracking-widest" style={{ color: T.signal }}>View all solutions <ArrowUpRight aria-hidden="true" size={14} /></Link></Reveal>
          <Reveal delay={0.08} className="lg:col-span-6"><ProductDashboardVisual label="Tayseer Banking Platform" /></Reveal>
        </div>
        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border md:grid-cols-2 xl:grid-cols-3" style={{ borderColor: T.border, background: T.border }}>
          {SOLUTIONS.map((solution, index) => <Reveal key={solution.name} delay={index * 0.04}><Link href={solution.to} className="group flex h-full min-h-[260px] flex-col p-7" style={{ background: T.bg }}><div className="flex items-start justify-between gap-6"><div className="flex h-11 w-11 items-center justify-center rounded-md" style={{ background: "rgba(13,90,140,.10)", color: T.signal }}><solution.icon aria-hidden="true" size={20} /></div><span className="font-jbmono text-[10px] tracking-[0.2em]" style={{ color: T.faint }}>0{index + 1}</span></div><div className="mt-8 font-jbmono text-[10px] uppercase tracking-[0.2em]" style={{ color: T.green }}>{solution.label}</div><h3 className="mt-3 text-2xl font-semibold">{solution.name}</h3><p className="mt-3 text-sm leading-relaxed" style={{ color: T.muted }}>{solution.copy}</p><div className="mt-auto flex items-end justify-between gap-6 pt-7"><span className="text-[11px]" style={{ color: T.faint }}>{solution.outcome}</span><ArrowUpRight aria-hidden="true" size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" style={{ color: T.signal }} /></div></Link></Reveal>)}
        </div>
      </div>
    </section>
  );
}
