---
name: virtari-foundation-source-registry
description: "Use when implementing or reviewing Virtari Source-owned installation and registry. Use Virtari as editable project source through its CLI or the shadcn-compatible GitHub registry."
---

# Source-owned installation and registry

Use Virtari as editable project source through its CLI or the shadcn-compatible GitHub registry.

- Read virtari.json to locate the installed source tree; the consumer's local source is authoritative after installation.
- Use registry dependencies for transitive Virtari source and dependencies for external npm packages.
- Keep generated imports relative so custom target roots remain portable without TypeScript aliases.
- Use full owner/repository/item addresses for same-repository dependencies in a shadcn GitHub registry.

## Required usage

Use only names present in the source reference or MCP inventory. Do not invent CSS variables, utility classes, token values, arbitrary values, or Tailwind syntax. If the existing inventory cannot express a reusable design need, treat it as an upstream Virtari design-system change and update the authoritative token or utility source before application code consumes it.

## Pitfalls

- Bare registry dependency names resolve to shadcn built-in items rather than sibling GitHub items.
- Do not overwrite consumer edits implicitly; compare, preview, then require an explicit overwrite decision.
- Generated registry files must carry the same MIT terms as their authoritative package source.

Read [source reference](references/source.md) for exact definitions. Query MCP `list_records` in `tokens` or `utilities` for filtered, paginated inventory; use `get_record` for this section ID `source-registry`. Values are source expressions: theme, inherited scope and CSS cascade determine the final computed value.
