import { PALETTE } from "@utils/color/theme";
import type { Segment } from "@utils/types";
import type { GitData } from "./processor";

export function renderGit(data: GitData): Segment {
  let label = `🌿 ${data.branch}`;
  if (data.stagedCount > 0) label += ` +${data.stagedCount}`;
  if (data.modifiedCount > 0) label += ` ~${data.modifiedCount}`;

  return { text: label, fg: PALETTE.white, bg: PALETTE.git };
}
