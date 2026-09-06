# @virtari-packages/react-drawer API snapshot

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
  "./styles": "./dist/Drawer.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `Drawer` (export) from `@virtari-packages/react-drawer`; source: `packages/react-drawer/src/index.ts`.
- `DrawerTrigger` (export) from `@virtari-packages/react-drawer`; source: `packages/react-drawer/src/index.ts`.
- `DrawerClose` (export) from `@virtari-packages/react-drawer`; source: `packages/react-drawer/src/index.ts`.
- `DrawerOverlay` (export) from `@virtari-packages/react-drawer`; source: `packages/react-drawer/src/index.ts`.
- `DrawerContent` (export) from `@virtari-packages/react-drawer`; source: `packages/react-drawer/src/index.ts`.
- `DrawerHandle` (export) from `@virtari-packages/react-drawer`; source: `packages/react-drawer/src/index.ts`.
- `DrawerHeader` (export) from `@virtari-packages/react-drawer`; source: `packages/react-drawer/src/index.ts`.
- `DrawerTitle` (export) from `@virtari-packages/react-drawer`; source: `packages/react-drawer/src/index.ts`.
- `DrawerDescription` (export) from `@virtari-packages/react-drawer`; source: `packages/react-drawer/src/index.ts`.
- `DrawerFooter` (export) from `@virtari-packages/react-drawer`; source: `packages/react-drawer/src/index.ts`.
- `DrawerBody` (export) from `@virtari-packages/react-drawer`; source: `packages/react-drawer/src/index.ts`.
- `DrawerProps` (type) from `@virtari-packages/react-drawer`; source: `packages/react-drawer/src/index.ts`.
- `DrawerOverlayProps` (type) from `@virtari-packages/react-drawer`; source: `packages/react-drawer/src/index.ts`.
- `DrawerContentProps` (type) from `@virtari-packages/react-drawer`; source: `packages/react-drawer/src/index.ts`.
- `DrawerHandleProps` (type) from `@virtari-packages/react-drawer`; source: `packages/react-drawer/src/index.ts`.
- `DrawerHeaderProps` (type) from `@virtari-packages/react-drawer`; source: `packages/react-drawer/src/index.ts`.
- `DrawerTitleProps` (type) from `@virtari-packages/react-drawer`; source: `packages/react-drawer/src/index.ts`.
- `DrawerDescriptionProps` (type) from `@virtari-packages/react-drawer`; source: `packages/react-drawer/src/index.ts`.
- `DrawerFooterProps` (type) from `@virtari-packages/react-drawer`; source: `packages/react-drawer/src/index.ts`.
- `DrawerBodyProps` (type) from `@virtari-packages/react-drawer`; source: `packages/react-drawer/src/index.ts`.
- `Direction` (type) from `@virtari-packages/react-drawer`; source: `packages/react-drawer/src/index.ts`.
- `DrawerDeclaredSize` (type) from `@virtari-packages/react-drawer`; source: `packages/react-drawer/src/index.ts`.
- `DrawerHeaderVariant` (type) from `@virtari-packages/react-drawer`; source: `packages/react-drawer/src/index.ts`.
- `DrawerIndicatorPlacement` (type) from `@virtari-packages/react-drawer`; source: `packages/react-drawer/src/index.ts`.
- `DrawerMinimizedState` (type) from `@virtari-packages/react-drawer`; source: `packages/react-drawer/src/index.ts`.
- `DrawerOffset` (type) from `@virtari-packages/react-drawer`; source: `packages/react-drawer/src/index.ts`.
- `DrawerOpenState` (type) from `@virtari-packages/react-drawer`; source: `packages/react-drawer/src/index.ts`.
- `DrawerSizeMode` (type) from `@virtari-packages/react-drawer`; source: `packages/react-drawer/src/index.ts`.
- `DrawerSnapBehavior` (type) from `@virtari-packages/react-drawer`; source: `packages/react-drawer/src/index.ts`.
- `SnapPoint` (type) from `@virtari-packages/react-drawer`; source: `packages/react-drawer/src/index.ts`.
- `DrawerSnapPoint` (type) from `@virtari-packages/react-drawer`; source: `packages/react-drawer/src/index.ts`.

## Source type declarations

Source: `packages/react-drawer/src/Drawer.tsx`

```tsx
export interface DrawerProps {
  children: ReactNode;
  direction?: Direction;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  sizeMode?: DrawerSizeMode;
  size?: DrawerDeclaredSize;
  offset?: DrawerOffset;
  snapPoints?: readonly SnapPoint[];
  openStates?: readonly DrawerOpenState[];
  activeOpenState?: string | null;
  defaultOpenState?: string;
  onActiveOpenStateChange?: (value: string | null) => void;
  activeSnapPoint?: SnapPoint;
  defaultSnapPoint?: SnapPoint;
  onActiveSnapPointChange?: (value: SnapPoint) => void;
  minimizedSize?: SnapPoint;
  minimizedState?: DrawerMinimizedState | SnapPoint;
  indicator?: DrawerIndicatorPlacement;
  headerVariant?: DrawerHeaderVariant;
  snapBehavior?: DrawerSnapBehavior;
  snapStepThreshold?: number;
  snapSkipThreshold?: number;
  closeThreshold?: number;
  velocityThreshold?: number;
  dragHandleOnly?: boolean;
  scaleBackground?: boolean;
  /** Allow a small, anchored size extension on overdrag without scaling content. */
  stretch?: boolean;
  modal?: boolean;
  dismissible?: boolean;
  preventAutoFocus?: boolean;
}
```

Source: `packages/react-drawer/src/Drawer.tsx`

```tsx
export function Drawer({
  children,
  direction = "bottom",
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange: controlledOnOpenChange,
  sizeMode = "adaptive",
  size,
  offset,
  snapPoints,
  openStates,
  activeOpenState,
  defaultOpenState,
  onActiveOpenStateChange,
  activeSnapPoint: controlledSnap,
  defaultSnapPoint,
  onActiveSnapPointChange,
  minimizedSize,
  minimizedState,
  indicator = "inside",
  headerVariant,
  snapBehavior = "staged",
  snapStepThreshold = 0.28,
  snapSkipThreshold = 0.86,
  closeThreshold = 0.5,
  velocityThreshold = 0.5,
  dragHandleOnly = false,
  scaleBackground = false,
  stretch = true,
  modal = true,
  dismissible = true,
  preventAutoFocus = true,
}: DrawerProps);
```

Source: `packages/react-drawer/src/Drawer.tsx`

```tsx
export interface DrawerOverlayProps
  extends ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> {}
```

Source: `packages/react-drawer/src/Drawer.tsx`

```tsx
export interface DrawerContentProps
  extends ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {}
```

Source: `packages/react-drawer/src/Drawer.tsx`

```tsx
export interface DrawerHandleProps extends ComponentPropsWithoutRef<"div"> {
  placement?: DrawerIndicatorPlacement;
}
```

Source: `packages/react-drawer/src/Drawer.tsx`

```tsx
export interface DrawerHeaderProps extends ComponentPropsWithoutRef<"div"> {
  variant?: DrawerHeaderVariant;
}
```

Source: `packages/react-drawer/src/Drawer.tsx`

```tsx
export interface DrawerTitleProps
  extends ComponentPropsWithoutRef<typeof DialogPrimitive.Title> {}
```

Source: `packages/react-drawer/src/Drawer.tsx`

```tsx
export interface DrawerDescriptionProps
  extends ComponentPropsWithoutRef<typeof DialogPrimitive.Description> {}
```

Source: `packages/react-drawer/src/Drawer.tsx`

```tsx
export interface DrawerBodyProps extends ComponentPropsWithoutRef<"div"> {}
```

Source: `packages/react-drawer/src/Drawer.tsx`

```tsx
export interface DrawerFooterProps extends ComponentPropsWithoutRef<"div"> {}
```

Source: `packages/react-drawer/src/DrawerContext.tsx`

```tsx
export interface DrawerContextValue {
  direction: Direction;
  open: boolean;
  present: boolean;
  dragging: boolean;
  dismissible: boolean;
  dragHandleOnly: boolean;
  scaleBackground: boolean;
  stretch: boolean;
  preventAutoFocus: boolean;
  sizeMode: DrawerSizeMode;
  size?: DrawerDeclaredSize;
  offset?: DrawerOffset;
  indicator: DrawerIndicatorPlacement;
  mountedIndicator: DrawerIndicatorPlacement | null;
  headerVariant: DrawerHeaderVariant;
  snapPoints: readonly SnapPoint[];
  activeSnapPoint: SnapPoint;
  minimizedSize?: SnapPoint;
  snapBehavior: DrawerSnapBehavior;
  closeThreshold: number;
  velocityThreshold: number;
  snapStepThreshold: number;
  snapSkipThreshold: number;
  contentRef: RefObject<HTMLDivElement | null>;
  overlayRef: RefObject<HTMLDivElement | null>;
  headerRef: RefObject<HTMLDivElement | null>;
  bodyRef: RefObject<HTMLDivElement | null>;
  handleRef: RefObject<HTMLDivElement | null>;
  setMountedIndicator: Dispatch<SetStateAction<DrawerIndicatorPlacement | null>>;
  onOpenChange: (open: boolean) => void;
  onSnapPointChange: (value: SnapPoint) => void;
  setDragging: (value: boolean) => void;
}
```

Source: `packages/react-drawer/src/DrawerContext.tsx`

```tsx
export function useDrawerContext(): DrawerContextValue;
```

Source: `packages/react-drawer/src/useDrawerDrag.ts`

```tsx
export interface DragConfig {
  direction: Direction;
  drawerSize: number;
  snapSizes: readonly number[];
  currentSnapIndex: number;
  fromMinimized: boolean;
  minimizedSize: number | null;
  getCurrentSize: () => number;
  closeThreshold: number;
  velocityThreshold: number;
  snapBehavior: DrawerSnapBehavior;
  snapStepThreshold: number;
  snapSkipThreshold: number;
  dismissible: boolean;
  dragHandleOnly: boolean;
  onDragStart: () => void;
  onDragMove: (sizePx: number) => void;
  onDragEnd: (target: SettleTarget) => void;
  getContentEl: () => HTMLElement | null;
  getHeaderEl?: () => HTMLElement | null;
  getHandleEl: () => HTMLElement | null;
  getScrollableEl: () => HTMLElement | null;
}
```

Source: `packages/react-drawer/src/useDrawerDrag.ts`

```tsx
export function useDrawerDrag(config: DragConfig);
```

Source: `packages/react-drawer/src/utils.ts`

```tsx
export type Direction = "top" | "bottom" | "left" | "right";
```

Source: `packages/react-drawer/src/utils.ts`

```tsx
export type DrawerSizeMode = "adaptive" | "full" | "fixed";
```

Source: `packages/react-drawer/src/utils.ts`

```tsx
export type DrawerSnapBehavior = "staged" | "closest";
```

Source: `packages/react-drawer/src/utils.ts`

```tsx
export type SnapPoint = number;
```

Source: `packages/react-drawer/src/utils.ts`

```tsx
export type DrawerIndicatorPlacement = "inside" | "outside" | "hidden" | "progress";
```

Source: `packages/react-drawer/src/utils.ts`

```tsx
export type DrawerHeaderVariant = "plain" | "bordered";
```

Source: `packages/react-drawer/src/utils.ts`

```tsx
export type DrawerDeclaredSize =
  | number
  | string
  | ((info: DrawerViewportInfo) => number | string);
```

Source: `packages/react-drawer/src/utils.ts`

```tsx
export type DrawerDirectionalValue<T> = T | Partial<Record<Direction, T>>;
```

Source: `packages/react-drawer/src/utils.ts`

```tsx
export type DrawerOffset = DrawerDirectionalValue<DrawerDeclaredSize>;
```

Source: `packages/react-drawer/src/utils.ts`

```tsx
export interface DrawerOpenState {
  id: string;
  size: SnapPoint;
  label?: string;
}
```

Source: `packages/react-drawer/src/utils.ts`

```tsx
export interface DrawerMinimizedState {
  id?: string;
  size: SnapPoint;
  label?: string;
}
```

Source: `packages/react-drawer/src/utils.ts`

```tsx
export interface DrawerViewportInfo {
  direction: Direction;
  viewportWidth: number;
  viewportHeight: number;
  availableSize: number;
  orientation: "portrait" | "landscape";
}
```

Source: `packages/react-drawer/src/utils.ts`

```tsx
export interface ResolvedSnap {
  size: number;
  value: SnapPoint;
  kind: "snap" | "minimized";
}
```

Source: `packages/react-drawer/src/utils.ts`

```tsx
export interface ResolvedSnapLayout {
  snaps: ResolvedSnap[];
  minimized: ResolvedSnap | null;
}
```

Source: `packages/react-drawer/src/utils.ts`

```tsx
export type SettleTarget =
  | { kind: "snap"; index: number }
  | { kind: "minimized" }
  | { kind: "close" };
```

Source: `packages/react-drawer/src/utils.ts`

```tsx
export function clamp(value: number, min: number, max: number): number;
```

Source: `packages/react-drawer/src/utils.ts`

```tsx
export function isDrawerDebugEnabled(): boolean;
```

Source: `packages/react-drawer/src/utils.ts`

```tsx
export function debugDrawer(event: string, payload: Record<string, unknown>);
```

Source: `packages/react-drawer/src/utils.ts`

```tsx
export function getAxis(direction: Direction): "x" | "y";
```

Source: `packages/react-drawer/src/utils.ts`

```tsx
export function getMainCoord(direction: Direction, x: number, y: number): number;
```

Source: `packages/react-drawer/src/utils.ts`

```tsx
export function getCrossCoord(direction: Direction, x: number, y: number): number;
```

Source: `packages/react-drawer/src/utils.ts`

```tsx
export function getOpenSign(direction: Direction, rtl = false): 1 | -1;
```

Source: `packages/react-drawer/src/utils.ts`

```tsx
export function getViewportRect(): { width: number; height: number };
```

Source: `packages/react-drawer/src/utils.ts`

```tsx
export function getViewportSize(direction: Direction): number;
```

Source: `packages/react-drawer/src/utils.ts`

```tsx
export function getViewportInfo(
  direction: Direction,
  availableSize: number,
): DrawerViewportInfo;
```

Source: `packages/react-drawer/src/utils.ts`

```tsx
export function getElementSize(el: HTMLElement | null, direction: Direction): number;
```

Source: `packages/react-drawer/src/utils.ts`

```tsx
export function getTranslate(
  direction: Direction,
  openPx: number,
  totalPx: number,
  rtl = false,
): string;
```

Source: `packages/react-drawer/src/utils.ts`

```tsx
export function getStretchScale(openPx: number, totalPx: number): number;
```

Source: `packages/react-drawer/src/utils.ts`

```tsx
export function getVisualTransform(
  direction: Direction,
  openPx: number,
  totalPx: number,
  options?: { disableStretch?: boolean; rtl?: boolean },
): string;
```

Source: `packages/react-drawer/src/utils.ts`

```tsx
export function resolveSnaps(
  snapPoints: readonly SnapPoint[] | undefined,
  drawerSize: number,
  minimizedSize?: SnapPoint,
): ResolvedSnapLayout;
```

Source: `packages/react-drawer/src/utils.ts`

```tsx
export function findSnapIndexByValue(
  snaps: readonly ResolvedSnap[],
  value: SnapPoint,
): number;
```

Source: `packages/react-drawer/src/utils.ts`

```tsx
export function findNearestSnapIndex(
  snaps: readonly number[],
  size: number,
): number;
```

Source: `packages/react-drawer/src/utils.ts`

```tsx
export function getOverlayProgress(
  size: number,
  totalSize: number,
  startSize = 0,
): number;
```

Source: `packages/react-drawer/src/utils.ts`

```tsx
export function resolveDeclaredSize(
  value: DrawerDeclaredSize | undefined,
  info: DrawerViewportInfo,
): string | undefined;
```

Source: `packages/react-drawer/src/utils.ts`

```tsx
export function resolveDirectionalValue<T>(
  value: DrawerDirectionalValue<T> | undefined,
  direction: Direction,
): T | undefined;
```

Source: `packages/react-drawer/src/utils.ts`

```tsx
export function resolveDeclaredPixels(
  value: DrawerDeclaredSize | undefined,
  info: DrawerViewportInfo,
  direction: Direction,
): number;
```

Source: `packages/react-drawer/src/utils.ts`

```tsx
export function getDefaultAdaptiveSize(direction: Direction): string;
```

Source: `packages/react-drawer/src/utils.ts`

```tsx
export function rubberband(distance: number, dimension: number): number;
```

Source: `packages/react-drawer/src/utils.ts`

```tsx
export function applyRubberband(openPx: number, drawerSize: number): number;
```

Source: `packages/react-drawer/src/utils.ts`

```tsx
export function getBackgroundTransformOrigin(direction: Direction, rtl = false): string;
```

Source: `packages/react-drawer/src/utils.ts`

```tsx
export function getBackgroundStyles(
  progress: number,
  direction: Direction,
  rtl = false,
): { transform: string; borderRadius: string; transformOrigin: string };
```

Source: `packages/react-drawer/src/utils.ts`

```tsx
export function isAtScrollEdge(
  el: HTMLElement | null,
  direction: Direction,
  closingDelta: number,
): boolean;
```

Source: `packages/react-drawer/src/utils.ts`

```tsx
export function pickSettleTarget(args: {
  currentSize: number;
  startSize: number;
  startSnapIndex: number;
  fromMinimized: boolean;
  velocity: number;
  snaps: readonly number[];
  minimizedSize: number | null;
  velocityThreshold: number;
  closeThreshold: number;
  dismissible: boolean;
  snapBehavior: DrawerSnapBehavior;
  snapStepThreshold: number;
  snapSkipThreshold: number;
}): SettleTarget;
```

## Source files

- `packages/react-drawer/src/Drawer.css`
- `packages/react-drawer/src/Drawer.tokens.css`
- `packages/react-drawer/src/Drawer.tsx`
- `packages/react-drawer/src/DrawerContext.tsx`
- `packages/react-drawer/src/index.ts`
- `packages/react-drawer/src/useDrawerDrag.ts`
- `packages/react-drawer/src/utils.ts`
- `packages/react-drawer/package.json`
