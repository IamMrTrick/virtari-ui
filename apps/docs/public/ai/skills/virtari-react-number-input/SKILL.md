---
name: virtari-react-number-input
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-number-input. Numeric draft editing with explicit stepping, range limits and field composition."
---

# @virtari-packages/react-number-input

Use the existing package and its composition API. Verify the installed version against this snapshot (0.3.0); do not invent exports or Tailwind classes.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-number-input`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- NumberInput uses number or undefined values and onChange(number | undefined), not a native change event. It preserves intermediate drafts such as '-' and '1.' while typing; controlled mode is selected by the presence of the value prop, including value=undefined.
- Use min/max/step and precision deliberately. step defaults to 1; clampOnBlur defaults to true. The rendered input is type=text with role=spinbutton and inputMode=decimal, so application validation must enforce numeric constraints on submission.
- Choose stepper=stacked for trailing chevrons or inline for minus/plus on logical sides. ArrowUp/ArrowDown perform stepping; wheelEnabled is false by default and only operates while focused.
- Use NumberInputField for label/help/error wiring, size 2xs through 2xl for geometry, and the native input ref for focus. name/form and other supported native attributes reach the text input; reset is explicitly handled through useFormReset.

## Known limits and mistakes to avoid

- Do not bind this component with an onChange handler that reads event.target.value. An empty numeric field is undefined, not automatically zero.
- This parser accepts ASCII decimal/exponent syntax, not locale-formatted grouping or Persian digits. Do not promise locale number parsing.
- Native number-input min/max constraint validation is not provided by its text input; blur clamping is not a replacement for validation.

Related package IDs: `react-fieldset`, `react-input`, `react-form`, `utils`. Discover their focused skills from the catalog; do not load all packages at once.
