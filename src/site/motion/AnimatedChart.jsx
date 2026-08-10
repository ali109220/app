"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "./hooks";
import { D, EASE, STAGGER, activityAlpha, activityGreen } from "./tokens";

/**
 * Draws an existing chart line left-to-right, then pops its data points in
 * sequence, then marks the last point as the live one in activity green.
 *
 * The curve is passed in as the same `d` string the static design already used —
 * this component does not reshape or resample it. Point positions are read off
 * the rendered path with getPointAtLength, so the dots land exactly on the
 * existing line instead of on numbers we made up.
 *
 * Line draw uses stroke-dashoffset (a compositor-friendly paint on the GPU in
 * modern engines, and cheap regardless since the path is ~500px long).
 *
 * `replay` is the interaction hook: pass a value that changes when the chart is
 * showing different data (a selected tab, say) and the draw runs again. It has
 * to be a prop rather than the caller simply re-keying this component, because
 * a remount restarts the IntersectionObserver gate — and that gate is built for
 * "scrolled into view", not "replaced in place". Remounted below the fold, the
 * chart measures its path, finds itself not yet in view, and animates its line
 * *backwards* into the undrawn state; remounted in view, it arrives already
 * drawn and there is no animation at all. Replaying explicitly avoids both.
 */
export default function AnimatedChart({
  d,
  fillD,
  stroke = "#0F5CBF",
  fill = "rgba(13,90,140,.08)",
  strokeWidth = 5,
  viewBox = "0 0 520 210",
  points = 5,
  gridLines = [],
  gridWidth = 520,
  label,
  className = "",
  replay,
}) {
  const [wrapRef, inView] = useInView({ threshold: 0.25 });
  const reduced = useReducedMotion();
  const pathRef = useRef(null);
  const [length, setLength] = useState(0);
  const [dots, setDots] = useState([]);
  // `parked` is the single undrawn frame a replay needs so the browser has a
  // state to animate away from; `cycle` re-keys the live point's pulse, which is
  // a CSS animation and so only restarts on a fresh element.
  const [parked, setParked] = useState(false);
  const [cycle, setCycle] = useState(0);
  const lastReplay = useRef(replay);

  // Measure once the path exists. Falls back silently if the browser has no
  // path-measurement support (the line still draws; only the dots are skipped).
  useEffect(() => {
    const path = pathRef.current;
    if (!path?.getTotalLength) return;
    const total = path.getTotalLength();
    setLength(total);

    if (!path.getPointAtLength || points < 2) return;
    const next = [];
    for (let i = 0; i < points; i += 1) {
      const at = (total * i) / (points - 1);
      const { x, y } = path.getPointAtLength(at);
      next.push({ x, y });
    }
    setDots(next);
  }, [d, points]);

  // Park undrawn for one painted frame, then release. Two rAFs, because a state
  // change and its release inside a single frame collapse into one paint and the
  // transition never has a start value to run from.
  useEffect(() => {
    if (lastReplay.current === replay) return;
    lastReplay.current = replay;
    // Nothing to replay if the chart has not been watched yet, or if the visitor
    // asked for no motion: the new data is simply there.
    if (reduced || !inView) return;

    setParked(true);
    setCycle(c => c + 1);

    let inner;
    const outer = requestAnimationFrame(() => { inner = requestAnimationFrame(() => setParked(false)); });
    return () => {
      cancelAnimationFrame(outer);
      if (inner) cancelAnimationFrame(inner);
    };
  }, [replay, reduced, inView]);

  const drawn = reduced || (inView && length > 0 && !parked);
  const drawDuration = reduced ? 0 : D.activity;
  // Erasing has to be instant; only the draw is animated.
  const ease = (property, duration, delay = 0) => (parked ? "none" : `${property} ${duration}ms ${EASE} ${delay}ms`);

  return (
    <div ref={wrapRef} className={className}>
      {/* overflow="visible" because the final data point sits exactly on the
          path's end at the viewBox edge; the default `hidden` clips its right
          half. It overhangs into the card's existing padding, so nothing shifts. */}
      <svg viewBox={viewBox} className="w-full" overflow="visible" role="img" aria-label={label}>
        {gridLines.map((y) => (
          <line key={y} x1="0" y1={y} x2={gridWidth} y2={y} stroke="currentColor" opacity=".06" />
        ))}

        {fillD && (
          <path
            d={fillD}
            fill={fill}
            style={{
              opacity: drawn ? 1 : 0,
              transition: reduced ? "none" : ease("opacity", D.reveal, Math.round(drawDuration * 0.45)),
            }}
          />
        )}

        <path
          ref={pathRef}
          d={d}
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          style={
            length && !reduced
              ? {
                  strokeDasharray: length,
                  strokeDashoffset: drawn ? 0 : length,
                  transition: ease("stroke-dashoffset", drawDuration),
                }
              : undefined
          }
        />

        {dots.map((dot, index) => {
          const isLive = index === dots.length - 1;
          // Dots land just behind the line's own drawing head.
          const delay = reduced ? 0 : Math.round(drawDuration * 0.55) + index * STAGGER;
          return (
            <g
              key={`${dot.x}-${dot.y}`}
              style={{
                opacity: drawn ? 1 : 0,
                transition: reduced ? "none" : ease("opacity", D.fast, delay),
              }}
            >
              {/* The live point is the only green thing in the chart: one
                  reading is currently arriving, the rest are history. It pings
                  three times and stops — the dashboard has to end stable.
                  Mounted only once in view, so those three pings can't be spent
                  while the section is still below the fold. */}
              {isLive && inView && !reduced && (
                <circle
                  key={`pulse-${cycle}`}
                  cx={dot.x}
                  cy={dot.y}
                  r="11"
                  fill={activityAlpha(0.18)}
                  className="motion-data-pulse"
                  style={{ animationDelay: `${delay + 120}ms`, transformOrigin: `${dot.x}px ${dot.y}px` }}
                />
              )}
              <circle
                cx={dot.x}
                cy={dot.y}
                r={isLive ? 6 : 4}
                fill={isLive ? activityGreen : stroke}
                stroke="#FFFFFF"
                strokeWidth="2"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
