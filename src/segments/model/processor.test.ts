import { describe, expect, it } from "vitest";
import { processModel } from "./processor";

describe("processModel", () => {
  it("strips claude prefix and parenthesized suffix", () => {
    const data = processModel({
      model: { display_name: "Claude Sonnet 4.5 (200K)" },
      context_window: { context_window_size: 200000 },
    });
    expect(data).not.toBeNull();
    expect(data?.label).toBe("Sonnet 4.5 200K");
  });

  it("uses model id as fallback", () => {
    const data = processModel({ model: { id: "claude-opus-4" } });
    expect(data).not.toBeNull();
    expect(data?.label).toContain("opus-4");
  });

  it("returns null when no model", () => {
    expect(processModel({})).toBeNull();
  });

  it("shows 1M for large context windows", () => {
    const data = processModel({
      model: { display_name: "Claude Opus 4" },
      context_window: { context_window_size: 1000000 },
    });
    expect(data?.label).toContain("1M");
  });
});
