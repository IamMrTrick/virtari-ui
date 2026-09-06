import {
  useContext,
  type ForwardRefExoticComponent,
  type Ref,
  type RefAttributes,
} from "react";
import type { IconProps as TablerIconProps } from "@tabler/icons-react";
import { cn } from "../../lib/utils";
import { IconContext } from "./IconProvider";

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl" | number;

export type IconColor =
  | "current"
  | "muted"
  | "subtle"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | (string & {});

export type TablerIconComponent = ForwardRefExoticComponent<
  TablerIconProps & RefAttributes<SVGSVGElement>
>;

export interface IconProps extends Omit<TablerIconProps, "size" | "color" | "ref"> {
  icon: TablerIconComponent;
  size?: IconSize;
  color?: IconColor;
  label?: string;
  ref?: Ref<SVGSVGElement>;
}

export function Icon({
  icon: TablerComp,
  size,
  color,
  stroke,
  label,
  className,
  ref,
  ...rest
}: IconProps) {
  const defaults = useContext(IconContext);
  const resolvedSize = size ?? defaults.size ?? "md";
  const resolvedColor = color ?? defaults.color;
  const resolvedStroke = stroke ?? defaults.stroke;
  const tokenized = typeof resolvedSize === "string";

  return (
    <TablerComp
      ref={ref}
      className={cn("vds-icon", className)}
      data-size={tokenized ? resolvedSize : undefined}
      data-color={resolvedColor && resolvedColor !== "current" ? resolvedColor : undefined}
      size={tokenized ? undefined : (resolvedSize as number)}
      stroke={resolvedStroke}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
      focusable="false"
      {...rest}
    />
  );
}
