/**
 * scripts/fix-asset-imports.ts
 *
 * Corrige le résultat de migrate-assets.ts :
 *  1. Convertit les strings `'${ASSETS_BASE}/...'` (littérales) en
 *     template literals `` `${ASSETS_BASE}/...` ``
 *  2. Convertit les JSX attributes `prop="${ASSETS_BASE}/..."` en
 *     `prop={\`${ASSETS_BASE}/...\`}`
 *  3. Ajoute `import { ASSETS_BASE } from '@/lib/assets'` en tête de chaque
 *     fichier qui utilise la variable.
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname, relative } from 'node:path';

const ROOT = process.cwd();
const TOKEN = 'ASSETS_BASE';

function scanDir(dir: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith('.') || entry === 'node_modules' || entry === '.next') continue;
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) files.push(...scanDir(full));
    else if (['.tsx', '.ts'].includes(extname(full))) files.push(full);
  }
  return files;
}

function fixFile(filePath: string): { changed: boolean; addedImport: boolean } {
  let content = readFileSync(filePath, 'utf8');
  const original = content;

  // 1) Single-quoted strings containing ${ASSETS_BASE} → backticks
  // Match 'anything${ASSETS_BASE}anything' (no escaped quotes inside)
  content = content.replace(
    /'([^'\n]*\$\{ASSETS_BASE\}[^'\n]*)'/g,
    (_m, inner) => `\`${inner}\``
  );

  // 2) Double-quoted JSX attributes containing ${ASSETS_BASE}
  // Match attr="...${ASSETS_BASE}..." → attr={`...${ASSETS_BASE}...`}
  content = content.replace(
    /(\w+)="([^"\n]*\$\{ASSETS_BASE\}[^"\n]*)"/g,
    (_m, attr, inner) => `${attr}={\`${inner}\`}`
  );

  const changed = content !== original;
  let addedImport = false;

  // 3) Ajout de l'import si la variable est utilisée et l'import absent
  if (content.includes('${ASSETS_BASE}') && !content.includes("from '@/lib/assets'")) {
    // Insère après le dernier import existant, ou en haut sinon
    const importLine = "import { ASSETS_BASE } from '@/lib/assets';";
    const importRegex = /^(import [^;]+;)$/gm;
    const matches = [...content.matchAll(importRegex)];
    if (matches.length > 0) {
      const last = matches[matches.length - 1];
      const insertAt = (last.index ?? 0) + last[0].length;
      content = content.slice(0, insertAt) + '\n' + importLine + content.slice(insertAt);
    } else {
      // Pas d'import existant — préserver 'use client' s'il existe
      if (content.startsWith("'use client'")) {
        const firstNewline = content.indexOf('\n');
        content = content.slice(0, firstNewline + 1) + importLine + '\n' + content.slice(firstNewline + 1);
      } else {
        content = importLine + '\n' + content;
      }
    }
    addedImport = true;
  }

  if (changed || addedImport) writeFileSync(filePath, content);
  return { changed, addedImport };
}

function main() {
  const files = [...scanDir(join(ROOT, 'app')), ...scanDir(join(ROOT, 'components'))];
  let fixed = 0;
  let importsAdded = 0;

  for (const file of files) {
    const content = readFileSync(file, 'utf8');
    if (!content.includes('${ASSETS_BASE}')) continue;
    const { changed, addedImport } = fixFile(file);
    if (changed || addedImport) {
      console.log(`  ${addedImport ? '+import' : '       '} ${changed ? '+quotes' : '       '} ${relative(ROOT, file)}`);
      if (changed) fixed++;
      if (addedImport) importsAdded++;
    }
  }

  console.log(`\n${fixed} fichier(s) corrigé(s), ${importsAdded} import(s) ajouté(s)`);
}

main();
