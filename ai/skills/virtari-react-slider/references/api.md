# @virtari-packages/react-slider API snapshot

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
  "./styles": "./dist/Slider.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `Slider` (export) from `@virtari-packages/react-slider`; source: `packages/react-slider/src/index.ts`.
- `SliderProps` (type) from `@virtari-packages/react-slider`; source: `packages/react-slider/src/index.ts`.

## Source type declarations

Source: `packages/react-slider/src/Slider.tsx`

```tsx
export interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  ref?: Ref<ComponentRef<typeof SliderPrimitive.Root>>;
}
```

Source: `packages/react-slider/src/Slider.tsx`

```tsx
export function Slider({
  className,
  ref,
  value,
  defaultValue,
  min = 0,
  max = 100,
  minStepsBetweenThumbs = 1,
  dir,
  ...props
}: SliderProps);
```

## Source files

- `packages/react-slider/src/index.ts`
- `packages/react-slider/src/Slider.css`
- `packages/react-slider/src/Slider.tsx`
- `packages/react-slider/package.json`
