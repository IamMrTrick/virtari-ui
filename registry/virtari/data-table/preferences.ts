import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type {
  ColumnFiltersState,
  ColumnOrderState,
  ColumnPinningState,
  ColumnSizingState,
  ExpandedState,
  GroupingState,
  PaginationState,
  RowPinningState,
  RowSelectionState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";

import type { DataTableViewMode } from "./types";

export interface DataTablePreferenceState {
  viewMode?: DataTableViewMode;
  sorting?: SortingState;
  columnFilters?: ColumnFiltersState;
  globalFilter?: string;
  rowSelection?: RowSelectionState;
  columnSizing?: ColumnSizingState;
  columnOrder?: ColumnOrderState;
  columnPinning?: ColumnPinningState;
  columnVisibility?: VisibilityState;
  pagination?: PaginationState;
  grouping?: GroupingState;
  expanded?: ExpandedState;
  rowPinning?: RowPinningState;
}

export interface DataTablePreferencesAdapter {
  load?: () => DataTablePreferenceState | null | Promise<DataTablePreferenceState | null>;
  save?: (state: DataTablePreferenceState) => void | Promise<void>;
  clear?: () => void | Promise<void>;
}

export interface DataTablePreferencesOptions {
  value?: DataTablePreferenceState;
  defaultValue?: DataTablePreferenceState;
  onValueChange?: (state: DataTablePreferenceState) => void;
  adapter?: DataTablePreferencesAdapter;
  /**
   * Convenience localStorage key. For Zustand, server actions, or a database,
   * prefer `value`/`onValueChange` or `adapter`.
   */
  storageKey?: string;
  autoSave?: boolean;
  debounceMs?: number;
}

export interface DataTablePreferenceStatePairs {
  viewMode?: DataTableViewMode;
  onViewModeChange: (viewMode: DataTableViewMode) => void;
  sorting?: SortingState;
  onSortingChange: (sorting: SortingState) => void;
  columnFilters?: ColumnFiltersState;
  onColumnFiltersChange: (filters: ColumnFiltersState) => void;
  globalFilter?: string;
  onGlobalFilterChange: (value: string) => void;
  rowSelection?: RowSelectionState;
  onRowSelectionChange: (selection: RowSelectionState) => void;
  columnSizing?: ColumnSizingState;
  onColumnSizingChange: (sizing: ColumnSizingState) => void;
  columnOrder?: ColumnOrderState;
  onColumnOrderChange: (order: ColumnOrderState) => void;
  columnPinning?: ColumnPinningState;
  onColumnPinningChange: (pinning: ColumnPinningState) => void;
  columnVisibility?: VisibilityState;
  onColumnVisibilityChange: (visibility: VisibilityState) => void;
  pagination?: PaginationState;
  onPaginationChange: (pagination: PaginationState) => void;
  grouping?: GroupingState;
  onGroupingChange: (grouping: GroupingState) => void;
  expanded?: ExpandedState;
  onExpandedChange: (expanded: ExpandedState) => void;
  rowPinning?: RowPinningState;
  onRowPinningChange: (pinning: RowPinningState) => void;
}

export interface UseDataTablePreferencesResult {
  preferences: DataTablePreferenceState;
  setPreferences: (next: DataTablePreferenceState) => void;
  updatePreferences: (patch: DataTablePreferenceState) => void;
  resetPreferences: () => void;
  statePairs: DataTablePreferenceStatePairs;
}

function readStorage(storageKey: string | undefined): DataTablePreferenceState | null {
  if (!storageKey || typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(storageKey);
    return raw ? (JSON.parse(raw) as DataTablePreferenceState) : null;
  } catch {
    return null;
  }
}

function writeStorage(storageKey: string | undefined, state: DataTablePreferenceState) {
  if (!storageKey || typeof window === "undefined") return;
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(state));
  } catch {
    /* Persistence must never break table interactions. */
  }
}

function clearStorage(storageKey: string | undefined) {
  if (!storageKey || typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(storageKey);
  } catch {
    /* noop */
  }
}

export function useDataTablePreferences({
  value,
  defaultValue = {},
  onValueChange,
  adapter,
  storageKey,
  autoSave = true,
  debounceMs = 200,
}: DataTablePreferencesOptions = {}): UseDataTablePreferencesResult {
  const controlled = value !== undefined;
  const initialRef = useRef(defaultValue);
  const [internal, setInternal] = useState<DataTablePreferenceState>(() => ({
    ...defaultValue,
    ...(readStorage(storageKey) ?? {}),
  }));

  const preferences = controlled ? (value ?? {}) : internal;

  const commit = useCallback(
    (next: DataTablePreferenceState) => {
      if (!controlled) setInternal(next);
      onValueChange?.(next);
    },
    [controlled, onValueChange],
  );

  const updatePreferences = useCallback(
    (patch: DataTablePreferenceState) => {
      commit({ ...preferences, ...patch });
    },
    [commit, preferences],
  );

  const resetPreferences = useCallback(() => {
    const next = initialRef.current;
    if (!controlled) setInternal(next);
    onValueChange?.(next);
    clearStorage(storageKey);
    void adapter?.clear?.();
  }, [adapter, controlled, onValueChange, storageKey]);

  useEffect(() => {
    let active = true;
    const loaded = adapter?.load?.();
    if (!loaded) return;
    Promise.resolve(loaded).then((next) => {
      if (!active || !next) return;
      commit({ ...initialRef.current, ...next });
    });
    return () => {
      active = false;
    };
  }, [adapter, commit]);

  useEffect(() => {
    if (!autoSave) return;
    const id = window.setTimeout(() => {
      writeStorage(storageKey, preferences);
      void adapter?.save?.(preferences);
    }, debounceMs);
    return () => window.clearTimeout(id);
  }, [adapter, autoSave, debounceMs, preferences, storageKey]);

  const statePairs = useMemo<DataTablePreferenceStatePairs>(
    () => ({
      viewMode: preferences.viewMode,
      onViewModeChange: (viewMode) => updatePreferences({ viewMode }),
      sorting: preferences.sorting,
      onSortingChange: (sorting) => updatePreferences({ sorting }),
      columnFilters: preferences.columnFilters,
      onColumnFiltersChange: (columnFilters) => updatePreferences({ columnFilters }),
      globalFilter: preferences.globalFilter,
      onGlobalFilterChange: (globalFilter) => updatePreferences({ globalFilter }),
      rowSelection: preferences.rowSelection,
      onRowSelectionChange: (rowSelection) => updatePreferences({ rowSelection }),
      columnSizing: preferences.columnSizing,
      onColumnSizingChange: (columnSizing) => updatePreferences({ columnSizing }),
      columnOrder: preferences.columnOrder,
      onColumnOrderChange: (columnOrder) => updatePreferences({ columnOrder }),
      columnPinning: preferences.columnPinning,
      onColumnPinningChange: (columnPinning) => updatePreferences({ columnPinning }),
      columnVisibility: preferences.columnVisibility,
      onColumnVisibilityChange: (columnVisibility) =>
        updatePreferences({ columnVisibility }),
      pagination: preferences.pagination,
      onPaginationChange: (pagination) => updatePreferences({ pagination }),
      grouping: preferences.grouping,
      onGroupingChange: (grouping) => updatePreferences({ grouping }),
      expanded: preferences.expanded,
      onExpandedChange: (expanded) => updatePreferences({ expanded }),
      rowPinning: preferences.rowPinning,
      onRowPinningChange: (rowPinning) => updatePreferences({ rowPinning }),
    }),
    [preferences, updatePreferences],
  );

  return {
    preferences,
    setPreferences: commit,
    updatePreferences,
    resetPreferences,
    statePairs,
  };
}
