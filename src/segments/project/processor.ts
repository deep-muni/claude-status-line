import { extractDirectoryName } from "@utils/format/format";
import type { Payload } from "@utils/types";

export interface ProjectData {
  readonly projectName: string;
}

export function processProject(payload: Payload): ProjectData {
  const workingDirectory =
    payload?.workspace?.current_dir || payload?.workspace?.cwd || process.cwd();

  return {
    projectName: extractDirectoryName(workingDirectory) || "unknown",
  };
}
