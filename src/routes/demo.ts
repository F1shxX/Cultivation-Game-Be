import { Router } from "express";
import { z } from "zod";
import { performDemoAction, resetDemoSave, getDemoSave } from "../services/demoSaveService.js";

export const demoRouter = Router();

const actionSchema = z.object({
  action: z.enum(["cultivate", "alchemy", "plant", "forge", "start_mouse_cave", "battle_victory"]),
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
    const save = await performDemoAction(result.data.action);
    res.json({
      ok: true,
      save,
    });
  } catch (error) {
    sendRouteError(res, error);
  }
});
