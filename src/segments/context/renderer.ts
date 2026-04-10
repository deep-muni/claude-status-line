import { colorForSeverity, PALETTE } from "@utils/color/theme";
import type { Segment } from "@utils/types";
import type { ContextData } from "./processor";

export function renderContext(data: ContextData): Segment {
  return {
    text: `ctx:${data.percentage}%${data.progressBar}`,
    fg: PALETTE.white,
    bg: colorForSeverity(data.percentage),
  };
}
