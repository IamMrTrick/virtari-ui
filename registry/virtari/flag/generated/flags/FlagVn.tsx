// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/vn.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagVn: FC<FlagCoreProps> = ({
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
    data-code="vn"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <defs>
    <clipPath id="vn-a">
      <path fillOpacity=".7" d="M-85.3 0h682.6v512H-85.3z"/>
    </clipPath>
  </defs>
  <g fillRule="evenodd" clipPath="url(#vn-a)" transform="translate(80)scale(.9375)">
    <path fill="#da251d" d="M-128 0h768v512h-768z"/>
    <path fill="#ff0" d="M349.6 381 260 314.3l-89 67.3L204 272l-89-67.7 110.1-1 34.2-109.4L294 203l110.1.1-88.5 68.4 33.9 109.6z"/>
  </g>
  </svg>
);

export default FlagVn;
