// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/co.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagCo: FC<FlagCoreProps> = ({
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
    data-code="co"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <g fillRule="evenodd" strokeWidth="1pt">
    <path fill="#ffe800" d="M0 0h640v480H0z"/>
    <path fill="#00148e" d="M0 240h640v240H0z"/>
    <path fill="#da0010" d="M0 360h640v120H0z"/>
  </g>
  </svg>
);

export default FlagCo;
