"use client";

import { useEffect, useRef, useState } from "react";

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Reactive reduced-motion state. Returns `true` when the user has asked for
 * reduced motion, and updates if they change the setting mid-session.
 *
 * Starts `false` so server and first client render agree; the effect corrects
 * it before paint-relevant animations are allowed to start.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia?.(REDUCED_QUERY);
    if (!media) return;
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener?.("change", sync);
    return () => media.removeEventListener?.("change", sync);
  }, []);

  return reduced;
}

/**
 * Same signal as useReducedMotion but written to a ref, for use inside
 * high-frequency handlers (pointermove, rAF loops) where a state read would
 * force a re-render per event.
 */
export function useReducedMotionRef() {
  const reduced = useRef(false);

  useEffect(() => {
    const media = window.matchMedia?.(REDUCED_QUERY);
    if (!media) return;
    const sync = () => { reduced.current = media.matches; };
    sync();
    media.addEventListener?.("change", sync);
    return () => media.removeEventListener?.("change", sync);
  }, []);

  return reduced;
}

/**
 * Fires once, when the element first enters the viewport.
 *
 * IntersectionObserver only — no scroll listeners, so adding hundreds of these
 * costs nothing per frame. Disconnects itself on first intersection: entrance
 * animations must never re-run when the user scrolls back up.
 *
 * The defaults are deliberately forgiving. A larger bottom inset combined with a
 * meaningful threshold (say -12% and 0.15) leaves an element that comes to rest
 * inside the viewport's bottom band sitting there fully transparent — it never
 * crosses the threshold, so it stays blank until the visitor happens to scroll
 * further. Triggering on the first sliver instead keeps the reveal feeling
 * deliberate while guaranteeing nothing visible is ever left invisible.
 *
 * Under reduced motion (or without IO support) it reports `true` immediately,
 * so callers render their final state and skip animating entirely.
 *
 * @returns [ref, inView]
 */
export function useInView({ rootMargin = "0px 0px -8% 0px", threshold = 0.01 } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (reduced || !("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setInView(true);
        observer.disconnect();
      },
      { rootMargin, threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [reduced, rootMargin, threshold]);

  return [ref, inView];
}

/** True on pointer-coarse / no-hover devices — used to skip cursor parallax. */
export function useHasFinePointer() {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const media = window.matchMedia?.("(hover: hover) and (pointer: fine)");
    if (!media) return;
    const sync = () => setFine(media.matches);
    sync();
    media.addEventListener?.("change", sync);
    return () => media.removeEventListener?.("change", sync);
  }, []);

  return fine;
}
