// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/th.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagTh: FC<FlagCoreProps> = ({
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
    data-code="th"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <g fillRule="evenodd">
    <path fill="#f4f5f8" d="M0 0h640v480H0z"/>
    <path fill="#2d2a4a" d="M0 162.5h640v160H0z"/>
    <path fill="#a51931" d="M0 0h640v82.5H0zm0 400h640v80H0z"/>
  </g>
  </svg>
);

export default FlagTh;
