// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/gm.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagGm: FC<FlagCoreProps> = ({
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
    data-code="gm"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <defs>
    <clipPath id="gm-a">
      <path fillOpacity=".7" d="M0-48h640v480H0z"/>
    </clipPath>
  </defs>
  <g fillRule="evenodd" strokeWidth="1pt" clipPath="url(#gm-a)" transform="translate(0 48)">
    <path fill="red" d="M0-128h640V85.3H0z"/>
    <path fill="#fff" d="M0 85.3h640V121H0z"/>
    <path fill="#009" d="M0 120.9h640V263H0z"/>
    <path fill="#fff" d="M0 263.1h640v35.6H0z"/>
    <path fill="#090" d="M0 298.7h640V512H0z"/>
  </g>
  </svg>
);

export default FlagGm;
