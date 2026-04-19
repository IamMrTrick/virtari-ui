# @virtari/react-checkbox

Virtari checkbox — accessible React component built on CSS variables and logical properties.

> **Private package.** Published to GitHub Packages and consumable only with a GitHub Personal Access Token that has `read:packages` scope. See [Install from GitHub Packages](#install-from-github-packages) below.

---

## Install from GitHub Packages

Create or edit `.npmrc` at the root of the consuming project:

```ini
@virtari:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Export a token with `read:packages` permission (locally or in CI):

```bash
export GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxx
```

Then install as you would any scoped package:

```bash
npm install @virtari/react-checkbox
# or
pnpm add @virtari/react-checkbox
# or
yarn add @virtari/react-checkbox
```

## Peer dependencies

`react` `^18` or `^19`, alongside `react-dom`.

## Usage

```tsx
import { /* … */ } from "@virtari/react-checkbox";
```

### Import styles

```ts
import "@virtari/react-checkbox/styles";
```

Styles sit in the `design-system.components` cascade layer so your app can override them without `!important`.

## Design tokens

This package reads `@virtari/tokens` CSS variables. Import the token layer once at the root of your app:

```ts
import "@virtari/tokens";
```

Override any `--vds-*` custom property at `:root` (or a subtree) to retheme.

## Accessibility & RTL

All components use logical CSS properties (`margin-inline`, `padding-block`, …) and `:dir(rtl)` overrides where logical props cannot express the rule. Layouts flip automatically when the host document sets `dir="rtl"`.

## Links

- [Repository](https://github.com/IamMrTrick/virtari-design-system)
- [Issues](https://github.com/IamMrTrick/virtari-design-system/issues)
- [Changelog](./CHANGELOG.md)

## License

Proprietary. See [LICENSE](./LICENSE).
