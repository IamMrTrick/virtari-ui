import { cn, controlText } from "@virtari-packages/utils";
import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useContext,
  type ReactNode,
} from "react";
import { Slot } from "@virtari-packages/primitives/slot";
import { ButtonGroupContext } from "./context";

/** Intent palette — orthogonal to variant. Picks the hue family. */
export type ButtonColor =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "accent"
  | "contrast";

/** Appearance — solid fill, bordered, text-only, tinted, or inline link. */
export type ButtonVariant =
  | "solid"
  | "outline"
  | "ghost"
  | "soft"
  | "link"
  /** @deprecated Use `color="danger"` instead. Maps to solid + danger at runtime. */
  | "destructive";

/**
 * Button size presets.
 *
 * Minimum heights: 2xs 24px, xs 28px, sm 32px, md 36px, lg 40px,
 * xl 44px, 2xl 52px, 3xl 64px with the default root font size.
 * Prefer xl+ for touch interfaces. Height alone does not establish target
 * size compliance: width, spacing, context and inline-link exceptions matter.
 */
export type ButtonSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

/** Visual effects — requires importing `@virtari-packages/react-button/styles/effects` */
export type ButtonEffect = "shine" | "raised" | "glow" | "glass" | "outline-glow" | "candy";

/** Attention animations — requires importing `@virtari-packages/react-button/styles/animations` */
export type ButtonAnimation = "pulse" | "bounce" | "shake" | "jiggle";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Hue/intent. Orthogonal to variant. */
  color?: ButtonColor;
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Size preset */
  size?: ButtonSize;
  /** Render as child element (polymorphic via Slot) */
  asChild?: boolean;
  /** Show loading spinner and disable interaction */
  loading?: boolean;
  /** Accessible label for loading state (announced by screen readers) */
  loadingText?: string;
  /** Element placed before children (icon, badge, etc.) */
  leftSection?: ReactNode;
  /** Element placed after children */
  rightSection?: ReactNode;
  /** Explicit square icon geometry; useful for opaque custom icon components. */
  iconOnly?: boolean;
  /** Take full width of parent */
  fullWidth?: boolean;
  /** Visual effect (requires effects CSS import) */
  effect?: ButtonEffect;
  /** Attention animation (requires animations CSS import) */
  animation?: ButtonAnimation;
}

function hasReadableText(node: ReactNode, namedOpaqueIcon = false): boolean {
  return Children.toArray(node).some((child) => {
    if (typeof child === "string") return child.trim().length > 0;
    if (typeof child === "number") return true;
    if (isValidElement<{ children?: ReactNode }>(child)) {
      if (child.type === "svg") return false;
      // An opaque component may render text. Do not classify it as an icon
      // just because its rendered children are not visible to React here.
      if (typeof child.type !== "string" && child.props.children == null) return !namedOpaqueIcon;
      return hasReadableText(child.props.children, namedOpaqueIcon);
    }
    return false;
  });
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button({
  color: colorProp,
  variant: variantProp,
  size: sizeProp,
  asChild = false,
  loading = false,
  loadingText = "Loading",
  leftSection,
  rightSection,
  fullWidth = false,
  iconOnly: iconOnlyProp,
  effect,
  animation,
  disabled: disabledProp,
  className,
  children,
  ...props
}, forwardedRef) {
  // Inherit from ButtonGroup when props are omitted; own props still win.
  const group = useContext(ButtonGroupContext);
  const color = colorProp ?? group?.color ?? "primary";
  const variant = variantProp ?? group?.variant ?? "solid";
  const size = sizeProp ?? group?.size ?? "md";
  const disabled = disabledProp ?? group?.disabled ?? false;

  const isDisabled = disabled || loading;

  // Backward compat: variant="destructive" -> color="danger" + variant="solid".
  const resolvedColor = variant === "destructive" ? "danger" : color;
  const resolvedVariant = variant === "destructive" ? "solid" : variant;
  const slotChild = asChild && isValidElement<React.HTMLAttributes<HTMLElement> & { disabled?: boolean }>(children) ? children : null;
  const contentChildren = slotChild ? slotChild.props.children : children;
  const hasAccessibleName = Boolean(props['aria-label'] || props['aria-labelledby'] || slotChild?.props['aria-label'] || slotChild?.props['aria-labelledby']);
  const hasTextContent = hasReadableText(contentChildren, hasAccessibleName && Children.count(contentChildren) === 1);
  const hasBareVisualChild = Children.toArray(contentChildren).length > 0 && !hasTextContent;
  const visualSlotCount =
    Number(leftSection != null) +
    Number(rightSection != null) +
    Number(hasBareVisualChild);
  const iconOnly = iconOnlyProp ?? (visualSlotCount === 1 && !hasTextContent);

  const buttonContent = (
    <>
      <span className="vds-button-content">
        {leftSection && (
          <span className="vds-button-section" data-position="start">
            {leftSection}
          </span>
        )}
        {contentChildren != null ? (
          <span className="vds-button-label">
            {controlText(contentChildren)}
          </span>
        ) : null}
        {rightSection && (
          <span className="vds-button-section" data-position="end">
            {rightSection}
          </span>
        )}
      </span>
      {loading && <span className="vds-button-spinner" aria-hidden="true" />}
    </>
  );

  return (
    <>
      {asChild ? (
        <Slot
          ref={forwardedRef}
          className={cn("vds-button", className)}
          data-color={resolvedColor}
          data-variant={resolvedVariant}
          data-size={size}
          data-full-width={fullWidth || undefined}
          data-effect={effect || undefined}
          data-animation={animation || undefined}
          data-icon-only={iconOnly || undefined}
          aria-busy={loading || undefined}
          aria-disabled={isDisabled || undefined}
          aria-label={loading ? loadingText : undefined}
          {...props}
          onClickCapture={(event) => {
            if (isDisabled) { event.preventDefault(); event.stopPropagation(); return; }
            props.onClickCapture?.(event as unknown as React.MouseEvent<HTMLButtonElement>);
          }}
        >
          {slotChild ? cloneElement(slotChild, {
            'aria-busy': loading || slotChild.props['aria-busy'],
            'aria-disabled': isDisabled || slotChild.props['aria-disabled'],
            ...(isDisabled ? { tabIndex: -1 } : {}),
            ...(slotChild.type === 'button' ? { disabled: isDisabled || slotChild.props.disabled } : {}),
          }, buttonContent) : children}
        </Slot>
      ) : (
        <button
          ref={forwardedRef}
          className={cn("vds-button", className)}
          data-color={resolvedColor}
          data-variant={resolvedVariant}
          data-size={size}
          data-full-width={fullWidth || undefined}
          data-effect={effect || undefined}
          data-animation={animation || undefined}
          data-icon-only={iconOnly || undefined}
          disabled={isDisabled}
          aria-busy={loading || undefined}
          aria-disabled={isDisabled || undefined}
          aria-label={loading ? loadingText : undefined}
          {...props}
        >
          {buttonContent}
        </button>
      )}
      {loading && (
        <span className="vds-sr-only" role="status" aria-live="polite">
          {loadingText}
        </span>
      )}
    </>
  );
});

Button.displayName = "Button";
