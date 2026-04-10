import { describe, expect, it } from "vitest";
import { processGit } from "./processor";

describe("processGit", () => {
  it("returns branch and counts for a real repo", async () => {
    const data = await processGit({ workspace: { current_dir: process.cwd() } });
    expect(data).not.toBeNull();
    expect(data?.branch.length).toBeGreaterThan(0);
    expect(typeof data?.stagedCount).toBe("number");
    expect(typeof data?.modifiedCount).toBe("number");
  });

  it("returns null for non-repo path", async () => {
    const data = await processGit({ workspace: { current_dir: "/tmp" } });
    expect(data).toBeNull();
  });
});
