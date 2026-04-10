import type { Payload, Segment } from "@utils/types";
import { processModel } from "./processor";
import { renderModel } from "./renderer";

export function modelSegment(payload: Payload): Segment | null {
  const data = processModel(payload);
  return data ? renderModel(data) : null;
}
