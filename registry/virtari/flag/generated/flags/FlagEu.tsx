// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/eu.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagEu: FC<FlagCoreProps> = ({
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
    data-code="eu"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <defs>
    <g id="eu-d">
      <g id="eu-b">
        <path id="eu-a" d="m0-1-.3 1 .5.1z"/>
        <use xlinkHref="#eu-a" transform="scale(-1 1)"/>
      </g>
      <g id="eu-c">
        <use xlinkHref="#eu-b" transform="rotate(72)"/>
        <use xlinkHref="#eu-b" transform="rotate(144)"/>
      </g>
      <use xlinkHref="#eu-c" transform="scale(-1 1)"/>
    </g>
  </defs>
  <path fill="#039" d="M0 0h640v480H0z"/>
  <g fill="#fc0" transform="translate(320 242.3)scale(23.7037)">
    <use xlinkHref="#eu-d" width="100%" height="100%" y="-6"/>
    <use xlinkHref="#eu-d" width="100%" height="100%" y="6"/>
    <g id="eu-e">
      <use xlinkHref="#eu-d" width="100%" height="100%" x="-6"/>
      <use xlinkHref="#eu-d" width="100%" height="100%" transform="rotate(-144 -2.3 -2.1)"/>
      <use xlinkHref="#eu-d" width="100%" height="100%" transform="rotate(144 -2.1 -2.3)"/>
      <use xlinkHref="#eu-d" width="100%" height="100%" transform="rotate(72 -4.7 -2)"/>
      <use xlinkHref="#eu-d" width="100%" height="100%" transform="rotate(72 -5 .5)"/>
    </g>
    <use xlinkHref="#eu-e" width="100%" height="100%" transform="scale(-1 1)"/>
  </g>
  </svg>
);

export default FlagEu;
