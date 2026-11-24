/**
 * scripts/migrate-assets.ts
 *
 * Télécharge les assets externes hostés sur le CDN Higgsfield (tes vidéos
 * et images générées) vers public/{slug}/{filename}, et réécrit les URLs
 * dans le code pour utiliser ASSETS_BASE.
 *
 * Pour les assets tiers non-Higgsfield (Mux streams, motionsites.ai,
 * figma.site), le script les liste dans MIGRATION_TODO.md sans télécharger
 * — chacun nécessite une décision (régénérer / remplacer / supprimer).
 *
 * Usage : npm run migrate:assets
 */

import { config } from 'dotenv';
config({ path: '.env.local' });

import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync, existsSync } from 'node:fs';
import { join, extname, basename, relative } from 'node:path';
import { createHash } from 'node:crypto';

const ROOT = join(process.cwd());
const PUBLIC_DIR = join(ROOT, 'public');
const HIGGS_PREFIX = 'd8j0ntlcm91z4.cloudfront.net';
const HIGGS_PROXY = 'images.higgs.ai';

type Asset = {
  url: string;        // URL externe d'origine
  downloadUrl: string; // URL effective à télécharger (peut différer si proxy)
  source: 'higgsfield' | 'higgsfield-proxy' | 'motionsites' | 'figma-site' | 'mux' | 'unknown';
  slug: string;       // dossier projet ('stratus', 'orbis', etc.)
  fileExt: string;    // '.mp4', '.png', '.gif', etc.
  files: { path: string; line: number }[]; // occurrences
};

const assets = new Map<string, Asset>();

function detectSource(url: string): Asset['source'] {
  if (url.includes(HIGGS_PROXY)) return 'higgsfield-proxy';
  if (url.includes(HIGGS_PREFIX)) return 'higgsfield';
  if (url.includes('motionsites.ai')) return 'motionsites';
  if (url.includes('figma.site')) return 'figma-site';
  if (url.includes('stream.mux.com')) return 'mux';
  return 'unknown';
}

function extractInnerHiggsUrl(proxyUrl: string): string | null {
  // images.higgs.ai/?...&url=ENCODED_HIGGS_URL&...
  try {
    const u = new URL(proxyUrl);
    const inner = u.searchParams.get('url');
    return inner ? decodeURIComponent(inner) : null;
  } catch {
    return null;
  }
}

function deriveSlug(filePath: string): string {
  // 'components/stratus/HeroSection.tsx' → 'stratus'
  // 'app/orbis/page.tsx' → 'orbis'
  // 'components/lab/BoomerangVideoBg.tsx' → 'lab'
  const parts = relative(ROOT, filePath).split('/');
  if (parts[0] === 'app' || parts[0] === 'components') return parts[1];
  return 'shared';
}

function deriveFilename(url: string, ext: string): string {
  // Pour Higgsfield : 'hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4'
  // → on garde un nom court basé sur un hash de l'URL pour stabilité
  const hash = createHash('sha1').update(url).digest('hex').slice(0, 8);
  return `asset-${hash}${ext}`;
}

function detectExt(url: string): string {
  const cleaned = url.split('?')[0];
  const ext = extname(cleaned).toLowerCase();
  if (['.mp4', '.webm', '.png', '.jpg', '.jpeg', '.gif', '.webp', '.m3u8'].includes(ext)) return ext;
  // Fallback : si URL contient 'url=...png' → png
  if (url.includes('.mp4')) return '.mp4';
  if (url.includes('.png')) return '.png';
  if (url.includes('.gif')) return '.gif';
  if (url.includes('.webp')) return '.webp';
  return '.bin';
}

function scanDir(dir: string, exts: string[]) {
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith('.') || entry === 'node_modules' || entry === '.next') continue;
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) scanDir(full, exts);
    else if (exts.includes(extname(full))) scanFile(full);
  }
}

const URL_REGEX = /https?:\/\/[^\s'")`]+/g;

function scanFile(filePath: string) {
  const slug = deriveSlug(filePath);
  const content = readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const matches = lines[i].matchAll(URL_REGEX);
    for (const m of matches) {
      const url = m[0];
      const source = detectSource(url);
      if (source === 'unknown') continue;

      const downloadUrl =
        source === 'higgsfield-proxy'
          ? extractInnerHiggsUrl(url) ?? url
          : source === 'mux'
            ? url.replace(/\.m3u8$/, '/high.mp4') // tentative MP4 fallback
            : url;

      const ext = detectExt(downloadUrl);

      const existing = assets.get(url);
      if (existing) {
        existing.files.push({ path: filePath, line: i + 1 });
      } else {
        assets.set(url, {
          url,
          downloadUrl,
          source,
          slug,
          fileExt: ext,
          files: [{ path: filePath, line: i + 1 }],
        });
      }
    }
  }
}

async function downloadAsset(asset: Asset): Promise<{ ok: boolean; localPath: string; size?: number; err?: string }> {
  const slugDir = join(PUBLIC_DIR, asset.slug);
  if (!existsSync(slugDir)) mkdirSync(slugDir, { recursive: true });

  const filename = deriveFilename(asset.url, asset.fileExt);
  const localPath = join(slugDir, filename);

  if (existsSync(localPath)) {
    return { ok: true, localPath, size: statSync(localPath).size };
  }

  try {
    const res = await fetch(asset.downloadUrl);
    if (!res.ok) return { ok: false, localPath, err: `HTTP ${res.status}` };
    const buf = Buffer.from(await res.arrayBuffer());
    writeFileSync(localPath, buf);
    return { ok: true, localPath, size: buf.length };
  } catch (e) {
    return { ok: false, localPath, err: (e as Error).message };
  }
}

function rewriteFile(filePath: string, replacements: Map<string, string>) {
  let content = readFileSync(filePath, 'utf8');
  let changed = false;
  for (const [from, to] of replacements) {
    if (content.includes(from)) {
      content = content.split(from).join(to);
      changed = true;
    }
  }
  if (changed) writeFileSync(filePath, content);
  return changed;
}

async function main() {
  console.log('→ Scan des fichiers .tsx/.ts...');
  scanDir(join(ROOT, 'app'), ['.tsx', '.ts']);
  scanDir(join(ROOT, 'components'), ['.tsx', '.ts']);

  const byCategory: Record<Asset['source'], Asset[]> = {
    higgsfield: [],
    'higgsfield-proxy': [],
    motionsites: [],
    'figma-site': [],
    mux: [],
    unknown: [],
  };
  for (const a of assets.values()) byCategory[a.source].push(a);

  console.log(`\nDétecté ${assets.size} URLs externes uniques :`);
  for (const [cat, items] of Object.entries(byCategory)) {
    if (items.length) console.log(`  ${cat.padEnd(20)} : ${items.length}`);
  }

  // Phase 1 — download Higgsfield (à toi)
  console.log('\n=== Phase 1 — Téléchargement des assets Higgsfield ===');
  const replacements = new Map<string, string>();
  const filesToRewrite = new Set<string>();
  const reportLines: string[] = [];

  const higgsAssets = [...byCategory.higgsfield, ...byCategory['higgsfield-proxy']];
  let downloaded = 0;
  let failed = 0;

  for (const asset of higgsAssets) {
    process.stdout.write(`  ${asset.url.slice(0, 70)}... `);
    const result = await downloadAsset(asset);
    if (result.ok) {
      const sizeKB = result.size ? Math.round(result.size / 1024) : '?';
      console.log(`✓ ${sizeKB} KB → ${relative(ROOT, result.localPath)}`);
      const newUrl = `\${ASSETS_BASE}/${asset.slug}/${basename(result.localPath)}`;
      replacements.set(asset.url, newUrl);
      asset.files.forEach((f) => filesToRewrite.add(f.path));
      downloaded++;
    } else {
      console.log(`✗ ${result.err}`);
      failed++;
    }
  }

  // Phase 2 — assets tiers (motionsites, figma, mux) : on ne touche pas, on liste
  console.log('\n=== Phase 2 — Assets tiers (non téléchargés) ===');
  const thirdParty = [...byCategory.motionsites, ...byCategory['figma-site'], ...byCategory.mux];
  console.log(`  ${thirdParty.length} assets tiers à traiter manuellement (voir MIGRATION_TODO.md)`);

  reportLines.push('# Migration TODO — assets tiers à remplacer\n');
  reportLines.push(`Généré le ${new Date().toISOString()}\n`);
  reportLines.push(`Ces ${thirdParty.length} URLs pointent vers des CDN tiers (motionsites, figma, Mux).\n`);
  reportLines.push('Pour chacun, génère un asset équivalent via Higgsfield/Runway/Pika ou utilise un stock libre (Pexels, Mixkit, Coverr).\n\n');

  for (const cat of ['motionsites', 'figma-site', 'mux'] as const) {
    if (!byCategory[cat].length) continue;
    reportLines.push(`## ${cat} (${byCategory[cat].length})\n`);
    for (const asset of byCategory[cat]) {
      reportLines.push(`### \`${asset.url}\``);
      reportLines.push(`- **Slug** : \`${asset.slug}\``);
      reportLines.push(`- **Type** : \`${asset.fileExt}\``);
      reportLines.push(`- **Utilisé dans** :`);
      for (const f of asset.files) {
        reportLines.push(`  - \`${relative(ROOT, f.path)}:${f.line}\``);
      }
      reportLines.push('');
    }
  }

  writeFileSync(join(ROOT, 'MIGRATION_TODO.md'), reportLines.join('\n'));

  // Réécriture des fichiers sources
  if (replacements.size > 0) {
    console.log('\n=== Réécriture des URLs dans le code ===');
    for (const filePath of filesToRewrite) {
      const ok = rewriteFile(filePath, replacements);
      console.log(`  ${ok ? '✓' : '↷'} ${relative(ROOT, filePath)}`);
    }
  }

  console.log('\n──────────────────────────────────────────────────');
  console.log(`Phase 1 : ${downloaded} téléchargé(s), ${failed} échec(s)`);
  console.log(`Phase 2 : ${thirdParty.length} assets tiers listés dans MIGRATION_TODO.md`);
  console.log(`Fichiers réécrits : ${filesToRewrite.size}`);
  console.log('──────────────────────────────────────────────────');
  console.log('\nProchaine étape :');
  console.log('  1. Vérifier le diff : git diff');
  console.log('  2. Ajouter import { ASSETS_BASE } from "@/lib/assets" dans les fichiers réécrits');
  console.log('  3. Tester en local : npm run dev');
  console.log('  4. Déployer : npx vercel deploy --prod --yes');
}

main().catch((e) => {
  console.error('❌', e.message);
  process.exit(1);
});
