"use client";
import { useDirection, cn } from '@virtari-packages/utils';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { DirectionProvider } from '@radix-ui/react-direction';
import { jsx } from 'react/jsx-runtime';

// src/DropdownMenu.tsx
function DropdownMenu({ dir, ...props }) {
  const autoDir = useDirection();
  return /* @__PURE__ */ jsx(DirectionProvider, { dir: dir ?? autoDir, children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.Root, { ...props }) });
}
var DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
var DropdownMenuGroup = DropdownMenuPrimitive.Group;
function DropdownMenuContent({
  className,
  sideOffset = 4,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Content,
    {
      ref,
      sideOffset,
      className: cn("vds-dropdown-menu-content", className),
      ...props
    }
  ) });
}
function DropdownMenuItem({
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Item,
    {
      ref,
      className: cn("vds-dropdown-menu-item", className),
      ...props
    }
  );
}
function DropdownMenuSeparator({
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Separator,
    {
      ref,
      className: cn("vds-dropdown-menu-separator", className),
      ...props
    }
  );
}
function DropdownMenuLabel({
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Label,
    {
      ref,
      className: cn("vds-dropdown-menu-label", className),
      ...props
    }
  );
}

export { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger };
