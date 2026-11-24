import { config } from 'dotenv';
config({ path: '.env.local' });
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

(async () => {
  const { data, error } = await supabase.auth.admin.listUsers();
  if (error) { console.log('❌', error.message); return; }
  console.log(`Total users : ${data.users.length}\n`);
  data.users.forEach(u => {
    console.log(`Email: ${u.email}`);
    console.log(`  Créé : ${u.created_at}`);
    console.log(`  Dernière connexion : ${u.last_sign_in_at ?? 'jamais'}`);
    console.log(`  Email confirmé : ${u.email_confirmed_at ?? 'non'}`);
    console.log(`  Métadonnées : ${JSON.stringify(u.user_metadata)}`);
    console.log();
  });
})();
