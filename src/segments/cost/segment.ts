import type { Payload, Segment } from "@utils/types";
import { processCost } from "./processor";
import { renderCost } from "./renderer";

export function costSegment(payload: Payload, isCompact: boolean): Segment | null {
  const data = processCost(payload);
  return data ? renderCost(data, isCompact) : null;
}
