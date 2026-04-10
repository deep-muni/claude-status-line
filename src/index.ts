import { buildStatus } from "@segments/builder/builder";
import { parsePayload, readStdin } from "@utils/stdin/stdin";

async function main(): Promise<void> {
  const payload = parsePayload(await readStdin());
  const statusLine = await buildStatus(payload);
  process.stdout.write(`${statusLine}\n`);
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`claude-status error: ${message}\n`);
  process.exit(1);
});
