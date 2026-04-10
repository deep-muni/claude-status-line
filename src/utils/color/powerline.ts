import type { Segment } from "@utils/types";

const ANSI_RESET = "\x1b[0m";
const ANSI_BOLD = "\x1b[1m";
const POWERLINE_ARROW = "\uE0B0";
const FALLBACK_SEPARATOR = " · ";

function isColorEnabled(): boolean {
  if (process.env.NO_COLOR) return false;
  return true;
}

function parseHexColor(hex: string): [number, number, number] {
  const normalized = hex.replace("#", "");
  return [
    parseInt(normalized.substring(0, 2), 16),
    parseInt(normalized.substring(2, 4), 16),
    parseInt(normalized.substring(4, 6), 16),
  ];
}

function foregroundColor(hex: string): string {
  const [red, green, blue] = parseHexColor(hex);
  return `\x1b[38;2;${red};${green};${blue}m`;
}

function backgroundColor(hex: string): string {
  const [red, green, blue] = parseHexColor(hex);
  return `\x1b[48;2;${red};${green};${blue}m`;
}

export function renderPowerline(segments: readonly Segment[]): string {
  if (segments.length === 0) return "";
  if (!isColorEnabled()) return segments.map((s) => s.text).join(FALLBACK_SEPARATOR);

  let output = "";
  for (const [index, current] of segments.entries()) {
    const next = segments[index + 1];

    const bold = current.bold ? ANSI_BOLD : "";
    output += `${foregroundColor(current.fg)}${backgroundColor(current.bg)}${bold} ${current.text} ${ANSI_RESET}`;

    const arrowForeground = foregroundColor(current.bg);
    const arrowBackground = next ? backgroundColor(next.bg) : "";
    output += `${arrowForeground}${arrowBackground}${POWERLINE_ARROW}${ANSI_RESET}`;
  }

  return output;
}
