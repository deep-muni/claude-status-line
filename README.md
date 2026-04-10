# claude-status-line

A colorful, powerline-style status line for [Claude Code](https://claude.ai/code).

```
 project  🌿 main +2 ~3  Sonnet 4.5 200K  ctx:42% ███░░░░░  ⚡ 5h:12% 7d:33%  💰 $0.02 ⏱ 2m 8s  🪙 ↑12K ↓8K 
```

Seven segments, each with its own color, connected by powerline arrows:

- **Project** — current directory
- **Git** — branch, staged and modified counts
- **Model** — model name and context window size
- **Context** — usage percentage with a progress bar (turns gold at 50%, red at 80%)
- **Rate** — 5-hour and 7-day rate limit usage
- **Cost** — session cost and duration
- **Tokens** — input/output token counts

## Requirements

- Node.js >= 22
- A [Nerd Font](https://www.nerdfonts.com/) for the powerline arrows

## Setup

```bash
git clone https://github.com/deepmuni/claude-status-line.git
cd claude-status-line
pnpm install
pnpm build
```

Add to `~/.claude/settings.json`:

```json
{
  "statusLine": {
    "type": "command",
    "command": "node /path/to/claude-status-line/dist/index.mjs"
  }
}
```

Replace `/path/to/claude-status-line` with wherever you cloned the repo.

## Preview

Run with sample data to see what it looks like in your terminal:

```bash
pnpm dev
```

## Contributing

```bash
pnpm test       # run tests
pnpm lint       # check lint
pnpm lint:fix   # auto-fix lint
pnpm check      # typecheck + lint + tests
pnpm build      # bundle to dist/
```

## License

MIT
