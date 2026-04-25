import { forwardRef, useId, useMemo } from "react";
import type { HTMLAttributes } from "react";
import { cn } from "@virtari-packages/utils";

import { FormItemContext } from "./context";

export type FormItemOrientation = "vertical" | "horizontal";

export interface FormItemProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: FormItemOrientation;
}

export const FormItem = forwardRef<HTMLDivElement, FormItemProps>(
  function FormItem(
    { className, orientation = "vertical", ...props },
    ref,
  ) {
    const id = useId();
    const value = useMemo(() => ({ id }), [id]);
    return (
      <FormItemContext.Provider value={value}>
        <div
          ref={ref}
          data-orientation={orientation}
          className={cn("vds-form-item", className)}
          {...props}
        />
      </FormItemContext.Provider>
    );
  },
);
