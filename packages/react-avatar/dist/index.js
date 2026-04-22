"use client";
import { cn } from '@virtari-packages/utils';
import { useMemo } from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { jsxs, jsx } from 'react/jsx-runtime';

// src/Avatar.tsx
function hashToSlot(input, buckets = 8) {
  let hash = 5381;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) + hash + input.charCodeAt(i) | 0;
  }
  return Math.abs(hash) % buckets + 1;
}
function Avatar({
  src,
  alt,
  fallback,
  size = "md",
  color = "neutral",
  colorKey,
  className,
  ref,
  ...props
}) {
  const resolvedColor = useMemo(() => {
    if (color === "auto") {
      return String(hashToSlot(colorKey ?? fallback ?? ""));
    }
    return color;
  }, [color, colorKey, fallback]);
  return /* @__PURE__ */ jsxs(
    AvatarPrimitive.Root,
    {
      ref,
      className: cn("vds-avatar", className),
      "data-size": size,
      "data-color": resolvedColor,
      ...props,
      children: [
        /* @__PURE__ */ jsx(
          AvatarPrimitive.Image,
          {
            className: "vds-avatar-image",
            src,
            alt
          }
        ),
        /* @__PURE__ */ jsx(AvatarPrimitive.Fallback, { className: "vds-avatar-fallback", children: fallback })
      ]
    }
  );
}

export { Avatar };
