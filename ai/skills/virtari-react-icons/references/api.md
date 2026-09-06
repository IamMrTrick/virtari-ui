# @virtari-packages/react-icons API snapshot

Version: 0.4.0. Export entry points (exact package.json map):

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
  "./styles": "./dist/Icon.css",
  "./tokens": "./dist/Icon.tokens.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `TablerIcon` (type) from `@virtari-packages/react-icons`; source: `packages/react-icons/src/index.ts`.
- `TablerIconProps` (type) from `@virtari-packages/react-icons`; source: `packages/react-icons/src/index.ts`.
- `Icon` (export) from `@virtari-packages/react-icons`; source: `packages/react-icons/src/index.ts`.
- `IconProps` (type) from `@virtari-packages/react-icons`; source: `packages/react-icons/src/index.ts`.
- `IconSize` (type) from `@virtari-packages/react-icons`; source: `packages/react-icons/src/index.ts`.
- `IconColor` (type) from `@virtari-packages/react-icons`; source: `packages/react-icons/src/index.ts`.
- `IconProvider` (export) from `@virtari-packages/react-icons`; source: `packages/react-icons/src/index.ts`.
- `useIconDefaults` (export) from `@virtari-packages/react-icons`; source: `packages/react-icons/src/index.ts`.
- `IconContext` (export) from `@virtari-packages/react-icons`; source: `packages/react-icons/src/index.ts`.
- `IconDefaults` (type) from `@virtari-packages/react-icons`; source: `packages/react-icons/src/index.ts`.
- `IconProviderProps` (type) from `@virtari-packages/react-icons`; source: `packages/react-icons/src/index.ts`.

## Source type declarations

Source: `packages/react-icons/src/Icon.tsx`

```tsx
export type IconSize = "xs" | "sm" | "md" | "lg" | "xl" | number;
```

Source: `packages/react-icons/src/Icon.tsx`

```tsx
export type IconColor =
  | "current"
  | "muted"
  | "subtle"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | (string & {});
```

Source: `packages/react-icons/src/Icon.tsx`

```tsx
export type TablerIconComponent = ForwardRefExoticComponent<
  TablerIconProps & RefAttributes<SVGSVGElement>
>;
```

Source: `packages/react-icons/src/Icon.tsx`

```tsx
export interface IconProps extends Omit<TablerIconProps, "size" | "color" | "ref"> {
  icon: TablerIconComponent;
  size?: IconSize;
  color?: IconColor;
  label?: string;
  ref?: Ref<SVGSVGElement>;
}
```

Source: `packages/react-icons/src/Icon.tsx`

```tsx
export function Icon({
  icon: TablerComp,
  size,
  color,
  stroke,
  label,
  className,
  ref,
  ...rest
}: IconProps);
```

Source: `packages/react-icons/src/IconProvider.tsx`

```tsx
export interface IconDefaults {
  size?: IconSize;
  color?: IconColor;
  stroke?: number | string;
}
```

Source: `packages/react-icons/src/IconProvider.tsx`

```tsx
export function useIconDefaults(): IconDefaults;
```

Source: `packages/react-icons/src/IconProvider.tsx`

```tsx
export interface IconProviderProps extends IconDefaults {
  children: ReactNode;
}
```

Source: `packages/react-icons/src/IconProvider.tsx`

```tsx
export function IconProvider({ children, size, color, stroke }: IconProviderProps);
```

## Source files

- `packages/react-icons/src/Icon.css`
- `packages/react-icons/src/Icon.tokens.css`
- `packages/react-icons/src/Icon.tsx`
- `packages/react-icons/src/IconProvider.tsx`
- `packages/react-icons/src/index.ts`
- `packages/react-icons/package.json`

## Dependency re-exports

This package also forwards dependency exports. Explicit local exports take precedence over export-star names. Read [dependency names](external-exports.md) only when selecting a forwarded symbol.
