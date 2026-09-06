import { useEffect, useMemo, useState } from "react";
import type { LanguageSupport } from "@codemirror/language";
import { resolveLanguage, type CodeLanguage } from "./languages";

type ResolvedLanguage = LanguageSupport | LanguageSupport[] | null;

/** Never retain a previous grammar while resolving a new language. */
export function useCodeLanguage(language: CodeLanguage): ResolvedLanguage {
  const result = useMemo(() => resolveLanguage(language), [language]);
  const [loaded, setLoaded] = useState<{ source: typeof result; value: ResolvedLanguage }>();
  useEffect(() => {
    if (!(result instanceof Promise)) return;
    let cancelled = false;
    result.then(
      (value) => { if (!cancelled) setLoaded({ source: result, value }); },
      () => { if (!cancelled) setLoaded({ source: result, value: null }); },
    );
    return () => { cancelled = true; };
  }, [result]);
  return result instanceof Promise ? loaded?.source === result ? loaded.value : null : result;
}
