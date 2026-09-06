import { cn } from "@virtari-packages/utils";
import type { Ref, ReactNode, MouseEvent } from "react";
import { cloneElement, isValidElement } from "react";
import { Slot, Slottable } from "@virtari-packages/primitives/slot";

/** Intent palette — orthogonal to variant. */
export type BadgeColor =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "accent"
  | "neutral";

/** Appearance — fill weight. `soft` is the default: muted bg + color text. */
export type BadgeVariant =
  | "soft"
  | "solid"
  | "outline"
  | "subtle"
  | "soft-outline"
  /** @deprecated Use `color="neutral"` + `variant="soft"`. */
  | "default"
  /** @deprecated Use `color="neutral"` + `variant="soft"`. */
  | "secondary"
  /** @deprecated Use `color="danger"` + `variant="soft"`. */
  | "destructive";

/** Four minimum heights: xs(20) · sm(20) · md(24) · lg(28). */
export type BadgeSize = "xs" | "sm" | "md" | "lg";

/** Corner shape — pill by default; square uses the scoped navigation-item radius. */
export type BadgeShape = "pill" | "square";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Hue/intent. Orthogonal to variant. */
  color?: BadgeColor;
  /** Visual style. */
  variant?: BadgeVariant;
  /** Size preset. */
  size?: BadgeSize;
  /** Corner shape. `pill` uses the badge radius token; `square` uses navigation-item radius. */
  shape?: BadgeShape;
  /** Show a leading colored dot (overrides `leftSection`). */
  dot?: boolean;
  /** Render as the dot alone — no label, no padding. Useful for presence markers. */
  dotOnly?: boolean;
  /** Element placed before children. Ignored if `dot` is true. */
  leftSection?: ReactNode;
  /** Element placed after children. Ignored if `onRemove` is set. */
  rightSection?: ReactNode;
  /** If set, renders a close button and calls this on click / Enter / Space. */
  onRemove?: (e: MouseEvent<HTMLButtonElement>) => void;
  /** Accessible label for the close button (default "Remove"). */
  removeLabel?: string;
  /** Render as child element (polymorphic via Slot). */
  asChild?: boolean;
  ref?: Ref<HTMLSpanElement>;
}

/**
 * Backward-compat: map deprecated variant values to the new color + variant pair.
 * Returns the normalized pair and whether we injected a color override.
 */
function resolveLegacy(
  color: BadgeColor,
  variant: BadgeVariant,
): { color: BadgeColor; variant: Exclude<BadgeVariant, "default" | "secondary" | "destructive"> } {
  switch (variant) {
    case "default":
    case "secondary":
      return { color: "neutral", variant: "soft" };
    case "destructive":
      return { color: "danger", variant: "soft" };
    default:
      return { color, variant };
  }
}

export function Badge({
  color = "primary",
  variant = "soft",
  size = "md",
  shape = "pill",
  dot = false,
  dotOnly = false,
  leftSection,
  rightSection,
  onRemove,
  removeLabel = "Remove",
  asChild = false,
  className,
  children,
  onClick,
  ref,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot : "span";
  const { color: resolvedColor, variant: resolvedVariant } = resolveLegacy(color, variant);

  const interactive = !!onClick && !asChild;
  // Keep the semantic child as Slot's root, including in dot-only mode.
  // A label wrapper lets long text shrink without compressing either icon slot.
  const content = asChild && isValidElement<{ children?: ReactNode }>(children)
    ? cloneElement(children, undefined, dotOnly ? null : <span className="vds-badge-label vds-control-text">{children.props.children}</span>)
    : <span className="vds-badge-label vds-control-text">{children}</span>;

  return (
    <Comp
      ref={ref}
      className={cn("vds-badge", className)}
      data-color={resolvedColor}
      data-variant={resolvedVariant}
      data-size={size}
      data-shape={shape !== "pill" ? shape : undefined}
      data-interactive={interactive || undefined}
      data-dot-only={dotOnly || undefined}
      {...props}
      onClick={onClick ? (event) => {
        // Slot runs the child's handler first; allow that child to cancel this action.
        if (!asChild || !event.defaultPrevented) onClick(event);
      } : undefined}
    >
      {!dotOnly && dot && <span className="vds-badge-dot" aria-hidden="true" />}
      {!dotOnly && !dot && leftSection && (
        <span className="vds-badge-section" data-position="start">
          {leftSection}
        </span>
      )}
      {(!dotOnly || asChild) && <Slottable>{content}</Slottable>}
      {!dotOnly && !onRemove && rightSection && (
        <span className="vds-badge-section" data-position="end">
          {rightSection}
        </span>
      )}
      {!dotOnly && onRemove && (
        <button
          type="button"
          className="vds-badge-close"
          aria-label={removeLabel}
          onClick={(e) => {
            e.stopPropagation();
            onRemove(e);
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      )}
    </Comp>
  );
}
