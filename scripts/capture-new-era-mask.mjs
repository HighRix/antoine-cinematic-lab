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

  // Compute luminance per pixel, threshold to binary :
  //   bright source pixel (car body) -> BLACK output (hides text)
  //   dark source pixel (background) -> WHITE output (shows text)
  // Threshold tuned to the bright orange car body vs the dark surroundings.
  const d = imgData.data;
  const THRESHOLD = 70;
  for (let i = 0; i < d.length; i += 4) {
    const luma = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
    const v = luma > THRESHOLD ? 0 : 255;
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
