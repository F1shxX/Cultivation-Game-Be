import { Router } from "express";
import { z } from "zod";
import { demoActions, demoEventDefinitions } from "../domain/demoSave.js";
import { performDemoAction, resetDemoSave, getDemoSave } from "../services/demoSaveService.js";

export const demoRouter = Router();

const battleResultSchema = z.object({
  stageId: z.string().min(1).max(80),
  victory: z.boolean(),
  kills: z.number().int().min(0).max(999),
  seconds: z.number().int().min(0).max(999),
  hpPercent: z.number().int().min(0).max(100),
  spiritStones: z.number().int().min(0).max(300),
  damageTaken: z.number().int().min(0).max(9999),
  bossDefeated: z.boolean(),
});

const actionSchema = z.object({
  action: z.enum(demoActions),
  battleResult: battleResultSchema.optional(),
});

function sendRouteError(res: import("express").Response, error: unknown) {
  const message = error instanceof Error ? error.message : "Unknown demo API error";
  const status = message.includes("does not exist") ? 503 : 500;
  res.status(status).json({
    ok: false,
    message,
    migration: status === 503 ? "supabase/migrations/202606300001_create_demo_saves.sql" : undefined,
  });
}

demoRouter.get("/save", async (_req, res) => {
  try {
    const save = await getDemoSave();
    res.json({
      ok: true,
      save,
    });
  } catch (error) {
    sendRouteError(res, error);
  }
});

demoRouter.get("/events", (_req, res) => {
  res.json({
    ok: true,
    events: demoEventDefinitions,
  });
});

demoRouter.post("/reset", async (_req, res) => {
  try {
    const save = await resetDemoSave();
    res.json({
      ok: true,
      save,
    });
  } catch (error) {
    sendRouteError(res, error);
  }
});

demoRouter.post("/action", async (req, res) => {
  const result = actionSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({
      ok: false,
      message: result.error.issues.map((issue) => issue.message).join("; "),
    });
    return;
  }

  try {
    const save = await performDemoAction(result.data.action, {
      battleResult: result.data.battleResult,
    });
    res.json({
      ok: true,
      save,
    });
  } catch (error) {
    sendRouteError(res, error);
  }
});
