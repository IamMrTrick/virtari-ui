---
name: virtari-react-date-picker
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-date-picker. Internationalized date/time fields, calendars and adaptive single/range picker overlays."
---

# @virtari-packages/react-date-picker

Use the existing package and its composition API. Verify the installed version against this snapshot (1.1.0); do not invent exports, class names, CSS variables, or Tailwind utilities. In a source-owned application with `virtari.json`, import from its configured local target; package-name import guidance below applies only to package-consumer mode.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types. Before recreating this behavior, inspect `virtari.json` and the configured local target. If `virtari list` shows a matching registry item but it is absent locally, install that exact item with `virtari add <item>` and import the installed source.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction. Consume existing `--vds-*` semantic variables and exact `vds-u-*` utilities.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-date-picker`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Choose DateField or TimeField for segmented entry, Calendar or RangeCalendar for standalone selection, and DatePicker or DateRangePicker for field-plus-overlay composition. Public values use @internationalized/date DateValue types rather than JavaScript Date or arbitrary strings.
- Use re-exported CalendarDate, CalendarDateTime, ZonedDateTime, Time and parseDate/parseTime helpers to construct the correct value. Keep timezone and calendar conversion explicit instead of formatting a locale string and parsing it back.
- Pickers accept value/defaultValue/onChange plus minValue/maxValue/isDateUnavailable. Use isDisabled/isReadOnly/isRequired/isInvalid, label/description/errorMessage, name/form and validationBehavior according to the actual picker interface.
- Use size 2xs through 2xl and appearance soft/outline/ghost/filled. Set calendar and locale deliberately; I18nProvider/useLocale and the exported calendar engine support internationalized composition.
- overlayMode is auto, popover, drawer or dialog; mobilePresentation selects drawer/dialog and mobileSizeMode selects content/full. Use presets render props for values that must update picker state, and showTimePicker/granularity/hourCycle for time-bearing values.

## Known limits and mistakes to avoid

- Do not pass Input-style disabled/required props to interfaces that expose isDisabled/isRequired. The picker ref is a root div, not a native text input.
- A date-only CalendarDate has no timezone or time; do not silently convert it to a timestamp. Check each exported component's interface because time/range/standalone APIs differ.

Related package IDs: `react-popover`, `react-drawer`, `react-dialog`, `react-form`, `tokens`. Discover their focused skills from the catalog; do not load all packages at once.
