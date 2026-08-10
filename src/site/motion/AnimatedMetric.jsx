"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "./hooks";
import { D } from "./tokens";

// Splits a display value into the parts we can and can't count.
// "$2.45B" -> { prefix: "$", number: 2.45, decimals: 2, suffix: "B" }
// "AI-ready" -> null (nothing numeric; render verbatim)
const NUMERIC = /^([^\d-]*)(-?\d+(?:\.\d+)?)(.*)$/s;

function parse(value) {
  const match = NUMERIC.exec(String(value));
  if (!match) return null;
  const [, prefix, digits, suffix] = match;
  const dot = digits.indexOf(".");
  return {
    prefix,
    target: Number(digits),
    decimals: dot === -1 ? 0 : digits.length - dot - 1,
    suffix,
  };
}

/**
 * Counts a metric up to the value already present in the design.
 *
 * It never invents a number: the target is parsed out of the string the
 * component was given, and the rendered end state is byte-identical to that
 * string. Non-numeric values (a tab that swaps "$2.45B" for "AI-ready") are
 * passed straight through.
 *
 * Runs once, on first viewport entry. Screen readers get the final value only —
 * the ticking digits are aria-hidden so nothing announces "2, 2.1, 2.2…".
 */
export default function AnimatedMetric({ value, duration = D.activity, className = "", style }) {
  const parsed = parse(value);
  const [ref, inView] = useInView({ threshold: 0.3 });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!parsed || !inView || reduced || hasRun.current) return;
    hasRun.current = true;

    const { target, decimals } = parsed;
    let frame;
    let startedAt;

    const step = (now) => {
      if (startedAt === undefined) startedAt = now;
      const progress = Math.min(1, (now - startedAt) / duration);
      // easeOutCubic — fast off the mark, settles rather than stops.
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay((target * eased).toFixed(decimals));
      if (progress < 1) frame = requestAnimationFrame(step);
      else setDisplay(null); // hand back to the verbatim value
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
    // `parsed` is derived from `value`; depending on it directly would restart
    // the count whenever the parent re-renders with an equal string.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, inView, reduced, duration]);

  if (!parsed) {
    return <span ref={ref} className={className} style={style}>{value}</span>;
  }

  const counting = display !== null;

  return (
    <span ref={ref} className={className} style={style} role="text" aria-label={String(value)}>
      <span aria-hidden="true">
        {counting ? `${parsed.prefix}${display}${parsed.suffix}` : value}
      </span>
    </span>
  );
}
