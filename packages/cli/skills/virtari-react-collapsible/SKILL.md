---
name: virtari-react-collapsible
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-collapsible. Minimal single disclosure with primitive open state, trigger semantics and animated content."
---

# @virtari-packages/react-collapsible

Use the existing package and its composition API. Verify the installed version against this snapshot (1.1.0); do not invent exports, class names, CSS variables, or Tailwind utilities. In a source-owned application with `virtari.json`, import from its configured local target; package-name import guidance below applies only to package-consumer mode.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types. Before recreating this behavior, inspect `virtari.json` and the configured local target. If `virtari list` shows a matching registry item but it is absent locally, install that exact item with `virtari add <item>` and import the installed source.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction. Consume existing `--vds-*` semantic variables and exact `vds-u-*` utilities.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-collapsible`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Compose Collapsible > CollapsibleTrigger + CollapsibleContent. Use open/onOpenChange for controlled state or defaultOpen for an initial value.
- CollapsibleTrigger is the primitive trigger; compose it asChild with one actual button to retain existing Virtari Button styling and avoid nested buttons.
- CollapsibleContent forwards the primitive props and ref and only adds vds-collapsible-content. The stylesheet clips overflow and animates block size using --vds-collapsible-content-height and shared motion tokens.
- Use Accordion when several related disclosures need item values and group keyboard navigation; Collapsible does not add that group model.

## Known limits and mistakes to avoid

- No size, color, variant or heading API is added by this package; use composition rather than inventing unsupported props.
- Account for overflow clipping when placing focus rings or floating content inside the animated content wrapper.

Related package IDs: `react-accordion`, `react-button`, `react-nav`. Discover their focused skills from the catalog; do not load all packages at once.
