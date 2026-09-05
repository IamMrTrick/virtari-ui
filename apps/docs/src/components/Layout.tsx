import { useEffect, useRef, useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Header, HeaderMain, HeaderStart, HeaderEnd } from "@virtari-packages/react-header";
import { Main, Stack, Cluster, Grid } from "@virtari-packages/react-layout";
import { Heading } from "@virtari-packages/react-text";
import { Button } from "@virtari-packages/react-button";
import { Kbd } from "@virtari-packages/react-kbd";
import { Nav, NavList, NavItem } from "@virtari-packages/react-nav";
import { CommandDialog, CommandInput, CommandList, CommandGroup, CommandItem, CommandEmpty } from "@virtari-packages/react-command";
import { IconMenu2, IconSettings, IconSearch, IconArrowLeft, IconArrowRight, IconCopy, IconSun, IconMoon } from "@virtari-packages/react-icons";
import { toast } from "@virtari-packages/react-toast";
import { SettingsDrawer } from "./SettingsDrawer";
import { NAV_ITEMS } from "./Sidebar";
import type { RadiusMode, Direction } from "../App";
import type { Locale } from "../i18n";

type Props = {
  dark: boolean; onToggleDark: (v: boolean) => void;
  radius: RadiusMode; onRadiusChange: (v: RadiusMode) => void;
  direction: Direction; onDirectionChange: (v: Direction) => void;
  locale: Locale; onLocaleChange: (v: Locale) => void;
  microInteractions: boolean; onMicroInteractionsChange: (v: boolean) => void;
  title: string; description: string; children: ReactNode; sidebar: ReactNode;
  onToggleSidebar: () => void; activePage: string;
  hrefFor: (page: string) => string; onNavigate: (page: string) => void;
};

export function Layout(p: Props) {
  const { t } = useTranslation();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [sections, setSections] = useState<HTMLElement[]>([]);
  const [activeSection, setActiveSection] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const fa = p.locale === "fa";
  const label = (en: string, persian: string) => fa ? persian : en;
  const paths = NAV_ITEMS.flatMap(group => group.items);
  const pageIndex = paths.indexOf(p.activePage);
  const previous = paths[pageIndex - 1];
  const next = paths[pageIndex + 1];
  const pageLabel = (path: string) => t(`nav:${path}`, { defaultValue: path });

  useEffect(() => {
    const main = mainRef.current;
    const headings = Array.from(contentRef.current?.querySelectorAll<HTMLElement>(".docs-section-title") ?? []);
    setSections(headings);
    setActiveSection(0);
    main?.scrollTo({ top: 0, behavior: "instant" });
    document.title = `${p.title} — Virtari`;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const top = (main?.getBoundingClientRect().top ?? 0) + 100;
        let index = 0;
        headings.forEach((heading, i) => { if (heading.getBoundingClientRect().top <= top) index = i; });
        setActiveSection(index);
      });
    };
    main?.addEventListener("scroll", update, { passive: true });
    return () => { cancelAnimationFrame(frame); main?.removeEventListener("scroll", update); };
  }, [p.activePage, p.title, p.locale]);

  function goToSection(index: number) {
    const heading = sections[index];
    if (!heading) return;
    heading.tabIndex = -1;
    heading.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    heading.focus({ preventScroll: true });
    setActiveSection(index);
  }

  async function copyPage() {
    try {
      await navigator.clipboard.writeText(`${p.title}\n${p.description}\n\n${contentRef.current?.innerText ?? ""}`);
      toast.success(label("Page copied", "صفحه کپی شد"));
    } catch { toast.error(label("Could not copy. Select the page text to copy it.", "کپی انجام نشد؛ متن صفحه را انتخاب و کپی کنید.")); }
  }

  const sectionLinks = <Nav orientation="vertical" size="sm" variant="filled" aria-label={label("On this page", "در این صفحه")}>
    <NavList>{sections.map((heading, index) => <NavItem key={index} href={p.hrefFor(p.activePage)} label={heading.textContent ?? ""} onClick={event => { event.preventDefault(); goToSection(index); }} active={activeSection === index} data-current={activeSection === index || undefined} />)}</NavList>
  </Nav>;

  return <>
    <a className="docs-skip-link" href={p.hrefFor(p.activePage)} onClick={event => { event.preventDefault(); mainRef.current?.focus(); }}>{label("Skip to content", "رفتن به محتوا")}</a>
    <Header className="docs-topbar">
      <HeaderMain blockSize="var(--docs-header-height)" background="none" gutter="md" width="full" contained={false}>
        <HeaderStart>
          <Button variant="ghost" color="contrast" className="docs-mobile-menu" aria-label={t("layout.toggleSidebar")} onClick={p.onToggleSidebar}><IconMenu2 size={20}/></Button>
          <a href={p.hrefFor("introduction")} className="docs-wordmark" aria-label={t("brand.homeLabel")}><span className="docs-brand-symbol" aria-hidden="true">V</span><span>Virtari</span></a>
          <Nav className="docs-top-nav" orientation="horizontal" size="sm" variant="filled" aria-label={label("Explore documentation", "مرور مستندات")}>
            <NavList>
              <NavItem href={p.hrefFor("introduction")} label={label("Docs", "مستندات")} />
              <NavItem href={p.hrefFor("button")} label={label("Components", "کامپوننت‌ها")} />
              <NavItem href={p.hrefFor("colors")} label={label("Foundations", "مبانی")} />
            </NavList>
          </Nav>
        </HeaderStart>
        <HeaderEnd>
          <Button variant="soft" color="contrast" className="docs-search-trigger" onClick={() => setSearchOpen(true)} aria-label={label("Search documentation", "جست‌وجوی مستندات")}><IconSearch size={16}/><span className="docs-search-label">{label("Search documentation…", "جست‌وجوی مستندات…")}</span><Kbd>⌘ K</Kbd></Button>
          <Button variant="ghost" color="contrast" aria-label={label(p.dark ? "Switch to light theme" : "Switch to dark theme", p.dark ? "حالت روشن" : "حالت تیره")} onClick={() => p.onToggleDark(!p.dark)}>{p.dark ? <IconSun size={18}/> : <IconMoon size={18}/>}</Button>
          <Button variant="ghost" color="contrast" onClick={() => setSettingsOpen(true)} aria-label={t("settings.open")} aria-expanded={settingsOpen}><IconSettings size={18}/></Button>
        </HeaderEnd>
      </HeaderMain>
    </Header>

    <Grid className="docs-workspace">
      {p.sidebar}
      <Main contained={false} className="docs-main" ref={mainRef}>
        <div className="docs-article">
          <Cluster className="docs-page-toolbar">
            <span className="docs-eyebrow">{label("Documentation", "مستندات")} <span aria-hidden="true">/</span> {p.title}</span>
            <Cluster gap="xs">
              <Button variant="ghost" color="contrast" size="sm" leftSection={<IconCopy size={14}/>} onClick={copyPage}>{label("Copy page", "کپی صفحه")}</Button>
              {previous && <Button asChild variant="ghost" color="contrast" size="sm"><a href={p.hrefFor(previous)} aria-label={`${label("Previous", "قبلی")}: ${pageLabel(previous)}`}><IconArrowLeft className="docs-directional-icon" size={16}/></a></Button>}
              {next && <Button asChild variant="ghost" color="contrast" size="sm"><a href={p.hrefFor(next)} aria-label={`${label("Next", "بعدی")}: ${pageLabel(next)}`}><IconArrowRight className="docs-directional-icon" size={16}/></a></Button>}
            </Cluster>
          </Cluster>
          <Stack className="docs-page-intro" gap="sm"><Heading level={1} size="8" tracking="tight">{p.title}</Heading><p>{p.description}</p></Stack>
          {sections.length > 0 && <details className="docs-mobile-toc"><summary>{label("On this page", "در این صفحه")}</summary>{sectionLinks}</details>}
          <div className="docs-content" ref={contentRef} key={p.activePage}>{p.children}</div>
          <Cluster className="docs-page-pagination">
            {previous ? <Button asChild variant="outline" color="contrast"><a href={p.hrefFor(previous)}><IconArrowLeft className="docs-directional-icon" size={16}/>{pageLabel(previous)}</a></Button> : <span/>}
            {next && <Button asChild variant="outline" color="contrast"><a href={p.hrefFor(next)}>{pageLabel(next)}<IconArrowRight className="docs-directional-icon" size={16}/></a></Button>}
          </Cluster>
          <p className="docs-colophon">{label("Built with Virtari components. Designed to work together.", "ساخته‌شده با کامپوننت‌های ویرتاری؛ طراحی‌شده برای کار در کنار هم.")}</p>
        </div>
      </Main>
      <aside className="docs-outline" aria-label={label("Page contents", "فهرست صفحه")}>
        <p className="docs-outline-title">{label("On this page", "در این صفحه")}</p>
        {sectionLinks}
        <Stack className="docs-outline-note" gap="sm"><strong>{label("Make it yours", "با سلیقهٔ خودتان")}</strong><p>{label("Explore themes, radius, and direction with your design tokens.", "تم، گردی گوشه‌ها و جهت صفحه را با توکن‌های خودتان تنظیم کنید.")}</p><Button color="contrast" variant="outline" size="sm" onClick={() => setSettingsOpen(true)}>{label("Customize", "شخصی‌سازی")}</Button></Stack>
      </aside>
    </Grid>

    <CommandDialog open={searchOpen} onOpenChange={setSearchOpen} hotkey="mod+k" title={label("Search documentation", "جست‌وجوی مستندات")} description={label("Find a component or guide.", "یک کامپوننت یا راهنما پیدا کنید.")}>
      <CommandInput placeholder={label("Search components and guides…", "جست‌وجوی کامپوننت‌ها و راهنماها…")} />
      <CommandList><CommandEmpty>{label("No pages found.", "صفحه‌ای پیدا نشد.")}</CommandEmpty>{NAV_ITEMS.map(group => <CommandGroup key={group.groupKey} heading={t(group.groupKey)}>{group.items.map(path => <CommandItem key={path} value={`${pageLabel(path)} ${path}`} onSelect={() => {p.onNavigate(path); setSearchOpen(false);}}>{pageLabel(path)}</CommandItem>)}</CommandGroup>)}</CommandList>
    </CommandDialog>
    <SettingsDrawer open={settingsOpen} onOpenChange={setSettingsOpen} dark={p.dark} onDarkChange={p.onToggleDark} radius={p.radius} onRadiusChange={p.onRadiusChange} direction={p.direction} onDirectionChange={p.onDirectionChange} locale={p.locale} onLocaleChange={p.onLocaleChange} microInteractions={p.microInteractions} onMicroInteractionsChange={p.onMicroInteractionsChange}/>
  </>;
}
