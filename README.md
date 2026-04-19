<div align="center">

# Virtari Design System

A production-grade, multi-brand React + CSS design system.
Token-driven, accessibility-first, RTL-safe, and shipped as independent packages through **GitHub Packages** (private).

[![License: Proprietary](https://img.shields.io/badge/license-Proprietary-lightgrey.svg)](./LICENSE)
[![pnpm](https://img.shields.io/badge/pnpm-10-f69220.svg)](https://pnpm.io/)
[![Changesets](https://img.shields.io/badge/versioning-changesets-5b9dd9.svg)](https://github.com/changesets/changesets)

</div>

---

## Why Virtari

- **Token-first.** Every visual surface reads from CSS custom properties in `@virtari/tokens`. Brand or dark-mode overrides cascade through automatically.
- **Logical & RTL-safe.** Layouts use `margin-inline` / `padding-block` / `inset-*` and `:dir(rtl)` adjustments, so the same markup flips correctly in Arabic, Hebrew, or Persian.
- **Composable CSS layers.** Styles sit in the `design-system.components` cascade layer, so consumer apps can always override without `!important`.
- **Accessible by default.** Built on Radix, React Aria, and strict semantic HTML — focus management, ARIA wiring, and keyboard support are non-optional.
- **No framework lock-in.** Packages ship ESM + CJS + CSS. Use them in Next.js, Remix, Vite, Astro, or any React host.
- **Atomic, independent releases.** Each component is its own package — import only what you use. Versioned with [Changesets](https://github.com/changesets/changesets) and published privately to GitHub Packages.

## Package map

| Scope | Count | Purpose |
|---|---|---|
| `@virtari/tokens` | 1 | Source-of-truth CSS custom properties. |
| `@virtari/core` | 1 | Reset + global primitives. |
| `@virtari/utilities` | 1 | Utility classes (spacing, sizing, z-index) built from tokens. |
| `@virtari/utils` | 1 | Shared internal helpers for component packages. |
| `@virtari/react-*` | 44 | Individual React components (button, select, data-table, date-picker, …). |

Full list: [`packages/`](./packages). Each package has its own README with install and usage.

---

## Installing in a consumer project

Virtari is private — packages live on **GitHub Packages**, not the public npm registry. Every consuming project needs two things:

### 1. A `.npmrc` at the project root

```ini
@virtari:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

### 2. A GitHub Personal Access Token (classic) with `read:packages`

Generate one at [github.com/settings/tokens](https://github.com/settings/tokens) and export it in your shell or CI:

```bash
export GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxx
```

Then install only what you need:

```bash
pnpm add @virtari/tokens @virtari/core
pnpm add @virtari/react-button @virtari/react-input @virtari/react-dialog
```

> **Prerequisite for publishing under `@virtari`:** GitHub Packages requires the npm scope to match a GitHub owner. You need either (a) a GitHub **organization named `virtari`** that owns this repository, or (b) to rename the scope to match your user/org name. See [CONTRIBUTING.md](./CONTRIBUTING.md#scope--ownership) for details.

### Wire the foundations once at the app root

```ts
// app entry
import "@virtari/tokens";                     // CSS variables
import "@virtari/core";                       // reset + layers
import "@virtari/react-button/styles";        // one per component
import "@virtari/react-input/styles";
```

Then use the components as normal React:

```tsx
import { Button } from "@virtari/react-button";
import { Input } from "@virtari/react-input";

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
│   ├── tokens/                # CSS custom properties
│   ├── core/                  # reset + global layers
│   ├── utilities/             # utility classes
│   ├── utils/                 # internal helpers
│   └── react-<name>/          # one package per component
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
- The docs app imports packages through their published `exports`, so an edit to a package source requires a rebuild of that package (`pnpm --filter @virtari/react-<name> build`) to reflect in the browser. HMR works on the docs source itself.

## Releasing

Private releases are fully automated by Changesets + GitHub Actions:

1. Make your changes on a feature branch.
2. `pnpm changeset` — describe the change and pick semver bumps.
3. Open a PR. CI builds + typechecks.
4. After merge to `main`, a bot opens a "Version packages" PR containing bumps and `CHANGELOG.md` entries.
5. Merge that PR — CI publishes the affected packages to **GitHub Packages** under the repo owner's namespace.

No npm token is required — the built-in `GITHUB_TOKEN` (with `packages: write` permission) is enough.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full flow.

## License

Proprietary. See [LICENSE](./LICENSE). Unauthorized redistribution is prohibited.
