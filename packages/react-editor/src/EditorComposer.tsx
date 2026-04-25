import {
  AutoFocusPlugin,
} from "@lexical/react/LexicalAutoFocusPlugin";
import {
  AutoLinkPlugin,
  type LinkMatcher,
} from "@lexical/react/LexicalAutoLinkPlugin";
import {
  CharacterLimitPlugin,
} from "@lexical/react/LexicalCharacterLimitPlugin";
import {
  CheckListPlugin,
} from "@lexical/react/LexicalCheckListPlugin";
import {
  EditorRefPlugin,
} from "@lexical/react/LexicalEditorRefPlugin";
import {
  HistoryPlugin,
} from "@lexical/react/LexicalHistoryPlugin";
import {
  LexicalComposer,
  type InitialConfigType,
} from "@lexical/react/LexicalComposer";
import {
  useLexicalComposerContext,
} from "@lexical/react/LexicalComposerContext";
import {
  LinkPlugin,
} from "@lexical/react/LexicalLinkPlugin";
import {
  ListPlugin,
} from "@lexical/react/LexicalListPlugin";
import {
  MarkdownShortcutPlugin,
} from "@lexical/react/LexicalMarkdownShortcutPlugin";
import {
  OnChangePlugin,
} from "@lexical/react/LexicalOnChangePlugin";
import {
  TablePlugin,
} from "@lexical/react/LexicalTablePlugin";
import {
  TabIndentationPlugin,
} from "@lexical/react/LexicalTabIndentationPlugin";
import { useEffect, useMemo, useState } from "react";
import type { Transformer } from "@lexical/markdown";
import { EDITOR_THEME } from "./theme";
import { EditorContext } from "./context";
import {
  buildEditorChangePayload,
  EMPTY_EDITOR_METRICS,
} from "./editor-utils";
import { EditorCodeHighlightPlugin } from "./EditorCodeHighlightPlugin";
import { EditorTrailingParagraphPlugin } from "./EditorTrailingParagraphPlugin";
import {
  buildEditorNodes,
  createInitialEditorState,
  DEFAULT_LINK_MATCHERS,
  DEFAULT_MARKDOWN_TRANSFORMERS,
  resolveEditorFeatures,
} from "./defaults";
import { EditorShortcutsPlugin } from "./EditorShortcutsPlugin";
import type { EditorComposerProps } from "./types";

function EditorEditablePlugin({ editable }: { editable: boolean }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.setEditable(editable);
  }, [editor, editable]);

  return null;
}

export function EditorComposer({
  namespace = "VirtariEditor",
  preset = "core",
  initialValue = null,
  initialValueFormat = "json",
  onChange,
  onError = (error) => {
    throw error;
  },
  readOnly = false,
  autoFocus = false,
  features,
  linkMatchers = DEFAULT_LINK_MATCHERS,
  markdownTransformers = DEFAULT_MARKDOWN_TRANSFORMERS,
  editorRef,
  children,
}: EditorComposerProps) {
  const resolvedFeatures = useMemo(
    () => resolveEditorFeatures(preset, features),
    [features, preset],
  );
  const [metrics, setMetrics] = useState(EMPTY_EDITOR_METRICS);

  const initialConfig = useMemo<InitialConfigType>(
    () => ({
      namespace,
      editable: !readOnly,
      nodes: buildEditorNodes(resolvedFeatures),
      onError,
      theme: EDITOR_THEME,
      editorState: createInitialEditorState(
        initialValue,
        initialValueFormat,
        markdownTransformers,
      ),
    }),
    [
      initialValue,
      initialValueFormat,
      markdownTransformers,
      namespace,
      onError,
      readOnly,
      resolvedFeatures,
    ],
  );

  const characterLimitCharset =
    resolvedFeatures.characterLimit?.charset ?? "UTF-16";

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <EditorContext.Provider
        value={{
          features: resolvedFeatures,
          metrics,
          linkMatchers,
          markdownTransformers,
          readOnly,
        }}
      >
        {editorRef ? <EditorRefPlugin editorRef={editorRef} /> : null}
        <EditorEditablePlugin editable={!readOnly} />

        {resolvedFeatures.history ? <HistoryPlugin /> : null}
        {resolvedFeatures.links ? <LinkPlugin /> : null}
        {resolvedFeatures.autoLinks ? (
          <AutoLinkPlugin matchers={linkMatchers as LinkMatcher[]} />
        ) : null}
        {resolvedFeatures.lists ? (
          <ListPlugin hasStrictIndent={resolvedFeatures.strictListIndent} />
        ) : null}
        {resolvedFeatures.checklists ? <CheckListPlugin /> : null}
        {resolvedFeatures.tables ? (
          <TablePlugin
            hasCellMerge={resolvedFeatures.tableCellMerge}
            hasCellBackgroundColor={resolvedFeatures.tableCellBackgroundColor}
            hasHorizontalScroll={resolvedFeatures.tableHorizontalScroll}
          />
        ) : null}
        {resolvedFeatures.markdownShortcuts ? (
          <MarkdownShortcutPlugin transformers={markdownTransformers} />
        ) : null}
        {resolvedFeatures.tabIndentation ? (
          <TabIndentationPlugin maxIndent={resolvedFeatures.maxIndent} />
        ) : null}
        {resolvedFeatures.characterLimit ? (
          <CharacterLimitPlugin
            charset={resolvedFeatures.characterLimit.charset ?? "UTF-16"}
            maxLength={resolvedFeatures.characterLimit.maxLength}
            renderer={() => (
              <span
                className="vds-editor-character-limit-meter"
                aria-hidden="true"
                hidden
              />
            )}
          />
        ) : null}
        {resolvedFeatures.codeBlocks ? <EditorCodeHighlightPlugin /> : null}
        {resolvedFeatures.shortcuts ? <EditorShortcutsPlugin /> : null}
        {!readOnly ? <EditorTrailingParagraphPlugin /> : null}
        <OnChangePlugin
          ignoreSelectionChange={true}
          onChange={(editorState, editor, tags) => {
            const payload = buildEditorChangePayload(
              editor,
              editorState,
              markdownTransformers,
              characterLimitCharset,
              tags,
            );
            setMetrics(payload);
            onChange?.(payload);
          }}
        />
        {autoFocus ? <AutoFocusPlugin /> : null}
        {children}
      </EditorContext.Provider>
    </LexicalComposer>
  );
}
