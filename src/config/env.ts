import "dotenv/config";

export type AppConfig = {
  port: number;
  clientOrigin: string;
  supabaseUrl?: string;
  supabaseServiceRoleKey?: string;
  databaseHealthTable?: string;
};

function parsePort(value: string | undefined): number {
  const parsed = Number(value ?? "3001");
  if (!Number.isInteger(parsed) || parsed <= 0 || parsed > 65535) {
    throw new Error(`Invalid PORT value: ${value}`);
  }
  return parsed;
}

export const config: AppConfig = {
  port: parsePort(process.env.PORT),
  clientOrigin: process.env.CLIENT_ORIGIN ?? "http://localhost:5173",
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  databaseHealthTable: process.env.DATABASE_HEALTH_TABLE,
};

export function getSupabaseProjectRef(): string | null {
  if (!config.supabaseUrl) return null;
  try {
    const host = new URL(config.supabaseUrl).hostname;
    return host.split(".")[0] || null;
  } catch {
    return null;
  }
}

export function getMissingSupabaseConfig(): string[] {
  const missing: string[] = [];
  if (!config.supabaseUrl) missing.push("SUPABASE_URL");
  if (!config.supabaseServiceRoleKey) missing.push("SUPABASE_SERVICE_ROLE_KEY");
  return missing;
}
