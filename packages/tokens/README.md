# @virtari/tokens

Design tokens (colors, spacing, typography, radii, shadows, motion) as CSS variables.

---

## Install

```bash
npm install @virtari/tokens
# or
pnpm add @virtari/tokens
# or
yarn add @virtari/tokens
```

## Peer dependencies

Requires `react` `^18` or `^19` alongside `react-dom`.

## Usage

```tsx
import { /* ... */ } from "@virtari/tokens";
```

### Import styles

```ts
import "@virtari/tokens/styles";
```

Styles are written in the `design-system.components` CSS layer so they compose with your app's cascade.

## Design tokens

This package reads from `@virtari/tokens` CSS variables. Import the token layer once at the root of your app:

```ts
import "@virtari/tokens";
```

Every visual primitive can be themed by overriding `--vds-*` custom properties.

## Accessibility & RTL

All components use logical CSS properties (`margin-inline`, `padding-block`, …) and `:dir(rtl)` overrides, so layouts flip automatically when the host document sets `dir="rtl"`.

## License

[MIT](./LICENSE) © Virtari

## Links

- [Repository](https://github.com/IamMrTrick/virtari-design-system)
- [Issues](https://github.com/IamMrTrick/virtari-design-system/issues)
- [Changelog](./CHANGELOG.md)
