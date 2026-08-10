// Centralised motion + activity tokens.
//
// Two rules govern everything in this directory:
//
//  1. Durations/easings live HERE, not scattered across components. Components
//     import these names so retiming the whole site is a one-file change.
//  2. Colour: blue (T.signal) stays the structural brand colour. Green is only
//     ever used to mean "something is happening right now" — active nodes,
//     travelling data, the live chart point, hover/interaction accents.
//     It is deliberately NOT wired into T.green, which the confirmed palette
//     retired to blue and which ~20 non-homepage components still read.

/** Tayseer activity green — reserved for live/active states only. */
export const GREEN = "#62A945";
export const GREEN_DARK = "#4D9136";
export const GREEN_SOFT = "#EAF5E5";

/** rgba() helper so glows/pulses don't hardcode the channel values. */
export const green = (alpha) => `rgba(98, 169, 69, ${alpha})`;

/** Durations in ms. Named by intent, not by number. */
export const D = {
  fast: 200,      // hover / press feedback
  normal: 380,    // state changes, page transitions
  reveal: 680,    // entrance of content
  activity: 1400, // a data particle completing one trip
};

/** Stagger step between siblings in a group, in ms. */
export const STAGGER = 80;

/** The single standard easing curve for the whole site. */
export const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
