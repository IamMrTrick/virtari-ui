import { cn } from "../../lib/utils";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

export interface BottomNavBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Render as a dot (no number) when `true`. */
  dot?: boolean;
  /** Numeric count. Values above `max` are shown as `${max}+`. */
  count?: number;
  /** Upper bound before the "+" overflow marker. Default 99. */
  max?: number;
  /** Custom content (overrides count/dot rendering). */
  children?: ReactNode;
}

/**
 * Notification badge for a BottomNavItem. Two modes:
 *
 * - `dot`: a small colored circle (no content).
 * - `count`: a pill with the number; values > `max` render as "`${max}+`".
 *
 * Passing `children` overrides both and renders the node as-is.
 */
export const BottomNavBadge = forwardRef<HTMLSpanElement, BottomNavBadgeProps>(
  function BottomNavBadge(
    { dot = false, count, max = 99, className, children, ...rest },
    ref,
  ) {
    const isDot = dot || (children == null && count == null);

    let content: ReactNode = children;
    let srText: string | undefined;

    if (children == null && !isDot && typeof count === "number") {
      content = count > max ? `${max}+` : String(count);
      srText = `${count} unread`;
    }

    return (
      <>
        <span
          ref={ref}
          className={cn("vds-bottom-nav__badge", className)}
          data-dot={isDot ? "true" : undefined}
          aria-hidden={isDot ? "true" : undefined}
          {...rest}
        >
          {isDot ? null : content}
        </span>
        {srText && <span className="vds-sr-only">{srText}</span>}
      </>
    );
  },
);
