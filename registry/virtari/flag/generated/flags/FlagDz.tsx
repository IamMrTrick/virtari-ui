// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/dz.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagDz: FC<FlagCoreProps> = ({
  size,
  rounded = true,
  title,
  className,
  style,
  ...rest
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 480"
    className={cn("vds-flag", className)}
    data-size={typeof size === "string" ? size : undefined}
    data-rounded={rounded === false ? undefined : rounded === "full" ? "full" : ""}
    data-code="dz"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <path fill="#fff" d="M320 0h320v480H320z"/>
  <path fill="#006233" d="M0 0h320v480H0z"/>
  <path fill="#d21034" d="M424 180a120 120 0 1 0 0 120 96 96 0 1 1 0-120m4 60-108-35.2 67.2 92V183.2l-67.2 92z"/>
  </svg>
);

export default FlagDz;
