"use client";

import { D, GREEN, green } from "./tokens";

/**
 * Data-in-flight primitives for the architecture visuals.
 *
 * Both are driven entirely by CSS keyframes with per-instance custom properties,
 * so no JavaScript runs per frame: the whole trip is one composited transform.
 * That matters because these are the only things on the page that move while the
 * user is doing nothing, and they must never be the reason a scroll stutters.
 *
 * Restraint is a hard requirement of the brief: one particle at a time, a dwell
 * between trips, and nothing at all under prefers-reduced-motion (handled by the
 * .motion-flow-* rules in index.css).
 */

/**
 * A single green point travelling a straight SVG connector, then arriving.
 *
 * Coordinates are in the parent SVG's user units. `translate()` on the <g> is a
 * CSS transform, which in SVG resolves px to user units — so the same viewBox
 * maths as the static line applies, with no re-measuring on resize.
 */
export function FlowParticle({ from, to, delay = 0, duration = D.activity, radius = 1.6, aspect = 1 }) {
  // `aspect` compensates for a parent SVG using preserveAspectRatio="none": the
  // horizontal radius is pre-divided so the dot still renders round after the
  // viewBox's non-uniform scale is applied.
  const rx = radius / aspect;

  return (
    <g
      className="motion-flow-particle"
      style={{
        "--flow-dx": `${to.x - from.x}px`,
        "--flow-dy": `${to.y - from.y}px`,
        "--flow-dur": `${duration}ms`,
        animationDelay: `${delay}ms`,
      }}
    >
      <ellipse cx={from.x} cy={from.y} rx={rx * 2.4} ry={radius * 2.4} fill={green(0.22)} />
      <ellipse cx={from.x} cy={from.y} rx={rx} ry={radius} fill={GREEN} />
    </g>
  );
}

/**
 * The linear-pipeline equivalent: a dot crossing one stage of the flow row,
 * left edge to right edge, on the same vertical line as the existing chevrons.
 *
 * Absolutely positioned inside a cell that is already `position: relative`, so it
 * adds nothing to layout and cannot shift the design. `cycle` must be identical
 * for every stage in a row — the CSS keyframe is cycle-relative, and equal cycles
 * with staggered delays are what keep the hops in sequence (see index.css).
 *
 * Desktop only: the flow row stacks vertically below `md`, where a
 * left-to-right dot would no longer describe the connection.
 */
export function StagePulse({ delay = 0, cycle = D.activity * 6 }) {
  return (
    <span
      className="motion-stage-pulse pointer-events-none absolute top-1/2 hidden md:block"
      style={{
        "--stage-cycle": `${cycle}ms`,
        animationDelay: `${delay}ms`,
        background: GREEN,
        boxShadow: `0 0 0 3px ${green(0.18)}`,
      }}
      aria-hidden="true"
    />
  );
}

/**
 * The matching arrival flash for a StagePulse. Same cycle, delayed to the moment
 * the dot lands, so the destination acknowledges the data instead of the whole
 * row blinking at once.
 */
export function StageArrival({ delay = 0, cycle = D.activity * 6, className = "", style }) {
  return (
    <span
      className={`motion-stage-arrive pointer-events-none absolute ${className}`}
      style={{ ...style, "--stage-cycle": `${cycle}ms`, animationDelay: `${delay}ms` }}
      aria-hidden="true"
    />
  );
}
