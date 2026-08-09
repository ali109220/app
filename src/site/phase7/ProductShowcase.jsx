"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Landmark, Smartphone, BrainCircuit, Wrench } from "lucide-react";
import { T } from "@/site/theme";

const PRODUCTS = [
  { id: "core", name: "Core Banking", eyebrow: "Modern foundation", title: "Run the bank on a core built for change.", copy: "A flexible core banking foundation for transactions, integrations and continuous modernization.", to: "/solutions/core-banking", icon: Landmark },
  { id: "digital", name: "MBuke", eyebrow: "Digital banking", title: "Deliver connected journeys across every touchpoint.", copy: "A white-label mobile banking experience designed for faster digital evolution.", to: "/solutions/mbuke", icon: Smartphone },
  { id: "ai", name: "Fahim AI", eyebrow: "Banking intelligence", title: "Bring practical intelligence into daily decisions.", copy: "Use signals, insights and automation to support faster, more relevant banking workflows.", to: "/solutions/fahim-ai", icon: BrainCircuit },
  { id: "managed", name: "Managed Services", eyebrow: "Operate & evolve", title: "Extend capability without adding complexity.", copy: "Specialized delivery and operational expertise around business-critical platforms.", to: "/solutions/managed-services", icon: Wrench },
];

function MockWindow({ active }) {
  const isAI = active === "ai";
  const isDigital = active === "digital";
  const isManaged = active === "managed";
  return <div className="overflow-hidden rounded-2xl border" style={{ borderColor: T.border, background: T.panel }}>
    <div className="flex items-center justify-between border-b px-4 py-3" style={{ borderColor: T.border }}><div className="flex gap-1.5"><span className="h-2.5 w-2.5 rounded-full" style={{ background: T.border }} /><span className="h-2.5 w-2.5 rounded-full" style={{ background: T.border }} /><span className="h-2.5 w-2.5 rounded-full" style={{ background: T.border }} /></div><span className="font-jbmono text-xs tracking-wide" style={{ color: T.muted }}>{active} workspace</span></div>
    <div className="grid min-h-[430px] md:grid-cols-[180px_1fr]">
      <aside className="hidden border-r p-4 md:block" style={{ borderColor: T.border }}><div className="mb-6 h-8 rounded-lg" style={{ background: "rgba(13,90,140,.12)" }} />{['Overview','Customers','Accounts','Transactions','Analytics','Operations'].map((x,i)=><div key={x} className="mb-2 rounded-lg px-3 py-2 text-xs" style={{ background: i===0 ? T.bg : 'transparent', color: i===0 ? T.signal : T.muted }}>{x}</div>)}</aside>
      <div className="p-5 sm:p-6">
        <div className="grid gap-3 sm:grid-cols-3">{[['Portfolio','$2.45B'],['Activity','128.4K'],['Availability','99.9%']].map(([l,v],i)=><div key={l} className="rounded-xl border p-4" style={{ borderColor: T.border, background: T.bg }}><div className="text-xs tracking-wide" style={{ color: T.muted }}>{l}</div><div className="mt-3 text-xl font-semibold">{isAI && i===0 ? 'AI-ready' : isDigital && i===1 ? 'Omnichannel' : isManaged && i===2 ? 'Always-on' : v}</div></div>)}</div>
        <div className="mt-4 grid gap-4 lg:grid-cols-[1.4fr_.8fr]">
          <div className="rounded-xl border p-5" style={{ borderColor: T.border, background: T.bg }}><div className="text-xs font-medium">{isAI ? 'Decision intelligence' : isDigital ? 'Digital engagement' : isManaged ? 'Service health' : 'Transaction flow'}</div><svg viewBox="0 0 520 210" className="mt-5 w-full" role="img" aria-label="Illustrative product analytics"><path d="M0 168 C64 146 88 122 130 134 C178 149 205 87 254 99 C305 112 344 72 391 84 C441 96 469 45 520 55" fill="none" stroke="#0D5A8C" strokeWidth="5" strokeLinecap="round"/><path d="M0 168 C64 146 88 122 130 134 C178 149 205 87 254 99 C305 112 344 72 391 84 C441 96 469 45 520 55 L520 210 L0 210Z" fill="rgba(13,90,140,.08)"/>{[50,105,160].map(y=><line key={y} x1="0" y1={y} x2="520" y2={y} stroke="currentColor" opacity=".06" />)}</svg></div>
          <div className="space-y-3">{['Real-time visibility','Connected workflows','Role-based control','Scalable operations'].map((x,i)=><div key={x} className="rounded-xl border p-4" style={{ borderColor: T.border, background: T.bg }}><div className="flex items-center gap-3"><span className="flex h-7 w-7 items-center justify-center rounded-full text-xs" style={{ background: "rgba(13,90,140,.12)", color: T.signal }}>0{i+1}</span><span className="text-xs">{x}</span></div></div>)}</div>
        </div>
      </div>
    </div>
  </div>;
}

export default function ProductShowcase() {
  const [active, setActive] = useState(PRODUCTS[0].id);
  const product = PRODUCTS.find(p => p.id === active) || PRODUCTS[0];
  const Icon = product.icon;
  return <section className="relative border-b px-6 py-20 md:px-12 md:py-24" style={{ borderColor: T.border }} aria-labelledby="product-showcase-heading">
    <div className="mx-auto max-w-[1400px]">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end"><div className="lg:col-span-7"><div className="font-jbmono text-xs uppercase tracking-[.22em]" style={{ color: T.signal }}>Product experience</div><h2 id="product-showcase-heading" className="mt-5 text-4xl font-bold leading-[.94] tracking-[-.03em] sm:text-5xl">See the platform, not just the promise</h2></div><p className="max-w-xl text-base leading-relaxed lg:col-span-5" style={{ color: T.muted }}>Explore representative product experiences that show how Tayseer’s capabilities come together in practice. These are design previews, not claims of a specific client deployment.</p></div>
      <div className="mt-12 flex flex-wrap gap-2" role="tablist" aria-label="Product showcase">{PRODUCTS.map(p => <button key={p.id} type="button" role="tab" aria-selected={active===p.id} onClick={()=>setActive(p.id)} className="min-h-11 rounded-full border px-4 py-2 text-xs font-medium transition-colors" style={{ borderColor: active===p.id ? T.signal : T.border, color: active===p.id ? T.signal : T.muted, background: active===p.id ? T.panel : 'transparent' }}>{p.name}</button>)}</div>
      <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-center"><div className="lg:col-span-4"><div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: "rgba(13,90,140,.1)", color: T.signal }}><Icon size={21} aria-hidden="true" /></div><div className="mt-7 font-jbmono text-xs tracking-wide" style={{ color: T.signal }}>{product.eyebrow}</div><h3 className="mt-3 text-3xl font-semibold leading-tight tracking-[-.03em] sm:text-4xl">{product.title}</h3><p className="mt-5 text-sm leading-relaxed" style={{ color: T.muted }}>{product.copy}</p><Link href={product.to} className="mt-7 inline-flex min-h-11 items-center gap-2 font-jbmono text-xs tracking-wide" style={{ color: T.signal }}>Explore {product.name} <ArrowUpRight size={13} aria-hidden="true" /></Link></div><div className="lg:col-span-8"><MockWindow active={active} /></div></div>
    </div>
  </section>;
}
