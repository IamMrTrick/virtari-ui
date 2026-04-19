"use client";
import { cn } from '@virtari-packages/utils';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { jsxs, jsx } from 'react/jsx-runtime';

// src/Avatar.tsx
function Avatar({
  src,
  alt,
  fallback,
  size = "md",
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    AvatarPrimitive.Root,
    {
      ref,
      className: cn("vds-avatar", className),
      "data-size": size,
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
