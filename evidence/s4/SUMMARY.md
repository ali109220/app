# §4 evidence run — summary

**Run:** 2026-08-11, 04:43–05:10 UTC. **Repo:** `tayseer-v3/app` @ `bad3ca3` (branch `moremotions`).
**Document checked:** `Cyborgs_TayseerWebsite_Proposal_Enhanced_Final_Draft.docx` (716,682 bytes,
modified 2026-08-10 23:44). **No `.docx` was edited.** This folder is evidence only.

Artifacts: [live-ia.md](live-ia.md) · [live-ia.json](live-ia.json) · [demo-routes.json](demo-routes.json) ·
[broken-links.md](broken-links.md) · [mapping-table.md](mapping-table.md) · [counts.md](counts.md) ·
[fig-4a-current-nav-1440.png](fig-4a-current-nav-1440.png) ·
[fig-4b-ia-current-vs-proposed.png](fig-4b-ia-current-vs-proposed.png) · [raw/](raw/)

---

## 1. The three-vs-six answer

**Six.** The live Solutions dropdown at `https://www.tayseer.me/` contains exactly six children — Core Banking,
Fahim AI, MBuke, Software Management Systems, Managed Services, Banking Systems — confirmed three independent
ways in this run: the served DOM (`raw/homepage.html:66–73`), a real browser with the menu open
(`raw/fig-4a-dropdown-items.json`, 6 items), and the screenshot
([fig-4a-current-nav-1440.png](fig-4a-current-nav-1440.png)); all six URLs return 200 and all six are in
`sitemap.xml`.

**The internal review comment claiming three is wrong, and the mapping table in §4 is not affected.** The
docx's §4 table already lists all six current entry points correctly. Nothing in §4's *current* column needs
changing on account of that comment — but several other things do.

---

## 2. CONTRADICTIONS

Ordered by how much damage each does if a judge finds it first.

### C1 — The document cites a URL that does not resolve. The prototype is live at a different one. 🔴

**The prototype is fine.** All 17 built routes return **HTTP 200** on **`https://tayseer-demo.pages.dev`**
(measured 05:07:25 UTC), and `/sectors`, `/sectors/banks` and `/solutions/banks` all return 404 there —
[raw/demo-live-status-pagesdev.json](raw/demo-live-status-pagesdev.json). The deployed content matches this
build: six header links, no sector entry, no dangling child.

**The URL printed throughout the document does not.** Every reference to the prototype — the exec summary
(*"The prototype is deployed and live: https://tayseerdemo.xyz/ … a judge-clickable URL is stronger evidence
than a static image"*) and §13's first evidence row — points at `tayseerdemo.xyz`, which stopped resolving at
**04:57 UTC**, seven minutes after this run had fetched all 17 routes from it successfully at **04:50:03 UTC**.

| Host | Result |
|---|---|
| `https://tayseerdemo.xyz/` | `curl` exit 6, `CURLE_COULDNT_RESOLVE_HOST` — confirmed at 05:01:13, 05:05:42 and 05:09 UTC |
| `https://tayseer-demo.pages.dev/` | 200 |
| `https://www.tayseer.me/` (control, same machine, same moment) | 200 |

**Record sweep** (`@1.1.1.1`, identical on 8.8.8.8 and 9.9.9.9): **no A, no AAAA, no CNAME, no MX.** The apex
returns NOERROR/NODATA. `www.tayseerdemo.xyz` is NXDOMAIN. The zone is *not* lapsed — the Cloudflare delegation
is intact (`iris` / `yevgen.ns.cloudflare.com`) and a `google-site-verification` TXT record still answers. The
address records are simply absent. Artifact: [raw/demo-dns-outage.txt](raw/demo-dns-outage.txt).

**Three consequences, in order of severity:**

1. **Every prototype URL in the document is dead.** Replace `https://tayseerdemo.xyz/` with
   `https://tayseer-demo.pages.dev/` in the exec summary and §13, or restore the A record. Deadline is
   2026-08-11 18:00.

2. **The deployed prototype canonicalises to the dead host.** `src/lib/site.ts:5` sets
   `SITE_URL = "https://tayseerdemo.xyz"`, so the pages.dev deployment serves:
   - `<link rel="canonical" href="https://tayseerdemo.xyz/solutions"/>` on every page
   - `<meta property="og:url" content="https://tayseerdemo.xyz/solutions"/>` — so link previews in
     WhatsApp, Slack and LinkedIn resolve to nothing
   - `robots.txt` with `Host: https://tayseerdemo.xyz` and `Sitemap: https://tayseerdemo.xyz/sitemap.xml`
   - all 16 `<loc>` entries in `sitemap.xml` on the dead host

   **This directly contradicts §5's claim of "canonical control" as an architectural strength.** It is a
   one-line fix in `src/lib/site.ts` followed by a rebuild — but shipped as-is, a judge who inspects the
   metadata finds the strongest technical claim in the document contradicted by the page's own `<head>`.

3. **`info@tayseerdemo.xyz` is undeliverable.** With no MX and no A on the zone, mail to that address cannot
   be routed. It is the contact address in `Footer.jsx`, `ContactSection.jsx`, `HomeContactForm.jsx`,
   `Connect.jsx`, `Careers.jsx`, `Legal.jsx` and `layout.tsx` — including the `mailto:` fallback the contact
   forms use on submit.

### C2 — §4 claims the buyer-first structure is demonstrated in the prototype. It is not. 🔴

**Claim** (§4, caption directly under the mapping table): *"Banks sector pattern — buyer-first structure
demonstrated in the working prototype."*

**Found:** commit `bad3ca3` ("removed the sectors", 2026-08-11 00:26:35 +0400) deleted
`src/app/sectors/banks/page.tsx`, `src/pages/sectors/Banks.jsx` and all three `screenshots/sectors-banks/*.png`.
`/sectors/banks` returns **404** on the deployed site. **Nothing in this submission demonstrates a buyer-first
structure.**

This is the most dangerous line in §4 because it is a *falsifiable* claim about the prototype, sitting next to
a table that is otherwise accurate. Delete it, or replace it with the honest version — which §2 of the
markdown proposal already gets right: *"Status: proposed structure only. Banks, Telecom, Exchange & MTO and
Government are recommendations — none of them is built or shown working in this submission."*

### C3 — "17 primary routes" and "51 responsive captures" are both stale by exactly the sector page. 🟠

Both figures appear in the exec-summary stat tiles, in the hero strip (*"LIVE · 51 responsive captures"*) and
again in §13. Actual: **16 routes, 48 captures**. The arithmetic is exact — 17 × 3 = 51 before `bad3ca3`,
16 × 3 = 48 after. Both were true when written; neither was updated when the page was removed.

### C4 — "exports 24 static routes" does not reconcile under any counting method. 🟠

**Claim** (§1): *"`npm run build` runs clean, exports 24 static routes including supporting/system routes."*

**Found:** a clean build at `bad3ca3` emits **17 HTML files** covering **16 routes**; Next's own log reports
**22 static pages** (a count that includes `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest` and
`/_not-found`, none of them HTML). Re-adding the removed sector page would give 18 / 17 / 23. **24 is not
reachable from this build**, before or after the removal.

### C5 — §4's "Recommended production sitemap" invents a label that exists nowhere. 🟡

**Claim** (§4): *"Home · Sectors (Banks / Telecom / Exchange & MTO / Government) · Solutions · About ·
**Insights** · Careers · Connect · Privacy · Terms."*

**Found:** the section is called `Blogs and Resources` on the live site (nav label and `H1`) and `/blog` in the
prototype. `Insights` appears in neither. In a line presented as a sitemap, an unexplained rename reads as
carelessness. Either use the real label or flag the rename as a deliberate recommendation.

### C6 — §4's mapping rows are vaguer than the evidence requires — in Tayseer's favour. 🟢

Four of the six §4 rows read `Sector/need → …` or `Enterprise need → …`. That undersells the MBuke row: the
live `/mbuke` page publishes `Who Uses MBuke?` with the children **`Banks`, `Exchange Houses`, `Governments`,
`Telecom`**, `Payment Gateways`. **Three of the four proposed segments are Tayseer's own published words**, and
the fourth is a rename of theirs. This is the single strongest argument in §4 and the document currently does
not make it. See [mapping-table.md](mapping-table.md).

Corollary flag: MBuke lists **five** buyer types. The proposed IA carries four and silently drops
`Payment Gateways`.

### C7 — Live-site defects §4 should cite as the cost of the current IA 🟢

All measured this run; none currently appears in the document. These strengthen §4's premise:

1. **All 16 canonicals point at the bare host `https://tayseer.me/…`, which 301-redirects to `www`** — every
   self-referential canonical points at a redirect.
2. **All 16 canonicals also carry a trailing slash the served URL does not have.**
3. **`/privacy-policy` canonicalises to `/terms-conditions/`** — a different page.
4. **`/unleashing-financial-innovation` canonicalises to `/on-site-deployment/`** — also a different page.
5. **`robots.txt`'s `Sitemap:` directive points at the homepage**, not at `/sitemap.xml`.
6. **`/careers` is nav-orphaned** — its `<li>` carries an unconditional `class="hidden"`, so it never renders
   at any breakpoint, while the page is live and in the sitemap.
7. **`/index` is a reachable, indexable duplicate of the homepage**, linked from `/fahim-ai` and `/mbuke`,
   absent from the sitemap.
8. **Homepage `H1` text content is `Innovativeapproach`** — no separator between spans. It renders fine; a
   crawler and a screen reader both get one run-together word.
9. **`/connect` has two `H1` elements.**
10. **`/on-site-deployment` is a service-shaped slug serving a blog article** titled "The Rise of FinTech in
    the UAE".
11. **Zero JSON-LD on all 16 live pages** — confirms the document's structured-data finding. The prototype, by
    contrast, ships 1–2 JSON-LD blocks on every one of its 17 pages. That contrast is worth stating.

---

## 3. Corrected counts

| Figure | Document says | Actual | Action |
|---|---|---|---|
| Primary routes captured | 17 | **16** (of which 14 are primary user-facing; 2 legal, 1 system 404 shell) | Change to 16 |
| Responsive captures | 51 | **48** (16 routes × 3 breakpoints, all `"status": "ok"`) | Change to 48 |
| Static routes exported | 24 | **17 HTML files / 16 routes / 22 Next "static page" entries** | Rewrite — pick one and define it |
| Live URLs on tayseer.me | — | **16 in sitemap, all 200**, plus 1 undeclared duplicate (`/index`) | Add |
| Solutions children (live) | 6 | **6** | Correct as written |
| Sector URLs (live) | — | **0 of 9 probed patterns** | Add — it is the premise of §4 |
| Broken internal links (build) | — | **0 of 336** | Add |
| Captures pointing at a deleted route | — | **0** | Nothing to delete |

Full derivation in [counts.md](counts.md).

---

## 4. Mapping table

Every "current" cell is a nav label and URL verified this run; every "proposed" cell is marked
`RECOMMENDED — not built`; rows the page's own headings do not support are marked `JUDGMENT CALL` rather than
given a rationale.

| Current entry point (live) | Proposed buyer-first entry | Source |
|---|---|---|
| `Solutions` → `Core Banking`<br>`www.tayseer.me/core-banking` | **Banks** — `RECOMMENDED — not built`<br>**Exchange & MTO** — `JUDGMENT CALL — confirm with Tayseer` | Banks: `H3` `Consumer Banking & the Evolution of Core Banking Systems`; also `Funds & Treasury Tools`, `Audit & Legislation`. Exchange & MTO: only `H3` `Remittance Solutions` — "Offer a reliable and affordable money transfer service to cater to your global customers" — which is a **bank** offering remittance, not an MTO as buyer. |
| `Solutions` → `Fahim AI`<br>`www.tayseer.me/fahim-ai` | **All four segments** — `JUDGMENT CALL — confirm with Tayseer` | **No sector appears anywhere on this page.** All five `H2`s and five `H3`s are capability-only; the body contains no instance of "telecom", "exchange", "government", "remittance" or "money transfer". |
| `Solutions` → `MBuke`<br>`www.tayseer.me/mbuke` | **Banks · Telecom · Exchange & MTO · Government** — `RECOMMENDED — not built` | **The page states the taxonomy itself.** `H2` `Who Uses MBuke?` → `H3` `Banks`, `Exchange Houses`, `Governments`, `Telecom`, `Payment Gateways`. Three segments verbatim; "Exchange & MTO" renames their `Exchange Houses`. |
| `Solutions` → `Managed Services`<br>`www.tayseer.me/managed-services` | **Banks** — `RECOMMENDED — not built`<br>Other three — `JUDGMENT CALL — confirm with Tayseer` | Banks: `H3` `Managed T24 Temenos Service` (T24 is a core banking platform) and `H3` `ATM & STM Management Service`. The remaining three `H3`s are sector-neutral IT services. |
| `Solutions` → `Banking Systems`<br>`www.tayseer.me/banking-systems` | **Banks** — `RECOMMENDED — not built` | `H2` `GRG Banking Systems for UAE Banks \| Advanced Cash & ATM Solutions` — the buyer is named in the heading. Every `H3` reinforces it (STMs, cash sorting, note & coin processing, card processing). |
| `Solutions` → `Software Management Systems`<br>`www.tayseer.me/software-management-systems` | **No segment** — `JUDGMENT CALL — confirm with Tayseer` | All seven `H3`s are generic developer tooling (`Version Control Systems`, `CI/CD Tools`, `Log Management`, `Integration API Management`, `Authorization Tools`). **No sector reference of any kind.** Its buyer is an IT function — a role, not one of the four segments. |

**Headline reading:** two rows (MBuke, Banking Systems) are grounded in the pages' own headings; two
(Core Banking, Managed Services) are half-grounded on Banks alone; two (Fahim AI, Software Management Systems)
have no sector signal at all. The credible framing is *"two products already sell by segment in Tayseer's own
words; the other four would need segment positioning written for them"* — stronger than a table implying all
six map cleanly. Full verbatim headings in [mapping-table.md](mapping-table.md).

---

## 5. Sector-removal verdict

### ✅ CLEAN — no dead links remain.

| Check | Result |
|---|---|
| Route files / components remaining | **None.** `src/app/sectors/banks/page.tsx` and `src/pages/sectors/Banks.jsx` were both deleted in `bad3ca3`. |
| **Nav or in-page links to a removed route** | **None.** 336 unique internal links across all 17 emitted HTML files were resolved against the export — **0 broken**. The deployed `<header>` contains exactly six links (`/`, `/solutions`, `/about`, `/blog`, `/careers`, `/connect`), and the served HTML contains no `/banks` and no `sector` outside two testimonial job titles. |
| Live 404 check | `/sectors`, `/sectors/banks` and `/solutions/banks` returned **404** on both deployments — `tayseerdemo.xyz` at 04:50:03 UTC and `tayseer-demo.pages.dev` at 05:07:25 UTC. |
| Orphaned screenshots | **None.** All three `sectors-banks` PNGs and all three `_capture-report.json` entries were removed in the same commit. 48 captures cover exactly the 16 built routes. |
| Residual source matches for `sector` / `banks` | **4 files, all prose or job titles** — "financial sector" in `About.jsx` and `blogData.js`; "Head of Individual Services Sector" / "IT Sector Manager" in `ClientSuccessStories.jsx` and `ExecutiveTestimonials.jsx`. None is a route, component, nav entry or link. (`src/pages/*.jsx` is dead code regardless: `next.config.mjs` sets `pageExtensions: ["ts","tsx"]`, so no `.jsx` there ever becomes a route.) |

**The removal was done properly.** The only thing `bad3ca3` left behind is *documentation* that still describes
the deleted page — C2, C3 and C4 above. The code is clean; the `.docx` is not.

---

## 6. Figures for §4

| File | What it is | Honest caption to use |
|---|---|---|
| [fig-4a-current-nav-1440.png](fig-4a-current-nav-1440.png)<br>2880×916 (1440 CSS px @2x) | Playwright/Chromium capture of the **live** `www.tayseer.me` header at 1440px with the Solutions dropdown genuinely open (CSS hover, not forced). | *"The current entry model on tayseer.me, captured 2026-08-11: six product names under one Solutions menu. A visitor must already know which product they need."* |
| [fig-4b-ia-current-vs-proposed.png](fig-4b-ia-current-vs-proposed.png)<br>3280×1872 (@2x) · SVG source alongside | Two IA trees. Left `CURRENT — LIVE`, generated from the Task 1 crawl so it cannot drift. Right `PROPOSED — RECOMMENDED, NOT BUILT`, with the label rendered into the artwork rather than left to a caption. Document tokens throughout (navy `#0A2846`, blue `#0F5CBF`, mist `#F7FAFD`, tint `#EAF2FB`, edge `#C3D9F0`), Instrument Sans embedded. | *"Current vs proposed information architecture. The right-hand tree is a recommendation; no page in this submission implements it."* |

**Recommendation: use 4a.** It is a photograph of the problem being solved, on a site the judges can open
themselves, and it makes no claim about the redesign — which is exactly what §4 needs while C1 is unresolved.
4b works as a second figure under §4.2 if space allows; it should not be the only figure, because a diagram of
a proposal can be misread as a diagram of a build.

---

## 7. Anything that could not be verified

- **Which URL the submission should cite.** `tayseer-demo.pages.dev` works today; `tayseerdemo.xyz` is the
  branded host the build is configured for. Whether the A record will be restored before the 18:00 deadline is
  `UNVERIFIED` — the cause (removed address records vs. a Cloudflare-side issue) is not determinable from
  outside the account. Whichever host is chosen, `src/lib/site.ts:5` must match it and the build must be
  re-run, or the canonical/OG/sitemap layer will keep pointing at the other one.
- **Whether `Payment Gateways` was deliberately excluded from the four proposed segments.** `UNVERIFIED` —
  requires a decision from Tayseer, not a measurement.
- **Which products sit behind each segment.** `UNVERIFIED by design` — four of six rows are marked
  `JUDGMENT CALL` above precisely because the pages do not answer it. The document's existing line — *"Which
  products sit behind each of the four segments is a grouping decision to confirm with Tayseer"* — is the
  correct posture and should be kept.
