import { useState, useEffect, useSyncExternalStore } from "react";
import { Sidebar, Layout } from "./components";
import {
  PAGE_META,
  IntroductionPage,
  ButtonPage,
  BadgePage,
  InputPage,
  TextareaPage,
  SwitchPage,
  CheckboxPage,
  TogglePage,
  AvatarPage,
  TabsPage,
  SelectPage,
  DialogPage,
  DrawerPage,
  ColorsPage,
  TypographyPage,
  SizingPage,
  TooltipPage,
  PopoverPage,
  DropdownMenuPage,
  AlertDialogPage,
  ToastPage,
  RadioGroupPage,
  LabelPage,
  SeparatorPage,
  SliderPage,
  ProgressPage,
  ScrollAreaPage,
  AccordionPage,
  CollapsiblePage,
  SkeletonPage,
  SpinnerPage,
  CardPage,
  KbdPage,
  CompositionPage,
} from "./pages";

const PAGES: Record<string, () => React.JSX.Element> = {
  introduction: IntroductionPage,
  sizing: SizingPage,
  colors: ColorsPage,
  typography: TypographyPage,
  button: ButtonPage,
  badge: BadgePage,
  input: InputPage,
  textarea: TextareaPage,
  select: SelectPage,
  checkbox: CheckboxPage,
  "radio-group": RadioGroupPage,
  switch: SwitchPage,
  toggle: TogglePage,
  slider: SliderPage,
  label: LabelPage,
  separator: SeparatorPage,
  avatar: AvatarPage,
  tabs: TabsPage,
  dialog: DialogPage,
  drawer: DrawerPage,
  "alert-dialog": AlertDialogPage,
  "dropdown-menu": DropdownMenuPage,
  popover: PopoverPage,
  tooltip: TooltipPage,
  toast: ToastPage,
  progress: ProgressPage,
  accordion: AccordionPage,
  collapsible: CollapsiblePage,
  "scroll-area": ScrollAreaPage,
  card: CardPage,
  skeleton: SkeletonPage,
  spinner: SpinnerPage,
  kbd: KbdPage,
  composition: CompositionPage,
};

function getHashPage(): string {
  const hash = window.location.hash.replace("#/", "").replace("#", "");
  return hash && hash in PAGES ? hash : "introduction";
}

function useHashRoute() {
  const page = useSyncExternalStore(
    (callback) => {
      window.addEventListener("hashchange", callback);
      return () => window.removeEventListener("hashchange", callback);
    },
    getHashPage,
    () => "introduction",
  );
  return page;
}

function navigate(page: string) {
  window.location.hash = `#/${page}`;
}

export type RadiusMode = "sharp" | "soft" | "round" | "pill";

export default function App() {
  const [dark, setDark] = useState(true);
  const [radius, setRadius] = useState<RadiusMode>("soft");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const activePage = useHashRoute();

  const Page = PAGES[activePage] ?? IntroductionPage;
  const meta = PAGE_META[activePage] ?? PAGE_META.introduction;

  useEffect(() => {
    if (!window.location.hash) {
      window.location.hash = "#/introduction";
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", dark ? "dark" : "light");
    if (radius !== "soft") root.setAttribute("data-radius", radius);
    else root.removeAttribute("data-radius");
  }, [dark, radius]);

  function handleNavigate(page: string) {
    navigate(page);
    setSidebarOpen(false);
  }

  return (
    <div
      data-theme={dark ? "dark" : "light"}
      data-radius={radius !== "soft" ? radius : undefined}
      className="docs-app"
      data-sidebar-open={sidebarOpen || undefined}
    >
      <Sidebar activePage={activePage} onNavigate={handleNavigate} />
      {sidebarOpen && (
        <div className="docs-sidebar-backdrop" onClick={() => setSidebarOpen(false)} />
      )}
      <Layout
        dark={dark}
        onToggleDark={setDark}
        radius={radius}
        onRadiusChange={setRadius}
        title={meta.title}
        description={meta.description}
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
      >
        <Page />
      </Layout>
    </div>
  );
}
