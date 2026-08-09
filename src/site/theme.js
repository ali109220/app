// Confirmed final design tokens — white/mist/tint/edge/blue/navy/steel/amber.
// Replaces the earlier petrol-navy/viridian palette (bg #F7F6F2, signal #0D5A8C,
// green #62A945). No gradients, no glass — flat tokens only.
export const T = {
  bg: "#F7FAFD",       // mist — paper background
  panel: "#FFFFFF",    // white — cards / panels
  panel2: "#EAF2FB",   // tint — alternate sections
  text: "#0A2846",     // navy — ink
  muted: "#526B84",    // steel — slate body
  faint: "#526B84",    // steel — labels (palette has one mid-tone, not two)
  signal: "#0F5CBF",   // blue — primary/dominant accent
  green: "#0F5CBF",    // retired: old sparing green accent now maps to blue —
                        // the confirmed palette has a single accent, not two
  amber: "#9A6410",       // reserved for a pending-verification state, if one is needed later —
                           // not currently used anywhere in the UI
  amberTint: "#FBF2E3",   // backing fill for the above, same status
  border: "#C3D9F0",   // edge
  hl: "#EAF2FB",        // tint — hairline grid backing
};

// Navigation model — the 15 sections defined by the client, no invented sections.
export const SOLUTIONS = [
  { label: "Core Banking", to: "/solutions/core-banking", desc: "Core banking platform" },
  { label: "Fahim AI", to: "/solutions/fahim-ai", desc: "Applied AI tooling" },
  { label: "MBuke", to: "/solutions/mbuke", desc: "Product" },
  { label: "Managed Services", to: "/solutions/managed-services", desc: "Operations & support" },
  { label: "Banking Systems", to: "/solutions/banking-systems", desc: "Systems integration" },
  { label: "Software Management Systems", to: "/solutions/software-management-systems", desc: "Software management" },
];

export const NAV = [
  { label: "Solutions", to: "/solutions", children: SOLUTIONS },
  { label: "About", to: "/about" },
  { label: "Careers", to: "/careers" },
  { label: "Blog", to: "/blog" },
];
