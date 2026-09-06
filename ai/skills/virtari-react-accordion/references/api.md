# @virtari-packages/react-accordion API snapshot

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
  "./styles": "./dist/Accordion.css",
  "./tokens": "./dist/Accordion.tokens.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `Accordion` (export) from `@virtari-packages/react-accordion`; source: `packages/react-accordion/src/index.ts`.
- `AccordionItem` (export) from `@virtari-packages/react-accordion`; source: `packages/react-accordion/src/index.ts`.
- `AccordionTrigger` (export) from `@virtari-packages/react-accordion`; source: `packages/react-accordion/src/index.ts`.
- `AccordionContent` (export) from `@virtari-packages/react-accordion`; source: `packages/react-accordion/src/index.ts`.
- `AccordionProps` (type) from `@virtari-packages/react-accordion`; source: `packages/react-accordion/src/index.ts`.
- `AccordionItemProps` (type) from `@virtari-packages/react-accordion`; source: `packages/react-accordion/src/index.ts`.
- `AccordionTriggerProps` (type) from `@virtari-packages/react-accordion`; source: `packages/react-accordion/src/index.ts`.
- `AccordionContentProps` (type) from `@virtari-packages/react-accordion`; source: `packages/react-accordion/src/index.ts`.
- `AccordionVariant` (type) from `@virtari-packages/react-accordion`; source: `packages/react-accordion/src/index.ts`.
- `AccordionSize` (type) from `@virtari-packages/react-accordion`; source: `packages/react-accordion/src/index.ts`.
- `AccordionColor` (type) from `@virtari-packages/react-accordion`; source: `packages/react-accordion/src/index.ts`.
- `AccordionIconType` (type) from `@virtari-packages/react-accordion`; source: `packages/react-accordion/src/index.ts`.
- `AccordionIconPosition` (type) from `@virtari-packages/react-accordion`; source: `packages/react-accordion/src/index.ts`.
- `AccordionHeadingLevel` (type) from `@virtari-packages/react-accordion`; source: `packages/react-accordion/src/index.ts`.
- `FAQAccordion` (export) from `@virtari-packages/react-accordion`; source: `packages/react-accordion/src/index.ts`.
- `FAQAccordionProps` (type) from `@virtari-packages/react-accordion`; source: `packages/react-accordion/src/index.ts`.
- `FAQItem` (type) from `@virtari-packages/react-accordion`; source: `packages/react-accordion/src/index.ts`.

## Source type declarations

Source: `packages/react-accordion/src/Accordion.tsx`

```tsx
export type AccordionVariant =
  | "plain"
  | "bordered"
  | "separated"
  | "filled"
  | "ghost"
  | "contained";
```

Source: `packages/react-accordion/src/Accordion.tsx`

```tsx
export type AccordionSize = "sm" | "md" | "lg";
```

Source: `packages/react-accordion/src/Accordion.tsx`

```tsx
export type AccordionColor =
  | "neutral"
  | "primary"
  | "accent"
  | "success"
  | "danger"
  | "warning";
```

Source: `packages/react-accordion/src/Accordion.tsx`

```tsx
export type AccordionIconType =
  | "chevron"
  | "plus-minus"
  | "arrow"
  | "caret"
  | "none";
```

Source: `packages/react-accordion/src/Accordion.tsx`

```tsx
export type AccordionIconPosition = "start" | "end";
```

Source: `packages/react-accordion/src/Accordion.tsx`

```tsx
export type AccordionHeadingLevel = "h2" | "h3" | "h4" | "h5" | "h6";
```

Source: `packages/react-accordion/src/Accordion.tsx`

```tsx
export type AccordionProps = PrimitiveAccordionRootProps & {
  /** Shape/frame. Default: `plain`. */
  variant?: AccordionVariant;
  /** Size preset. Default: `md`. */
  size?: AccordionSize;
  /** Intent palette for hover/open accent. Default: `neutral`. */
  color?: AccordionColor;
  /** Indicator icon type. Default: `chevron`. */
  iconType?: AccordionIconType;
  /** Which side of the trigger the icon sits on. Default: `end`. */
  iconPosition?: AccordionIconPosition;
  /**
   * Heading level rendered around each trigger for SEO / a11y.
   * Default: `h3`. Pick so the hierarchy fits your page (usually h2 or h3).
   */
  headingLevel?: AccordionHeadingLevel;
  /** Optional class merged onto the root. */
  className?: string;
  ref?: Ref<ComponentRef<typeof AccordionPrimitive.Root>>;
};
```

Source: `packages/react-accordion/src/Accordion.tsx`

```tsx
export function Accordion({
  variant = "plain",
  size = "md",
  color = "neutral",
  iconType = "chevron",
  iconPosition = "end",
  headingLevel = "h3",
  className,
  ref,
  ...props
}: AccordionProps);
```

Source: `packages/react-accordion/src/Accordion.tsx`

```tsx
export interface AccordionItemProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> {
  /** Override the root color for just this item (e.g., highlight a row). */
  color?: AccordionColor;
  ref?: Ref<ComponentRef<typeof AccordionPrimitive.Item>>;
}
```

Source: `packages/react-accordion/src/Accordion.tsx`

```tsx
export function AccordionItem({
  className,
  color,
  ref,
  ...props
}: AccordionItemProps);
```

Source: `packages/react-accordion/src/Accordion.tsx`

```tsx
export interface AccordionTriggerProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {
  /** Override the root's icon type for this trigger only. */
  iconType?: AccordionIconType;
  /** Override the root's icon position for this trigger only. */
  iconPosition?: AccordionIconPosition;
  /** Override the root's heading level for this trigger only. */
  headingLevel?: AccordionHeadingLevel;
  ref?: Ref<ComponentRef<typeof AccordionPrimitive.Trigger>>;
}
```

Source: `packages/react-accordion/src/Accordion.tsx`

```tsx
export function AccordionTrigger({
  className,
  children,
  iconType: iconTypeProp,
  iconPosition: iconPositionProp,
  headingLevel: headingLevelProp,
  ref,
  ...props
}: AccordionTriggerProps);
```

Source: `packages/react-accordion/src/Accordion.tsx`

```tsx
export interface AccordionContentProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> {
  ref?: Ref<ComponentRef<typeof AccordionPrimitive.Content>>;
}
```

Source: `packages/react-accordion/src/Accordion.tsx`

```tsx
export function AccordionContent({
  className,
  children,
  ref,
  ...props
}: AccordionContentProps);
```

Source: `packages/react-accordion/src/FAQAccordion.tsx`

```tsx
export interface FAQItem {
  /** Stable id for controlled state + anchor links. Required. */
  id: string;
  question: string;
  /** Rich node rendered inside the body. */
  answer: React.ReactNode;
  /**
   * Plain-text copy of the answer used inside the FAQPage JSON-LD. Required
   * because Google needs a string — rich React nodes can't be serialized.
   * If your `answer` is already a plain string, pass the same value here.
   */
  answerText: string;
}
```

Source: `packages/react-accordion/src/FAQAccordion.tsx`

```tsx
export interface FAQAccordionProps {
  items: FAQItem[];
  /** Which items are open initially. Defaults to `[]` (all collapsed). */
  defaultOpen?: string[];
  /**
   * Allow multiple open at once. Default: true — UX-friendly for FAQ since
   * users often want to compare answers. Either mode is supported.
   */
  allowMultiple?: boolean;
  /** Shape variant forwarded to the underlying Accordion. Default: `contained`. */
  variant?: AccordionVariant;
  size?: AccordionSize;
  color?: AccordionColor;
  iconType?: AccordionIconType;
  iconPosition?: AccordionIconPosition;
  /** Heading level for the question. Default: `h3`. */
  headingLevel?: AccordionHeadingLevel;
  /**
   * Emit a `FAQPage` JSON-LD `<script>` alongside the accordion so Google can
   * surface rich results. Default: true. Turn off if the page already ships
   * its own FAQPage structured data (never duplicate — Google will flag it).
   */
  structuredData?: boolean;
  className?: string;
}
```

Source: `packages/react-accordion/src/FAQAccordion.tsx`

```tsx
export function FAQAccordion({
  items,
  defaultOpen = [],
  allowMultiple = true,
  variant = "contained",
  size = "md",
  color = "neutral",
  iconType = "plus-minus",
  iconPosition = "end",
  headingLevel = "h3",
  structuredData = true,
  className,
}: FAQAccordionProps);
```

## Source files

- `packages/react-accordion/src/Accordion.css`
- `packages/react-accordion/src/Accordion.tokens.css`
- `packages/react-accordion/src/Accordion.tsx`
- `packages/react-accordion/src/FAQAccordion.tsx`
- `packages/react-accordion/src/index.ts`
- `packages/react-accordion/package.json`
