import * as react_jsx_runtime from 'react/jsx-runtime';
import { Ref, ComponentRef } from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
type AvatarColor = "neutral" | "auto" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";
interface AvatarProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
    src?: string;
    alt?: string;
    fallback: string;
    size?: AvatarSize;
    /**
     * Fallback background color. `"neutral"` (default) uses the primary
     * tokens. `"auto"` picks one of the 8 chart slots deterministically from
     * `colorKey` (or `fallback` if `colorKey` is absent) so the same name
     * always yields the same color. `"1"\u2013"8"` force a specific slot.
     */
    color?: AvatarColor;
    /**
     * Input to the auto-hash when `color="auto"`. Pass a stable value like
     * user id, email, or full name so a short `fallback` (e.g. initials)
     * doesn\u2019t collide with everyone else\u2019s initials.
     */
    colorKey?: string;
    ref?: Ref<ComponentRef<typeof AvatarPrimitive.Root>>;
}
declare function Avatar({ src, alt, fallback, size, color, colorKey, className, ref, ...props }: AvatarProps): react_jsx_runtime.JSX.Element;

export { Avatar, type AvatarColor, type AvatarProps, type AvatarSize };
