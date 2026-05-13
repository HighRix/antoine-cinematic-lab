// Capture an inverted frame from the New Era hero's CloudFront video.
// The resulting PNG is used as a `mask-image` for the NEW ERA text so
// the text renders only where the original background is dark (i.e.
// AROUND the car silhouette, not over it).
//
// Run while `npm run dev` is up on :3001.

import { chromium } from 'playwright';
import fs from 'fs/promises';
import path from 'path';

const URL = 'http://localhost:3001/new-era?preview=1';
const OUT = path.resolve('public/new-era-mask.png');
const VIEWPORT = { width: 1280, height: 720 };

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: VIEWPORT });
const page = await context.newPage();

await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(2500);

const result = await page.evaluate(async () => {
  const v = document.querySelector('video');
  if (!v) return { error: 'no video' };
  if (v.readyState < 2) await new Promise((r) => v.addEventListener('loadeddata', r, { once: true }));
  try {
    v.currentTime = 1.2;
  } catch {}
  await new Promise((r) => setTimeout(r, 600));

  const canvas = document.createElement('canvas');
  canvas.width = v.videoWidth;
  canvas.height = v.videoHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) return { error: 'no ctx' };

  try {
    ctx.drawImage(v, 0, 0);
  } catch (e) {
    return { error: 'draw: ' + (e instanceof Error ? e.message : String(e)) };
  }

  let imgData;
  try {
    imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  } catch (e) {
    return { error: 'getImageData (CORS taint?): ' + (e instanceof Error ? e.message : String(e)) };
  }

  // Step 1 — binary threshold : bright pixel (car) -> 0 (black, hide text),
  // dark pixel (bg) -> 255 (white, show text). Also count orange-dominant
  // pixels so dark car interior (wheel arches, shadows) still register.
  const w = canvas.width;
  const h = canvas.height;
  const d = imgData.data;
  const LUMA_THRESHOLD = 55;
  const binary = new Uint8Array(w * h);
  for (let i = 0, p = 0; i < d.length; i += 4, p++) {
    const r = d[i],
      g = d[i + 1],
      b = d[i + 2];
    const luma = 0.299 * r + 0.587 * g + 0.114 * b;
    const isOrange = r > 50 && r > g + 5 && r > b + 15;
    binary[p] = luma > LUMA_THRESHOLD || isOrange ? 0 : 255;
  }

  // Step 2 — morphological closing (dilate then erode) to fill internal
  // holes inside the car silhouette. Separable (horizontal pass then
  // vertical pass) so a large radius is affordable. R=100 fills the big
  // windshield + any other interior pocket.
  const R = 100;
  const a = binary;
  const b = new Uint8Array(w * h);

  // Horizontal dilate : a -> b
  for (let y = 0; y < h; y++) {
    const row = y * w;
    for (let x = 0; x < w; x++) {
      const x0 = Math.max(0, x - R);
      const x1 = Math.min(w - 1, x + R);
      let black = false;
      for (let i = x0; i <= x1; i++) {
        if (a[row + i] === 0) {
          black = true;
          break;
        }
      }
      b[row + x] = black ? 0 : 255;
    }
  }
  // Vertical dilate : b -> a
  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      const y0 = Math.max(0, y - R);
      const y1 = Math.min(h - 1, y + R);
      let black = false;
      for (let i = y0; i <= y1; i++) {
        if (b[i * w + x] === 0) {
          black = true;
          break;
        }
      }
      a[y * w + x] = black ? 0 : 255;
    }
  }
  // Horizontal erode : a -> b. Pixel stays black only if all neighbors black.
  for (let y = 0; y < h; y++) {
    const row = y * w;
    for (let x = 0; x < w; x++) {
      const x0 = Math.max(0, x - R);
      const x1 = Math.min(w - 1, x + R);
      let allBlack = true;
      for (let i = x0; i <= x1; i++) {
        if (a[row + i] !== 0) {
          allBlack = false;
          break;
        }
      }
      b[row + x] = allBlack ? 0 : 255;
    }
  }
  // Vertical erode : b -> binary (overwrite a)
  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      const y0 = Math.max(0, y - R);
      const y1 = Math.min(h - 1, y + R);
      let allBlack = true;
      for (let i = y0; i <= y1; i++) {
        if (b[i * w + x] !== 0) {
          allBlack = false;
          break;
        }
      }
      binary[y * w + x] = allBlack ? 0 : 255;
    }
  }

  // Write back to canvas
  for (let p = 0, i = 0; p < binary.length; p++, i += 4) {
    const v = binary[p];
    d[i] = v;
    d[i + 1] = v;
    d[i + 2] = v;
  }
  ctx.putImageData(imgData, 0, 0);
  return { dataUrl: canvas.toDataURL('image/png'), w: canvas.width, h: canvas.height };
});

if (result.error) {
  console.error('capture error:', result.error);
  process.exit(1);
}

const buffer = Buffer.from(result.dataUrl.split(',')[1], 'base64');
await fs.writeFile(OUT, buffer);
const stat = await fs.stat(OUT);
console.log(`saved ${OUT} (${(stat.size / 1024).toFixed(0)} KB, ${result.w}x${result.h})`);

await browser.close();
