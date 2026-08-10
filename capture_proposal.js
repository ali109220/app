const { chromium } = require('playwright');

// No trailing slashes: the static export writes `out/<route>.html`, not
// `out/<route>/index.html`, so a trailing-slash URL 404s — and under a server
// with SPA fallback (`serve -s`) that 404 silently returns index.html, i.e. you
// screenshot the homepage and file it under the wrong page name.
const PAGES = {
  'home': '/',
};

(async () => {
  const browser = await chromium.launch();
  for (const [name, path] of Object.entries(PAGES)) {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();
    await page.goto(`http://localhost:4173${path}`, { waitUntil: 'networkidle' });
    await page.addStyleTag({ content: '.defer-render{content-visibility:visible !important}' });
    await page.waitForTimeout(800);
    await page.screenshot({ path: `screenshots/proposal/${name}.png`, fullPage: true });
    console.log('captured', name);
    await context.close();
  }
  await browser.close();
})();
