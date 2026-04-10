import type { Payload, Segment } from "@utils/types";
import { processProject } from "./processor";
import { renderProject } from "./renderer";

export function projectSegment(payload: Payload): Segment {
  return renderProject(processProject(payload));
}
