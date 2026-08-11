import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { T } from "@/site/theme";
import HeroArtwork from "@/site/phase7/HeroArtwork";

const PROOF = [
  ["15+", "Countries"],
  ["100+", "Satisfied clients"],
  ["100+", "Skilled experts"],
];

// The first-screen sequence, in ms.
//
//     150  heading
//     300  supporting copy
//     320  hero artwork reveals (see HeroArtwork)
//     450  CTA
//     540  proof figures
//     600  certification badge
//
// The artwork moved from 650ms to 320ms when it became a raster asset: it is now
// the LCP candidate, so it cannot be held at opacity 0 for as long as the old
// inline illustration was. It still lands after the heading and copy, so the
// "text leads, visual follows" reading order is intact.
//
// Deliberately spaced so no two beats land together — the visitor should read
// the page being built, one line at a time, rather than watch it all fade in at
// once. All CSS-driven, so nothing waits on hydration to become visible.
const SEQ = {
  heading: 150,
  headingSecondLine: 240,
  supporting: 300,
  cta: 450,
  proof: 540,
  badge: 600,
};

export default function CinematicHero() {
  return (
    <section className="relative isolate overflow-hidden border-b px-6 pb-14 pt-24 md:min-h-[92vh] md:px-12 md:pb-20 md:pt-32" style={{ borderColor: T.border }} aria-labelledby="phase7-hero-title">
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(circle at 78% 30%, rgba(13,90,140,.15), transparent 30%), linear-gradient(180deg, rgba(13,90,140,.04), transparent 58%)" }} />
      <div className="hairline-grid pointer-events-none absolute inset-0 opacity-45" style={{ "--hl": T.hl, backgroundSize: "8.33% 6rem" }} />

      <div className="relative mx-auto grid max-w-[1480px] gap-6 lg:grid-cols-12 lg:items-center xl:gap-10">
        <div className="lg:col-span-6">
          {/* DRAFTED, NOT SOURCED — hero eyebrow removed 2026-08-09 pending content review; do not reinstate without a verified source. */}

          <h1 id="phase7-hero-title" className="max-w-[690px] text-[15vw] font-extrabold leading-[.84] tracking-[-.045em] sm:text-7xl lg:text-[5.8rem] xl:text-[6.4rem]">
            <span className="block overflow-hidden"><span className="motion-line-reveal block" style={{ animationDelay: `${SEQ.heading}ms`, animationDuration: "620ms" }}>Banking.</span></span>
            <span className="block overflow-hidden"><span className="motion-line-reveal block" style={{ color: T.signal, animationDelay: `${SEQ.headingSecondLine}ms`, animationDuration: "620ms" }}>Reinvented.</span></span>
          </h1>

          <p className="motion-rise mt-6 max-w-xl text-base leading-relaxed sm:text-lg md:mt-7" style={{ color: T.muted, "--delay": `${SEQ.supporting}ms` }}>
            AI, digital banking and enterprise technology working together to help financial institutions modernize with confidence.
          </p>

          <div className="motion-rise mt-7 flex flex-wrap gap-3 md:mt-9" style={{ "--delay": `${SEQ.cta}ms` }}>
            <Link href="/connect" className="cta-primary group inline-flex min-h-12 items-center gap-2 px-7 py-3.5 text-sm font-semibold tracking-wide" style={{ background: T.signal, color: T.bg }}>
              Schedule consultation <ArrowRight aria-hidden="true" size={16} className="motion-card-arrow" />
            </Link>
            <Link href="/solutions" className="cta-secondary group inline-flex min-h-12 items-center gap-2 border px-7 py-3.5 text-sm font-semibold tracking-wide" style={{ borderColor: T.border }}>
              Explore solutions <ArrowUpRight aria-hidden="true" size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div className="motion-rise mt-6 grid max-w-xl grid-cols-3 gap-3 border-t pt-5 md:mt-8" style={{ borderColor: T.border, "--delay": `${SEQ.proof}ms` }} aria-label="Published Tayseer company figures">
            {PROOF.map(([value, label]) => <div key={label}><div className="text-lg font-semibold sm:text-xl">{value}</div><div className="mt-1 text-xs leading-tight" style={{ color: T.muted }}>{label}</div></div>)}
          </div>

          <div className="motion-rise mt-5 flex max-w-xl items-center gap-3 border-t pt-5" style={{ borderColor: T.border, "--delay": `${SEQ.badge}ms` }}>
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full" style={{ background: "rgba(13,90,140,0.28)" }}>
              <img src="/iso-27001-badge.png" alt="ISO 27001:2022 Certified" width="42" height="42" className="h-[42px] w-[42px]" loading="lazy" decoding="async" />
            </div>
            <span className="font-jbmono text-xs uppercase tracking-[0.18em]" style={{ color: T.muted }}>ISO 27001:2022 Certified</span>
          </div>
        </div>

        <div className="relative mx-auto w-full lg:col-span-6">
          <div className="absolute inset-6 rounded-full blur-3xl" style={{ background: "rgba(13,90,140,.13)" }} />
          <HeroArtwork className="relative mx-auto w-full max-w-[720px]" />
        </div>
      </div>
    </section>
  );
}
