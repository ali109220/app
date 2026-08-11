/**
 * Builds the homepage hero raster variants from the supplied source artwork.
 *
 * Three art-directed crops of one source, all 4:3, so the <picture> can swap
 * between them at breakpoints without ever changing the box's aspect ratio —
 * that is what keeps CLS at zero across the swap. Tightness (how much of the
 * ecosystem is in frame) is what varies, not the shape.
 *
 * The source's left third carries baked-in headline and CTA text. Every crop
 * starts at x >= 628, which clears the right edge of "Reinvented." (~x620), so
 * no delivered asset contains any of it — the page text stays live DOM.
 *
 * Black point is floored to the existing navy token (#0A2846) with a `lighten`
 * composite. That maps the artwork's near-black field (#00021b) into the site's
 * navy family per the brief, using only an approved palette value, and leaves
 * every pixel already brighter than navy completely untouched.
 *
 * Usage: node scripts/build-hero-assets.cjs <path-to-source.png>
 */
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const SRC = process.argv[2];
if (!SRC || !fs.existsSync(SRC)) {
  console.error("Usage: node scripts/build-hero-assets.cjs <path-to-source.png>");
  process.exit(1);
}

const OUT_DIR = path.join(__dirname, "..", "public", "images", "hero");
const BUDGET = 120 * 1024; // hard ceiling per delivered variant
const NAVY = { r: 10, g: 40, b: 70 }; // #0A2846

// left/top/width/height in source pixels, then the delivered width.
// Each crop is 4:3. Widths are native or downsampled — never upscaled, because
// the text-free region of the source is only 908px wide and inventing pixels
// above that would spend budget on no real detail.
const VARIANTS = [
  { name: "desktop", out: 908, crop: { left: 628, top: 150, width: 908, height: 681 } },
  { name: "tablet", out: 720, crop: { left: 725, top: 225, width: 720, height: 540 } },
  { name: "mobile", out: 360, crop: { left: 825, top: 300, width: 520, height: 390 } },
];

// Highest quality that still fits the budget wins; descending so we stop at the
// first fit rather than settling for the smallest file.
const AVIF_Q = [70, 65, 62, 58, 54, 50, 46, 42, 38];
const WEBP_Q = [88, 84, 80, 76, 72, 68, 64, 60, 55];

async function encode(base, label, exts) {
  const results = [];
  for (const { ext, qualities, encoder } of exts) {
    let chosen = null;
    for (const q of qualities) {
      const buf = await encoder(base.clone(), q).toBuffer();
      if (buf.length <= BUDGET) {
        chosen = { q, buf };
        break;
      }
      console.log(`    ${ext} q${q}: ${(buf.length / 1024).toFixed(1)} KB — over budget, stepping down`);
    }
    if (!chosen) {
      console.error(`\nSTOP: ${label}.${ext} cannot fit ${BUDGET / 1024} KB at any tested quality.`);
      process.exit(2);
    }
    const file = path.join(OUT_DIR, `${label}.${ext}`);
    fs.writeFileSync(file, chosen.buf);
    const meta = await sharp(chosen.buf).metadata();
    results.push({ ext, q: chosen.q, bytes: chosen.buf.length, w: meta.width, h: meta.height });
  }
  return results;
}

(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const srcMeta = await sharp(SRC).metadata();
  console.log(`source: ${srcMeta.width}x${srcMeta.height} ${srcMeta.format}, ${(fs.statSync(SRC).size / 1024).toFixed(0)} KB\n`);

  const report = [];
  for (const v of VARIANTS) {
    const h = Math.round((v.out * 3) / 4);
    console.log(`${v.name} -> ${v.out}x${h} (from ${v.crop.width}x${v.crop.height} @ ${v.crop.left},${v.crop.top})`);

    // Sized to the OUTPUT, not the crop: sharp runs composite after resize
    // regardless of chaining order, so a crop-sized floor overflows the
    // resized image on any variant that is actually downsampled.
    const floor = await sharp({
      create: { width: v.out, height: h, channels: 3, background: NAVY },
    }).png().toBuffer();

    const base = sharp(
      await sharp(SRC)
        .extract(v.crop)
        .composite([{ input: floor, blend: "lighten" }])
        .resize(v.out, h, { fit: "fill", kernel: "lanczos3" })
        .png()
        .toBuffer()
    );

    const rows = await encode(base, `tayseer-hero-${v.out}`, [
      { ext: "avif", qualities: AVIF_Q, encoder: (s, q) => s.avif({ quality: q, effort: 9, chromaSubsampling: "4:2:0" }) },
      { ext: "webp", qualities: WEBP_Q, encoder: (s, q) => s.webp({ quality: q, effort: 6, smartSubsample: true }) },
    ]);

    for (const r of rows) {
      console.log(`    ${r.ext.toUpperCase().padEnd(4)} ${r.w}x${r.h}  q${r.q}  ${(r.bytes / 1024).toFixed(1)} KB  ${r.bytes <= BUDGET ? "OK" : "OVER"}`);
      report.push({ variant: v.out, ...r });
    }
    console.log("");
  }

  const over = report.filter((r) => r.bytes > BUDGET);
  console.log(over.length ? `FAIL: ${over.length} variant(s) over budget` : `PASS: all ${report.length} variants <= 120 KB`);
  const heaviest = report.reduce((a, b) => (a.bytes > b.bytes ? a : b));
  console.log(`heaviest variant: tayseer-hero-${heaviest.variant}.${heaviest.ext} at ${(heaviest.bytes / 1024).toFixed(1)} KB`);
})();
