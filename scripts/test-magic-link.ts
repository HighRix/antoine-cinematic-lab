import { config } from 'dotenv';
config({ path: '.env.local' });
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const email = process.argv[2];
if (!email) { console.log('Usage'); process.exit(1); }

(async () => {
  console.log(`→ Magic link pour ${email}...`);
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: 'http://localhost:3001/auth/callback?next=/lab/account' }
  });
  if (error) console.log('❌', JSON.stringify(error, null, 2));
  else console.log('✓ Réponse OK:', JSON.stringify(data, null, 2));
})();
