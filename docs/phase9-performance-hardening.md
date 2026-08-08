# Phase 9 — Performance & Production Hardening

## Objective
Optimize the completed Tayseer website for Core Web Vitals, Lighthouse, runtime responsiveness, bundle size and production readiness without changing the approved design or content architecture.

## Baseline observations
- `ClientRuntime` mounts globally and performs route focus handling, synthetic resize/scroll refreshes and Lenis initialization.
- Lenis is dynamically imported but still initializes site-wide for users without reduced-motion enabled.
- Sonner is mounted globally through `ClientRuntime`, while toast usage is concentrated in form experiences.
- Motion primitives are client components and appear broadly across otherwise static content.
- The site already uses App Router static generation and has a strong SEO/accessibility foundation that must not regress.

## Optimization sequence
1. Reduce global client-runtime work and remove unnecessary synthetic layout events.
2. Scope smooth scrolling and feedback UI so optional libraries do not burden every route.
3. Reduce client-component boundaries and hydration where practical.
4. Audit hero/LCP media and convert appropriate images to `next/image` with explicit sizing and priority rules.
5. Optimize below-the-fold rendering using content visibility/lazy strategies where safe.
6. Audit fonts and preload only critical resources.
7. Audit package usage and remove unused runtime dependencies.
8. Add production security/cache headers and deployment-safe Next.js configuration.
9. Review route bundles/build output and address large shared/client chunks.
10. Final Core Web Vitals/Lighthouse validation and regression checklist.

## Guardrails
- Preserve Phase 7 and Phase 8 visuals.
- Preserve keyboard navigation, reduced-motion behavior and WCAG improvements.
- Preserve metadata, structured data, sitemap and robots behavior.
- Do not trade usability for a synthetic Lighthouse score.
- Avoid adding new heavy dependencies.

## Validation targets
- Production build passes.
- No hydration warnings.
- LCP media is discoverable and prioritized correctly.
- CLS remains effectively zero on primary templates.
- INP improves by reducing global JavaScript and continuous animation work.
- Shared First Load JS should not increase.
- Lighthouse Accessibility / Best Practices / SEO should remain at or near existing scores while Performance improves.
