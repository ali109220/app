# Task 1 — Current state: live crawl of tayseer.me

**Crawled:** 2026-08-11 04:43:07 UTC (HTTP), 2026-08-11 04:57 UTC (rendered nav confirmation)
**Method:** `curl` 8.x over HTTPS for status/redirect chains and raw HTML; `sitemap.xml` parsed for the URL list;
homepage plus all 16 crawled pages re-scanned for internal links (depth 2); Playwright/Chromium 1.62.1 used only to
confirm the nav renders as the DOM says it does.
**Machine-readable equivalent:** [live-ia.json](live-ia.json). **Raw artifacts:** [raw/](raw/) —
`homepage.html`, `robots.txt`, `sitemap.xml`, `bare-redirect.headers.txt`, `pages/*.html` (16 files),
`crawl-results.json`, `page-headings.json`.

Every value in the tables below was extracted from those saved files, not re-fetched, so the tables are
reproducible from this folder alone.

---

## 1.1 Host, robots and sitemaps

| URL | Status | Redirects | Final URL |
|---|---|---|---|
| `https://tayseer.me/` | 200 | 1 | `https://www.tayseer.me/` |
| `http://tayseer.me/` | 200 | 1 | `https://www.tayseer.me/` |
| `https://www.tayseer.me/` | 200 | 0 | `https://www.tayseer.me/` |
| `https://tayseer.me/robots.txt` | 200 | 1 | `https://www.tayseer.me/robots.txt` |
| `https://www.tayseer.me/robots.txt` | 200 | 0 | `https://www.tayseer.me/robots.txt` |
| `https://tayseer.me/sitemap.xml` | 200 | 1 | `https://www.tayseer.me/sitemap.xml` |
| `https://www.tayseer.me/sitemap.xml` | 200 | 0 | `https://www.tayseer.me/sitemap.xml` |
| `https://tayseer.me/sitemap_index.xml` | **404** | 1 | `https://www.tayseer.me/sitemap_index.xml` |
| `https://www.tayseer.me/sitemap_index.xml` | **404** | 0 | `https://www.tayseer.me/sitemap_index.xml` |

**Redirect behaviour:** bare → `www` is a clean single `301 Moved Permanently` (`Server: LiteSpeed`,
`Location: https://www.tayseer.me/`), applied uniformly to paths as well as the root. `www` is the canonical
serving host. There is no `sitemap_index.xml`; `sitemap.xml` is a single flat `<urlset>`.

**`robots.txt` verbatim** (58 bytes):

```
User-agent: *
Disallow: 

Sitemap: https://www.tayseer.me
```

- Crawling is fully open (`Disallow:` with an empty value).
- **Defect:** the `Sitemap:` directive points at the homepage, not at `https://www.tayseer.me/sitemap.xml`.
  It is not a valid sitemap reference.

**`sitemap.xml`:** 16 `<url>` entries, all `lastmod 2026-08-04`, no `<changefreq>` or `<priority>`.
All 16 use the `www` host and no trailing slash.

---

## 1.2 Primary navigation DOM

Source: `raw/homepage.html`, lines 49–93 — `header#siteHeader > div > nav#mainNav`.
Rendered confirmation: [fig-4a-current-nav-1440.png](fig-4a-current-nav-1440.png) and
`raw/fig-4a-dropdown-items.json`.

Every `href` in the nav is **document-relative with no leading slash** (`href="core-banking"`, not
`href="/core-banking"`). This resolves correctly only because every page is served from the site root; it is
fragile, not broken.

| # | Level | Label (exact) | `href` (exact) | Real page or fragment? | Resolves to |
|---|---|---|---|---|---|
| 1 | top | `Home` | `https://www.tayseer.me` | page | `https://www.tayseer.me/` |
| 2 | top | `Solutions` | `solutions` | page *(also the dropdown trigger)* | `https://www.tayseer.me/solutions` |
| 3 | child | `Core Banking` | `core-banking` | page | `https://www.tayseer.me/core-banking` |
| 4 | child | `Fahim AI` | `fahim-ai` | page | `https://www.tayseer.me/fahim-ai` |
| 5 | child | `MBuke` | `mbuke` | page | `https://www.tayseer.me/mbuke` |
| 6 | child | `Software Management Systems` | `software-management-systems` | page | `https://www.tayseer.me/software-management-systems` |
| 7 | child | `Managed Services` | `managed-services` | page | `https://www.tayseer.me/managed-services` |
| 8 | child | `Banking Systems` | `banking-systems` | page | `https://www.tayseer.me/banking-systems` |
| 9 | top | `About Us` | `about-us` | page | `https://www.tayseer.me/about-us` |
| 10 | top | `Blogs and Resources` | `blogs-and-resources` | page | `https://www.tayseer.me/blogs-and-resources` |
| 11 | top | `Careers` | `careers` | page — **but the `<li>` carries `class="hidden"`** | `https://www.tayseer.me/careers` |
| 12 | top | `Connect` | `connect` | page | `https://www.tayseer.me/connect` |
| 13 | CTA | `Submit A Query` | `connect` | page *(header CTA, outside `<nav>`)* | `https://www.tayseer.me/connect` |

**No nav item is a fragment or anchor.** Every one resolves to a real 200 page.

**The Solutions dropdown has exactly six children.** This is stated three independent ways in this run:
the DOM (`raw/homepage.html:66–73`), the rendered browser (`raw/fig-4a-dropdown-items.json`, 6 items), and
the screenshot ([fig-4a-current-nav-1440.png](fig-4a-current-nav-1440.png)).

**`Careers` is nav-orphaned.** Its `<li>` is `class="border-b border-[#f1f1f1] lg:border-0 hidden"` — `hidden`
is unconditional, with no responsive prefix, so the item never renders at any breakpoint. The page is in the
sitemap and returns 200; it is simply unreachable from the primary nav. This is visible in
fig-4a: the rendered nav shows Home · Solutions · About Us · Blogs and Resources · Connect — no Careers.

---

## 1.3 Every internal URL

All 16 sitemap URLs returned **200 with zero redirects** on the `www` host. The `Status chain` column shows
`301 → 200` only for requests made against the bare host.

| Nav label | `href` | Final URL | Status chain | `<title>` | `rel=canonical` | `H1` |
|---|---|---|---|---|---|---|
| Home | `https://www.tayseer.me` | `https://www.tayseer.me/` | 200 (bare: 301 → 200) | `Tayseer Innovations – Future-Ready Fintech` | `https://tayseer.me/` | `Innovativeapproach` |
| Solutions | `solutions` | `https://www.tayseer.me/solutions` | 200 | `Solutions – Tayseer Innovations` | `https://tayseer.me/solutions/` | `Solutions` |
| Solutions → Core Banking | `core-banking` | `https://www.tayseer.me/core-banking` | 200 | `Core Banking – Tayseer Innovations` | `https://tayseer.me/core-banking/` | `Core Banking` |
| Solutions → Fahim AI | `fahim-ai` | `https://www.tayseer.me/fahim-ai` | 200 | `Fahim AI – Tayseer Innovations` | `https://tayseer.me/fahim-ai/` | `Fahim AI` |
| Solutions → MBuke | `mbuke` | `https://www.tayseer.me/mbuke` | 200 | `MBuke – Tayseer Innovations` | `https://tayseer.me/mbuke/` | `MBuke` |
| Solutions → Software Management Systems | `software-management-systems` | `https://www.tayseer.me/software-management-systems` | 200 | `Software Management Systems – Tayseer Innovations` | `https://tayseer.me/software-management-systems/` | `Software Management Systems` |
| Solutions → Managed Services | `managed-services` | `https://www.tayseer.me/managed-services` | 200 | `Managed Services – Tayseer Innovations` | `https://tayseer.me/managed-services/` | `Managed Services` |
| Solutions → Banking Systems | `banking-systems` | `https://www.tayseer.me/banking-systems` | 200 | `Banking Systems – Tayseer Innovations` | `https://tayseer.me/banking-systems/` | `Banking Systems` |
| About Us | `about-us` | `https://www.tayseer.me/about-us` | 200 | `About Us – Tayseer Innovations` | `https://tayseer.me/about-us/` | `About Us` |
| Blogs and Resources | `blogs-and-resources` | `https://www.tayseer.me/blogs-and-resources` | 200 | `Blogs and Resources – Tayseer Innovations` | `https://tayseer.me/blogs-and-resources/` | `Blogs and Resources` |
| Careers *(nav-hidden)* | `careers` | `https://www.tayseer.me/careers` | 200 | `Careers – Tayseer Innovations` | `https://tayseer.me/careers/` | `Careers` |
| Connect | `connect` | `https://www.tayseer.me/connect` | 200 | `Connect – Tayseer Innovations` | `https://tayseer.me/connect/` | `Connect` **+ a second H1** `Connect with Tayseer - The Trusted Partner for Your Business` |
| *(not in nav — footer/legal)* | — | `https://www.tayseer.me/terms-conditions` | 200 | `Terms & Conditions – Tayseer Innovations` | `https://tayseer.me/terms-conditions/` | `Terms & Conditions` |
| *(not in nav — footer/legal)* | — | `https://www.tayseer.me/privacy-policy` | 200 | `Privacy Policy – Tayseer Innovations` | **`https://tayseer.me/terms-conditions/`** ← wrong page | `Privacy Policy` |
| *(not in nav — blog article)* | — | `https://www.tayseer.me/on-site-deployment` | 200 | `The Rise of FinTech in the UAE – Tayseer Innovations` | `https://tayseer.me/on-site-deployment/` | `The Rise of FinTech in the UAE: Innovations Shaping the Future of Finance in 2025 On Site Deployment Insights` |
| *(not in nav — blog article)* | — | `https://www.tayseer.me/unleashing-financial-innovation` | 200 | `Unleashing Financial Innovation: Open Banking's Potential in the UAE and KSA – Tayseer Innovations` | **`https://tayseer.me/on-site-deployment/`** ← wrong page | `Unleashing Financial Innovation: Open Banking's Potential in the UAE and KSA` |

### Defects visible in this table

1. **Every canonical on the site points at the bare host, which 301-redirects.** All 16 pages declare
   `rel=canonical` on `https://tayseer.me/…` while the site actually serves from `https://www.tayseer.me/…`.
   Every self-referential canonical therefore points at a redirect rather than at the live URL.
2. **Every canonical also carries a trailing slash the live URL does not have** — canonical
   `https://tayseer.me/solutions/` vs. served `https://www.tayseer.me/solutions`. Two mismatches stacked
   on the same tag.
3. **`/privacy-policy` canonicalises to `/terms-conditions/`** — a different page. As declared, Privacy Policy
   asks to be dropped from the index in favour of Terms & Conditions.
4. **`/unleashing-financial-innovation` canonicalises to `/on-site-deployment/`** — also a different page,
   the other blog article. Same failure mode.
5. **Homepage `H1` text content is `Innovativeapproach`** — no separator between the two spans. Rendered it
   looks like "INNOVATIVE APPROACH" (fig-4a), but the text a crawler or a screen reader receives is one
   run-together word.
6. **`/connect` has two `H1` elements.**
7. **`/on-site-deployment` is a slug/content mismatch** — a service-shaped URL serving a blog article titled
   "The Rise of FinTech in the UAE".
8. **Zero JSON-LD blocks on all 16 pages.** Counted from the saved HTML; corroborates the proposal's
   structured-data finding.

---

## 1.4 URLs found outside the sitemap (depth-2 link harvest)

Internal links were extracted from all 16 saved pages and resolved. **One** URL was found that the sitemap
does not list:

| URL | Status | Linked from | Note |
|---|---|---|---|
| `https://www.tayseer.me/index` | 200 | `/fahim-ai`, `/mbuke` | Byte-identical duplicate of the homepage. Reachable, crawlable, absent from `sitemap.xml`, and its canonical is the homepage's — so it is a duplicate entry point rather than a separate page, but it is linked from two product pages. |

No other internal link on any crawled page resolves outside the 16 sitemap URLs.

---

## 1.5 Sector-pattern check

**Confirmed: no sector-shaped URL exists on the live site.** Every pattern was probed directly rather than
inferred from the sitemap's silence.

| Probed path | Status |
|---|---|
| `/sector` | 404 |
| `/sectors` | 404 |
| `/banks` | 404 |
| `/telecom` | 404 |
| `/government` | 404 |
| `/exchange` | 404 |
| `/banks-sector` | 404 |
| `/sectors/banks` | 404 |
| `/industries` | 404 |

Nine probes, nine 404s. In addition, no internal link on any of the 16 crawled pages points at a
sector-shaped URL. The live site is organised by product name only.
