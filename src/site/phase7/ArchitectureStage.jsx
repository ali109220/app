"use client";

import { useState } from "react";
import { Cloud, Database, Landmark, Network, Server, Smartphone, Workflow, BrainCircuit } from "lucide-react";
import { T } from "@/site/theme";
import { ActivityIndicator, RevealOnScroll, STAGGER, TIER, StageArrival, StagePulse, StateSwap, activityAlpha, useInView, useTabs } from "@/site/motion";

const FLOW = [
  { id: "customers", label: "Customers", icon: Smartphone, copy: "Mobile · Web · Assisted" },
  { id: "experience", label: "Experience", icon: Network, copy: "Digital channels" },
  { id: "gateway", label: "Gateway", icon: Workflow, copy: "APIs · Integration" },
  { id: "services", label: "Services", icon: Server, copy: "Business capabilities" },
  { id: "core", label: "Core Banking", icon: Landmark, copy: "Transactions · Accounts" },
  { id: "data", label: "Data & AI", icon: BrainCircuit, copy: "Insights · Automation" },
];

/**
 * The signature motion interaction: one packet walks the pipeline.
 *
 * It leaves Customers, crosses to Experience, briefly lights it green, stops.
 * Then the next hop. Five hops, left to right, one at a time — never two in
 * flight, never a second colour, never a line that is permanently busy. After
 * two complete passes the row is finished and stays completely still.
 *
 * HOP_OFFSET is the gap between hop starts; travel is 14% of the cycle (see
 * .motion-stage-travel), so a 16% offset leaves a clear beat between hops and
 * the last ~20% of each pass is silence before the packet sets off again.
 */
const FLOW_CYCLE = 7000;
const HOP_OFFSET = FLOW_CYCLE * 0.16;
const HOP_TRAVEL = FLOW_CYCLE * 0.14;
const FLOW_PASSES = 2;

export default function ArchitectureStage() {
  // The two passes are finite, so they must not be spent while the section is
  // still below the fold. `data-flow` releases the paused CSS animations at the
  // moment the diagram is actually on screen.
  const [flowRef, flowInView] = useInView({ threshold: 0.35 });

  /**
   * The interaction this diagram earns.
   *
   * A layered architecture is a claim about ROUTE — a request does not simply
   * arrive at Core Banking, it gets there through the channel, the gateway and
   * the service layer. That is the one thing the static row cannot say, and it
   * is the thing selecting a stage answers: the packet runs again but stops at
   * the chosen stage, the stages it passed through stay lit, the ones past it
   * recede, and the readout names the route in words.
   *
   * `null` is the resting state, and it is exactly the diagram that shipped
   * before: full row, two ambient passes, nothing dimmed. The interaction layer
   * sits on top of the approved design rather than replacing it.
   */
  const [selected, setSelected] = useState(null);
  const [run, setRun] = useState(0);

  const selectStage = (id) => {
    setSelected(id);
    setRun(r => r + 1);
  };

  const selectedIndex = FLOW.findIndex(item => item.id === selected);
  const traced = selectedIndex >= 0;
  // The last hop that carries data. Untouched, that is the whole row; traced, it
  // is the selected stage, so the packet stops where the visitor pointed.
  const lastHop = traced ? selectedIndex : FLOW.length - 1;
  // One pass for a run the visitor asked for — they are watching it, so it does
  // not need repeating to be seen. Two for the ambient story, as before.
  const passes = traced ? 1 : FLOW_PASSES;
  const flowKey = traced ? `${selected}-${run}` : "ambient";

  const { tablistProps, getTabProps, panelProps } = useTabs({ id: "architecture-stage", items: FLOW.map(item => item.id), value: selected, onChange: selectStage });

  return <section className="relative border-b px-6 py-20 md:px-12 md:py-24" style={{ borderColor: T.border }} aria-labelledby="architecture-stage-heading">
    <div className="mx-auto max-w-[1400px]">
      {/* Original two-column grid preserved exactly; the hierarchy comes purely
          from the delays. The eyebrow shares the heading's beat rather than
          taking a reveal of its own, so they read as one unit. */}
      <RevealOnScroll delay={TIER.heading} className="font-jbmono text-xs uppercase tracking-[.22em]" style={{ color: T.signal }}>Architecture</RevealOnScroll>
      <div className="mt-5 grid gap-8 lg:grid-cols-12 lg:items-end">
        <RevealOnScroll as="h2" id="architecture-stage-heading" delay={TIER.heading} className="text-4xl font-bold leading-[.94] tracking-[-.03em] sm:text-5xl lg:col-span-7">Designed to connect the banking technology environment</RevealOnScroll>
        <RevealOnScroll as="p" delay={TIER.body} className="max-w-xl text-base leading-relaxed lg:col-span-5" style={{ color: T.muted }}>A representative architecture view showing how customer experiences, APIs, services, core banking systems and intelligence can operate as one connected technology landscape.</RevealOnScroll>
      </div>

      <div ref={flowRef} data-flow={flowInView ? "active" : undefined} className="mt-14 overflow-hidden rounded-2xl border" style={{ borderColor: T.border, background: T.panel }}>
        <div className="grid md:grid-cols-6" {...tablistProps} aria-label="Architecture stages">
          {FLOW.map((item,index) => {
            const isLast = index === FLOW.length - 1;
            // Hop i carries data out of stage i, so stage i+1 acknowledges it.
            const departure = index * HOP_OFFSET;
            const arrival = (index - 1) * HOP_OFFSET + HOP_TRAVEL;
            const onPath = !traced || index <= selectedIndex;
            const isSelected = index === selectedIndex;
            // role="presentation" so the tablist still owns the tabs directly:
            // the reveal wrapper is a layout and animation device, and a generic
            // element between a tablist and its tabs breaks that relationship.
            return <RevealOnScroll key={item.id} role="presentation" delay={TIER.visual + index*STAGGER} variant="scale" className="arch-node relative border-b md:border-b-0 md:border-r" style={{ borderColor: T.border }}>
              {/* The node is the control. Its label and copy are spans rather
                  than a heading and a paragraph because a button may only
                  contain phrasing content — the stage names are announced as
                  tab labels now, and the selected one is repeated as the
                  readout's heading below. */}
              <button {...getTabProps(item.id)} className="selector-option selector-option-inset block w-full p-5 text-center" style={{ opacity: onPath ? 1 : 0.42 }}>
                <span className="arch-node-chip mx-auto flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: index===4 ? "rgba(13,90,140,.16)" : T.bg, color: index===4 ? T.signal : T.muted }}><item.icon size={20} aria-hidden="true" /></span>
                <span className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold">
                  {/* Slot is always present, so selecting cannot nudge the label. */}
                  <span className="inline-flex h-[5px] w-[5px] shrink-0">{isSelected && <ActivityIndicator size={5} />}</span>
                  {item.label}
                </span>
                <span className="mt-2 block text-xs leading-relaxed" style={{ color: T.muted }}>{item.copy}</span>
              </button>
              {/* Green wash confirming the packet landed here, then gone. Re-keyed
                  per run so a selection restarts the animation from its first
                  keyframe rather than joining one already part-way through. */}
              {index > 0 && index <= lastHop && <StageArrival key={`arrive-${flowKey}`} className="inset-0 rounded-none" delay={arrival} cycle={FLOW_CYCLE} passes={passes} style={{ background: `radial-gradient(circle at 50% 30%, ${activityAlpha(0.16)}, transparent 62%)` }} />}
              {!isLast && <>
                {index < lastHop && <StagePulse key={`pulse-${flowKey}`} delay={departure} cycle={FLOW_CYCLE} passes={passes} />}
                <span className="arch-node-link absolute -right-1 top-1/2 hidden h-2 w-2 -translate-y-1/2 rotate-45 border-r border-t md:block" style={{ borderColor: T.signal, opacity: index < lastHop ? 1 : 0.25 }} />
              </>}
            </RevealOnScroll>;
          })}
        </div>

        {/* The route, in words. This is the "related information" a selection
            produces, and every part of it — labels, copy, order — is content the
            diagram already carried; nothing about the architecture is invented
            to give the interaction something to say. */}
        <div {...panelProps} tabIndex={0} className="border-t px-6 py-5 md:px-8" style={{ borderColor: T.border, background: T.bg }}>
          <StateSwap value={selected ?? "none"}>
            {traced ? <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
              <span className="inline-flex items-center gap-2 font-jbmono text-[11px] uppercase tracking-[.2em]" style={{ color: T.signal }}><ActivityIndicator size={5} />Stage {String(selectedIndex + 1).padStart(2, "0")}</span>
              <h3 className="text-base font-semibold">{FLOW[selectedIndex].label}</h3>
              <span className="text-sm" style={{ color: T.muted }}>{FLOW[selectedIndex].copy}</span>
              <span className="w-full font-jbmono text-xs leading-relaxed" style={{ color: T.muted }}>Reached through {FLOW.slice(0, selectedIndex + 1).map(step => step.label).join(" → ")}</span>
            </div> : <p className="font-jbmono text-xs tracking-wide" style={{ color: T.muted }}>Select a stage to trace the path that reaches it.</p>}
          </StateSwap>
        </div>

        {/* Supporting detail inside the same panel — no reveal of its own. The
            packet crossing the row above is the event here; animating the prose
            underneath it as well is the "fade, fade, fade" the brief warns of. */}
        <div className="grid border-t md:grid-cols-2" style={{ borderColor: T.border }}>
          <div className="p-6 md:p-8"><div className="flex items-center gap-3"><Server size={19} aria-hidden="true" style={{ color: T.signal }} /><div className="font-semibold">On-site deployment</div></div><p className="mt-3 max-w-xl text-sm leading-relaxed" style={{ color: T.muted }}>For institutions prioritizing control, tailored integration and deployment within their own technology environment.</p></div>
          <div className="border-t p-6 md:border-l md:border-t-0 md:p-8" style={{ borderColor: T.border }}><div className="flex items-center gap-3"><Cloud size={19} aria-hidden="true" style={{ color: T.signal }} /><div className="font-semibold">Cloud deployment</div></div><p className="mt-3 max-w-xl text-sm leading-relaxed" style={{ color: T.muted }}>For institutions prioritizing agility, scalability and a more flexible operating model as technology needs evolve.</p></div>
        </div>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t px-6 py-4 text-xs font-jbmono tracking-wide" style={{ borderColor: T.border, color: T.muted }}><span className="inline-flex items-center gap-2"><Database size={13} aria-hidden="true" /> Data integration</span><span>API-led connectivity</span><span>Layered modernization</span><span>Human-led operations</span></div>
      </div>
    </div>
  </section>;
}
