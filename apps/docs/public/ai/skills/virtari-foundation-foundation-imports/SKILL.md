---
name: virtari-foundation-foundation-imports
description: "Use when implementing or reviewing Virtari Foundation imports and cascade. The actual package exports and stylesheet dependency order that every integration needs."
---

# Foundation imports and cascade

The actual package exports and stylesheet dependency order that every integration needs.

- Import CSS with import '@virtari-packages/core'; import '@virtari-packages/tokens'; then each React package's documented /styles export. Core establishes cascade layer order before any layer is populated. Import '@virtari-packages/utilities' when using vds-u-* classes.
- Core declares top-level layers in this order: reset, tokens, base, components, design-system, utilities. React layout uses design-system.components; generated utility CSS uses utilities.
- Tokens is a CSS package. Its root exports dist/tokens.css; supported granular entries are listed in package.json, including /colors, /spacing, /sizing, /typography, /radii, /layout, /motion and /transition.
- Core depends on tokens as a package, but core/src/index.css does not import token CSS. Installing a dependency does not load its styles.
- Utility CSS uses a tokens peer dependency and does not load the token sheet for the consumer. Utils is a separate JavaScript/React helper package.
- Use package.json exports and source entry files to validate an import before generating consumer code; generic README boilerplate is not authoritative.

## Required usage

Use only names present in the source reference or MCP inventory. Do not invent CSS variables, utility classes, token values, arbitrary values, or Tailwind syntax. If the existing inventory cannot express a reusable design need, treat it as an upstream Virtari design-system change and update the authoritative token or utility source before application code consumes it.

## Pitfalls

- @virtari-packages/core/styles and @virtari-packages/tokens/styles are not exported. Neither foundation package exposes React component named imports.
- Unlayered application CSS outranks normal layered styles; declaring a layer name does not make an arbitrary override harmless.
- Granular source CSS contains imports, layers, custom media or modern syntax. The consumer build must support any source features it imports.

Read [source reference](references/source.md) for exact definitions. Query MCP `list_records` in `tokens` or `utilities` for filtered, paginated inventory; use `get_record` for this section ID `foundation-imports`. Values are source expressions: theme, inherited scope and CSS cascade determine the final computed value.
