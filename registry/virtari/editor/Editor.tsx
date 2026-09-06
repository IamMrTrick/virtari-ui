import type { RefCallback, RefObject } from "react";
import { useEffect, useRef, useState } from "react";
import {
  $getSelection,
  $isRangeSelection,
  type LexicalEditor,
  type RangeSelection,
} from "lexical";
import { cn } from "../../lib/utils";
import {
  DEFAULT_MARKDOWN_TRANSFORMERS,
  resolveEditorFeatures,
} from "./defaults";
import { EditorCommentsPanel } from "./EditorCommentsPanel";
import { EditorComposer } from "./EditorComposer";
import { EditorDraggableBlocks } from "./EditorDraggableBlocks";
import { EditorFloatingToolbar } from "./EditorFloatingToolbar";
import { EditorInsertMenu } from "./EditorInsertMenu";
import { EditorModeSwitcher } from "./EditorModeSwitcher";
import { EditorSlashMenu } from "./EditorSlashMenu";
import { EditorSourcePanel } from "./EditorSourcePanel";
import { EditorStatusBar } from "./EditorStatusBar";
import { EditorSurface } from "./EditorSurface";
import { EditorTableHoverActions } from "./EditorTableHoverActions";
import { EditorToolbar } from "./EditorToolbar";
import {
  applySourceValue,
  countCharacters,
  countWords,
  getSelectionText,
  readEditorSnapshot,
  readSourceValue,
  removeCommentMark,
  wrapSelectionInComment,
} from "./editor-utils";
import type {
  EditorCommentThread,
  EditorFloatingToolbarProps,
  EditorInsertMenuProps,
  EditorMode,
  EditorModeSwitcherProps,
  EditorProps,
  EditorSlashMenuProps,
  EditorStatusBarProps,
  EditorToolbarProps,
} from "./types";

function resolvePartProps<T extends object>(
  value: boolean | T | undefined,
): [boolean, T] {
  if (value === false) return [false, {} as T];
  if (value === true || value === undefined) return [true, {} as T];
  return [true, value];
}

function applyMergedEditorRef(
  target:
    | RefCallback<LexicalEditor>
    | RefObject<LexicalEditor | null | undefined>
    | undefined,
  editor: LexicalEditor | null,
) {
  if (!target) return;

  if (typeof target === "function") {
    target(editor as LexicalEditor);
    return;
  }

  target.current = editor;
}

export function Editor({
  className,
  style,
  surfaceClassName,
  surfaceStyle,
  toolbar,
  insertMenu,
  statusBar,
  slashMenu,
  floatingToolbar,
  modeSwitcher,
  blockTools,
  preset = "pro",
  readOnly = false,
  namespace,
  initialValue,
  initialValueFormat = "json",
  onChange,
  onError,
  autoFocus,
  features,
  linkMatchers,
  markdownTransformers,
  editorRef,
  defaultMode = "rich-text",
  mode,
  onModeChange,
  onCommentsChange,
  id,
  placeholder,
  placeholderText,
  contentClassName,
  contentStyle,
  placeholderClassName,
  minHeight,
  maxHeight,
  role,
  tabIndex,
  autoCapitalize,
  autoComplete,
  "aria-activedescendant": ariaActivedescendant,
  "aria-autocomplete": ariaAutocomplete,
  "aria-controls": ariaControls,
  "aria-describedby": ariaDescribedBy,
  "aria-expanded": ariaExpanded,
  "aria-invalid": ariaInvalid,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-owns": ariaOwns,
  "data-testid": dataTestId,
  dir,
  lang,
  spellCheck,
}: EditorProps) {
  const [toolbarEnabled, toolbarProps] = resolvePartProps<EditorToolbarProps>(
    toolbar ?? (preset === "pro"),
  );
  const [insertMenuEnabled, insertMenuProps] =
    resolvePartProps<EditorInsertMenuProps>(
      insertMenu ?? (preset === "pro"),
    );
  const [statusBarEnabled, statusBarProps] =
    resolvePartProps<EditorStatusBarProps>(
      statusBar ?? (preset === "pro"),
    );
  const [slashMenuEnabled, slashMenuProps] =
    resolvePartProps<EditorSlashMenuProps>(
      slashMenu ?? (preset === "pro"),
    );
  const [floatingToolbarEnabled, floatingToolbarProps] =
    resolvePartProps<EditorFloatingToolbarProps>(
      floatingToolbar ?? (preset === "pro"),
    );
  const [modeSwitcherEnabled, modeSwitcherProps] =
    resolvePartProps<EditorModeSwitcherProps>(
      modeSwitcher ?? (preset === "pro"),
    );

  const internalEditorRef = useRef<LexicalEditor | null>(null);
  const appliedModeRef = useRef<EditorMode>("rich-text");
  const commentSelectionRef = useRef<RangeSelection | null>(null);
  const sourceValueRef = useRef("");
  const [uncontrolledMode, setUncontrolledMode] =
    useState<EditorMode>(defaultMode);
  const [surfaceElement, setSurfaceElement] = useState<HTMLDivElement | null>(null);
  const [comments, setComments] = useState<EditorCommentThread[]>([]);
  const [commentComposerOpen, setCommentComposerOpen] = useState(false);
  const [commentDraft, setCommentDraft] = useState("");
  const [pendingCommentQuote, setPendingCommentQuote] = useState("");
  const [sourceValue, setSourceValue] = useState("");

  const activeMode = mode ?? uncontrolledMode;
  const resolvedFeatures = resolveEditorFeatures(preset, features);
  const blockToolsPlacement = blockTools?.placement ?? "inside";
  const resolvedMarkdownTransformers =
    markdownTransformers ?? DEFAULT_MARKDOWN_TRANSFORMERS;
  const metricsCharset =
    resolvedFeatures.characterLimit?.charset ?? "UTF-16";

  function publishComments(nextComments: EditorCommentThread[]) {
    setComments(nextComments);
    onCommentsChange?.(nextComments);
  }

  function handleComposerChange(payload: ReturnType<typeof readEditorSnapshot>) {
    if (!onChange) {
      return;
    }

    const effectiveMode = appliedModeRef.current;
    let nextPayload = payload;

    if (effectiveMode !== "rich-text" && internalEditorRef.current) {
      const source = readSourceValue(
        internalEditorRef.current,
        effectiveMode,
        resolvedMarkdownTransformers,
      );

      nextPayload = {
        ...payload,
        text: source,
        html: effectiveMode === "html" ? source : "",
        markdown: effectiveMode === "markdown" ? source : "",
        json: null,
        characterCount: countCharacters(source, metricsCharset),
        wordCount: countWords(source),
        isEmpty: source.trim().length === 0,
      };
    }

    onChange(nextPayload);
  }

  function applyModeToEditor(
    nextMode: EditorMode,
    previousMode: EditorMode = appliedModeRef.current,
  ) {
    if (!internalEditorRef.current) {
      appliedModeRef.current = nextMode;
      return true;
    }

    const appliedMode = appliedModeRef.current;

    try {
      appliedModeRef.current = nextMode;

      if (previousMode !== "rich-text") {
        applySourceValue(
          internalEditorRef.current,
          sourceValueRef.current,
          previousMode,
          resolvedMarkdownTransformers,
        );
      }

      if (nextMode !== "rich-text") {
        const nextSource = readSourceValue(
          internalEditorRef.current,
          nextMode,
          resolvedMarkdownTransformers,
        );

        sourceValueRef.current = nextSource;
        setSourceValue(nextSource);
      }

      return true;
    } catch (error) {
      appliedModeRef.current = appliedMode;

      if (error instanceof Error) {
        onError?.(error, internalEditorRef.current);
      }

      return false;
    }
  }

  useEffect(() => {
    if (activeMode === appliedModeRef.current) {
      return;
    }

    applyModeToEditor(activeMode);
  }, [activeMode, resolvedMarkdownTransformers]);

  function handleModeChange(nextMode: EditorMode) {
    if (nextMode === activeMode) {
      return;
    }

    if (mode !== undefined) {
      onModeChange?.(nextMode);
      return;
    }

    if (!applyModeToEditor(nextMode)) {
      return;
    }

    setUncontrolledMode(nextMode);
    onModeChange?.(nextMode);
  }

  function handleSourceValueChange(nextValue: string) {
    sourceValueRef.current = nextValue;
    setSourceValue(nextValue);

    if (!onChange || !internalEditorRef.current) {
      return;
    }

    onChange({
      editor: internalEditorRef.current,
      editorState: internalEditorRef.current.getEditorState(),
      tags: new Set(),
      text: nextValue,
      html: activeMode === "html" ? nextValue : "",
      markdown: activeMode === "markdown" ? nextValue : "",
      json: null,
      characterCount: countCharacters(nextValue, metricsCharset),
      wordCount: countWords(nextValue),
      isEmpty: nextValue.trim().length === 0,
    });
  }

  function requestComment() {
    if (!resolvedFeatures.comments || !internalEditorRef.current) {
      return;
    }

    internalEditorRef.current.getEditorState().read(() => {
      const selection = $getSelection();

      if (!$isRangeSelection(selection) || selection.isCollapsed()) {
        return;
      }

      const quote = getSelectionText(selection.clone());

      if (!quote) {
        return;
      }

      commentSelectionRef.current = selection.clone();
      setPendingCommentQuote(quote);
      setCommentDraft("");
      setCommentComposerOpen(true);
    });
  }

  function closeCommentComposer() {
    commentSelectionRef.current = null;
    setPendingCommentQuote("");
    setCommentDraft("");
    setCommentComposerOpen(false);
  }

  function submitComment() {
    const body = commentDraft.trim();

    if (!body || !internalEditorRef.current || !commentSelectionRef.current) {
      return;
    }

    const commentId =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `comment-${Date.now()}`;

    wrapSelectionInComment(
      internalEditorRef.current,
      commentId,
      commentSelectionRef.current,
    );

    publishComments([
      {
        id: commentId,
        quote: pendingCommentQuote,
        body,
        createdAt: new Date().toISOString(),
        status: "open",
      },
      ...comments,
    ]);

    closeCommentComposer();
  }

  function resolveComment(commentId: string) {
    publishComments(
      comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, status: "resolved" }
          : comment,
      ),
    );
  }

  function removeComment(commentId: string) {
    if (internalEditorRef.current) {
      removeCommentMark(internalEditorRef.current, commentId);
    }

    publishComments(
      comments.filter((comment) => comment.id !== commentId),
    );
  }

  const utilityBarVisible =
    !toolbarEnabled &&
    ((insertMenuEnabled && activeMode === "rich-text") || modeSwitcherEnabled);

  return (
    <EditorComposer
      namespace={namespace}
      initialValue={initialValue}
      initialValueFormat={initialValueFormat}
      activeMode={activeMode}
      onChange={handleComposerChange}
      onError={onError}
      autoFocus={autoFocus}
      features={features}
      linkMatchers={linkMatchers}
      markdownTransformers={markdownTransformers}
      editorRef={(editor) => {
        internalEditorRef.current = editor;
        applyMergedEditorRef(editorRef, editor);
      }}
      preset={preset}
      readOnly={readOnly}
    >
      <div
        className={cn("vds-editor", className)}
        style={style}
        data-radius-host=""
        data-read-only={readOnly || undefined}
        data-mode={activeMode}
        data-block-tools-placement={
          resolvedFeatures.draggableBlocks && activeMode === "rich-text"
            ? blockToolsPlacement
            : undefined
        }
      >
        {utilityBarVisible ? (
          <div className="vds-editor-utility-bar">
            <div className="vds-editor-utility-start">
              {insertMenuEnabled && activeMode === "rich-text" ? (
                <EditorInsertMenu {...insertMenuProps} />
              ) : null}
            </div>
            <div className="vds-editor-utility-end">
              {modeSwitcherEnabled ? (
                <EditorModeSwitcher
                  {...modeSwitcherProps}
                  value={activeMode}
                  onChange={handleModeChange}
                />
              ) : null}
            </div>
          </div>
        ) : null}

        {toolbarEnabled ? (
          <EditorToolbar
            {...toolbarProps}
            insertMenu={
              insertMenuEnabled && activeMode === "rich-text"
                ? insertMenuProps
                : null
            }
            modeSwitcher={modeSwitcherEnabled ? modeSwitcherProps : null}
            mode={activeMode}
            onModeChange={handleModeChange}
            onRequestComment={requestComment}
          />
        ) : null}

        {activeMode === "rich-text" ? (
          <EditorSurface
            ref={setSurfaceElement}
            id={id}
            role={role}
            tabIndex={tabIndex}
            autoCapitalize={autoCapitalize}
            autoComplete={autoComplete}
            aria-activedescendant={ariaActivedescendant}
            aria-autocomplete={ariaAutocomplete}
            aria-controls={ariaControls}
            aria-describedby={ariaDescribedBy}
            aria-expanded={ariaExpanded}
            aria-invalid={ariaInvalid}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            aria-owns={ariaOwns}
            data-testid={dataTestId}
            dir={dir}
            lang={lang}
            spellCheck={spellCheck}
            placeholder={placeholder}
            placeholderText={placeholderText}
            className={surfaceClassName}
            style={surfaceStyle}
            contentClassName={contentClassName}
            contentStyle={contentStyle}
            placeholderClassName={placeholderClassName}
            minHeight={minHeight}
            maxHeight={maxHeight}
          />
        ) : (
          <EditorSourcePanel
            mode={activeMode}
            onChange={handleSourceValueChange}
            minHeight={minHeight}
            maxHeight={maxHeight}
            value={sourceValue}
          />
        )}

        {resolvedFeatures.comments && activeMode === "rich-text" ? (
          <EditorCommentsPanel
            composerOpen={commentComposerOpen}
            draft={commentDraft}
            pendingQuote={pendingCommentQuote}
            threads={comments}
            onDraftChange={setCommentDraft}
            onSubmit={submitComment}
            onCancel={closeCommentComposer}
            onResolve={resolveComment}
            onRemove={removeComment}
          />
        ) : null}

        {statusBarEnabled && activeMode === "rich-text" ? (
          <EditorStatusBar {...statusBarProps} />
        ) : null}
        {slashMenuEnabled && activeMode === "rich-text" ? (
          <EditorSlashMenu {...slashMenuProps} />
        ) : null}
        {floatingToolbarEnabled && activeMode === "rich-text" ? (
          <EditorFloatingToolbar
            {...floatingToolbarProps}
            anchorElement={surfaceElement}
            onRequestComment={requestComment}
          />
        ) : null}
        {resolvedFeatures.tables && activeMode === "rich-text" ? (
          <EditorTableHoverActions anchorElement={surfaceElement} />
        ) : null}
        {resolvedFeatures.draggableBlocks && activeMode === "rich-text" ? (
          <EditorDraggableBlocks
            anchorElement={surfaceElement}
            className={blockTools?.className}
            placement={blockToolsPlacement}
          />
        ) : null}
      </div>
    </EditorComposer>
  );
}
