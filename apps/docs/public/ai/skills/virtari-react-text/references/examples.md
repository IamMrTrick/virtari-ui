# Existing examples

- [HeadingPage.tsx](examples/HeadingPage.tsx.md)
- [TextPage.tsx](examples/TextPage.tsx.md)

All documentation sections importing this package (some demonstrate another package):

- `heading/1` — Levels; source `apps/docs/src/pages/HeadingPage.tsx` lines 12–23.
- `heading/2` — Size scale; source `apps/docs/src/pages/HeadingPage.tsx` lines 25–33.
- `heading/3` — Weights; source `apps/docs/src/pages/HeadingPage.tsx` lines 35–43.
- `heading/4` — Tone; source `apps/docs/src/pages/HeadingPage.tsx` lines 45–53.
- `heading/5` — Truncate & wrap; source `apps/docs/src/pages/HeadingPage.tsx` lines 55–68.
- `heading/6` — Usage; source `apps/docs/src/pages/HeadingPage.tsx` lines 70–81.
- `text/1` — Size scale; source `apps/docs/src/pages/TextPage.tsx` lines 16–24.
- `text/2` — Weights; source `apps/docs/src/pages/TextPage.tsx` lines 26–34.
- `text/3` — Tone; source `apps/docs/src/pages/TextPage.tsx` lines 36–44.
- `text/4` — Alignment; source `apps/docs/src/pages/TextPage.tsx` lines 46–55.
- `text/5` — Truncate & wrap; source `apps/docs/src/pages/TextPage.tsx` lines 57–69.
- `text/6` — As another element; source `apps/docs/src/pages/TextPage.tsx` lines 71–77.
- `text/7` — Usage; source `apps/docs/src/pages/TextPage.tsx` lines 79–87.

MCP: `get_record({collection:"examples",id:"<example ID>"})`; then `read_source` for full page context. A section fragment may reference imports, state, helper components, assets, docs CSS or shared page scaffolding.
