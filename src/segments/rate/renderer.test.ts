import { PALETTE } from "@utils/color/theme";
import { describe, expect, it } from "vitest";
import { renderRate } from "./renderer";

describe("renderRate", () => {
  it("renders labels joined with space", () => {
    const segment = renderRate({ labels: ["5h:30%", "7d:50%"] });
    expect(segment.text).toBe("⚡ 5h:30% 7d:50%");
    expect(segment.bg).toBe(PALETTE.rate);
  });

  it("renders single label", () => {
    const segment = renderRate({ labels: ["5h:60%"] });
    expect(segment.text).toBe("⚡ 5h:60%");
  });
});
