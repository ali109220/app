"use client";

import { useEffect, useRef, useState } from "react";

export default function CountUp({ to, prefix = "", suffix = "" }) {
  const ref = useRef(null);
  const [value, setValue] = useState(to);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const media = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    let frame;
    let observer;
    let start;
    let started = false;

    const finish = () => {
      if (frame) cancelAnimationFrame(frame);
      observer?.disconnect();
      setValue(to);
    };

    if (media?.matches || !("IntersectionObserver" in window)) {
      finish();
      return;
    }

    const rect = element.getBoundingClientRect();
    if (rect.top <= window.innerHeight + 60) {
      finish();
      return;
    }

    setValue(0);
    const animate = () => {
      if (started) return;
      started = true;
      const duration = 1600;
      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min(1, (timestamp - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.floor(to * eased));
        if (progress < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    };

    observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        animate();
      },
      { rootMargin: "0px 0px 60px 0px", threshold: 0.01 },
    );

    observer.observe(element);
    const onMotionChange = (event) => {
      if (event.matches) finish();
    };
    media?.addEventListener?.("change", onMotionChange);

    return () => {
      observer?.disconnect();
      if (frame) cancelAnimationFrame(frame);
      media?.removeEventListener?.("change", onMotionChange);
    };
  }, [to]);

  const finalValue = `${prefix}${to}${suffix}`;
  return (
    <span ref={ref} aria-label={finalValue}>
      <span aria-hidden="true">{prefix}{value}{suffix}</span>
    </span>
  );
}
