// AUTO-GENERATED. DO NOT EDIT. Source: flag-icons/flags/4x3/gg.svg
import type { FC } from "react";
import { cn } from "../../../../lib/utils";
import type { FlagCoreProps } from "../../Flag";

const FlagGg: FC<FlagCoreProps> = ({
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
    data-code="gg"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
    style={typeof size === "number" ? { inlineSize: size, ...style } : style}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <path fill="#fff" d="M0 0h640v480H0z"/>
  <path fill="#e8112d" d="M256 0h128v480H256z"/>
  <path fill="#e8112d" d="M0 176h640v128H0z"/>
  <path id="gg-a" fill="#f9dd16" d="m110 286.7 23.3-23.4h210v-46.6h-210L110 193.3z"/>
  <use xlinkHref="#gg-a" width="36" height="24" transform="rotate(90 320 240)"/>
  <use xlinkHref="#gg-a" width="36" height="24" transform="rotate(-90 320 240)"/>
  <use xlinkHref="#gg-a" width="36" height="24" transform="rotate(180 320 240)"/>
  </svg>
);

export default FlagGg;
