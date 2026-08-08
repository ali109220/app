import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/site/motion";
import { ContactSection } from "@/site/ContactSection";
import { T } from "@/site/theme";

export function SolutionHero({ eyebrow, title, tagline, lead, visual, primaryHref = "/connect", secondaryHref = "/solutions" }) {
  return (
    <section className="relative overflow-hidden border-b px-6 pb-16 pt-28 sm:pb-20 sm:pt-32 md:px-12" style={{ borderColor: T.border }} aria-labelledby="solution-page-title">
      <div className="pointer-events-none absolute inset-0 opacity-60" style={{ background: "radial-gradient(circle at 78% 30%, rgba(13,90,140,.14), transparent 34%), linear-gradient(180deg, rgba(13,90,140,.035), transparent 62%)" }} />
      <div className="relative mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
        <div className="min-w-0 lg:col-span-6">
          <div className="font-jbmono text-[11px] uppercase tracking-[0.28em]" style={{ color: T.signal }}>{eyebrow}</div>
          <h1 id="solution-page-title" className="mt-6 max-w-3xl break-words text-4xl font-extrabold uppercase leading-[.92] tracking-[-.045em] sm:text-6xl lg:text-7xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-lg font-medium sm:text-xl" style={{ color: T.text }}>{tagline}</p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed sm:text-lg" style={{ color: T.muted }}>{lead}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href={primaryHref} className="group inline-flex min-h-12 items-center justify-center gap-2 px-6 py-3 text-sm font-semibold uppercase tracking-wider sm:justify-start" style={{ background: T.signal, color: T.bg }}>
              Talk to our experts <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href={secondaryHref} className="group inline-flex min-h-12 items-center justify-center gap-2 border px-6 py-3 text-sm font-semibold uppercase tracking-wider sm:justify-start" style={{ borderColor: T.border }}>
              Explore solutions <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="relative min-w-0 lg:col-span-6">
          <div className="pointer-events-none absolute -inset-6 rounded-full blur-3xl" style={{ background: "rgba(13,90,140,.07)" }} />
          <div className="relative">{visual}</div>
        </div>
      </div>
    </section>
  );
}

export function SolutionPageNav() {
  const links = [["Outcomes", "#outcomes"], ["Capabilities", "#capabilities"], ["Architecture", "#architecture"], ["Related", "#related-solutions"]];
  return (
    <nav aria-label="On this solution page" className="sticky top-[68px] z-40 border-b px-4 backdrop-blur-lg sm:px-6 md:px-12" style={{ borderColor: T.border, background: "rgba(247,246,242,.94)" }}>
      <div className="mx-auto flex max-w-[1400px] items-center gap-1 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {links.map(([label, href]) => <a key={href} href={href} className="inline-flex min-h-11 shrink-0 items-center px-3 text-xs font-semibold uppercase tracking-wider" style={{ color: T.muted }}>{label}</a>)}
        <span className="ml-auto hidden sm:block" aria-hidden="true" />
        <Link href="/connect" className="ml-2 inline-flex min-h-11 shrink-0 items-center gap-2 px-4 text-xs font-semibold uppercase tracking-wider" style={{ background: T.signal, color: T.bg }}>Discuss solution <ArrowRight size={14} aria-hidden="true" /></Link>
      </div>
    </nav>
  );
}

export function ChallengeOutcome({ challenges = [], outcomes = [] }) {
  return (
    <section id="outcomes" className="scroll-mt-40 border-b px-6 py-20 sm:py-24 md:px-12" style={{ borderColor: T.border }} aria-labelledby="challenge-title">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-2">
        <div>
          <div className="font-jbmono text-[11px] uppercase tracking-[0.24em]" style={{ color: T.signal }}>Business challenge</div>
          <h2 id="challenge-title" className="mt-4 text-3xl font-bold uppercase tracking-tight sm:text-4xl">What financial institutions need to solve</h2>
          <ul className="mt-8 space-y-4">
            {challenges.map((item) => <li key={item} className="border-l-2 pl-4 text-sm leading-relaxed" style={{ borderColor: T.signal, color: T.muted }}>{item}</li>)}
          </ul>
        </div>
        <div>
          <div className="font-jbmono text-[11px] uppercase tracking-[0.24em]" style={{ color: T.green }}>Business outcomes</div>
          <h2 className="mt-4 text-3xl font-bold uppercase tracking-tight sm:text-4xl">What the platform enables</h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {outcomes.map((item) => <li key={item} className="flex gap-3 border p-4 text-sm" style={{ borderColor: T.border, background: T.panel }}><CheckCircle2 size={18} className="mt-0.5 shrink-0" aria-hidden="true" style={{ color: T.green }} /><span>{item}</span></li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function CapabilityGrid({ title = "Capabilities", intro, items = [] }) {
  return (
    <section id="capabilities" className="scroll-mt-40 px-6 py-20 sm:py-24 md:px-12" aria-labelledby="capabilities-title">
      <div className="mx-auto max-w-[1400px]">
        <div className="max-w-3xl">
          <div className="font-jbmono text-[11px] uppercase tracking-[0.24em]" style={{ color: T.signal }}>Platform capabilities</div>
          <h2 id="capabilities-title" className="mt-4 text-3xl font-bold uppercase tracking-tight sm:text-4xl">{title}</h2>
          {intro ? <p className="mt-4 leading-relaxed" style={{ color: T.muted }}>{intro}</p> : null}
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => (
            <Reveal key={item.h} delay={(index % 3) * 0.05}>
              <article className="group h-full border p-6 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-[#0D5A8C] motion-reduce:transform-none motion-reduce:transition-none" style={{ borderColor: T.border, background: T.panel }}>
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center" style={{ background: "rgba(13,90,140,.10)", color: T.signal }}>{item.icon ? <item.icon size={21} aria-hidden="true" /> : null}</div>
                  <span className="font-jbmono text-[10px]" style={{ color: T.faint }}>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-5 text-xl font-semibold">{item.h}</h3>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: T.muted }}>{item.p}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ArchitectureFlow({ title, steps = [] }) {
  return (
    <section id="architecture" className="scroll-mt-40 border-y px-6 py-20 sm:py-24 md:px-12" style={{ borderColor: T.border, background: T.panel }} aria-labelledby="architecture-title">
      <div className="mx-auto max-w-[1400px]">
        <div className="font-jbmono text-[11px] uppercase tracking-[0.24em]" style={{ color: T.signal }}>Architecture</div>
        <h2 id="architecture-title" className="mt-4 max-w-3xl text-3xl font-bold uppercase tracking-tight sm:text-4xl">{title}</h2>
        <ol className="relative mt-10 grid gap-3 md:grid-cols-5 md:gap-4" aria-label={`${title} flow`}>
          <li className="pointer-events-none absolute left-[8%] right-[8%] top-1/2 hidden h-px md:block" style={{ background: "linear-gradient(90deg, transparent, rgba(13,90,140,.35), transparent)" }} aria-hidden="true" />
          {steps.map((step, index) => (
            <li key={step} className="relative z-10 border p-5 text-sm font-medium" style={{ borderColor: T.border, background: T.bg }}>
              <span className="mb-3 block font-jbmono text-[10px]" style={{ color: T.faint }}>Step {String(index + 1).padStart(2, "0")}</span>
              {step}
              {index < steps.length - 1 ? <ArrowDown size={14} className="absolute -bottom-[15px] left-1/2 -translate-x-1/2 md:hidden" aria-hidden="true" style={{ color: T.signal }} /> : null}
              {index < steps.length - 1 ? <ArrowRight size={15} className="absolute -right-[18px] top-1/2 hidden -translate-y-1/2 md:block" aria-hidden="true" style={{ color: T.signal }} /> : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function ConsultationBridge({ title = "Bring the architecture into your environment." }) {
  return (
    <section className="px-6 py-12 md:px-12" aria-labelledby="solution-next-step-title">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 border p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between" style={{ borderColor: T.signal, background: "rgba(13,90,140,.07)" }}>
        <div><div className="font-jbmono text-[10px] uppercase tracking-[0.22em]" style={{ color: T.signal }}>Next step</div><h2 id="solution-next-step-title" className="mt-2 max-w-2xl text-2xl font-bold uppercase tracking-tight sm:text-3xl">{title}</h2></div>
        <Link href="/connect" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 px-6 py-3 text-sm font-semibold uppercase tracking-wider" style={{ background: T.signal, color: T.bg }}>Schedule consultation <ArrowRight size={16} aria-hidden="true" /></Link>
      </div>
    </section>
  );
}

export function RelatedSolutions({ items = [] }) {
  return (
    <section id="related-solutions" className="scroll-mt-40 px-6 py-20 md:px-12" aria-labelledby="related-solutions-title">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><div className="font-jbmono text-[11px] uppercase tracking-[0.24em]" style={{ color: T.signal }}>Continue exploring</div><h2 id="related-solutions-title" className="mt-3 text-3xl font-bold uppercase tracking-tight">Related solutions</h2></div>
          <Link href="/solutions" className="inline-flex min-h-11 items-center py-3 text-sm font-semibold" style={{ color: T.signal }}>View all solutions →</Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {items.map((item) => <Link key={item.href} href={item.href} className="group border p-6 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-[#0D5A8C] motion-reduce:transform-none motion-reduce:transition-none" style={{ borderColor: T.border, background: T.panel }}><div className="text-lg font-semibold">{item.title}</div><p className="mt-2 text-sm leading-relaxed" style={{ color: T.muted }}>{item.description}</p><span className="mt-5 inline-flex items-center text-sm font-semibold" style={{ color: T.signal }}>Explore <ArrowRight size={15} className="ml-2 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden="true" /></span></Link>)}
        </div>
      </div>
    </section>
  );
}

export function EnterpriseSolutionPage({ hero, challenges, outcomes, capabilityTitle, capabilityIntro, capabilities, architecture, related }) {
  return (
    <div className="font-archivo" style={{ background: T.bg, color: T.text }}>
      <SolutionHero {...hero} />
      <SolutionPageNav />
      <ChallengeOutcome challenges={challenges} outcomes={outcomes} />
      <CapabilityGrid title={capabilityTitle} intro={capabilityIntro} items={capabilities} />
      <ArchitectureFlow {...architecture} />
      <ConsultationBridge />
      <RelatedSolutions items={related} />
      <ContactSection />
    </div>
  );
}
