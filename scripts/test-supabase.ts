/**
 * scripts/test-supabase.ts
 * Vérifie que les clés Supabase fonctionnent et que les tables existent.
 */

import { config } from 'dotenv';
config({ path: '.env.local' });

import { createClient } from '@supabase/supabase-js';

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    console.error('❌ Variables Supabase manquantes dans .env.local');
    process.exit(1);
  }

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  console.log(`→ Connexion à ${url}`);

  // Test 1 — Auth disponible
  const { data: authData, error: authError } = await supabase.auth.admin.listUsers({
    page: 1,
    perPage: 1,
  });
  if (authError) {
    console.error('❌ Auth API inaccessible :', authError.message);
    process.exit(1);
  }
  console.log(`✓ Auth API OK (${authData.users.length} user(s) actuellement)`);

  // Test 2 — Table subscribers existe
  const { error: subError } = await supabase
    .from('subscribers')
    .select('id', { count: 'exact', head: true });

  if (subError) {
    if (subError.message.includes('does not exist') || subError.code === '42P01') {
      console.log('⚠️  Table "subscribers" n\'existe pas encore');
      console.log('   → Va dans Supabase SQL Editor et exécute :');
      console.log('   → supabase/migrations/0001_subscribers.sql');
    } else {
      console.error('❌ Erreur table subscribers :', subError.message);
    }
  } else {
    console.log('✓ Table "subscribers" présente');
  }

  // Test 3 — Table prompts existe
  const { error: promptsError } = await supabase
    .from('prompts')
    .select('slug', { count: 'exact', head: true });

  if (promptsError) {
    if (
      promptsError.message.includes('does not exist') ||
      promptsError.code === '42P01'
    ) {
      console.log('⚠️  Table "prompts" n\'existe pas encore');
      console.log('   → Va dans Supabase SQL Editor et exécute :');
      console.log('   → supabase/migrations/0002_prompts.sql');
    } else {
      console.error('❌ Erreur table prompts :', promptsError.message);
    }
  } else {
    console.log('✓ Table "prompts" présente');
  }
}

main().catch((e) => {
  console.error('❌', e.message);
  process.exit(1);
});
