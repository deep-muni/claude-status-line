import type { Payload, Segment } from "@utils/types";
import { processRate } from "./processor";
import { renderRate } from "./renderer";

export function rateSegment(payload: Payload, isCompact: boolean): Segment | null {
  const data = processRate(payload, isCompact);
  return data ? renderRate(data) : null;
}
