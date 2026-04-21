import { Flag, type CountryCode } from "@virtari-packages/react-flag";
import { cn } from "@virtari-packages/utils";
import type { CSSProperties, HTMLAttributes } from "react";

export interface LanguageMarkProps extends HTMLAttributes<HTMLSpanElement> {
  flag: CountryCode | null;
  style?: CSSProperties;
}

export function LanguageMark({
  flag,
  className,
  style,
  ...rest
}: LanguageMarkProps) {
  if (flag) {
    return (
      <Flag
        code={flag}
        className={className}
        style={style}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={cn("vds-language-mark-fallback", className)}
      style={style}
      {...rest}
    >
      <svg viewBox="0 0 16 16" fill="none">
        <rect x="1" y="2" width="14" height="12" rx="3.5" />
        <path
          d="M8 4.25c-1.933 0-3.5 1.455-3.5 3.25s1.567 3.25 3.5 3.25 3.5-1.455 3.5-3.25S9.933 4.25 8 4.25Zm0 0c.853.729 1.333 1.962 1.333 3.25S8.853 10.021 8 10.75m0-6.5c-.853.729-1.333 1.962-1.333 3.25S7.147 10.021 8 10.75M4.833 7.5h6.334"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
