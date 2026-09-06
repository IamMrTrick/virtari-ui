// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/rw.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagRw: FC<FlagCoreProps> = ({
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
    data-code="rw"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <path fill="#20603d" d="M0 0h640v480H0z"/>
  <path fill="#fad201" d="M0 0h640v360H0z"/>
  <path fill="#00a1de" d="M0 0h640v240H0z"/>
  <g transform="translate(511 125.4)scale(.66667)">
    <g id="rw-b">
      <path id="rw-a" fill="#e5be01" d="M116.1 0 35.7 4.7l76.4 25.4-78.8-16.3L100.6 58l-72-36.2L82 82.1 21.9 28.6l36.2 72-44.3-67.3L30 112 4.7 35.7 0 116.1-1-1z"/>
      <use xlinkHref="#rw-a" width="100%" height="100%" transform="scale(1 -1)"/>
    </g>
    <use xlinkHref="#rw-b" width="100%" height="100%" transform="scale(-1 1)"/>
    <circle r="34.3" fill="#e5be01" stroke="#00a1de" strokeWidth="3.4"/>
  </g>
  </svg>
);

export default FlagRw;
