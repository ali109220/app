"use client";

import RevealOnScroll from "./RevealOnScroll";

/**
 * `Reveal` — the original reveal component, now a thin adapter over
 * RevealOnScroll rather than a second implementation.
 *
 * Eighteen files across the non-home routes call this. Rewiring it here rather
 * than editing all of them means every route inherits the fixes that were made
 * for the homepage, in one place:
 *
 *  · No persistent inline transform. The old version always wrote
 *    `transform: translateY(0px)` once visible, which outranks any stylesheet
 *    :hover rule — so a card wrapped in Reveal could never lift, and the
 *    site-wide card interaction would have silently done nothing.
 *  · The verified observer thresholds (-8% bottom margin, 0.01) instead of the
 *    old `rect.top <= innerHeight + 80` guess, which skipped the animation
 *    entirely for anything near the fold and could leave content stranded.
 *  · Centralised duration and easing, instead of a hardcoded .8s/(.16,1,.3,1)
 *    that drifted from the motion tokens.
 *
 * API is preserved exactly, including the awkward part: **`delay` is in
 * SECONDS here** (call sites pass `delay={0.05}`), while RevealOnScroll and the
 * motion tokens are in milliseconds. The conversion happens below. New code
 * should use RevealOnScroll and TIER directly.
 */
export const Reveal = ({ children, delay = 0, y = 24, className = "", as = "div" }) => (
  <RevealOnScroll
    as={as}
    className={className}
    delay={delay * 1000}
    variant={y === 0 ? "fade" : "fade-up"}
  >
    {children}
  </RevealOnScroll>
);

export const LineReveal = ({ lines, className = "", stagger = 0.11 }) => (
  <span className={className}>
    {lines.map((t, i) => (
      <span key={i} className="block overflow-hidden">
        <span className="motion-line-reveal block" style={{ animationDelay: `${0.15 + i * stagger}s` }}>
          {t}
        </span>
      </span>
    ))}
  </span>
);

export const Marquee = ({ items, speed = 40, className = "", sep = "/" }) => (
  <div className={`overflow-hidden ${className}`}>
    <span className="sr-only">{items.join(` ${sep} `)}</span>
    <div
      className="motion-marquee flex w-max whitespace-nowrap"
      style={{ animationDuration: `${speed}s` }}
      aria-hidden="true"
    >
      {[0, 1].map((k) => (
        <div key={k} className="flex shrink-0 items-center">
          {items.map((it, i) => (
            <span key={i} className="flex items-center">
              <span className="px-6">{it}</span>
              <span className="opacity-30">{sep}</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);
