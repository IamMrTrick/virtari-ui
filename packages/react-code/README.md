# Virtari Code

Use `CodeBlock` for source examples, `CodeEditor` for controlled editing, and `InlineCode` for identifiers in prose.

```tsx
import { CodeBlock, CodeEditor, InlineCode } from "@virtari-packages/react-code";
import "@virtari-packages/core";
import "@virtari-packages/tokens";
import "@virtari-packages/react-code/styles";

<CodeBlock
  renderer="static"
  language="tsx"
  filename="SaveAction.tsx"
  code={source}
  showLineNumbers
  maxHeight={320}
  codeLabel="Save action source"
/>
```

The static renderer uses semantic `pre`/`code`, the existing language parsers and the same syntax palette as the editor. It does not create an editor view. It renders the entire string, so use the compatible default `renderer="editor"` for very large files where virtualization is useful. Both support line numbers, one-based `highlightLines`, `diff="unified"`, wrapping and bounded internal scrolling. Diff mode marks existing plus/minus lines; it does not compute a diff.

`CodeEditor` accepts `value`, `onValueChange`, `editorLabel`, `readOnly`, `minLines`, `maxLines`, and additional CodeMirror `extensions`. It is a contenteditable editor, not a successful native form control: serialize its controlled value when submitting a form. `InlineCode` renders a `code` element; it has no `asChild` prop.

Both block components provide `copyLabel`, `copiedLabel` and `copyErrorLabel` for localized clipboard feedback. Their stylesheet includes the copy control styles. Clipboard access still depends on the browser and secure context.

Use `language="tsx"` for TypeScript containing JSX, `jsx` for JavaScript containing JSX, and `typescript`/`javascript` for plain source. `KNOWN_LANGUAGES` lists registered IDs including aliases. Shell and unknown languages currently render as plain text. The static path has no custom-extension API.

Sizes `sm`/`md`/`lg` follow typography and spacing tokens. `card` follows surface appearance; `minimal` removes the surface; `embedded` removes border and radius for a flush region in a containing surface. Scoped light/dark/OLED, surface style and radius modes are inherited. Syntax text, comments and line numbers use readable semantic text roles. Source stays left-to-right inside RTL interfaces; header and caption follow the interface direction.
