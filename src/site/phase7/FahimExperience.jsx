"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Database, BrainCircuit, ChartNoAxesCombined, Workflow, Target } from "lucide-react";
import { T } from "@/site/theme";
import { ActivityIndicator, RevealOnScroll, STAGGER, StageArrival, StagePulse, green } from "@/site/motion";

// Same cycle model as the architecture flow: shared cycle, staggered delays, one
// dot moving through the stages at a time. See .motion-stage-travel in index.css.
const FLOW_CYCLE = 8000;
const HOP_OFFSET = FLOW_CYCLE * 0.16;
const HOP_TRAVEL = FLOW_CYCLE * 0.14;

const SCENARIOS = [
  { id: "service", label: "Customer service", result: "Recommended next action", detail: "Connect customer context and signals to suggest a relevant next step for the service team." },
  { id: "ops", label: "Operations", result: "Workflow automation", detail: "Use intelligence to identify repeatable decisions and reduce manual operational friction." },
  { id: "risk", label: "Decision support", result: "Decision insight", detail: "Surface patterns and contextual information that help teams evaluate complex cases faster." },
];

const STAGES = [
  { label: "Data", icon: Database },
  { label: "AI processing", icon: BrainCircuit },
  { label: "Insight", icon: ChartNoAxesCombined },
  { label: "Automation", icon: Workflow },
  { label: "Outcome", icon: Target },
];

export default function FahimExperience() {
  const [scenario, setScenario] = useState(SCENARIOS[0].id);
  const active = SCENARIOS.find(s => s.id === scenario) || SCENARIOS[0];
  return <section className="relative overflow-hidden border-b px-6 py-20 md:px-12 md:py-24" style={{ borderColor: T.border, background: T.panel }} aria-labelledby="fahim-v2-heading">
    <div className="pointer-events-none absolute -right-32 top-0 h-[28rem] w-[28rem] rounded-full blur-3xl" style={{ background: "rgba(13,90,140,.09)" }} />
    <div className="relative mx-auto max-w-[1400px]">
      <RevealOnScroll className="grid gap-12 lg:grid-cols-12 lg:items-end"><div className="lg:col-span-7"><div className="flex items-center gap-2.5 font-jbmono text-xs uppercase tracking-[.22em]" style={{ color: T.signal }}><ActivityIndicator />Fahim AI</div><h2 id="fahim-v2-heading" className="mt-5 text-4xl font-bold leading-[.94] tracking-[-.03em] sm:text-5xl">Banking intelligence in motion</h2></div><div className="lg:col-span-5"><p className="max-w-xl text-base leading-relaxed" style={{ color: T.muted }}>A visual model of how Fahim connects data, AI processing, insight and selected automation into one human-led intelligence flow.</p><Link href="/solutions/fahim-ai" className="cta-secondary mt-5 inline-flex min-h-11 items-center gap-2 font-jbmono text-xs tracking-wide" style={{ color: T.signal }}>Explore Fahim AI <ArrowRight size={13} aria-hidden="true" className="motion-card-arrow" /></Link></div></RevealOnScroll>

      <div className="mt-14 grid gap-8 lg:grid-cols-[.8fr_2.2fr]">
        <div className="space-y-2" role="tablist" aria-label="Fahim AI scenarios">{SCENARIOS.map((item, index) => <RevealOnScroll key={item.id} variant="fade-right" delay={index * STAGGER}><button type="button" role="tab" aria-selected={scenario===item.id} onClick={()=>setScenario(item.id)} className="cta-secondary w-full rounded-xl border p-4 text-left transition-colors" style={{ borderColor: scenario===item.id ? T.signal : T.border, background: scenario===item.id ? T.bg : 'transparent' }}><div className="font-jbmono text-xs tracking-wide" style={{ color: scenario===item.id ? T.signal : T.muted }}>{item.label}</div><div className="mt-2 text-sm font-medium">{item.result}</div></button></RevealOnScroll>)}</div>

        <RevealOnScroll variant="scale" delay={STAGGER} className="overflow-hidden rounded-2xl border" style={{ borderColor: T.border, background: T.bg }}>
          <div className="grid gap-0 md:grid-cols-5">
            {STAGES.map((stage,index) => {
              const isLast = index === STAGES.length - 1;
              return <div key={stage.label} className="arch-node relative border-b p-5 text-center md:border-b-0 md:border-r" style={{ borderColor: T.border }}>
                <div className="arch-node-chip mx-auto flex h-12 w-12 items-center justify-center rounded-full border" style={{ borderColor: index===1 ? T.signal : T.border, color: index===1 ? T.signal : T.muted, background: T.panel }}><stage.icon size={20} aria-hidden="true" /></div>
                <div className="mt-4 text-xs font-medium">{stage.label}</div>
                {index > 0 && <StageArrival className="inset-0" delay={(index - 1) * HOP_OFFSET + HOP_TRAVEL} cycle={FLOW_CYCLE} style={{ background: `radial-gradient(circle at 50% 32%, ${green(0.16)}, transparent 62%)` }} />}
                {!isLast && <>
                  <StagePulse delay={index * HOP_OFFSET} cycle={FLOW_CYCLE} />
                  <span className="arch-node-link absolute -right-1 top-1/2 hidden h-2 w-2 -translate-y-1/2 rotate-45 border-r border-t md:block" style={{ borderColor: T.signal }} />
                </>}
              </div>;
            })}
          </div>
          <div className="grid gap-6 border-t p-6 md:grid-cols-[1.5fr_.5fr] md:p-8" style={{ borderColor: T.border }}>
            <div><div className="font-jbmono text-xs tracking-wide" style={{ color: T.signal }}>{active.label}</div><h3 className="mt-3 text-2xl font-semibold">{active.result}</h3><p className="mt-3 max-w-2xl text-sm leading-relaxed" style={{ color: T.muted }}>{active.detail}</p></div>
            <div className="flex items-center justify-center"><div className="relative flex h-28 w-28 items-center justify-center rounded-full border" style={{ borderColor: T.border }}><div className="absolute inset-3 rounded-full border" style={{ borderColor: "rgba(13,90,140,.25)" }} /><div className="absolute inset-6 rounded-full" style={{ background: "rgba(13,90,140,.12)" }} /><BrainCircuit size={28} aria-hidden="true" style={{ color: T.signal, position: 'relative' }} /></div></div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  </section>;
}
