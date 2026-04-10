import { PALETTE } from "@utils/color/theme";
import type { Segment } from "@utils/types";
import type { RateData } from "./processor";

export function renderRate(data: RateData): Segment {
  return {
    text: `⚡ ${data.labels.join(" ")}`,
    fg: PALETTE.white,
    bg: PALETTE.rate,
  };
}
