import {
  $generateHtmlFromNodes,
  $generateNodesFromDOM,
} from "@lexical/html";
import {
  $toggleLink,
  $isLinkNode,
  formatUrl,
} from "@lexical/link";
import {
  $createListItemNode,
  $createListNode,
  $isListNode,
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import {
  $convertFromMarkdownString,
  $convertToMarkdownString,
  type Transformer,
} from "@lexical/markdown";
import {
  $getSelectionStyleValueForProperty,
  $patchStyleText,
  $setBlocksType,
} from "@lexical/selection";
import {
  $isMarkNode,
  $unwrapMarkNode,
  $wrapSelectionInMarkNode,
} from "@lexical/mark";
import {
  $createHeadingNode,
  $isHeadingNode,
  $isQuoteNode,
  $createQuoteNode,
} from "@lexical/rich-text";
import {
  INSERT_TABLE_COMMAND,
  $createTableNodeWithDimensions,
} from "@lexical/table";
import {
  $createCodeNode,
  $isCodeNode,
  DEFAULT_CODE_LANGUAGE,
} from "@lexical/code";
import {
  $createHorizontalRuleNode,
} from "@lexical/react/LexicalHorizontalRuleNode";
import type {
  EditorState,
  ElementFormatType,
  LexicalNode,
  LexicalEditor,
  RangeSelection,
  SerializedEditorState,
  TextFormatType,
} from "lexical";
import {
  $createParagraphNode,
  $createTextNode,
  $getNearestNodeFromDOMNode,
  $insertNodes,
  $findMatchingParent,
  $getRoot,
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  $setSelection,
  CLEAR_EDITOR_COMMAND,
  COMMAND_PRIORITY_LOW,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  INDENT_CONTENT_COMMAND,
  REDO_COMMAND,
  OUTDENT_CONTENT_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import type {
  EditorBlockType,
  EditorChangePayload,
  EditorCharset,
  EditorElementAlignment,
  EditorMetrics,
  EditorMode,
  EditorValueFormat,
} from "./types";
import { applySerializedEditorValue } from "./defaults";
import {
  $createEditorMediaNode,
  type EditorMediaKind,
} from "./EditorMediaNode";

export type EditorInsertBlockKind =
  | EditorBlockType
  | "divider"
  | "embed"
  | "image"
  | "table"
  | "video";

export interface EditorMediaPayload {
  alt?: string;
  src: string;
}

export interface ToolbarState {
  blockType: EditorBlockType;
  elementFormat: EditorElementAlignment;
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  isStrikethrough: boolean;
  isInlineCode: boolean;
  isSubscript: boolean;
  isSuperscript: boolean;
  isLowercase: boolean;
  isUppercase: boolean;
  isCapitalize: boolean;
  isLink: boolean;
  linkUrl: string;
  fontFamily: string;
  fontSize: string;
  fontColor: string;
  bgColor: string;
}

export const EMPTY_EDITOR_METRICS: EditorMetrics = {
  text: "",
  html: "",
  markdown: "",
  json: null,
  characterCount: 0,
  wordCount: 0,
  isEmpty: true,
};

export const EMPTY_TOOLBAR_STATE: ToolbarState = {
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
  isLink: false,
  linkUrl: "",
  fontFamily: "var(--vds-font-sans)",
  fontSize: "var(--vds-text-base)",
  fontColor: "var(--vds-color-neutral-12)",
  bgColor: "transparent",
};

export function countCharacters(text: string, charset: EditorCharset) {
  if (charset === "UTF-8") {
    return new TextEncoder().encode(text).length;
  }

  return text.length;
}

export function countWords(text: string) {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).filter(Boolean).length;
}

export function buildEditorChangePayload(
  editor: LexicalEditor,
  editorState: EditorState,
  markdownTransformers: Transformer[],
  charset: EditorCharset,
  tags: Set<string>,
): EditorChangePayload {
  let text = "";
  let html = "";
  let markdown = "";
  let isEmpty = true;

  editorState.read(() => {
    const root = $getRoot();
    text = root.getTextContent();
    html = $generateHtmlFromNodes(editor, null);
    markdown = $convertToMarkdownString(markdownTransformers);
    isEmpty = text.trim().length === 0;
  });

  const json = editorState.toJSON() as SerializedEditorState;

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
    isEmpty,
  };
}

export function readEditorSnapshot(
  editor: LexicalEditor,
  markdownTransformers: Transformer[],
  charset: EditorCharset = "UTF-16",
) {
  return buildEditorChangePayload(
    editor,
    editor.getEditorState(),
    markdownTransformers,
    charset,
    new Set(),
  );
}

function getSourceModeLanguage(mode: Exclude<EditorMode, "rich-text">) {
  return mode === "markdown" ? "markdown" : "html";
}

function getSourceModeCodeText(
  root: ReturnType<typeof $getRoot>,
  mode: Exclude<EditorMode, "rich-text">,
) {
  const firstChild = root.getFirstChild();

  if ($isCodeNode(firstChild) && firstChild.getLanguage() === getSourceModeLanguage(mode)) {
    return firstChild.getTextContent();
  }

  return root.getTextContent();
}

function formatHtmlSource(html: string) {
  const normalized = html
    .replace(/>\s*</g, ">\n<")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  if (!normalized) {
    return "";
  }

  let depth = 0;

  return normalized
    .split("\n")
    .map((rawLine) => rawLine.trim())
    .filter(Boolean)
    .map((line) => {
      const isClosingTag = /^<\//.test(line);
      const isSelfClosingTag =
        /\/>$/.test(line) ||
        /^<!/.test(line) ||
        /^<br\b/i.test(line) ||
        /^<hr\b/i.test(line) ||
        /^<img\b/i.test(line) ||
        /^<input\b/i.test(line) ||
        /^<meta\b/i.test(line) ||
        /^<link\b/i.test(line);
      const opensTag =
        /^<[^/!][^>]*>$/.test(line) &&
        !/<\/[^>]+>$/.test(line) &&
        !isSelfClosingTag;

      if (isClosingTag) {
        depth = Math.max(depth - 1, 0);
      }

      const formatted = `${"  ".repeat(depth)}${line}`;

      if (opensTag) {
        depth += 1;
      }

      return formatted;
    })
    .join("\n");
}

export function readSourceValue(
  editor: LexicalEditor,
  mode: Exclude<EditorMode, "rich-text">,
  markdownTransformers: Transformer[],
) {
  return editor.getEditorState().read(() => {
    const root = $getRoot();
    const existingCodeText = getSourceModeCodeText(root, mode);

    if (existingCodeText.trim().length > 0 || $isCodeNode(root.getFirstChild())) {
      return existingCodeText;
    }

    if (mode === "markdown") {
      return $convertToMarkdownString(markdownTransformers);
    }

    return formatHtmlSource($generateHtmlFromNodes(editor, null));
  });
}

export function writeSourceValue(
  editor: LexicalEditor,
  mode: Exclude<EditorMode, "rich-text">,
  source: string,
) {
  editor.update(() => {
    const root = $getRoot();
    const code = $createCodeNode(getSourceModeLanguage(mode));

    root.clear().append(code);
    code.select().insertRawText(source);
    code.select(0, 0);
  });
}

export function enterSourceMode(
  editor: LexicalEditor,
  mode: Exclude<EditorMode, "rich-text">,
  markdownTransformers: Transformer[],
) {
  editor.update(() => {
    const root = $getRoot();
    const source =
      mode === "markdown"
        ? $convertToMarkdownString(markdownTransformers)
        : formatHtmlSource($generateHtmlFromNodes(editor, null));
    const code = $createCodeNode(getSourceModeLanguage(mode));

    root.clear().append(code);
    code.select().insertRawText(source);
    code.select(0, 0);
  });
}

export function exitSourceMode(
  editor: LexicalEditor,
  mode: Exclude<EditorMode, "rich-text">,
  markdownTransformers: Transformer[],
) {
  editor.update(() => {
    const root = $getRoot();
    const source = getSourceModeCodeText(root, mode);

    root.clear().select();

    if (source.trim().length === 0) {
      root.append($createParagraphNode()).select();
      return;
    }

    if (mode === "markdown") {
      $convertFromMarkdownString(source, markdownTransformers);
    } else {
      const parser = new DOMParser();
      const dom = parser.parseFromString(source, "text/html");
      const nodes = $generateNodesFromDOM(editor, dom);

      if (nodes.length === 0) {
        root.append($createParagraphNode()).select();
        return;
      }

      $insertNodes(nodes);
    }

    if (root.isEmpty()) {
      root.append($createParagraphNode()).select();
    }
  });
}

export function readToolbarState(): ToolbarState {
  const selection = $getSelection();

  if (!$isRangeSelection(selection)) {
    return EMPTY_TOOLBAR_STATE;
  }

  const anchorNode = selection.anchor.getNode();
  const topLevel = anchorNode.getKey() === "root"
    ? null
    : anchorNode.getTopLevelElementOrThrow();
  const listNode = $findMatchingParent(anchorNode, $isListNode);
  const linkNode = $findMatchingParent(anchorNode, $isLinkNode);
  const linkParentElement = linkNode
    ? $findMatchingParent(
        anchorNode,
        (parentNode) => $isElementNode(parentNode) && !parentNode.isInline(),
      )
    : null;

  let blockType: EditorBlockType = "paragraph";
  let elementFormat: EditorElementAlignment = "left";

  if (listNode) {
    const listType = listNode.getListType();
    blockType =
      listType === "number"
        ? "number"
        : listType === "check"
          ? "check"
          : "bullet";
  } else if (topLevel && $isHeadingNode(topLevel)) {
    const tag = topLevel.getTag();
    blockType =
      tag === "h1" || tag === "h2" || tag === "h3" ? tag : "paragraph";
  } else if (topLevel && $isQuoteNode(topLevel)) {
    blockType = "quote";
  } else if (topLevel && $isCodeNode(topLevel)) {
    blockType = "code";
  }

  const elementForFormat =
    ($isElementNode(linkParentElement) ? linkParentElement : null) ??
    ($isElementNode(topLevel) ? topLevel : null);

  if (elementForFormat) {
    const formatType = elementForFormat.getFormatType();
    elementFormat =
      formatType === ""
        ? "left"
        : (formatType as EditorElementAlignment);
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
    isLink: Boolean(linkNode),
    linkUrl: linkNode?.getURL() ?? "",
    fontFamily: $getSelectionStyleValueForProperty(
      selection,
      "font-family",
      "var(--vds-font-sans)",
    ),
    fontSize: $getSelectionStyleValueForProperty(
      selection,
      "font-size",
      "var(--vds-text-base)",
    ),
    fontColor: $getSelectionStyleValueForProperty(
      selection,
      "color",
      "var(--vds-color-neutral-12)",
    ),
    bgColor: $getSelectionStyleValueForProperty(
      selection,
      "background-color",
      "transparent",
    ),
  };
}

export function applyBlockType(
  editor: LexicalEditor,
  blockType: EditorBlockType,
) {
  editor.update(() => {
    const selection = $getSelection();
    if (!$isRangeSelection(selection)) return;

    switch (blockType) {
      case "h1":
      case "h2":
      case "h3":
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

export function toggleList(editor: LexicalEditor, activeType: EditorBlockType) {
  if (activeType === "bullet" || activeType === "number" || activeType === "check") {
    editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
  }
}

export function toggleBulletList(
  editor: LexicalEditor,
  activeType: EditorBlockType,
) {
  if (activeType === "bullet") {
    editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    return;
  }
  editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
}

export function toggleNumberList(
  editor: LexicalEditor,
  activeType: EditorBlockType,
) {
  if (activeType === "number") {
    editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    return;
  }
  editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
}

export function toggleCheckList(
  editor: LexicalEditor,
  activeType: EditorBlockType,
) {
  if (activeType === "check") {
    editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    return;
  }
  editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
}

export function insertDefaultTable(
  editor: LexicalEditor,
  rows = 3,
  columns = 3,
) {
  editor.dispatchCommand(INSERT_TABLE_COMMAND, {
    rows: String(rows),
    columns: String(columns),
    includeHeaders: true,
  });
}

export function applyLink(
  editor: LexicalEditor,
  url: string,
  selectionSnapshot?: RangeSelection | null,
) {
  const formattedUrl = formatUrl(url);

  editor.update(() => {
    const selection = resolveRangeSelection(selectionSnapshot);

    if (!selection) {
      return;
    }

    const linkNode = getSelectionLinkNode(selection);

    if (linkNode && selection.isCollapsed()) {
      linkNode
        .setURL(formattedUrl)
        .setTarget("_blank")
        .setRel("noopener noreferrer");
      return;
    }

    $toggleLink({
      url: formattedUrl,
      target: "_blank",
      rel: "noopener noreferrer",
    });
  });
  editor.focus();
}

export function clearLink(
  editor: LexicalEditor,
  selectionSnapshot?: RangeSelection | null,
) {
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

export function clearEditor(editor: LexicalEditor) {
  editor.focus();
  editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
}

function resolveRangeSelection(
  selectionSnapshot?: RangeSelection | null,
) {
  if (selectionSnapshot) {
    $setSelection(selectionSnapshot.clone());
  }

  const selection = $getSelection();
  return $isRangeSelection(selection) ? selection : null;
}

function getSelectionLinkNode(selection: RangeSelection) {
  const anchorNode = selection.anchor.getNode();
  const focusNode = selection.focus.getNode();
  const anchorLinkNode = $isLinkNode(anchorNode)
    ? anchorNode
    : $findMatchingParent(anchorNode, $isLinkNode);

  if (anchorLinkNode) {
    return anchorLinkNode;
  }

  return $isLinkNode(focusNode)
    ? focusNode
    : $findMatchingParent(focusNode, $isLinkNode);
}

function unwrapLinkNode(linkNode: NonNullable<ReturnType<typeof getSelectionLinkNode>>) {
  const children = linkNode.getChildren();

  for (const child of children) {
    linkNode.insertBefore(child);
  }

  linkNode.remove();
}

export function applyTextStyles(
  editor: LexicalEditor,
  styles: Record<string, string>,
  selectionSnapshot?: RangeSelection | null,
  skipHistoryStack = false,
) {
  editor.update(
    () => {
      const selection = resolveRangeSelection(selectionSnapshot);

      if (!selection) {
        return;
      }

      $patchStyleText(selection, styles);
    },
    skipHistoryStack ? { tag: "historic" } : {},
  );
}

export function applySourceValue(
  editor: LexicalEditor,
  value: string,
  format: Extract<EditorValueFormat, "html" | "markdown">,
  markdownTransformers: Transformer[],
) {
  applySerializedEditorValue(editor, value, format, markdownTransformers);
}

export function undo(editor: LexicalEditor) {
  editor.dispatchCommand(UNDO_COMMAND, undefined);
}

export function redo(editor: LexicalEditor) {
  editor.dispatchCommand(REDO_COMMAND, undefined);
}

export function formatText(
  editor: LexicalEditor,
  format: TextFormatType,
) {
  editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
}

export function formatElement(
  editor: LexicalEditor,
  format: ElementFormatType,
) {
  editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, format);
}

export function indentContent(editor: LexicalEditor) {
  editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined);
}

export function outdentContent(editor: LexicalEditor) {
  editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined);
}

function insertAfterNode(
  targetNode: LexicalNode | null,
  nodes: LexicalNode[],
) {
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

function resolveInsertionTargetNode(targetBlockElement?: HTMLElement | null) {
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

function createListBlock(kind: Extract<EditorBlockType, "bullet" | "number" | "check">) {
  const list = $createListNode(kind);
  const item = $createListItemNode(kind === "check" ? false : undefined);
  const paragraph = createSelectableParagraph();

  item.append(paragraph);
  list.append(item);

  return {
    nodes: [list],
    focusNode: paragraph,
  };
}

function createBlockInsertion(kind: EditorInsertBlockKind) {
  switch (kind) {
    case "paragraph": {
      const paragraph = createSelectableParagraph();
      return {
        nodes: [paragraph],
        focusNode: paragraph,
      };
    }
    case "h1":
    case "h2":
    case "h3": {
      const heading = $createHeadingNode(kind);
      heading.append($createTextNode(""));
      return {
        nodes: [heading],
        focusNode: heading,
      };
    }
    case "quote": {
      const quote = $createQuoteNode();
      quote.append($createTextNode(""));
      return {
        nodes: [quote],
        focusNode: quote,
      };
    }
    case "code": {
      const code = $createCodeNode(DEFAULT_CODE_LANGUAGE);
      const paragraph = createSelectableParagraph();

      code.append($createTextNode(""));
      return {
        nodes: [code, paragraph],
        focusNode: code,
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
        focusNode: paragraph,
      };
    }
    case "divider": {
      const divider = $createHorizontalRuleNode();
      const paragraph = createSelectableParagraph();
      return {
        nodes: [divider, paragraph],
        focusNode: paragraph,
      };
    }
    case "image":
    case "embed":
    case "video": {
      const media = $createEditorMediaNode(kind as EditorMediaKind);
      const paragraph = createSelectableParagraph();

      return {
        nodes: [media, paragraph],
        focusNode: paragraph,
      };
    }
  }
}

export function insertBlock(
  editor: LexicalEditor,
  kind: EditorInsertBlockKind,
  targetBlockElement?: HTMLElement | null,
) {
  editor.update(() => {
    const targetNode = resolveInsertionTargetNode(targetBlockElement);
    const { nodes, focusNode } = createBlockInsertion(kind);

    insertAfterNode(targetNode, nodes);
    focusNode.select();
  });
}

export function insertMediaBlock(
  editor: LexicalEditor,
  kind: EditorMediaKind,
  payload: EditorMediaPayload,
  targetBlockElement?: HTMLElement | null,
) {
  editor.update(() => {
    const targetNode = resolveInsertionTargetNode(targetBlockElement);
    const media = $createEditorMediaNode(kind, payload.src, payload.alt ?? "");
    const paragraph = createSelectableParagraph();

    insertAfterNode(targetNode, [media, paragraph]);
    paragraph.select();
  });
}

export function getSelectionText(
  selectionSnapshot?: RangeSelection | null,
) {
  return selectionSnapshot?.getTextContent().trim() ?? "";
}

export function wrapSelectionInComment(
  editor: LexicalEditor,
  commentId: string,
  selectionSnapshot?: RangeSelection | null,
) {
  editor.update(() => {
    const selection = resolveRangeSelection(selectionSnapshot);

    if (!selection || selection.isCollapsed()) {
      return;
    }

    $wrapSelectionInMarkNode(selection, selection.isBackward(), commentId);
  });
}

function visitDescendants(
  node: LexicalNode,
  visitor: (child: LexicalNode) => void,
) {
  if (!$isElementNode(node)) {
    return;
  }

  for (const child of node.getChildren()) {
    visitor(child);
    visitDescendants(child, visitor);
  }
}

export function removeCommentMark(
  editor: LexicalEditor,
  commentId: string,
) {
  editor.update(() => {
    const root = $getRoot();
    const marksToUpdate: Array<LexicalNode> = [];

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

export { CAN_REDO_COMMAND, CAN_UNDO_COMMAND, COMMAND_PRIORITY_LOW };
