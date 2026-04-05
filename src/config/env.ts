import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PRIVATE_KEY: z.string().min(1, "PRIVATE_KEY is required"),
  DRY_RUN: z.enum(["true", "false"]).default("true"),
  LOG_LEVEL: z.string().default("info"),
  MAX_POSITION_USD: z.string().default("50"),
  MAX_DAILY_LOSS_USD: z.string().default("25"),
  TAKE_PROFIT_PCT: z.string().default("12"),
  STOP_LOSS_PCT: z.string().default("6"),
  PRIVATE_KEY: z.string().default("0xYOUR_PRIVATE_KEY_HERE"),
  DRY_RUN: z.string().default("true"),
  EDGE_THRESHOLD_BPS: z.string().default("80"),
  ORDER_SIZE_USD: z.string().default("30"),
  MAX_OPEN_POSITIONS: z.string().default("4"),
});

export const env = envSchema.parse(process.env);

export function buildRuntimeContext() {
  const privateKeyPreview =
    env.PRIVATE_KEY.length <= 10
      ? env.PRIVATE_KEY
      : `${env.PRIVATE_KEY.slice(0, 6)}...${env.PRIVATE_KEY.slice(-4)}`;

  return {
    repo: "polymarket-arbitrage-bot",
    family: "polymarket",
    market: "paired YES/NO Polymarket contracts",
    signal: "pricing sums and implied payout mismatch",
    dryRun: env.DRY_RUN === "true",
    orderSize: env.ORDER_SIZE_USD,
    privateKeyPreview,
  } as const;
}
