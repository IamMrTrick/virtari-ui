# @virtari-packages/react-card API snapshot

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
  "./styles": "./dist/Card.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `Card` (export) from `@virtari-packages/react-card`; source: `packages/react-card/src/index.ts`.
- `CardHeader` (export) from `@virtari-packages/react-card`; source: `packages/react-card/src/index.ts`.
- `CardTitle` (export) from `@virtari-packages/react-card`; source: `packages/react-card/src/index.ts`.
- `CardDescription` (export) from `@virtari-packages/react-card`; source: `packages/react-card/src/index.ts`.
- `CardContent` (export) from `@virtari-packages/react-card`; source: `packages/react-card/src/index.ts`.
- `CardFooter` (export) from `@virtari-packages/react-card`; source: `packages/react-card/src/index.ts`.
- `CardVariant` (type) from `@virtari-packages/react-card`; source: `packages/react-card/src/index.ts`.
- `CardSize` (type) from `@virtari-packages/react-card`; source: `packages/react-card/src/index.ts`.
- `CardProps` (type) from `@virtari-packages/react-card`; source: `packages/react-card/src/index.ts`.
- `CardHeaderProps` (type) from `@virtari-packages/react-card`; source: `packages/react-card/src/index.ts`.
- `CardTitleProps` (type) from `@virtari-packages/react-card`; source: `packages/react-card/src/index.ts`.
- `CardDescriptionProps` (type) from `@virtari-packages/react-card`; source: `packages/react-card/src/index.ts`.
- `CardContentProps` (type) from `@virtari-packages/react-card`; source: `packages/react-card/src/index.ts`.
- `CardFooterProps` (type) from `@virtari-packages/react-card`; source: `packages/react-card/src/index.ts`.

## Source type declarations

Source: `packages/react-card/src/Card.tsx`

```tsx
export type CardVariant = "surface" | "outline" | "soft" | "ghost";
```

Source: `packages/react-card/src/Card.tsx`

```tsx
export type CardSize = "sm" | "md" | "lg";
```

Source: `packages/react-card/src/Card.tsx`

```tsx
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  size?: CardSize;
  interactive?: boolean;
  ref?: Ref<HTMLDivElement>;
}
```

Source: `packages/react-card/src/Card.tsx`

```tsx
export function Card({
  variant = "surface",
  size = "md",
  interactive = false,
  className,
  ref,
  ...props
}: CardProps);
```

Source: `packages/react-card/src/Card.tsx`

```tsx
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}
```

Source: `packages/react-card/src/Card.tsx`

```tsx
export function CardHeader({ className, ref, ...props }: CardHeaderProps);
```

Source: `packages/react-card/src/Card.tsx`

```tsx
export interface CardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  ref?: Ref<HTMLHeadingElement>;
}
```

Source: `packages/react-card/src/Card.tsx`

```tsx
export function CardTitle({ className, ref, ...props }: CardTitleProps);
```

Source: `packages/react-card/src/Card.tsx`

```tsx
export interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  ref?: Ref<HTMLParagraphElement>;
}
```

Source: `packages/react-card/src/Card.tsx`

```tsx
export function CardDescription({
  className,
  ref,
  ...props
}: CardDescriptionProps);
```

Source: `packages/react-card/src/Card.tsx`

```tsx
export interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}
```

Source: `packages/react-card/src/Card.tsx`

```tsx
export function CardContent({ className, ref, ...props }: CardContentProps);
```

Source: `packages/react-card/src/Card.tsx`

```tsx
export interface CardFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}
```

Source: `packages/react-card/src/Card.tsx`

```tsx
export function CardFooter({ className, ref, ...props }: CardFooterProps);
```

Source: `packages/react-card/src/useNestedCardRadius.ts`

```tsx
export function useNestedCardRadius(ref: RefObject<HTMLDivElement | null>);
```

## Source files

- `packages/react-card/src/Card.css`
- `packages/react-card/src/Card.tokens.css`
- `packages/react-card/src/Card.tsx`
- `packages/react-card/src/index.ts`
- `packages/react-card/src/useNestedCardRadius.ts`
- `packages/react-card/package.json`
