/**
 * scripts/db-push.ts
 *
 * Applique toutes les migrations SQL dans supabase/migrations/ sur la DB
 * Supabase via une connexion Postgres directe.
 *
 * Idempotent : utilise une table `_migrations` pour ne ré-appliquer que les
 * nouvelles migrations.
 *
 * Usage : npm run db:push
 */

import { config } from 'dotenv';
config({ path: '.env.local' });

import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { Client } from 'pg';

async function main() {
  const ref = process.env.SUPABASE_PROJECT_REF;
  const password = process.env.SUPABASE_DB_PASSWORD;

  if (!ref || !password) {
    console.error('❌ SUPABASE_PROJECT_REF ou SUPABASE_DB_PASSWORD manquant');
    process.exit(1);
  }

  // Direct connection (port 5432) supporte DDL complet
  const client = new Client({
    host: `db.${ref}.supabase.co`,
    port: 5432,
    user: 'postgres',
    password,
    database: 'postgres',
    ssl: { rejectUnauthorized: false },
  });

  console.log(`→ Connexion à db.${ref}.supabase.co...`);
  await client.connect();
  console.log('✓ Connecté');

  // Table de tracking des migrations
  await client.query(`
    create table if not exists public._migrations (
      filename text primary key,
      applied_at timestamptz not null default now()
    );
  `);

  const dir = join(process.cwd(), 'supabase', 'migrations');
  const files = readdirSync(dir).filter((f) => f.endsWith('.sql')).sort();

  const { rows: applied } = await client.query<{ filename: string }>(
    'select filename from public._migrations'
  );
  const appliedSet = new Set(applied.map((r) => r.filename));

  let count = 0;
  for (const file of files) {
    if (appliedSet.has(file)) {
      console.log(`  ↷ ${file} (déjà appliquée)`);
      continue;
    }

    process.stdout.write(`→ ${file}... `);
    const sql = readFileSync(join(dir, file), 'utf8');

    try {
      await client.query('begin');
      await client.query(sql);
      await client.query('insert into public._migrations (filename) values ($1)', [file]);
      await client.query('commit');
      console.log('✓');
      count++;
    } catch (err) {
      await client.query('rollback');
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`\n❌ Échec ${file} : ${msg}`);
      await client.end();
      process.exit(1);
    }
  }

  // Force PostgREST schema reload
  await client.query("notify pgrst, 'reload schema'");

  await client.end();

  if (count === 0) {
    console.log('\nRien à appliquer. DB déjà à jour.');
  } else {
    console.log(`\n✓ ${count} migration(s) appliquée(s).`);
  }
}

main().catch((err) => {
  console.error('❌', err.message);
  process.exit(1);
});
