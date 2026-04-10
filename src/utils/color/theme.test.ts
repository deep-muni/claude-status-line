import { describe, expect, it } from "vitest";
import { colorForSeverity, PALETTE, SEVERITY_COLORS, SEVERITY_THRESHOLDS } from "./theme";

const HEX_PATTERN = /^#[0-9A-Fa-f]{6}$/;

describe("PALETTE", () => {
  it("contains only valid hex colors", () => {
    for (const [key, value] of Object.entries(PALETTE)) {
      expect(value, `PALETTE.${key}`).toMatch(HEX_PATTERN);
    }
  });

  it("has all distinct colors", () => {
    const values = Object.values(PALETTE);
    expect(new Set(values).size).toBe(values.length);
  });
});

describe("SEVERITY_COLORS", () => {
  it("contains only valid hex colors", () => {
    for (const [key, value] of Object.entries(SEVERITY_COLORS)) {
      expect(value, `SEVERITY_COLORS.${key}`).toMatch(HEX_PATTERN);
    }
  });
});

describe("colorForSeverity", () => {
  it("returns healthy below warning threshold", () => {
    expect(colorForSeverity(30)).toBe(SEVERITY_COLORS.healthy);
  });

  it("returns warning at warning threshold", () => {
    expect(colorForSeverity(SEVERITY_THRESHOLDS.warning)).toBe(SEVERITY_COLORS.warning);
  });

  it("returns critical at critical threshold", () => {
    expect(colorForSeverity(SEVERITY_THRESHOLDS.critical)).toBe(SEVERITY_COLORS.critical);
  });
});
