import { PALETTE } from "@utils/color/theme";
import { describe, expect, it } from "vitest";
import { renderGit } from "./renderer";

describe("renderGit", () => {
  it("renders branch name with emoji", () => {
    const segment = renderGit({ branch: "main", stagedCount: 0, modifiedCount: 0 });
    expect(segment.text).toBe("🌿 main");
    expect(segment.bg).toBe(PALETTE.git);
  });

  it("appends staged count", () => {
    const segment = renderGit({ branch: "main", stagedCount: 3, modifiedCount: 0 });
    expect(segment.text).toBe("🌿 main +3");
  });

  it("appends modified count", () => {
    const segment = renderGit({ branch: "main", stagedCount: 0, modifiedCount: 5 });
    expect(segment.text).toBe("🌿 main ~5");
  });

  it("appends both counts", () => {
    const segment = renderGit({ branch: "feat/x", stagedCount: 2, modifiedCount: 4 });
    expect(segment.text).toBe("🌿 feat/x +2 ~4");
  });
});
