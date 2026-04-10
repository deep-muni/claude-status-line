import { PALETTE } from "@utils/color/theme";
import { describe, expect, it } from "vitest";
import { renderProject } from "./renderer";

describe("renderProject", () => {
  it("renders project name with bold and project color", () => {
    const segment = renderProject({ projectName: "my-app" });
    expect(segment.text).toBe("my-app");
    expect(segment.bold).toBe(true);
    expect(segment.bg).toBe(PALETTE.project);
    expect(segment.fg).toBe(PALETTE.white);
  });
});
