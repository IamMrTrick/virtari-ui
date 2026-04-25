# @virtari-packages/react-color-picker

Virtari color picker - solid colors, CSS gradients, code mode, and full channel conversion.

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
npm install @virtari-packages/react-color-picker
# or
pnpm add @virtari-packages/react-color-picker
# or
yarn add @virtari-packages/react-color-picker
```

## Peer dependencies

`react` `^18` or `^19`, alongside `react-dom`.

## Usage

```tsx
import { ColorPicker } from "@virtari-packages/react-color-picker";
import "@virtari-packages/react-color-picker/styles";

function Example() {
  return <ColorPicker defaultValue="linear-gradient(90deg, #d9d9d9 0%, #737373 100%)" />;
}
```

## Design tokens

This package reads `@virtari-packages/tokens` CSS variables. Import the token layer once at the root of your app:

```ts
import "@virtari-packages/tokens";
```

## Links

- [Repository](https://github.com/IamMrTrick/virtari-design-system)
- [Issues](https://github.com/IamMrTrick/virtari-design-system/issues)

## License

Proprietary. See [LICENSE](./LICENSE).
