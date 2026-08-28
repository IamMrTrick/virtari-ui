# @virtari-packages/react-command

Virtari command palette — `cmdk` wrapper with grouped results, keyboard shortcuts, and a Dialog container.

> **Private package.** Published to GitHub Packages and consumable only with a GitHub Personal Access Token that has `read:packages` scope. See [Install from GitHub Packages](#install-from-github-packages) below.

---

## Demo

Live examples in the docs app:

- Inline `Command.Root` palette (no dialog)
- `CommandDialog` global palette bound to `Cmd+K` / `Ctrl+K`
- Async search with `shouldFilter={false}` + `Command.Loading`

→ [`http://localhost:5173/#/command`](http://localhost:5173/#/command)

Run the docs locally:

```bash
pnpm -C apps/docs dev
```

Demo source: [apps/docs/src/pages/CommandPage.tsx](../../apps/docs/src/pages/CommandPage.tsx)

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
npm install @virtari-packages/react-command
# or
pnpm add @virtari-packages/react-command
# or
yarn add @virtari-packages/react-command
```

## Peer dependencies

`react` `^18` or `^19`, alongside `react-dom`. `cmdk` is a regular dependency (not peer).

## Usage

### Inline palette

```tsx
import { Command } from "@virtari-packages/react-command";
import "@virtari-packages/react-command/styles";

<Command.Root>
  <Command.Input placeholder="Type a command…" />
  <Command.List>
    <Command.Empty>No results.</Command.Empty>
    <Command.Group heading="Navigation">
      <Command.Item value="users" shortcut="mod+u" onSelect={() => navigate("/users")}>
        Users
      </Command.Item>
    </Command.Group>
  </Command.List>
</Command.Root>
```

### Global Cmd+K dialog

```tsx
import { CommandDialog, Command } from "@virtari-packages/react-command";
import "@virtari-packages/react-command/styles";
import "@virtari-packages/react-dialog/styles";

function Palette() {
  const [open, setOpen] = useState(false);
  return (
    <CommandDialog open={open} onOpenChange={setOpen} hotkey="mod+k">
      <Command.Input placeholder="Type a command…" />
      <Command.List>
        <Command.Empty>No results.</Command.Empty>
        <Command.Group heading="Navigation">
          <Command.Item value="users" shortcut="mod+u" onSelect={...}>
            Users
          </Command.Item>
        </Command.Group>
      </Command.List>
    </CommandDialog>
  );
}
```

- `hotkey="mod+k"` auto-binds `Cmd+K` on macOS and `Ctrl+K` elsewhere. Pass `hotkey={false}` (or omit) to own toggling yourself.
- `Command.Item` accepts `leftSection`, `rightSection`, and `shortcut` (rendered via `<Kbd>` using platform-aware symbols on macOS).

### Async search

Turn off cmdk's built-in filter when your backend already filtered the result set:

```tsx
<Command.Root shouldFilter={false}>
  <Command.Input value={query} onValueChange={setQuery} />
  <Command.List>
    {loading ? <Command.Loading>Searching…</Command.Loading> : null}
    {/* server results */}
  </Command.List>
</Command.Root>
```

### `useHotkey`

This package re-exports the `useHotkey` hook from `@virtari-packages/utils`:

```ts
import { useHotkey } from "@virtari-packages/react-command";

useHotkey("mod+s", () => saveDoc(), { allowInInputs: true });
```

Combo grammar: `mod+k`, `ctrl+shift+p`, `alt+/`, `escape`. `mod` resolves to meta on macOS and ctrl elsewhere.

### Import styles

```ts
import "@virtari-packages/react-command/styles";
import "@virtari-packages/react-dialog/styles"; // only if you use <CommandDialog>
```

Styles sit in the `design-system.components` cascade layer.

## Design tokens

Defines `--vds-command-*` tokens for background, border, input, list max-height, item padding/states, group headings, separators, and kbd chips. Selected state uses `[aria-selected="true"]` (cmdk sets this automatically).

## Accessibility & RTL

- cmdk ships with full keyboard nav: `ArrowUp`/`ArrowDown`, `Home`/`End`, `Enter` to select, `PageUp`/`PageDown`
- `CommandDialog` uses our own Dialog — focus trap, escape to close, overlay, portal
- Title/description are rendered visually-hidden by default (`vds-sr-only`) so the dialog is accessible without a visible header
- Layout uses logical CSS properties; `leftSection` appears first in DOM order so it auto-flips in RTL

## Links

- [Repository](https://github.com/IamMrTrick/virtari-design-system)
- [Issues](https://github.com/IamMrTrick/virtari-design-system/issues)
- [Changelog](./CHANGELOG.md)

## License

Proprietary. See [LICENSE](./LICENSE).
