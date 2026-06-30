import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { config, getMissingSupabaseConfig } from "../config/env.js";

let client: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  const missing = getMissingSupabaseConfig();
  if (missing.length > 0) {
    throw new Error(`Missing Supabase configuration: ${missing.join(", ")}`);
  }

  if (!client) {
    client = createClient(config.supabaseUrl!, config.supabaseServiceRoleKey!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  return client;
}
