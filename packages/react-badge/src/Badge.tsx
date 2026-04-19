import { cn } from "@virtari/utils";
import type { Ref, ReactNode, MouseEvent } from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";

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

/** Four sizes: xs(18) · sm(20) · md(22) · lg(26). */
export type BadgeSize = "xs" | "sm" | "md" | "lg";

/** Corner shape — pill by default; square swaps to element radius for tag look. */
export type BadgeShape = "pill" | "square";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Hue/intent. Orthogonal to variant. */
  color?: BadgeColor;
  /** Visual style. */
  variant?: BadgeVariant;
  /** Size preset. */
  size?: BadgeSize;
  /** Corner shape. `pill` (default) uses the badge radius token; `square` uses element radius. */
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
  ref,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot : "span";
  const { color: resolvedColor, variant: resolvedVariant } = resolveLegacy(color, variant);

  const interactive = !!props.onClick && !asChild;

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
    >
      {!dotOnly && dot && <span className="vds-badge-dot" aria-hidden="true" />}
      {!dotOnly && !dot && leftSection && (
        <span className="vds-badge-section" data-position="start">
          {leftSection}
        </span>
      )}
      {!dotOnly && <Slottable>{children}</Slottable>}
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
