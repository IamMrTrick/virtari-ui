// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/mv.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagMv: FC<FlagCoreProps> = ({
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
    data-code="mv"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <path fill="#d21034" d="M0 0h640v480H0z"/>
  <path fill="#007e3a" d="M120 120h400v240H120z"/>
  <circle cx="350" cy="240" r="80" fill="#fff"/>
  <circle cx="380" cy="240" r="80" fill="#007e3a"/>
  </svg>
);

export default FlagMv;
