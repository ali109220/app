import Link from "next/link";
import { ArrowRight, Layers3, BrainCircuit, ShieldCheck } from "lucide-react";
import { Reveal } from "@/site/motion";
import { T } from "@/site/theme";

const STEPS = [
  { no: "01", title: "Modernize the foundation", copy: "Move beyond rigid legacy constraints with a banking core and integration layer designed for change.", icon: Layers3, link: "/solutions/core-banking" },
  { no: "02", title: "Connect intelligence", copy: "Turn operational and customer signals into decision support, automation and more relevant experiences.", icon: BrainCircuit, link: "/solutions/fahim-ai" },
  { no: "03", title: "Operate with confidence", copy: "Bring delivery, managed expertise and banking-critical resilience together around long-term continuity.", icon: ShieldCheck, link: "/solutions/managed-services" },
];

export default function TransformationStory() {
  return (
    <section className="relative border-b px-6 py-24 md:px-12" style={{ borderColor: T.border }} aria-labelledby="transformation-story-heading">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="font-jbmono text-[11px] uppercase tracking-[.26em]" style={{ color: T.signal }}>The transformation journey</div>
          <div className="mt-5 grid gap-8 lg:grid-cols-12 lg:items-end">
            <h2 id="transformation-story-heading" className="text-4xl font-bold uppercase leading-[.94] tracking-[-.03em] sm:text-5xl lg:col-span-7">From legacy pressure to connected banking</h2>
            <p className="max-w-xl text-base leading-relaxed lg:col-span-5" style={{ color: T.muted }}>Modern banking change is not one project. It is a sequence of coordinated decisions across core systems, digital experiences, intelligence and operations.</p>
          </div>
        </Reveal>

        <div className="relative mt-16 grid gap-6 lg:grid-cols-3">
          <div className="pointer-events-none absolute left-[16.5%] right-[16.5%] top-12 hidden h-px lg:block" style={{ background: T.border }} />
          {STEPS.map((step, index) => (
            <Reveal key={step.no} delay={index * .08}>
              <article className="group relative h-full rounded-2xl border p-7 sm:p-8" style={{ borderColor: T.border, background: index === 1 ? T.panel : T.bg }}>
                <div className="relative z-10 flex items-center justify-between gap-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border" style={{ borderColor: T.border, background: T.bg, color: T.signal }}><step.icon size={20} aria-hidden="true" /></div>
                  <span className="font-jbmono text-[10px] uppercase tracking-[.2em]" style={{ color: T.faint }}>{step.no}</span>
                </div>
                <h3 className="mt-9 text-2xl font-semibold tracking-[-.02em]">{step.title}</h3>
                <p className="mt-4 text-sm leading-relaxed" style={{ color: T.muted }}>{step.copy}</p>
                <Link href={step.link} className="mt-8 inline-flex min-h-11 items-center gap-2 font-jbmono text-[10px] uppercase tracking-widest" style={{ color: T.signal }}>Explore <ArrowRight size={13} aria-hidden="true" className="transition-transform group-hover:translate-x-1" /></Link>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={.12} className="mt-8">
          <div className="grid overflow-hidden rounded-2xl border md:grid-cols-3" style={{ borderColor: T.border }}>
            {[['Legacy pressure','Disconnected systems · rising expectations'],['Connected change','Core · channels · intelligence · operations'],['Business outcome','More adaptable banking experiences']].map(([label,value],i) => <div key={label} className="p-6 md:p-7" style={{ background: i === 1 ? T.panel : T.bg, borderLeft: i ? `1px solid ${T.border}` : undefined }}><div className="font-jbmono text-[10px] uppercase tracking-[.2em]" style={{ color: i === 1 ? T.signal : T.faint }}>{label}</div><div className="mt-3 text-sm font-medium leading-relaxed">{value}</div></div>)}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
