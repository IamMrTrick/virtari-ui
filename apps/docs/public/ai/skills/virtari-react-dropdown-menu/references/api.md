# @virtari-packages/react-dropdown-menu API snapshot

Version: 1.1.0. Export entry points (exact package.json map):

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
  "./styles": "./dist/DropdownMenu.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `DropdownMenu` (export) from `@virtari-packages/react-dropdown-menu`; source: `packages/react-dropdown-menu/src/index.ts`.
- `DropdownMenuTrigger` (export) from `@virtari-packages/react-dropdown-menu`; source: `packages/react-dropdown-menu/src/index.ts`.
- `DropdownMenuContent` (export) from `@virtari-packages/react-dropdown-menu`; source: `packages/react-dropdown-menu/src/index.ts`.
- `DropdownMenuItem` (export) from `@virtari-packages/react-dropdown-menu`; source: `packages/react-dropdown-menu/src/index.ts`.
- `DropdownMenuSeparator` (export) from `@virtari-packages/react-dropdown-menu`; source: `packages/react-dropdown-menu/src/index.ts`.
- `DropdownMenuLabel` (export) from `@virtari-packages/react-dropdown-menu`; source: `packages/react-dropdown-menu/src/index.ts`.
- `DropdownMenuGroup` (export) from `@virtari-packages/react-dropdown-menu`; source: `packages/react-dropdown-menu/src/index.ts`.
- `DropdownMenuContentProps` (type) from `@virtari-packages/react-dropdown-menu`; source: `packages/react-dropdown-menu/src/index.ts`.
- `DropdownMenuItemProps` (type) from `@virtari-packages/react-dropdown-menu`; source: `packages/react-dropdown-menu/src/index.ts`.
- `DropdownMenuSeparatorProps` (type) from `@virtari-packages/react-dropdown-menu`; source: `packages/react-dropdown-menu/src/index.ts`.
- `DropdownMenuLabelProps` (type) from `@virtari-packages/react-dropdown-menu`; source: `packages/react-dropdown-menu/src/index.ts`.

## Source type declarations

Source: `packages/react-dropdown-menu/src/DropdownMenu.tsx`

```tsx
export interface DropdownMenuProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root> {
  /** Reading direction. Defaults to the document's active direction. */
  dir?: "ltr" | "rtl";
}
```

Source: `packages/react-dropdown-menu/src/DropdownMenu.tsx`

```tsx
export function DropdownMenu({ dir, ...props }: DropdownMenuProps);
```

Source: `packages/react-dropdown-menu/src/DropdownMenu.tsx`

```tsx
export interface DropdownMenuContentProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> {
  ref?: Ref<ComponentRef<typeof DropdownMenuPrimitive.Content>>;
}
```

Source: `packages/react-dropdown-menu/src/DropdownMenu.tsx`

```tsx
export function DropdownMenuContent({
  className,
  sideOffset = 4,
  ref,
  ...props
}: DropdownMenuContentProps);
```

Source: `packages/react-dropdown-menu/src/DropdownMenu.tsx`

```tsx
export interface DropdownMenuItemProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> {
  ref?: Ref<ComponentRef<typeof DropdownMenuPrimitive.Item>>;
}
```

Source: `packages/react-dropdown-menu/src/DropdownMenu.tsx`

```tsx
export function DropdownMenuItem({
  className,
  ref,
  ...props
}: DropdownMenuItemProps);
```

Source: `packages/react-dropdown-menu/src/DropdownMenu.tsx`

```tsx
export interface DropdownMenuSeparatorProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator> {
  ref?: Ref<ComponentRef<typeof DropdownMenuPrimitive.Separator>>;
}
```

Source: `packages/react-dropdown-menu/src/DropdownMenu.tsx`

```tsx
export function DropdownMenuSeparator({
  className,
  ref,
  ...props
}: DropdownMenuSeparatorProps);
```

Source: `packages/react-dropdown-menu/src/DropdownMenu.tsx`

```tsx
export interface DropdownMenuLabelProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> {
  ref?: Ref<ComponentRef<typeof DropdownMenuPrimitive.Label>>;
}
```

Source: `packages/react-dropdown-menu/src/DropdownMenu.tsx`

```tsx
export function DropdownMenuLabel({
  className,
  ref,
  ...props
}: DropdownMenuLabelProps);
```

## Source files

- `packages/react-dropdown-menu/src/DropdownMenu.css`
- `packages/react-dropdown-menu/src/DropdownMenu.tsx`
- `packages/react-dropdown-menu/src/index.ts`
- `packages/react-dropdown-menu/package.json`
