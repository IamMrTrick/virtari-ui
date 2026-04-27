"use client";
'use strict';

var LexicalAutoFocusPlugin = require('@lexical/react/LexicalAutoFocusPlugin');
var LexicalAutoLinkPlugin = require('@lexical/react/LexicalAutoLinkPlugin');
var LexicalCharacterLimitPlugin = require('@lexical/react/LexicalCharacterLimitPlugin');
var LexicalCheckListPlugin = require('@lexical/react/LexicalCheckListPlugin');
var LexicalEditorRefPlugin = require('@lexical/react/LexicalEditorRefPlugin');
var LexicalHistoryPlugin = require('@lexical/react/LexicalHistoryPlugin');
var LexicalComposer = require('@lexical/react/LexicalComposer');
var LexicalComposerContext = require('@lexical/react/LexicalComposerContext');
var LexicalLinkPlugin = require('@lexical/react/LexicalLinkPlugin');
var LexicalListPlugin = require('@lexical/react/LexicalListPlugin');
var LexicalMarkdownShortcutPlugin = require('@lexical/react/LexicalMarkdownShortcutPlugin');
var LexicalOnChangePlugin = require('@lexical/react/LexicalOnChangePlugin');
var LexicalTablePlugin = require('@lexical/react/LexicalTablePlugin');
var LexicalTabIndentationPlugin = require('@lexical/react/LexicalTabIndentationPlugin');
var react = require('react');
var html = require('@lexical/html');
var link = require('@lexical/link');
var list = require('@lexical/list');
var markdown = require('@lexical/markdown');
var selection = require('@lexical/selection');
var mark = require('@lexical/mark');
var richText = require('@lexical/rich-text');
var table = require('@lexical/table');
var code = require('@lexical/code');
var LexicalHorizontalRuleNode = require('@lexical/react/LexicalHorizontalRuleNode');
var lexical = require('lexical');
var overflow = require('@lexical/overflow');
var jsxRuntime = require('react/jsx-runtime');
var LexicalContentEditable = require('@lexical/react/LexicalContentEditable');
var LexicalErrorBoundary = require('@lexical/react/LexicalErrorBoundary');
var LexicalRichTextPlugin = require('@lexical/react/LexicalRichTextPlugin');
var utils = require('@virtari-packages/utils');
var reactButton = require('@virtari-packages/react-button');
var reactTextarea = require('@virtari-packages/react-textarea');
var reactIcons = require('@virtari-packages/react-icons');
var LexicalDraggableBlockPlugin = require('@lexical/react/LexicalDraggableBlockPlugin');
var reactKbd = require('@virtari-packages/react-kbd');
var reactDom = require('react-dom');
var reactCode = require('@virtari-packages/react-code');
var reactDialog = require('@virtari-packages/react-dialog');
var reactFileUpload = require('@virtari-packages/react-file-upload');
var reactInput = require('@virtari-packages/react-input');
var reactTabs = require('@virtari-packages/react-tabs');
var utils$1 = require('@lexical/utils');
var reactTooltip = require('@virtari-packages/react-tooltip');
var LexicalTypeaheadMenuPlugin = require('@lexical/react/LexicalTypeaheadMenuPlugin');
var reactColorPicker = require('@virtari-packages/react-color-picker');
var reactScrollArea = require('@virtari-packages/react-scroll-area');
var reactSelect = require('@virtari-packages/react-select');
var reactFieldset = require('@virtari-packages/react-fieldset');

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
var EditorConfigContext = react.createContext(null);
var EditorMetricsContext = react.createContext(null);
function useEditorConfig() {
  const value = react.useContext(EditorConfigContext);
  if (!value) {
    throw new Error(CONTEXT_ERROR);
  }
  return value;
}
function useEditorMetrics() {
  const value = react.useContext(EditorMetricsContext);
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
var EditorMediaNode = class _EditorMediaNode extends lexical.DecoratorNode {
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
      return /* @__PURE__ */ jsxRuntime.jsxs("figure", { className: "vds-editor-media-figure", "data-kind": this.__kind, children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          "img",
          {
            className: "vds-editor-media-preview",
            src: this.__src,
            alt: this.__alt
          }
        ),
        this.__alt ? /* @__PURE__ */ jsxRuntime.jsx("figcaption", { className: "vds-editor-media-caption", children: this.__alt }) : null
      ] });
    }
    if (this.__kind === "video" && this.__src && isDirectVideoSource(this.__src)) {
      return /* @__PURE__ */ jsxRuntime.jsxs("figure", { className: "vds-editor-media-figure", "data-kind": this.__kind, children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          "video",
          {
            className: "vds-editor-media-preview",
            src: this.__src,
            "aria-label": this.__alt || void 0,
            controls: true
          }
        ),
        this.__alt ? /* @__PURE__ */ jsxRuntime.jsx("figcaption", { className: "vds-editor-media-caption", children: this.__alt }) : null
      ] });
    }
    if (this.__src && (this.__kind === "embed" || this.__kind === "video")) {
      return /* @__PURE__ */ jsxRuntime.jsxs("figure", { className: "vds-editor-media-figure", "data-kind": this.__kind, children: [
        /* @__PURE__ */ jsxRuntime.jsx(
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
        this.__alt ? /* @__PURE__ */ jsxRuntime.jsx("figcaption", { className: "vds-editor-media-caption", children: this.__alt }) : null
      ] });
    }
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-editor-media-card", "data-kind": this.__kind, children: [
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-editor-media-kind", children: label }),
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-editor-media-detail", children: detail })
    ] });
  }
};
function $createEditorMediaNode(kind, src = "", alt = "") {
  return lexical.$applyNodeReplacement(
    new EditorMediaNode(normalizeKind(kind), src, alt)
  );
}
function $isEditorMediaNode(node) {
  return node instanceof EditorMediaNode;
}
var URL_MATCHER = /((https?:\/\/(www\.)?)|(www\.))[-A-Za-z0-9@:%._+~#=]{1,256}\.[A-Za-z0-9()]{1,24}\b([-A-Za-z0-9()@:%_+.~#?&//=]*)/;
var EMAIL_MATCHER = /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([A-Za-z0-9-]+\.)+[A-Za-z]{2,})/;
var DEFAULT_LINK_MATCHERS = [
  LexicalAutoLinkPlugin.createLinkMatcherWithRegExp(
    URL_MATCHER,
    (text) => text.startsWith("http") ? text : `https://${text}`
  ),
  LexicalAutoLinkPlugin.createLinkMatcherWithRegExp(EMAIL_MATCHER, (text) => `mailto:${text}`)
];
var DEFAULT_MARKDOWN_TRANSFORMERS = markdown.TRANSFORMERS;
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
  const nodes = [richText.HeadingNode, richText.QuoteNode];
  if (features.links) {
    nodes.push(link.LinkNode);
  }
  if (features.autoLinks) {
    nodes.push(link.AutoLinkNode);
  }
  if (features.lists || features.checklists) {
    nodes.push(list.ListNode, list.ListItemNode);
  }
  if (features.codeBlocks) {
    nodes.push(code.CodeNode, code.CodeHighlightNode);
  }
  if (features.media) {
    nodes.push(EditorMediaNode);
  }
  if (features.horizontalRule) {
    nodes.push(LexicalHorizontalRuleNode.HorizontalRuleNode);
  }
  if (features.comments) {
    nodes.push(mark.MarkNode);
  }
  if (features.tables) {
    nodes.push(table.TableNode, table.TableCellNode, table.TableRowNode);
  }
  if (features.characterLimit) {
    nodes.push(overflow.OverflowNode);
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
    const root = lexical.$getRoot();
    root.clear();
    root.select();
    if (value.trim().length === 0) {
      root.append(lexical.$createParagraphNode());
      return;
    }
    if (format === "markdown") {
      markdown.$convertFromMarkdownString(value, markdownTransformers);
      return;
    }
    const parser = new DOMParser();
    const dom = parser.parseFromString(value, "text/html");
    const nodes = html.$generateNodesFromDOM(editor, dom);
    if (nodes.length === 0) {
      root.append(lexical.$createParagraphNode());
      return;
    }
    lexical.$insertNodes(nodes);
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
    text = lexical.$getRoot().getTextContent();
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
  let html$1 = "";
  let markdown$1 = "";
  let isEmpty = true;
  editorState.read(() => {
    const root = lexical.$getRoot();
    text = root.getTextContent();
    if (includeHtml) {
      html$1 = html.$generateHtmlFromNodes(editor, null);
    }
    if (includeMarkdown) {
      markdown$1 = markdown.$convertToMarkdownString(markdownTransformers);
    }
    isEmpty = !hasTextContent(text);
  });
  const json = includeJson ? editorState.toJSON() : null;
  return {
    editor,
    editorState,
    tags,
    text,
    html: html$1,
    markdown: markdown$1,
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
  if (code.$isCodeNode(firstChild) && firstChild.getLanguage() === getSourceModeLanguage(mode)) {
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
    const root = lexical.$getRoot();
    const existingCodeNode = getSourceModeCodeNode(root, mode);
    if (existingCodeNode) {
      return existingCodeNode.getTextContent();
    }
    if (mode === "markdown") {
      return markdown.$convertToMarkdownString(markdownTransformers);
    }
    return formatHtmlSource(html.$generateHtmlFromNodes(editor, null));
  });
}
function readToolbarState() {
  const selection$1 = lexical.$getSelection();
  if (!lexical.$isRangeSelection(selection$1)) {
    return EMPTY_TOOLBAR_STATE;
  }
  const anchorNode = selection$1.anchor.getNode();
  const topLevel = anchorNode.getKey() === "root" ? null : anchorNode.getTopLevelElementOrThrow();
  const listNode = lexical.$findMatchingParent(anchorNode, list.$isListNode);
  const linkNode = lexical.$findMatchingParent(anchorNode, link.$isLinkNode);
  const tableCellNode = table.$getTableCellNodeFromLexicalNode(anchorNode);
  const linkParentElement = linkNode ? lexical.$findMatchingParent(
    anchorNode,
    (parentNode) => lexical.$isElementNode(parentNode) && !parentNode.isInline()
  ) : null;
  let blockType = "paragraph";
  let elementFormat = "left";
  if (listNode) {
    const listType = listNode.getListType();
    blockType = listType === "number" ? "number" : listType === "check" ? "check" : "bullet";
  } else if (topLevel && richText.$isHeadingNode(topLevel)) {
    const tag = topLevel.getTag();
    blockType = tag === "h1" || tag === "h2" || tag === "h3" ? tag : "paragraph";
  } else if (topLevel && richText.$isQuoteNode(topLevel)) {
    blockType = "quote";
  } else if (topLevel && code.$isCodeNode(topLevel)) {
    blockType = "code";
  }
  const elementForFormat = (lexical.$isElementNode(linkParentElement) ? linkParentElement : null) ?? (lexical.$isElementNode(topLevel) ? topLevel : null);
  if (elementForFormat) {
    const formatType = elementForFormat.getFormatType();
    elementFormat = formatType === "" ? "left" : formatType;
  }
  return {
    blockType,
    elementFormat,
    isBold: selection$1.hasFormat("bold"),
    isItalic: selection$1.hasFormat("italic"),
    isUnderline: selection$1.hasFormat("underline"),
    isStrikethrough: selection$1.hasFormat("strikethrough"),
    isInlineCode: selection$1.hasFormat("code"),
    isSubscript: selection$1.hasFormat("subscript"),
    isSuperscript: selection$1.hasFormat("superscript"),
    isLowercase: selection$1.hasFormat("lowercase"),
    isUppercase: selection$1.hasFormat("uppercase"),
    isCapitalize: selection$1.hasFormat("capitalize"),
    isTableSelection: Boolean(tableCellNode),
    isLink: Boolean(linkNode),
    linkUrl: linkNode?.getURL() ?? "",
    fontFamily: selection.$getSelectionStyleValueForProperty(
      selection$1,
      "font-family",
      "var(--vds-font-sans)"
    ),
    fontSize: selection.$getSelectionStyleValueForProperty(
      selection$1,
      "font-size",
      "var(--vds-text-base)"
    ),
    fontColor: selection.$getSelectionStyleValueForProperty(
      selection$1,
      "color",
      "var(--vds-color-neutral-12)"
    ),
    bgColor: selection.$getSelectionStyleValueForProperty(
      selection$1,
      "background-color",
      "transparent"
    )
  };
}
function applyBlockType(editor, blockType) {
  editor.update(() => {
    const selection$1 = lexical.$getSelection();
    if (!lexical.$isRangeSelection(selection$1)) return;
    switch (blockType) {
      case "h1":
      case "h2":
      case "h3":
        selection.$setBlocksType(selection$1, () => richText.$createHeadingNode(blockType));
        return;
      case "quote":
        selection.$setBlocksType(selection$1, () => richText.$createQuoteNode());
        return;
      case "code":
        selection.$setBlocksType(selection$1, () => code.$createCodeNode(code.DEFAULT_CODE_LANGUAGE));
        return;
      default:
        selection.$setBlocksType(selection$1, () => lexical.$createParagraphNode());
    }
  });
}
function toggleBulletList(editor, activeType) {
  if (activeType === "bullet") {
    editor.dispatchCommand(list.REMOVE_LIST_COMMAND, void 0);
    return;
  }
  editor.dispatchCommand(list.INSERT_UNORDERED_LIST_COMMAND, void 0);
}
function toggleNumberList(editor, activeType) {
  if (activeType === "number") {
    editor.dispatchCommand(list.REMOVE_LIST_COMMAND, void 0);
    return;
  }
  editor.dispatchCommand(list.INSERT_ORDERED_LIST_COMMAND, void 0);
}
function toggleCheckList(editor, activeType) {
  if (activeType === "check") {
    editor.dispatchCommand(list.REMOVE_LIST_COMMAND, void 0);
    return;
  }
  editor.dispatchCommand(list.INSERT_CHECK_LIST_COMMAND, void 0);
}
function insertDefaultTable(editor, rows = 3, columns = 3) {
  editor.dispatchCommand(table.INSERT_TABLE_COMMAND, {
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
    const table$1 = table.$createTableNodeWithDimensions(safeRows, safeColumns, true);
    const paragraph = createSelectableParagraph();
    insertAfterNode(targetNode, [table$1, paragraph]);
    paragraph.select();
  });
}
function getSelectedTableCell(selectionSnapshot) {
  const selection = resolveRangeSelection(selectionSnapshot);
  if (!selection) {
    return null;
  }
  return table.$getTableCellNodeFromLexicalNode(selection.anchor.getNode());
}
function resolveTableCellNode(selectionSnapshot, targetCellKey) {
  if (targetCellKey) {
    const lexicalNode = lexical.$getNodeByKey(targetCellKey);
    if (table.$isTableCellNode(lexicalNode)) {
      return lexicalNode;
    }
    if (lexicalNode) {
      return table.$getTableCellNodeFromLexicalNode(lexicalNode);
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
    table.$insertTableRowAtSelection(insertAfter);
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
    table.$insertTableColumnAtSelection(insertAfter);
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
    table.$deleteTableRowAtSelection();
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
    table.$deleteTableColumnAtSelection();
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
    const tableNode = table.$getTableNodeFromLexicalNodeOrThrow(tableCellNode);
    const paragraph = createSelectableParagraph();
    tableNode.insertAfter(paragraph);
    tableNode.remove();
    paragraph.select();
  });
  editor.focus();
}
function applyLink(editor, url, selectionSnapshot) {
  const formattedUrl = link.formatUrl(url);
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
    link.$toggleLink({
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
    link.$toggleLink(null);
  });
  editor.focus();
}
function clearEditor(editor) {
  editor.focus();
  editor.dispatchCommand(lexical.CLEAR_EDITOR_COMMAND, void 0);
}
function resolveRangeSelection(selectionSnapshot) {
  if (selectionSnapshot) {
    lexical.$setSelection(selectionSnapshot.clone());
  }
  const selection = lexical.$getSelection();
  return lexical.$isRangeSelection(selection) ? selection : null;
}
function getSelectionLinkNode(selection) {
  const anchorNode = selection.anchor.getNode();
  const focusNode = selection.focus.getNode();
  const anchorLinkNode = link.$isLinkNode(anchorNode) ? anchorNode : lexical.$findMatchingParent(anchorNode, link.$isLinkNode);
  if (anchorLinkNode) {
    return anchorLinkNode;
  }
  return link.$isLinkNode(focusNode) ? focusNode : lexical.$findMatchingParent(focusNode, link.$isLinkNode);
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
      const selection$1 = resolveRangeSelection(selectionSnapshot);
      if (!selection$1) {
        return;
      }
      selection.$patchStyleText(selection$1, styles);
    },
    skipHistoryStack ? { tag: "historic" } : {}
  );
}
function applySourceValue(editor, value, format, markdownTransformers) {
  applySerializedEditorValue(editor, value, format, markdownTransformers);
}
function undo(editor) {
  editor.dispatchCommand(lexical.UNDO_COMMAND, void 0);
}
function redo(editor) {
  editor.dispatchCommand(lexical.REDO_COMMAND, void 0);
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
  editor.dispatchCommand(lexical.FORMAT_TEXT_COMMAND, format);
}
function formatElement(editor, format) {
  editor.dispatchCommand(lexical.FORMAT_ELEMENT_COMMAND, format);
}
function indentContent(editor) {
  editor.dispatchCommand(lexical.INDENT_CONTENT_COMMAND, void 0);
}
function outdentContent(editor) {
  editor.dispatchCommand(lexical.OUTDENT_CONTENT_COMMAND, void 0);
}
function insertAfterNode(targetNode, nodes) {
  const root = lexical.$getRoot();
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
  const paragraph = lexical.$createParagraphNode();
  paragraph.append(lexical.$createTextNode(""));
  return paragraph;
}
function resolveInsertionTargetNode(targetBlockElement) {
  if (targetBlockElement) {
    const blockNode = lexical.$getNearestNodeFromDOMNode(targetBlockElement);
    if (blockNode) {
      return blockNode.getTopLevelElementOrThrow();
    }
  }
  const selection = lexical.$getSelection();
  if (lexical.$isRangeSelection(selection)) {
    const anchorNode = selection.anchor.getNode();
    if (anchorNode.getKey() === "root") {
      return lexical.$getRoot().getLastChild();
    }
    return anchorNode.getTopLevelElementOrThrow();
  }
  return lexical.$getRoot().getLastChild();
}
function createListBlock(kind) {
  const list$1 = list.$createListNode(kind);
  const item = list.$createListItemNode(kind === "check" ? false : void 0);
  const paragraph = createSelectableParagraph();
  item.append(paragraph);
  list$1.append(item);
  return {
    nodes: [list$1],
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
    case "h3": {
      const heading = richText.$createHeadingNode(kind);
      heading.append(lexical.$createTextNode(""));
      return {
        nodes: [heading],
        focusNode: heading
      };
    }
    case "quote": {
      const quote = richText.$createQuoteNode();
      quote.append(lexical.$createTextNode(""));
      return {
        nodes: [quote],
        focusNode: quote
      };
    }
    case "code": {
      const code$1 = code.$createCodeNode(code.DEFAULT_CODE_LANGUAGE);
      const paragraph = createSelectableParagraph();
      code$1.append(lexical.$createTextNode(""));
      return {
        nodes: [code$1, paragraph],
        focusNode: code$1
      };
    }
    case "bullet":
    case "number":
    case "check":
      return createListBlock(kind);
    case "table": {
      const table$1 = table.$createTableNodeWithDimensions(3, 3, true);
      const paragraph = createSelectableParagraph();
      return {
        nodes: [table$1, paragraph],
        focusNode: paragraph
      };
    }
    case "divider": {
      const divider = LexicalHorizontalRuleNode.$createHorizontalRuleNode();
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
    mark.$wrapSelectionInMarkNode(selection, selection.isBackward(), commentId);
  });
}
function visitDescendants(node, visitor) {
  if (!lexical.$isElementNode(node)) {
    return;
  }
  for (const child of node.getChildren()) {
    visitor(child);
    visitDescendants(child, visitor);
  }
}
function removeCommentMark(editor, commentId) {
  editor.update(() => {
    const root = lexical.$getRoot();
    const marksToUpdate = [];
    visitDescendants(root, (child) => {
      if (mark.$isMarkNode(child) && child.hasID(commentId)) {
        marksToUpdate.push(child);
      }
    });
    for (const node of marksToUpdate) {
      if (!mark.$isMarkNode(node)) {
        continue;
      }
      node.deleteID(commentId);
      if (node.getIDs().length === 0) {
        mark.$unwrapMarkNode(node);
      }
    }
  });
}
function EditorCodeHighlightPlugin() {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  react.useEffect(() => code.registerCodeHighlighting(editor), [editor]);
  return null;
}
var TRAILING_PARAGRAPH_TAG = "vds-editor-trailing-paragraph";
function isFreeParagraph(node) {
  return node?.getType() === "paragraph" && node.getTextContent().trim() === "";
}
function ensureTrailingParagraph() {
  const root = lexical.$getRoot();
  if (!isFreeParagraph(root.getLastChild())) {
    root.append(lexical.$createParagraphNode());
  }
}
function EditorTrailingParagraphPlugin() {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  react.useEffect(() => {
    let isApplying = false;
    function normalizeTrailingParagraph() {
      if (isApplying) {
        return;
      }
      let shouldNormalize = false;
      editor.getEditorState().read(() => {
        shouldNormalize = !isFreeParagraph(lexical.$getRoot().getLastChild());
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
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  const { features, readOnly } = useEditorConfig();
  react.useEffect(() => {
    if (readOnly || !features.shortcuts) {
      return;
    }
    return editor.registerCommand(
      lexical.KEY_DOWN_COMMAND,
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
      lexical.COMMAND_PRIORITY_HIGH
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
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  react.useEffect(() => {
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
  const resolvedFeatures = react.useMemo(
    () => resolveEditorFeatures(preset, features),
    [features, preset]
  );
  const [metrics, setMetrics] = react.useState(EMPTY_EDITOR_METRICS);
  const changeTimeoutRef = react.useRef(null);
  const onChangeRef = react.useRef(onChange);
  const markdownTransformersRef = react.useRef(markdownTransformers);
  const initialConfig = react.useMemo(
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
  const resolvedChangeSerialization = react.useMemo(
    () => ({
      ...DEFAULT_CHANGE_SERIALIZATION,
      ...changeSerialization
    }),
    [changeSerialization]
  );
  const configValue = react.useMemo(
    () => ({
      features: resolvedFeatures,
      linkMatchers,
      markdownTransformers,
      readOnly
    }),
    [linkMatchers, markdownTransformers, readOnly, resolvedFeatures]
  );
  react.useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);
  react.useEffect(() => {
    markdownTransformersRef.current = markdownTransformers;
  }, [markdownTransformers]);
  react.useEffect(
    () => () => {
      if (changeTimeoutRef.current !== null) {
        clearTimeout(changeTimeoutRef.current);
      }
    },
    []
  );
  react.useEffect(() => {
    if (changeTimeoutRef.current !== null) {
      clearTimeout(changeTimeoutRef.current);
      changeTimeoutRef.current = null;
    }
  }, [activeMode]);
  return /* @__PURE__ */ jsxRuntime.jsx(LexicalComposer.LexicalComposer, { initialConfig, children: /* @__PURE__ */ jsxRuntime.jsx(EditorConfigContext.Provider, { value: configValue, children: /* @__PURE__ */ jsxRuntime.jsxs(EditorMetricsContext.Provider, { value: metrics, children: [
    editorRef ? /* @__PURE__ */ jsxRuntime.jsx(LexicalEditorRefPlugin.EditorRefPlugin, { editorRef }) : null,
    /* @__PURE__ */ jsxRuntime.jsx(EditorEditablePlugin, { editable: !readOnly }),
    resolvedFeatures.history ? /* @__PURE__ */ jsxRuntime.jsx(LexicalHistoryPlugin.HistoryPlugin, {}) : null,
    resolvedFeatures.links ? /* @__PURE__ */ jsxRuntime.jsx(LexicalLinkPlugin.LinkPlugin, {}) : null,
    resolvedFeatures.autoLinks ? /* @__PURE__ */ jsxRuntime.jsx(LexicalAutoLinkPlugin.AutoLinkPlugin, { matchers: linkMatchers }) : null,
    resolvedFeatures.lists ? /* @__PURE__ */ jsxRuntime.jsx(LexicalListPlugin.ListPlugin, { hasStrictIndent: resolvedFeatures.strictListIndent }) : null,
    resolvedFeatures.checklists ? /* @__PURE__ */ jsxRuntime.jsx(LexicalCheckListPlugin.CheckListPlugin, {}) : null,
    resolvedFeatures.tables ? /* @__PURE__ */ jsxRuntime.jsx(
      LexicalTablePlugin.TablePlugin,
      {
        hasCellMerge: resolvedFeatures.tableCellMerge,
        hasCellBackgroundColor: resolvedFeatures.tableCellBackgroundColor,
        hasHorizontalScroll: resolvedFeatures.tableHorizontalScroll
      }
    ) : null,
    resolvedFeatures.markdownShortcuts ? /* @__PURE__ */ jsxRuntime.jsx(LexicalMarkdownShortcutPlugin.MarkdownShortcutPlugin, { transformers: markdownTransformers }) : null,
    resolvedFeatures.tabIndentation ? /* @__PURE__ */ jsxRuntime.jsx(LexicalTabIndentationPlugin.TabIndentationPlugin, { maxIndent: resolvedFeatures.maxIndent }) : null,
    resolvedFeatures.characterLimit ? /* @__PURE__ */ jsxRuntime.jsx(
      LexicalCharacterLimitPlugin.CharacterLimitPlugin,
      {
        charset: resolvedFeatures.characterLimit.charset ?? "UTF-16",
        maxLength: resolvedFeatures.characterLimit.maxLength,
        renderer: () => /* @__PURE__ */ jsxRuntime.jsx(
          "span",
          {
            className: "vds-editor-character-limit-meter",
            "aria-hidden": "true",
            hidden: true
          }
        )
      }
    ) : null,
    resolvedFeatures.codeBlocks ? /* @__PURE__ */ jsxRuntime.jsx(EditorCodeHighlightPlugin, {}) : null,
    resolvedFeatures.shortcuts ? /* @__PURE__ */ jsxRuntime.jsx(EditorShortcutsPlugin, {}) : null,
    !readOnly ? /* @__PURE__ */ jsxRuntime.jsx(EditorTrailingParagraphPlugin, {}) : null,
    /* @__PURE__ */ jsxRuntime.jsx(
      LexicalOnChangePlugin.OnChangePlugin,
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
    autoFocus ? /* @__PURE__ */ jsxRuntime.jsx(LexicalAutoFocusPlugin.AutoFocusPlugin, {}) : null,
    children
  ] }) }) });
}
var EditorSurface = react.forwardRef(
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
    return /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        className: utils.cn("vds-editor-surface", className),
        style,
        "data-read-only": readOnly || void 0,
        children: /* @__PURE__ */ jsxRuntime.jsx(
          "div",
          {
            className: "vds-editor-scroller",
            style: {
              minBlockSize: minHeight,
              maxBlockSize: maxHeight
            },
            children: /* @__PURE__ */ jsxRuntime.jsx("div", { ref, className: "vds-editor-stage", children: /* @__PURE__ */ jsxRuntime.jsx(
              LexicalRichTextPlugin.RichTextPlugin,
              {
                contentEditable: /* @__PURE__ */ jsxRuntime.jsx(
                  LexicalContentEditable.ContentEditable,
                  {
                    ...contentEditableProps,
                    className: utils.cn("vds-editor-content", contentClassName),
                    placeholder: null,
                    style: contentStyle,
                    role: "textbox",
                    "aria-multiline": "true"
                  }
                ),
                placeholder: /* @__PURE__ */ jsxRuntime.jsx("div", { className: utils.cn("vds-editor-placeholder", placeholderClassName), children: placeholder }),
                ErrorBoundary: LexicalErrorBoundary.LexicalErrorBoundary
              }
            ) })
          }
        )
      }
    );
  }
);
function formatThreadDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleString();
}
function EditorCommentsPanel({
  className,
  composerOpen,
  draft,
  pendingQuote,
  threads,
  onDraftChange,
  onSubmit,
  onCancel,
  onResolve,
  onRemove
}) {
  if (!composerOpen && threads.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntime.jsxs("section", { className: utils.cn("vds-editor-comments", className), children: [
    composerOpen ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-editor-comments-composer", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-editor-comments-header", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "vds-editor-comments-title", children: [
          /* @__PURE__ */ jsxRuntime.jsx(reactIcons.Icon, { icon: reactIcons.IconMessageCircle, size: "sm" }),
          "Add comment"
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(
          reactButton.Button,
          {
            type: "button",
            variant: "ghost",
            color: "contrast",
            size: "xs",
            className: "vds-editor-comments-close",
            onClick: onCancel,
            children: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.Icon, { icon: reactIcons.IconX, size: "sm" })
          }
        )
      ] }),
      pendingQuote ? /* @__PURE__ */ jsxRuntime.jsx("blockquote", { className: "vds-editor-comments-quote", children: pendingQuote }) : null,
      /* @__PURE__ */ jsxRuntime.jsx(
        reactTextarea.Textarea,
        {
          inputSize: "sm",
          className: "vds-editor-comments-input",
          rows: 4,
          value: draft,
          onChange: (event) => onDraftChange(event.target.value),
          placeholder: "Leave context for this selection..."
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-editor-comments-actions", children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          reactButton.Button,
          {
            type: "button",
            variant: "ghost",
            color: "contrast",
            size: "sm",
            onClick: onCancel,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          reactButton.Button,
          {
            type: "button",
            variant: "soft",
            color: "primary",
            size: "sm",
            disabled: draft.trim().length === 0,
            onClick: onSubmit,
            children: "Add comment"
          }
        )
      ] })
    ] }) : null,
    threads.length > 0 ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-editor-comments-list", children: threads.map((thread) => /* @__PURE__ */ jsxRuntime.jsxs(
      "article",
      {
        className: "vds-editor-comment-card",
        "data-status": thread.status,
        children: [
          /* @__PURE__ */ jsxRuntime.jsxs("header", { className: "vds-editor-comment-card-header", children: [
            /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "vds-editor-comment-card-title", children: [
              /* @__PURE__ */ jsxRuntime.jsx(reactIcons.Icon, { icon: reactIcons.IconMessageCircle, size: "sm" }),
              thread.status === "resolved" ? "Resolved comment" : "Comment"
            ] }),
            /* @__PURE__ */ jsxRuntime.jsx(
              "time",
              {
                className: "vds-editor-comment-card-date",
                dateTime: thread.createdAt,
                children: formatThreadDate(thread.createdAt)
              }
            )
          ] }),
          thread.quote ? /* @__PURE__ */ jsxRuntime.jsx("blockquote", { className: "vds-editor-comment-card-quote", children: thread.quote }) : null,
          /* @__PURE__ */ jsxRuntime.jsx("p", { className: "vds-editor-comment-card-body", children: thread.body }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-editor-comment-card-actions", children: [
            thread.status === "open" ? /* @__PURE__ */ jsxRuntime.jsxs(
              reactButton.Button,
              {
                type: "button",
                variant: "ghost",
                color: "success",
                size: "xs",
                onClick: () => onResolve(thread.id),
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx(reactIcons.Icon, { icon: reactIcons.IconCheck, size: "sm" }),
                  "Resolve"
                ]
              }
            ) : null,
            /* @__PURE__ */ jsxRuntime.jsxs(
              reactButton.Button,
              {
                type: "button",
                variant: "ghost",
                color: "danger",
                size: "xs",
                onClick: () => onRemove(thread.id),
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx(reactIcons.Icon, { icon: reactIcons.IconTrash, size: "sm" }),
                  "Remove"
                ]
              }
            )
          ] })
        ]
      },
      thread.id
    )) }) : null
  ] });
}
var DROPDOWN_OFFSET = 6;
var VIEWPORT_GUTTER = 8;
var OFFSCREEN_POSITION = -1e4;
var EDITOR_DROPDOWN_OPEN_EVENT = "vds-editor-dropdown-open";
var EditorDropdownContext = react.createContext(
  null
);
function useEditorDropdown() {
  const context = react.useContext(EditorDropdownContext);
  if (!context) {
    throw new Error("useEditorDropdown must be used within EditorDropdown.");
  }
  return context;
}
function EditorDropdownItem({
  children,
  className,
  closeOnSelect = true,
  onSelect,
  title
}) {
  const itemRef = react.useRef(null);
  const context = react.useContext(EditorDropdownContext);
  if (!context) {
    throw new Error("EditorDropdownItem must be used within EditorDropdown.");
  }
  const { close, registerItem } = context;
  react.useEffect(() => {
    registerItem(itemRef);
  }, [registerItem]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    "button",
    {
      ref: itemRef,
      type: "button",
      className,
      title,
      onMouseDown: (event) => event.preventDefault(),
      onClick: () => {
        onSelect?.();
        if (closeOnSelect) {
          close();
        }
      },
      children
    }
  );
}
function EditorDropdownSeparator({
  className
}) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className, role: "separator" });
}
function EditorDropdown({
  autoFocusItems = true,
  children,
  className,
  closeOnTriggerMove = true,
  disabled,
  onOpenChange,
  stopCloseOnClickSelf = false,
  trigger
}) {
  const panelId = react.useId();
  const buttonRef = react.useRef(null);
  const panelRef = react.useRef(null);
  const itemsRef = react.useRef([]);
  const [open, setOpen] = react.useState(false);
  const [position, setPosition] = react.useState(
    null
  );
  const [highlightedIndex, setHighlightedIndex] = react.useState(0);
  const setDropdownOpen = react.useCallback(
    (nextOpen) => {
      if (nextOpen && disabled) {
        return;
      }
      if (nextOpen) {
        document.dispatchEvent(
          new CustomEvent(EDITOR_DROPDOWN_OPEN_EVENT, { detail: panelId })
        );
      }
      setOpen(nextOpen);
    },
    [disabled, panelId]
  );
  const isTriggerVisible = react.useCallback(() => {
    const button = buttonRef.current;
    if (!button || !button.isConnected) {
      return false;
    }
    const rect = button.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0 && rect.bottom >= 0 && rect.right >= 0 && rect.top <= window.innerHeight && rect.left <= window.innerWidth;
  }, []);
  const updatePosition = react.useCallback(() => {
    const button = buttonRef.current;
    const panel = panelRef.current;
    if (!button || !panel) {
      return;
    }
    if (!isTriggerVisible()) {
      setDropdownOpen(false);
      return;
    }
    const { top, left, bottom } = button.getBoundingClientRect();
    const panelRect = panel.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const showAbove = bottom + panelRect.height + DROPDOWN_OFFSET > viewportHeight && top > panelRect.height + DROPDOWN_OFFSET;
    const nextTop = showAbove ? top - panelRect.height - DROPDOWN_OFFSET : bottom + DROPDOWN_OFFSET;
    const nextLeft = Math.min(
      left,
      viewportWidth - panelRect.width - VIEWPORT_GUTTER
    );
    setPosition({
      left: Math.max(VIEWPORT_GUTTER, nextLeft),
      top: Math.max(DROPDOWN_OFFSET, nextTop)
    });
  }, [isTriggerVisible, setDropdownOpen]);
  const close = react.useCallback(() => {
    setOpen(false);
  }, []);
  const closeWithOptions = react.useCallback((options) => {
    setOpen(false);
    if (options?.restoreFocus) {
      buttonRef.current?.focus({ preventScroll: true });
    }
  }, []);
  const contextValue = react.useMemo(
    () => ({
      close: closeWithOptions,
      registerItem(itemRef) {
        if (!itemsRef.current.includes(itemRef)) {
          itemsRef.current = [...itemsRef.current, itemRef];
        }
      }
    }),
    [closeWithOptions]
  );
  react.useEffect(() => {
    onOpenChange?.(open);
  }, [onOpenChange, open]);
  react.useEffect(() => {
    const handleDropdownOpen = (event) => {
      const { detail } = event;
      if (detail !== panelId) {
        setOpen(false);
      }
    };
    document.addEventListener(
      EDITOR_DROPDOWN_OPEN_EVENT,
      handleDropdownOpen
    );
    return () => {
      document.removeEventListener(
        EDITOR_DROPDOWN_OPEN_EVENT,
        handleDropdownOpen
      );
    };
  }, [panelId]);
  react.useEffect(() => {
    if (!open) {
      itemsRef.current = [];
      setPosition(null);
      setHighlightedIndex(0);
      return;
    }
    const handlePointerDown = (event) => {
      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }
      if (buttonRef.current?.contains(target)) {
        return;
      }
      if (stopCloseOnClickSelf && panelRef.current?.contains(target)) {
        return;
      }
      if (!panelRef.current?.contains(target)) {
        close();
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [close, open, stopCloseOnClickSelf]);
  react.useEffect(() => {
    if (!open || !closeOnTriggerMove) {
      return;
    }
    const handleWindowResize = () => close();
    const handleDocumentScroll = (event) => {
      const target = event.target;
      if (target instanceof Node && panelRef.current?.contains(target)) {
        return;
      }
      close();
    };
    window.addEventListener("resize", handleWindowResize);
    document.addEventListener("scroll", handleDocumentScroll, true);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
      document.removeEventListener("scroll", handleDocumentScroll, true);
    };
  }, [close, open]);
  react.useEffect(() => {
    if (!open || !closeOnTriggerMove) {
      return;
    }
    const initialRect = buttonRef.current?.getBoundingClientRect();
    if (!initialRect) {
      return;
    }
    let animationFrame = 0;
    const watchTriggerPosition = () => {
      const button = buttonRef.current;
      if (!button || !isTriggerVisible()) {
        close();
        return;
      }
      const rect = button.getBoundingClientRect();
      const moved = Math.abs(rect.left - initialRect.left) > 1 || Math.abs(rect.top - initialRect.top) > 1 || Math.abs(rect.width - initialRect.width) > 1 || Math.abs(rect.height - initialRect.height) > 1;
      if (moved) {
        close();
        return;
      }
      animationFrame = window.requestAnimationFrame(watchTriggerPosition);
    };
    animationFrame = window.requestAnimationFrame(watchTriggerPosition);
    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, [close, closeOnTriggerMove, isTriggerVisible, open]);
  react.useLayoutEffect(() => {
    if (!open) {
      return;
    }
    updatePosition();
  }, [children, open, updatePosition]);
  react.useEffect(() => {
    if (!open || !autoFocusItems) {
      return;
    }
    const currentItem = itemsRef.current[highlightedIndex]?.current;
    currentItem?.focus();
  }, [autoFocusItems, highlightedIndex, open]);
  function handleKeyDown(event) {
    if (itemsRef.current.length === 0) {
      if (event.key === "Escape" || event.key === "Tab") {
        event.preventDefault();
        closeWithOptions({ restoreFocus: true });
      }
      return;
    }
    if (["Escape", "ArrowUp", "ArrowDown", "Home", "End", "Tab"].includes(event.key)) {
      event.preventDefault();
    }
    if (event.key === "Escape" || event.key === "Tab") {
      closeWithOptions({ restoreFocus: true });
      return;
    }
    if (event.key === "Home") {
      setHighlightedIndex(0);
      return;
    }
    if (event.key === "End") {
      setHighlightedIndex(itemsRef.current.length - 1);
      return;
    }
    if (event.key === "ArrowUp") {
      setHighlightedIndex(
        (current) => current === 0 ? itemsRef.current.length - 1 : current - 1
      );
      return;
    }
    if (event.key === "ArrowDown") {
      setHighlightedIndex(
        (current) => current === itemsRef.current.length - 1 ? 0 : current + 1
      );
    }
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    trigger({
      buttonRef,
      controlsId: panelId,
      open,
      setOpen: setDropdownOpen,
      toggle: () => setDropdownOpen(!open)
    }),
    open ? reactDom.createPortal(
      /* @__PURE__ */ jsxRuntime.jsx(EditorDropdownContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsxRuntime.jsx(
        "div",
        {
          id: panelId,
          ref: panelRef,
          className,
          style: {
            position: "fixed",
            left: position?.left ?? OFFSCREEN_POSITION,
            top: position?.top ?? OFFSCREEN_POSITION
          },
          onKeyDown: handleKeyDown,
          children
        }
      ) }),
      document.body
    ) : null
  ] });
}
var TRUSTED_EMBED_HOSTS = /* @__PURE__ */ new Set([
  "aparat.com",
  "canva.com",
  "codepen.io",
  "codesandbox.io",
  "dailymotion.com",
  "dribbble.com",
  "figma.com",
  "instagram.com",
  "loom.com",
  "miro.com",
  "open.spotify.com",
  "player.vimeo.com",
  "soundcloud.com",
  "tiktok.com",
  "twitter.com",
  "vimeo.com",
  "x.com",
  "youtube.com",
  "youtu.be"
]);
function getDefaultMode(kind) {
  if (kind === "embed") return "embed";
  return "upload";
}
function getDialogCopy(kind) {
  if (kind === "video") {
    return {
      description: "Upload a local video or embed from YouTube, Vimeo, Aparat, Loom, and other trusted platforms.",
      title: "Insert video"
    };
  }
  if (kind === "embed") {
    return {
      description: "Paste a direct URL or iframe embed code for docs, maps, prototypes, posts, audio, and other embeds.",
      title: "Insert embed"
    };
  }
  return {
    description: "Upload an image or paste a direct image URL.",
    title: "Insert image"
  };
}
function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      if (typeof reader.result === "string") resolve(reader.result);
      else reject(new Error("File could not be read."));
    });
    reader.addEventListener("error", () => reject(reader.error));
    reader.readAsDataURL(file);
  });
}
function getYouTubeId(url) {
  if (url.hostname.includes("youtu.be")) {
    return url.pathname.split("/").filter(Boolean)[0] ?? "";
  }
  if (url.pathname.startsWith("/shorts/")) {
    return url.pathname.split("/").filter(Boolean)[1] ?? "";
  }
  if (url.pathname.startsWith("/embed/")) {
    return url.pathname.split("/").filter(Boolean)[1] ?? "";
  }
  return url.searchParams.get("v") ?? "";
}
function getFirstUrl(value) {
  const iframeSrc = value.match(/<iframe[^>]+src=["']([^"']+)["']/i)?.[1];
  if (iframeSrc) return iframeSrc;
  return value.match(/https?:\/\/[^\s"'<>]+/i)?.[0] ?? "";
}
function normalizeEmbedUrl(value) {
  const candidate = getFirstUrl(value.trim());
  if (!candidate) return "";
  let url;
  try {
    url = new URL(candidate);
  } catch {
    return candidate;
  }
  const hostname = url.hostname.replace(/^www\./, "").toLowerCase();
  if (hostname === "youtu.be" || hostname.endsWith("youtube.com")) {
    const id = getYouTubeId(url);
    return id ? `https://www.youtube.com/embed/${id}` : candidate;
  }
  if (hostname === "vimeo.com") {
    const id = url.pathname.split("/").filter(Boolean)[0];
    return id ? `https://player.vimeo.com/video/${id}` : candidate;
  }
  if (hostname === "dailymotion.com") {
    const id = url.pathname.split("/").filter(Boolean).at(-1);
    return id ? `https://www.dailymotion.com/embed/video/${id}` : candidate;
  }
  if (hostname === "aparat.com") {
    const id = url.pathname.split("/").filter(Boolean).at(-1);
    return id ? `https://www.aparat.com/video/video/embed/videohash/${id}/vt/frame` : candidate;
  }
  if (hostname === "open.spotify.com") {
    const path = url.pathname.replace(/^\/embed\//, "/");
    return `https://open.spotify.com/embed${path}`;
  }
  if (hostname === "soundcloud.com") {
    return `https://w.soundcloud.com/player/?url=${encodeURIComponent(candidate)}`;
  }
  if (hostname === "figma.com") {
    return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(candidate)}`;
  }
  if (hostname === "tiktok.com" || hostname.endsWith(".tiktok.com")) {
    const id = url.pathname.match(/\/video\/(\d+)/)?.[1];
    return id ? `https://www.tiktok.com/embed/v2/${id}` : candidate;
  }
  return candidate;
}
function isTrustedEmbedSource(value) {
  try {
    const hostname = new URL(value).hostname.replace(/^www\./, "").toLowerCase();
    return TRUSTED_EMBED_HOSTS.has(hostname) || Array.from(TRUSTED_EMBED_HOSTS).some((host) => hostname.endsWith(`.${host}`));
  } catch {
    return false;
  }
}
function EditorMediaDialog({
  editor,
  kind,
  onOpenChange,
  open,
  targetBlockElement
}) {
  const [mode, setMode] = react.useState(() => getDefaultMode(kind));
  const [files, setFiles] = react.useState([]);
  const [url, setUrl] = react.useState("");
  const [embedCode, setEmbedCode] = react.useState("");
  const [title, setTitle] = react.useState("");
  const [error, setError] = react.useState("");
  const [submitting, setSubmitting] = react.useState(false);
  const copy = react.useMemo(() => getDialogCopy(kind), [kind]);
  const accept = react.useMemo(
    () => {
      if (kind === "video") {
        return { "video/*": [] };
      }
      return { "image/*": [] };
    },
    [kind]
  );
  const normalizedEmbed = react.useMemo(
    () => normalizeEmbedUrl(mode === "code" ? embedCode : url),
    [embedCode, mode, url]
  );
  const showUpload = kind === "image" || kind === "video";
  const showCode = kind === "embed";
  react.useEffect(() => {
    if (!open) return;
    setMode(getDefaultMode(kind));
    setFiles([]);
    setUrl("");
    setEmbedCode("");
    setTitle("");
    setError("");
    setSubmitting(false);
  }, [kind, open]);
  async function handleInsert() {
    if (!kind) return;
    setError("");
    setSubmitting(true);
    try {
      let src = "";
      if (mode === "upload") {
        const [file] = files;
        if (!file) {
          setError("Select a file first.");
          return;
        }
        src = await readFileAsDataUrl(file);
      } else if (mode === "url") {
        src = url.trim();
      } else {
        src = normalizedEmbed;
      }
      if (!src) {
        setError("Add a valid source.");
        return;
      }
      insertMediaBlock(
        editor,
        kind,
        {
          alt: title.trim(),
          src
        },
        targetBlockElement
      );
      onOpenChange(false);
    } catch (insertError) {
      setError(
        insertError instanceof Error ? insertError.message : "Could not insert this media."
      );
    } finally {
      setSubmitting(false);
    }
  }
  return /* @__PURE__ */ jsxRuntime.jsx(reactDialog.Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntime.jsxs(
    reactDialog.DialogContent,
    {
      size: "lg",
      animation: "scale",
      backdrop: "blur",
      responsive: true,
      showCloseButton: true,
      className: "vds-editor-media-dialog",
      children: [
        /* @__PURE__ */ jsxRuntime.jsxs(reactDialog.DialogHeader, { variant: "bordered", children: [
          /* @__PURE__ */ jsxRuntime.jsx(reactDialog.DialogTitle, { children: copy.title }),
          /* @__PURE__ */ jsxRuntime.jsx(reactDialog.DialogDescription, { children: copy.description })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(reactDialog.DialogBody, { className: "vds-editor-media-dialog-body", children: [
          /* @__PURE__ */ jsxRuntime.jsxs(
            reactTabs.Tabs,
            {
              value: mode,
              onValueChange: (nextMode) => {
                setMode(nextMode);
                setError("");
              },
              children: [
                /* @__PURE__ */ jsxRuntime.jsxs(
                  reactTabs.TabsList,
                  {
                    variant: "segmented",
                    size: "sm",
                    fullWidth: true,
                    className: "vds-editor-media-mode-list",
                    children: [
                      showUpload ? /* @__PURE__ */ jsxRuntime.jsxs(reactTabs.TabsTrigger, { value: "upload", children: [
                        /* @__PURE__ */ jsxRuntime.jsx(reactIcons.Icon, { icon: reactIcons.IconUpload, size: "xs" }),
                        "Upload"
                      ] }) : null,
                      kind === "image" ? /* @__PURE__ */ jsxRuntime.jsxs(reactTabs.TabsTrigger, { value: "url", children: [
                        /* @__PURE__ */ jsxRuntime.jsx(reactIcons.Icon, { icon: reactIcons.IconLink, size: "xs" }),
                        "URL"
                      ] }) : null,
                      kind === "video" ? /* @__PURE__ */ jsxRuntime.jsxs(reactTabs.TabsTrigger, { value: "embed", children: [
                        /* @__PURE__ */ jsxRuntime.jsx(reactIcons.Icon, { icon: reactIcons.IconVideo, size: "xs" }),
                        "Embed"
                      ] }) : null,
                      kind === "embed" ? /* @__PURE__ */ jsxRuntime.jsxs(reactTabs.TabsTrigger, { value: "embed", children: [
                        /* @__PURE__ */ jsxRuntime.jsx(reactIcons.Icon, { icon: reactIcons.IconWorld, size: "xs" }),
                        "URL"
                      ] }) : null,
                      showCode ? /* @__PURE__ */ jsxRuntime.jsxs(reactTabs.TabsTrigger, { value: "code", children: [
                        /* @__PURE__ */ jsxRuntime.jsx(reactIcons.Icon, { icon: reactIcons.IconCode, size: "xs" }),
                        "Code"
                      ] }) : null
                    ]
                  }
                ),
                showUpload ? /* @__PURE__ */ jsxRuntime.jsx(reactTabs.TabsContent, { value: "upload", className: "vds-editor-media-pane", children: /* @__PURE__ */ jsxRuntime.jsxs(
                  reactFileUpload.FileUpload.Root,
                  {
                    accept,
                    files,
                    maxFiles: 1,
                    multiple: false,
                    onFilesChange: setFiles,
                    children: [
                      /* @__PURE__ */ jsxRuntime.jsxs(reactFileUpload.FileUpload.Dropzone, { className: "vds-editor-media-upload", children: [
                        /* @__PURE__ */ jsxRuntime.jsx(
                          reactIcons.Icon,
                          {
                            icon: kind === "video" ? reactIcons.IconVideo : reactIcons.IconPhoto,
                            size: "lg"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-editor-media-upload-copy", children: [
                          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-editor-media-upload-title", children: "Drop file here" }),
                          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-editor-media-upload-description", children: kind === "video" ? "MP4, WebM, OGV, or any browser-supported video file." : "PNG, JPG, GIF, WebP, or SVG image file." })
                        ] }),
                        /* @__PURE__ */ jsxRuntime.jsx(reactFileUpload.FileUpload.Trigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(reactButton.Button, { type: "button", variant: "soft", size: "sm", children: "Browse" }) })
                      ] }),
                      files.length > 0 ? /* @__PURE__ */ jsxRuntime.jsx(reactFileUpload.FileUpload.List, { className: "vds-editor-media-file-list", children: files.map((file) => /* @__PURE__ */ jsxRuntime.jsxs(reactFileUpload.FileUpload.Item, { file, children: [
                        /* @__PURE__ */ jsxRuntime.jsx(
                          reactFileUpload.FileUpload.Preview,
                          {
                            file,
                            className: "vds-editor-media-file-preview",
                            render: () => /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-editor-media-file-fallback", children: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.Icon, { icon: reactIcons.IconVideo, size: "sm" }) })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "vds-editor-media-file-main", children: [
                          /* @__PURE__ */ jsxRuntime.jsx(reactFileUpload.FileUpload.Item.Name, {}),
                          /* @__PURE__ */ jsxRuntime.jsx(reactFileUpload.FileUpload.Item.Size, {})
                        ] }),
                        /* @__PURE__ */ jsxRuntime.jsx(reactFileUpload.FileUpload.Item.Remove, {})
                      ] }, file.name)) }) : null
                    ]
                  }
                ) }) : null,
                /* @__PURE__ */ jsxRuntime.jsx(reactTabs.TabsContent, { value: "url", className: "vds-editor-media-pane", children: /* @__PURE__ */ jsxRuntime.jsx(
                  reactInput.Input,
                  {
                    inputSize: "sm",
                    value: url,
                    onChange: (event) => setUrl(event.currentTarget.value),
                    placeholder: "https://example.com/image.png"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntime.jsxs(reactTabs.TabsContent, { value: "embed", className: "vds-editor-media-pane", children: [
                  /* @__PURE__ */ jsxRuntime.jsx(
                    reactInput.Input,
                    {
                      inputSize: "sm",
                      value: url,
                      onChange: (event) => setUrl(event.currentTarget.value),
                      placeholder: "Paste a video, post, prototype, audio, map, or iframe URL"
                    }
                  ),
                  normalizedEmbed ? /* @__PURE__ */ jsxRuntime.jsx(
                    "div",
                    {
                      className: "vds-editor-media-source-hint",
                      "data-trusted": isTrustedEmbedSource(normalizedEmbed) ? "" : void 0,
                      children: isTrustedEmbedSource(normalizedEmbed) ? "Trusted embed source" : "Direct embed URL"
                    }
                  ) : null
                ] }),
                /* @__PURE__ */ jsxRuntime.jsxs(reactTabs.TabsContent, { value: "code", className: "vds-editor-media-pane", children: [
                  /* @__PURE__ */ jsxRuntime.jsx(
                    reactCode.CodeEditor,
                    {
                      className: "vds-editor-media-code",
                      value: embedCode,
                      onValueChange: setEmbedCode,
                      language: "html",
                      filename: "embed.html",
                      copyable: false,
                      showLineNumbers: false,
                      wrap: true,
                      minLines: 4,
                      maxLines: 8,
                      variant: "embedded",
                      size: "sm",
                      placeholder: '<iframe src="https://..."></iframe>'
                    }
                  ),
                  normalizedEmbed ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-editor-media-source-hint", children: [
                    "Using ",
                    normalizedEmbed
                  ] }) : null
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsxs("label", { className: "vds-editor-media-field", children: [
            /* @__PURE__ */ jsxRuntime.jsx("span", { children: "Title / alt text" }),
            /* @__PURE__ */ jsxRuntime.jsx(
              reactInput.Input,
              {
                inputSize: "sm",
                value: title,
                onChange: (event) => setTitle(event.currentTarget.value),
                placeholder: kind === "image" ? "Image alt text" : kind === "video" ? "Video title" : "Embed title"
              }
            )
          ] }),
          error ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-editor-media-error", children: error }) : null
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(reactDialog.DialogFooter, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            reactButton.Button,
            {
              type: "button",
              variant: "ghost",
              color: "contrast",
              size: "sm",
              onClick: () => onOpenChange(false),
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(
            reactButton.Button,
            {
              type: "button",
              color: "primary",
              size: "sm",
              loading: submitting,
              onClick: () => void handleInsert(),
              children: "Insert"
            }
          )
        ] })
      ]
    }
  ) });
}
var DEFAULT_LABEL = "Insert";
var MIN_TABLE_DIMENSION = 2;
var MAX_TABLE_DIMENSION = 8;
function isMediaInsertKind(kind) {
  return kind === "image" || kind === "video" || kind === "embed";
}
function createDefaultItems(features, compact) {
  const items = [];
  const includeTextBlocks = compact;
  if (features.horizontalRule) {
    items.push({
      key: "divider",
      title: "Horizontal Rule",
      description: "Insert a divider between blocks.",
      icon: reactIcons.IconSeparatorHorizontal,
      kind: "divider",
      run: (editor, targetBlockElement) => insertBlock(editor, "divider", targetBlockElement)
    });
  }
  if (includeTextBlocks) {
    items.push(
      {
        key: "paragraph",
        title: "Paragraph",
        description: "Insert a plain text block.",
        icon: reactIcons.IconTypography,
        kind: "paragraph",
        run: (editor, targetBlockElement) => insertBlock(editor, "paragraph", targetBlockElement)
      },
      {
        key: "h1",
        title: "Heading 1",
        description: "Insert a large page heading.",
        icon: reactIcons.IconH1,
        kind: "h1",
        run: (editor, targetBlockElement) => insertBlock(editor, "h1", targetBlockElement)
      },
      {
        key: "h2",
        title: "Heading 2",
        description: "Insert a section heading.",
        icon: reactIcons.IconH2,
        kind: "h2",
        run: (editor, targetBlockElement) => insertBlock(editor, "h2", targetBlockElement)
      },
      {
        key: "h3",
        title: "Heading 3",
        description: "Insert a subsection heading.",
        icon: reactIcons.IconH3,
        kind: "h3",
        run: (editor, targetBlockElement) => insertBlock(editor, "h3", targetBlockElement)
      },
      {
        key: "quote",
        title: "Quote",
        description: "Insert a quoted block.",
        icon: reactIcons.IconQuote,
        kind: "quote",
        run: (editor, targetBlockElement) => insertBlock(editor, "quote", targetBlockElement)
      }
    );
    if (features.codeBlocks) {
      items.push({
        key: "code",
        title: "Code block",
        description: "Insert a fenced code block.",
        icon: reactIcons.IconCode,
        kind: "code",
        run: (editor, targetBlockElement) => insertBlock(editor, "code", targetBlockElement)
      });
    }
    if (features.lists) {
      items.push(
        {
          key: "bullet",
          title: "Bulleted list",
          description: "Insert an unordered list.",
          icon: reactIcons.IconList,
          kind: "bullet",
          run: (editor, targetBlockElement) => insertBlock(editor, "bullet", targetBlockElement)
        },
        {
          key: "number",
          title: "Numbered list",
          description: "Insert an ordered list.",
          icon: reactIcons.IconListNumbers,
          kind: "number",
          run: (editor, targetBlockElement) => insertBlock(editor, "number", targetBlockElement)
        }
      );
    }
    if (features.checklists) {
      items.push({
        key: "check",
        title: "Checklist",
        description: "Insert a task list.",
        icon: reactIcons.IconListCheck,
        kind: "check",
        run: (editor, targetBlockElement) => insertBlock(editor, "check", targetBlockElement)
      });
    }
  }
  if (features.media) {
    items.push(
      {
        key: "image",
        title: "Image",
        description: "Insert an image block.",
        icon: reactIcons.IconPhoto,
        kind: "image",
        run: (editor, targetBlockElement) => insertBlock(editor, "image", targetBlockElement)
      },
      {
        key: "video",
        title: "Video",
        description: "Insert a video block.",
        icon: reactIcons.IconVideo,
        kind: "video",
        run: (editor, targetBlockElement) => insertBlock(editor, "video", targetBlockElement)
      },
      {
        key: "embed",
        title: "Embed",
        description: "Insert an iframe, post, prototype, audio, map, or custom embed.",
        icon: reactIcons.IconWorld,
        kind: "embed",
        run: (editor, targetBlockElement) => insertBlock(editor, "embed", targetBlockElement)
      }
    );
  }
  if (features.tables) {
    items.push({
      key: "table",
      title: "Table",
      description: "Insert a 3 x 3 table with headers.",
      icon: reactIcons.IconTable,
      kind: "table",
      run: (editor, targetBlockElement) => insertTable(editor, 3, 3, targetBlockElement)
    });
  }
  return items;
}
function clampTableDimension(value) {
  return Math.min(MAX_TABLE_DIMENSION, Math.max(MIN_TABLE_DIMENSION, value));
}
function TableDimensionStepper({
  label,
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-editor-table-builder-stepper", children: [
    /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-editor-table-builder-stepper-label", children: label }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-editor-table-builder-stepper-controls", children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        reactButton.Button,
        {
          type: "button",
          variant: "ghost",
          color: "contrast",
          size: "xs",
          className: "vds-editor-table-builder-stepper-button",
          disabled: value <= MIN_TABLE_DIMENSION,
          onMouseDown: (event) => event.preventDefault(),
          onClick: () => onChange(clampTableDimension(value - 1)),
          children: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.Icon, { icon: reactIcons.IconMinus, size: "sm" })
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-editor-table-builder-stepper-value", children: value }),
      /* @__PURE__ */ jsxRuntime.jsx(
        reactButton.Button,
        {
          type: "button",
          variant: "ghost",
          color: "contrast",
          size: "xs",
          className: "vds-editor-table-builder-stepper-button",
          disabled: value >= MAX_TABLE_DIMENSION,
          onMouseDown: (event) => event.preventDefault(),
          onClick: () => onChange(clampTableDimension(value + 1)),
          children: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.Icon, { icon: reactIcons.IconPlus, size: "sm" })
        }
      )
    ] })
  ] });
}
function TableBuilderPanel({
  onBack,
  onInsert
}) {
  const { close } = useEditorDropdown();
  const [rows, setRows] = react.useState(3);
  const [columns, setColumns] = react.useState(3);
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-editor-table-builder", children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-editor-table-builder-header", children: [
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-editor-table-builder-title", children: "Build Table" }),
      /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "vds-editor-table-builder-summary", children: [
        rows,
        " x ",
        columns,
        " with header row"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-editor-table-builder-body", children: [
      /* @__PURE__ */ jsxRuntime.jsx(TableDimensionStepper, { label: "Rows", value: rows, onChange: setRows }),
      /* @__PURE__ */ jsxRuntime.jsx(
        TableDimensionStepper,
        {
          label: "Columns",
          value: columns,
          onChange: setColumns
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-editor-table-builder-actions", children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        reactButton.Button,
        {
          type: "button",
          variant: "ghost",
          color: "contrast",
          size: "xs",
          onMouseDown: (event) => event.preventDefault(),
          onClick: onBack,
          children: "Back"
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(
        reactButton.Button,
        {
          type: "button",
          variant: "ghost",
          color: "contrast",
          size: "xs",
          onMouseDown: (event) => event.preventDefault(),
          onClick: () => close(),
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(
        reactButton.Button,
        {
          type: "button",
          variant: "soft",
          color: "primary",
          size: "xs",
          onMouseDown: (event) => event.preventDefault(),
          onClick: () => {
            onInsert(rows, columns);
            close();
          },
          children: "Insert"
        }
      )
    ] })
  ] });
}
function EditorInsertMenu({
  className,
  items,
  label = DEFAULT_LABEL,
  compact = false,
  onOpenChange,
  targetBlockElement
}) {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  const { features, readOnly } = useEditorConfig();
  const [mediaDialog, setMediaDialog] = react.useState(null);
  const [tableBuilderOpen, setTableBuilderOpen] = react.useState(false);
  const resolvedItems = react.useMemo(
    () => items ?? createDefaultItems(features, compact),
    [compact, features, items]
  );
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: utils.cn("vds-editor-insert", className), children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      EditorDropdown,
      {
        autoFocusItems: !compact,
        className: utils.cn(
          "vds-editor-dropdown vds-editor-menu vds-editor-insert-menu",
          compact ? "vds-editor-insert-menu-compact" : null,
          tableBuilderOpen ? "vds-editor-insert-menu-table-builder" : null
        ),
        closeOnTriggerMove: false,
        disabled: readOnly,
        onOpenChange: (open) => {
          if (!open) {
            setTableBuilderOpen(false);
          }
          onOpenChange?.(open);
        },
        stopCloseOnClickSelf: tableBuilderOpen,
        trigger: ({ buttonRef, controlsId, open, toggle }) => /* @__PURE__ */ jsxRuntime.jsx(
          reactButton.Button,
          {
            ref: buttonRef,
            type: "button",
            variant: open ? "soft" : "ghost",
            color: "contrast",
            size: "sm",
            className: utils.cn(
              "vds-editor-toolbar-trigger vds-editor-insert-trigger",
              compact ? "vds-editor-insert-trigger-compact" : null
            ),
            "aria-label": label,
            "aria-controls": controlsId,
            "aria-expanded": open,
            disabled: readOnly,
            leftSection: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.Icon, { icon: reactIcons.IconPlus, size: "sm" }),
            rightSection: compact ? void 0 : /* @__PURE__ */ jsxRuntime.jsx(reactIcons.Icon, { icon: reactIcons.IconChevronDown, size: "xs" }),
            onMouseDown: (event) => {
              event.preventDefault();
              event.stopPropagation();
            },
            onClick: (event) => {
              event.preventDefault();
              event.stopPropagation();
              if (!open) {
                setTableBuilderOpen(false);
              }
              toggle();
            },
            children: compact ? null : label
          }
        ),
        children: tableBuilderOpen ? /* @__PURE__ */ jsxRuntime.jsx(
          TableBuilderPanel,
          {
            onBack: () => setTableBuilderOpen(false),
            onInsert: (rows, columns) => insertTable(editor, rows, columns, targetBlockElement)
          }
        ) : resolvedItems.map((item) => {
          const opensTableBuilder = item.kind === "table" && !compact;
          return /* @__PURE__ */ jsxRuntime.jsxs(
            EditorDropdownItem,
            {
              className: "vds-editor-menu-item vds-editor-menu-item-rich",
              closeOnSelect: !opensTableBuilder,
              onSelect: () => {
                if (opensTableBuilder) {
                  setTableBuilderOpen(true);
                  return;
                }
                if (isMediaInsertKind(item.kind)) {
                  setMediaDialog({
                    kind: item.kind,
                    targetBlockElement
                  });
                  return;
                }
                item.run(editor, targetBlockElement);
              },
              children: [
                item.icon ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-editor-menu-item-icon", children: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.Icon, { icon: item.icon, size: "sm" }) }) : null,
                /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "vds-editor-menu-item-copy", children: [
                  /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-editor-menu-item-label", children: item.title }),
                  item.description ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-editor-menu-item-description", children: item.description }) : null
                ] }),
                item.shortcut ? /* @__PURE__ */ jsxRuntime.jsx(reactKbd.Kbd, { className: "vds-editor-menu-item-shortcut", children: item.shortcut }) : null
              ]
            },
            item.key
          );
        })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      EditorMediaDialog,
      {
        editor,
        kind: mediaDialog?.kind ?? null,
        open: mediaDialog !== null,
        targetBlockElement: mediaDialog?.targetBlockElement ?? null,
        onOpenChange: (nextOpen) => {
          if (!nextOpen) {
            setMediaDialog(null);
          }
        }
      }
    )
  ] });
}
var DRAGGABLE_BLOCK_MENU_CLASSNAME = "vds-editor-block-tools";
var DRAG_HIT_TEST_GUTTER = 112;
var DRAG_HIT_TEST_VERTICAL_BUFFER = 48;
var DRAG_SETTLE_DURATION = 210;
function isOnMenu(element) {
  return Boolean(element.closest(`.${DRAGGABLE_BLOCK_MENU_CLASSNAME}`));
}
function isDragFromBlockMenu(target, menuElement) {
  return menuElement.contains(target) || target.contains(menuElement);
}
function getEditorContent(anchorElement) {
  return anchorElement.querySelector(".vds-editor-content");
}
function captureBlockRects(anchorElement) {
  const content = getEditorContent(anchorElement);
  const rects = /* @__PURE__ */ new Map();
  if (!content) {
    return rects;
  }
  for (const child of Array.from(content.children)) {
    if (child instanceof HTMLElement) {
      rects.set(child, child.getBoundingClientRect());
    }
  }
  return rects;
}
function animateBlocksFromPreviousRects(anchorElement, previousRects) {
  const content = getEditorContent(anchorElement);
  if (!content || previousRects.size === 0) {
    return;
  }
  const movedBlocks = [];
  for (const child of Array.from(content.children)) {
    if (!(child instanceof HTMLElement)) {
      continue;
    }
    const previousRect = previousRects.get(child);
    if (!previousRect) {
      continue;
    }
    const nextRect = child.getBoundingClientRect();
    const deltaX = previousRect.left - nextRect.left;
    const deltaY = previousRect.top - nextRect.top;
    if (Math.abs(deltaX) < 0.5 && Math.abs(deltaY) < 0.5) {
      continue;
    }
    child.dataset.vdsDragSettling = "true";
    child.style.transition = "none";
    child.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
    movedBlocks.push(child);
  }
  if (movedBlocks.length === 0) {
    return;
  }
  window.requestAnimationFrame(() => {
    for (const block of movedBlocks) {
      block.style.transition = "";
      block.style.transform = "";
    }
    window.setTimeout(() => {
      for (const block of movedBlocks) {
        delete block.dataset.vdsDragSettling;
        block.style.transition = "";
        block.style.transform = "";
      }
    }, DRAG_SETTLE_DURATION);
  });
}
function getNearestTopLevelBlock(content, x, y) {
  const contentRect = content.getBoundingClientRect();
  if (x < contentRect.left - DRAG_HIT_TEST_GUTTER || x > contentRect.right + DRAG_HIT_TEST_GUTTER || y < contentRect.top - DRAG_HIT_TEST_VERTICAL_BUFFER || y > contentRect.bottom + DRAG_HIT_TEST_VERTICAL_BUFFER) {
    return null;
  }
  let nearestBlock = null;
  let nearestDistance = Number.POSITIVE_INFINITY;
  for (const child of Array.from(content.children)) {
    if (!(child instanceof HTMLElement)) {
      continue;
    }
    const rect = child.getBoundingClientRect();
    const distance = Math.abs(y - (rect.top + rect.height / 2));
    if (distance < nearestDistance) {
      nearestBlock = child;
      nearestDistance = distance;
    }
  }
  return nearestBlock;
}
function getTopLevelBlockFromPoint(anchorElement, x, y) {
  const content = getEditorContent(anchorElement);
  if (!content) {
    return null;
  }
  const pointElement = anchorElement.ownerDocument.elementFromPoint(x, y);
  if (!(pointElement instanceof HTMLElement)) {
    return getNearestTopLevelBlock(content, x, y);
  }
  let current = pointElement;
  while (current && current.parentElement !== content) {
    if (current === content || current === anchorElement) {
      return getNearestTopLevelBlock(content, x, y);
    }
    current = current.parentElement;
  }
  return current?.parentElement === content ? current : getNearestTopLevelBlock(content, x, y);
}
function EditorDraggableBlocks({
  anchorElement,
  className,
  placement = "inside"
}) {
  const { readOnly } = useEditorConfig();
  const menuRef = react.useRef(null);
  const targetLineRef = react.useRef(null);
  const targetBlockElementRef = react.useRef(null);
  const draggedBlockElementRef = react.useRef(null);
  const dropBlockElementRef = react.useRef(null);
  const dragPreviewElementRef = react.useRef(null);
  const insertMenuOpenRef = react.useRef(false);
  const [targetBlockElement, setTargetBlockElement] = react.useState(null);
  react.useEffect(() => {
    targetBlockElementRef.current = targetBlockElement;
  }, [targetBlockElement]);
  function handleTargetElementChanged(nextTargetBlockElement) {
    if (insertMenuOpenRef.current) {
      return;
    }
    setTargetBlockElement(nextTargetBlockElement);
  }
  react.useEffect(() => {
    if (!anchorElement || readOnly) {
      return;
    }
    const activeAnchorElement = anchorElement;
    const ownerDocument = activeAnchorElement.ownerDocument;
    function clearDropState() {
      const dragged = draggedBlockElementRef.current;
      const drop = dropBlockElementRef.current;
      const dragPreview = dragPreviewElementRef.current;
      if (dragged) {
        delete dragged.dataset.vdsDragSource;
      }
      if (drop) {
        delete drop.dataset.vdsDropPosition;
      }
      dragPreview?.remove();
      activeAnchorElement.style.removeProperty(
        "--vds-editor-drag-placeholder-size"
      );
      activeAnchorElement.style.removeProperty(
        "--vds-editor-drag-indicator-offset"
      );
      delete activeAnchorElement.dataset.vdsDragActive;
      draggedBlockElementRef.current = null;
      dropBlockElementRef.current = null;
      dragPreviewElementRef.current = null;
    }
    function setDropTarget(blockElement, clientY) {
      const previousDrop = dropBlockElementRef.current;
      if (previousDrop && previousDrop !== blockElement) {
        delete previousDrop.dataset.vdsDropPosition;
      }
      if (!blockElement || blockElement === draggedBlockElementRef.current) {
        dropBlockElementRef.current = null;
        return;
      }
      const rect = blockElement.getBoundingClientRect();
      blockElement.dataset.vdsDropPosition = clientY < rect.top + rect.height / 2 ? "before" : "after";
      dropBlockElementRef.current = blockElement;
    }
    function handleDragStart(event) {
      const target = event.target;
      if (!(target instanceof HTMLElement) || !menuRef.current || !isDragFromBlockMenu(target, menuRef.current)) {
        return;
      }
      const draggedBlockElement = targetBlockElementRef.current;
      if (!draggedBlockElement) {
        return;
      }
      activeAnchorElement.dataset.vdsDragActive = "true";
      draggedBlockElement.dataset.vdsDragSource = "true";
      draggedBlockElementRef.current = draggedBlockElement;
      if (event.dataTransfer) {
        const rect = draggedBlockElement.getBoundingClientRect();
        const preview = draggedBlockElement.cloneNode(true);
        const placeholderSize = Math.max(28, Math.min(rect.height, 240));
        preview.classList.add("vds-editor-drag-preview");
        preview.setAttribute("aria-hidden", "true");
        preview.style.inlineSize = `${Math.min(rect.width, 560)}px`;
        activeAnchorElement.style.setProperty(
          "--vds-editor-drag-placeholder-size",
          `${placeholderSize}px`
        );
        activeAnchorElement.style.setProperty(
          "--vds-editor-drag-indicator-offset",
          `${placeholderSize / 2 + 6}px`
        );
        ownerDocument.body.append(preview);
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setDragImage(
          preview,
          Math.min(24, rect.width / 2),
          Math.min(24, rect.height / 2)
        );
        dragPreviewElementRef.current = preview;
      }
    }
    function handleDragOver(event) {
      if (!draggedBlockElementRef.current) {
        return;
      }
      event.preventDefault();
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = "move";
      }
      const blockElement = getTopLevelBlockFromPoint(
        activeAnchorElement,
        event.clientX,
        event.clientY
      );
      setDropTarget(blockElement, event.clientY);
    }
    function handleDrop() {
      const previousRects = captureBlockRects(activeAnchorElement);
      window.setTimeout(() => {
        clearDropState();
        animateBlocksFromPreviousRects(activeAnchorElement, previousRects);
      });
    }
    ownerDocument.addEventListener("dragstart", handleDragStart, true);
    ownerDocument.addEventListener("dragover", handleDragOver, true);
    ownerDocument.addEventListener("drop", handleDrop, true);
    ownerDocument.addEventListener("dragend", clearDropState, true);
    return () => {
      clearDropState();
      ownerDocument.removeEventListener("dragstart", handleDragStart, true);
      ownerDocument.removeEventListener("dragover", handleDragOver, true);
      ownerDocument.removeEventListener("drop", handleDrop, true);
      ownerDocument.removeEventListener("dragend", clearDropState, true);
    };
  }, [anchorElement, readOnly]);
  if (!anchorElement || readOnly) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    LexicalDraggableBlockPlugin.DraggableBlockPlugin_EXPERIMENTAL,
    {
      anchorElem: anchorElement,
      menuRef,
      targetLineRef,
      menuComponent: /* @__PURE__ */ jsxRuntime.jsxs(
        "div",
        {
          ref: menuRef,
          className: utils.cn(DRAGGABLE_BLOCK_MENU_CLASSNAME, className),
          "data-placement": placement,
          "aria-hidden": "true",
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              EditorInsertMenu,
              {
                compact: true,
                className: "vds-editor-block-insert",
                label: "Insert block",
                onOpenChange: (open) => {
                  insertMenuOpenRef.current = open;
                },
                targetBlockElement
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-editor-drag-handle", children: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.Icon, { icon: reactIcons.IconGripVertical, size: "sm" }) })
          ]
        }
      ),
      targetLineComponent: /* @__PURE__ */ jsxRuntime.jsx(
        "div",
        {
          ref: targetLineRef,
          className: "vds-editor-drag-target-line",
          "aria-hidden": "true"
        }
      ),
      isOnMenu,
      onElementChanged: handleTargetElementChanged
    }
  );
}
var FLOATING_TOOLBAR_ICON_SIZE = "md";
function FloatingToolbarButton({
  active,
  icon,
  label,
  onClick,
  tooltipSide
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(reactTooltip.Tooltip, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(reactTooltip.TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(
      reactButton.Button,
      {
        type: "button",
        variant: active ? "soft" : "ghost",
        color: "contrast",
        size: "xs",
        className: "vds-editor-floating-button",
        "aria-label": label,
        onMouseDown: (event) => event.preventDefault(),
        onClick,
        children: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.Icon, { icon, size: FLOATING_TOOLBAR_ICON_SIZE })
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(
      reactTooltip.TooltipContent,
      {
        className: "vds-editor-floating-tooltip",
        side: tooltipSide,
        size: "sm",
        variant: "inverted",
        children: label
      }
    )
  ] });
}
function EditorFloatingToolbar({
  className,
  showLinkActions = true,
  showCommentActions = true,
  onRequestComment,
  anchorElement
}) {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  const { features, readOnly } = useEditorContext();
  const toolbarRef = react.useRef(null);
  const selectionRef = react.useRef(null);
  const [state, setState] = react.useState(EMPTY_TOOLBAR_STATE);
  const [position, setPosition] = react.useState(null);
  const [selectionRect, setSelectionRect] = react.useState(null);
  const [linkEditorOpen, setLinkEditorOpen] = react.useState(false);
  const [linkValue, setLinkValue] = react.useState("");
  const linkInputRef = react.useRef(null);
  const linkEditorOpenRef = react.useRef(false);
  react.useEffect(() => {
    linkEditorOpenRef.current = linkEditorOpen;
  }, [linkEditorOpen]);
  function updateToolbar() {
    editor.getEditorState().read(() => {
      const selection = lexical.$getSelection();
      const rootElement = editor.getRootElement();
      const nativeSelection = window.getSelection();
      const focusInsideToolbar = Boolean(
        linkEditorOpenRef.current && toolbarRef.current?.contains(document.activeElement)
      );
      if (!anchorElement || !rootElement || readOnly || !lexical.$isRangeSelection(selection) || selection.isCollapsed() || selection.getTextContent().trim().length === 0 || !nativeSelection || nativeSelection.rangeCount === 0 || !nativeSelection.anchorNode || !nativeSelection.focusNode || !rootElement.contains(nativeSelection.anchorNode) || !rootElement.contains(nativeSelection.focusNode)) {
        if (focusInsideToolbar) {
          return;
        }
        setPosition(null);
        setSelectionRect(null);
        setLinkEditorOpen(false);
        return;
      }
      const range = nativeSelection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) {
        if (focusInsideToolbar) {
          return;
        }
        setPosition(null);
        setSelectionRect(null);
        setLinkEditorOpen(false);
        return;
      }
      selectionRef.current = selection.clone();
      setState(readToolbarState());
      setSelectionRect(rect);
    });
  }
  react.useLayoutEffect(() => {
    if (!anchorElement || !selectionRect || !toolbarRef.current || readOnly) {
      return;
    }
    const scrollerElement = anchorElement.parentElement;
    const anchorRect = anchorElement.getBoundingClientRect();
    const scrollerRect = scrollerElement?.getBoundingClientRect() ?? anchorRect;
    const nextPlacement = selectionRect.top - scrollerRect.top < 72 ? "below" : "above";
    const toolbarRect = toolbarRef.current.getBoundingClientRect();
    const nextLeft = Math.min(
      Math.max(
        selectionRect.left - anchorRect.left + selectionRect.width / 2,
        toolbarRect.width / 2 + 8
      ),
      anchorRect.width - toolbarRect.width / 2 - 8
    );
    const nextTop = nextPlacement === "above" ? selectionRect.top - anchorRect.top : selectionRect.bottom - anchorRect.top;
    setPosition({
      left: nextLeft,
      top: nextTop,
      placement: nextPlacement
    });
  }, [anchorElement, linkEditorOpen, readOnly, selectionRect, state]);
  react.useEffect(() => {
    if (linkEditorOpen && linkInputRef.current) {
      linkInputRef.current.focus({ preventScroll: true });
      linkInputRef.current.select();
    }
  }, [linkEditorOpen]);
  react.useEffect(() => {
    updateToolbar();
    return utils$1.mergeRegister(
      editor.registerUpdateListener(() => {
        updateToolbar();
      }),
      editor.registerCommand(
        lexical.SELECTION_CHANGE_COMMAND,
        () => {
          updateToolbar();
          return false;
        },
        lexical.COMMAND_PRIORITY_LOW
      )
    );
  }, [anchorElement, editor, readOnly]);
  react.useEffect(() => {
    if (!anchorElement) return;
    const scrollerElement = anchorElement.parentElement;
    const rootElement = editor.getRootElement();
    function handleSelectionChange() {
      updateToolbar();
    }
    window.addEventListener("resize", handleSelectionChange);
    document.addEventListener("selectionchange", handleSelectionChange);
    scrollerElement?.addEventListener("scroll", handleSelectionChange, {
      passive: true
    });
    rootElement?.addEventListener("scroll", handleSelectionChange, {
      passive: true
    });
    return () => {
      window.removeEventListener("resize", handleSelectionChange);
      document.removeEventListener("selectionchange", handleSelectionChange);
      scrollerElement?.removeEventListener("scroll", handleSelectionChange);
      rootElement?.removeEventListener("scroll", handleSelectionChange);
    };
  }, [anchorElement, editor, readOnly]);
  function closeLinkEditor() {
    setLinkEditorOpen(false);
    setLinkValue(state.linkUrl);
  }
  function rememberEditorSelection() {
    editor.getEditorState().read(() => {
      const selection = lexical.$getSelection();
      if (!lexical.$isRangeSelection(selection) || selection.isCollapsed()) {
        return;
      }
      selectionRef.current = selection.clone();
    });
  }
  function toggleLinkEditor() {
    rememberEditorSelection();
    setLinkValue(state.linkUrl);
    setLinkEditorOpen((currentOpen) => !currentOpen);
  }
  function submitLink() {
    const nextLink = linkValue.trim();
    if (!nextLink) {
      clearLink(editor, selectionRef.current);
      closeLinkEditor();
      return;
    }
    applyLink(editor, nextLink, selectionRef.current);
    closeLinkEditor();
  }
  function handleLinkKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      submitLink();
    }
    if (event.key === "Escape") {
      event.preventDefault();
      closeLinkEditor();
    }
  }
  if (!anchorElement || !selectionRect || readOnly) {
    return null;
  }
  const tooltipSide = position?.placement === "below" ? "bottom" : "top";
  return reactDom.createPortal(
    /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        ref: toolbarRef,
        className: utils.cn("vds-editor-floating", className),
        "data-placement": position?.placement ?? "above",
        style: {
          transform: position ? `translate(${position.left}px, ${Math.max(position.top, 0)}px) translate(-50%, ${position.placement === "above" ? "calc(-100% - 12px)" : "12px"})` : "translate(-10000px, -10000px)",
          opacity: position ? 1 : 0
        },
        children: /* @__PURE__ */ jsxRuntime.jsxs(reactTooltip.TooltipProvider, { delayDuration: 180, skipDelayDuration: 80, children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-editor-floating-row", children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              FloatingToolbarButton,
              {
                active: state.isBold,
                icon: reactIcons.IconBold,
                label: "Bold",
                tooltipSide,
                onClick: () => formatText(editor, "bold", selectionRef.current)
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(
              FloatingToolbarButton,
              {
                active: state.isItalic,
                icon: reactIcons.IconItalic,
                label: "Italic",
                tooltipSide,
                onClick: () => formatText(editor, "italic", selectionRef.current)
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(
              FloatingToolbarButton,
              {
                active: state.isUnderline,
                icon: reactIcons.IconUnderline,
                label: "Underline",
                tooltipSide,
                onClick: () => formatText(editor, "underline", selectionRef.current)
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(
              FloatingToolbarButton,
              {
                active: state.isStrikethrough,
                icon: reactIcons.IconStrikethrough,
                label: "Strikethrough",
                tooltipSide,
                onClick: () => formatText(editor, "strikethrough", selectionRef.current)
              }
            ),
            features.advancedTextFormats ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                FloatingToolbarButton,
                {
                  active: state.isSubscript,
                  icon: reactIcons.IconSubscript,
                  label: "Subscript",
                  tooltipSide,
                  onClick: () => formatText(editor, "subscript", selectionRef.current)
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx(
                FloatingToolbarButton,
                {
                  active: state.isSuperscript,
                  icon: reactIcons.IconSuperscript,
                  label: "Superscript",
                  tooltipSide,
                  onClick: () => formatText(editor, "superscript", selectionRef.current)
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx(
                FloatingToolbarButton,
                {
                  active: state.isUppercase,
                  icon: reactIcons.IconLetterCaseUpper,
                  label: "Uppercase",
                  tooltipSide,
                  onClick: () => formatText(editor, "uppercase", selectionRef.current)
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx(
                FloatingToolbarButton,
                {
                  active: state.isLowercase,
                  icon: reactIcons.IconLetterCaseLower,
                  label: "Lowercase",
                  tooltipSide,
                  onClick: () => formatText(editor, "lowercase", selectionRef.current)
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx(
                FloatingToolbarButton,
                {
                  active: state.isCapitalize,
                  icon: reactIcons.IconLetterCaseToggle,
                  label: "Capitalize",
                  tooltipSide,
                  onClick: () => formatText(editor, "capitalize", selectionRef.current)
                }
              )
            ] }) : null,
            /* @__PURE__ */ jsxRuntime.jsx(
              FloatingToolbarButton,
              {
                active: state.isInlineCode,
                icon: reactIcons.IconCode,
                label: "Inline code",
                tooltipSide,
                onClick: () => formatText(editor, "code", selectionRef.current)
              }
            ),
            showLinkActions ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-editor-floating-divider", "aria-hidden": "true" }),
              /* @__PURE__ */ jsxRuntime.jsx(
                FloatingToolbarButton,
                {
                  active: state.isLink || linkEditorOpen,
                  icon: reactIcons.IconLink,
                  label: state.isLink ? "Edit link" : "Insert link",
                  tooltipSide,
                  onClick: toggleLinkEditor
                }
              ),
              state.isLink ? /* @__PURE__ */ jsxRuntime.jsx(
                FloatingToolbarButton,
                {
                  icon: reactIcons.IconLinkOff,
                  label: "Remove link",
                  tooltipSide,
                  onClick: () => clearLink(editor, selectionRef.current)
                }
              ) : null
            ] }) : null,
            showCommentActions && features.comments ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-editor-floating-divider", "aria-hidden": "true" }),
              /* @__PURE__ */ jsxRuntime.jsx(
                FloatingToolbarButton,
                {
                  icon: reactIcons.IconMessageCirclePlus,
                  label: "Add comment",
                  tooltipSide,
                  onClick: () => onRequestComment?.()
                }
              )
            ] }) : null
          ] }),
          linkEditorOpen ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-editor-floating-link-row", children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              reactInput.Input,
              {
                ref: linkInputRef,
                inputSize: "xs",
                className: "vds-editor-floating-link-input",
                value: linkValue,
                onChange: (event) => setLinkValue(event.target.value),
                onKeyDown: handleLinkKeyDown,
                placeholder: "https://example.com"
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(
              reactButton.Button,
              {
                type: "button",
                className: "vds-editor-floating-link-action",
                variant: "soft",
                color: "primary",
                size: "xs",
                onMouseDown: (event) => event.preventDefault(),
                onClick: submitLink,
                children: "Apply"
              }
            ),
            state.isLink ? /* @__PURE__ */ jsxRuntime.jsxs(reactTooltip.Tooltip, { children: [
              /* @__PURE__ */ jsxRuntime.jsx(reactTooltip.TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(
                reactButton.Button,
                {
                  type: "button",
                  className: "vds-editor-floating-link-action vds-editor-floating-link-icon-action",
                  variant: "soft",
                  color: "danger",
                  size: "xs",
                  "aria-label": "Remove link",
                  onMouseDown: (event) => event.preventDefault(),
                  onClick: () => {
                    clearLink(editor, selectionRef.current);
                    closeLinkEditor();
                  },
                  children: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.Icon, { icon: reactIcons.IconLinkOff, size: FLOATING_TOOLBAR_ICON_SIZE })
                }
              ) }),
              /* @__PURE__ */ jsxRuntime.jsx(
                reactTooltip.TooltipContent,
                {
                  className: "vds-editor-floating-tooltip",
                  side: tooltipSide,
                  size: "sm",
                  variant: "inverted",
                  children: "Remove link"
                }
              )
            ] }) : null,
            /* @__PURE__ */ jsxRuntime.jsx(
              reactButton.Button,
              {
                type: "button",
                className: "vds-editor-floating-link-action",
                variant: "ghost",
                color: "contrast",
                size: "xs",
                onMouseDown: (event) => event.preventDefault(),
                onClick: closeLinkEditor,
                children: "Cancel"
              }
            )
          ] }) : null
        ] })
      }
    ),
    anchorElement
  );
}
var DEFAULT_LABELS = {
  "rich-text": "Rich",
  markdown: "Markdown",
  html: "HTML"
};
var MODE_ICONS = {
  "rich-text": reactIcons.IconSourceCode,
  markdown: reactIcons.IconMarkdown,
  html: reactIcons.IconFileCode2
};
function EditorModeSwitcher({
  className,
  modes = ["rich-text", "markdown", "html"],
  labels,
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    reactTabs.Tabs,
    {
      className: utils.cn("vds-editor-mode-switcher", className),
      value,
      onValueChange: (nextValue) => {
        if (modes.includes(nextValue)) {
          onChange(nextValue);
        }
      },
      children: /* @__PURE__ */ jsxRuntime.jsx(
        reactTabs.TabsList,
        {
          className: "vds-editor-mode-list",
          variant: "segmented",
          size: "sm",
          "aria-label": "Editor mode",
          children: modes.map((mode) => {
            const label = labels?.[mode] ?? DEFAULT_LABELS[mode];
            return /* @__PURE__ */ jsxRuntime.jsxs(
              reactTabs.TabsTrigger,
              {
                value: mode,
                className: "vds-editor-mode-trigger",
                "aria-label": `${label} mode`,
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx(reactIcons.Icon, { icon: MODE_ICONS[mode], size: "sm" }),
                  /* @__PURE__ */ jsxRuntime.jsx("span", { children: label })
                ]
              },
              mode
            );
          })
        }
      )
    }
  );
}
var SlashCommandOption = class extends LexicalTypeaheadMenuPlugin.MenuOption {
  item;
  constructor(item) {
    super(item.key);
    this.item = item;
  }
};
function EditorSlashMenu({
  className,
  items
}) {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  const { features, readOnly } = useEditorConfig();
  const [queryString, setQueryString] = react.useState(null);
  const checkForSlashTriggerMatch = LexicalTypeaheadMenuPlugin.useBasicTypeaheadTriggerMatch("/", {
    minLength: 0
  });
  const defaultItems = react.useMemo(
    () => {
      const next = [
        {
          key: "paragraph",
          title: "Paragraph",
          description: "Reset the current block to body text.",
          keywords: ["text", "body", "normal"],
          icon: reactIcons.IconTypography,
          run: (currentEditor) => applyBlockType(currentEditor, "paragraph")
        },
        {
          key: "h1",
          title: "Heading 1",
          description: "Large page heading.",
          keywords: ["title", "hero"],
          icon: reactIcons.IconH1,
          run: (currentEditor) => applyBlockType(currentEditor, "h1")
        },
        {
          key: "h2",
          title: "Heading 2",
          description: "Section heading.",
          keywords: ["subtitle", "section"],
          icon: reactIcons.IconH2,
          run: (currentEditor) => applyBlockType(currentEditor, "h2")
        },
        {
          key: "h3",
          title: "Heading 3",
          description: "Subsection heading.",
          keywords: ["subheading"],
          icon: reactIcons.IconH3,
          run: (currentEditor) => applyBlockType(currentEditor, "h3")
        },
        {
          key: "quote",
          title: "Quote",
          description: "Indented quotation block.",
          keywords: ["blockquote", "citation"],
          icon: reactIcons.IconQuote,
          run: (currentEditor) => applyBlockType(currentEditor, "quote")
        }
      ];
      if (features.lists) {
        next.push(
          {
            key: "bullet",
            title: "Bulleted list",
            description: "Create an unordered list.",
            keywords: ["ul", "list", "bullet"],
            icon: reactIcons.IconList,
            run: (currentEditor) => toggleBulletList(currentEditor, "paragraph")
          },
          {
            key: "number",
            title: "Numbered list",
            description: "Create an ordered list.",
            keywords: ["ol", "list", "number"],
            icon: reactIcons.IconListNumbers,
            run: (currentEditor) => toggleNumberList(currentEditor, "paragraph")
          }
        );
      }
      if (features.checklists) {
        next.push({
          key: "check",
          title: "Checklist",
          description: "Track tasks with checkboxes.",
          keywords: ["todo", "task"],
          icon: reactIcons.IconListCheck,
          run: (currentEditor) => toggleCheckList(currentEditor, "paragraph")
        });
      }
      if (features.codeBlocks) {
        next.push({
          key: "code",
          title: "Code block",
          description: "Insert a fenced code block.",
          keywords: ["snippet", "code"],
          icon: reactIcons.IconCode,
          run: (currentEditor) => applyBlockType(currentEditor, "code")
        });
      }
      if (features.horizontalRule) {
        next.push({
          key: "divider",
          title: "Divider",
          description: "Insert a horizontal rule.",
          keywords: ["rule", "separator", "hr"],
          icon: reactIcons.IconSeparatorHorizontal,
          run: (currentEditor) => insertBlock(currentEditor, "divider")
        });
      }
      if (features.tables) {
        next.push({
          key: "table",
          title: "Table",
          description: "Insert a 3 x 3 table with headers.",
          keywords: ["grid", "columns", "rows"],
          icon: reactIcons.IconTable,
          run: (currentEditor) => insertDefaultTable(currentEditor)
        });
      }
      return next;
    },
    [features]
  );
  const sourceItems = items ?? defaultItems;
  const normalizedQuery = (queryString ?? "").trim().toLowerCase();
  const options = react.useMemo(
    () => sourceItems.filter((item) => {
      if (!normalizedQuery) return true;
      const haystack = [
        item.title,
        item.description ?? "",
        ...item.keywords ?? []
      ].join(" ").toLowerCase();
      return haystack.includes(normalizedQuery);
    }).map((item) => new SlashCommandOption(item)),
    [normalizedQuery, sourceItems]
  );
  if (readOnly) return null;
  return /* @__PURE__ */ jsxRuntime.jsx(
    LexicalTypeaheadMenuPlugin.LexicalTypeaheadMenuPlugin,
    {
      options,
      onQueryChange: setQueryString,
      triggerFn: checkForSlashTriggerMatch,
      anchorClassName: "vds-editor-slash-anchor",
      onSelectOption: (option, _textNode, closeMenu) => {
        option.item.run(editor);
        closeMenu();
      },
      menuRenderFn: (anchorElementRef, { selectedIndex, selectOptionAndCleanUp, setHighlightedIndex, options: menuOptions }) => anchorElementRef.current && menuOptions.length > 0 ? reactDom.createPortal(
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: utils.cn("vds-editor-slash-menu", className), children: menuOptions.map((option, index) => /* @__PURE__ */ jsxRuntime.jsxs(
          "button",
          {
            type: "button",
            className: "vds-editor-slash-option",
            "data-active": selectedIndex === index || void 0,
            onMouseDown: (event) => {
              event.preventDefault();
              selectOptionAndCleanUp(option);
            },
            onMouseEnter: () => setHighlightedIndex(index),
            children: [
              option.item.icon ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-editor-slash-option-icon", children: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.Icon, { icon: option.item.icon, size: "sm" }) }) : null,
              /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "vds-editor-slash-option-copy", children: [
                /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-editor-slash-option-title", children: option.item.title }),
                option.item.description ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-editor-slash-option-description", children: option.item.description }) : null
              ] })
            ]
          },
          option.key
        )) }),
        anchorElementRef.current
      ) : null
    }
  );
}
function EditorSourcePanel({
  maxHeight,
  minHeight = "12rem",
  mode,
  onChange,
  value
}) {
  LexicalComposerContext.useLexicalComposerContext();
  const { readOnly } = useEditorConfig();
  const [localValue, setLocalValue] = react.useState(value);
  const valueRef = react.useRef(value);
  const language = mode === "markdown" ? "markdown" : "html";
  react.useEffect(() => {
    valueRef.current = value;
    setLocalValue(
      (currentValue) => currentValue === value ? currentValue : value
    );
  }, [value]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      className: "vds-editor-source-panel",
      style: {
        minBlockSize: minHeight,
        maxBlockSize: maxHeight
      },
      children: /* @__PURE__ */ jsxRuntime.jsx(
        reactCode.CodeEditor,
        {
          className: "vds-editor-source-code",
          value: localValue,
          onValueChange: (nextValue) => {
            if (nextValue === valueRef.current) {
              return;
            }
            valueRef.current = nextValue;
            setLocalValue(nextValue);
            onChange?.(nextValue);
          },
          language,
          filename: mode === "markdown" ? "document.md" : "document.html",
          copyable: true,
          readOnly,
          showLineNumbers: true,
          wrap: true,
          minLines: 12,
          maxLines: 32,
          variant: "embedded",
          size: "md"
        }
      )
    }
  );
}
function EditorStatusBar({
  className,
  showFeatureHints = true
}) {
  const { features } = useEditorConfig();
  const metrics = useEditorMetrics();
  const remaining = features.characterLimit != null ? features.characterLimit.maxLength - metrics.characterCount : null;
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: utils.cn("vds-editor-status", className), children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-editor-status-group", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "vds-editor-status-pill", children: [
        metrics.wordCount,
        " words"
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "vds-editor-status-pill", children: [
        metrics.characterCount,
        " chars"
      ] }),
      remaining != null ? /* @__PURE__ */ jsxRuntime.jsxs(
        "span",
        {
          className: "vds-editor-status-pill",
          "data-state": remaining < 0 ? "over" : remaining <= Math.max(10, features.characterLimit.maxLength * 0.1) ? "near" : void 0,
          children: [
            remaining,
            " remaining"
          ]
        }
      ) : null
    ] }),
    showFeatureHints ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-editor-status-group", "data-align": "end", children: [
      features.markdownShortcuts ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-editor-status-pill", children: "Markdown shortcuts" }) : null,
      features.tables ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-editor-status-pill", children: "Tables" }) : null,
      features.horizontalRule ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-editor-status-pill", children: "Divider" }) : null,
      features.autoLinks ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-editor-status-pill", children: "Auto links" }) : null,
      features.draggableBlocks ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-editor-status-pill", children: "Drag blocks" }) : null,
      features.comments ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-editor-status-pill", children: "Comments" }) : null
    ] }) : null
  ] });
}
var HOVER_ACTIONS_CLASSNAME = "vds-editor-table-hover-actions";
function EditorTableHoverActions({
  anchorElement,
  className
}) {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  const { readOnly } = useEditorConfig();
  const hoveredCellElementRef = react.useRef(null);
  const [hoveredCell, setHoveredCell] = react.useState(null);
  function clearHoveredCell() {
    if (hoveredCellElementRef.current) {
      delete hoveredCellElementRef.current.dataset.vdsTableHovered;
    }
    hoveredCellElementRef.current = null;
    setHoveredCell(null);
  }
  function updateHoveredCell(cellElement) {
    editor.getEditorState().read(() => {
      const lexicalNode = lexical.$getNearestNodeFromDOMNode(cellElement);
      const tableCellNode = table.$isTableCellNode(lexicalNode) ? lexicalNode : lexicalNode ? table.$getTableCellNodeFromLexicalNode(lexicalNode) : null;
      if (!tableCellNode) {
        clearHoveredCell();
        return;
      }
      if (hoveredCellElementRef.current && hoveredCellElementRef.current !== cellElement) {
        delete hoveredCellElementRef.current.dataset.vdsTableHovered;
      }
      hoveredCellElementRef.current = cellElement;
      hoveredCellElementRef.current.dataset.vdsTableHovered = "true";
      setHoveredCell((currentCell) => {
        if (currentCell && currentCell.key === tableCellNode.getKey() && currentCell.element === cellElement) {
          return currentCell;
        }
        return {
          key: tableCellNode.getKey(),
          element: cellElement
        };
      });
    });
  }
  react.useEffect(() => {
    if (!anchorElement || readOnly) {
      return;
    }
    const activeAnchorElement = anchorElement;
    function handlePointerMove(event) {
      const path = event.composedPath();
      const target = path.find(
        (node) => node instanceof HTMLElement
      );
      if (!(target instanceof HTMLElement)) {
        clearHoveredCell();
        return;
      }
      if (target.closest(`.${HOVER_ACTIONS_CLASSNAME}`)) {
        return;
      }
      const cellElement = target.closest(".vds-editor-table-cell");
      if (!cellElement || !activeAnchorElement.contains(cellElement)) {
        clearHoveredCell();
        return;
      }
      updateHoveredCell(cellElement);
    }
    function handlePointerLeave(event) {
      const relatedTarget = event.relatedTarget;
      if (relatedTarget instanceof HTMLElement && relatedTarget.closest(`.${HOVER_ACTIONS_CLASSNAME}`)) {
        return;
      }
      clearHoveredCell();
    }
    activeAnchorElement.addEventListener("pointermove", handlePointerMove);
    activeAnchorElement.addEventListener("pointerleave", handlePointerLeave);
    return () => {
      clearHoveredCell();
      activeAnchorElement.removeEventListener("pointermove", handlePointerMove);
      activeAnchorElement.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [anchorElement, editor, readOnly]);
  react.useLayoutEffect(() => {
    if (!anchorElement || !hoveredCellElementRef.current) {
      return;
    }
    const scrollerElement = anchorElement.parentElement;
    function syncHoveredRect() {
      if (!hoveredCellElementRef.current?.isConnected) {
        clearHoveredCell();
        return;
      }
      updateHoveredCell(hoveredCellElementRef.current);
    }
    window.addEventListener("resize", syncHoveredRect);
    scrollerElement?.addEventListener("scroll", syncHoveredRect, {
      passive: true
    });
    return () => {
      window.removeEventListener("resize", syncHoveredRect);
      scrollerElement?.removeEventListener("scroll", syncHoveredRect);
    };
  }, [anchorElement, hoveredCell]);
  if (!anchorElement || !hoveredCell || readOnly) {
    return null;
  }
  return reactDom.createPortal(
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: utils.cn(HOVER_ACTIONS_CLASSNAME, className), children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        reactButton.Button,
        {
          type: "button",
          variant: "soft",
          color: "primary",
          size: "xs",
          className: "vds-editor-table-hover-button",
          "data-axis": "column",
          "aria-label": "Insert column",
          title: "Insert column to the right",
          onMouseDown: (event) => event.preventDefault(),
          onClick: () => insertTableColumn(editor, true, null, hoveredCell.key),
          children: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.Icon, { icon: reactIcons.IconPlus, size: "sm" })
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(
        reactButton.Button,
        {
          type: "button",
          variant: "soft",
          color: "primary",
          size: "xs",
          className: "vds-editor-table-hover-button",
          "data-axis": "row",
          "aria-label": "Insert row",
          title: "Insert row below",
          onMouseDown: (event) => event.preventDefault(),
          onClick: () => insertTableRow(editor, true, null, hoveredCell.key),
          children: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.Icon, { icon: reactIcons.IconPlus, size: "sm" })
        }
      )
    ] }),
    hoveredCell.element
  );
}
var BLOCK_OPTIONS = [
  { label: "Normal", value: "paragraph", shortcut: SHORTCUTS.NORMAL, icon: reactIcons.IconTypography },
  { label: "Heading 1", value: "h1", shortcut: SHORTCUTS.HEADING_1, icon: reactIcons.IconH1 },
  { label: "Heading 2", value: "h2", shortcut: SHORTCUTS.HEADING_2, icon: reactIcons.IconH2 },
  { label: "Heading 3", value: "h3", shortcut: SHORTCUTS.HEADING_3, icon: reactIcons.IconH3 },
  { label: "Numbered List", value: "number", shortcut: SHORTCUTS.NUMBERED_LIST, icon: reactIcons.IconListNumbers },
  { label: "Bullet List", value: "bullet", shortcut: SHORTCUTS.BULLET_LIST, icon: reactIcons.IconList },
  { label: "Check List", value: "check", shortcut: SHORTCUTS.CHECK_LIST, icon: reactIcons.IconListCheck },
  { label: "Quote", value: "quote", shortcut: SHORTCUTS.QUOTE, icon: reactIcons.IconQuote },
  { label: "Code Block", value: "code", shortcut: SHORTCUTS.CODE_BLOCK, icon: reactIcons.IconCode }
];
var ALIGNMENT_OPTIONS = [
  { label: "Left Align", value: "left", shortcut: SHORTCUTS.LEFT_ALIGN, icon: reactIcons.IconAlignLeft },
  { label: "Center Align", value: "center", shortcut: SHORTCUTS.CENTER_ALIGN, icon: reactIcons.IconAlignCenter },
  { label: "Right Align", value: "right", shortcut: SHORTCUTS.RIGHT_ALIGN, icon: reactIcons.IconAlignRight },
  { label: "Justify Align", value: "justify", shortcut: SHORTCUTS.JUSTIFY_ALIGN, icon: reactIcons.IconAlignJustified },
  { label: "Start Align", value: "start", icon: reactIcons.IconAlignLeft },
  { label: "End Align", value: "end", icon: reactIcons.IconAlignRight }
];
var DEFAULT_FONT_FAMILIES = [
  { label: "Sans", value: "var(--vds-font-sans)" },
  { label: "Latin", value: "var(--vds-font-latin)" },
  { label: "Mono", value: "var(--vds-font-mono)" }
];
var DEFAULT_FONT_SIZES = [
  { label: "12", value: "var(--vds-text-xs)" },
  { label: "14", value: "var(--vds-text-sm)" },
  { label: "16", value: "var(--vds-text-base)" },
  { label: "18", value: "var(--vds-text-lg)" },
  { label: "20", value: "var(--vds-text-xl)" },
  { label: "24", value: "var(--vds-text-2xl)" },
  { label: "30", value: "var(--vds-text-3xl)" }
];
var DEFAULT_TEXT_COLOR_SWATCHES = [
  { label: "Ink", value: "var(--vds-color-neutral-12)" },
  { label: "Primary", value: "var(--vds-color-primary-11)" },
  { label: "Info", value: "var(--vds-color-info-11)" },
  { label: "Success", value: "var(--vds-color-success-11)" },
  { label: "Warning", value: "var(--vds-color-warning-11)" },
  { label: "Danger", value: "var(--vds-color-danger-11)" },
  { label: "Accent", value: "var(--vds-color-accent-11)" }
];
var DEFAULT_HIGHLIGHT_SWATCHES = [
  { label: "Primary", value: "var(--vds-color-primary-4)" },
  { label: "Info", value: "var(--vds-color-info-4)" },
  { label: "Success", value: "var(--vds-color-success-4)" },
  { label: "Warning", value: "var(--vds-color-warning-4)" },
  { label: "Danger", value: "var(--vds-color-danger-4)" },
  { label: "Accent", value: "var(--vds-color-accent-4)" }
];
function areToolbarStatesEqual(current, next) {
  return current.blockType === next.blockType && current.elementFormat === next.elementFormat && current.isBold === next.isBold && current.isItalic === next.isItalic && current.isUnderline === next.isUnderline && current.isStrikethrough === next.isStrikethrough && current.isInlineCode === next.isInlineCode && current.isSubscript === next.isSubscript && current.isSuperscript === next.isSuperscript && current.isLowercase === next.isLowercase && current.isUppercase === next.isUppercase && current.isCapitalize === next.isCapitalize && current.isTableSelection === next.isTableSelection && current.isLink === next.isLink && current.linkUrl === next.linkUrl && current.fontFamily === next.fontFamily && current.fontSize === next.fontSize && current.fontColor === next.fontColor && current.bgColor === next.bgColor;
}
function ToolbarButton({
  active,
  disabled,
  label,
  onClick,
  children
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    reactButton.Button,
    {
      type: "button",
      variant: active ? "soft" : "ghost",
      color: "contrast",
      size: "sm",
      className: "vds-editor-toolbar-button",
      disabled,
      title: label,
      "aria-label": label,
      onMouseDown: (event) => event.preventDefault(),
      onClick,
      children
    }
  );
}
function ToolbarMenuItem({
  active,
  icon,
  label,
  shortcut,
  onSelect,
  endSlot,
  reserveIcon = true
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    EditorDropdownItem,
    {
      className: utils.cn(
        "vds-editor-menu-item",
        !reserveIcon ? "vds-editor-menu-item-no-icon" : null,
        active ? "is-active" : null
      ),
      onSelect,
      children: [
        icon ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-editor-menu-item-icon", children: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.Icon, { icon, size: "sm" }) }) : reserveIcon ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-editor-menu-item-icon vds-editor-menu-item-icon-empty" }) : null,
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-editor-menu-item-copy", children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-editor-menu-item-label", children: label }) }),
        endSlot ?? (shortcut ? /* @__PURE__ */ jsxRuntime.jsx(reactKbd.Kbd, { children: shortcut }) : null)
      ]
    }
  );
}
function ToolbarSelectItemContent({
  icon,
  label,
  shortcut,
  endSlot,
  reserveIcon = true
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    icon ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-editor-menu-item-icon", children: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.Icon, { icon, size: "sm" }) }) : reserveIcon ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-editor-menu-item-icon vds-editor-menu-item-icon-empty" }) : null,
    /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-editor-menu-item-copy", children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-editor-menu-item-label", children: label }) }),
    endSlot ?? (shortcut ? /* @__PURE__ */ jsxRuntime.jsx(reactKbd.Kbd, { children: shortcut }) : null)
  ] });
}
function ToolbarDropdown({
  label,
  icon,
  active,
  disabled,
  className,
  dropdownClassName,
  onOpen,
  children
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    EditorDropdown,
    {
      className: utils.cn("vds-editor-dropdown vds-editor-menu", dropdownClassName),
      disabled,
      onOpenChange: (open) => {
        if (open) {
          onOpen?.();
        }
      },
      trigger: ({ buttonRef, controlsId, open, toggle }) => /* @__PURE__ */ jsxRuntime.jsx(
        reactButton.Button,
        {
          ref: buttonRef,
          type: "button",
          variant: open || active ? "soft" : "ghost",
          color: "contrast",
          size: "sm",
          className: utils.cn("vds-editor-toolbar-trigger", className),
          "aria-label": label,
          "aria-controls": controlsId,
          "aria-expanded": open,
          disabled,
          leftSection: icon ? /* @__PURE__ */ jsxRuntime.jsx(reactIcons.Icon, { icon, size: "sm" }) : void 0,
          rightSection: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.Icon, { icon: reactIcons.IconChevronDown, size: "xs" }),
          onMouseDown: (event) => event.preventDefault(),
          onClick: (event) => {
            event.preventDefault();
            toggle();
          },
          children: label
        }
      ),
      children
    }
  );
}
function ToolbarSelect({
  label,
  triggerLabel,
  value,
  icon,
  disabled,
  triggerClassName,
  contentClassName,
  onOpen,
  onValueChange,
  children
}) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-editor-toolbar-select-wrap", children: /* @__PURE__ */ jsxRuntime.jsxs(
    reactSelect.Select,
    {
      value,
      onValueChange,
      disabled,
      onOpenChange: (open) => {
        if (open) {
          onOpen?.();
        }
      },
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          reactSelect.SelectTrigger,
          {
            size: "sm",
            appearance: "soft",
            className: utils.cn("vds-editor-toolbar-select", triggerClassName),
            "aria-label": label,
            onMouseDown: (event) => event.preventDefault(),
            children: /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "vds-editor-toolbar-select-copy", children: [
              icon ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-editor-toolbar-select-icon", children: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.Icon, { icon, size: "sm" }) }) : null,
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-editor-toolbar-select-text", children: triggerLabel })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          reactSelect.SelectContent,
          {
            size: "sm",
            className: utils.cn("vds-editor-toolbar-select-content", contentClassName),
            children
          }
        )
      ]
    }
  ) });
}
function ToolbarColorMenu({
  disabled,
  label,
  icon,
  value,
  swatches,
  resetValue,
  onOpen,
  onApply
}) {
  const resolvedSwatches = react.useMemo(
    () => swatches.map((swatch) => ({
      ...swatch,
      resolvedValue: resolveColorForPicker(swatch.value)
    })),
    [swatches]
  );
  const pickerValue = resolveColorForPicker(value, resetValue);
  const pickerSwatches = resolvedSwatches.map((swatch) => swatch.resolvedValue);
  return /* @__PURE__ */ jsxRuntime.jsx(
    EditorDropdown,
    {
      className: "vds-editor-dropdown vds-editor-color-panel",
      disabled,
      stopCloseOnClickSelf: true,
      onOpenChange: (open) => {
        if (open) {
          onOpen();
        }
      },
      trigger: ({ buttonRef, controlsId, open, toggle }) => /* @__PURE__ */ jsxRuntime.jsx(
        reactButton.Button,
        {
          ref: buttonRef,
          type: "button",
          variant: open || value !== resetValue ? "soft" : "ghost",
          color: "contrast",
          size: "sm",
          className: "vds-editor-toolbar-trigger vds-editor-toolbar-color-trigger",
          "aria-label": label,
          "aria-controls": controlsId,
          "aria-expanded": open,
          disabled,
          leftSection: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.Icon, { icon, size: "sm" }),
          rightSection: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.Icon, { icon: reactIcons.IconChevronDown, size: "xs" }),
          onMouseDown: (event) => event.preventDefault(),
          onClick: (event) => {
            event.preventDefault();
            toggle();
          }
        }
      ),
      children: /* @__PURE__ */ jsxRuntime.jsx(
        ToolbarColorPanel,
        {
          label,
          value: pickerValue,
          swatches: resolvedSwatches,
          pickerSwatches,
          resetValue,
          onApply
        }
      )
    }
  );
}
function ToolbarColorPanel({
  label,
  value,
  swatches,
  pickerSwatches,
  resetValue,
  onApply
}) {
  const { close } = useEditorDropdown();
  const [draftValue, setDraftValue] = react.useState(value);
  const resetPickerValue = resolveColorForPicker(resetValue);
  react.useEffect(() => {
    setDraftValue(value);
  }, [value]);
  function getApplyValue(nextValue) {
    const comparableValue = normalizeComparableColor(nextValue);
    const matchedSwatch = swatches.find(
      (swatch) => normalizeComparableColor(swatch.resolvedValue) === comparableValue
    );
    if (matchedSwatch) {
      return matchedSwatch.value;
    }
    if (normalizeComparableColor(resetPickerValue) === comparableValue || resetValue === "transparent" && normalizeComparableColor(nextValue) === "transparent") {
      return resetValue;
    }
    return nextValue;
  }
  function handlePickerMouseDownCapture(event) {
    const target = event.target;
    if (target instanceof HTMLElement && !target.closest("input, textarea, select")) {
      event.preventDefault();
    }
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-editor-color-panel-header", children: label }),
    /* @__PURE__ */ jsxRuntime.jsx(
      reactColorPicker.ColorPicker,
      {
        appearance: "flat",
        mode: "solid",
        defaultFormat: "hex",
        showCodeView: false,
        allowAlpha: resetValue === "transparent",
        className: "vds-editor-color-picker",
        value: draftValue,
        swatches: pickerSwatches,
        onMouseDownCapture: handlePickerMouseDownCapture,
        onValueChange: (nextValue) => setDraftValue(nextValue)
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-editor-color-panel-actions", children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        reactButton.Button,
        {
          type: "button",
          variant: "ghost",
          color: "contrast",
          size: "xs",
          onMouseDown: (event) => event.preventDefault(),
          onClick: () => {
            setDraftValue(resetPickerValue);
            onApply(resetValue, false);
          },
          children: "Reset"
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(
        reactButton.Button,
        {
          type: "button",
          variant: "ghost",
          color: "contrast",
          size: "xs",
          onMouseDown: (event) => event.preventDefault(),
          onClick: () => close(),
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(
        reactButton.Button,
        {
          type: "button",
          variant: "soft",
          color: "primary",
          size: "xs",
          className: "vds-editor-color-apply-button",
          onMouseDown: (event) => event.preventDefault(),
          onClick: () => {
            onApply(getApplyValue(draftValue), false);
            close();
          },
          children: "Apply"
        }
      )
    ] })
  ] });
}
function resolveLabelFromOptions(options, value, fallback) {
  return options.find((option) => option.value === value)?.label ?? fallback;
}
function nextOptionValue(options, currentValue, direction) {
  const currentIndex = options.findIndex((option) => option.value === currentValue);
  const safeIndex = currentIndex === -1 ? 0 : currentIndex;
  const nextIndex = Math.min(
    options.length - 1,
    Math.max(0, safeIndex + direction)
  );
  return options[nextIndex]?.value ?? currentValue;
}
function resolveColorForPicker(value, fallback = "#000000") {
  if (typeof document === "undefined") {
    return value.startsWith("var(") ? fallback : value;
  }
  if (value.trim().toLowerCase() === "transparent") {
    return "transparent";
  }
  const sample = document.createElement("span");
  sample.style.position = "fixed";
  sample.style.opacity = "0";
  sample.style.pointerEvents = "none";
  sample.style.color = value;
  document.body.append(sample);
  const computedColor = window.getComputedStyle(sample).color;
  sample.remove();
  return computedColor && computedColor !== "rgba(0, 0, 0, 0)" ? computedColor : value.startsWith("var(") ? fallback : value;
}
function normalizeComparableColor(value) {
  return resolveColorForPicker(value).replace(/\s+/g, "").toLowerCase();
}
function EditorToolbar({
  className,
  sticky = false,
  showClearButton = true,
  insertMenu,
  modeSwitcher,
  mode,
  onModeChange,
  onRequestComment,
  fontFamilies = DEFAULT_FONT_FAMILIES,
  fontSizes = DEFAULT_FONT_SIZES,
  textColorSwatches = DEFAULT_TEXT_COLOR_SWATCHES,
  highlightColorSwatches = DEFAULT_HIGHLIGHT_SWATCHES
}) {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  const { features, readOnly } = useEditorConfig();
  const [state, setState] = react.useState(EMPTY_TOOLBAR_STATE);
  const [canUndo, setCanUndo] = react.useState(false);
  const [canRedo, setCanRedo] = react.useState(false);
  const [linkEditorOpen, setLinkEditorOpen] = react.useState(false);
  const [linkValue, setLinkValue] = react.useState("");
  const linkInputRef = react.useRef(null);
  const selectionRef = react.useRef(null);
  const sourceModeActive = mode !== void 0 && mode !== "rich-text";
  const richControlsDisabled = readOnly || sourceModeActive;
  const historyControlsDisabled = readOnly;
  const blockOptions = react.useMemo(
    () => BLOCK_OPTIONS.filter((option) => {
      if (option.value === "code") {
        return features.codeBlocks;
      }
      if (option.value === "check") {
        return features.checklists;
      }
      if (option.value === "bullet" || option.value === "number") {
        return features.lists;
      }
      return true;
    }),
    [features.checklists, features.codeBlocks, features.lists]
  );
  const currentBlockOption = blockOptions.find((option) => option.value === state.blockType) ?? blockOptions[0];
  const currentAlignmentOption = ALIGNMENT_OPTIONS.find((option) => option.value === state.elementFormat) ?? ALIGNMENT_OPTIONS[0];
  const fontFamilyLabel = resolveLabelFromOptions(
    fontFamilies,
    state.fontFamily,
    "Sans"
  );
  const fontSizeLabel = resolveLabelFromOptions(
    fontSizes,
    state.fontSize,
    "16"
  );
  function rememberSelection() {
    editor.getEditorState().read(() => {
      const selection = lexical.$getSelection();
      selectionRef.current = lexical.$isRangeSelection(selection) ? selection.clone() : null;
    });
  }
  react.useEffect(() => {
    if (linkEditorOpen && linkInputRef.current) {
      linkInputRef.current.focus({ preventScroll: true });
      linkInputRef.current.select();
    }
  }, [linkEditorOpen]);
  react.useEffect(() => {
    const updateToolbar = () => {
      editor.getEditorState().read(() => {
        const nextState = readToolbarState();
        setState(
          (currentState) => areToolbarStatesEqual(currentState, nextState) ? currentState : nextState
        );
      });
    };
    updateToolbar();
    return utils$1.mergeRegister(
      editor.registerUpdateListener(() => {
        updateToolbar();
      }),
      editor.registerCommand(
        lexical.SELECTION_CHANGE_COMMAND,
        () => {
          updateToolbar();
          return false;
        },
        lexical.COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        lexical.CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        lexical.COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        lexical.CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        lexical.COMMAND_PRIORITY_LOW
      )
    );
  }, [editor]);
  function handleBlockTypeSelect(blockType) {
    switch (blockType) {
      case "bullet":
        toggleBulletList(editor, state.blockType);
        return;
      case "number":
        toggleNumberList(editor, state.blockType);
        return;
      case "check":
        toggleCheckList(editor, state.blockType);
        return;
      default:
        applyBlockType(editor, blockType);
    }
  }
  function openLinkEditor() {
    rememberSelection();
    setLinkValue(state.linkUrl);
    setLinkEditorOpen(true);
  }
  function closeLinkEditor() {
    setLinkEditorOpen(false);
    setLinkValue(state.linkUrl);
  }
  function submitLink() {
    const next = linkValue.trim();
    if (!next) {
      clearLink(editor, selectionRef.current);
      closeLinkEditor();
      return;
    }
    applyLink(editor, next, selectionRef.current);
    closeLinkEditor();
  }
  function applyFontStyle(property, value, skipHistoryStack = false) {
    applyTextStyles(
      editor,
      { [property]: value },
      selectionRef.current,
      skipHistoryStack
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      className: utils.cn("vds-editor-toolbar", className),
      "data-sticky": sticky || void 0,
      "data-read-only": readOnly || void 0,
      "data-source-mode": sourceModeActive || void 0,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          reactScrollArea.ScrollArea,
          {
            className: "vds-editor-toolbar-scroll",
            orientation: "horizontal",
            size: "sm",
            mask: true,
            arrows: true,
            arrowPlacement: "outer",
            arrowAppearance: "hover",
            hideScrollbar: true,
            children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-editor-toolbar-row", children: [
              features.history ? /* @__PURE__ */ jsxRuntime.jsxs(
                "div",
                {
                  className: "vds-editor-toolbar-group vds-editor-toolbar-group-sticky",
                  "aria-label": "History",
                  children: [
                    /* @__PURE__ */ jsxRuntime.jsx(
                      ToolbarButton,
                      {
                        label: "Undo",
                        disabled: historyControlsDisabled || !canUndo,
                        onClick: () => undo(editor),
                        children: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.Icon, { icon: reactIcons.IconArrowBackUp, size: "sm" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntime.jsx(
                      ToolbarButton,
                      {
                        label: "Redo",
                        disabled: historyControlsDisabled || !canRedo,
                        onClick: () => redo(editor),
                        children: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.Icon, { icon: reactIcons.IconArrowForwardUp, size: "sm" })
                      }
                    )
                  ]
                }
              ) : null,
              /* @__PURE__ */ jsxRuntime.jsx(
                "div",
                {
                  className: "vds-editor-toolbar-group vds-editor-toolbar-rich-group",
                  "aria-label": "Block type",
                  children: /* @__PURE__ */ jsxRuntime.jsx(
                    ToolbarSelect,
                    {
                      label: "Block type",
                      triggerLabel: currentBlockOption?.label ?? "Normal",
                      value: currentBlockOption?.value ?? "paragraph",
                      icon: currentBlockOption?.icon,
                      disabled: richControlsDisabled,
                      contentClassName: "vds-editor-toolbar-block-menu",
                      onOpen: rememberSelection,
                      onValueChange: (nextValue) => handleBlockTypeSelect(nextValue),
                      children: blockOptions.map((option) => /* @__PURE__ */ jsxRuntime.jsx(
                        reactSelect.SelectItem,
                        {
                          value: option.value,
                          className: "vds-editor-toolbar-select-item",
                          children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-editor-toolbar-select-item-content", children: /* @__PURE__ */ jsxRuntime.jsx(
                            ToolbarSelectItemContent,
                            {
                              icon: option.icon,
                              label: option.label,
                              shortcut: option.shortcut
                            }
                          ) })
                        },
                        option.value
                      ))
                    }
                  )
                }
              ),
              features.fontFamily ? /* @__PURE__ */ jsxRuntime.jsx(
                "div",
                {
                  className: "vds-editor-toolbar-group vds-editor-toolbar-rich-group",
                  "aria-label": "Font family",
                  children: /* @__PURE__ */ jsxRuntime.jsx(
                    ToolbarSelect,
                    {
                      label: "Font family",
                      triggerLabel: fontFamilyLabel,
                      value: state.fontFamily,
                      icon: reactIcons.IconTypography,
                      disabled: richControlsDisabled,
                      contentClassName: "vds-editor-font-family-menu",
                      onOpen: rememberSelection,
                      onValueChange: (nextValue) => applyFontStyle("font-family", nextValue),
                      children: fontFamilies.map((option) => /* @__PURE__ */ jsxRuntime.jsx(
                        reactSelect.SelectItem,
                        {
                          value: option.value,
                          className: "vds-editor-toolbar-select-item",
                          children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-editor-toolbar-select-item-content", children: /* @__PURE__ */ jsxRuntime.jsx(
                            ToolbarSelectItemContent,
                            {
                              label: option.label,
                              reserveIcon: false
                            }
                          ) })
                        },
                        option.value
                      ))
                    }
                  )
                }
              ) : null,
              features.fontSize ? /* @__PURE__ */ jsxRuntime.jsxs(
                "div",
                {
                  className: "vds-editor-toolbar-group vds-editor-toolbar-rich-group",
                  "aria-label": "Font size",
                  children: [
                    /* @__PURE__ */ jsxRuntime.jsx(
                      reactButton.Button,
                      {
                        type: "button",
                        variant: "soft",
                        color: "contrast",
                        size: "sm",
                        className: "vds-editor-toolbar-button vds-editor-font-size-step",
                        disabled: richControlsDisabled,
                        title: "Decrease font size",
                        "aria-label": "Decrease font size",
                        onMouseDown: (event) => event.preventDefault(),
                        onClick: () => {
                          rememberSelection();
                          applyTextStyles(
                            editor,
                            {
                              "font-size": nextOptionValue(fontSizes, state.fontSize, -1)
                            },
                            selectionRef.current
                          );
                        },
                        children: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.Icon, { icon: reactIcons.IconMinus, size: "md", stroke: 2 })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntime.jsx(
                      ToolbarSelect,
                      {
                        label: "Font size",
                        triggerLabel: fontSizeLabel,
                        value: state.fontSize,
                        disabled: richControlsDisabled,
                        triggerClassName: "vds-editor-toolbar-select-compact",
                        contentClassName: "vds-editor-font-size-menu",
                        onOpen: rememberSelection,
                        onValueChange: (nextValue) => applyFontStyle("font-size", nextValue),
                        children: fontSizes.map((option) => /* @__PURE__ */ jsxRuntime.jsx(
                          reactSelect.SelectItem,
                          {
                            value: option.value,
                            className: "vds-editor-toolbar-select-item",
                            children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-editor-toolbar-select-item-content", children: /* @__PURE__ */ jsxRuntime.jsx(
                              ToolbarSelectItemContent,
                              {
                                label: option.label,
                                reserveIcon: false
                              }
                            ) })
                          },
                          option.value
                        ))
                      }
                    ),
                    /* @__PURE__ */ jsxRuntime.jsx(
                      reactButton.Button,
                      {
                        type: "button",
                        variant: "soft",
                        color: "contrast",
                        size: "sm",
                        className: "vds-editor-toolbar-button vds-editor-font-size-step",
                        disabled: richControlsDisabled,
                        title: "Increase font size",
                        "aria-label": "Increase font size",
                        onMouseDown: (event) => event.preventDefault(),
                        onClick: () => {
                          rememberSelection();
                          applyTextStyles(
                            editor,
                            {
                              "font-size": nextOptionValue(fontSizes, state.fontSize, 1)
                            },
                            selectionRef.current
                          );
                        },
                        children: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.Icon, { icon: reactIcons.IconPlus, size: "md", stroke: 2 })
                      }
                    )
                  ]
                }
              ) : null,
              /* @__PURE__ */ jsxRuntime.jsxs(
                "div",
                {
                  className: "vds-editor-toolbar-group vds-editor-toolbar-rich-group",
                  "aria-label": "Text format",
                  children: [
                    /* @__PURE__ */ jsxRuntime.jsx(
                      ToolbarButton,
                      {
                        label: "Bold",
                        active: state.isBold,
                        disabled: richControlsDisabled,
                        onClick: () => formatText(editor, "bold"),
                        children: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.Icon, { icon: reactIcons.IconBold, size: "sm" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntime.jsx(
                      ToolbarButton,
                      {
                        label: "Italic",
                        active: state.isItalic,
                        disabled: richControlsDisabled,
                        onClick: () => formatText(editor, "italic"),
                        children: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.Icon, { icon: reactIcons.IconItalic, size: "sm" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntime.jsx(
                      ToolbarButton,
                      {
                        label: "Underline",
                        active: state.isUnderline,
                        disabled: richControlsDisabled,
                        onClick: () => formatText(editor, "underline"),
                        children: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.Icon, { icon: reactIcons.IconUnderline, size: "sm" })
                      }
                    )
                  ]
                }
              ),
              features.advancedTextFormats ? /* @__PURE__ */ jsxRuntime.jsx(
                "div",
                {
                  className: "vds-editor-toolbar-group vds-editor-toolbar-rich-group",
                  "aria-label": "Advanced text format",
                  children: /* @__PURE__ */ jsxRuntime.jsxs(
                    ToolbarDropdown,
                    {
                      label: "Aa",
                      icon: reactIcons.IconLetterCase,
                      active: state.isStrikethrough || state.isSubscript || state.isSuperscript || state.isLowercase || state.isUppercase || state.isCapitalize,
                      disabled: richControlsDisabled,
                      className: "vds-editor-toolbar-trigger-compact",
                      onOpen: rememberSelection,
                      children: [
                        /* @__PURE__ */ jsxRuntime.jsx(
                          ToolbarMenuItem,
                          {
                            active: state.isStrikethrough,
                            label: "Strikethrough",
                            onSelect: () => formatText(editor, "strikethrough")
                          }
                        ),
                        /* @__PURE__ */ jsxRuntime.jsx(
                          ToolbarMenuItem,
                          {
                            active: state.isSubscript,
                            icon: reactIcons.IconSubscript,
                            label: "Subscript",
                            onSelect: () => formatText(editor, "subscript")
                          }
                        ),
                        /* @__PURE__ */ jsxRuntime.jsx(
                          ToolbarMenuItem,
                          {
                            active: state.isSuperscript,
                            icon: reactIcons.IconSuperscript,
                            label: "Superscript",
                            onSelect: () => formatText(editor, "superscript")
                          }
                        ),
                        /* @__PURE__ */ jsxRuntime.jsx(EditorDropdownSeparator, { className: "vds-editor-menu-separator" }),
                        /* @__PURE__ */ jsxRuntime.jsx(
                          ToolbarMenuItem,
                          {
                            active: state.isLowercase,
                            icon: reactIcons.IconLetterCaseLower,
                            label: "Lowercase",
                            onSelect: () => formatText(editor, "lowercase")
                          }
                        ),
                        /* @__PURE__ */ jsxRuntime.jsx(
                          ToolbarMenuItem,
                          {
                            active: state.isUppercase,
                            icon: reactIcons.IconLetterCaseUpper,
                            label: "Uppercase",
                            onSelect: () => formatText(editor, "uppercase")
                          }
                        ),
                        /* @__PURE__ */ jsxRuntime.jsx(
                          ToolbarMenuItem,
                          {
                            active: state.isCapitalize,
                            icon: reactIcons.IconLetterCaseToggle,
                            label: "Capitalize",
                            onSelect: () => formatText(editor, "capitalize")
                          }
                        )
                      ]
                    }
                  )
                }
              ) : null,
              features.textColors ? /* @__PURE__ */ jsxRuntime.jsxs(
                "div",
                {
                  className: "vds-editor-toolbar-group vds-editor-toolbar-rich-group",
                  "aria-label": "Text colors",
                  children: [
                    /* @__PURE__ */ jsxRuntime.jsx(
                      ToolbarColorMenu,
                      {
                        disabled: richControlsDisabled,
                        label: "Text color",
                        icon: reactIcons.IconPalette,
                        value: state.fontColor,
                        swatches: textColorSwatches,
                        resetValue: "var(--vds-color-neutral-12)",
                        onOpen: rememberSelection,
                        onApply: (value, skipHistoryStack) => applyTextStyles(
                          editor,
                          { color: value },
                          selectionRef.current,
                          skipHistoryStack
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxRuntime.jsx(
                      ToolbarColorMenu,
                      {
                        disabled: richControlsDisabled,
                        label: "Highlight color",
                        icon: reactIcons.IconHighlight,
                        value: state.bgColor,
                        swatches: highlightColorSwatches,
                        resetValue: "transparent",
                        onOpen: rememberSelection,
                        onApply: (value, skipHistoryStack) => applyTextStyles(
                          editor,
                          { "background-color": value },
                          selectionRef.current,
                          skipHistoryStack
                        )
                      }
                    )
                  ]
                }
              ) : null,
              features.links || features.comments || insertMenu ? /* @__PURE__ */ jsxRuntime.jsxs(
                "div",
                {
                  className: "vds-editor-toolbar-group vds-editor-toolbar-rich-group",
                  "aria-label": "Insert",
                  children: [
                    features.links ? /* @__PURE__ */ jsxRuntime.jsx(
                      ToolbarButton,
                      {
                        label: state.isLink ? "Edit link" : "Insert link",
                        active: state.isLink || linkEditorOpen,
                        disabled: richControlsDisabled,
                        onClick: openLinkEditor,
                        children: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.Icon, { icon: reactIcons.IconLink, size: "sm" })
                      }
                    ) : null,
                    features.comments ? /* @__PURE__ */ jsxRuntime.jsx(
                      ToolbarButton,
                      {
                        label: "Add comment",
                        disabled: richControlsDisabled,
                        onClick: () => onRequestComment?.(),
                        children: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.Icon, { icon: reactIcons.IconMessageCirclePlus, size: "sm" })
                      }
                    ) : null,
                    insertMenu ? /* @__PURE__ */ jsxRuntime.jsx(EditorInsertMenu, { ...insertMenu }) : null
                  ]
                }
              ) : null,
              features.tables && state.isTableSelection ? /* @__PURE__ */ jsxRuntime.jsx(
                "div",
                {
                  className: "vds-editor-toolbar-group vds-editor-toolbar-rich-group",
                  "aria-label": "Table tools",
                  children: /* @__PURE__ */ jsxRuntime.jsxs(
                    ToolbarDropdown,
                    {
                      label: "Table",
                      icon: reactIcons.IconTable,
                      disabled: richControlsDisabled,
                      onOpen: rememberSelection,
                      children: [
                        /* @__PURE__ */ jsxRuntime.jsx(
                          ToolbarMenuItem,
                          {
                            reserveIcon: false,
                            label: "Insert row above",
                            onSelect: () => insertTableRow(editor, false, selectionRef.current)
                          }
                        ),
                        /* @__PURE__ */ jsxRuntime.jsx(
                          ToolbarMenuItem,
                          {
                            reserveIcon: false,
                            label: "Insert row below",
                            onSelect: () => insertTableRow(editor, true, selectionRef.current)
                          }
                        ),
                        /* @__PURE__ */ jsxRuntime.jsx(
                          ToolbarMenuItem,
                          {
                            reserveIcon: false,
                            label: "Insert column left",
                            onSelect: () => insertTableColumn(editor, false, selectionRef.current)
                          }
                        ),
                        /* @__PURE__ */ jsxRuntime.jsx(
                          ToolbarMenuItem,
                          {
                            reserveIcon: false,
                            label: "Insert column right",
                            onSelect: () => insertTableColumn(editor, true, selectionRef.current)
                          }
                        ),
                        /* @__PURE__ */ jsxRuntime.jsx(EditorDropdownSeparator, { className: "vds-editor-menu-separator" }),
                        /* @__PURE__ */ jsxRuntime.jsx(
                          ToolbarMenuItem,
                          {
                            reserveIcon: false,
                            label: "Delete row",
                            onSelect: () => deleteTableRow(editor, selectionRef.current)
                          }
                        ),
                        /* @__PURE__ */ jsxRuntime.jsx(
                          ToolbarMenuItem,
                          {
                            reserveIcon: false,
                            label: "Delete column",
                            onSelect: () => deleteTableColumn(editor, selectionRef.current)
                          }
                        ),
                        /* @__PURE__ */ jsxRuntime.jsx(
                          ToolbarMenuItem,
                          {
                            reserveIcon: false,
                            label: "Delete table",
                            onSelect: () => deleteTable(editor, selectionRef.current)
                          }
                        )
                      ]
                    }
                  )
                }
              ) : null,
              features.textAlignment ? /* @__PURE__ */ jsxRuntime.jsx(
                "div",
                {
                  className: "vds-editor-toolbar-group vds-editor-toolbar-rich-group",
                  "aria-label": "Alignment",
                  children: /* @__PURE__ */ jsxRuntime.jsxs(
                    ToolbarDropdown,
                    {
                      label: currentAlignmentOption.label,
                      icon: currentAlignmentOption.icon,
                      disabled: richControlsDisabled,
                      children: [
                        ALIGNMENT_OPTIONS.map((option) => /* @__PURE__ */ jsxRuntime.jsx(
                          ToolbarMenuItem,
                          {
                            active: state.elementFormat === option.value,
                            icon: option.icon,
                            label: option.label,
                            shortcut: option.shortcut,
                            onSelect: () => formatElement(editor, option.value)
                          },
                          option.value
                        )),
                        /* @__PURE__ */ jsxRuntime.jsx(EditorDropdownSeparator, { className: "vds-editor-menu-separator" }),
                        /* @__PURE__ */ jsxRuntime.jsx(
                          ToolbarMenuItem,
                          {
                            icon: reactIcons.IconIndentDecrease,
                            label: "Outdent",
                            shortcut: SHORTCUTS.OUTDENT,
                            onSelect: () => outdentContent(editor)
                          }
                        ),
                        /* @__PURE__ */ jsxRuntime.jsx(
                          ToolbarMenuItem,
                          {
                            icon: reactIcons.IconIndentIncrease,
                            label: "Indent",
                            shortcut: SHORTCUTS.INDENT,
                            onSelect: () => indentContent(editor)
                          }
                        )
                      ]
                    }
                  )
                }
              ) : null,
              modeSwitcher && mode && onModeChange ? /* @__PURE__ */ jsxRuntime.jsx(
                "div",
                {
                  className: "vds-editor-toolbar-group vds-editor-mode-group",
                  "aria-label": "Source mode",
                  children: /* @__PURE__ */ jsxRuntime.jsx(
                    EditorModeSwitcher,
                    {
                      ...modeSwitcher,
                      value: mode,
                      onChange: onModeChange
                    }
                  )
                }
              ) : null,
              showClearButton ? /* @__PURE__ */ jsxRuntime.jsx(
                "div",
                {
                  className: "vds-editor-toolbar-group vds-editor-toolbar-rich-group",
                  "aria-label": "Danger zone",
                  children: /* @__PURE__ */ jsxRuntime.jsx(
                    ToolbarButton,
                    {
                      label: "Clear editor",
                      disabled: richControlsDisabled,
                      onClick: () => clearEditor(editor),
                      children: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.Icon, { icon: reactIcons.IconTrash, size: "sm" })
                    }
                  )
                }
              ) : null
            ] })
          }
        ),
        linkEditorOpen ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-editor-toolbar-link-row", children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            reactInput.Input,
            {
              ref: linkInputRef,
              inputSize: "sm",
              className: "vds-editor-toolbar-link-input",
              value: linkValue,
              onChange: (event) => setLinkValue(event.target.value),
              onKeyDown: (event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  submitLink();
                }
                if (event.key === "Escape") {
                  event.preventDefault();
                  closeLinkEditor();
                }
              },
              placeholder: "https://example.com",
              disabled: richControlsDisabled
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-editor-toolbar-link-actions", children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              reactButton.Button,
              {
                type: "button",
                className: "vds-editor-toolbar-text-button",
                variant: "soft",
                color: "primary",
                size: "sm",
                disabled: richControlsDisabled,
                onMouseDown: (event) => event.preventDefault(),
                onClick: submitLink,
                children: "Apply"
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(
              reactButton.Button,
              {
                type: "button",
                className: "vds-editor-toolbar-text-button",
                variant: "soft",
                color: "danger",
                size: "sm",
                disabled: richControlsDisabled,
                leftSection: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.Icon, { icon: reactIcons.IconLinkOff, size: "sm" }),
                onMouseDown: (event) => event.preventDefault(),
                onClick: () => {
                  clearLink(editor, selectionRef.current);
                  closeLinkEditor();
                },
                children: "Remove"
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(
              reactButton.Button,
              {
                type: "button",
                className: "vds-editor-toolbar-text-button",
                variant: "ghost",
                color: "contrast",
                size: "sm",
                onMouseDown: (event) => event.preventDefault(),
                onClick: closeLinkEditor,
                children: "Cancel"
              }
            )
          ] })
        ] }) : null
      ]
    }
  );
}
function resolvePartProps(value) {
  if (value === false) return [false, {}];
  if (value === true || value === void 0) return [true, {}];
  return [true, value];
}
function applyMergedEditorRef(target, editor) {
  if (!target) return;
  if (typeof target === "function") {
    target(editor);
    return;
  }
  target.current = editor;
}
function Editor({
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
  spellCheck
}) {
  const [toolbarEnabled, toolbarProps] = resolvePartProps(
    toolbar ?? preset === "pro"
  );
  const [insertMenuEnabled, insertMenuProps] = resolvePartProps(
    insertMenu ?? preset === "pro"
  );
  const [statusBarEnabled, statusBarProps] = resolvePartProps(
    statusBar ?? preset === "pro"
  );
  const [slashMenuEnabled, slashMenuProps] = resolvePartProps(
    slashMenu ?? preset === "pro"
  );
  const [floatingToolbarEnabled, floatingToolbarProps] = resolvePartProps(
    floatingToolbar ?? preset === "pro"
  );
  const [modeSwitcherEnabled, modeSwitcherProps] = resolvePartProps(
    modeSwitcher ?? preset === "pro"
  );
  const internalEditorRef = react.useRef(null);
  const appliedModeRef = react.useRef("rich-text");
  const commentSelectionRef = react.useRef(null);
  const sourceValueRef = react.useRef("");
  const [uncontrolledMode, setUncontrolledMode] = react.useState(defaultMode);
  const [surfaceElement, setSurfaceElement] = react.useState(null);
  const [comments, setComments] = react.useState([]);
  const [commentComposerOpen, setCommentComposerOpen] = react.useState(false);
  const [commentDraft, setCommentDraft] = react.useState("");
  const [pendingCommentQuote, setPendingCommentQuote] = react.useState("");
  const [sourceValue, setSourceValue] = react.useState("");
  const activeMode = mode ?? uncontrolledMode;
  const resolvedFeatures = resolveEditorFeatures(preset, features);
  const blockToolsPlacement = blockTools?.placement ?? "inside";
  const resolvedMarkdownTransformers = markdownTransformers ?? DEFAULT_MARKDOWN_TRANSFORMERS;
  const metricsCharset = resolvedFeatures.characterLimit?.charset ?? "UTF-16";
  function publishComments(nextComments) {
    setComments(nextComments);
    onCommentsChange?.(nextComments);
  }
  function handleComposerChange(payload) {
    if (!onChange) {
      return;
    }
    const effectiveMode = appliedModeRef.current;
    let nextPayload = payload;
    if (effectiveMode !== "rich-text" && internalEditorRef.current) {
      const source = readSourceValue(
        internalEditorRef.current,
        effectiveMode,
        resolvedMarkdownTransformers
      );
      nextPayload = {
        ...payload,
        text: source,
        html: effectiveMode === "html" ? source : "",
        markdown: effectiveMode === "markdown" ? source : "",
        json: null,
        characterCount: countCharacters(source, metricsCharset),
        wordCount: countWords(source),
        isEmpty: source.trim().length === 0
      };
    }
    onChange(nextPayload);
  }
  function applyModeToEditor(nextMode, previousMode = appliedModeRef.current) {
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
          resolvedMarkdownTransformers
        );
      }
      if (nextMode !== "rich-text") {
        const nextSource = readSourceValue(
          internalEditorRef.current,
          nextMode,
          resolvedMarkdownTransformers
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
  react.useEffect(() => {
    if (activeMode === appliedModeRef.current) {
      return;
    }
    applyModeToEditor(activeMode);
  }, [activeMode, resolvedMarkdownTransformers]);
  function handleModeChange(nextMode) {
    if (nextMode === activeMode) {
      return;
    }
    if (mode !== void 0) {
      onModeChange?.(nextMode);
      return;
    }
    if (!applyModeToEditor(nextMode)) {
      return;
    }
    setUncontrolledMode(nextMode);
    onModeChange?.(nextMode);
  }
  function handleSourceValueChange(nextValue) {
    sourceValueRef.current = nextValue;
    setSourceValue(nextValue);
    if (!onChange || !internalEditorRef.current) {
      return;
    }
    onChange({
      editor: internalEditorRef.current,
      editorState: internalEditorRef.current.getEditorState(),
      tags: /* @__PURE__ */ new Set(),
      text: nextValue,
      html: activeMode === "html" ? nextValue : "",
      markdown: activeMode === "markdown" ? nextValue : "",
      json: null,
      characterCount: countCharacters(nextValue, metricsCharset),
      wordCount: countWords(nextValue),
      isEmpty: nextValue.trim().length === 0
    });
  }
  function requestComment() {
    if (!resolvedFeatures.comments || !internalEditorRef.current) {
      return;
    }
    internalEditorRef.current.getEditorState().read(() => {
      const selection = lexical.$getSelection();
      if (!lexical.$isRangeSelection(selection) || selection.isCollapsed()) {
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
    const commentId = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `comment-${Date.now()}`;
    wrapSelectionInComment(
      internalEditorRef.current,
      commentId,
      commentSelectionRef.current
    );
    publishComments([
      {
        id: commentId,
        quote: pendingCommentQuote,
        body,
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        status: "open"
      },
      ...comments
    ]);
    closeCommentComposer();
  }
  function resolveComment(commentId) {
    publishComments(
      comments.map(
        (comment) => comment.id === commentId ? { ...comment, status: "resolved" } : comment
      )
    );
  }
  function removeComment(commentId) {
    if (internalEditorRef.current) {
      removeCommentMark(internalEditorRef.current, commentId);
    }
    publishComments(
      comments.filter((comment) => comment.id !== commentId)
    );
  }
  const utilityBarVisible = !toolbarEnabled && (insertMenuEnabled && activeMode === "rich-text" || modeSwitcherEnabled);
  return /* @__PURE__ */ jsxRuntime.jsx(
    EditorComposer,
    {
      namespace,
      initialValue,
      initialValueFormat,
      activeMode,
      onChange: handleComposerChange,
      onError,
      autoFocus,
      features,
      linkMatchers,
      markdownTransformers,
      editorRef: (editor) => {
        internalEditorRef.current = editor;
        applyMergedEditorRef(editorRef, editor);
      },
      preset,
      readOnly,
      children: /* @__PURE__ */ jsxRuntime.jsxs(
        "div",
        {
          className: utils.cn("vds-editor", className),
          style,
          "data-read-only": readOnly || void 0,
          "data-mode": activeMode,
          "data-block-tools-placement": resolvedFeatures.draggableBlocks && activeMode === "rich-text" ? blockToolsPlacement : void 0,
          children: [
            utilityBarVisible ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-editor-utility-bar", children: [
              /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-editor-utility-start", children: insertMenuEnabled && activeMode === "rich-text" ? /* @__PURE__ */ jsxRuntime.jsx(EditorInsertMenu, { ...insertMenuProps }) : null }),
              /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-editor-utility-end", children: modeSwitcherEnabled ? /* @__PURE__ */ jsxRuntime.jsx(
                EditorModeSwitcher,
                {
                  ...modeSwitcherProps,
                  value: activeMode,
                  onChange: handleModeChange
                }
              ) : null })
            ] }) : null,
            toolbarEnabled ? /* @__PURE__ */ jsxRuntime.jsx(
              EditorToolbar,
              {
                ...toolbarProps,
                insertMenu: insertMenuEnabled && activeMode === "rich-text" ? insertMenuProps : null,
                modeSwitcher: modeSwitcherEnabled ? modeSwitcherProps : null,
                mode: activeMode,
                onModeChange: handleModeChange,
                onRequestComment: requestComment
              }
            ) : null,
            activeMode === "rich-text" ? /* @__PURE__ */ jsxRuntime.jsx(
              EditorSurface,
              {
                ref: setSurfaceElement,
                id,
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
                placeholder,
                placeholderText,
                className: surfaceClassName,
                style: surfaceStyle,
                contentClassName,
                contentStyle,
                placeholderClassName,
                minHeight,
                maxHeight
              }
            ) : /* @__PURE__ */ jsxRuntime.jsx(
              EditorSourcePanel,
              {
                mode: activeMode,
                onChange: handleSourceValueChange,
                minHeight,
                maxHeight,
                value: sourceValue
              }
            ),
            resolvedFeatures.comments && activeMode === "rich-text" ? /* @__PURE__ */ jsxRuntime.jsx(
              EditorCommentsPanel,
              {
                composerOpen: commentComposerOpen,
                draft: commentDraft,
                pendingQuote: pendingCommentQuote,
                threads: comments,
                onDraftChange: setCommentDraft,
                onSubmit: submitComment,
                onCancel: closeCommentComposer,
                onResolve: resolveComment,
                onRemove: removeComment
              }
            ) : null,
            statusBarEnabled && activeMode === "rich-text" ? /* @__PURE__ */ jsxRuntime.jsx(EditorStatusBar, { ...statusBarProps }) : null,
            slashMenuEnabled && activeMode === "rich-text" ? /* @__PURE__ */ jsxRuntime.jsx(EditorSlashMenu, { ...slashMenuProps }) : null,
            floatingToolbarEnabled && activeMode === "rich-text" ? /* @__PURE__ */ jsxRuntime.jsx(
              EditorFloatingToolbar,
              {
                ...floatingToolbarProps,
                anchorElement: surfaceElement,
                onRequestComment: requestComment
              }
            ) : null,
            resolvedFeatures.tables && activeMode === "rich-text" ? /* @__PURE__ */ jsxRuntime.jsx(EditorTableHoverActions, { anchorElement: surfaceElement }) : null,
            resolvedFeatures.draggableBlocks && activeMode === "rich-text" ? /* @__PURE__ */ jsxRuntime.jsx(
              EditorDraggableBlocks,
              {
                anchorElement: surfaceElement,
                className: blockTools?.className,
                placement: blockToolsPlacement
              }
            ) : null
          ]
        }
      )
    }
  );
}
function isInvalid(value) {
  return value !== void 0 && value !== false && value !== "false";
}
function EditorField({
  label,
  description,
  error,
  counter,
  metaLayout,
  descriptionAlign,
  errorAlign,
  counterAlign,
  labelProps,
  className,
  style,
  editorClassName,
  editorStyle,
  invalid,
  id,
  readOnly,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  ...props
}) {
  const generatedId = react.useId();
  const controlId = id ?? `vds-editor-field-${generatedId}`;
  const labelId = label ? `${controlId}-label` : void 0;
  const descriptionId = description ? `${controlId}-description` : void 0;
  const errorId = error ? `${controlId}-error` : void 0;
  const counterId = counter !== void 0 ? `${controlId}-counter` : void 0;
  const describedBy = reactFieldset.composeFieldDescribedBy(
    ariaDescribedBy,
    descriptionId,
    errorId,
    counterId
  );
  const resolvedInvalid = invalid ?? isInvalid(ariaInvalid);
  return /* @__PURE__ */ jsxRuntime.jsx(
    reactFieldset.Field,
    {
      className: utils.cn("vds-editor-field", className),
      style,
      label,
      labelProps: {
        ...labelProps,
        id: labelId
      },
      description,
      error,
      counter,
      invalid: resolvedInvalid,
      disabled: readOnly,
      descriptionId,
      errorId,
      counterId,
      metaLayout,
      descriptionAlign,
      errorAlign,
      counterAlign,
      children: /* @__PURE__ */ jsxRuntime.jsx(
        Editor,
        {
          ...props,
          id: controlId,
          readOnly,
          className: editorClassName,
          style: editorStyle,
          "aria-labelledby": labelId,
          "aria-describedby": describedBy,
          "aria-invalid": resolvedInvalid || void 0
        }
      )
    }
  );
}

// src/index.ts
var EditorParts = {
  Composer: EditorComposer,
  DraggableBlocks: EditorDraggableBlocks,
  Surface: EditorSurface,
  CommentsPanel: EditorCommentsPanel,
  FloatingToolbar: EditorFloatingToolbar,
  InsertMenu: EditorInsertMenu,
  ModeSwitcher: EditorModeSwitcher,
  Toolbar: EditorToolbar,
  StatusBar: EditorStatusBar,
  SlashMenu: EditorSlashMenu,
  Field: EditorField
};

exports.$createEditorMediaNode = $createEditorMediaNode;
exports.$isEditorMediaNode = $isEditorMediaNode;
exports.DEFAULT_CORE_FEATURES = DEFAULT_CORE_FEATURES;
exports.DEFAULT_LINK_MATCHERS = DEFAULT_LINK_MATCHERS;
exports.DEFAULT_MARKDOWN_TRANSFORMERS = DEFAULT_MARKDOWN_TRANSFORMERS;
exports.DEFAULT_PRO_FEATURES = DEFAULT_PRO_FEATURES;
exports.EDITOR_THEME = EDITOR_THEME;
exports.Editor = Editor;
exports.EditorCommentsPanel = EditorCommentsPanel;
exports.EditorComposer = EditorComposer;
exports.EditorDraggableBlocks = EditorDraggableBlocks;
exports.EditorField = EditorField;
exports.EditorFloatingToolbar = EditorFloatingToolbar;
exports.EditorInsertMenu = EditorInsertMenu;
exports.EditorMediaNode = EditorMediaNode;
exports.EditorModeSwitcher = EditorModeSwitcher;
exports.EditorParts = EditorParts;
exports.EditorSlashMenu = EditorSlashMenu;
exports.EditorStatusBar = EditorStatusBar;
exports.EditorSurface = EditorSurface;
exports.EditorToolbar = EditorToolbar;
exports.buildEditorNodes = buildEditorNodes;
exports.createInitialEditorState = createInitialEditorState;
exports.resolveEditorFeatures = resolveEditorFeatures;
exports.useEditorContext = useEditorContext;
