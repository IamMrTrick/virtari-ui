---
name: virtari-react-input
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-input. Native text controls, field composition, password reveal and password-strength feedback."
---

# @virtari-packages/react-input

Use the existing package and its composition API. Verify the installed version against this snapshot (1.0.0); do not invent exports or Tailwind classes.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-input`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Use Input for an existing labeled composition; use InputField or PasswordInputField for label, description, error and counter wiring. Their ref targets the native input; className/style style the field wrapper, while inputClassName/inputStyle style the input.
- Input accepts native input attributes and event-shaped onChange. Keep id, name, type and autoComplete stable for browser autofill; choose current-password for sign-in and new-password for registration. Use value with onChange, or defaultValue for native uncontrolled input.
- Use size 2xs, xs, sm, md, lg, xl or 2xl (md default); inputSize is only a deprecated alias. Use inherited data-surface-style and data-field-tone=strong for a contrasting field on a tinted host instead of inventing an appearance prop.
- Compose decorative icons with InputWrapper and InputIcon side=start/end; use InputGroup plus InputAddon for affixes. InputIcon is aria-hidden: an interactive action needs its own named button outside that decorative slot.
- PasswordInput exposes controlled/uncontrolled reveal state independently from the text value. Configure strengthOptions, requirements and translated showPasswordLabel/hidePasswordLabel for the product; showStrengthMeter defaults to true and can be disabled for sign-in.
- InputField and PasswordInputField give explicit invalid priority, then preserve explicit aria-invalid (including grammar/spelling and false), otherwise infer invalid from rendered error content. Zero is valid metadata; absent/empty metadata and null counter formatters create no description IDs; maxLength=0 is displayed. PasswordInputField synchronizes its uncontrolled counter after an uncancelled native form reset; reveal retains button focus.

## Known limits and mistakes to avoid

- Do not remount an input, rewrite its key, prevent paste or enable typingPulse merely to implement focus feedback; typingPulse is opt-in and defaults to false.
- Password strength is local feedback, not server validation or a guarantee of password safety. A placeholder does not replace a persistent label.
- Input has no appearance/variant prop; native size is deliberately replaced by the design-system size union.

Related package IDs: `react-fieldset`, `react-form`, `react-label`, `react-button`, `tokens`. Discover their focused skills from the catalog; do not load all packages at once.
