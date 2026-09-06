---
name: virtari-react-select
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-select. Single-choice Select and searchable, multiple, asynchronous or virtualized Combobox compositions."
---

# @virtari-packages/react-select

Use the existing package and its composition API. Verify the installed version against this snapshot (1.1.0); do not invent exports, class names, CSS variables, or Tailwind utilities. In a source-owned application with `virtari.json`, import from its configured local target; package-name import guidance below applies only to package-consumer mode.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types. Before recreating this behavior, inspect `virtari.json` and the configured local target. If `virtari list` shows a matching registry item but it is absent locally, install that exact item with `virtari add <item>` and import the installed source.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction. Consume existing `--vds-*` semantic variables and exact `vds-u-*` utilities.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-select`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Compose Select with SelectTrigger, SelectValue, SelectContent and SelectItem; group options with SelectGroup/SelectLabel. Selection belongs on Select via value/defaultValue/onValueChange; visual size and appearance belong on SelectTrigger.
- SelectTrigger supports size 2xs through 2xl and appearance soft, outline, ghost or filled. loading communicates aria-busy; clearable requires an onClear handler that updates selection.
- Use SelectField's render function and apply controlId, describedBy and invalid to the actual trigger. Passing plain children does not automatically clone and wire them.
- Use Combobox with items containing stable value and label strings; compose ComboboxTrigger, ComboboxContent, ComboboxInput, ComboboxList and ComboboxOptions or explicit ComboboxItem children. Set multiple for string-array values; single mode uses strings.
- For asynchronous search supply onSearchChange, loading and updated items; external search is application-owned. Set virtualized for the built-in virtualized options rendering. name/form support serialized selection; validate required selection at the application layer where the API lacks a required prop.
- Select resolves document direction and accepts explicit dir. Preserve the components' active-descendant, listbox and focus handling rather than adding independent key handlers that compete with them.
- Non-searchable Combobox supports keyboard navigation and commit from its focused trigger. Virtual rows measure wrapped content; put disabled state in item data because unmounted rows cannot register item-only props. Give triggers persistent accessible names and retain selected item metadata when replacing async results.
- SelectField links rendered metadata (including zero) and infers invalid from error unless explicitly overridden. Forward its render-prop IDs and invalid to the actual trigger. SelectTrigger preserves native aria-invalid values when invalid is absent.

## Known limits and mistakes to avoid

- Do not pass native event handlers as onValueChange or assume SelectRoot accepts the trigger's appearance/size props.
- Combobox fetching, request cancellation and server-side validation are not built in. Keep empty results distinct from loading and errors.
- A render-prop SelectField is the safe route for linked labels/errors; a wrapper label alone cannot label an unconnected trigger.

Related package IDs: `react-fieldset`, `react-form`, `react-popover`, `react-scroll-area`, `tokens`. Discover their focused skills from the catalog; do not load all packages at once.
