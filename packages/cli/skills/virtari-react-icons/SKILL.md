---
name: virtari-react-icons
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-icons. Use the exported Tabler icon set through a Virtari wrapper with token sizes, semantic colors and accessible labeling."
---

# @virtari-packages/react-icons

Use the existing package and its composition API. Verify the installed version against this snapshot (0.4.0); do not invent exports, class names, CSS variables, or Tailwind utilities. In a source-owned application with `virtari.json`, import from its configured local target; package-name import guidance below applies only to package-consumer mode.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types. Before recreating this behavior, inspect `virtari.json` and the configured local target. If `virtari list` shows a matching registry item but it is absent locally, install that exact item with `virtari add <item>` and import the installed source.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction. Consume existing `--vds-*` semantic variables and exact `vds-u-*` utilities.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-icons`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Import Icon and a named Tabler component from this package, then pass the component through icon, for example Icon icon={IconSearch}. Use xs/sm/md/lg/xl sizes for shared sizing or a number for an explicit size.
- IconProvider supplies size, color and stroke defaults. An explicit Icon prop wins; nested providers replace the context value rather than merging each property with their parent.
- Use semantic color current/muted/subtle/primary/secondary/success/warning/danger/info. secondary intentionally uses the subtle icon role. Icons inherit currentColor by default.
- Icons without label are aria-hidden and not focusable. Supply label for a meaningful standalone image; for icon-only buttons, name the button and normally leave the icon decorative.

## Known limits and mistakes to avoid

- Although IconColor permits arbitrary strings, the wrapper only emits data-color and CSS recognizes its named colors. Use style color or a supported semantic color for a custom CSS color.
- Direct Tabler exports do not acquire the Virtari wrapper class, token size or wrapper accessibility defaults automatically.

Related package IDs: `react-button`, `react-input`, `react-text`, `tokens`. Discover their focused skills from the catalog; do not load all packages at once.
