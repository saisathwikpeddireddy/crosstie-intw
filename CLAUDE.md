# Crosstie interview prototyping repo

Live-interview sandbox: build small UI prototypes fast and host them on Vercel.

## Stack
Vite 6 + React 19 + TypeScript + Tailwind v4. Extras installed: `lucide-react` (icons), `recharts` (charts), `clsx`.

## Adding a prototype
- `npm run new <slug> "Title"` creates `src/prototypes/<slug>/index.tsx`.
- Each prototype exports `meta` and a default component; it is auto-registered on the home gallery and served at `/#/<slug>`.
- Folders starting with `_` (e.g. `_example`) only show in dev.
- Keep each prototype self-contained in its folder. Mock data inline; no backend.

## Checks
`npm run build` (typecheck + build) must pass before pushing.

## Deploying (Vercel)
- Vercel project: `crosstie-intw` in team `sai-sathwik-peddireddys-projects`.
- Deploy via Vercel MCP `create_deployment` with `gitSource` `{type: github, org: saisathwikpeddireddy, repo: crosstie-intw, ref: <branch>}` after pushing.
- Fallback (no git access): `npm run bundle`, then pass `.vercel-bundle.json` as `files` with `projectSettings.framework: null`.
