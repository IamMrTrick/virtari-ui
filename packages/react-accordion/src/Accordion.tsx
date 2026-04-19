import { cn } from "@virtari-packages/utils";
import {
  createContext,
  createElement,
  useContext,
  type ComponentRef,
  type ReactNode,
  type Ref,
} from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import {
  IconChevronDown,
  IconPlus,
  IconMinus,
  IconArrowDown,
  IconCaretDownFilled,
} from "@virtari-packages/react-icons";

/** Shape/frame variant — orthogonal to color and size. */
export type AccordionVariant =
  | "plain"
  | "bordered"
  | "separated"
  | "filled"
  | "ghost"
  | "contained";

/** Size preset — affects trigger padding, font size, icon size. */
export type AccordionSize = "sm" | "md" | "lg";

/** Intent palette — sets hover tint and open-state accent color. */
export type AccordionColor =
  | "neutral"
  | "primary"
  | "accent"
  | "success"
  | "danger"
  | "warning";

/** Indicator style placed in the trigger. */
export type AccordionIconType =
  | "chevron"
  | "plus-minus"
  | "arrow"
  | "caret"
  | "none";

/** Which side of the trigger the indicator sits on. */
export type AccordionIconPosition = "start" | "end";

/** Semantic heading level for each trigger. Default: `h3` for FAQ/SEO. */
export type AccordionHeadingLevel = "h2" | "h3" | "h4" | "h5" | "h6";

/* ──────────────────────────── Root context ────────────────────────────
 * The primitive Root takes its own props, so we wrap it and forward styling
 * config to children via context instead of drilling props. */

interface AccordionContextValue {
  iconType: AccordionIconType;
  iconPosition: AccordionIconPosition;
  headingLevel: AccordionHeadingLevel;
  size: AccordionSize;
}

const AccordionContext = createContext<AccordionContextValue>({
  iconType: "chevron",
  iconPosition: "end",
  headingLevel: "h3",
  size: "md",
});

/* ──────────────────────────── Accordion (root) ──────────────────────── */

type PrimitiveAccordionRootProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Root
>;

/** Root props. Intersection because the primitive Root is a discriminated union
 * on `type="single" | "multiple"` — `interface extends` can't widen it. */
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
}: AccordionProps) {
  return (
    <AccordionContext.Provider
      value={{ iconType, iconPosition, headingLevel, size }}
    >
      <AccordionPrimitive.Root
        ref={ref}
        className={cn("vds-accordion", className)}
        data-variant={variant}
        data-size={size}
        data-color={color}
        {...(props as PrimitiveAccordionRootProps)}
      />
    </AccordionContext.Provider>
  );
}

/* ──────────────────────────── AccordionItem ─────────────────────────── */

export interface AccordionItemProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> {
  /** Override the root color for just this item (e.g., highlight a row). */
  color?: AccordionColor;
  ref?: Ref<ComponentRef<typeof AccordionPrimitive.Item>>;
}

export function AccordionItem({
  className,
  color,
  ref,
  ...props
}: AccordionItemProps) {
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn("vds-accordion-item", className)}
      data-color={color}
      {...props}
    />
  );
}

/* ──────────────────────────── AccordionTrigger ──────────────────────── */

const ICON_STROKE = 1.75;

function AccordionIndicator({ type }: { type: AccordionIconType }) {
  if (type === "none") return null;

  if (type === "plus-minus") {
    return (
      <span className="vds-accordion-icon" data-icon="plus-minus" aria-hidden>
        <IconPlus
          className="vds-accordion-icon-plus"
          stroke={ICON_STROKE}
          focusable={false}
        />
        <IconMinus
          className="vds-accordion-icon-minus"
          stroke={ICON_STROKE}
          focusable={false}
        />
      </span>
    );
  }

  const Icon =
    type === "arrow"
      ? IconArrowDown
      : type === "caret"
      ? IconCaretDownFilled
      : IconChevronDown;

  return (
    <span className="vds-accordion-icon" data-icon={type} aria-hidden>
      <Icon stroke={ICON_STROKE} focusable={false} />
    </span>
  );
}

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

export function AccordionTrigger({
  className,
  children,
  iconType: iconTypeProp,
  iconPosition: iconPositionProp,
  headingLevel: headingLevelProp,
  ref,
  ...props
}: AccordionTriggerProps) {
  const ctx = useContext(AccordionContext);
  const iconType = iconTypeProp ?? ctx.iconType;
  const iconPosition = iconPositionProp ?? ctx.iconPosition;
  const headingLevel = headingLevelProp ?? ctx.headingLevel;

  return (
    <AccordionPrimitive.Header asChild>
      {/* Render as a real heading for SEO + proper document outline.
       * The primitive keeps the ARIA semantics intact; the Trigger inside provides
       * aria-expanded / aria-controls. */}
      <HeadingTag className="vds-accordion-header" tag={headingLevel}>
        <AccordionPrimitive.Trigger
          ref={ref}
          className={cn("vds-accordion-trigger", className)}
          data-icon-position={iconPosition}
          {...props}
        >
          <span className="vds-accordion-trigger-label">{children}</span>
          <AccordionIndicator type={iconType} />
        </AccordionPrimitive.Trigger>
      </HeadingTag>
    </AccordionPrimitive.Header>
  );
}

/** Internal — render an arbitrary heading level without relying on the
 * global JSX namespace (absent under React 19 by default). */
function HeadingTag({
  tag,
  className,
  children,
}: {
  tag: AccordionHeadingLevel;
  className?: string;
  children: ReactNode;
}) {
  return createElement(tag, { className }, children);
}

/* ──────────────────────────── AccordionContent ──────────────────────── */

export interface AccordionContentProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> {
  ref?: Ref<ComponentRef<typeof AccordionPrimitive.Content>>;
}

export function AccordionContent({
  className,
  children,
  ref,
  ...props
}: AccordionContentProps) {
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className={cn("vds-accordion-content", className)}
      {...props}
    >
      <div className="vds-accordion-content-inner">{children}</div>
    </AccordionPrimitive.Content>
  );
}
