import {
  createLinkMatcherWithRegExp,
  type LinkMatcher,
} from "@lexical/react/LexicalAutoLinkPlugin";
import { TRANSFORMERS, type Transformer } from "@lexical/markdown";
import { OverflowNode } from "@lexical/overflow";
import {
  AutoLinkNode,
  LinkNode,
} from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { MarkNode } from "@lexical/mark";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import {
  HorizontalRuleNode,
} from "@lexical/react/LexicalHorizontalRuleNode";
import { EditorMediaNode } from "./EditorMediaNode";
import type {
  InitialEditorStateType,
  Klass,
  LexicalEditor,
  LexicalNode,
  SerializedEditorState,
} from "lexical";
import { $generateNodesFromDOM } from "@lexical/html";
import { $convertFromMarkdownString } from "@lexical/markdown";
import {
  $createParagraphNode,
  $getRoot,
  $insertNodes,
} from "lexical";
import type {
  EditorCharacterLimitOptions,
  EditorFeatureOptions,
  EditorPreset,
  EditorValueFormat,
  ResolvedEditorFeatureOptions,
} from "./types";

const URL_MATCHER =
  /((https?:\/\/(www\.)?)|(www\.))[-A-Za-z0-9@:%._+~#=]{1,256}\.[A-Za-z0-9()]{1,24}\b([-A-Za-z0-9()@:%_+.~#?&//=]*)/;

const EMAIL_MATCHER =
  /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([A-Za-z0-9-]+\.)+[A-Za-z]{2,})/;

export const DEFAULT_LINK_MATCHERS: LinkMatcher[] = [
  createLinkMatcherWithRegExp(URL_MATCHER, (text) =>
    text.startsWith("http") ? text : `https://${text}`,
  ),
  createLinkMatcherWithRegExp(EMAIL_MATCHER, (text) => `mailto:${text}`),
];

export const DEFAULT_MARKDOWN_TRANSFORMERS: Transformer[] = TRANSFORMERS;

export const DEFAULT_CORE_FEATURES: ResolvedEditorFeatureOptions = {
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
  characterLimit: null,
};

export const DEFAULT_PRO_FEATURES: ResolvedEditorFeatureOptions = {
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
  shortcuts: true,
};

function resolveCharacterLimit(
  value: EditorFeatureOptions["characterLimit"],
): EditorCharacterLimitOptions | null {
  if (typeof value === "number") {
    return {
      maxLength: value,
      charset: "UTF-16",
    };
  }

  if (!value) return null;

  return {
    maxLength: value.maxLength,
    charset: value.charset ?? "UTF-16",
  };
}

export function resolveEditorFeatures(
  preset: EditorPreset,
  features?: EditorFeatureOptions,
): ResolvedEditorFeatureOptions {
  const base =
    preset === "pro" ? DEFAULT_PRO_FEATURES : DEFAULT_CORE_FEATURES;

  const next: ResolvedEditorFeatureOptions = {
    ...base,
    ...features,
    maxIndent: features?.maxIndent ?? base.maxIndent,
    characterLimit: resolveCharacterLimit(features?.characterLimit),
  };

  if (next.autoLinks) next.links = true;
  if (next.checklists) next.lists = true;

  return next;
}

export function buildEditorNodes(
  features: ResolvedEditorFeatureOptions,
): Array<Klass<LexicalNode>> {
  const nodes: Array<Klass<LexicalNode>> = [HeadingNode, QuoteNode];

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

export function applySerializedEditorValue(
  editor: LexicalEditor,
  value: string | SerializedEditorState | null | undefined,
  format: EditorValueFormat,
  markdownTransformers: Transformer[],
) {
  if (value == null) return;

  if (format === "json") {
    const serializedEditorState =
      typeof value === "string" ? value : JSON.stringify(value);
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

export function createInitialEditorState(
  initialValue: string | SerializedEditorState | null | undefined,
  initialValueFormat: EditorValueFormat,
  markdownTransformers: Transformer[],
): InitialEditorStateType | undefined {
  if (initialValue == null) return undefined;

  return (editor) => {
    applySerializedEditorValue(
      editor,
      initialValue,
      initialValueFormat,
      markdownTransformers,
    );
  };
}
