---
name: virtari-foundation-typography
description: "Use when implementing or reviewing Virtari Typography, bidi and text alignment. Shared font, text-size and line-box roles without universal optical-offset assumptions."
---

# Typography, bidi and text alignment

Shared font, text-size and line-box roles without universal optical-offset assumptions.

- Typography supplies normal/medium/semibold/bold weights, sans/Latin/mono stacks, xs through 6xl sizes, six line-height roles and six tracking roles.
- The default sans stack starts Vazirmatn then Inter; the Latin stack starts Inter; the mono stack starts JetBrains Mono. The root font import fetches Vazirmatn and Inter from Google Fonts.
- Shared control line-height defaults to 1.5 in both LTR and RTL. Optical and indicator offsets default to 0px. Center line boxes with component layout; only introduce measured, font-specific optical adjustments.
- Keep meaningful labels visible, allow translated text to wrap where the component permits it, and set dir on a semantic scope. Use explicit LTR isolation for addresses, code or email when appropriate.
- Core includes an iOS-support-gated minimum 1rem font-size rule for input, textarea and select-trigger to reduce focus zoom. Verify the actual component and device.

## Required usage

Use only names present in the source reference or MCP inventory. Do not invent CSS variables, utility classes, token values, arbitrary values, or Tailwind syntax. If the existing inventory cannot express a reusable design need, treat it as an upstream Virtari design-system change and update the authoritative token or utility source before application code consumes it.

## Pitfalls

- No single transform offset can optically center all fonts or scripts. Glyph metrics and line-box alignment are different concerns.
- The root tokens import has a network font dependency. An offline or restrictive-CSP application must supply an approved font-loading strategy; JetBrains Mono is named but not fetched by fonts.css.
- Do not use placeholder text as the only field label or truncate necessary instructions merely to preserve a compact demonstration.

Read [source reference](references/source.md) for exact definitions. Query MCP `list_records` in `tokens` or `utilities` for filtered, paginated inventory; use `get_record` for this section ID `typography`. Values are source expressions: theme, inherited scope and CSS cascade determine the final computed value.
