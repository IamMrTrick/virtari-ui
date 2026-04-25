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
    italic: "vds-editor-text-italic",
    strikethrough: "vds-editor-text-strikethrough",
    underline: "vds-editor-text-underline",
    underlineStrikethrough: "vds-editor-text-underline vds-editor-text-strikethrough"
  }
};
var EditorContext = react.createContext(null);
function useEditorContext() {
  const value = react.useContext(EditorContext);
  if (!value) {
    throw new Error(
      "Editor components must be rendered inside <EditorComposer>."
    );
  }
  return value;
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
function countCharacters(text, charset) {
  if (charset === "UTF-8") {
    return new TextEncoder().encode(text).length;
  }
  return text.length;
}
function countWords(text) {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).filter(Boolean).length;
}
function buildEditorChangePayload(editor, editorState, markdownTransformers, charset, tags) {
  let text = "";
  let html$1 = "";
  let markdown$1 = "";
  let isEmpty = true;
  editorState.read(() => {
    const root = lexical.$getRoot();
    text = root.getTextContent();
    html$1 = html.$generateHtmlFromNodes(editor, null);
    markdown$1 = markdown.$convertToMarkdownString(markdownTransformers);
    isEmpty = text.trim().length === 0;
  });
  const json = editorState.toJSON();
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
  editor.dispatchCommand(list.INSERT_UNORDERED_LIST_COMMAND, void 0);
}
function toggleNumberList(editor, activeType) {
  editor.dispatchCommand(list.INSERT_ORDERED_LIST_COMMAND, void 0);
}
function toggleCheckList(editor, activeType) {
  editor.dispatchCommand(list.INSERT_CHECK_LIST_COMMAND, void 0);
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
({
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
});
function hasPrimaryModifier(event) {
  return Boolean(event.ctrlKey || event.metaKey);
}

// src/EditorShortcutsPlugin.tsx
function isToolbarTarget(target) {
  return target instanceof HTMLElement && Boolean(target.closest("input, textarea, select, button, [role='menu']"));
}
function EditorShortcutsPlugin() {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  const { features, readOnly } = useEditorContext();
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
              toggleNumberList(editor);
              return true;
            case "8":
              if (!features.lists) return false;
              event.preventDefault();
              toggleBulletList(editor);
              return true;
            case "9":
              if (!features.checklists) return false;
              event.preventDefault();
              toggleCheckList(editor);
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
  children
}) {
  const resolvedFeatures = react.useMemo(
    () => resolveEditorFeatures(preset, features),
    [features, preset]
  );
  const [metrics, setMetrics] = react.useState(EMPTY_EDITOR_METRICS);
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
  return /* @__PURE__ */ jsxRuntime.jsx(LexicalComposer.LexicalComposer, { initialConfig, children: /* @__PURE__ */ jsxRuntime.jsxs(
    EditorContext.Provider,
    {
      value: {
        features: resolvedFeatures,
        metrics,
        linkMatchers,
        markdownTransformers,
        readOnly
      },
      children: [
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
              const payload = buildEditorChangePayload(
                editor,
                editorState,
                markdownTransformers,
                characterLimitCharset,
                tags
              );
              setMetrics(payload);
              onChange?.(payload);
            }
          }
        ),
        autoFocus ? /* @__PURE__ */ jsxRuntime.jsx(LexicalAutoFocusPlugin.AutoFocusPlugin, {}) : null,
        children
      ]
    }
  ) });
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
    const { readOnly } = useEditorContext();
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

exports.$createEditorMediaNode = $createEditorMediaNode;
exports.$isEditorMediaNode = $isEditorMediaNode;
exports.DEFAULT_CORE_FEATURES = DEFAULT_CORE_FEATURES;
exports.DEFAULT_LINK_MATCHERS = DEFAULT_LINK_MATCHERS;
exports.DEFAULT_MARKDOWN_TRANSFORMERS = DEFAULT_MARKDOWN_TRANSFORMERS;
exports.DEFAULT_PRO_FEATURES = DEFAULT_PRO_FEATURES;
exports.EDITOR_THEME = EDITOR_THEME;
exports.EditorComposer = EditorComposer;
exports.EditorMediaNode = EditorMediaNode;
exports.EditorSurface = EditorSurface;
exports.buildEditorNodes = buildEditorNodes;
exports.createInitialEditorState = createInitialEditorState;
exports.resolveEditorFeatures = resolveEditorFeatures;
exports.useEditorContext = useEditorContext;
