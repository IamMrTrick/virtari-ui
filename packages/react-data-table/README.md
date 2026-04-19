# @virtari/react-data-table

Virtari data table — accessible React component built on CSS variables and logical properties.

---

## Install

```bash
npm install @virtari/react-data-table
# or
pnpm add @virtari/react-data-table
# or
yarn add @virtari/react-data-table
```

## Peer dependencies

Requires `react` `^18` or `^19` alongside `react-dom`.

## Usage

```tsx
import { /* ... */ } from "@virtari/react-data-table";
```

### Import styles

```ts
import "@virtari/react-data-table/styles";
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
