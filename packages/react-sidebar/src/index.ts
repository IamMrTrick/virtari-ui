/* ── Root ── */
export { Sidebar, useSidebar, useSidebarOptional } from "./Sidebar";
export type {
  SidebarProps,
  SidebarMode,
  SidebarSide,
  SidebarSize,
  SidebarBackground,
} from "./Sidebar";

/* ── Sub-parts ── */
export {
  SidebarHeader,
  SidebarBody,
  SidebarFooter,
  SidebarSeparator,
} from "./SidebarParts";
export type {
  SidebarHeaderProps,
  SidebarBodyProps,
  SidebarFooterProps,
  SidebarSeparatorProps,
} from "./SidebarParts";

/* ── Trigger ── */
export { SidebarTrigger } from "./SidebarTrigger";
export type { SidebarTriggerProps } from "./SidebarTrigger";
