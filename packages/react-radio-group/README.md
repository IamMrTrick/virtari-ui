# @virtari-packages/react-radio-group

Virtari radio group — accessible React component built on CSS variables and logical properties.

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
npm install @virtari-packages/react-radio-group
# or
pnpm add @virtari-packages/react-radio-group
# or
yarn add @virtari-packages/react-radio-group
```

## Peer dependencies

`react` `^18` or `^19`, alongside `react-dom`.

## Usage

```tsx
import { /* … */ } from "@virtari-packages/react-radio-group";
```

### Import styles

```ts
import "@virtari-packages/react-radio-group/styles";
```

Styles sit in the `design-system.components` cascade layer so your app can override them without `!important`.

## Design tokens

This package reads `@virtari-packages/tokens` CSS variables. Import the token layer once at the root of your app:

```ts
import "@virtari-packages/tokens";
```

Override any `--vds-*` custom property at `:root` (or a subtree) to retheme.

## Accessibility & RTL

Give each group a `label`, `aria-label` or `aria-labelledby`. Built-in `RadioField` and `RadioCard` labels name the option; their descriptions are connected separately. Explicit ARIA names take precedence, and consumer `aria-describedby` IDs are combined with package help/error IDs. Supply a concise `aria-label` or `aria-labelledby` for rich custom card children.

Use `name` on the group for native form serialization. Native reset restores an uncontrolled group's `defaultValue`, or clears an initially empty group. A canceled reset does nothing. Controlled groups retain the consumer's value; update that value in the form's `onReset` when desired. Resetting to an empty selection does not emit `onValueChange`, whose selection callback accepts strings only. External forms are supported through the item `form` prop; associate all options with the same form.

Horizontal/vertical orientation controls both layout and arrow navigation. Pills and segments grow for wrapping labels, and cards reserve a separate row for the icon-grid radio so it cannot overlap the icon in narrow layouts. Keep rich card children noninteractive because the card itself labels a radio.

All components use logical CSS properties (`margin-inline`, `padding-block`, …) and `:dir(rtl)` overrides where logical props cannot express the rule. Pass `dir="rtl"` to each group, or use the primitive DirectionProvider, to keep layout and arrow navigation in sync. A native ancestor `dir` alone does not override the primitive default.

## Links

- [Repository](https://github.com/IamMrTrick/virtari-ui)
- [Issues](https://github.com/IamMrTrick/virtari-ui/issues)
- [Changelog](./CHANGELOG.md)

## License

[MIT](./LICENSE) © 2026 Virtari.
