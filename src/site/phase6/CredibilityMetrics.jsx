import { BadgeCheck, Eye, ShieldCheck, Users } from "lucide-react";
import { Reveal } from "@/site/motion";
import { CountUp } from "@/site/ui";
import { T } from "@/site/theme";
import { ScaleVisual } from "./VisualMedia";

const STATS = [
  { n: 100, suffix: "+", label: "Satisfied Clients" },
  { n: 15, suffix: "+", label: "Countries" },
  { n: 600, suffix: "+", label: "Finished Products" },
  { n: 100, suffix: "+", label: "Skilled Experts" },
];
const PRINCIPLES = [
  { title: "One Project, One Team", copy: "Focused ownership around each engagement.", icon: Users },
  { title: "Transparent Collaboration", copy: "Direct communication and visible progress.", icon: Eye },
  { title: "Consistent Quality", copy: "Business-ready execution for each institution.", icon: BadgeCheck },
  { title: "Banking-Critical Mindset", copy: "Reliability, trust and operational continuity.", icon: ShieldCheck },
];

export default function CredibilityMetrics() {
  return (
    <section className="relative overflow-hidden border-t px-6 py-24 md:px-12" style={{ borderColor: T.border }} aria-labelledby="credibility-heading">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-5"><div className="font-jbmono text-[11px] uppercase tracking-[0.26em]" style={{ color: T.signal }}>Proof at scale</div><h2 id="credibility-heading" className="mt-5 text-4xl font-bold uppercase leading-[0.96] tracking-[-0.025em] sm:text-5xl">Tayseer By Numbers</h2><p className="mt-5 max-w-lg text-base leading-relaxed" style={{ color: T.muted }}>A visual summary of the company figures already published across the Tayseer website.</p></Reveal>
          <Reveal delay={0.06} className="lg:col-span-7"><ScaleVisual /></Reveal>
        </div>
        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border sm:grid-cols-2 lg:grid-cols-4" style={{ borderColor: T.border, background: T.border }}>{STATS.map((stat, index) => <Reveal key={stat.label} delay={index * 0.04}><div className="h-full p-7" style={{ background: T.panel }}><div className="text-5xl font-extrabold tracking-tight" style={{ color: T.signal }}><CountUp to={stat.n} suffix={stat.suffix} /></div><div className="mt-3 font-jbmono text-[11px] uppercase tracking-[0.18em]">{stat.label}</div></div></Reveal>)}</div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{PRINCIPLES.map((item, index) => <Reveal key={item.title} delay={index * 0.04}><div className="h-full border-t pt-5" style={{ borderColor: "rgba(13,90,140,.35)" }}><item.icon aria-hidden="true" size={20} style={{ color: T.signal }} /><h3 className="mt-5 text-lg font-semibold">{item.title}</h3><p className="mt-2 text-sm" style={{ color: T.muted }}>{item.copy}</p></div></Reveal>)}</div>
      </div>
    </section>
  );
}
