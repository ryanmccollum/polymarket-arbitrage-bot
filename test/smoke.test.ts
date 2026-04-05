import { describe, expect, it } from "vitest";
import { buildStrategyDecision } from "../src/strategies/coreStrategy.js";

describe("polymarket-arbitrage-bot", () => {
  it("builds a trade-ready decision when the placeholder score is high", () => {
    const decision = buildStrategyDecision(
      {
        repo: "polymarket-arbitrage-bot",
        family: "polymarket",
        market: "paired YES/NO Polymarket contracts",
        signal: "pricing sums and implied payout mismatch",
        dryRun: true,
        orderSize: "25",
        privateKeyPreview: "test",
      },
      { score: 0.8 },
    );

    expect(decision.shouldTrade).toBe(true);
  });
});
