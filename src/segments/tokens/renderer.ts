import { PALETTE } from "@utils/color/theme";
import type { Segment } from "@utils/types";
import type { TokensData } from "./processor";

export function renderTokens(data: TokensData): Segment {
  return {
    text: `🪙 ↑${data.inputFormatted} ↓${data.outputFormatted}`,
    fg: PALETTE.white,
    bg: PALETTE.tokens,
  };
}
