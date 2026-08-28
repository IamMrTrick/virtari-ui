"use client";
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { createLinkMatcherWithRegExp, AutoLinkPlugin } from '@lexical/react/LexicalAutoLinkPlugin';
import { CharacterLimitPlugin } from '@lexical/react/LexicalCharacterLimitPlugin';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { EditorRefPlugin } from '@lexical/react/LexicalEditorRefPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import { createContext, forwardRef, useContext, useMemo, useState, useRef, useEffect } from 'react';
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html';
import { LinkNode, AutoLinkNode, $isLinkNode, formatUrl, $toggleLink } from '@lexical/link';
import { ListNode, ListItemNode, $isListNode, REMOVE_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND, INSERT_ORDERED_LIST_COMMAND, INSERT_CHECK_LIST_COMMAND, $createListNode, $createListItemNode } from '@lexical/list';
import { TRANSFORMERS, $convertToMarkdownString, $convertFromMarkdownString } from '@lexical/markdown';
import { $getSelectionStyleValueForProperty, $setBlocksType, $patchStyleText } from '@lexical/selection';
import { MarkNode, $wrapSelectionInMarkNode, $isMarkNode, $unwrapMarkNode } from '@lexical/mark';
import { HeadingNode, QuoteNode, $isHeadingNode, $isQuoteNode, $createQuoteNode, $createHeadingNode } from '@lexical/rich-text';
import { TableNode, TableCellNode, TableRowNode, $getTableCellNodeFromLexicalNode, INSERT_TABLE_COMMAND, $createTableNodeWithDimensions, $insertTableRowAtSelection, $insertTableColumnAtSelection, $deleteTableRowAtSelection, $deleteTableColumnAtSelection, $getTableNodeFromLexicalNodeOrThrow, $isTableCellNode } from '@lexical/table';
import { CodeNode, CodeHighlightNode, $isCodeNode, $createCodeNode, DEFAULT_CODE_LANGUAGE, registerCodeHighlighting } from '@lexical/code';
import { HorizontalRuleNode, $createHorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';
import { DecoratorNode, $applyNodeReplacement, $getRoot, $getSelection, $isRangeSelection, $findMatchingParent, $isElementNode, $createParagraphNode, CLEAR_EDITOR_COMMAND, $setSelection, UNDO_COMMAND, REDO_COMMAND, FORMAT_TEXT_COMMAND, FORMAT_ELEMENT_COMMAND, INDENT_CONTENT_COMMAND, OUTDENT_CONTENT_COMMAND, $createTextNode, $getNearestNodeFromDOMNode, $insertNodes, $getNodeByKey, KEY_DOWN_COMMAND, COMMAND_PRIORITY_HIGH } from 'lexical';
export { CAN_REDO_COMMAND, CAN_UNDO_COMMAND, COMMAND_PRIORITY_LOW } from 'lexical';
import { OverflowNode } from '@lexical/overflow';
import { jsx, jsxs } from 'react/jsx-runtime';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { cn } from '@virtari-packages/utils';

// src/EditorComposer.tsx

// src/theme.ts
var EDITOR_THEME = {
  characterLimit: "vds-editor-character-limit",
  code: "vds-editor-code-block",
  codeHighlight: {
    atrule: "vds-editor-code-token-attr",
    attr: "vds-editor-code-token-attr",
    boolean: "vds-editor-code-token-property",
    builtin: "vds-editor-code-token-selector",
    cdata: "vds-editor-code-token-comment",
    char: "vds-editor-code-token-selector",
    class: "vds-editor-code-token-function",
    "class-name": "vds-editor-code-token-function",
    comment: "vds-editor-code-token-comment",
    constant: "vds-editor-code-token-property",
    deleted: "vds-editor-code-token-deleted",
    doctype: "vds-editor-code-token-comment",
    entity: "vds-editor-code-token-operator",
    function: "vds-editor-code-token-function",
    important: "vds-editor-code-token-variable",
    inserted: "vds-editor-code-token-inserted",
    keyword: "vds-editor-code-token-attr",
    namespace: "vds-editor-code-token-variable",
    number: "vds-editor-code-token-property",
    operator: "vds-editor-code-token-operator",
    prolog: "vds-editor-code-token-comment",
    property: "vds-editor-code-token-property",
    punctuation: "vds-editor-code-token-punctuation",
    regex: "vds-editor-code-token-variable",
    selector: "vds-editor-code-token-selector",
    string: "vds-editor-code-token-selector",
    symbol: "vds-editor-code-token-property",
    tag: "vds-editor-code-token-property",
    unchanged: "vds-editor-code-token-unchanged",
    url: "vds-editor-code-token-operator",
    variable: "vds-editor-code-token-variable"
  },
  hr: "vds-editor-divider",
  hrSelected: "vds-editor-divider vds-editor-divider-selected",
  heading: {
    h1: "vds-editor-heading vds-editor-heading-h1",
    h2: "vds-editor-heading vds-editor-heading-h2",
    h3: "vds-editor-heading vds-editor-heading-h3",
    h4: "vds-editor-heading vds-editor-heading-h4",
    h5: "vds-editor-heading vds-editor-heading-h5",
    h6: "vds-editor-heading vds-editor-heading-h6"
  },
  link: "vds-editor-link",
  list: {
    ul: "vds-editor-list vds-editor-list-ul",
    ol: "vds-editor-list vds-editor-list-ol",
    checklist: "vds-editor-list vds-editor-list-check",
    listitem: "vds-editor-list-item",
    listitemChecked: "vds-editor-list-item vds-editor-list-item-checked",
    listitemUnchecked: "vds-editor-list-item vds-editor-list-item-unchecked",
    nested: {
      list: "vds-editor-list-nested",
      listitem: "vds-editor-list-item-nested"
    }
  },
  paragraph: "vds-editor-paragraph",
  mark: "vds-editor-comment-mark",
  markOverlap: "vds-editor-comment-mark-overlap",
  quote: "vds-editor-quote",
  table: "vds-editor-table",
  tableCell: "vds-editor-table-cell",
  tableCellHeader: "vds-editor-table-cell vds-editor-table-cell-header",
  tableRow: "vds-editor-table-row",
  tableScrollableWrapper: "vds-editor-table-scroll",
  text: {
    bold: "vds-editor-text-bold",
    code: "vds-editor-text-code",
    highlight: "vds-editor-text-highlight",
    italic: "vds-editor-text-italic",
    lowercase: "vds-editor-text-lowercase",
    uppercase: "vds-editor-text-uppercase",
    capitalize: "vds-editor-text-capitalize",
    strikethrough: "vds-editor-text-strikethrough",
    subscript: "vds-editor-text-subscript",
    superscript: "vds-editor-text-superscript",
    underline: "vds-editor-text-underline",
    underlineStrikethrough: "vds-editor-text-underline vds-editor-text-strikethrough"
  }
};
var CONTEXT_ERROR = "Editor components must be rendered inside <EditorComposer>.";
var EditorConfigContext = createContext(null);
var EditorMetricsContext = createContext(null);
function useEditorConfig() {
  const value = useContext(EditorConfigContext);
  if (!value) {
    throw new Error(CONTEXT_ERROR);
  }
  return value;
}
function useEditorMetrics() {
  const value = useContext(EditorMetricsContext);
  if (!value) {
    throw new Error(CONTEXT_ERROR);
  }
  return value;
}
function useEditorContext() {
  const config = useEditorConfig();
  const metrics = useEditorMetrics();
  return {
    ...config,
    metrics
  };
}
function normalizeKind(kind) {
  if (kind === "embed" || kind === "video") return kind;
  return "image";
}
function getElementLabel(element, fallback = "") {
  return element.getAttribute("alt") ?? element.getAttribute("aria-label") ?? element.getAttribute("title") ?? fallback;
}
function getFigureCaption(element) {
  return element.querySelector("figcaption")?.textContent?.trim() ?? "";
}
function convertImageElement(element) {
  const image = element;
  return {
    node: $createEditorMediaNode(
      "image",
      image.getAttribute("src") ?? "",
      getElementLabel(image)
    )
  };
}
function convertVideoElement(element) {
  const video = element;
  return {
    node: $createEditorMediaNode(
      "video",
      video.getAttribute("src") ?? "",
      getElementLabel(video)
    )
  };
}
function convertIframeElement(element, kind = "embed") {
  const iframe = element;
  return {
    node: $createEditorMediaNode(
      kind,
      iframe.getAttribute("src") ?? "",
      getElementLabel(iframe)
    )
  };
}
function convertFigureElement(element) {
  const explicitKind = element.dataset.vdsEditorMedia;
  const mediaKind = explicitKind ? normalizeKind(explicitKind) : element.querySelector("iframe") ? "embed" : element.querySelector("video") ? "video" : "image";
  const mediaElement = mediaKind === "image" ? element.querySelector("img") : mediaKind === "video" ? element.querySelector("video, iframe") : element.querySelector("iframe");
  const caption = getFigureCaption(element);
  if (!explicitKind && !mediaElement) {
    return null;
  }
  if (mediaElement instanceof HTMLImageElement) {
    return {
      node: $createEditorMediaNode(
        "image",
        mediaElement.getAttribute("src") ?? "",
        getElementLabel(mediaElement, caption)
      )
    };
  }
  if (mediaElement instanceof HTMLVideoElement) {
    return {
      node: $createEditorMediaNode(
        "video",
        mediaElement.getAttribute("src") ?? "",
        getElementLabel(mediaElement, caption)
      )
    };
  }
  if (mediaElement instanceof HTMLIFrameElement) {
    return {
      node: $createEditorMediaNode(
        mediaKind,
        mediaElement.getAttribute("src") ?? "",
        getElementLabel(mediaElement, caption)
      )
    };
  }
  return {
    node: $createEditorMediaNode(mediaKind, "", caption)
  };
}
function isDirectVideoSource(src) {
  const trimmed = src.trim().toLowerCase();
  if (!trimmed) return false;
  if (trimmed.startsWith("data:video/") || trimmed.startsWith("blob:")) {
    return true;
  }
  const path = trimmed.split(/[?#]/)[0] ?? "";
  return /\.(mp4|webm|ogg|ogv|mov|m4v)$/.test(path);
}
function getSourceLabel(src) {
  if (!src) return "No source";
  if (src.startsWith("data:")) return "Uploaded file";
  if (src.startsWith("blob:")) return "Local file";
  try {
    return new URL(src).hostname.replace(/^www\./, "");
  } catch {
    return src;
  }
}
function applyIframeAttributes(iframe) {
  iframe.loading = "lazy";
  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture; web-share";
  iframe.referrerPolicy = "strict-origin-when-cross-origin";
  iframe.setAttribute("allowfullscreen", "true");
}
var EditorMediaNode = class _EditorMediaNode extends DecoratorNode {
  __alt;
  __kind;
  __src;
  static getType() {
    return "vds-editor-media";
  }
  static clone(node) {
    return new _EditorMediaNode(node.__kind, node.__src, node.__alt, node.__key);
  }
  static importDOM() {
    return {
      figure: () => ({
        conversion: convertFigureElement,
        priority: 2
      }),
      iframe: () => ({
        conversion: convertIframeElement,
        priority: 2
      }),
      img: () => ({
        conversion: convertImageElement,
        priority: 2
      }),
      video: () => ({
        conversion: convertVideoElement,
        priority: 2
      })
    };
  }
  static importJSON(serializedNode) {
    const media = serializedNode;
    return $createEditorMediaNode(media.kind, media.src, media.alt);
  }
  constructor(kind, src = "", alt = "", key) {
    super(key);
    this.__kind = kind;
    this.__src = src;
    this.__alt = alt;
  }
  createDOM(_config) {
    const element = document.createElement("div");
    element.className = "vds-editor-media-block";
    element.dataset.kind = this.__kind;
    return element;
  }
  updateDOM() {
    return false;
  }
  exportDOM() {
    const figure = document.createElement("figure");
    const caption = document.createElement("figcaption");
    figure.dataset.vdsEditorMedia = this.__kind;
    if (this.__kind === "image") {
      const image = document.createElement("img");
      if (this.__src) {
        image.src = this.__src;
      }
      image.alt = this.__alt;
      figure.append(image);
      caption.textContent = this.__alt || "Image";
    } else if (this.__kind === "video" && isDirectVideoSource(this.__src)) {
      const video = document.createElement("video");
      video.controls = true;
      if (this.__src) {
        video.src = this.__src;
      }
      if (this.__alt) {
        video.setAttribute("aria-label", this.__alt);
      }
      figure.append(video);
      caption.textContent = this.__alt || "Video";
    } else {
      const iframe = document.createElement("iframe");
      if (this.__src) {
        iframe.src = this.__src;
      }
      iframe.title = this.__alt || (this.__kind === "video" ? "Video" : "Embed");
      applyIframeAttributes(iframe);
      figure.append(iframe);
      caption.textContent = this.__alt || (this.__kind === "video" ? "Video" : "Embed");
    }
    figure.append(caption);
    return { element: figure };
  }
  exportJSON() {
    return {
      ...super.exportJSON(),
      alt: this.__alt,
      kind: this.__kind,
      src: this.__src,
      type: "vds-editor-media",
      version: 1
    };
  }
  getTextContent() {
    if (this.__alt) return this.__alt;
    if (this.__kind === "video") return "Video";
    if (this.__kind === "embed") return "Embed";
    return "Image";
  }
  isInline() {
    return false;
  }
  isIsolated() {
    return true;
  }
  isKeyboardSelectable() {
    return true;
  }
  decorate(_editor, _config) {
    const label = this.__kind === "video" ? "Video" : this.__kind === "embed" ? "Embed" : "Image";
    const detail = this.__alt || getSourceLabel(this.__src);
    if (this.__kind === "image" && this.__src) {
      return /* @__PURE__ */ jsxs("figure", { className: "vds-editor-media-figure", "data-kind": this.__kind, children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            className: "vds-editor-media-preview",
            src: this.__src,
            alt: this.__alt
          }
        ),
        this.__alt ? /* @__PURE__ */ jsx("figcaption", { className: "vds-editor-media-caption", children: this.__alt }) : null
      ] });
    }
    if (this.__kind === "video" && this.__src && isDirectVideoSource(this.__src)) {
      return /* @__PURE__ */ jsxs("figure", { className: "vds-editor-media-figure", "data-kind": this.__kind, children: [
        /* @__PURE__ */ jsx(
          "video",
          {
            className: "vds-editor-media-preview",
            src: this.__src,
            "aria-label": this.__alt || void 0,
            controls: true
          }
        ),
        this.__alt ? /* @__PURE__ */ jsx("figcaption", { className: "vds-editor-media-caption", children: this.__alt }) : null
      ] });
    }
    if (this.__src && (this.__kind === "embed" || this.__kind === "video")) {
      return /* @__PURE__ */ jsxs("figure", { className: "vds-editor-media-figure", "data-kind": this.__kind, children: [
        /* @__PURE__ */ jsx(
          "iframe",
          {
            className: "vds-editor-media-frame",
            src: this.__src,
            title: this.__alt || label,
            allow: "accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture; web-share",
            allowFullScreen: true,
            loading: "lazy",
            referrerPolicy: "strict-origin-when-cross-origin"
          }
        ),
        this.__alt ? /* @__PURE__ */ jsx("figcaption", { className: "vds-editor-media-caption", children: this.__alt }) : null
      ] });
    }
    return /* @__PURE__ */ jsxs("div", { className: "vds-editor-media-card", "data-kind": this.__kind, children: [
      /* @__PURE__ */ jsx("span", { className: "vds-editor-media-kind", children: label }),
      /* @__PURE__ */ jsx("span", { className: "vds-editor-media-detail", children: detail })
    ] });
  }
};
function $createEditorMediaNode(kind, src = "", alt = "") {
  return $applyNodeReplacement(
    new EditorMediaNode(normalizeKind(kind), src, alt)
  );
}
function $isEditorMediaNode(node) {
  return node instanceof EditorMediaNode;
}
var URL_MATCHER = /((https?:\/\/(www\.)?)|(www\.))[-A-Za-z0-9@:%._+~#=]{1,256}\.[A-Za-z0-9()]{1,24}\b([-A-Za-z0-9()@:%_+.~#?&//=]*)/;
var EMAIL_MATCHER = /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([A-Za-z0-9-]+\.)+[A-Za-z]{2,})/;
var DEFAULT_LINK_MATCHERS = [
  createLinkMatcherWithRegExp(
    URL_MATCHER,
    (text) => text.startsWith("http") ? text : `https://${text}`
  ),
  createLinkMatcherWithRegExp(EMAIL_MATCHER, (text) => `mailto:${text}`)
];
var DEFAULT_MARKDOWN_TRANSFORMERS = TRANSFORMERS;
var DEFAULT_CORE_FEATURES = {
  history: true,
  links: true,
  autoLinks: true,
  lists: true,
  checklists: true,
  tables: false,
  codeBlocks: true,
  media: false,
  horizontalRule: false,
  draggableBlocks: false,
  markdownShortcuts: true,
  tabIndentation: false,
  strictListIndent: false,
  tableCellMerge: true,
  tableCellBackgroundColor: true,
  tableHorizontalScroll: true,
  advancedTextFormats: false,
  textAlignment: false,
  fontFamily: false,
  fontSize: false,
  textColors: false,
  comments: false,
  shortcuts: false,
  maxIndent: 7,
  characterLimit: null
};
var DEFAULT_PRO_FEATURES = {
  ...DEFAULT_CORE_FEATURES,
  tables: true,
  media: true,
  horizontalRule: true,
  draggableBlocks: true,
  tabIndentation: true,
  advancedTextFormats: true,
  textAlignment: true,
  fontFamily: true,
  fontSize: true,
  textColors: true,
  comments: true,
  shortcuts: true
};
function resolveCharacterLimit(value) {
  if (typeof value === "number") {
    return {
      maxLength: value,
      charset: "UTF-16"
    };
  }
  if (!value) return null;
  return {
    maxLength: value.maxLength,
    charset: value.charset ?? "UTF-16"
  };
}
function resolveEditorFeatures(preset, features) {
  const base = preset === "pro" ? DEFAULT_PRO_FEATURES : DEFAULT_CORE_FEATURES;
  const next = {
    ...base,
    ...features,
    maxIndent: features?.maxIndent ?? base.maxIndent,
    characterLimit: resolveCharacterLimit(features?.characterLimit)
  };
  if (next.autoLinks) next.links = true;
  if (next.checklists) next.lists = true;
  return next;
}
function buildEditorNodes(features) {
  const nodes = [HeadingNode, QuoteNode];
  if (features.links) {
    nodes.push(LinkNode);
  }
  if (features.autoLinks) {
    nodes.push(AutoLinkNode);
  }
  if (features.lists || features.checklists) {
    nodes.push(ListNode, ListItemNode);
  }
  if (features.codeBlocks) {
    nodes.push(CodeNode, CodeHighlightNode);
  }
  if (features.media) {
    nodes.push(EditorMediaNode);
  }
  if (features.horizontalRule) {
    nodes.push(HorizontalRuleNode);
  }
  if (features.comments) {
    nodes.push(MarkNode);
  }
  if (features.tables) {
    nodes.push(TableNode, TableCellNode, TableRowNode);
  }
  if (features.characterLimit) {
    nodes.push(OverflowNode);
  }
  return nodes;
}
function applySerializedEditorValue(editor, value, format, markdownTransformers) {
  if (value == null) return;
  if (format === "json") {
    const serializedEditorState = typeof value === "string" ? value : JSON.stringify(value);
    const editorState = editor.parseEditorState(serializedEditorState);
    editor.setEditorState(editorState);
    return;
  }
  if (typeof value !== "string") return;
  editor.update(() => {
    const root = $getRoot();
    root.clear();
    root.select();
    if (value.trim().length === 0) {
      root.append($createParagraphNode());
      return;
    }
    if (format === "markdown") {
      $convertFromMarkdownString(value, markdownTransformers);
      return;
    }
    const parser = new DOMParser();
    const dom = parser.parseFromString(value, "text/html");
    const nodes = $generateNodesFromDOM(editor, dom);
    if (nodes.length === 0) {
      root.append($createParagraphNode());
      return;
    }
    $insertNodes(nodes);
  });
}
function createInitialEditorState(initialValue, initialValueFormat, markdownTransformers) {
  if (initialValue == null) return void 0;
  return (editor) => {
    applySerializedEditorValue(
      editor,
      initialValue,
      initialValueFormat,
      markdownTransformers
    );
  };
}

// src/editor-utils.ts
var EMPTY_EDITOR_METRICS = {
  text: "",
  html: "",
  markdown: "",
  json: null,
  characterCount: 0,
  wordCount: 0,
  isEmpty: true
};
var EMPTY_TOOLBAR_STATE = {
  blockType: "paragraph",
  elementFormat: "left",
  isBold: false,
  isItalic: false,
  isUnderline: false,
  isStrikethrough: false,
  isInlineCode: false,
  isSubscript: false,
  isSuperscript: false,
  isLowercase: false,
  isUppercase: false,
  isCapitalize: false,
  isTableSelection: false,
  isLink: false,
  linkUrl: "",
  fontFamily: "var(--vds-font-sans)",
  fontSize: "var(--vds-text-base)",
  fontColor: "var(--vds-color-neutral-12)",
  bgColor: "transparent"
};
function countCharacters(text, charset) {
  if (charset === "UTF-8") {
    return new TextEncoder().encode(text).length;
  }
  return text.length;
}
function countWords(text) {
  let wordCount = 0;
  let inWord = false;
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    const isWhitespace = character !== void 0 && /\s/.test(character);
    if (isWhitespace) {
      inWord = false;
      continue;
    }
    if (!inWord) {
      wordCount += 1;
      inWord = true;
    }
  }
  return wordCount;
}
function hasTextContent(text) {
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (character !== void 0 && !/\s/.test(character)) {
      return true;
    }
  }
  return false;
}
function areEditorMetricsEqual(current, next) {
  return current.text === next.text && current.characterCount === next.characterCount && current.wordCount === next.wordCount && current.isEmpty === next.isEmpty;
}
function buildEditorMetrics(editorState, charset) {
  let text = "";
  let isEmpty = true;
  editorState.read(() => {
    text = $getRoot().getTextContent();
    isEmpty = !hasTextContent(text);
  });
  return {
    text,
    html: "",
    markdown: "",
    json: null,
    characterCount: countCharacters(text, charset),
    wordCount: countWords(text),
    isEmpty
  };
}
function buildEditorChangePayload(editor, editorState, markdownTransformers, charset, tags, {
  includeHtml = true,
  includeJson = true,
  includeMarkdown = true
} = {}) {
  let text = "";
  let html = "";
  let markdown = "";
  let isEmpty = true;
  editorState.read(() => {
    const root = $getRoot();
    text = root.getTextContent();
    if (includeHtml) {
      html = $generateHtmlFromNodes(editor, null);
    }
    if (includeMarkdown) {
      markdown = $convertToMarkdownString(markdownTransformers);
    }
    isEmpty = !hasTextContent(text);
  });
  const json = includeJson ? editorState.toJSON() : null;
  return {
    editor,
    editorState,
    tags,
    text,
    html,
    markdown,
    json,
    characterCount: countCharacters(text, charset),
    wordCount: countWords(text),
    isEmpty
  };
}
function getSourceModeLanguage(mode) {
  return mode === "markdown" ? "markdown" : "html";
}
function getSourceModeCodeNode(root, mode) {
  const firstChild = root.getFirstChild();
  if ($isCodeNode(firstChild) && firstChild.getLanguage() === getSourceModeLanguage(mode)) {
    return firstChild;
  }
  return null;
}
function formatHtmlSource(html) {
  const normalized = html.replace(/>\s*</g, ">\n<").replace(/\n{3,}/g, "\n\n").trim();
  if (!normalized) {
    return "";
  }
  let depth = 0;
  return normalized.split("\n").map((rawLine) => rawLine.trim()).filter(Boolean).map((line) => {
    const isClosingTag = /^<\//.test(line);
    const isSelfClosingTag = /\/>$/.test(line) || /^<!/.test(line) || /^<br\b/i.test(line) || /^<hr\b/i.test(line) || /^<img\b/i.test(line) || /^<input\b/i.test(line) || /^<meta\b/i.test(line) || /^<link\b/i.test(line);
    const opensTag = /^<[^/!][^>]*>$/.test(line) && !/<\/[^>]+>$/.test(line) && !isSelfClosingTag;
    if (isClosingTag) {
      depth = Math.max(depth - 1, 0);
    }
    const formatted = `${"  ".repeat(depth)}${line}`;
    if (opensTag) {
      depth += 1;
    }
    return formatted;
  }).join("\n");
}
function readSourceValue(editor, mode, markdownTransformers) {
  return editor.getEditorState().read(() => {
    const root = $getRoot();
    const existingCodeNode = getSourceModeCodeNode(root, mode);
    if (existingCodeNode) {
      return existingCodeNode.getTextContent();
    }
    if (mode === "markdown") {
      return $convertToMarkdownString(markdownTransformers);
    }
    return formatHtmlSource($generateHtmlFromNodes(editor, null));
  });
}
function readToolbarState() {
  const selection = $getSelection();
  if (!$isRangeSelection(selection)) {
    return EMPTY_TOOLBAR_STATE;
  }
  const anchorNode = selection.anchor.getNode();
  const topLevel = anchorNode.getKey() === "root" ? null : anchorNode.getTopLevelElementOrThrow();
  const listNode = $findMatchingParent(anchorNode, $isListNode);
  const linkNode = $findMatchingParent(anchorNode, $isLinkNode);
  const tableCellNode = $getTableCellNodeFromLexicalNode(anchorNode);
  const linkParentElement = linkNode ? $findMatchingParent(
    anchorNode,
    (parentNode) => $isElementNode(parentNode) && !parentNode.isInline()
  ) : null;
  let blockType = "paragraph";
  let elementFormat = "left";
  if (listNode) {
    const listType = listNode.getListType();
    blockType = listType === "number" ? "number" : listType === "check" ? "check" : "bullet";
  } else if (topLevel && $isHeadingNode(topLevel)) {
    const tag = topLevel.getTag();
    blockType = tag === "h1" || tag === "h2" || tag === "h3" || tag === "h4" || tag === "h5" || tag === "h6" ? tag : "paragraph";
  } else if (topLevel && $isQuoteNode(topLevel)) {
    blockType = "quote";
  } else if (topLevel && $isCodeNode(topLevel)) {
    blockType = "code";
  }
  const elementForFormat = ($isElementNode(linkParentElement) ? linkParentElement : null) ?? ($isElementNode(topLevel) ? topLevel : null);
  if (elementForFormat) {
    const formatType = elementForFormat.getFormatType();
    elementFormat = formatType === "" ? "left" : formatType;
  }
  return {
    blockType,
    elementFormat,
    isBold: selection.hasFormat("bold"),
    isItalic: selection.hasFormat("italic"),
    isUnderline: selection.hasFormat("underline"),
    isStrikethrough: selection.hasFormat("strikethrough"),
    isInlineCode: selection.hasFormat("code"),
    isSubscript: selection.hasFormat("subscript"),
    isSuperscript: selection.hasFormat("superscript"),
    isLowercase: selection.hasFormat("lowercase"),
    isUppercase: selection.hasFormat("uppercase"),
    isCapitalize: selection.hasFormat("capitalize"),
    isTableSelection: Boolean(tableCellNode),
    isLink: Boolean(linkNode),
    linkUrl: linkNode?.getURL() ?? "",
    fontFamily: $getSelectionStyleValueForProperty(
      selection,
      "font-family",
      "var(--vds-font-sans)"
    ),
    fontSize: $getSelectionStyleValueForProperty(
      selection,
      "font-size",
      "var(--vds-text-base)"
    ),
    fontColor: $getSelectionStyleValueForProperty(
      selection,
      "color",
      "var(--vds-color-neutral-12)"
    ),
    bgColor: $getSelectionStyleValueForProperty(
      selection,
      "background-color",
      "transparent"
    )
  };
}
function applyBlockType(editor, blockType) {
  editor.update(() => {
    const selection = $getSelection();
    if (!$isRangeSelection(selection)) return;
    switch (blockType) {
      case "h1":
      case "h2":
      case "h3":
      case "h4":
      case "h5":
      case "h6":
        $setBlocksType(selection, () => $createHeadingNode(blockType));
        return;
      case "quote":
        $setBlocksType(selection, () => $createQuoteNode());
        return;
      case "code":
        $setBlocksType(selection, () => $createCodeNode(DEFAULT_CODE_LANGUAGE));
        return;
      default:
        $setBlocksType(selection, () => $createParagraphNode());
    }
  });
}
function toggleBulletList(editor, activeType) {
  if (activeType === "bullet") {
    editor.dispatchCommand(REMOVE_LIST_COMMAND, void 0);
    return;
  }
  editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, void 0);
}
function toggleNumberList(editor, activeType) {
  if (activeType === "number") {
    editor.dispatchCommand(REMOVE_LIST_COMMAND, void 0);
    return;
  }
  editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, void 0);
}
function toggleCheckList(editor, activeType) {
  if (activeType === "check") {
    editor.dispatchCommand(REMOVE_LIST_COMMAND, void 0);
    return;
  }
  editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, void 0);
}
function insertDefaultTable(editor, rows = 3, columns = 3) {
  editor.dispatchCommand(INSERT_TABLE_COMMAND, {
    rows: String(rows),
    columns: String(columns),
    includeHeaders: true
  });
}
function insertTable(editor, rows = 3, columns = 3, targetBlockElement) {
  const safeRows = Math.max(1, Math.min(12, Math.trunc(rows) || 3));
  const safeColumns = Math.max(1, Math.min(12, Math.trunc(columns) || 3));
  editor.update(() => {
    const targetNode = resolveInsertionTargetNode(targetBlockElement);
    const table = $createTableNodeWithDimensions(safeRows, safeColumns, true);
    const paragraph = createSelectableParagraph();
    insertAfterNode(targetNode, [table, paragraph]);
    paragraph.select();
  });
}
function getSelectedTableCell(selectionSnapshot) {
  const selection = resolveRangeSelection(selectionSnapshot);
  if (!selection) {
    return null;
  }
  return $getTableCellNodeFromLexicalNode(selection.anchor.getNode());
}
function resolveTableCellNode(selectionSnapshot, targetCellKey) {
  if (targetCellKey) {
    const lexicalNode = $getNodeByKey(targetCellKey);
    if ($isTableCellNode(lexicalNode)) {
      return lexicalNode;
    }
    if (lexicalNode) {
      return $getTableCellNodeFromLexicalNode(lexicalNode);
    }
  }
  return getSelectedTableCell(selectionSnapshot);
}
function insertTableRow(editor, insertAfter, selectionSnapshot, targetCellKey) {
  editor.update(() => {
    const tableCellNode = resolveTableCellNode(
      selectionSnapshot,
      targetCellKey
    );
    if (!tableCellNode) {
      return;
    }
    tableCellNode.selectEnd();
    $insertTableRowAtSelection(insertAfter);
  });
  editor.focus();
}
function insertTableColumn(editor, insertAfter, selectionSnapshot, targetCellKey) {
  editor.update(() => {
    const tableCellNode = resolveTableCellNode(
      selectionSnapshot,
      targetCellKey
    );
    if (!tableCellNode) {
      return;
    }
    tableCellNode.selectEnd();
    $insertTableColumnAtSelection(insertAfter);
  });
  editor.focus();
}
function deleteTableRow(editor, selectionSnapshot, targetCellKey) {
  editor.update(() => {
    const tableCellNode = resolveTableCellNode(
      selectionSnapshot,
      targetCellKey
    );
    if (!tableCellNode) {
      return;
    }
    tableCellNode.selectEnd();
    $deleteTableRowAtSelection();
  });
  editor.focus();
}
function deleteTableColumn(editor, selectionSnapshot, targetCellKey) {
  editor.update(() => {
    const tableCellNode = resolveTableCellNode(
      selectionSnapshot,
      targetCellKey
    );
    if (!tableCellNode) {
      return;
    }
    tableCellNode.selectEnd();
    $deleteTableColumnAtSelection();
  });
  editor.focus();
}
function deleteTable(editor, selectionSnapshot, targetCellKey) {
  editor.update(() => {
    const tableCellNode = resolveTableCellNode(
      selectionSnapshot,
      targetCellKey
    );
    if (!tableCellNode) {
      return;
    }
    const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode);
    const paragraph = createSelectableParagraph();
    tableNode.insertAfter(paragraph);
    tableNode.remove();
    paragraph.select();
  });
  editor.focus();
}
function applyLink(editor, url, selectionSnapshot) {
  const formattedUrl = formatUrl(url);
  editor.update(() => {
    const selection = resolveRangeSelection(selectionSnapshot);
    if (!selection) {
      return;
    }
    const linkNode = getSelectionLinkNode(selection);
    if (linkNode && selection.isCollapsed()) {
      linkNode.setURL(formattedUrl).setTarget("_blank").setRel("noopener noreferrer");
      return;
    }
    $toggleLink({
      url: formattedUrl,
      target: "_blank",
      rel: "noopener noreferrer"
    });
  });
  editor.focus();
}
function clearLink(editor, selectionSnapshot) {
  editor.update(() => {
    const selection = resolveRangeSelection(selectionSnapshot);
    if (!selection) {
      return;
    }
    const linkNode = getSelectionLinkNode(selection);
    if (linkNode && selection.isCollapsed()) {
      unwrapLinkNode(linkNode);
      return;
    }
    $toggleLink(null);
  });
  editor.focus();
}
function clearEditor(editor) {
  editor.focus();
  editor.dispatchCommand(CLEAR_EDITOR_COMMAND, void 0);
}
function resolveRangeSelection(selectionSnapshot) {
  if (selectionSnapshot) {
    $setSelection(selectionSnapshot.clone());
  }
  const selection = $getSelection();
  return $isRangeSelection(selection) ? selection : null;
}
function getSelectionLinkNode(selection) {
  const anchorNode = selection.anchor.getNode();
  const focusNode = selection.focus.getNode();
  const anchorLinkNode = $isLinkNode(anchorNode) ? anchorNode : $findMatchingParent(anchorNode, $isLinkNode);
  if (anchorLinkNode) {
    return anchorLinkNode;
  }
  return $isLinkNode(focusNode) ? focusNode : $findMatchingParent(focusNode, $isLinkNode);
}
function unwrapLinkNode(linkNode) {
  const children = linkNode.getChildren();
  for (const child of children) {
    linkNode.insertBefore(child);
  }
  linkNode.remove();
}
function applyTextStyles(editor, styles, selectionSnapshot, skipHistoryStack = false) {
  editor.update(
    () => {
      const selection = resolveRangeSelection(selectionSnapshot);
      if (!selection) {
        return;
      }
      $patchStyleText(selection, styles);
    },
    skipHistoryStack ? { tag: "historic" } : {}
  );
}
function applySourceValue(editor, value, format, markdownTransformers) {
  applySerializedEditorValue(editor, value, format, markdownTransformers);
}
function undo(editor) {
  editor.dispatchCommand(UNDO_COMMAND, void 0);
}
function redo(editor) {
  editor.dispatchCommand(REDO_COMMAND, void 0);
}
function formatText(editor, format, selectionSnapshot) {
  if (selectionSnapshot) {
    editor.update(() => {
      const selection = resolveRangeSelection(selectionSnapshot);
      if (!selection) {
        return;
      }
      selection.formatText(format);
    });
    editor.focus();
    return;
  }
  editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
}
function formatElement(editor, format) {
  editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, format);
}
function indentContent(editor) {
  editor.dispatchCommand(INDENT_CONTENT_COMMAND, void 0);
}
function outdentContent(editor) {
  editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, void 0);
}
function insertAfterNode(targetNode, nodes) {
  const root = $getRoot();
  if (nodes.length === 0) return;
  if (!targetNode) {
    root.append(...nodes);
    return;
  }
  let previousNode = targetNode;
  for (const node of nodes) {
    previousNode.insertAfter(node);
    previousNode = node;
  }
}
function createSelectableParagraph() {
  const paragraph = $createParagraphNode();
  paragraph.append($createTextNode(""));
  return paragraph;
}
function resolveInsertionTargetNode(targetBlockElement) {
  if (targetBlockElement) {
    const blockNode = $getNearestNodeFromDOMNode(targetBlockElement);
    if (blockNode) {
      return blockNode.getTopLevelElementOrThrow();
    }
  }
  const selection = $getSelection();
  if ($isRangeSelection(selection)) {
    const anchorNode = selection.anchor.getNode();
    if (anchorNode.getKey() === "root") {
      return $getRoot().getLastChild();
    }
    return anchorNode.getTopLevelElementOrThrow();
  }
  return $getRoot().getLastChild();
}
function createListBlock(kind) {
  const list = $createListNode(kind);
  const item = $createListItemNode(kind === "check" ? false : void 0);
  const paragraph = createSelectableParagraph();
  item.append(paragraph);
  list.append(item);
  return {
    nodes: [list],
    focusNode: paragraph
  };
}
function createBlockInsertion(kind) {
  switch (kind) {
    case "paragraph": {
      const paragraph = createSelectableParagraph();
      return {
        nodes: [paragraph],
        focusNode: paragraph
      };
    }
    case "h1":
    case "h2":
    case "h3":
    case "h4":
    case "h5":
    case "h6": {
      const heading = $createHeadingNode(kind);
      heading.append($createTextNode(""));
      return {
        nodes: [heading],
        focusNode: heading
      };
    }
    case "quote": {
      const quote = $createQuoteNode();
      quote.append($createTextNode(""));
      return {
        nodes: [quote],
        focusNode: quote
      };
    }
    case "code": {
      const code = $createCodeNode(DEFAULT_CODE_LANGUAGE);
      const paragraph = createSelectableParagraph();
      code.append($createTextNode(""));
      return {
        nodes: [code, paragraph],
        focusNode: code
      };
    }
    case "bullet":
    case "number":
    case "check":
      return createListBlock(kind);
    case "table": {
      const table = $createTableNodeWithDimensions(3, 3, true);
      const paragraph = createSelectableParagraph();
      return {
        nodes: [table, paragraph],
        focusNode: paragraph
      };
    }
    case "divider": {
      const divider = $createHorizontalRuleNode();
      const paragraph = createSelectableParagraph();
      return {
        nodes: [divider, paragraph],
        focusNode: paragraph
      };
    }
    case "image":
    case "embed":
    case "video": {
      const media = $createEditorMediaNode(kind);
      const paragraph = createSelectableParagraph();
      return {
        nodes: [media, paragraph],
        focusNode: paragraph
      };
    }
  }
}
function insertBlock(editor, kind, targetBlockElement) {
  editor.update(() => {
    const targetNode = resolveInsertionTargetNode(targetBlockElement);
    const { nodes, focusNode } = createBlockInsertion(kind);
    insertAfterNode(targetNode, nodes);
    focusNode.select();
  });
}
function insertMediaBlock(editor, kind, payload, targetBlockElement) {
  editor.update(() => {
    const targetNode = resolveInsertionTargetNode(targetBlockElement);
    const media = $createEditorMediaNode(kind, payload.src, payload.alt ?? "");
    const paragraph = createSelectableParagraph();
    insertAfterNode(targetNode, [media, paragraph]);
    paragraph.select();
  });
}
function getSelectionText(selectionSnapshot) {
  return selectionSnapshot?.getTextContent().trim() ?? "";
}
function wrapSelectionInComment(editor, commentId, selectionSnapshot) {
  editor.update(() => {
    const selection = resolveRangeSelection(selectionSnapshot);
    if (!selection || selection.isCollapsed()) {
      return;
    }
    $wrapSelectionInMarkNode(selection, selection.isBackward(), commentId);
  });
}
function visitDescendants(node, visitor) {
  if (!$isElementNode(node)) {
    return;
  }
  for (const child of node.getChildren()) {
    visitor(child);
    visitDescendants(child, visitor);
  }
}
function removeCommentMark(editor, commentId) {
  editor.update(() => {
    const root = $getRoot();
    const marksToUpdate = [];
    visitDescendants(root, (child) => {
      if ($isMarkNode(child) && child.hasID(commentId)) {
        marksToUpdate.push(child);
      }
    });
    for (const node of marksToUpdate) {
      if (!$isMarkNode(node)) {
        continue;
      }
      node.deleteID(commentId);
      if (node.getIDs().length === 0) {
        $unwrapMarkNode(node);
      }
    }
  });
}
function EditorCodeHighlightPlugin() {
  const [editor] = useLexicalComposerContext();
  useEffect(() => registerCodeHighlighting(editor), [editor]);
  return null;
}
var TRAILING_PARAGRAPH_TAG = "vds-editor-trailing-paragraph";
function isFreeParagraph(node) {
  return node?.getType() === "paragraph" && node.getTextContent().trim() === "";
}
function ensureTrailingParagraph() {
  const root = $getRoot();
  if (!isFreeParagraph(root.getLastChild())) {
    root.append($createParagraphNode());
  }
}
function EditorTrailingParagraphPlugin() {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    let isApplying = false;
    function normalizeTrailingParagraph() {
      if (isApplying) {
        return;
      }
      let shouldNormalize = false;
      editor.getEditorState().read(() => {
        shouldNormalize = !isFreeParagraph($getRoot().getLastChild());
      });
      if (!shouldNormalize) {
        return;
      }
      isApplying = true;
      editor.update(
        () => {
          ensureTrailingParagraph();
        },
        { tag: TRAILING_PARAGRAPH_TAG }
      );
      isApplying = false;
    }
    normalizeTrailingParagraph();
    return editor.registerUpdateListener(({ tags }) => {
      if (tags.has(TRAILING_PARAGRAPH_TAG)) {
        return;
      }
      normalizeTrailingParagraph();
    });
  }, [editor]);
  return null;
}

// src/editor-shortcuts.ts
var IS_MAC_LIKE = typeof navigator !== "undefined" && /(Mac|iPhone|iPad|iPod)/i.test(navigator.platform);
function formatShortcut(windows, mac) {
  return IS_MAC_LIKE ? mac ?? windows.replaceAll("Ctrl", "Cmd") : windows;
}
var SHORTCUTS = {
  NORMAL: formatShortcut("Ctrl+Alt+0", "Cmd+Alt+0"),
  HEADING_1: formatShortcut("Ctrl+Alt+1", "Cmd+Alt+1"),
  HEADING_2: formatShortcut("Ctrl+Alt+2", "Cmd+Alt+2"),
  HEADING_3: formatShortcut("Ctrl+Alt+3", "Cmd+Alt+3"),
  HEADING_4: formatShortcut("Ctrl+Alt+4", "Cmd+Alt+4"),
  HEADING_5: formatShortcut("Ctrl+Alt+5", "Cmd+Alt+5"),
  HEADING_6: formatShortcut("Ctrl+Alt+6", "Cmd+Alt+6"),
  NUMBERED_LIST: formatShortcut("Ctrl+Shift+7", "Cmd+Shift+7"),
  BULLET_LIST: formatShortcut("Ctrl+Shift+8", "Cmd+Shift+8"),
  CHECK_LIST: formatShortcut("Ctrl+Shift+9", "Cmd+Shift+9"),
  QUOTE: formatShortcut("Ctrl+Shift+Q", "Cmd+Shift+Q"),
  CODE_BLOCK: formatShortcut("Ctrl+Alt+C", "Cmd+Alt+C"),
  LEFT_ALIGN: formatShortcut("Ctrl+Shift+L", "Cmd+Shift+L"),
  CENTER_ALIGN: formatShortcut("Ctrl+Shift+E", "Cmd+Shift+E"),
  RIGHT_ALIGN: formatShortcut("Ctrl+Shift+R", "Cmd+Shift+R"),
  JUSTIFY_ALIGN: formatShortcut("Ctrl+Shift+J", "Cmd+Shift+J"),
  OUTDENT: formatShortcut("Ctrl+[", "Cmd+["),
  INDENT: formatShortcut("Ctrl+]", "Cmd+]"),
  LINK: formatShortcut("Ctrl+K", "Cmd+K")
};
function hasPrimaryModifier(event) {
  return Boolean(event.ctrlKey || event.metaKey);
}

// src/EditorShortcutsPlugin.tsx
function isToolbarTarget(target) {
  return target instanceof HTMLElement && Boolean(target.closest("input, textarea, select, button, [role='menu']"));
}
function EditorShortcutsPlugin() {
  const [editor] = useLexicalComposerContext();
  const { features, readOnly } = useEditorConfig();
  useEffect(() => {
    if (readOnly || !features.shortcuts) {
      return;
    }
    return editor.registerCommand(
      KEY_DOWN_COMMAND,
      (event) => {
        const rootElement = editor.getRootElement();
        if (editor.isComposing() || !rootElement || isToolbarTarget(event.target) || !hasPrimaryModifier(event)) {
          return false;
        }
        const target = event.target;
        if (!(target instanceof Node) || !rootElement.contains(target)) {
          return false;
        }
        const key = event.key.toLowerCase();
        if (event.altKey && !event.shiftKey) {
          switch (key) {
            case "0":
              event.preventDefault();
              applyBlockType(editor, "paragraph");
              return true;
            case "1":
              event.preventDefault();
              applyBlockType(editor, "h1");
              return true;
            case "2":
              event.preventDefault();
              applyBlockType(editor, "h2");
              return true;
            case "3":
              event.preventDefault();
              applyBlockType(editor, "h3");
              return true;
            case "4":
              event.preventDefault();
              applyBlockType(editor, "h4");
              return true;
            case "5":
              event.preventDefault();
              applyBlockType(editor, "h5");
              return true;
            case "6":
              event.preventDefault();
              applyBlockType(editor, "h6");
              return true;
            case "c":
              if (!features.codeBlocks) return false;
              event.preventDefault();
              applyBlockType(editor, "code");
              return true;
            default:
              return false;
          }
        }
        if (event.shiftKey) {
          switch (key) {
            case "7":
              if (!features.lists) return false;
              event.preventDefault();
              toggleNumberList(editor, "paragraph");
              return true;
            case "8":
              if (!features.lists) return false;
              event.preventDefault();
              toggleBulletList(editor, "paragraph");
              return true;
            case "9":
              if (!features.checklists) return false;
              event.preventDefault();
              toggleCheckList(editor, "paragraph");
              return true;
            case "q":
              event.preventDefault();
              applyBlockType(editor, "quote");
              return true;
            case "l":
              if (!features.textAlignment) return false;
              event.preventDefault();
              formatElement(editor, "left");
              return true;
            case "e":
              if (!features.textAlignment) return false;
              event.preventDefault();
              formatElement(editor, "center");
              return true;
            case "r":
              if (!features.textAlignment) return false;
              event.preventDefault();
              formatElement(editor, "right");
              return true;
            case "j":
              if (!features.textAlignment) return false;
              event.preventDefault();
              formatElement(editor, "justify");
              return true;
            default:
              return false;
          }
        }
        switch (event.key) {
          case "[":
            event.preventDefault();
            outdentContent(editor);
            return true;
          case "]":
            event.preventDefault();
            indentContent(editor);
            return true;
          default:
            return false;
        }
      },
      COMMAND_PRIORITY_HIGH
    );
  }, [editor, features, readOnly]);
  return null;
}
var DEFAULT_CHANGE_SERIALIZATION = {
  html: false,
  markdown: false,
  json: false,
  debounceMs: 0
};
function EditorEditablePlugin({ editable }) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    editor.setEditable(editable);
  }, [editor, editable]);
  return null;
}
function EditorComposer({
  namespace = "VirtariEditor",
  preset = "core",
  initialValue = null,
  initialValueFormat = "json",
  activeMode = "rich-text",
  onChange,
  changeSerialization,
  onError = (error) => {
    throw error;
  },
  readOnly = false,
  autoFocus = false,
  features,
  linkMatchers = DEFAULT_LINK_MATCHERS,
  markdownTransformers = DEFAULT_MARKDOWN_TRANSFORMERS,
  editorRef,
  children
}) {
  const resolvedFeatures = useMemo(
    () => resolveEditorFeatures(preset, features),
    [features, preset]
  );
  const [metrics, setMetrics] = useState(EMPTY_EDITOR_METRICS);
  const changeTimeoutRef = useRef(null);
  const onChangeRef = useRef(onChange);
  const markdownTransformersRef = useRef(markdownTransformers);
  const initialConfig = useMemo(
    () => ({
      namespace,
      editable: !readOnly,
      nodes: buildEditorNodes(resolvedFeatures),
      onError,
      theme: EDITOR_THEME,
      editorState: createInitialEditorState(
        initialValue,
        initialValueFormat,
        markdownTransformers
      )
    }),
    [
      initialValue,
      initialValueFormat,
      markdownTransformers,
      namespace,
      onError,
      readOnly,
      resolvedFeatures
    ]
  );
  const characterLimitCharset = resolvedFeatures.characterLimit?.charset ?? "UTF-16";
  const isSourceMode = activeMode !== "rich-text";
  const resolvedChangeSerialization = useMemo(
    () => ({
      ...DEFAULT_CHANGE_SERIALIZATION,
      ...changeSerialization
    }),
    [changeSerialization]
  );
  const configValue = useMemo(
    () => ({
      features: resolvedFeatures,
      linkMatchers,
      markdownTransformers,
      readOnly
    }),
    [linkMatchers, markdownTransformers, readOnly, resolvedFeatures]
  );
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);
  useEffect(() => {
    markdownTransformersRef.current = markdownTransformers;
  }, [markdownTransformers]);
  useEffect(
    () => () => {
      if (changeTimeoutRef.current !== null) {
        clearTimeout(changeTimeoutRef.current);
      }
    },
    []
  );
  useEffect(() => {
    if (changeTimeoutRef.current !== null) {
      clearTimeout(changeTimeoutRef.current);
      changeTimeoutRef.current = null;
    }
  }, [activeMode]);
  return /* @__PURE__ */ jsx(LexicalComposer, { initialConfig, children: /* @__PURE__ */ jsx(EditorConfigContext.Provider, { value: configValue, children: /* @__PURE__ */ jsxs(EditorMetricsContext.Provider, { value: metrics, children: [
    editorRef ? /* @__PURE__ */ jsx(EditorRefPlugin, { editorRef }) : null,
    /* @__PURE__ */ jsx(EditorEditablePlugin, { editable: !readOnly }),
    resolvedFeatures.history ? /* @__PURE__ */ jsx(HistoryPlugin, {}) : null,
    resolvedFeatures.links ? /* @__PURE__ */ jsx(LinkPlugin, {}) : null,
    resolvedFeatures.autoLinks ? /* @__PURE__ */ jsx(AutoLinkPlugin, { matchers: linkMatchers }) : null,
    resolvedFeatures.lists ? /* @__PURE__ */ jsx(ListPlugin, { hasStrictIndent: resolvedFeatures.strictListIndent }) : null,
    resolvedFeatures.checklists ? /* @__PURE__ */ jsx(CheckListPlugin, {}) : null,
    resolvedFeatures.tables ? /* @__PURE__ */ jsx(
      TablePlugin,
      {
        hasCellMerge: resolvedFeatures.tableCellMerge,
        hasCellBackgroundColor: resolvedFeatures.tableCellBackgroundColor,
        hasHorizontalScroll: resolvedFeatures.tableHorizontalScroll
      }
    ) : null,
    resolvedFeatures.markdownShortcuts ? /* @__PURE__ */ jsx(MarkdownShortcutPlugin, { transformers: markdownTransformers }) : null,
    resolvedFeatures.tabIndentation ? /* @__PURE__ */ jsx(TabIndentationPlugin, { maxIndent: resolvedFeatures.maxIndent }) : null,
    resolvedFeatures.characterLimit ? /* @__PURE__ */ jsx(
      CharacterLimitPlugin,
      {
        charset: resolvedFeatures.characterLimit.charset ?? "UTF-16",
        maxLength: resolvedFeatures.characterLimit.maxLength,
        renderer: () => /* @__PURE__ */ jsx(
          "span",
          {
            className: "vds-editor-character-limit-meter",
            "aria-hidden": "true",
            hidden: true
          }
        )
      }
    ) : null,
    resolvedFeatures.codeBlocks ? /* @__PURE__ */ jsx(EditorCodeHighlightPlugin, {}) : null,
    resolvedFeatures.shortcuts ? /* @__PURE__ */ jsx(EditorShortcutsPlugin, {}) : null,
    !readOnly ? /* @__PURE__ */ jsx(EditorTrailingParagraphPlugin, {}) : null,
    /* @__PURE__ */ jsx(
      OnChangePlugin,
      {
        ignoreSelectionChange: true,
        onChange: (editorState, editor, tags) => {
          const nextMetrics = buildEditorMetrics(
            editorState,
            characterLimitCharset
          );
          setMetrics(
            (currentMetrics) => areEditorMetricsEqual(currentMetrics, nextMetrics) ? currentMetrics : nextMetrics
          );
          if (!onChange) {
            return;
          }
          if (changeTimeoutRef.current !== null) {
            clearTimeout(changeTimeoutRef.current);
            changeTimeoutRef.current = null;
          }
          const nextTags = new Set(tags);
          const basePayload = {
            ...nextMetrics,
            editor,
            editorState,
            tags: nextTags
          };
          if (isSourceMode || !resolvedChangeSerialization.html && !resolvedChangeSerialization.markdown && !resolvedChangeSerialization.json) {
            onChange(basePayload);
            return;
          }
          const emitSerializedChange = () => {
            const nextOnChange = onChangeRef.current;
            if (!nextOnChange) {
              return;
            }
            const payload = buildEditorChangePayload(
              editor,
              editorState,
              markdownTransformersRef.current,
              characterLimitCharset,
              nextTags,
              {
                includeHtml: resolvedChangeSerialization.html,
                includeJson: resolvedChangeSerialization.json,
                includeMarkdown: resolvedChangeSerialization.markdown
              }
            );
            nextOnChange(payload);
          };
          if (resolvedChangeSerialization.debounceMs > 0) {
            changeTimeoutRef.current = setTimeout(
              emitSerializedChange,
              resolvedChangeSerialization.debounceMs
            );
            return;
          }
          emitSerializedChange();
        }
      }
    ),
    autoFocus ? /* @__PURE__ */ jsx(AutoFocusPlugin, {}) : null,
    children
  ] }) }) });
}
var EditorSurface = forwardRef(
  function EditorSurface2({
    placeholder = "Start writing...",
    placeholderText,
    className,
    style,
    contentClassName,
    contentStyle,
    placeholderClassName,
    minHeight = "12rem",
    maxHeight,
    ...contentEditableProps
  }, ref) {
    const { readOnly } = useEditorConfig();
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: cn("vds-editor-surface", className),
        style,
        "data-read-only": readOnly || void 0,
        children: /* @__PURE__ */ jsx(
          "div",
          {
            className: "vds-editor-scroller",
            style: {
              minBlockSize: minHeight,
              maxBlockSize: maxHeight
            },
            children: /* @__PURE__ */ jsx("div", { ref, className: "vds-editor-stage", children: /* @__PURE__ */ jsx(
              RichTextPlugin,
              {
                contentEditable: /* @__PURE__ */ jsx(
                  ContentEditable,
                  {
                    ...contentEditableProps,
                    className: cn("vds-editor-content", contentClassName),
                    placeholder: null,
                    style: contentStyle,
                    role: "textbox",
                    "aria-multiline": "true"
                  }
                ),
                placeholder: /* @__PURE__ */ jsx("div", { className: cn("vds-editor-placeholder", placeholderClassName), children: placeholder }),
                ErrorBoundary: LexicalErrorBoundary
              }
            ) })
          }
        )
      }
    );
  }
);

export { $createEditorMediaNode, $isEditorMediaNode, DEFAULT_CORE_FEATURES, DEFAULT_LINK_MATCHERS, DEFAULT_MARKDOWN_TRANSFORMERS, DEFAULT_PRO_FEATURES, EDITOR_THEME, EMPTY_TOOLBAR_STATE, EditorComposer, EditorMediaNode, EditorSurface, SHORTCUTS, applyBlockType, applyLink, applySourceValue, applyTextStyles, buildEditorNodes, clearEditor, clearLink, countCharacters, countWords, createInitialEditorState, deleteTable, deleteTableColumn, deleteTableRow, formatElement, formatText, getSelectionText, indentContent, insertBlock, insertDefaultTable, insertMediaBlock, insertTable, insertTableColumn, insertTableRow, outdentContent, readSourceValue, readToolbarState, redo, removeCommentMark, resolveEditorFeatures, toggleBulletList, toggleCheckList, toggleNumberList, undo, useEditorConfig, useEditorContext, useEditorMetrics, wrapSelectionInComment };
