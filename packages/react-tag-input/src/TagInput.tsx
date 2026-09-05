import { cn, useComposedRefs, useFormReset } from "@virtari-packages/utils";
import { Chip, ChipLabel, ChipRemove } from "@virtari-packages/react-chip";
import {
  forwardRef,
  useRef,
  useId,
  type KeyboardEvent,
  type ClipboardEvent,
  type Ref,
  type InputHTMLAttributes,
} from "react";

export type TagInputSize = "sm" | "md" | "lg";

export interface TagInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "size"> {
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

function normalize(val: string) {
  return val.trim();
}


export const TagInput = forwardRef<HTMLInputElement, TagInputProps>(function TagInput({
  value, onChange, maxTags, allowDuplicates = false, validate, delimiters = [","],
  size = "md", disabled, readOnly, invalid, placeholder, className, id,
  onKeyDown, onPaste, name, form, required, ...rest
}, ref) {
  const inputRef = useRef<HTMLInputElement>(null);
  const mergedRef = useComposedRefs(inputRef, ref);
  const autoId = useId();
  const initialTags = useRef([...value]);
  const inputId = id ?? autoId;
  const isAtMax = maxTags !== undefined && value.length >= maxTags;
  useFormReset(inputRef, () => {
    if (inputRef.current) inputRef.current.value = "";
    onChange([...initialTags.current]);
  }, form);
  const addTags = (rawTags: string[]) => {
    if (disabled || readOnly) return false;
    const next = [...value];
    let accepted = false;
    for (const raw of rawTags) {
      const tag = normalize(raw);
      if (!tag || (maxTags !== undefined && next.length >= maxTags) || (!allowDuplicates && next.includes(tag))) continue;
      const result = validate?.(tag);
      if (result !== undefined && result !== true) continue;
      next.push(tag); accepted = true;
    }
    if (accepted) onChange(next);
    return accepted;
  };
  const removeTag = (index: number) => {
    if (!disabled && !readOnly) onChange(value.filter((_, i) => i !== index));
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || event.nativeEvent.isComposing || disabled || readOnly) return;
    const input = event.currentTarget;
    if (event.key === "Enter" || delimiters.includes(event.key)) {
      event.preventDefault();
      if (addTags([input.value])) input.value = "";
    } else if (event.key === "Backspace" && input.value === "" && value.length > 0) {
      event.preventDefault(); removeTag(value.length - 1);
    }
  };
  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    onPaste?.(event);
    if (event.defaultPrevented || disabled || readOnly || isAtMax) return;
    const escaped = delimiters.filter(Boolean).map(d => d.replace(/[.*+?^$\{\}()|[\]\\]/g, "\\$&"));
    const parts = event.clipboardData.getData("text").split(new RegExp(escaped.concat(["\\r?\\n"]).join("|")));
    if (parts.length > 1) { event.preventDefault(); addTags(parts); }
  };
  return <div className={cn("vds-tag-input", className)} data-size={size}
    data-invalid={invalid || undefined} data-disabled={disabled || undefined} data-readonly={readOnly || undefined}
    onClick={() => { if (!disabled) inputRef.current?.focus(); }} role="presentation">
    {value.map((tag, i) => <Chip key={tag + "-" + i} size={size === "md" ? "md" : size} data-tag="">
      <ChipLabel>{tag}</ChipLabel>
      {!disabled && !readOnly ? <ChipRemove aria-label={"Remove " + tag} onClick={event => {
        event.stopPropagation(); removeTag(i); inputRef.current?.focus();
      }}/> : null}
    </Chip>)}
    <input {...rest} ref={mergedRef} id={inputId} form={form} className="vds-tag-input-field" type="text"
      disabled={disabled} readOnly={readOnly || isAtMax} required={required && value.length === 0}
      aria-invalid={invalid || rest["aria-invalid"] || undefined}
      placeholder={value.length === 0 ? placeholder : undefined}
      onKeyDown={handleKeyDown} onPaste={handlePaste} autoComplete={rest.autoComplete ?? "off"}/>
    {name ? value.map((tag,i)=><input key={i} type="hidden" name={name} form={form} value={tag} disabled={disabled}/>) : null}
  </div>;
});
