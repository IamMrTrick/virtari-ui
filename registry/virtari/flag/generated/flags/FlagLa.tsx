// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/la.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagLa: FC<FlagCoreProps> = ({
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
    data-code="la"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <defs>
    <clipPath id="la-a">
      <path fillOpacity=".7" d="M0 0h640v480H0z"/>
    </clipPath>
  </defs>
  <g fillRule="evenodd" clipPath="url(#la-a)">
    <path fill="#ce1126" d="M-40 0h720v480H-40z"/>
    <path fill="#002868" d="M-40 119.3h720v241.4H-40z"/>
    <path fill="#fff" d="M423.4 240a103.4 103.4 0 1 1-206.8 0 103.4 103.4 0 1 1 206.8 0"/>
  </g>
  </svg>
);

export default FlagLa;
