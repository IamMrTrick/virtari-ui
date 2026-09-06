// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/gw.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagGw: FC<FlagCoreProps> = ({
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
    data-code="gw"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <path fill="#ce1126" d="M0 0h220v480H0z"/>
  <path fill="#fcd116" d="M220 0h420v240H220z"/>
  <path fill="#009e49" d="M220 240h420v240H220z"/>
  <g id="gw-b" transform="matrix(80 0 0 80 110 240)">
    <path id="gw-a" fill="#000001" d="M0-1v1h.5" transform="rotate(18 0 -1)"/>
    <use xlinkHref="#gw-a" width="100%" height="100%" transform="scale(-1 1)"/>
  </g>
  <use xlinkHref="#gw-b" width="100%" height="100%" transform="rotate(72 110 240)"/>
  <use xlinkHref="#gw-b" width="100%" height="100%" transform="rotate(144 110 240)"/>
  <use xlinkHref="#gw-b" width="100%" height="100%" transform="rotate(-144 110 240)"/>
  <use xlinkHref="#gw-b" width="100%" height="100%" transform="rotate(-72 110 240)"/>
  </svg>
);

export default FlagGw;
