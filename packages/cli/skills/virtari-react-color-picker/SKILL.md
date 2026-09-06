---
name: virtari-react-color-picker
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-color-picker. Solid/gradient color editing with serialization utilities and configurable picker chrome."
---

# @virtari-packages/react-color-picker

Use the existing package and its composition API. Verify the installed version against this snapshot (1.0.0); do not invent exports, class names, CSS variables, or Tailwind utilities. In a source-owned application with `virtari.json`, import from its configured local target; package-name import guidance below applies only to package-consumer mode.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types. Before recreating this behavior, inspect `virtari.json` and the configured local target. If `virtari list` shows a matching registry item but it is absent locally, install that exact item with `virtari add <item>` and import the installed source.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction. Consume existing `--vds-*` semantic variables and exact `vds-u-*` utilities.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-color-picker`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- ColorPicker accepts a CSS color/gradient string or ColorPickerValue via value/defaultValue. onValueChange returns both serialized CSS and ColorPickerChangeDetail; preserve the structured detail when further editing needs stop/type information.
- Use mode=solid, gradient or both, allowedTypes for subtype restrictions, allowAlpha and swatches for product constraints. format/defaultFormat and view/defaultView have their own change callbacks independent from color state.
- Use appearance=card, flat or floating for container chrome. These values differ from Select/DatePicker appearances and are not global surface modes.
- Use exported parseColorPickerValue/serializeColorPickerValue/createColorPickerValue and gradient-stop utilities for programmatic edits instead of manipulating serialized gradient strings with ad-hoc splitting.
- Eyedropper capability is environment-dependent; retain the manual color-entry path. Explicitly serialize the selected CSS value when placing this editor in a form.

## Known limits and mistakes to avoid

- The root is a div editor with no native name/form value serialization or generic size prop. Do not pass Input's API to it.
- Picking a color does not guarantee a compliant foreground/background contrast pair; assess its actual intended surface and text role.

Related package IDs: `react-input`, `react-slider`, `react-tabs`, `react-fieldset`, `tokens`. Discover their focused skills from the catalog; do not load all packages at once.
