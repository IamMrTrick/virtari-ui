---
name: virtari-design-system
description: Use when starting a UI with Virtari Design System, choosing its packages, or locating its design tokens, utilities, examples and package skills.
---

# Work with Virtari

1. Identify the task: composition, component behavior, tokens, utilities or an existing UI review. Read [package and section index](references/index.md), then load only the relevant skill.
2. With MCP, call `list_records` to search packages or sections. Call `get_record` for selected IDs, then `read_source` when types, behavior or full example context are needed. Follow pagination until the needed information is found.
3. Without MCP, open the referenced skills in this bundle or read `ai/catalog.json` and the corresponding source files in the repository. Install/copy focused skills with their references directory, not SKILL.md alone.
4. Load `@virtari-packages/core` first to declare cascade layers, then `@virtari-packages/tokens` CSS, then each component's exported stylesheet. The utilities CSS and JS utils are different packages. Check export maps instead of guessing /styles paths.
5. Compose existing components with public props. Use semantic token roles and exact generated vds-u-* classes. The utilities package has no arbitrary-value or Tailwind parser.
6. Adapt real examples with their state, helper components and imports. A documentation Section is a wrapper, not a standalone application. Check accessibility, form serialization, focus, keyboard, RTL, surfaces and nested shape for the actual composition.

The snapshot documents existing limitations in each package's pitfalls. Do not claim a limitation is fixed merely because its usage is documented. Match the installed package version; regenerate knowledge after source changes.
