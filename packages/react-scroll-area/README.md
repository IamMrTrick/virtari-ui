# @virtari-packages/react-scroll-area

Virtari scroll area — accessible React component built on CSS variables and logical properties.

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
npm install @virtari-packages/react-scroll-area
# or
pnpm add @virtari-packages/react-scroll-area
# or
yarn add @virtari-packages/react-scroll-area
```

## Peer dependencies

`react` `^18` or `^19`, alongside `react-dom`.

## Usage

```tsx
import { useRef } from "react";
import { ScrollArea } from "@virtari-packages/react-scroll-area";

function Document() {
  const viewport = useRef<HTMLDivElement>(null);
  return (
    <ScrollArea
      style={{ height: 400, borderRadius: 24 }}
      viewportRef={viewport}
      viewportProps={{ role: "region", "aria-label": "Document" }}
    >
      {/* Long content. The viewport preserves native wheel, touch and keyboard scroll. */}
    </ScrollArea>
  );
}
```

The default `type="smart"` displays an overflowing scrollbar during scrolling,
pointer hover, or focus within the area. It fades after `scrollHideDelay` (900 ms)
when those interactions stop. `type="auto"`, `"always"`, `"hover"`, and `"scroll"`
retain the primitive's behavior. Tracks never reserve layout space. High contrast
mode keeps smart tracks visible; reduced motion removes the fade.

Use `viewportRef` to read or restore native scroll position, and `viewportProps`
for viewport labels and events. The viewport is keyboard focusable by default;
pass `viewportProps={{ tabIndex: -1 }}` when an existing focusable child already
provides the appropriate keyboard entry point. `hideScrollbar` remains an
explicit opt-out. Set `--scroll-area-track-inset` to keep a track clear of large
rounded corners; it defaults to 4 px.

### Import styles

```ts
import "@virtari-packages/react-scroll-area/styles";
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
