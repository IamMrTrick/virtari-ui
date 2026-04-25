import * as react_jsx_runtime from 'react/jsx-runtime';
import { CSSProperties } from 'react';
import { YooptaContentValue, YooptaOnChangeOptions, YooptaPath, YooptaPlugin, SlateElement, YooptaMark } from '@yoopta/editor';
export { Blocks, Elements, Marks, Paths, RenderBlockProps, SlateElement, YooEditor, YooptaBlock, YooptaBlockData, YooptaContentValue, YooptaOnChangeOptions, YooptaPath, YooptaPathIndex, YooptaPlugin, createYooptaEditor } from '@yoopta/editor';

type YooptaEditorProps = {
    value?: YooptaContentValue;
    onChange?: (value: YooptaContentValue, options: YooptaOnChangeOptions) => void;
    onPathChange?: (path: YooptaPath) => void;
    placeholder?: string;
    autoFocus?: boolean;
    readOnly?: boolean;
    className?: string;
    style?: CSSProperties;
};
declare function YooptaEditor({ value, onChange, onPathChange, placeholder, autoFocus, readOnly, className, style, }: YooptaEditorProps): react_jsx_runtime.JSX.Element;

type AnyPlugin = YooptaPlugin<Record<string, SlateElement>, Record<string, unknown>>;
declare const YOOPTA_PLUGINS: AnyPlugin[];

declare const YOOPTA_MARKS: YooptaMark<unknown>[];

/**
 * Curated starter content showcasing the most common block types.
 * Avoids plugin shapes that crash against @yoopta v6.0.3 (e.g. video).
 */
declare const playgroundInitialValue: YooptaContentValue;

export { playgroundInitialValue as STARTER_CONTENT, YOOPTA_MARKS, YOOPTA_PLUGINS, YooptaEditor, type YooptaEditorProps, playgroundInitialValue };
