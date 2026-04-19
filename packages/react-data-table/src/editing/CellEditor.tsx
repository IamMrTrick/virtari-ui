import { forwardRef, useEffect, useRef } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import { Input } from "@virtari-packages/react-input";
import { cn } from "@virtari-packages/utils";

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
        ref={(node) => {
          inputRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
        }}
        inputSize="sm"
        type={mode === "number" ? "number" : mode === "date" ? "date" : "text"}
        value={value}
        onChange={handleChange}
        onBlur={onCommit}
        onKeyDown={handleKey}
        className={cn("vds-data-table-cell-editor", className)}
      />
    );
  },
);
