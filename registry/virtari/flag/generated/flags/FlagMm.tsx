// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/mm.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagMm: FC<FlagCoreProps> = ({
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
    data-code="mm"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <path fill="#fecb00" d="M0 0h640v480H0z"/>
  <path fill="#34b233" d="M0 160h640v320H0z"/>
  <path fill="#ea2839" d="M0 320h640v160H0z"/>
  <g transform="translate(320 256.9)scale(176.87999)">
    <path id="mm-a" fill="#fff" d="m0-1 .3 1h-.6z"/>
    <use xlinkHref="#mm-a" width="100%" height="100%" transform="rotate(-144)"/>
    <use xlinkHref="#mm-a" width="100%" height="100%" transform="rotate(-72)"/>
    <use xlinkHref="#mm-a" width="100%" height="100%" transform="rotate(72)"/>
    <use xlinkHref="#mm-a" width="100%" height="100%" transform="rotate(144)"/>
  </g>
  </svg>
);

export default FlagMm;
