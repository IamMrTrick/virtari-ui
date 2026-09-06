---
name: virtari-foundation-layout-utilities
description: "Use when implementing or reviewing Virtari React layout utilities. Semantic page primitives and small reusable arrangements instead of repeated bespoke wrappers."
---

# React layout utilities

Semantic page primitives and small reusable arrangements instead of repeated bespoke wrappers.

- Import Main, Section, Container, Row, Col, Stack, Cluster, Grid, Sidebar and Center from '@virtari-packages/react-layout'; load '@virtari-packages/react-layout/styles'.
- Use Main for the document's dominant landmark; it defaults id='main', tabIndex=-1, padding='none' and gutter='none'. Section owns page bands and an optional inner container.
- Use Stack for vertical rhythm, Cluster for inline groups and Grid for intrinsic auto-fit cards. Grid accepts minItemWidth; Container accepts maxInlineSize for deliberate width overrides.
- Row supports grid or flex; Col supports base/sm/md/lg/xl spans, start placement and flex grow/shrink/basis. Use actual prop types rather than inventing Tailwind-like props.
- The layout Sidebar is a wrapping two-child split using .vds-split and --split-* variables. It is distinct from the app-chrome react-sidebar package.
- Use the shared --vds-app-chrome-row role to align page and sidebar chrome where those components consume it.

## Pitfalls

- Avoid multiple visible main landmarks. Using a div arrangement does not supply semantic section names or heading hierarchy automatically.
- Stack recursive applies descendant sibling margins as well as the outer gap; do not enable it indiscriminately around components that already own their internal spacing.
- Visual reverse/order does not reorder reading or tab order; preserve a meaningful DOM sequence.
- The split Sidebar expects two meaningful children and is not a collapsible navigation widget.

Read [source reference](references/source.md) for exact definitions. Query MCP `list_records` in `tokens` or `utilities` for filtered, paginated inventory; use `get_record` for this section ID `layout-utilities`. Values are source expressions: theme, inherited scope and CSS cascade determine the final computed value.
