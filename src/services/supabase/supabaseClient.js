import { createClient } from "@supabase/supabase-js";

// ===== Supabase client =====
// One client for the whole app, used by every request to Supabase.
// The publishable key is safe in the browser, since Row Level Security
// decides what each user can read and write.

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
);
