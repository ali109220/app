const { chromium } = require('playwright');

const PAGES = {
  'home': '/',
  'trust-center': '/trust-center/',
  'sectors-banks': '/sectors/banks/',
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
