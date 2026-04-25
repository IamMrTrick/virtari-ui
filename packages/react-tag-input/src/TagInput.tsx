import { cn } from "@virtari-packages/utils";
import { Chip, ChipLabel, ChipRemove } from "@virtari-packages/react-chip";
import {
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

export function TagInput({
  value,
  onChange,
  maxTags,
  allowDuplicates = false,
  validate,
  delimiters = [","],
  size = "md",
  disabled,
  invalid,
  placeholder,
  className,
  ref,
  id,
  ...rest
}: TagInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autoId = useId();
  const inputId = id ?? autoId;

  const addTag = (raw: string) => {
    const tag = normalize(raw);
    if (!tag) return;
    if (maxTags !== undefined && value.length >= maxTags) return;
    if (!allowDuplicates && value.includes(tag)) return;
    if (validate) {
      const result = validate(tag);
      if (result !== true && result !== undefined) return;
    }
    onChange([...value, tag]);
  };

  const removeTag = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(input.value);
      input.value = "";
      return;
    }
    if (e.key === "Backspace" && input.value === "" && value.length > 0) {
      removeTag(value.length - 1);
      return;
    }
    if (delimiters.includes(e.key)) {
      e.preventDefault();
      addTag(input.value);
      input.value = "";
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData("text");
    const delimRegex = new RegExp(`[${delimiters.map((d) => `\\${d}`).join("")}\n\r]`);
    const parts = text.split(delimRegex);
    if (parts.length > 1) {
      e.preventDefault();
      for (const part of parts) {
        addTag(part);
      }
    }
  };

  const isAtMax = maxTags !== undefined && value.length >= maxTags;

  return (
    <div
      className={cn("vds-tag-input", className)}
      data-size={size}
      data-invalid={invalid || undefined}
      data-disabled={disabled || undefined}
      onClick={() => inputRef.current?.focus()}
      role="presentation"
    >
      {value.map((tag, i) => (
        <Chip key={`${tag}-${i}`} size={size === "md" ? "md" : size} data-tag="">
          <ChipLabel>{tag}</ChipLabel>
          {!disabled && (
            <ChipRemove
              aria-label={`Remove ${tag}`}
              onClick={(e) => {
                e.stopPropagation();
                removeTag(i);
              }}
            />
          )}
        </Chip>
      ))}
      {!isAtMax && (
        <input
          ref={(node) => {
            if (ref) {
              if (typeof ref === "function") ref(node);
              else (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
            }
            (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
          }}
          id={inputId}
          className="vds-tag-input-field"
          type="text"
          disabled={disabled}
          placeholder={value.length === 0 ? placeholder : undefined}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          autoComplete="off"
          {...rest}
        />
      )}
    </div>
  );
}
