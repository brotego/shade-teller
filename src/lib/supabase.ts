import { createClient } from '@supabase/supabase-js';

// These environment variables are intentionally public and safe to expose to the browser
// The anon key is a restricted key that only allows certain operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Only create the client if we have the required environment variables
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false
      }
    })
  : null; 