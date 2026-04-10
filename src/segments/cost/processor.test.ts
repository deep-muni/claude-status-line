import { describe, expect, it } from "vitest";
import { processCost } from "./processor";

describe("processCost", () => {
  it("extracts formatted cost and durations", () => {
    const data = processCost({
      cost: { total_cost_usd: 0.05, total_duration_ms: 125000, total_api_duration_ms: 62000 },
    });
    expect(data).not.toBeNull();
    expect(data?.costLabel).toBe("$0.05");
    expect(data?.totalDuration).toBe("2m 5s");
    expect(data?.apiDuration).toBe("1m 2s");
  });

  it("returns null when cost is zero", () => {
    expect(processCost({ cost: { total_cost_usd: 0 } })).toBeNull();
  });

  it("returns null when no cost data", () => {
    expect(processCost({})).toBeNull();
  });
});
