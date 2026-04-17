const NAV_ITEMS = [
  { group: "Overview", items: [{ label: "Introduction", path: "introduction" }] },
  {
    group: "Foundations",
    items: [
      { label: "Sizing", path: "sizing" },
      { label: "Colors", path: "colors" },
      { label: "Typography", path: "typography" },
      { label: "Composition", path: "composition" },
    ],
  },
  {
    group: "Form Controls",
    items: [
      { label: "Button", path: "button" },
      { label: "Input", path: "input" },
      { label: "Textarea", path: "textarea" },
      { label: "Select", path: "select" },
      { label: "Checkbox", path: "checkbox" },
      { label: "Radio Group", path: "radio-group" },
      { label: "Switch", path: "switch" },
      { label: "Toggle", path: "toggle" },
      { label: "Slider", path: "slider" },
      { label: "Label", path: "label" },
    ],
  },
  {
    group: "Display",
    items: [
      { label: "Avatar", path: "avatar" },
      { label: "Badge", path: "badge" },
      { label: "Card", path: "card" },
      { label: "Separator", path: "separator" },
      { label: "Kbd", path: "kbd" },
      { label: "Progress", path: "progress" },
      { label: "Skeleton", path: "skeleton" },
      { label: "Spinner", path: "spinner" },
    ],
  },
  {
    group: "Overlays",
    items: [
      { label: "Dialog", path: "dialog" },
      { label: "Drawer", path: "drawer" },
      { label: "Alert Dialog", path: "alert-dialog" },
      { label: "Dropdown Menu", path: "dropdown-menu" },
      { label: "Popover", path: "popover" },
      { label: "Tooltip", path: "tooltip" },
      { label: "Toast", path: "toast" },
    ],
  },
  {
    group: "Layout",
    items: [
      { label: "Tabs", path: "tabs" },
      { label: "Accordion", path: "accordion" },
      { label: "Collapsible", path: "collapsible" },
      { label: "Scroll Area", path: "scroll-area" },
    ],
  },
];

export function Sidebar({
  activePage,
  onNavigate,
}: {
  activePage: string;
  onNavigate: (page: string) => void;
}) {
  return (
    <nav className="docs-sidebar">
      <a href="#/introduction" className="docs-sidebar-logo">
        <span className="docs-sidebar-logo-mark">V</span>
        <span className="docs-sidebar-logo-text">Virtari DS</span>
      </a>
      <div className="docs-sidebar-nav">
        {NAV_ITEMS.map((group) => (
          <div key={group.group} className="docs-sidebar-group">
            <span className="docs-sidebar-group-label">{group.group}</span>
            <ul className="docs-sidebar-list">
              {group.items.map((item) => (
                <li key={item.path}>
                  <a
                    href={`#/${item.path}`}
                    className="docs-sidebar-link"
                    data-active={activePage === item.path || undefined}
                    onClick={() => onNavigate(item.path)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
