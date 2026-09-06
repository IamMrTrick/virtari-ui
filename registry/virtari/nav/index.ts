import "./Nav.css";
/* ── Root ── */
export { Nav } from "./Nav";
export type { NavProps } from "./Nav";

/* ── Lists / Groups / Separators ── */
export { NavList, NavGroup, NavSeparator } from "./NavList";
export type {
  NavListProps,
  NavGroupProps,
  NavSeparatorProps,
} from "./NavList";

/* ── Item + subparts ── */
export {
  NavItem,
  NavLink,
  NavTrigger,
  NavIcon,
  NavLabel,
  NavBadge,
  NavKbd,
  NavChevron,
} from "./NavItem";
export type {
  NavItemProps,
  NavLinkProps,
  NavTriggerProps,
  NavIconProps,
  NavLabelProps,
  NavBadgeProps,
  NavKbdProps,
  NavChevronProps,
} from "./NavItem";

/* ── Submenu / Mega ── */
export { NavSubmenu, NavMega, NavMegaSection } from "./NavSubmenu";
export type {
  NavSubmenuProps,
  NavMegaProps,
  NavMegaSectionProps,
} from "./NavSubmenu";

/* ── Types / helpers ── */
export type {
  NavOrientation,
  NavSubmenuMode,
  NavVariant,
  NavSize,
  NavContextValue,
} from "./context";
export { isActivePath } from "./context";
