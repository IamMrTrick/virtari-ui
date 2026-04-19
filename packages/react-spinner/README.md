# @virtari/react-spinner

Virtari spinner — accessible React component built on CSS variables and logical properties.

---

## Install

```bash
npm install @virtari/react-spinner
# or
pnpm add @virtari/react-spinner
# or
yarn add @virtari/react-spinner
```

## Peer dependencies

Requires `react` `^18` or `^19` alongside `react-dom`.

## Usage

```tsx
import { /* ... */ } from "@virtari/react-spinner";
```

### Import styles

```ts
import "@virtari/react-spinner/styles";
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
