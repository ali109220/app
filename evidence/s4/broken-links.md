# Task 2.4 — Internal link check across the built output

**Run:** 2026-08-11, against `out/` produced by `npm run build` at git `bad3ca3` (branch `moremotions`).
**Method:** every `href` in all 17 emitted HTML files was extracted, resolved against the export directory, and
checked for a matching file — either a route (`out/<path>.html`) or a static asset (`out/<path>`).
External, `mailto:`, `tel:` and pure-fragment links were excluded. `/_next/*` was treated as valid
(build-generated chunk paths).
**Machine-readable equivalent:** [raw/broken-links.json](raw/broken-links.json).

## Result

```
TOTAL HTML FILES:              17
UNIQUE INTERNAL LINKS CHECKED: 336
BROKEN:                         0
```

**No broken internal links.** `raw/broken-links.json` is an empty array.

In particular, **no link anywhere in the build points at `/sectors`, `/sectors/banks`, or any other removed
route.** This is the finding the brief flagged as worst-case — a nav item resolving to a 404 that a judge
finds by clicking — and it does not occur.

## Cross-check against the deployed site

The same check was run against what is actually served, not just what was built, on **both** hosts the
prototype answers on:

| Host | Checked (UTC) | Built routes | Sector probes | Artifact |
|---|---|---|---|---|
| `https://tayseerdemo.xyz` | 2026-08-11 04:50:03 | 17 / 17 → **200** | `/sectors`, `/sectors/banks`, `/solutions/banks` → **404** | [raw/demo-live-status-0450.json](raw/demo-live-status-0450.json) |
| `https://tayseer-demo.pages.dev` | 2026-08-11 05:07:25 | 17 / 17 → **200** | same three → **404** | [raw/demo-live-status-pagesdev.json](raw/demo-live-status-pagesdev.json) |

The deployed homepage's `<header>` contains exactly six links — `/`, `/solutions`, `/about`, `/blog`,
`/careers`, `/connect` — with no sector entry and no dangling child. The served HTML contains no `/banks`
string at all, and the only `sector` matches are the testimonial job titles "Head of Individual Services
Sector" and "IT Sector Manager".

> **Separate, and not a link defect:** roughly seven minutes after the first check, `tayseerdemo.xyz` stopped
> resolving. The prototype remains fully reachable at `tayseer-demo.pages.dev`, but the deployed pages'
> `rel=canonical`, `og:url`, `robots.txt` and `sitemap.xml` all still point at the non-resolving
> `tayseerdemo.xyz` (`src/lib/site.ts:5`). See [SUMMARY.md](SUMMARY.md) §C1 and
> [raw/demo-dns-outage.txt](raw/demo-dns-outage.txt).

## Note on the 404 route

`out/404.html` is emitted by `output: "export"` as a static file. Requesting `/404` therefore returns **200**
with the 404 page's content — that is normal for a static export and not a defect. Requesting a genuinely
non-existent path (e.g. `/sectors`) correctly returns a 404 status from the host.
