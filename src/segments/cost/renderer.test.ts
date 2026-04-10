import { PALETTE } from "@utils/color/theme";
import { describe, expect, it } from "vitest";
import { renderCost } from "./renderer";

describe("renderCost", () => {
  const sampleData = { costLabel: "$0.05", totalDuration: "2m 5s", apiDuration: "1m 2s" };

  it("renders cost with both durations in wide mode", () => {
    const segment = renderCost(sampleData, false);
    expect(segment.text).toBe("💰 $0.05 ⏱ 2m 5s ⏳ 1m 2s");
    expect(segment.bg).toBe(PALETTE.cost);
  });

  it("hides api duration in compact mode", () => {
    const segment = renderCost(sampleData, true);
    expect(segment.text).toBe("💰 $0.05 ⏱ 2m 5s");
    expect(segment.text).not.toContain("⏳");
  });
});
