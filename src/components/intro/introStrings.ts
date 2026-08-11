// English strings for the one-time cinematic intro. Keyed to mirror the shape
// next-intl messages would take (intro.captions.1..4) so this drops into that
// structure later with no redesign — this project has no next-intl wired up yet.
export const introStrings = {
  captions: {
    1: "Meet your AI banking assistant",
    2: "Bank-grade security, always on.",
    3: "Instant transfers. Real-time insights.",
    4: "Banking. Reinvented."
  },
  skip: "Skip intro",
  ariaLabel: "Tayseer cinematic introduction showing AI, security, banking and the platform"
} as const;

export type CaptionIndex = 1 | 2 | 3 | 4;
