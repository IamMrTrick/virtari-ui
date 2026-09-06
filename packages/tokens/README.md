# @virtari-packages/tokens

Design tokens (colors, spacing, typography, radii, shadows, motion) as CSS variables.

> **Private package.** Published to GitHub Packages and consumable only with a GitHub Personal Access Token that has `read:packages` scope. See [Install from GitHub Packages](#install-from-github-packages) below.

---

## Install from GitHub Packages

Create or edit `.npmrc` at the root of the consuming project:

```ini
@virtari-packages:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Export a token with `read:packages` permission (locally or in CI):

```bash
export GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxx
```

Then install as you would any scoped package:

```bash
npm install @virtari-packages/tokens
# or
pnpm add @virtari-packages/tokens
# or
yarn add @virtari-packages/tokens
```

## Peer dependencies

`react` `^18` or `^19`, alongside `react-dom`.

## Usage

```tsx
import { /* … */ } from "@virtari-packages/tokens";
```

### Import styles

```ts
import "@virtari-packages/tokens/styles";
```

Styles sit in the `design-system.components` cascade layer so your app can override them without `!important`.

## Design tokens

This package reads `@virtari-packages/tokens` CSS variables. Import the token layer once at the root of your app:

```ts
import "@virtari-packages/tokens";
```

Override any `--vds-*` custom property at `:root` (or a subtree) to retheme.

## Theming

Colours resolve through three cascade sub-layers inside the top-level `tokens`
layer:

| Sub-layer      | Contents                                            |
| -------------- | --------------------------------------------------- |
| `tokens.base`  | Raw primitive scales (neutral, intents, alphas)     |
| `tokens.brand` | `[data-brand="…"]` primitive overrides              |
| `tokens`       | Semantic aliases (implicit sub-layer, ordered last) |

`tokens.brand` is ordered **after** `tokens.base`, so a `[data-brand]` override
wins over the base scale **on the same element** regardless of specificity.
Brand switching therefore works wherever you set the attribute — on `<html>`, on
a scoped wrapper, and in same-element mode combos:

```html
<!-- app-wide brand + mode -->
<html data-brand="acme" data-theme="dark"> … </html>

<!-- scoped subtree -->
<section data-brand="acme"> … </section>
```

Switching brand or mode is a pure custom-property cascade — no JS toggle
required. To add a brand, copy `src/brands/_template.css`, override the OKLCH
primitive hues under `@layer tokens.brand`, and register the file in
`src/brands/index.css`. The semantic layer re-resolves automatically, so no
component changes are needed.

> A cascade regression test lives at [`test/brand-scope.html`](./test/brand-scope.html) —
> open it in any modern browser to verify `[data-brand]` overrides win in light
> and dark, on both the root element and a nested wrapper.

## Accessibility & RTL

All components use logical CSS properties (`margin-inline`, `padding-block`, …) and `:dir(rtl)` overrides where logical props cannot express the rule. Layouts flip automatically when the host document sets `dir="rtl"`.

## Links

- [Repository](https://github.com/itstheilya/virtari-ui)
- [Issues](https://github.com/itstheilya/virtari-ui/issues)
- [Changelog](./CHANGELOG.md)

## License

[MIT](./LICENSE) © 2026 Virtari.
