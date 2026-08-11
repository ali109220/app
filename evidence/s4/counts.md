# Task 4 — Reconcile the counts

**Measured:** 2026-08-11, against git `bad3ca3` on branch `moremotions` (the commit that removed the sector page).
**Claims checked against:** `Cyborgs_TayseerWebsite_Proposal_Enhanced_Final_Draft.docx` (716,682 bytes,
last modified 2026-08-10 23:44). Text extracted from `word/document.xml`.

---

## 4.1 Live URLs found

| Measure | Count | Source |
|---|---|---|
| URLs in `sitemap.xml` | **16** | [raw/sitemap.xml](raw/sitemap.xml) |
| Returning 200 | **16 of 16** | [raw/crawl-results.json](raw/crawl-results.json) |
| Reachable URLs **not** in the sitemap | **1** (`/index`) | depth-2 link harvest, [live-ia.md §1.4](live-ia.md) |
| **Total distinct live URLs** | **17** (16 unique pages + 1 homepage duplicate) | |
| Pages in the primary nav | **10** (Home, Solutions, 6 children, About Us, Blogs and Resources, Connect) | [live-ia.md §1.2](live-ia.md) |
| Pages in the sitemap but **not** reachable from the primary nav | **5** — `/careers` (nav `<li>` is `hidden`), `/terms-conditions`, `/privacy-policy`, `/on-site-deployment`, `/unleashing-financial-innovation` | |
| Sector-shaped URLs | **0** of 9 probed | [live-ia.md §1.5](live-ia.md) |

---

## 4.2 Demo routes built

| Measure | Count | Note |
|---|---|---|
| HTML files emitted into `out/` | **17** | includes `404.html` |
| **Routes** (excluding the 404 shell) | **16** | |
| — of which **primary user-facing** | **14** | Home, Solutions, 6 solution pages, About, Blog, 2 blog articles, Careers, Connect |
| — of which **supporting** | **2** | `/privacy`, `/terms` (legal boilerplate) |
| — of which **system** | **1** | `/404` — a static shell, not a destination |
| URLs in the exported `sitemap.xml` | **16** | matches the route count exactly; `/404` correctly excluded |
| Routes reachable on `https://tayseer-demo.pages.dev` | **17 of 17, all 200** | measured 05:07:25 UTC — [raw/demo-live-status-pagesdev.json](raw/demo-live-status-pagesdev.json) |
| Routes reachable on `https://tayseerdemo.xyz` | **17 of 17, all 200** — but the host stopped resolving at 04:57 UTC | measured 04:50:03 UTC — [raw/demo-live-status-0450.json](raw/demo-live-status-0450.json); see [SUMMARY.md](SUMMARY.md) §C1 |
| Non-200 routes | **0** on either host | |
| Broken internal links | **0** of 336 checked | [broken-links.md](broken-links.md) |
| Pages carrying JSON-LD | **17 of 17** (1–2 blocks each) | vs. **0 of 16** on the live site |

**On Next's "22 static pages".** The build log reports `Generating static pages (22/22)`. That number counts
route *entries*, including `/_not-found`, `/robots.txt`, `/sitemap.xml` and `/manifest.webmanifest` — none of
which is an HTML page — and expands `/blog/[slug]` into its two articles. Only **17** of them are HTML files.
Quoting 22 as a route count is a category error; quoting 24 is unsupported by any counting method reproducible
from this build.

---

## 4.3 Screenshot evidence

| Measure | Count |
|---|---|
| PNG files under `screenshots/` | **49** |
| — responsive captures (`360` / `768` / `1440`) | **48** |
| — other | **1** (`screenshots/proposal/home.png`, the §1.2 figure) |
| Distinct routes covered by responsive captures | **16** |
| Breakpoints per route | **3**, complete for all 16 — no partial sets |
| Entries in `screenshots/_capture-report.json` | **48**, all `"status": "ok"` |

**Captures whose route no longer exists in the build: none.** The 16 captured routes are exactly the 16 built
routes. The three `sectors-banks` captures and their three `_capture-report.json` entries were removed
together in commit `bad3ca3`, so there is nothing left to delete.

`/404` has no capture. That is correct — it is not a destination.

---

## 4.4 Corrected figures

| Claim in the docx | Where it appears | Actual | Verdict |
|---|---|---|---|
| **"17"** / "Primary routes captured" | exec-summary stat tile; §13 "17 primary routes at 360 / 768 / 1440" | **16 routes captured**, of which **14** are primary user-facing | **WRONG — must drop to 16.** Was correct before `bad3ca3`. |
| **"51"** / "Responsive evidence captures" | exec-summary stat tile; hero strip "LIVE · 51 responsive captures"; §13 | **48** | **WRONG — must drop to 48.** 51 = 17 × 3; the removed sector page took 3 captures with it. |
| **"the production build exports 24 static routes"** | §1 narrative line | 17 HTML files · 16 routes · 22 Next "static page" entries | **WRONG under every counting method.** 24 does not reconcile even by re-adding the removed sector page (that would give 18 / 17 / 23). |
| "Banks sector pattern — buyer-first structure demonstrated in the working prototype" | §4, caption under the mapping table | The route, its component and its captures were deleted in `bad3ca3`; `/sectors/banks` returns 404 | **FALSE — nothing in the submission demonstrates this.** See [SUMMARY.md](SUMMARY.md). |

### The arithmetic, so the correction is checkable

Before commit `bad3ca3`: 17 captured routes × 3 breakpoints = **51 captures**.
`bad3ca3` deleted `src/app/sectors/banks/page.tsx` and `screenshots/sectors-banks/{360,768,1440}.png`.
After: 16 captured routes × 3 = **48 captures**.

So `17 → 16` and `51 → 48`. Both original figures were accurate when written; both became wrong the moment the
sector page was removed, and neither was updated.

### Replacement wording for the stat tiles

> **16** — Primary routes captured
> **48** — Responsive evidence captures

If "primary" is meant strictly (excluding the two legal pages), the honest pair is **14 primary routes /
16 routes captured / 48 captures**. Pick one definition and use it in both the exec summary and §13 — at
present they cite the same two numbers with no definition attached.
