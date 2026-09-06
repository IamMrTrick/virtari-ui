import { Bold, Italic, Underline, Strike, CodeMark, Highlight } from "@yoopta/marks";
import type { YooptaMark } from "@yoopta/editor";

export const YOOPTA_MARKS: YooptaMark<unknown>[] = [
  Bold as unknown as YooptaMark<unknown>,
  Italic as unknown as YooptaMark<unknown>,
  Underline as unknown as YooptaMark<unknown>,
  Strike as unknown as YooptaMark<unknown>,
  CodeMark as unknown as YooptaMark<unknown>,
  Highlight as unknown as YooptaMark<unknown>,
];
