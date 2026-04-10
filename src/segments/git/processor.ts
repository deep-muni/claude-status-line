import { execFile } from "node:child_process";
import { promisify } from "node:util";
import type { Payload } from "@utils/types";

const execFileAsync = promisify(execFile);
const GIT_MAX_BUFFER = 1024 * 1024;

export interface GitData {
  readonly branch: string;
  readonly stagedCount: number;
  readonly modifiedCount: number;
}

async function executeGitCommand(
  args: readonly string[],
  workingDirectory: string,
): Promise<string> {
  try {
    const { stdout } = await execFileAsync("git", [...args], {
      cwd: workingDirectory,
      encoding: "utf8",
      maxBuffer: GIT_MAX_BUFFER,
    });
    return stdout;
  } catch {
    return "";
  }
}

function countNonEmptyLines(text: string): number {
  if (!text) return 0;
  return text.trim().split("\n").filter(Boolean).length;
}

export async function processGit(payload: Payload): Promise<GitData | null> {
  const workingDirectory =
    payload?.workspace?.current_dir || payload?.workspace?.cwd || process.cwd();

  const gitDirectory = await executeGitCommand(
    ["-C", workingDirectory, "rev-parse", "--git-dir"],
    workingDirectory,
  );
  if (!gitDirectory.trim()) return null;

  const branch = (
    await executeGitCommand(
      ["-C", workingDirectory, "--no-optional-locks", "branch", "--show-current"],
      workingDirectory,
    )
  ).trim();

  if (!branch) return null;

  const stagedOutput = await executeGitCommand(
    ["-C", workingDirectory, "--no-optional-locks", "diff", "--cached", "--numstat"],
    workingDirectory,
  );
  const modifiedOutput = await executeGitCommand(
    ["-C", workingDirectory, "--no-optional-locks", "diff", "--numstat"],
    workingDirectory,
  );

  return {
    branch,
    stagedCount: countNonEmptyLines(stagedOutput),
    modifiedCount: countNonEmptyLines(modifiedOutput),
  };
}
