import { forwardRef, useEffect, useRef } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import { Input } from "@virtari-packages/react-input";
import { cn, useComposedRefs } from "@virtari-packages/utils";

export type CellEditorMode = "text" | "number" | "date";

export interface CellEditorProps {
  mode?: CellEditorMode;
  value: string | number;
  onValueChange: (v: string | number) => void;
  onCommit: () => void;
  onCancel: () => void;
  autoFocus?: boolean;
  className?: string;
}

export const CellEditor = forwardRef<HTMLInputElement, CellEditorProps>(
  function CellEditor(
    {
      mode = "text",
      value,
      onValueChange,
      onCommit,
      onCancel,
      autoFocus = true,
      className,
    },
    ref,
  ) {
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      if (autoFocus && inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }, [autoFocus]);

    const mergedRef = useComposedRefs(inputRef, ref);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (mode === "number") {
        onValueChange(
          e.target.value === "" ? "" : Number(e.target.value),
        );
      } else {
        onValueChange(e.target.value);
      }
    };

    const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.defaultPrevented || e.nativeEvent.isComposing) return;
      if (e.key === "Enter") {
        e.preventDefault();
        onCommit();
      } else if (e.key === "Escape") {
        e.preventDefault();
        onCancel();
      }
    };

    return (
      <Input
        ref={mergedRef}
        inputSize="sm"
        type={mode === "number" ? "number" : mode === "date" ? "date" : "text"}
        value={value}
        onChange={handleChange}
        onBlur={(event) => {
          // Browser chrome and password-manager popups may blur the window.
          const input = event.currentTarget;
          requestAnimationFrame(() => {
            if (input.isConnected && input.ownerDocument.hasFocus() && input.ownerDocument.activeElement !== input) onCommit();
          });
        }}
        onKeyDown={handleKey}
        className={cn("vds-data-table-cell-editor", className)}
      />
    );
  },
);
