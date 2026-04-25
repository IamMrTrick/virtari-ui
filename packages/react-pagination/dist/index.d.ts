import * as react from 'react';
import { HTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { SelectSize } from '@virtari-packages/react-select';

type PaginationSize = "sm" | "md" | "lg";
interface PaginationContextValue {
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
declare const PaginationContext: react.Context<PaginationContextValue | null>;
declare function usePaginationContext(): PaginationContextValue;

interface PaginationRootProps extends Omit<HTMLAttributes<HTMLElement>, "onChange"> {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
    onPageSizeChange?: (size: number) => void;
    pageSizeOptions?: number[];
    siblingCount?: number;
    size?: PaginationSize;
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
    size?: SelectSize;
}
declare function PaginationPageSize({ options, className, label, size, }: PaginationPageSizeProps): react_jsx_runtime.JSX.Element;
interface PaginationPagesProps {
    className?: string;
    siblingCount?: number;
}
declare function PaginationPages({ className, siblingCount, }: PaginationPagesProps): react_jsx_runtime.JSX.Element;
interface PaginationDefaultProps extends PaginationRootProps {
    hidePageSize?: boolean;
    hidePageNumbers?: boolean;
    hideInfo?: boolean;
}
declare function PaginationDefault({ hidePageSize, hidePageNumbers, hideInfo, children, ...rootProps }: PaginationDefaultProps): react_jsx_runtime.JSX.Element;

type PageRangeItem = number | "ellipsis-l" | "ellipsis-r";
/**
 * Build the sequence of page buttons to render, inserting ellipsis markers
 * when there are more pages than fit in the sibling window. Returns 0-based
 * page indices (and "ellipsis-l"/"ellipsis-r" placeholders).
 *
 * @param current 0-based current page index
 * @param total total number of pages (page count)
 * @param siblingCount middle window size
 */
declare function computePageRange(current: number, total: number, siblingCount: number): PageRangeItem[];

declare const Pagination: {
    readonly Root: react.ForwardRefExoticComponent<PaginationRootProps & react.RefAttributes<HTMLElement>>;
    readonly Prev: react.ForwardRefExoticComponent<PaginationButtonProps & react.RefAttributes<HTMLButtonElement>>;
    readonly Next: react.ForwardRefExoticComponent<PaginationButtonProps & react.RefAttributes<HTMLButtonElement>>;
    readonly PageSize: typeof PaginationPageSize;
    readonly Info: react.ForwardRefExoticComponent<PaginationInfoProps & react.RefAttributes<HTMLDivElement>>;
    readonly Pages: typeof PaginationPages;
    readonly Default: typeof PaginationDefault;
};

export { type PageRangeItem, Pagination, type PaginationButtonProps, PaginationContext, type PaginationContextValue, PaginationDefault, type PaginationDefaultProps, PaginationInfo, type PaginationInfoProps, PaginationNext, PaginationPageSize, type PaginationPageSizeProps, PaginationPages, type PaginationPagesProps, PaginationPrev, PaginationRoot, type PaginationRootProps, type PaginationSize, computePageRange, usePaginationContext };
