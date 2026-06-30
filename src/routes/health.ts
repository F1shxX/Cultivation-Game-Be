import { Router } from "express";
import { config, getMissingSupabaseConfig, getSupabaseProjectRef } from "../config/env.js";
import { getSupabaseClient } from "../lib/supabase.js";

export const healthRouter = Router();

healthRouter.get("/", (_req, res) => {
  const missingSupabaseConfig = getMissingSupabaseConfig();

  res.json({
    ok: true,
    service: "cultivation-game-be",
    supabase: {
      configured: missingSupabaseConfig.length === 0,
      projectRef: getSupabaseProjectRef(),
      missing: missingSupabaseConfig,
    },
  });
});

healthRouter.get("/db", async (_req, res) => {
  const missingSupabaseConfig = getMissingSupabaseConfig();
  if (missingSupabaseConfig.length > 0) {
    res.status(503).json({
      ok: false,
      message: "Supabase is not configured.",
      missing: missingSupabaseConfig,
    });
    return;
  }

  try {
    const restCheck = await fetch(`${config.supabaseUrl}/rest/v1/`, {
      headers: {
        apikey: config.supabaseServiceRoleKey!,
        Authorization: `Bearer ${config.supabaseServiceRoleKey}`,
      },
    });

    if (!restCheck.ok) {
      res.status(502).json({
        ok: false,
        message: "Supabase REST endpoint rejected the configured key.",
        status: restCheck.status,
      });
      return;
    }

    let tableCheck: { table: string; ok: boolean; error?: string } | null = null;
    if (config.databaseHealthTable) {
      const { error } = await getSupabaseClient()
        .from(config.databaseHealthTable)
        .select("*", { count: "exact", head: true });

      tableCheck = {
        table: config.databaseHealthTable,
        ok: !error,
        error: error?.message,
      };
    }

    res.json({
      ok: true,
      message: "Supabase connection is reachable.",
      projectRef: getSupabaseProjectRef(),
      tableCheck,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown database health error";
    res.status(500).json({
      ok: false,
      message,
    });
  }
});
