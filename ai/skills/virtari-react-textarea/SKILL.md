---
name: virtari-react-textarea
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-textarea. Native multiline text input and a labeled field wrapper with linked metadata."
---

# @virtari-packages/react-textarea

Use the existing package and its composition API. Verify the installed version against this snapshot (0.4.0); do not invent exports or Tailwind classes.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-textarea`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Textarea forwards native textarea attributes, onChange events and an HTMLTextAreaElement ref. Use value/onChange or defaultValue and retain native rows, maxLength, name, form, required and readOnly behavior.
- Use TextareaField for label, description, error, showCounter and counterFormatter. className/style target the wrapper; textareaClassName/textareaStyle target the native control.
- Use the shared seven-step size ramp from 2xs to 2xl (md default); inputSize is deprecated. Size controls field geometry, while rows controls initial multiline capacity.
- Inherit data-surface-style and data-field-tone for surface separation. Leave typingPulse false unless explicitly desired.

## Known limits and mistakes to avoid

- There is no autosize, variant or appearance prop in TextareaProps; implement additional behavior explicitly rather than borrowing another library's API.
- Do not intercept Enter as a submit action by default in a multiline editor, or replace visible help/error text with color alone.

Related package IDs: `react-input`, `react-fieldset`, `react-form`, `tokens`. Discover their focused skills from the catalog; do not load all packages at once.
