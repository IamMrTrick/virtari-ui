# Contributing to Virtari

Thanks for working on Virtari. This guide covers the day-to-day workflow, conventions, and release process.

## Prerequisites

- **Node** ≥ 22
- **pnpm** ≥ 10 (enable via `corepack enable`)
- A recent Chromium or Firefox for the docs playground

## Getting started

```bash
git clone https://github.com/IamMrTrick/virtari-design-system.git
cd virtari-design-system
pnpm install
pnpm run dev
```

`pnpm run dev` boots [`apps/docs`](./apps/docs) on http://localhost:5173. Every component has a page there — treat it as a live spec.

## Repository layout

- `packages/tokens/` — source-of-truth CSS custom properties.
- `packages/core/` — reset + global layer declarations.
- `packages/utilities/` — utility CSS (spacing, sizing, z-index) generated from tokens.
- `packages/utils/` — shared internal helpers (no public API surface guarantees).
- `packages/react-<name>/` — one package per component. Public API.
- `apps/docs/` — Vite playground; not published.
- `scripts/` — repo maintenance scripts (metadata, docs sync).

## Component authoring conventions

- **Two-file split per component.** `Component.tokens.css` holds `--component-*` variables mapped to `--vds-*` tokens. `Component.css` holds structural rules only and references the local vars. Tokens import first.
- **`@layer design-system.components`** wraps every ruleset so consumers can override without `!important`.
- **Class prefix** `vds-{name}` on every element. Variants live in `[data-variant]`, sizes in `[data-size]`, state in `[data-state]` / `data-disabled` / `aria-*`.
- **Logical properties only.** `margin-inline`, `padding-block`, `inset-inline-start`, etc. No `left/right/top/bottom` for layout.
- **RTL.** Only add `:dir(rtl) { … }` blocks when logical props can't express the rule (e.g. directional icons). The default layout must already flip correctly via logical props.
- **TypeScript.** Strict mode; avoid `any`; prefer discriminated unions over booleans for variants.

## Local build

```bash
pnpm run build               # build every publishable package
pnpm --filter @virtari/react-button run build   # one package
pnpm run typecheck           # strict TS across the workspace
pnpm run clean               # wipe every dist/
```

The docs app consumes packages through their `dist/` via the `exports` map in each `package.json`. Edits to a package require a rebuild to show up in the docs browser — HMR works fine for docs source edits.

## Adding a new component

1. `cp -R packages/react-button packages/react-<name>` as a starting skeleton.
2. Rename files, class prefixes, and the `name` field in `package.json`.
3. Run `pnpm run sync:metadata` — this normalizes `description`, `repository`, `keywords`, `publishConfig`, and generates a starter `README.md` + `LICENSE`.
4. Add the new page to [`apps/docs`](./apps/docs/src/pages) and register it in `apps/docs/src/App.tsx`.
5. `pnpm install` to link the workspace.
6. `pnpm changeset` to record the change.

## Changesets & releasing

We use [Changesets](https://github.com/changesets/changesets) to version and publish independently.

### Day-to-day

After making changes that should ship:

```bash
pnpm changeset
```

Pick the affected packages, a semver bump (`patch` / `minor` / `major`) per package, and write a human-readable summary. This creates a markdown file in `.changeset/` — commit it with your PR.

### Release pipeline

On every push to `main`, the [`Release`](./.github/workflows/release.yml) workflow:

1. Reads pending changesets.
2. Opens (or updates) a **"Version packages"** PR that applies version bumps and writes `CHANGELOG.md` entries.
3. When that PR is merged, the workflow publishes the affected packages to npm.

The workflow needs one secret: `NPM_TOKEN` (an npm automation token with publish rights on the `@virtari` scope). Add it at **Settings → Secrets and variables → Actions**.

### Manual release (escape hatch)

```bash
pnpm changeset version     # apply pending bumps locally
git commit -am "chore(release): version packages"
pnpm run release           # builds, then `changeset publish`
git push --follow-tags
```

## CI

[`.github/workflows/ci.yml`](./.github/workflows/ci.yml) runs `pnpm install`, `pnpm run build`, and `pnpm run typecheck` on every PR and push to `main`. A red CI blocks release.

## Commit style

Short, conventional prefixes keep history scannable:

- `feat(button): …` new feature
- `fix(select): …` bug fix
- `refactor(tokens): …` internal rework
- `chore(release): …` Changesets-generated
- `docs(readme): …` documentation-only

## License

By contributing, you agree your changes ship under the repository's [MIT license](./LICENSE).
