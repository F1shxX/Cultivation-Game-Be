import cors from "cors";
import express from "express";
import morgan from "morgan";
import { config } from "./config/env.js";
import { demoRouter } from "./routes/demo.js";
import { healthRouter } from "./routes/health.js";

const app = express();

app.use(
  cors({
    origin: config.clientOrigin,
  }),
);
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_req, res) => {
  res.json({
    ok: true,
    service: "cultivation-game-be",
  });
});

app.use("/health", healthRouter);
app.use("/demo", demoRouter);

app.use(
  (
    error: unknown,
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    if (error instanceof SyntaxError && "body" in error) {
      res.status(400).json({
        ok: false,
        message: "Invalid JSON request body.",
      });
      return;
    }

    next(error);
  },
);

app.listen(config.port, () => {
  console.log(`Cultivation Game API listening on http://localhost:${config.port}`);
});
