---
name: virtari-react-header
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-header. Application header composed from coordinated top/main/bottom rows and start/center/end sections."
---

# @virtari-packages/react-header

Use the existing package and its composition API. Verify the installed version against this snapshot (0.4.0); do not invent exports, class names, CSS variables, or Tailwind utilities. In a source-owned application with `virtari.json`, import from its configured local target; package-name import guidance below applies only to package-consumer mode.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types. Before recreating this behavior, inspect `virtari.json` and the configured local target. If `virtari list` shows a matching registry item but it is absent locally, install that exact item with `virtari add <item>` and import the installed source.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction. Consume existing `--vds-*` semantic variables and exact `vds-u-*` utilities.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-header`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Compose Header > HeaderTop/HeaderMain/HeaderBottom > HeaderStart/HeaderCenter/HeaderEnd. HeaderRow with slot is the explicit equivalent; rows require an enclosing Header context.
- Use at most one row per slot because sticky-height registration is keyed by top, main and bottom. Preserve semantic DOM order when arranging the rows.
- Choose sticky=none, always, smart or collapse per row. Header measures sticky row heights and exposes stack offsets; use Header stickyOffset only for content outside that stack.
- Set center on the row for a genuinely centered middle section with equal outer tracks. Use width, gutter, gap and height presets before arbitrary blockSize; contained=false enables edge-to-edge content.
- Smart and collapse modes observe the nearest vertically scrolling ancestor. An explicit collapseAt is a position in that container's scroll space.
- Use row as=nav with an accessible label only when that row itself is navigation; otherwise compose the Nav component inside header sections.

## Known limits and mistakes to avoid

- HeaderRow does not work as a standalone band outside Header; the context access intentionally throws.
- Duplicate slot registration overwrites a measured height rather than creating an arbitrary-length sticky stack.
- CSS sticky depends on ancestor overflow and available height. Test the actual page scroll owner rather than compensating for a broken container with hardcoded top offsets.
- transparent overrides the selected background; it does not ensure foreground contrast over arbitrary images.

Related package IDs: `react-layout`, `react-nav`, `react-sidebar`, `react-bottom-nav`. Discover their focused skills from the catalog; do not load all packages at once.
