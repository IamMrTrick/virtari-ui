import { cn } from "@virtari/utils";
import type { ComponentRef, Ref } from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  src?: string;
  alt?: string;
  fallback: string;
  size?: AvatarSize;
  ref?: Ref<ComponentRef<typeof AvatarPrimitive.Root>>;
}

export function Avatar({
  src,
  alt,
  fallback,
  size = "md",
  className,
  ref,
  ...props
}: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn("vds-avatar", className)}
      data-size={size}
      {...props}
    >
      <AvatarPrimitive.Image
        className="vds-avatar-image"
        src={src}
        alt={alt}
      />
      <AvatarPrimitive.Fallback className="vds-avatar-fallback">
        {fallback}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}

