// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/dj.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagDj: FC<FlagCoreProps> = ({
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
    data-code="dj"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <defs>
    <clipPath id="dj-a">
      <path fillOpacity=".7" d="M-40 0h682.7v512H-40z"/>
    </clipPath>
  </defs>
  <g fillRule="evenodd" clipPath="url(#dj-a)" transform="translate(37.5)scale(.94)">
    <path fill="#0c0" d="M-40 0h768v512H-40z"/>
    <path fill="#69f" d="M-40 0h768v256H-40z"/>
    <path fill="#fffefe" d="m-40 0 382.7 255.7L-40 511z"/>
    <path fill="red" d="M119.8 292 89 270l-30.7 22.4L69.7 256l-30.6-22.5 37.9-.3 11.7-36.3 12 36.2h37.9l-30.5 22.7 11.7 36.4z"/>
  </g>
  </svg>
);

export default FlagDj;
