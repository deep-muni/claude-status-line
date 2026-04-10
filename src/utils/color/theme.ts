export const PALETTE = {
  project: "#6D28D9",
  git: "#059669",
  model: "#4338CA",
  rate: "#7C3AED",
  cost: "#BE185D",
  tokens: "#0E7490",
  white: "#FFFFFF",
} as const;

export const SEVERITY_COLORS = {
  healthy: "#16A34A",
  warning: "#CA8A04",
  critical: "#DC2626",
} as const;

export const SEVERITY_THRESHOLDS = {
  warning: 50,
  critical: 80,
} as const;

export function colorForSeverity(percentage: number): string {
  if (percentage >= SEVERITY_THRESHOLDS.critical) return SEVERITY_COLORS.critical;
  if (percentage >= SEVERITY_THRESHOLDS.warning) return SEVERITY_COLORS.warning;
  return SEVERITY_COLORS.healthy;
}
