"use client";

import { useEffect, useRef } from "react";
import { FlowParticle } from "@/site/motion/NetworkFlow";
import { useHasFinePointer, useReducedMotionRef } from "@/site/motion/hooks";
import { activityAlpha, activityGreen } from "@/site/motion/tokens";

/**
 * The hero illustration, inlined from /tayseer-banking-hero.svg.
 *
 * The artwork is unchanged — same viewBox, same geometry, same colours. It moved
 * from <img> to inline markup for one reason: the nodes and connectors have to be
 * addressable for the wake-up sequence, and an <img> is an opaque box. At rest
 * (and under reduced motion) it renders pixel-identically to the file it replaced.
 *
 * Side effect worth knowing: this removes a render-blocking-adjacent image
 * request from the critical path, and the LCP element becomes the hero heading.
 */

const CENTRE = { x: 360, y: 220 };

// Source order preserved from the SVG, which is also the sequence we light them in.
const NODES = [
  { x: 165, y: 120 },
  { x: 555, y: 110 },
  { x: 610, y: 250 },
  { x: 535, y: 380 },
  { x: 175, y: 370 },
  { x: 108, y: 248 },
];

// The only green node: intelligence is the thing that is "live" in this diagram.
const ACTIVE_NODE = NODES[4];

/**
 * The wake-up sequence. Read top to bottom, this is the story:
 * the structure appears, then it connects, then — only once it is all there —
 * a part of it comes alive.
 *
 *    650ms  visual begins: node discs appear one after another
 *    700ms  connectors draw outward from the centre
 *    950ms  FIRST GREEN — the intelligence node activates
 *   1200ms  connection activity — a packet crosses to it
 *   1500ms  settled
 *
 * Nothing here animates simultaneously; each beat has the stage to itself.
 */
const NODE_DELAY = 650;
const NODE_STEP = 45;
const NODE_DUR = 480;
const LINK_DELAY = 700;
const LINK_STEP = 40;
const LINK_DUR = 600;
const FIRST_ACTIVITY = 950;
const CONNECTION_ACTIVITY = 1200;

const MAX_SHIFT = 4; // px — hard ceiling on cursor response

export default function HeroTechVisual({ className = "" }) {
  const wrapRef = useRef(null);
  const reduced = useReducedMotionRef();
  const finePointer = useHasFinePointer();
  const frame = useRef(null);

  useEffect(() => {
    const element = wrapRef.current;
    if (!element || !finePointer) return;

    const onMove = (event) => {
      if (reduced.current) return;
      const { clientX, clientY } = event;
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        // -1..1 from the centre of the visual, then capped at MAX_SHIFT.
        const nx = ((clientX - rect.left) / rect.width - 0.5) * 2;
        const ny = ((clientY - rect.top) / rect.height - 0.5) * 2;
        element.style.setProperty("--px", `${(nx * MAX_SHIFT).toFixed(2)}px`);
        element.style.setProperty("--py", `${(ny * MAX_SHIFT).toFixed(2)}px`);
      });
    };

    const onLeave = () => {
      if (frame.current) cancelAnimationFrame(frame.current);
      element.style.setProperty("--px", "0px");
      element.style.setProperty("--py", "0px");
    };

    // Listening on the window rather than the SVG keeps the response continuous
    // as the cursor approaches, instead of snapping on enter.
    window.addEventListener("pointermove", onMove, { passive: true });
    element.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      element.removeEventListener("pointerleave", onLeave);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [finePointer, reduced]);

  return (
    <div ref={wrapRef} className={className} style={{ "--px": "0px", "--py": "0px" }}>
      <svg
        viewBox="0 0 720 480"
        className="h-auto w-full"
        role="img"
        aria-label="Tayseer enterprise banking technology ecosystem connecting digital banking, core banking, payments, AI, integration and managed services"
      >
        <defs>
          <linearGradient id="hero-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#06152b" />
            <stop offset="0.55" stopColor="#0b3559" />
            <stop offset="1" stopColor="#0d5a8c" />
          </linearGradient>
          <radialGradient id="hero-glow" cx="50%" cy="45%" r="55%">
            <stop offset="0" stopColor="#2b83bd" stopOpacity=".5" />
            <stop offset="1" stopColor="#2b83bd" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="720" height="480" rx="28" fill="url(#hero-bg)" />
        <circle cx="382" cy="225" r="190" fill="url(#hero-glow)" />

        {/* Background grid — least cursor response, so it reads as furthest away. */}
        <g className="hero-parallax-layer" style={{ "--depth": 0.2 }} opacity=".16" stroke="#d9f0ff" fill="none">
          <path d="M0 86H720M0 166H720M0 246H720M0 326H720M0 406H720" />
          <path d="M80 0V480M180 0V480M280 0V480M380 0V480M480 0V480M580 0V480M680 0V480" />
        </g>

        <g className="hero-parallax-layer" style={{ "--depth": 0.6 }}>
          {/* Connectors, split out of the original single path so each can draw
              in turn. pathLength="1" normalises the dash maths across lengths. */}
          <g stroke="#8fd1ff" strokeWidth="2" opacity=".78" fill="none">
            {NODES.map((node, index) => (
              <path
                key={`link-${node.x}-${node.y}`}
                className="hero-link"
                pathLength="1"
                d={`M${CENTRE.x} ${CENTRE.y}L${node.x} ${node.y}`}
                style={{ "--delay": `${LINK_DELAY + index * LINK_STEP}ms`, "--dur": `${LINK_DUR}ms` }}
              />
            ))}
          </g>

          {/* Node discs */}
          <g fill="#0a3155" stroke="#bde8ff" strokeWidth="3">
            {NODES.map((node, index) => (
              <circle
                key={`disc-${node.x}-${node.y}`}
                className="hero-node"
                cx={node.x}
                cy={node.y}
                r="48"
                style={{ "--delay": `${NODE_DELAY + index * NODE_STEP}ms`, "--dur": `${NODE_DUR}ms` }}
              />
            ))}
          </g>

          {/* Node glyphs, each timed with its own disc.
              Positioning stays on an outer <g transform> attribute and the
              animation goes on an inner <g>: a CSS transform on an SVG element
              replaces its transform attribute outright, so animating the
              positioned group directly would drop every glyph at the origin. */}
          <g fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <g transform="translate(165 120)">
              <g className="hero-node" style={{ "--delay": `${NODE_DELAY + 40}ms`, "--dur": `${NODE_DUR}ms` }}>
                <rect x="-17" y="-25" width="34" height="50" rx="6" />
                <circle cy="8" r="8" />
                <path d="M-8-13h16" />
              </g>
            </g>
            <g transform="translate(555 110)">
              <g className="hero-node" style={{ "--delay": `${NODE_DELAY + NODE_STEP + 40}ms`, "--dur": `${NODE_DUR}ms` }}>
                <path d="M-24 8c13-24 35-24 48 0M-17 15c9-15 25-15 34 0M-8 23c4-7 12-7 16 0" />
                <circle cy="30" r="3" fill="#fff" stroke="none" />
              </g>
            </g>
            <g transform="translate(610 250)">
              <g className="hero-node" style={{ "--delay": `${NODE_DELAY + NODE_STEP * 2 + 40}ms`, "--dur": `${NODE_DUR}ms` }}>
                <rect x="-22" y="-16" width="44" height="32" rx="4" />
                <circle r="8" />
              </g>
            </g>
            <g transform="translate(535 380)">
              <g className="hero-node" style={{ "--delay": `${NODE_DELAY + NODE_STEP * 3 + 40}ms`, "--dur": `${NODE_DUR}ms` }}>
                <rect x="-24" y="-23" width="48" height="46" rx="8" />
                <path d="M-14-9h28M-14 0h28M-14 9h28" />
              </g>
            </g>
            <g transform="translate(108 248)">
              <g className="hero-node" style={{ "--delay": `${NODE_DELAY + NODE_STEP * 5 + 40}ms`, "--dur": `${NODE_DUR}ms` }}>
                <path d="M-22-6h13v-13M22 6H9v13M-9-19l-13 13M9 19L22 6" />
                <circle cx="-4" cy="4" r="6" />
                <circle cx="7" cy="-7" r="6" />
              </g>
            </g>
          </g>

          <g transform="translate(175 370)" fontFamily="Arial,sans-serif" textAnchor="middle" fill="#fff">
            <g className="hero-node" style={{ "--delay": `${NODE_DELAY + NODE_STEP * 4 + 40}ms`, "--dur": `${NODE_DUR}ms` }}>
              <rect x="-22" y="-22" width="44" height="44" rx="8" fill="none" stroke="#fff" strokeWidth="3" />
              <text y="7" fontSize="18" fontWeight="700">AI</text>
            </g>
          </g>

          {/* ── Activity layer ──────────────────────────────────────────────
              One node is live and two connectors carry traffic. Everything else
              in the diagram stays deliberately still — the green has to mean
              something, which it only does if it is rare. */}
          {/* ── Activity layer ──────────────────────────────────────────────
              The whole green budget for the first screen is spent here: one
              active node and one connector carrying data. The other five nodes
              and five connectors stay structural blue, which is the only reason
              the green means anything at all. */}
          <g aria-hidden="true" fill="none">
            {/* 950ms — first green. A steady outline: this node is the active one.
                It fades in rather than being present from the start, so the
                activation reads as the system waking up, not as decoration. */}
            <circle
              className="motion-rise"
              cx={ACTIVE_NODE.x}
              cy={ACTIVE_NODE.y}
              r="48"
              stroke={activityAlpha(0.75)}
              strokeWidth="2.5"
              style={{ "--delay": `${FIRST_ACTIVITY}ms`, "--rise": "0px" }}
            />
            {/* Expanding ring — three pings, then it stops and the steady
                outline above is all that remains. */}
            <circle
              className="motion-data-pulse"
              cx={ACTIVE_NODE.x}
              cy={ACTIVE_NODE.y}
              r="48"
              stroke={activityGreen}
              strokeWidth="2"
              style={{ transformOrigin: `${ACTIVE_NODE.x}px ${ACTIVE_NODE.y}px`, animationDelay: `${FIRST_ACTIVITY}ms` }}
            />

            {/* 1200ms — connection activity. A single packet on a single
                connector, on a long cycle: this is the hero's ambient heartbeat
                once the entrance has settled, and it is intentionally the only
                thing still moving anywhere above the fold. */}
            <FlowParticle from={CENTRE} to={ACTIVE_NODE} delay={CONNECTION_ACTIVITY} radius={4} />
          </g>
        </g>

        {/* Device — nearest layer, so it takes the full 4px. Parallax transform
            and positioning transform again live on separate <g> elements. */}
        <g className="hero-parallax-layer" style={{ "--depth": 1 }}>
          <g transform="translate(278 82)">
            <rect width="164" height="300" rx="30" fill="#07152a" stroke="#b7e4ff" strokeWidth="3" />
            <rect x="13" y="20" width="138" height="250" rx="20" fill="#0a2f50" />
            <circle cx="82" cy="146" r="91" fill="#0d5a8c" opacity=".28" />
            <circle cx="82" cy="146" r="72" fill="none" stroke="#d9f4ff" strokeWidth="4" />
            <circle cx="82" cy="146" r="58" fill="none" stroke="#5ab2ea" strokeWidth="10" strokeDasharray="23 12" />
            <g transform="translate(39 104)" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 34L43 8l41 26M10 36h66M16 38v49M31 38v49M47 38v49M63 38v49M8 88h72" />
            </g>
            <rect x="61" y="282" width="42" height="5" rx="3" fill="#7bc6f5" />
          </g>
        </g>
      </svg>
    </div>
  );
}
