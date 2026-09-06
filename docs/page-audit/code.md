# Code page and package review

Reviewed against [component quality](../component-quality.md). Owning package: `packages/react-code`; page: `apps/docs/src/pages/CodePage.tsx`.

## Defects and changes

- Read-only blocks previously mounted CodeMirror editor views for every short string. Added opt-in `renderer="static"` using the existing Lezer parsers and the exact editor highlight specifications, with semantic pre/code, selectable original text, line numbers, highlights, diff cues, wrapping and max-height scrolling. The compatible default remains the virtualized editor renderer.
- Comments, punctuation and gutter text used the subtle foreground intended for less prominent graphics. They now use the muted readable text role. Code surfaces use the container role, appearance border/shadow roles and an alpha header layer. Shape remains tied to code radius roles; embedded surfaces retain zero radius.
- Missing minimum-inline-size/contained overflow could make long snippets widen a flex/grid parent. The package now contains source overflow; inline identifiers wrap within narrow prose. Source direction is LTR within RTL interfaces, while chrome retains interface direction.
- Copy controls were unstyled when consumers imported only the exported code stylesheet. Their package styles are now included in the code CSS build. Both block components forward localized copy/success/error labels to the actual CopyButton, with its composed interaction and status feedback.
- Added `editorLabel` for the actual contenteditable source and `codeLabel` for the read-only source region. Fixed stale editor highlights when clearing highlighted lines, initial highlight application, rejected/later language resolutions and prototype-name language IDs. Unknown languages remain readable plain text.
- Replaced page-local Field/label, stack and Card header markup with package components. Corrected the claimed InlineCode asChild API, grammar count, damaged JavaScript sample, invented Card CSS and a Python generator-consumption example. The page now has 15 static blocks and one actual live editor.

## Checks

- `pnpm --filter @virtari-packages/react-code typecheck` passes.
- `pnpm --filter @virtari-packages/react-code build` passes (JS, types and exported CSS, including copy styling).
- Chromium fixture `/tests/code-quality.html`: 1,338 checks passed over light/dark/OLED × bordered/tonal/elevated × sharp/soft/round/pill, including RTL, exact source, static DOM, line states, wrapping, bounded scrolling, editor naming and highlight clearing. Measured minimum syntax/header/gutter text contrast: 5.07:1 on the composed tested surfaces, including highlighted/diff lines.
- Inspected rendered package-only light surfaces and the dark Code documentation page. Code page contains 15 static blocks, one editor and no horizontal document overflow.

## Limits

Static rendering creates DOM for the complete string and still ships the package's existing parsers. It is not virtualization or a smaller language bundle. Use the editor renderer for large files. Tests cover Chromium; Safari clipboard permission, platform selection and arbitrary consumer background/font overrides need consuming-application verification. The contrast check covers the actual sample token categories and default theme surfaces, not every possible override. Root performs final docs compilation and AI regeneration/checks after integrating all page work.
