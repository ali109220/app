"use client";

import { useRef } from "react";

/**
 * The transition a selection buys: when `value` changes, this subtree re-enters.
 *
 * It is an ENTRANCE, not a crossfade. A crossfade needs both the outgoing and
 * incoming content mounted at once, and the panels this wraps own charts and
 * counters — mounting two of those to animate between them costs twice as much
 * as the swap is worth. Re-keying the subtree is one mount, and the 380ms rise
 * reads the same at this distance.
 *
 * The first render is deliberately NOT animated. These panels sit inside a
 * RevealOnScroll that already owns their entrance, and playing both would be
 * the "two animations doing one job" the motion system avoids elsewhere. Only a
 * real change — i.e. the visitor doing something — animates.
 *
 * Movement is dropped under prefers-reduced-motion (see .motion-swap in
 * index.css); the content still changes, which is the part that carries meaning.
 */
export default function StateSwap({ value, as: Tag = "div", className = "", children, ...rest }) {
  const previous = useRef(value);
  const interacted = useRef(false);

  if (previous.current !== value) {
    previous.current = value;
    interacted.current = true;
  }

  return (
    <Tag key={String(value)} className={interacted.current ? `motion-swap ${className}` : className} {...rest}>
      {children}
    </Tag>
  );
}
