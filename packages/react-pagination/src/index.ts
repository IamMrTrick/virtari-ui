import {
  PaginationDefault,
  PaginationInfo,
  PaginationNext,
  PaginationPageSize,
  PaginationPages,
  PaginationPrev,
  PaginationRoot,
} from "./Pagination";

export {
  PaginationDefault,
  PaginationInfo,
  PaginationNext,
  PaginationPageSize,
  PaginationPages,
  PaginationPrev,
  PaginationRoot,
};

export type {
  PaginationButtonProps,
  PaginationDefaultProps,
  PaginationInfoProps,
  PaginationPageSizeProps,
  PaginationPagesProps,
  PaginationRootProps,
} from "./Pagination";

export { computePageRange } from "./use-pagination";
export type { PageRangeItem } from "./use-pagination";

export {
  PaginationContext,
  usePaginationContext,
  type PaginationContextValue,
  type PaginationSize,
} from "./context";

export const Pagination = {
  Root: PaginationRoot,
  Prev: PaginationPrev,
  Next: PaginationNext,
  PageSize: PaginationPageSize,
  Info: PaginationInfo,
  Pages: PaginationPages,
  Default: PaginationDefault,
} as const;
