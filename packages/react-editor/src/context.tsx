import { createContext, useContext } from "react";
import type { LinkMatcher } from "@lexical/react/LexicalAutoLinkPlugin";
import type { Transformer } from "@lexical/markdown";
import type {
  EditorMetrics,
  ResolvedEditorFeatureOptions,
} from "./types";

export interface EditorConfigContextValue {
  features: ResolvedEditorFeatureOptions;
  linkMatchers: LinkMatcher[];
  markdownTransformers: Transformer[];
  readOnly: boolean;
}

const CONTEXT_ERROR =
  "Editor components must be rendered inside <EditorComposer>.";

export const EditorConfigContext =
  createContext<EditorConfigContextValue | null>(null);

export const EditorMetricsContext = createContext<EditorMetrics | null>(null);

export function useEditorConfig() {
  const value = useContext(EditorConfigContext);

  if (!value) {
    throw new Error(CONTEXT_ERROR);
  }

  return value;
}

export function useEditorMetrics() {
  const value = useContext(EditorMetricsContext);

  if (!value) {
    throw new Error(CONTEXT_ERROR);
  }

  return value;
}

export function useEditorContext() {
  const config = useEditorConfig();
  const metrics = useEditorMetrics();

  return {
    ...config,
    metrics,
  };
}

