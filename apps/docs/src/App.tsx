import { useState, useEffect, useSyncExternalStore } from "react";
import { useTranslation } from "react-i18next";
import { Toaster } from "@virtari-packages/react-toast";
import { Sidebar, MobileSidebar, Layout } from "./components";
import { SUPPORTED_LOCALES, isLocale, DEFAULT_LOCALE, type Locale } from "./i18n";
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
  DataTableProductsPage,
  DataTableOrdersPage,
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
  BottomNavPage,
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
  "data-table-products": DataTableProductsPage,
  "data-table-orders": DataTableOrdersPage,
  table: TablePage,
  utilities: UtilitiesPage,
  rtl: RTLPage,
  icons: IconsPage,
  heading: HeadingPage,
  text: TextPage,
  flag: FlagPage,
  "phone-input": PhoneInputPage,
  "language-picker": LanguagePickerPage,
  "bottom-nav": BottomNavPage,
};

/* Hash format: #/[locale]/[page] — locale is optional; missing locale
   means default (en). Examples:
   - #/introduction       → { locale: "en", page: "introduction" }
   - #/fa/introduction    → { locale: "fa", page: "introduction" }
   - #/en/button          → { locale: "en", page: "button" } */
function parseHash(): { locale: Locale; page: string } {
  const raw = window.location.hash.replace(/^#\/?/, "");
  if (!raw) return { locale: DEFAULT_LOCALE, page: "introduction" };
  const [first, ...rest] = raw.split("/");
  if (isLocale(first)) {
    const page = rest.join("/");
    return {
      locale: first,
      page: page && page in PAGES ? page : "introduction",
    };
  }
  return {
    locale: DEFAULT_LOCALE,
    page: first in PAGES ? first : "introduction",
  };
}

function useHashRoute() {
  return useSyncExternalStore(
    (callback) => {
      window.addEventListener("hashchange", callback);
      return () => window.removeEventListener("hashchange", callback);
    },
    () => {
      const { locale, page } = parseHash();
      return `${locale}|${page}`;
    },
    () => `${DEFAULT_LOCALE}|introduction`,
  );
}

function writeHash(locale: Locale, page: string) {
  /* `en` stays un-prefixed so existing links keep working; `fa` is always
     prefixed so the URL unambiguously reflects the locale. */
  const next = locale === DEFAULT_LOCALE ? `#/${page}` : `#/${locale}/${page}`;
  if (window.location.hash !== next) window.location.hash = next;
}

export type RadiusMode = "sharp" | "soft" | "round" | "pill";
export type Direction = "ltr" | "rtl";

const SETTINGS_KEY = "virtari.docs.settings";
const RADIUS_MODES: RadiusMode[] = ["sharp", "soft", "round", "pill"];

type Settings = {
  dark: boolean;
  radius: RadiusMode;
  direction: Direction;
  locale: Locale;
};

const DEFAULT_SETTINGS: Settings = {
  dark: true,
  radius: "soft",
  direction: "ltr",
  locale: DEFAULT_LOCALE,
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
      locale:
        typeof parsed.locale === "string" && isLocale(parsed.locale)
          ? parsed.locale
          : DEFAULT_SETTINGS.locale,
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export default function App() {
  const { i18n, t } = useTranslation();
  const [dark, setDark] = useState(() => readSettings().dark);
  const [radius, setRadius] = useState<RadiusMode>(() => readSettings().radius);
  const [direction, setDirection] = useState<Direction>(() => readSettings().direction);
  const [locale, setLocaleState] = useState<Locale>(() => readSettings().locale);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const route = useHashRoute();
  const [hashLocale, activePage] = route.split("|") as [Locale, string];

  const Page = PAGES[activePage] ?? IntroductionPage;

  /* Localized meta — falls back to the id if a translation is missing. */
  const meta = {
    title: t(`pageMeta:${activePage}.title`, { defaultValue: activePage }),
    description: t(`pageMeta:${activePage}.description`, { defaultValue: "" }),
  };

  /* First load: prime the hash from saved locale. */
  useEffect(() => {
    if (!window.location.hash) {
      writeHash(locale, "introduction");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Keep the hash locale and the state locale in sync. Hash is source of
     truth for navigation (deep links), state is source of truth for the
     switcher UI. When either side changes, reconcile. */
  useEffect(() => {
    if (hashLocale !== locale) setLocaleState(hashLocale);
  }, [hashLocale, locale]);

  /* Switch i18next language + set dir and lang attributes.
     Persian is RTL by default, English is LTR. The user can still flip
     direction independently via settings (useful for testing). */
  useEffect(() => {
    void i18n.changeLanguage(locale);
  }, [locale, i18n]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", dark ? "dark" : "light");
    if (radius !== "soft") root.setAttribute("data-radius", radius);
    else root.removeAttribute("data-radius");
    root.setAttribute("dir", direction);
    root.setAttribute("lang", locale === "fa" ? "fa" : "en");
    try {
      window.localStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify({ dark, radius, direction, locale }),
      );
    } catch {
      /* storage disabled — ignore */
    }
  }, [dark, radius, direction, locale]);

  function handleNavigate(page: string) {
    writeHash(locale, page);
    setSidebarOpen(false);
  }

  function handleLocaleChange(next: Locale) {
    setLocaleState(next);
    /* fa defaults to rtl, en to ltr — users can still override direction */
    setDirection(next === "fa" ? "rtl" : "ltr");
    writeHash(next, activePage);
  }

  const hrefFor = (page: string) =>
    locale === DEFAULT_LOCALE ? `#/${page}` : `#/${locale}/${page}`;

  return (
    <div
      data-theme={dark ? "dark" : "light"}
      data-radius={radius !== "soft" ? radius : undefined}
      data-vds-drawer-wrapper
      className="docs-app"
    >
      <Sidebar
        activePage={activePage}
        onNavigate={handleNavigate}
        hrefFor={hrefFor}
      />
      <MobileSidebar
        open={sidebarOpen}
        onOpenChange={setSidebarOpen}
        activePage={activePage}
        onNavigate={handleNavigate}
        hrefFor={hrefFor}
      />
      <Layout
        dark={dark}
        onToggleDark={setDark}
        radius={radius}
        onRadiusChange={setRadius}
        direction={direction}
        onDirectionChange={setDirection}
        locale={locale}
        onLocaleChange={handleLocaleChange}
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

export { SUPPORTED_LOCALES };
