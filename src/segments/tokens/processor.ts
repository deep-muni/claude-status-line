import { formatTokenCount } from "@utils/format/format";
import type { Payload } from "@utils/types";

export interface TokensData {
  readonly inputFormatted: string;
  readonly outputFormatted: string;
}

export function processTokens(payload: Payload): TokensData | null {
  const inputTokens = Number(payload?.context_window?.total_input_tokens || 0);
  const outputTokens = Number(payload?.context_window?.total_output_tokens || 0);

  if (inputTokens <= 0 && outputTokens <= 0) return null;

  return {
    inputFormatted: formatTokenCount(inputTokens),
    outputFormatted: formatTokenCount(outputTokens),
  };
}
