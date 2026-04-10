import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { buildStatus } from "./builder";

describe("buildStatus", () => {
  beforeEach(() => {
    process.env.NO_COLOR = "1";
  });

  afterEach(() => {
    delete process.env.NO_COLOR;
  });

  it("renders all segments in plain text mode", async () => {
    const line = await buildStatus({
      workspace: { current_dir: "/home/user/project" },
      model: { display_name: "Claude Sonnet 4.5" },
      context_window: {
        context_window_size: 200000,
        used_percentage: 55,
        total_input_tokens: 12000,
        total_output_tokens: 8000,
      },
      cost: {
        total_cost_usd: 0.02,
        total_duration_ms: 125000,
        total_api_duration_ms: 62000,
      },
      rate_limits: {
        five_hour: { used_percentage: 12 },
        seven_day: { used_percentage: 33 },
      },
    });

    expect(line).toContain("project");
    expect(line).toContain("Sonnet 4.5");
    expect(line).toContain("ctx:55%");
    expect(line).toContain("⚡ 5h:12% 7d:33%");
    expect(line).toContain("💰 $0.02");
    expect(line).toContain("⏱ 2m 5s");
    expect(line).toContain("⏳ 1m 2s");
    expect(line).toContain("🪙 ↑12.0K ↓8.0K");
  });

  it("handles empty payload gracefully", async () => {
    const line = await buildStatus({});
    expect(line.length).toBeGreaterThan(0);
  });

  it("skips segments with missing data", async () => {
    const line = await buildStatus({
      workspace: { current_dir: "/tmp/demo" },
    });
    expect(line).toContain("demo");
    expect(line).not.toContain("ctx:");
    expect(line).not.toContain("💰");
    expect(line).not.toContain("🪙");
  });
});
