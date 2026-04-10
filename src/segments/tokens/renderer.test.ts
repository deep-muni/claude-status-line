import { PALETTE } from "@utils/color/theme";
import { describe, expect, it } from "vitest";
import { renderTokens } from "./renderer";

describe("renderTokens", () => {
  it("renders formatted tokens with arrows", () => {
    const segment = renderTokens({ inputFormatted: "12.0K", outputFormatted: "8.0K" });
    expect(segment.text).toBe("🪙 ↑12.0K ↓8.0K");
    expect(segment.bg).toBe(PALETTE.tokens);
  });
});
