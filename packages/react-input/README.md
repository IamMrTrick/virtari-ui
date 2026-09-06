# @virtari-packages/react-input

Virtari input — accessible React component built on CSS variables and logical properties.

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
npm install @virtari-packages/react-input
# or
pnpm add @virtari-packages/react-input
# or
yarn add @virtari-packages/react-input
```

## Peer dependencies

`react` `^18` or `^19`, alongside `react-dom`.

## Usage

```tsx
import {
  Input,
  InputField,
  PasswordInputField,
  analyzePasswordStrength,
} from "@virtari-packages/react-input";
```

```tsx
const analysis = analyzePasswordStrength(password, {
  standard: "standard",
  userInputs: [email, username],
});

<PasswordInputField
  label="Password"
  value={password}
  onChange={(event) => setPassword(event.target.value)}
  showCounter
  maxLength={64}
  showRequirements
  requirementsLabel="Your password must include"
  strengthLabel="Password Strength"
  strengthStandard="standard"
  strengthOptions={{ userInputs: [email, username] }}
/>;

<PasswordInputField strengthStandard="basic" minLength={8} />;
<PasswordInputField strengthStandard="strict" strongLength={20} />;

<PasswordInputField
  label="Password without metrics"
  showStrengthMeter={false}
/>;
```

### Import styles

```ts
import "@virtari-packages/react-input/styles";
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

- [Repository](https://github.com/itstheilya/virtari-ui)
- [Issues](https://github.com/itstheilya/virtari-ui/issues)
- [Changelog](./CHANGELOG.md)

## License

[MIT](./LICENSE) © 2026 Virtari.

## Icon and action geometry

Use the component slots instead of positioning icons with page CSS:

```tsx
<InputWrapper>
  <InputIcon side="start"><SearchIcon /></InputIcon>
  <Input size="md" aria-label="Search" />
  <InputIcon side="end"><ShortcutIcon /></InputIcon>
</InputWrapper>
```

`side` is logical and follows the wrapper's writing direction. When omitted, the first or last child supplies the placement for existing compositions. `InputIcon` is decorative and does not intercept pointer events; use `PasswordInput` for the built-in reveal action, or an accessible button for an interactive action.

The wrapper derives outer inset, icon size, and icon-to-text gap from the direct Input child's `size`. Customize `--input-slot-inset`, `--input-icon-size`, and `--input-icon-gap` on the wrapper when necessary. Native input padding reserves the complete slot width. Native fields keep a unitless line height and symmetric block padding; there is no default per-font pixel translation. Fonts have different glyph metrics, so geometrically centered line boxes do not guarantee identical optical centering for every font.
