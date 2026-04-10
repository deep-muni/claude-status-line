export function formatTokenCount(count: number): string {
  if (!Number.isFinite(count)) return "0";
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
  return `${Math.trunc(count)}`;
}

export function formatPercent(value: number): string {
  if (!Number.isFinite(value)) return "";
  return `${Math.round(value)}`;
}

export function formatDuration(milliseconds: number): string {
  if (!Number.isFinite(milliseconds)) return "0m 0s";
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${seconds}s`;
}

export function extractDirectoryName(path: string): string {
  if (!path) return "";
  const segments = path.split("/").filter(Boolean);
  return segments[segments.length - 1] || "";
}
