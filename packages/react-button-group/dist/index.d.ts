import * as react from 'react';
import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { ButtonColor, ButtonVariant, ButtonSize } from '@virtari-packages/react-button';

interface ButtonGroupProps extends Omit<ComponentPropsWithoutRef<"div">, "color"> {
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
declare const ButtonGroup: react.ForwardRefExoticComponent<ButtonGroupProps & react.RefAttributes<HTMLDivElement>>;

export { ButtonGroup, type ButtonGroupProps };
