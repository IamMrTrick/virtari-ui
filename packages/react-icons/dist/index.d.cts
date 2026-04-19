import { IconProps as IconProps$1 } from '@tabler/icons-react';
export * from '@tabler/icons-react';
export { Icon as TablerIcon, IconProps as TablerIconProps } from '@tabler/icons-react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import { ForwardRefExoticComponent, RefAttributes, Ref, ReactNode } from 'react';

type IconSize = "xs" | "sm" | "md" | "lg" | "xl" | number;
type IconColor = "current" | "muted" | "subtle" | "primary" | "secondary" | "success" | "warning" | "danger" | "info" | (string & {});
type TablerIconComponent = ForwardRefExoticComponent<IconProps$1 & RefAttributes<SVGSVGElement>>;
interface IconProps extends Omit<IconProps$1, "size" | "color" | "ref"> {
    icon: TablerIconComponent;
    size?: IconSize;
    color?: IconColor;
    label?: string;
    ref?: Ref<SVGSVGElement>;
}
declare function Icon({ icon: TablerComp, size, color, stroke, label, className, ref, ...rest }: IconProps): react_jsx_runtime.JSX.Element;

interface IconDefaults {
    size?: IconSize;
    color?: IconColor;
    stroke?: number | string;
}
declare const IconContext: react.Context<IconDefaults>;
declare function useIconDefaults(): IconDefaults;
interface IconProviderProps extends IconDefaults {
    children: ReactNode;
}
declare function IconProvider({ children, size, color, stroke }: IconProviderProps): react_jsx_runtime.JSX.Element;

export { Icon, type IconColor, IconContext, type IconDefaults, type IconProps, IconProvider, type IconProviderProps, type IconSize, useIconDefaults };
