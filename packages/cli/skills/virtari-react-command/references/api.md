# @virtari-packages/react-command API snapshot

Version: 0.3.0. Export entry points (exact package.json map):

```json
{
  ".": {
    "import": {
      "types": "./dist/index.d.ts",
      "default": "./dist/index.js"
    },
    "require": {
      "types": "./dist/index.d.cts",
      "default": "./dist/index.cjs"
    }
  },
  "./styles": "./dist/Command.css",
  "./tokens": "./dist/Command.tokens.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `CommandRoot` (export) from `@virtari-packages/react-command`; source: `packages/react-command/src/index.ts`.
- `CommandInput` (export) from `@virtari-packages/react-command`; source: `packages/react-command/src/index.ts`.
- `CommandList` (export) from `@virtari-packages/react-command`; source: `packages/react-command/src/index.ts`.
- `CommandGroup` (export) from `@virtari-packages/react-command`; source: `packages/react-command/src/index.ts`.
- `CommandItem` (export) from `@virtari-packages/react-command`; source: `packages/react-command/src/index.ts`.
- `CommandEmpty` (export) from `@virtari-packages/react-command`; source: `packages/react-command/src/index.ts`.
- `CommandLoading` (export) from `@virtari-packages/react-command`; source: `packages/react-command/src/index.ts`.
- `CommandSeparator` (export) from `@virtari-packages/react-command`; source: `packages/react-command/src/index.ts`.
- `CommandDialog` (export) from `@virtari-packages/react-command`; source: `packages/react-command/src/index.ts`.
- `CommandRootProps` (type) from `@virtari-packages/react-command`; source: `packages/react-command/src/index.ts`.
- `CommandInputProps` (type) from `@virtari-packages/react-command`; source: `packages/react-command/src/index.ts`.
- `CommandListProps` (type) from `@virtari-packages/react-command`; source: `packages/react-command/src/index.ts`.
- `CommandGroupProps` (type) from `@virtari-packages/react-command`; source: `packages/react-command/src/index.ts`.
- `CommandItemProps` (type) from `@virtari-packages/react-command`; source: `packages/react-command/src/index.ts`.
- `CommandEmptyProps` (type) from `@virtari-packages/react-command`; source: `packages/react-command/src/index.ts`.
- `CommandLoadingProps` (type) from `@virtari-packages/react-command`; source: `packages/react-command/src/index.ts`.
- `CommandSeparatorProps` (type) from `@virtari-packages/react-command`; source: `packages/react-command/src/index.ts`.
- `CommandDialogProps` (type) from `@virtari-packages/react-command`; source: `packages/react-command/src/index.ts`.
- `formatCombo` (export) from `@virtari-packages/react-command`; source: `packages/react-command/src/index.ts`.
- `parseCombo` (export) from `@virtari-packages/react-command`; source: `packages/react-command/src/index.ts`.
- `ParsedCombo` (type) from `@virtari-packages/react-command`; source: `packages/react-command/src/index.ts`.
- `useHotkey` (export) from `@virtari-packages/react-command`; source: `packages/react-command/src/index.ts`.
- `UseHotkeyOptions` (type) from `@virtari-packages/react-command`; source: `packages/react-command/src/index.ts`.
- `Command` (export) from `@virtari-packages/react-command`; source: `packages/react-command/src/index.ts`.

## Source type declarations

Source: `packages/react-command/src/Command.tsx`

```tsx
export interface CommandRootProps
  extends ComponentPropsWithoutRef<typeof CommandPrimitive> {}
```

Source: `packages/react-command/src/Command.tsx`

```tsx
export interface CommandInputProps
  extends ComponentPropsWithoutRef<typeof CommandPrimitive.Input> {}
```

Source: `packages/react-command/src/Command.tsx`

```tsx
export interface CommandListProps
  extends ComponentPropsWithoutRef<typeof CommandPrimitive.List> {}
```

Source: `packages/react-command/src/Command.tsx`

```tsx
export interface CommandGroupProps
  extends ComponentPropsWithoutRef<typeof CommandPrimitive.Group> {}
```

Source: `packages/react-command/src/Command.tsx`

```tsx
export interface CommandItemProps
  extends Omit<
    ComponentPropsWithoutRef<typeof CommandPrimitive.Item>,
    "children"
  > {
  leftSection?: ReactNode;
  rightSection?: ReactNode;
  /** Keyboard shortcut for this action (e.g. "mod+k"). Rendered visually via <Kbd>. */
  shortcut?: string;
  children?: ReactNode;
}
```

Source: `packages/react-command/src/Command.tsx`

```tsx
export interface CommandEmptyProps
  extends ComponentPropsWithoutRef<typeof CommandPrimitive.Empty> {}
```

Source: `packages/react-command/src/Command.tsx`

```tsx
export interface CommandLoadingProps
  extends ComponentPropsWithoutRef<typeof CommandPrimitive.Loading> {}
```

Source: `packages/react-command/src/Command.tsx`

```tsx
export interface CommandSeparatorProps
  extends ComponentPropsWithoutRef<typeof CommandPrimitive.Separator> {}
```

Source: `packages/react-command/src/CommandDialog.tsx`

```tsx
export interface CommandDialogProps
  extends Omit<DialogContentProps, "children" | "title"> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Optional global toggle combo. Not bound by default — consumer must opt in. */
  hotkey?: string | string[] | false;
  title?: ReactNode;
  description?: ReactNode;
  /** Hide title/description visually but keep them for screen readers. */
  hideTitle?: boolean;
  /**
   * Dialog width preset. At the default `"md"` the palette uses its own
   * `--command-dialog-width` (40rem / 640px — the conventional palette width)
   * instead of the plain dialog `md` width. Pass any other size to opt back
   * into the standard Dialog ramp.
   */
  size?: DialogContentProps["size"];
  children?: ReactNode;
}
```

Source: `packages/react-command/src/CommandDialog.tsx`

```tsx
export function CommandDialog({
  open,
  onOpenChange,
  hotkey,
  title = "Command palette",
  description,
  hideTitle = true,
  size = "md",
  className,
  children,
  onOpenAutoFocus,
  onCloseAutoFocus,
  ...contentProps
}: CommandDialogProps);
```

## Source files

- `packages/react-command/src/Command.css`
- `packages/react-command/src/Command.tokens.css`
- `packages/react-command/src/Command.tsx`
- `packages/react-command/src/CommandDialog.tsx`
- `packages/react-command/src/index.ts`
- `packages/react-command/src/shortcut.ts`
- `packages/react-command/package.json`
