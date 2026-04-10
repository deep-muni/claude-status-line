import { SEVERITY_COLORS } from "@utils/color/theme";
import { describe, expect, it } from "vitest";
import { renderContext } from "./renderer";

describe("renderContext", () => {
  it("renders percentage in text", () => {
    const segment = renderContext({ percentage: 42, progressBar: "" });
    expect(segment.text).toBe("ctx:42%");
  });

  it("appends progress bar when present", () => {
    const segment = renderContext({ percentage: 42, progressBar: " ███░░░░░" });
    expect(segment.text).toBe("ctx:42% ███░░░░░");
  });

  it("uses healthy color for low percentage", () => {
    const segment = renderContext({ percentage: 30, progressBar: "" });
    expect(segment.bg).toBe(SEVERITY_COLORS.healthy);
  });

  it("uses warning color for mid percentage", () => {
    const segment = renderContext({ percentage: 60, progressBar: "" });
    expect(segment.bg).toBe(SEVERITY_COLORS.warning);
  });

  it("uses critical color for high percentage", () => {
    const segment = renderContext({ percentage: 85, progressBar: "" });
    expect(segment.bg).toBe(SEVERITY_COLORS.critical);
  });
});
