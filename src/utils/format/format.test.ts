import { describe, expect, it } from "vitest";
import { extractDirectoryName, formatDuration, formatPercent, formatTokenCount } from "./format";

describe("formatTokenCount", () => {
  it("formats millions", () => expect(formatTokenCount(1_500_000)).toBe("1.5M"));
  it("formats thousands", () => expect(formatTokenCount(12_000)).toBe("12.0K"));
  it("formats small numbers as integers", () => expect(formatTokenCount(500)).toBe("500"));
  it("returns 0 for NaN", () => expect(formatTokenCount(NaN)).toBe("0"));
  it("returns 0 for Infinity", () => expect(formatTokenCount(Infinity)).toBe("0"));
});

describe("formatPercent", () => {
  it("rounds to integer", () => expect(formatPercent(42.7)).toBe("43"));
  it("returns empty for NaN", () => expect(formatPercent(NaN)).toBe(""));
  it("handles zero", () => expect(formatPercent(0)).toBe("0"));
});

describe("formatDuration", () => {
  it("formats minutes and seconds", () => expect(formatDuration(125_000)).toBe("2m 5s"));
  it("handles zero", () => expect(formatDuration(0)).toBe("0m 0s"));
  it("handles NaN", () => expect(formatDuration(NaN)).toBe("0m 0s"));
  it("handles sub-minute", () => expect(formatDuration(45_000)).toBe("0m 45s"));
});

describe("extractDirectoryName", () => {
  it("extracts last path segment", () =>
    expect(extractDirectoryName("/home/user/project")).toBe("project"));
  it("returns empty for empty string", () => expect(extractDirectoryName("")).toBe(""));
  it("handles root path", () => expect(extractDirectoryName("/")).toBe(""));
  it("handles trailing slash", () =>
    expect(extractDirectoryName("/home/user/project/")).toBe("project"));
});
