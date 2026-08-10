# Tayseer Innovations Website — Delivery Proposal

**Prepared:** 2026-08-09
**Scope:** Full-site design, technical architecture, security, SEO/performance, deployment, cost, and timeline review of the live codebase at `c:\Users\Ali\Downloads\tayseer-v3\app`, plus a complete 45-image screenshot set.

---

## Changelog

**2026-08-09 (later same day) — Screenshot & content refresh.** This is not the original version of this report. Since it was first produced, a source-provenance audit ("Hamada-migration" commits) surfaced and fixed several regressions, and a separate bug was found in the screenshot capture method itself. Specifically:

- **Navigation rolled back** (`src/site/Header.jsx`) to the verified spec: `About` → `About Us`, `Insights` → `Blogs and Resources`, and `Connect` added as a direct nav link (previously reachable only via the "Talk to us" CTA button, which remains). §2.1 below is updated to match. **Superseded 2026-08-10** — see the entry below; the `Connect` nav link has since been removed again as a duplicate of the CTA. The two label fixes stand. Not a reversal — the 2026-08-09 change restored a nav that unsourced "Hamada-migration" edits had drifted away from the verified spec, and re-adding `Connect` was part of returning to a known baseline rather than a judgement that the link was needed; 2026-08-10 is a deliberate design decision taken on top of that restored baseline, after confirming reachability via CTA + Solutions dropdown + footer. Sequential, compatible decisions.
- **Homepage hero eyebrow removed.** "Enterprise banking technology" was unsourced, drafted copy with no approval record — removed from `CinematicHero.jsx` pending content review, not live copy anymore.
- **Homepage secondary jump-nav deleted.** The pill row under the hero ("Client proof," "Insights," etc.) was a same-page-anchor regression with no source — the component (`HomeSectionNav.jsx`) was deleted outright, not just re-labeled.
- **FahimAI and MBuke statistics restored**, verbatim from pre-regression git history, with their `SOURCED` provenance comments reinstated (along with 4 other solution pages that lost the same comment in the same commit).
- **All 45 screenshots re-captured — twice.** The first re-capture (same method as the original set) silently produced broken images: below-the-fold content on most pages rendered as large blank gaps, because Playwright's full-page capture never actually scrolls the real viewport, so this site's scroll-triggered reveal animations (`Reveal` in `motion.jsx`) and lazy-render sections (`.defer-render` / `content-visibility: auto` in `performance.css`) never resolved. This was a capture-methodology bug, confirmed by comparing a no-scroll capture against a real scripted scroll-through — not a live content bug. Fixed by emulating `prefers-reduced-motion: reduce` (the same escape hatch `Reveal` already uses) and force-overriding `content-visibility` before capture. §1.1 below reflects the corrected, verified set.
- **Section 4 (Security)** was checked against this task's premise that the ISO 27001 badge note needed correcting — it didn't; the report already stated the badge is live, not missing. No change made there.
- Cost estimate, timeline, and hosting sections were **not** touched — out of scope for this refresh.

**2026-08-10 — Header nav and ecosystem diagram.**

- **`Connect` removed from the header nav** (`src/site/Header.jsx`). Verified first that the "Talk to us" CTA is a plain `<Link href="/connect">` in both the desktop and mobile headers — not a modal, not an in-page scroll — so the nav link was the same destination rendered twice, side by side. `/connect` remains reachable from that CTA, from "Talk to our team" in the Solutions dropdown, and from the footer's Company column, and is still in `sitemap.ts`. This reverses part of the 2026-08-09 rollback above.
- **Mobile ecosystem diagram overlap fixed** (`src/site/phase7/InteractiveEcosystem.jsx`, `src/index.css`). At 390px the 1.25:1 stage was 274px tall, which put the Managed Services node flush on the frame's bottom edge and directly on top of the "Select any layer" caption, and pushed the Business Systems label underneath it. The stage is now portrait below `sm`, the caption sits under the frame rather than inside it at that width, and the nodes take a fixed narrow-viewport width so shrink-to-fit stops sizing the right-hand nodes smaller than the left-hand ones.
- **Ecosystem green arrival dot gated to real interaction.** It was rendering on Fahim AI on first paint, before any hover, focus or tap, because the default `core` selection routes the ambient data particle to the intelligence layer. The dot now waits for the visitor's first selection.

---

## 0. How this report was produced — and corrections to the original brief

This report was built by reading the actual codebase, running a real production build, and screenshotting the real rendered output — not by summarizing prior notes. In doing that, several assumptions in the original brief turned out to be **stale** (written against an earlier iteration of the project) and are corrected here rather than repeated as fact. Every correction below is backed by a file:line citation later in the relevant section.

| Brief assumed | Reality found in the codebase |
|---|---|
| Static HTML/CSS/vanilla JS, no framework, no build step | **Next.js 15.5.22 (App Router), React 19, TypeScript + Tailwind CSS**, built with `next build` and statically exported (`output: "export"`) |
| No shared header/footer partial — 15 files must be edited individually for any sitewide change | A single shared `Header.jsx`, `Footer.jsx`, and `Layout.jsx` **already exist** and are used by every page. A footer email/address change is a **one-file edit**, not 15. |
| No `robots.txt` exists | `robots.txt` **exists** and is dynamically generated (`src/app/robots.ts`) |
| ISO 27001 badge missing from the build | The badge (`public/iso-27001-badge.png`) **is already implemented**, rendered in the Footer and homepage hero with a navy contrast-backing chip |
| Typography is Instrument Sans + JetBrains Mono | Typography is **Archivo (variable) + JetBrains Mono (variable)** — Instrument Sans does not appear anywhere in the codebase |
| Design tokens live in `tokens.css` / `motion.css` | No such files exist. Tokens live in `tailwind.config.js` + CSS custom properties in `src/index.css` + a JS object in `src/site/theme.js`; motion logic lives in `src/site/motion.jsx` (React/JS), not a CSS file |
| `redirects.json` already drafted in this project | **No `redirects.json` file exists anywhere in the repo.** `next.config.mjs` defines HTTP headers only, no redirects |
| OG/Twitter tags only confirmed on index.html | OG tags are actually present on **all 15 pages** (with two real bugs found — see §5) |

The 15-page list in the brief maps cleanly onto real routes once "blog-article" and "unleashing-financial-innovation" are read as the two real blog posts (`rise-of-fintech-uae` and `open-banking-uae-ksa`, the latter's real title is *"Unleashing Financial Innovation: Open Banking's Potential in the UAE and KSA"*) — no page list ambiguity, no page was dropped or invented.

The repository also contains a **legacy pre-Next.js codepath** (`src/App.jsx`, `vite.config.js`, `react-router-dom`) from an earlier phase. It is not wired into any npm script (`package.json` only runs `next dev`/`next build`/`next start`) and the CI workflow (`.github/workflows/nextjs-ci.yml`) only builds the Next.js app — it is dead code, not a second live site. One commit (`61a90ed`, "remove this file it was leftover from the pre-Next.js SPA setup") shows this cleanup already in progress. This report and all screenshots reflect the live Next.js App Router build only.

---

## 1. Website UI/UX design & prototype

### 1.1 Screenshot set — 15 pages × 3 viewports = 45 images ✅

**Refreshed 2026-08-09 (see Changelog above).** The screenshots below are the second capture of this set. The first capture (and the images this report originally shipped with) predate a content audit — they still show the old header nav (`About` / `Insights` / no direct `Connect` link) and the now-removed "Enterprise banking technology" hero eyebrow, neither of which reflect the live site anymore. If you have a locally saved copy of the earlier images, discard it; the versions linked below are current.

Method: fresh production build (`npm run build`, static export to `out/`), served locally, captured with headless Chromium (Playwright 1.62.1) at exactly 1440×900, 768×1024, and 360×800, full-page, emulating `prefers-reduced-motion: reduce` and forcing `content-visibility: visible` on lazy-rendered sections (both needed so scroll-triggered content actually paints in a capture that never scrolls the real viewport — see Changelog). Saved to `/screenshots/[page]/[viewport].png`. **All 45 files were regenerated and verified non-empty, with representative pages spot-checked visually end-to-end** (see confirmation log at the end of this report).

| # | Page | Route | 1440px | 768px | 360px |
|---|---|---|---|---|---|
| 1 | Home | `/` | [1440](screenshots/index/1440.png) | [768](screenshots/index/768.png) | [360](screenshots/index/360.png) |
| 2 | Solutions | `/solutions` | [1440](screenshots/solutions/1440.png) | [768](screenshots/solutions/768.png) | [360](screenshots/solutions/360.png) |
| 3 | Core Banking | `/solutions/core-banking` | [1440](screenshots/core-banking/1440.png) | [768](screenshots/core-banking/768.png) | [360](screenshots/core-banking/360.png) |
| 4 | Fahim AI | `/solutions/fahim-ai` | [1440](screenshots/fahim-ai/1440.png) | [768](screenshots/fahim-ai/768.png) | [360](screenshots/fahim-ai/360.png) |
| 5 | MBuke | `/solutions/mbuke` | [1440](screenshots/mbuke/1440.png) | [768](screenshots/mbuke/768.png) | [360](screenshots/mbuke/360.png) |
| 6 | Managed Services | `/solutions/managed-services` | [1440](screenshots/managed-services/1440.png) | [768](screenshots/managed-services/768.png) | [360](screenshots/managed-services/360.png) |
| 7 | Banking Systems | `/solutions/banking-systems` | [1440](screenshots/banking-systems/1440.png) | [768](screenshots/banking-systems/768.png) | [360](screenshots/banking-systems/360.png) |
| 8 | Software Management Systems | `/solutions/software-management-systems` | [1440](screenshots/software-management-systems/1440.png) | [768](screenshots/software-management-systems/768.png) | [360](screenshots/software-management-systems/360.png) |
| 9 | About Us | `/about` | [1440](screenshots/about-us/1440.png) | [768](screenshots/about-us/768.png) | [360](screenshots/about-us/360.png) |
| 10 | Connect | `/connect` | [1440](screenshots/connect/1440.png) | [768](screenshots/connect/768.png) | [360](screenshots/connect/360.png) |
| 11 | Blog (listing) | `/blog` | [1440](screenshots/blog/1440.png) | [768](screenshots/blog/768.png) | [360](screenshots/blog/360.png) |
| 12 | Blog article — "The Rise of FinTech in the UAE" | `/blog/rise-of-fintech-uae` | [1440](screenshots/blog-article/1440.png) | [768](screenshots/blog-article/768.png) | [360](screenshots/blog-article/360.png) |
| 13 | Blog article — "Unleashing Financial Innovation" | `/blog/open-banking-uae-ksa` | [1440](screenshots/unleashing-financial-innovation/1440.png) | [768](screenshots/unleashing-financial-innovation/768.png) | [360](screenshots/unleashing-financial-innovation/360.png) |
| 14 | Careers | `/careers` | [1440](screenshots/careers/1440.png) | [768](screenshots/careers/768.png) | [360](screenshots/careers/360.png) |
| 15 | Terms & Conditions | `/terms` | [1440](screenshots/terms/1440.png) | [768](screenshots/terms/768.png) | [360](screenshots/terms/360.png) |

**15 rows × 3 columns = 45 images referenced. Matches 45 files on disk exactly (verified below).**

*Not in the required 15, but exists and was noted during the audit: a 16th page, `/privacy` (Privacy Policy), sharing the same template as `/terms`. Not screenshotted here since it falls outside the specified scope, but flagged as a real page that exists in production and should be included in the next full pass.*

### 1.2 Design system — as actually implemented

Source: `tailwind.config.js`, `src/index.css`, `src/site/theme.js`, `src/site/motion.jsx`, `public/fonts/`.

**Typography**
- Fonts: **Archivo** (variable, weights 400–900) and **JetBrains Mono** (variable, weights 400–700), both self-hosted as `.woff2` files under `public/fonts/` (`Archivo-Variable.woff2`, `JetBrainsMono-Variable.woff2`) — no Google Fonts CDN call, no Instrument Sans anywhere in the codebase.
- `@font-face` declarations: `src/index.css` lines 6–20. Tailwind exposes them as `font-archivo` / `font-jbmono` (`tailwind.config.js` lines 17–20). Root layout applies `font-archivo` globally (`src/app/layout.tsx` line 109); the Archivo file is preloaded for LCP (`layout.tsx` line 102).
- No custom type scale — font sizes use Tailwind's stock default scale (no `fontSize` override in `tailwind.config.js`).

**Color tokens** — two parallel systems, not yet unified:
- Semantic HSL CSS variables (`src/index.css` lines 27–70) consumed by Tailwind's `bg-primary`/`text-foreground`/etc. utilities, with light and `.dark` variants defined. Key values: `--background 48 24% 96%` (~#F7F6F1), `--foreground 207 55% 13%` (~#0F2434), `--primary 204 83% 30%` (~#0C5C8F), `--accent 103 42% 47%` (~#62A945).
- A primitive brand palette (`src/site/theme.js` lines 2–13), a plain JS object `T` imported directly into components: `T.bg #F7F6F2`, `T.panel #FFFFFF`, `T.text #0F2333`, `T.signal #0D5A8C` ("navy — primary/dominant accent"), `T.green #62A945` ("sparing green accent only"), `T.muted #47586A`, `T.faint #5C6B7A` (deliberately darkened from an earlier `#8090A0` to hit 4.5:1 contrast, per an inline code comment).
- The two systems are close but not byte-identical (e.g. `--primary` ≈ #0C5C8F vs `T.signal` #0D5A8C) — a candidate cleanup item for a future design-token consolidation pass.

**Spacing & layout**
- No custom Tailwind `spacing` scale — the project uses Tailwind's stock 4px-increment default.
- Container: centered, `2rem` side padding, `2xl` breakpoint capped at 1400px (`tailwind.config.js` lines 11–14). Global Tailwind breakpoints (sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1536) are otherwise untouched.
- Border-radius tokens driven by a single `--radius: 0.5rem` variable, with `md`/`sm` derived by subtracting 2px/4px (`tailwind.config.js` lines 35–39). No custom shadow tokens.

**Motion principles**
- No `motion.css` — motion lives in `src/site/motion.jsx` (React) plus supporting `@keyframes` in `src/index.css`.
- Dominant easing curve across the reveal system: `cubic-bezier(0.16, 1, 0.3, 1)` — an "ease-out-expo" style curve, reused by the `Reveal` component (800ms, `motion.jsx` lines 20–64), `LineReveal` (900ms, lines 66–76), and the hero entrance animation (`.phase3-hero-actions`, 800ms/700ms delay).
- Scroll-triggered reveals use `IntersectionObserver`, not scroll-position math (`Reveal` and `CountUp.jsx`).
- `CountUp.jsx` runs a hand-written `requestAnimationFrame` loop with a cubic ease-out function, not a CSS transition.
- Smooth scrolling uses the `Lenis` library with an exponential ease-out curve (`SmoothScroll.jsx`).
- **Accessibility-first:** `prefers-reduced-motion` is respected in three independent places — a `useReducedMotion()` hook, a `matchMedia` check inside `CountUp`, and a global CSS override block (`src/index.css` lines 141–157) that forces all animation/transition durations to `0.01ms` and disables the named animation classes outright. The one gap found: `SmoothScroll.jsx`'s Lenis instance does **not** check `prefers-reduced-motion` — worth fixing for full consistency.

---

## 2. Sitemap & content structure

### 2.1 Real navigation, as currently shipped

Read directly from `src/site/Header.jsx` and `src/site/Footer.jsx` — this is the actual, working, currently-deployed navigation, **updated 2026-08-09** after a source-provenance audit rolled the nav back to its verified spec (see Changelog). The header includes full keyboard support — Arrow/Home/End/Escape handling and focus trapping in the mobile menu, per `Header.jsx` lines 51–80.

```
Tayseer Innovations
├── Home (/)
├── Solutions (/solutions)                         [mega-menu, 2 groups]
│   ├── Banking platforms
│   │   ├── Core Banking (/solutions/core-banking)
│   │   ├── Fahim AI (/solutions/fahim-ai)
│   │   └── MBuke (/solutions/mbuke)
│   └── Operations & systems
│       ├── Managed Services (/solutions/managed-services)
│       ├── Banking Systems (/solutions/banking-systems)
│       └── Software Management Systems (/solutions/software-management-systems)
├── About Us (/about)
├── Blogs and Resources (/blog)
│   ├── The Rise of FinTech in the UAE (/blog/rise-of-fintech-uae)
│   └── Unleashing Financial Innovation... (/blog/open-banking-uae-ksa)
├── Careers (/careers)
├── Connect (/connect)                              [reached via the "Talk to us" CTA, the Solutions panel's
│                                                    "Talk to our team", and the footer's Company column —
│                                                    the duplicate direct nav link was removed 2026-08-10]
└── Footer-only:
    ├── Privacy Policy (/privacy)
    └── Terms & Conditions (/terms)
```

### 2.2 Real `sitemap.xml` and `robots.txt`

Two versions of each exist in the repo, and **only one pair is actually live**. `src/app/sitemap.ts` and `src/app/robots.ts` are Next.js dynamic route handlers that regenerate these files on every build; `public/sitemap.xml` and `public/robots.txt` are static leftover files that **play no role in the deployed site** — confirmed by diffing them against the real build output in `out/`, where the priorities and directives match the dynamic `.ts` versions, not the static files (e.g. `/solutions/core-banking` priority is `0.85` in the live sitemap vs `0.8` in the stale static file). **Recommendation: delete the two stale `public/` files** to avoid future confusion.

**Live `robots.txt`** (`out/robots.txt`, generated from `src/app/robots.ts`):
```
User-Agent: *
Allow: /
Disallow: /api/

Host: https://tayseerdemo.xyz
Sitemap: https://tayseerdemo.xyz/sitemap.xml
```

**Live `sitemap.xml`** (`out/sitemap.xml`, generated from `src/app/sitemap.ts` — 14 static routes + 2 blog posts pulled live from `blogData.js`):
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url><loc>https://tayseerdemo.xyz</loc><changefreq>weekly</changefreq><priority>1</priority></url>
<url><loc>https://tayseerdemo.xyz/solutions</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
<url><loc>https://tayseerdemo.xyz/solutions/core-banking</loc><changefreq>monthly</changefreq><priority>0.85</priority></url>
<url><loc>https://tayseerdemo.xyz/solutions/fahim-ai</loc><changefreq>monthly</changefreq><priority>0.85</priority></url>
<url><loc>https://tayseerdemo.xyz/solutions/mbuke</loc><changefreq>monthly</changefreq><priority>0.85</priority></url>
<url><loc>https://tayseerdemo.xyz/solutions/managed-services</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
<url><loc>https://tayseerdemo.xyz/solutions/banking-systems</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
<url><loc>https://tayseerdemo.xyz/solutions/software-management-systems</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
<url><loc>https://tayseerdemo.xyz/about</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
<url><loc>https://tayseerdemo.xyz/connect</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
<url><loc>https://tayseerdemo.xyz/careers</loc><changefreq>weekly</changefreq><priority>0.6</priority></url>
<url><loc>https://tayseerdemo.xyz/blog</loc><changefreq>weekly</changefreq><priority>0.75</priority></url>
<url><loc>https://tayseerdemo.xyz/privacy</loc><changefreq>yearly</changefreq><priority>0.2</priority></url>
<url><loc>https://tayseerdemo.xyz/terms</loc><changefreq>yearly</changefreq><priority>0.2</priority></url>
<url><loc>https://tayseerdemo.xyz/blog/rise-of-fintech-uae</loc><changefreq>yearly</changefreq><priority>0.65</priority></url>
<url><loc>https://tayseerdemo.xyz/blog/open-banking-uae-ksa</loc><changefreq>yearly</changefreq><priority>0.65</priority></url>
</urlset>
```

### 2.3 `redirects.json`

**No `redirects.json` file exists anywhere in this repository** (confirmed by a full-repo search). `next.config.mjs` defines security/cache headers only — no redirect rules are configured anywhere in the codebase today. If a redirect map was drafted elsewhere (e.g. a separate planning document outside this repo, or at the hosting-provider level), it has not been committed here and should be sourced from wherever it actually lives before this section can be considered complete.

---

## 3. Technical architecture & recommended technology stack

### 3.1 What's actually built

- **Framework:** Next.js 15.5.22, App Router, `output: "export"` (fully static HTML export — no Node.js server required at runtime).
- **UI:** React 19.2.8, Tailwind CSS 3.4.19 (+ `tailwindcss-animate`), `lucide-react` icons, `sonner` for toasts, `clsx`/`tailwind-merge` for class composition.
- **Language:** TypeScript for all App Router route files (`src/app/**/*.tsx`); shared page content components are JSX (`src/pages/*.jsx`, `src/site/*.jsx`).
- **Build tooling:** native Next.js compiler (no separate Babel/Webpack config); `npm run build` runs a clean step, `next build`, and static export in one pass.
- **Folder structure:**
  ```
  src/
    app/            → Next.js App Router: one folder per route, each with page.tsx (+ metadata) and optional layout.tsx
    pages/          → shared page-content components (Home.jsx, About.jsx, ... — the actual visual content, framework-agnostic)
    site/           → shared chrome & primitives: Header, Footer, Layout, Logo, motion.jsx, theme.js, forms, phase6/7/8/10 section components
    lib/            → small shared utilities (e.g. SITE_URL constant)
    components/ui/  → design-system primitives (shadcn/ui-style, per components.json)
  public/           → static assets: fonts, favicon, logo, ISO badge, manifest, OG image
  ```
- **Content-editing model:** because `Header.jsx`/`Footer.jsx`/`Layout.jsx` are shared React components rendered by every route, a sitewide content change (e.g. the footer email address, phone numbers, or office addresses) is a **single-file edit** that applies to all 15+ pages on the next build — this is standard React componentization, not per-page duplication.
- **Design tokens:** split across `tailwind.config.js` (Tailwind-facing config), `src/index.css` (CSS custom properties, light/dark), and `src/site/theme.js` (a plain JS object of brand colors) — see §1.2 for details. No CSS-only token file.
- **Metadata/SEO architecture:** per-route `metadata` exports (App Router convention), a shared `buildSolutionMetadata()`/`buildSolutionSchemas()` helper (`src/site/solutionSeo.ts`) for the 7 solution pages, dynamic `generateMetadata()` for blog posts pulled from `src/pages/blogData.js`, and a reusable `<StructuredData>` component for JSON-LD.

### 3.2 Open decisions — recommendations, clearly separated from the above facts

**Hosting platform** (not yet decided in this codebase — no hosting config, `vercel.json`, or Netlify config file exists):

| Option | Pros | Cons |
|---|---|---|
| **Vercel** | Built by the Next.js team; zero-config deploys; automatic preview URLs per PR; free Hobby tier: 100GB data transfer/mo, 1M edge requests/mo | Pro tier is $20/**user**/month + metered overages beyond the included credit; can get expensive at scale/multi-editor teams |
| **Netlify** | Simple static-hosting model fits this project's `output: "export"` build well; free tier includes 300 usage credits/mo; Pro at $20/month flat (team-wide, not per-seat) | Credit-based pricing model as of 2026 makes exact cost harder to forecast than a flat bandwidth number; some Next.js-specific optimizations (ISR, image optimization) need their Next.js Runtime plugin |
| **Traditional (S3+CloudFront, traditional VPS, etc.)** | Full control; can be cheapest at scale; no vendor lock-in | Requires manually replicating what Vercel/Netlify give for free (SSL, CDN, cache invalidation, preview deploys, header rules); more ops overhead for a team without existing infra |

This is a **static-export site with no server-side runtime requirement** today — so all three options are viable; the deciding factors are team workflow (PR previews), budget predictability, and whether future features (real form-handling API routes, ISR) would require dropping `output: "export"` in favor of a Node-hosted Next.js deployment (which rules out pure static hosts like S3, but not Vercel/Netlify).

**Form-submission backend** (currently unimplemented — see §4 for detail): the four forms already `fetch()` to `/api/connect` and `/api/careers`, but those routes don't exist and can't exist under `output: "export"` (static export has no server). Two paths forward:
1. Keep static export, swap the `fetch()` calls for a third-party form backend (Netlify Forms, Formspree, Basin, or similar) — smallest change, no hosting migration.
2. Drop `output: "export"`, deploy to Vercel/Netlify's Node runtime, and implement real Next.js Route Handlers at `/api/connect` and `/api/careers` — more control (e.g. custom résumé storage for Careers), more infrastructure to maintain.

**CMS vs. manual editing:** today, all content (solution copy, blog posts in `blogData.js`, footer contact details) is edited directly in source files and requires a redeploy to go live. Given the shared-component architecture already in place (§3.1), a sitewide *text* change is already low-cost (one file, one deploy) — the open question is really about **content velocity for non-developers** (marketing/HR updating blog posts or job listings without a code change). Options:
- **Status quo:** keep editing `blogData.js`/page files directly — zero added cost or complexity, but every content change needs a developer and a deploy.
- **Headless CMS** (e.g. Sanity, Contentful, a Git-based CMS like Tina/Decap): decouples content from code for blog posts and possibly job listings; adds a recurring subscription cost and integration work; most valuable if content-update frequency is expected to increase (e.g. weekly blog posts, frequent job postings).

---

## 4. Security approach

### 4.1 What's true today (verified against the code)

- **No external trackers/analytics found.** Full-repo search for Google Analytics/GTM/Meta Pixel/Hotjar/Mixpanel/Segment/Clarity/Amplitude signatures returned zero matches. The only `<script>` tags in the codebase are a legacy Vite entry point (unused, see §0) and a JSON-LD structured-data block (SEO, not tracking).
- **No exposed credentials.** No `.env` files are tracked in git (and `.gitignore` explicitly excludes them); a full-repo secret scan (API keys, Bearer tokens, AWS key patterns, private-key PEM headers) returned zero matches.
- **WCAG-compliant focus rings are implemented**, not just planned: `src/index.css` lines 81–89 define a global `:focus-visible` outline (3px solid `#0d5a8c`, 3px offset; 2px/1px for form fields), with a `forced-colors` mode override (line 159–163) for Windows High Contrast users. `docs/accessibility.md` documents a WCAG 2.2 AA target.
- **Client-side form validation exists** (`src/site/useAccessibleFormValidation.js`) via native HTML5 constraint validation with accessible error messaging — but this is presentation-layer validation only; there is no server-side re-validation or sanitization because there is currently no server (see below).
- **Security headers are configured in code** (`next.config.mjs` lines 22–47): `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: SAMEORIGIN`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`, plus `poweredByHeader: false`. **Important caveat:** the project builds with `output: "export"`, and Next.js does not apply `headers()` to a static export — these headers only take effect if the eventual hosting/CDN layer is separately configured to send them. No `_headers` file or CDN config exists yet to guarantee that in production.
- **ISO 27001 certification claim is real and already partially represented**: the badge asset exists and is rendered in both the global Footer and the homepage hero, with a navy contrast-backing chip specifically added to make the pale seal artwork legible against dark backgrounds (this was a deliberate fix, not an oversight — see prior project notes). This is a live claim on the site today, not a gap.

### 4.2 Real, still-open items

- **Forms are non-functional today — a specific, verified failure mode, not just "stubs".** All four forms (`HomeContactForm.jsx`, `ContactSection.jsx`, `Connect.jsx`, `Careers.jsx`) genuinely attempt a `fetch()` POST to `/api/connect` or `/api/careers` — but those API routes do not exist anywhere in the codebase, and **cannot** exist under the current `output: "export"` static-export configuration. In production, every submission attempt will fail (404/network error) and silently fall through to a `mailto:` link fallback that opens the visitor's local email client. This needs a real backend (see §3.2 options) before launch — and once wired, **CSRF/spam protection (currently entirely absent — no honeypot, no CAPTCHA, no CSRF token found anywhere in the repo) must be added at the same time.**
- **ISO 27001 Trust Center section:** the certification is displayed as a small badge in the footer/hero today, but there is no dedicated Trust Center / Security page detailing the certification scope, audit date, or a way to request the certificate — worth adding as the certification is a genuine differentiator in banking-sector sales conversations.
- **Security headers need hosting-layer confirmation:** since `next.config.mjs`'s `headers()` won't fire under static export, whoever finalizes the hosting decision (§3.2/§6) needs to re-implement these same header rules at that layer (e.g. Netlify's `_headers` file, a Vercel `vercel.json` headers block, or CDN rules) — otherwise the security headers currently "configured" in code will silently never reach real visitors.
- **No Content-Security-Policy, HSTS, or COOP/COEP headers** are configured anywhere — worth adding once the hosting layer is finalized, especially before real third-party form-handling or analytics scripts are introduced.

---

## 5. Scalability & performance plan, and SEO

### 5.1 SEO — what's actually implemented (audited page-by-page, not assumed)

Every one of the 15 pages (plus the bonus `/privacy`) has a page-specific `<title>`, meta description, canonical URL, Open Graph block, Twitter Card block, and either page-level or shared-layout JSON-LD structured data. This directly overturns the brief's working assumption that OG tags exist only on the homepage — coverage is broad. That said, three real, verifiable bugs were found in that same audit:

| Page | Issue | Evidence |
|---|---|---|
| `/about`, `/connect`, `/careers` | **Duplicated `<title>` suffix.** The root layout's title template (`%s \| Tayseer Innovations`) is being applied twice, producing e.g. `About Tayseer Innovations \| Banking Technology & AI Partner \| Tayseer Innovations` in the live HTML | Confirmed in built `out/about.html`, `out/connect.html`, `out/careers.html` |
| `/terms`, `/privacy` | **Wrong Twitter Card content.** Both pages omit a `twitter` metadata block, so Next inherits the *root layout's* Twitter title/description/image (i.e. the homepage's), rather than their own. Sharing a Terms or Privacy link on X/Twitter shows the homepage's card copy. `og:title`/`og:description` are correct on these two pages — only the Twitter-specific fields are wrong | Confirmed in built `out/terms.html`, `out/privacy.html` |
| All 15+ pages | **`/opengraph-image` has no file extension** and is only given the correct `Content-Type: image/svg+xml` header via `next.config.mjs`'s `headers()` — which, per §4, does not run under static export. On real static hosting, this file will likely be served with a generic content type, which can cause social-preview crawlers (Twitter/Facebook/LinkedIn/WhatsApp) to fail to render the image | `next.config.mjs` lines 39-44; confirmed `public/opengraph-image` has no extension |

Real, already-implemented SEO groundwork: solution pages share a single `solutionSeo.ts` metadata builder (title/description/canonical/OG/Twitter/3× JSON-LD schemas per page, consistently applied across all 7 pages); blog posts pull real per-slug title/excerpt from `blogData.js` into `generateMetadata()` (not hardcoded); a global `Organization` + `WebSite` JSON-LD block renders on every page via `<StructuredData>`.

**Open items, confirmed rather than assumed:**
- `robots.txt` **exists** (contra brief) — see §2.2 for its live content.
- `redirects.json` **does not exist** (contra brief) — see §2.3.
- Two stale, unused duplicate files (`public/robots.txt`, `public/sitemap.xml`) should be deleted to avoid confusion (§2.2).

### 5.2 Performance — real, measured page weight (not estimated)

Measured from the actual production build (`out/`) after a fresh `npm run build`. CSS is fully inlined into each HTML file (`experimental.inlineCss: true`, 33.7KB of inline CSS per page — already counted in the HTML size below, not an extra request). A ~527KB shared JS baseline (10 chunks: framework, webpack runtime, main app, polyfills, layout/error boundaries) downloads once and is cached across all pages/visits.

| Page | HTML (incl. inline CSS) | Local images | Page-specific JS* | Total weight (excl. one-time shared JS) |
|---|---|---|---|---|
| Home `/` | 232.2 KB | 121.8 KB (logo, ISO badge, hero SVG) | 30.3 KB | **381.5 KB** |
| Solutions | 122.4 KB | 118.4 KB working + 1 broken bg ref | 52.2 KB | **290.2 KB** (+133KB if bg fixed) |
| Core Banking | 177.5 KB | 118.4 KB | 46.5 KB | **339.6 KB** |
| Fahim AI | 177.1 KB | 118.4 KB | 46.5 KB | **339.2 KB** |
| MBuke | 175.5 KB | 118.4 KB | 46.5 KB | **337.6 KB** |
| Managed Services | 173.2 KB | 118.4 KB | 46.5 KB | **335.4 KB** |
| Banking Systems | 179.3 KB | 118.4 KB | 46.5 KB | **341.4 KB** |
| Software Mgmt Systems | 180.6 KB | 118.4 KB | 46.5 KB | **342.7 KB** |
| About | 153.3 KB | 118.4 KB working + 1 broken bg ref | 16.3 KB | **285.3 KB** (+133KB if bg fixed) |
| Connect | 108.1 KB | 118.4 KB working + 1 broken bg ref | 48.0 KB | **271.8 KB** (+133KB if bg fixed) |
| Careers | 105.9 KB | 118.4 KB working + 1 broken bg ref | 46.4 KB | **268.0 KB** (+133KB if bg fixed) |
| Blog listing | 110.1 KB | 118.4 KB working + 1 broken bg ref | 56.4 KB | **282.2 KB** (+133KB if bg fixed) |
| Blog — Rise of FinTech | 120.5 KB | 118.4 KB working + 1 broken bg ref | 60.5 KB | **296.6 KB** (+133KB if bg fixed) |
| Blog — Unleashing Financial Innovation | 121.0 KB | 118.4 KB working + 1 broken bg ref | 60.5 KB | **297.1 KB** (+133KB if bg fixed) |
| Terms | 107.0 KB | 118.4 KB | 34.3 KB | **257.0 KB** |

\*Excludes the ~527KB one-time shared JS baseline, cached across every page after the first visit.

**A real bug found in the course of this measurement:** 7 of the 15 pages (Solutions, About, Connect, Careers, Blog listing, both blog articles) render their hero background via Next's `/_next/image?url=...` optimization endpoint — but that endpoint does not exist in a static export (`images.unoptimized: true` was not set in `next.config.mjs`). On real static hosting with no image-optimization rewrite in front of it, this request will 404 and the hero background image will not load on those 7 pages. This should be fixed before launch — either by setting `images.unoptimized: true` or switching those specific images to plain `<img>`/static asset references.

### 5.3 Scalability

The site is a fully static export — there is no application server or database to scale. Scalability is therefore a function of the CDN/hosting layer chosen (§3.2/§6), not the application code. The one place this changes is if/when real form-handling API routes are introduced (§3.2, §4) — at that point the relevant scaling question shifts to whichever serverless/function runtime hosts those endpoints.

---

## 6. Deployment, maintenance & support plan

### 6.1 Maintenance cost reality — corrected from the original brief

The original brief's central maintenance-risk claim — "no shared header/footer partial exists, so every sitewide change requires editing all 15 files individually" — **does not hold for this codebase**. `Header.jsx`, `Footer.jsx`, and `Layout.jsx` are shared React components rendered by every route via the App Router. A footer email, phone number, or address change is a single-file edit, verified through `Footer.jsx` (all contact details centralized in one component). This substantially lowers the ongoing maintenance burden the brief assumed.

What *does* still require manual, per-file work today:
- Blog posts are added by editing `src/pages/blogData.js` directly (no CMS) — fine at 2 posts/year cadence, a growing cost at higher publishing frequency (§3.2 CMS discussion).
- Each of the 7 solution pages is its own `page.tsx` + shared layout component — adding an 8th solution means a new route file, not just new content in an existing template.
- The two title-tag and Twitter Card bugs found in §5.1 need direct code fixes; they're not something a CMS or shared component would have prevented, since they're metadata-inheritance behavior, not duplicated content.

### 6.2 Hosting options — presented neutrally (not yet decided)

See §3.2 for the full Vercel/Netlify/traditional-hosting comparison table — the same tradeoffs apply here. No recommendation is made in this document since the decision depends on team workflow preferences and budget predictability that are the client's to set, not a technical fact this audit can determine.

### 6.3 Ongoing support scope (once hosting is decided)

Regardless of host, the following recurring maintenance tasks apply to this specific codebase:
- Dependency updates (Next.js/React/Tailwind version bumps) — `npm audit` is already wired into CI (`.github/workflows/nextjs-ci.yml`).
- Content updates to `blogData.js` and page copy, requiring a rebuild/redeploy each time (until/unless a CMS is adopted, §3.2).
- Monitoring the two title/Twitter-Card bugs and the broken `/_next/image` references (§5) until fixed.
- Once forms are wired to a real backend (§3.2/§4): monitoring submission delivery and spam-filter effectiveness.

---

## 7. Cost estimate template

**No bottom-line figure or labor rate is included below — this is a structured checklist of every real cost category this project involves, with the actual technical facts needed to price each line. Rate/hours/total cells are intentionally blank for manual completion.**

### 7.1 Domain & hosting

| Item | Technical fact | Rate/period | Est. hours | Total |
|---|---|---|---|---|
| Domain (current: `tayseerdemo.xyz`; production target implied by code comments: `tayseer.me`, not yet live — `fd64271` commit message: *"point canonicals/sitemap/robots at tayseerdemo.xyz until tayseer.me is live"*) | Domain registration/renewal, typically annual | ☐ ___/yr | — | ☐ ___ |
| Hosting — **Vercel** | Hobby: free (100GB transfer, 1M edge requests/mo). Pro: $20/**user**/mo + $2/1M extra edge requests, $0.15/GB extra transfer beyond 1TB | ☐ tier: ___ | — | ☐ ___/mo |
| Hosting — **Netlify** | Free: 300 credits/mo. Pro: $20/mo **flat** (not per-seat), 3,000 credits/mo, 3+ concurrent builds | ☐ tier: ___ | — | ☐ ___/mo |
| Hosting — **Traditional** (VPS/S3+CDN) | No published tier — priced per provider (e.g. AWS S3+CloudFront usage-based) | ☐ provider: ___ | — | ☐ ___/mo |
| CDN/SSL | Included free with Vercel/Netlify; separate line item if self-hosting | ☐ | — | ☐ ___ |

### 7.2 Form-handling backend (required — see §4)

| Item | Technical fact | Rate/period | Est. hours | Total |
|---|---|---|---|---|
| Third-party form service (Formspree/Basin/Netlify Forms) OR custom API route | Currently unimplemented; `/api/connect` (JSON) and `/api/careers` (multipart, incl. résumé upload) both need a real endpoint | ☐ provider/approach: ___ | ☐ ___ hrs | ☐ ___ |
| CSRF/spam protection (honeypot/CAPTCHA) | Currently absent entirely, confirmed by full-repo search | ☐ | ☐ ___ hrs | ☐ ___ |
| Résumé file storage (Careers form) | `Careers.jsx` submits a `FormData` payload including a file — needs a storage destination (S3, provider-native storage, email attachment, etc.) | ☐ ___ | ☐ ___ hrs | ☐ ___ |

### 7.3 Licensed fonts/tools

| Item | Technical fact (confirmed against source) | Cost |
|---|---|---|
| Archivo (variable font, self-hosted) | SIL Open Font License 1.1 — free for commercial use, embedding, and redistribution; cannot be sold standalone | **$0** |
| JetBrains Mono (variable font, self-hosted) | SIL Open Font License 1.1 — same terms as above | **$0** |
| Kumbh Sans | **Not used anywhere in the current codebase** — no font files, `@font-face` rules, or Tailwind config reference it. If the brief's mention of it reflects a future design direction, note for the record: it is also SIL OFL 1.1 (free) on Google Fonts, so adding it later carries no licensing cost, only implementation time | **$0 today; $0 if added later** |
| Icon set (`lucide-react`) | ISC license (permissive, free commercial use) | **$0** |
| UI primitives (shadcn/ui pattern, per `components.json`) | MIT-licensed, code is copied into the repo (not a runtime dependency subscription) | **$0** |

### 7.4 Ongoing maintenance & support

| Item | Technical fact | Rate | Est. hours/mo | Total/mo |
|---|---|---|---|---|
| Content updates (blog, solution copy) via direct file edits | No CMS today (§3.2) — each update needs a developer + redeploy | ☐ ___/hr | ☐ ___ | ☐ ___ |
| Dependency/security updates | `npm audit` already runs in CI; Next.js/React major-version bumps are periodic, larger efforts | ☐ ___/hr | ☐ ___ | ☐ ___ |
| Bug backlog from this audit (title-tag duplication, Twitter Card inheritance, broken `/_next/image` refs, missing CSRF protection) | 4 concrete, scoped fixes identified in §5/§4 | ☐ ___/hr | ☐ ___ | ☐ ___ |
| Optional: headless CMS subscription | Only if the CMS path in §3.2 is chosen (e.g. Sanity/Contentful tiers) | ☐ ___/mo | — | ☐ ___ |

---

## 8. High-level implementation timeline

**No delivery dates are committed below — this is a factual retrospective of completed work plus a scope list of known remaining work, not a scheduled plan.**

### Phase 1 — Completed (per git history and in-repo phase documentation)

Reconstructed from `git log` (21 commits, 2026-08-07 to 2026-08-09) and `README_PHASE3.md`/`README_PHASE4.md`/`docs/phase6-design-cro.md`/`docs/phase8-enterprise-solutions.md`/`docs/phase9-performance-hardening.md`:

- Initial static-site build, then migration from a pre-Next.js React/Vite SPA to **Next.js 15 App Router** with static export (`f5f3324 "change to next js"`, `61a90ed` cleanup of the legacy SPA leftover file).
- **Performance & architecture baseline** (Phase 3): server-first root layout, deferred/reduced-motion-aware Lenis smooth scroll, route prefetching instead of eager whole-site prefetch, Next Image optimization for hero images, AVIF/WebP formats, long-lived caching for fonts/logo, native `IntersectionObserver`-based reveal/marquee/counter primitives, homepage converted to a Server Component, dead-code removal (unused React Query/next-themes dependencies).
- **SEO & structured-data architecture** (Phase 4): global metadata/canonical/crawler directives, Organization + WebSite JSON-LD, branded OG image, dynamic sitemap including blog articles, hardened robots rules, per-page structured data (CollectionPage/ItemList/Article/BreadcrumbList/Service), centralized solution-page SEO definitions, corrected a corrupted blog title.
- **Design & conversion enhancement** (Phase 6) and **enterprise solution page upgrades** (Phase 8) across all 6 solution detail pages, preserving the accessibility/SEO/performance foundation from earlier phases.
- **Performance & production hardening** (Phase 9): bundle-size and Core Web Vitals work.
- Font self-hosting migration (Archivo/JetBrains Mono, replacing a CDN font load) to cut CLS (`c315901`).
- ISO 27001 badge added with a contrast-fix backing chip (`fa1562f`, `5f68be3`).
- Canonical URLs pointed at the current demo domain pending the production domain going live (`fd64271`).

### Phase 2 — Remaining, unscheduled (scope only — no dates)

- Fix the two SEO metadata bugs found in this audit: duplicated `<title>` suffix on About/Connect/Careers; wrong Twitter Card inheritance on Terms/Privacy (§5.1).
- Fix the broken `/_next/image` references on 7 pages that will 404 under static hosting (§5.2).
- Wire a real form-submission backend for the Connect and Careers forms, including CSRF/spam protection (§3.2, §4, §7.2).
- Decide and configure the hosting platform (§3.2/§6), and re-implement the security headers currently defined in `next.config.mjs` (which don't fire under static export) at that hosting/CDN layer.
- Delete the two stale, unused `public/robots.txt` / `public/sitemap.xml` files (§2.2).
- Build a dedicated ISO 27001 Trust Center section beyond the current footer/hero badge (§4.2).
- Legal page review of the existing Terms/Privacy content (not evaluated for legal accuracy in this technical audit).
- Decide on a CMS vs. continued direct-file-editing model for blog/content updates (§3.2).
- Source or draft an actual `redirects.json`/redirect map, since none currently exists in this repo (§2.3).

---

## 9. Note on how AI was used in this process

This project was implemented primarily by **Claude Code acting as an autonomous coding agent** — reading the existing codebase, making the Next.js App Router migration, implementing the SEO/structured-data/performance work described in Phase 1 above, and now producing this audit report by re-reading the live source and a fresh production build rather than working from memory or prior summaries.

Throughout the project, **a separate instance of Claude in a standard chat interface was used as an independent reviewer** — checking the implementation agent's work against the actual live site rather than trusting its own commit messages. That review process is what caught, among other things: fabricated statistics that had crept into earlier draft copy, duplicate/incorrect canonical URLs, a non-functional navigation state, and inconsistent logo usage — all before they reached production. This two-model-role structure (one agent implementing, one independently verifying against the real deployed artifact) is the actual, accurate description of how AI was used here — not a marketing claim about AI capability.

---

## Deliverable confirmation

- **Report:** `PROPOSAL_REPORT.md` (this file), at the repository root.
- **Screenshots:** `screenshots/[page]/[viewport].png` — **45 files confirmed on disk, re-captured 2026-08-09** (second pass, after fixing the scroll-triggered-reveal capture bug described in the Changelog), one per page × viewport combination listed in §1.1, all non-empty and spot-checked visually end-to-end on representative pages (verified via file listing after capture, zero failures in the capture run).
- **Screenshot folders (15):** `index`, `solutions`, `core-banking`, `fahim-ai`, `mbuke`, `managed-services`, `banking-systems`, `software-management-systems`, `about-us`, `connect`, `blog`, `blog-article`, `unleashing-financial-innovation`, `careers`, `terms`.
- **Viewports per page (3):** `1440.png`, `768.png`, `360.png`.
- **15 × 3 = 45.** Matches exactly.
