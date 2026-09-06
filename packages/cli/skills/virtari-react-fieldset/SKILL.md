---
name: virtari-react-fieldset
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-fieldset. Native field grouping and reusable label/control/help/error/counter layout."
---

# @virtari-packages/react-fieldset

Use the existing package and its composition API. Verify the installed version against this snapshot (0.3.0); do not invent exports, class names, CSS variables, or Tailwind utilities. In a source-owned application with `virtari.json`, import from its configured local target; package-name import guidance below applies only to package-consumer mode.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types. Before recreating this behavior, inspect `virtari.json` and the configured local target. If `virtari list` shows a matching registry item but it is absent locally, install that exact item with `virtari add <item>` and import the installed source.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction. Consume existing `--vds-*` semantic variables and exact `vds-u-*` utilities.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-fieldset`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Use Fieldset with FieldsetLegend and FieldsetDescription to group related controls using native fieldset semantics; native disabled applies to descendant form controls.
- Use Field when composing a custom control and supply controlId matching its id. Provide descriptionId/errorId/counterId and apply composeFieldDescribedBy(...) to the control for deduplicated ARIA references.
- Field does not clone children. Forward invalid, required and disabled to the actual control as well as the presentation wrapper, or use InputField/TextareaField/NumberInputField/SelectField adapters that perform the relevant wiring.
- Use metaLayout=stacked or inline, logical descriptionAlign/errorAlign/counterAlign=start/end, and afterControl for content that belongs between the control and metadata. Keep spacing in the shared field styles.
- Use hasFieldContent when deciding whether to assign metadata IDs: numeric zero is content, while null, undefined, booleans, empty strings and arrays containing only absent values are not. Match the control references to Field's rendered metadata.

## Known limits and mistakes to avoid

- Field is a div-based composition, not a native fieldset or validation engine. A required star and data-disabled style do not implement native validity or disable a child.
- Rendering an error row alone does not link it to a control; wire ids and aria-describedby together.

Related package IDs: `react-input`, `react-textarea`, `react-number-input`, `react-select`, `react-form`. Discover their focused skills from the catalog; do not load all packages at once.
