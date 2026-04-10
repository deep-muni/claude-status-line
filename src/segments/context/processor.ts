import type { Payload } from "@utils/types";

const PROGRESS_BAR_WIDTH = 8;

export interface ContextData {
  readonly percentage: number;
  readonly progressBar: string;
}

function renderProgressBar(percentage: number): string {
  const clamped = Math.max(0, Math.min(100, percentage));
  const filledBlocks = Math.round((clamped / 100) * PROGRESS_BAR_WIDTH);
  const emptyBlocks = PROGRESS_BAR_WIDTH - filledBlocks;
  return "\u2588".repeat(filledBlocks) + "\u2591".repeat(emptyBlocks);
}

export function processContext(payload: Payload, isCompact: boolean): ContextData | null {
  const usedPercentage = Number(payload?.context_window?.used_percentage);
  if (!Number.isFinite(usedPercentage)) return null;

  const percentage = Math.round(usedPercentage);
  const progressBar = isCompact ? "" : ` ${renderProgressBar(percentage)}`;

  return { percentage, progressBar };
}
