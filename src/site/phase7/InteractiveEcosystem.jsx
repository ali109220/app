"use client";

import { useState } from "react";
import Link from "next/link";
import { BrainCircuit, Landmark, Smartphone, ServerCog, Wrench, Layers3, ArrowUpRight } from "lucide-react";
import { T } from "@/site/theme";
import { ActivityIndicator, FlowParticle, RevealOnScroll, TIER, activityAlpha, activityGreen } from "@/site/motion";

const CORE = { x: 50, y: 50 };

// The stage SVG is 100x100 with preserveAspectRatio="none" inside a 1.25:1 box,
// so x is scaled 1.25x relative to y. Pass this to FlowParticle so the data dot
// stays round instead of being stretched into an oval.
const STAGE_ASPECT = 1.25;

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
            <div className="mt-8 rounded-xl border p-5" style={{ borderColor: T.border, background: T.bg }} aria-live="polite">
              <div className="flex items-center gap-2.5 font-jbmono text-xs tracking-wide" style={{ color: T.signal }}><ActivityIndicator />Selected layer</div>
              <div className="mt-3 text-xl font-semibold">{selected.label}</div>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: T.muted }}>{selected.copy}</p>
              <Link href={selected.to} className="group mt-5 inline-flex min-h-11 items-center gap-2 font-jbmono text-xs tracking-wide" style={{ color: T.signal }}>Explore capability <ArrowUpRight size={13} aria-hidden="true" className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" /></Link>
            </div>
          </RevealOnScroll>

          <RevealOnScroll variant="scale" delay={TIER.visual} className="lg:col-span-8">
            <div className="relative mx-auto aspect-[1.25/1] w-full max-w-[760px] overflow-hidden rounded-[2rem] border" style={{ borderColor: T.border, background: "radial-gradient(circle at center, rgba(13,90,140,.12), transparent 47%)" }}>
              <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                {NODES.filter(n => n.id !== "core").map((n) => <line key={n.id} x1="50" y1="50" x2={n.x} y2={n.y} stroke={n.id === active || active === "core" ? "#0F5CBF" : "currentColor"} strokeOpacity={n.id === active || active === "core" ? ".72" : ".13"} strokeWidth={n.id === active ? ".55" : ".25"} strokeDasharray={n.id === active ? "0" : "1.2 1.2"} />)}
                <ellipse cx="50" cy="52" rx="34" ry="25" fill="none" stroke="currentColor" strokeOpacity=".08" strokeWidth=".3" />
                <ellipse cx="50" cy="52" rx="43" ry="34" fill="none" stroke="currentColor" strokeOpacity=".05" strokeWidth=".3" />

                {/* Exactly one connector carries data at a time: the selected one.
                    Keyed on the target so pointing at a new layer restarts the
                    trip from the core rather than continuing the old one. */}
                {target && <FlowParticle key={target.id} from={CORE} to={target} radius={1.1} aspect={STAGE_ASPECT} />}
              </svg>

              {NODES.map((node) => {
                const Icon = node.icon;
                const isActive = node.id === active;
                const isLive = target?.id === node.id;
                return <button key={node.id} type="button" onMouseEnter={() => setActive(node.id)} onFocus={() => setActive(node.id)} onClick={() => setActive(node.id)} aria-pressed={isActive} aria-label={`Show ${node.label}`} className="eco-node absolute flex min-h-11 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1.5 rounded-2xl border px-3 py-2.5 text-center transition-[transform,background,border-color,box-shadow] duration-300" style={{ left: `${node.x}%`, top: `${node.y}%`, borderColor: isActive ? T.signal : T.border, background: isActive ? T.bg : T.panel, color: isActive ? T.signal : T.text, minWidth: node.id === "core" ? "124px" : "104px", boxShadow: isActive ? "0 16px 44px rgba(13,90,140,.14)" : "none" }}>
                  <Icon size={node.id === "core" ? 22 : 18} aria-hidden="true" />
                  <span className="text-xs font-medium leading-tight">{node.label}</span>
                  {/* The receiving node is the only one wearing green. */}
                  {isLive && <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full" style={{ background: activityGreen, boxShadow: `0 0 0 3px ${activityAlpha(0.2)}` }} aria-hidden="true" />}
                </button>;
              })}

              <div className="pointer-events-none absolute inset-x-0 bottom-3 text-center font-jbmono text-xs tracking-wide" style={{ color: T.muted }}>Hover or focus a layer</div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
