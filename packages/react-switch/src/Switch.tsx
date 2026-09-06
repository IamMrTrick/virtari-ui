import { useCallback, useState } from "react";
import type { ComponentRef, Ref } from "react";
import * as SwitchPrimitive from "@virtari-packages/primitives/switch";
import { cn, useComposedRefs } from "@virtari-packages/utils";
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
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
  onLostPointerCapture,
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

  const setRootRef = useComposedRefs(drag.rootRef, ref);

  return (
    <SwitchPrimitive.Root
      ref={setRootRef}
      className={cn("vds-switch", className)}
      data-size={size}
      checked={currentChecked}
      onCheckedChange={handleCheckedChange}
      disabled={disabled}
      {...props}
      onPointerDown={(event) => { onPointerDown?.(event); drag.handlers.onPointerDown(event); }}
      onPointerMove={(event) => { onPointerMove?.(event); drag.handlers.onPointerMove(event); }}
      onPointerUp={(event) => { onPointerUp?.(event); drag.handlers.onPointerUp(event); }}
      onPointerCancel={(event) => { onPointerCancel?.(event); drag.handlers.onPointerCancel(event); }}
      onLostPointerCapture={(event) => { onLostPointerCapture?.(event); drag.handlers.onLostPointerCapture(event); }}
    >
      <SwitchPrimitive.Thumb ref={drag.thumbRef} className="vds-switch-thumb" />
    </SwitchPrimitive.Root>
  );
}
