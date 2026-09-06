# @virtari-packages/utils

Small internal helpers shared across Virtari React packages.

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
npm install @virtari-packages/utils
# or
pnpm add @virtari-packages/utils
# or
yarn add @virtari-packages/utils
```

## Peer dependencies

`react` `^18` or `^19`, alongside `react-dom`.

## Usage

```tsx
import { /* … */ } from "@virtari-packages/utils";
```

## Keyboard shortcuts

`useHotkey("mod+k", handler)` resolves `mod` to Command on Apple platforms and Control elsewhere. `formatCombo` produces visible key labels; `ariaKeyShortcuts` produces standardized ARIA key names; `shortcutLabel` produces readable modifier names. Use `useKeyboardPlatform()` when rendering platform-specific attributes in React to keep server hydration stable.

Hotkeys ignore composition/IME events, already-handled events, and key repeats by default. `allowRepeat: true` opts into repeated keydown events. Editable fields remain protected unless `allowInInputs: true` is set. Handlers should bind only shortcuts that their visible actions actually implement and avoid overriding established browser or operating-system actions.

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
