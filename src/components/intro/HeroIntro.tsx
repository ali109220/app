"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { introStrings, type CaptionIndex } from "./introStrings";
import type { IntroScene, IntroQuality } from "./introScene";

const STORAGE_KEY = "tayseer_intro_shown_v1";
const READINESS_BUDGET_MS = 1200;
const EXIT_FADE_MS = 450;

type Phase = "idle" | "loading" | "playing" | "completing" | "skipping" | "done" | "cancelled";

// Once a phase reaches one of these, the state machine must never go back to
// loading/playing — late async work (chunk load, texture load) is ignored.
const TERMINAL_OR_EXITING: ReadonlySet<Phase> = new Set(["completing", "skipping", "done", "cancelled"]);

function computeQuality(): IntroQuality {
  const mobile =
    window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(max-width: 767px)").matches;
  const rawDpr = window.devicePixelRatio || 1;
  return { dpr: Math.min(rawDpr, mobile ? 1.0 : 1.5), reducedEffects: mobile };
}

function GrainOverlay() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[.045] mix-blend-overlay"
      xmlns="http://www.w3.org/2000/svg"
    >
      <filter id="tayseer-intro-grain">
        <feTurbulence type="fractalNoise" baseFrequency={0.9} numOctaves={2} />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#tayseer-intro-grain)" />
    </svg>
  );
}

export default function HeroIntro() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [captionIndex, setCaptionIndex] = useState<CaptionIndex | null>(null);
  const [reducedEffects, setReducedEffects] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const flashRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<IntroScene | null>(null);

  // Gate check — runs once, after window "load". Nothing in this component paints
  // anything before this fires, so the real homepage content always gets an
  // uncontested run at becoming the page's Largest Contentful Paint candidate
  // before this full-viewport overlay can ever compete for it.
  useEffect(() => {
    let cancelled = false;
    const runGateCheck = () => {
      if (cancelled) return;
      let shown = true;
      try {
        shown = window.localStorage.getItem(STORAGE_KEY) === "1";
      } catch {
        shown = true; // localStorage unavailable/throwing → fail safe, never attempt the intro
      }
      const reducedMotion =
        typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (shown || reducedMotion) {
        setPhase("cancelled");
        return;
      }
      setPhase("loading");
    };

    if (document.readyState === "complete") {
      runGateCheck();
    } else {
      window.addEventListener("load", runGateCheck, { once: true });
    }
    return () => {
      cancelled = true;
      window.removeEventListener("load", runGateCheck);
    };
  }, []);

  const beginExit = useCallback((kind: "completing" | "skipping") => {
    setPhase((prev) => (TERMINAL_OR_EXITING.has(prev) ? prev : kind));
  }, []);

  // Load + readiness-budget race. Runs once, when phase becomes "loading".
  useEffect(() => {
    if (phase !== "loading") return;
    let settled = false;
    let sceneLocal: IntroScene | null = null;

    const timeoutId = window.setTimeout(() => {
      if (settled) return;
      settled = true;
      sceneLocal?.dispose();
      sceneRef.current = null;
      setPhase("cancelled");
    }, READINESS_BUDGET_MS);

    (async () => {
      try {
        const quality = computeQuality();
        setReducedEffects(quality.reducedEffects);
        const mod = await import("./introScene");
        if (settled || !canvasRef.current || !flashRef.current) return;

        const scene = mod.createIntroScene(
          { canvas: canvasRef.current, flash: flashRef.current },
          quality,
          {
            onCaptionChange: setCaptionIndex,
            onComplete: () => beginExit("completing")
          }
        );
        sceneLocal = scene;
        sceneRef.current = scene;

        await scene.ready;
        if (settled) {
          // readiness budget already expired — the timeout branch disposed sceneLocal
          return;
        }
        settled = true;
        window.clearTimeout(timeoutId);
        setPhase("playing");
        scene.play();
      } catch {
        if (settled) return;
        settled = true;
        window.clearTimeout(timeoutId);
        sceneLocal?.dispose();
        sceneRef.current = null;
        setPhase("cancelled");
      }
    })();

    return () => {
      // Unmounted while still loading (e.g. route change, StrictMode double-invoke).
      if (settled) return;
      settled = true;
      window.clearTimeout(timeoutId);
      sceneLocal?.dispose();
      sceneRef.current = null;
    };
  }, [phase, beginExit]);

  // Playback-only concerns: visibility pause/resume, Escape-to-skip, pointer parallax.
  useEffect(() => {
    if (phase !== "playing") return;
    const scene = sceneRef.current;
    if (!scene) return;

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") scene.resumeRendering();
      else scene.pauseRendering();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") beginExit("skipping");
    };
    window.addEventListener("keydown", onKeyDown);

    const pointerAllowed =
      window.matchMedia("(pointer: fine)").matches &&
      window.matchMedia("(hover: hover)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let onPointerMove: ((e: PointerEvent) => void) | null = null;
    if (pointerAllowed) {
      scene.setPointerEnabled(true);
      onPointerMove = (e: PointerEvent) => {
        const nx = (e.clientX / window.innerWidth) * 2 - 1;
        const ny = (e.clientY / window.innerHeight) * 2 - 1;
        scene.setPointerTarget(nx, ny);
      };
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("keydown", onKeyDown);
      if (onPointerMove) window.removeEventListener("pointermove", onPointerMove);
      scene.setPointerEnabled(false);
    };
  }, [phase, beginExit]);

  // Exit sequence: stop immediately (freeze last frame), persist, fade the overlay
  // out over the CSS transition, then fully dispose and unmount.
  useEffect(() => {
    if (phase !== "completing" && phase !== "skipping") return;
    sceneRef.current?.stop();
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // fail safe — worst case the intro can play again next visit
    }
    const fadeTimer = window.setTimeout(() => {
      sceneRef.current?.dispose();
      sceneRef.current = null;
      setPhase("done");
    }, EXIT_FADE_MS);
    return () => window.clearTimeout(fadeTimer);
  }, [phase]);

  // Unmount safety net regardless of which phase we were in.
  useEffect(() => {
    return () => {
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, []);

  if (phase === "idle" || phase === "cancelled" || phase === "done") return null;
  if (typeof document === "undefined") return null;

  const visible = phase === "playing";
  const exiting = phase === "completing" || phase === "skipping";

  // Portalled straight to <body>: PageTransition's route-enter animation makes
  // .page-transition-shell a permanent stacking-context root (any element with a
  // non-"none" animation-name is one, per spec, for as long as that animation-name
  // stays applied — animation-fill-mode:both never removes it). Rendered inside
  // <main> like a normal child, this overlay's z-[200] would only ever rank against
  // siblings inside that trapped context and could never out-stack the header's
  // z-50. Portalling escapes it without touching PageTransition or the header.
  return createPortal(
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-[200] overflow-hidden bg-[#060B16] transition-opacity ease-out",
        visible ? "opacity-100 duration-300" : "opacity-0"
      )}
      style={{ transitionDuration: exiting ? `${EXIT_FADE_MS}ms` : visible ? undefined : "0ms" }}
    >
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={introStrings.ariaLabel}
        className="absolute inset-0 h-full w-full"
        style={{ pointerEvents: "none" }}
      />
      <div ref={flashRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-[5] bg-white" style={{ opacity: 0 }} />
      {/* Nothing below is mounted while still loading — an invisible-but-focusable
          Skip button would otherwise sit in the tab order before there's anything
          to skip. */}
      {phase !== "loading" && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 45%, rgba(0,0,0,.55) 100%)" }}
          />
          {!reducedEffects && <GrainOverlay />}
          {/* Full-width flex row for centering only — it holds no text itself. The
              text lives in an inline-block child sized to its own content, not the
              viewport: a full-viewport-width text block is exactly the shape of
              element Chrome's LCP heuristic favors, and this overlay must never
              win (or even compete for) the page's Largest Contentful Paint. */}
          <div className="pointer-events-none absolute start-0 end-0 flex justify-center" style={{ bottom: "9%" }}>
            <span
              aria-live="polite"
              className="inline-block text-center"
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "clamp(18px,2.6vw,34px)",
                color: "#F4F7FC",
                textShadow: "0 2px 18px rgba(0,0,0,.6)",
                letterSpacing: ".01em",
                opacity: captionIndex ? 1 : 0,
                transition: "opacity .5s ease"
              }}
            >
              {captionIndex ? introStrings.captions[captionIndex] : ""}
            </span>
          </div>
          <div className="pointer-events-none absolute start-0 end-0 flex justify-center" style={{ bottom: "4%" }} aria-hidden="true">
            <span
              className="inline-block text-center"
              style={{ color: "#8fb3ff", fontFamily: "Arial, sans-serif", fontSize: 12, letterSpacing: ".25em", opacity: 0.85 }}
            >
              TAYSEER — AI &amp; DIGITAL BANKING SOLUTIONS
            </span>
          </div>
          <button
            type="button"
            onClick={() => beginExit("skipping")}
            className="pointer-events-auto absolute top-4 end-4 z-10 rounded-full border border-white/25 bg-black/40 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-black/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F6FEF]"
          >
            {introStrings.skip}
          </button>
        </>
      )}
    </div>,
    document.body
  );
}
