import * as react_jsx_runtime from 'react/jsx-runtime';
import { Ref, ComponentRef } from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
interface AvatarProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
    src?: string;
    alt?: string;
    fallback: string;
    size?: AvatarSize;
    ref?: Ref<ComponentRef<typeof AvatarPrimitive.Root>>;
}
declare function Avatar({ src, alt, fallback, size, className, ref, ...props }: AvatarProps): react_jsx_runtime.JSX.Element;

export { Avatar, type AvatarProps, type AvatarSize };
