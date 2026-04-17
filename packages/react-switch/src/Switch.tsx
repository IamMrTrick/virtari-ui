import { useCallback, useState } from "react";
import type { ComponentRef, Ref } from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@virtari/utils";
import { useSwitchDrag } from "./useSwitchDrag";

export type SwitchSize = "sm" | "md" | "lg";

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  size?: SwitchSize;
  dragEnabled?: boolean;
  ref?: Ref<ComponentRef<typeof SwitchPrimitive.Root>>;
}

export function Switch({
  size = "md",
  className,
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  dragEnabled = true,
  ref,
  ...props
}: SwitchProps) {
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false);
  const currentChecked = isControlled ? checked : internalChecked;

  const handleCheckedChange = useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalChecked(next);
      onCheckedChange?.(next);
    },
    [isControlled, onCheckedChange],
  );

  const drag = useSwitchDrag({
    enabled: dragEnabled && !disabled,
    getChecked: () => currentChecked,
    onCommit: handleCheckedChange,
  });

  const setRootRef = useCallback(
    (node: HTMLButtonElement | null) => {
      drag.rootRef(node);
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
    },
    [drag, ref],
  );

  return (
    <SwitchPrimitive.Root
      ref={setRootRef}
      className={cn("vds-switch", className)}
      data-size={size}
      checked={currentChecked}
      onCheckedChange={handleCheckedChange}
      disabled={disabled}
      {...drag.handlers}
      {...props}
    >
      <SwitchPrimitive.Thumb ref={drag.thumbRef} className="vds-switch-thumb" />
    </SwitchPrimitive.Root>
  );
}
