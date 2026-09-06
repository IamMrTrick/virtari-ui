# @virtari-packages/react-checkbox

Virtari checkbox — accessible React component built on CSS variables and logical properties.

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
npm install @virtari-packages/react-checkbox
# or
pnpm add @virtari-packages/react-checkbox
# or
yarn add @virtari-packages/react-checkbox
```

## Peer dependencies

`react` `^18` or `^19`, alongside `react-dom`.

## Usage

```tsx
import { CheckboxField, CheckboxGroup } from "@virtari-packages/react-checkbox";
import "@virtari-packages/core";
import "@virtari-packages/tokens";
import "@virtari-packages/react-checkbox/styles";

<CheckboxGroup name="notifications" label="Notifications">
  <CheckboxField value="email" label="Email" description="Receive a weekly digest" defaultChecked />
  <CheckboxField value="push" label="Push notifications" />
</CheckboxGroup>
```

### Import styles

```ts
import "@virtari-packages/react-checkbox/styles";
```

Styles sit in the `design-system.components` cascade layer so your app can override them without `!important`.

## Design tokens

This package reads `@virtari-packages/tokens` CSS variables. Import the token layer once at the root of your app:

```ts
import "@virtari-packages/tokens";
```

Override any `--vds-*` custom property at `:root` (or a subtree) to retheme.

## Accessibility & RTL

`CheckboxField` and `CheckboxCard` associate their visible label and helper text with the focusable checkbox. Card badges and trailing metadata are included in its description. Explicit accessible names and description IDs are preserved. An isolated `Checkbox` needs a label or `aria-label`.

Groups pass `name`, disabled state, error state and helper/error descriptions to descendants; an explicit item name overrides the group name. `PillCheckbox` also supports a shared name and inherits an enclosing checkbox group's state. Each item's value is submitted independently. Keep state on each checkbox using `checked`/`onCheckedChange` or `defaultChecked`; an uncontrolled form reset restores its initial state.

Group `required` indicates a group rule, but does not enforce an at-least-one constraint. Implement that validation in the form. Put `required` on each individually mandatory item for native validation. Space toggles a focused choice; Enter does not toggle it.

Pill selections include a check or mixed-state mark, and long labels can wrap. Bare checkboxes retain their compact 14/18/22px geometry; labeled fields provide at least a 24px row target. Use a field or card when a larger hit area is needed. Reduced motion suppresses selection animations. Do not place interactive links or buttons inside a field/card label.

All components use logical CSS properties (`margin-inline`, `padding-block`, …) and `:dir(rtl)` overrides where logical props cannot express the rule. Layouts flip automatically when the host document sets `dir="rtl"`.

## Links

- [Repository](https://github.com/Virtari-Packages/virtari-design-system)
- [Issues](https://github.com/Virtari-Packages/virtari-design-system/issues)
- [Changelog](./CHANGELOG.md)

## License

[MIT](./LICENSE) © 2026 Virtari.
