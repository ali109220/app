// Public surface of the motion system.
//
// `@/site/motion` used to be a single file; it is now this directory, so every
// existing `import { Reveal } from "@/site/motion"` keeps resolving unchanged.

export {
  D,
  EASE,
  STAGGER,
  TIER,
  activityGreen,
  activityGreenDark,
  activityGreenSoft,
  activityAlpha,
} from "./tokens";
export { useReducedMotion, useReducedMotionRef, useInView, useHasFinePointer } from "./hooks";
export { useTabs } from "./useTabs";

export { default as RevealOnScroll } from "./RevealOnScroll";
export { default as FlowStage } from "./FlowStage";
export { default as PageTransition } from "./PageTransition";
export { default as StateSwap } from "./StateSwap";
export { default as AnimatedMetric } from "./AnimatedMetric";
export { default as AnimatedChart } from "./AnimatedChart";
export { default as ActivityIndicator } from "./ActivityIndicator";
export { FlowParticle, StagePulse, StageArrival } from "./NetworkFlow";

// Pre-existing primitives, still used across the non-homepage routes.
export { Reveal, LineReveal, Marquee } from "./legacy";
