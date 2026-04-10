import { describe, expect, it } from "vitest";
import { processRate } from "./processor";

describe("processRate", () => {
  it("returns labels for both rate limits", () => {
    const data = processRate(
      { rate_limits: { five_hour: { used_percentage: 30 }, seven_day: { used_percentage: 50 } } },
      false,
    );
    expect(data).not.toBeNull();
    expect(data?.labels).toEqual(["5h:30%", "7d:50%"]);
  });

  it("returns null when below wide threshold", () => {
    expect(
      processRate(
        { rate_limits: { five_hour: { used_percentage: 5 }, seven_day: { used_percentage: 10 } } },
        false,
      ),
    ).toBeNull();
  });

  it("returns null when below compact threshold", () => {
    expect(
      processRate(
        { rate_limits: { five_hour: { used_percentage: 30 }, seven_day: { used_percentage: 40 } } },
        true,
      ),
    ).toBeNull();
  });

  it("returns labels when above compact threshold", () => {
    const data = processRate({ rate_limits: { five_hour: { used_percentage: 60 } } }, true);
    expect(data).not.toBeNull();
    expect(data?.labels).toEqual(["5h:60%"]);
  });

  it("returns null when no rate data", () => {
    expect(processRate({}, false)).toBeNull();
  });
});
