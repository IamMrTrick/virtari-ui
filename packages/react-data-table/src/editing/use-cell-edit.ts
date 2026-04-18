import { useCallback, useState } from "react";
import type { Cell } from "@tanstack/react-table";

import { useDataTableContext } from "../DataTableContext";

export interface UseCellEditOptions<TValue> {
  initialValue: TValue;
}

export interface UseCellEditResult<TValue> {
  editing: boolean;
  value: TValue;
  setValue: (v: TValue) => void;
  start: () => void;
  commit: () => Promise<void>;
  cancel: () => void;
  isPending: boolean;
}

/**
 * Drives a single cell's inline edit lifecycle.
 *
 * - `start()` enters edit mode with a working copy of `initialValue`.
 * - `commit()` invokes the root's `onCellEdit` callback and awaits if async.
 * - `cancel()` discards the working copy.
 */
export function useCellEdit<TData, TValue>(
  cell: Cell<TData, TValue>,
  options: UseCellEditOptions<TValue>,
): UseCellEditResult<TValue> {
  const ctx = useDataTableContext<TData>();
  const onCellEdit = ctx.onCellEdit;

  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState<TValue>(options.initialValue);
  const [isPending, setPending] = useState(false);

  const start = useCallback(() => {
    setValue(options.initialValue);
    setEditing(true);
  }, [options.initialValue]);

  const cancel = useCallback(() => {
    setEditing(false);
    setValue(options.initialValue);
  }, [options.initialValue]);

  const commit = useCallback(async () => {
    const maybePromise = onCellEdit?.(cell.row, cell.column.id, value);
    if (maybePromise && typeof (maybePromise as Promise<void>).then === "function") {
      setPending(true);
      try {
        await maybePromise;
      } finally {
        setPending(false);
      }
    }
    setEditing(false);
  }, [cell.row, cell.column.id, value, onCellEdit]);

  return { editing, value, setValue, start, commit, cancel, isPending };
}
