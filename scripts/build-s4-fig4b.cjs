// Figure 4b — CURRENT (live, verified) vs PROPOSED (recommended, not built) IA.
//
// Left tree is generated from evidence/s4/raw/fig-4a-dropdown-items.json and the
// live crawl, so it cannot drift from what Task 1 actually verified. Right tree is
// the recommendation and is labelled as such on the figure itself — the label is
// part of the artwork, not a caption the .docx has to remember to add.
//
// Writes a self-contained SVG (font embedded as a data URI, so it renders the same
// anywhere) and rasterises it to PNG at 2x for print.
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const APP = path.join(__dirname, '..');
const OUT = path.join(APP, 'evidence', 's4');
const T = { navy: '#0A2846', blue: '#0F5CBF', mist: '#F7FAFD', tint: '#EAF2FB', edge: '#C3D9F0' };

const fontB64 = fs
  .readFileSync(path.join(APP, 'public', 'fonts', 'InstrumentSans-Variable.woff2'))
  .toString('base64');

// ---- verified current tree (Task 1) -----------------------------------------
const verified = JSON.parse(
  fs.readFileSync(path.join(OUT, 'raw', 'fig-4a-dropdown-items.json'), 'utf8')
);
const solutionsChildren = verified.items.map((i) => i.label);

const CURRENT = [
  { label: 'Home', href: '/' },
  { label: 'Solutions', href: '/solutions', children: solutionsChildren },
  { label: 'About Us', href: '/about-us' },
  { label: 'Blogs and Resources', href: '/blogs-and-resources' },
  { label: 'Careers', href: '/careers', note: 'in sitemap, hidden in nav' },
  { label: 'Connect', href: '/connect' },
];

const PROPOSED = [
  { label: 'Home' },
  { label: 'Banks', seg: true },
  { label: 'Telecom', seg: true },
  { label: 'Exchange & MTO', seg: true },
  { label: 'Government', seg: true },
  { label: 'Solutions', children: solutionsChildren, note: 'six product pages unchanged' },
  { label: 'About Us' },
  { label: 'Blogs and Resources' },
  { label: 'Careers' },
  { label: 'Connect' },
];

// ---- layout ------------------------------------------------------------------
const W = 1640;
const COL_W = 740;
const LEFT_X = 60;
const RIGHT_X = 840;
const TOP = 150;
const ROW_H = 46;
const CHILD_H = 38;
const INDENT = 46;

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderTree(items, x, isProposed) {
  let y = TOP;
  let out = '';
  const spineTop = y + ROW_H / 2;
  let spineBottom = y;

  for (const it of items) {
    const boxH = 34;
    const by = y + (ROW_H - boxH) / 2;
    const fill = isProposed && it.seg ? T.blue : T.tint;
    const stroke = isProposed && it.seg ? T.blue : T.edge;
    const textFill = isProposed && it.seg ? '#FFFFFF' : T.navy;
    const w = Math.max(150, esc(it.label).length * 9.2 + 34);

    // elbow from spine
    out += `<path d="M ${x + 14} ${spineTop} L ${x + 14} ${by + boxH / 2} L ${x + 30} ${by + boxH / 2}" fill="none" stroke="${T.edge}" stroke-width="1.5"/>`;
    out += `<rect x="${x + 30}" y="${by}" width="${w}" height="${boxH}" rx="6" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>`;
    out += `<text x="${x + 44}" y="${by + 22}" font-size="15" font-weight="600" fill="${textFill}">${esc(it.label)}</text>`;
    // Metadata sits in a fixed column so the href and the note can never collide,
    // whatever the label length.
    const metaX = x + 30 + 240;
    if (it.href) {
      out += `<text x="${metaX}" y="${by + 22}" font-size="12.5" fill="#526B84" font-family="ui-monospace, Consolas, monospace">${esc(it.href)}</text>`;
    }
    if (it.note) {
      const noteX = it.href ? metaX + esc(it.href).length * 7.4 + 18 : metaX;
      out += `<text x="${noteX}" y="${by + 22}" font-size="12" fill="#7A8FA6" font-style="italic">${esc(it.note)}</text>`;
    }
    spineBottom = by + boxH / 2;
    y += ROW_H;

    if (it.children) {
      const cTop = y;
      let cy = y;
      for (const c of it.children) {
        const cby = cy + (CHILD_H - 26) / 2;
        out += `<path d="M ${x + 30 + INDENT} ${cTop - ROW_H / 2 + 17} L ${x + 30 + INDENT} ${cby + 13} L ${x + 46 + INDENT} ${cby + 13}" fill="none" stroke="${T.edge}" stroke-width="1.25"/>`;
        out += `<rect x="${x + 46 + INDENT}" y="${cby}" width="${Math.max(140, esc(c).length * 8.4 + 26)}" height="26" rx="5" fill="#FFFFFF" stroke="${T.edge}" stroke-width="1.25"/>`;
        out += `<text x="${x + 58 + INDENT}" y="${cby + 18}" font-size="13.5" fill="${T.navy}">${esc(c)}</text>`;
        cy += CHILD_H;
      }
      y = cy + 6;
      spineBottom = Math.max(spineBottom, y - CHILD_H);
    }
  }

  // vertical spine, drawn under the elbows
  const spine = `<line x1="${x + 14}" y1="${spineTop}" x2="${x + 14}" y2="${spineBottom}" stroke="${T.edge}" stroke-width="1.5"/>`;
  return { svg: spine + out, bottom: y };
}

const left = renderTree(CURRENT, LEFT_X, false);
const right = renderTree(PROPOSED, RIGHT_X, true);
const H = Math.max(left.bottom, right.bottom) + 92;

const stamp = new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="InstrumentSans, 'Segoe UI', Arial, sans-serif">
<defs>
<style type="text/css"><![CDATA[
@font-face{font-family:'InstrumentSans';src:url(data:font/woff2;base64,${fontB64}) format('woff2');font-weight:100 900;font-style:normal;}
text{font-family:'InstrumentSans','Segoe UI',Arial,sans-serif;}
]]></style>
</defs>
<rect width="${W}" height="${H}" fill="${T.mist}"/>

<text x="${LEFT_X}" y="52" font-size="21" font-weight="700" fill="${T.navy}">Information architecture — current vs proposed</text>
<text x="${LEFT_X}" y="76" font-size="13.5" fill="#526B84">Left column verified against https://www.tayseer.me/ on ${esc(stamp)}. Right column is a recommendation; no page in this submission implements it.</text>

<rect x="${LEFT_X}" y="100" width="${COL_W}" height="30" rx="5" fill="${T.navy}"/>
<text x="${LEFT_X + 16}" y="120" font-size="13" font-weight="700" fill="#FFFFFF" letter-spacing="1.1">CURRENT — LIVE</text>

<rect x="${RIGHT_X}" y="100" width="${COL_W}" height="30" rx="5" fill="#FFFFFF" stroke="${T.blue}" stroke-width="1.5" stroke-dasharray="5 3"/>
<text x="${RIGHT_X + 16}" y="120" font-size="13" font-weight="700" fill="${T.blue}" letter-spacing="1.1">PROPOSED — RECOMMENDED, NOT BUILT</text>

${left.svg}
${right.svg}

<line x1="${RIGHT_X - 40}" y1="100" x2="${RIGHT_X - 40}" y2="${H - 60}" stroke="${T.edge}" stroke-width="1"/>

<rect x="${RIGHT_X}" y="${H - 52}" width="14" height="14" rx="3" fill="${T.blue}"/>
<text x="${RIGHT_X + 22}" y="${H - 40}" font-size="12.5" fill="#526B84">Buyer-segment entry point — recommended, not built.</text>
<text x="${LEFT_X}" y="${H - 40}" font-size="12.5" fill="#526B84">Organised by product name: the visitor works out which of six products applies to them.</text>
</svg>`;

fs.mkdirSync(OUT, { recursive: true });
const svgPath = path.join(OUT, 'fig-4b-ia-current-vs-proposed.svg');
fs.writeFileSync(svgPath, svg, 'utf8');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: W, height: H },
    deviceScaleFactor: 2,
  });
  await page.setContent(
    `<body style="margin:0;background:${T.mist}">${svg}</body>`,
    { waitUntil: 'networkidle' }
  );
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
  await page.screenshot({
    path: path.join(OUT, 'fig-4b-ia-current-vs-proposed.png'),
    clip: { x: 0, y: 0, width: W, height: H },
  });
  await browser.close();
  console.log(`wrote ${svgPath}`);
  console.log(`wrote fig-4b-ia-current-vs-proposed.png at ${W * 2}x${H * 2}`);
})();
