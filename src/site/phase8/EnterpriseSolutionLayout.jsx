/**
 * NOTE: this file must stay a SERVER module — no "use client".
 *
 * All six callers (the /solutions/* pages) are server components and they pass
 * lucide icon *components* through `capabilities[].icon`.
 * Functions cannot cross the server→client boundary, so marking this file
 * "use client" makes every one of those pages throw at render time.
 *
 * Client-only behaviour therefore lives in the imported client components
 * (RevealOnScroll, ArchitectureFlowStages), which is fine: a server component
 * may render a client component freely.
 */

import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { RevealOnScroll, STAGGER, TIER } from "@/site/motion";
import ArchitectureFlowStages from "@/site/phase8/ArchitectureFlowStages";
import { ContactSection } from "@/site/ContactSection";
import { CountUp } from "@/site/ui";
import { T } from "@/site/theme";

/**
 * Shared layout behind all six /solutions/* pages.
 *
 * Motion here is Level 1 + Level 2 only. These pages deliberately do NOT get a
 * signature hero animation — the technology illustration that wakes up node by
 * node belongs to Home, and repeating it on six more routes would make them
 * read as copies of the homepage rather than pages of the same site.
 */

export function SolutionHero({ eyebrow, title, tagline, lead, visual, primaryHref = "/connect", secondaryHref = "/solutions" }) {
  return (
    <section className="relative overflow-hidden border-b px-6 pb-16 pt-28 sm:pb-20 sm:pt-32 md:px-12" style={{ borderColor: T.border }} aria-labelledby="solution-page-title">
      <div className="pointer-events-none absolute inset-0" style={{ background: T.panel2 }} />
      <div className="relative mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
        <div className="min-w-0 lg:col-span-6">
          {/* Hero hierarchy: eyebrow+title, then tagline, then lead, then the
              CTAs. Same order the eye reads them in. */}
          <RevealOnScroll delay={TIER.heading} className="font-jbmono text-[12px] uppercase tracking-[0.28em]" style={{ color: T.signal }}>{eyebrow}</RevealOnScroll>
          <RevealOnScroll as="h1" id="solution-page-title" delay={TIER.heading} className="mt-6 max-w-3xl break-words text-4xl font-extrabold uppercase leading-[.92] tracking-[-.045em] sm:text-6xl lg:text-7xl">{title}</RevealOnScroll>
          <RevealOnScroll as="p" delay={TIER.body} className="mt-6 max-w-2xl text-lg font-medium sm:text-xl" style={{ color: T.text }}>{tagline}</RevealOnScroll>
          <RevealOnScroll as="p" delay={TIER.body} className="mt-4 max-w-2xl text-base leading-relaxed sm:text-lg" style={{ color: T.muted }}>{lead}</RevealOnScroll>
          <RevealOnScroll delay={TIER.visual} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href={primaryHref} className="cta-primary inline-flex min-h-12 items-center justify-center gap-2 px-6 py-3 text-sm font-semibold uppercase tracking-wider sm:justify-start" style={{ background: T.signal, color: T.bg }}>
              Talk to our experts <ArrowRight size={16} aria-hidden="true" className="motion-card-arrow" />
            </Link>
            <Link href={secondaryHref} className="cta-secondary inline-flex min-h-12 items-center justify-center gap-2 border px-6 py-3 text-sm font-semibold uppercase tracking-wider sm:justify-start" style={{ borderColor: T.border }}>
              Explore solutions <ArrowUpRight size={15} aria-hidden="true" className="motion-card-arrow" />
            </Link>
          </RevealOnScroll>
        </div>
        {/* The page's own visual — a scale reveal, not a rebuilt animation.
            Each product page supplies its own graphic; we do not assume it has
            animatable internals. */}
        <RevealOnScroll variant="scale" delay={TIER.visual} className="relative min-w-0 lg:col-span-6">
          <div className="pointer-events-none absolute -inset-6 rounded-full blur-3xl" style={{ background: "rgba(13,90,140,.07)" }} />
          <div className="relative">{visual}</div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

export function SolutionPageNav() {
  const links = [["Outcomes", "#outcomes"], ["Capabilities", "#capabilities"], ["Architecture", "#architecture"], ["Related", "#related-solutions"]];
  return (
    <nav aria-label="On this solution page" className="sticky top-[68px] z-40 border-b px-4 backdrop-blur-lg sm:px-6 md:px-12" style={{ borderColor: T.border, background: "rgba(247,250,253,.94)" }}>
      <div className="mx-auto flex max-w-[1400px] items-center gap-1 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* Section nav: never reveal-gated — it is a control, and it is sticky,
            so it must be usable the instant the page paints. Hover only. */}
        {links.map(([label, href]) => <a key={href} href={href} className="nav-link inline-flex min-h-11 shrink-0 items-center px-3 text-xs font-semibold uppercase tracking-wider" style={{ color: T.muted }}>{label}</a>)}
        <span className="ml-auto hidden sm:block" aria-hidden="true" />
        <Link href="/connect" className="cta-primary ml-2 inline-flex min-h-11 shrink-0 items-center gap-2 px-4 text-xs font-semibold uppercase tracking-wider" style={{ background: T.signal, color: T.bg }}>Discuss solution <ArrowRight size={14} aria-hidden="true" className="motion-card-arrow" /></Link>
      </div>
    </nav>
  );
}

export function ChallengeOutcome({ challenges = [], outcomes = [] }) {
  return (
    <section id="outcomes" className="scroll-mt-40 border-b px-6 py-20 sm:py-24 md:px-12" style={{ borderColor: T.border }} aria-labelledby="challenge-title">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-2">
        <RevealOnScroll variant="fade-right" delay={TIER.heading}>
          <div className="font-jbmono text-[12px] uppercase tracking-[0.24em]" style={{ color: T.signal }}>Business challenge</div>
          <h2 id="challenge-title" className="mt-4 text-3xl font-bold uppercase tracking-tight sm:text-4xl">What financial institutions need to solve</h2>
          <ul className="mt-8 space-y-4">
            {challenges.map((item) => <li key={item} className="border-l-2 pl-4 text-sm leading-relaxed" style={{ borderColor: T.signal, color: T.muted }}>{item}</li>)}
          </ul>
        </RevealOnScroll>
        <RevealOnScroll variant="fade-left" delay={TIER.body}>
          {/* T.green here is the retired palette token (it resolves to blue) and
              is left exactly as it was — it is not the activity layer. */}
          <div className="font-jbmono text-[12px] uppercase tracking-[0.24em]" style={{ color: T.green }}>Business outcomes</div>
          <h2 className="mt-4 text-3xl font-bold uppercase tracking-tight sm:text-4xl">What the platform enables</h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {outcomes.map((item) => <li key={item} className="motion-card flex gap-3 border p-4 text-sm" style={{ borderColor: T.border, background: T.panel }}><CheckCircle2 size={18} className="motion-card-icon mt-0.5 shrink-0" aria-hidden="true" style={{ color: T.green }} /><span>{item}</span></li>)}
          </ul>
        </RevealOnScroll>
      </div>
    </section>
  );
}

export function CapabilityGrid({ title = "Capabilities", intro, items = [] }) {
  return (
    <section id="capabilities" className="scroll-mt-40 px-6 py-20 sm:py-24 md:px-12" aria-labelledby="capabilities-title">
      <div className="mx-auto max-w-[1400px]">
        <RevealOnScroll delay={TIER.heading} className="max-w-3xl">
          <div className="font-jbmono text-[12px] uppercase tracking-[0.24em]" style={{ color: T.signal }}>Platform capabilities</div>
          <h2 id="capabilities-title" className="mt-4 text-3xl font-bold uppercase tracking-tight sm:text-4xl">{title}</h2>
          {intro ? <p className="mt-4 leading-relaxed" style={{ color: T.muted }}>{intro}</p> : null}
        </RevealOnScroll>
        {/* Capability cards use the site-wide card language now, replacing the
            bespoke `hover:-translate-y-0.5 hover:border-[#0F5CBF]` this grid had:
            same 3px ceiling, green accent rail and icon lift as every other card
            on the site. The reveal wrapper IS the card, so no extra div. */}
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => (
            <RevealOnScroll
              as="article"
              key={item.h}
              delay={TIER.support + (index % 3) * STAGGER}
              className="motion-card motion-card-accent group relative h-full overflow-hidden border p-6"
              style={{ borderColor: T.border, background: T.panel }}
            >
              <div className="flex items-center justify-between">
                <div className="motion-card-icon flex h-11 w-11 items-center justify-center" style={{ background: "rgba(13,90,140,.10)", color: T.signal }}>{item.icon ? <item.icon size={21} aria-hidden="true" /> : null}</div>
                <span className="font-jbmono text-[10px]" style={{ color: T.faint }}>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-5 text-xl font-semibold">{item.h}</h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: T.muted }}>{item.p}</p>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * The one place on these pages that earns Level 2 data motion.
 *
 * This diagram genuinely describes a system relationship — an ordered flow of
 * work between named stages — so a data packet crossing it is telling the truth.
 * That is the test for reusing NetworkFlow: it goes on diagrams that represent
 * data or system relationships, never on decorative graphics.
 *
 * It is also the only diagram on these pages with meaningful nodes, so it is the
 * only one that became selectable. The steps themselves live in
 * ArchitectureFlowStages, which is a client component: this file cannot hold the
 * selection state without becoming one too (see the note at the top).
 */
export function ArchitectureFlow({ title, steps = [] }) {
  return (
    <section id="architecture" className="scroll-mt-40 border-y px-6 py-20 sm:py-24 md:px-12" style={{ borderColor: T.border, background: T.panel }} aria-labelledby="architecture-title">
      <div className="mx-auto max-w-[1400px]">
        <RevealOnScroll delay={TIER.heading} className="font-jbmono text-[12px] uppercase tracking-[0.24em]" style={{ color: T.signal }}>Architecture</RevealOnScroll>
        <RevealOnScroll as="h2" id="architecture-title" delay={TIER.body} className="mt-4 max-w-3xl text-3xl font-bold uppercase tracking-tight sm:text-4xl">{title}</RevealOnScroll>
        <ArchitectureFlowStages title={title} steps={steps} />
      </div>
    </section>
  );
}

export function StatsStrip({ eyebrow, stats = [] }) {
  if (!stats.length) return null;
  return (
    <section className="border-t px-6 py-16 sm:py-20 md:px-12" style={{ borderColor: T.border, background: T.panel }} aria-labelledby="solution-stats-title">
      <div className="mx-auto max-w-[1400px]">
        {eyebrow ? <RevealOnScroll id="solution-stats-title" delay={TIER.heading} className="font-jbmono text-[12px] uppercase tracking-[0.24em]" style={{ color: T.signal }}>{eyebrow}</RevealOnScroll> : null}
        {/* No reveal on the tiles: CountUp already animates them, and doing both
            makes two animations do one job (same decision as the home metrics). */}
        <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden lg:grid-cols-4" style={{ background: T.border }}>
          {stats.map((s, i) => (
            <div key={s.label} data-testid={`solution-stat-${i}`} className="p-8" style={{ background: T.bg }}>
              <div className="text-4xl font-extrabold tracking-tight sm:text-5xl" style={{ color: T.signal }}><CountUp to={s.to} prefix={s.prefix || ""} suffix={s.suffix || ""} /></div>
              <div className="mt-3 font-jbmono text-[12px] uppercase tracking-widest" style={{ color: T.muted }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ConsultationBridge({ title = "Bring the architecture into your environment." }) {
  return (
    <section className="px-6 py-12 md:px-12" aria-labelledby="solution-next-step-title">
      <RevealOnScroll delay={TIER.heading} className="mx-auto flex max-w-[1400px] flex-col gap-6 border p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between" style={{ borderColor: T.signal, background: "rgba(13,90,140,.07)" }}>
        <div><div className="font-jbmono text-[10px] uppercase tracking-[0.22em]" style={{ color: T.signal }}>Next step</div><h2 id="solution-next-step-title" className="mt-2 max-w-2xl text-2xl font-bold uppercase tracking-tight sm:text-3xl">{title}</h2></div>
        <Link href="/connect" className="cta-primary inline-flex min-h-12 shrink-0 items-center justify-center gap-2 px-6 py-3 text-sm font-semibold uppercase tracking-wider" style={{ background: T.signal, color: T.bg }}>Schedule consultation <ArrowRight size={16} aria-hidden="true" className="motion-card-arrow" /></Link>
      </RevealOnScroll>
    </section>
  );
}

export function RelatedSolutions({ items = [] }) {
  return (
    <section id="related-solutions" className="scroll-mt-40 px-6 py-20 md:px-12" aria-labelledby="related-solutions-title">
      <div className="mx-auto max-w-[1400px]">
        <RevealOnScroll delay={TIER.heading} className="flex flex-wrap items-end justify-between gap-4">
          <div><div className="font-jbmono text-[12px] uppercase tracking-[0.24em]" style={{ color: T.signal }}>Continue exploring</div><h2 id="related-solutions-title" className="mt-3 text-3xl font-bold uppercase tracking-tight">Related solutions</h2></div>
          <Link href="/solutions" className="cta-secondary inline-flex min-h-11 items-center py-3 text-sm font-semibold" style={{ color: T.signal }}>View all solutions →</Link>
        </RevealOnScroll>
        {/* Standard card language, replacing this grid's own hover rules. */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {items.map((item, index) => <RevealOnScroll key={item.href} delay={TIER.support + index * STAGGER} className="motion-card motion-card-accent group relative overflow-hidden border" style={{ borderColor: T.border, background: T.panel }}><Link href={item.href} className="block h-full p-6"><div className="text-lg font-semibold">{item.title}</div><p className="mt-2 text-sm leading-relaxed" style={{ color: T.muted }}>{item.description}</p><span className="mt-5 inline-flex items-center text-sm font-semibold" style={{ color: T.signal }}>Explore <ArrowRight size={15} className="motion-card-arrow ml-2" aria-hidden="true" /></span></Link></RevealOnScroll>)}
        </div>
      </div>
    </section>
  );
}

export function EnterpriseSolutionPage({ hero, challenges, outcomes, capabilityTitle, capabilityIntro, capabilities, architecture, beforeStats, stats, statsEyebrow, related }) {
  return (
    <div className="font-instrument" style={{ background: T.bg, color: T.text }}>
      <SolutionHero {...hero} />
      <SolutionPageNav />
      <ChallengeOutcome challenges={challenges} outcomes={outcomes} />
      <CapabilityGrid title={capabilityTitle} intro={capabilityIntro} items={capabilities} />
      <ArchitectureFlow {...architecture} />
      {beforeStats}
      <StatsStrip eyebrow={statsEyebrow} stats={stats} />
      <ConsultationBridge />
      <RelatedSolutions items={related} />
      <ContactSection />
    </div>
  );
}
