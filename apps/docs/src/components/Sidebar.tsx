import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerTitle, DrawerDescription, DrawerClose } from "@virtari-packages/react-drawer";
import { Sidebar as VdsSidebar, SidebarHeader, SidebarBody } from "@virtari-packages/react-sidebar";
import { Nav, NavList, NavItem, NavSubmenu } from "@virtari-packages/react-nav";
import { Input, InputWrapper, InputIcon } from "@virtari-packages/react-input";
import { Button } from "@virtari-packages/react-button";
import { IconSearch, IconX } from "@virtari-packages/react-icons";
import { NAV_ITEMS, getPageIcon } from "./navigation";

type NavigationProps = {
  activePage: string;
  hrefFor: (page: string) => string;
  onNavigate: (page: string) => void;
};

function NavSearch({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const { t } = useTranslation();
  return <InputWrapper className="docs-nav-search">
    <InputIcon><IconSearch size={18} /></InputIcon>
    <Input size="sm" type="search" placeholder={t("sidebar.filterPlaceholder")} value={value}
      onChange={event => onChange(event.target.value)} aria-label={t("sidebar.filterAriaLabel")} />
  </InputWrapper>;
}

/** One accessible navigation tree shared by the desktop surface and mobile drawer. */
function NavigationTree({ activePage, hrefFor, onNavigate, query }: NavigationProps & { query: string }) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  useEffect(() => {
    const group = NAV_ITEMS.find(group => group.items.includes(activePage));
    if (group) setExpanded(previous => ({ ...previous, [group.groupKey]: true }));
  }, [activePage]);
  const groups = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    return NAV_ITEMS.map(group => ({ ...group, label: t(group.groupKey), items: group.items
      .map(path => ({ path, label: t(`nav:${path}`, { defaultValue: path }) }))
      .filter(item => !needle || `${item.label} ${item.path} ${t(group.groupKey)}`.toLocaleLowerCase().includes(needle))
    })).filter(group => group.items.length);
  }, [query, t]);
  if (!groups.length) return <p role="status" className="docs-nav-empty">{t("sidebar.noMatches", { query })}</p>;
  const renderItems = (items: { path: string; label: string }[]) => items.map(item =>
    <NavItem key={item.path} href={hrefFor(item.path)} label={item.label} icon={getPageIcon(item.path)}
      onClick={event => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
        event.preventDefault();
        onNavigate(item.path);
      }} />);
  return <Nav orientation="vertical" variant="filled" size="md" currentPath={hrefFor(activePage)} aria-label={t("sidebar.ariaDocs")}>
    <NavList>{groups.map(group => group.groupKey === "groups.overview" ? renderItems(group.items) :
      <NavItem key={group.groupKey} className="docs-nav-group" label={group.label}
        icon={getPageIcon(group.items[0].path)} submenuMode="inline"
        open={query.trim() ? true : (expanded[group.groupKey] ?? group.items.some(item => item.path === activePage))}
        onOpenChange={open => setExpanded(previous => ({ ...previous, [group.groupKey]: open }))}
        submenu={<NavSubmenu><NavList>{renderItems(group.items)}</NavList></NavSubmenu>} />
    )}</NavList>
  </Nav>;
}

export function Sidebar(props: NavigationProps) {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  return <VdsSidebar className="docs-navigation" mode="below-header" stickyOffset="var(--docs-header-height)"
    inlineSize="100%" collapsible={false} bordered={false} background="none" aria-label={t("sidebar.ariaPrimary")}>
    <SidebarHeader><NavSearch value={query} onChange={setQuery} /></SidebarHeader>
    <SidebarBody><NavigationTree {...props} query={query} /></SidebarBody>
  </VdsSidebar>;
}

export function MobileSidebar({ open, onOpenChange, ...props }: NavigationProps & { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  return <Drawer direction="left" open={open} onOpenChange={onOpenChange} sizeMode="fixed" size="min(21rem, 90vw)">
    <DrawerContent className="docs-sidebar-drawer">
      <DrawerHeader>
        <DrawerTitle>{t("brand.wordmark")}</DrawerTitle>
        <DrawerDescription>{t("sidebar.mobileDescription")}</DrawerDescription>
        <DrawerClose asChild><Button className="docs-mobile-close" variant="ghost" color="contrast" aria-label={t("sidebar.close")}><IconX size={18}/></Button></DrawerClose>
      </DrawerHeader>
      <DrawerBody>
        <NavSearch value={query} onChange={setQuery} />
        <NavigationTree {...props} query={query} onNavigate={page => { props.onNavigate(page); onOpenChange(false); }} />
      </DrawerBody>
    </DrawerContent>
  </Drawer>;
}
