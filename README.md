<div align="center">

# Virtari Design System

A production-grade, multi-brand React + CSS design system.
Token-driven, accessibility-first, RTL-safe, and available as editable project source through a shadcn-compatible registry.

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![pnpm](https://img.shields.io/badge/pnpm-10-f69220.svg)](https://pnpm.io/)
[![Changesets](https://img.shields.io/badge/versioning-changesets-5b9dd9.svg)](https://github.com/changesets/changesets)

</div>

---

## Why Virtari

- **Token-first.** Every visual surface reads from CSS custom properties in `@virtari-packages/tokens`. Brand or dark-mode overrides cascade through automatically.
- **Logical & RTL-safe.** Layouts use `margin-inline` / `padding-block` / `inset-*` and `:dir(rtl)` adjustments, so the same markup flips correctly in Arabic, Hebrew, or Persian.
- **Composable CSS layers.** Styles sit in the `design-system.components` cascade layer, so consumer apps can always override without `!important`.
- **Accessible by default.** Built on `@virtari-packages/primitives` — our own headless behaviour layer — plus React Aria and strict semantic HTML. Focus management, ARIA wiring, and keyboard support are non-optional.
- **Own the implementation.** The CLI installs normal React and CSS source in the application. Change markup, behavior, tokens, or motion without waiting for another library prop.
- **Open registry protocol.** The same source items work through the Virtari CLI and the standard shadcn GitHub registry flow.
- **Selective installs.** Each component resolves only its transitive Virtari source and third-party dependencies. Existing ESM + CJS packages remain available during migration.

## Package map

| Scope | Count | Purpose |
|---|---|---|
| `@virtari-packages/tokens` | 1 | Source-of-truth CSS custom properties. |
| `@virtari-packages/core` | 1 | Reset + global primitives. |
| `@virtari-packages/utilities` | 1 | Utility classes (spacing, sizing, z-index) built from tokens. |
| `@virtari-packages/utils` | 1 | Shared internal helpers for component packages. |
| `@virtari-packages/react-*` | 67 | Individual React components (button, select, data-table, date-picker, …). |
| `virtari` | 1 | Source installer, updater, diff and project health CLI. |

Full list: [`packages/`](./packages). Each package has its own README with install and usage.

---

## Source-owned installation

```bash
pnpm dlx virtari@latest init
pnpm dlx virtari@latest add button input dialog
pnpm dlx virtari@latest add virtari-utilities
pnpm dlx virtari@latest add virtari-all
```

Use `add` for any single registry item, pass several names in one command, or
install `virtari-all` for the complete component collection. `virtari list`
prints every available component, primitive, foundation, and utility item.

Import the installed foundation once, then import local components:

```tsx
import "./virtari/styles/index.css";
import { Button } from "./virtari/components/button";
```

The installed tree contains no `@virtari-packages/*` runtime imports. Existing
consumer edits are protected; use `virtari diff button` and `--dry-run` before
an explicit `--overwrite` update. See the [source registry contract](./docs/source-registry.md).

The registry can also be consumed with the official shadcn CLI:

```bash
pnpm dlx shadcn@latest add IamMrTrick/virtari-ui/button#cli-v0.1.3
```

## Legacy package installation

The existing packages remain private on **GitHub Packages** during migration. Every package-based consumer needs two things:

### 1. A `.npmrc` at the project root

```ini
@virtari-packages:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

### 2. A GitHub Personal Access Token (classic) with `read:packages`

Generate one at [github.com/settings/tokens](https://github.com/settings/tokens) and export it in your shell or CI:

```bash
export GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxx
```

Then install only what you need:

```bash
pnpm add @virtari-packages/tokens @virtari-packages/core
pnpm add @virtari-packages/react-button @virtari-packages/react-input @virtari-packages/react-dialog
```

> **Prerequisite for publishing under `@virtari`:** GitHub Packages requires the npm scope to match a GitHub owner. You need either (a) a GitHub **organization named `virtari`** that owns this repository, or (b) to rename the scope to match your user/org name. See [CONTRIBUTING.md](./CONTRIBUTING.md#scope--ownership) for details.

### Wire the foundations once at the app root

```ts
// app entry
import "@virtari-packages/tokens";                     // CSS variables
import "@virtari-packages/core";                       // reset + layers
import "@virtari-packages/react-button/styles";        // one per component
import "@virtari-packages/react-input/styles";
```

Then use the components as normal React:

```tsx
import { Button } from "@virtari-packages/react-button";
import { Input } from "@virtari-packages/react-input";

export function SignIn() {
  return (
    <form>
      <Input type="email" placeholder="you@example.com" />
      <Button type="submit">Sign in</Button>
    </form>
  );
}
```

---

## Theming

Override any token at the scope you want — document, section, or single component:

```css
:root {
  --vds-color-accent-500: #6b46ff;
  --vds-radius-element: 0.75rem;
  --vds-font-sans: "Vazirmatn", "Inter", system-ui, sans-serif;
}

[data-theme="dark"] {
  --vds-color-bg-default: oklch(18% 0.01 260);
  --vds-color-text-default: oklch(96% 0.005 260);
}
```

Dark mode and brand switching are both just custom-property cascades — there is no JS toggle required.

---

## Repository layout

```
virtari-design-system/
├── apps/
│   └── docs/                  # Vite demo app (every component lives here)
├── packages/
│   ├── cli/                   # source installer and update tooling
│   ├── tokens/                # CSS custom properties
│   ├── core/                  # reset + global layers
│   ├── utilities/             # utility classes
│   ├── utils/                 # internal helpers
│   └── react-<name>/          # one package per component
├── registry/                  # generated, installable source files
├── registry.json              # shadcn-compatible source registry
├── scripts/                   # repo maintenance (metadata, docs sync)
├── .changeset/                # pending version/publish intents
└── .github/workflows/         # CI + release automation
```

## Development

```bash
pnpm install           # install everything
pnpm run dev           # start the docs playground (http://localhost:5173)
pnpm run build         # build every publishable package
pnpm run typecheck     # strict type check across the workspace
```

- Node 22+, pnpm 10+.
- The docs app imports packages through their published `exports`, so an edit to a package source requires a rebuild of that package (`pnpm --filter @virtari-packages/react-<name> build`) to reflect in the browser. HMR works on the docs source itself.

## Releasing

Private releases are fully automated by Changesets + GitHub Actions:

1. Make your changes on a feature branch.
2. `pnpm changeset` — describe the change and pick semver bumps.
3. Open a PR. CI builds + typechecks.
4. After merge to `main`, a bot opens a "Version packages" PR containing bumps and `CHANGELOG.md` entries.
5. Merge that PR — CI publishes the affected packages to **GitHub Packages** under the repo owner's namespace.

No npm token is required — the built-in `GITHUB_TOKEN` (with `packages: write` permission) is enough.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full flow.

The source registry and CLI are released under MIT, so installed component
source can be used, modified, merged, and redistributed with the required
license notice. Registry installs place the notice at `src/virtari/LICENSE`.

## License

Source code and documentation are [MIT licensed](./LICENSE) © 2026 Virtari.
The Virtari logo, wordmark, symbol, and app-icon artwork are proprietary and
excluded from MIT; see [Virtari brand assets](./BRAND_ASSETS_LICENSE.md).
