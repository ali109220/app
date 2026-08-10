"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Database, BrainCircuit, ChartNoAxesCombined, Workflow, Target } from "lucide-react";
import { T } from "@/site/theme";
import { ActivityIndicator, RevealOnScroll, StateSwap, TIER, StageArrival, StagePulse, activityAlpha, useInView, useTabs } from "@/site/motion";

// Same finite model as the architecture flow: shared cycle, staggered delays,
// one packet moving through the stages at a time, two passes, then still.
// See .motion-stage-travel in index.css.
const FLOW_CYCLE = 6500;
const HOP_OFFSET = FLOW_CYCLE * 0.16;
const HOP_TRAVEL = FLOW_CYCLE * 0.14;
const FLOW_PASSES = 2;

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
  // Counts user-initiated runs of the pipeline. 0 is the ambient arrival story
  // the section has always told; every increment is a scenario the visitor
  // actually asked for.
  const [run, setRun] = useState(0);
  const active = SCENARIOS.find(s => s.id === scenario) || SCENARIOS[0];
  // Finite passes, so they only start once the flow is actually on screen.
  const [flowRef, flowInView] = useInView({ threshold: 0.35 });

  // Choosing a scenario re-runs the pipeline once. This is the honest reading of
  // the diagram: a scenario is a question put to Fahim, so data should visibly
  // move through it again rather than the caption quietly changing underneath a
  // row that has already finished animating. One pass, not two — the visitor is
  // watching this time, so it does not need repeating to be noticed.
  const selectScenario = (id) => {
    if (id === scenario) return;
    setScenario(id);
    setRun(r => r + 1);
  };

  const passes = run === 0 ? FLOW_PASSES : 1;
  const { tablistProps, getTabProps, panelProps } = useTabs({ id: "fahim-scenario", items: SCENARIOS.map(s => s.id), value: scenario, onChange: selectScenario, orientation: "vertical" });

  return <section className="relative overflow-hidden border-b px-6 py-20 md:px-12 md:py-24" style={{ borderColor: T.border, background: T.panel }} aria-labelledby="fahim-v2-heading">
    <div className="pointer-events-none absolute -right-32 top-0 h-[28rem] w-[28rem] rounded-full blur-3xl" style={{ background: "rgba(13,90,140,.09)" }} />
    <div className="relative mx-auto max-w-[1400px]">
      {/* Layout unchanged; heading leads and the explanatory column follows. */}
      <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
        <RevealOnScroll delay={TIER.heading} className="lg:col-span-7"><div className="font-jbmono text-xs uppercase tracking-[.22em]" style={{ color: T.signal }}>Fahim AI</div><h2 id="fahim-v2-heading" className="mt-5 text-4xl font-bold leading-[.94] tracking-[-.03em] sm:text-5xl">Banking intelligence in motion</h2></RevealOnScroll>
        <RevealOnScroll delay={TIER.body} className="lg:col-span-5"><p className="max-w-xl text-base leading-relaxed" style={{ color: T.muted }}>A visual model of how Fahim connects data, AI processing, insight and selected automation into one human-led intelligence flow.</p><Link href="/solutions/fahim-ai" className="cta-secondary mt-5 inline-flex min-h-11 items-center gap-2 font-jbmono text-xs tracking-wide" style={{ color: T.signal }}>Explore Fahim AI <ArrowRight size={13} aria-hidden="true" className="motion-card-arrow" /></Link></RevealOnScroll>
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-[.8fr_2.2fr]">
        {/* Scenario tabs are controls, not content: they appear immediately so
            they are clickable the instant the visitor sees them. Arrow keys move
            the selection, and the selected one carries the green dot — the same
            "this is the live one" mark used everywhere else on the site. */}
        <div className="space-y-2" {...tablistProps} aria-label="Fahim AI scenarios">{SCENARIOS.map((item) => { const isActive = item.id === scenario; return <button key={item.id} {...getTabProps(item.id)} className="cta-secondary selector-option w-full rounded-xl border p-4 text-left" style={{ borderColor: isActive ? T.signal : T.border, background: isActive ? T.bg : 'transparent' }}><span className="flex items-center gap-2 font-jbmono text-xs tracking-wide" style={{ color: isActive ? T.signal : T.muted }}><span className="inline-flex h-[5px] w-[5px] shrink-0">{isActive && <ActivityIndicator size={5} />}</span>{item.label}</span><span className="mt-2 block text-sm font-medium">{item.result}</span></button>; })}</div>

        {/* tabIndex, because the panel holds no focusable element of its own and
            a keyboard user on the tabs would otherwise have no way to reach it. */}
        <RevealOnScroll variant="scale" delay={TIER.visual} {...panelProps} tabIndex={0} className="overflow-hidden rounded-2xl border" style={{ borderColor: T.border, background: T.bg }}>
          <div ref={flowRef} data-flow={flowInView ? "active" : undefined} className="grid gap-0 md:grid-cols-5">
            {STAGES.map((stage,index) => {
              const isLast = index === STAGES.length - 1;
              return <div key={stage.label} className="arch-node relative border-b p-5 text-center md:border-b-0 md:border-r" style={{ borderColor: T.border }}>
                <div className="arch-node-chip mx-auto flex h-12 w-12 items-center justify-center rounded-full border" style={{ borderColor: index===1 ? T.signal : T.border, color: index===1 ? T.signal : T.muted, background: T.panel }}><stage.icon size={20} aria-hidden="true" /></div>
                <div className="mt-4 text-xs font-medium">{stage.label}</div>
                {/* Keyed on the run so a new scenario restarts the CSS animations
                    from their first keyframe instead of joining one already in
                    progress. */}
                {index > 0 && <StageArrival key={`arrive-${run}`} className="inset-0" delay={(index - 1) * HOP_OFFSET + HOP_TRAVEL} cycle={FLOW_CYCLE} passes={passes} style={{ background: `radial-gradient(circle at 50% 32%, ${activityAlpha(0.16)}, transparent 62%)` }} />}
                {!isLast && <>
                  <StagePulse key={`pulse-${run}`} delay={index * HOP_OFFSET} cycle={FLOW_CYCLE} passes={passes} />
                  <span className="arch-node-link absolute -right-1 top-1/2 hidden h-2 w-2 -translate-y-1/2 rotate-45 border-r border-t md:block" style={{ borderColor: T.signal }} />
                </>}
              </div>;
            })}
          </div>
          <div className="grid gap-6 border-t p-6 md:grid-cols-[1.5fr_.5fr] md:p-8" style={{ borderColor: T.border }}>
            <StateSwap value={scenario}><div className="font-jbmono text-xs tracking-wide" style={{ color: T.signal }}>{active.label}</div><h3 className="mt-3 text-2xl font-semibold">{active.result}</h3><p className="mt-3 max-w-2xl text-sm leading-relaxed" style={{ color: T.muted }}>{active.detail}</p></StateSwap>
            <div className="flex items-center justify-center"><div className="relative flex h-28 w-28 items-center justify-center rounded-full border" style={{ borderColor: T.border }}><div className="absolute inset-3 rounded-full border" style={{ borderColor: "rgba(13,90,140,.25)" }} /><div className="absolute inset-6 rounded-full" style={{ background: "rgba(13,90,140,.12)" }} /><BrainCircuit size={28} aria-hidden="true" style={{ color: T.signal, position: 'relative' }} /></div></div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  </section>;
}
