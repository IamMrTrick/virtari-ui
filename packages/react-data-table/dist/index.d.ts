import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import { ReactNode, AnchorHTMLAttributes, HTMLAttributes, ButtonHTMLAttributes, CSSProperties, InputHTMLAttributes, TdHTMLAttributes, MutableRefObject, Dispatch, SetStateAction, KeyboardEvent } from 'react';
import { AvatarSize, AvatarColor } from '@virtari-packages/react-avatar';
import { BadgeVariant } from '@virtari-packages/react-badge';
import { Row, Column, Cell, Table, SortingState, ColumnFiltersState, RowSelectionState, ColumnSizingState, ColumnOrderState, ColumnPinningState, VisibilityState, PaginationState, GroupingState, ExpandedState, RowPinningState, Header } from '@tanstack/react-table';
export { Cell, ColumnDef, ColumnFiltersState, ColumnOrderState, ColumnPinningState, ColumnSizingState, ExpandedState, GroupingState, Header, HeaderGroup, PaginationState, Row, RowPinningState, RowSelectionState, SortingState, Table, VisibilityState, createColumnHelper, flexRender } from '@tanstack/react-table';
import { ChipVariant } from '@virtari-packages/react-chip';
import { ButtonVariant, ButtonSize } from '@virtari-packages/react-button';
import { InputSize } from '@virtari-packages/react-input';
import { TabsProps, TabsVariant, TabsSize } from '@virtari-packages/react-tabs';
import { a as DataTableViewMode, b as DataTableRootProps, c as DataTableToolbarProps, d as DataTableScrollAreaProps, e as DataTableTableProps, f as DataTableHeaderProps, g as DataTableHeaderGroupProps, D as DataTableHeaderCellProps, h as DataTableSortTriggerProps, i as DataTableResizeHandleProps, j as DataTableColumnGuide, k as DataTablePinColumnTriggerProps, l as DataTableBodyProps, m as DataTableRowProps, n as DataTableCellProps, o as DataTableGroupHeaderRowProps, p as DataTableRowExpandTriggerProps, q as DataTableRowPinTriggerProps, r as DataTableFooterProps, s as DataTableFooterRowProps, t as DataTableFooterCellProps, u as DataTableSelectAllCheckbox, v as DataTableRowSelectCheckbox, w as DataTableEmptyProps, x as DataTableLoadingOverlayProps, y as DataTableGlobalFilterProps, z as DataTableColumnVisibility, A as DataTableOptions, B as DataTableSize, C as DataTableInteractionMode, E as DataTableBorderMode, F as DataTableMode, G as DataTableVirtualizationOptions, H as DataTableServerRequestState } from './DataTable-BoPDiU8H.js';
export { I as ControlledPair, J as DataTableBaseOptions, K as DataTableBody, L as DataTableCell, M as DataTableColumnVisibilityProps, N as DataTableEmpty, O as DataTableFooter, P as DataTableFooterCell, Q as DataTableFooterRow, R as DataTableGlobalFilter, S as DataTableGroupHeaderRow, T as DataTableHeader, U as DataTableHeaderCell, V as DataTableHeaderGroup, W as DataTableInstance, X as DataTableLoadingOverlay, Y as DataTablePinColumnTrigger, Z as DataTableResizeHandle, _ as DataTableRoot, $ as DataTableRow, a0 as DataTableRowExpandTrigger, a1 as DataTableRowPinTrigger, a2 as DataTableRowSelectCheckboxProps, a3 as DataTableScrollArea, a4 as DataTableSelectAllCheckboxProps, a5 as DataTableSortTrigger, a6 as DataTableStatePairs, a7 as DataTableTable, a8 as DataTableToolbar } from './DataTable-BoPDiU8H.js';
import { Virtualizer } from '@tanstack/react-virtual';

interface ActionItem {
    id: string;
    label: ReactNode;
    icon?: ReactNode;
    onSelect?: () => void;
    disabled?: boolean;
    tone?: "default" | "danger";
    /** Insert a separator BEFORE this item. */
    separatorBefore?: boolean;
}
interface ActionsCellProps {
    items: ActionItem[];
    /** Override the trigger glyph/button content. */
    trigger?: ReactNode;
    className?: string;
}
/** Three-dot menu with row actions — wraps @virtari-packages/react-dropdown-menu. */
declare function ActionsCell({ items, trigger, className }: ActionsCellProps): react_jsx_runtime.JSX.Element;

interface AvatarCellProps {
    src?: string;
    alt?: string;
    fallback: string;
    size?: AvatarSize;
    color?: AvatarColor;
    colorKey?: string;
    primary?: ReactNode;
    secondary?: ReactNode;
    className?: string;
}
/** Avatar + optional primary/secondary text; ideal for name columns. */
declare function AvatarCell({ src, alt, fallback, size, color, colorKey, primary, secondary, className, }: AvatarCellProps): react_jsx_runtime.JSX.Element;

interface BadgeCellProps {
    variant?: BadgeVariant;
    children: ReactNode;
    className?: string;
}
declare function BadgeCell({ variant, children, className }: BadgeCellProps): react_jsx_runtime.JSX.Element;
type StatusTone = "success" | "warning" | "danger" | "info" | "neutral";
interface StatusBadgeCellProps {
    tone: StatusTone;
    label: ReactNode;
    withDot?: boolean;
    /** "pill" = tinted background + dot (default), "text" = colored text only. */
    variant?: "pill" | "text";
    className?: string;
}
/** Pre-styled status badge with a colored dot + pill background. */
declare function StatusBadgeCell({ tone, label, withDot, variant, className, }: StatusBadgeCellProps): react_jsx_runtime.JSX.Element;

interface CopyableCellProps {
    children: ReactNode;
    /** Override the text copied to clipboard; defaults to stringifying children. */
    copyText?: string;
    /** Duration of the "Copied" feedback in ms. */
    feedbackMs?: number;
    className?: string;
}
/** Wraps cell content with a hover "copy" affordance. Copies text via
 *  `navigator.clipboard.writeText`. Shows a "Copied" label briefly. */
declare function CopyableCell({ children, copyText, feedbackMs, className, }: CopyableCellProps): react_jsx_runtime.JSX.Element;

type DateFormat = "short" | "medium" | "long" | "relative" | ((d: Date) => string);
interface DateCellProps {
    value: Date | string | number | null | undefined;
    format?: DateFormat;
    locale?: string;
    className?: string;
}
declare function DateCell({ value, format, locale, className, }: DateCellProps): react_jsx_runtime.JSX.Element;

interface LinkCellProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    children: ReactNode;
    external?: boolean;
}
declare function LinkCell({ children, external, className, target, rel, ...props }: LinkCellProps): react_jsx_runtime.JSX.Element;

type NumberFormat = "integer" | "decimal" | "currency" | "percent" | "compact" | ((n: number) => string);
interface NumberCellProps {
    value: number | string | null | undefined;
    format?: NumberFormat;
    currency?: string;
    locale?: string;
    fractionDigits?: number;
    align?: "start" | "center" | "end";
    className?: string;
}
declare function NumberCell({ value, format, currency, locale, fractionDigits, align, className, }: NumberCellProps): react_jsx_runtime.JSX.Element;

interface TextCellProps {
    value?: ReactNode;
    /** Visual weight — default "regular". */
    weight?: "regular" | "medium" | "semibold";
    /** Force ellipsis truncation with `title` fallback. */
    truncate?: boolean;
    /** Muted color tone. */
    muted?: boolean;
    className?: string;
}
declare function TextCell({ value, weight, truncate, muted, className, }: TextCellProps): react_jsx_runtime.JSX.Element;

declare const Cells: {
    readonly Actions: typeof ActionsCell;
    readonly Avatar: typeof AvatarCell;
    readonly Badge: typeof BadgeCell;
    readonly StatusBadge: typeof StatusBadgeCell;
    readonly Copyable: typeof CopyableCell;
    readonly Date: typeof DateCell;
    readonly Link: typeof LinkCell;
    readonly Number: typeof NumberCell;
    readonly Text: typeof TextCell;
};

interface DataTableBulkActionsProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    /** Render bar content. Receives selected rows + clear helper. */
    children?: ReactNode | ((ctx: {
        selectedRows: Row<unknown>[];
        selectedCount: number;
        clearSelection: () => void;
    }) => ReactNode);
    /** Also show when the cross-page select flag is active. */
    showWhenAllAcrossPagesSelected?: boolean;
    /** External flag — controls visibility when all-across-pages is selected. */
    isAllAcrossPagesSelected?: boolean;
    /** Stick to bottom of the table instead of inline. */
    sticky?: boolean;
}
declare const DataTableBulkActions: react.ForwardRefExoticComponent<DataTableBulkActionsProps & react.RefAttributes<HTMLDivElement>>;
interface DataTableBulkCountProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
    /** Override — by default reads from context. */
    count?: number;
    label?: (count: number) => ReactNode;
}
declare const DataTableBulkCount: react.ForwardRefExoticComponent<DataTableBulkCountProps & react.RefAttributes<HTMLSpanElement>>;
interface DataTableBulkClearProps extends ButtonHTMLAttributes<HTMLButtonElement> {
}
declare const DataTableBulkClear: react.ForwardRefExoticComponent<DataTableBulkClearProps & react.RefAttributes<HTMLButtonElement>>;
interface DataTableSelectAllAcrossPagesProps {
    /** Total row count across all pages (typically `rowCount` from server). */
    totalCount: number;
    /** External flag — whether cross-page selection is active. */
    isAllAcrossPagesSelected: boolean;
    onSelectAll: () => void;
    onClear: () => void;
    className?: string;
}
declare function DataTableSelectAllAcrossPages({ totalCount, isAllAcrossPagesSelected, onSelectAll, onClear, className, }: DataTableSelectAllAcrossPagesProps): react_jsx_runtime.JSX.Element | null;

declare const BulkActions: {
    readonly Root: react.ForwardRefExoticComponent<DataTableBulkActionsProps & react.RefAttributes<HTMLDivElement>>;
    readonly Count: react.ForwardRefExoticComponent<DataTableBulkCountProps & react.RefAttributes<HTMLSpanElement>>;
    readonly Clear: react.ForwardRefExoticComponent<DataTableBulkClearProps & react.RefAttributes<HTMLButtonElement>>;
    readonly SelectAllAcrossPages: typeof DataTableSelectAllAcrossPages;
};

type DateRange = [string | undefined, string | undefined];
interface DateFilterProps<TData = unknown, TValue = unknown> {
    column: Column<TData, TValue>;
    /** Whether to render as a range (two inputs) or single date. Default "range". */
    mode?: "single" | "range";
    className?: string;
}
declare const DateFilter: react.ForwardRefExoticComponent<DateFilterProps<unknown, unknown> & react.RefAttributes<HTMLDivElement>>;

interface SelectFilterOption {
    value: string;
    label?: string;
}
interface SelectFilterProps<TData = unknown, TValue = unknown> {
    column: Column<TData, TValue>;
    options?: (string | SelectFilterOption)[];
    /** Allow multi-select. Default false. */
    multiple?: boolean;
    placeholder?: string;
    className?: string;
}
declare const SelectFilter: react.ForwardRefExoticComponent<SelectFilterProps<unknown, unknown> & react.RefAttributes<HTMLSelectElement>>;

type NumberRange = [number | undefined, number | undefined];
interface NumberFilterProps<TData = unknown, TValue = unknown> {
    column: Column<TData, TValue>;
    placeholder?: [string, string];
    className?: string;
}
declare const NumberFilter: react.ForwardRefExoticComponent<NumberFilterProps<unknown, unknown> & react.RefAttributes<HTMLDivElement>>;

interface TextFilterProps<TData = unknown, TValue = unknown> {
    column: Column<TData, TValue>;
    placeholder?: string;
    className?: string;
}
declare const TextFilter: react.ForwardRefExoticComponent<TextFilterProps<unknown, unknown> & react.RefAttributes<HTMLInputElement>>;

interface FilterPopoverProps<TData = unknown, TValue = unknown> {
    column: Column<TData, TValue>;
    /** Body of the popover — a filter control (e.g., `<TextFilter column={col} />`). */
    children: ReactNode;
    /** Trigger content — defaults to a funnel glyph. */
    trigger?: ReactNode;
    className?: string;
    /** Side the popover opens to. */
    side?: "top" | "right" | "bottom" | "left";
}
declare function FilterPopover<TData, TValue>({ column, children, trigger, className, side, }: FilterPopoverProps<TData, TValue>): react_jsx_runtime.JSX.Element;

declare const Filters: {
    readonly Text: react.ForwardRefExoticComponent<TextFilterProps<unknown, unknown> & react.RefAttributes<HTMLInputElement>>;
    readonly Number: react.ForwardRefExoticComponent<NumberFilterProps<unknown, unknown> & react.RefAttributes<HTMLDivElement>>;
    readonly Select: react.ForwardRefExoticComponent<SelectFilterProps<unknown, unknown> & react.RefAttributes<HTMLSelectElement>>;
    readonly Date: react.ForwardRefExoticComponent<DateFilterProps<unknown, unknown> & react.RefAttributes<HTMLDivElement>>;
    readonly Popover: typeof FilterPopover;
};

interface PaginationRootProps extends HTMLAttributes<HTMLElement> {
    sticky?: boolean;
}
declare const PaginationRoot: react.ForwardRefExoticComponent<PaginationRootProps & react.RefAttributes<HTMLElement>>;
interface PaginationInfoProps extends HTMLAttributes<HTMLDivElement> {
    renderLabel?: (range: {
        start: number;
        end: number;
        total: number;
    }) => ReactNode;
}
declare const PaginationInfo: react.ForwardRefExoticComponent<PaginationInfoProps & react.RefAttributes<HTMLDivElement>>;
interface PaginationButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
}
declare const PaginationPrev: react.ForwardRefExoticComponent<PaginationButtonProps & react.RefAttributes<HTMLButtonElement>>;
declare const PaginationNext: react.ForwardRefExoticComponent<PaginationButtonProps & react.RefAttributes<HTMLButtonElement>>;
interface PaginationPageSizeProps {
    options?: number[];
    className?: string;
    label?: ReactNode;
}
declare function PaginationPageSize({ options, className, label, }: PaginationPageSizeProps): react_jsx_runtime.JSX.Element;
interface PaginationPagesProps {
    className?: string;
    /** Max buttons to show; the middle window (default 5). */
    siblingCount?: number;
}
declare function PaginationPages({ className, siblingCount, }: PaginationPagesProps): react_jsx_runtime.JSX.Element;
interface PaginationDefaultProps {
    className?: string;
    pageSizeOptions?: number[];
    hidePageSize?: boolean;
    hidePageNumbers?: boolean;
    sticky?: boolean;
}
declare function PaginationDefault({ className, pageSizeOptions, hidePageSize, hidePageNumbers, sticky, }: PaginationDefaultProps): react_jsx_runtime.JSX.Element;

declare const Pagination: {
    readonly Root: react.ForwardRefExoticComponent<PaginationRootProps & react.RefAttributes<HTMLElement>>;
    readonly Prev: react.ForwardRefExoticComponent<PaginationButtonProps & react.RefAttributes<HTMLButtonElement>>;
    readonly Next: react.ForwardRefExoticComponent<PaginationButtonProps & react.RefAttributes<HTMLButtonElement>>;
    readonly PageSize: typeof PaginationPageSize;
    readonly Info: react.ForwardRefExoticComponent<PaginationInfoProps & react.RefAttributes<HTMLDivElement>>;
    readonly Pages: typeof PaginationPages;
    readonly Default: typeof PaginationDefault;
};

interface DataTableFilterChip {
    id: string;
    label: ReactNode;
    value?: ReactNode;
    icon?: ReactNode;
    variant?: ChipVariant;
    disabled?: boolean;
    removeLabel?: string;
}
interface DataTableFilterBarProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    filters?: DataTableFilterChip[];
    onFilterClick?: (filter: DataTableFilterChip) => void;
    onRemoveFilter?: (filterId: string) => void;
    onAddFilter?: () => void;
    addLabel?: ReactNode;
    sticky?: boolean;
    stickyOffset?: CSSProperties["top"];
    children?: ReactNode;
}
declare const DataTableFilterBar: react.ForwardRefExoticComponent<DataTableFilterBarProps & react.RefAttributes<HTMLDivElement>>;
interface DataTableFilterChipItemProps {
    filter: DataTableFilterChip;
    onClick?: (filter: DataTableFilterChip) => void;
    onRemove?: (filterId: string) => void;
}
declare function DataTableFilterChipItem({ filter, onClick, onRemove, }: DataTableFilterChipItemProps): react_jsx_runtime.JSX.Element;

type ToolbarActionButtonVariant = Extract<ButtonVariant, "ghost" | "outline" | "solid" | "soft">;
type ToolbarActionButtonSize = Extract<ButtonSize, "2xs" | "xs" | "sm" | "md" | "lg">;
interface ToolbarActionButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
    icon?: ReactNode;
    /** Trailing glyph (e.g. chevron-down for split-style buttons). */
    trailingIcon?: ReactNode;
    label?: ReactNode;
    count?: number | string;
    /** Color intent. "primary" is the accent hue. "danger" is destructive. */
    intent?: "neutral" | "primary" | "danger";
    /** Visual variant. Default "ghost". */
    variant?: ToolbarActionButtonVariant;
    /** Size preset. Default "md". */
    size?: ToolbarActionButtonSize;
    /** Icon-only (skip the label slot even if provided). */
    iconOnly?: boolean;
}
declare const ToolbarActionButton: react.ForwardRefExoticComponent<ToolbarActionButtonProps & react.RefAttributes<HTMLButtonElement>>;
declare const DataTableFilterButton: react.ForwardRefExoticComponent<Omit<ToolbarActionButtonProps, "label" | "icon"> & {
    label?: ReactNode;
} & {
    count?: number;
} & react.RefAttributes<HTMLButtonElement>>;
declare const DataTableRefreshButton: react.ForwardRefExoticComponent<Omit<ToolbarActionButtonProps, "label" | "icon"> & {
    label?: ReactNode;
} & react.RefAttributes<HTMLButtonElement>>;
/** Export: soft contrast by default. */
declare const DataTableExportButton: react.ForwardRefExoticComponent<Omit<ToolbarActionButtonProps, "label" | "icon"> & {
    label?: ReactNode;
} & react.RefAttributes<HTMLButtonElement>>;
/** Add — default `variant="solid"` with `intent="primary"` + trailing chevron. */
declare const DataTableAddButton: react.ForwardRefExoticComponent<Omit<ToolbarActionButtonProps, "label" | "icon"> & {
    label?: ReactNode;
} & {
    withChevron?: boolean;
} & react.RefAttributes<HTMLButtonElement>>;
declare const DataTableCustomizeButton: react.ForwardRefExoticComponent<Omit<ToolbarActionButtonProps, "label" | "icon"> & {
    label?: ReactNode;
} & react.RefAttributes<HTMLButtonElement>>;
declare const DataTableResetLayoutButton: react.ForwardRefExoticComponent<Omit<ToolbarActionButtonProps, "label" | "icon"> & {
    label?: ReactNode;
} & react.RefAttributes<HTMLButtonElement>>;
declare const DataTableHideColumnsButton: react.ForwardRefExoticComponent<Omit<ToolbarActionButtonProps, "label" | "icon"> & {
    label?: ReactNode;
} & react.RefAttributes<HTMLButtonElement>>;
declare const DataTableDeleteButton: react.ForwardRefExoticComponent<Omit<ToolbarActionButtonProps, "label" | "icon"> & {
    label?: ReactNode;
} & react.RefAttributes<HTMLButtonElement>>;
declare const DataTableCloseButton: react.ForwardRefExoticComponent<Omit<ToolbarActionButtonProps, "label" | "icon"> & {
    label?: ReactNode;
} & react.RefAttributes<HTMLButtonElement>>;
/** Icon-only search button (ghost). For a full search input, compose
 *  `<DataTable.GlobalFilter>` alongside. */
declare const DataTableSearchButton: react.ForwardRefExoticComponent<Omit<ToolbarActionButtonProps, "label" | "icon"> & {
    label?: ReactNode;
} & react.RefAttributes<HTMLButtonElement>>;
declare const DataTableSearchIcon: react_jsx_runtime.JSX.Element;

interface DataTableSearchFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "children" | "defaultValue" | "onChange" | "size" | "value"> {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    debounceMs?: number;
    clearable?: boolean;
    icon?: ReactNode;
    inputSize?: InputSize;
    wrapperClassName?: string;
}
declare function DataTableSearchField({ value, defaultValue, onValueChange, debounceMs, clearable, icon, inputSize, className, wrapperClassName, placeholder, "aria-label": ariaLabel, ...props }: DataTableSearchFieldProps): react_jsx_runtime.JSX.Element;

/** Card-grid view — each row renders as a card with label:value pairs. */
interface DataTableBoardProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    /** Override card rendering per row. */
    renderCard?: (row: Row<unknown>, index: number) => ReactNode;
    emptyMessage?: ReactNode;
    /** Hide columns in this list when rendering cards (e.g. `["__select","actions"]`). */
    skipColumns?: string[];
}
declare const DataTableBoard: react.ForwardRefExoticComponent<DataTableBoardProps & react.RefAttributes<HTMLDivElement>>;

/** Compact vertical-list view — first column is the primary line, the rest
 * are secondary inline fields. Good for mobile or narrow layouts. */
interface DataTableListProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    renderItem?: (row: Row<unknown>, index: number) => ReactNode;
    emptyMessage?: ReactNode;
    skipColumns?: string[];
}
declare const DataTableListView: react.ForwardRefExoticComponent<DataTableListProps & react.RefAttributes<HTMLDivElement>>;

interface DataTableViewModeToggleProps extends Omit<TabsProps, "children" | "defaultValue" | "onValueChange" | "value"> {
    /** Which modes to show — defaults to all three. */
    modes?: DataTableViewMode[];
    /** Custom labels per mode. */
    labels?: Partial<Record<DataTableViewMode, ReactNode>>;
    /** Custom icons per mode. */
    icons?: Partial<Record<DataTableViewMode, ReactNode>>;
    /** Tabs visual style. Defaults to the design-system segmented control. */
    variant?: TabsVariant;
    /** Size preset shared with Button/Input/Select. */
    size?: TabsSize;
}
declare const DataTableViewModeToggle: react.ForwardRefExoticComponent<Omit<DataTableViewModeToggleProps, "ref"> & react.RefAttributes<HTMLDivElement>>;

interface DataTableViewsProps {
    /** Render-prop override. If omitted, auto-dispatches to default Table/Board/List. */
    children?: (viewMode: DataTableViewMode) => ReactNode;
    /** Default children for each mode when not using render-prop. */
    table?: ReactNode;
    board?: ReactNode;
    list?: ReactNode;
    /** Hide these columns in board/list auto-renders. */
    skipColumns?: string[];
    emptyMessage?: ReactNode;
}
/**
 * View dispatcher — reads `viewMode` from context and renders one of:
 *   - the matching slot (table/board/list) if provided,
 *   - a render-prop fallback,
 *   - or sensible defaults (Board + List auto, Table must be provided).
 *
 * The Table view has no default because consumers usually need to compose
 * their own `<ScrollArea><Table><Header/><Body/></Table></ScrollArea>`.
 */
declare function DataTableViews({ children, table, board, list, skipColumns, emptyMessage, }: DataTableViewsProps): react_jsx_runtime.JSX.Element;

type CellEditorMode = "text" | "number" | "date";
interface CellEditorProps {
    mode?: CellEditorMode;
    value: string | number;
    onValueChange: (v: string | number) => void;
    onCommit: () => void;
    onCancel: () => void;
    autoFocus?: boolean;
    className?: string;
}
declare const CellEditor: react.ForwardRefExoticComponent<CellEditorProps & react.RefAttributes<HTMLInputElement>>;

interface EditableCellProps<TData = unknown, TValue = unknown> extends Omit<TdHTMLAttributes<HTMLTableCellElement>, "children"> {
    cell: Cell<TData, TValue>;
    mode?: CellEditorMode;
    /** Read the current value for editing. Default: `cell.getValue()`. */
    getValue?: () => string | number;
}
declare const EditableCell: react.ForwardRefExoticComponent<EditableCellProps<unknown, unknown> & react.RefAttributes<HTMLTableCellElement>>;

interface UseCellEditOptions<TValue> {
    initialValue: TValue;
}
interface UseCellEditResult<TValue> {
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
declare function useCellEdit<TData, TValue>(cell: Cell<TData, TValue>, options: UseCellEditOptions<TValue>): UseCellEditResult<TValue>;

type FilterFieldType = "select" | "text" | "date" | "date-range" | "number" | "boolean";
interface FilterFieldDefinition {
    id: string;
    label: string;
    icon?: ReactNode;
    type: FilterFieldType;
    options?: {
        label: string;
        value: unknown;
    }[];
    placeholder?: string;
    /** Group under "Shown" (default) or "Popular". */
    category?: "shown" | "popular";
}
type ComparisonOperator = "equals" | "notEquals" | "contains" | "notContains" | "greaterThan" | "lessThan" | "between";
interface FilterCondition {
    id: string;
    fieldId: string;
    fieldLabel: string;
    comparison: ComparisonOperator;
    value: unknown;
    /** Second value, used only for `between`. */
    value2?: unknown;
}
type FilterLogicOperator = "AND" | "OR";
interface FilterGroup {
    id: string;
    operator: FilterLogicOperator;
    conditions: FilterCondition[];
}
declare function countConditions(groups: FilterGroup[]): number;

interface DataTableFilterDrawerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    /** Fields the user can add conditions against. */
    availableFilters: FilterFieldDefinition[];
    /** Currently-active filter groups (controlled). */
    filterGroups?: FilterGroup[];
    /** Fired on Apply. */
    onApplyFilters: (groups: FilterGroup[]) => void;
    title?: string;
    /** Drawer side. Default "right". */
    side?: "left" | "right" | "top" | "bottom";
}
declare function DataTableFilterDrawer({ open, onOpenChange, availableFilters, filterGroups: externalGroups, onApplyFilters, title, side, }: DataTableFilterDrawerProps): react_jsx_runtime.JSX.Element;

interface FilterConfigPanelProps {
    field: FilterFieldDefinition;
    onAdd: (cond: FilterCondition) => void;
    onCancel: () => void;
}
declare function FilterConfigPanel({ field, onAdd, onCancel, }: FilterConfigPanelProps): react_jsx_runtime.JSX.Element;

declare const DataTable: {
    readonly Root: <TData, TValue = unknown>(props: DataTableRootProps<TData, TValue> & {
        ref?: React.Ref<HTMLDivElement>;
    }) => React.ReactElement;
    readonly Toolbar: react.ForwardRefExoticComponent<DataTableToolbarProps & react.RefAttributes<HTMLDivElement>>;
    readonly ScrollArea: react.ForwardRefExoticComponent<DataTableScrollAreaProps & react.RefAttributes<HTMLDivElement>>;
    readonly Table: react.ForwardRefExoticComponent<DataTableTableProps & react.RefAttributes<HTMLTableElement>>;
    readonly Header: react.ForwardRefExoticComponent<DataTableHeaderProps & react.RefAttributes<HTMLTableSectionElement>>;
    readonly HeaderGroup: react.ForwardRefExoticComponent<DataTableHeaderGroupProps<unknown> & react.RefAttributes<HTMLTableRowElement>>;
    readonly HeaderCell: react.ForwardRefExoticComponent<DataTableHeaderCellProps<unknown, unknown> & react.RefAttributes<HTMLTableCellElement>>;
    readonly SortTrigger: react.ForwardRefExoticComponent<DataTableSortTriggerProps<unknown, unknown> & react.RefAttributes<HTMLButtonElement>>;
    readonly ResizeHandle: react.ForwardRefExoticComponent<DataTableResizeHandleProps<unknown, unknown> & react.RefAttributes<HTMLDivElement>>;
    readonly ColumnGuide: typeof DataTableColumnGuide;
    readonly PinColumnTrigger: react.ForwardRefExoticComponent<DataTablePinColumnTriggerProps<unknown, unknown> & react.RefAttributes<HTMLButtonElement>>;
    readonly Body: react.ForwardRefExoticComponent<DataTableBodyProps<unknown> & react.RefAttributes<HTMLTableSectionElement>>;
    readonly Row: react.ForwardRefExoticComponent<DataTableRowProps<unknown> & react.RefAttributes<HTMLTableRowElement>>;
    readonly Cell: react.ForwardRefExoticComponent<DataTableCellProps<unknown, unknown> & react.RefAttributes<HTMLTableCellElement>>;
    readonly EditableCell: react.ForwardRefExoticComponent<EditableCellProps<unknown, unknown> & react.RefAttributes<HTMLTableCellElement>>;
    readonly GroupHeaderRow: react.ForwardRefExoticComponent<DataTableGroupHeaderRowProps<unknown> & react.RefAttributes<HTMLTableRowElement>>;
    readonly RowExpandTrigger: react.ForwardRefExoticComponent<DataTableRowExpandTriggerProps<unknown> & react.RefAttributes<HTMLButtonElement>>;
    readonly RowPinTrigger: react.ForwardRefExoticComponent<DataTableRowPinTriggerProps<unknown> & react.RefAttributes<HTMLButtonElement>>;
    readonly Footer: react.ForwardRefExoticComponent<DataTableFooterProps & react.RefAttributes<HTMLTableSectionElement>>;
    readonly FooterRow: react.ForwardRefExoticComponent<DataTableFooterRowProps<unknown> & react.RefAttributes<HTMLTableRowElement>>;
    readonly FooterCell: react.ForwardRefExoticComponent<DataTableFooterCellProps<unknown, unknown> & react.RefAttributes<HTMLTableCellElement>>;
    readonly SelectAllCheckbox: typeof DataTableSelectAllCheckbox;
    readonly RowSelectCheckbox: typeof DataTableRowSelectCheckbox;
    readonly Empty: react.ForwardRefExoticComponent<DataTableEmptyProps & react.RefAttributes<HTMLDivElement>>;
    readonly LoadingOverlay: react.ForwardRefExoticComponent<DataTableLoadingOverlayProps & react.RefAttributes<HTMLDivElement>>;
    readonly Views: typeof DataTableViews;
    readonly Board: react.ForwardRefExoticComponent<DataTableBoardProps & react.RefAttributes<HTMLDivElement>>;
    readonly List: react.ForwardRefExoticComponent<DataTableListProps & react.RefAttributes<HTMLDivElement>>;
    readonly ViewModeToggle: react.ForwardRefExoticComponent<Omit<DataTableViewModeToggleProps, "ref"> & react.RefAttributes<HTMLDivElement>>;
    readonly ActionButton: react.ForwardRefExoticComponent<ToolbarActionButtonProps & react.RefAttributes<HTMLButtonElement>>;
    readonly FilterButton: react.ForwardRefExoticComponent<Omit<ToolbarActionButtonProps, "label" | "icon"> & {
        label?: react.ReactNode;
    } & {
        count?: number;
    } & react.RefAttributes<HTMLButtonElement>>;
    readonly RefreshButton: react.ForwardRefExoticComponent<Omit<ToolbarActionButtonProps, "label" | "icon"> & {
        label?: react.ReactNode;
    } & react.RefAttributes<HTMLButtonElement>>;
    readonly ExportButton: react.ForwardRefExoticComponent<Omit<ToolbarActionButtonProps, "label" | "icon"> & {
        label?: react.ReactNode;
    } & react.RefAttributes<HTMLButtonElement>>;
    readonly AddButton: react.ForwardRefExoticComponent<Omit<ToolbarActionButtonProps, "label" | "icon"> & {
        label?: react.ReactNode;
    } & {
        withChevron?: boolean;
    } & react.RefAttributes<HTMLButtonElement>>;
    readonly CustomizeButton: react.ForwardRefExoticComponent<Omit<ToolbarActionButtonProps, "label" | "icon"> & {
        label?: react.ReactNode;
    } & react.RefAttributes<HTMLButtonElement>>;
    readonly ResetLayoutButton: react.ForwardRefExoticComponent<Omit<ToolbarActionButtonProps, "label" | "icon"> & {
        label?: react.ReactNode;
    } & react.RefAttributes<HTMLButtonElement>>;
    readonly HideColumnsButton: react.ForwardRefExoticComponent<Omit<ToolbarActionButtonProps, "label" | "icon"> & {
        label?: react.ReactNode;
    } & react.RefAttributes<HTMLButtonElement>>;
    readonly DeleteButton: react.ForwardRefExoticComponent<Omit<ToolbarActionButtonProps, "label" | "icon"> & {
        label?: react.ReactNode;
    } & react.RefAttributes<HTMLButtonElement>>;
    readonly CloseButton: react.ForwardRefExoticComponent<Omit<ToolbarActionButtonProps, "label" | "icon"> & {
        label?: react.ReactNode;
    } & react.RefAttributes<HTMLButtonElement>>;
    readonly SearchField: typeof DataTableSearchField;
    readonly GlobalFilter: react.ForwardRefExoticComponent<DataTableGlobalFilterProps & react.RefAttributes<HTMLInputElement>>;
    readonly FilterBar: react.ForwardRefExoticComponent<DataTableFilterBarProps & react.RefAttributes<HTMLDivElement>>;
    readonly FilterChip: typeof DataTableFilterChipItem;
    readonly ColumnVisibility: typeof DataTableColumnVisibility;
    readonly Pagination: {
        readonly Root: react.ForwardRefExoticComponent<PaginationRootProps & react.RefAttributes<HTMLElement>>;
        readonly Prev: react.ForwardRefExoticComponent<PaginationButtonProps & react.RefAttributes<HTMLButtonElement>>;
        readonly Next: react.ForwardRefExoticComponent<PaginationButtonProps & react.RefAttributes<HTMLButtonElement>>;
        readonly PageSize: typeof PaginationPageSize;
        readonly Info: react.ForwardRefExoticComponent<PaginationInfoProps & react.RefAttributes<HTMLDivElement>>;
        readonly Pages: typeof PaginationPages;
        readonly Default: typeof PaginationDefault;
    };
    readonly Filters: {
        readonly Text: react.ForwardRefExoticComponent<TextFilterProps<unknown, unknown> & react.RefAttributes<HTMLInputElement>>;
        readonly Number: react.ForwardRefExoticComponent<NumberFilterProps<unknown, unknown> & react.RefAttributes<HTMLDivElement>>;
        readonly Select: react.ForwardRefExoticComponent<SelectFilterProps<unknown, unknown> & react.RefAttributes<HTMLSelectElement>>;
        readonly Date: react.ForwardRefExoticComponent<DateFilterProps<unknown, unknown> & react.RefAttributes<HTMLDivElement>>;
        readonly Popover: typeof FilterPopover;
    };
    readonly FilterDrawer: typeof DataTableFilterDrawer;
    readonly BulkActions: {
        readonly Root: react.ForwardRefExoticComponent<DataTableBulkActionsProps & react.RefAttributes<HTMLDivElement>>;
        readonly Count: react.ForwardRefExoticComponent<DataTableBulkCountProps & react.RefAttributes<HTMLSpanElement>>;
        readonly Clear: react.ForwardRefExoticComponent<DataTableBulkClearProps & react.RefAttributes<HTMLButtonElement>>;
        readonly SelectAllAcrossPages: typeof DataTableSelectAllAcrossPages;
    };
    readonly Cells: {
        readonly Actions: typeof ActionsCell;
        readonly Avatar: typeof AvatarCell;
        readonly Badge: typeof BadgeCell;
        readonly StatusBadge: typeof StatusBadgeCell;
        readonly Copyable: typeof CopyableCell;
        readonly Date: typeof DateCell;
        readonly Link: typeof LinkCell;
        readonly Number: typeof NumberCell;
        readonly Text: typeof TextCell;
    };
};

declare function useDataTable<TData, TValue = unknown>(options: DataTableOptions<TData, TValue>): Table<TData>;

interface DataTableContextValue<TData = unknown> {
    table: Table<TData>;
    size: DataTableSize;
    interactionMode: DataTableInteractionMode;
    bordered: DataTableBorderMode;
    striped: boolean;
    stickyHeader: boolean;
    mode: DataTableMode;
    virtualization: false | DataTableVirtualizationOptions;
    columnResizeMode: "onChange" | "onEnd";
    tableId: string;
    scrollRef: MutableRefObject<HTMLDivElement | null>;
    rowCount: number | undefined;
    viewMode: DataTableViewMode;
    setViewMode: (mode: DataTableViewMode) => void;
    onCellEdit?: (row: Row<TData>, columnId: string, nextValue: unknown) => void | Promise<void>;
    onDataRequest?: (state: DataTableServerRequestState) => void;
}
declare function useDataTableContext<TData = unknown>(): DataTableContextValue<TData>;

type Updater<T> = T | ((prev: T) => T);
interface UseControllableStateOptions<T> {
    value?: T;
    defaultValue: T;
    onChange?: (next: T) => void;
}
declare function useControllableState<T>({ value, defaultValue, onChange, }: UseControllableStateOptions<T>): [T, Dispatch<SetStateAction<T>>];
declare function resolveUpdater<T>(updater: Updater<T>, prev: T): T;

interface DataTablePreferenceState {
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
interface DataTablePreferencesAdapter {
    load?: () => DataTablePreferenceState | null | Promise<DataTablePreferenceState | null>;
    save?: (state: DataTablePreferenceState) => void | Promise<void>;
    clear?: () => void | Promise<void>;
}
interface DataTablePreferencesOptions {
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
interface DataTablePreferenceStatePairs {
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
interface UseDataTablePreferencesResult {
    preferences: DataTablePreferenceState;
    setPreferences: (next: DataTablePreferenceState) => void;
    updatePreferences: (patch: DataTablePreferenceState) => void;
    resetPreferences: () => void;
    statePairs: DataTablePreferenceStatePairs;
}
declare function useDataTablePreferences({ value, defaultValue, onValueChange, adapter, storageKey, autoSave, debounceMs, }?: DataTablePreferencesOptions): UseDataTablePreferencesResult;

interface UseColumnResizeResult {
    isResizing: boolean;
    currentSize: number;
    minSize: number;
    maxSize: number;
    /** Keyboard adjust: Arrow ±8 px, Shift+Arrow ±32 px, Home/End to min/max. */
    onKeyDownAdjust(event: KeyboardEvent<HTMLElement>): void;
    /** Style for the .vds-data-table-resize-guideline overlay. */
    getGuidelineStyle(): CSSProperties;
}
declare function useColumnResize<TData, TValue>(header: Header<TData, TValue>): UseColumnResizeResult;

interface UseAutoFitColumnResult {
    /** Measure visible rendered cells for this column; apply as new size. */
    fit(): void;
    /** Measure only, without applying. */
    measure(): number;
    minSize: number;
    maxSize: number;
}
declare function useAutoFitColumn(columnId: string): UseAutoFitColumnResult;

interface UseColumnFilterResult<T> {
    value: T | undefined;
    setValue: (next: T | undefined) => void;
    clear: () => void;
    isActive: boolean;
}
/**
 * Thin wrapper over `column.getFilterValue()` / `setFilterValue()` that
 * provides a typed interface, a clear helper, and an `isActive` flag.
 */
declare function useColumnFilter<T, TData = unknown, TValue = unknown>(column: Column<TData, TValue>): UseColumnFilterResult<T>;

interface UseDataTableVirtualizerOptions {
    count: number;
    scrollRef: MutableRefObject<HTMLElement | null>;
    estimateSize?: number;
    overscan?: number;
}
declare function useDataTableVirtualizer({ count, scrollRef, estimateSize, overscan, }: UseDataTableVirtualizerOptions): Virtualizer<HTMLElement, Element>;

/**
 * Build the per-column CSS custom properties to put on the <table> element.
 * Only these change on resize; cells reference them via `var(--col-<id>)`
 * through an indirection set once per column on the <th>/<td>.
 *
 * Returns { --col-<id>: "<px>px", ... } as a CSSProperties-compatible object.
 */
declare function buildColumnSizeVars<TData>(table: Table<TData>): CSSProperties;
declare function columnVar(columnId: string): string;

export { type ActionItem, ActionsCell, type ActionsCellProps, AvatarCell, type AvatarCellProps, BadgeCell, type BadgeCellProps, BulkActions, CellEditor, type CellEditorMode, type CellEditorProps, Cells, type ComparisonOperator, CopyableCell, type CopyableCellProps, DataTable, DataTableAddButton, DataTableBoard, type DataTableBoardProps, DataTableBodyProps, DataTableBorderMode, DataTableBulkActions, type DataTableBulkActionsProps, DataTableBulkClear, type DataTableBulkClearProps, DataTableBulkCount, type DataTableBulkCountProps, DataTableCellProps, DataTableCloseButton, DataTableColumnGuide, DataTableColumnVisibility, type DataTableContextValue, DataTableCustomizeButton, DataTableDeleteButton, DataTableEmptyProps, DataTableExportButton, DataTableFilterBar, type DataTableFilterBarProps, DataTableFilterButton, type DataTableFilterChip, DataTableFilterChipItem, type DataTableFilterChipItemProps, DataTableFilterDrawer, type DataTableFilterDrawerProps, DataTableFooterCellProps, DataTableFooterProps, DataTableFooterRowProps, DataTableGlobalFilterProps, DataTableGroupHeaderRowProps, DataTableHeaderCellProps, DataTableHeaderGroupProps, DataTableHeaderProps, DataTableHideColumnsButton, DataTableInteractionMode, type DataTableListProps, DataTableListView, DataTableLoadingOverlayProps, DataTableMode, DataTableOptions, DataTablePinColumnTriggerProps, type DataTablePreferenceState, type DataTablePreferenceStatePairs, type DataTablePreferencesAdapter, type DataTablePreferencesOptions, DataTableRefreshButton, DataTableResetLayoutButton, DataTableResizeHandleProps, DataTableRootProps, DataTableRowExpandTriggerProps, DataTableRowPinTriggerProps, DataTableRowProps, DataTableRowSelectCheckbox, DataTableScrollAreaProps, DataTableSearchButton, DataTableSearchField, type DataTableSearchFieldProps, DataTableSearchIcon, DataTableSelectAllAcrossPages, type DataTableSelectAllAcrossPagesProps, DataTableSelectAllCheckbox, DataTableServerRequestState, DataTableSize, DataTableSortTriggerProps, DataTableTableProps, DataTableToolbarProps, DataTableViewMode, DataTableViewModeToggle, type DataTableViewModeToggleProps, DataTableViews, type DataTableViewsProps, DataTableVirtualizationOptions, DateCell, type DateCellProps, DateFilter, type DateFilterProps, type DateFormat, type DateRange, EditableCell, type EditableCellProps, type FilterCondition, FilterConfigPanel, type FilterConfigPanelProps, type FilterFieldDefinition, type FilterFieldType, type FilterGroup, type FilterLogicOperator, FilterPopover, type FilterPopoverProps, Filters, LinkCell, type LinkCellProps, NumberCell, type NumberCellProps, NumberFilter, type NumberFilterProps, type NumberFormat, type NumberRange, Pagination, type PaginationButtonProps, PaginationDefault, type PaginationDefaultProps, PaginationInfo, type PaginationInfoProps, PaginationNext, PaginationPageSize, type PaginationPageSizeProps, PaginationPages, type PaginationPagesProps, PaginationPrev, PaginationRoot, type PaginationRootProps, SelectFilter, type SelectFilterOption, type SelectFilterProps, StatusBadgeCell, type StatusBadgeCellProps, type StatusTone, TextCell, type TextCellProps, TextFilter, type TextFilterProps, ToolbarActionButton, type ToolbarActionButtonProps, type UseAutoFitColumnResult, type UseCellEditOptions, type UseCellEditResult, type UseColumnFilterResult, type UseColumnResizeResult, type UseDataTablePreferencesResult, type UseDataTableVirtualizerOptions, buildColumnSizeVars, columnVar, countConditions, resolveUpdater, useAutoFitColumn, useCellEdit, useColumnFilter, useColumnResize, useControllableState, useDataTable, useDataTableContext, useDataTablePreferences, useDataTableVirtualizer };
