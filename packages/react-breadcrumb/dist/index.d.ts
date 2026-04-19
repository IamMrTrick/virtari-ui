import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode, Ref } from 'react';
import { TablerIcon } from '@virtari/react-icons';

type BreadcrumbVariant = "default" | "underline" | "ghost" | "soft" | "solid";
type BreadcrumbSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl";
type BreadcrumbSeparatorPreset = "chevron" | "slash" | "dot" | "arrow";
interface BreadcrumbItemData {
    /** Visible label. Strings are also used by the JSON-LD `name` field. */
    label: ReactNode;
    /** Omit `href` to render the item as the current page (`<span aria-current="page">`). */
    href?: string;
    /** Optional leading icon (Tabler icon component). */
    icon?: TablerIcon;
    /** Optional explicit override for the JSON-LD `name`. Useful when `label` is a non-string node. */
    name?: string;
}
interface BreadcrumbProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
    variant?: BreadcrumbVariant;
    size?: BreadcrumbSize;
    /** Default separator preset used by every `<BreadcrumbSeparator>` without explicit children. */
    separator?: BreadcrumbSeparatorPreset;
    /** Convenience array API. When provided, Root renders the list itself; `children` is ignored. */
    items?: BreadcrumbItemData[];
    /** When `items.length > maxItems`, collapse the middle into an ellipsis menu. Disabled when undefined. */
    maxItems?: number;
    /** Items to keep visible at the start before the ellipsis. Default: 1. */
    itemsBeforeCollapse?: number;
    /** Items to keep visible at the end after the ellipsis. Default: 1. */
    itemsAfterCollapse?: number;
    /** Inject a `<script type="application/ld+json">` with schema.org BreadcrumbList. Requires `items`. */
    seo?: boolean;
    /** Base URL used to resolve relative `href`s into absolute URLs in the JSON-LD payload. */
    seoBaseUrl?: string;
    /** Accessible label for the `<nav>` landmark. Default: "Breadcrumb". */
    "aria-label"?: string;
    children?: ReactNode;
    ref?: Ref<HTMLElement>;
}
declare function Breadcrumb({ variant, size, separator, items, maxItems, itemsBeforeCollapse, itemsAfterCollapse, seo, seoBaseUrl, className, children, ref, "aria-label": ariaLabel, ...props }: BreadcrumbProps): react_jsx_runtime.JSX.Element;
interface BreadcrumbListProps extends React.OlHTMLAttributes<HTMLOListElement> {
    ref?: Ref<HTMLOListElement>;
}
declare function BreadcrumbList({ className, ref, ...props }: BreadcrumbListProps): react_jsx_runtime.JSX.Element;
interface BreadcrumbItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
    ref?: Ref<HTMLLIElement>;
}
declare function BreadcrumbItem({ className, ref, ...props }: BreadcrumbItemProps): react_jsx_runtime.JSX.Element;
interface BreadcrumbLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    asChild?: boolean;
    ref?: Ref<HTMLAnchorElement>;
}
declare function BreadcrumbLink({ asChild, className, ref, ...props }: BreadcrumbLinkProps): react_jsx_runtime.JSX.Element;
interface BreadcrumbPageProps extends React.HTMLAttributes<HTMLSpanElement> {
    ref?: Ref<HTMLSpanElement>;
}
declare function BreadcrumbPage({ className, ref, ...props }: BreadcrumbPageProps): react_jsx_runtime.JSX.Element;
interface BreadcrumbSeparatorProps extends React.LiHTMLAttributes<HTMLLIElement> {
    /** Override the preset for this single separator (otherwise inherits from Root). */
    preset?: BreadcrumbSeparatorPreset;
    /** Override the rendered content. When provided, takes precedence over the preset icon. */
    children?: ReactNode;
    ref?: Ref<HTMLLIElement>;
}
declare function BreadcrumbSeparator({ preset, className, children, ref, ...props }: BreadcrumbSeparatorProps): react_jsx_runtime.JSX.Element;
interface BreadcrumbEllipsisProps {
    /** Items to render inside the popover menu. */
    items?: BreadcrumbItemData[];
    /** Accessible label for the trigger button. */
    label?: string;
    className?: string;
}
declare function BreadcrumbEllipsis({ items, label, className, }: BreadcrumbEllipsisProps): react_jsx_runtime.JSX.Element;
interface BreadcrumbHomeProps extends Omit<BreadcrumbLinkProps, "children"> {
    /** Default: "/". */
    href?: string;
    /** Default: "Home". Used as `aria-label`. */
    label?: string;
    /** Optional visible label rendered next to the icon. */
    children?: ReactNode;
}
declare function BreadcrumbHome({ href, label, children, ...props }: BreadcrumbHomeProps): react_jsx_runtime.JSX.Element;

export { Breadcrumb, BreadcrumbEllipsis, type BreadcrumbEllipsisProps, BreadcrumbHome, type BreadcrumbHomeProps, BreadcrumbItem, type BreadcrumbItemData, type BreadcrumbItemProps, BreadcrumbLink, type BreadcrumbLinkProps, BreadcrumbList, type BreadcrumbListProps, BreadcrumbPage, type BreadcrumbPageProps, type BreadcrumbProps, BreadcrumbSeparator, type BreadcrumbSeparatorPreset, type BreadcrumbSeparatorProps, type BreadcrumbSize, type BreadcrumbVariant };
