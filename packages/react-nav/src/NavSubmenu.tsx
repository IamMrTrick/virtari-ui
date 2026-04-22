import {
  FloatingFocusManager,
  FloatingPortal,
  type FloatingContext,
} from "@floating-ui/react";
import { cn } from "@virtari-packages/utils";
import type { CSSProperties, HTMLAttributes, ReactNode, Ref } from "react";
import { useNavSubmenuContext } from "./context";

/* ──────────────────────────────────────────────
 * NavSubmenu
 * Dual-mode submenu container. Reads its open
 * state from the NavItem ancestor's context.
 *
 * inline  — renders in-flow, toggled via data-state
 * popover — renders into a portal, positioned by
 *           Floating UI, with focus management.
 * ────────────────────────────────────────────── */

export interface NavSubmenuProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

export function NavSubmenu({
  className,
  style,
  children,
  ref,
  ...rest
}: NavSubmenuProps) {
  const ctx = useNavSubmenuContext();
  if (!ctx) {
    throw new Error(
      "vds-nav: <NavSubmenu> must be rendered inside <NavItem>.",
    );
  }

  const { id, open, mode, floating } = ctx;

  if (mode === "inline") {
    return (
      <div
        ref={ref}
        id={id}
        className={cn("vds-nav__submenu", className)}
        data-mode="inline"
        data-state={open ? "open" : "closed"}
        hidden={!open}
        style={style}
        {...rest}
      >
        {children}
      </div>
    );
  }

  // Popover mode — portal + floating UI
  if (!open || !floating) return null;

  // Keep the submenu invisible until Floating UI has computed its real
  // position. Without this the panel paints one frame at the viewport's
  // top-left corner (the initial `translate(0, 0)`) and then "jumps" to
  // the anchor — a visible flash on every open.
  const mergedStyle: CSSProperties = {
    ...floating.floatingStyles,
    visibility: floating.isPositioned ? undefined : "hidden",
    ...style,
  };

  const floatingProps = floating.getFloatingProps() as HTMLAttributes<HTMLDivElement>;

  const setFloatingRef = (el: HTMLDivElement | null) => {
    floating.refs.setFloating(el);
    if (typeof ref === "function") ref(el);
    else if (ref && typeof ref === "object") {
      (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
    }
  };

  return (
    <FloatingPortal>
      <FloatingFocusManager
        context={floating.context as FloatingContext}
        modal={false}
        returnFocus
        initialFocus={-1}
      >
        <div
          ref={setFloatingRef}
          id={id}
          className={cn("vds-nav__submenu", className)}
          data-mode="popover"
          data-state="open"
          style={mergedStyle}
          {...floatingProps}
          {...rest}
        >
          {children}
        </div>
      </FloatingFocusManager>
    </FloatingPortal>
  );
}

/* ──────────────────────────────────────────────
 * NavMega — like NavSubmenu but with free-form
 * multi-column content instead of a nav list.
 *
 * Structure:
 *   <NavMega columns={3}>
 *     <NavMegaSection title="Learn">...</NavMegaSection>
 *     <NavMegaSection title="Build">...</NavMegaSection>
 *     <NavMegaSection title="Featured">
 *       <FeaturedCard />
 *     </NavMegaSection>
 *   </NavMega>
 * ────────────────────────────────────────────── */

export interface NavMegaProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of columns in the mega grid. Default 3. */
  columns?: number;
  /** Anchor to the trigger (popover, default) or pin to the viewport edges (full-bleed). */
  layout?: "popover" | "full-bleed";
  ref?: Ref<HTMLDivElement>;
}

export function NavMega({
  columns = 3,
  layout = "popover",
  className,
  style,
  children,
  ref,
  ...rest
}: NavMegaProps) {
  const ctx = useNavSubmenuContext();
  if (!ctx) {
    throw new Error(
      "vds-nav: <NavMega> must be rendered inside <NavItem>.",
    );
  }
  const { id, open, floating } = ctx;

  // Mega is only ever shown in popover mode; force popover behavior even if
  // the parent NavItem is nominally in inline mode.
  if (!open || !floating) return null;

  const mergedStyle: CSSProperties = {
    ...floating.floatingStyles,
    // Same flash-guard as <NavSubmenu>: keep the panel hidden until
    // Floating UI computes its real position, otherwise it paints one
    // frame at the viewport's top-left and then jumps to the anchor.
    visibility: floating.isPositioned ? undefined : "hidden",
    ...style,
    // @ts-expect-error — custom property passed to CSS
    "--mega-cols": columns,
    ...(layout === "full-bleed"
      ? {
          position: "fixed",
          insetInlineStart: 0,
          insetInlineEnd: 0,
          insetBlockStart: (floating.floatingStyles as CSSProperties).top,
          transform: undefined,
          inlineSize: "100%",
        }
      : {}),
  };

  const floatingProps = floating.getFloatingProps() as HTMLAttributes<HTMLDivElement>;

  const setFloatingRef = (el: HTMLDivElement | null) => {
    floating.refs.setFloating(el);
    if (typeof ref === "function") ref(el);
    else if (ref && typeof ref === "object") {
      (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
    }
  };

  return (
    <FloatingPortal>
      <FloatingFocusManager
        context={floating.context as FloatingContext}
        modal={false}
        returnFocus
        initialFocus={-1}
      >
        <div
          ref={setFloatingRef}
          id={id}
          className={cn("vds-nav__mega", className)}
          data-columns
          data-layout={layout}
          data-state="open"
          style={mergedStyle}
          {...floatingProps}
          {...rest}
        >
          {children}
        </div>
      </FloatingFocusManager>
    </FloatingPortal>
  );
}

export interface NavMegaSectionProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Section heading rendered as a small uppercase label. */
  heading?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

export function NavMegaSection({
  heading,
  className,
  children,
  ref,
  ...rest
}: NavMegaSectionProps) {
  return (
    <div
      ref={ref}
      className={cn("vds-nav__mega-section", className)}
      {...rest}
    >
      {heading != null && (
        <span className="vds-nav__mega-section-title">{heading}</span>
      )}
      {children}
    </div>
  );
}
