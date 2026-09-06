---
name: virtari-react-code
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-code. Render inline code, read-only code blocks and controlled CodeMirror editors with Virtari styling."
---

# @virtari-packages/react-code

Use the existing package and its composition API. Verify the installed version against this snapshot (0.3.0); do not invent exports or Tailwind classes.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-code`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Use InlineCode for short code within prose, CodeBlock code=string renderer=static for lightweight read-only examples, and CodeEditor value/onValueChange for editable code. CodeBlock retains renderer=editor as its compatible default and virtualizes very large files; static renders the full source as semantic pre/code without an EditorView. CodeEditor is controlled and its ref points to the wrapper div.
- CodeBlock and CodeEditor share card/minimal/embedded variants and sm/md/lg sizes. Use embedded for a flush region with no radius; card and minimal follow the code radius contract.
- CodeBlock highlightLines uses one-based line numbers; diff=unified colors lines beginning with plus or minus without computing a diff. wrap controls long-line wrapping; maxHeight accepts pixels as a number or a CSS string.
- For CodeEditor use minLines/maxLines, tabSize and insertSpaces for editing geometry; append CodeMirror extensions via extensions when needed. editorLabel labels the editable source; CodeBlock codeLabel names its focusable source region. Both expose copyLabel/copiedLabel/copyErrorLabel for localized clipboard feedback. Code.css includes the copy control styles.
- Read KNOWN_LANGUAGES and resolveLanguage for actual language support. Unknown languages render as plain text; bash/shell/sh currently resolve to empty extensions. CodeBlock copyable defaults true and copies the original code string.

## Known limits and mistakes to avoid

- CodeEditor is a CodeMirror contenteditable editor, not a native textarea or a successful HTML form control. Manage submission and accessible labeling explicitly.
- Do not assume every accepted language string has syntax highlighting. CodeBlock does not expose an extensions prop; only CodeEditor does.
- The copy button uses Clipboard APIs through react-copy-button; clipboard availability and permissions remain host-browser concerns.

Related package IDs: `react-copy-button`, `react-textarea`, `react-card`, `react-text`. Discover their focused skills from the catalog; do not load all packages at once.
