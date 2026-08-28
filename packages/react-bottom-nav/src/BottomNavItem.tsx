import { cn } from "@virtari-packages/utils";
import { Slot } from "@virtari-packages/primitives/slot";
import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { matchesCurrent, useBottomNav } from "./context";
import { BottomNavBadge } from "./BottomNavBadge";

export interface BottomNavItemProps
  extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  /** Renders the item as an <a> when set; otherwise a <button>. */
  href?: string;
  /** Render as child element (polymorphic via Slot). */
  asChild?: boolean;
  /** The tab's glyph — required. */
  icon: ReactNode;
  /** The tab's text label. */
  label?: ReactNode;
  /** Notification badge. `true` → dot, `number` → count pill, node → custom. */
  badge?: ReactNode | number | boolean;
  /** Override `currentPath` matching — force active state. */
  active?: boolean;
  /** Visually mutes and blocks clicks. */
  disabled?: boolean;
  /** Anchor-only: window target. */
  target?: string;
  /** Anchor-only: rel attribute. */
  rel?: string;
  /** Anchor-only: filename for download links. */
  download?: string | boolean;
  children?: ReactNode;
}

/**
 * A single tab in the BottomNav. Renders as `<a>` when `href` is set,
 * otherwise as `<button type="button">`. Auto-activates via the parent
 * `currentPath` + `matchStrategy`; pass `active` to override.
 */
export const BottomNavItem = forwardRef<HTMLElement, BottomNavItemProps>(
  function BottomNavItem(
    {
      href,
      asChild = false,
      icon,
      label,
      badge,
      active: activeProp,
      disabled = false,
      target,
      rel,
      download,
      className,
      children,
      onClick,
      ...rest
    },
    ref,
  ) {
    const { currentPath, matchStrategy } = useBottomNav();

    const isAnchor = href != null;
    const autoActive = matchesCurrent(href, currentPath, matchStrategy);
    const isActive = activeProp ?? autoActive;

    const handleClick = disabled
      ? (event: React.MouseEvent<HTMLElement>) => {
          event.preventDefault();
          event.stopPropagation();
        }
      : onClick;

    const sharedProps = {
      className: cn("vds-bottom-nav__item", className),
      "data-active": isActive ? ("true" as const) : undefined,
      "aria-current": isActive && isAnchor ? ("page" as const) : undefined,
      "aria-disabled": disabled || undefined,
      onClick: handleClick,
      ...rest,
    };

    // Normalize the badge prop into a renderable node.
    const renderedBadge = (() => {
      if (badge == null || badge === false) return null;
      if (badge === true) return <BottomNavBadge dot />;
      if (typeof badge === "number") return <BottomNavBadge count={badge} />;
      return badge as ReactNode;
    })();

    const body = (
      <span className="vds-bottom-nav__item-inner">
        <span
          className="vds-bottom-nav__icon"
          aria-hidden={label ? "true" : undefined}
        >
          {icon}
          {renderedBadge}
        </span>
        {label != null && (
          <span className="vds-bottom-nav__label">{label}</span>
        )}
        {children}
      </span>
    );

    if (asChild) {
      return (
        <Slot ref={ref} {...sharedProps}>
          {body}
        </Slot>
      );
    }

    if (isAnchor) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target}
          rel={rel}
          download={download as string | undefined}
          {...sharedProps}
        >
          {body}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        disabled={disabled}
        {...sharedProps}
      >
        {body}
      </button>
    );
  },
);
