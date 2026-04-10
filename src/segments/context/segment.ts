import type { Payload, Segment } from "@utils/types";
import { processContext } from "./processor";
import { renderContext } from "./renderer";

export function contextSegment(payload: Payload, isCompact: boolean): Segment | null {
  const data = processContext(payload, isCompact);
  return data ? renderContext(data) : null;
}
