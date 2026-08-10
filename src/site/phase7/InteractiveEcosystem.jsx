"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BrainCircuit, Landmark, Smartphone, ServerCog, Wrench, Layers3, ArrowUpRight } from "lucide-react";
import { T } from "@/site/theme";
import { ActivityIndicator, FlowParticle, RevealOnScroll, StateSwap, TIER, activityAlpha, activityGreen } from "@/site/motion";

const CORE = { x: 50, y: 50 };

// The stage SVG is 100x100 with preserveAspectRatio="none", so x and y are each
// scaled by the box's own width/height ratio. FlowParticle needs that ratio to
// keep the data dot round instead of stretching it into an oval.
//
// 1.25 is the ratio the box holds wherever it has room for it, and the value
// server and first client render agree on. It stops holding on a narrow stage,
// where the box turns portrait (see STAGE_SIZE) — so the live ratio is measured
// rather than assumed (see useStageAspect).
const STAGE_ASPECT = 1.25;

/**
 * Six nodes in a radial layout need a floor on vertical room that a ratio alone
 * cannot give them: at a 342px-wide stage, 1.25:1 is only 274px tall and the
 * Managed Services node at y=89% lands on the frame's bottom edge, on top of
 * the caption. 26rem is the height at which it clears — 0.11 x H has to exceed
 * half a node plus a margin.
 *
 * A height floor is stated as a fixed height below a breakpoint rather than as
 * `min-h` alongside the ratio, because `min-height` and `aspect-ratio` together
 * give the box a 520px min-content WIDTH (416 x 1.25), which forces the grid
 * track wider than the phone and the whole page scrolls sideways.
 *
 * 568px is where the two definitions meet exactly: the stage is viewport minus
 * 48px of padding there, so 1.25:1 of 520px is 416px and the box carries the
 * same shape either side of the breakpoint. Nothing jumps.
 */
const STAGE_SIZE = "h-[26rem] min-[568px]:h-auto min-[568px]:aspect-[1.25/1]";

// Node width is a layout constraint, not a typographic one, so it is stated
// rather than left to shrink-to-fit — which sized these wrong in two ways at
// narrow widths. An absolutely positioned box is sized against the space to the
// RIGHT of its `left`, so the two nodes at x=82% came out narrower than their
// counterparts at x=18% and wrapped while those stayed on one line; and at a
// 312px stage (a 360px phone) the wide ones then slid under Managed Services.
//
// A node at x=18% clears a centred sibling only while it is at most 32% of the
// stage wide, hence the 30% ceiling. Above ~347px of stage the fixed 6.5rem is
// the smaller of the two and takes over, which is the size these have always
// been. Past the STAGE_SIZE breakpoint the stage is wide enough that the
// asymmetry cannot reach Managed Services, so content-driven sizing is restored
// untouched and the labels stay on one line as designed.
const NODE_WIDTH = {
  core: "max-[567px]:w-[min(7.75rem,36%)] min-[568px]:min-w-[7.75rem]",
  outer: "max-[567px]:w-[min(6.5rem,30%)] min-[568px]:min-w-[6.5rem]",
};

/**
 * The stage's live width/height ratio.
 *
 * Only the data dot's roundness depends on it — layout is pure CSS — so the
 * pre-measurement value is a correct-looking default rather than a placeholder,
 * and there is no layout shift when the real one arrives.
 */
function useStageAspect() {
  const ref = useRef(null);
  const [aspect, setAspect] = useState(STAGE_ASPECT);

  useEffect(() => {
    const element = ref.current;
    if (!element || !("ResizeObserver" in window)) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) setAspect(width / height);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, aspect];
}

const NODES = [
  { id: "core", label: "Core Banking", copy: "The central platform that supports transactions, integration and day-to-day banking operations.", icon: Landmark, to: "/solutions/core-banking", x: 50, y: 50 },
  { id: "digital", label: "Digital Channels", copy: "Connected mobile and customer-facing banking experiences.", icon: Smartphone, to: "/solutions/mbuke", x: 18, y: 25 },
  { id: "ai", label: "Fahim AI", copy: "Decision support, intelligence and automation across banking workflows.", icon: BrainCircuit, to: "/solutions/fahim-ai", x: 82, y: 23 },
  { id: "systems", label: "Business Systems", copy: "Operational software shaped around enterprise workflows.", icon: Layers3, to: "/solutions/software-management-systems", x: 18, y: 76 },
  { id: "infra", label: "Banking Systems", copy: "Infrastructure and system integration across the bank’s technology environment.", icon: ServerCog, to: "/solutions/banking-systems", x: 82, y: 76 },
  { id: "managed", label: "Managed Services", copy: "Expert delivery and operating support around critical banking technology.", icon: Wrench, to: "/solutions/managed-services", x: 50, y: 89 },
];

export default function InteractiveEcosystem() {
  const [active, setActive] = useState("core");
  // The green arrival dot is an acknowledgement of something the visitor did, so
  // it must not be on screen before they have done anything. `active` cannot
  // carry that distinction on its own — it starts at "core", which is also a
  // legitimate thing to select — so the first real hover/focus/tap is recorded
  // separately and the dot stays off until then.
  const [engaged, setEngaged] = useState(false);
  const select = (id) => { setActive(id); setEngaged(true); };
  const [stageRef, stageAspect] = useStageAspect();
  const selected = NODES.find((node) => node.id === active) || NODES[0];
  // With the core selected (the default) there is no single active connector, so
  // the traffic goes to intelligence — the layer that is doing the work.
  const target = active === "core" ? NODES.find((node) => node.id === "ai") : selected;

  return (
    <section className="relative border-b px-6 py-20 md:px-12 md:py-24" style={{ borderColor: T.border, background: T.panel }} aria-labelledby="ecosystem-v2-heading">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <RevealOnScroll variant="fade-right" delay={TIER.heading} className="lg:col-span-4">
            <div className="font-jbmono text-xs uppercase tracking-[.22em]" style={{ color: T.signal }}>Connected ecosystem</div>
            <h2 id="ecosystem-v2-heading" className="mt-5 text-4xl font-bold leading-[.94] tracking-[-.03em] sm:text-5xl">One banking architecture</h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed" style={{ color: T.muted }}>Explore how Tayseer’s capabilities connect around the core banking platform instead of operating as isolated products.</p>
            {/* The one thing a selection changes. It transitions rather than
                jump-cuts, so the panel visibly answers the node that was picked;
                everything around it holds still.

                The live region is the OUTER element and is never re-keyed. A
                live region that is removed and re-inserted alongside its own new
                content is generally not announced — the swap has to happen
                inside it, not to it. */}
            <div id="ecosystem-detail" className="mt-8 rounded-xl border p-5" style={{ borderColor: T.border, background: T.bg }} aria-live="polite">
              <StateSwap value={active}>
                <div className="flex items-center gap-2.5 font-jbmono text-xs tracking-wide" style={{ color: T.signal }}><ActivityIndicator />Selected layer</div>
                <div className="mt-3 text-xl font-semibold">{selected.label}</div>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: T.muted }}>{selected.copy}</p>
                <Link href={selected.to} className="group mt-5 inline-flex min-h-11 items-center gap-2 font-jbmono text-xs tracking-wide" style={{ color: T.signal }}>Explore capability <ArrowUpRight size={13} aria-hidden="true" className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" /></Link>
              </StateSwap>
            </div>
          </RevealOnScroll>

          <RevealOnScroll variant="scale" delay={TIER.visual} className="lg:col-span-8">
            <div className="mx-auto w-full max-w-[760px]">
              <div ref={stageRef} className={`relative w-full overflow-hidden rounded-[2rem] border ${STAGE_SIZE}`} style={{ borderColor: T.border, background: "radial-gradient(circle at center, rgba(13,90,140,.12), transparent 47%)" }}>
                <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  {NODES.filter(n => n.id !== "core").map((n) => <line key={n.id} x1="50" y1="50" x2={n.x} y2={n.y} stroke={n.id === active || active === "core" ? "#0F5CBF" : "currentColor"} strokeOpacity={n.id === active || active === "core" ? ".72" : ".13"} strokeWidth={n.id === active ? ".55" : ".25"} strokeDasharray={n.id === active ? "0" : "1.2 1.2"} />)}
                  <ellipse cx="50" cy="52" rx="34" ry="25" fill="none" stroke="currentColor" strokeOpacity=".08" strokeWidth=".3" />
                  <ellipse cx="50" cy="52" rx="43" ry="34" fill="none" stroke="currentColor" strokeOpacity=".05" strokeWidth=".3" />

                  {/* Exactly one connector carries data at a time: the selected one.
                      Keyed on the target so pointing at a new layer restarts the
                      trip from the core rather than continuing the old one. */}
                  {target && <FlowParticle key={target.id} from={CORE} to={target} radius={1.1} aspect={stageAspect} />}
                </svg>

                {NODES.map((node) => {
                  const Icon = node.icon;
                  const isCore = node.id === "core";
                  const isActive = node.id === active;
                  const isLive = engaged && target?.id === node.id;
                  return <button key={node.id} type="button" onMouseEnter={() => select(node.id)} onFocus={() => select(node.id)} onClick={() => select(node.id)} aria-pressed={isActive} aria-controls="ecosystem-detail" aria-label={`Show ${node.label}`} className={`eco-node absolute flex min-h-11 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1.5 rounded-2xl border px-3 py-2.5 text-center transition-[transform,background,border-color,box-shadow] duration-300 max-[567px]:px-2 ${NODE_WIDTH[isCore ? "core" : "outer"]}`} style={{ left: `${node.x}%`, top: `${node.y}%`, borderColor: isActive ? T.signal : T.border, background: isActive ? T.bg : T.panel, color: isActive ? T.signal : T.text, boxShadow: isActive ? "0 16px 44px rgba(13,90,140,.14)" : "none" }}>
                    <Icon size={node.id === "core" ? 22 : 18} aria-hidden="true" />
                    <span className="text-xs font-medium leading-tight">{node.label}</span>
                    {/* The receiving node is the only one wearing green, and only
                        once the visitor has actually picked a layer. */}
                    {isLive && <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full" style={{ background: activityGreen, boxShadow: `0 0 0 3px ${activityAlpha(0.2)}` }} aria-hidden="true" />}
                  </button>;
                })}
              </div>

              {/* The prompt has to name a gesture every visitor actually has.
                  Hover is not one of them on a phone, and the nodes have always
                  responded to tap and to keyboard focus as well.

                  It sits under the frame rather than overlaid inside its bottom
                  edge, where the Managed Services node also ends up. As an
                  overlay it was unreadable on a phone and it clipped the node's
                  bottom border on any stage under ~654px — a 1024px laptop
                  included, since the stage is 8 of 12 columns there. */}
              <div className="pointer-events-none mt-4 text-center font-jbmono text-xs tracking-wide" style={{ color: T.muted }}>Select any layer</div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
