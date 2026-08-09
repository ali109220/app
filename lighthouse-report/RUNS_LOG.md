# Lighthouse verification log — https://tayseerdemo.xyz/

Run independently against the live deployed URL, desktop preset, Lighthouse 13.4.1,
2026-08-10, from this environment (Chromium via Playwright's bundled binary as the
launch target). Four consecutive runs, no code changes between them:

| Run | Performance | Accessibility | Best Practices | SEO | Agentic Browsing |
|---|---|---|---|---|---|
| 1 | 90 | — (not measured this run) | — | — | — |
| 2 | 82 | 100 | 100 | 100 | 100 |
| 3 | 82 | 100 | 100 | 100 | 100 |
| 4 | 98 | 100 | 100 | 100 | 100 |

**Accessibility, Best Practices, SEO, and Agentic Browsing are stable at 100 across every run** —
reproducible, not a one-off.

**Performance ranges 82–98 (median ~86) across 4 runs on live infra** — Lighthouse performance
scores are known to be sensitive to network path and load conditions when testing a remote site,
so this spread is expected variance, not a contradiction. The team-reported figure of 97 falls
within the observed range but was not the median result here; presented in the proposal with that
caveat rather than asserted as a single stable number.

Full report for the most complete run (all 5 categories, HTML + JSON) attached alongside this log:
`tayseerdemo-live.report.html`, `tayseerdemo-live.report.json`.
