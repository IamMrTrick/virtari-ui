// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/cr.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagCr: FC<FlagCoreProps> = ({
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
    data-code="cr"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <g fillRule="evenodd" strokeWidth="1pt">
    <path fill="#0000b4" d="M0 0h640v480H0z"/>
    <path fill="#fff" d="M0 75.4h640v322.3H0z"/>
    <path fill="#d90000" d="M0 157.7h640v157.7H0z"/>
  </g>
  </svg>
);

export default FlagCr;
