import { Quote, ArrowRight, BadgeCheck } from "lucide-react";
import Link from "next/link";
import { T } from "@/site/theme";

const STORIES = [
  { initials: "SA", name: "Saber Alkahtani", role: "Head of Individual Services Sector", theme: "Growth & innovation", quote: "Tayseer Innovations has been a key partner in driving growth and innovation within our individual banking services." },
  { initials: "AA", name: "Abdulla Alttowi", role: "Manager – R&D", theme: "Future readiness", quote: "Their innovative FinTech solutions provide a robust foundation for continuous improvement and adaptation." },
  { initials: "BA", name: "Bassma Alzailay", role: "Development & Systems Analyst Manager", theme: "Complex delivery", quote: "The team understood our complex requirements and developed a software solution that meets our needs." },
  { initials: "AA", name: "Amd Ali", role: "IT Sector Manager", theme: "Ongoing partnership", quote: "Their dedicated support team has been pivotal in smooth implementation and as a partner in our ongoing success." },
];

export default function ClientSuccessStories() {
  return <section className="relative border-b px-6 py-20 md:px-12 md:py-24" style={{ borderColor: T.border, background: T.panel }} aria-labelledby="client-success-heading">
    <div className="mx-auto max-w-[1400px]">
      <div className="font-jbmono text-xs uppercase tracking-[.22em]" style={{ color: T.signal }}>Client perspective</div>
      <div className="mt-5 grid gap-8 lg:grid-cols-12 lg:items-end"><h2 id="client-success-heading" className="text-4xl font-bold leading-[.94] tracking-[-.03em] sm:text-5xl lg:col-span-7">Partnership, seen through our clients</h2><p className="max-w-xl text-base leading-relaxed lg:col-span-5" style={{ color: T.muted }}>Published client feedback consistently points to the same themes: collaboration, adaptability, delivery capability and long-term support.</p></div>

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {STORIES.map((story) => <article key={`${story.name}-${story.theme}`} className="group flex h-full min-h-[320px] flex-col overflow-hidden rounded-2xl border" style={{ borderColor: T.border, background: T.bg }}>
          <div className="flex items-center justify-between border-b px-6 py-5" style={{ borderColor: T.border }}><div className="flex items-center gap-4"><div className="flex h-12 w-12 items-center justify-center rounded-xl font-jbmono text-xs font-semibold" style={{ background: "rgba(13,90,140,.12)", color: T.signal }}>{story.initials}</div><div><div className="font-semibold">{story.name}</div><div className="mt-1 text-xs" style={{ color: T.muted }}>{story.role}</div></div></div><BadgeCheck size={19} aria-hidden="true" style={{ color: T.signal }} /></div>
          <div className="flex flex-1 flex-col p-6 sm:p-7"><div className="font-jbmono text-xs tracking-wide" style={{ color: T.signal }}>{story.theme}</div><Quote size={22} aria-hidden="true" className="mt-7" style={{ color: T.signal }} /><blockquote className="mt-4 text-xl leading-relaxed sm:text-2xl">“{story.quote}”</blockquote><div className="mt-auto pt-7 text-xs leading-relaxed" style={{ color: T.muted }}>Excerpted from feedback already published by Tayseer. “FinTech” means financial technology. No additional outcome claims have been added.</div></div>
        </article>)}
      </div>

      <div className="mt-8 flex flex-col justify-between gap-5 rounded-2xl border p-6 sm:flex-row sm:items-center" style={{ borderColor: T.border, background: T.bg }}><div><div className="font-jbmono text-xs tracking-wide" style={{ color: T.signal }}>Explore the company</div><div className="mt-2 text-lg font-semibold">See how Tayseer approaches delivery and long-term partnership.</div></div><Link href="/about" className="inline-flex min-h-11 shrink-0 items-center gap-2 font-jbmono text-xs tracking-wide" style={{ color: T.signal }}>About Tayseer <ArrowRight size={13} aria-hidden="true" /></Link></div>
    </div>
  </section>;
}
