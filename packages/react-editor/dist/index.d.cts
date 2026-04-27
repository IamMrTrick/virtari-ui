import * as react from 'react';
import { CSSProperties } from 'react';
import { E as EditorCommentThread, a as EditorBlockToolsPlacement, b as EditorProps, c as EditorFloatingToolbarProps, d as EditorInsertMenuProps, e as EditorModeSwitcherProps, f as EditorMode, g as EditorSlashMenuProps, h as EditorStatusBarProps, i as EditorToolbarProps, j as EditorComposer, k as EditorSurfaceProps } from './index.core-2GAR7slz.cjs';
export { $ as $createEditorMediaNode, l as $isEditorMediaNode, D as DEFAULT_CORE_FEATURES, m as DEFAULT_LINK_MATCHERS, n as DEFAULT_MARKDOWN_TRANSFORMERS, o as DEFAULT_PRO_FEATURES, p as EDITOR_THEME, q as EditorBlockToolsProps, r as EditorBlockType, s as EditorChangePayload, t as EditorChangeSerializationOptions, u as EditorCharacterLimitOptions, v as EditorCharset, w as EditorColorSwatch, x as EditorComposerProps, y as EditorElementAlignment, z as EditorFeatureOptions, A as EditorInsertMenuItem, B as EditorMediaKind, C as EditorMediaNode, F as EditorMetrics, G as EditorPreset, H as EditorSlashMenuItem, I as EditorSurface, J as EditorToolbarOption, K as EditorValueFormat, R as ResolvedEditorFeatureOptions, S as SerializedEditorMediaNode, L as buildEditorNodes, M as createInitialEditorState, N as resolveEditorFeatures, O as useEditorContext } from './index.core-2GAR7slz.cjs';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { FieldProps } from '@virtari-packages/react-fieldset';
import '@lexical/react/LexicalContentEditable';
import '@lexical/react/LexicalAutoLinkPlugin';
import '@lexical/markdown';
import 'lexical';
import '@virtari-packages/react-icons';

interface EditorCommentsPanelProps {
    className?: string;
    composerOpen: boolean;
    draft: string;
    pendingQuote: string;
    threads: EditorCommentThread[];
    onDraftChange: (value: string) => void;
    onSubmit: () => void;
    onCancel: () => void;
    onResolve: (id: string) => void;
    onRemove: (id: string) => void;
}
declare function EditorCommentsPanel({ className, composerOpen, draft, pendingQuote, threads, onDraftChange, onSubmit, onCancel, onResolve, onRemove, }: EditorCommentsPanelProps): react_jsx_runtime.JSX.Element | null;

interface EditorDraggableBlocksProps {
    anchorElement: HTMLElement | null;
    className?: string;
    placement?: EditorBlockToolsPlacement;
}
declare function EditorDraggableBlocks({ anchorElement, className, placement, }: EditorDraggableBlocksProps): react_jsx_runtime.JSX.Element | null;

declare function Editor({ className, style, surfaceClassName, surfaceStyle, toolbar, insertMenu, statusBar, slashMenu, floatingToolbar, modeSwitcher, blockTools, preset, readOnly, namespace, initialValue, initialValueFormat, onChange, onError, autoFocus, features, linkMatchers, markdownTransformers, editorRef, defaultMode, mode, onModeChange, onCommentsChange, id, placeholder, placeholderText, contentClassName, contentStyle, placeholderClassName, minHeight, maxHeight, role, tabIndex, autoCapitalize, autoComplete, "aria-activedescendant": ariaActivedescendant, "aria-autocomplete": ariaAutocomplete, "aria-controls": ariaControls, "aria-describedby": ariaDescribedBy, "aria-expanded": ariaExpanded, "aria-invalid": ariaInvalid, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, "aria-owns": ariaOwns, "data-testid": dataTestId, dir, lang, spellCheck, }: EditorProps): react_jsx_runtime.JSX.Element;

interface EditorFieldProps extends Omit<FieldProps, keyof EditorProps | "children" | "controlId" | "disabled" | "invalid" | "required">, Omit<EditorProps, "className" | "style"> {
    className?: string;
    style?: CSSProperties;
    editorClassName?: string;
    editorStyle?: CSSProperties;
    invalid?: boolean;
}
declare function EditorField({ label, description, error, counter, metaLayout, descriptionAlign, errorAlign, counterAlign, labelProps, className, style, editorClassName, editorStyle, invalid, id, readOnly, "aria-describedby": ariaDescribedBy, "aria-invalid": ariaInvalid, ...props }: EditorFieldProps): react_jsx_runtime.JSX.Element;

interface EditorFloatingToolbarComponentProps extends EditorFloatingToolbarProps {
    anchorElement: HTMLElement | null;
}
declare function EditorFloatingToolbar({ className, showLinkActions, showCommentActions, onRequestComment, anchorElement, }: EditorFloatingToolbarComponentProps): react.ReactPortal | null;

declare function EditorInsertMenu({ className, items, label, compact, onOpenChange, targetBlockElement, }: EditorInsertMenuProps): react_jsx_runtime.JSX.Element;

interface EditorModeSwitcherControlProps extends EditorModeSwitcherProps {
    value: EditorMode;
    onChange: (mode: EditorMode) => void;
}
declare function EditorModeSwitcher({ className, modes, labels, value, onChange, }: EditorModeSwitcherControlProps): react_jsx_runtime.JSX.Element;

declare function EditorSlashMenu({ className, items, }: EditorSlashMenuProps): react_jsx_runtime.JSX.Element | null;

declare function EditorStatusBar({ className, showFeatureHints, }: EditorStatusBarProps): react_jsx_runtime.JSX.Element;

declare function EditorToolbar({ className, sticky, showClearButton, insertMenu, modeSwitcher, mode, onModeChange, onRequestComment, fontFamilies, fontSizes, textColorSwatches, highlightColorSwatches, }: EditorToolbarProps): react_jsx_runtime.JSX.Element;

declare const EditorParts: {
    readonly Composer: typeof EditorComposer;
    readonly DraggableBlocks: typeof EditorDraggableBlocks;
    readonly Surface: react.ForwardRefExoticComponent<EditorSurfaceProps & react.RefAttributes<HTMLDivElement>>;
    readonly CommentsPanel: typeof EditorCommentsPanel;
    readonly FloatingToolbar: typeof EditorFloatingToolbar;
    readonly InsertMenu: typeof EditorInsertMenu;
    readonly ModeSwitcher: typeof EditorModeSwitcher;
    readonly Toolbar: typeof EditorToolbar;
    readonly StatusBar: typeof EditorStatusBar;
    readonly SlashMenu: typeof EditorSlashMenu;
    readonly Field: typeof EditorField;
};

export { Editor, EditorBlockToolsPlacement, EditorCommentThread, EditorCommentsPanel, EditorComposer, EditorDraggableBlocks, EditorField, type EditorFieldProps, EditorFloatingToolbar, EditorFloatingToolbarProps, EditorInsertMenu, EditorInsertMenuProps, EditorMode, EditorModeSwitcher, EditorModeSwitcherProps, EditorParts, EditorProps, EditorSlashMenu, EditorSlashMenuProps, EditorStatusBar, EditorStatusBarProps, EditorSurfaceProps, EditorToolbar, EditorToolbarProps };
