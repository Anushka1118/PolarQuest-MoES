import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://polarquest-demo.supabase.co';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'demo-service-key';

export const getSupabaseServer = () => {
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false }
  });
};
