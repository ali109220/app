import Link from "next/link";
import { ArrowRight, CalendarDays, Mail } from "lucide-react";
import { Reveal } from "@/site/motion";
import { T } from "@/site/theme";
import HomeContactForm from "@/site/HomeContactForm";
import { ContactAccentArt } from "@/site/DecorativeArt";

export default function FinalEnterpriseCTA() {
  return (
    <section className="relative overflow-hidden border-t px-6 py-24 md:px-12" style={{ borderColor: T.border, background: T.panel }} aria-labelledby="final-cta-heading">
      <ContactAccentArt className="pointer-events-none absolute -right-12 top-0 hidden h-72 w-72 opacity-60 lg:block" />
      <div className="mx-auto max-w-[1400px]">
        <Reveal><div className="rounded-2xl border px-6 py-10 sm:px-10 sm:py-12 lg:px-14" style={{ borderColor: T.border, background: T.bg }}><div className="grid gap-10 lg:grid-cols-12 lg:items-end"><div className="lg:col-span-8"><div className="font-jbmono text-[11px] uppercase tracking-[0.26em]" style={{ color: T.green }}>Start the conversation</div><h2 id="final-cta-heading" className="mt-5 max-w-4xl text-4xl font-bold uppercase leading-[0.94] tracking-[-0.03em] sm:text-5xl lg:text-6xl">Build What’s Next</h2><p className="mt-6 max-w-xl text-base leading-relaxed" style={{ color: T.muted }}>Talk with Tayseer about modernization, AI, digital channels or your technology operating model.</p></div><div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col"><Link href="/connect" className="inline-flex min-h-12 items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold uppercase tracking-wider" style={{ background: T.signal, color: T.bg }}><CalendarDays aria-hidden="true" size={16} /> Schedule Consultation</Link><a href="mailto:info@tayseer.me" className="inline-flex min-h-12 items-center justify-center gap-2 border px-6 py-3.5 text-sm font-semibold uppercase tracking-wider" style={{ borderColor: T.border, color: T.text }}><Mail aria-hidden="true" size={16} /> Email Our Team</a></div></div></div></Reveal>
        <div className="mt-16 grid gap-12 lg:grid-cols-12"><Reveal className="lg:col-span-5"><div className="font-jbmono text-[11px] uppercase tracking-[0.25em]" style={{ color: T.signal }}>Direct enquiry</div><h3 className="mt-4 text-3xl font-semibold tracking-[-0.02em]">Tell Us Your Challenge</h3><p className="mt-4 max-w-md text-sm leading-relaxed" style={{ color: T.muted }}>Share the initiative or capability you want to explore. Our team will follow up.</p><div className="mt-7 space-y-2 font-jbmono text-xs" style={{ color: T.faint }}><div>Saudi Arabia · Riyadh</div><div>UAE · Dubai</div><a href="mailto:info@tayseer.me" className="inline-flex min-h-11 items-center gap-2" style={{ color: T.signal }}>info@tayseer.me <ArrowRight aria-hidden="true" size={13} /></a></div></Reveal><Reveal delay={0.08} className="lg:col-span-7"><HomeContactForm /></Reveal></div>
      </div>
    </section>
  );
}
