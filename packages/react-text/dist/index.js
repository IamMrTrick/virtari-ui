import { cn } from '@virtari-packages/utils';
import { Slot } from '@radix-ui/react-slot';
import { jsx } from 'react/jsx-runtime';

// src/Text.tsx
function Text({
  as = "p",
  size = "3",
  weight,
  tone,
  align,
  leading,
  truncate = false,
  wrap,
  asChild = false,
  className,
  ref,
  ...props
}) {
  const Comp = asChild ? Slot : as;
  return /* @__PURE__ */ jsx(
    Comp,
    {
      ref,
      className: cn("vds-text", className),
      "data-size": size,
      "data-weight": weight,
      "data-tone": tone,
      "data-align": align,
      "data-leading": leading,
      "data-truncate": truncate ? "true" : void 0,
      "data-wrap": wrap,
      ...props
    }
  );
}
var LEVEL_TO_SIZE = {
  1: "8",
  2: "7",
  3: "6",
  4: "5",
  5: "4",
  6: "3"
};
function Heading({
  level = 2,
  size,
  weight,
  tone,
  align,
  leading,
  tracking,
  truncate = false,
  wrap,
  asChild = false,
  className,
  ref,
  ...props
}) {
  const Tag = `h${level}`;
  const Comp = asChild ? Slot : Tag;
  const resolvedSize = size ?? LEVEL_TO_SIZE[level];
  return /* @__PURE__ */ jsx(
    Comp,
    {
      ref,
      className: cn("vds-heading", className),
      "data-size": resolvedSize,
      "data-weight": weight,
      "data-tone": tone,
      "data-align": align,
      "data-leading": leading,
      "data-tracking": tracking,
      "data-truncate": truncate ? "true" : void 0,
      "data-wrap": wrap,
      ...props
    }
  );
}

export { Heading, Text };
