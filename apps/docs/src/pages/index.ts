export { IntroductionPage } from "./IntroductionPage";
export { ButtonPage } from "./ButtonPage";
export { BadgePage } from "./BadgePage";
export { InputPage } from "./InputPage";
export { SwitchPage } from "./SwitchPage";
export { CheckboxPage } from "./CheckboxPage";
export { TogglePage } from "./TogglePage";
export { AvatarPage } from "./AvatarPage";
export { TabsPage } from "./TabsPage";
export { SelectPage } from "./SelectPage";
export { DialogPage } from "./DialogPage";
export { DrawerPage } from "./DrawerPage";
export { ColorsPage } from "./ColorsPage";
export { TypographyPage } from "./TypographyPage";
export { SizingPage } from "./SizingPage";
export { TooltipPage } from "./TooltipPage";
export { PopoverPage } from "./PopoverPage";
export { DropdownMenuPage } from "./DropdownMenuPage";
export { AlertDialogPage } from "./AlertDialogPage";
export { ToastPage } from "./ToastPage";
export { RadioGroupPage } from "./RadioGroupPage";
export { LabelPage } from "./LabelPage";
export { SeparatorPage } from "./SeparatorPage";
export { SliderPage } from "./SliderPage";
export { ProgressPage } from "./ProgressPage";
export { ScrollAreaPage } from "./ScrollAreaPage";
export { AccordionPage } from "./AccordionPage";
export { CollapsiblePage } from "./CollapsiblePage";
export { TextareaPage } from "./TextareaPage";
export { SkeletonPage } from "./SkeletonPage";
export { SpinnerPage } from "./SpinnerPage";
export { CardPage } from "./CardPage";
export { KbdPage } from "./KbdPage";

export const PAGE_META: Record<string, { title: string; description: string }> = {
  introduction: { title: "Introduction", description: "Overview of the Virtari Design System." },
  sizing: { title: "Sizing", description: "Unified size system, height ramp, WCAG compliance." },
  colors: { title: "Colors", description: "OKLCH color palette and semantic token reference." },
  typography: { title: "Typography", description: "Font scale, weights, and font family tokens." },
  button: { title: "Button", description: "6 variants, 7 sizes, loading, icons, animations." },
  badge: { title: "Badge", description: "Small status indicators and labels." },
  input: { title: "Input", description: "Text input — 7 sizes aligned with Button." },
  textarea: { title: "Textarea", description: "Multi-line text input with auto-resize." },
  select: { title: "Select", description: "Dropdown selector with groups and search." },
  checkbox: { title: "Checkbox", description: "Multi-select with indeterminate state." },
  "radio-group": { title: "Radio Group", description: "Single choice from a list of options." },
  switch: { title: "Switch", description: "Toggle control for binary states." },
  toggle: { title: "Toggle", description: "Pressable toggle button." },
  slider: { title: "Slider", description: "Range input for numeric values." },
  label: { title: "Label", description: "Accessible form label." },
  separator: { title: "Separator", description: "Visual divider line." },
  avatar: { title: "Avatar", description: "Profile image with fallback initials." },
  tabs: { title: "Tabs", description: "Tabbed navigation panels." },
  dialog: { title: "Dialog", description: "Modal dialog with overlay." },
  drawer: { title: "Drawer", description: "Touch-friendly sliding panel." },
  "alert-dialog": { title: "Alert Dialog", description: "Confirmation dialog for destructive actions." },
  "dropdown-menu": { title: "Dropdown Menu", description: "Action menu with items and groups." },
  popover: { title: "Popover", description: "Positioned popup content." },
  tooltip: { title: "Tooltip", description: "Info popup on hover or focus." },
  toast: { title: "Toast", description: "Notification messages." },
  progress: { title: "Progress", description: "Loading and progress bar." },
  accordion: { title: "Accordion", description: "Collapsible content sections." },
  collapsible: { title: "Collapsible", description: "Show/hide content toggle." },
  "scroll-area": { title: "Scroll Area", description: "Custom scrollbar container." },
  card: { title: "Card", description: "Content container with header and footer." },
  skeleton: { title: "Skeleton", description: "Loading placeholder." },
  spinner: { title: "Spinner", description: "Loading indicator." },
  kbd: { title: "Kbd", description: "Keyboard shortcut badge." },
};
