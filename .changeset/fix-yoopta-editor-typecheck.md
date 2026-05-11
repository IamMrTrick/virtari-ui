---
"@virtari-packages/react-yoopta-editor": patch
---

Fix typecheck failures in `react-yoopta-editor`:

- `TabsElements`: move `variant="underline"` from `<Tabs>` (where it's not a valid prop) to `<TabsList>` (where the `TabsVariant` API lives).
- `TableHoverActions`: cast `path` arrays to `never` to work around `@yoopta/table` declaring `Location` without importing it from `slate` (which makes TS resolve to the DOM `Location` interface).
