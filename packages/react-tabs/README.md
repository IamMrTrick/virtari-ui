# @virtari-packages/react-tabs

Virtari tabs — accessible React component built on CSS variables and logical properties.

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
npm install @virtari-packages/react-tabs
# or
pnpm add @virtari-packages/react-tabs
# or
yarn add @virtari-packages/react-tabs
```

## Peer dependencies

`react` `^18` or `^19`, alongside `react-dom`.

## Usage

```tsx
import { /* … */ } from "@virtari-packages/react-tabs";
```

For heavy carousel panels, keep only the active panel and its direct
neighbors mounted:

```tsx
<TabsPanels mountStrategy="adjacent">
  <TabsContent value="overview">...</TabsContent>
  <TabsContent value="analytics">...</TabsContent>
  <TabsContent value="activity">...</TabsContent>
</TabsPanels>
```

The default is `mountStrategy="all"` to preserve the previous behavior.

### Import styles

```ts
import "@virtari-packages/react-tabs/styles";
```

Styles sit in the `design-system.components` cascade layer so your app can override them without `!important`.

## Design tokens

This package reads `@virtari-packages/tokens` CSS variables. Import the token layer once at the root of your app:

```ts
import "@virtari-packages/tokens";
```

Override any `--vds-*` custom property at `:root` (or a subtree) to retheme.

Segmented tracks use the field-shell radius, with inner corners reduced by
the track padding. In pill mode, horizontal tracks become capsules; vertical
stacks retain a finite field radius so the outer curve does not cut into the
first and last labels. Boxed tabs use the compact `--vds-radius-tabs-boxed`
role. Underline/line edges remain square, while the explicit `pills` variant
always uses a capsule.

## Accessibility & RTL

All components use logical CSS properties (`margin-inline`, `padding-block`, …) and `:dir(rtl)` overrides where logical props cannot express the rule. Layouts flip automatically when the host document sets `dir="rtl"`.

Direction resolves from the explicit `dir` prop, then `DirectionProvider`,
then the DOM ancestor. Runtime direction changes also reposition the indicator.

## Links

- [Repository](https://github.com/Virtari-Packages/virtari-design-system)
- [Issues](https://github.com/Virtari-Packages/virtari-design-system/issues)
- [Changelog](./CHANGELOG.md)

## License

[MIT](./LICENSE) © 2026 Virtari.
