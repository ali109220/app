"use client";

import { useEffect, useRef } from "react";

function useReducedMotionRef() {
  const reduced = useRef(false);

  useEffect(() => {
    const media = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!media) return;
    const sync = () => { reduced.current = media.matches; };
    sync();
    media.addEventListener?.("change", sync);
    return () => media.removeEventListener?.("change", sync);
  }, []);

  return reduced;
}

export function SpotlightStage({ children, className = "" }) {
  const ref = useRef(null);
  const reduced = useReducedMotionRef();
  const frame = useRef(null);

  const onMove = (event) => {
    const element = ref.current;
    if (reduced.current || !element) return;
    const clientX = event.clientX;
    const clientY = event.clientY;
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const rect = element.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 100;
      const y = ((clientY - rect.top) / rect.height) * 100;
      element.style.backgroundImage = `radial-gradient(circle at ${x}% ${y}%, rgba(13,90,140,.055), transparent 26%)`;
    });
  };

  useEffect(() => () => {
    if (frame.current) cancelAnimationFrame(frame.current);
  }, []);

  return <div ref={ref} onPointerMove={onMove} className={`relative ${className}`}>{children}</div>;
}

export function DepthCard({ children, className = "" }) {
  const ref = useRef(null);
  const reduced = useReducedMotionRef();
  const frame = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    element.style.transition = "transform .22s cubic-bezier(.2,.8,.2,1)";
    element.style.transformStyle = "preserve-3d";
  }, []);

  const onMove = (event) => {
    const element = ref.current;
    if (reduced.current || !element) return;
    const clientX = event.clientX;
    const clientY = event.clientY;
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const rect = element.getBoundingClientRect();
      const px = (clientX - rect.left) / rect.width - .5;
      const py = (clientY - rect.top) / rect.height - .5;
      element.style.transform = `perspective(900px) rotateX(${(-py * 3).toFixed(2)}deg) rotateY(${(px * 4).toFixed(2)}deg) translateZ(0)`;
    });
  };

  const reset = () => {
    if (frame.current) cancelAnimationFrame(frame.current);
    if (ref.current) ref.current.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  };

  useEffect(() => () => {
    if (frame.current) cancelAnimationFrame(frame.current);
  }, []);

  return <div ref={ref} onPointerMove={onMove} onPointerLeave={reset} className={className}>{children}</div>;
}

export function MotionSignal({ className = "" }) {
  return <span className={`relative inline-flex h-2 w-2 ${className}`} aria-hidden="true"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-30 motion-reduce:animate-none" /><span className="relative inline-flex h-2 w-2 rounded-full bg-current" /></span>;
}
