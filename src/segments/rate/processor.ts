import { formatPercent } from "@utils/format/format";
import type { Payload } from "@utils/types";

const VISIBILITY_THRESHOLD_WIDE = 25;
const VISIBILITY_THRESHOLD_COMPACT = 50;

export interface RateData {
  readonly labels: string[];
}

export function processRate(payload: Payload, isCompact: boolean): RateData | null {
  const fiveHourUsage = Number(payload?.rate_limits?.five_hour?.used_percentage);
  const sevenDayUsage = Number(payload?.rate_limits?.seven_day?.used_percentage);

  const labels: string[] = [];
  if (Number.isFinite(fiveHourUsage)) labels.push(`5h:${formatPercent(fiveHourUsage)}%`);
  if (Number.isFinite(sevenDayUsage)) labels.push(`7d:${formatPercent(sevenDayUsage)}%`);
  if (labels.length === 0) return null;

  const peakUsage = Math.max(
    Number.isFinite(fiveHourUsage) ? Math.round(fiveHourUsage) : 0,
    Number.isFinite(sevenDayUsage) ? Math.round(sevenDayUsage) : 0,
  );

  const threshold = isCompact ? VISIBILITY_THRESHOLD_COMPACT : VISIBILITY_THRESHOLD_WIDE;
  if (peakUsage < threshold) return null;

  return { labels };
}
