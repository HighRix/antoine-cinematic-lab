import { chromium } from 'playwright';
import fs from 'fs/promises';
import path from 'path';

const BASE = 'http://localhost:3001';
const OUT = path.resolve('public/portfolio-previews');
const TMP = path.resolve('.tmp-captures');

const VIEWPORT = { width: 1280, height: 800 };
const SETTLE_MS = 1800;
const RECORD_MS = 9000;

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
  'weblex',
  'new-era',
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function sweep(page, points, durationMs) {
  const steps = 60;
  const perLeg = durationMs / (points.length - 1);
  for (let i = 0; i < points.length - 1; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[i + 1];
    for (let s = 1; s <= steps; s++) {
      const t = s / steps;
      const x = x1 + (x2 - x1) * t;
      const y = y1 + (y2 - y1) * t;
      await page.mouse.move(x, y);
      await sleep(perLeg / steps);
    }
  }
}

async function smoothScrollTo(page, top) {
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'smooth' }), top);
  await sleep(1200);
}

const W = VIEWPORT.width;
const H = VIEWPORT.height;

const INTERACTIONS = {
  pureflow: async (page) => {
    // Sweep mouse over the face area to trigger the radial reveal mask
    await page.mouse.move(W * 0.2, H * 0.4);
    await sleep(400);
    await sweep(
      page,
      [
        [W * 0.2, H * 0.45],
        [W * 0.45, H * 0.4],
        [W * 0.55, H * 0.45],
        [W * 0.7, H * 0.4],
        [W * 0.5, H * 0.55],
        [W * 0.3, H * 0.45],
        [W * 0.55, H * 0.4],
      ],
      RECORD_MS - 1500
    );
  },
  microvisuals: async (page) => {
    // Big parallax sweeps for the GSAP-driven video bg
    await page.mouse.move(W * 0.1, H * 0.2);
    await sleep(300);
    await sweep(
      page,
      [
        [W * 0.1, H * 0.3],
        [W * 0.9, H * 0.7],
        [W * 0.1, H * 0.7],
        [W * 0.9, H * 0.3],
        [W * 0.5, H * 0.5],
      ],
      RECORD_MS - 1500
    );
  },
  'automation-machines': async (page) => {
    // Slow horizontal sweep across Spline scene
    await page.mouse.move(W * 0.2, H * 0.5);
    await sleep(400);
    await sweep(
      page,
      [
        [W * 0.2, H * 0.5],
        [W * 0.8, H * 0.4],
        [W * 0.5, H * 0.6],
        [W * 0.8, H * 0.5],
        [W * 0.2, H * 0.5],
      ],
      RECORD_MS - 1500
    );
  },
  jack: async (page) => {
    // Parallax + a small scroll to show marquee / stack
    await page.mouse.move(W * 0.3, H * 0.4);
    await sleep(300);
    await sweep(
      page,
      [
        [W * 0.3, H * 0.4],
        [W * 0.7, H * 0.6],
        [W * 0.3, H * 0.6],
        [W * 0.7, H * 0.4],
      ],
      4000
    );
    await smoothScrollTo(page, 500);
    await sleep(1500);
    await smoothScrollTo(page, 0);
  },
  stratus: async (page) => {
    // Scroll to expose char-by-char reveals
    await page.mouse.move(W * 0.5, H * 0.5);
    await sleep(800);
    await smoothScrollTo(page, 400);
    await sleep(2500);
    await smoothScrollTo(page, 900);
    await sleep(2500);
    await smoothScrollTo(page, 0);
  },
  atlas: async (page) => {
    await page.mouse.move(W * 0.5, H * 0.5);
    await sleep(600);
    await smoothScrollTo(page, 600);
    await sleep(2000);
    await smoothScrollTo(page, 1200);
    await sleep(2000);
    await smoothScrollTo(page, 0);
  },
  'grenier-bio': async (page) => {
    await sleep(800);
    await smoothScrollTo(page, 500);
    await sleep(2000);
    await smoothScrollTo(page, 1100);
    await sleep(2000);
    await smoothScrollTo(page, 0);
  },
  zenith: async (page) => {
    await sleep(800);
    await smoothScrollTo(page, 600);
    await sleep(2000);
    await smoothScrollTo(page, 1300);
    await sleep(2000);
    await smoothScrollTo(page, 0);
  },
  tanli: async (page) => {
    await sleep(800);
    await smoothScrollTo(page, 500);
    await sleep(2000);
    await smoothScrollTo(page, 1100);
    await sleep(2000);
    await smoothScrollTo(page, 0);
  },
  'slam-dunk': async (page) => {
    await sleep(800);
    await smoothScrollTo(page, 500);
    await sleep(2000);
    await smoothScrollTo(page, 1300);
    await sleep(2000);
    await smoothScrollTo(page, 0);
  },
  orbis: async (page) => {
    await page.mouse.move(W * 0.3, H * 0.5);
    await sleep(400);
    await sweep(
      page,
      [
        [W * 0.3, H * 0.5],
        [W * 0.7, H * 0.5],
        [W * 0.5, H * 0.4],
        [W * 0.5, H * 0.6],
      ],
      3500
    );
    await smoothScrollTo(page, 500);
    await sleep(1500);
    await smoothScrollTo(page, 0);
  },
  aurum: async (page) => {
    await sleep(800);
    await smoothScrollTo(page, 400);
    await sleep(2000);
    await smoothScrollTo(page, 800);
    await sleep(2000);
    await smoothScrollTo(page, 0);
  },
  _default: async (page) => {
    await page.mouse.move(W * 0.5, H * 0.5);
    await sleep(800);
    await smoothScrollTo(page, 500);
    await sleep(2000);
    await smoothScrollTo(page, 0);
  },
};

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
    await sleep(SETTLE_MS);
    const interaction = INTERACTIONS[slug] ?? INTERACTIONS._default;
    await interaction(page);
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
