// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/lc.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagLc: FC<FlagCoreProps> = ({
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
    data-code="lc"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <g fillRule="evenodd">
    <path fill="#65cfff" d="M0 0h640v480H0z"/>
    <path fill="#fff" d="m318.9 42 162.7 395.3-322.6.9z"/>
    <path fill="#000001" d="m319 96.5 140.8 340-279 .8z"/>
    <path fill="#ffce00" d="m318.9 240.1 162.7 197.6-322.6.5z"/>
  </g>
  </svg>
);

export default FlagLc;
