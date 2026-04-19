# @virtari/utilities

Utility CSS classes (spacing, sizing, layout, z-index) driven by Virtari tokens.

---

## Install

```bash
npm install @virtari/utilities
# or
pnpm add @virtari/utilities
# or
yarn add @virtari/utilities
```

## Peer dependencies

Requires `react` `^18` or `^19` alongside `react-dom`.

## Usage

```tsx
import { /* ... */ } from "@virtari/utilities";
```

### Import styles

```ts
import "@virtari/utilities/styles";
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
