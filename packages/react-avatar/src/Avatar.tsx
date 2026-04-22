import { cn } from "@virtari-packages/utils";
import { useMemo, type ComponentRef, type Ref } from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

/* Explicit palette slot or auto-assign from the `colorKey`/`fallback` string.
   The 8 chart-N slots map to the already-defined data-viz palette in
   packages/tokens, so they\u2019re brand-aware and cover LTR/RTL and
   light/dark automatically. */
export type AvatarColor =
  | "neutral"
  | "auto"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8";

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
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

/* djb2 string hash \u2014 tiny, fast, and stable across runs / locales. Good
   enough for an 8-bucket distribution. Same input always returns the same
   bucket, so re-renders and SSR agree. */
function hashToSlot(input: string, buckets = 8): number {
  let hash = 5381;
  for (let i = 0; i < input.length; i++) {
    hash = ((hash << 5) + hash + input.charCodeAt(i)) | 0;
  }
  return (Math.abs(hash) % buckets) + 1;
}

export function Avatar({
  src,
  alt,
  fallback,
  size = "md",
  color = "neutral",
  colorKey,
  className,
  ref,
  ...props
}: AvatarProps) {
  const resolvedColor = useMemo(() => {
    if (color === "auto") {
      return String(hashToSlot(colorKey ?? fallback ?? ""));
    }
    return color;
  }, [color, colorKey, fallback]);

  return (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn("vds-avatar", className)}
      data-size={size}
      data-color={resolvedColor}
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
