import { chromium } from 'playwright';
import fs from 'fs/promises';
import path from 'path';

const BASE = 'http://localhost:3001';
const OUT = path.resolve('public/portfolio-previews');
const TMP = path.resolve('.tmp-captures');

const SLUGS = [
  'atlas',
  'aurum',
  'grenier-bio',
  'jack',
  'orbis',
  'pureflow',
  'microvisuals',
  'automation-machines',
  'slam-dunk',
  'stratus',
  'zenith',
  'tanli',
];

const SETTLE_MS = 2000;
const RECORD_MS = 8000;
const VIEWPORT = { width: 1280, height: 800 };

await fs.mkdir(OUT, { recursive: true });
await fs.mkdir(TMP, { recursive: true });

const browser = await chromium.launch();

for (const slug of SLUGS) {
  const sessionDir = path.join(TMP, slug);
  await fs.mkdir(sessionDir, { recursive: true });
  console.log(`[${slug}] starting…`);

  const context = await browser.newContext({
    viewport: VIEWPORT,
    recordVideo: { dir: sessionDir, size: VIEWPORT },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();

  try {
    await page.goto(`${BASE}/${slug}?preview=1`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(SETTLE_MS);
    await page.waitForTimeout(RECORD_MS);
  } catch (err) {
    console.error(`[${slug}] navigation error:`, err.message);
  }

  await page.close();
  await context.close();

  const files = await fs.readdir(sessionDir);
  const webm = files.find((f) => f.endsWith('.webm'));
  if (webm) {
    const dest = path.join(OUT, `${slug}.webm`);
    await fs.rename(path.join(sessionDir, webm), dest);
    const stat = await fs.stat(dest);
    console.log(`[${slug}] saved ${dest} (${(stat.size / 1024).toFixed(0)} KB)`);
  } else {
    console.warn(`[${slug}] no webm produced`);
  }

  await fs.rm(sessionDir, { recursive: true, force: true });
}

await browser.close();
await fs.rm(TMP, { recursive: true, force: true });
console.log('done.');
