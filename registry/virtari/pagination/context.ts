import { createContext, useContext } from "react";

export type PaginationSize = "sm" | "md" | "lg";

export interface PaginationContextValue {
  page: number;
  pageSize: number;
  total: number;
  pageCount: number;
  pageSizeOptions: number[];
  siblingCount: number;
  size: PaginationSize;
  canPrev: boolean;
  canNext: boolean;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
}

export const PaginationContext = createContext<PaginationContextValue | null>(
  null,
);

export function usePaginationContext(): PaginationContextValue {
  const ctx = useContext(PaginationContext);
  if (!ctx) {
    throw new Error(
      "Pagination parts must be rendered inside <Pagination.Root>.",
    );
  }
  return ctx;
}
