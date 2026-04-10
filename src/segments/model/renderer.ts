import { PALETTE } from "@utils/color/theme";
import type { Segment } from "@utils/types";
import type { ModelData } from "./processor";

export function renderModel(data: ModelData): Segment {
  return { text: data.label, fg: PALETTE.white, bg: PALETTE.model };
}
