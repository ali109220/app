"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

// Progressive reveal: content is visible in the server HTML and on the first
// client paint. Once hydration is complete, only content that is still below
// the viewport is hidden and revealed when it enters view. This prevents a
// slow/delayed hydration from leaving real content or images stuck at opacity 0.
export const Reveal = ({ children, delay = 0, y = 24, className = "", as = "div" }) => {
  const ref = useRef(null);
  const [hydrated, setHydrated] = useState(false);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const M = motion[as] || motion.div;

  useEffect(() => {
    setHydrated(true);
  }, []);

  const visible = !hydrated || inView || reduceMotion;

  return (
    <M
      ref={ref}
      className={className}
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : y }}
      transition={{ duration: reduceMotion ? 0 : 0.8, delay: visible ? delay : 0, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </M>
  );
};

// Hero text must also be readable before JavaScript hydrates. We intentionally
// render it in its final position on the server and apply only client-side
// motion after hydration.
export const LineReveal = ({ lines, className = "", stagger = 0.11 }) => (
  <span className={className}>
    {lines.map((t, i) => (
      <span key={i} className="block overflow-hidden">
        <motion.span
          initial={false}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.15 + i * stagger, ease: [0.16, 1, 0.3, 1] }}
          className="block"
        >
          {t}
        </motion.span>
      </span>
    ))}
  </span>
);

export const Marquee = ({ items, speed = 40, className = "", sep = "/" }) => (
  <div className={`overflow-hidden ${className}`}>
    <motion.div
      className="flex whitespace-nowrap"
      animate={{ x: ["0%", "-50%"] }}
      transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
    >
      {[0, 1].map((k) => (
        <div key={k} className="flex shrink-0 items-center">
          {items.map((it, i) => (
            <span key={i} className="flex items-center">
              <span className="px-6">{it}</span>
              <span className="opacity-30">{sep}</span>
            </span>
          ))}
        </div>
      ))}
    </motion.div>
  </div>
);
