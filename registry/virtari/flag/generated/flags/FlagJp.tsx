// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/jp.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagJp: FC<FlagCoreProps> = ({
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
    data-code="jp"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <defs>
    <clipPath id="jp-a">
      <path fillOpacity=".7" d="M-88 32h640v480H-88z"/>
    </clipPath>
  </defs>
  <g fillRule="evenodd" strokeWidth="1pt" clipPath="url(#jp-a)" transform="translate(88 -32)">
    <path fill="#fff" d="M-128 32h720v480h-720z"/>
    <circle cx="523.1" cy="344.1" r="194.9" fill="#bc002d" transform="translate(-168.4 8.6)scale(.76554)"/>
  </g>
  </svg>
);

export default FlagJp;
