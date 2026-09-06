# @virtari-packages/react-alert-dialog API snapshot

Version: 1.0.0. Export entry points (exact package.json map):

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
  "./styles": "./dist/AlertDialog.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `AlertDialog` (export) from `@virtari-packages/react-alert-dialog`; source: `packages/react-alert-dialog/src/index.ts`.
- `AlertDialogTrigger` (export) from `@virtari-packages/react-alert-dialog`; source: `packages/react-alert-dialog/src/index.ts`.
- `AlertDialogPortal` (export) from `@virtari-packages/react-alert-dialog`; source: `packages/react-alert-dialog/src/index.ts`.
- `AlertDialogOverlay` (export) from `@virtari-packages/react-alert-dialog`; source: `packages/react-alert-dialog/src/index.ts`.
- `AlertDialogContent` (export) from `@virtari-packages/react-alert-dialog`; source: `packages/react-alert-dialog/src/index.ts`.
- `AlertDialogHeader` (export) from `@virtari-packages/react-alert-dialog`; source: `packages/react-alert-dialog/src/index.ts`.
- `AlertDialogBody` (export) from `@virtari-packages/react-alert-dialog`; source: `packages/react-alert-dialog/src/index.ts`.
- `AlertDialogFooter` (export) from `@virtari-packages/react-alert-dialog`; source: `packages/react-alert-dialog/src/index.ts`.
- `AlertDialogTitle` (export) from `@virtari-packages/react-alert-dialog`; source: `packages/react-alert-dialog/src/index.ts`.
- `AlertDialogDescription` (export) from `@virtari-packages/react-alert-dialog`; source: `packages/react-alert-dialog/src/index.ts`.
- `AlertDialogAction` (export) from `@virtari-packages/react-alert-dialog`; source: `packages/react-alert-dialog/src/index.ts`.
- `AlertDialogCancel` (export) from `@virtari-packages/react-alert-dialog`; source: `packages/react-alert-dialog/src/index.ts`.
- `AlertDialogOverlayProps` (type) from `@virtari-packages/react-alert-dialog`; source: `packages/react-alert-dialog/src/index.ts`.
- `AlertDialogContentProps` (type) from `@virtari-packages/react-alert-dialog`; source: `packages/react-alert-dialog/src/index.ts`.
- `AlertDialogHeaderProps` (type) from `@virtari-packages/react-alert-dialog`; source: `packages/react-alert-dialog/src/index.ts`.
- `AlertDialogBodyProps` (type) from `@virtari-packages/react-alert-dialog`; source: `packages/react-alert-dialog/src/index.ts`.
- `AlertDialogFooterProps` (type) from `@virtari-packages/react-alert-dialog`; source: `packages/react-alert-dialog/src/index.ts`.
- `AlertDialogTitleProps` (type) from `@virtari-packages/react-alert-dialog`; source: `packages/react-alert-dialog/src/index.ts`.
- `AlertDialogDescriptionProps` (type) from `@virtari-packages/react-alert-dialog`; source: `packages/react-alert-dialog/src/index.ts`.
- `AlertDialogActionProps` (type) from `@virtari-packages/react-alert-dialog`; source: `packages/react-alert-dialog/src/index.ts`.
- `AlertDialogCancelProps` (type) from `@virtari-packages/react-alert-dialog`; source: `packages/react-alert-dialog/src/index.ts`.
- `AlertDialogSize` (type) from `@virtari-packages/react-alert-dialog`; source: `packages/react-alert-dialog/src/index.ts`.
- `AlertDialogAnimation` (type) from `@virtari-packages/react-alert-dialog`; source: `packages/react-alert-dialog/src/index.ts`.
- `AlertDialogIntent` (type) from `@virtari-packages/react-alert-dialog`; source: `packages/react-alert-dialog/src/index.ts`.
- `AlertDialogBackdrop` (type) from `@virtari-packages/react-alert-dialog`; source: `packages/react-alert-dialog/src/index.ts`.
- `AlertDialogHeaderVariant` (type) from `@virtari-packages/react-alert-dialog`; source: `packages/react-alert-dialog/src/index.ts`.

## Source type declarations

Source: `packages/react-alert-dialog/src/AlertDialog.tsx`

```tsx
export type AlertDialogSize = "sm" | "md" | "lg" | "xl" | "full";
```

Source: `packages/react-alert-dialog/src/AlertDialog.tsx`

```tsx
export type AlertDialogAnimation =
  | "scale"
  | "fade"
  | "slide-up"
  | "slide-down"
  | "zoom"
  | "bounce"
  | "none";
```

Source: `packages/react-alert-dialog/src/AlertDialog.tsx`

```tsx
export type AlertDialogIntent = "default" | "destructive" | "warning" | "success" | "info";
```

Source: `packages/react-alert-dialog/src/AlertDialog.tsx`

```tsx
export type AlertDialogBackdrop =
  | "default"
  | "blur"
  | "blur-strong"
  | "light"
  | "none";
```

Source: `packages/react-alert-dialog/src/AlertDialog.tsx`

```tsx
export type AlertDialogHeaderVariant = "plain" | "bordered";
```

Source: `packages/react-alert-dialog/src/AlertDialog.tsx`

```tsx
export interface AlertDialogOverlayProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay> {
  backdrop?: AlertDialogBackdrop;
  ref?: Ref<ComponentRef<typeof AlertDialogPrimitive.Overlay>>;
}
```

Source: `packages/react-alert-dialog/src/AlertDialog.tsx`

```tsx
export function AlertDialogOverlay({
  backdrop = "default",
  className,
  ref,
  ...props
}: AlertDialogOverlayProps);
```

Source: `packages/react-alert-dialog/src/AlertDialog.tsx`

```tsx
export interface AlertDialogContentProps extends PrimitiveContentProps {
  /** Max-width variant. Defaults to `"md"`. */
  size?: AlertDialogSize;
  /** Enter/exit animation preset. Defaults to `"scale"`. */
  animation?: AlertDialogAnimation;
  /** Top accent strip color. Defaults to `"destructive"` — alerts are usually risky. */
  intent?: AlertDialogIntent;
  /** Overlay style. Forwarded to the internal overlay. */
  backdrop?: AlertDialogBackdrop;
  /** When true, fills the viewport on narrow screens (<= 40rem). */
  responsive?: boolean;
  /** Custom portal target. */
  container?: HTMLElement | null;
  ref?: Ref<ComponentRef<typeof AlertDialogPrimitive.Content>>;
}
```

Source: `packages/react-alert-dialog/src/AlertDialog.tsx`

```tsx
export function AlertDialogContent({
  size = "md",
  animation = "scale",
  intent = "destructive",
  backdrop = "default",
  responsive,
  container,
  className,
  children,
  ref,
  ...props
}: AlertDialogContentProps);
```

Source: `packages/react-alert-dialog/src/AlertDialog.tsx`

```tsx
export interface AlertDialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertDialogHeaderVariant;
  ref?: Ref<HTMLDivElement>;
}
```

Source: `packages/react-alert-dialog/src/AlertDialog.tsx`

```tsx
export function AlertDialogHeader({
  variant = "plain",
  className,
  ref,
  ...props
}: AlertDialogHeaderProps);
```

Source: `packages/react-alert-dialog/src/AlertDialog.tsx`

```tsx
export interface AlertDialogBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}
```

Source: `packages/react-alert-dialog/src/AlertDialog.tsx`

```tsx
export function AlertDialogBody({ className, ref, ...props }: AlertDialogBodyProps);
```

Source: `packages/react-alert-dialog/src/AlertDialog.tsx`

```tsx
export interface AlertDialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}
```

Source: `packages/react-alert-dialog/src/AlertDialog.tsx`

```tsx
export function AlertDialogFooter({ className, ref, ...props }: AlertDialogFooterProps);
```

Source: `packages/react-alert-dialog/src/AlertDialog.tsx`

```tsx
export interface AlertDialogTitleProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title> {
  ref?: Ref<ComponentRef<typeof AlertDialogPrimitive.Title>>;
}
```

Source: `packages/react-alert-dialog/src/AlertDialog.tsx`

```tsx
export function AlertDialogTitle({ className, ref, ...props }: AlertDialogTitleProps);
```

Source: `packages/react-alert-dialog/src/AlertDialog.tsx`

```tsx
export interface AlertDialogDescriptionProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description> {
  ref?: Ref<ComponentRef<typeof AlertDialogPrimitive.Description>>;
}
```

Source: `packages/react-alert-dialog/src/AlertDialog.tsx`

```tsx
export function AlertDialogDescription({
  className,
  ref,
  ...props
}: AlertDialogDescriptionProps);
```

Source: `packages/react-alert-dialog/src/AlertDialog.tsx`

```tsx
export interface AlertDialogActionProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action> {
  ref?: Ref<ComponentRef<typeof AlertDialogPrimitive.Action>>;
}
```

Source: `packages/react-alert-dialog/src/AlertDialog.tsx`

```tsx
export function AlertDialogAction({ className, ref, ...props }: AlertDialogActionProps);
```

Source: `packages/react-alert-dialog/src/AlertDialog.tsx`

```tsx
export interface AlertDialogCancelProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel> {
  ref?: Ref<ComponentRef<typeof AlertDialogPrimitive.Cancel>>;
}
```

Source: `packages/react-alert-dialog/src/AlertDialog.tsx`

```tsx
export function AlertDialogCancel({ className, ref, ...props }: AlertDialogCancelProps);
```

## Source files

- `packages/react-alert-dialog/src/AlertDialog.css`
- `packages/react-alert-dialog/src/AlertDialog.tsx`
- `packages/react-alert-dialog/src/index.ts`
- `packages/react-alert-dialog/package.json`
