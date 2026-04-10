import { PALETTE } from "@utils/color/theme";
import type { Segment } from "@utils/types";
import type { CostData } from "./processor";

export function renderCost(data: CostData, isCompact: boolean): Segment {
  const apiSuffix = isCompact ? "" : ` ⏳ ${data.apiDuration}`;

  return {
    text: `💰 ${data.costLabel} ⏱ ${data.totalDuration}${apiSuffix}`,
    fg: PALETTE.white,
    bg: PALETTE.cost,
  };
}
