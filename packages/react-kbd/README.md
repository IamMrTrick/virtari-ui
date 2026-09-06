# @virtari-packages/react-kbd

Virtari kbd — accessible React component built on CSS variables and logical properties.

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
npm install @virtari-packages/react-kbd
# or
pnpm add @virtari-packages/react-kbd
# or
yarn add @virtari-packages/react-kbd
```

## Peer dependencies

`react` `^18` or `^19`, alongside `react-dom`.

## Usage

```tsx
import { Kbd, KbdShortcut } from "@virtari-packages/react-kbd";

<Kbd>Enter</Kbd>
<KbdShortcut combo="mod+k" />
```

### Import styles

```ts
import "@virtari-packages/react-kbd/styles";
```

Styles sit in the `design-system.components` cascade layer so your app can override them without `!important`.

`KbdShortcut` displays Command on Apple platforms and Control on Windows/Linux, with a readable accessible name and left-to-right key order inside RTL text. It shares the combo grammar and platform detection used by `useHotkey`. It does **not** bind a shortcut. Set `aria-keyshortcuts={ariaKeyShortcuts(combo, platform)}` on the action that actually implements it, using `useKeyboardPlatform()` for a hydration-safe platform value. Use the optional `platform="mac" | "other"` only for explicit documentation previews or remote environments.

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
