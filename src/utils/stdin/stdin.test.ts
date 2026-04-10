import { describe, expect, it } from "vitest";
import { parsePayload } from "./stdin";

describe("parsePayload", () => {
  it("parses valid JSON into a Payload", () => {
    const payload = parsePayload('{"model":{"display_name":"Claude"}}');
    expect(payload.model?.display_name).toBe("Claude");
  });

  it("returns empty object for empty string", () => {
    expect(parsePayload("")).toEqual({});
  });

  it("returns empty object for whitespace-only string", () => {
    expect(parsePayload("   \n  ")).toEqual({});
  });

  it("returns empty object for invalid JSON", () => {
    expect(parsePayload("{broken")).toEqual({});
  });

  it("handles JSON with all fields", () => {
    const raw = JSON.stringify({
      workspace: { current_dir: "/tmp" },
      model: { display_name: "Sonnet" },
      context_window: { used_percentage: 50 },
      cost: { total_cost_usd: 0.01 },
      rate_limits: { five_hour: { used_percentage: 10 } },
    });
    const payload = parsePayload(raw);
    expect(payload.workspace?.current_dir).toBe("/tmp");
    expect(payload.cost?.total_cost_usd).toBe(0.01);
  });
});
