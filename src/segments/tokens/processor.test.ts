import { describe, expect, it } from "vitest";
import { processTokens } from "./processor";

describe("processTokens", () => {
  it("formats thousands", () => {
    const data = processTokens({
      context_window: { total_input_tokens: 12000, total_output_tokens: 8000 },
    });
    expect(data).not.toBeNull();
    expect(data?.inputFormatted).toBe("12.0K");
    expect(data?.outputFormatted).toBe("8.0K");
  });

  it("formats millions", () => {
    const data = processTokens({
      context_window: { total_input_tokens: 1500000, total_output_tokens: 2000000 },
    });
    expect(data?.inputFormatted).toBe("1.5M");
    expect(data?.outputFormatted).toBe("2.0M");
  });

  it("returns null when both are zero", () => {
    expect(
      processTokens({ context_window: { total_input_tokens: 0, total_output_tokens: 0 } }),
    ).toBeNull();
  });

  it("returns null when no token data", () => {
    expect(processTokens({})).toBeNull();
  });
});
