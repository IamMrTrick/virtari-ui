// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/hn.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagHn: FC<FlagCoreProps> = ({
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
    data-code="hn"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <path fill="#18c3df" d="M0 0h640v480H0z"/>
  <path fill="#fff" d="M0 160h640v160H0z"/>
  <g id="hn-c" fill="#18c3df" transform="translate(320 240)scale(26.66665)">
    <g id="hn-b">
      <path id="hn-a" d="m-.3 0 .5.1L0-1z"/>
      <use xlinkHref="#hn-a" width="100%" height="100%" transform="scale(-1 1)"/>
    </g>
    <use xlinkHref="#hn-b" width="100%" height="100%" transform="rotate(72)"/>
    <use xlinkHref="#hn-b" width="100%" height="100%" transform="rotate(-72)"/>
    <use xlinkHref="#hn-b" width="100%" height="100%" transform="rotate(144)"/>
    <use xlinkHref="#hn-b" width="100%" height="100%" transform="rotate(-144)"/>
  </g>
  <use xlinkHref="#hn-c" width="100%" height="100%" transform="translate(133.3 -42.7)"/>
  <use xlinkHref="#hn-c" width="100%" height="100%" transform="translate(133.3 37.3)"/>
  <use xlinkHref="#hn-c" width="100%" height="100%" transform="translate(-133.3 -42.7)"/>
  <use xlinkHref="#hn-c" width="100%" height="100%" transform="translate(-133.3 37.3)"/>
  </svg>
);

export default FlagHn;
