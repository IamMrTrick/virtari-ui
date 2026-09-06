import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type KeyboardEvent,
  type ReactNode,
  type RefObject,
  type SetStateAction,
} from "react";

/* ─────────────────────────────────────────────
 * Public types
 * ───────────────────────────────────────────── */

export interface ComboboxItemData {
  value: string;
  label: string;
  disabled?: boolean;
  /** Free slot for consumer payload (icon, description, group key, …) */
  [key: string]: unknown;
}

export type ComboboxFilter<T extends ComboboxItemData = ComboboxItemData> = (
  item: T,
  query: string,
) => boolean;

/* ─────────────────────────────────────────────
 * Internal context
 * ───────────────────────────────────────────── */

export interface ComboboxContextValue {
  reset: () => void;
  /* config */
  multiple: boolean;
  searchable: boolean;
  disabled: boolean;
  invalid: boolean;
  loading: boolean;
  virtualized: boolean;
  emptyMessage: ReactNode;

  /* data */
  filteredItems: ComboboxItemData[];
  setItemDisabled: (value: string, disabled: boolean) => void;
  selectedItems: ComboboxItemData[];

  /* selection */
  value: string | string[];
  isSelected: (value: string) => boolean;
  toggleValue: (value: string) => void;
  removeValue: (value: string) => void;
  clearValue: () => void;

  /* search */
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  /** True when consumer supplied onSearchChange (async mode) */
  externalSearch: boolean;

  /* open state */
  open: boolean;
  setOpen: (open: boolean) => void;

  /* highlight (active descendant) */
  highlightedIndex: number;
  setHighlightedIndex: Dispatch<SetStateAction<number>>;
  moveHighlight: (delta: number | "start" | "end") => void;
  commitHighlighted: () => void;

  /* refs + ids */
  inputRef: RefObject<HTMLInputElement | null>;
  triggerRef: RefObject<HTMLElement | null>;
  listId: string;
  inputId: string;
  getItemId: (index: number) => string;

  /* keyboard */
  handleInputKeyDown: (e: KeyboardEvent<HTMLElement>) => void;
}

const ComboboxContext = createContext<ComboboxContextValue | null>(null);

export function useComboboxContext(): ComboboxContextValue {
  const ctx = useContext(ComboboxContext);
  if (!ctx) {
    throw new Error(
      "Combobox sub-components must be used inside <Combobox>.",
    );
  }
  return ctx;
}

export const ComboboxProvider = ComboboxContext.Provider;

/* ─────────────────────────────────────────────
 * Default filter
 * ───────────────────────────────────────────── */

const defaultFilter: ComboboxFilter = (item, query) => {
  if (!query) return true;
  return item.label.toLowerCase().includes(query.toLowerCase());
};

/* ─────────────────────────────────────────────
 * Hook: useCombobox
 * Owns state for the provider.
 * ───────────────────────────────────────────── */

export interface UseComboboxProps<T extends ComboboxItemData = ComboboxItemData> {
  name?: string;
  form?: string;
  items: T[];
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;

  multiple?: boolean;
  searchable?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  virtualized?: boolean;
  emptyMessage?: ReactNode;

  filter?: ComboboxFilter<T>;
  onSearchChange?: (query: string) => void;

  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function useCombobox<T extends ComboboxItemData = ComboboxItemData>(
  props: UseComboboxProps<T>,
): ComboboxContextValue {
  const {
    items,
    value: controlledValue,
    defaultValue,
    onValueChange,
    multiple = false,
    searchable = true,
    disabled = false,
    invalid = false,
    loading = false,
    virtualized = false,
    emptyMessage = "No results",
    filter,
    onSearchChange,
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
  } = props;

  const externalSearch = typeof onSearchChange === "function";

  /* ── controlled/uncontrolled value ── */
  const [uncontrolledValue, setUncontrolledValue] = useState<string | string[]>(
    () => defaultValue ?? (multiple ? [] : ""),
  );
  const value = controlledValue !== undefined ? controlledValue : uncontrolledValue;

  const commitValue = useCallback(
    (next: string | string[]) => {
      if (disabled) return;
      if (controlledValue === undefined) setUncontrolledValue(next);
      onValueChange?.(next);
    },
    [controlledValue, onValueChange, disabled],
  );

  /* ── controlled/uncontrolled open ── */
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;
  const setOpen = useCallback(
    (next: boolean) => {
      if (controlledOpen === undefined) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [controlledOpen, onOpenChange],
  );

  /* ── search ── */
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    if (externalSearch) onSearchChange?.(searchQuery);
  }, [searchQuery, externalSearch, onSearchChange]);

  /* ── filtered items ── */
  const [disabledItems, setDisabledItems] = useState<Set<string>>(() => new Set());
  const setItemDisabled = useCallback((value: string, itemDisabled: boolean) => {
    setDisabledItems((current) => {
      if (current.has(value) === itemDisabled) return current;
      const next = new Set(current);
      if (itemDisabled) next.add(value); else next.delete(value);
      return next;
    });
  }, []);
  const filteredItems = useMemo<ComboboxItemData[]>(() => {
    const resolvedItems = items.map((item) => disabledItems.has(item.value) ? { ...item, disabled: true } : item);
    if (externalSearch || !searchable || !searchQuery) return resolvedItems;
    const fn = (filter ?? defaultFilter) as ComboboxFilter;
    return resolvedItems.filter((it) => fn(it, searchQuery));
  }, [items, searchQuery, searchable, externalSearch, filter, disabledItems]);

  /* ── selection helpers ── */
  const valueArr = useMemo(
    () => (Array.isArray(value) ? value : value ? [value] : []),
    [value],
  );

  const isSelected = useCallback((v: string) => valueArr.includes(v), [valueArr]);

  const toggleValue = useCallback(
    (v: string) => {
      if (disabled || disabledItems.has(v) || items.find((item) => item.value === v)?.disabled) return;
      if (multiple) {
        const next = valueArr.includes(v)
          ? valueArr.filter((x) => x !== v)
          : [...valueArr, v];
        commitValue(next);
      } else {
        commitValue(v);
        setOpen(false);
        setSearchQuery("");
      }
    },
    [multiple, valueArr, commitValue, setOpen, disabled, items, disabledItems],
  );

  const removeValue = useCallback(
    (v: string) => {
      if (multiple) {
        commitValue(valueArr.filter((x) => x !== v));
      } else if (value === v) {
        commitValue("");
      }
    },
    [multiple, valueArr, commitValue, value],
  );

  const clearValue = useCallback(() => {
    commitValue(multiple ? [] : "");
  }, [commitValue, multiple]);

  const selectedItems = useMemo(
    () => valueArr.map((v) => items.find((it) => it.value === v)).filter(Boolean) as ComboboxItemData[],
    [valueArr, items],
  );

  /* ── highlight (active descendant) ── */
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  /* Reset highlight when the filtered set changes (search typing) */
  useEffect(() => {
    setHighlightedIndex((i) => {
      if (filteredItems.length === 0) return -1;
      if (i < 0 || i >= filteredItems.length || filteredItems[i]?.disabled) return firstEnabled(filteredItems, 0, 1);
      return i;
    });
  }, [filteredItems]);

  /* When opening, highlight first selected item (if any) else first */
  useEffect(() => {
    if (!open) return;
    if (filteredItems.length === 0) {
      setHighlightedIndex(-1);
      return;
    }
    const firstSelected = filteredItems.findIndex((it) => !it.disabled && valueArr.includes(it.value));
    setHighlightedIndex(firstSelected >= 0 ? firstSelected : firstEnabled(filteredItems, 0, 1));
    // Intentional: only run on open transition
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const moveHighlight = useCallback(
    (delta: number | "start" | "end") => {
      if (filteredItems.length === 0) return;
      setHighlightedIndex((current) => {
        const count = filteredItems.length;
        if (delta === "start") return firstEnabled(filteredItems, 0, 1);
        if (delta === "end") return firstEnabled(filteredItems, count - 1, -1);
        const dir = delta > 0 ? 1 : -1;
        let next = current;
        for (let i = 0; i < count; i += 1) {
          next = (next + dir + count) % count;
          if (!filteredItems[next]?.disabled) return next;
        }
        return current;
      });
    },
    [filteredItems],
  );

  const commitHighlighted = useCallback(() => {
    const item = filteredItems[highlightedIndex];
    if (!item || item.disabled) return;
    toggleValue(item.value);
  }, [filteredItems, highlightedIndex, toggleValue]);

  /* ── keyboard ── */
  const handleInputKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      if (e.defaultPrevented || e.nativeEvent.isComposing || disabled) return;
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          if (!open) setOpen(true);
          moveHighlight(1);
          break;
        case "ArrowUp":
          e.preventDefault();
          if (!open) setOpen(true);
          moveHighlight(-1);
          break;
        case "Enter":
          if (open) {
            e.preventDefault();
            commitHighlighted();
          }
          break;
        case "Escape":
          if (searchQuery) {
            e.preventDefault();
            setSearchQuery("");
          } else if (open) {
            e.preventDefault();
            setOpen(false);
          }
          break;
        case "Backspace":
          if (multiple && !searchQuery && valueArr.length > 0) {
            e.preventDefault();
            removeValue(valueArr[valueArr.length - 1]!);
          }
          break;
        case "Tab":
          if (open) {
            // The search lives in a portal. Start native Tab navigation at
            // the trigger so it advances to the adjacent form control.
            triggerRef.current?.focus();
            setOpen(false);
          }
          break;
        default:
          break;
      }
    },
    [
      disabled,
      open,
      setOpen,
      moveHighlight,
      commitHighlighted,
      searchQuery,
      multiple,
      valueArr,
      removeValue,
    ],
  );

  /* ── refs & ids ── */
  const inputRef = useRef<HTMLInputElement | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const baseId = useId();
  const listId = `${baseId}-list`;
  const inputId = `${baseId}-input`;
  const getItemId = useCallback(
    (index: number) => `${baseId}-item-${index}`,
    [baseId],
  );

  return {
    reset: () => {
      const next = defaultValue ?? (multiple ? [] : "");
      if (controlledValue === undefined) setUncontrolledValue(next);
      onValueChange?.(next);
      setSearchQuery("");
      setOpen(false);
    },
    multiple,
    searchable,
    disabled,
    invalid,
    loading,
    virtualized,
    emptyMessage,

    filteredItems,
    setItemDisabled,
    selectedItems,

    value,
    isSelected,
    toggleValue,
    removeValue,
    clearValue,

    searchQuery,
    setSearchQuery,
    externalSearch,

    open,
    setOpen,

    highlightedIndex,
    setHighlightedIndex,
    moveHighlight,
    commitHighlighted,

    inputRef,
    triggerRef,
    listId,
    inputId,
    getItemId,

    handleInputKeyDown,
  };
}

/* ─────────────────────────────────────────────
 * helpers
 * ───────────────────────────────────────────── */

function firstEnabled(items: ComboboxItemData[], from: number, dir: 1 | -1): number {
  const count = items.length;
  let i = from;
  for (let step = 0; step < count; step += 1) {
    if (!items[i]?.disabled) return i;
    i = (i + dir + count) % count;
  }
  return -1;
}
