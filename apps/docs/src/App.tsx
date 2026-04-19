import { useState, useEffect, useSyncExternalStore } from "react";
import { Toaster } from "@virtari-packages/react-toast";
import { Sidebar, MobileSidebar, Layout } from "./components";
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
  ChipPage,
  CompositionPage,
  DatePickerPage,
  DataTablePage,
  DataTableUsersPage,
  TablePage,
  LayoutPage,
  HeaderPage,
  NavPage,
  SidebarPage,
  UtilitiesPage,
  RTLPage,
  IconsPage,
  HeadingPage,
  TextPage,
  BreadcrumbPage,
  FlagPage,
  PhoneInputPage,
  LanguagePickerPage,
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
  chip: ChipPage,
  composition: CompositionPage,
  layout: LayoutPage,
  header: HeaderPage,
  nav: NavPage,
  sidebar: SidebarPage,
  breadcrumb: BreadcrumbPage,
  "date-picker": DatePickerPage,
  "data-table": DataTablePage,
  "data-table-users": DataTableUsersPage,
  table: TablePage,
  utilities: UtilitiesPage,
  rtl: RTLPage,
  icons: IconsPage,
  heading: HeadingPage,
  text: TextPage,
  flag: FlagPage,
  "phone-input": PhoneInputPage,
  "language-picker": LanguagePickerPage,
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
export type Direction = "ltr" | "rtl";

const SETTINGS_KEY = "virtari.docs.settings";
const RADIUS_MODES: RadiusMode[] = ["sharp", "soft", "round", "pill"];

type Settings = {
  dark: boolean;
  radius: RadiusMode;
  direction: Direction;
};

const DEFAULT_SETTINGS: Settings = {
  dark: true,
  radius: "soft",
  direction: "ltr",
};

function readSettings(): Settings {
  try {
    const raw = window.localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw) as Partial<Settings>;
    return {
      dark: typeof parsed.dark === "boolean" ? parsed.dark : DEFAULT_SETTINGS.dark,
      radius: RADIUS_MODES.includes(parsed.radius as RadiusMode)
        ? (parsed.radius as RadiusMode)
        : DEFAULT_SETTINGS.radius,
      direction:
        parsed.direction === "ltr" || parsed.direction === "rtl"
          ? parsed.direction
          : DEFAULT_SETTINGS.direction,
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export default function App() {
  const [dark, setDark] = useState(() => readSettings().dark);
  const [radius, setRadius] = useState<RadiusMode>(() => readSettings().radius);
  const [direction, setDirection] = useState<Direction>(() => readSettings().direction);
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
    root.setAttribute("dir", direction);
    root.setAttribute("lang", direction === "rtl" ? "fa" : "en");
    try {
      window.localStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify({ dark, radius, direction }),
      );
    } catch {
      /* storage disabled — ignore */
    }
  }, [dark, radius, direction]);

  function handleNavigate(page: string) {
    navigate(page);
    setSidebarOpen(false);
  }

  return (
    <div
      data-theme={dark ? "dark" : "light"}
      data-radius={radius !== "soft" ? radius : undefined}
      data-vds-drawer-wrapper
      className="docs-app"
    >
      <Sidebar activePage={activePage} onNavigate={handleNavigate} />
      <MobileSidebar
        open={sidebarOpen}
        onOpenChange={setSidebarOpen}
        activePage={activePage}
        onNavigate={handleNavigate}
      />
      <Layout
        dark={dark}
        onToggleDark={setDark}
        radius={radius}
        onRadiusChange={setRadius}
        direction={direction}
        onDirectionChange={setDirection}
        title={meta.title}
        description={meta.description}
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
      >
        <Page />
      </Layout>
      <Toaster />
    </div>
  );
}
