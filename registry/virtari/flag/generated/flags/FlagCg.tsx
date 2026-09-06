// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/cg.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagCg: FC<FlagCoreProps> = ({
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
    data-code="cg"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <defs>
    <clipPath id="cg-a">
      <path fillOpacity=".7" d="M-79.5 32h640v480h-640z"/>
    </clipPath>
  </defs>
  <g fillRule="evenodd" strokeWidth="1pt" clipPath="url(#cg-a)" transform="translate(79.5 -32)">
    <path fill="#ff0" d="M-119.5 32h720v480h-720z"/>
    <path fill="#00ca00" d="M-119.5 32v480l480-480z"/>
    <path fill="red" d="M120.5 512h480V32z"/>
  </g>
  </svg>
);

export default FlagCg;
