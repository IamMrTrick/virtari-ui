import { cn } from "../../lib/utils";
import {
  forwardRef,
  useMemo,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import {
  ButtonGroupContext,
  type ButtonColor,
  type ButtonVariant,
  type ButtonSize,
} from "../button";

export interface ButtonGroupProps
  extends Omit<ComponentPropsWithoutRef<"div">, "color"> {
  /** Hue/intent propagated to every child Button. Each child can still override. */
  color?: ButtonColor;
  /** Visual style propagated to every child Button. Each child can still override. */
  variant?: ButtonVariant;
  /** Size propagated to every child Button. Each child can still override. */
  size?: ButtonSize;
  /** Disabled propagated to every child Button. Each child can still override. */
  disabled?: boolean;
  /** Layout axis. */
  orientation?: "horizontal" | "vertical";
  /** Segmented mode: zero gap, collapsed inner radii and shared borders. */
  attached?: boolean;
  /** Children stretch to equal flex basis, filling the container. */
  fullWidth?: boolean;
  children: ReactNode;
}

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  function ButtonGroup(
    {
      color,
      variant,
      size,
      disabled,
      orientation = "horizontal",
      attached = false,
      fullWidth = false,
      className,
      children,
      ...rest
    },
    ref,
  ) {
    const ctx = useMemo(
      () => ({ color, variant, size, disabled }),
      [color, variant, size, disabled],
    );

    return (
      <ButtonGroupContext.Provider value={ctx}>
        <div
          ref={ref}
          role="group"
          className={cn("vds-button-group", className)}
          data-orientation={orientation}
          data-attached={attached ? "" : undefined}
          data-full-width={fullWidth ? "" : undefined}
          data-size={size}
          data-variant={variant}
          data-color={color}
          {...rest}
        >
          {children}
        </div>
      </ButtonGroupContext.Provider>
    );
  },
);

ButtonGroup.displayName = "ButtonGroup";
