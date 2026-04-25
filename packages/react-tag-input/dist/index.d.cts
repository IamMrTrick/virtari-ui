import * as react_jsx_runtime from 'react/jsx-runtime';
import { InputHTMLAttributes, Ref } from 'react';

type TagInputSize = "sm" | "md" | "lg";
interface TagInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "size"> {
    /** Current array of tag strings. */
    value: string[];
    /** Called whenever the tag list changes. */
    onChange: (tags: string[]) => void;
    /** Maximum number of tags. No limit by default. */
    maxTags?: number;
    /** Allow duplicate tag strings. Default: false. */
    allowDuplicates?: boolean;
    /** Custom validation — return true to allow, string for an error message. */
    validate?: (tag: string) => boolean | string;
    /** Characters that trigger tag creation (in addition to Enter). Default: [","]. */
    delimiters?: string[];
    size?: TagInputSize;
    invalid?: boolean;
    ref?: Ref<HTMLInputElement>;
}
declare function TagInput({ value, onChange, maxTags, allowDuplicates, validate, delimiters, size, disabled, invalid, placeholder, className, ref, id, ...rest }: TagInputProps): react_jsx_runtime.JSX.Element;

export { TagInput, type TagInputProps, type TagInputSize };
