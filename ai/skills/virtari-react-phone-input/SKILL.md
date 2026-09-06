---
name: virtari-react-phone-input
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-phone-input. Country-aware telephone entry, normalized digits and canonical E.164 submission."
---

# @virtari-packages/react-phone-input

Use the existing package and its composition API. Verify the installed version against this snapshot (1.0.1); do not invent exports or Tailwind classes.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-phone-input`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Use PhoneInput with string value/defaultValue; onChange returns PhoneInputValue containing country, national, e164 and isValid. Set defaultCountry when a national number has no explicit country and preferredCountries for frequently used choices.
- name creates a hidden E.164 input for submission; the visible input is tel with tel-national autocomplete. The forwarded ref targets that visible input, and native form/reset association is supported.
- Use locale en/fa/ar for country names and normalizeDigits (true by default) for Persian/Arabic digits. Give the visible number a real label; label customizes the country trigger's accessible label, not a rendered field label.
- Use size 2xs through 2xl and PhoneInputCountrySelect for separate country composition. Exported usePhoneInput, toE164, isValidPhone, normalizeDigits and country maps support custom presentation with the same parsing data.
- Use onValidityChange for validation feedback and treat canonical E.164 and display national text as distinct values. readOnly also disables country changes.

## Known limits and mistakes to avoid

- onChange does not return a React event or a plain string. Do not submit the localized display string when the server expects E.164.
- Country-change announcements currently include English text even with locale=fa/ar. invalid references a generated error id; supply a valid aria-errormessage or linked external error when composing an error message.

Related package IDs: `react-select`, `react-input`, `react-fieldset`, `react-flag`, `react-form`. Discover their focused skills from the catalog; do not load all packages at once.
