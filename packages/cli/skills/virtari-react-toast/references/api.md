# @virtari-packages/react-toast API snapshot

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
  "./styles": "./dist/Toast.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `Toaster` (export) from `@virtari-packages/react-toast`; source: `packages/react-toast/src/index.ts`.
- `toast` (export) from `@virtari-packages/react-toast`; source: `packages/react-toast/src/index.ts`.
- `useToast` (export) from `@virtari-packages/react-toast`; source: `packages/react-toast/src/index.ts`.
- `toastStore` (export) from `@virtari-packages/react-toast`; source: `packages/react-toast/src/index.ts`.
- `createToastId` (export) from `@virtari-packages/react-toast`; source: `packages/react-toast/src/index.ts`.
- `ToastProvider` (export) from `@virtari-packages/react-toast`; source: `packages/react-toast/src/index.ts`.
- `ToastViewport` (export) from `@virtari-packages/react-toast`; source: `packages/react-toast/src/index.ts`.
- `ToastRoot` (export) from `@virtari-packages/react-toast`; source: `packages/react-toast/src/index.ts`.
- `ToastTitle` (export) from `@virtari-packages/react-toast`; source: `packages/react-toast/src/index.ts`.
- `ToastDescription` (export) from `@virtari-packages/react-toast`; source: `packages/react-toast/src/index.ts`.
- `ToastAction` (export) from `@virtari-packages/react-toast`; source: `packages/react-toast/src/index.ts`.
- `ToastClose` (export) from `@virtari-packages/react-toast`; source: `packages/react-toast/src/index.ts`.
- `ToastViewportProps` (type) from `@virtari-packages/react-toast`; source: `packages/react-toast/src/index.ts`.
- `ToastRootProps` (type) from `@virtari-packages/react-toast`; source: `packages/react-toast/src/index.ts`.
- `ToastTitleProps` (type) from `@virtari-packages/react-toast`; source: `packages/react-toast/src/index.ts`.
- `ToastDescriptionProps` (type) from `@virtari-packages/react-toast`; source: `packages/react-toast/src/index.ts`.
- `ToastActionProps` (type) from `@virtari-packages/react-toast`; source: `packages/react-toast/src/index.ts`.
- `ToastCloseProps` (type) from `@virtari-packages/react-toast`; source: `packages/react-toast/src/index.ts`.
- `ToastType` (type) from `@virtari-packages/react-toast`; source: `packages/react-toast/src/index.ts`.
- `ToastPosition` (type) from `@virtari-packages/react-toast`; source: `packages/react-toast/src/index.ts`.
- `ToastActionVariant` (type) from `@virtari-packages/react-toast`; source: `packages/react-toast/src/index.ts`.
- `ToastActionConfig` (type) from `@virtari-packages/react-toast`; source: `packages/react-toast/src/index.ts`.
- `ToastActions` (type) from `@virtari-packages/react-toast`; source: `packages/react-toast/src/index.ts`.
- `ToastOptions` (type) from `@virtari-packages/react-toast`; source: `packages/react-toast/src/index.ts`.
- `ToastData` (type) from `@virtari-packages/react-toast`; source: `packages/react-toast/src/index.ts`.
- `ToasterProps` (type) from `@virtari-packages/react-toast`; source: `packages/react-toast/src/index.ts`.
- `ToastTimerMode` (type) from `@virtari-packages/react-toast`; source: `packages/react-toast/src/index.ts`.
- `ToastPauseMode` (type) from `@virtari-packages/react-toast`; source: `packages/react-toast/src/index.ts`.
- `ToastPromiseMessages` (type) from `@virtari-packages/react-toast`; source: `packages/react-toast/src/index.ts`.
- `ToastConfirmOptions` (type) from `@virtari-packages/react-toast`; source: `packages/react-toast/src/index.ts`.
- `ToastUndoOptions` (type) from `@virtari-packages/react-toast`; source: `packages/react-toast/src/index.ts`.
- `UseToastReturn` (type) from `@virtari-packages/react-toast`; source: `packages/react-toast/src/index.ts`.

## Source type declarations

Source: `packages/react-toast/src/primitives.tsx`

```tsx
export interface ToastViewportProps
  extends ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport> {
  ref?: Ref<ComponentRef<typeof ToastPrimitive.Viewport>>;
}
```

Source: `packages/react-toast/src/primitives.tsx`

```tsx
export function ToastViewport({
  className,
  ref,
  ...props
}: ToastViewportProps);
```

Source: `packages/react-toast/src/primitives.tsx`

```tsx
export interface ToastRootProps
  extends ComponentPropsWithoutRef<typeof ToastPrimitive.Root> {
  ref?: Ref<ComponentRef<typeof ToastPrimitive.Root>>;
}
```

Source: `packages/react-toast/src/primitives.tsx`

```tsx
export function ToastRoot({ className, ref, ...props }: ToastRootProps);
```

Source: `packages/react-toast/src/primitives.tsx`

```tsx
export interface ToastTitleProps
  extends ComponentPropsWithoutRef<typeof ToastPrimitive.Title> {
  ref?: Ref<ComponentRef<typeof ToastPrimitive.Title>>;
}
```

Source: `packages/react-toast/src/primitives.tsx`

```tsx
export function ToastTitle({ className, ref, ...props }: ToastTitleProps);
```

Source: `packages/react-toast/src/primitives.tsx`

```tsx
export interface ToastDescriptionProps
  extends ComponentPropsWithoutRef<typeof ToastPrimitive.Description> {
  ref?: Ref<ComponentRef<typeof ToastPrimitive.Description>>;
}
```

Source: `packages/react-toast/src/primitives.tsx`

```tsx
export function ToastDescription({
  className,
  ref,
  ...props
}: ToastDescriptionProps);
```

Source: `packages/react-toast/src/primitives.tsx`

```tsx
export interface ToastActionProps
  extends ComponentPropsWithoutRef<typeof ToastPrimitive.Action> {
  ref?: Ref<ComponentRef<typeof ToastPrimitive.Action>>;
}
```

Source: `packages/react-toast/src/primitives.tsx`

```tsx
export function ToastAction({ className, ref, ...props }: ToastActionProps);
```

Source: `packages/react-toast/src/primitives.tsx`

```tsx
export interface ToastCloseProps
  extends ComponentPropsWithoutRef<typeof ToastPrimitive.Close> {
  ref?: Ref<ComponentRef<typeof ToastPrimitive.Close>>;
}
```

Source: `packages/react-toast/src/primitives.tsx`

```tsx
export function ToastClose({ className, ref, ...props }: ToastCloseProps);
```

Source: `packages/react-toast/src/store.ts`

```tsx
export function createToastId(): string;
```

Source: `packages/react-toast/src/toast.ts`

```tsx
export interface ToastPromiseMessages<T> {
  loading: ReactNode;
  success: ReactNode | ((data: T) => ReactNode);
  error: ReactNode | ((error: unknown) => ReactNode);
  description?: ReactNode;
  successDescription?: ReactNode | ((data: T) => ReactNode);
  errorDescription?: ReactNode | ((error: unknown) => ReactNode);
}
```

Source: `packages/react-toast/src/toast.ts`

```tsx
export interface ToastConfirmOptions
  extends Omit<ToastOptions, "title" | "description" | "actions"> {
  confirmLabel?: ReactNode;
  cancelLabel?: ReactNode;
  confirmVariant?: ToastActionConfig["variant"];
  cancelVariant?: ToastActionConfig["variant"];
}
```

Source: `packages/react-toast/src/toast.ts`

```tsx
export interface ToastUndoOptions
  extends Omit<ToastOptions, "title" | "description" | "actions"> {
  undoLabel?: ReactNode;
}
```

Source: `packages/react-toast/src/Toaster.tsx`

```tsx
export function Toaster({
  position = "top-right",
  duration = 4000,
  visibleToasts = 3,
  expand = false,
  hotkey,
  swipeThreshold = 50,
  dir,
  className,
  closeLabel = "Close notification",
  maxToasts,
  label = "Notifications",
  timerMode = "parallel",
  pauseMode = "hover",
}: ToasterProps);
```

Source: `packages/react-toast/src/types.ts`

```tsx
export type ToastType =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "loading"
  | "default";
```

Source: `packages/react-toast/src/types.ts`

```tsx
export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";
```

Source: `packages/react-toast/src/types.ts`

```tsx
export type ToastActionVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "danger"
  | "success";
```

Source: `packages/react-toast/src/types.ts`

```tsx
export type ToastTimerMode = "parallel" | "sequential";
```

Source: `packages/react-toast/src/types.ts`

```tsx
export type ToastPauseMode = "hover" | "press";
```

Source: `packages/react-toast/src/types.ts`

```tsx
export interface ToastActionConfig {
  label: ReactNode;
  onClick: () => void;
  variant?: ToastActionVariant;
  closeOnClick?: boolean;
}
```

Source: `packages/react-toast/src/types.ts`

```tsx
export interface ToastActions {
  primary?: ToastActionConfig;
  secondary?: ToastActionConfig;
}
```

Source: `packages/react-toast/src/types.ts`

```tsx
export interface ToastOptions {
  id?: string;
  type?: ToastType;
  title?: ReactNode;
  description?: ReactNode;
  action?: ToastActionConfig;
  actions?: ToastActions;
  duration?: number;
  dismissible?: boolean;
  icon?: ReactNode | false;
}
```

Source: `packages/react-toast/src/types.ts`

```tsx
export interface ToastData {
  id: string;
  type: ToastType;
  title?: ReactNode;
  description?: ReactNode;
  action?: ToastActionConfig;
  actions?: ToastActions;
  duration: number;
  dismissible: boolean;
  icon?: ReactNode | false;
  createdAt: number;
}
```

Source: `packages/react-toast/src/types.ts`

```tsx
export interface ToasterProps {
  position?: ToastPosition;
  duration?: number;
  visibleToasts?: number;
  expand?: boolean;
  hotkey?: string[];
  swipeThreshold?: number;
  dir?: "ltr" | "rtl";
  className?: string;
  closeLabel?: string;
  maxToasts?: number;
  label?: string;
  timerMode?: ToastTimerMode;
  pauseMode?: ToastPauseMode;
}
```

Source: `packages/react-toast/src/useToast.ts`

```tsx
export interface UseToastReturn {
  toasts: readonly ToastData[];
  toast: typeof toast;
  dismiss: (id?: string) => void;
  dismissAll: () => void;
}
```

Source: `packages/react-toast/src/useToast.ts`

```tsx
export function useToast(): UseToastReturn;
```

## Source files

- `packages/react-toast/src/icons.tsx`
- `packages/react-toast/src/index.ts`
- `packages/react-toast/src/primitives.tsx`
- `packages/react-toast/src/store.ts`
- `packages/react-toast/src/Toast.css`
- `packages/react-toast/src/Toast.tokens.css`
- `packages/react-toast/src/toast.ts`
- `packages/react-toast/src/Toaster.tsx`
- `packages/react-toast/src/ToastItem.tsx`
- `packages/react-toast/src/types.ts`
- `packages/react-toast/src/useToast.ts`
- `packages/react-toast/package.json`
