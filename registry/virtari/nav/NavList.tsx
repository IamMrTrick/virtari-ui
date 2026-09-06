import { cn } from "../../lib/utils";
import type { ElementType, HTMLAttributes, Ref } from "react";
import { NavLevelContext, useNavContext, useNavLevel } from "./context";

/* ──────────────────────────────────────────────
 * NavList — <ul>
 * Lives inside <Nav>, inside a submenu, or at the
 * top of a <NavGroup>. Bumps the level context so
 * nested lists auto-indent.
 * ────────────────────────────────────────────── */

export interface NavListProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  /** Override the orientation inherited from <Nav> (e.g. a horizontal sub-row in a vertical menubar). */
  orientation?: "vertical" | "horizontal";
  ref?: Ref<HTMLElement>;
}

export function NavList({
  as: Tag = "ul",
  orientation,
  className,
  children,
  ref,
  ...rest
}: NavListProps) {
  const level = useNavLevel();
  const { orientation: ctxOrientation } = useNavContext();
  // Fall back to the root <Nav>'s orientation when not overridden —
  // otherwise nested NavLists (inside NavGroup / NavSubmenu) would
  // get no orientation attribute and default to `flex-direction: row`.
  const resolvedOrientation = orientation ?? ctxOrientation;

  return (
    <NavLevelContext.Provider value={level + 1}>
      <Tag
        ref={ref}
        className={cn("vds-nav__list", className)}
        data-orientation={resolvedOrientation}
        data-level={level}
        {...rest}
      >
        {children}
      </Tag>
    </NavLevelContext.Provider>
  );
}

/* ──────────────────────────────────────────────
 * NavGroup — labelled section of a list
 * Renders:
 *   <div role="group" aria-labelledby={labelId}>
 *     <span id={labelId}>Label</span>
 *     <ul>...</ul>
 *   </div>
 * Used in sidebars ("Foundations", "Form Controls", etc.).
 * ────────────────────────────────────────────── */

let groupIdCounter = 0;
function useGroupLabelId(explicit?: string) {
  if (explicit) return explicit;
  // Deterministic-enough per-mount id. Not shared across SSR / client so use a stable ref.
  return `vds-nav-group-${groupIdCounter++}`;
}

export interface NavGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Group label displayed above the list. Also used as the accessible name of the `<ul>`. */
  label: React.ReactNode;
  /** Optional explicit id for the label element. */
  labelId?: string;
  /** Render as a wrapper only (omit visible label, keep aria association). */
  hideLabel?: boolean;
  ref?: Ref<HTMLDivElement>;
}

export function NavGroup({
  label,
  labelId,
  hideLabel,
  className,
  children,
  ref,
  ...rest
}: NavGroupProps) {
  const id = useGroupLabelId(labelId);
  return (
    <div
      ref={ref}
      className={cn("vds-nav__group", className)}
      role="group"
      aria-labelledby={id}
      {...rest}
    >
      {hideLabel ? (
        <span
          id={id}
          style={{
            position: "absolute",
            width: 1,
            height: 1,
            margin: -1,
            padding: 0,
            overflow: "hidden",
            clip: "rect(0 0 0 0)",
            whiteSpace: "nowrap",
            border: 0,
          }}
        >
          {label}
        </span>
      ) : (
        <span id={id} className="vds-nav__group-label">
          {label}
        </span>
      )}
      {children}
    </div>
  );
}

/* ──────────────────────────────────────────────
 * NavSeparator — decorative divider between groups
 * ────────────────────────────────────────────── */

export interface NavSeparatorProps extends HTMLAttributes<HTMLHRElement> {
  ref?: Ref<HTMLHRElement>;
}

export function NavSeparator({
  className,
  ref,
  ...rest
}: NavSeparatorProps) {
  return (
    <hr
      ref={ref}
      className={cn("vds-nav__separator", className)}
      role="separator"
      aria-orientation="horizontal"
      {...rest}
    />
  );
}
