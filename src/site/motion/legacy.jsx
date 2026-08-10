"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./hooks";

/**
 * Pre-existing motion primitives, moved here unchanged when `site/motion.jsx`
 * became the `site/motion/` directory. Eighteen files across the non-homepage
 * routes import `Reveal` from `@/site/motion`, so the names and behaviour are
 * kept exactly as they were rather than migrated in the same pass.
 *
 * New work should use RevealOnScroll, which shares one reduced-motion hook,
 * supports variants/stagger, and reads its timing from the motion tokens.
 */

export const Reveal = ({ children, delay = 0, y = 24, className = "", as = "div" }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(true);
  const reducedMotion = useReducedMotion();
  const Tag = as;

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const rect = el.getBoundingClientRect();
    const alreadyNearViewport = rect.top <= window.innerHeight + 80;
    if (alreadyNearViewport) return;

    setVisible(false);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px 80px 0px", threshold: 0.01 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: visible || reducedMotion ? 1 : 0,
        transform: `translateY(${visible || reducedMotion ? 0 : y}px)`,
        transition: reducedMotion ? "none" : `opacity .8s ${visible ? delay : 0}s cubic-bezier(.16,1,.3,1), transform .8s ${visible ? delay : 0}s cubic-bezier(.16,1,.3,1)`,
      }}
    >
      {children}
    </Tag>
  );
};

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
