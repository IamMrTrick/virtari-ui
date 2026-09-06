---
name: virtari-primitives
description: "Use when building, reviewing, or troubleshooting @virtari-packages/primitives. Headless React behavior primitives underlying Virtari components, exposed through explicit package subpaths."
---

# @virtari-packages/primitives

Use the existing package and its composition API. Verify the installed version against this snapshot (1.0.0); do not invent exports or Tailwind classes.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `primitives`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Import from an exported subpath such as @virtari-packages/primitives/dialog, /tabs, /slot or /direction. There is no package-root export and no styles export.
- Prefer the styled react-* component for product UI; use primitives when intentionally authoring a new reusable behavior wrapper and supply the matching visual, focus and state styles.
- Read the selected subpath barrel and implementation before composing Root, Trigger, Content, Portal or other parts: each primitive has its own supported composition and required context.
- Slot requires one valid element, merges classes/styles and composes refs. Custom child components must forward the received ref and DOM props to their actual interactive element.
- Use DirectionProvider from /direction for shared logical direction; behavior must receive the same direction as CSS. Use the specific primitive's value/defaultValue or open/defaultOpen contract instead of synchronizing duplicated local state.

## Known limits and mistakes to avoid

- A styled package name and a primitive subpath do not guarantee identical APIs or defaults; do not import every primitive from @virtari-packages/primitives.
- Slot runs the child event handler before the slot handler, but Slot itself does not skip the second handler when defaultPrevented is true. Inspect the behavior wrapper's event composition before relying on cancellation.
- An asChild anchor cannot inherit native button disabled behavior; preserve correct semantics, an accessible name and deliberate disabled-event handling.
- Headless behavior is not a promise that arbitrary compositions meet accessibility requirements. Keep provider nesting, focus restoration, keyboard bindings and labels intact.

Related package IDs: `utils`, `react-tabs`, `react-segmented-control`, `react-scroll-area`. Discover their focused skills from the catalog; do not load all packages at once.
