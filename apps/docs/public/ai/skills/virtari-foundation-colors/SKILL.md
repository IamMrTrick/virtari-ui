---
name: virtari-foundation-colors
description: "Use when implementing or reviewing Virtari Colors, themes and brands. Use semantic purpose rather than reconstructing palettes or guessing theme behavior."
---

# Colors, themes and brands

Use semantic purpose rather than reconstructing palettes or guessing theme behavior.

- The color cascade is primitives in tokens.base, brand overrides in tokens.brand, then purpose-based semantic variables and compatibility aliases in tokens. Preserve this order.
- Set data-theme='light', 'dark' or 'dark-oled' on the root or a scope. Prefer --vds-color-bg, --vds-color-text and the relevant surface, interactive, status or data-viz roles in component CSS.
- Twelve-step neutral and intent scales, alpha families, absolute black/white anchors and legacy scales coexist. Retrieve their actual values from the token inventory instead of converting names to guessed hex colors.
- Twelve-step neutral roles progress from canvas and surfaces (1–5), through boundaries (6–8), solids (9–10), to text (11–12). Dark raised surfaces use lighter steps.
- Use alpha tokens for overlays on existing color; assess the composited foreground/background, especially on tinted or translucent hosts.
- A brand customization belongs in the primitive hue layer. Use the template as a starting point and validate both themes plus nested scopes.
- Supporting text roles prioritize readability: neutral text-subtle shares neutral-11 with text-muted, intent text-muted follows its readable text role, and light warning text uses warning-12. Use type weight and spacing for hierarchy rather than reducing text opacity.

## Required usage

Use only names present in the source reference or MCP inventory. Do not invent CSS variables, utility classes, token values, arbitrary values, or Tailwind syntax. If the existing inventory cannot express a reusable design need, treat it as an upstream Virtari design-system change and update the authoritative token or utility source before application code consumes it.

## Pitfalls

- A numeric palette step or a semantic token name alone does not prove contrast against an arbitrary consumer background.
- The current brands/virtari.css declares an empty default scope. It does not redeclare every default primitive and must not be assumed to reset a custom ancestor brand.
- dark-oled changes the full neutral elevation scale, not only the canvas; inspect actual declarations rather than the outdated canvas-only source comment.

Read [source reference](references/source.md) for exact definitions. Query MCP `list_records` in `tokens` or `utilities` for filtered, paginated inventory; use `get_record` for this section ID `colors`. Values are source expressions: theme, inherited scope and CSS cascade determine the final computed value.
