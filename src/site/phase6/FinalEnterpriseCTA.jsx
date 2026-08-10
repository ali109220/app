import Link from "next/link";
import { ArrowRight, CalendarDays, Mail } from "lucide-react";
import { T } from "@/site/theme";
import HomeContactForm from "@/site/HomeContactForm";
import { ContactAccentArt } from "@/site/DecorativeArt";
import { RevealOnScroll, TIER } from "@/site/motion";

export default function FinalEnterpriseCTA() {
  return (
    <section className="relative overflow-hidden border-t px-6 py-20 md:px-12 md:py-24" style={{ borderColor: T.border, background: T.panel }} aria-labelledby="final-cta-heading">
      <ContactAccentArt className="pointer-events-none absolute -right-12 top-0 hidden h-72 w-72 opacity-60 lg:block" />
      <div className="mx-auto max-w-[1400px]">
        <RevealOnScroll delay={TIER.heading} className="rounded-2xl border px-6 py-10 sm:px-10 sm:py-12 lg:px-14" style={{ borderColor: T.border, background: T.bg }}><div className="grid gap-10 lg:grid-cols-12 lg:items-end"><div className="lg:col-span-8"><div className="font-jbmono text-xs tracking-wide" style={{ color: T.signal }}>Start the conversation</div><h2 id="final-cta-heading" className="mt-5 max-w-4xl text-4xl font-bold leading-[0.94] tracking-[-0.03em] sm:text-5xl lg:text-6xl">Build what’s next</h2><p className="mt-6 max-w-xl text-base leading-relaxed" style={{ color: T.muted }}>Talk with Tayseer about modernization, AI, digital channels or your technology operating model.</p></div><div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col"><Link href="/connect" className="cta-primary inline-flex min-h-12 items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold tracking-wide" style={{ background: T.signal, color: T.bg }}><CalendarDays aria-hidden="true" size={16} /> Schedule consultation</Link><a href="mailto:info@tayseerdemo.xyz" className="cta-secondary inline-flex min-h-12 items-center justify-center gap-2 border px-6 py-3.5 text-sm font-semibold tracking-wide" style={{ borderColor: T.border, color: T.text }}><Mail aria-hidden="true" size={16} /> Email our team</a></div></div></RevealOnScroll>
        <div className="mt-16 grid gap-12 lg:grid-cols-12"><RevealOnScroll variant="fade-right" delay={TIER.body} className="lg:col-span-5"><div className="font-jbmono text-xs tracking-wide" style={{ color: T.signal }}>Direct enquiry</div><h3 className="mt-4 text-3xl font-semibold tracking-[-0.02em]">Tell us your challenge</h3><p className="mt-4 max-w-md text-sm leading-relaxed" style={{ color: T.muted }}>Share the initiative or capability you want to explore. Our team will follow up.</p><div className="mt-7 space-y-2 font-jbmono text-xs" style={{ color: T.muted }}><div>Saudi Arabia · Riyadh</div><div>UAE · Dubai</div><a href="mailto:info@tayseerdemo.xyz" className="cta-secondary inline-flex min-h-11 items-center gap-2" style={{ color: T.signal }}>info@tayseerdemo.xyz <ArrowRight aria-hidden="true" size={13} className="motion-card-arrow" /></a></div></RevealOnScroll>{/* Form intentionally un-gated — see the note in ContactSection. This is the
            one homepage change in Phase 2, and it is a rule fix, not a story change:
            a form behind a reveal is not immediately usable. */}
        <div className="lg:col-span-7"><HomeContactForm /></div></div>
      </div>
    </section>
  );
}
