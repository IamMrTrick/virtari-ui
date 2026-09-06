# Contributing to Virtari

Thanks for working on Virtari. This guide covers the day-to-day workflow, conventions, and private release process.

## Prerequisites

- **Node** ≥ 22
- **pnpm** ≥ 10 (enable via `corepack enable`)
- A recent Chromium or Firefox for the docs playground
- A GitHub account with access to this repository

## Getting started

```bash
git clone https://github.com/IamMrTrick/virtari-ui.git
cd virtari-design-system
pnpm install
pnpm run build
pnpm run dev
```

The `pnpm run build` step is required on a fresh clone: package `dist/` output is gitignored (the release workflow rebuilds before publishing), and the docs app resolves several packages through their `dist/`.

`pnpm run dev` boots [`apps/docs`](./apps/docs) on http://localhost:5173. Every component has a page there — treat it as a live spec.

## Repository layout

- `packages/tokens/` — source-of-truth CSS custom properties.
- `packages/core/` — reset + global layer declarations.
- `packages/utilities/` — utility CSS (spacing, sizing, z-index) generated from tokens.
- `packages/utils/` — shared internal helpers (no public API surface guarantees).
- `packages/react-<name>/` — one package per component. Public-within-the-org API.
- `apps/docs/` — Vite playground; not published.
- `scripts/` — repo maintenance scripts (metadata, docs sync).

## Component authoring conventions

- **Two-file split per component.** `Component.tokens.css` holds `--component-*` variables mapped to `--vds-*` tokens. `Component.css` holds structural rules only and references the local vars. Tokens import first.
- **`@layer design-system.components`** wraps every ruleset so consumers can override without `!important`.
- **Class prefix** `vds-{name}` on every element. Variants live in `[data-variant]`, sizes in `[data-size]`, state in `[data-state]` / `data-disabled` / `aria-*`.
- **Logical properties only.** `margin-inline`, `padding-block`, `inset-inline-start`, etc. No `left/right/top/bottom` for layout.
- **RTL.** Only add `:dir(rtl) { … }` blocks when logical props can't express the rule (e.g. directional icons). The default layout must already flip correctly via logical props.
- **TypeScript.** Strict mode; avoid `any`; prefer discriminated unions over booleans for variants.

### Selector audit rules

- **Always anchor selectors to one stable root class.** Prefer `.vds-button[data-variant="outline"]`, not bare `[data-variant="outline"]`.
- **Use `data-*` only for true styling axes.** Good: variant, size, tone, orientation, loading, open/closed. Bad: presentational one-offs that should just be a class or local wrapper.
- **Keep selectors shallow.** Target the component root plus at most one descendant in normal cases. If a selector starts encoding DOM ancestry, stop and add an explicit class or `data-*`.
- **Prefer explicit attributes over relational selectors.** If styling depends on structure detection, add a runtime hook like `data-icon-only` instead of `:has(...)` when possible.
- **Keep DOM and CSS contracts identical across render paths.** Polymorphic branches like `asChild` must emit the same internal wrappers that the CSS expects.
- **Reach for `aria-*` only when it is semantic state.** `aria-disabled`, `aria-expanded`, `aria-pressed` are good styling hooks because they already exist for accessibility; don't invent ARIA for purely visual state.

## Local build

```bash
pnpm run build               # build every publishable package
pnpm --filter @virtari-packages/react-button run build   # one package
pnpm run typecheck           # strict TS across the workspace
pnpm run clean               # wipe every dist/
```

The docs app consumes packages through their `dist/` via the `exports` map in each `package.json`. Edits to a package require a rebuild to show up in the docs browser — HMR works fine for docs source edits.

## Adding a new component

1. `cp -R packages/react-button packages/react-<name>` as a starting skeleton.
2. Rename files, class prefixes, and the `name` field in `package.json`.
3. Run `pnpm run sync:metadata` — this normalizes `description`, `repository`, `keywords`, `publishConfig`, and regenerates `README.md` + `LICENSE`.
4. Add the new page to [`apps/docs`](./apps/docs/src/pages) and register it in `apps/docs/src/App.tsx`.
5. `pnpm install` to link the workspace.
6. `pnpm changeset` to record the change.

---

## Private publishing: GitHub Packages

Virtari is **not** on the public npm registry. Packages are published to **GitHub Packages** — a private npm-compatible registry tied to the repository owner.

### Scope & ownership

GitHub Packages requires the npm scope to match the GitHub owner. Our packages are scoped `@virtari`, so this repository must be owned by either:

- a **GitHub organization named `virtari`**, _or_
- a user/org, with the scope in every `package.json` renamed to match that owner.

If you need to switch scope, edit the scope everywhere:

```bash
# example: rename @virtari → @iammrtrick
node -e "
  const fs=require('fs'),path=require('path');
  for (const d of fs.readdirSync('packages')) {
    const p=path.join('packages',d,'package.json');
    if (!fs.existsSync(p)) continue;
    let s=fs.readFileSync(p,'utf8');
    s=s.replace(/@virtari\\//g,'@iammrtrick/');
    fs.writeFileSync(p,s);
  }
"
```

Also update the internal `@virtari-packages:registry=…` lines in consumer `.npmrc` files and any hard-coded scope references (e.g. in the Release workflow's `Setup Node` step: `scope: "@virtari"`).

### Consumer setup

Every project that installs Virtari packages needs:

**1. `.npmrc` in the project root:**

```ini
@virtari-packages:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

**2. A GitHub Personal Access Token (classic) with `read:packages`** exported as `GITHUB_TOKEN` in the shell or CI.

Install as usual:

```bash
pnpm add @virtari-packages/react-button
```

### Publisher setup

The [Release workflow](./.github/workflows/release.yml) uses the built-in `GITHUB_TOKEN` (with `packages: write` permission declared at the top of the workflow). **No manual secret is required** — GitHub Actions provides the token automatically.

For local/manual publishes:

```bash
export GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxx   # needs write:packages
echo "@virtari-packages:registry=https://npm.pkg.github.com" > ~/.npmrc
echo "//npm.pkg.github.com/:_authToken=\${GITHUB_TOKEN}" >> ~/.npmrc
pnpm run release
```

---

## Changesets workflow

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
3. When that PR is merged, the workflow publishes the affected packages to GitHub Packages.

The workflow authenticates with the auto-provided `GITHUB_TOKEN`. Nothing to configure.

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

Contributions are accepted under the repository's [MIT License](./LICENSE).
Virtari brand artwork is excluded; see
[Virtari brand assets](./BRAND_ASSETS_LICENSE.md).
