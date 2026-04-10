import { PALETTE } from "@utils/color/theme";
import { describe, expect, it } from "vitest";
import { renderModel } from "./renderer";

describe("renderModel", () => {
  it("renders label with model color", () => {
    const segment = renderModel({ label: "Sonnet 4.5 200K" });
    expect(segment.text).toBe("Sonnet 4.5 200K");
    expect(segment.bg).toBe(PALETTE.model);
  });
});
