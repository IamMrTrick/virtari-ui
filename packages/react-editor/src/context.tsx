import { createContext, useContext } from "react";
import type { LinkMatcher } from "@lexical/react/LexicalAutoLinkPlugin";
import type { Transformer } from "@lexical/markdown";
import type {
  EditorMetrics,
  ResolvedEditorFeatureOptions,
} from "./types";

export interface EditorContextValue {
  features: ResolvedEditorFeatureOptions;
  metrics: EditorMetrics;
  linkMatchers: LinkMatcher[];
  markdownTransformers: Transformer[];
  readOnly: boolean;
}

export const EditorContext = createContext<EditorContextValue | null>(null);

export function useEditorContext() {
  const value = useContext(EditorContext);

  if (!value) {
    throw new Error(
      "Editor components must be rendered inside <EditorComposer>.",
    );
  }

  return value;
}

