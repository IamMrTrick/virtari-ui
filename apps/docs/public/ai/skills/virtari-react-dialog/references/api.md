# @virtari-packages/react-dialog API snapshot

Version: 2.0.0. Export entry points (exact package.json map):

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
  "./styles": "./dist/Dialog.css",
  "./tokens": "./dist/Dialog.tokens.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `Dialog` (export) from `@virtari-packages/react-dialog`; source: `packages/react-dialog/src/index.ts`.
- `DialogTrigger` (export) from `@virtari-packages/react-dialog`; source: `packages/react-dialog/src/index.ts`.
- `DialogClose` (export) from `@virtari-packages/react-dialog`; source: `packages/react-dialog/src/index.ts`.
- `DialogPortal` (export) from `@virtari-packages/react-dialog`; source: `packages/react-dialog/src/index.ts`.
- `DialogOverlay` (export) from `@virtari-packages/react-dialog`; source: `packages/react-dialog/src/index.ts`.
- `DialogContent` (export) from `@virtari-packages/react-dialog`; source: `packages/react-dialog/src/index.ts`.
- `DialogHeader` (export) from `@virtari-packages/react-dialog`; source: `packages/react-dialog/src/index.ts`.
- `DialogBody` (export) from `@virtari-packages/react-dialog`; source: `packages/react-dialog/src/index.ts`.
- `DialogFooter` (export) from `@virtari-packages/react-dialog`; source: `packages/react-dialog/src/index.ts`.
- `DialogTitle` (export) from `@virtari-packages/react-dialog`; source: `packages/react-dialog/src/index.ts`.
- `DialogDescription` (export) from `@virtari-packages/react-dialog`; source: `packages/react-dialog/src/index.ts`.
- `DialogCloseIcon` (export) from `@virtari-packages/react-dialog`; source: `packages/react-dialog/src/index.ts`.
- `DialogOverlayProps` (type) from `@virtari-packages/react-dialog`; source: `packages/react-dialog/src/index.ts`.
- `DialogContentProps` (type) from `@virtari-packages/react-dialog`; source: `packages/react-dialog/src/index.ts`.
- `DialogHeaderProps` (type) from `@virtari-packages/react-dialog`; source: `packages/react-dialog/src/index.ts`.
- `DialogBodyProps` (type) from `@virtari-packages/react-dialog`; source: `packages/react-dialog/src/index.ts`.
- `DialogFooterProps` (type) from `@virtari-packages/react-dialog`; source: `packages/react-dialog/src/index.ts`.
- `DialogTitleProps` (type) from `@virtari-packages/react-dialog`; source: `packages/react-dialog/src/index.ts`.
- `DialogDescriptionProps` (type) from `@virtari-packages/react-dialog`; source: `packages/react-dialog/src/index.ts`.
- `DialogCloseIconProps` (type) from `@virtari-packages/react-dialog`; source: `packages/react-dialog/src/index.ts`.
- `DialogSize` (type) from `@virtari-packages/react-dialog`; source: `packages/react-dialog/src/index.ts`.
- `DialogAnimation` (type) from `@virtari-packages/react-dialog`; source: `packages/react-dialog/src/index.ts`.
- `DialogIntent` (type) from `@virtari-packages/react-dialog`; source: `packages/react-dialog/src/index.ts`.
- `DialogBackdrop` (type) from `@virtari-packages/react-dialog`; source: `packages/react-dialog/src/index.ts`.
- `DialogHeaderVariant` (type) from `@virtari-packages/react-dialog`; source: `packages/react-dialog/src/index.ts`.

## Source type declarations

Source: `packages/react-dialog/src/Dialog.tsx`

```tsx
export type DialogSize = "sm" | "md" | "lg" | "xl" | "full";
```

Source: `packages/react-dialog/src/Dialog.tsx`

```tsx
export type DialogAnimation =
  | "scale"
  | "fade"
  | "slide-up"
  | "slide-down"
  | "zoom"
  | "bounce"
  | "none";
```

Source: `packages/react-dialog/src/Dialog.tsx`

```tsx
export type DialogIntent = "default" | "destructive" | "warning" | "success" | "info";
```

Source: `packages/react-dialog/src/Dialog.tsx`

```tsx
export type DialogBackdrop =
  | "default"
  | "blur"
  | "blur-strong"
  | "light"
  | "none";
```

Source: `packages/react-dialog/src/Dialog.tsx`

```tsx
export type DialogHeaderVariant = "plain" | "bordered";
```

Source: `packages/react-dialog/src/Dialog.tsx`

```tsx
export interface DialogOverlayProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> {
  /** Visual style of the backdrop. */
  backdrop?: DialogBackdrop;
  ref?: Ref<ComponentRef<typeof DialogPrimitive.Overlay>>;
}
```

Source: `packages/react-dialog/src/Dialog.tsx`

```tsx
export function DialogOverlay({
  backdrop = "default",
  className,
  ref,
  ...props
}: DialogOverlayProps);
```

Source: `packages/react-dialog/src/Dialog.tsx`

```tsx
export interface DialogContentProps extends PrimitiveContentProps {
  /** Max-width variant. Defaults to `"md"`. */
  size?: DialogSize;
  /** Enter/exit animation preset. Defaults to `"scale"`. */
  animation?: DialogAnimation;
  /** Top accent strip color. Defaults to `"default"` (no strip). */
  intent?: DialogIntent;
  /** Overlay style. Forwarded to the internal `DialogOverlay`. */
  backdrop?: DialogBackdrop;
  /** When true, fills the viewport on narrow screens (<= 40rem). */
  responsive?: boolean;
  /** When true, renders a built-in close (X) button in the top-end corner. */
  showCloseButton?: boolean;
  /** Accessible label for the built-in close button. Defaults to `"Close"`. */
  closeButtonLabel?: string;
  /** Custom portal target. Falls back to `document.body`. */
  container?: HTMLElement | null;
  /** Block close when the user clicks/taps outside the content. */
  preventCloseOnOutsideClick?: boolean;
  /** Block close when Escape is pressed. */
  preventCloseOnEscape?: boolean;
  ref?: Ref<ComponentRef<typeof DialogPrimitive.Content>>;
}
```

Source: `packages/react-dialog/src/Dialog.tsx`

```tsx
export function DialogContent({
  size = "md",
  animation = "scale",
  intent = "default",
  backdrop = "default",
  responsive,
  showCloseButton,
  closeButtonLabel = "Close",
  container,
  preventCloseOnOutsideClick,
  preventCloseOnEscape,
  className,
  children,
  onEscapeKeyDown,
  onPointerDownOutside,
  onInteractOutside,
  ref,
  ...props
}: DialogContentProps);
```

Source: `packages/react-dialog/src/Dialog.tsx`

```tsx
export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** `"plain"` has no divider; `"bordered"` adds a bottom rule. */
  variant?: DialogHeaderVariant;
  ref?: Ref<HTMLDivElement>;
}
```

Source: `packages/react-dialog/src/Dialog.tsx`

```tsx
export function DialogHeader({
  variant = "plain",
  className,
  ref,
  ...props
}: DialogHeaderProps);
```

Source: `packages/react-dialog/src/Dialog.tsx`

```tsx
export interface DialogBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}
```

Source: `packages/react-dialog/src/Dialog.tsx`

```tsx
export function DialogBody({ className, ref, ...props }: DialogBodyProps);
```

Source: `packages/react-dialog/src/Dialog.tsx`

```tsx
export interface DialogTitleProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> {
  ref?: Ref<ComponentRef<typeof DialogPrimitive.Title>>;
}
```

Source: `packages/react-dialog/src/Dialog.tsx`

```tsx
export function DialogTitle({ className, ref, ...props }: DialogTitleProps);
```

Source: `packages/react-dialog/src/Dialog.tsx`

```tsx
export interface DialogDescriptionProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> {
  ref?: Ref<ComponentRef<typeof DialogPrimitive.Description>>;
}
```

Source: `packages/react-dialog/src/Dialog.tsx`

```tsx
export function DialogDescription({ className, ref, ...props }: DialogDescriptionProps);
```

Source: `packages/react-dialog/src/Dialog.tsx`

```tsx
export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}
```

Source: `packages/react-dialog/src/Dialog.tsx`

```tsx
export function DialogFooter({ className, ref, ...props }: DialogFooterProps);
```

Source: `packages/react-dialog/src/Dialog.tsx`

```tsx
export interface DialogCloseIconProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: Ref<HTMLButtonElement>;
}
```

Source: `packages/react-dialog/src/Dialog.tsx`

```tsx
export function DialogCloseIcon({
  className,
  children,
  "aria-label": ariaLabel = "Close",
  ref,
  ...props
}: DialogCloseIconProps);
```

## Source files

- `packages/react-dialog/src/Dialog.css`
- `packages/react-dialog/src/Dialog.tokens.css`
- `packages/react-dialog/src/Dialog.tsx`
- `packages/react-dialog/src/index.ts`
- `packages/react-dialog/package.json`
