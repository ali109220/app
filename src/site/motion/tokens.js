// Centralised motion + activity tokens.
//
// ─────────────────────────────────────────────────────────────────────────────
//  THE COLOUR RULE
// ─────────────────────────────────────────────────────────────────────────────
//
//   BLUE  (T.signal, #0F5CBF)  =  the Tayseer platform. Structure. What things
//                                 ARE. Static, permanent, load-bearing.
//
//   GREEN (activityGreen, #62A945) = something is HAPPENING. Right now.
//                                 Transient by definition.
//
// activityGreen is permitted in exactly these situations:
//
//   · a node that is currently active
//   · data in motion along a connection
//   · the live point on a chart
//   · a hover / interaction accent
//   · an activity indicator
//   · a system-activity signal
//
// It is NOT a brand colour. It never paints a heading, a border at rest, an
// icon at rest, a section label, or a background. When nothing is happening,
// the interface returns entirely to blue / navy / white.
//
// ─────────────────────────────────────────────────────────────────────────────
//  WHY THIS IS NOT `T.green`
// ─────────────────────────────────────────────────────────────────────────────
//
// `T.green` in site/theme.js is a DIFFERENT, unrelated token. The confirmed
// palette retired it and mapped it to blue ("a single accent, not two"), and
// roughly twenty components outside the homepage still read it expecting blue.
// Repainting those would produce exactly the "generally green site" this system
// exists to avoid.
//
// So: `T.green` stays blue and untouched. activityGreen lives here, in the
// motion layer, and is only ever reachable through this file. Do not merge them.

/** Tayseer activity green. Live/active states only — see the colour rule above. */
export const activityGreen = "#62A945";
export const activityGreenDark = "#4D9136";
export const activityGreenSoft = "#EAF5E5";

/** activityGreen at a given alpha, for glows, washes and haloes. */
export const activityAlpha = (alpha) => `rgba(98, 169, 69, ${alpha})`;

/** Durations in ms. Named by intent, not by number. */
export const D = {
  fast: 200,      // hover / press feedback
  normal: 380,    // state changes, page transitions
  reveal: 680,    // entrance of content
  activity: 1400, // one data-particle trip
};

/** Stagger step between siblings in a group, in ms. */
export const STAGGER = 80;

/**
 * Reveal order WITHIN a section, in ms.
 *
 * The point of these names is to stop the homepage reading as one flat
 * "fade, fade, fade, fade". Inside a section the eye should be led:
 * heading first, then the sentence explaining it, then the visual it refers to,
 * then any supporting cards.
 *
 * Minor and interactive elements — tab pills, scenario buttons, metric tiles
 * that already animate their own numbers, closing summary strips — get NO
 * reveal at all. A reveal on everything is the same as a reveal on nothing.
 */
export const TIER = {
  heading: 0,
  body: 80,
  visual: 160,
  support: 240,
};

/** The single standard easing curve for the whole site. */
export const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
