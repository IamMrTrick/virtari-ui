---
name: virtari-foundation-css-utilities
description: "Use when implementing or reviewing Virtari CSS utilities and selector grammar. Finite generated token-backed utilities, grouped independently from React helpers."
---

# CSS utilities and selector grammar

Finite generated token-backed utilities, grouped independently from React helpers.

- The canonical generator emits vds-u-* classes in the utilities layer. Import '@virtari-packages/utilities'. Supported families are display, spacing, gap, flex/alignment, grid, logical sizing, position/inset, overflow and semantic z-index.
- Spacing fragments are m/p (all), mi/pi (inline), mb/pb (block), mis/pis and mie/pie (inline start/end), mbs/pbs and mbe/pbe (block start/end). Example: vds-u-pi-4 is padding-inline: var(--vds-space-4).
- Margin supports auto; padding does not. Decimal keys use dashes, for example vds-u-gap-1-5. Gap and numeric size utilities use a smaller 18-key subset of the 35-key spacing scale.
- Widths/heights use inline-size/block-size. Supported fractions are 1/2, 1/3, 2/3, 1/4 and 3/4. Author vds-u-w-1/2 in markup; escaping belongs to the emitted CSS selector.
- Use sm:, md:, lg:, xl: or 2xl: prefixes before the whole class, such as md:vds-u-grid-cols-3. Minimum widths are 640, 768, 1024, 1280 and 1536px, compiled from custom media at build time.
- Grid utilities support 1–12 columns, 1–6 rows and spans; auto-fit/auto-fill use a 16rem minimum capped to available width.
- Core separately provides vds-sr-only, vds-visually-hidden and vds-not-sr-only. These are not part of the vds-u-* generator and must not be mistaken for display:none.

## Pitfalls

- This is not a Tailwind parser or JIT runtime: arbitrary brackets, hover: variants, negative spacing, inferred color/radius/typography classes and unsupported scale keys do not exist unless present in the actual inventory.
- mb means margin-block, not margin-bottom; pb means padding-block, not padding-bottom. Use mbe/pbe for block-end.
- Utility numeric width/height intentionally reference spacing tokens; component floating-panel width roles remain a separate semantic contract.
- Overflow-x/y utilities use physical CSS axes; do not describe every generated declaration as logical.
- Breakpoint thresholds are compiled media conditions, not live runtime CSS custom-property values.

Read [source reference](references/source.md) for exact definitions. Query MCP `list_records` in `tokens` or `utilities` for filtered, paginated inventory; use `get_record` for this section ID `css-utilities`. Values are source expressions: theme, inherited scope and CSS cascade determine the final computed value.

Read [exact base classes](references/classes.md) for the finite utility inventory and owning stylesheets.
