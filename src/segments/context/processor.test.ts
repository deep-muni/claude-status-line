import { describe, expect, it } from "vitest";
import { processContext } from "./processor";

describe("processContext", () => {
  it("extracts rounded percentage", () => {
    const data = processContext({ context_window: { used_percentage: 42.7 } }, false);
    expect(data).not.toBeNull();
    expect(data?.percentage).toBe(43);
  });

  it("includes progress bar in wide mode", () => {
    const data = processContext({ context_window: { used_percentage: 50 } }, false);
    expect(data?.progressBar).toContain("█");
  });

  it("omits progress bar in compact mode", () => {
    const data = processContext({ context_window: { used_percentage: 50 } }, true);
    expect(data?.progressBar).toBe("");
  });

  it("returns null when no percentage", () => {
    expect(processContext({}, false)).toBeNull();
  });
});
