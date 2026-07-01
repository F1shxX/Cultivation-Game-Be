import { config } from "../config/env.js";
import {
  applyDemoAction,
  defaultDemoState,
  normalizeDemoState,
  type DemoAction,
  type DemoSaveRecord,
  type DemoSaveState,
} from "../domain/demoSave.js";
import { getSupabaseClient } from "../lib/supabase.js";

const TABLE_NAME = "demo_saves";

function mapSupabaseError(error: { message: string; code?: string } | null) {
  if (!error) return null;
  if (
    error.code === "42P01" ||
    error.message.includes(`table "${TABLE_NAME}" does not exist`) ||
    error.message.includes(`table 'public.${TABLE_NAME}'`) ||
    error.message.includes("schema cache")
  ) {
    return new Error(`Supabase table "${TABLE_NAME}" does not exist. Run the migration SQL first.`);
  }
  return new Error(error.message);
}

export async function getDemoSave(playerId = config.demoPlayerId): Promise<DemoSaveRecord> {
  const { data, error } = await getSupabaseClient()
    .from(TABLE_NAME)
    .select("player_id,state,created_at,updated_at")
    .eq("player_id", playerId)
    .maybeSingle();

  const mappedError = mapSupabaseError(error);
  if (mappedError) throw mappedError;

  if (data) {
    const record = data as DemoSaveRecord;
    return {
      ...record,
      state: normalizeDemoState(record.state),
    };
  }

  return upsertDemoSave(defaultDemoState, playerId);
}

export async function upsertDemoSave(
  state: DemoSaveState,
  playerId = config.demoPlayerId,
): Promise<DemoSaveRecord> {
  const { data, error } = await getSupabaseClient()
    .from(TABLE_NAME)
    .upsert(
      {
        player_id: playerId,
        state,
      },
      {
        onConflict: "player_id",
      },
    )
    .select("player_id,state,created_at,updated_at")
    .single();

  const mappedError = mapSupabaseError(error);
  if (mappedError) throw mappedError;

  return data as DemoSaveRecord;
}

export async function resetDemoSave(playerId = config.demoPlayerId): Promise<DemoSaveRecord> {
  return upsertDemoSave(defaultDemoState, playerId);
}

export async function performDemoAction(
  action: DemoAction,
  playerId = config.demoPlayerId,
): Promise<DemoSaveRecord> {
  const save = await getDemoSave(playerId);
  const nextState = applyDemoAction(save.state, action);
  return upsertDemoSave(nextState, playerId);
}
