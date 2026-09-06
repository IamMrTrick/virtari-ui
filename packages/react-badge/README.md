# @virtari-packages/react-badge

Virtari badge — accessible React component built on CSS variables and logical properties.

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
npm install @virtari-packages/react-badge
# or
pnpm add @virtari-packages/react-badge
# or
yarn add @virtari-packages/react-badge
```

## Peer dependencies

`react` `^18` or `^19`, alongside `react-dom`.

## Usage

```tsx
import { Badge } from "@virtari-packages/react-badge";

<Badge color="success" dot>Published</Badge>
<Badge asChild variant="outline">
  <button type="button" onClick={applyFilter}>Design</button>
</Badge>
<Badge onRemove={removeTag} removeLabel="Remove design tag">Design</Badge>
```

### Import styles

```ts
import "@virtari-packages/react-badge/styles";
```

Styles sit in the `design-system.components` cascade layer so your app can override them without `!important`.

## Design tokens

This package reads `@virtari-packages/tokens` CSS variables. Import the token layer once at the root of your app:

```ts
import "@virtari-packages/tokens";
```

Override any `--vds-*` custom property at `:root` (or a subtree) to retheme.

## Accessibility & RTL

All components use logical CSS properties (`margin-inline`, `padding-block`, …) and `:dir(rtl)` overrides where logical props cannot express the rule. Layouts flip automatically when the host document sets `dir="rtl"`.

Labels wrap within the available width, including unbroken text; icon slots keep their size. Minimum heights are 20px for xs/sm, 24px for md and 28px for lg with the default 16px root font. Square shape follows the scoped navigation-item radius; pill remains fully rounded.

Use `asChild` with one native button or anchor for keyboard-accessible actions and links. The child keeps its attributes and ref, and a child click handler may cancel the Badge click handler with `preventDefault()`. A default span with `onClick` only receives pointer styling. Do not place `onRemove` inside a slotted button or anchor; use a plain removable badge so the close button remains a separate native control. Compact badges and their close buttons are intended for dense metadata; larger touch actions should use Button or Chip.

Meaningful dot-only badges need an accessible name or adjacent explanation. `dotOnly` with `asChild` preserves the child element while suppressing its visible content. Native slotted disabled buttons retain disabled behavior; non-button elements do not gain disabled semantics automatically.

## Links

- [Repository](https://github.com/IamMrTrick/virtari-ui)
- [Issues](https://github.com/IamMrTrick/virtari-ui/issues)
- [Changelog](./CHANGELOG.md)

## License

[MIT](./LICENSE) © 2026 Virtari.
