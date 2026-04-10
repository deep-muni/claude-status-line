import { formatDuration } from "@utils/format/format";
import type { Payload } from "@utils/types";

export interface CostData {
  readonly costLabel: string;
  readonly totalDuration: string;
  readonly apiDuration: string;
}

function hasValidCost(cost: number | string | undefined): boolean {
  if (cost === undefined || cost === null) return false;
  const numeric = Number(cost);
  return Number.isFinite(numeric) && numeric > 0;
}

function formatCost(cost: number | string): string {
  const numeric = Number(cost);
  return Number.isFinite(numeric) ? `$${numeric.toFixed(2)}` : `${cost}`;
}

export function processCost(payload: Payload): CostData | null {
  const cost = payload?.cost;
  if (!hasValidCost(cost?.total_cost_usd)) return null;

  return {
    costLabel: formatCost(cost?.total_cost_usd ?? 0),
    totalDuration: formatDuration(Number(cost?.total_duration_ms || 0)),
    apiDuration: formatDuration(Number(cost?.total_api_duration_ms || 0)),
  };
}
