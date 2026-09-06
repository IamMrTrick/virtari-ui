# @virtari-packages/react-switch

Virtari switch — accessible React component built on CSS variables and logical properties.

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
npm install @virtari-packages/react-switch
# or
pnpm add @virtari-packages/react-switch
# or
yarn add @virtari-packages/react-switch
```

## Peer dependencies

`react` `^18` or `^19`, alongside `react-dom`.

## Usage

```tsx
import { Switch } from "@virtari-packages/react-switch";

<label htmlFor="updates">Email updates</label>
<Switch id="updates" name="updates" defaultChecked />
```

Use `checked` / `onCheckedChange` for controlled state or `defaultChecked` for
uncontrolled state. The callback receives a boolean. A switch renders its track
and thumb; provide a stable visible label or an accessible name.

`size` accepts `sm`, `md` (default), or `lg`. The small 18px track is intended for
compact layouts, so provide a larger labeled target for touch interfaces. Track
and thumb remain fully rounded in every radius mode to preserve their geometry.

Dragging is enabled by default. Set `dragEnabled={false}` for native click and
keyboard activation only. Consumer pointer handlers compose with dragging;
preventing the pointer event's default cancels that drag step. A tap follows
`onClick` and honors `preventDefault()`. A completed drag commits through
`onCheckedChange` and suppresses the following pointer click. Space and Enter
toggle the focused switch.

`name`, `value`, `required`, `disabled`, and `form` reach native form behavior.
Reset restores the initial uncontrolled state, including external forms; a
canceled reset preserves the current value. Controlled consumers receive the
initial state as a reset request and decide whether to accept it. The submitted
value remains consistent when they decline. Associate supporting or error text
with `aria-describedby`; use `aria-invalid` when a surrounding validation flow
needs to identify an invalid setting.

### Import styles

```ts
import "@virtari-packages/react-switch/styles";
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
