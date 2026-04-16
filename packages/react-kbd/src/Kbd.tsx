import { cn } from "@virtari/utils";
import type { Ref } from "react";

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>;
}

export function Kbd({ className, ref, ...props }: KbdProps) {
  return (
    <kbd ref={ref} className={cn("vds-kbd", className)} {...props} />
  );
}
