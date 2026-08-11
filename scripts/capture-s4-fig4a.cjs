// Figure 4a — honest capture of the CURRENT (live) product-led entry model.
// Target is https://www.tayseer.me/, NOT the prototype: this figure is evidence
// of what is being improved on, not a claim about the redesign.
//
// The Solutions submenu on the live site is opened purely by CSS
// (`lg:group-hover:opacity-100 lg:group-hover:visible` on `li.has-dropdown`),
// so a real hover is required — clicking the label navigates instead.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'evidence', 's4');
const URL = 'https://www.tayseer.me/';

(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  const resp = await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
  console.log('status', resp.status(), '->', page.url());

  const trigger = page.locator('#mainNav li.has-dropdown').first();
  await trigger.hover();
  const menu = page.locator('#mainNav li.has-dropdown ul.dropdown-menu').first();
  await menu.waitFor({ state: 'visible', timeout: 10000 });
  await page.waitForTimeout(600);

  // Record what is actually in the open menu, so the figure carries its own receipt.
  const items = await menu.locator('a').evaluateAll((els) =>
    els.map((e) => ({ label: e.textContent.trim(), href: e.getAttribute('href') }))
  );
  console.log('dropdown items:', items.length);
  console.log(JSON.stringify(items, null, 2));

  // Header + the open menu only — a full-page shot buries the point.
  const header = page.locator('#siteHeader');
  const hb = await header.boundingBox();
  const mb = await menu.boundingBox();
  const bottom = Math.max(hb.y + hb.height, mb.y + mb.height) + 24;
  await page.screenshot({
    path: path.join(OUT_DIR, 'fig-4a-current-nav-1440.png'),
    clip: { x: 0, y: 0, width: 1440, height: Math.ceil(bottom) },
  });

  fs.writeFileSync(
    path.join(OUT_DIR, 'raw', 'fig-4a-dropdown-items.json'),
    JSON.stringify(
      { capturedAtUtc: new Date().toISOString(), url: page.url(), viewport: '1440x900@2x', items },
      null,
      2
    )
  );

  await browser.close();
  console.log('wrote', path.join(OUT_DIR, 'fig-4a-current-nav-1440.png'));
})();
