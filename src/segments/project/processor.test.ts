import { describe, expect, it } from "vitest";
import { processProject } from "./processor";

describe("processProject", () => {
  it("extracts directory name from current_dir", () => {
    const data = processProject({ workspace: { current_dir: "/home/user/my-app" } });
    expect(data.projectName).toBe("my-app");
  });

  it("falls back to cwd field", () => {
    const data = processProject({ workspace: { cwd: "/tmp/demo" } });
    expect(data.projectName).toBe("demo");
  });

  it("falls back to current working directory for empty payload", () => {
    const data = processProject({});
    expect(data.projectName.length).toBeGreaterThan(0);
  });
});
