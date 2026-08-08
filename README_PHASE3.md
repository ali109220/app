# Phase 3 — Performance & Architecture Baseline

Phase 3 completes the performance-focused architecture pass after the Next.js App Router migration.

## Completed

- Server-first root layout and site shell
- Small client runtime for browser-only behavior
- Deferred Lenis smooth scrolling with reduced-motion support
- Header navigation without Framer Motion in the shared bundle
- Targeted route prefetching instead of eager whole-site prefetch
- Next Image optimization for homepage and shared inner-page heroes
- AVIF/WebP image formats and image cache TTL
- Long-lived caching for immutable fonts and logo assets
- Native IntersectionObserver/CSS reveal, line-reveal and marquee primitives
- Native counter animation with reduced-motion support
- Homepage rendered directly as a Server Component
- Homepage contact form extracted into a client island
- Shared inner-page hero and SectionLabel returned to server rendering
- CountUp isolated as a small client island
- Removed obsolete HomeClient and SiteChrome client bridges
- Removed unused React Query and next-themes dependencies
- CI aligned to Node 24 and lockfile-free npm install workflow

## Final validation

```bash
npm install
npm run clean
npm run typecheck
npm run build
npm run start
```

Validate first load, navigation, homepage image/counter/reveal behavior, contact form, inner-page heroes, mobile menu, smooth scrolling, direct route refreshes, and reduced-motion behavior.
