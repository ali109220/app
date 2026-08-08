import Link from "next/link";
import { ArrowRight, BrainCircuit, Landmark, Layers3, ServerCog, Smartphone, Wrench } from "lucide-react";
import { Reveal } from "@/site/motion";
import { T } from "@/site/theme";

const LAYERS = [
  { title: "Channels", items: ["Mobile Banking", "Digital Journeys"], icon: Smartphone, to: "/solutions/mbuke" },
  { title: "Intelligence", items: ["AI Insights", "Automation"], icon: BrainCircuit, to: "/solutions/fahim-ai" },
  { title: "Core", items: ["Core Banking", "Integration"], icon: Landmark, to: "/solutions/core-banking" },
  { title: "Operations", items: ["Workflow Systems", "Management Tools"], icon: Layers3, to: "/solutions/software-management-systems" },
  { title: "Infrastructure", items: ["Banking Systems", "Platform Integration"], icon: ServerCog, to: "/solutions/banking-systems" },
  { title: "Managed Services", items: ["Support", "Continuous Improvement"], icon: Wrench, to: "/solutions/managed-services" },
];

export default function BankingEcosystem() {
  return (
    <section className="relative border-t px-6 py-24 md:px-12" style={{ borderColor: T.border, background: T.panel }} aria-labelledby="ecosystem-heading">
      <div className="mx-auto max-w-[1400px]">
        <Reveal><div className="font-jbmono text-[11px] uppercase tracking-[0.26em]" style={{ color: T.signal }}>Connected platform</div><div className="mt-5 grid gap-7 lg:grid-cols-12 lg:items-end"><h2 id="ecosystem-heading" className="text-4xl font-bold uppercase leading-[0.96] tracking-[-0.025em] sm:text-5xl lg:col-span-7">Banking Ecosystem</h2><p className="max-w-xl text-base leading-relaxed lg:col-span-5" style={{ color: T.muted }}>Channels, AI, core platforms, systems and managed expertise connected as one transformation stack.</p></div></Reveal>
        <div className="relative mt-12"><div className="pointer-events-none absolute left-6 right-6 top-1/2 hidden h-px lg:block" style={{ background: T.border }} /><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{LAYERS.map((layer, index) => <Reveal key={layer.title} delay={index * 0.04}><Link href={layer.to} className="group relative flex h-full min-h-[220px] flex-col rounded-xl border p-6" style={{ borderColor: T.border, background: T.bg }}><div className="flex items-start justify-between gap-4"><div className="flex h-11 w-11 items-center justify-center rounded-md" style={{ color: T.signal, background: "rgba(13,90,140,.10)" }}><layer.icon aria-hidden="true" size={20} /></div><span className="font-jbmono text-[10px] tracking-[0.2em]" style={{ color: T.faint }}>L{index + 1}</span></div><h3 className="mt-7 text-xl font-semibold">{layer.title}</h3><ul className="mt-4 space-y-2 text-sm" style={{ color: T.muted }}>{layer.items.map((item) => <li key={item}>— {item}</li>)}</ul><div className="mt-auto flex justify-end pt-6"><ArrowRight aria-hidden="true" size={16} className="transition-transform group-hover:translate-x-1" style={{ color: T.signal }} /></div></Link></Reveal>)}</div></div>
      </div>
    </section>
  );
}
