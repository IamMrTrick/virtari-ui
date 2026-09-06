import "./YooptaEditor.css";
export { YooptaEditor } from "./YooptaEditor";
export type { YooptaEditorProps } from "./YooptaEditor";

export { YOOPTA_PLUGINS } from "./plugins";
export { YOOPTA_MARKS } from "./marks";
export { playgroundInitialValue, playgroundInitialValue as STARTER_CONTENT } from "./starter-content";

export type {
  YooptaContentValue,
  YooptaOnChangeOptions,
  YooptaPath,
  YooptaPathIndex,
  YooptaBlockData,
  YooptaBlock,
  YooptaPlugin,
  SlateElement,
  YooEditor,
  RenderBlockProps,
} from "@yoopta/editor";

export { createYooptaEditor, Blocks, Elements, Marks, Paths } from "@yoopta/editor";
