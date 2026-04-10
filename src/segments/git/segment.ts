import type { Payload, Segment } from "@utils/types";
import { processGit } from "./processor";
import { renderGit } from "./renderer";

export async function gitSegment(payload: Payload): Promise<Segment | null> {
  const data = await processGit(payload);
  return data ? renderGit(data) : null;
}
