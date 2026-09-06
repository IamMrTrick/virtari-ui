// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/ve.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagVe: FC<FlagCoreProps> = ({
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
    data-code="ve"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <defs>
    <g id="ve-d" transform="translate(0 -36)">
      <g id="ve-c">
        <g id="ve-b">
          <path id="ve-a" fill="#fff" d="M0-5-1.5-.2l2.8.9z"/>
          <use xlinkHref="#ve-a" width="180" height="120" transform="scale(-1 1)"/>
        </g>
        <use xlinkHref="#ve-b" width="180" height="120" transform="rotate(72)"/>
      </g>
      <use xlinkHref="#ve-b" width="180" height="120" transform="rotate(-72)"/>
      <use xlinkHref="#ve-c" width="180" height="120" transform="rotate(144)"/>
    </g>
  </defs>
  <path fill="#cf142b" d="M0 0h640v480H0z"/>
  <path fill="#00247d" d="M0 0h640v320H0z"/>
  <path fill="#fc0" d="M0 0h640v160H0z"/>
  <g id="ve-f" transform="matrix(4 0 0 4 320 336)">
    <g id="ve-e">
      <use xlinkHref="#ve-d" width="180" height="120" transform="rotate(10)"/>
      <use xlinkHref="#ve-d" width="180" height="120" transform="rotate(30)"/>
    </g>
    <use xlinkHref="#ve-e" width="180" height="120" transform="rotate(40)"/>
  </g>
  <use xlinkHref="#ve-f" width="180" height="120" transform="rotate(-80 320 336)"/>
  </svg>
);

export default FlagVe;
