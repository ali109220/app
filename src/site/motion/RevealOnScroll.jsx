"use client";

import { useInView } from "./hooks";
import { D, EASE } from "./tokens";

// Resting offset per variant. Kept small on purpose — the brief asks for
// "content enters naturally", not content flying in.
const VARIANTS = {
  fade: { x: 0, y: 0, scale: 1 },
  "fade-up": { x: 0, y: 24, scale: 1 },
  "fade-left": { x: 24, y: 0, scale: 1 },
  "fade-right": { x: -24, y: 0, scale: 1 },
  scale: { x: 0, y: 8, scale: 0.98 },
};

// Mobile gets ~60% of the travel and a tighter stagger, so a fast thumb-scroll
// never leaves a trail of half-arrived elements behind it.
const MOBILE_SCALE = 0.6;

function offsetFor(variant, compact) {
  const base = VARIANTS[variant] || VARIANTS["fade-up"];
  if (!compact) return base;
  return { ...base, x: base.x * MOBILE_SCALE, y: base.y * MOBILE_SCALE };
}

/**
 * The one scroll-reveal mechanism for the site.
 *
 * IntersectionObserver-driven, fires once, animates only opacity + transform.
 * Under prefers-reduced-motion the hook reports "in view" immediately and the
 * transition is dropped, so the element simply exists in its final state.
 *
 * @param variant  fade | fade-up | fade-left | fade-right | scale
 * @param delay    ms added before this element's own transition starts
 */
export function RevealOnScroll({
  children,
  variant = "fade-up",
  delay = 0,
  duration = D.reveal,
  className = "",
  as: Tag = "div",
  style,
  compact = false,
  ...rest
}) {
  const [ref, inView] = useInView();
  const { x, y, scale } = offsetFor(variant, compact);

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: inView ? 1 : 0,
        // Once revealed, no inline transform is emitted at all. Writing
        // `transform: none` here would win on specificity against every hover
        // rule in the stylesheet, silently disabling the card lift and any other
        // transform a consumer layers on top. Dropping the property still
        // animates, because the computed value is what the transition watches.
        ...(inView ? null : { transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})` }),
        transition: `opacity ${duration}ms ${EASE} ${delay}ms, transform ${duration}ms ${EASE} ${delay}ms`,
        willChange: inView ? "auto" : "opacity, transform",
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default RevealOnScroll;
