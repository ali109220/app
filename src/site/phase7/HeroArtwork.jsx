"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useHasFinePointer, useReducedMotionRef } from "@/site/motion/hooks";

/**
 * The hero visual: the supplied banking-ecosystem artwork, art-directed into
 * three crops.
 *
 * Replaces the inlined HeroTechVisual illustration. That component animated six
 * addressable SVG nodes; a raster asset has no nodes, so per the brief the
 * node/connector wake-up sequence is gone and the visual-specific motion is now
 * a single reveal plus the same capped cursor parallax. Nothing else in the
 * motion system changes — the heading, copy, CTA, proof and badge beats in
 * CinematicHero are untouched.
 *
 * Two things here are load-bearing and easy to break:
 *
 * 1. <picture> does the art direction, not next/image's srcset. This project is
 *    output:"export" with images.unoptimized, so next/image cannot generate
 *    variants — it emits a bare <img>. The media-scoped <source> elements are
 *    therefore the only thing that stops a phone downloading the desktop crop,
 *    and the preload scanner resolves them out of the static HTML with no JS.
 *
 * 2. Every variant is 4:3. The crops differ in tightness, never in shape, so
 *    swapping sources across breakpoints cannot shift layout. Combined with the
 *    explicit width/height below, that is what holds CLS at zero.
 */

// Intrinsic size of the widest variant. Sets the aspect box for every source.
const W = 908;
const H = 681;

// Later than the text beats so the visual still follows the copy, but far
// earlier than the old illustration's 650ms: this element is now the LCP
// candidate, and an LCP image must not sit at opacity 0 while a decorative
// SVG happily could.
const REVEAL_DELAY = 320;
const REVEAL_DUR = 700;

const MAX_SHIFT = 3; // px — inside the brief's 2–4px ceiling

export default function HeroArtwork({ className = "" }) {
  const wrapRef = useRef(null);
  const reduced = useReducedMotionRef();
  const finePointer = useHasFinePointer();
  const frame = useRef(null);

  // Same handler shape as the illustration it replaces: rAF-throttled, capped,
  // and skipped outright on coarse pointers so phones never run it.
  useEffect(() => {
    const element = wrapRef.current;
    if (!element || !finePointer) return;

    const onMove = (event) => {
      if (reduced.current) return;
      const { clientX, clientY } = event;
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const nx = ((clientX - rect.left) / rect.width - 0.5) * 2;
        const ny = ((clientY - rect.top) / rect.height - 0.5) * 2;
        element.style.setProperty("--px", `${(nx * MAX_SHIFT).toFixed(2)}px`);
        element.style.setProperty("--py", `${(ny * MAX_SHIFT).toFixed(2)}px`);
      });
    };

    const onLeave = () => {
      if (frame.current) cancelAnimationFrame(frame.current);
      element.style.setProperty("--px", "0px");
      element.style.setProperty("--py", "0px");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    element.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      element.removeEventListener("pointerleave", onLeave);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [finePointer, reduced]);

  return (
    <div ref={wrapRef} className={className} style={{ "--px": "0px", "--py": "0px" }}>
      {/* Reveal and parallax sit on separate elements on purpose: both drive
          `transform`, so sharing one element would let the entrance animation
          and the cursor offset overwrite each other. Both collapse safely under
          prefers-reduced-motion via the existing rules in index.css. */}
      <div
        className="motion-rise"
        style={{ "--delay": `${REVEAL_DELAY}ms`, "--dur": `${REVEAL_DUR}ms`, "--rise": "12px" }}
      >
        <div className="hero-parallax-layer" style={{ "--depth": 1 }}>
          <picture>
            {/* Order matters — first matching media wins. Breakpoints track the
                layout: below sm the visual is full-width on a phone, below lg it
                is full-width stacked, at lg+ it is the right-hand grid column. */}
            <source
              media="(max-width: 639px)"
              type="image/avif"
              srcSet="/images/hero/tayseer-hero-360.avif"
            />
            <source
              media="(max-width: 639px)"
              type="image/webp"
              srcSet="/images/hero/tayseer-hero-360.webp"
            />
            <source
              media="(max-width: 1023px)"
              type="image/avif"
              srcSet="/images/hero/tayseer-hero-720.avif"
            />
            <source
              media="(max-width: 1023px)"
              type="image/webp"
              srcSet="/images/hero/tayseer-hero-720.webp"
            />
            <source type="image/avif" srcSet="/images/hero/tayseer-hero-908.avif" />
            <Image
              src="/images/hero/tayseer-hero-908.webp"
              alt="Isometric illustration of a bank at the centre of a connected technology ecosystem — mobile banking, cloud services, data infrastructure, card payments, AI and support channels linked across a world map"
              width={W}
              height={H}
              // Deliberately not `priority`. Under images.unoptimized that prop
              // preloads this single src with no media condition, which would
              // make every phone download the 908px desktop crop — the exact
              // failure the brief calls out. Its two useful halves are set
              // explicitly instead, and the <picture> above stays authoritative.
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 1023px) 100vw, 720px"
              className="h-auto w-full"
            />
          </picture>
        </div>
      </div>
    </div>
  );
}
