---
name: virtari-design-system
description: Use when starting, implementing, or reviewing any UI in a Virtari project; discovers existing components before composing or creating UI with Virtari tokens and utilities.
---

# Work with Virtari

## Discover before implementation

1. Read `virtari.json`. Treat its `target` as the authoritative application source and import `<target>/styles/index.css` once.
2. Search that target for an existing component and inspect its public exports. Also search the registry with `virtari list`; with MCP, call `list_records` for packages, examples, tokens, and utilities, then `get_record` for candidates.
3. If the registry contains the component but the target does not, run `virtari add <item>`. Import the installed editable source. Do not reproduce an available component with raw markup or application-local CSS.
4. Read the focused package skill from [the discovery index](references/index.md). Use `read_source` only when types, behavior, or complete example context are needed.

## Compose when no component exists

Start with semantic HTML and installed Virtari primitives. Prefer Layout, Section, Container, Stack, Row, Grid, Header, Nav, and existing controls before adding a reusable abstraction. Use exact `vds-u-*` utilities from the utility inventory; there is no arbitrary-value or Tailwind parser.

Create a reusable component only when the composition needs a stable API. Follow the local package structure: `Component.tsx`, `Component.tokens.css`, `Component.css`, and `index.ts`. Use a `vds-<component>` namespace, native semantics, accessible names, keyboard behavior, visible focus, RTL-safe logical properties, and consumer event-handler composition.

A component token file consumes existing semantic `--vds-*` variables. Do not declare new custom properties by default, copy raw colors, spacing, radius, shadow, typography, or motion values, or invent utility classes. When no existing token expresses a reusable need, update the authoritative Virtari token source as a design-system change before using it in application code.

## Verify

Adapt complete examples with their state and imports; documentation sections are not application shells. Check responsive layout, surfaces, nested radius, text/icon alignment, focus, keyboard, form serialization, disabled/error states, RTL, themes, reduced motion, and high contrast. Match the installed registry revision and documented limitations.
