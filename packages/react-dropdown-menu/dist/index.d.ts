import * as react from 'react';
import { Ref, ComponentRef } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

interface DropdownMenuProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root> {
    /** Reading direction. Defaults to the document's active direction. */
    dir?: "ltr" | "rtl";
}
declare function DropdownMenu({ dir, ...props }: DropdownMenuProps): react_jsx_runtime.JSX.Element;
declare const DropdownMenuTrigger: react.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuTriggerProps & react.RefAttributes<HTMLButtonElement>>;
declare const DropdownMenuGroup: react.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuGroupProps & react.RefAttributes<HTMLDivElement>>;
interface DropdownMenuContentProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> {
    ref?: Ref<ComponentRef<typeof DropdownMenuPrimitive.Content>>;
}
declare function DropdownMenuContent({ className, sideOffset, ref, ...props }: DropdownMenuContentProps): react_jsx_runtime.JSX.Element;
interface DropdownMenuItemProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> {
    ref?: Ref<ComponentRef<typeof DropdownMenuPrimitive.Item>>;
}
declare function DropdownMenuItem({ className, ref, ...props }: DropdownMenuItemProps): react_jsx_runtime.JSX.Element;
interface DropdownMenuSeparatorProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator> {
    ref?: Ref<ComponentRef<typeof DropdownMenuPrimitive.Separator>>;
}
declare function DropdownMenuSeparator({ className, ref, ...props }: DropdownMenuSeparatorProps): react_jsx_runtime.JSX.Element;
interface DropdownMenuLabelProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> {
    ref?: Ref<ComponentRef<typeof DropdownMenuPrimitive.Label>>;
}
declare function DropdownMenuLabel({ className, ref, ...props }: DropdownMenuLabelProps): react_jsx_runtime.JSX.Element;

export { DropdownMenu, DropdownMenuContent, type DropdownMenuContentProps, DropdownMenuGroup, DropdownMenuItem, type DropdownMenuItemProps, DropdownMenuLabel, type DropdownMenuLabelProps, DropdownMenuSeparator, type DropdownMenuSeparatorProps, DropdownMenuTrigger };
