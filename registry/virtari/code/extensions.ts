import { StateField, StateEffect, RangeSetBuilder, type Extension } from "@codemirror/state";
import { Decoration, EditorView, type DecorationSet } from "@codemirror/view";

/* ─────────────────────────────────────────────────────────────────────────
 * Line highlighting — paint a soft tint over an arbitrary set of 1-indexed
 * line numbers. Used by CodeBlock's `highlightLines` prop.
 * ───────────────────────────────────────────────────────────────────────── */

export const setHighlightedLines = StateEffect.define<number[]>();

const highlightLineDeco = Decoration.line({ class: "cm-line-highlighted" });

export const highlightLinesField = StateField.define<DecorationSet>({
  create: () => Decoration.none,
  update(prev, tr) {
    let value = prev.map(tr.changes);
    for (const effect of tr.effects) {
      if (effect.is(setHighlightedLines)) {
        const builder = new RangeSetBuilder<Decoration>();
        const doc = tr.state.doc;
        const sorted = [...new Set(effect.value)].sort((a, b) => a - b);
        for (const lineNumber of sorted) {
          if (lineNumber < 1 || lineNumber > doc.lines) continue;
          const line = doc.line(lineNumber);
          builder.add(line.from, line.from, highlightLineDeco);
        }
        value = builder.finish();
      }
    }
    return value;
  },
  provide: (f) => EditorView.decorations.from(f),
});

/* ─────────────────────────────────────────────────────────────────────────
 * Diff line decorations — line-level +/- backgrounds based on the leading
 * character of each line. Used when CodeBlock's `diff="unified"` is set.
 * Computed once on document changes; cheap because it's pure decoration.
 * ───────────────────────────────────────────────────────────────────────── */

const diffAddDeco = Decoration.line({ class: "cm-line-diff-add" });
const diffRemoveDeco = Decoration.line({ class: "cm-line-diff-remove" });

export const diffLinesField = StateField.define<DecorationSet>({
  create: (state) => buildDiffDecorations(state.doc.toString()),
  update(prev, tr) {
    if (!tr.docChanged) return prev;
    return buildDiffDecorations(tr.state.doc.toString());
  },
  provide: (f) => EditorView.decorations.from(f),
});

function buildDiffDecorations(source: string): DecorationSet {
  const builder = new RangeSetBuilder<Decoration>();
  let pos = 0;
  for (const line of source.split("\n")) {
    const first = line.charAt(0);
    if (first === "+") {
      builder.add(pos, pos, diffAddDeco);
    } else if (first === "-") {
      builder.add(pos, pos, diffRemoveDeco);
    }
    pos += line.length + 1; // +1 for the newline
  }
  return builder.finish();
}

/* ─────────────────────────────────────────────────────────────────────────
 * Auto-grow extension — bound the editor's height to a [min, max] range
 * expressed in lines. Used by CodeEditor.
 * ───────────────────────────────────────────────────────────────────────── */

export function autoGrowTheme(minLines?: number, maxLines?: number): Extension {
  const styles: Record<string, Record<string, string>> = {};
  if (minLines != null) {
    styles["&"] = { ...(styles["&"] ?? {}), minHeight: `calc(${minLines} * 1em * var(--vds-code-line-height, 1.6))` };
  }
  if (maxLines != null) {
    styles["&"] = { ...(styles["&"] ?? {}), maxHeight: `calc(${maxLines} * 1em * var(--vds-code-line-height, 1.6) + var(--vds-code-padding-block) * 2)` };
    styles[".cm-scroller"] = { overflow: "auto" };
  }
  return EditorView.theme(styles);
}
