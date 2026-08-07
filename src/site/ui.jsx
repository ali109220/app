"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Reveal, LineReveal } from "./motion";
import { T } from "./theme";

export const SectionLabel = ({ children }) => (
  <div className="mb-6 flex items-center gap-3 font-jbmono text-[12px] uppercase tracking-[0.25em]" style={{ color: T.signal }}>
    <span className="h-1.5 w-1.5" style={{ background: T.green }} />{children}
  </div>
);

// Render the real value in SSR so SEO/first paint never exposes a broken "0".
// After hydration, counters that are still below the fold reset to zero and
// animate when they enter the viewport. If hydration is delayed, the correct
// final value remains visible instead of waiting for a user interaction.
export const CountUp = ({ to, prefix = "", suffix = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();
  const [v, setV] = useState(to);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    if (!reduceMotion && !inView) setV(0);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!ready || !inView || reduceMotion) {
      if (reduceMotion) setV(to);
      return;
    }

    let raf;
    let start;
    const from = v >= to ? 0 : v;
    const dur = 1600;

    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min(1, (ts - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.floor(from + (to - from) * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, ready, reduceMotion, to]); // v intentionally excluded: animation owns it

  return <span ref={ref}>{prefix}{v}{suffix}</span>;
};

export const InnerHero = ({ index, crumbs, title, tagline, lead }) => (
  <section className="grain relative overflow-hidden border-b" style={{ background: T.bg, borderColor: T.border }}>
    <div className="hairline-grid absolute inset-0" style={{ "--hl": T.hl, backgroundSize: "8.33% 6rem" }} />
    <img
      src="https://static.prod-images.emergentagent.com/jobs/820ed89a-f907-42ba-8029-9fc496755307/images/d7082aa064a573f30c37c34174e7d046c75aa40b56150ce1a6aa66cb5aa906b2.jpeg"
      alt=""
      fetchPriority="high"
      decoding="async"
      className="pointer-events-none absolute right-0 top-0 hidden h-full w-1/2 object-cover object-right opacity-70 md:block"
      style={{ maskImage: "linear-gradient(90deg,transparent,#000 75%)", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 75%)" }}
    />
    <div className="pointer-events-none absolute -left-40 top-0 h-[420px] w-[420px] rounded-full" style={{ background: T.signal, filter: "blur(220px)", opacity: 0.05 }} />
    <div className="relative mx-auto max-w-[1400px] px-6 pt-36 pb-20 md:px-12 md:pt-44">
      <Reveal>
        <div className="mb-6 flex flex-wrap items-center gap-2 font-jbmono text-[11px] uppercase tracking-[0.2em]" style={{ color: T.faint }} data-testid="breadcrumb">
          {crumbs.map((c, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <span style={{ color: T.signal }}>»</span>}
              <span style={{ color: i === crumbs.length - 1 ? T.signal : T.faint }}>{c}</span>
            </span>
          ))}
        </div>
      </Reveal>
      <h1 className="max-w-5xl text-5xl font-extrabold uppercase leading-[0.9] tracking-[-0.03em] sm:text-7xl lg:text-[6rem]">
        <LineReveal lines={[title]} />
      </h1>
      {tagline && (
        <Reveal delay={0.3}>
          <p className="mt-8 max-w-3xl text-xl font-medium leading-snug" style={{ color: T.text }}>{tagline}</p>
        </Reveal>
      )}
      {lead && (
        <Reveal delay={0.4}>
          <p className="mt-6 max-w-3xl text-base leading-relaxed" style={{ color: T.muted }}>{lead}</p>
        </Reveal>
      )}
    </div>
  </section>
);
