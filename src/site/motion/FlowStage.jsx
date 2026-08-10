"use client";

import { useInView } from "./hooks";

/**
 * Client boundary that releases the paused data-flow animations inside it once
 * the diagram is actually on screen.
 *
 * This exists for one architectural reason: StagePulse / StageArrival run a
 * FINITE number of passes, so they must not start while the section is still
 * below the fold — but the gate needs an IntersectionObserver, and a server
 * component cannot call a hook. EnterpriseSolutionLayout must stay a server
 * module (it receives icon components as props), so the observer has to live in
 * a client component it can render.
 *
 * The homepage sections do the same thing inline, because they were already
 * client components and had no boundary to cross.
 *
 * Renders `data-flow="active"` when in view — see the [data-flow="active"]
 * rules in index.css.
 */
export default function FlowStage({ children, as: Tag = "div", threshold = 0.35, className = "", ...rest }) {
  const [ref, inView] = useInView({ threshold });

  return (
    <Tag ref={ref} data-flow={inView ? "active" : undefined} className={className} {...rest}>
      {children}
    </Tag>
  );
}
