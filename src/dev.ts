import { buildStatus } from "@segments/builder/builder";
import type { Payload } from "@utils/types";

const SAMPLE_PAYLOAD: Payload = {
  workspace: { current_dir: process.cwd() },
  model: { display_name: "Claude Sonnet 4.5" },
  context_window: {
    context_window_size: 200000,
    used_percentage: 42,
    total_input_tokens: 12000,
    total_output_tokens: 8000,
  },
  cost: {
    total_cost_usd: 0.02,
    total_duration_ms: 128000,
    total_api_duration_ms: 52000,
  },
  rate_limits: {
    five_hour: { used_percentage: 12 },
    seven_day: { used_percentage: 33 },
  },
};

async function main(): Promise<void> {
  const statusLine = await buildStatus(SAMPLE_PAYLOAD);
  process.stdout.write(`${statusLine}\n`);
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`dev error: ${message}\n`);
  process.exit(1);
});
