// One-off screenshot capture: all app routes x 3 viewports, full page.
//
// Why not the fixed-timeout capture-screenshots.sh: this site's scroll-reveal
// (RevealOnScroll / AnimatedChart / CountUp, see src/site/motion/hooks.js)
// starts every section at opacity:0 and only flips to visible via an
// IntersectionObserver once scrolled into view. A one-shot full-page
// screenshot with no scroll and a flat wait leaves everything below the
// first fold as blank reserved space (right layout height, no content).
//
// Fix used here: emulate prefers-reduced-motion:reduce BEFORE navigation.
// useReducedMotion() (src/site/motion/hooks.js) is the one signal every
// reveal mechanism in this codebase branches on — RevealOnScroll.jsx,
// AnimatedChart.jsx, CountUp.jsx all report "in view" / "drawn" immediately
// when it's true, which is the same fallback path the site already ships
// for real users who ask for reduced motion. A [data-reveal] CSS !important
// override is added as a defensive backstop (inline opacity:0 loses to an
// !important stylesheet rule) in case anything doesn't fully key off reduced
// motion.
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = process.env.CAPTURE_BASE || "http://localhost:3000";
const OUT_ROOT = path.resolve(process.cwd(), "screenshots");

const PAGES = {
  home: "/",
  about: "/about",
  blog: "/blog",
  "blog-open-banking-uae-ksa": "/blog/open-banking-uae-ksa",
  "blog-rise-of-fintech-uae": "/blog/rise-of-fintech-uae",
  careers: "/careers",
  connect: "/connect",
  privacy: "/privacy",
  solutions: "/solutions",
  "solutions-banking-systems": "/solutions/banking-systems",
  "solutions-core-banking": "/solutions/core-banking",
  "solutions-fahim-ai": "/solutions/fahim-ai",
  "solutions-managed-services": "/solutions/managed-services",
  "solutions-mbuke": "/solutions/mbuke",
  "solutions-software-management-systems": "/solutions/software-management-systems",
  terms: "/terms",
};

const VIEWPORTS = {
  1440: { width: 1440, height: 900 },
  768: { width: 768, height: 1024 },
  360: { width: 360, height: 800 },
};

const FORCE_VISIBLE_CSS = `
[data-reveal] { opacity: 1 !important; transform: none !important; transition: none !important; }
[data-animate] { opacity: 1 !important; transform: none !important; transition: none !important; }
/* .defer-render (src/performance.css) uses content-visibility:auto to skip
   painting below-fold sections until they've recently intersected the
   viewport — a second, independent lazy-render mechanism from data-reveal,
   only used on the home page (src/pages/Home.jsx). A fullPage screenshot's
   single-pass resize-to-full-height doesn't reliably re-trigger that
   intersection check, so these sections stay unpainted even after a real
   scroll pass. Confirmed fix, matching this repo's own capture_proposal.js. */
.defer-render { content-visibility: visible !important; }
`;

async function captureOne(browser, name, route, vpName, vp) {
  const context = await browser.newContext({ viewport: vp });
  const page = await context.newPage();
  try {
    await page.emulateMedia({ reducedMotion: "reduce" });
    const res = await page.goto(`${BASE}${route}`, { waitUntil: "networkidle", timeout: 30000 });
    if (!res || res.status() >= 400) {
      throw new Error(`HTTP ${res ? res.status() : "no response"}`);
    }
    await page.addStyleTag({ content: FORCE_VISIBLE_CSS });
    // Let React commit the reduced-motion state + fonts settle.
    await page.waitForTimeout(400);

    const outDir = path.join(OUT_ROOT, name);
    await mkdir(outDir, { recursive: true });
    const outFile = path.join(outDir, `${vpName}.png`);
    await page.screenshot({ path: outFile, fullPage: true });

    const dims = await page.evaluate(() => ({
      scrollHeight: document.documentElement.scrollHeight,
      viewportHeight: window.innerHeight,
    }));
    return { name, vpName, outFile, ok: true, ...dims };
  } catch (err) {
    return { name, vpName, ok: false, error: String(err && err.message ? err.message : err) };
  } finally {
    await context.close();
  }
}

async function main() {
  await mkdir(OUT_ROOT, { recursive: true });
  const browser = await chromium.launch();
  const results = [];

  try {
    for (const [name, route] of Object.entries(PAGES)) {
      for (const [vpName, vp] of Object.entries(VIEWPORTS)) {
        const r = await captureOne(browser, name, route, vpName, vp);
        console.log(
          r.ok
            ? `OK   ${name.padEnd(45)} @${vpName}  -> ${r.outFile}  (scrollHeight=${r.scrollHeight})`
            : `FAIL ${name.padEnd(45)} @${vpName}  ${r.error}`,
        );
        results.push(r);
      }
    }
  } finally {
    await browser.close();
  }

  const failed = results.filter((r) => !r.ok);
  console.log(`\n${results.length} captures, ${failed.length} failed.`);
  if (failed.length) {
    console.log("Failures:");
    for (const f of failed) console.log(`  - ${f.name}@${f.vpName}: ${f.error}`);
    process.exitCode = 1;
  }
}

main();
