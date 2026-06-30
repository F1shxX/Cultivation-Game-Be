import cors from "cors";
import express from "express";
import morgan from "morgan";
import { config } from "./config/env.js";
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

app.listen(config.port, () => {
  console.log(`Cultivation Game API listening on http://localhost:${config.port}`);
});
