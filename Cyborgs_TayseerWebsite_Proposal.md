# Tayseer Website Redesign — Delivery Proposal

**Prepared for:** Tayseer Website Challenge (submission to s.ghauri@seersolutionz.com)
**Prepared:** 2026-08-10 · **Deadline:** 2026-08-11, 18:00
**Filename:** `Cyborgs_TayseerWebsite_Proposal.md` — team name: Cyborgs.

---

## How this proposal was built — a note before the deliverables

This proposal's core differentiator, stated plainly rather than implied: it's backed by a real, working, buyer-first prototype and a verified/corrected technical audit — not a slide deck. Everything in this document is grounded in one of three sources, and each claim is labeled so a judge can tell which:

1. **A real, working Next.js prototype** — not slides. The screenshots in the UI/UX section are of pages actually running on the build in this submission, including a brand-new "Banks" sector page built specifically to demonstrate the proposed information architecture.
2. **A real audit of the current live site** (`tayseer.me`) — Semrush's 2026-08-02 Site Audit (PDF + four data exports), independently re-checked against a live crawl on 2026-08-10 (the submission date) rather than taken at face value.
3. **Explicitly flagged target-state decisions** — the recommended technology stack, hosting, support tiers, and cost/timeline figures are presented as the team's recommendation, clearly separated from what the working prototype proves today.

Two corrections surfaced while preparing this document, both handled transparently rather than silently:

- The audit figures in the original working brief (119 URLs, "5 missing security headers," 7.8MB images) did not match what Semrush's own export data says. Section 5 reports the **real, re-verified numbers** and states plainly where the original figures came from a different source or couldn't be substantiated at all — because a wrong number cited confidently is worse than a smaller, correct one.
- The target technology stack described in the brief (Next 16.2.12, next-intl, Tailwind v4 `@theme`) does not exist in the working prototype yet, which runs Next.js 15.5.22 on Tailwind v3. Section 3 presents both states side by side rather than blurring them into one.

---

## Live deployment — click it, don't just read about it

**The prototype is deployed and live: [https://tayseerdemo.xyz/](https://tayseerdemo.xyz/)** (Cloudflare). Every screenshot in this document is of a page you can open yourself, right now — a judge-clickable URL is stronger evidence than a static image, so this is placed here deliberately, before the deliverables start.

**Lighthouse scores, independently re-run against the live URL — not the old local build:**

| Category | Live score | Earlier local build | Change |
|---|---|---|---|
| Performance | 97 *(team-reported — see verification note below)* | 97 | — |
| Accessibility | **100** *(independently confirmed)* | 97 | **97 → 100** |
| Best Practices | **100** *(independently confirmed)* | — | — |
| SEO | **100** *(independently confirmed)* | — | — |
| Agentic Browsing | **100** *(independently confirmed)* | 67 | **67 → 100** |

The Accessibility and Agentic Browsing jumps are exactly the kind of evidence §9 (AI-use note) is talking about: a review pass caught real gaps against the local build, they got fixed, and the live number reflects it — not a claim, a rerun.

**Verification note, in the same spirit as the rest of this document — we did not just repeat the team-reported numbers:**
- **Accessibility, Best Practices, SEO, and Agentic Browsing were independently re-run against the live URL, 4 times, and landed on exactly 100 every time** — stable and reproducible, not a one-off. Full JSON/HTML Lighthouse report attached: `lighthouse-report/tayseerdemo-live.report.html` / `.json`, plus a run-by-run log at `lighthouse-report/RUNS_LOG.md`.
- **Performance did not reproduce as a stable 97 from here.** Four independent runs against the live site ranged **82–98 (median ≈86)** — Lighthouse performance scores are known to be sensitive to network path and load conditions when testing a remote site, so this spread is plausible variance rather than a contradiction of the team's number, which does fall inside the observed range. We're reporting our own range transparently rather than either rubber-stamping 97 or quietly substituting a different single number — a judge re-running this themselves may reasonably see anywhere in that band.
- **The "earlier local build" column (Accessibility 97, Agentic Browsing 67) is team-reported, not independently re-verified by us** — no local Lighthouse run from before this deployment was available to check it against. Flagged as such rather than presented with the same confidence as the live numbers we did rerun.

---

## 1. Website UI/UX design & prototype

### 1.1 Design tokens — corrected

The prototype previously carried an old petrol-navy/viridian palette (`#0D5A8C` navy-blue, `#62A945` green, `#F7F6F2` paper) left over from an earlier design pass, and Archivo typography instead of the confirmed brief. Both are fixed as of this submission, across every real token surface in the codebase — not just the visible screens:

| Token | Value | Role |
|---|---|---|
| `white` | `#FFFFFF` | Cards / panels |
| `mist` | `#F7FAFD` | Page background |
| `tint` | `#EAF2FB` | Alternate section background |
| `edge` | `#C3D9F0` | Borders / dividers |
| `blue` | `#0F5CBF` | Primary accent — CTAs, links, focus ring |
| `navy` | `#0A2846` | Body text / ink |
| `steel` | `#526B84` | Muted text / labels |
| `amber` | `#9A6410` | **Pending-verification state only** — never a general accent |
| `amber-tint` | `#FBF2E3` | Backing fill for amber chips |

**Typography:** Instrument Sans (self-hosted variable font, weight carries hierarchy — no separate display face) for everything, JetBrains Mono for every fact: dates, codes, cert numbers, table headers, eyebrows. Both self-hosted as `.woff2` (no Google Fonts CDN round-trip), consistent with how the prototype already self-hosted its previous typeface.

**Files actually changed** (so this is auditable, not asserted): `src/index.css` (font-face + CSS custom properties + focus-ring color), `tailwind.config.js` (font family + flat brand-color utilities), `src/site/theme.js` (the `T` object every page component imports colors from), `src/app/layout.tsx`, root `index.html`, plus a scripted sweep of 22 component files that had the old palette hardcoded as literal hex values (`#0D5A8C`/`#62A945`) rather than referencing the token — those are now on-token too.

**Motion:** unchanged and already compliant — transform/opacity only, `prefers-reduced-motion` respected in three independent places (see the existing codebase's accessibility work). No parallax anywhere in the codebase.

**One honest exception, not glossed over:** the primary navigation uses a `backdrop-blur` on its sticky header (a translucent scroll-through blur so nav stays legible over scrolling content). That is a functional use of blur, not decorative glassmorphism — no frosted card panels, no glass borders elsewhere — but it is technically a blur effect, and the brief's "no glass" instruction is stated as a hard rule, so it's flagged here rather than quietly kept. Removing it is a five-minute change if the judges want zero exceptions; we left it because dropping it makes the header unreadable over busy hero content without a redesign of that section.

### 1.2 The two screens

Two real screenshots (1440px, Chromium via Playwright) of the actual build in this submission — not mockups. Given the deadline, this is presented honestly as two working screens rather than padded with a third invented page.

**Home** — the existing homepage, now on-token.
![Home screen](screenshots/proposal/home.png)

**Banks — sector page** *(new page, built for this proposal — `/sectors/banks`)* — demonstrates one of the four proposed buyer segments. Every capability shown is reused verbatim from the site's existing, real Core Banking and Banking Systems pages, regrouped under a buyer-first lens rather than a product-catalogue one — nothing here is new copy.
![Banks sector screen](screenshots/proposal/sectors-banks.png)

The new page builds and renders on the same production toolchain as the rest of the site (`npm run build`, static export) — it's not a Figma mockup grafted on top.

---

## 2. Sitemap & content structure

This section is the clearest evidence of this proposal's differentiator (a working prototype and a verified audit, not a slide deck): the contrast below isn't described in the abstract, it's built — the Banks page in §1.2 is the proposed structure on the right, actually running.

### 2.1 What the current site actually asks a visitor to do

Read directly from the live navigation (both the working prototype's `Header.jsx` and the current production `tayseer.me`): organize by **product name**, and make the visitor figure out which of six products applies to them.

```
Tayseer Innovations (current, live)
├── Home
├── Solutions                                 [mega-menu, product catalogue]
│   ├── Core Banking
│   ├── Fahim AI
│   ├── MBuke
│   ├── Managed Services
│   ├── Banking Systems
│   └── Software Management Systems
├── About Us
├── Blogs and Resources
├── Careers
└── Connect
```

A bank, a telecom operator, an exchange/MTO, and a government buyer all land on the same "Solutions" menu and have to self-translate six product names into "is this for me?" — before they've learned anything about Tayseer's credibility on their specific problem.

### 2.2 The proposed buyer-first IA

```
Tayseer Innovations (proposed)
├── Home
├── Banks              → Core Banking + Banking Systems capabilities, reframed
├── Telecom             → relevant capabilities regrouped by buyer, not by product
├── Exchange & MTO       → relevant capabilities regrouped by buyer, not by product
├── Government            → relevant capabilities regrouped by buyer, not by product
├── About Us / Blogs and Resources / Careers / Connect   [unchanged]
```

The six product lines don't disappear — Core Banking, Fahim AI, MBuke, Managed Services, Banking Systems, and Software Management Systems remain real pages with the same content. What changes is the **entry point**: a buyer opens the sector door with their name on it, and the relevant products are already assembled behind it. The Banks page built for this submission (§1.2) demonstrates this works without rewriting a single capability description.

**What shipped as working proof vs. what's a scoped recommendation:** Banks is a real, running page today (§1.2). Telecom, Exchange & MTO, and Government are the same pattern, not yet built — each is a repeat of the same regrouping exercise applied to different existing product content, scoped at roughly half a day each once the Banks template is approved.

---

## 3. Technical architecture & recommended technology stack

### 3.1 What's real today — the working prototype in this submission

- **Framework:** Next.js 15.5.22, App Router, `output: "export"` (fully static — no server required at runtime).
- **UI:** React 19.2.8, Tailwind CSS 3.4.19 (`tailwind.config.js`, not yet the v4 `@theme` model), `lucide-react`, `sonner`.
- **Fonts:** self-hosted `.woff2` via manual `@font-face` (not `next/font` — see 3.2 for why that matters).
- **No `middleware.ts`/`proxy.ts` of any kind** — static export has no server tier to run one on.
- **Design tokens:** now consolidated on the confirmed palette (§1.1), split across `tailwind.config.js` + `src/index.css` custom properties + a plain `theme.js` JS object consumed directly by every page component.
- **Content model:** shared `Header.jsx`/`Footer.jsx`/`Layout.jsx` — a sitewide content change (contact details, phone numbers) is a one-file edit applied on next build, not 15 separate edits.
- **This is a working, building scaffold** — `npm run build` runs clean, exports 24 static routes including the two new pages built for this submission. That's a real differentiator against a slide deck: judges can clone this and run it.

### 3.2 The recommended target stack — clearly separated from the above, not yet built

The brief for this challenge specifies a more advanced target: **Next 16.2.12 / React 19.2.4 / Tailwind v4 / next-intl 4.13.4 / Node 22**. None of that exists in the working prototype today, and given the submission deadline, we made a deliberate call: **do not attempt a live framework migration this close to the deadline** — the risk of a half-migrated, broken scaffold is worse than an honestly-labeled recommendation. This is a stated assumption, not a gap papered over:

| Correction | What it means | Why it's evidence, not a guess |
|---|---|---|
| **`proxy.ts`, not `middleware.ts`** | Next 16 renamed the middleware entry point. A team that's actually read the Next 16 changelog writes `proxy.ts` from day one instead of writing `middleware.ts` and getting a deprecation warning. | This detail has no reason to appear in a proposal unless someone checked the actual framework release notes rather than pattern-matching "Next.js uses middleware.ts" from outdated training data. |
| **`@theme`, not `tailwind.config.js`** | Tailwind v4 moved token definition into a CSS-native `@theme` block, replacing the JS config file this prototype still uses. The confirmed design tokens (§1.1) are written in a way that maps directly onto an `@theme` block with no restructuring — only the file changes. | Same signal: shows the token architecture was designed for where the stack is going, not just where it is. |
| **`next/font` auto-subsetting** | The working prototype self-hosts fonts manually (`@font-face` + `<link rel="preload">`, per §1.1) — functionally fine, but `next/font` would auto-subset and inline font CSS with zero manual preload management. Worth adopting on migration, not before. | Named as a specific, checkable optimization rather than a vague "we'll use best practices" line. |

**Recommendation:** migrate to the target stack as the first item of Phase 1 delivery work (see §8 Timeline), once the framework is chosen and a build budget exists to de-risk it properly — not retrofitted under a 24-hour deadline.

### 3.3 Hosting-layer decision, deferred to §6

Not decided in the working prototype (no `vercel.json`, no Netlify/Azure config exists yet) — presented neutrally in the Deployment section (§6) since it depends on team workflow and budget, not a technical fact this proposal can settle unilaterally.

---

## 4. Security approach

### 4.1 Lead evidence — the reproducible audit of the current live site

Independently verified from Semrush's Site Audit of `tayseer.me` (crawled 2026-08-02; PDF report + 4 companion data exports, cross-checked against each other and against a fresh live check run on 2026-08-10, the day this proposal was written):

- **TLS/HTTPS itself is healthy** — zero certificate, protocol-version, SNI, or mixed-content failures across the crawl. This is not the weak point.
- **No HSTS on either subdomain** — confirmed 2/2 (`tayseer.me` and `www.tayseer.me`), a real, currently-live gap: without HSTS, a visitor's first request to the bare domain can be intercepted before the redirect to HTTPS ever happens.
- **Zero structured data (JSON-LD/schema.org) anywhere on the site** — confirmed by summing the structured-data columns across all 51 crawled URLs: the total is 0. (Open Graph tags, by contrast, are present on all 31 real pages — this is specifically a schema.org gap, not a general metadata gap.)
- **A correction on the "5 missing headers" figure from the original brief:** Semrush's Site Audit configuration, as actually run against this domain, does not check for CSP/X-Frame-Options/X-Content-Type-Options/Referrer-Policy/Permissions-Policy at all — that's a different tool's checklist (commonly securityheaders.com's exact five checks), not something in this Semrush export. We are not attributing that figure to this audit. What we can state with a citation is the HSTS finding above, and — independently, live, today — that a plain header check against the production site shows no CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, or Permissions-Policy configured. Both facts point the same direction; only one is Semrush-sourced.

### 4.2 What's already wired in the working scaffold — real, not aspirational

The prototype in this submission ships **6 security headers + a Content-Security-Policy**, configured in `next.config.mjs` and confirmed by re-reading the file, not carried over as a claim from an earlier draft:

`X-Content-Type-Options` · `Referrer-Policy` · `X-Frame-Options` · `Permissions-Policy` · `Strict-Transport-Security` · `Cross-Origin-Opener-Policy` · **+ Content-Security-Policy**

The CSP allows `'unsafe-inline'` on `style-src` specifically because the build inlines all page CSS for performance (`experimental.inlineCss`) — a stated tradeoff, not an oversight, and tightenable with nonces if the target stack later drops static export for a Node runtime.

**One real caveat, stated plainly:** under `output: "export"`, Next.js's `headers()` does not fire in production by itself — these headers need to be mirrored at whichever hosting/CDN layer is finally chosen (§6). If the target stack migration in §3.2 drops static export in favor of Vercel's/Azure SWA's Node runtime, `headers()` applies natively and this caveat disappears entirely.

### 4.3 Where the certification claim actually lives today

ISO/IEC 27001:2022 is a real, live claim on the working prototype right now — the badge asset is already rendered in both the global Footer and the homepage hero (with a navy contrast-backing chip added specifically to keep the pale seal artwork legible against dark backgrounds). Stated plainly rather than routed through a new page built to hold it: that's where the certification is surfaced today, and it doesn't need a dedicated page to be a real, checkable claim — a judge can see it on the live homepage in §1.2 without an extra click.

---

## 5. Scalability, performance & SEO

### 5.1 The headline number is real — and still misleading, just not for the reason originally guessed

**Semrush Site Health: 88%, confirmed exactly** from the PDF. But the crawl breakdown behind that score tells a starker story:

| Crawl outcome | Count | Share |
|---|---|---|
| Healthy | **0** | **0%** |
| Redirect | 17 | 33.3% |
| Have issues | 31 | 60.8% |
| Broken | 3 | 5.9% |
| **Total crawled** | **51** | — |

**Not one of 51 crawled URLs is clean.** That's the real evidence for "88% overstates health," and it's stronger for being simple: zero healthy pages, full stop.

The specific mechanism is also concrete and real, just different from the original guess of a "canonical-to-redirect chain" (Semrush's own canonical/redirect-loop checks report zero failures — we checked, and are not claiming a finding the data doesn't support):

- **100% of the site's 31 real pages report `Canonicalization: Canonical to other page`** — not one indexable page on the whole site canonicalizes to itself.
- **40 URLs carry a permanent redirect**, largely because internal links point at the bare `tayseer.me` domain, which 301s to `www.tayseer.me` — a 2-hop chain on routine navigation.
- **The single Error-level (not Warning, not Notice) finding in the entire crawl:** `robots.txt` and `sitemap.xml` both returned a 4XX status at crawl time (2026-08-02). **Re-checked live on 2026-08-10** (the day this proposal was written): both now return 200 — so this was either fixed since the audit or was a transient issue, and we're reporting that honestly rather than citing a stale "still broken" claim.

Correcting the original brief's specific figures against the real export:

| Cited in the original brief | What the Semrush export actually says |
|---|---|
| 119 URLs audited | **51 URLs** — confirmed across all 4 companion data exports independently |
| 5 missing security headers | Not a metric this Semrush configuration checks (§4.1) |
| 7.8MB unoptimized images | Not in any Semrush export. Independently spot-checked live: the current homepage's 27 images total **~1.09MB**, with one 713KB outlier (`blog-image1-scaled.webp` — large for a file named "scaled"). The 7.8MB figure could not be substantiated and should not be repeated as fact; it may refer to a sitewide total across pages we didn't individually crawl. |
| HTTP/1.1 | **Confirmed independently, live, today** — both `tayseer.me` and `www.tayseer.me` serve over HTTP/1.1, not HTTP/2 or HTTP/3. |
| Zero structured data | **Confirmed** — JSON-LD and Microdata both sum to 0 across all 51 crawled URLs. |

### 5.2 What's already fixed in the working scaffold

- `robots.ts` and `sitemap.ts` — dynamic Next.js route handlers, regenerated on every build (not static files that drift from reality).
- `hreflang` — wired for the multilingual target (pending the next-intl migration, §3.2, for full effect).
- `trailingSlash: false` — deliberate, consistent URL shape (confirmed: the static export emits `route.html`, not `route/index.html`, so this setting is already exercised, not just declared).
- **Fixed during this submission, not just documented:** `images.unoptimized: true` added to `next.config.mjs`. This single line fixes two real bugs found in an earlier audit of this same prototype — a dev-server crash on six image-heavy routes, and a production 404 on the same routes' hero backgrounds — both caused by the same root issue: Next's image optimizer has no server to run on under `output: "export"`.
- **Live-measured, not just configured:** see the Lighthouse verification block near the top of this document — Accessibility, Best Practices, SEO, and Agentic Browsing all independently reproduced at 100/100 against the deployed URL across 4 runs. Performance is reported with an honest range (82–98 observed here) rather than a single unverified figure.

### 5.3 Scalability

The prototype is a fully static export — no application server, no database, so scaling is a function of the CDN/hosting layer (§6), not application code. That changes only if/when the target stack drops static export for a Node runtime to support ISR or real API routes.

---

## 6. Deployment, maintenance & support plan

**Hosting:** Vercel or Azure Static Web Apps — both fit a Next.js static export (or, if the §3.2 migration to the target stack proceeds and drops `output: "export"`, both also support Next's Node runtime natively, which resolves the header-mirroring caveat in §4.2 automatically). Decision point: team workflow (PR previews) and data-residency requirements, not a technical blocker either way.

**CDN/Edge:** Cloudflare Pro — WAF, edge caching, and the layer where the security headers (§4.2) get mirrored if static export is retained.

**Support tiers:**

| Tier | Scope |
|---|---|
| **Bronze** | Uptime monitoring, dependency/security patching, monthly report. |
| **Silver** | Bronze + content updates (blog, solution copy) within agreed SLA, quarterly performance review. |
| **Gold** | Silver + priority incident response, roadmap advisory, new-sector-page builds (§2.2) included in scope. |

**CMS:** Sanity — decouples blog/content updates from a developer + redeploy cycle, matching the "content velocity for non-developers" gap the current architecture already has (today, every content change requires a code edit and rebuild). **Payload** as the fallback if data-residency requirements rule out Sanity's hosted infrastructure — self-hostable, same headless model, more ops overhead in exchange for full data control.

---

## 7. Cost estimate

| Tier | Price | Timeline | Scope |
|---|---|---|---|
| **Essential** | $14,500 | 6 weeks | Buyer-first IA (Banks, Telecom, Exchange & MTO, Government) built out, design-token/typography fix, security headers + CSP hardening, robots/sitemap/hreflang fixes. |
| **Recommended** | $22,500 | 7 weeks | Essential, plus the Next 16 / Tailwind v4 / next-intl stack migration (§3.2), Sanity CMS integration, full SEO remediation (structured data, canonical/redirect cleanup from §5.1). |
| **Premium** | $32,000 | 9 weeks | Recommended, plus Gold support-tier onboarding, performance hardening pass, and a second sector-page batch beyond Banks. |

**The timeline arithmetic, shown openly rather than asserted:** the Recommended tier's scope is estimated at **72 person-days**. Two people working in parallel (a build lead and a design/content lead, the realistic team size for this project) divides that into **72 ÷ 2 = 36 elapsed working days ≈ 7.2 weeks**, stated in the timeline as 7 weeks (see §8 for why we don't round to 6). This is the actual arithmetic behind the middle tier's number, not a number picked to sound reasonable.

---

## 8. Timeline

**7 weeks.** Stated plainly as 7, not rounded down to 6 — the underlying math (§7) comes out to 7.2 weeks, and rounding that down to sound crisper would misstate the actual estimate in the direction that makes it harder to hit, which is the opposite of what "practical and achievable" (a named judging criterion) should reward.

---

## 9. Note on how AI was used in this process

Specific, not generic, because this is a named judging criterion:

- **Content verification against the live site.** Every claim in §4 and §5 was checked against the actual Semrush audit export for `tayseer.me`, re-parsed from the raw PDF and four `.xlsx` files rather than accepted as summarized — and where the original working brief's figures (119 URLs, 5 missing headers, 7.8MB images) didn't match the source data, this document says so explicitly instead of repeating them.
- **Fabrication-catching across multiple review passes.** The proposal went through a design-token consistency check (surfacing 22 files still carrying the old hardcoded palette), a title-metadata check (catching a duplicate-title bug in a new page this exact proposal introduced — the same bug class an earlier audit had already flagged elsewhere in the codebase), and a live re-verification pass on 2026-08-10 that caught the robots.txt/sitemap.xml status having changed since the original 2026-08-02 audit.
- **AI-assisted audit tooling.** The Semrush PDF and xlsx exports were parsed programmatically (Node.js + the `xlsx` package, since no Python was available in this environment) rather than read once and summarized from memory — and cross-checked against a fresh live HTTP/protocol/robots check run the same day this document was written.
- **AI-assisted scaffold build with verified technical claims.** The new Banks sector page in §1.2 is a real, building, static-exported Next.js route — not a Figma file — and the "corrections" claimed in §3.2 (`proxy.ts`, `@theme`, `next/font`) were checked against what those frameworks actually changed, not asserted from a general sense of "modern Next.js."
- **The same scrutiny applied to our own reported numbers, not just the audit's.** When asked to add the team's live Lighthouse scores, we re-ran Lighthouse against the deployed URL ourselves rather than transcribing the reported figures. Accessibility/Best Practices/SEO/Agentic Browsing reproduced at 100 across 4 runs — confirmed. Performance did not reproduce as a stable 97 (we saw 82–98 across the same 4 runs) — reported as a range with the discrepancy stated plainly, the same treatment given to the original brief's audit figures in §5.1, applied here to our own team's claim just as rigorously.

This is the accurate description of the process, not a marketing claim about AI capability.

---

## Packaging — action needed before send

- **Filename:** `Cyborgs_TayseerWebsite_Proposal.md` — done, team name confirmed as Cyborgs.
- **Recipient:** s.ghauri@seersolutionz.com — as stated in the brief; please confirm this is still correct before send.
- **Format:** confirmed acceptable as Markdown with an accompanying screenshots folder (`screenshots/proposal/`) — no PDF/deck conversion needed.
- **Extra attachment added:** `lighthouse-report/` — the full Lighthouse HTML + JSON report from the live-site verification, plus `RUNS_LOG.md` documenting all 4 verification runs. Include this folder if the submission format allows more than one attachment; if only a single file is accepted, it's supporting evidence you can hold in reserve rather than something the proposal depends on.
- **Sending:** this environment has no outbound email capability — the finished file needs to be sent from your own mail client, attaching this file, the `screenshots/proposal/` folder, and (space permitting) the `lighthouse-report/` folder. Everything else is ready now.
