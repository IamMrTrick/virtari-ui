import * as react_jsx_runtime from 'react/jsx-runtime';
import { ContentEditableProps } from '@lexical/react/LexicalContentEditable';
import { LinkMatcher } from '@lexical/react/LexicalAutoLinkPlugin';
import { Transformer } from '@lexical/markdown';
import { DecoratorNode, DOMConversionMap, SerializedLexicalNode, NodeKey, EditorConfig, DOMExportOutput, LexicalEditor, LexicalNode, SerializedEditorState, EditorState, Klass, InitialEditorStateType, EditorThemeClasses } from 'lexical';
import * as react from 'react';
import { ReactNode, RefObject, CSSProperties } from 'react';
import { IconProps } from '@virtari-packages/react-icons';

type EditorMediaKind = "embed" | "image" | "video";
interface SerializedEditorMediaNode extends SerializedLexicalNode {
    alt: string;
    kind: EditorMediaKind;
    src: string;
    type: "vds-editor-media";
    version: 1;
}
declare class EditorMediaNode extends DecoratorNode<ReactNode> {
    __alt: string;
    __kind: EditorMediaKind;
    __src: string;
    static getType(): string;
    static clone(node: EditorMediaNode): EditorMediaNode;
    static importDOM(): DOMConversionMap | null;
    static importJSON(serializedNode: SerializedLexicalNode): EditorMediaNode;
    constructor(kind: EditorMediaKind, src?: string, alt?: string, key?: NodeKey);
    createDOM(_config: EditorConfig): HTMLElement;
    updateDOM(): false;
    exportDOM(): DOMExportOutput;
    exportJSON(): SerializedEditorMediaNode;
    getTextContent(): string;
    isInline(): boolean;
    isIsolated(): boolean;
    isKeyboardSelectable(): boolean;
    decorate(_editor: LexicalEditor, _config: EditorConfig): ReactNode;
}
declare function $createEditorMediaNode(kind: EditorMediaKind, src?: string, alt?: string): EditorMediaNode;
declare function $isEditorMediaNode(node: LexicalNode | null | undefined): node is EditorMediaNode;

type EditorPreset = "core" | "pro";
type EditorValueFormat = "json" | "html" | "markdown";
type EditorCharset = "UTF-8" | "UTF-16";
type EditorMode = "rich-text" | "markdown" | "html";
type EditorElementAlignment = "left" | "center" | "right" | "justify" | "start" | "end";
type EditorBlockType = "paragraph" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "quote" | "code" | "bullet" | "number" | "check";
interface EditorCharacterLimitOptions {
    maxLength: number;
    charset?: EditorCharset;
}
interface EditorFeatureOptions {
    history?: boolean;
    links?: boolean;
    autoLinks?: boolean;
    lists?: boolean;
    checklists?: boolean;
    tables?: boolean;
    codeBlocks?: boolean;
    media?: boolean;
    horizontalRule?: boolean;
    draggableBlocks?: boolean;
    markdownShortcuts?: boolean;
    tabIndentation?: boolean;
    strictListIndent?: boolean;
    tableCellMerge?: boolean;
    tableCellBackgroundColor?: boolean;
    tableHorizontalScroll?: boolean;
    advancedTextFormats?: boolean;
    textAlignment?: boolean;
    fontFamily?: boolean;
    fontSize?: boolean;
    textColors?: boolean;
    comments?: boolean;
    shortcuts?: boolean;
    maxIndent?: number;
    characterLimit?: number | EditorCharacterLimitOptions;
}
interface ResolvedEditorFeatureOptions {
    history: boolean;
    links: boolean;
    autoLinks: boolean;
    lists: boolean;
    checklists: boolean;
    tables: boolean;
    codeBlocks: boolean;
    media: boolean;
    horizontalRule: boolean;
    draggableBlocks: boolean;
    markdownShortcuts: boolean;
    tabIndentation: boolean;
    strictListIndent: boolean;
    tableCellMerge: boolean;
    tableCellBackgroundColor: boolean;
    tableHorizontalScroll: boolean;
    advancedTextFormats: boolean;
    textAlignment: boolean;
    fontFamily: boolean;
    fontSize: boolean;
    textColors: boolean;
    comments: boolean;
    shortcuts: boolean;
    maxIndent: number;
    characterLimit: EditorCharacterLimitOptions | null;
}
interface EditorMetrics {
    text: string;
    html: string;
    markdown: string;
    json: SerializedEditorState | null;
    characterCount: number;
    wordCount: number;
    isEmpty: boolean;
}
interface EditorChangePayload extends EditorMetrics {
    editor: LexicalEditor;
    editorState: EditorState;
    tags: Set<string>;
}
interface EditorChangeSerializationOptions {
    html?: boolean;
    markdown?: boolean;
    json?: boolean;
    debounceMs?: number;
}
interface EditorComposerProps {
    namespace?: string;
    preset?: EditorPreset;
    initialValue?: string | SerializedEditorState | null;
    initialValueFormat?: EditorValueFormat;
    activeMode?: EditorMode;
    onChange?: (payload: EditorChangePayload) => void;
    changeSerialization?: EditorChangeSerializationOptions;
    onError?: (error: Error, editor: LexicalEditor) => void;
    readOnly?: boolean;
    autoFocus?: boolean;
    features?: EditorFeatureOptions;
    linkMatchers?: LinkMatcher[];
    markdownTransformers?: Transformer[];
    editorRef?: React.RefCallback<LexicalEditor> | RefObject<LexicalEditor | null | undefined>;
    children?: ReactNode;
}
interface EditorSurfaceProps extends Omit<ContentEditableProps, "placeholder" | "aria-placeholder" | "className" | "style" | "onChange"> {
    placeholder?: ReactNode;
    placeholderText?: string;
    className?: string;
    style?: CSSProperties;
    contentClassName?: string;
    contentStyle?: CSSProperties;
    placeholderClassName?: string;
    minHeight?: CSSProperties["minHeight"];
    maxHeight?: CSSProperties["maxHeight"];
}
interface EditorToolbarProps {
    className?: string;
    sticky?: boolean;
    showClearButton?: boolean;
    insertMenu?: EditorInsertMenuProps | null;
    modeSwitcher?: EditorModeSwitcherProps | null;
    mode?: EditorMode;
    onModeChange?: (mode: EditorMode) => void;
    onRequestComment?: () => void;
    fontFamilies?: EditorToolbarOption[];
    fontSizes?: EditorToolbarOption[];
    textColorSwatches?: EditorColorSwatch[];
    highlightColorSwatches?: EditorColorSwatch[];
}
interface EditorToolbarOption {
    label: string;
    value: string;
}
interface EditorColorSwatch {
    label: string;
    value: string;
}
interface EditorInsertMenuItem {
    key: string;
    title: string;
    description?: string;
    keywords?: string[];
    icon?: IconProps["icon"];
    shortcut?: string;
    run: (editor: LexicalEditor, targetBlockElement?: HTMLElement | null) => void;
}
interface EditorMediaInsertRequest {
    editor: LexicalEditor;
    kind: EditorMediaKind;
    targetBlockElement?: HTMLElement | null;
}
interface EditorInsertMenuProps {
    className?: string;
    items?: EditorInsertMenuItem[];
    label?: string;
    compact?: boolean;
    onOpenChange?: (open: boolean) => void;
    onRequestMediaInsert?: (request: EditorMediaInsertRequest) => void;
    targetBlockElement?: HTMLElement | null;
}
type EditorBlockToolsPlacement = "inside" | "edge";
interface EditorBlockToolsProps {
    className?: string;
    placement?: EditorBlockToolsPlacement;
}
interface EditorStatusBarProps {
    className?: string;
    showFeatureHints?: boolean;
}
interface EditorSlashMenuItem {
    key: string;
    title: string;
    description?: string;
    keywords?: string[];
    icon?: IconProps["icon"];
    run: (editor: LexicalEditor) => void;
}
interface EditorSlashMenuProps {
    className?: string;
    items?: EditorSlashMenuItem[];
}
interface EditorFloatingToolbarProps {
    className?: string;
    showLinkActions?: boolean;
    showCommentActions?: boolean;
    onRequestComment?: () => void;
}
interface EditorModeSwitcherProps {
    className?: string;
    modes?: EditorMode[];
    labels?: Partial<Record<EditorMode, string>>;
}
interface EditorCommentThread {
    id: string;
    quote: string;
    body: string;
    createdAt: string;
    status: "open" | "resolved";
}
interface EditorProps extends Omit<EditorComposerProps, "children">, Omit<EditorSurfaceProps, "className" | "style" | "onError"> {
    className?: string;
    style?: CSSProperties;
    surfaceClassName?: string;
    surfaceStyle?: CSSProperties;
    toolbar?: boolean | EditorToolbarProps;
    insertMenu?: boolean | EditorInsertMenuProps;
    statusBar?: boolean | EditorStatusBarProps;
    slashMenu?: boolean | EditorSlashMenuProps;
    floatingToolbar?: boolean | EditorFloatingToolbarProps;
    modeSwitcher?: boolean | EditorModeSwitcherProps;
    blockTools?: EditorBlockToolsProps;
    defaultMode?: EditorMode;
    mode?: EditorMode;
    onModeChange?: (mode: EditorMode) => void;
    onCommentsChange?: (comments: EditorCommentThread[]) => void;
}

declare function EditorComposer({ namespace, preset, initialValue, initialValueFormat, activeMode, onChange, changeSerialization, onError, readOnly, autoFocus, features, linkMatchers, markdownTransformers, editorRef, children, }: EditorComposerProps): react_jsx_runtime.JSX.Element;

declare const EditorSurface: react.ForwardRefExoticComponent<EditorSurfaceProps & react.RefAttributes<HTMLDivElement>>;

declare function useEditorContext(): {
    metrics: EditorMetrics;
    features: ResolvedEditorFeatureOptions;
    linkMatchers: LinkMatcher[];
    markdownTransformers: Transformer[];
    readOnly: boolean;
};

declare const DEFAULT_LINK_MATCHERS: LinkMatcher[];
declare const DEFAULT_MARKDOWN_TRANSFORMERS: Transformer[];
declare const DEFAULT_CORE_FEATURES: ResolvedEditorFeatureOptions;
declare const DEFAULT_PRO_FEATURES: ResolvedEditorFeatureOptions;
declare function resolveEditorFeatures(preset: EditorPreset, features?: EditorFeatureOptions): ResolvedEditorFeatureOptions;
declare function buildEditorNodes(features: ResolvedEditorFeatureOptions): Array<Klass<LexicalNode>>;
declare function createInitialEditorState(initialValue: string | SerializedEditorState | null | undefined, initialValueFormat: EditorValueFormat, markdownTransformers: Transformer[]): InitialEditorStateType | undefined;

declare const EDITOR_THEME: EditorThemeClasses;

export { $createEditorMediaNode as $, type EditorInsertMenuItem as A, type EditorMediaKind as B, EditorMediaNode as C, DEFAULT_CORE_FEATURES as D, type EditorCommentThread as E, type EditorMetrics as F, type EditorPreset as G, type EditorSlashMenuItem as H, EditorSurface as I, type EditorToolbarOption as J, type EditorValueFormat as K, buildEditorNodes as L, createInitialEditorState as M, resolveEditorFeatures as N, useEditorContext as O, type ResolvedEditorFeatureOptions as R, type SerializedEditorMediaNode as S, type EditorBlockToolsPlacement as a, type EditorProps as b, type EditorFloatingToolbarProps as c, type EditorInsertMenuProps as d, type EditorModeSwitcherProps as e, type EditorMode as f, type EditorSlashMenuProps as g, type EditorStatusBarProps as h, type EditorToolbarProps as i, EditorComposer as j, type EditorSurfaceProps as k, $isEditorMediaNode as l, DEFAULT_LINK_MATCHERS as m, DEFAULT_MARKDOWN_TRANSFORMERS as n, DEFAULT_PRO_FEATURES as o, EDITOR_THEME as p, type EditorBlockToolsProps as q, type EditorBlockType as r, type EditorChangePayload as s, type EditorChangeSerializationOptions as t, type EditorCharacterLimitOptions as u, type EditorCharset as v, type EditorColorSwatch as w, type EditorComposerProps as x, type EditorElementAlignment as y, type EditorFeatureOptions as z };
