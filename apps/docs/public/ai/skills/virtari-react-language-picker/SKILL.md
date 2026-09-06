---
name: virtari-react-language-picker
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-language-picker. Locale selection from the language catalog with popover or confirmable drawer presentation."
---

# @virtari-packages/react-language-picker

Use the existing package and its composition API. Verify the installed version against this snapshot (0.6.0); do not invent exports, class names, CSS variables, or Tailwind utilities. In a source-owned application with `virtari.json`, import from its configured local target; package-name import guidance below applies only to package-consumer mode.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types. Before recreating this behavior, inspect `virtari.json` and the configured local target. If `virtari list` shows a matching registry item but it is absent locally, install that exact item with `virtari add <item>` and import the installed source.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction. Consume existing `--vds-*` semantic variables and exact `vds-u-*` utilities.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-language-picker`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Use value/defaultValue/onChange with locale-tag strings. Restrict locales to translations the application actually supports; preferredLocales pins choices without defining a translation backend.
- Use uiLocale=en/fa/ar for picker meta copy and showNativeName for native-script subtitles. Changing the selected locale does not automatically update application messages, routing, document lang or dir: apply those in your integration.
- Use overlay=popover or drawer; drawerDirection and translated drawerTitle/drawerDescription/cancelLabel/applyLabel configure drawer presentation. Preserve its apply/cancel interaction when embedding it in settings.
- Size and appearance use Combobox's seven-size ramp and soft/outline/ghost/filled union. LanguageLabel, LanguagePickerOption, languages/languagesByLocale and localeToFlag support consistent language presentation elsewhere.
- The ref targets a root div. If selection belongs in a submitted form, add explicit serialization in application state; the public interface does not expose name/form props.

## Known limits and mistakes to avoid

- A country flag is only a display convention and is not a unique language identifier. Store locale tags, not flag codes or localized labels.
- Do not assume the complete language catalog means the application has translations for every listed locale. uiLocale controls picker copy, not the selected content language.

Related package IDs: `react-select`, `react-drawer`, `react-flag`, `react-form`, `tokens`. Discover their focused skills from the catalog; do not load all packages at once.
