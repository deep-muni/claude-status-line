import { contextSegment } from "@segments/context/segment";
import { costSegment } from "@segments/cost/segment";
import { gitSegment } from "@segments/git/segment";
import { modelSegment } from "@segments/model/segment";
import { projectSegment } from "@segments/project/segment";
import { rateSegment } from "@segments/rate/segment";
import { tokensSegment } from "@segments/tokens/segment";
import { renderPowerline } from "@utils/color/powerline";
import type { Payload, Segment } from "@utils/types";

const COMPACT_WIDTH_THRESHOLD = 100;

export async function buildStatus(payload: Payload): Promise<string> {
  const terminalWidth = process.stdout.columns || 120;
  const isCompact = terminalWidth < COMPACT_WIDTH_THRESHOLD;

  const segments: (Segment | null)[] = [
    projectSegment(payload),
    await gitSegment(payload),
    modelSegment(payload),
    contextSegment(payload, isCompact),
    rateSegment(payload, isCompact),
    costSegment(payload, isCompact),
    tokensSegment(payload),
  ];

  return renderPowerline(segments.filter((segment): segment is Segment => segment !== null));
}
