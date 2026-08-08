"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";

export default function ClientRuntime() {
  const pathname = usePathname();
  const isInitialRoute = useRef(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (isInitialRoute.current) {
      isInitialRoute.current = false;
      return;
    }

    const frame = requestAnimationFrame(() => {
      document.getElementById("main-content")?.focus({ preventScroll: true });
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    let cancelled = false;
    const refresh = () => {
      if (cancelled) return;
      window.dispatchEvent(new Event("resize"));
      window.dispatchEvent(new Event("scroll"));
    };

    const raf = requestAnimationFrame(() => requestAnimationFrame(refresh));
    document.fonts?.ready?.then(refresh).catch(() => {});
    window.addEventListener("load", refresh, { once: true });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("load", refresh);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let cancelIdle;
    let animationFrame;
    let lenis;

    const start = async () => {
      const { default: Lenis } = await import("lenis");
      if (disposed) return;

      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      const loop = (time) => {
        lenis.raf(time);
        animationFrame = requestAnimationFrame(loop);
      };
      animationFrame = requestAnimationFrame(loop);
    };

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(start, { timeout: 1200 });
      cancelIdle = () => window.cancelIdleCallback(idleId);
    } else {
      const timeoutId = window.setTimeout(start, 350);
      cancelIdle = () => window.clearTimeout(timeoutId);
    }

    return () => {
      disposed = true;
      cancelIdle?.();
      if (animationFrame) cancelAnimationFrame(animationFrame);
      lenis?.destroy();
    };
  }, []);

  return <Toaster theme="dark" position="bottom-right" richColors />;
}
