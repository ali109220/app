"use client";

/*
 * Tayseer entrance intro — a one-time arrival sequence that plays *over* an
 * already-rendered homepage.
 *
 * Architectural contract (do not break these):
 *  - This component never wraps `children`. It is mounted as a SIBLING in the
 *    root layout. It renders `null` on the server and on the hydration pass,
 *    so it cannot delay rendering, hydration, data fetching or LCP.
 *  - The scene is ~20 divs plus one inline SVG driven entirely by CSS 3D
 *    transforms. No 3D library, no model files, no network requests, no images
 *    beyond the brand logo the header already loads.
 *  - `filter` must NEVER be applied to `.drift` or `.world`. A filter flattens
 *    the 3D rendering context and the entire scene collapses to a plane.
 *
 * Geometry: camera eye level is world y = 0, ground plane is y = 280. On a
 * 300-unit man that is ~1.63 m — real eye height. Do not lower it.
 */

import { useCallback, useEffect, useRef, useState } from "react";

/* Master duration --T is 5.5s (see the stylesheet below). The overlay starts
 * fading at T - 0.1s and the component unmounts 0.4s after that. */
const TOTAL_MS = 5900;
/* prefers-reduced-motion: doors already open, no walk, straight to the reveal. */
const REDUCED_TOTAL_MS = 750;

const SESSION_KEY = "tayseer-intro-seen";

type Tier = "high" | "med" | "low";

/* Decided once per page load and cached at module scope. React StrictMode
 * double-invokes effects in development; without this the second invocation
 * would read the session flag written by the first and suppress the intro. */
let decision: { play: boolean; reduced: boolean; tier: Tier } | null = null;

function readSession(key: string): string | null {
  /* sessionStorage throws outright in some embedded/partitioned contexts. */
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeSession(key: string, value: string): void {
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    /* Non-fatal: worst case the intro plays again next navigation. */
  }
}

/* Runtime flag resolution, cheapest source first. All synchronous — nothing
 * here can delay the first frame. */
function flagEnabled(): boolean {
  const w = window as unknown as Record<string, unknown>;

  /* QA overrides: ?intro=on / ?intro=off */
  try {
    const q = new URLSearchParams(window.location.search).get("intro");
    if (q === "off" || q === "0") return false;
    if (q === "on" || q === "1") return true;
  } catch {
    /* ignore */
  }

  /* /intro-flag.js — editable on the host without a rebuild. Loaded `async`
   * from <head>; it always lands well before hydration completes, but if it
   * somehow has not, fall through to the build-time default. */
  if (typeof w.__TAYSEER_INTRO_ENABLED__ === "boolean") {
    return w.__TAYSEER_INTRO_ENABLED__ as boolean;
  }

  return process.env.NEXT_PUBLIC_INTRO_ENABLED !== "false";
}

/* Lightweight, synchronous capability probe. No measurement, no timers — this
 * must never delay rendering. */
function detectTier(): Tier {
  try {
    const nav = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean };
    };
    if (nav.connection?.saveData) return "low";

    const cores = nav.hardwareConcurrency || 4;
    const mem = nav.deviceMemory ?? 4;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    if (cores <= 4 || mem <= 2) return "low";
    if (cores <= 6 || mem <= 4 || coarse) return "med";
    return "high";
  } catch {
    return "med";
  }
}

function supports3D(): boolean {
  try {
    return (
      typeof CSS !== "undefined" &&
      typeof CSS.supports === "function" &&
      CSS.supports("transform-style", "preserve-3d") &&
      CSS.supports("perspective", "1000px")
    );
  } catch {
    return false;
  }
}

/* The stage is a fixed 1200x720 frame that we scale to cover the viewport, so
 * the framing is identical on a phone and a 34" monitor. */
function coverScale(): number {
  return Math.max(window.innerWidth / 1200, window.innerHeight / 720);
}

export default function TayseerEntrance() {
  const [state, setState] = useState<{
    play: boolean;
    reduced: boolean;
    tier: Tier;
    scale: number;
  } | null>(null);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const parallaxRef = useRef<HTMLDivElement | null>(null);
  const skipRef = useRef<HTMLButtonElement | null>(null);
  const doneRef = useRef(false);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    writeSession(SESSION_KEY, "1");
    setState(null);
  }, []);

  /* ---- Decide whether to play. Runs after mount; renders nothing before. ---- */
  useEffect(() => {
    if (decision === null) {
      const enabled = flagEnabled();
      const seen = readSession(SESSION_KEY) === "1";
      const capable = supports3D();
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      decision = {
        play: enabled && !seen && capable,
        reduced,
        tier: detectTier(),
      };

      /* Written up front, not on completion: a refresh mid-intro must not
       * replay it, and neither must the next route in this session. */
      if (decision.play) writeSession(SESSION_KEY, "1");
    }

    if (!decision.play) return;

    setState({
      play: true,
      reduced: decision.reduced,
      tier: decision.tier,
      scale: coverScale(),
    });
  }, []);

  /* ---- Teardown timer, Escape, resize ---- */
  useEffect(() => {
    if (!state?.play) return;

    const timer = window.setTimeout(
      finish,
      state.reduced ? REDUCED_TOTAL_MS : TOTAL_MS
    );

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
    };

    let raf = 0;
    const onResize = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        rootRef.current?.style.setProperty("--s", String(coverScale()));
      });
    };

    document.addEventListener("keydown", onKey, true);
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("orientationchange", onResize, { passive: true });

    /* The overlay is a full-screen takeover; focusing its escape hatch is the
     * same contract a modal has. preventScroll keeps the page where it was. */
    skipRef.current?.focus({ preventScroll: true });

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onKey, true);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [state?.play, state?.reduced, finish]);

  /* ---- Pointer parallax: max 4px translate / 0.15deg rotate, spring-eased.
   * Applied to a wrapper ABOVE .drift so it never touches the handheld float,
   * and it can never influence the man, the gait, the doors, the lighting or
   * the master duration — it is transform-only on an outer node. ---- */
  useEffect(() => {
    if (!state?.play || state.reduced) return;
    if (state.tier === "low") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const el = parallaxRef.current;
    if (!el) return;

    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    let raf = 0;
    let idle = 0;

    const onMove = (e: PointerEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2; // -1..1
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
      if (!raf) raf = window.requestAnimationFrame(tick);
    };

    const tick = () => {
      /* Critically-damped-ish lerp; reads as spring, costs one multiply. */
      curX += (targetX - curX) * 0.075;
      curY += (targetY - curY) * 0.075;

      el.style.transform =
        `translate3d(${(curX * 4).toFixed(2)}px, ${(curY * 4).toFixed(2)}px, 0) ` +
        `rotateY(${(curX * 0.15).toFixed(3)}deg) ` +
        `rotateX(${(-curY * 0.15).toFixed(3)}deg)`;

      const settled =
        Math.abs(targetX - curX) < 0.001 && Math.abs(targetY - curY) < 0.001;
      idle = settled ? idle + 1 : 0;
      raf = idle > 3 ? 0 : window.requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [state?.play, state?.reduced, state?.tier]);

  if (!state?.play) return null;

  const mod = `${state.tier}${state.reduced ? " rm" : ""}`;

  return (
    <>
      {/* The scene carries no information: it is decorative and fully hidden
          from assistive technology. The Skip control is a SIBLING rather than a
          descendant — a focusable control inside an aria-hidden subtree is
          unreachable to screen-reader users, which would defeat the point. */}
      <div
        ref={rootRef}
        className={`ts-root ${mod}`}
        style={{ ["--s" as string]: String(state.scale) }}
        aria-hidden="true"
        role="presentation"
      >
        <div className="backdrop" />

        {/* Plain wrapper. The scene fade lives here and NOT on any element that
            declares preserve-3d, because a non-1 opacity forces such an element
            back to `transform-style: flat`. */}
        <div className="sceneFade">
          <div className="stage">
            <div className="parallax" ref={parallaxRef}>
              <div className="drift">
                <div className="world">
                  {/* ---- Exterior ground and the last two steps ---- */}
                  <div className="l ground" />
                  <div className="l riser1" />
                  <div className="l tread1" />
                  <div className="l riser2" />
                  <div className="l landing" />

                  {/* ---- Lobby: a genuine room behind the doors, visible
                          through the translucent leaves before they part.

                          It lives in its own 3D rendering context. Chrome sorts
                          a preserve-3d context with a BSP tree over infinite
                          planes, so the side walls at x = +/-450 would slice the
                          1130-wide facade panels into fragments and sort half of
                          each one in front of the room. Isolating the room means
                          its planes never enter the facade's sort; the room then
                          composites as a single quad at z = -1100, which the
                          facade at z = -700 occludes unambiguously.

                          The nested perspective is not an approximation. The eye
                          sits 2100 - dolly in front of this box, so a point at
                          box-local depth zl projects by P/(P - zl) locally and is
                          then scaled by 1000/P with the rest of the world:
                          the product is 1000/(P - zl), which is exactly the
                          projection it would have received in the outer context.
                          Every element keeps its specified world coordinates —
                          only the frame they are expressed in has changed. ---- */}
                  <div className="lobbyBox">
                    <div className="l lobbyFloor" />
                    <div className="l lobbyCeil" />
                    <div className="l lobbyBack" />
                    <div className="l lobbyWallL" />
                    <div className="l lobbyWallR" />
                    <div className="l counter">
                      <span className="counterAccent" />
                    </div>
                  </div>

                  {/* ---- Façade. CSS cannot cut a hole in a div, so the wall is
                          three pieces around a 340x460 opening at x +/-170,
                          y -240..220. ---- */}
                  <div className="l facadeL" />
                  <div className="l facadeR" />
                  <div className="l facadeH" />

                  {/* ---- Doors ---- */}
                  <div className="l doorFrame" />
                  <div className="l leaf leafL" />
                  <div className="l leaf leafR" />

                  <div className="l sensor">
                    <span className="led" />
                    <span className="ledPulse" />
                  </div>

                  {/* ---- Fascia sign: the real brand mark, on a backlit plaque
                          so it reads in its own colours. Not redrawn, not
                          recoloured, not reinterpreted. ---- */}
                  <div className="l sign">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/logo-light.svg" alt="" width={446} height={96} draggable={false} />
                  </div>

                  {/* ---- The man ---- */}
                  <div className="l man">
                    <div className="manRoll">
                      <svg viewBox="0 0 120 300" width="120" height="300" focusable="false">
                        <defs>
                          <linearGradient id="tsClothH" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0" stopColor="#BFB9AB" />
                            <stop offset="0.34" stopColor="#FCFBF7" />
                            <stop offset="0.58" stopColor="#F2EEE4" />
                            <stop offset="1" stopColor="#BFB9AB" />
                          </linearGradient>
                          <linearGradient id="tsClothV" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0.38" stopColor="#6E6659" stopOpacity="0" />
                            <stop offset="1" stopColor="#6E6659" stopOpacity="0.42" />
                          </linearGradient>
                          <linearGradient id="tsGhutraG" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0" stopColor="#D6D0C3" />
                            <stop offset="0.36" stopColor="#FFFFFF" />
                            <stop offset="0.7" stopColor="#F6F3EC" />
                            <stop offset="1" stopColor="#CAC3B4" />
                          </linearGradient>
                          <linearGradient id="tsCentre" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
                            <stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0.3" />
                            <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
                          </linearGradient>
                        </defs>

                        {/* Rear three-quarter view: no face to render, no profile
                            stride to get wrong, and the back of a kandura and
                            ghutra is instantly recognisable at small scale. */}
                        <g className="fig">
                          {/* Sandals sit below the hem; the robe is drawn over
                              them, so a lifted heel reads as the sliver of foot
                              appearing and closing again. */}
                          <g className="footA">
                            <path d="M40 274h18v22q0 4-4 4h-10q-4 0-4-4z" fill="#2A2723" />
                          </g>
                          <g className="footB">
                            <path d="M62 274h18v22q0 4-4 4h-10q-4 0-4-4z" fill="#1E1B18" />
                          </g>

                          {/* Proportions come from the scale the geometry already
                              fixes: 300 units is a 1.73 m man, so one unit is
                              ~5.8 mm and a 40 cm shoulder breadth is ~74 units,
                              a kandura hem ~96. Drawn narrower than that he reads
                              as a bowling pin rather than a person. */}
                          <g className="hem">
                            <path
                              className="robe"
                              d="M23 78C20 130 16 208 12 282L108 282C104 208 100 130 97 78C88 62 32 62 23 78Z"
                              fill="url(#tsClothH)"
                            />
                            <path
                              d="M23 78C20 130 16 208 12 282L108 282C104 208 100 130 97 78C88 62 32 62 23 78Z"
                              fill="url(#tsClothV)"
                            />
                            <path d="M53 84L47 280L73 280L67 84Z" fill="url(#tsCentre)" />
                            {/* Sleeve seams: in rear view the arms are inside the
                                kandura, so they read only as where the sleeve
                                meets the body. */}
                            <g
                              fill="none"
                              stroke="#9C947F"
                              strokeOpacity="0.34"
                              strokeWidth="2"
                              strokeLinecap="round"
                            >
                              <path d="M29 92C27 124 26 158 26 190" />
                              <path d="M91 92C93 124 94 158 94 190" />
                            </g>
                            <g
                              fill="none"
                              stroke="#A79F91"
                              strokeOpacity="0.5"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                            >
                              <path d="M34 98C31 152 26 222 22 279" />
                              <path d="M48 95C46 154 43 225 40 281" />
                              <path d="M72 95C74 154 77 225 80 281" />
                              <path d="M86 98C89 152 94 222 98 279" />
                            </g>
                          </g>

                          {/* A broad drape from crown to mid-back: narrow at the
                              crown, spreading to just inside the shoulder line by
                              shoulder height so the silhouette steps out there
                              instead of reading as one continuous column. */}
                          <g className="ghutra">
                            <path
                              d="M60 11C47 11 41 21 40 34C39 46 39 54 39 62C36 76 31 90 30 106C29 122 30 137 32 147C40 153 50 156 60 156C70 156 80 153 88 147C90 137 91 122 90 106C89 90 84 76 81 62C81 54 81 46 80 34C79 21 73 11 60 11Z"
                              fill="url(#tsGhutraG)"
                            />
                            <g fill="none" stroke="#100E0B" strokeLinecap="round">
                              <path d="M40.5 31C48 25 72 25 79.5 31" strokeWidth="4.6" />
                              <path d="M40 41C48 35.5 72 35.5 80 41" strokeWidth="4" />
                            </g>
                          </g>
                        </g>

                        {/* Rim light. Outside .fig so the interior glow that is
                            dimming him does not dim his own back-lit edge. */}
                        <g className="rim" fill="none" stroke="#EAF6F8" strokeLinejoin="round">
                          <g className="hem">
                            <path
                              d="M23 78C20 130 16 208 12 282L108 282C104 208 100 130 97 78C88 62 32 62 23 78Z"
                              strokeWidth="3"
                            />
                          </g>
                          <g className="ghutra">
                            <path
                              d="M60 11C47 11 41 21 40 34C39 46 39 54 39 62C36 76 31 90 30 106C29 122 30 137 32 147C40 153 50 156 60 156C70 156 80 153 88 147C90 137 91 122 90 106C89 90 84 76 81 62C81 54 81 46 80 34C79 21 73 11 60 11Z"
                              strokeWidth="2.6"
                            />
                          </g>
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---- Light. Outside the 3D context so none of it can flatten the
                world, but pinned to the same scaled stage frame so it stays
                registered with the doorway at any viewport size. ---- */}
        <div className="lightStage">
          <div className="cone" />
          <div className="rays" />
          <div className="flood" />
        </div>
        <div className="wash" />

        <div className="vignette" />
        <div className="grain" />
      </div>

      <button
        ref={skipRef}
        type="button"
        className={`ts-skip ${mod}`}
        onClick={finish}
      >
        Skip intro
      </button>

      <style jsx>{`
        /* ============================== timeline ============================== */
        .ts-root {
          --T: 5.5s;
          --s: 1;
          position: fixed;
          inset: 0;
          z-index: 2147483000;
          overflow: hidden;
          pointer-events: auto;
          background: #05070a;
          animation: tsIn 180ms linear both, tsOut 500ms linear 5.4s forwards;
        }
        @keyframes tsIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes tsOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }

        .backdrop {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(120% 80% at 50% 30%, #101822 0%, #070a0e 55%, #04060a 100%);
        }

        .sceneFade {
          position: absolute;
          inset: 0;
          /* Progressive reveal: as the interior light takes the frame, the scene
             recedes so the already-rendered homepage bleeds through the wash
             rather than being replaced by a hard cut. */
          animation: tsSceneFade var(--T) linear both;
        }
        @keyframes tsSceneFade {
          0%, 88% { opacity: 1; }
          100% { opacity: 0; }
        }

        /* =============================== stage =============================== */
        .stage,
        .lightStage {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 1200px;
          height: 720px;
          margin: 0;
          transform: translate(-50%, -50%) scale(var(--s));
        }
        .stage {
          perspective: 1000px;
          perspective-origin: 50% 44%;
        }
        /* No perspective and no preserve-3d here: these are flat light layers
           that only need to share the stage's framing. */
        .lightStage {
          pointer-events: none;
        }

        .parallax,
        .drift,
        .world {
          position: absolute;
          inset: 0;
          transform-style: preserve-3d;
          /* NEVER add a filter to .drift or .world — it flattens the 3D context
             and the whole scene collapses into a single plane. */
        }

        .drift {
          animation: tsDrift 11s ease-in-out infinite alternate;
        }
        @keyframes tsDrift {
          from { transform: translate3d(-3px, 2px, 0) rotateX(0.06deg) rotateY(-0.1deg); }
          to { transform: translate3d(3px, -2px, 0) rotateX(-0.06deg) rotateY(0.1deg); }
        }

        .world {
          animation: tsDolly var(--T) cubic-bezier(0.4, 0, 0.5, 1) both;
        }
        @keyframes tsDolly {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(0, 0, 240px); }
        }

        /* Every layer is centre-anchored: its own centre sits at the transform
           point, which is what makes the table of coordinates close. */
        .l {
          position: absolute;
          left: 50%;
          top: 50%;
          transform-style: preserve-3d;
          /* Deliberately NOT backface-visibility: hidden. The camera sits at
             y = 0 and the lobby ceiling is at y = -240, so we look at its
             underside — hiding backfaces would erase it. */
        }

        /* ============================== exterior ============================== */
        .ground {
          width: 3000px; height: 1400px; margin: -700px 0 0 -1500px;
          transform: translate3d(0, 280px, 400px) rotateX(90deg);
          background:
            linear-gradient(#0d1218 0%, #12181f 40%, #161d25 100%);
        }
        .riser1 {
          width: 3000px; height: 30px; margin: -15px 0 0 -1500px;
          transform: translate3d(0, 265px, -300px);
          background: linear-gradient(#1b222a, #10151b);
        }
        .tread1 {
          width: 3000px; height: 60px; margin: -30px 0 0 -1500px;
          transform: translate3d(0, 250px, -330px) rotateX(90deg);
          background: linear-gradient(#232b35, #1b222a);
        }
        .riser2 {
          width: 3000px; height: 30px; margin: -15px 0 0 -1500px;
          transform: translate3d(0, 235px, -360px);
          background: linear-gradient(#1e252e, #12171d);
        }
        .landing {
          width: 3000px; height: 340px; margin: -170px 0 0 -1500px;
          transform: translate3d(0, 220px, -530px) rotateX(90deg);
          background:
            linear-gradient(#2a323c 0%, #232a33 55%, #1c222a 100%);
        }

        /* =============================== lobby ===============================
           Box centre is world (0, -10, -1100); children below are the specified
           world coordinates minus that origin. transform-style stays flat (the
           default) so the room composites as one quad in the outer sort, and
           the perspective tracks the dolly: 2100 - 240 * eased-progress, driven
           by the same clock and the same easing as .world, so the two can never
           drift apart. */
        .lobbyBox {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 900px; height: 460px; margin: -230px 0 0 -450px;
          transform: translate3d(0, -10px, -1100px);
          perspective: 2100px;
          /* Projection of the eye onto this plane: the outer perspective-origin
             is world y = -43.2, and this box is centred at world y = -10. */
          perspective-origin: 450px 196.8px;
          animation: tsLobbyPersp var(--T) cubic-bezier(0.4, 0, 0.5, 1) both;
        }
        @keyframes tsLobbyPersp {
          from { perspective: 2100px; }
          to { perspective: 1860px; }
        }

        .lobbyFloor {
          width: 900px; height: 800px; margin: -400px 0 0 -450px;
          transform: translate3d(0, 230px, 0) rotateX(90deg);
          background:
            linear-gradient(#f4f8fb 0%, #dfe8f0 60%, #cfdbe6 100%);
        }
        .lobbyCeil {
          width: 900px; height: 800px; margin: -400px 0 0 -450px;
          transform: translate3d(0, -230px, 0) rotateX(90deg);
          background:
            radial-gradient(60% 60% at 50% 60%, #ffffff 0%, #eef4fa 70%, #dde7f1 100%);
        }
        .lobbyBack {
          width: 900px; height: 460px; margin: -230px 0 0 -450px;
          transform: translate3d(0, 0, -400px);
          background: linear-gradient(#eef4fa, #d5e1ec);
          filter: blur(1.5px);
        }
        .lobbyWallL {
          width: 800px; height: 460px; margin: -230px 0 0 -400px;
          transform: translate3d(-450px, 0, 0) rotateY(90deg);
          background: linear-gradient(90deg, #c9d7e4, #e6eef6);
        }
        .lobbyWallR {
          width: 800px; height: 460px; margin: -230px 0 0 -400px;
          transform: translate3d(450px, 0, 0) rotateY(-90deg);
          background: linear-gradient(90deg, #e6eef6, #c9d7e4);
        }
        .counter {
          width: 380px; height: 120px; margin: -60px 0 0 -190px;
          transform: translate3d(0, 170px, -260px);
          background: linear-gradient(#0d5a8c, #0a4770);
        }
        .counterAccent {
          position: absolute;
          left: 0; right: 0; top: 0;
          height: 5px;
          background: #62a945;
        }

        /* ============================== façade ==============================
           Opening is 340x460 at x +/-170, y -240..220. */
        .facadeL,
        .facadeR {
          width: 1130px; height: 1400px; margin: -700px 0 0 -565px;
          background:
            linear-gradient(180deg, #0a0f15 0%, #10171f 62%, #161f29 100%);
          border-bottom: 2px solid #29333f;
        }
        .facadeL { transform: translate3d(-735px, -480px, -700px); }
        .facadeR { transform: translate3d(735px, -480px, -700px); }
        .facadeH {
          width: 340px; height: 940px; margin: -470px 0 0 -170px;
          transform: translate3d(0, -710px, -700px);
          background: linear-gradient(180deg, #0a0f15 0%, #141c25 100%);
        }

        /* =============================== doors =============================== */
        .doorFrame {
          width: 360px; height: 480px; margin: -240px 0 0 -180px;
          transform: translate3d(0, -10px, -699px);
          border: 10px solid #78848f;
          box-sizing: border-box;
          background: transparent;
        }

        /* Translucent glass: the lobby behind is genuinely occluded and
           genuinely visible through the leaves. Not a painted effect. */
        .leaf {
          width: 172px; height: 460px; margin: -230px 0 0 -86px;
          background: rgba(206, 232, 245, 0.16);
          box-shadow:
            inset 0 0 0 1px rgba(255, 255, 255, 0.28),
            inset 0 40px 70px rgba(255, 255, 255, 0.12);
          overflow: hidden;
          will-change: transform;
        }
        .leaf::after {
          content: "";
          position: absolute;
          inset: -40%;
          background: linear-gradient(
            108deg,
            transparent 34%,
            rgba(255, 255, 255, 0.24) 46%,
            rgba(255, 255, 255, 0.06) 54%,
            transparent 66%
          );
          animation: tsSheen 9s ease-in-out infinite alternate;
        }
        @keyframes tsSheen {
          from { transform: translate3d(-7%, -3%, 0); }
          to { transform: translate3d(7%, 3%, 0); }
        }

        .leafL {
          animation: tsLeafL var(--T) cubic-bezier(0.35, 0, 0.12, 1) both;
        }
        .leafR {
          animation: tsLeafR var(--T) cubic-bezier(0.35, 0, 0.12, 1) both;
        }
        @keyframes tsLeafL {
          0%, 57% { transform: translate3d(-86px, -10px, -688px); }
          73%, 100% { transform: translate3d(-262px, -10px, -688px); }
        }
        @keyframes tsLeafR {
          0%, 57% { transform: translate3d(86px, -10px, -688px); }
          73%, 100% { transform: translate3d(262px, -10px, -688px); }
        }

        .sensor {
          width: 54px; height: 12px; margin: -6px 0 0 -27px;
          transform: translate3d(0, -252px, -698px);
          background: #14191f;
          border-radius: 2px;
        }
        .led {
          position: absolute;
          top: 3px; left: 24px;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #5a6068;
          animation: tsLed var(--T) steps(1) both;
        }
        @keyframes tsLed {
          0% { background: #5a6068; box-shadow: none; }
          54%, 100% {
            background: #62a945;
            box-shadow: 0 0 8px 2px rgba(98, 169, 69, 0.8);
          }
        }
        .ledPulse {
          position: absolute;
          top: 3px; left: 24px;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: rgba(98, 169, 69, 0.55);
          opacity: 0;
          animation: tsLedPulse 1.5s ease-out 2.97s infinite;
        }
        @keyframes tsLedPulse {
          0% { opacity: 0.75; transform: scale(1); }
          70%, 100% { opacity: 0; transform: scale(3.4); }
        }

        /* ============================== fascia sign ==============================
           Backlit plaque so the real mark reads in its own colours. */
        .sign {
          width: 760px; height: 96px; margin: -48px 0 0 -380px;
          transform: translate3d(0, -340px, -698px);
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(#ffffff, #eef3f8);
          box-shadow: 0 0 44px 8px rgba(214, 234, 250, 0.28);
        }
        .sign img {
          height: 62px;
          width: auto;
          display: block;
        }

        /* ================================ man ================================ */
        .man {
          width: 120px; height: 300px; margin: -150px 0 0 -60px;
          animation: tsWalk var(--T) linear both;
        }
        /* Linear, because a constant stride requires a constant speed. Feet sit
           on the floor plane at every keyframe: 280 = ground, 250 = tread 1,
           220 = landing and lobby floor. */
        @keyframes tsWalk {
          0%, 5% { transform: translate3d(0, 130px, -60px); }
          31% { transform: translate3d(0, 130px, -300px); }
          34% { transform: translate3d(0, 100px, -330px); }
          38% { transform: translate3d(0, 70px, -370px); }
          96%, 100% { transform: translate3d(0, 70px, -895px); }
        }

        /* 200 world units per 1.2s cycle; 835 units in 5.0s. The fractional
           iteration count stops the cycle exactly when travel stops. */
        .manRoll {
          position: absolute;
          inset: 0;
          animation: tsRoll 1.2s ease-in-out 0.275s 4.17 both;
        }
        @keyframes tsRoll {
          0% { transform: rotate(-1.1deg) translateY(0); }
          25% { transform: rotate(0deg) translateY(4px); }
          50% { transform: rotate(1.1deg) translateY(0); }
          75% { transform: rotate(0deg) translateY(4px); }
          100% { transform: rotate(-1.1deg) translateY(0); }
        }

        .manRoll :global(svg) {
          display: block;
          width: 120px;
          height: 300px;
          overflow: visible;
        }

        /* He goes backlit as the interior light takes over behind him. The
           filter is on a leaf group, never on .drift or .world. */
        .manRoll :global(.fig) {
          animation: tsDim var(--T) linear both;
        }
        @keyframes tsDim {
          0%, 52% { filter: brightness(1); }
          100% { filter: brightness(0.3); }
        }

        .manRoll :global(.hem) {
          transform-box: view-box;
          transform-origin: 60px 70px;
          animation: tsSway 1.2s ease-in-out 0.275s 4.17 both;
        }
        /* Same curve as the hem but 135ms later, so the headdress lags the body.
           This offset is the single largest realism gain in the sequence.
           Do not sync it. */
        .manRoll :global(.ghutra) {
          transform-box: view-box;
          transform-origin: 60px 24px;
          animation: tsSway 1.2s ease-in-out 0.41s 4.17 both;
        }
        @keyframes tsSway {
          0% { transform: rotate(-1.6deg); }
          50% { transform: rotate(1.6deg); }
          100% { transform: rotate(-1.6deg); }
        }

        .manRoll :global(.footA),
        .manRoll :global(.footB) {
          transform-box: fill-box;
          transform-origin: 50% 100%;
        }
        .manRoll :global(.footA) {
          animation: tsStepA 1.2s ease-in-out 0.275s 4.17 both;
        }
        .manRoll :global(.footB) {
          animation: tsStepB 1.2s ease-in-out 0.275s 4.17 both;
        }
        @keyframes tsStepA {
          0%, 100% { transform: none; }
          25% { transform: translateY(-9px) scaleY(0.86); }
          50%, 75% { transform: none; }
        }
        @keyframes tsStepB {
          0%, 50% { transform: none; }
          75% { transform: translateY(-9px) scaleY(0.86); }
          100% { transform: none; }
        }

        .manRoll :global(.rim) {
          opacity: 0;
          filter: blur(2.6px);
          animation: tsRim var(--T) linear both;
        }
        @keyframes tsRim {
          0%, 55% { opacity: 0; }
          80%, 100% { opacity: 0.85; }
        }

        /* ============================== light ============================== */
        .cone {
          position: absolute;
          left: 50%;
          top: 47%;
          width: 520px;
          height: 620px;
          margin: -310px 0 0 -260px;
          opacity: 0;
          /* Deliberately no filter: blur(). This element animates transform as
             well as opacity, and a blurred element that is also being scaled
             re-rasters its blur every frame — measured at 4x CPU throttle on a
             393px mobile viewport that single property was the difference
             between 30fps and 60fps for the whole intro. A multi-stop radial
             gradient is already a blur, and costs nothing. */
          background: radial-gradient(
            46% 50% at 50% 34%,
            rgba(255, 253, 247, 0.94) 0%,
            rgba(248, 251, 255, 0.66) 20%,
            rgba(232, 243, 255, 0.4) 40%,
            rgba(216, 235, 255, 0.18) 60%,
            rgba(205, 229, 255, 0.05) 76%,
            rgba(200, 226, 255, 0) 88%
          );
          animation: tsCone var(--T) ease-in both;
        }
        @keyframes tsCone {
          0%, 57% { opacity: 0; transform: scale(0.72, 0.6); }
          100% { opacity: 1; transform: scale(1.35, 1.5); }
        }

        .rays {
          position: absolute;
          left: 50%;
          top: 47%;
          width: 1100px;
          height: 1100px;
          margin: -550px 0 0 -550px;
          opacity: 0;
          mix-blend-mode: screen;
          background: conic-gradient(
            from 200deg at 50% 50%,
            transparent 0deg,
            rgba(255, 255, 255, 0.16) 4deg,
            transparent 9deg,
            transparent 16deg,
            rgba(255, 255, 255, 0.1) 20deg,
            transparent 26deg,
            transparent 118deg,
            rgba(255, 255, 255, 0.12) 124deg,
            transparent 130deg,
            transparent 142deg,
            rgba(255, 255, 255, 0.18) 147deg,
            transparent 153deg,
            transparent 360deg
          );
          -webkit-mask-image: radial-gradient(50% 50% at 50% 50%, #000 6%, rgba(0, 0, 0, 0.55) 34%, transparent 72%);
          mask-image: radial-gradient(50% 50% at 50% 50%, #000 6%, rgba(0, 0, 0, 0.55) 34%, transparent 72%);
          filter: blur(7px);
          animation: tsRays var(--T) ease-in both, tsRaySwim 7s ease-in-out infinite alternate;
        }
        @keyframes tsRays {
          0%, 60% { opacity: 0; }
          100% { opacity: 0.6; }
        }
        @keyframes tsRaySwim {
          from { transform: rotate(-1.4deg) scale(1); }
          to { transform: rotate(1.4deg) scale(1.05); }
        }

        /* The flood becomes the wipe. */
        .flood {
          position: absolute;
          left: 50%;
          top: 47%;
          width: 460px;
          height: 460px;
          margin: -230px 0 0 -230px;
          opacity: 0;
          border-radius: 50%;
          background: radial-gradient(
            50% 50% at 50% 50%,
            #ffffff 0%,
            rgba(255, 255, 255, 0.92) 38%,
            rgba(240, 248, 255, 0.55) 62%,
            rgba(235, 245, 255, 0) 82%
          );
          animation: tsFlood var(--T) cubic-bezier(0.5, 0, 0.4, 1) both;
        }
        @keyframes tsFlood {
          0%, 84% { opacity: 0; transform: scale(1); }
          100% { opacity: 1; transform: scale(7); }
        }

        /* Guarantees edge coverage on very wide viewports where 7x the flood
           still leaves corners, and carries the last of the light into the
           homepage hero rather than cutting to it. */
        .wash {
          position: absolute;
          inset: 0;
          background: #f7fafd;
          opacity: 0;
          animation: tsWash var(--T) linear both;
        }
        @keyframes tsWash {
          0%, 90% { opacity: 0; }
          100% { opacity: 0.9; }
        }

        /* ============================== film ============================== */
        .vignette {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(
            78% 66% at 50% 46%,
            transparent 42%,
            rgba(0, 0, 0, 0.34) 78%,
            rgba(0, 0, 0, 0.62) 100%
          );
          /* Lifts as the light floods, so the hand-off to the homepage is a
             wash rather than a darkened edge. */
          animation: tsVig var(--T) linear both;
        }
        @keyframes tsVig {
          0%, 82% { opacity: 1; }
          100% { opacity: 0; }
        }

        .grain {
          position: absolute;
          inset: -6%;
          pointer-events: none;
          opacity: 0.055;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)'/%3E%3C/svg%3E");
          animation: tsGrain 0.5s steps(3) infinite;
        }
        @keyframes tsGrain {
          0% { transform: translate3d(0, 0, 0); }
          33% { transform: translate3d(-2%, 1.6%, 0); }
          66% { transform: translate3d(1.6%, -1.2%, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }

        /* ========================= performance tiers =========================
           Detection is synchronous and never delays rendering. Character, steps,
           doors and the light transition survive at every tier. */
        /* mix-blend-mode on a full-screen layer forces the whole overlay stack
           through a blending pass every frame; dropping it is the cheap half of
           "reduce grain" and costs only a little of the grain's bite. */
        .ts-root.med .grain { opacity: 0.03; animation-duration: 0.9s; mix-blend-mode: normal; }
        .ts-root.med .rays { opacity: 0; animation: tsRays var(--T) ease-in both; filter: none; }
        .ts-root.med .lobbyBack { filter: none; }
        .ts-root.med .leaf::after { animation: none; }

        .ts-root.low .grain,
        .ts-root.low .rays,
        .ts-root.low .vignette { display: none; }
        .ts-root.low .lobbyBack { filter: none; }
        .ts-root.low .leaf::after { display: none; }
        .ts-root.low .ledPulse { display: none; }
        .ts-root.low .manRoll :global(.rim) { display: none; }
        .ts-root.low .sign { box-shadow: none; }

        /* ========================= reduced motion =========================
           Doors already open, no walk, ~0.75s total. */
        .ts-root.rm { animation: tsRmOverlay 0.75s linear both; }
        @keyframes tsRmOverlay {
          0% { opacity: 0; }
          14% { opacity: 1; }
          62% { opacity: 1; }
          100% { opacity: 0; }
        }
        .ts-root.rm .sceneFade { animation: none; }
        .ts-root.rm .drift { animation: none; transform: none; }
        .ts-root.rm .world { animation: none; transform: translate3d(0, 0, 180px); }
        .ts-root.rm .lobbyBox { animation: none; perspective: 1920px; }
        .ts-root.rm .man { animation: none; transform: translate3d(0, 70px, -370px); }
        .ts-root.rm .manRoll,
        .ts-root.rm .manRoll :global(.fig),
        .ts-root.rm .manRoll :global(.hem),
        .ts-root.rm .manRoll :global(.ghutra),
        .ts-root.rm .manRoll :global(.footA),
        .ts-root.rm .manRoll :global(.footB),
        .ts-root.rm .manRoll :global(.rim) { animation: none; transform: none; }
        .ts-root.rm .manRoll :global(.rim) { display: none; }
        .ts-root.rm .leafL { animation: none; transform: translate3d(-262px, -10px, -688px); }
        .ts-root.rm .leafR { animation: none; transform: translate3d(262px, -10px, -688px); }
        .ts-root.rm .leaf::after { animation: none; }
        .ts-root.rm .led {
          animation: none;
          background: #62a945;
          box-shadow: 0 0 8px 2px rgba(98, 169, 69, 0.8);
        }
        .ts-root.rm .ledPulse { display: none; }
        .ts-root.rm .grain { animation: none; }
        .ts-root.rm .vignette { animation: none; opacity: 0.5; }
        .ts-root.rm .rays { display: none; }
        .ts-root.rm .cone { animation: none; opacity: 0.85; transform: scale(1.2, 1.35); }
        .ts-root.rm .flood { animation: tsRmFlood 0.75s ease-out both; }
        @keyframes tsRmFlood {
          0% { opacity: 0; transform: scale(1); }
          100% { opacity: 1; transform: scale(7); }
        }
        .ts-root.rm .wash { animation: tsRmWash 0.75s linear both; }
        @keyframes tsRmWash {
          0%, 45% { opacity: 0; }
          100% { opacity: 0.9; }
        }

        /* ============================== skip ============================== */
        .ts-skip {
          position: fixed;
          right: clamp(16px, 3vw, 34px);
          bottom: clamp(16px, 3vw, 34px);
          z-index: 2147483001;
          appearance: none;
          border: 1px solid rgba(255, 255, 255, 0.36);
          border-radius: 999px;
          background: rgba(8, 12, 18, 0.42);
          color: #eaf6f8;
          font-family: "Instrument Sans", ui-sans-serif, system-ui, sans-serif;
          font-size: 13px;
          font-weight: 500;
          line-height: 1;
          letter-spacing: 0.06em;
          padding: 11px 20px;
          cursor: pointer;
          backdrop-filter: blur(6px);
          opacity: 0;
          animation: tsSkipIn 320ms ease-out 400ms both, tsOut 500ms linear 5.4s forwards;
        }
        @keyframes tsSkipIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 0.72; transform: translateY(0); }
        }
        .ts-skip:hover { opacity: 1; }
        .ts-skip:focus-visible {
          opacity: 1;
          outline: 2px solid #eaf6f8;
          outline-offset: 3px;
        }
        .ts-skip.rm { animation: tsSkipIn 200ms ease-out 100ms both, tsOut 300ms linear 0.45s forwards; }
        .ts-skip.low { backdrop-filter: none; }
      `}</style>
    </>
  );
}
