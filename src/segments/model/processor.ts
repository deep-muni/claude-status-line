import type { Payload } from "@utils/types";

export interface ModelData {
  readonly label: string;
}

function abbreviateModelName(displayName: string): string {
  if (!displayName) return "";
  return displayName
    .replace(/^claude\s+/i, "")
    .replace(/\s*\([^)]*\)\s*$/, "")
    .trim();
}

function formatContextWindowSize(tokenCount: number): string {
  if (!Number.isFinite(tokenCount) || tokenCount <= 0) return "";
  const thousands = Math.round(tokenCount / 1000);
  if (thousands >= 1000) return ` ${Math.round(thousands / 1000)}M`;
  return ` ${thousands}K`;
}

export function processModel(payload: Payload): ModelData | null {
  const displayName = payload?.model?.display_name || payload?.model?.id || "";
  if (!displayName) return null;

  const shortName = abbreviateModelName(displayName);
  const windowSize = Number(payload?.context_window?.context_window_size || 0);
  const label = `${shortName}${formatContextWindowSize(windowSize)}`.trim();
  if (!label) return null;

  return { label };
}
