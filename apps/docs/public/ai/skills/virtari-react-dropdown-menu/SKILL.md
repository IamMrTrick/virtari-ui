---
name: virtari-react-dropdown-menu
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-dropdown-menu. Portaled action menu with primitive keyboard navigation, item selection and direction-aware placement."
---

# @virtari-packages/react-dropdown-menu

Use the existing package and its composition API. Verify the installed version against this snapshot (1.1.0); do not invent exports or Tailwind classes.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-dropdown-menu`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Compose DropdownMenu > DropdownMenuTrigger asChild + DropdownMenuContent containing DropdownMenuItem, Group, Label and Separator. Content creates its own portal and defaults sideOffset to 4.
- Use item onSelect for actions so keyboard activation follows the same path as pointer activation. Preserve the primitive's disabled and focus behavior rather than replacing menu items with unrelated clickable divs.
- Root forwards open/defaultOpen/onOpenChange and modal to the underlying primitive; explicit dir takes precedence over the auto document direction supplied through DirectionProvider.
- Use DropdownMenuLabel for noninteractive section labels and Separator between action groups. Provide a named trigger and use asChild when the trigger is already a Virtari Button.

## Known limits and mistakes to avoid

- The public package exports only Root, Trigger, Content, Item, Separator, Label and Group. It does not export checkbox/radio menu items or submenu wrappers; do not invent shadcn-style Sub or CheckboxItem imports.
- Content owns the portal; do not import a nonexistent DropdownMenuPortal wrapper from this package.
- A menu is an action collection; use Select for a form value and Popover for arbitrary interactive content.

Related package IDs: `react-button`, `react-select`, `react-popover`, `react-command`. Discover their focused skills from the catalog; do not load all packages at once.
