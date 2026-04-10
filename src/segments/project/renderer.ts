import { PALETTE } from "@utils/color/theme";
import type { Segment } from "@utils/types";
import type { ProjectData } from "./processor";

export function renderProject(data: ProjectData): Segment {
  return {
    text: data.projectName,
    fg: PALETTE.white,
    bg: PALETTE.project,
    bold: true,
  };
}
