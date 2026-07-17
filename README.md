# roadmap-dev

Next.js app for a software engineering roadmap.

The roadmap content is bundled as static JSON in `data/roadmap.json`. Topic completion progress is stored in `data/progress.json`, which is tracked in git — commit and push it after marking topics complete, and `git pull` on any other computer to pick up the same progress there. There's no login — it's meant for single-user use.

## Requirements

- Node.js 20 or newer
- Bun 1.3.1 or newer

## Syncing progress across computers

`data/progress.json` is committed to the repo, so it travels with the rest of your git history.

```bash
git add data/progress.json
git commit -m "update roadmap progress"
git push
```

On another computer, `git pull` before running `bun run dev` to see the latest progress.

## Install dependencies

```bash
bun install
```

## Run the app

```bash
bun run dev
```

Open http://localhost:3000.

## Useful commands

```bash
bun run build
bun run start
bun run lint
```
