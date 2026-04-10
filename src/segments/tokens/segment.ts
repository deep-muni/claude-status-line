import type { Payload, Segment } from "@utils/types";
import { processTokens } from "./processor";
import { renderTokens } from "./renderer";

export function tokensSegment(payload: Payload): Segment | null {
  const data = processTokens(payload);
  return data ? renderTokens(data) : null;
}
