"use client";

import { usePathname } from "next/navigation";
import { D, EASE } from "./tokens";

/**
 * Route-change transition.
 *
 * Deliberately enter-only. An exit animation would require holding the old
 * route on screen while the new one loads, which is exactly the "loading
 * screen" feeling the brief rules out — navigation must stay instant. The
 * outgoing nudge is handled by CSS on <main> (see .page-transition-shell in
 * index.css) so it costs no JS and cannot delay the next paint.
 *
 * Keying on pathname remounts the wrapper per route, which restarts the CSS
 * animation without any timers, state, or cleanup.
 */
export default function PageTransition({ children }) {
  const pathname = usePathname();

  return (
    <div
      key={pathname}
      className="page-transition-shell"
      style={{ "--page-dur": `${D.normal}ms`, "--page-ease": EASE }}
    >
      {children}
    </div>
  );
}
