import {
  DataTableBulkActions,
  DataTableBulkClear,
  DataTableBulkCount,
  DataTableSelectAllAcrossPages,
} from "./BulkActions";

export {
  DataTableBulkActions,
  DataTableBulkClear,
  DataTableBulkCount,
  DataTableSelectAllAcrossPages,
};

export type {
  DataTableBulkActionsProps,
  DataTableBulkClearProps,
  DataTableBulkCountProps,
  DataTableSelectAllAcrossPagesProps,
} from "./BulkActions";

export const BulkActions = {
  Root: DataTableBulkActions,
  Count: DataTableBulkCount,
  Clear: DataTableBulkClear,
  SelectAllAcrossPages: DataTableSelectAllAcrossPages,
} as const;
