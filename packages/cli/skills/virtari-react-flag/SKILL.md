---
name: virtari-react-flag
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-flag. Render supported country and region SVG flags through static named imports or lazy code-based selection."
---

# @virtari-packages/react-flag

Use the existing package and its composition API. Verify the installed version against this snapshot (0.3.0); do not invent exports, class names, CSS variables, or Tailwind utilities. In a source-owned application with `virtari.json`, import from its configured local target; package-name import guidance below applies only to package-consumer mode.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types. Before recreating this behavior, inspect `virtari.json` and the configured local target. If `virtari list` shows a matching registry item but it is absent locally, install that exact item with `virtari add <item>` and import the installed source.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction. Consume existing `--vds-*` semantic variables and exact `vds-u-*` utilities.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-flag`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Use a named export such as FlagIr for a known flag, or Flag code=CountryCode for runtime selection. Consult countryCodes and hasFlag before accepting untrusted or free-form code values.
- Codes are the literal generated manifest keys, including lowercase country codes and selected regions. Flag uses a cached lazy loader and Suspense; fallback customizes the loading placeholder.
- Sizes are 2xs/xs/sm/md/lg/xl/2xl or a numeric inline size. rounded=true uses the theme-aware small flag radius, false gives hard corners, and full gives the circular treatment.
- Supply title when the flag conveys information independently. Without title, generated flags are decorative. Do not use a flag as the only visible description of a language choice.

## Known limits and mistakes to avoid

- An unsupported runtime code is not automatically converted into a fallback flag; fallback is the Suspense loading node, not an invalid-code recovery API.
- Do not equate every country flag with one language. Use react-language-picker or explicit localized text for language selection.

Related package IDs: `react-language-picker`, `react-phone-input`, `react-icons`. Discover their focused skills from the catalog; do not load all packages at once.
