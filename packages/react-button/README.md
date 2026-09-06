# @virtari-packages/react-button

Virtari button — accessible React component built on CSS variables and logical properties.

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
npm install @virtari-packages/react-button
# or
pnpm add @virtari-packages/react-button
# or
yarn add @virtari-packages/react-button
```

## Peer dependencies

`react` `^18` or `^19`, alongside `react-dom`.

## Usage

```tsx
import { Button } from "@virtari-packages/react-button";

<Button leftSection={<PlusIcon />}>Create</Button>
<Button iconOnly aria-label="Create"><PlusIcon /></Button>
<Button asChild leftSection={<ArrowIcon />}><a href="/account">Account</a></Button>
```

Labels and icon sections share the same centered content layout, including `asChild` links and loading states. `iconOnly` explicitly chooses square geometry; set it to `false` when a named custom child renders visible text. Single native SVGs and accessible-named single opaque icons retain automatic detection.

Long labels wrap within the available width and increase the minimum button height. Leading/trailing icons retain their size, and symmetric block padding keeps multiline content away from the edges. `fullWidth` fills the containing layout; use a short action label where possible. Link variants remain inline at every size: size adjusts their type and icon size, without adding control padding.

Solid states use paired solid-background and on-solid-text roles. Outline, ghost, soft and link labels use text roles, which remain readable on the standard light, dark and OLED surfaces. Custom brand colors and backgrounds require their own contrast checks.

Decorative effects are optional: shine, raised, candy and glass apply to solid buttons; outline-glow applies to outline buttons. Glass needs a dark supporting background, and gradient/highlight effects need contrast verification in their actual placement. Prefer the plain variants for ordinary form and navigation actions.

### Import styles

```ts
import "@virtari-packages/react-button/styles";
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

## Links

- [Repository](https://github.com/Virtari-Packages/virtari-design-system)
- [Issues](https://github.com/Virtari-Packages/virtari-design-system/issues)
- [Changelog](./CHANGELOG.md)

## License

[MIT](./LICENSE) © 2026 Virtari.
