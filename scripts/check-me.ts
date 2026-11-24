import { config } from 'dotenv';
config({ path: '.env.local' });
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

(async () => {
  const { data } = await supabase.from('subscribers').select('*').eq('email', 'ant.scie@gmail.com');
  console.log(JSON.stringify(data, null, 2));
})();
