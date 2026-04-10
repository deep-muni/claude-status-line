import { afterEach, describe, expect, it } from "vitest";
import { renderPowerline } from "./powerline";

describe("renderPowerline", () => {
  afterEach(() => {
    delete process.env.NO_COLOR;
  });

  it("returns empty string for no segments", () => {
    expect(renderPowerline([])).toBe("");
  });

  it("joins with fallback separator when NO_COLOR is set", () => {
    process.env.NO_COLOR = "1";
    const result = renderPowerline([
      { text: "hello", fg: "#FFFFFF", bg: "#000000" },
      { text: "world", fg: "#FFFFFF", bg: "#111111" },
    ]);
    expect(result).toBe("hello · world");
  });

  it("includes ANSI escape codes when color is enabled", () => {
    const result = renderPowerline([{ text: "segment", fg: "#FFFFFF", bg: "#FF0000" }]);
    expect(result).toContain("\x1b[");
    expect(result).toContain("segment");
  });

  it("renders powerline arrow between segments", () => {
    const result = renderPowerline([
      { text: "first", fg: "#FFFFFF", bg: "#FF0000" },
      { text: "second", fg: "#FFFFFF", bg: "#00FF00" },
    ]);
    expect(result).toContain("\uE0B0");
  });

  it("applies bold when segment.bold is true", () => {
    const result = renderPowerline([
      { text: "bold-text", fg: "#FFFFFF", bg: "#FF0000", bold: true },
    ]);
    expect(result).toContain("\x1b[1m");
  });
});
