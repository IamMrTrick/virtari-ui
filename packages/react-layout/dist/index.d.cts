import * as react_jsx_runtime from 'react/jsx-runtime';
import { HTMLAttributes, ElementType, Ref } from 'react';

type StackGap = "xs" | "sm" | "md" | "lg" | "xl";
interface StackProps extends HTMLAttributes<HTMLElement> {
    as?: ElementType;
    gap?: StackGap;
    recursive?: boolean;
    ref?: Ref<HTMLElement>;
}
declare function Stack({ as: Tag, gap, recursive, className, ref, ...rest }: StackProps): react_jsx_runtime.JSX.Element;

type ClusterGap = "xs" | "sm" | "md" | "lg" | "xl";
type ClusterAlign = "start" | "center" | "end" | "baseline" | "stretch";
type ClusterJustify = "start" | "center" | "end" | "between" | "around" | "evenly";
interface ClusterProps extends HTMLAttributes<HTMLElement> {
    as?: ElementType;
    gap?: ClusterGap;
    align?: ClusterAlign;
    justify?: ClusterJustify;
    ref?: Ref<HTMLElement>;
}
declare function Cluster({ as: Tag, gap, align, justify, className, ref, ...rest }: ClusterProps): react_jsx_runtime.JSX.Element;

type GridGap = "xs" | "sm" | "md" | "lg" | "xl";
interface GridProps extends HTMLAttributes<HTMLElement> {
    as?: ElementType;
    gap?: GridGap;
    minItemWidth?: string;
    ref?: Ref<HTMLElement>;
}
declare function Grid({ as: Tag, gap, minItemWidth, className, style, ref, ...rest }: GridProps): react_jsx_runtime.JSX.Element;

type SidebarSide = "start" | "end";
type SidebarGap = "xs" | "sm" | "md" | "lg" | "xl";
interface SidebarProps extends HTMLAttributes<HTMLElement> {
    as?: ElementType;
    side?: SidebarSide;
    sideWidth?: string;
    contentMin?: string;
    gap?: SidebarGap;
    ref?: Ref<HTMLElement>;
}
declare function Sidebar({ as: Tag, side, sideWidth, contentMin, gap, className, style, ref, ...rest }: SidebarProps): react_jsx_runtime.JSX.Element;

type CenterMaxWidth = "sm" | "md" | "lg" | "xl";
type CenterGutter = "none" | "sm" | "md" | "lg";
interface CenterProps extends HTMLAttributes<HTMLElement> {
    as?: ElementType;
    maxWidth?: CenterMaxWidth;
    gutter?: CenterGutter;
    intrinsic?: boolean;
    maxInlineSize?: string;
    ref?: Ref<HTMLElement>;
}
declare function Center({ as: Tag, maxWidth, gutter, intrinsic, maxInlineSize, className, style, ref, ...rest }: CenterProps): react_jsx_runtime.JSX.Element;

export { Center, type CenterGutter, type CenterMaxWidth, type CenterProps, Cluster, type ClusterAlign, type ClusterGap, type ClusterJustify, type ClusterProps, Grid, type GridGap, type GridProps, Sidebar, type SidebarGap, type SidebarProps, type SidebarSide, Stack, type StackGap, type StackProps };
