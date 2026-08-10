# Motion system — route audit (Phase 2)

Every route in `src/app`. No routes were added, removed or re-pointed.

Motion levels, per the Phase 2 hierarchy:

- **L1 Global** — page transition, scroll reveal, nav, buttons, cards. Every route.
- **L2 Page** — metrics, screenshots, diagrams, active states. Where the content exists.
- **L3 Signature** — hero technology animation, network flow, data particles. Selected routes only.

| Route | Page type | Renders | Hero | Cards | Metrics | Interactive visual | Motion applied | Deliberately NOT applied |
|---|---|---|---|---|---|---|---|---|
| `/` | Home | `pages/Home` → `phase7/*`, `phase6/*` | `CinematicHero` + inline `HeroTechVisual` | yes | `AnimatedMetric`, `CountUp` | dashboard, pipeline, node graph | **L3** — unchanged from Phase 1 | — |
| `/about` | Corporate / editorial | `pages/About` + `ContactSection` | `InnerHero` | value + timeline cards | `CountUp` (stats) | none | **L1 + L2** reveal hierarchy, card interaction, stat count-up | no particles, no data-flow — no system visual to justify them |
| `/solutions` | Index | `pages/Solutions` + `ContactSection` | `InnerHero` | 6 solution cards | none | none | **L1** reveal + card interaction + CTA | no hero animation; it is a directory page |
| `/solutions/core-banking` | Product | `EnterpriseSolutionLayout` | `SolutionHero` | capability + related | `StatsStrip` `CountUp` | `ArchitectureFlow` (real data flow) | **L1 + L2** hero reveal, capability stagger, `StagePulse` on the flow | not `HeroTechVisual` — that illustration is Home's |
| `/solutions/fahim-ai` | Product / AI | `EnterpriseSolutionLayout` | `SolutionHero` | capability + related | `StatsStrip` | `ArchitectureFlow` + AI stage strip | **L1 + L2**, plus intentional `activityGreen` on the already-active AI stage | no invented AI activity |
| `/solutions/mbuke` | Product | `EnterpriseSolutionLayout` | `SolutionHero` | capability + related | `StatsStrip` | `ArchitectureFlow` | **L1 + L2** | — |
| `/solutions/managed-services` | Product | `EnterpriseSolutionLayout` | `SolutionHero` | capability + related | `StatsStrip` | `ArchitectureFlow` | **L1 + L2** | — |
| `/solutions/banking-systems` | Product | `EnterpriseSolutionLayout` | `SolutionHero` | capability + related | `StatsStrip` | `ArchitectureFlow` | **L1 + L2** | — |
| `/solutions/software-management-systems` | Product | `EnterpriseSolutionLayout` | `SolutionHero` | capability + related | `StatsStrip` | `ArchitectureFlow` | **L1 + L2** | — |
| `/blog` | Index / editorial | `pages/Blog` + `ContactSection` | `InnerHero` | post cards | none | none | **L1** reveal + card interaction | no data motion — editorial |
| `/blog/[slug]` | Article | `pages/BlogArticle` + `ContactSection` | `InnerHero` | related posts | none | none | **L1** reveal, prose left calm | body copy not animated per-paragraph |
| `/careers` | Corporate | `next/CareersClient` → `pages/Careers` | `InnerHero` | role cards | none | application form | **L1** + form field transitions | form itself never reveal-gated |
| `/connect` | Contact | `next/ConnectClient` → `pages/Connect` | `InnerHero` | contact cards | none | contact form | **L1** + form field transitions | form never reveal-gated |
| `/privacy` | Legal | `pages/Legal` | `InnerHero` | none | none | none | **L1** reveal only | nothing else — it is a legal document |
| `/terms` | Legal | `pages/Legal` | `InnerHero` | none | none | none | **L1** reveal only | as above |

Non-page routes (no motion applicable): `manifest.webmanifest`, `robots.txt`, `sitemap.xml`, `not-found`, `error`, `loading`.

## Where the shared layer lives

Four shared modules cover every route above, which is why almost no per-page motion
code was needed:

| Shared module | Routes covered |
|---|---|
| `site/motion/PageTransition` (in `app/layout.tsx`) | all |
| `site/motion/RevealOnScroll` + the `Reveal` adapter | all |
| `site/ui.jsx` → `InnerHero` | about, solutions, blog, blog/[slug], careers, connect, privacy, terms |
| `site/phase8/EnterpriseSolutionLayout` | 6 × solutions/* |
| `site/ContactSection` | about, solutions, blog, blog/[slug], 6 × solutions/* |
| `index.css` interaction classes (`.motion-card`, `.cta-*`, `.nav-link`, field focus) | all |

## Unreachable files — intentionally left alone

Nothing imports these; they are pre-Phase-6/7 leftovers. They still compile because
the `Reveal` adapter preserves the old API, but they render on no route, so applying
motion to them would be work with no user-visible effect:

`phase6/BankingEcosystem`, `phase6/ChallengeSolution`, `phase6/CredibilityMetrics`,
`phase6/ExecutiveTestimonials`, `phase6/FahimShowcase`, `phase6/PremiumSolutions`,
`phase6/VisualMedia`, `pages/SolutionDetail`, `site/PageStub` (only `src/App.jsx`,
itself not a route since `pageExtensions` is `ts`/`tsx`).
