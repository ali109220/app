"use client";

import { useState } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { ActivityIndicator, FlowStage, RevealOnScroll, STAGGER, TIER, StageArrival, StagePulse, StateSwap, activityAlpha, useTabs } from "@/site/motion";
import { T } from "@/site/theme";

/**
 * The selectable steps of a solution page's architecture flow.
 *
 * Split out of EnterpriseSolutionLayout because that file must stay a SERVER
 * module (it receives lucide icon components as props) and this needs state.
 * `steps` crosses the boundary as plain strings, so nothing here constrains the
 * seven pages that render it.
 *
 * The interaction is the same one the homepage architecture uses, for the same
 * reason: an ordered flow is a claim about route, and the only thing the static
 * row cannot tell you is what a request passes through on the way to a given
 * step. Selecting one runs the packet again, stopping there, and names the
 * route. Every word of the readout comes from the `steps` the page already
 * declared — this adds an interaction to existing content, not content to
 * justify an interaction.
 *
 * Same finite model as the homepage pipeline: shared cycle, staggered delays,
 * one packet at a time, then permanently still.
 */
const FLOW_CYCLE = 7000;
const HOP_OFFSET = FLOW_CYCLE * 0.16;
const HOP_TRAVEL = FLOW_CYCLE * 0.14;
const FLOW_PASSES = 2;

export default function ArchitectureFlowStages({ title, steps = [] }) {
  // Index-based ids: step text is page-supplied prose and is not attribute-safe.
  const ids = steps.map((_, index) => `s${index + 1}`);
  const [selected, setSelected] = useState(null);
  const [run, setRun] = useState(0);

  const selectStep = (id) => {
    setSelected(id);
    setRun(r => r + 1);
  };

  const selectedIndex = ids.indexOf(selected);
  const traced = selectedIndex >= 0;
  const lastHop = traced ? selectedIndex : steps.length - 1;
  const passes = traced ? 1 : FLOW_PASSES;
  const flowKey = traced ? `${selected}-${run}` : "ambient";

  const { tablistProps, getTabProps, panelProps } = useTabs({ id: "architecture-flow", items: ids, value: selected, onChange: selectStep });

  if (!steps.length) return null;

  return (
    <>
      {/* FlowStage is still the in-view gate for the finite passes — it just
          carries the tablist now rather than an <ol>. The list semantics went
          with the change: these are controls in a group, not list items. */}
      <FlowStage {...tablistProps} aria-label={`${title} flow`} className="relative mt-10 grid gap-3 md:grid-cols-5 md:gap-4">
        <span className="pointer-events-none absolute left-[8%] right-[8%] top-1/2 hidden h-px md:block" style={{ background: "linear-gradient(90deg, transparent, rgba(13,90,140,.35), transparent)" }} aria-hidden="true" />
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          const onPath = !traced || index <= selectedIndex;
          const isSelected = index === selectedIndex;
          return (
            <RevealOnScroll
              key={step}
              role="presentation"
              variant="scale"
              delay={TIER.visual + index * STAGGER}
              /* No overflow-hidden: the step connectors sit at -right-[18px]
                 and -bottom-[15px], outside the box, and would be clipped. */
              className="arch-node relative z-10 border"
              style={{ borderColor: T.border, background: T.bg }}
            >
              <button {...getTabProps(ids[index])} className="selector-option block w-full p-5 text-left text-sm font-medium" style={{ opacity: onPath ? 1 : 0.42 }}>
                <span className="mb-3 flex items-center gap-2 font-jbmono text-[10px]" style={{ color: isSelected ? T.signal : T.faint }}>
                  {/* Slot always rendered, so selecting cannot nudge the label. */}
                  <span className="inline-flex h-[5px] w-[5px] shrink-0">{isSelected && <ActivityIndicator size={5} />}</span>
                  Step {String(index + 1).padStart(2, "0")}
                </span>
                {step}
              </button>
              {index > 0 && index <= lastHop && <StageArrival key={`arrive-${flowKey}`} className="inset-0" delay={(index - 1) * HOP_OFFSET + HOP_TRAVEL} cycle={FLOW_CYCLE} passes={passes} style={{ background: `radial-gradient(circle at 50% 40%, ${activityAlpha(0.16)}, transparent 66%)` }} />}
              {!isLast && index < lastHop && <StagePulse key={`pulse-${flowKey}`} delay={index * HOP_OFFSET} cycle={FLOW_CYCLE} passes={passes} />}
              {!isLast ? <ArrowDown size={14} className="absolute -bottom-[15px] left-1/2 -translate-x-1/2 md:hidden" aria-hidden="true" style={{ color: T.signal, opacity: index < lastHop ? 1 : 0.25 }} /> : null}
              {!isLast ? <ArrowRight size={15} className="arch-node-link absolute -right-[18px] top-1/2 hidden -translate-y-1/2 md:block" aria-hidden="true" style={{ color: T.signal, opacity: index < lastHop ? 1 : 0.25 }} /> : null}
            </RevealOnScroll>
          );
        })}
      </FlowStage>

      <div {...panelProps} tabIndex={0} className="mt-4 border px-5 py-4" style={{ borderColor: T.border, background: T.panel }}>
        <StateSwap value={selected ?? "none"}>
          {traced ? (
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
              <span className="inline-flex items-center gap-2 font-jbmono text-[10px] uppercase tracking-[.2em]" style={{ color: T.signal }}><ActivityIndicator size={5} />Step {String(selectedIndex + 1).padStart(2, "0")} of {String(steps.length).padStart(2, "0")}</span>
              <span className="text-base font-semibold">{steps[selectedIndex]}</span>
              <span className="w-full font-jbmono text-xs leading-relaxed" style={{ color: T.muted }}>Reached through {steps.slice(0, selectedIndex + 1).join(" → ")}</span>
            </div>
          ) : (
            <p className="font-jbmono text-xs tracking-wide" style={{ color: T.muted }}>Select a step to trace the path that reaches it.</p>
          )}
        </StateSwap>
      </div>
    </>
  );
}
