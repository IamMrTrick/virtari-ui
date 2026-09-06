---
name: virtari-react-otp-input
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-otp-input. Segmented one-time-code entry with paste, autofill hints and digit normalization."
---

# @virtari-packages/react-otp-input

Use the existing package and its composition API. Verify the installed version against this snapshot (0.4.0); do not invent exports or Tailwind classes.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-otp-input`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Use OtpInput with string value/defaultValue and onChange; length defaults to 6 and type is numeric, alphanumeric or alphabetic. onComplete reports a filled code so the application can decide the next step.
- Provide a translated group label. autoComplete defaults to one-time-code on the first slot; normalizeDigits defaults to true for Persian/Arabic digits. Preserve full-code paste and the built-in slot focus handling.
- Use size sm, md or lg, mask for obscured slots, and required for native slot requirements. name adds a hidden serialized code input; form associates the component with an external form.
- The ref targets the root div, not an individual input. Use autoFocus only when entering the code is clearly the current task; selectOnFocus is true by default and automatic focus respects false.
- Root keyboard and paste handlers run before internal handling and may preventDefault to cancel it. Explicit invalid takes precedence over aria-invalid; native slot metadata includes linked errors. Code order remains LTR inside RTL forms, and slots wrap within narrow containers.

## Known limits and mistakes to avoid

- A completed code is not an authenticated code; expiration, retry limits and verification remain server/application responsibilities.
- Do not spread Input's seven-size union onto OtpInput: it supports only sm/md/lg. Its type describes character filtering rather than a native input type.
- Mask uses browser-dependent visual text security on text inputs, not password semantics. Slot label prefixes are customizable but their appended character-position phrase is currently English. Real SMS retrieval and mobile autofill depend on the consuming browser.

Related package IDs: `react-fieldset`, `react-form`, `utils`, `tokens`. Discover their focused skills from the catalog; do not load all packages at once.
