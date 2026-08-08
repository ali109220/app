"use client";

import { useState } from "react";
import Link from "next/link";
import { BrainCircuit, Landmark, Smartphone, ServerCog, Wrench, Layers3, ArrowUpRight } from "lucide-react";
import { T } from "@/site/theme";

const NODES = [
  { id: "core", label: "Core Banking", copy: "Foundation for transactions, integration and banking operations.", icon: Landmark, to: "/solutions/core-banking", x: 50, y: 50 },
  { id: "digital", label: "Digital Channels", copy: "Connected mobile and customer-facing banking experiences.", icon: Smartphone, to: "/solutions/mbuke", x: 18, y: 25 },
  { id: "ai", label: "Fahim AI", copy: "Decision support, intelligence and automation across workflows.", icon: BrainCircuit, to: "/solutions/fahim-ai", x: 82, y: 23 },
  { id: "systems", label: "Business Systems", copy: "Operational software shaped around enterprise workflows.", icon: Layers3, to: "/solutions/software-management-systems", x: 18, y: 76 },
  { id: "infra", label: "Banking Systems", copy: "Infrastructure and system integration across the technology estate.", icon: ServerCog, to: "/solutions/banking-systems", x: 82, y: 76 },
  { id: "managed", label: "Managed Services", copy: "Expertise and operating support around critical technology.", icon: Wrench, to: "/solutions/managed-services", x: 50, y: 89 },
];

export default function InteractiveEcosystem() {
  const [active, setActive] = useState("core");
  const selected = NODES.find((node) => node.id === active) || NODES[0];

  return (
    <section className="relative border-b px-6 py-24 md:px-12" style={{ borderColor: T.border, background: T.panel }} aria-labelledby="ecosystem-v2-heading">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-4">
            <div className="font-jbmono text-[11px] uppercase tracking-[.26em]" style={{ color: T.signal }}>Connected ecosystem</div>
            <h2 id="ecosystem-v2-heading" className="mt-5 text-4xl font-bold uppercase leading-[.94] tracking-[-.03em] sm:text-5xl">One banking architecture</h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed" style={{ color: T.muted }}>Explore how Tayseer’s capabilities connect around the banking core instead of operating as isolated products.</p>
            <div className="mt-8 rounded-xl border p-5" style={{ borderColor: T.border, background: T.bg }} aria-live="polite">
              <div className="font-jbmono text-[10px] uppercase tracking-[.2em]" style={{ color: T.green }}>Selected layer</div>
              <div className="mt-3 text-xl font-semibold">{selected.label}</div>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: T.muted }}>{selected.copy}</p>
              <Link href={selected.to} className="mt-5 inline-flex min-h-11 items-center gap-2 font-jbmono text-[10px] uppercase tracking-widest" style={{ color: T.signal }}>Explore capability <ArrowUpRight size={13} aria-hidden="true" /></Link>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="relative mx-auto aspect-[1.25/1] w-full max-w-[760px] overflow-hidden rounded-[2rem] border" style={{ borderColor: T.border, background: "radial-gradient(circle at center, rgba(13,90,140,.12), transparent 47%)" }}>
              <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                {NODES.filter(n => n.id !== "core").map((n) => <line key={n.id} x1="50" y1="50" x2={n.x} y2={n.y} stroke={n.id === active || active === "core" ? "#0D5A8C" : "currentColor"} strokeOpacity={n.id === active || active === "core" ? ".72" : ".13"} strokeWidth={n.id === active ? ".55" : ".25"} strokeDasharray={n.id === active ? "0" : "1.2 1.2"} />)}
                <ellipse cx="50" cy="52" rx="34" ry="25" fill="none" stroke="currentColor" strokeOpacity=".08" strokeWidth=".3" />
                <ellipse cx="50" cy="52" rx="43" ry="34" fill="none" stroke="currentColor" strokeOpacity=".05" strokeWidth=".3" />
              </svg>

              {NODES.map((node) => {
                const Icon = node.icon;
                const isActive = node.id === active;
                return <button key={node.id} type="button" onMouseEnter={() => setActive(node.id)} onFocus={() => setActive(node.id)} onClick={() => setActive(node.id)} aria-pressed={isActive} aria-label={`Show ${node.label}`} className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 rounded-2xl border px-3 py-3 text-center transition-[transform,background,border-color] duration-300 hover:scale-105 focus-visible:scale-105" style={{ left: `${node.x}%`, top: `${node.y}%`, borderColor: isActive ? T.signal : T.border, background: isActive ? T.bg : T.panel, color: isActive ? T.signal : T.text, minWidth: node.id === "core" ? "124px" : "104px", boxShadow: isActive ? "0 16px 44px rgba(13,90,140,.14)" : "none" }}>
                  <Icon size={node.id === "core" ? 22 : 18} aria-hidden="true" />
                  <span className="text-[10px] font-medium leading-tight sm:text-xs">{node.label}</span>
                </button>;
              })}

              <div className="pointer-events-none absolute inset-x-0 bottom-4 text-center font-jbmono text-[9px] uppercase tracking-[.24em]" style={{ color: T.faint }}>Hover or focus a layer</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
